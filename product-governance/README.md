# Product governance

Product governance: the policies a product must obey and who enforces them, the constraints it is built under, the assumptions it rests on, and the risks to it.

Extends `product-core`. One of three focused product ontologies that compose: `product-core`, `product-governance`, `product-experience`. A project takes the core alone, or the core with either or both of the others.

## Classes, and the question each answers

- **Policy**: A rule the product must obey that comes from outside it: business, compliance, data, security. Has an authority and a role that enforces it; distinct from a constraint, which limits resources.
  - *Question:* Which rules must the product obey, who enforces them, and what is affected? (G6; Gate 3 review)
  - *Why a class:* A policy prescribes behaviour and has an authority and an enforcing role, which a budget or timeline constraint does not; two people would populate a shared class differently.
- **Constraint**: A limit the product is built under: budget, platform, regulation, timeline. Imposed from outside, not chosen.
  - *Question:* What constraints is it built under? (B4)
  - *Why a class:* A constraint is imposed from outside and limits requirements and releases; it has a source and a lifecycle distinct from an assumption or a risk.
- **Assumption**: Something believed but not yet verified, on which a decision or requirement rests. Validated or invalidated over time.
  - *Question:* What assumptions is it built under, and which could invalidate the plan? (B4)
  - *Why a class:* An assumption is validated or invalidated over time and decisions rest on it, so its state change must propagate; that needs a node with history.
- **Risk**: A known way this can go wrong, including an external dependency whose failure would hurt. Mitigated, accepted or realised over time.
  - *Question:* What are the risks and external dependencies? (E1)
  - *Why a class:* A risk threatens something, is mitigated by something, and can block a release; an external dependency is modelled as a risk kind because what matters is what happens if it fails.

## Relations

- **constrains**: Constraint → any class. What a constraint limits. The constrained side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **relies_on**: any class → Assumption. An assumption this rests on. If the assumption is invalidated, this must be revisited. The relying side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **threatens**: Risk → any class. What a risk applies to. The threatened side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **mitigated_by**: Risk → any class. What reduces a risk. The mitigating side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **applies_to**: Policy → any class. What a policy prescribes behaviour for. The governance edge: from here, enforced_by says who enforces it. The governed side is open to any class, so an ontology that extends this one adds its own classes without redeclaring the relation.
- **enforced_by**: Policy → Role. The governance role that enforces a policy.

## The open side

In most relations one side names the anchor and stays typed, and the other names whatever the relation applies to and is open to any class. The engine refuses two sibling ontologies that both widen the same inherited relation, so a closed list on that side would make these ontologies impossible to compose. The cost is that the conformance check no longer catches a wrong class on the open side; the rules still flag what matters.
