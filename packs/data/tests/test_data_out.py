"""The data pack (ADR-0010): a pack of the registry with its tools in its own code/. Introspection,
lineage, usage and meaning, and `oto data`, are the module `oto_data` in ontology/data/code, loaded by
the engine through the pack's `provides.commands`; the engine keeps the helpers every pack shares
(oto/naming.py) and the connectors the tools read a store through. These tests run against an installed
engine with tests/conftest.py pointing it at this pack."""
import contextlib
import io
import os

from oto import extensions, naming
from oto.cli import main
from oto.model import ontologies
import oto_data as _data
from oto_data import lineage, meaning, usage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def _cli(*args):
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        try:
            code = main(list(args))
        except SystemExit as exc:
            code = exc.code
    return code, out.getvalue()


def test_the_pack_carries_the_command_and_the_engine_loads_it_from_here():
    manifest = ontologies.manifest_for("data")
    assert manifest["extends"] == ["software-architecture"] and "code" in manifest["carries"]
    assert manifest["provides"] == {"commands": [{"name": "data", "module": "oto_data.cli", "label": "data"}]}
    assert extensions.code_dir("data") == os.path.join(ROOT, "ontology", "data", "code"), "the tools are the pack's own code"
    assert _data.__file__.startswith(os.path.join(ROOT, "ontology", "data", "code")), "the module the tests import is the pack's"
    assert _data.introspect and lineage.read_dbt and usage.classify and meaning.skeleton
    assert _data._slug is naming.slug and _data._graph_ids is naming.graph_ids, "the helpers every pack shares stay the engine's"
    found = {c["name"]: c for c in extensions.commands()}
    assert found["data"]["module"] == "oto_data.cli" and found["data"]["pack"] == "data"
    code, out = _cli("data", "--help")
    assert code == 0 and "introspect" in out and "lineage" in out and "usage" in out and "meaning" in out and "confirm" in out, out
    code, out = _cli("--help")
    assert "  data " in out, out
    assert ontologies.self_check("data") == [], ontologies.self_check("data")
    with open(os.path.join(ROOT, "skills", "data-meaning", "SKILL.md"), encoding="utf-8") as f:
        skill = f.read()
    assert "oto data meaning" in skill and "oto data confirm" in skill, "the skill comes with the pack"
    with open(os.path.join(ROOT, "README.md"), encoding="utf-8") as f:
        assert "0010" in f.read()
