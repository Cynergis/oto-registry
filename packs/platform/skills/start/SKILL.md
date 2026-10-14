---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: The platform binding of a product's architecture: where each part runs (platforms, accounts, environments with their region, console, logs and provisioning), what it runs on and is built with (managed services, technologies at their versions), its secrets by where they are kept, the pipelines that deploy it, and who decides each choice: a named person, or the builder within limits. Briefs stop an implementing agent that lacks any of it. The pack 'platform' (release 1) embeds the ontology 'platform' (release 1), which declares Platform, Account, PlatformService, Technology, Choice, SecretRef, Pipeline. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Platform binding

The platform binding of a product's architecture: where each part runs (platforms, accounts, environments with their region, console, logs and provisioning), what it runs on and is built with (managed services, technologies at their versions), its secrets by where they are kept, the pipelines that deploy it, and who decides each choice: a named person, or the builder within limits. Briefs stop an implementing agent that lacks any of it.

This skill comes with the `platform` pack. The ontology is inside the pack, so nothing is fetched.

## Talking with the person

- **Plain, natural language, in the person's words.** Never say question numbers, ids, class or
  field names, file names or commands, and never paste what a command printed.
- **Technical details only when the person asks for them.** Never offer them, not even as a choice.
- **The same clear shape every time:** say what we are about to do, ask a few questions at a time,
  read back what you understood in plain sentences, confirm, then say what is next.

**A binding of `software-architecture`**: for where each part of the product runs and what it is built with: the cloud and its accounts, environments, services, the stack with versions, secrets and pipelines, and who decides each choice. In a project that composes `software-architecture`, the binding is captured
with this pack's **bind-platform** skill (`/platform:bind-platform`); `oto status` lists the project's bindings.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add platform` from the cynergis registry), `oto init --pack platform` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Go on with this pack's skills**, written for this domain:

   - **platform:bind-platform**: Bind a product's architecture to where it runs, in an OTO project that composes `platform`.

3. **For anything else, the engine's skills**: capture-form to answer the vocabulary's
   questions in an interview, ontology-interview to fit the vocabulary to the documents at hand,
   build-knowledge-base for a folder of documents, query-knowledge for questions. The engine
   plugin `oto` comes with this pack: the `kg_*` tools and the generic skills are available once
   it is installed.

## What the ontology declares

- **Platform**: Where the product's parts are hosted: a cloud provider, or the organisation's own data centres.
- **Account**: The container on a platform where an environment's resources live and are billed: an AWS account, a GCP project, an Azure subscription.
- **PlatformService**: A managed service of a platform that a component or a data store runs on: a container runtime, a managed database, object storage, a queue, a secret manager.
- **Technology**: A language, framework, library, runtime or engine a component is built with, at a version.
- **Choice**: A choice the design needs made before it can be built: the cloud, a region, a service, a framework. Either a named person decides it, or it is left to the builder within limits: the options allowed, and the constraints and decisions that bound it.
- **SecretRef**: A secret a component needs, recorded by its name and where it is kept, never by its value.
- **Pipeline**: What builds and deploys a component or a store to its environments: a CI/CD pipeline, at a place people can open.

## The guide

# Reading a platform binding

## What this graph is for

It answers what an implementing agent, an on-call engineer and a tester need before they touch the
running product: where each part runs, on what, built with what, with which secrets from where, how
it gets there, and who decided each of those choices.

## The questions it answers well

- **Can this component be built, deployed, tested?** The briefs say READY or BLOCKED, naming what is
  missing: `oto query brief deploy-component COMPONENT=<id>`.
- **Where is it?** The platform, account, region, console and logs of each environment (PL1, PL2).
- **Who decided this, and what else was considered?** Each choice, its authority, its limits and the
  decision that settled it (PL9, PL10).

## Where to start reading

Start from the choices: the ones still unsettled are what stops the build. Then each environment,
then each component's service, stack, secrets and pipeline.

## Common mistakes

- Recording a secret's value. Record its name and where it is kept; the form has no field for a value.
- Leaving a choice to the builder without saying within what. Give the allowed options, or the
  constraints and decisions that bound it.
- Marking the builder's pick accepted before a person has confirmed it.
