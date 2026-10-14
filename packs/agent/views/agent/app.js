/* How people work with it: the agents from the knowledge base, written as sentences. */
(function () {
  "use strict";
  var G = window.__AGENT__ || {};
  var St = window.Studio;
  var esc = St.esc;
  var WORDS = {
    packaging: {plugin: "a plugin for an agent host", tool_server: "a tool server any agent can call", app: "an app of its own", embedded: "built into another product"},
    readiness: {draft: "Draft", ready: "Ready to build", built: "Built"},
    autonomy: {suggests: "It only suggests; a person acts.", acts_after_confirmation: "It acts once a person confirms.", acts_alone: "It acts on its own."},
    effect: {reads: "It only looks things up.", changes: "It changes something.", sends: "It sends something out of the organisation."},
    guard: {never: "Never", confirm_first: "Only after a person confirms", limit: "A limit"},
    source: {knowledge_base: "A knowledge base", documents: "Documents", data: "Data", web: "The web"},
    result: {pass: "Passed the last time it ran", fail: "Failed the last time it ran", not_run: "Not run yet"},
    details: {on_request: "Technical details only when asked.", offered: "It offers technical details.", always: "It always shows technical details."}
  };
  function word(k, v) { return (WORDS[k] && WORDS[k][v]) || ""; }
  function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : ""; }
  function lower(t) { return t ? t.charAt(0).toLowerCase() + t.slice(1).replace(/\.$/, "") : ""; }
  function links(refs) {
    var parts = (refs || []).filter(function (r) { return r && r.name; }).map(function (r) { return St.link(r.id, r.name); });
    return parts.length < 2 ? parts.join("") : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
  }
  function line(lead, refs) {
    var named = (refs || []).filter(function (r) { return r && r.name; });
    if (!named.length) return "";
    if (named.length > 1 && named.some(function (r) { return r.name.length > 40; })) {
      return "<span>" + lead.replace(/:$/, "") + ":</span><ul>" + named.map(function (r) { return "<li>" + St.link(r.id, r.name) + "</li>"; }).join("") + "</ul>";
    }
    return "<span>" + lead + " " + links(named) + ".</span>";
  }
  function text(t) { return t ? "<span>" + t + "</span>" : ""; }
  function missing(t) { return '<span class="studio-none">' + esc(t) + "</span>"; }
  function tag(t, on) { return t ? '<span class="tag' + (on ? " on" : "") + '">' + esc(t) + "</span>" : ""; }
  function card(item, inner, tags) {
    return '<div class="studio-card" id="' + esc(item.id) + '"><h3>' + esc(item.name) + "</h3>" + (tags || "") +
      (item.summary && item.summary !== item.name ? "<p>" + esc(cap(item.summary)) + "</p>" : "") + inner + "</div>";
  }
  function facts(list) { var s = list.filter(Boolean); return s.length ? '<div class="facts">' + s.join("") + "</div>" : ""; }
  function guards(refs) {
    return (refs || []).map(function (g) {
      var rule = (g.rule || g.name).replace(/\.$/, ""), lead = word("guard", g.kind) || "Guarded";
      // a rule that already says "Never…" needs no "Never:" before it
      var prefix = rule.toLowerCase().indexOf(lead.toLowerCase()) === 0 ? "" : esc(lead) + ": ";
      return text(prefix + St.link(g.id, rule) + ".");
    }).join("");
  }

  function agents() {
    return (G.agents || []).map(function (a) {
      var style = (a.style || [])[0];
      return card(a, facts([
        word("packaging", a.packaging) ? text("It comes as " + esc(word("packaging", a.packaging)) +
          (a.distribution ? ", installed from " + esc(a.distribution) : "") + ".") : "",
        line("It works for", a.works_for), line("Its jobs:", a.jobs), line("Its tools:", a.tools),
        line("Through them it reaches", a.reaches), guards(a.protected_by),
        style ? text("How it talks: " + esc(lower(style.voice) || style.name) + ". " + esc(word("details", style.details))) : missing("Nobody has said how it talks."),
        line("Carried by", a.carried_by), line("Owned by", a.owners), line("It depends on", a.depends_on)
      ]), tag(word("readiness", a.readiness), a.readiness === "ready"));
    }).join("");
  }

  function jobs() {
    return (G.jobs || []).map(function (j) {
      var tests = (j.tests || []).map(function (t) {
        return '<li id="' + esc(t.id) + '"><strong>' + esc(t.name) + "</strong>" +
          (t.request ? ": asked “" + esc(t.request) + "”." : ".") + (t.expected ? " What it should do: " + esc(lower(t.expected)) + "." : "") +
          (t.must_not ? " What it must never do: " + esc(lower(t.must_not)) + "." : "") + " <em>" + esc(word("result", t.result)) + ".</em></li>";
      });
      return card(j, facts([
        j.when ? text("When: " + esc(lower(j.when)) + ".") : missing("Nobody has said when it applies."),
        j.produces ? text("It produces " + esc(lower(j.produces)) + ".") : "",
        word("autonomy", j.autonomy) ? text(esc(word("autonomy", j.autonomy))) : missing("Nobody has said how far it may act on its own."),
        line("Asked for by", j.requested_by),
        (j.meets || []).length ? line("It meets:", j.meets) : missing("It meets no requirement yet."),
        line("It uses", j.calls), line("It reads", j.draws_on), line("It hands over to", j.hands_off_to), guards(j.protected_by)
      ]) + (tests.length ? '<p class="facts"><span>How we know it works:</span></p><ul class="facts">' + tests.join("") + "</ul>"
                         : '<p class="facts">' + missing("No test conversation proves it yet.") + "</p>"),
      tag(word("readiness", j.readiness), j.readiness === "ready"));
    }).join("");
  }

  function tools() {
    return (G.tools || []).map(function (t) {
      return card(t, facts([text(esc(word("effect", t.effect))) || missing("Nobody has said what it changes."),
        t.reversible === false ? text("What it does cannot be undone.") : t.reversible === true ? text("What it does can be undone.") : "",
        line("It reaches", t.reaches), line("Used by", t.used_by), guards(t.protected_by),
        (t.effect === "changes" || t.effect === "sends") && !(t.protected_by || []).length ? missing("Nothing guards it yet.") : ""]));
    }).join("");
  }

  function guardrails() {
    return (G.guardrails || []).map(function (g) {
      return card(g, facts([g.rule ? text(esc(cap(g.rule))) : "", line("It protects", g.protects),
        g.kind === "confirm_first" ? ((g.confirmed_by || []).length ? line("Confirmed by", g.confirmed_by) : missing("Nobody is named to confirm.")) : "",
        line("It carries out", g.upholds)]), tag(word("guard", g.kind), g.kind === "never"));
    }).join("");
  }

  function sources() {
    return (G.sources || []).map(function (s) {
      return card(s, facts([s.freshness ? text("How current it must be: " + esc(lower(s.freshness)) + ".") : "",
        line("Kept in", s.held_in), line("Read by", s.read_by)]), tag(word("source", s.kind)));
    }).join("");
  }

  var SECTIONS = [["agents", "The agents", agents, true], ["jobs", "The jobs people hand it", jobs, true],
                  ["tools", "What it can do", tools], ["guardrails", "The limits it keeps", guardrails], ["sources", "What it reads", sources]];

  St.ready(function () {
    var toc = [], body = [];
    SECTIONS.forEach(function (s) {
      var html = s[2]();
      if (!html && !s[3]) return;
      toc.push('<li><a href="#section-' + s[0] + '">' + esc(s[1]) + "</a></li>");
      body.push('<section id="section-' + s[0] + '"><h2>' + esc(s[1]) + "</h2>" +
                (html || '<p class="studio-none">Nothing recorded yet.</p>') + "</section>");
    });
    document.getElementById("toc").innerHTML = toc.join("");
    document.getElementById("sections").innerHTML = body.join("");
    St.focus();
  });
})();
