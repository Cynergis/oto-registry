# Kanban: the test drive of an ontology workspace

This repository is an **ontology workspace**: the pack `kanban` in the making, with a trial project
beside it ([ADR-0012](https://github.com/Cynergis/oto/blob/main/docs/adr/0012-two-kinds-of-project.md)).
It was laid out by `oto sandbox up --kind ontology` on OTO 0.16.0, pushed here, and is driven from
the `kanban` sandbox: Claude Desktop's Code tab over the `kanban.sbx` connection, on the folder
`/Users/chihebdkhil/kanban/project`, or a terminal with `sbx run --name kanban`. The sandbox pushes
to this repository with a GitHub secret the sandbox tool holds; no token is in the sandbox or in a
file.

What the deliverable is, and what is beside it:

```
manifest.json                 the pack: name, release, domain, summary, engine, the ontology it embeds
ontology/kanban/              the deliverable: terms, rationale, questions, rules, a small sample, a README
ontology/oto-core/            the base it rests on, embedded: Document, Tool, Graph and the temporal fields
skills/start/SKILL.md         generated: how a project starts from this pack
trial/                        a knowledge project composing the pack: documents are read here, the vocabulary is tried here; never published
.github/workflows/            pack-check.yml on every pull request; pack-publish.yml on a tag
```

## Act 0: where the workspace stands

```bash
oto version                                 # oto 0.16.2
oto pack check . --strict                   # not usable yet: the pack's own vocabulary declares no classes (the interview fills it)
cat ontology/kanban/ontology.config.json    # name, ontology_version 1, empty classes and properties
oto status --project trial                  # a bare knowledge project: kind knowledge, its own vocabulary until `oto pack try` writes it
```

Pass when the check names the one problem, the empty vocabulary, and nothing else.

## Act 1: the questions, then the vocabulary (the ontology-interview skill)

In a Claude session inside the sandbox, ask for the **ontology-interview** skill. It works in this
workspace: it reads any documents you put in `trial/inbox/` (a Kanban handbook, a board's export, a
team's working agreement), collects the ten to twenty questions a Kanban graph must answer, shows them
and confirms them, derives the classes from the questions (boards, columns, cards, work-in-progress
limits, policies, the people who pull), the relations, the attributes a question filters on, the rules
a question needs, and writes them under `ontology/kanban/` with a reason per term and a small sample
every question answers from. Questions before nouns: a class no question needs does not go in.

By hand, the same thing is five files under `ontology/kanban/`; the engine's `docs/E2E-CORE.md` step 1
shows their shape on a small example.

```bash
oto pack check . --strict          # shapes; every term cited by a question; the sample answers every question; a reason and a confirmation per term
oto pack try .                     # the trial's vocabulary written from the pack, built; its questions asked
oto query --project trial questions
```

Pass when the strict check is clean and every question the pack declares answers from the trial.
Things to notice: `--strict` refuses a term nobody confirmed; the confirmation is a named person's,
given after reading the rationale, and never filled by the agent. The trial's documents and graph
survive a `try`; only its vocabulary is the pack's.

## Act 2: a commit, a pull request, the gate in CI

```bash
git add -A && git commit -s -m "The Kanban vocabulary, first cut" && git push
```

Open a pull request; `pack-check.yml` runs `oto pack check . --strict` and the pack's tests, when it
has some. Pass when the check is green on the pull request.

## Act 3: the release

```bash
oto pack publish --from . --to https://github.com/Cynergis/oto-registry.git --note "The Kanban vocabulary, first release"
```

The registry carries the pack at release 1, tags `kanban--v1.0.0` and lists `kanban@cynergis` in its
marketplace; `trial/` and `.github/` stay here. Or tag `v1` and let `pack-publish.yml` do it, with
`OTO_REGISTRY` and `OTO_REGISTRY_TOKEN` set on the repository.

## Act 4: a knowledge project on it

In another sandbox, or another folder:

```bash
oto pack add kanban
oto init --name "Our board" --slug board --pack kanban --project board      # kind knowledge, vocabulary derived from kanban @1
oto status --project board                                                   # derived from kanban @1
oto build --project board && oto query --project board questions
```

Pass when the project records `origin: pack` and a derived vocabulary, answers the pack's questions
from the sample, and refuses a hand edit of `ontology.config.json` with the way to make the change:
a release of this pack, or a pack that extends it.

## What this drive does not cover

The knowledge project's own life, documents through ingest and the gates, deploy, a served graph: the
engine's `docs/E2E-CORE.md` drives that on the engine alone, and the Northwind project's test drive
drives it on a real graph.
