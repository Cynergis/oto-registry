---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Software estate: systems, components, interfaces, data, environments, decisions and risks. The pack 'software-architecture' (release 4) embeds the ontology 'software-architecture' (release 8), which declares Asset, System, Component, Interface, DataStore, Environment, Team, Capability and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Architecture Knowledge Base

Software estate: systems, components, interfaces, data, environments, decisions and risks.

This skill comes with the `software-architecture` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add software-architecture` from the cynergis registry), `oto init --pack software-architecture` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed.

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Asset**: Anything the estate runs or stores and a team can be accountable for: a system, a component, an interface, a data store. A question about assets covers all four.
- **System**: A named application or platform that a team owns and a user or another system consumes.
- **Component**: A part of a system deployed or released as a unit: a service, a job, a library, a front end.
- **Interface**: A contract others depend on: an API, an event topic, a file feed, a database view.
- **DataStore**: A place data lives: a database, a bucket, a queue, a cache, a warehouse table.
- **Environment**: A place components run: production, staging, a region, a tenant.
- **Team**: The group accountable for something. Attach ownership to a team, not to a person.
- **Capability**: A business capability the estate supports. This is what the business asks about.
- **Requirement**: A stated need, functional or otherwise, that something must satisfy.
- **DecisionRecord**: A recorded architecture decision: the choice, the alternatives, the reason, the consequences.
- **Risk**: A known way this can hurt: a single point of failure, an end of support, a concentration.
- **Runbook**: The documented way to operate or recover something.
- **Document**: A source document in the corpus: a design, a review, a standard, a transcript.
- **Repository**: Where a component's code lives: a source repository, recorded before it exists (intended) and observed once it does.

## The actions it ships

OTO lists them; the caller invokes (the act skill):

- `action.check-repository` on Repository: Reads the repository's metadata from GitHub and records that it exists, its URL and its default branch. Realises an intended repository; re-attests a current one.
- `action.create-repository` on Repository: Creates the repository an intended Repository fact describes, under its owner, and records the result. Changes the world: a person confirms it by name.
- `action.probe-interface` on Interface: Calls an interface's base URL with a GET and keeps the response as a source document, so what the interface actually answers can be read and curated.

## The guide

# Reading a software-architecture graph

## What this graph is for

It answers the questions people ask about a software estate under pressure, from documents that
were written to describe it at rest: what breaks if this changes, who owns it, why it is the way
it is, what is fragile, and what the business loses when a part fails. Every answer cites the
document that states it and the date it was true.

## The questions it answers well

- **Change impact.** "What depends on the payments interface?" follows `consumes` and `exposes`,
  and the rule `consumer-depends-on-provider` derives the dependency between components so it can
  be asked directly: `oto query neighbors "<component>" depends_on`.
- **Ownership.** "Who do I call about the ledger?" follows `owned_by` to a `Team`. If the answer
  is a person, the graph is recording the wrong thing.
- **Reasons.** "Why one ledger?" follows `decided_by` to a `DecisionRecord` and quotes its reason.
  A decision without a recorded document is flagged by `decision-is-documented`.
- **Fragility.** "What threatens production?" follows `threatens` and `mitigated_by` from `Risk`.
  The rule `risk-reaches-system` lifts a risk to a component up to its system.
- **Business exposure.** "What can customers not do if payments is down?" follows `supports` to
  `Capability`, the one class written in the business's words.

## Where to start reading

Open the explorer (`oto serve --http 8765`) and read the `System` column first: each system is a
unit of ownership. Then one system's components and the interfaces between them. Read
`DecisionRecord` entries last: they explain what the rest shows. A dashed edge was derived by a
rule; `oto rules explain <rule>` says why the rule exists and what it derived.

## What can be done

The ontology ships three actions, listed by `oto actions list` and never invoked by OTO: a daily
check that a repository exists (read-only; it realises an intended `Repository` and re-attests a
current one), the creation of a repository an intended fact describes (it changes the world, so a
person confirms it by name), and a weekly read of what an `Interface` answers at its URL. Record a
run with `oto actions record`, and the response enters the graph through the gates with the run as
its evidence. The act skill is the protocol.

## Common mistakes

- Recording a person as an owner. Use the team; people move.
- Recording every server. This is not a configuration database; add `Environment` only where a
  question needs it, and point at the catalog that holds the rest.
- Two components writing one store without a decision that says so. `writes_to` is separate from
  `reads_from` so this can be asked: `oto query neighbors "<store>" writes_to`.
- Leaving `validated_by` empty on a rule for months. A rule nobody confirmed derives facts nobody
  asked for.
