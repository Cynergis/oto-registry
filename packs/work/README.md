# Work: the plan as facts, as an OTO pack

The engine ships no domain feature ([ADR-0010](https://github.com/Cynergis/oto/blob/main/docs/adr/0010-a-domain-feature-is-a-pack-of-the-registry.md)):
a domain feature is a pack plus its tools, and this pack is the second to leave the engine, after `ddd`. It
carries the `work` ontology (work items and milestones over the product's requirements, features and
components; a state derived from dated transitions and never written on the item; a block that carries its
reason and whom it waits on) and `communication` on top of it (a message beside the item it is about: a
notification from a block, the inbox, replies that lift the block, reminders past a due date); the `work`
skill and `feature-flow`; and the commands, `oto work set`, `board`, `notify`, `inbox`, `reply`, `event` and
`remind`, with the board the project's status snapshot carries, as the module `oto_work` in
`ontology/work/code`, loaded through what its manifest provides (`provides.commands`, `provides.status`) and put
on the import path when the engine loads the pack. The pack's `hooks/hooks.json` opens a Claude Code session
with the inbox, the way the engine's plugin did. Nothing has to be installed on the machine's Python path.

```bash
oto pack add work                                   # from the cynergis registry, or in Claude Code: /plugin install work@cynergis
oto init --name "<project>" --ontology communication --project <root>      # or work alone, without messages
oto work set "<item>" --state blocked --reason "..." --waiting-on "<who>" --by "<you>" --at <date> --project <root>
oto work board --project <root>                                             # blocked by whom it waits on, deployed by environment, open
oto work notify "<item>" --by "<you>" --at <date> [--due <date>] --project <root>
oto work inbox --project <root>                                             # what waits for you (the git identity, or OTO_PRINCIPAL)
oto work reply message.<id> --resolve --body "..." --by "<who>" --at <date> --project <root>
oto work event merged-pr --repo owner/name --number N --item "<item>" --environment prod --at <date> --project <root>
oto work remind --at <date> [--dry-run] --project <root>                    # one reminder a day for every pending message past its due date
```

A state is never written on an item: `set` appends a `Transition` citing a named person's assertion, supersedes
the previous one so the chain is the history, and the rule `state-follows-the-current-transition` derives the
state at the next build. `deployed` is refused by hand: a merged pull request or a promotion sets it. The
questions WK1 to WK13 and CM1 to CM4 are in [ontology/work/README.md](ontology/work/README.md) and
[ontology/communication/README.md](ontology/communication/README.md).

Needs OTO 0.14.7 or later. On an engine that still ships `work` (0.14.7) the engine's copy is read and this
pack's code is not loaded; from 0.14.8 the engine ships no `work` and this pack is the only one. `tests/` holds
the pack's tests (`pytest tests` with the engine installed; `tests/conftest.py` points the engine at this pack),
with the roadmap scenario under `tests/scenarios/roadmap` and the runner that plays it.

`oto pack check` validates the pack; `oto pack publish --to <registry>` releases it.
