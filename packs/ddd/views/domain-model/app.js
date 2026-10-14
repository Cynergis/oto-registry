/* The domain model: what domain-driven design captured, in the business's words. */
(function () {
  "use strict";
  var M = window.__MODEL__ || {};
  var St = window.Studio;
  var esc = St.esc;
  var WORDS = {
    subdomain: {core: "Where the product competes", supporting: "Needed, but not what sets it apart", generic: "Could be bought rather than built"},
    readiness: {draft: "Draft", ready: "Ready to build", built: "Built"},
    pattern: {partnership: "they work as partners", shared_kernel: "they share part of their model",
              customer_supplier: "one supplies, the other is its customer", conformist: "one follows the other's model as it is",
              anticorruption_layer: "one translates the other's model through a protective layer",
              open_host_service: "one offers an open service for the other", published_language: "they exchange a published language",
              separate_ways: "they go their separate ways"},
    mechanism: {rest: "web calls", messaging: "messages", grpc: "remote calls", graphql: "a query interface",
                shared_database: "a shared database", file_transfer: "file transfers", library: "a shared library", other: ""},
    trigger: {actor: "a person", policy: "a reaction to something that happened", timer: "a schedule", external_system: "another system"},
    rule: {invariant: "Always true", precondition: "Must hold before", postcondition: "Must hold after", constraint: "A constraint"}
  };
  function word(k, v) { return (WORDS[k] && WORDS[k][v]) || ""; }
  function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : ""; }
  function and(parts) { parts = parts.filter(Boolean); return parts.length < 2 ? parts.join("") : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1]; }
  function links(refs) { return and((refs || []).filter(function (r) { return r && r.name; }).map(function (r) { return St.link(r.id, r.name); })); }
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
  function ready(item) { return tag(word("readiness", item.readiness), item.readiness === "ready"); }
  // names only: a field's type ("revision: int") is a technical detail
  function list(values) { return and((values || []).map(function (v) { return esc(String(v).split(":")[0].trim().replace(/_/g, " ")); })); }

  function areas() {
    return (M.subdomains || []).map(function (s) {
      return card(s, facts([line("Handled in", s.contexts), line("It serves", s.serves)]), tag(word("subdomain", s.kind), s.kind === "core"));
    }).join("");
  }

  function contexts() {
    return (M.contexts || []).map(function (c) {
      return card(c, facts([line("Part of the business:", c.subdomain), line("Owned by", c.owners), line("Carried by", c.carried_by),
        c.style && c.style.length ? text("Built as " + list(c.style) + (c.stack && c.stack.length ? ", with " + list(c.stack) : "") + ".") : "",
        line("What people do here:", c.use_cases), line("What it is told to do:", c.commands), line("What happens here:", c.events),
        line("Its core objects:", c.aggregates), line("It reacts to", c.listens), line("It talks to", c.integrations)]), ready(c));
    }).join("");
  }

  function together() {
    return (M.relationships || []).map(function (r) {
      var up = (r.upstream || [])[0];
      var how = word("pattern", r.pattern);
      var through = word("mechanism", r.mechanism);
      return card(r, facts([line("Between", r.between),
        up ? text(St.link(up.id, up.name) + " leads; the other follows.") : "",
        how ? text(cap(how) + (through ? ", through " + esc(through) : "") + ".") : ""]));
    }).join("");
  }

  function useCases() {
    return (M.use_cases || []).map(function (u) {
      return card(u, facts([line("Done by", u.by), line("In", u.context), line("It asks the system to", u.issues),
        (u.meets || []).length ? line("It meets:", u.meets) : missing("It meets no requirement yet."),
        (u.checked_by || []).length ? line("Checked by", u.checked_by) : missing("No scenario checks it yet."), line("It keeps", u.rules)]), ready(u));
    }).join("");
  }

  function happens() {
    var html = (M.commands || []).map(function (c) {
      return card(c, facts([word("trigger", c.trigger) ? text("Started by " + esc(word("trigger", c.trigger)) + (c.schedule ? ", " + esc(c.schedule) : "") + ".") : "",
        line("Asked for by", c.triggered_by), line("Issued when", c.issued_by), line("Handled by", c.handled_by),
        line("It results in", c.raises), line("Decided with", c.informed_by), line("It keeps", c.rules)]), ready(c));
    }).join("");
    var reactions = (M.reactions || []).map(function (r) {
      return card(r, facts([text("Whenever " + links(r.to) + " happens" + (r.condition ? " and " + esc(r.condition) : "") +
                                 (r.issues && r.issues.length ? ", then " + links(r.issues) : "") + ".")]));
    }).join("");
    var events = (M.events || []).map(function (e) {
      return card(e, facts([line("Caused by", e.raised_by), line("Recorded by", e.emitted_by), line("Followed by", e.followed_by),
        line("Others react with", e.reactions), line("Listened to by", e.listened_by)]));
    }).join("");
    return (html ? "<h3>What it is told to do</h3>" + html : "") + (events ? "<h3>What it records</h3>" + events : "") +
           (reactions ? "<h3>Reactions</h3>" + reactions : "");
  }

  function objects() {
    var html = (M.aggregates || []).map(function (a) {
      return card(a, facts([line("Its root:", a.root), line("Made of", a.made_of), line("It refers to", a.refers_to),
        line("It keeps", a.rules), line("It handles", a.handles), line("It records", a.emits)]), ready(a));
    }).join("");
    var parts = (M.entities || []).map(function (e) {
      return card(e, facts([e.type === "ValueObject" ? text("A value, defined by what it holds.") : text("A thing with its own identity."),
        e.fields && e.fields.length ? text("It holds " + list(e.fields) + ".") : "", line("Made of", e.made_of)]));
    }).join("");
    var rules = (M.rules || []).map(function (r) {
      return card(r, facts([r.expression ? text(esc(cap(r.expression))) : "", line("Kept by", r.applies_to), line("Required by", r.policies)]),
                  tag(word("rule", r.kind)));
    }).join("");
    var services = (M.services || []).map(function (s) {
      return card(s, facts([line("It works on", s.operates_on), line("It keeps", s.rules)]));
    }).join("");
    return html + (parts ? "<h3>What they are made of</h3>" + parts : "") + (rules ? "<h3>The business rules</h3>" + rules : "") +
           (services ? "<h3>Services</h3>" + services : "");
  }

  function around() {
    var views = (M.read_models || []).map(function (r) {
      return card(r, facts([r.fields && r.fields.length ? text("It shows " + list(r.fields) + ".") : "", line("Built from", r.from),
        line("Consulted by", r.consulted_by), line("It informs", r.informs)]));
    }).join("");
    var outside = (M.external || []).map(function (x) {
      return card(x, facts([line("It sends", x.sends), line("It receives", x.receives), line("Connected through", x.through)]));
    }).join("");
    return (views ? "<h3>What people consult</h3>" + views : "") + (outside ? "<h3>Outside systems</h3>" + outside : "");
  }

  var SECTIONS = [["areas", "The areas of the business", areas, true], ["contexts", "The parts of the model", contexts, true],
                  ["together", "How they work together", together], ["use-cases", "What people do with it", useCases],
                  ["happens", "What happens", happens], ["objects", "The core business objects", objects], ["around", "Around it", around]];

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
