---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: The FINOS Common Architecture Language Model as an architecture framework for the architecture pack: the adapter that reads a CALM 1.x model into the graph and writes the graph back as CALM, chosen by oto arch import --framework calm, with the migration of a graph written with CALM's former attribute names. The engine ships no framework: this pack installs the first. The pack 'calm' (release 1) embeds the ontology 'calm' (release 2), which declares . Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# CALM

The FINOS Common Architecture Language Model as an architecture framework for the architecture pack: the adapter that reads a CALM 1.x model into the graph and writes the graph back as CALM, chosen by oto arch import --framework calm, with the migration of a graph written with CALM's former attribute names. The engine ships no framework: this pack installs the first.

This skill comes with the `calm` pack. The ontology is inside the pack, so nothing is fetched.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add calm` from the cynergis registry), `oto init --pack calm` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares


## The guide

## What the pack is for

An architecture framework, not a domain: it reads a CALM 1.x model into the architecture pack's
reified model and writes the graph back as CALM. Compose it into an architecture project rather than
starting a project from it alone: `oto init --name "<project>" --ontology architecture,calm` (or
`--ontology calm`, which brings `architecture` with it) makes a project whose models are written in
CALM; in a project that already composes `architecture`, `oto ontology compose calm` adds it.

## Where to start

A model in: `oto arch import --framework calm --file <model.json> --at <date> [--environment
environment.<id>]` reads the model into a document and a proposal that go through the gates
(`oto curate start / add --from proposals/calm-<slug>.json / check / apply --by <who>`), then
`oto build`. The architecture's questions (AR1 to AR9) and the estate's (SA1) answer from it.

## The model back out, and on every merge

`oto arch export --framework calm [--out <file>]` writes the live graph back as CALM, export of
import equal to the input. `oto arch compile --at <date> --by <who>` runs the import for every
model `project.config.json` declares under `arch.models` with `"framework": "calm"`, and the
`oto architecture` workflow does so on every merge to main.

## Common mistakes

A node CALM deploys nowhere runs nowhere: pass `--environment environment.<id>` so the estate's
`runs_in` holds. A node composed in no system is named at `curate check`, not invented. A graph
written before the architecture pack's release 5 carries `calm_*` attributes: migrate it once with
`oto arch migrate --framework calm --by <who>`, then `oto build`.
