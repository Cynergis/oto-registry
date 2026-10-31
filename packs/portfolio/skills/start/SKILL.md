---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: What we build, who owns it, what we pursue: the products with their stage, domain and value stream, the roles and teams accountable, the objectives of the period and which products pursue them, the capabilities needed and provided, the dependencies between products, and where each product's knowledge base, site and packs are. The pack 'portfolio' (release 1) embeds the ontology 'portfolio' (release 1), which declares Product, Role, Team, Objective, Capability. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Portfolio

What we build, who owns it, what we pursue: the products with their stage, domain and value stream, the roles and teams accountable, the objectives of the period and which products pursue them, the capabilities needed and provided, the dependencies between products, and where each product's knowledge base, site and packs are.

This skill comes with the `portfolio` pack. The ontology is inside the pack, so nothing is fetched.

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
   with the pack on the machine (`oto pack add portfolio` from the cynergis registry), `oto init --pack portfolio` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed. Add `--ontology <name>,...` to merge other ontologies
   with the pack's (a product type, the flow).

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Product**: A thing we build or run, software or not: the root every other fact about it hangs off. At the portfolio level, what it is, where it stands and where its knowledge lives; the product level says what it must do.
- **Role**: A function accountable for something: Product Owner, Sponsor, Head of Finance Operations. Ownership and decisions attach to a role, never to a named person; the current holder is an attribute.
- **Team**: A group that runs or builds something and can be paged: ownership of the estate and of work attaches to a team. A role is a function; a team is people on a rota.
- **Objective**: A qualitative goal for a period, owned by a role, pursued by products and made measurable by their success criteria. Objectives support higher objectives: that is strategic alignment.
- **Capability**: A business capability the portfolio needs: what the business must be able to do, named in its own words. A product provides it; the estate's systems enable it.
