/* The specification page: the product's facts from the knowledge base, written as sentences. */
(function () {
  "use strict";
  var S = window.__SPEC__ || {};
  var St = window.Studio || {esc: function (s) { return String(s == null ? "" : s); }, link: function (_id, t) { return t || ""; },
                             ready: function (fn) { document.addEventListener("DOMContentLoaded", fn); }, focus: function () {}};
  var esc = St.esc;

  var WORDS = {
    priority: {must: "Must have", should: "Should have", could: "Could have", wont: "Won't have this time"},
    stage: {idea: "An idea", discovery: "Being explored", specified: "Specified", building: "Being built", live: "Live", retired: "Retired"},
    release: {planned: "Planned", "in-progress": "In progress", shipped: "Shipped", cancelled: "Cancelled"},
    horizon: {mvp: "first release", growth: "growth", later: "later"},
    risk: {open: "Open", mitigated: "Mitigated", accepted: "Accepted", realised: "It happened"},
    riskKind: {dependency: "a dependency", technical: "technical", market: "the market", delivery: "delivery", compliance: "compliance", other: ""},
    assumption: {unverified: "Not yet checked", validated: "Checked: it holds", invalidated: "Checked: it does not hold"},
    policy: {business: "Business rule", compliance: "Compliance rule", data: "Data rule", security: "Security rule", other: "Rule"},
    constraint: {budget: "Budget", platform: "Platform", timeline: "Timeline", technical: "Technical", other: "Constraint"},
    objective: {proposed: "Proposed", active: "Active", achieved: "Achieved", missed: "Missed", dropped: "Dropped"},
    scenario: {"happy-path": "When all goes well", "edge-case": "An edge case", failure: "When something fails"}
  };
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function word(kind, value) { return (WORDS[kind] && WORDS[kind][value]) || ""; }
  function date(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || "");
    return m ? (+m[3]) + " " + MONTHS[+m[2] - 1] + " " + m[1] : "";
  }
  function links(refs) {
    var parts = (refs || []).filter(function (r) { return r && r.name; }).map(function (r) { return St.link(r.id, r.name); });
    if (parts.length < 2) return parts.join("");
    return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
  }
  function sentence(lead, refs) { var l = links(refs); return l ? lead + " " + l + "." : ""; }
  function p(text, cls) { return text ? '<p' + (cls ? ' class="' + cls + '"' : "") + ">" + text + "</p>" : ""; }
  function card(item, inner) {
    return '<div class="studio-card spec-item" id="' + esc(item.id) + '"><h3>' + esc(item.name) + "</h3>" + inner + "</div>";
  }
  function cap(text) { return text ? text.charAt(0).toUpperCase() + text.slice(1) : ""; }
  function summary(item) { return item.summary && item.summary !== item.name ? p(esc(cap(item.summary))) : ""; }
  function facts(list) {
    var shown = list.filter(Boolean);
    return shown.length ? '<p class="spec-facts">' + shown.join(" ") + "</p>" : "";
  }
  function tag(text, cls) { return text ? '<span class="spec-tag' + (cls ? " " + cls : "") + '">' + esc(text) + "</span>" : ""; }
  function nothing() { return '<p class="studio-none">Nothing recorded yet.</p>'; }
  function any(list) { return list && list.length; }

  // ---- the sections, in the order a reader needs them ----

  function why() {
    var prod = S.product || {};
    var html = "";
    if (prod.problem) html += "<h3>The problem</h3>" + p(esc(prod.problem));
    if (prod.background) html += "<h3>The background</h3>" + p(esc(prod.background));
    if (prod.vision) html += "<h3>The vision</h3>" + p(esc(prod.vision));
    if (any(S.values)) {
      html += "<h3>What it promises</h3>" + S.values.map(function (v) {
        return card(v, summary(v) + p(esc(cap(v.promise))) + facts([
          v.differentiator ? "What sets it apart: " + esc(v.differentiator) + "." : "",
          sentence("For", v["for"]), sentence("It serves", v.serves)]));
      }).join("");
    }
    if (any(S.objectives)) {
      html += "<h3>What it pursues</h3>" + S.objectives.map(function (o) {
        var measured = (o.measured_by || []).map(function (m) {
          return St.link(m.id, m.name) + (m.target ? ": " + esc(m.target) : "") + (m.due ? ", by " + esc(date(m.due)) : "");
        });
        return card(o, summary(o) + facts([tag(word("objective", o.state)), o.period ? "For " + esc(o.period) + "." : "",
          measured.length ? "Measured by " + measured.join("; ") + "." : ""]));
      }).join("");
    }
    var loose = (S.criteria || []).filter(function (c) { return !(c.measures || []).length; });
    if (loose.length) {
      html += "<h3>How success is measured</h3>" + loose.map(function (c) {
        return card(c, summary(c) + facts([c.metric ? "Measured as " + esc(c.metric) + "." : "",
          c.target ? "Target: " + esc(c.target) + "." : "", c.due ? "By " + esc(date(c.due)) + "." : ""]));
      }).join("");
    }
    return html || nothing();
  }

  function people() {
    var html = "";
    var target = (S.personas || []).filter(function (x) { return x.relationship !== "excluded"; });
    var excluded = (S.personas || []).filter(function (x) { return x.relationship === "excluded"; });
    if (target.length) {
      html += target.map(function (x) { return card(x, summary(x) + (x.need ? p("What they need: " + esc(lower(x.need)) + ".") : "")); }).join("");
    }
    if (excluded.length) html += "<h3>Not who it is for</h3>" + excluded.map(function (x) { return card(x, summary(x)); }).join("");
    if (any(S.roles)) {
      html += "<h3>The roles around it</h3>" + S.roles.map(function (r) {
        return card(r, summary(r) + facts([r.holder ? "Held by " + esc(r.holder) + "." : "", r.mandate ? esc(r.mandate) : ""]));
      }).join("");
    }
    return html || nothing();
  }

  function lower(text) { return text ? text.charAt(0).toLowerCase() + text.slice(1).replace(/\.$/, "") : ""; }

  var ORDER = {must: 0, should: 1, could: 2, wont: 3};
  function needs() {
    var groups = [["functional", "What it does"], ["non-functional", "How well it does it"], ["", "Other requirements"]];
    var html = "";
    var filled = groups.filter(function (g) { return (S.requirements || []).some(function (r) { return inGroup(r, g); }); }).length;
    groups.forEach(function (g) {
      var items = (S.requirements || []).filter(function (r) { return inGroup(r, g); });
      if (!items.length) return;
      items.sort(function (a, b) { return ((ORDER[a.priority] == null ? 9 : ORDER[a.priority]) - (ORDER[b.priority] == null ? 9 : ORDER[b.priority])) || a.name.localeCompare(b.name); });
      html += (filled > 1 ? "<h3>" + esc(g[1]) + "</h3>" : "") + items.map(function (r) {
        var met = links(r.met_by);
        return card(r, summary(r) + facts([
          tag(word("priority", r.priority), r.priority === "must" ? "must" : ""),
          sentence("Owned by", r.owners), sentence("It serves", r.serves),
          met ? "Met by " + met + "." : '<span class="studio-none">Nothing in the design meets it yet.</span>',
          sentence("Delivered by", r.realised_by), sentence("Checked by", r.proved_by),
          sentence("In", r.releases), sentence("Left out of", r.excluded_from)]));
      }).join("");
    });
    return html || nothing();
  }

  function inGroup(r, g) {
    return g[0] ? r.kind === g[0] : !r.kind || (r.kind !== "functional" && r.kind !== "non-functional");
  }

  function journeys() {
    return (S.journeys || []).map(function (j) {
      var steps = (j.steps || []).map(function (s) {
        return '<li id="' + esc(s.id) + '" class="spec-item">' + esc(s.name) + (s.action && s.action !== s.name ? ": " + esc(s.action) : "") +
               (s.outcome ? " Then " + esc(lower(s.outcome)) + "." : "") + "</li>";
      });
      return card(j, summary(j) + facts([sentence("For", j["for"]), j.trigger ? "It starts when " + esc(lower(j.trigger)) + "." : ""]) +
        (steps.length ? '<ol class="spec-steps">' + steps.join("") + "</ol>" : "") +
        (j.outcome ? p("It ends with " + esc(lower(j.outcome)) + ".") : ""));
    }).join("");
  }

  function scenarios() {
    return (S.scenarios || []).map(function (s) {
      return card(s, '<div class="spec-gwt">' + (s.given ? p("<strong>Given</strong> " + esc(lower(s.given))) : "") +
        (s.when ? p("<strong>When</strong> " + esc(lower(s.when))) : "") + (s.then ? p("<strong>Then</strong> " + esc(lower(s.then))) : "") +
        "</div>" + facts([tag(word("scenario", s.kind)), sentence("It checks", s.exercises)]));
    }).join("");
  }

  function releases() {
    var html = (S.releases || []).map(function (r) {
      return card(r, summary(r) + facts([tag(word("release", r.state)), r.date ? "Planned for " + esc(date(r.date)) + "." : "",
        r.horizon ? "The " + esc(word("horizon", r.horizon)) + "." : "", sentence("It holds", r.scope),
        sentence("Waiting on", r.blocked_by)]));
    }).join("");
    if (any(S.features)) {
      html += "<h3>Features</h3>" + S.features.map(function (f) {
        return card(f, summary(f) + facts([sentence("It delivers", f.realises), sentence("In", f.releases)]));
      }).join("");
    }
    return html;
  }

  function rules() {
    var html = (S.policies || []).map(function (x) {
      return card(x, summary(x) + facts([tag(word("policy", x.kind)), x.authority ? "Set by " + esc(x.authority) + "." : "",
        sentence("Enforced by", x.enforced_by), sentence("It applies to", x.applies_to)]));
    }).join("");
    if (any(S.constraints)) {
      html += "<h3>Constraints</h3>" + S.constraints.map(function (x) {
        return card(x, summary(x) + facts([tag(word("constraint", x.kind)), x.imposed_by ? "Imposed by " + esc(x.imposed_by) + "." : "",
          sentence("It limits", x.constrains)]));
      }).join("");
    }
    return html;
  }

  function assumptions() {
    return (S.assumptions || []).map(function (a) {
      return card(a, summary(a) + facts([tag(word("assumption", a.state)), a.checked ? "Checked on " + esc(date(a.checked)) + "." : ""]));
    }).join("");
  }

  function risks() {
    return (S.risks || []).map(function (r) {
      var kind = word("riskKind", r.kind);
      return card(r, summary(r) + facts([tag(word("risk", r.state)), kind ? "A risk from " + esc(kind) + "." : "",
        sentence("It threatens", r.threatens), sentence("Reduced by", r.mitigated_by), sentence("Owned by", r.owners)]));
    }).join("");
  }

  function decisions() {
    return (S.decisions || []).map(function (d) {
      return card(d, summary(d) + (d.rationale ? p("Why: " + esc(d.rationale)) : "") + facts([
        d.date ? "Decided on " + esc(date(d.date)) + "." : "", sentence("By", d.by), sentence("About", d.about),
        sentence("It answers", d.resolves)]));
    }).join("");
  }

  function questions() {
    var open = (S.questions || []).filter(function (q) { return !q.state || q.state === "open"; });
    var answered = (S.questions || []).length - open.length;
    var html = open.map(function (q) {
      return card(q, summary(q) + facts([q.raised ? "Asked on " + esc(date(q.raised)) + "." : "", sentence("About", q.about),
        sentence("It holds back", q.blocks)]));
    }).join("");
    if (answered) html += p(answered === 1 ? "One more question has been answered or dropped." :
                            answered + " more questions have been answered or dropped.", "studio-muted");
    return html;
  }

  function terms() {
    if (!any(S.terms)) return "";
    return '<dl class="spec-terms">' + S.terms.map(function (t) {
      return '<dt id="' + esc(t.id) + '" class="spec-item">' + esc(t.name) + "</dt><dd>" + esc(t.definition || t.summary || "") + "</dd>";
    }).join("") + "</dl>";
  }

  var SECTIONS = [
    ["why", "Why it exists", why, true], ["people", "Who it is for", people, true], ["needs", "What it must do", needs, true],
    ["journeys", "How people use it", journeys], ["scenarios", "How we check it works", scenarios],
    ["releases", "What comes when", releases], ["rules", "The rules it keeps", rules], ["assumptions", "What we assume", assumptions],
    ["risks", "Risks", risks], ["decisions", "Decisions", decisions], ["questions", "Open questions", questions],
    ["terms", "Words we use", terms]
  ];

  St.ready(function () {
    var prod = S.product || {};
    var stage = word("stage", prod.stage);
    document.getElementById("lead").innerHTML = esc(prod.summary || prod.vision ||
      "What the product is for and who it serves, what it must do, and what is still open.") +
      (stage ? " " + tag(stage) : "");
    var toc = [], body = [];
    SECTIONS.forEach(function (s) {
      var html = s[2]();
      if (!html && !s[3]) return;
      toc.push('<li><a href="#section-' + s[0] + '">' + esc(s[1]) + "</a></li>");
      body.push('<section class="spec-section" id="section-' + s[0] + '"><h2>' + esc(s[1]) + "</h2>" + html + "</section>");
    });
    document.getElementById("toc").innerHTML = toc.join("");
    document.getElementById("sections").innerHTML = body.join("");
    St.focus();
  });
})();
