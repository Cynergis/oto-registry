# Policy: access policy as facts, as an OTO pack

The engine ships no domain feature ([ADR-0010](https://github.com/Cynergis/oto/blob/main/docs/adr/0010-a-domain-feature-is-a-pack-of-the-registry.md)):
a domain feature is a pack plus its tools, and this pack is the fourth and last to leave the engine. It carries the
`policy` ontology on the `data` and `agent` packs (a `PolicyRule` permits or forbids one `Permission` for the roles and
teams it names; a `Table` and a `Column` carry a classification and whether they hold personal data; a `Principal`
holds roles and an `Agent` is granted them; an `IamBinding` is one resource's bindings on the platform), with `data`
embedded beside it, and the tools as the module `oto_policy` in `ontology/policy/code`: the compiler into a signed
Cedar bundle, the signed snapshot of what an agent may do for a principal, the platform's IAM derived and never
enforced ([ADR-0004](https://github.com/Cynergis/oto/blob/main/docs/adr/0004-cedar-for-policy.md),
[ADR-0005](https://github.com/Cynergis/oto/blob/main/docs/adr/0005-iam-is-generated-never-enforced.md)), the two
build stages (`policy`, `iam`), `oto policy`, the write hook that re-checks a session's snapshot before `curate apply`,
`decide` and `promote`, and the read hook that holds the served `kg_read` to the caller's principal. All of it is
loaded through what the manifest provides and put on the import path when the engine loads the pack. The guard that
holds a Claude Code session to a snapshot (`hooks/policy_guard.py`, with the reader any plugin copies) stays the
engine plugin's: plain Python that reads the file this pack writes.

```bash
oto pack add policy                                 # from the cynergis registry, or in Claude Code: /plugin install policy@cynergis
oto init --name "<project>" --ontology policy --project <root> && oto build --project <root>     # policy: N rule(s) ...; iam: N binding(s) ...
oto decide policyrule.<id> status=active --by "<who>" --at <date> --project <root>             # only active rules compile
oto policy compile [--out <dir>] [--sign-with <ENV>] --project <root>
oto policy snapshot --agent agent.<id> --principal principal.<id> [--out .factory/policy.json] [--ttl <hours>] --project <root>
oto policy verify [<dir or snapshot>] --project <root>
oto policy iam [--apply --by "<who>"] --project <root>
oto policy denials --events .factory/events.jsonl --project <root>
```

The questions PL1 to PL9 are in [ontology/policy/README.md](ontology/policy/README.md).

Needs OTO 0.14.7 or later; the stages load from a pack's code from 0.14.8, the first engine that ships no `policy` of
its own (on 0.14.7 the engine's copy is read and this pack's code is not loaded). `tests/` holds the pack's tests
(`pytest tests` with the engine installed; `tests/conftest.py` points the engine at this pack).

`oto pack check` validates the pack; `oto pack publish --to <registry>` releases it.
