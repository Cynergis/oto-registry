# Capturing the governance of a product

Ask these after the product-core interview.

## Which rules from outside must the product obey, and who enforces each?
`Policy` nodes with a kind and an authority; each `applies_to` what it governs and is `enforced_by` a `Role`.

## What limits is it built under, and who imposed them?
`Constraint` nodes that `constrains` the product, a release or a requirement.

## What are we taking for granted?
`Assumption` nodes a decision, requirement or release `relies_on`, with whether anyone has checked.

## What can go wrong, and what reduces it?
`Risk` nodes that `threatens` their subject and are `mitigated_by` a decision or a requirement.
