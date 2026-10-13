---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Domain-driven design for the parts of a product that follow it: subdomains, bounded contexts and their map, event storming (events, commands, reactions, read models, external systems) and the tactical model (aggregates, entities, value objects, business rules, domain services), traced to the requirements and components of the architecture. The pack 'ddd' (release 1) embeds the ontology 'ddd' (release 1), which declares UseCase, Subdomain, BoundedContext, ContextRelationship, DomainEvent, Command, Reaction, ReadModel and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Domain-driven design

Domain-driven design for the parts of a product that follow it: subdomains, bounded contexts and their map, event storming (events, commands, reactions, read models, external systems) and the tactical model (aggregates, entities, value objects, business rules, domain services), traced to the requirements and components of the architecture.

This skill comes with the `ddd` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add ddd` from the cynergis registry), `oto init --pack ddd` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **ddd:model-domain**: Model a part of a product with domain-driven design, in an OTO project that composes `ddd`.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **UseCase**: Something a persona or a role does with the product to reach a purpose. The unit the builder plans from; it issues commands, satisfies requirements and is proved by scenarios.
- **Subdomain**: A part of the business problem: core, supporting or generic. Implemented by one or more bounded contexts.
- **BoundedContext**: A boundary inside which one model and one language apply. The unit of ownership, architecture and deployment.
- **ContextRelationship**: How two bounded contexts relate on the context map: the DDD pattern, which side is upstream, and the mechanism that carries the integration.
- **DomainEvent**: Something that happened in the domain that the business cares about, past tense, with a payload. The orange sticky.
- **Command**: An intent to change the domain, imperative, with a payload. Raised by an actor, a policy, a timer or an external system, and handled by an aggregate or a domain service. The blue sticky.
- **Reaction**: A reaction: whenever this event, then that command. The lilac sticky of event storming (its 'policy'); named Reaction because the product's Policy is a rule imposed from outside. Includes sagas and process managers.
- **ReadModel**: The information an actor needs before issuing a command, projected from events. The green sticky.
- **ExternalSystem**: A system outside the product that sends commands or events in, or receives events out. The pink sticky.
- **Aggregate**: A cluster of entities and value objects with one root and one consistency boundary. Handles commands and emits events.
- **Entity**: A thing with identity that persists through change, carrying typed fields.
- **ValueObject**: A thing defined only by its values, immutable, carrying typed fields.
- **BusinessRule**: An invariant, precondition, postcondition or constraint the domain enforces, cited by the aggregates, commands and use cases it binds. Distinct from the product's Policy, a rule imposed from outside; a policy may require a business rule.
- **DomainService**: Domain logic that belongs to no single aggregate, stateless, operating on aggregates and values.
