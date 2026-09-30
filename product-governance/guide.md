# Reading a product-governance graph

## What this graph is for

What a product must obey, what limits it, what it takes for granted and what can go wrong, on top of `product-core`.

## The questions it answers well

- **Rules.** A `Policy` has an authority, `applies_to` what it governs and is `enforced_by` a `Role`.
- **Limits.** A `Constraint` `constrains` its subject and says who imposed it.
- **Beliefs.** A decision, requirement or release `relies_on` an `Assumption`, which is unverified, validated or invalidated.
- **Exposure.** A `Risk` `threatens` its subject and is `mitigated_by` a decision or a requirement.

## Where to start

From a `Requirement`, read `governed_by`, `constrained_by` and `at_risk_from`.

## Common mistakes

Recording a regulatory rule as a constraint: a rule from an authority is a `Policy`; a constraint limits resources.

## What is deliberately not here

Anything about how the product is structured or experienced (`product-experience`).
