---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: How work flows across a team's kanban board: ordered columns, cards and the dated moves that carry them, work-in-progress limits and why they changed, blockers and whom they wait on, explicit policies, and replenishment meetings. The pack 'kanban' (release 1) embeds the ontology 'kanban' (release 1), which declares Board, Column, Card, Move, WipLimit, Blocker, Policy, Replenishment and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# kanban

How work flows across a team's kanban board: ordered columns, cards and the dated moves that carry them, work-in-progress limits and why they changed, blockers and whom they wait on, explicit policies, and replenishment meetings.

This skill comes with the `kanban` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add kanban` from the cynergis registry), `oto init --pack kanban` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Board**: A team's kanban board: the columns its work flows through, the policies it makes explicit, and how long it tells people a card should take.
- **Column**: A step on a board that cards pass through, in order, marked as waiting, being worked on, or done.
- **Card**: A piece of work that flows across a board: when it was asked for, how urgent it is, when it is due, and who is working on it.
- **Move**: A card entering a column on a date. Recorded when it happens and never edited or superseded: where a card is now is its latest move, and its moves are its history.
- **WipLimit**: The most cards a column may hold, set from a date, with why and who decided. A change is a new limit; the earlier ones stay as the record of what was decided.
- **Blocker**: A card stopped because it waits on something: since when, when it cleared, why, and on what or whom.
- **Policy**: A rule a board or a column makes explicit: what must be true for a card to enter or leave a column, the definition of done, or how the team works the board.
- **Replenishment**: A meeting where a board's team chooses which cards to pull in next: when it was held, who decided, which cards came in.
- **Person**: A named individual who works on cards, takes a decision about the board, or is waited on.
- **Team**: A team that owns a board, and that another team's work can wait on.
