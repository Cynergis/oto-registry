---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: How an organization works: units, roles, processes, policies, systems and measures. The pack 'organization-process' (release 3) embeds the ontology 'organization-process' (release 3), which declares Unit, Role, Process, Step, Policy, System, Measure, Decision and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Operations Knowledge Base

How an organization works: units, roles, processes, policies, systems and measures.

This skill comes with the `organization-process` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add organization-process` from the cynergis registry), `oto init --pack organization-process` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed.

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Unit**: An organizational unit: a division, a department, a team.
- **Role**: A defined function someone performs. Attach work to a role, not a person.
- **Process**: A repeatable way of getting something done, made of steps.
- **Step**: One action within a process, with an owner and an input and output.
- **Policy**: A rule that constrains how work is done, internal or imposed.
- **System**: A tool or application the work runs on.
- **Measure**: Something the organization tracks to know whether the work is working.
- **Decision**: A choice made, with its reason and date. Superseded by a later one, never overwritten.
- **Document**: A source document in the corpus.
