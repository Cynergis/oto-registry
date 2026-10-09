# Work

What is planned, by whom, blocked by what: work items and milestones over the product's requirements, features and components; what slips when a component is late, what is overdue, what waits on a decision.

An OTO pack in the product domain: the ontology `work` (release 1) under `ontology/`, the skill `start` that begins a project from it, and the views under `views/`. Install it in Claude Code from the registry's marketplace, or `oto pack add work` on a machine.

`oto pack check` validates it; `oto pack refresh` re-embeds the ontology when the registry holds a newer release; `oto pack publish --to <registry>` releases it.
