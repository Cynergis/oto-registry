---
name: prd-site
description: >
  Serve or publish the navigable PRD + Architecture site as a view of the knowledge base: the
  engine fills it from the graph, nobody edits its data. Use when the user wants to see the site,
  build or render the HTML page, produce the PRD/Architecture viewer, or publish it to GitHub Pages.
---

# The PRD + Architecture site, from the graph

The site is an OTO view this pack ships, `prd-site`, installed in the project's `views/` when the
project declares this pack (it is listed on the project's home page with the other packs' views): `app.json` declares the data file
it reads (`data.js`: `window.__PRD__`, `window.__ARCH__`) and the projections that fill it from the
knowledge base. There is no data file to author: what the graph holds is what the site shows, dated;
a section the graph cannot fill is empty until a section is captured (**prd-build**, OTO's **capture-form**).

## Steps

1. The project: an OTO project with a build (`oto status --project <root>`; `oto build` if it is
   stale). The view requires the product's classes (`app.json`, `requires`); a project that lacks
   them is refused with the names.
2. **See it live**: `oto serve --project <root> --http <port>` serves the project's home page with
   `prd-site` among its views (`--view prd-site` serves it alone); open the URL it prints. The page
   reads the store; a rebuild shows up on reload.
3. **Publish it**: `oto build --project <root> --target site --view prd-site`
   writes `build/site/` (the four files and `data.js` generated); `bash build/site/publish.sh
   <repo url>` puts it on GitHub Pages. Mermaid loads from a CDN, so viewing needs internet.
4. Say what the site shows and what it cannot yet: read `data.js`'s empty sections back as the
   open questions they are (`oto query questions`), never fill them by hand.

## What the site contains

PRD: Overview, Strategic Context, Personas, Product, Use Cases / Journey, Specifications
(Functional / Non-Functional / Policies), Release & Rollout, Governance, Risk, Glossary.
Architecture: Context & Drivers, Decisions, Tech Stack, Components (subdomains → contexts with
their commands, events, read models, rules), Resources, APIs, Integrations, Security,
Infrastructure, Design / UX, Project Structure, Knowledge Base. The projection maps the PRD from
`product` (this pack), and the architecture from `software-architecture` and, for the parts a
product designs with DDD, from `ddd`: the architecture half is optional in the view (`$optional`),
so it is empty in a product that composes no `software-architecture`, and its DDD pages are empty
in a product that does not add `ddd`. A section no pack covers yet (tech stack, design links, the
pattern library) is empty by declaration, not by omission.
