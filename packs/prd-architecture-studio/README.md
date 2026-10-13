# PRD & Architecture Studio

Atlas, the Lead Product Engineer, and the studio's skills: a product's specification and design captured against OTO packs through the curate gates, the build with the brief in hand, and the navigable PRD and architecture site.

An OTO pack in the product domain: the ontology `software-architecture` (release 10, with `product`, `portfolio` and `oto-core`) under `ontology/`, the skills `atlas`, `elicit`, `prd-build`, `architecture-build`, `feature-flow` and `prd-site`, the generated `start`, and the view `prd-site` under `views/`. Install it in Claude Code from the registry's marketplace, or `oto pack add prd-architecture-studio` on a machine.

A product starts from it with its type, the design patterns its parts follow and the flow merged beside the pack's ontology (OTO 0.11.12 or later, which finds an installed pack's ontology by name and declares the plugins the project uses):

```bash
oto init --empty --pack prd-architecture-studio --ontology product-report,ddd,flow --project <root>
```

The view's DDD pages are optional: they fill only in a product that adds `ddd`.

`oto pack check` validates it; `oto pack refresh` re-embeds the ontology when the registry holds a newer release; `oto pack publish --to <registry>` releases it.
