"""The policy pack (ADR-0010): a pack of the registry with its tools in its own code/. The compiler, the
snapshot, the IAM derivation, the two build stages, `oto policy`, the write hook and the read hook are the
module `oto_policy` in ontology/policy/code, loaded by the engine through the pack's `provides`; the guard
that holds a Claude Code session to a snapshot stays the engine plugin's, plain Python that reads the file
this pack writes. These tests run against an installed engine with tests/conftest.py pointing it at this pack."""
import contextlib
import io
import os

from oto import extensions
from oto.cli import main
from oto.model import ontologies
from oto.project import Project
from oto.scaffold import init
import oto_policy as _policy

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _cli(*args):
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        try:
            code = main(list(args))
        except SystemExit as exc:
            code = exc.code
    return code, out.getvalue()


def test_the_pack_carries_the_stages_the_command_and_the_hooks_and_the_engine_loads_them_from_here(tmp_path):
    manifest = ontologies.manifest_for("policy")
    assert manifest["extends"] == ["data", "agent"] and "code" in manifest["carries"]
    provides = manifest["provides"]
    assert [s["name"] for s in provides["stages"]] == ["policy", "iam"]
    assert provides["stages"][0]["module"] == "oto_policy.bundle_stage" and provides["stages"][0]["owns"] == ["policy"]
    assert provides["stages"][1]["module"] == "oto_policy.iam_stage" and provides["stages"][1]["owns"] == ["iam"]
    assert provides["commands"] == [{"name": "policy", "module": "oto_policy.cli", "label": "policy"}]
    assert provides["write_hooks"] == ["oto_policy:enforce"] and provides["read_hooks"] == ["oto_policy:police_read"]
    assert extensions.code_dir("policy") == os.path.join(ROOT, "ontology", "policy", "code")
    assert _policy.__file__.startswith(os.path.join(ROOT, "ontology", "policy", "code")), "the module the tests import is the pack's"
    assert _policy.compile and _policy.bundle and _policy.snapshot and _policy.enforce and _policy.police_read
    found = {c["name"]: c for c in extensions.commands()}
    assert found["policy"]["module"] == "oto_policy.cli" and found["policy"]["pack"] == "policy"
    assert found["data"]["module"] == "oto_data.cli", "the data pack this one sits on comes along, embedded"
    code, out = _cli("policy", "--help")
    assert code == 0 and "compile" in out and "snapshot" in out and "iam" in out and "denials" in out, out
    code, out = _cli("--help")
    assert "  policy " in out and "  data " in out, out
    for name in ("policy", "data"):
        assert ontologies.self_check(name) == [], (name, ontologies.self_check(name))
    root = str(tmp_path / "ledger")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="ledger", name="Ledger", ontology="policy")
    project = Project.standard(root)
    assert [n for n, _m in extensions.stages(project)][-3:] == ["policy", "iam", "site"], "the pack's stages, before the site"
    code, out = _cli("build", "--project", root)
    assert code == 0 and "policy:" in out and "rule(s)" in out and "iam:" in out, "the stages run from the pack's code\n" + out
    with open(os.path.join(ROOT, "README.md"), encoding="utf-8") as f:
        assert "0010" in f.read()
