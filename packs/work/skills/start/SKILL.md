---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: What is planned, by whom, blocked by what: work items and milestones over the product's requirements, features and components; what slips when a component is late, what is overdue, what waits on a decision. The pack 'work' (release 1) embeds the ontology 'work' (release 1), which declares WorkItem, Milestone. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Work

What is planned, by whom, blocked by what: work items and milestones over the product's requirements, features and components; what slips when a component is late, what is overdue, what waits on a decision.

This skill comes with the `work` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add work` from the cynergis registry), `oto init --pack work` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed.

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **WorkItem**: A unit of planned work: an epic, a story, a task or a bug, with a state and a due date. It delivers something the product specifies or the estate holds; it is assigned to a team or a role; it may be blocked.
- **Milestone**: A dated point the plan aims at: a demo, a cut-off, a go-live. Work is scheduled in milestones as it is in releases; a release ships, a milestone is reached.
