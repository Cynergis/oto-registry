---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: The data semantic layer as facts: a store's tables and columns with their types, keys and a meaning that is a draft until a named person confirms it, the jobs and feeds that load each table (lineage from a dbt manifest or the ETL's SQL), who reads each table and how (usage from the query log). oto data introspect, lineage, usage, meaning and confirm come with the pack, with the data-meaning skill; the engine ships no data layer of its own. The pack 'data' (release 1) embeds the ontology 'data' (release 3), which declares Table, Column, Feed, LoadJob, Usage. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Data

The data semantic layer as facts: a store's tables and columns with their types, keys and a meaning that is a draft until a named person confirms it, the jobs and feeds that load each table (lineage from a dbt manifest or the ETL's SQL), who reads each table and how (usage from the query log). oto data introspect, lineage, usage, meaning and confirm come with the pack, with the data-meaning skill; the engine ships no data layer of its own.

This skill comes with the `data` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add data` from the cynergis registry), `oto init --pack data` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **data:data-meaning**: What a table or a column is about, in one sentence each, for a store the data layer has introspected.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **Table**: A relation in a data store: a table or a view, with its columns. Part of the DataStore it lives in. What it is about is a description that is a draft until a person confirms it.
- **Column**: One column of one table: its type, whether it may be null, whether it is a key, and what it means. A foreign key references the column it points at.
- **Feed**: An external source a store is loaded from: a file dropped by a partner, an API, a stream, another organisation's database. Where the rows come from before any job touched them, so the source of truth is named.
- **LoadJob**: The process that loads a table: an ETL or ELT job, a scheduled query, a replication task. Sourced from a feed, a table or a store; loads one or more tables. Its schedule and tool are what the config says.
- **Usage**: One consumer's use of one table: who reads it (a component, a team or a role) and how, transactionally (reads by key, as an application does) or analytically (aggregates, as a report does). Known from a query log or declared by a person.
