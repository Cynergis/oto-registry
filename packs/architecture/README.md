# Architecture

The architecture graph for implementation, framework-neutral: estate nodes carrying the id, type and payload of the framework their model was written in (CALM through the calm pack's adapter), relationships, controls and flows as nodes, requirements with budgets and the evidence that measured them, the code modules and commits that implement each component, and the change proposals evidence raised.

An OTO pack in the software domain: the ontology `architecture` (release 6) under `ontology/`, the skill `start` that begins a project from it, and the views under `views/`. Install it in Claude Code from the registry's marketplace, or `oto pack add architecture` on a machine.

`oto pack check` validates it; `oto pack refresh` re-embeds the ontology when the registry holds a newer release; `oto pack publish --to <registry>` releases it.
