"""The calm adapter and the policy pack together: the policy pack's generated bindings are `IamBinding`
nodes of its own, with nothing of a framework on them (ADR-0006 step 4); when the calm pack is composed
too, the adapter exports a binding node as a CALM control on the component that runs as the granted
principal. The policy pack depends on no framework; the adapter knows the binding node."""
import contextlib
import io
import json
import os

import oto_calm as _calm
from oto.cli import main
from oto.curate import session as _session
from oto.project import Project
from oto.scaffold import init


def _cli(*args):
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        code = main(list(args))
    return code, out.getvalue()


def _project(tmp_path, ontology, slug):
    root = str(tmp_path / slug)
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug=slug, name=slug.title(), ontology=ontology)
    return root


def test_the_calm_adapter_exports_a_binding_node_as_a_control_when_both_packs_are_composed(tmp_path):
    root = _project(tmp_path, "policy,calm", "platform")
    path = os.path.join(root, "graph.json")
    with open(path, encoding="utf-8") as f:
        graph = json.load(f)
    intake = next(n for n in graph["nodes"] if n["id"] == "component.invoice-intake")
    intake["attributes"]["external_id"], intake["attributes"]["external_type"] = "invoice-intake", "service"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(graph, f, indent=2)
    code, out = _cli("build", "--project", root)
    assert code == 0 and "iam:" in out and "binding node(s) proposed" in out, out
    code, out = _cli("policy", "iam", "--project", root, "--apply", "--by", "Ada", "--at", "2026-10-28")
    assert code == 0 and "applied" in out and "binding node(s)" in out, out
    live = _session.live(Project.standard(root))
    bindings = [n for n in live["nodes"] if n["type"] == "IamBinding"]
    assert {n["id"] for n in bindings} >= {"iambinding.table-invoices", "iambinding.table-ledger-postings"}
    assert not any(n["type"] == "Control" and (n.get("attributes") or {}).get("generated_by") for n in live["nodes"]), "no control is generated: the bindings are the pack's own nodes"
    exported = os.path.join(root, "out.calm.json")
    code, out = _cli("arch", "export", "--framework", "calm", "--out", exported, "--project", root)
    assert code == 0, out
    with open(exported, encoding="utf-8") as f:
        model = json.load(f)
    node = next(n for n in model["nodes"] if n["unique-id"] == "invoice-intake")
    control = node["controls"]["iam-table-invoices"]
    assert control["requirements"][0]["requirement-url"] == _calm.IAM_REQUIREMENT_URL
    config = control["requirements"][0]["config"]
    assert config["provider"] == "gcp" and config["bindings"][0]["role"] == "roles/bigquery.dataEditor" and config["resource"].startswith("//bigquery")
    code, out = _cli("query", "--project", root, "ask", "PL9", "RESOURCE=table.ledger-postings")
    assert code == 0 and "status: answered" in out and "iambinding.table-ledger-postings" in out and "roles/bigquery.dataViewer" in out, out
    code, out = _cli("query", "--project", root, "ask", "PL8", "PRINCIPAL=principal.invoice-intake")
    assert code == 0 and "iambinding.table-invoices" in out and "component.invoice-intake" in out, out


def test_a_policy_project_without_the_calm_pack_has_no_calm_to_export(tmp_path):
    ledger = _project(tmp_path, "policy", "ledger")
    code, out = _cli("build", "--project", ledger)
    assert code == 0 and "iam:" in out, out
    code, out = _cli("arch", "export", "--framework", "calm", "--project", ledger)
    assert code == 1 and ("no CALM" in out or "nothing to export" in out or "vocabulary" in out or "Relationship" in out), "the pack is on the machine, the project does not compose it: " + out
