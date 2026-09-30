# Product core

Product core: what is being built, who answers for it, who it is for, what it promises, what it must do, how that is accepted, what ships when, what was decided and what is still open.

Extends `oto-core`. One of three focused product ontologies that compose: `product-core`, `product-governance`, `product-experience`. A project takes the core alone, or the core with either or both of the others.

## Classes, and the question each answers

- **Product**: The thing a project sets out to build, software or not. The root every other class hangs off.
  - *Question:* Why does this product exist, and what is it? (A1)
  - *Why a class:* The root the whole vocabulary hangs off. Generic on purpose: one vocabulary every project starts from, a product being whatever the project sets out to build.
- **Role**: A function accountable for something: Product Owner, Sponsor, Lead Designer. Attach ownership and decisions to a role, never to a named person; the current holder is an attribute.
  - *Question:* Who owns it and who decides? (A4)
  - *Why a class:* Ownership questions are answered better by a role than a person, because roles are stable while people move; the holder is an attribute with history by supersession.
- **Persona**: A kind of user the product is for, or explicitly not for. Journeys, requirements and value propositions point at a persona.
  - *Question:* Who is it for, and who is it not for? (A2)
  - *Why a class:* Journeys, requirements and value propositions need something to point at, and the excluded audience must be a dated first-class fact, not a footnote.
- **ValueProposition**: One promise the product makes to a persona, and the problem it solves. The anchor every requirement, journey and success criterion traces to.
  - *Question:* Why does it exist, and what is the value proposition in one sentence? Which requirement serves which purpose? (A1, A3, D2)
  - *Why a class:* It is the traceability anchor: requirements, journeys and criteria trace to it, so an orphan requirement (failure F3) becomes a rule violation instead of folklore.
- **SuccessCriterion**: A measurable statement of what success looks like: a metric, a target, a date, an owner role.
  - *Question:* How do we know the product succeeded? (B2, failure F4)
  - *Why a class:* A target that changes needs history and an owner, and a product with none must be flaggable; an attribute list gives neither.
- **Requirement**: A stated need the product must satisfy, functional or otherwise. The unit a builder works from and a release scopes.
  - *Question:* What must the product do? What is in scope for the next release? (B3, B1)
  - *Why a class:* The unit a builder agent works from and a release scopes; it carries priority and kind, traces to a value proposition, and is what decisions are about.
- **Scenario**: One concrete path through a requirement or a journey step: given, when, then. What a test verifies and what acceptance is judged on.
  - *Question:* What exactly must this do in this situation, and how do we test it? (G5; Gate 3 review)
  - *Why a class:* A scenario is the concrete path tests and acceptance run on, with its own preconditions and expected result; it must be pointable from a test and a requirement.
- **Release**: A dated boundary of scope: what ships together. Requirements and features are in scope of, or excluded from, a release.
  - *Question:* What is in and out of scope for the next release, and what was the scope as of a past date? (B1, C3)
  - *Why a class:* Scope has to be scope OF something dated; edges to a release carry validFrom and validTo, so the boundary at any past date is readable.
- **Decision**: A dated choice with its reason and evidence, made by a role. Settles what it is about, so nobody reopens it by accident.
  - *Question:* What did we decide about X, when, and why? (C1, failure F1)
  - *Why a class:* A decision has a date, a reason, evidence and a role that made it; a status field has none of those, and an agent needs to see a settled decision before reopening it.
- **OpenQuestion**: Something unresolved that a decision must settle. Raised, then resolved by a decision, or dropped.
  - *Question:* What is still open or unresolved? (C2)
  - *Why a class:* An open question is raised before any reason or evidence exists and is later resolved by a decision; keeping it separate lets an agent list what is open before building.

## Relations

- **owned_by**: any class → Role. The role accountable for this. Ownership sits on a role, not a person, so it survives people moving. The owned side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **decided_by**: Decision → Role. The role whose call it was.
- **offers**: Product → ValueProposition. The promise a product makes. A product usually offers more than one.
- **intended_for**: any class → Persona. The persona this exists for: a value proposition first, and whatever an extension adds (a journey, a report). Point at an excluded persona to say who it is deliberately not for. The intended side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **serves**: any class → any class. The purpose this exists for: a requirement serves a value proposition, and, where an extension adds them, a promise serves an objective. The traceability spine an agent walks from a requirement up to the strategy. Open on both sides, so no extension redeclares it and ontologies compose in any order.
- **measures**: SuccessCriterion → any class. What a criterion tells you succeeded. The measured side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **in_scope_of**: any class → Release. Ships in this release. Dated, so scope as of a past date is readable. The scoped side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **excluded_from**: any class → Release. Explicitly not in this release. Recorded, not silently absent, so a builder sees the boundary. The excluded side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **about**: Decision|OpenQuestion → any class. What a decision settles, or what an open question concerns. The subject side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **resolves**: Decision → OpenQuestion. The open question this decision closes.
- **blocks**: OpenQuestion → Release. An unresolved question a release should not ship with.
- **documented_in**: any class → Document. The artifact that formally specifies this: a brief, a PRD, a UX spec. Distinct from source_doc, which is provenance: the document that introduced the fact into the graph, possibly a transcript. The documented side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **interested_in**: Role → any class. What a stakeholder role must be consulted or informed about. The subject side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **exercises**: Scenario → any class. The requirement a scenario is a concrete path through, or whatever an extension adds (a journey step). The exercised side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.

## The open side

In most relations one side names the anchor and stays typed, and the other names whatever the relation applies to and is open to any class. The engine refuses two sibling ontologies that both widen the same inherited relation, so a closed list on that side would make these ontologies impossible to compose. The cost is that the conformance check no longer catches a wrong class on the open side; the rules still flag what matters.

## Rules

- `open-question-blocks-release` (derive): C2 asks what is still open before a build; an open question about an in-scope requirement blocks that release, and nobody writes that down. Only questions in state open count; a resolved one must not block.
- `requirement-serves-a-purpose` (policy, warn): Failure F3: a requirement with no traceable reason gets built or dropped arbitrarily.
- `value-proposition-has-success-criterion` (policy, warn): Failure F4: success was never defined, so nobody could say when the product was done.
- `decision-is-documented` (policy, warn): C4 and failure F2: a decision nobody can open is a rumour, and the graph would carry it as fact.
- `scope-is-not-contradictory` (policy, blocking): Failure F1: a builder agent cannot see the boundary if the graph says both; the older fact must be superseded, not left standing.
- `shipped-release-is-not-blocked` (policy, warn): C2 and B1 together: a release that shipped with a question still open means either the state or the question is stale, and someone should say which.
