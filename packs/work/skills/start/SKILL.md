---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: What is planned, by whom, blocked by what: work items and milestones over the product's requirements, features and components; what slips when a component is late, what is overdue, what waits on a decision. The pack 'work' (release 5) embeds the ontology 'work' (release 1), which declares WorkItem, Milestone. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Work

What is planned, by whom, blocked by what: work items and milestones over the product's requirements, features and components; what slips when a component is late, what is overdue, what waits on a decision.

This skill comes with the `work` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add work` from the cynergis registry), `oto init --pack work` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **work:feature-flow**: Governed, gated process for adding or changing a product feature, read from the knowledge base.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **WorkItem**: A unit of planned work: an epic, a story, a task or a bug, with a state and a due date. It delivers something the product specifies or the estate holds; it is assigned to a team or a role; it may be blocked.
- **Milestone**: A dated point the plan aims at: a demo, a cut-off, a go-live. Work is scheduled in milestones as it is in releases; a release ships, a milestone is reached.
