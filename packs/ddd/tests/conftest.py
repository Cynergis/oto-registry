"""The ddd pack's tests run against an installed engine (oto-kg, 0.14.7 or later) and this pack: the
engine finds the ddd ontology, with its code, under ontology/ here, as it would under an installed
plugin, and the tests import that code the way the engine will put it on the path. The plain
framework a test imports a model through (its adapter reads a file that is already the reified model)
sits under tests/fixtures/packs as a pack of its own, found through OTO_PACKS."""
import os
import sys

import pytest

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ["OTO_PACKS"] = os.path.join(HERE, "tests", "fixtures", "packs")
os.environ.setdefault("CLAUDE_CONFIG_DIR", os.path.join(HERE, ".no-claude-config"))
CODE = os.path.join(HERE, "ontology", "ddd", "code")
if CODE not in sys.path:
    sys.path.insert(0, CODE)
PLAIN_MODEL = os.path.join(HERE, "tests", "fixtures", "invoice-platform.model.json")


@pytest.fixture
def plain_framework():
    """The `plain` framework, a pack under tests/fixtures/packs: its code put on the path by the engine."""
    return PLAIN_MODEL
