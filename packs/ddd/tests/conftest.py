"""The ddd pack's tests run against an installed engine (oto-kg, 0.14.7 or later) and this pack: the
engine finds the ddd ontology, with its code, under ontology/ here, as it would under an installed
plugin, and the tests import that code the way the engine will put it on the path. The registry's other
packs, beside this one, resolve as installed packs (the data pack, whose `confirm` the sign-off test runs
against). The plain framework a test imports a model through (its adapter reads a file that is already
the reified model) sits under tests/fixtures/packs and is listed as an installed plugin of a throwaway
Claude Code config, the other way the engine finds a pack."""
import json
import os
import sys
import tempfile

import pytest

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ["OTO_PACKS"] = os.path.dirname(HERE)
CONFIG = tempfile.mkdtemp(prefix="ddd-tests-claude-")
os.makedirs(os.path.join(CONFIG, "plugins"))
with open(os.path.join(CONFIG, "plugins", "installed_plugins.json"), "w", encoding="utf-8") as f:
    json.dump({"plugins": {"plain-framework@tests": [{"installPath": os.path.join(HERE, "tests", "fixtures", "packs", "plain-framework")}]}}, f)
os.environ["CLAUDE_CONFIG_DIR"] = CONFIG
CODE = os.path.join(HERE, "ontology", "ddd", "code")
if CODE not in sys.path:
    sys.path.insert(0, CODE)
ARCHITECTURE_CODE = os.path.join(os.path.dirname(HERE), "architecture", "ontology", "architecture", "code")   # oto arch, which the plain framework imports through (ADR-0011)
if os.path.isdir(ARCHITECTURE_CODE) and ARCHITECTURE_CODE not in sys.path:
    sys.path.insert(0, ARCHITECTURE_CODE)
PLAIN_MODEL = os.path.join(HERE, "tests", "fixtures", "invoice-platform.model.json")


@pytest.fixture
def plain_framework():
    """The `plain` framework, a pack under tests/fixtures/packs: its code put on the path by the engine."""
    return PLAIN_MODEL
