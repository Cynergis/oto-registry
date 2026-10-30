# Domain-driven design: the product's domain graph, as an OTO pack

The engine ships no domain feature ([ADR-0010](https://github.com/Cynergis/oto/blob/main/docs/adr/0010-a-domain-feature-is-a-pack-of-the-registry.md)):
a domain feature is a pack plus its tools, and this pack is the first to leave the engine. It carries the
`ddd` ontology (subdomains, bounded contexts and their map, use cases, events, commands, reactions, read
models, external systems, aggregates, entities, value objects, business rules and domain services) on the
`architecture` pack, so a context's deployed component and its framework's node are one node; the
`model-domain` skill that designs a part with DDD by interview; the domain-model view; and the storming
importer, `oto ddd storm`, as the module `oto_ddd` in `ontology/ddd/code`, loaded through the command its
manifest provides (`provides.commands`) and put on the import path when the engine loads the pack. Nothing
has to be installed on the machine's Python path.

```bash
oto pack add ddd                                    # from the cynergis registry, or in Claude Code: /plugin install ddd@cynergis
oto init --name "<project>" --ontology ddd --project <root>
oto ddd storm --from board.json --at <date> [--context boundedcontext.<id>] --project <root>   # the board: a document and a capture
oto curate propose --from captures/storm-<slug>.json --project <root>                        # then start, add, check, apply
oto decide boundedcontext.<id> readiness=ready --by "<who>" --at <date> --project <root>      # the analyst's sign-off
```

A board is what a storming session leaves: stickies by kind (event, command, actor, aggregate, policy,
read model, external system, hot spot), pointing at each other by text. `storm` writes it as a document in
the corpus, one line per sticky, and a capture against the pack's capture schema whose every item quotes
its sticky; what the board does not say (a command with no aggregate, a sticky pointing at nothing) is said
first and never invented. Readiness (draft, ready, built) is a decision attribute with `draft` as its
default: `oto decide` records a named person's assertion, the sign-off on the graph itself. The questions
DD1 to DD24 are in [ontology/ddd/README.md](ontology/ddd/README.md).

Needs OTO 0.14.7 or later. On an engine that still ships `ddd` (0.14.7) the engine's copy is read and this
pack's code is not loaded; from 0.14.8 the engine ships no `ddd` and this pack is the only one. `tests/`
holds the pack's tests (`pytest tests` with the engine installed; `tests/conftest.py` points the engine at
this pack, and `tests/fixtures/packs/plain-framework` is the test-only framework a test imports a model
through).

`oto pack check` validates the pack; `oto pack publish --to <registry>` releases it.
