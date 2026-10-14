# Agent

The agent pattern, for the parts of a product that people give work to through an agent rather than a screen: the jobs they hand it, its tools and what each changes, what it reads, its guardrails and who confirms, how it talks, its hand-offs and the test conversations that prove each job, traced to the requirements and components of the architecture.

A pattern of `software-architecture`, beside domain-driven design for an application and the medallion pattern for a data pipeline: the architecture finds it in `oto status` and hands it the part that is an agent. Its skill is `design-agent`.

An OTO pack in the software domain: the ontology `agent` (release 1) under `ontology/`, the skill `start` that begins a project from it, and `design-agent`. Install it in Claude Code from the registry's marketplace, or `oto pack add agent` on a machine.

`oto pack check` validates it; `oto pack refresh` re-embeds the ontology when the engine holds a newer release; `oto pack publish --to <registry>` releases it.
