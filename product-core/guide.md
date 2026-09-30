# Reading a product-core graph

## What this graph is for

The smallest vocabulary that captures a product specification completely: what is being built, who answers for it, who it is for, what it promises, what it must do, how that is accepted, what ships when, what was decided and what is still open. Every fact cites a document or a dated statement by a named role.

## The questions it answers well

- **Purpose.** `Product` holds the problem, the vision, the domain and the stage; it `offers` each `ValueProposition`, `intended_for` a `Persona`.
- **Traceability.** `Requirement` `serves` `ValueProposition`; a `SuccessCriterion` `measures` the promise; a `Scenario` `exercises` a requirement.
- **Scope as of a date.** `in_scope_of` and `excluded_from` a `Release`.
- **Decisions and gaps.** A `Decision` is dated, reasoned, `decided_by` a `Role` and `about` its subject; it `resolves` an `OpenQuestion`.

## Where to start

From the `Product`, follow `offers` to the promises, then `served_by` to the requirements.

## What the rules flag

A requirement that serves nothing, a value proposition with no criterion, a decision with no document, a requirement both in and out of one release (blocking), a shipped release still blocked by an open question.

## Common mistakes

Naming a person where a role belongs; recording a policy or a risk as free text in a requirement when `product-governance` has a class for it.

## What is deliberately not here

Policies, constraints, assumptions and risks (`product-governance`); objectives, features, journeys and terms (`product-experience`).
