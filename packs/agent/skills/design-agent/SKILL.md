---
name: design-agent
description: >-
  Design a part of a product that people give work to through an agent rather than a screen, in an
  OTO project that composes `agent`: who it works for and the jobs they hand it, the tools it uses
  and what each changes, what it reads, its guardrails and who confirms, how it talks, where it
  hands work over, and the test conversations that prove each job, each traced to a requirement and
  to the architecture, through the curate gates. Use when a part of the product is an agent or a
  plugin: "design the agent", "what should the assistant do", "agent guardrails", "plugin design",
  or when the software-architecture pack's architecture-build hands it a part that is an agent.
---

# Design a part that is an agent

An agent is one kind of part a product can have, beside an application and a data pipeline: the
part people give work to in their own words instead of using a screen. This skill designs that
part. The `agent` ontology decides what to ask; its questions (AG1–AG12) are the gates.

The design says **what** the agent does, never **how** a given platform runs it: no model, prompt,
framework or host is captured on these items. A plugin, a tool server or an app is how the agent is
packaged, and that is recorded. If someone names a platform, record it as a decision of the
architecture.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

## Before the first question

1. The project composes `agent`: `oto status --project <root>` names it, and the vocabulary holds
   `Agent`. The pattern is chosen when the project starts (`oto init --pack product --ontology
   product-<type>,software-architecture,agent,flow`, or `--ontology agent` beside the others); a
   project started without it cannot add it afterwards.
2. The architecture comes first: the agent is `deployed_as` a component, and its tools reach the
   systems, interfaces and stores of `software-architecture`. What the product and the estate
   already hold is referenced, never captured twice: personas, roles, requirements, policies,
   decisions, open questions, the team, the component.
3. Which agent: the part this design covers and who it is for. Keep to it.

## How each group is captured

Run OTO's **capture-form** skill on the project's `capture.json`, with its three choices at every
read-back (save it and move on, dig deeper, see it from someone else's side). Every confirmed group
goes through the gates as a capture file with `scope` the product.

## The six topics

Announce each topic in plain words and keep to its order; the names in brackets are for you.

1. **Who it is for, and what they will ask it.** The agent (`Agent`: its `packaging`,
   `distribution`, `readiness`) and the people it `works_for`; each job they can hand it (`Job`):
   when it applies (`when_to_use`, in the words people will use), what it `produces`, who it is
   `requested_by`, and the requirement it `satisfies`. Split a job that "does everything" until each
   has one result a person can check. Gates: AG1, AG2.
2. **What it can do and touch.** Its tools (`Tool`, `equipped_with`): whether each only looks
   something up, changes something, or sends something out (`effect`), whether that can be undone
   (`reversible`), and what each `reaches` in the architecture; which jobs `call` which tools.
   Gate: AG4.
3. **What it reads before it acts.** Each source it `draws_on` (`KnowledgeSource`: its `kind`, how
   current it must be, where it is `held_in`). Gate: AG7.
4. **Its limits.** Start from every tool that changes or sends something, and ask what keeps it safe:
   something it must never do, something it may do only after a named person confirms
   (`confirmed_by`), or a bound it keeps (`Guardrail`: `kind`, `rule`, what it `protects`, the
   policy it `upholds`). Then each job's `autonomy`: it only suggests, it acts once a person
   confirms, or it acts alone. Gates: AG5, AG6.
5. **How it talks, and where it hands over.** Its voice and the shape of every exchange
   (`ConversationStyle`, `speaks_in`); offer the plain default: say what is next, a few questions at
   a time, read back, confirm, technical details only when asked. Where each job passes the work on:
   to another job, another agent or a person (`hands_off_to`). Gates: AG8, AG10.
6. **How we know it works.** For each job, at least one test conversation (`Evaluation`, `proves`):
   what the person says (`request`), what the agent must do (`expected`) and must never do
   (`must_not`), and how it went the last time it ran (`result`; `not_run` until it has run). You may
   draft one from the job and its guardrails, but the person confirms it; never invent a result.
   Gates: AG9, AG3.

## When the checks refuse something

Read the check (for you) and tell the person in plain words what does not hold together and how to
settle it; never force.

- A job that acts alone uses a tool that needs someone's confirmation: either the job asks first, or
  the confirmation is not needed.
- A job uses a tool the agent must never use: drop the tool from the job, or change the guardrail.
- A job acts alone with a tool that changes or sends something, and nothing protects it: say who
  confirms, or what bounds it.
- A job is marked ready but meets no requirement, has no test conversation, or fails one: it is not
  ready yet; say which is missing.

A warning is something still open: a confirmation with nobody named to give it, technical details
shown without being asked, a ready job with an open question. Say it, with who can answer it, and
go on.

## Where people see it

The agent shows on the product's studio page **How people work with it**: its jobs, its tools and
what they change, the limits it keeps and who confirms, what it reads, and its test conversations,
with what is still open. Say so when a topic is saved, in plain words.

## Readiness and the builder's brief

`readiness` (draft, ready, built) is declared on the agent and on each job. A job is ready when it
meets a requirement, a test conversation proves it and passes, and no open question remains on it
(AG12 is empty). AG11 says where the agent sits: its component, its team, what it depends on, and
everything it reaches through its tools. Check the gates with `oto query --project <root>
questions` (for you), and tell the person in plain words what the design now settles, what is still
open, and who can answer each open point.

Building it is a feature at a time, with the job's brief in hand (`kg_brief`); the platform it runs
on is a decision of the architecture.

Do not edit the vocabulary, another part's items, or anything outside this agent.
