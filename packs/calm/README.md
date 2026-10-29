# CALM: the FINOS architecture framework, as an OTO pack

The engine ships no architecture framework ([ADR-0008](https://github.com/Cynergis/oto/blob/main/docs/adr/0008-a-framework-is-a-pack-of-the-registry.md)):
a framework is a pack plus an adapter, and this pack is the first. It reads a CALM 1.x model (the
FINOS Common Architecture Language Model, release 1.0; the core schema is unchanged through 1.3) into
the architecture pack's reified model and writes the graph back as CALM, through the adapter its
ontology's manifest provides (`provides.adapters`), whose code is in `ontology/calm/code/oto_calm`
and goes on the import path when the engine loads the pack. Nothing has to be installed on the
machine's Python path.

```bash
oto pack add calm                                   # from the cynergis registry, or in Claude Code: /plugin install calm@cynergis
oto init --name "<project>" --ontology architecture,calm --project <root>     # or compose calm into an architecture project
oto arch import --framework calm --file model.json --at <date> [--environment environment.<id>] --project <root>
oto arch export --framework calm [--out model.json] --project <root>
oto arch migrate --framework calm --by <who> --project <root>                 # a graph written before the architecture pack's release 5
```

How CALM maps, what import and export do and do not invent, and the migration are in
[ontology/calm/README.md](ontology/calm/README.md). The pack adds no term: a CALM node is an estate
node (`System`, `Component`, `DataStore`, `Environment`, `Role`) carrying `external_id`,
`external_type` and `external_payload`; relationships, controls and flows are nodes of the
architecture pack. With the policy pack composed too, the adapter exports the pack's `IamBinding`
nodes as controls on the component that runs as the granted principal.

Needs OTO 0.14.2 or later, the first engine that loads a pack's code. `tests/` holds the pack's
tests (`pytest tests` with the engine installed; `tests/conftest.py` points the engine at this
pack). `tests/fixtures/trading-system.architecture.json` is the trading-system example from the FINOS
`architecture-as-code` repository (https://github.com/finos/architecture-as-code,
`docs/static/calm-example/trading-system.architecture.json`), Apache-2.0, copied unchanged as the
round-trip fixture.

`oto pack check` validates the pack; `oto pack publish --to <registry>` releases it.
