---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: The architecture graph for implementation, framework-neutral: estate nodes carrying the id, type and payload of the framework their model was written in (CALM through the calm pack's adapter), relationships, controls and flows as nodes, requirements with budgets and the evidence that measured them, the code modules and commits that implement each component, and the change proposals evidence raised. The pack 'architecture' (release 1) embeds the ontology 'architecture' (release 6), which declares Relationship, Control, Flow, FlowStep, NFR, Evidence, CodeModule, Commit and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Architecture

The architecture graph for implementation, framework-neutral: estate nodes carrying the id, type and payload of the framework their model was written in (CALM through the calm pack's adapter), relationships, controls and flows as nodes, requirements with budgets and the evidence that measured them, the code modules and commits that implement each component, and the change proposals evidence raised.

This skill comes with the `architecture` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add architecture` from the cynergis registry), `oto init --pack architecture` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Relationship**: A CALM relationship as a node of its own: what interacts with, connects to, is deployed in or composed of what, over which protocol, or the options a decision chooses between. A node because a flow walks it in order and a control governs it, which an edge could carry neither of.
- **Control**: A control the architecture declares, keyed by its CALM id: what it governs (a node, a connection, a flow) and the requirement schema it cites, with its configuration inline or by URL.
- **Flow**: A business or technical flow through the architecture: an ordered walk over relationships, named, described, and traceable to the requirement it serves.
- **FlowStep**: One step of a flow: its sequence number, the relationship it walks and the direction it walks it in.
- **NFR**: A non-functional requirement with a metric and a budget: the number a node must stay within (p95 latency, availability, cost), which measured evidence is checked against.
- **Evidence**: Something observed about the architecture at a date: a measurement, a test result, a review, a gate's verdict, a log. What a budget is checked against and what raises a change proposal.
- **CodeModule**: A unit of code that implements a component: a package, a directory, a module, at a path in a repository.
- **Commit**: A recorded change to code: the commit that changed a module, with its sha, date, author and message.
- **ChangeProposal**: A proposed change to the architecture, raised by evidence (a gate that failed, a measurement over budget), about the nodes, relationships or controls it would change, settled by a decision and implemented in a commit.
- **Contract**: A version of an interface the estate declares: an event schema, an API, a file layout, with a status that is a decision. A draft until a named person freezes it; frozen means nobody changes it without a new version that supersedes it, so a consumer and its provider build in parallel against it; retired once superseded.
