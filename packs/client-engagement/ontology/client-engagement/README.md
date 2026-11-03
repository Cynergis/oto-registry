# client-engagement

The client engagements of a professional services firm that offers IT consulting: cloud migration, AI transformation, software application development, data science and data engineering. It tracks what was discussed, agreed, decided and left open on every statement of work, from the first sales conversation to the close.

## The rule

The graph holds many clients, and every fact traces to the right client and the right engagement. An engagement names exactly one client. Most facts name exactly one engagement, and the engine refuses them without it. An interaction may concern several engagements, or a client alone. Clients, people, topics and reusable assets stand on their own, because they span engagements.

## How to read a graph in this vocabulary

Start from a client, choose an engagement, and follow what hangs from it: who is involved, what happened, what was agreed, what is decided and what is still open.

An interaction is the event, and its notes or transcript are the source document. A role is a seat, and a person fills it. A decision keeps its reason and its rejected options. What the firm needs from the client is an open item owned on the client's side.

Internal terms such as margin are marked as internal. That marking does not restrict who can read the graph. If some people must not see some clients, use one graph per client.

## Where the baseline comes from

Common practice shaped the terms: sales qualification for the buying roles, project logs for risks, assumptions, issues and changes, and commercial systems for the path from quote to contract. None of these is imposed as a standard here. Each term exists because a question in `questions.json` needs it.
