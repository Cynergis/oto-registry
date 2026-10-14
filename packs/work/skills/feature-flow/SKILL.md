---
name: feature-flow
description: >
  Governed, gated process for adding or changing a product feature, read from the knowledge base:
  validate the idea against the product's purpose (the graph's answers, not a document), stop for
  approval, assess the impact on the design and the flow (the graph's neighbours and briefs), stop
  for approval, finalize the acceptance scenarios with SME validation, then implement each step
  test-first through the flow pack's implement-step — BLOCKED by name when a fact is missing. Use
  whenever the user wants to add a feature, change a feature, propose a capability, or build
  product features.
---

# Feature flow (gated), on the graph

The mandatory path for any feature work. Move through the phases in order. **Each gate is a hard
stop**: present findings, then HALT and wait for the person's explicit decision. Never skip a gate,
never start implementation before Gate 3, never implement a step whose brief is BLOCKED.

Ground every assessment in the knowledge base (an OTO project; `oto status --project <root>`),
never in a document you wrote or remember. What the graph does not say is a finding ("no
requirement governs the credit report"), not a gap to fill by guessing. If the specification or the
design is not captured yet, capture it first (**prd-build**, **architecture-build**), then return.

## Phase 1 — Idea validation (product coherence)

Restate the feature in one sentence, then ask the graph:

- **Purpose** — which value proposition or objective it would serve: `kg_ask PR4` (what serves
  what today), `kg_ask PR5 GOAL=<objective>` (how success is measured). If it serves nothing the
  product pursues, say so plainly.
- **Coherence** — the requirements, features and policies it touches: `kg_search`, `kg_neighbors`
  on the requirement it extends, `kg_ask PR24 THING=<it>` (the policies that apply). Name every
  conflict or duplicate.
- **People and journeys** — `kg_ask PR3 PRODUCT=<product>` (who it is for), `kg_ask PR9
  JOURNEY=<journey>` (the journey it changes).
- **Scope** — `kg_ask PR6 RELEASE=<release>`: in scope, excluded, or unplaced.

Produce a short **Idea Assessment**: verdict (proceed / refine / reject), reasons, risks, and the
requirements it would add or change — each as a capture item, ready for the **elicit** skill.

> 🛑 **GATE 1.** Present the Idea Assessment and STOP. Wait for the person to accept, refine, or
> reject. If they accept, capture the new or changed requirements (**elicit**, against
> `product` and the type's pack) before Phase 2.

## Phase 2 — Impact on the design and the flow

Only after Gate 1. Ask the graph, not the code:

- **Design surface** — `kg_ask SA17` (requirements nothing satisfies yet), `kg_ask SA8
  ASSET=<asset>` (what an asset satisfies), `kg_neighbors` on the systems and components the
  requirement reaches (`satisfies`, `part_of`); for a part designed with DDD, `kg_ask DD24` (use
  cases satisfying no requirement) and the contexts and aggregates (`deployed_as`).
- **Flow surface** — `kg_brief impact-artifact ARTIFACT=<artifact>` and `kg_brief
  impact-parameter PARAM=<parameter>` for anything the feature changes; `kg_ask FL9
  STEP=<step>` for who consumes what a step writes.
- **Decisions and risks** — `kg_ask SA9 ASSET=<asset>` (why it is the way it is; `DD19` for a
  DDD element), `kg_ask PR13` (what threatens what).
- **Rating** — low / medium / high effort and risk, from the number of elements reached. No time
  estimates.

Produce an **Impact Analysis**: the elements touched (by id), the decisions to record, the
simplest plan. New or changed design elements are capture items for **architecture-build**; a new
or changed step is a capture item for the flow.

> 🛑 **GATE 2.** Present the Impact Analysis and STOP. Wait for approval, or iterate. If approved,
> capture the design and flow changes before Phase 3.

## Phase 3 — Acceptance scenarios + SME validation

After Gate 2. Write the use case(s) and their **scenarios** (given / when / then, behaviour level,
no UI selectors) as capture items: a `Scenario` that `exercises` the use case or the requirement.
Every requirement the feature introduces is exercised by at least one; `kg_ask DD5 USECASE=<use
case>` shows what exists. Present them for SME review; capture them when validated
(`use-case-has-scenario` stops warning).

> 🛑 **GATE 3.** Get explicit authorization to implement. Do not write code before this.

## Phase 4 — Test-first implementation, with the brief

Only after Gate 3. For every step the feature adds or changes, run **flow:implement-step** (the
flow pack): brief first, tests before code, BLOCKED stops the work. On top of it:

- The scenarios validated at Gate 3 are acceptance criteria. Never weaken one to make a test
  pass; if a failure shows the feature and what was accepted disagree, STOP and say so.
- When every step is implemented, the use case's readiness moves on; regenerate the site with
  **prd-site**.

## Definition of done

- Idea accepted (Gate 1), impact approved (Gate 2), scenarios validated and authorized (Gate 3).
- Every step's brief was READY before its code existed; every test obligation implemented and
  passing; no criterion weakened.
- The graph says the feature exists: the requirement is satisfied, the use case has its scenarios,
  the step is implemented. `oto query questions` is the proof, not a status report.
