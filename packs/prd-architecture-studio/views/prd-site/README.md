# PRD site — a view of the knowledge base

A read-only site that presents two linked documents, a **Product Requirements Document** and an
**Architecture & Design** document, structured on the BMAD method, with a `PRD | Architecture`
switcher, a left nav, modal detail cards and bidirectional traceability links.

It is an OTO **view**: `app.json` declares the one data file it reads, `data.js`, and the
projections (`projections/prd.json`, `projections/arch.json`) that fill `window.__PRD__` and
`window.__ARCH__` from the graph. Nobody edits `data.js`: the engine writes it from the knowledge
base, dated, on every build, so the site shows what is believed and nothing else.

```bash
oto serve --project <root> --view prd-site                        # live, from the store
oto build --project <root> --target site --view prd-site          # static: build/site/
bash publish.sh https://github.com/<you>/<repo>.git               # the static site to GitHub Pages
```

What the site shows is what the graph holds: a section the graph cannot fill is empty, and says
so, until someone captures it (the **elicit** skill). `index.html`, `support.js` and `engine.js`
are the renderer and are the same for every product.
