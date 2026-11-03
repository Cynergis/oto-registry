---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Client engagements end to end: pursuits, statements of work and change orders, pricing and margin bands, staffing, risks and commitments, billing, on top of professional services delivery. The pack 'client-engagements' (release 1) embeds the ontology 'client-engagements' (release 1), which declares Pursuit, StatementOfWork, ChangeOrder, ScopeItem, SolutionDocument, Assumption, PricingModel, MarginBand and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# client-engagements

Client engagements end to end: pursuits, statements of work and change orders, pricing and margin bands, staffing, risks and commitments, billing, on top of professional services delivery.

This skill comes with the `client-engagements` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add client-engagements` from the cynergis registry), `oto init --pack client-engagements` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Pursuit**: An opportunity to win work from a client, from first conversation to a signed statement of work, a loss or a withdrawal.
- **StatementOfWork**: The signed contract document that sets an engagement's scope, price, staffing and terms.
- **ChangeOrder**: A dated amendment to a statement of work that changes its scope, price or terms, with the reason for it.
- **ScopeItem**: One in-scope or out-of-scope statement in a statement of work or change order, with the clause it sits in.
- **SolutionDocument**: A solution design, proposal or approach document we wrote for a pursuit or an engagement.
- **Assumption**: Something a solution, price or statement of work takes as true about the client's environment, confirmed or not.
- **PricingModel**: How an engagement, pursuit or change order is priced: the commercial model, the price, the cost and the margin it was priced at.
- **MarginBand**: The approved floor and target margin for a commercial model, as set by the firm's pricing policy at a point in time.
- **Assignment**: A person or an open position in a role on an engagement or pursuit, from a date to a date, planned or actual, with its rates.
- **Platform**: A technology product or platform an engagement or solution works on: a core banking system, a cloud, a data platform.
- **Regulation**: A named regulatory instrument or guideline an engagement must respect, cited by its official title.
- **Risk**: An open risk or blocker to an engagement, with an owner, a state and what it is waiting on.
- **Commitment**: Something one party promised another on a pursuit or engagement: what we promised in pre-sales, or what the client committed to provide.
- **BillingMilestone**: A billable point in an engagement, usually tied to a deliverable's acceptance, with its amount.
- **Invoice**: An invoice issued to a client for a milestone or a period of time-and-materials work.
