---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: The plan as facts: work items and milestones over the product's requirements, features and components, each open, blocked (on whom, why) or deployed, the state derived from dated transitions and never written on the item; messages beside the item they are about (the communication ontology, on work): a notification from a block to whom it waits on, the inbox a session opens with, replies that lift the block, reminders past a due date. oto work set, board, notify, inbox, reply, event and remind come with the pack; the engine ships no work of its own. The pack 'work' (release 8) embeds the ontology 'work' (release 7), which declares WorkItem, Milestone, Transition, Block, Person. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Work

The plan as facts: work items and milestones over the product's requirements, features and components, each open, blocked (on whom, why) or deployed, the state derived from dated transitions and never written on the item; messages beside the item they are about (the communication ontology, on work): a notification from a block to whom it waits on, the inbox a session opens with, replies that lift the block, reminders past a due date. oto work set, board, notify, inbox, reply, event and remind come with the pack; the engine ships no work of its own.

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
   - **work:work**: Keep the plan as facts.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **WorkItem**: A unit of planned work: an epic, a story, a task or a bug, with a due date. It is open, blocked or deployed, and the state is never written on it: a Transition is appended and the state follows the current one. It delivers something the product specifies or the estate holds; it is assigned to a team or a role.
- **Milestone**: A dated point the plan aims at: a demo, a cut-off, a go-live. Work is scheduled in milestones as it is in releases; a release ships, a milestone is reached.
- **Transition**: A change of a work item's state, recorded when it happened: to which state, when, by whom, and for a deployment to which environment. Appended, never edited; the previous transition is superseded, so the item's history is the chain and its state is the current one.
- **Block**: A transition to blocked with its context: why, since when (its date), raised by whom (its author), and whom or what it waits on. Without a reason and a waiting-on it is not a block.
- **Person**: A named individual: who raised a block, whom an item waits on, who is to be told. Named where a role or a team would not say who to ask.
