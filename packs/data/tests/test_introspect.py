"""`oto data introspect` (roadmap C1): a store's catalog, read in place through an overlay connector, turned
into a proposal in the data vocabulary, cited to a schema document, that goes through the gates like any
other change. The connectors themselves are the engine's and are tested there; this file is the data pack's
use of them, from SQLite (the reference overlay, in the stdlib) and from a recorded Postgres catalog."""
import contextlib
import io
import json
import os
import sqlite3

import pytest

from oto import connectors
import oto_data as data
from oto.cli import main
from oto.connectors import conformance
from oto.curate import session
from oto.project import Project
from oto.scaffold import init

LEDGER_SQL = """
CREATE TABLE accounts (
  account_id INTEGER PRIMARY KEY,
  currency   CHAR(3) NOT NULL
);
CREATE TABLE postings (
  posting_id   INTEGER PRIMARY KEY,
  account_id   INTEGER NOT NULL REFERENCES accounts(account_id),
  amount_cents BIGINT NOT NULL,
  posted_at    TEXT
);
CREATE VIEW daily_balances AS
  SELECT account_id, date(posted_at) AS day, sum(amount_cents) AS balance_cents FROM postings GROUP BY 1, 2;
INSERT INTO accounts VALUES (1, 'CAD'), (2, 'USD');
INSERT INTO postings VALUES (10, 1, 1250, '2026-10-01 09:00'), (11, 1, -250, '2026-10-02 09:00'), (12, 2, 900, '2026-10-02 10:00');
"""


def _cli(*args):
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        code = main(list(args))
    return code, out.getvalue()


@pytest.fixture
def ledger_db(tmp_path):
    path = str(tmp_path / "ledger.sqlite")
    con = sqlite3.connect(path)
    con.executescript(LEDGER_SQL)
    con.commit()
    con.close()
    return path


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURES = os.path.join(ROOT, "tests", "fixtures", "overlay")


def _seed_store(root, store_id, name):
    """The estate declares the store before the data layer describes it: a DataStore that runs in an
    environment, through the gates."""
    path = os.path.join(root, "seed-%s.json" % store_id.split(".", 1)[1])
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"source_doc": "estate", "as_of": "2026-10-01", "nodes": [
            {"id": "environment.production", "type": "Environment", "label": "Production", "attributes": {}},
            {"id": store_id, "type": "DataStore", "label": name, "attributes": {}}],
            "edges": [{"from": store_id, "rel": "runs_in", "to": "environment.production"}]}, f)
    for step in (("curate", "start"), ("curate", "add", "--from", path), ("curate", "check"), ("curate", "apply", "--by", "Sam Lee", "--note", "the store")):
        code, out = _cli(*step, "--project", root)
        assert code == 0, out


def _fixture(name):
    with open(os.path.join(FIXTURES, name), encoding="utf-8") as f:
        return json.load(f)


# ---- a fake Postgres connection: DB-API 2.0, replaying recorded rows ----

class FakeCursor:
    def __init__(self, con):
        self.con, self.rows, self.description = con, [], None

    def execute(self, sql, params=None):
        self.con.executed.append(sql.strip())
        text = sql.strip()
        fx = self.con.fixture
        if text.startswith("START TRANSACTION") or text == "ROLLBACK":
            self.rows = []
        elif "information_schema.tables" in text:
            self.rows = fx["tables"]
        elif "information_schema.columns" in text:
            self.rows = fx["columns"]
        elif "table_constraints" in text:
            self.rows = fx["keys"]
        elif "pg_extension" in text:
            self.rows = fx.get("extension", [])
        elif "pg_stat_statements" in text:
            self.rows = fx["log"]
        elif text in fx["queries"]:
            self.rows = fx["queries"][text]["rows"]
            self.description = [(c,) for c in fx["queries"][text]["columns"]]
        elif re.match(r"(?i)^(select|with)\b", text):
            raise RuntimeError('relation "nothing_here" does not exist')
        else:
            raise RuntimeError("cannot execute %s in a read-only transaction" % text.split()[0].upper())

    def fetchall(self):
        return list(self.rows)

    def fetchmany(self, n):
        return list(self.rows[:n])

    def close(self):
        pass


class FakePostgres:
    def __init__(self, fixture):
        self.fixture, self.executed, self.closed = fixture, [], False

    def cursor(self):
        return FakeCursor(self)

    def rollback(self):
        self.executed.append("ROLLBACK")

    def close(self):
        self.closed = True



# ---- oto data introspect ----

@pytest.fixture
def described(tmp_path, ledger_db):
    """A data project whose estate declares the ledger store, with the fixture ledger introspected."""
    root = str(tmp_path / "described")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="described", name="The ledger, described", ontology="data", empty=True)
    _seed_store(root, "datastore.ledger", "Ledger database")
    code, out = _cli("data", "introspect", "--path", ledger_db, "--store", "datastore.ledger", "--at", "2026-10-26", "--project", root)
    assert code == 0, out
    return root, out


def test_introspect_writes_the_schema_document_and_a_proposal_cited_to_it(described):
    root, out = described
    assert "schema-ledger" in out and "proposals/schema-ledger.json" in out and "curate add" in out, out
    corpus = os.path.join(root, "build", "documents", "schema-ledger.md")
    assert os.path.exists(corpus), "the snapshot went through ingest: it is in the corpus, so the quotes can be checked"
    text = open(corpus, encoding="utf-8").read()
    assert "## postings (table)" in text and "account_id INTEGER not null references accounts.account_id" in text, text
    with open(os.path.join(root, "proposals", "schema-ledger.json"), encoding="utf-8") as f:
        proposal = json.load(f)
    assert proposal["source_doc"] == "schema-ledger" and proposal["as_of"] == "2026-10-26"
    nodes = {n["id"]: n for n in proposal["nodes"]}
    assert nodes["table.ledger-postings"]["type"] == "Table" and nodes["table.ledger-postings"]["attributes"] == {"kind": "table"}
    assert nodes["table.ledger-daily-balances"]["attributes"] == {"kind": "view"}
    column = nodes["column.ledger-postings-account-id"]
    assert column["type"] == "Column" and column["label"] == "account_id"
    assert column["attributes"] == {"type": "INTEGER", "nullable": False, "key": "foreign"}
    assert column["evidence"] == [{"doc": "schema-ledger", "where": "postings", "quote": "account_id INTEGER not null references accounts.account_id"}]
    assert "description" not in column["attributes"] and "description_status" not in column["attributes"], "meaning is not the catalog's to say: it stays a draft for an agent and a person (C2)"
    assert "datastore.ledger" not in nodes, "the store is the estate's, declared before the data layer describes it"
    assert nodes["document.schema-ledger"]["type"] == "Document" and nodes["document.schema-ledger"]["attributes"] == {"kind": "schema"}
    edges = {(e["from"], e["rel"], e["to"]) for e in proposal["edges"]}
    assert ("column.ledger-postings-account-id", "column_of", "table.ledger-postings") in edges
    assert ("column.ledger-postings-account-id", "references", "column.ledger-accounts-account-id") in edges
    assert ("table.ledger-postings", "part_of", "datastore.ledger") in edges and ("table.ledger-daily-balances", "part_of", "datastore.ledger") in edges
    assert all(n.get("source_type", "extraction") in ("extraction", "observation") for n in proposal["nodes"])


def _through_the_gates(root):
    code, out = _cli("curate", "start", "--project", root)
    assert code == 0, out
    code, out = _cli("curate", "add", "--from", os.path.join(root, "proposals", "schema-ledger.json"), "--project", root)
    assert code == 0, out
    code, out = _cli("curate", "check", "--project", root)
    assert code == 0 and "blocking" not in out and "not in the document" not in out, out
    code, out = _cli("curate", "apply", "--by", "Sam Lee", "--note", "the ledger's schema", "--project", root)
    assert code == 0, out
    code, out = _cli("build", "--project", root)
    assert code == 0, out


def test_the_schema_goes_through_the_gates_and_the_graph_answers_what_the_store_holds(described):
    root, _out = described
    _through_the_gates(root)
    graph = session.live(Project.standard(root))
    kinds = {}
    for n in graph["nodes"]:
        kinds[n["type"]] = kinds.get(n["type"], 0) + 1
    assert kinds["Table"] == 3 and kinds["Column"] == 9 and kinds["DataStore"] == 1 and kinds.get("Document") == 1 and kinds["Environment"] == 1, kinds
    code, out = _cli("query", "--project", root, "ask", "DT5", "STORE=datastore.ledger")
    assert code == 0 and "status: answered" in out and "postings" in out and "t.kind=view" in out, out
    code, out = _cli("query", "--project", root, "ask", "DT1", "TABLE=table.ledger-postings")
    assert code == 0 and "status: answered" in out and "c.key=foreign" in out and "c.type=INTEGER" in out, out
    code, out = _cli("query", "--project", root, "ask", "DT4")
    assert code == 0 and "posting_id" in out, "every introspected meaning is a draft until a person says otherwise"
    code, out = _cli("ontology", "check", "--project", root)
    assert code == 0 and "every node satisfies them" in out, out
    code, out = _cli("audit", "log", "--project", root)
    assert code == 0 and "curate apply" in out


def test_introspecting_again_an_unchanged_store_changes_nothing(described, ledger_db):
    root, _out = described
    _through_the_gates(root)
    before = session.live(Project.standard(root))
    code, out = _cli("data", "introspect", "--path", ledger_db, "--store", "datastore.ledger", "--at", "2026-10-27", "--project", root)
    assert code == 0, out
    _through_the_gates(root)
    after = session.live(Project.standard(root))
    assert len(after["nodes"]) == len(before["nodes"]) and len(after["edges"]) == len(before["edges"]), "the same catalog twice is one set of facts"


def test_introspect_refuses_a_vocabulary_without_tables_and_a_missing_store(tmp_path, ledger_db):
    plain = str(tmp_path / "plain")
    with contextlib.redirect_stdout(io.StringIO()):
        init(plain, slug="plain", name="Plain", ontology="organization-process")
    code, out = _cli("data", "introspect", "--path", ledger_db, "--store", "datastore.ledger", "--at", "2026-10-26", "--project", plain)
    assert code == 1 and "Table" in out and "data" in out, out
    root = str(tmp_path / "d")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="d", name="D", ontology="data", empty=True)
    code, out = _cli("data", "introspect", "--path", str(tmp_path / "nothing.sqlite"), "--store", "datastore.x", "--at", "2026-10-26", "--project", root)
    assert code == 1 and "nothing.sqlite" in out, out
    code, out = _cli("data", "introspect", "--path", ledger_db, "--store", "datastore.ledger", "--project", root)
    assert code == 1 and "--at" in out, "the date is never defaulted"
    code, out = _cli("data", "introspect", "--path", ledger_db, "--store", "datastore.ledger", "--at", "2026-10-26", "--project", root)
    assert code == 1 and "datastore.ledger" in out and "estate" in out, "the store is declared before it is described"
    assert not os.path.exists(os.path.join(root, "proposals", "schema-ledger.json")) and not os.path.exists(os.path.join(root, "build", "documents", "schema-ledger.md"))


def test_introspect_defaults_to_the_project_s_own_store(tmp_path):
    """Dogfood: with no --path, the project's own built store is the schema described."""
    root = str(tmp_path / "self")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="self", name="Self", ontology="data")
    code, out = _cli("build", "--project", root)
    assert code == 0, out
    _seed_store(root, "datastore.self", "This project's own store")
    code, out = _cli("data", "introspect", "--store", "datastore.self", "--at", "2026-10-26", "--project", root)
    assert code == 0, out
    with open(os.path.join(root, "proposals", "schema-self.json"), encoding="utf-8") as f:
        proposal = json.load(f)
    ids = {n["id"] for n in proposal["nodes"]}
    assert "table.self-nodes" in ids and "table.self-edges" in ids, sorted(ids)[:10]


# ---- from a recorded Postgres catalog ----

def test_the_postgres_catalog_flows_into_a_schema_proposal(tmp_path):
    root = str(tmp_path / "pgdata")
    with contextlib.redirect_stdout(io.StringIO()):
        init(root, slug="pgdata", name="The ledger in Postgres", ontology="data", empty=True)
    _seed_store(root, "datastore.ledger", "Ledger database")
    fake = FakePostgres(_fixture("postgres-ledger.json"))
    done = data.introspect(Project.standard(root), connector_name="postgres", store_id="datastore.ledger", at="2026-10-26",
                           settings={"connection": fake, "schema": "public", "name": "ledger"})
    assert done["tables"] == 3 and done["columns"] == 9
    with open(done["proposal"], encoding="utf-8") as f:
        proposal = json.load(f)
    column = next(n for n in proposal["nodes"] if n["id"] == "column.ledger-postings-posted-at")
    assert column["attributes"] == {"type": "timestamp without time zone", "nullable": True}
    assert "Read from the postgres catalog" in open(done["document"], encoding="utf-8").read()
