---
name: engagements
description: >-
  Work on one client and engagement at a time from the client engagement knowledge base: list the
  clients and engagements, choose one and keep it as the context for follow-up questions, ask when
  the client or engagement is unclear, offer to add one that is not on file, and file new facts under
  the right engagement. Use when someone asks "which clients do we have", "what's open on this
  engagement", "what did we promise", "who decides", "what was discussed", "work on this client", or
  tells you something to record about a client's work.
---

# Work on one client and engagement at a time

Every fact in this graph belongs to a client and an engagement. This skill adds one thing to OTO's
own skills: it holds which engagement the person is working on, so their follow-up questions stay
inside it, and it asks rather than guesses when that is unclear. Reading follows the **query-knowledge**
skill. Writing goes through the **capture**, **capture-form** and **curate** skills and their gates.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

## 1. Choose the engagement

Use the `kg_*` tools. Where they are not registered, each is a verb of `oto query --project <root>`:
`kg_ask <id> NAME=<id>` is `ask <id> NAME=<id>`, `kg_resolve` is `resolve`, `kg_entity` is `entity`,
`kg_by_type` is `by-type`, and `oto query help` lists the rest. The engine's own messages mention ids
and files, so put them in your own words.

- **No engagement chosen yet, and the question needs one:** run `kg_ask CE1`, show the clients with
  their engagements and each one's stage, and ask which to work on. Offer them as choices with
  `AskUserQuestion` when the host has it and there are four or fewer.
- **The person named one:** run `kg_resolve` on the name, and check its client with `kg_ask CE1`.
- **The graph is empty:** say so, and offer to add the first client and engagement (section 4).

Once chosen, say it back once in a sentence ("We're on the AI delivery assessment for Example
Mutual"). Keep the engagement's id and its client's id for the rest of the conversation.

## 2. Keep it until the person changes it

- Answer every follow-up within the chosen engagement, and do not ask again.
- If a question names another client or engagement, say you are switching before you answer.
- Name the client and engagement again whenever you switch, and when an answer could be misread
  without them.
- Adding a new client or engagement does not switch to it unless the person says so. Ask if unclear.
- The choice lasts for this conversation. A new conversation starts by choosing again.

## 3. When it is not clear, ask

Never guess a client or an engagement. A wrong guess puts one client's facts in another's answer.

| What happens | What to say and do |
|---|---|
| The name fits two engagements, which `kg_resolve` calls ambiguous | Two clients can share an engagement name. Name each with its client, and ask which. |
| The name fits nothing | Say it is not on file. Ask whether it goes by another name, and offer the list. Then offer to add it. |
| The client is on file, but the engagement is not | List that client's engagements, and offer to add a new one. |
| No engagement is chosen and the question needs one | Offer the list, then answer. |

## 4. Add a client or an engagement

Only after the person agrees. Ask for what is needed, read it back and confirm:

- the client's name, unless it is on file;
- the engagement's name, its stage and its service line, if known;
- where this is written down, or who said it and when.

Every fact needs a source. If nothing is written, use the **capture** skill to record the person's
words as a dated note first. Then save through the **curate** or **capture-form** skill. Check the
list first, so a client is not added twice under two spellings.

## 5. Answer

Run `kg_questions` once per conversation, because the list can grow. Match what was asked to a
question, run `kg_ask <id> ENGAGEMENT=<id>`, and report the rows faithfully. Several may be needed.

| They ask about | Question |
|---|---|
| Why the work exists, and how it will be judged | CE2 |
| Who is involved, who pays, champions or could block it | CE3 |
| What was discussed, who attended, what came out of it | CE4 |
| What keeps coming up (takes `CLIENT=<id>`) | CE5 |
| What was presented, and what each person has seen | CE6 |
| Where it stands, and what must clear | CE7 |
| What is in or out of scope, and why it changed | CE8 |
| What we owe, who accepts it, and by what test | CE9 |
| What was promised but the statement of work does not hold | CE10 |
| What the plan and price assume | CE11 |
| What we need from the client | CE12 |
| What stands today, with its dates | CE13 |
| Which decisions are waiting | CE14 |
| What was decided, why, and which options were rejected | CE15 |
| The fee, margin and contingency | CE16 |
| Risks | CE17 |
| Findings, recommendations and whether the client acted | CE18 |
| What is still open | CE19 |
| Change requests | CE20 |
| Follow-on work | CE21 |
| Past work and reuse, across all clients (no parameter) | CE22 |
| What is not yet tied to a client and an engagement (no parameter) | CE23 |

Read `status`: `answered` reports the rows, and `empty` says the gap in plain words. An empty answer
is a fact about the graph. Never fill it from general knowledge. A `—` in a row means nothing is on
record, so say that nobody is named, or that it is not recorded. Where a row gives a role and a person,
name both.

Say which documents the answer comes from, and their date. A question's rows do not carry them, so
run `kg_entity` on the facts you rely on and read their sources.

**A question about a past date:** run `kg_entity` on the engagement's id with `as_of`. It lists by
name what stood on that date, up to 50 entries. For a value such as a fee, run `kg_entity` again on
that fact's name with `as_of`: versions share a name, and the date picks the right one. Use its id
for the current version only, because an id ignores the date. If the name is ambiguous across
engagements, use `kg_neighbors` to find the one on the chosen engagement, and read its `--history`.

**Tools that are not scoped:** `kg_search`, `kg_by_type`, `kg_count`, `kg_group_by` and `kg_overview`
cover every client. Use them only when no question fits, keep only what belongs to the chosen
engagement by checking with `kg_neighbors`, and say that you did. CE22 and CE23 cross clients on
purpose, so say so when you answer from them.

**When no question fits:** say the graph has no question for this yet, give the nearest part, and
name what it leaves out.

## 6. Record something new

When the person says something to record, or hands over a document:

1. **Confirm where it belongs.** Use the chosen engagement. If none is chosen, or the fact might
   belong elsewhere, ask first. If it belongs to no engagement on file, go to section 4.
2. **Hand over to the core skill:** **capture** for a spoken statement, naming the engagement in what
   it is about; **curate** or **capture-form** for a document or notes, with a capture `scope` naming
   the client and engagement so their entries stay apart from other clients'.
3. **When the checks refuse something,** say what in plain words and how to settle it. Never force a
   save or weaken a check.

What to keep straight when saving:

- A meeting may concern several engagements. A general relationship meeting names the client alone.
- The meeting is the event, and its notes or transcript are its source document.
- What the firm needs from the client is an open item owned on the client's side.
- A role can be saved with nobody in it yet, and a person fills it later.
- A new version of a fact keeps the same name and supersedes the old one, so a past date can find it.
  Include the engagement in names that recur, such as a price, so the name stays unique to it.
- A spoken date needs its year, and a date already past may mean the fact has moved on. Ask the person
  rather than assuming either.
- The check on dates does not recognize a shortened month such as "Nov 13". If it refuses one, leave
  the date out and tell the person, or record the person's words with the full date.

## 7. Keep internal details inside

Margin and contingency are internal. Give them when the person asks. If they mean to send them to the
client, say plainly that these are internal and advise against it, and do not draft them into anything
meant for the client. It is the person's decision. The same goes for documents marked internal. These markings do not restrict
who can read the graph, and choosing an engagement does not either. Everyone who can read it can read
every client in it. If asked, say so plainly: keeping some clients from some people takes one graph
per client.
