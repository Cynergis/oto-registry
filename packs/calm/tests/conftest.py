"""The calm pack's tests run against an installed engine (oto-kg, 0.14.2 or later) and this pack: the
engine finds the calm ontology, with its code, under ontology/ here, as it would under an installed
plugin, and the tests import that code the way the engine will put it on the path."""
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ["OTO_ONTOLOGIES"] = os.path.join(HERE, "ontology")
os.environ["OTO_PACKS"] = os.path.dirname(HERE)      # the registry's packs beside this one: the policy and data packs the policy test composes resolve as installed packs
os.environ.setdefault("CLAUDE_CONFIG_DIR", os.path.join(HERE, ".no-claude-config"))
CODE = os.path.join(HERE, "ontology", "calm", "code")
if CODE not in sys.path:
    sys.path.insert(0, CODE)
ARCHITECTURE_CODE = os.path.join(os.path.dirname(HERE), "architecture", "ontology", "architecture", "code")   # oto arch and the reified model's names (ADR-0011)
if os.path.isdir(ARCHITECTURE_CODE) and ARCHITECTURE_CODE not in sys.path:
    sys.path.insert(0, ARCHITECTURE_CODE)
