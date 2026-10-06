---
name: start
description: >-
  Start or extend an OTO knowledge project in this domain: Motor vehicle claims: policy, coverage, claim, incident, handling, money in and out. The pack 'auto-claims' (release 5) embeds the ontology 'auto-claims' (release 5), which declares Policy, Coverage, Endorsement, Claim, Incident, Vehicle, Party, Role and more. Use when someone wants a knowledge graph, a vocabulary or an interview for this domain.
---

# Auto Claims Knowledge Base

Motor vehicle claims: policy, coverage, claim, incident, handling, money in and out.

This skill comes with the `auto-claims` pack. The ontology is inside the pack, so nothing is fetched.

1. **Start a project from this pack.**

   ```bash
   oto init --name "<project name>" --pack "${CLAUDE_PLUGIN_ROOT}" --project <root>
   ```

   `${CLAUDE_PLUGIN_ROOT}` is this pack's directory; Claude Code fills it in. Outside Claude Code,
   with the pack on the machine (`oto pack add auto-claims` from the cynergis registry), `oto init --pack auto-claims` does the same.
   The project records the ontology's origin, so `oto status` says when a newer release exists and
   `oto ontology diff` shows what changed.

2. **Run the ontology-interview skill** to fit the vocabulary to the documents at hand.

3. **Hand over** to the build-knowledge-base skill for the documents, and to the query-knowledge
   skill for questions. The engine plugin `oto` comes with this pack: the `kg_*` tools and the
   generic skills are available once it is installed.

## What the ontology declares

- **Policy**: A contract of insurance, identified by a policy number and effective period.
- **Coverage**: One protection within a policy, with its own limit and deductible.
- **Endorsement**: A change to a policy: an addition, removal or amendment of terms.
- **Claim**: A request for payment made under a policy after an incident.
- **Incident**: The loss event itself: what happened, when and where. Distinct from the Claim reporting it.
- **Vehicle**: A motor vehicle, identified by its vehicle identification number.
- **Party**: A person or organization involved: policyholder, claimant, third party, witness, repairer, medical provider.
- **Role**: A defined function in claims handling, such as adjuster, appraiser or examiner. A role is filled by a party.
- **Task**: A unit of handling work on a claim, with an owner and a state.
- **Assessment**: A damage appraisal, estimate or expert opinion supporting a decision.
- **Decision**: A determination on a claim: coverage, liability, quantum, or a denial, with the reason recorded.
- **Payment**: Money paid out, whether indemnity to a claimant or expense to a vendor.
- **Recovery**: Money recovered, whether by subrogation from a responsible party or by salvage disposal.
- **Procedure**: A documented internal way of handling something: a guideline, a checklist, a service standard.
- **Regulation**: An external rule that constrains handling: a statute, a regulator's guidance, an industry standard.
- **Document**: A source document in the corpus: a policy wording, a bulletin, a procedure, a transcript.
