# kanban

How work flows across a team's kanban board, as facts a team can ask about: which columns are over
their limit, what is blocked and on whom, how long a card took, what the board looked like on a past
date, and how often the team keeps the time it tells people to expect.

## What a graph in this vocabulary holds

- A **Board** belongs to a **Team** and has ordered **Columns**, each marked *waiting*, *working* or
  *done*. The board carries its service level expectation: the expected days and the share of cards
  expected to finish within them ("85% within 10 days").
- A **Card** is a piece of work: when it was requested, its class of service (standard, expedite,
  fixed date), its due date, and the **Person** working on it.
- A **Move** is a card entering a column on a date, out of the column it left. Moves are kept, never
  edited or superseded: a card's column now is its latest move, and its moves are its history. One
  move per card per day; a policy rule warns about two on the same day.
- A **work-in-progress limit** limits one column from the day it was set, with a reason and who
  decided. A change is a new limit; the column's limit now is its latest one, and a column with none
  is unlimited.
- A **Blocker** stops a card from a date until it clears, with a reason, waiting on a person, a team
  or another card. A blocked card stays in its column.
- A **Policy** governs a column (on entering or leaving it) or the whole board. Two rules gather every
  policy that holds on a board, so two boards' policies can be compared.
- A **replenishment meeting** chooses which cards a board pulls in next, and who decided.

## Reading the answers

The questions find the cards, moves and dates; counting and durations are worked out from what they
return. "Over the limit by how many" counts a column's cards against its latest limit; cycle time runs
from a card's first move into a working column to its move into done, lead time from its requested-on
date; the board on a past date is each card's latest move on or before it.

## Left out until a question needs them

Swimlanes, card types, sizes and estimates, and who requested the work.
