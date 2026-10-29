## What the pack is for

An architecture framework, not a domain: it reads a CALM 1.x model into the architecture pack's
reified model and writes the graph back as CALM. Install it beside an architecture project rather than
starting a project from it alone: once the pack is on the machine (`oto pack add calm`, or the plugin),
`oto arch import --framework calm` finds the adapter in any project that composes `architecture`.
`oto init --name "<project>" --ontology architecture,calm` also records the framework in the project's
ontology record; the pack adds no term, so an existing architecture project needs nothing composed.

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
