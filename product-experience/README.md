# Product experience

Product experience: the objectives a product pursues, the features it is made of, the journeys its personas take step by step, and the words it uses.

Extends `product-core`. One of three focused product ontologies that compose: `product-core`, `product-governance`, `product-experience`. A project takes the core alone, or the core with either or both of the others.

## Classes, and the question each answers

- **Objective**: A qualitative goal for a period, owned by a role and made measurable by success criteria. Objectives support higher objectives; that is strategic alignment.
  - *Question:* What are we trying to achieve this period, and are we on track? Where does this product sit in the strategy? (G1, G2; Gate 3 review)
  - *Why a class:* An objective is dated, owned and superseded, and criteria hang off it; strategic alignment is an objective supporting a higher one, which no attribute can express.
- **Feature**: A user-visible capability the product is made of. Features nest through part_of, so an epic and a sub-feature are the same class at different depths.
  - *Question:* What is the product made of? (D4)
  - *Why a class:* Builders decompose the product into user-visible capabilities, each traced to a requirement; nesting through part_of lets epics and sub-features share one class.
- **UserJourney**: How a persona gets value, end to end: a trigger, ordered steps, an outcome.
  - *Question:* How does a user get value, step by step? (D1)
  - *Why a class:* Design and tests must follow the same path; the journey is the path, owned by a persona and delivering a value proposition.
- **JourneyStep**: One step of a user journey, with its own identity so a design decision, a requirement or a test can point at it.
  - *Question:* How does a user get value, step by step? (D1)
  - *Why a class:* A step has identity of its own: a design decision, a requirement or a test points at one step, which a list attribute on the journey cannot support.
- **Term**: A word with a definition in this product's language, cited and dated, so a changed meaning is superseded rather than argued about.
  - *Question:* What does this word mean here, who said so, and has the meaning changed? (G7; Gate 3 review)
  - *Why a class:* A definition needs a citation and a date so a changed meaning is superseded, which the search lexicon cannot hold; the lexicon is generated from terms instead.

## Relations

- **part_of**: any class → any class. This belongs to that: a feature to its product or parent feature, a step to its journey. Open on both sides, so any ontology that needs containment uses the same relation.
- **realises**: any class → Requirement. The requirement a feature exists to satisfy. The realising side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **pursues**: Product → Objective. The objectives a product works towards. Usually derived (the product offers a value proposition that serves the objective); state it directly only when a document says so.
- **supports**: Objective → Objective. A lower objective that contributes to a higher one. This is where strategic alignment is recorded.
- **defines**: Term → any class. The entity a term is the name for, when there is one. The defined side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.

## The open side

In most relations one side names the anchor and stays typed, and the other names whatever the relation applies to and is open to any class. The engine refuses two sibling ontologies that both widen the same inherited relation, so a closed list on that side would make these ontologies impossible to compose. The cost is that the conformance check no longer catches a wrong class on the open side; the rules still flag what matters.

## Rules

- `feature-serves-its-requirements-purpose` (derive): D2 asks which purpose a feature serves; documents state only which requirement it realises, and the requirement's purpose is one hop away.
- `requirement-in-scope-through-feature` (derive): B1 asks what is in scope; release plans usually list features, and a requirement realised by a scoped feature is in scope too.
- `product-pursues-objective` (derive): G2 asks how the product aligns with objectives; documents state which promise serves which objective, and the product-level edge is one hop away.
