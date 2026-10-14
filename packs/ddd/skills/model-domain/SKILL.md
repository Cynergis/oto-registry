---
name: model-domain
description: >-
  Model a part of a product with domain-driven design, in an OTO project that composes `ddd`:
  strategic design (subdomains, bounded contexts, the context map), event storming (events,
  commands, reactions, read models, external systems) and the tactical model (aggregates,
  entities, value objects, business rules, domain services), each traced to the requirement it
  satisfies and the component it is deployed as, through the curate gates. Use when a part of the
  product is designed with DDD: "model the domain", "find the bounded contexts", "event storming",
  "design the aggregates", or when the software-architecture pack's architecture-build hands it a
  part that follows DDD.
---

# Model a part's domain with DDD

DDD is a design pattern for a part of a product, not for the whole of it: one product may model
its application with DDD and its data pipeline with another pattern. This skill models the part
that follows DDD. The `ddd` ontology decides what to ask; its questions (DD1–DD24) are the gates.

## Before the first question

1. The project composes `ddd`: `oto status --project <root>` names it, and the vocabulary holds
   `BoundedContext`. The pattern is chosen when the project starts (`oto init --pack product
   --ontology product-<type>,software-architecture,ddd,flow`, or `--ontology ddd` beside the others);
   a project started without it cannot add it afterwards.
2. The architecture comes first: the systems and components of `software-architecture`. A bounded
   context is `deployed_as` a component, so the component must exist.
3. Which part: name the system or components this model covers, and keep to them.

## How each group is captured

Run OTO's **capture-form** skill on the project's `capture.json`, with its menu at every
confirmation ([A] elicit, [P] perspectives, [C] continue). Every confirmed group goes through
the gates as a capture file with `scope` the product. What the product holds is referenced, never
captured twice: personas, roles, requirements, policies, scenarios, terms, decisions, open
questions.

## The three passes

1. **Strategic.** The subdomains (`kind`: core, supporting, generic); the bounded contexts that
   realise each (`realised_in`), the team that owns each (`owned_by`), the component it is
   `deployed_as`, its `architecture_style` and `stack`; the context map: each
   `ContextRelationship` `between` two contexts, which is `upstream`, its `pattern`
   (customer_supplier, conformist, anticorruption_layer, …) and `mechanism`. Gates: DD1, DD2, DD3
   answer.
2. **Event storming.** The domain events (past tense), the command that `raises` each and the
   aggregate it is `emitted_by`; what `precedes` what in the big picture; the use cases, who they
   are `performed_by`, the commands they `issue`, the requirement each `satisfies`, the scenarios
   that `exercise` them; the reactions ("whenever this event, then that command": a `Reaction`,
   never the product's `Policy`, which is a rule imposed from outside); the read models an actor
   consults before a command (`projected_from` events); the external systems that `send` and
   `receive`, `integrated_by` a context. Gates: DD4, DD5, DD8 to DD14; DD24 is empty (every use
   case satisfies a requirement).
3. **Tactical.** The aggregates: their `root` entity, what they are `composed_of`, what they
   `reference`, their `persistence` and `construction`; entities and value objects; the business
   rules that constrain them (`constrained_by`), and the product's policies that `apply_to` them;
   the domain services and what they `operate_on`. Gates: DD15 to DD17, DD20, DD21.

## Readiness and the builder's brief

`readiness` (draft, ready, built) is declared on contexts, use cases, commands and aggregates.
A context marked ready must hold nothing still in draft: DD23 is empty. DD22 is what the builder
produces for one context: everything that is part of it. Report the gates in the engine's words
(`oto query --project <root> questions`): DD1–DD3 and DD22 answered, DD23 and DD24 empty, and the
open questions on the design (DD18), with who can answer each.
