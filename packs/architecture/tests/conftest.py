"""The architecture pack's tests run against an installed engine (oto-kg, 0.15.0 or later: the first that
ships no domain vocabulary, ADR-0011) and this pack: the engine finds the architecture ontology, with its
code, under ontology/ here, as it would under an installed plugin, and the tests import that code the way
the engine puts it on the path. The registry's other packs, beside this one, resolve as installed packs.
The plain framework a test imports a model through (its adapter reads a file that is already the reified
model) sits under tests/fixtures/packs and is listed as an installed plugin of a throwaway Claude Code
config, the other way the engine finds a pack."""
import importlib
import json
import os
import sys
import tempfile

import pytest

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ["OTO_PACKS"] = os.path.dirname(HERE)
CONFIG = tempfile.mkdtemp(prefix="architecture-tests-claude-")
os.makedirs(os.path.join(CONFIG, "plugins"))
with open(os.path.join(CONFIG, "plugins", "installed_plugins.json"), "w", encoding="utf-8") as f:
    json.dump({"plugins": {"plain-framework@tests": [{"installPath": os.path.join(HERE, "tests", "fixtures", "packs", "plain-framework")}]}}, f)
os.environ["CLAUDE_CONFIG_DIR"] = CONFIG
CODE = os.path.join(HERE, "ontology", "architecture", "code")
if CODE not in sys.path:
    sys.path.insert(0, CODE)
PLAIN_MODEL = os.path.join(HERE, "tests", "fixtures", "invoice-platform.model.json")


@pytest.fixture
def plain_framework():
    """The `plain` framework, a pack under tests/fixtures/packs: its code put on the path by the engine."""
    return PLAIN_MODEL


def served_engine(project):
    """The engine's serve module reloaded on a built project, as `oto serve` starts it: the pack's tool mounted."""
    os.environ["OTO_DB"] = project.layout.database
    os.environ["OTO_PROJECT_CONFIG"] = project.config_path
    os.environ.pop("OTO_STORE", None)
    from oto.serve import engine
    return importlib.reload(engine)
