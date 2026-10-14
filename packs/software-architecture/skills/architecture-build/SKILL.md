---
name: architecture-build
description: >-
  Design a product's architecture as a knowledge base, pattern-neutral: its context and drivers,
  decisions with their alternatives (ADRs), systems, components, interfaces, data stores and
  environments, each traced to the requirement it satisfies, through the curate gates; then hand
  each part to the design-pattern pack it follows, found among the project's packs (`oto status`)
  rather than named here. Use when the user wants to design or extend the architecture, record an
  ADR as the decision is made, decide which pattern a part follows, or model a part's domain or
  pipeline. Writing up an ADR or a design brief from decisions already in the graph is OTO's spec.
---

# Build the architecture

The design level of the knowledge base: how the solution is shaped to do what the specification
says, captured against the vocabulary and cross-linked to the specification by relations, not
conventions. The architecture itself assumes no pattern; each part of it may follow one, and one
product may use several. A pattern is a pack that says so itself; this skill finds the patterns, it
never names them.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

## Before the first question

1. The project composes `software-architecture`: `oto status --project <root>` names it, and the
   vocabulary holds `Component`. It comes with this pack, on `product` (the specification the design
   traces to). A product starts from its type with this pack's vocabulary and the patterns its parts
   follow beside it, for example `oto init --empty --pack "${CLAUDE_PLUGIN_ROOT}" --ontology
   product-<type>,<patterns>,flow`.
2. `oto ontology capture --project <root>` writes the form the interview follows.

## 1. The architecture, pattern-neutral

Run OTO's **capture-form** skill on the project's form; every confirmed group goes through the curate
gates. Its askers are the architect, the on-call engineer, the data owner, the risk owner, the
builder, compliance; its items are systems, components, interfaces, data stores, environments,
teams, runbooks, repositories, and the links that make the design traceable: a system or a component
`satisfies` a requirement (SA17 says what is left), a decision is `about` what it shaped, a risk
`threatens` an asset. An external source is a `System` another team owns, with the `Interface` it
exposes (an API, a file feed, a database view). The people, the requirements, the policies, the
scenarios, the terms, the decisions and the open questions are the product's: never captured twice.

## 2. Decision-first

An ADR is captured with its alternatives and consequences before the components it shapes; a
component with no decision behind it is a finding (`kg_policy`).

## 3. Each part, with its pattern

The patterns this project can use are its packs that declare one:

```bash
oto status --project <root> --json
```

lists under `packs` each plugin with a `pattern`: `of` (the ontology it is a pattern of; here
`software-architecture`), `for` (which part, in a phrase) and `skill` (the skill that models such a
part, called `/<pack>:<skill>`). `oto status` marks them `(pattern of software-architecture)`.

- Ask, part by part, which pattern it follows: offer each pattern by its `for`, and none. A part with
  no pattern is designed at step 1 only.
- Hand a part to its pattern's `skill`, saying which part: the system or components it covers, from
  step 1. The pattern's pack does the modelling, with its own gates, and links back to step 1 (a part
  of the pattern deployed as a component, a source that is a `System`, a store that is a `DataStore`).
- A pattern the person wants that the project does not list: `oto pack list --patterns` shows the
  ones the registries offer. Its ontology must be in the project's vocabulary, which is chosen when the
  project starts; say so plainly rather than capturing against a vocabulary the project lacks.
- A pattern listed `NOT INSTALLED` (the project declares it, this machine lacks it): give its install
  line; until then, capture against its form with capture-form and report its gap questions.

## What this skill does not do

Keep a section list of its own (the form is the vocabulary's), write a site's data (a view is a
projection of the graph), assume that a product follows any particular pattern, or carry a pattern's
modelling steps (the pattern's pack does).
