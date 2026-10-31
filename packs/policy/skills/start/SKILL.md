---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Access policy as facts on the data layer: a rule permits or forbids a permission for the roles and teams it names, a table or a column says how it is classified and whether it holds personal data, a principal holds roles and an agent is granted them; the active rules compile into a signed Cedar bundle, a signed snapshot of what an agent may do for a principal that the engine's guards and write hooks hold a session to, and the platform's IAM bindings derived and never enforced. oto policy compile, snapshot, iam, verify, list and denials come with the pack, with its two build stages and its write and read hooks; the engine ships no policy of its own. The pack 'policy' (release 2) embeds the ontology 'policy' (release 5), which declares PolicyRule, Permission, Principal, IamBinding. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Policy

Access policy as facts on the data layer: a rule permits or forbids a permission for the roles and teams it names, a table or a column says how it is classified and whether it holds personal data, a principal holds roles and an agent is granted them; the active rules compile into a signed Cedar bundle, a signed snapshot of what an agent may do for a principal that the engine's guards and write hooks hold a session to, and the platform's IAM bindings derived and never enforced. oto policy compile, snapshot, iam, verify, list and denials come with the pack, with its two build stages and its write and read hooks; the engine ships no policy of its own.

This skill comes with the `policy` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add policy` from the cynergis registry), `oto init --pack policy` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **PolicyRule**: One rule of the access policy: it permits or forbids one permission for the roles and teams it names, on every resource the permission's selector admits or only on the resources it singles out. A draft until a named person activates it; a retired one stays as history. Active rules compile into the policy bundle, most urgent (highest priority) first; a forbid outranks a permit.
- **Permission**: An action on a kind of resource: read, write, export, delete or admin, on a class of the vocabulary (Table, Column, DataStore, Component, Interface), narrowed by a selector over the resource's attributes (`pii=false`, `classification!=restricted`). A permission is what rules grant or refuse; it holds no roles itself.
- **Principal**: An identity that holds a session: a person's account or a service account, the one on whose behalf an agent acts. It holds roles; what it may do is what the active rules say about those roles, and what an agent may do for it is the intersection of the agent's own grants with its.
- **IamBinding**: One resource's bindings on the platform, derived from the active rules by `oto policy iam`: which members hold which platform roles on it and what a forbid withheld, as the JSON the platform takes, with the provider and the resource's address. Generated and never authored: it is rewritten on the next derivation, binds the resource, grants the principals and derives from the rules. The platform enforces it; OTO does not (ADR-0005).
