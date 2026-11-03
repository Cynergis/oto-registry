---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: A professional services firm's client engagements: many clients, every fact traced to the right client and engagement, from the first sales conversation to the close. The pack 'client-engagement' (release 1) embeds the ontology 'client-engagement' (release 1), which declares Client, Engagement, Person, Role, Interaction, DiscussionPoint, Topic, EngagementDocument and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# client-engagement

A professional services firm's client engagements: many clients, every fact traced to the right client and engagement, from the first sales conversation to the close.

This skill comes with the `client-engagement` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add client-engagement` from the cynergis registry), `oto init --pack client-engagement` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **client-engagement:engagements**: Work on one client and engagement at a time from the client engagement knowledge base.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **Client**: An organization the firm sells to or works for.
- **Engagement**: One piece of work for one client, from the first conversation about it through to its close, whether or not it was ever signed.
- **Person**: A named individual on the client's side or the firm's.
- **Role**: A seat on one engagement: what someone is there to do, on which side, filled by a named person or still unfilled.
- **Interaction**: Something that took place with or about a client on a date: a meeting, presentation, call, workshop, interview or a document sent by email.
- **DiscussionPoint**: One thing said during an interaction, and who raised it.
- **Topic**: A subject that can come up across interactions.
- **EngagementDocument**: A named, versioned document the firm produces or exchanges on an engagement: a proposal, statement of work, agreement, deck or report.
- **ScopeItem**: One thing explicitly in or out of an engagement's scope.
- **Deliverable**: Something the firm owes the client on an engagement.
- **SuccessCriterion**: A test by which an engagement or one deliverable will be judged.
- **Commitment**: Something the firm promised or implied, in an interaction or a document.
- **Assumption**: Something the plan or the price rests on that may turn out false.
- **Milestone**: A dated gate, checkpoint or readout on an engagement.
- **Price**: The commercial terms of an engagement at a point in time: fee, model, margin and contingency.
- **Decision**: A choice waiting to be made or already made on an engagement, with who decides, why and what else was considered.
- **Risk**: Something that may harm an engagement, with its rating, mitigation and owner.
- **Finding**: Something the firm concluded about the client's situation, on evidence.
- **Recommendation**: What the firm advised the client to do, and how the client responded.
- **OpenItem**: Something still to be done or resolved: an action, something needed from the client, or an issue.
- **ChangeRequest**: A request to change an engagement's scope, price or dates, with what triggered it and its outcome.
- **ReusableAsset**: A method, template, rubric or tool of the firm's that can be used on many engagements.

## The views it ships

- `engagements`: `oto serve --http <port> --view engagements`, or `oto build --target site --view engagements`

## The guide

# Reading a client engagement graph

## What the graph is for

It answers what is going on with a client and an engagement: why the work exists, who is involved, what was discussed, what was agreed, what is decided and what is still open. It is also how the firm finds what it has done before.

## Where to start

List the clients and engagements, then choose one. Most questions are asked about one engagement. Two engagements can share a name across clients, so always say which client you mean. Questions about what keeps coming up are asked about a client, and questions about past work look across all clients on purpose.

## Common mistakes

Recording a fact with no engagement is refused. If nobody knows which engagement it belongs to, ask before saving. If the engagement or the client is not on file yet, add it first.

Do not treat a meeting's notes as the meeting. The meeting has its own date and attendees, and the notes are the source it cites.

Do not treat a marking of internal as protection. Everyone who can read the graph can read every client in it.

## What the graph does not hold

It holds what the firm found, recommended and agreed. It does not hold the client's own organization or program in detail. It holds no billing, invoices, staffing or utilization yet, because no question has needed them.
