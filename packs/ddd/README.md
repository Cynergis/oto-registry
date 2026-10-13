# Domain-driven design

Domain-driven design for the parts of a product that follow it: subdomains, bounded contexts and their map, event storming (events, commands, reactions, read models, external systems) and the tactical model (aggregates, entities, value objects, business rules, domain services), traced to the requirements and components of the architecture.

An OTO pack in the software domain: the ontology `ddd` (release 1) under `ontology/`, the skill `start` that begins a project from it, and the views under `views/`. Install it in Claude Code from the registry's marketplace, or `oto pack add ddd` on a machine.

`oto pack check` validates it; `oto pack refresh` re-embeds the ontology when the registry holds a newer release; `oto pack publish --to <registry>` releases it.
