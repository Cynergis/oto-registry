# client-engagements

The vocabulary for a consulting engagement from first conversation to final invoice. It extends `professional-services`, which already covers delivery (engagements, workstreams, deliverables, governance forums, sessions, decisions, action items, questions, roles and documents), and adds what comes before, around and after it.

## What it adds

- **Pre-sales:** a `Pursuit` is an opportunity before it is signed, with its stage, its lead and why it was won or lost. A won pursuit `became` an `Engagement`, so everything said and promised during the pursuit stays reachable from the work.
- **Contracts and scope:** a `StatementOfWork` and the `ChangeOrder`s that amend it are documents. Each `ScopeItem` is one in-scope or out-of-scope line with its clause, so "what did we sign, and what is it now" is a history of dated changes with reasons.
- **Solutions:** a `SolutionDocument` is written for a pursuit or engagement, involves `Platform`s, is subject to `Regulation`s and rests on `Assumption`s that are confirmed or not.
- **Pricing:** a `PricingModel` carries the commercial model, price, cost and priced margin, and is `held_to` the `MarginBand` in force when it was set. Exceptions are `Decision`s that decide the pricing.
- **Staffing:** an `Assignment` is a person (or an open position) in a role on an engagement or pursuit, planned or actual, with dates, allocation and day rates in CAD. The rule `actual-assignment-is-experience` derives `worked_on`, which is how "who has done this before" is answered.
- **Risks and commitments:** a `Risk` (or blocker) threatens work and `waits_on` someone. A `Commitment` is a promise in either direction: `promised_by` says whose.
- **Billing:** a `BillingMilestone` `bills_on` a deliverable's acceptance; an `Invoice` bills a milestone or an engagement.

## Reading a graph in it

Start from an engagement. Its pursuit, contract, scope history, price, staff, risks, commitments, regulations and billing are each one or two hops away. For finding past work, start from a platform or a regulation and walk to the solutions and the people who `worked_on` the engagements that involved it.

Regulations are recorded only as real, cited instruments (for example OSFI Guideline B-13). Do not invent regulatory categories.

Staffing and rate data identify people and their cost. Treat a project on this pack as holding personal information under PIPEDA and restrict access accordingly.
