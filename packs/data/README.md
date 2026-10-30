# Data: the data semantic layer, as an OTO pack

The engine ships no domain feature ([ADR-0010](https://github.com/Cynergis/oto/blob/main/docs/adr/0010-a-domain-feature-is-a-pack-of-the-registry.md)):
a domain feature is a pack plus its tools, and this pack is the third to leave the engine, after `ddd` and `work`.
It carries the `data` ontology on the `software-architecture` pack (a `Table` is part of a `DataStore` the estate
declares, its `Column`s carry type, key, nullability and a meaning that is a draft until a named person confirms
it; a `LoadJob` loads a table and is sourced from a `Feed`; a `Usage` is one reader's use of one table), the
`data-meaning` skill, and the tools, `oto data introspect`, `lineage`, `usage`, `meaning` and `confirm`, as the
module `oto_data` in `ontology/data/code`, loaded through the command its manifest provides and put on the import
path when the engine loads the pack. The connectors a store is read through (sqlite, postgres, bigquery) are the
engine's. Nothing has to be installed on the machine's Python path.

```bash
oto pack add data                                   # from the cynergis registry, or in Claude Code: /plugin install data@cynergis
oto init --name "<project>" --ontology data --project <root>
oto data introspect [--connector sqlite|postgres|bigquery] [--path <store>] --store datastore.<id> --at <date> --project <root>
oto data lineage --dbt <manifest> | --sql <dir|file> --store datastore.<id> --at <date> --project <root>
oto data usage --log <file> | --connector postgres|bigquery --store datastore.<id> --at <date> --project <root>
oto data meaning --store datastore.<id> --at <date> --project <root>           # a skeleton the data-meaning skill fills
oto data confirm <id> --by "<who>" --at <date> --project <root>                 # a named person's decision
```

Every command writes a document in the corpus and a proposal whose nodes quote it, so the gates can hold the
citation; nothing is invented, and a gap is named. Meaning is drafted and confirmed, never the other way round.
The questions DT1 to DT6 are in [ontology/data/README.md](ontology/data/README.md).

Needs OTO 0.14.7 or later. On an engine that still ships `data` (0.14.7) the engine's copy is read and this pack's
code is not loaded; from 0.14.8 the engine ships no `data` and this pack is the only one. `tests/` holds the pack's
tests (`pytest tests` with the engine installed; `tests/conftest.py` points the engine at this pack).

`oto pack check` validates the pack; `oto pack publish --to <registry>` releases it.
