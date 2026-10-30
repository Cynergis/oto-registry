"""The work pack (ADR-0010): the plan as facts, a pack of the registry with its tools in its own code/.
A work item is open, blocked or deployed, and nobody writes that on the item: a `Transition` is
appended, the previous one superseded, and a rule derives the state from the current transition. A
`Block` must carry its reason and whom or what it waits on. `deployed` is never set by hand. The
communication ontology, on work, puts messages beside the item they are about: `notify`, `inbox`,
`reply`, `remind`. The commands and the board's status hook are the module `oto_work` in
ontology/work/code, loaded by the engine through the pack's `provides`; the SessionStart hook that
opens a session with the inbox is the pack's hooks/hooks.json. These tests run against an installed
engine with tests/conftest.py pointing it at this pack."""
import contextlib
import io
import json
import os
import subprocess

import pytest

from oto import audit, extensions
from oto.cli import main
from oto.curate import session
from oto.model import ontologies, vocabulary as _vocab
from oto.project import Project
from oto.reason import engine, match, questions, shapes
from oto.scaffold import init
import oto_work as _work


def _cli(*args):
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        try:
            code = main(list(args))
        except SystemExit as exc:
            code = exc.code
    return code, out.getvalue()


def _node(nid, type_, status="current", **attrs):
    return {"id": nid, "type": type_, "label": nid, "attributes": attrs, "status": status,
            "as_of": "2026-10-01", "valid_from": "2026-10-01", "source_doc": "plan"}


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ---- the pack carries the commands and the status hook; the engine loads them from here ----

def test_the_pack_carries_the_commands_and_the_engine_loads_them_from_here():
    manifest = ontologies.manifest_for("work")
    assert manifest["extends"] == ["software-architecture"] and "code" in manifest["carries"]
    assert manifest["provides"] == {"commands": [{"name": "work", "module": "oto_work.cli", "label": "work and communication"}], "status": ["oto_work:status"]}
    assert not ontologies.manifest_for("communication").get("provides"), "communication extends work and brings no code of its own"
    assert extensions.code_dir("work") == os.path.join(ROOT, "ontology", "work", "code"), "the commands are the pack's own code"
    assert _work.__file__.startswith(os.path.join(ROOT, "ontology", "work", "code")), "the module the tests import is the pack's"
    assert _work.set_state and _work.board and _work.inbox and _work.remind and _work.status
    from oto import assertion as _assertion
    assert _work.WorkError is _assertion.WriteError, "the pack's refusal is the engine's"
    found = {c["name"]: c for c in extensions.commands()}
    assert found["work"]["module"] == "oto_work.cli" and found["work"]["pack"] == "work"
    code, out = _cli("work", "--help")
    assert code == 0 and "board" in out and "remind" in out, out
    code, out = _cli("--help")
    assert "  work " in out and "work and communication" in out, out
    for name in ("work", "communication"):
        assert ontologies.self_check(name) == [], (name, ontologies.self_check(name))
    work, _s, _r = ontologies.load("work")
    assert "WorkItem" in work["properties"]["governs"]["range"], "the plan widens the product's governs: a decision governs a work item"


def test_the_board_reaches_the_status_through_the_pack_s_hook(tmp_path):
    from oto import snapshot as _snapshot
    plan = str(tmp_path / "plan")
    with contextlib.redirect_stdout(io.StringIO()):
        init(plan, slug="plan", name="Plan", ontology="work")
    code, out = _cli("build", "--project", plan)
    assert code == 0, out
    project = Project.standard(plan)
    assert [h.__name__ for h in extensions.status_hooks(project)] == ["status"]
    s = _snapshot.build(project)
    assert "work" in s and set(s["work"]) >= {"open", "blocked", "deployed", "counts"}, "the board, under the key the pack chooses"


# ---- the shipped ontology ----

def _shipped():
    composed = ontologies.composed("work")
    return composed["config"], composed["sample"], composed["rules"]


def _derive(config, rules, nodes, edges):
    return engine.run(rules, nodes, edges, covers=_vocab.covers(config["classes"]), declared=questions.declared_names(config))


def test_the_work_sample_derives_every_state_from_its_transitions():
    config, sample, rules = _shipped()
    assert ontologies.self_check("work") == []
    for node in sample["nodes"]:
        if node["type"] == "WorkItem":
            assert "state" not in node["attributes"], "%s writes its state on the item" % node["id"]
    result = _derive(config, rules, sample["nodes"], sample["edges"])
    derived = {(a["node"], a["name"]): a["value"] for a in result["attributes"]}
    assert derived[("workitem.e-checkout", "state")] == "deployed"
    assert derived[("workitem.e-checkout", "deployed_to")] == "prod"
    assert derived[("workitem.t-ledger-replica", "state")] == "blocked"
    assert ("workitem.s-settlement-batch", "state") not in derived, "no transition: the default applies, nothing is derived"
    graph = match.Graph(sample["nodes"], sample["edges"], {}, declared=questions.declared_names(config))
    assert graph.attribute("workitem.s-settlement-batch", "state") == "open"
    assert [f for f in result["findings"] if f["severity"] == "blocking"] == []


def test_a_block_must_carry_its_reason_and_what_it_waits_on():
    config, sample, rules = _shipped()
    nodes = sample["nodes"] + [_node("transition.x-1", "Block", to="blocked", at="2026-10-20")]
    edges = sample["edges"] + [{"from": "transition.x-1", "rel": "transition_of", "to": "workitem.s-settlement-batch"}]
    found = {(f["kind"], f["subject"]) for f in shapes.findings(config, nodes, edges) if f["node"] == "transition.x-1"}
    assert ("requires", "reason") in found and ("requires", "waiting_on") in found
    nodes[-1]["attributes"]["to"] = "open"
    nodes[-1]["attributes"]["reason"] = "waiting for the contract"
    edges.append({"from": "transition.x-1", "rel": "waiting_on", "to": "team.payments"})
    assert shapes.findings(config, nodes, edges) == []
    blocking = [f for f in _derive(config, rules, nodes, edges)["findings"] if f["severity"] == "blocking"]
    assert [f["node"] for f in blocking] == ["transition.x-1"], "a block is a transition to blocked, and to nothing else"


def test_a_deployment_names_its_environment():
    config, sample, rules = _shipped()
    nodes = sample["nodes"] + [_node("transition.x-1", "Transition", to="deployed", at="2026-10-20")]
    edges = sample["edges"] + [{"from": "transition.x-1", "rel": "transition_of", "to": "workitem.s-settlement-batch"}]
    blocking = [f for f in _derive(config, rules, nodes, edges)["findings"] if f["severity"] == "blocking"]
    assert [f["node"] for f in blocking] == ["transition.x-1"]
    assert "environment" in blocking[0]["message"]


def test_a_transition_belongs_to_exactly_one_item():
    config, sample, _rules_ = _shipped()
    nodes = sample["nodes"] + [_node("transition.x-1", "Transition", to="open", at="2026-10-20")]
    found = shapes.findings(config, nodes, sample["edges"])
    assert [(f["kind"], f["node"]) for f in found] == [("min", "transition.x-1")]


def test_a_work_graph_written_before_the_rename_reads_as_the_new_states():
    config, sample, rules = _shipped()
    legacy = [_node("workitem.old-1", "WorkItem", kind="task", state="planned", due="2026-12-01"),
              _node("workitem.old-2", "WorkItem", kind="task", state="done"),
              _node("workitem.old-3", "WorkItem", kind="task", state="dropped")]
    report = _vocab.attribute_conformance(_vocab.Vocabulary.from_config(config), legacy)
    assert [m[0] for m in report["mistyped"]] == ["workitem.old-3"], "dropped has no successor: a dropped item is retired"
    graph = match.Graph(legacy, [], {}, declared=questions.declared_names(config))
    assert graph.attribute("workitem.old-1", "state") == "open"
    assert graph.attribute("workitem.old-2", "state") == "deployed"


# ---- `oto work set` ----

@pytest.fixture
def plan(tmp_path):
    root = str(tmp_path / "plan")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="plan", name="The plan", ontology="work")
    return root


def _graph(root):
    return session.live(Project.standard(root))


def _transitions(root, item):
    graph = _graph(root)
    of = {e["from"] for e in graph["edges"] if e["rel"] == "transition_of" and e["to"] == item}
    return sorted((n for n in graph["nodes"] if n["id"] in of), key=lambda n: n["id"])


def test_set_blocked_appends_a_block_and_the_build_derives_the_state(plan):
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked",
                     "--reason", "the acquirer's settlement file format is not published",
                     "--waiting-on", "team.payments", "--by", "Chiheb Dkhil", "--at", "2026-10-20", "--project", plan)
    assert code == 0, out
    assert "Daily settlement batch: open -> blocked" in out and "waiting on team.payments" in out
    added = _transitions(plan, "workitem.s-settlement-batch")
    assert [n["type"] for n in added] == ["Block"]
    block = added[0]
    assert block["attributes"] == {"to": "blocked", "at": "2026-10-20", "by": "Chiheb Dkhil",
                                   "reason": "the acquirer's settlement file format is not published"}
    assert block["source_type"] == "human_assertion" and block["sources"] and block["valid_from"] == "2026-10-20"
    assert not session.exists(Project.standard(plan)), "the command leaves no candidate behind"
    code, out = _cli("build", "--project", plan)
    assert code == 0, out
    code, out = _cli("query", "--project", plan, "ask", "WK11")
    assert code == 0 and "status: answered" in out, out
    assert "Daily settlement batch" in out and "Payments team" in out and "settlement file format" in out


def test_a_second_transition_supersedes_the_first_and_the_history_stays_readable(plan):
    for args in (("--state", "blocked", "--reason", "no test data", "--waiting-on", "role.r-compliance", "--at", "2026-10-20"),
                 ("--state", "open", "--at", "2026-10-24")):
        code, out = _cli("work", "set", "workitem.s-settlement-batch", "--by", "Chiheb Dkhil", "--project", plan, *args)
        assert code == 0, out
    first, second = _transitions(plan, "workitem.s-settlement-batch")
    assert first["status"] == "superseded" and first["valid_to"] == "2026-10-24" and first["superseded_by"] == second["id"]
    assert second["status"] == "current" and second["supersedes"] == first["id"] and second["valid_from"] == "2026-10-24"
    code, out = _cli("build", "--project", plan)
    assert code == 0, out
    code, out = _cli("query", "--project", plan, "ask", "WK11")
    assert "Daily settlement batch" not in out, "unblocked: the item is open again"
    code, out = _cli("query", "--project", plan, "entity", first["id"], "--as-of", "2026-10-22")
    assert "status=superseded" in out and "valid_to=2026-10-24" in out and "blocked" in out, out


def test_set_refuses_what_the_model_refuses(plan):
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "--reason" in out and "--waiting-on" in out
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "deployed", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "never by hand" in out
    code, out = _cli("work", "set", "workitem.nothing", "--state", "open", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "workitem.nothing" in out
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked", "--reason", "r",
                     "--waiting-on", "team.nobody", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "team.nobody" in out
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "open", "--by", "x", "--at", "yesterday", "--project", plan)
    assert code == 1 and "YYYY-MM-DD" in out
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "open", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "already open" in out
    assert _transitions(plan, "workitem.s-settlement-batch") == [], "nothing refused was written"


def test_set_names_the_item_by_label_and_refuses_an_ambiguous_name(plan):
    code, out = _cli("work", "set", "Daily settlement batch", "--state", "blocked", "--reason", "r",
                     "--waiting-on", "Payments", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 0, out
    assert _transitions(plan, "workitem.s-settlement-batch")[0]["attributes"]["to"] == "blocked"
    code, out = _cli("work", "set", "settlement", "--state", "open", "--by", "x", "--at", "2026-10-21", "--project", plan)
    assert code == 1 and "workitem.s-settlement-batch" in out and "workitem.s-evidence-retention" in out


def test_set_waits_for_an_open_candidate(plan):
    session.start(Project.standard(plan))
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "open", "--by", "x", "--at", "2026-10-20", "--project", plan)
    assert code == 1 and "candidate" in out


# ---- the board and the snapshot's work section (M5) ----

def test_the_board_groups_blocked_by_who_it_waits_on_and_deployed_by_environment(plan):
    board = _work.board(Project.standard(plan))
    assert board["counts"] == {"open": 2, "blocked": 1, "deployed": 1}
    assert [i["id"] for i in board["open"]] == ["workitem.s-settlement-batch", "workitem.s-evidence-retention"], "open, soonest due first"
    assert board["blocked"] == [{"id": "workitem.t-ledger-replica", "label": "Ledger read replica", "since": "2026-10-05",
                                 "reason": "the replica needs a second region, and the budget for it is not decided",
                                 "by": "Payments team lead", "transition": "transition.t-ledger-replica-1",
                                 "waiting_on": {"id": "person.m-okafor", "label": "Mina Okafor", "type": "Person"}}]
    assert board["deployed"] == [{"id": "workitem.e-checkout", "label": "Checkout payment, end to end", "environment": "prod", "at": "2026-10-01"}]
    code, out = _cli("work", "board", "--project", plan)
    assert code == 0, out
    assert "blocked (1)" in out and "Mina Okafor" in out and "Ledger read replica" in out and "since 2026-10-05" in out
    assert "deployed (1)" in out and "prod" in out and "open (2)" in out and "Daily settlement batch" in out
    code, out = _cli("work", "board", "--json", "--project", plan)
    assert code == 0 and json.loads(out)["counts"]["blocked"] == 1


def test_the_snapshot_carries_the_board_and_the_published_copy_shows_its_people_as_initials(plan):
    from oto import snapshot
    live = snapshot.build(Project.standard(plan))
    assert live["work"]["counts"] == {"open": 2, "blocked": 1, "deployed": 1}
    assert live["work"]["blocked"][0]["waiting_on"]["label"] == "Mina Okafor"
    out = snapshot.published(live)
    assert out["work"]["blocked"][0]["waiting_on"]["label"] == "M.O.", "a person a block waits on is a person the project names"
    assert out["work"]["blocked"][0]["by"] == "Payments team lead", "a role written where a name belongs is left"
    assert "Okafor" not in json.dumps(out)
    assert out["work"]["counts"] == live["work"]["counts"]


def test_a_project_without_work_items_has_no_board(tmp_path):
    from oto import snapshot
    root = str(tmp_path / "kb")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="kb", name="KB")
    assert snapshot.build(Project.standard(root)).get("work") is None, "no work pack, no board in the status (ADR-0006, step 5)"
    code, out = _cli("work", "board", "--project", root)
    assert code == 1 and "WorkItem" in out


# ---- notify: the first message, from a block to whom it waits on (M6) ----

@pytest.fixture
def comms(tmp_path):
    root = str(tmp_path / "comms")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="comms", name="Comms", ontology="communication")
    return root


def test_notify_writes_a_message_to_whom_the_block_waits_on_carrying_the_item_and_its_reason(comms):
    code, out = _cli("work", "notify", "workitem.t-ledger-replica", "--by", "Chiheb Dkhil", "--at", "2026-10-26",
                     "--due", "2026-10-30", "--body", "Can you decide the budget this week?", "--project", comms)
    assert code == 0, out
    assert "message.t-ledger-replica-2" in out and "to Mina Okafor" in out, "the sample already carries one message about it"
    graph = _graph(comms)
    message = next(n for n in graph["nodes"] if n["id"] == "message.t-ledger-replica-2")
    assert message["type"] == "Message" and message["source_type"] == "human_assertion"
    attributes = message["attributes"]
    assert "status" not in attributes, "pending is the default; the status is derived from the replies"
    assert attributes["sent"] == "2026-10-26" and attributes["due"] == "2026-10-30"
    assert attributes["from"] == "Chiheb Dkhil"
    assert "Ledger read replica" in attributes["body"] and "second region" in attributes["body"] and "since 2026-10-05" in attributes["body"]
    assert attributes["body"].endswith("Can you decide the budget this week?")
    edges = {(e["rel"], e["to"]) for e in graph["edges"] if e["from"] == message["id"]}
    assert edges == {("sent_to", "person.m-okafor"), ("regarding", "workitem.t-ledger-replica"), ("regarding", "transition.t-ledger-replica-1")}
    code, out = _cli("build", "--project", comms)
    assert code == 0, out
    code, out = _cli("query", "--project", comms, "ask", "CM1", "PERSON=person.m-okafor")
    assert code == 0 and "status: answered" in out and "Can you decide the budget this week?" in out, out


def test_notify_refuses_what_has_nobody_to_tell(comms, plan):
    code, out = _cli("work", "notify", "workitem.s-settlement-batch", "--by", "x", "--at", "2026-10-26", "--project", comms)
    assert code == 1 and "not blocked" in out
    code, out = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked", "--reason", "batch size undecided",
                     "--waiting-on", "decision.d-batch", "--by", "x", "--at", "2026-10-26", "--project", comms)
    assert code == 0, out
    code, out = _cli("work", "notify", "workitem.s-settlement-batch", "--by", "x", "--at", "2026-10-26", "--project", comms)
    assert code == 1 and "decision.d-batch" in out and "--to" in out, "it waits on a decision, not on someone"
    code, out = _cli("work", "notify", "workitem.s-settlement-batch", "--to", "Payments team", "--by", "x", "--at", "2026-10-26", "--project", comms)
    assert code == 0 and "to Payments team" in out, out
    code, out = _cli("work", "notify", "workitem.t-ledger-replica", "--by", "x", "--at", "2026-10-26", "--project", plan)
    assert code == 1 and "Message" in out and "communication" in out, "a work-only vocabulary has nowhere to put a message"


# ---- the inbox, replies, events and identity (N3, N4, a merged pull request) ----

def test_the_inbox_lists_what_is_pending_for_a_person_with_the_item_and_the_block(comms):
    code, out = _cli("work", "inbox", "--as", "Mina Okafor", "--project", comms)
    assert code == 0, out
    assert "1 pending for Mina Okafor" in out and "message.t-ledger-replica-1" in out and "Ledger read replica" in out
    assert "blocked since 2026-10-05" in out and "from Payments team lead" in out and "Can you decide the budget?" in out
    assert "oto work reply message.t-ledger-replica-1" in out
    code, out = _cli("work", "inbox", "--as", "Payments team", "--project", comms)
    assert code == 0 and "nothing pending for Payments team" in out
    code, out = _cli("work", "inbox", "--as", "nobody here", "--project", comms)
    assert code == 1 and "nobody here" in out


def test_a_reply_marks_the_message_replied_and_a_resolving_reply_resolves_it_and_unblocks_the_item(comms):
    code, out = _cli("work", "reply", "message.t-ledger-replica-1", "--body", "Looking at the budget now.",
                     "--by", "Mina Okafor", "--at", "2026-10-07", "--project", comms)
    assert code == 0, out
    assert "message.t-ledger-replica-2" in out and "replied" in out
    graph = _graph(comms)
    reply = next(n for n in graph["nodes"] if n["id"] == "message.t-ledger-replica-2")
    assert reply["attributes"]["outcome"] == "replied" and reply["attributes"]["from"] == "Mina Okafor"
    assert "status" not in reply["attributes"], "a message's status is derived, never asserted"
    edges = {(e["rel"], e["to"]) for e in graph["edges"] if e["from"] == reply["id"]}
    assert ("in_reply_to", "message.t-ledger-replica-1") in edges and ("regarding", "workitem.t-ledger-replica") in edges
    assert ("sent_by", "person.m-okafor") in edges, "the replier is a person the project knows"
    code, out = _cli("work", "inbox", "--as", "Mina Okafor", "--project", comms)
    assert "nothing pending" in out, "a replied message is no longer pending"
    current = [n for n in _transitions(comms, "workitem.t-ledger-replica") if n["status"] == "current"]
    assert current[0]["type"] == "Block", "a plain reply does not unblock"
    code, out = _cli("work", "reply", "message.t-ledger-replica-1", "--resolve", "--body", "Budget approved for one region.",
                     "--by", "Mina Okafor", "--at", "2026-10-08", "--project", comms)
    assert code == 0, out
    assert "resolved" in out and "blocked -> open" in out
    current = [n for n in _transitions(comms, "workitem.t-ledger-replica") if n["status"] == "current"]
    assert len(current) == 1 and current[0]["attributes"]["to"] == "open" and current[0]["attributes"]["by"] == "Mina Okafor"
    assert current[0]["attributes"]["at"] == "2026-10-08"
    code, out = _cli("build", "--project", comms)
    assert code == 0, out
    code, out = _cli("query", "--project", comms, "ask", "CM2", "ITEM=workitem.t-ledger-replica")
    assert "m.status=resolved" in out and "Budget approved" in out, out
    code, out = _cli("query", "--project", comms, "ask", "WK11")
    assert "Ledger read replica" not in out
    code, out = _cli("work", "reply", "message.t-ledger-replica-1", "--resolve", "--body", "again", "--by", "Mina Okafor", "--at", "2026-10-09", "--project", comms)
    assert code == 1 and "already resolved" in out
    code, out = _cli("work", "reply", "message.nothing", "--body", "x", "--by", "x", "--at", "2026-10-09", "--project", comms)
    assert code == 1 and "message.nothing" in out


def test_a_merged_pull_request_marks_the_item_deployed_once(plan):
    args = ("work", "event", "merged-pr", "--repo", "Cynergis/oto", "--number", "58", "--item", "workitem.s-settlement-batch",
            "--environment", "prod", "--at", "2026-10-25", "--project", plan)
    code, out = _cli(*args)
    assert code == 0, out
    assert "open -> deployed" in out and "Cynergis/oto#58" in out
    t = _transitions(plan, "workitem.s-settlement-batch")[0]
    assert t["attributes"] == {"to": "deployed", "at": "2026-10-25", "by": "pull request Cynergis/oto#58 merged",
                               "environment": "prod", "event": "github:Cynergis/oto#58"}
    code, out = _cli(*args)
    assert code == 0 and "already recorded" in out, out
    assert len(_transitions(plan, "workitem.s-settlement-batch")) == 1, "a second delivery appends nothing"
    code, out = _cli("build", "--project", plan)
    assert code == 0, out
    code, out = _cli("query", "--project", plan, "ask", "WK12")
    assert "Daily settlement batch" in out and "w.deployed_to=prod" in out
    code, out = _cli("work", "event", "merged-pr", "--repo", "Cynergis/oto", "--number", "59", "--item", "workitem.s-settlement-batch",
                     "--environment", "prod", "--at", "2026-10-26", "--project", plan)
    assert code == 0 and "already deployed to prod; nothing appended" in out, "an epic's later pull requests change no state"
    assert len(_transitions(plan, "workitem.s-settlement-batch")) == 1
    code, out = _cli("work", "event", "merged-pr", "--repo", "Cynergis/oto", "--number", "60", "--item", "workitem.t-ledger-replica",
                     "--environment", "qa", "--at", "2026-10-26", "--project", plan)
    assert code == 0 and "blocked -> deployed" in out, "a deployment lifts a block: the item is where the event put it"


def test_identity_from_git_maps_to_a_person(comms, plan):
    import subprocess
    live = _graph(comms)
    assert _work.person_for(live, "Mina Okafor <mina@example.com>")["id"] == "person.m-okafor", "by name when no email is recorded"
    assert _work.person_for(live, "Someone Else <x@example.com>") is None
    for n in live["nodes"]:
        if n["id"] == "person.m-okafor":
            n["attributes"]["email"] = "mina@example.com"
    assert _work.person_for(live, "M. Okafor <MINA@example.com>")["id"] == "person.m-okafor", "by email, whatever the name, case aside"
    subprocess.run(["git", "init", "-q"], cwd=comms, check=True)
    subprocess.run(["git", "config", "user.name", "Mina Okafor"], cwd=comms, check=True)
    subprocess.run(["git", "config", "user.email", "mina@example.com"], cwd=comms, check=True)
    code, out = _cli("work", "inbox", "--project", comms)
    assert code == 0 and "1 pending for Mina Okafor" in out, out
    code, out = _cli("work", "inbox", "--hook", "--project", comms)
    assert code == 0 and "message.t-ledger-replica-1" in out, "the hook prints what waits"
    code, out = _cli("work", "inbox", "--hook", "--project", plan)
    assert code == 0 and out == "", "no Message in the vocabulary: the hook is silent"
    code, out = _cli("work", "inbox", "--hook", "--project", os.path.join(plan, "nowhere"))
    assert code == 0 and out == "", "not a project: the hook is silent"
    code, out = _cli("work", "reply", "message.t-ledger-replica-1", "--body", "On it.", "--at", "2026-10-07", "--project", comms)
    assert code == 0 and "by Mina Okafor" in out, "--by defaults to the git identity"


def test_the_plugin_opens_a_session_with_the_inbox():
    with open(os.path.join(ROOT, "hooks", "hooks.json"), encoding="utf-8") as f:
        hooks = json.load(f)
    commands = [h["command"] for group in hooks["hooks"]["SessionStart"] for h in group["hooks"]]
    assert any("oto work inbox --hook" in c and c.rstrip().endswith("|| true") for c in commands), commands
    with open(os.path.join(ROOT, "skills", "work", "SKILL.md"), encoding="utf-8") as f:
        skill = f.read()
    for command in ("oto work set", "oto work board", "oto work notify", "oto work inbox", "oto work reply"):
        assert command in skill, command


# ---- every write of the pack is on the audit chain, under the git identity when nobody is named ----

def test_the_work_pack_records_what_it_applied_and_what_it_refused(comms):
    plan = comms
    code, _ = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked", "--reason", "r", "--waiting-on", "team.payments",
                   "--by", "Chiheb Dkhil", "--at", "2026-10-20", "--project", plan)
    assert code == 0
    code, _ = _cli("work", "set", "workitem.s-settlement-batch", "--state", "blocked", "--by", "Chiheb Dkhil", "--at", "2026-10-21", "--project", plan)
    assert code == 1
    code, _ = _cli("work", "notify", "workitem.s-settlement-batch", "--by", "Chiheb Dkhil", "--at", "2026-10-21", "--project", plan)
    assert code == 0
    code, _ = _cli("work", "event", "merged-pr", "--repo", "Cynergis/oto", "--number", "7", "--item", "workitem.s-evidence-retention",
                   "--environment", "prod", "--at", "2026-10-22", "--project", plan)
    assert code == 0
    records = audit.read(Project.standard(plan))
    assert [(r["action"], r["decision"]) for r in records] == [("work set", "applied"), ("work set", "refused"), ("work notify", "applied"), ("work event", "applied")]
    assert records[0]["principal"] == "Chiheb Dkhil" and "transition.s-settlement-batch-1" in records[0]["nodes"] and "workitem.s-settlement-batch" in records[0]["nodes"]
    assert records[1]["nodes"] == ["workitem.s-settlement-batch"] and "--reason" in records[1]["detail"]
    assert "message.t-ledger-replica-1" not in records[2]["nodes"] and any(n.startswith("message.") for n in records[2]["nodes"])
    assert records[3]["principal"] == "pull request Cynergis/oto#7 merged" and records[3]["detail"].startswith("github:")
    assert records[0]["graph"] != records[2]["graph"], "the graph's version moved between the two writes"
    assert audit.verify(Project.standard(plan))["ok"]


def test_the_principal_is_the_git_identity_when_nobody_is_named(comms):
    subprocess.run(["git", "init", "-q"], cwd=comms, check=True)
    subprocess.run(["git", "config", "user.name", "Mina Okafor"], cwd=comms, check=True)
    subprocess.run(["git", "config", "user.email", "mina@example.com"], cwd=comms, check=True)
    code, out = _cli("work", "reply", "message.t-ledger-replica-1", "--body", "On it.", "--at", "2026-10-07", "--project", comms)
    assert code == 0, out
    assert audit.read(Project.standard(comms))[-1]["principal"].startswith("Mina Okafor"), "the git identity, name and email"
