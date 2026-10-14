# The specification

The product's page in its studio: what the product is for and who it serves, what it must do and
within which rules, what comes when, what is decided and what is still open, written as sentences
from the knowledge base. Nothing here is edited by hand; it changes when the facts do.

- `app.json` places it in the studio (`place: product`), says which things it opens (`shows`) and
  which questions' gaps it lists under "Still open" (`open: PR`).
- `projections/spec.json` shapes the product's facts; `app.js` writes them as sentences.
- A topic with nothing recorded is left out, except the first three (why, who, what it must do),
  which say so.
