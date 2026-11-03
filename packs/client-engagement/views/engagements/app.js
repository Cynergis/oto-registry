(function () {
  "use strict";
  var data = window.__ENGAGEMENTS__ || { nodes: [], edges: [] };
  var nodes = {};
  (data.nodes || []).forEach(function (n) { nodes[n.id] = n; });
  var edges = (data.edges || []).filter(function (e) { return e.status !== "superseded"; });
  function src(e) { return e.src || e.from || e.source; }
  function dst(e) { return e.dst || e.to || e.target; }
  function rel(e) { return e.rel || e.relation || e.type; }
  function out(id, r) {
    return edges.filter(function (e) { return src(e) === id && rel(e) === r; }).map(function (e) { return nodes[dst(e)]; }).filter(Boolean);
  }
  function into(id, r) {
    return edges.filter(function (e) { return dst(e) === id && rel(e) === r; }).map(function (e) { return nodes[src(e)]; }).filter(Boolean);
  }
  function esc(s) {
    return String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function attr(n, k) { var v = n && n.attrs ? n.attrs[k] : undefined; return v === undefined || v === null ? "" : v; }
  function words(s) { return String(s).replace(/[_-]/g, " ").replace(/^./, function (c) { return c.toUpperCase(); }).replace(/^Ai\b/, "AI"); }
  function names(list) {
    return list.map(function (n) {
      if (n.type === "Role") {
        var who = out(n.id, "filled_by").map(function (p) { return p.label; }).join(", ");
        return who ? who + ", " + n.label : n.label;
      }
      return n.label;
    }).join("; ");
  }
  var today = new Date().toISOString().slice(0, 10);
  function dueCell(n, k, open) {
    var v = attr(n, k);
    if (!v) return "";
    return open && v < today ? '<span class="late">' + esc(v) + ", overdue</span>" : esc(v);
  }
  function table(title, heads, rows, emptyText, internal) {
    var h = "<h3>" + esc(title) + (internal ? ' <span class="tag internal">Internal</span>' : "") + "</h3>";
    if (!rows.length) return '<div class="block">' + h + '<p class="empty">' + esc(emptyText) + "</p></div>";
    return '<div class="block">' + h + '<div class="wrap"><table><thead><tr>' +
      heads.map(function (x) { return "<th>" + esc(x) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      rows.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + (c === null || c === undefined ? "" : c) + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div></div>";
  }
  function byDate(k) {
    return function (a, b) { return String(attr(a, k) || "9999").localeCompare(String(attr(b, k) || "9999")); };
  }
  function t(s) { return esc(s); }

  function render(eng, client) {
    var all = into(eng.id, "on_engagement");
    function of(type) { return all.filter(function (n) { return n.type === type; }); }
    var interactions = into(eng.id, "concerns_engagement").filter(function (n) { return n.type === "Interaction"; }).sort(byDate("held_on")).reverse();
    var general = into(client.id, "with_client").filter(function (n) { return out(n.id, "concerns_engagement").length === 0; }).sort(byDate("held_on")).reverse();
    var openItems = of("OpenItem").filter(function (n) { return attr(n, "item_state") === "open"; }).sort(byDate("due_on"));
    var waiting = of("Decision").filter(function (n) { return attr(n, "decision_state") === "waiting"; }).sort(byDate("due_on"));
    var made = of("Decision").filter(function (n) { return attr(n, "decision_state") === "made"; }).sort(byDate("decided_on")).reverse();
    var order = { high: 0, medium: 1, low: 2 };
    var risks = of("Risk").sort(function (a, b) {
      function s(n) { return (order[attr(n, "likelihood")] === undefined ? 3 : order[attr(n, "likelihood")]) + (order[attr(n, "impact")] === undefined ? 3 : order[attr(n, "impact")]); }
      return s(a) - s(b);
    });
    var uncovered = of("Commitment").filter(function (n) { return out(n.id, "covered_by").length === 0; });
    var tags = [attr(eng, "stage") && words(attr(eng, "stage")), attr(eng, "service_line") && words(attr(eng, "service_line"))].filter(Boolean);
    var why = [["What they asked", attr(eng, "client_ask")], ["The problem behind it", attr(eng, "business_problem")], ["How they measure success today", attr(eng, "success_measured_by")]].filter(function (x) { return x[1]; });
    var html = '<section class="head"><h2>' + esc(eng.label) + '</h2><div class="tags"><span class="tag">' + esc(client.label) + "</span>" +
      tags.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</div>" +
      (why.length ? '<dl class="why">' + why.map(function (x) { return "<dt>" + esc(x[0]) + "</dt><dd>" + esc(x[1]) + "</dd>"; }).join("") + "</dl>" : "") + "</section>";

    html += '<section class="group"><h2>Follow up</h2>';
    html += table("Still open", ["Item", "Kind", "Owner", "Due", "Came from", "Blocks"], openItems.map(function (n) {
      return [t(n.label), t(words(attr(n, "item_kind"))), t(names(out(n.id, "owned_by"))), dueCell(n, "due_on", true), t(names(out(n.id, "raised_in"))), t(names(out(n.id, "blocks")))];
    }), "Nothing is open.");
    html += table("Decisions waiting", ["Decision", "Who decides", "Needed by", "Blocks", "Options"], waiting.map(function (n) {
      var o = attr(n, "options_considered");
      return [t(n.label), t(names(out(n.id, "decided_by"))), dueCell(n, "due_on", true), t(names(out(n.id, "blocks"))), t(Array.isArray(o) ? o.join("; ") : o)];
    }), "No decision is waiting.");
    html += table("Promises the statement of work does not hold", ["Promise", "Made in", "Contradicted by"], uncovered.map(function (n) {
      return [t(n.label), t(names(out(n.id, "made_in"))), t(names(out(n.id, "contradicted_by")))];
    }), "No uncovered promise is on record.");
    html += table("Risks", ["Risk", "Likelihood", "Impact", "Owner", "Mitigation"], risks.map(function (n) {
      return [t(n.label), t(words(attr(n, "likelihood"))), t(words(attr(n, "impact"))), t(names(out(n.id, "owned_by"))), t(attr(n, "mitigation"))];
    }), "No risk is on record.");
    html += table("Change requests", ["Request", "Trigger", "Outcome", "Effect", "Affects"], of("ChangeRequest").map(function (n) {
      return [t(n.label), t(attr(n, "change_trigger")), t(words(attr(n, "change_state"))), t(attr(n, "effect")), t(names(out(n.id, "changes")))];
    }), "No change request is on record.");
    html += "</section>";

    html += '<section class="group"><h2>What happened</h2>';
    function ixRow(n) {
      var said = into(n.id, "said_in").map(function (p) { var w = names(out(p.id, "raised_by")); return p.label + (w ? " (" + w + ")" : ""); }).join("; ");
      return [t(attr(n, "held_on")), t(n.label), t(words(attr(n, "interaction_kind"))), t(names(out(n.id, "attended_by"))), t(said), t(names(out(n.id, "presented")))];
    }
    html += table("Meetings and presentations", ["Date", "What", "Kind", "Attended", "What was said", "Presented"], interactions.map(ixRow), "No meeting is on record for this engagement.");
    html += table("General meetings with this client", ["Date", "What", "Kind", "Attended", "What was said", "Presented"], general.map(ixRow), "No general meeting is on record.");
    html += table("Decisions made", ["Decided on", "Decision", "By", "Why", "Options considered"], made.map(function (n) {
      var o = attr(n, "options_considered");
      return [t(attr(n, "decided_on")), t(n.label), t(names(out(n.id, "decided_by"))), t(attr(n, "reason")), t(Array.isArray(o) ? o.join("; ") : o)];
    }), "No decision is recorded as made.");
    html += table("Findings", ["Finding", "Area", "Evidence", "Recommendation", "Client response"], of("Finding").map(function (n) {
      var recs = into(n.id, "addresses");
      return [t(n.label), t(attr(n, "finding_area")), t(names(out(n.id, "evidenced_by"))), t(names(recs)), t(recs.map(function (r) { return words(attr(r, "client_response")); }).join("; "))];
    }), "No finding is on record.");
    html += "</section>";

    html += '<section class="group"><h2>What we agreed</h2>';
    html += table("Milestones", ["Milestone", "Kind", "Due", "State", "Blocked by"], of("Milestone").sort(byDate("due_on")).map(function (n) {
      return [t(n.label), t(words(attr(n, "milestone_kind"))), t(attr(n, "due_on")), t(words(attr(n, "milestone_state"))), t(names(into(n.id, "blocks")))];
    }), "No milestone is on record.");
    html += table("Scope", ["Item", "In or out", "Why"], of("ScopeItem").map(function (n) {
      return [t(n.label), t(words(attr(n, "scope_state"))), t(attr(n, "reason"))];
    }), "No scope is on record.");
    html += table("Deliverables", ["Deliverable", "Due", "Accepted by", "Test", "State"], of("Deliverable").map(function (n) {
      return [t(n.label), t(attr(n, "due_on")), t(names(out(n.id, "accepted_by"))), t(names(into(n.id, "judges"))), t(words(attr(n, "acceptance_state")))];
    }), "No deliverable is on record.");
    html += table("Assumptions", ["Assumption", "About", "Would trigger a change"], of("Assumption").map(function (n) {
      return [t(n.label), t(words(attr(n, "assumption_about"))), t(attr(n, "change_trigger"))];
    }), "No assumption is on record.");
    html += table("Price", ["Price", "Fee", "Model", "Margin", "Contingency", "Billable days", "Approved by"], of("Price").map(function (n) {
      var m = attr(n, "margin"), c = attr(n, "contingency");
      return [t(n.label), t(attr(n, "fee") + " " + attr(n, "currency")), t(words(attr(n, "pricing_model"))), t(m === "" ? "" : m + "%"), t(c === "" ? "" : c + "%"), t(attr(n, "billable_days")), t(names(out(n.id, "approved_by")))];
    }), "No price is on record.", true);
    html += table("Documents", ["Document", "Kind", "Version", "Audience", "State"], of("EngagementDocument").map(function (n) {
      return [t(n.label), t(words(attr(n, "document_kind"))), t(attr(n, "version")), t(words(attr(n, "audience"))), t(words(attr(n, "document_state")))];
    }), "No document is on record.");
    html += "</section>";

    html += '<section class="group"><h2>Who is involved</h2>';
    html += table("People and roles", ["Role", "Side", "Kind", "Person", "Time"], of("Role").sort(function (a, b) { return String(attr(a, "side")).localeCompare(String(attr(b, "side"))); }).map(function (n) {
      var p = out(n.id, "filled_by").map(function (x) { return x.label; }).join(", ");
      return [t(n.label), t(words(attr(n, "side"))), t(words(attr(n, "role_kind"))), p ? t(p) : '<span class="note">Not named yet</span>', t(attr(n, "time_commitment"))];
    }), "Nobody is on record.");
    var follow = into(eng.id, "follows_on_from"), from = out(eng.id, "follows_on_from");
    if (follow.length || from.length) {
      html += table("Related engagements", ["Engagement", "Relation", "Stage"], from.map(function (n) { return [t(n.label), "Came from", t(words(attr(n, "stage")))]; }).concat(follow.map(function (n) { return [t(n.label), "Led to", t(words(attr(n, "stage")))]; })), "");
    }
    html += "</section>";
    document.getElementById("page").innerHTML = html;
  }

  var clientSel = document.getElementById("client"), engSel = document.getElementById("engagement");
  var clients = (data.nodes || []).filter(function (n) { return n.type === "Client"; }).sort(function (a, b) { return a.label.localeCompare(b.label); });
  function engagementsOf(cid) { return into(cid, "for_client").filter(function (n) { return n.type === "Engagement"; }).sort(function (a, b) { return a.label.localeCompare(b.label); }); }
  function remember(id) { try { location.hash = encodeURIComponent(id); } catch (e) { /* the page works without it */ } }
  function fillEngagements(cid, wanted) {
    var list = engagementsOf(cid);
    engSel.innerHTML = list.map(function (e) { return '<option value="' + esc(e.id) + '">' + esc(e.label) + "</option>"; }).join("");
    if (wanted && list.some(function (e) { return e.id === wanted; })) engSel.value = wanted;
    showSelected();
  }
  function showSelected() {
    var client = nodes[clientSel.value], eng = nodes[engSel.value];
    if (!client) return;
    if (!eng) {
      document.getElementById("page").innerHTML = '<p class="empty">' + esc(client.label) + " has no engagement on file yet. Add one through the engagements skill.</p>";
      return;
    }
    remember(eng.id);
    render(eng, client);
  }
  if (!clients.length) {
    document.querySelector(".picker").style.display = "none";
    document.getElementById("page").innerHTML = '<p class="empty">No client is on file yet. Add the first one through the engagements skill.</p>';
    return;
  }
  clientSel.innerHTML = clients.map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.label) + "</option>"; }).join("");
  clientSel.addEventListener("change", function () { fillEngagements(clientSel.value); });
  engSel.addEventListener("change", showSelected);
  var wanted = "";
  try { wanted = decodeURIComponent((location.hash || "").slice(1)); } catch (e) { wanted = ""; }
  var startClient = wanted && nodes[wanted] ? out(wanted, "for_client")[0] : null;
  if (startClient) clientSel.value = startClient.id;
  fillEngagements(clientSel.value, wanted);
})();
