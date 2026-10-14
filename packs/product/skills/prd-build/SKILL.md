---
name: prd-build
description: >
  Build a product's specification (the PRD) as a knowledge base: captures it against the `product`
  pack and the product type's pack (`product-report`, …) through the elicit skill, section by
  section, each confirmed section contributed through the curate gates. Guided interview or
  structure-from-notes. Use when the user wants to create or extend a PRD, capture requirements,
  personas, journeys, use cases, policies, governance, risk, scope or success metrics. Writing a
  specification document out of what the graph already holds is OTO's spec.
---

# Build a PRD

The PRD is the specification level of the knowledge base: what the product must do, for whom,
under what rules, why. It is captured against packs, not against a form of this plugin's own.

1. The project starts from this pack, which brings `product`, with the product type's ontology
   merged beside it, and the design's `software-architecture` and patterns when the product has a
   design (`oto init --empty --pack "${CLAUDE_PLUGIN_ROOT}" --ontology
   product-report,software-architecture,flow`, or Atlas's scene 1). If the type's pack does not
   exist yet, capture against `product` alone and tell the person what a type pack would add.
2. Run the **elicit** skill with the schema of that project. Its sections are the askers the
   packs name — the sponsor, the product owner, the builder, compliance, the report product
   owner, the data team — and its items are personas, journeys, requirements, policies, decisions,
   risks, objectives, criteria, terms, and the obligations typed by what they govern.
3. The gate after each section is what the graph answers (`oto query questions`); the PRD is
   done when every `non_empty` question of the packs answers, or the person has said which stay
   open and why.

What this skill no longer does: keep its own section list or write `window.__PRD__`. The site's
`data.js` is a projection of the graph (prd-site).
