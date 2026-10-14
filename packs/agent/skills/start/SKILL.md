---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: An agent people give work to, as a part of a product: the jobs they hand it and the requirement each meets, its tools and what each reads, changes or sends, what it draws on, its guardrails and who confirms, how it talks, where it hands work over, the test conversations that prove each job, and how it is packaged. The pack 'agent' (release 2) embeds the ontology 'agent' (release 1), which declares Agent, Job, Tool, KnowledgeSource, Guardrail, Evaluation, ConversationStyle. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Agent

An agent people give work to, as a part of a product: the jobs they hand it and the requirement each meets, its tools and what each reads, changes or sends, what it draws on, its guardrails and who confirms, how it talks, where it hands work over, the test conversations that prove each job, and how it is packaged.

This skill comes with the `agent` pack. The ontology is inside the pack, so nothing is fetched.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

**A design pattern of `software-architecture`**: for a part of a product that people give work to through an agent rather than a screen: the jobs they hand it, its tools and guardrails, how it talks, and the test conversations that prove each job. In a project that composes `software-architecture`, such a part is modelled
with this pack's **design-agent** skill (`/agent:design-agent`); `oto status` lists the project's patterns.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add agent` from the cynergis registry), `oto init --pack agent` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **agent:design-agent**: Design a part of a product that people give work to through an agent rather than a screen, in an OTO project that composes `agent`.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **Agent**: Something people give work to instead of using a screen: it takes a request in their words, does the job with its tools and answers. A part of the product, packaged as a plugin, a tool server, an app or inside another product.
- **Job**: A piece of work a person can hand to the agent: when it applies, what it produces, how far the agent may act on its own, and the requirement it meets. The unit the builder plans from, as a use case is for an application.
- **Tool**: Something the agent can do beyond talking: look something up, change something, or send something out of the organisation. What it reaches and whether it can be undone decide how it must be guarded.
- **KnowledgeSource**: What the agent reads before it acts: a knowledge base, documents, data or the web, with how current it must be. An agent is only as right as what it draws on.
- **Guardrail**: A limit on the agent: something it must never do, something it may do only after a named person confirms, or a bound it must stay within. It protects the agent, a job or a tool, and may uphold one of the organisation's policies.
- **Evaluation**: A test conversation that proves a job works: what the person asks, what the agent must do, what it must never do, and how it went the last time it ran.
- **ConversationStyle**: How the agent talks with people: its voice, the shape of every exchange (what is next, a few questions, a read-back, a confirmation) and when it shows technical details.

## The guide

# Reading an agent graph

## What this graph is for

It answers what people ask before they trust an agent with their work: what it is for, what it can
touch, what it will never do, who has to say yes before it acts, and how we know it works. Every
answer cites the document that states it.

## The questions it answers well

- **What can I ask it?** The jobs, each with when it applies and what it produces (AG2).
- **What can it touch?** Its tools and everything they reach; the agent's own reach is derived
  from its tools (AG4, AG11).
- **What is guarded, and by whom?** Every tool that changes or sends something, with its guardrail
  and who confirms (AG5, AG6).
- **Does it work?** The test conversations of each job and how each last ran (AG9).

## Where to start reading

Start from the agent and its jobs, then each job's tools. Read the guardrails next to the tools they
protect: a tool that changes something with no guardrail is the first thing to settle.

## Common mistakes

- Writing how a platform runs the agent (a prompt, a model, a framework) as part of the design. That
  is the platform binding; record a choice of platform as a decision of the architecture.
- A job that "does everything". Split it until each job has one result a person can check.
- Marking a job ready before a test conversation proves it. The rules refuse it.
