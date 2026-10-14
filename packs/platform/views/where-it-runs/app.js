/* Where it runs: the platform binding from the knowledge base, written as sentences. */
(function () {
  "use strict";
  var R = window.__RUNS__ || {};
  var St = window.Studio;
  var esc = St.esc;
  var WORDS = {
    provider: {aws: "Amazon Web Services", gcp: "Google Cloud", azure: "Microsoft Azure", on_premises: "The organisation's own servers", other: ""},
    account: {aws_account: "AWS account", gcp_project: "Google Cloud project", azure_subscription: "Azure subscription", other: "account"},
    purpose: {production: "Production", staging: "Staging", test: "Test", development: "Development"},
    service: {compute: "runs code", database: "a database", storage: "storage", queue: "a queue", cache: "a cache", cdn: "delivers content",
              secrets: "keeps secrets", identity: "identity", monitoring: "monitoring", other: ""},
    category: {platform: "The platform", region: "Region", service: "A service", technology: "Technology", security: "Security", data: "Data", other: ""},
    status: {proposed: "Proposed, waiting for someone to confirm it", accepted: "Accepted", rejected: "Rejected", superseded: "Replaced"}
  };
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function word(k, v) { return (WORDS[k] && WORDS[k][v]) || ""; }
  function date(v) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v || ""); return m ? (+m[3]) + " " + MONTHS[+m[2] - 1] + " " + m[1] : ""; }
  function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : ""; }
  function and(parts) { parts = parts.filter(Boolean); return parts.length < 2 ? parts.join("") : parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1]; }
  function or(parts) { parts = parts.filter(Boolean); return parts.length < 2 ? parts.join("") : parts.slice(0, -1).join(", ") + " or " + parts[parts.length - 1]; }
  function links(refs) { return and((refs || []).filter(function (r) { return r && r.name; }).map(function (r) { return St.link(r.id, r.name); })); }
  function line(lead, refs) { var l = links(refs); return l ? "<span>" + lead + " " + l + ".</span>" : ""; }
  function text(t) { return t ? "<span>" + t + "</span>" : ""; }
  function missing(t) { return '<span class="studio-none">' + esc(t) + "</span>"; }
  function card(item, inner, tag) {
    return '<div class="studio-card" id="' + esc(item.id) + '"><h3>' + esc(item.name) + "</h3>" + (tag || "") +
      (item.summary && item.summary !== item.name ? "<p>" + esc(cap(item.summary)) + "</p>" : "") + inner + "</div>";
  }
  function facts(list) { var s = list.filter(Boolean); return s.length ? '<div class="facts">' + s.join("") + "</div>" : ""; }
  function tag(t, on) { return t ? '<span class="tag' + (on ? " on" : "") + '">' + esc(t) + "</span>" : ""; }
  function href(url, label) { return url ? '<a href="' + esc(url) + '">' + esc(label) + "</a>" : ""; }

  function platform() {
    return (R.platforms || []).map(function (p) {
      var accounts = (p.accounts || []).filter(function (a) { return a.type === "Account"; }).map(function (a) {
        return St.link(a.id, a.name) + " (" + esc(word("account", a.kind)) + (a.identifier ? " " + esc(a.identifier) : "") + ")";
      });
      return card(p, facts([word("provider", p.provider) && word("provider", p.provider) !== p.name ? text(esc(word("provider", p.provider)) + ".") : "",
        accounts.length ? text("Its accounts: " + and(accounts) + ".") : missing("No account on it is recorded yet.")]));
    }).join("");
  }

  function environments() {
    return (R.environments || []).map(function (e) {
      var acc = (e.account || [])[0];
      var open = and([href(e.console, e.console ? "Open its console" : ""), href(e.logs, e.console ? "read its logs" : "Read its logs")]);
      return card(e, facts([
        e.region ? text("In the " + esc(e.region) + " region.") : missing("Nobody has said which region it is in."),
        acc ? text("In " + St.link(acc.id, acc.name) + (acc.identifier ? " (" + esc(acc.identifier) + ")" : "") + ".") : missing("It is in no account on record."),
        open ? text(open + ".") : "",
        line("Created by the infrastructure code in", e.provisioned_by), line("Runs", e.runs), line("Deployed by", e.deployed_by)
      ]), tag(word("purpose", e.purpose), e.purpose === "production"));
    }).join("");
  }

  function parts() {
    return (R.parts || []).map(function (c) {
      var stack = (c.built_with || []).map(function (t) { return St.link(t.id, t.name) + (t.version ? " " + esc(t.version) : ""); });
      var secrets = (c.secrets || []).map(function (s) { return St.link(s.id, s.name); });
      var isComponent = c.type === "Component";
      return card(c, facts([
        (c.runs_on || []).length ? line("Runs on", c.runs_on) : missing("Nobody has said what it runs on."),
        stack.length ? text("Built with " + and(stack) + ".") : (isComponent ? missing("Nothing says what it is built with.") : ""),
        secrets.length ? text("It needs " + and(secrets) + ".") : "",
        line("It runs in", c.runs_in),
        (c.deployed_by || []).length ? line("Deployed by", c.deployed_by) : missing("No pipeline deploys it.")
      ]));
    }).join("");
  }

  function stack() {
    var tech = (R.technologies || []).map(function (t) {
      return card(t, facts([t.version ? text("Version " + esc(t.version) + ".") : missing("No version recorded."), line("Used by", t.used_by)]));
    }).join("");
    var services = (R.services || []).map(function (s) {
      var does = word("service", s.kind);
      return card(s, facts([does ? text(cap(does) + ".") : "", line("On", s.platform), line("It runs", s.runs), line("It keeps", s.keeps)]));
    }).join("");
    return (services ? "<h3>Services</h3>" + services : "") + (tech ? "<h3>Languages, frameworks and libraries</h3>" + tech : "");
  }

  function secrets() {
    return (R.secrets || []).map(function (s) {
      return card(s, facts([s.reference ? text("Kept under the name <strong>" + esc(s.reference) + "</strong>.") : "",
        (s.kept_in || []).length ? line("Kept in", s.kept_in) : missing("Kept nowhere on record."), line("Needed by", s.needed_by)]));
    }).join("");
  }

  function choices() {
    var by = {};
    (R.deciders || []).forEach(function (d) { by[d.id] = d.by || []; });
    return (R.choices || []).map(function (c) {
      var who = c.authority === "delegated" ?
        text("Left to the builder" + (c.allowed && c.allowed.length ? ", to pick from " + esc(or(c.allowed)) : "") + ".") :
        text("Decided by a person.");
      var settled = (c.settled_by || []).map(function (d) {
        return text("Settled: <strong>" + esc(d.option || d.name) + "</strong> (" + St.link(d.id, d.name) + "). " +
                    esc(word("status", d.status) || "") + (by[d.id] && by[d.id].length ? " by " + links(by[d.id]) : "") +
                    (d.date ? ", on " + esc(date(d.date)) : "") + ".") +
          (d.alternatives && d.alternatives.length ? text("Also considered: " + esc(and(d.alternatives)) + ".") : "") +
          (d.consequences ? text("What follows: " + esc(d.consequences)) : "");
      });
      return card(c, facts([who, line("It must keep to", c.bounded_by), line("It is about", c.shapes)].concat(
        settled.length ? settled : [missing("Not settled yet.")])), tag(word("category", c.category)));
    }).join("");
  }

  function pipelines() {
    return (R.pipelines || []).map(function (p) {
      return card(p, facts([p.url ? text(href(p.url, "Open it") + ".") : "", line("It deploys", p.deploys), line("To", p.to)]));
    }).join("");
  }

  var SECTIONS = [["platform", "The platform", platform, true], ["environments", "Environments", environments, true],
                  ["parts", "Each part", parts], ["choices", "Who decides what", choices, true], ["stack", "The stack", stack],
                  ["secrets", "Secrets", secrets], ["pipelines", "Pipelines", pipelines]];

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
