---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: A product's specification and its playbook: Atlas, who carries a product from an idea to a published knowledge base, the PRD captured section by section through the curate gates, and the specification page of the product's studio, read from the graph. The pack 'product' (release 8) embeds the ontology 'product' (release 14), which declares Product, Persona, ValueProposition, SuccessCriterion, Requirement, Release, Feature, UserJourney and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Product

A product's specification and its playbook: Atlas, who carries a product from an idea to a published knowledge base, the PRD captured section by section through the curate gates, and the specification page of the product's studio, read from the graph.

This skill comes with the `product` pack. The ontology is inside the pack, so nothing is fetched.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

**A playbook**: for a product, from an idea to a published knowledge base: its specification, its design, its build and its readers. This pack's **atlas** skill (`/product:atlas`) leads it from start to end; OTO's
concierge offers it, and says where the project is at any point.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add product` from the cynergis registry), `oto init --pack product` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **product:atlas**: Atlas, the Lead Product Engineer, the product pack's playbook.
   - **product:prd-build**: Build a product's specification (the PRD) as a knowledge base.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **Product**: The thing a project sets out to build, software or not: the root every other class hangs off. The portfolio says where it stands; here is what it must do, for whom, under what rules, why.
- **Persona**: A kind of user the product is for, or explicitly not for. Journeys, requirements and value propositions point at a persona.
- **ValueProposition**: One promise the product makes to a persona, and the problem it solves. The anchor every requirement, journey and success criterion traces to.
- **SuccessCriterion**: A measurable statement of what success looks like: a metric, a target, a date, an owner role.
- **Requirement**: A stated need the product must satisfy, functional or otherwise. The unit a builder works from and a release scopes.
- **Release**: A dated boundary of scope: what ships together. Requirements and features are in scope of, or excluded from, a release.
- **Feature**: A user-visible capability the product is made of. Features nest through part_of, so an epic and a sub-feature are the same class at different depths.
- **UserJourney**: How a persona gets value, end to end: a trigger, ordered steps, an outcome.
- **JourneyStep**: One step of a user journey, with its own identity so a design decision, a requirement or a test can point at it.
- **Constraint**: A limit the product is built under: budget, platform, regulation, timeline. Imposed from outside, not chosen.
- **Assumption**: Something believed but not yet verified, on which a decision or requirement rests. Validated or invalidated over time.
- **Risk**: A known way this can go wrong, including an external dependency whose failure would hurt. Mitigated, accepted or realised over time.
- **Decision**: A dated choice with its reason and evidence, made by a role. Settles what it is about, so nobody reopens it by accident.
- **OpenQuestion**: Something unresolved that a decision must settle. Raised, then resolved by a decision, or dropped.
- **Document**: A source document in the corpus: a brief, a PRD, a UX spec, an architecture note, a transcript. Every fact cites one; a newer document supersedes an older one.
- **Scenario**: One concrete path through a requirement or a journey step: given, when, then. What a test verifies and what acceptance is judged on.
- **Policy**: A rule the product must obey that comes from outside it: business, compliance, data, security. Has an authority and a role that enforces it; distinct from a constraint, which limits resources.
- **Term**: A word with a definition in this product's language, cited and dated, so a changed meaning is superseded rather than argued about.

## The views it ships

- `specification`: `oto serve --http <port> --view specification`, or `oto build --target site --view specification`

## The guide

# Reading a product graph

## What this graph is for

It holds why a product exists, for whom, what it must do, in which release, what was decided and
why, what is open, constrained, governed or at risk, and which document says so. Every fact
cites a document or a dated statement by a named role.

## The questions it answers well

- **Purpose and alignment.** "Why does this exist?" reads `Product` (problem, vision, domain,
  value stream). "What are we trying to achieve?" reads `Objective` nodes and `supports` between
  them; a `SuccessCriterion` `measures` an objective or a value proposition.
- **Traceability.** Requirement → `serves` → ValueProposition → `serves` → Objective is the spine.
  A `Feature` `realises` requirements; a `Scenario` `exercises` a requirement or a journey step.
- **Scope as of a date.** `in_scope_of` and `excluded_from` edges to a `Release` carry dates;
  ask with `--as-of` to see the boundary a builder saw when it started.
- **Governance.** A `Decision` is dated, reasoned, `decided_by` a role and `about` its subject; it
  `resolves` an `OpenQuestion` and `relies_on` an `Assumption`. A `Policy` `applies_to` what it
  governs and is `enforced_by` a role.

## What the rules flag

A requirement that serves nothing, a value proposition with no criterion, a decision with no
document, a requirement both in and out of one release (blocking), a shipped release still
blocked by an open question.

## What is deliberately not here

People by name (ownership sits on roles), delivery units such as stories, design surfaces such
as screens, and workflow stages or gates: each belongs to another vocabulary.
