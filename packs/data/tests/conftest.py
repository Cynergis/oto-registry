"""The data pack's tests run against an installed engine (oto-kg, 0.14.7 or later), this pack and the registry's packs beside it: the engine
finds the ontologies, with the pack's code, under ontology/ here, as it would under an installed plugin, and
the tests import that code the way the engine will put it on the path."""
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ["OTO_PACKS"] = os.path.dirname(HERE)      # the registry's packs beside this one: a test that composes another vocabulary (organization-process) finds its pack, since the engine ships none (ADR-0011)
os.environ.setdefault("CLAUDE_CONFIG_DIR", os.path.join(HERE, ".no-claude-config"))
for name in ("data",):
    code = os.path.join(HERE, "ontology", name, "code")
    if code not in sys.path:
        sys.path.insert(0, code)
