---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Suppliers and who to reach at each: a throwaway pack for the end-to-end test of connected graphs. The pack 'e2e-suppliers' (release 1) embeds the ontology 'e2e-suppliers' (release 1), which declares Contact, Supplier. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# e2e-suppliers

Suppliers and who to reach at each: a throwaway pack for the end-to-end test of connected graphs.

This skill comes with the `e2e-suppliers` pack. The ontology is inside the pack, so nothing is fetched.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add e2e-suppliers` from the cynergis registry), `oto init --pack e2e-suppliers` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Contact**: A person to reach at a supplier.
- **Supplier**: A company we buy from.
