---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Engagements: scope, deliverables, governance, sessions, decisions and the work that follows. The pack 'professional-services' (release 3) embeds the ontology 'professional-services' (release 3), which declares Engagement, Organization, Person, Role, Workstream, Deliverable, GovernanceForum, Session and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Engagement Knowledge Base

Engagements: scope, deliverables, governance, sessions, decisions and the work that follows.

This skill comes with the `professional-services` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add professional-services` from the cynergis registry), `oto init --pack professional-services` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed.

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Engagement**: A contracted body of work between a supplier and a client, with a scope and a period.
- **Organization**: A company or a unit within one: the client, the supplier, a division, a function.
- **Person**: A named individual. Consider carefully whether you need this class at all; see the README.
- **Role**: A defined function in the target operating model or the delivery team. Filled by a person.
- **Workstream**: One scope area of the engagement, with its own plan and owner.
- **Deliverable**: A contracted artifact with a due date and an acceptance condition.
- **GovernanceForum**: A recurring body that decides or validates: a steering committee, a working group, a review board.
- **Session**: A dated event that produced something: an interview, a workshop, a meeting. Distinct from the transcript recording it.
- **Decision**: A choice made, proposed or deferred, with its reason. Superseded by a later decision, never overwritten.
- **ActionItem**: A committed task arising from a session or a decision, with an owner and a state.
- **Question**: An open question raised and not yet answered, with an owner.
- **Concept**: A construct the engagement designs or adopts: an operating model element, a way of working, a capability.
- **Framework**: A reusable method or model brought to the engagement rather than invented in it.
- **Document**: A source document in the corpus: a contract, a deck, a transcript, a plan.
