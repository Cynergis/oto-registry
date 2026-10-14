---
name: bind-platform
description: >-
  Bind a product's architecture to where it runs, in an OTO project that composes `platform`: which
  choices the team decides and which it leaves to the builder within limits, the cloud and its
  accounts or projects, each environment's purpose, region, console, logs and infrastructure code,
  the service each part runs on, the stack with versions, secrets by where they are kept, and the
  pipelines, through the curate gates; then say whether each part can be built, deployed and tested
  end to end. Use when someone asks "where does it run", "which cloud", "which AWS account" or "GCP
  project", "set up the environments", "what is the tech stack", "what is left to the builder", when
  the software-architecture pack's architecture-build reaches where the product runs, or when a
  build, deploy or end-to-end test is blocked on a missing detail.
---

# Bind the architecture to where it runs

The design says what the product does; the binding says where it runs and what it is built with,
with every detail an implementing agent needs to build, deploy and test it end to end, and who
decided each choice. The `platform` ontology decides what to ask; its questions (PL1–PL13) are the
gates, and its briefs say, part by part, what is still missing.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

## Before the first question

1. The project composes `platform`: `oto status --project <root>` marks this pack `(binding of
   software-architecture)`, and the vocabulary holds `Choice`. The binding is chosen when the project
   starts (`--ontology` with `platform` beside the type, the architecture and the patterns); a project
   started without it cannot add it afterwards.
2. The architecture comes first: the systems, components, data stores and environments already
   captured are what the binding is about. Reference them; never capture them twice.
3. **Adding to something already captured** (a component's service, an environment's region): restate
   the item with its label and summary exactly as recorded, and add only the new fields and links.
   A changed label or summary is a new fact that replaces the old one, and the gates refuse it
   without a supersession.

## How each group is captured

Run OTO's **capture-form** skill on the project's `capture.json`, with its three choices at every
read-back (save it and move on, dig deeper, see it from someone else's side). Every confirmed group
goes through the gates as a capture file with `scope` the product.

## The topics

Announce each topic in plain words and keep to its order; the names in brackets are for you.

1. **Who decides what.** The choices the design needs before it can be built: the cloud, the
   regions, the service under each part, the languages and frameworks, anything else the team cares
   about (`Choice`: its `category`, the part it `shapes`). For each, ask whether a named person
   decides it or it is left to the builder; when it is left to the builder, ask within what: the
   options allowed (`allowed`), and the constraints, earlier decisions or policies it must keep to
   (`bounded_by`). Record each decision taken with what was chosen, what else was considered, what
   follows from it, why, and whose call it was (`Decision`: `option`, `alternatives`,
   `consequences`, `rationale`, `decided_by`, `status`). Gates: PL9, PL10.
2. **Where it runs.** The cloud (`Platform`) and its accounts: the AWS account, the GCP project or
   the Azure subscription, with its id (`Account`). Each environment: what it is for, its region,
   where its console and logs are opened, the repository whose infrastructure code creates it.
   Gates: PL1, PL2.
3. **What each part runs on and is built with.** The managed service under each component and store
   (`PlatformService`, `runs_on`); each component's languages, frameworks and libraries at their
   versions (`Technology`, `built_with`). Gates: PL4, PL7.
4. **Secrets.** Which secrets each component needs, by name, and where each is kept (`SecretRef`,
   `kept_in`). Never a value: if the person starts to give one, stop them and say that only its name
   and its place are recorded.
5. **How it gets there.** The pipelines, what each builds and deploys, and to which environments
   (`Pipeline`, `deploys`, `deploys_to`). Gate: PL6.
6. **Ready to build, deploy and test.** For each component and environment, run the briefs (for you):
   `oto query --project <root> brief implement-component COMPONENT=<id>`, `deploy-component`, and
   `test-end-to-end ENVIRONMENT=<id>`. Tell the person, part by part, in plain words, what is ready
   and what is still missing, and who can answer each.

## When the builder makes a pick

A choice left to the builder is the builder's to propose: you, or the implementing agent, may pick an
option within the allowed ones, with a reason. Record it as a proposed decision, read it back with
the alternatives and the reason, and ask the person who confirms such picks. It is accepted, and
settles the choice, only when they confirm; never mark it accepted on your own. Until then, the
build of what it shapes stays blocked.

## When the checks refuse something

Read the check (for you) and say in plain words what does not hold together and how to settle it;
never force.

- The builder's pick is not one of the options it was allowed: pick an allowed one, or have the
  person widen the options.
- A choice is left to the builder with no limits: say which options are allowed, or what it must
  keep to.
- A decision is marked accepted with nobody named: say whose call it was.

A warning is something still open: a decision with no alternatives recorded, a secret kept nowhere.
Say it, with who can answer it, and go on.

## Where people see it

The binding shows on the product's studio page **Where it runs**: the platform and accounts, each
environment, what each part runs on and is built with, the secrets by name and place, the pipelines,
who decided each choice, and what is still missing. Say so when a topic is saved, in plain words.

## Guardrails

- Never invent an account id, a region, a version or a URL; what nobody knows stays open, and the
  briefs say so.
- Never record a secret's value.
- Do not edit the vocabulary, the design itself, or anything outside the binding.
