/* The design page: the architecture from the knowledge base, written as sentences. */
(function () {
  "use strict";
  var A = window.__ARCH__ || {};
  var St = window.Studio;
  var esc = St.esc;

  function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : ""; }
  function links(refs) {
    var parts = (refs || []).filter(function (r) { return r && r.name; }).map(function (r) { return St.link(r.id, r.name); });
    return parts.length < 2 ? parts.join("") : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
  }
  function line(lead, refs) {
    var named = (refs || []).filter(function (r) { return r && r.name; });
    if (!named.length) return "";
    // a few short names read as a sentence; long ones (requirements, capabilities) as a list
    var long = named.length > 1 && named.some(function (r) { return r.name.length > 40; });
    if (long) return "<span>" + lead.replace(/:$/, "") + ":</span><ul>" + named.map(function (r) { return "<li>" + St.link(r.id, r.name) + "</li>"; }).join("") + "</ul>";
    return "<span>" + lead + " " + links(named) + ".</span>";
  }
  function carried(refs) {
    var of = function (t) { return (refs || []).filter(function (r) { return t ? r.type === t : r.type !== "BoundedContext" && r.type !== "Agent"; }); };
    return [line("Its domain model:", of("BoundedContext")), line("The agent it carries:", of("Agent")), line("It carries", of(null))];
  }
  function card(item, inner) {
    return '<div class="studio-card" id="' + esc(item.id) + '"><h3>' + esc(item.name) + "</h3>" +
      (item.summary && item.summary !== item.name ? "<p>" + esc(cap(item.summary)) + "</p>" : "") + inner + "</div>";
  }
  function facts(list) { var s = list.filter(Boolean); return s.length ? '<div class="facts">' + s.join("") + "</div>" : ""; }
  function common(x) {
    return [line("Owned by", x.owners), line("Shaped by", x.shaped_by), line("At risk from", x.threatened_by),
            line("Written down in", x.documents)];
  }

  function systems() {
    return (A.systems || []).map(function (s) {
      var parts = (s.parts || []).filter(function (p) { return p.type === "Component" || p.type === "Interface" || p.type === "DataStore"; });
      return card(s, facts([line("Its parts:", parts), line("What it lets the business do:", s.enables), line("It meets:", s.meets),
        line("It depends on", s.depends_on), line("Operated with", s.runbooks)].concat(common(s))));
    }).join("");
  }

  function components() {
    var bySystem = {}, order = [];
    (A.components || []).forEach(function (c) {
      var key = (c.system && c.system[0] && c.system[0].name) || "";
      if (!(key in bySystem)) { bySystem[key] = []; order.push(key); }
      bySystem[key].push(c);
    });
    return order.map(function (key) {
      return (order.length > 1 ? "<h3>" + esc(key ? "In " + key : "Not part of a system yet") + "</h3>" : "") +
        bySystem[key].map(function (c) {
          return card(c, facts([line("It offers", c.exposes), line("It uses", c.consumes), line("It reads from", c.reads),
            line("It writes to", c.writes), line("It runs in", c.runs_in), line("It depends on", c.depends_on),
            line("It meets:", c.meets), line("Its code is in", c.code),
            line("Operated with", c.runbooks)].concat(carried(c.carries)).concat(common(c))) +
            (c.meets && c.meets.length ? "" : '<p class="studio-none">No requirement says why it exists yet.</p>'));
        }).join("");
    }).join("");
  }

  function interfaces() {
    return (A.interfaces || []).map(function (i) {
      return card(i, facts([i.url ? '<span>Found at <a href="' + esc(i.url) + '">' + esc(i.url) + "</a>.</span>" : "",
        line("Offered by", i.exposed_by), line("Used by", i.consumed_by), line("It meets:", i.meets)].concat(common(i))));
    }).join("");
  }

  function stores() {
    return (A.stores || []).map(function (d) {
      return card(d, facts([line("Written by", d.written_by), line("Read by", d.read_by), line("It runs in", d.runs_in)].concat(common(d))));
    }).join("");
  }

  function operations() {
    var html = (A.runbooks || []).map(function (r) { return card(r, facts([line("For", r["for"])])); }).join("");
    var repos = (A.repositories || []).map(function (r) {
      return card(r, facts([r.url ? '<span>At <a href="' + esc(r.url) + '">' + esc(r.url) + "</a>" +
        (r.branch ? ", on " + esc(r.branch) : "") + ".</span>" : "", line("It holds", r.holds)]));
    }).join("");
    return html + (repos ? "<h3>Where the code lives</h3>" + repos : "");
  }

  var SECTIONS = [["systems", "The systems", systems, true], ["parts", "Their parts", components, true],
                  ["interfaces", "How they talk", interfaces], ["data", "Where the data is kept", stores],
                  ["operations", "Running it", operations]];

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
