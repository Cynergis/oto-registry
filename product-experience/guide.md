# Reading a product-experience graph

## What this graph is for

How a product aligns with objectives, what it is made of, how a persona gets value step by step, and what its words mean, on top of `product-core`.

## The questions it answers well

- **Alignment.** An `Objective` `supports` a higher one; a value proposition `serves` an objective; the product `pursues` it.
- **Structure.** A `Feature` is `part_of` the product or a parent feature and `realises` requirements.
- **Journeys.** A `UserJourney` is `intended_for` a persona and `serves` a promise; each `JourneyStep` is `part_of` it, and a scenario can `exercise` a step.
- **Language.** A `Term` `defines` the entity it names.

## Where to start

From a `UserJourney`, read its steps in order, then the promise it serves.

## Common mistakes

Using a feature where a requirement belongs: a need and the capability that satisfies it have different owners and dates.

## What is deliberately not here

Rules, limits and risks (`product-governance`).
