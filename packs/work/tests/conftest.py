"""The work pack's tests run against an installed engine (oto-kg, 0.14.7 or later) and this pack: the
engine finds the work and communication ontologies, with the pack's code, under ontology/ here, as it
would under an installed plugin, and the tests import that code the way the engine will put it on the
path. The roadmap scenario under tests/scenarios runs through the scenario runner beside it."""
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ.setdefault("OTO_PACKS", os.path.join(HERE, ".no-user-packs"))
os.environ.setdefault("CLAUDE_CONFIG_DIR", os.path.join(HERE, ".no-claude-config"))
CODE = os.path.join(HERE, "ontology", "work", "code")
if CODE not in sys.path:
    sys.path.insert(0, CODE)
