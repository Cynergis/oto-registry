var S = window.__PRD__;

/* ============================================================
   Architecture & Design content — second document.
   Cross-references (FR/NFR/G/UC) link back into the PRD above.
   ============================================================ */
var A = window.__ARCH__;
var I = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';


var TABS_PRD = [
  {id:'overview',  label:'Overview',           ico:I('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'), src:'Executive Summary + Success Criteria'},
  {id:'context',   label:'Strategic Context',  ico:I('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'), src:'Portfolio · domain, ownership, OKR alignment'},
  {id:'personas',  label:'Personas',           ico:I('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'), src:'Promoted from User Journeys'},
  {id:'product',   label:'Product',            ico:I('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'), src:'Product Scope (MVP / Growth / Vision)'},
  {id:'journeys',  label:'Use Cases / Journey',ico:I('<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>'), src:'User Journeys'},
  {id:'specs',     label:'Specifications',     ico:I('<path d="M3 17 5 19 9 15"/><path d="M3 7 5 9 9 5"/><line x1="13" y1="6" x2="21" y2="6"/><line x1="13" y1="12" x2="21" y2="12"/><line x1="13" y1="18" x2="21" y2="18"/>'), src:'Functional + Non-Functional Reqs'},
  {id:'release',   label:'Release & Rollout',  ico:I('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'), src:'Launch plan (extends Scoping)'},
  {id:'governance',label:'Governance',         ico:I('<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>'), src:'Domain / Compliance + Ownership'},
  {id:'risk',      label:'Risk',               ico:I('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'), src:'Risk register (from Scoping)'},
  {id:'glossary',  label:'Glossary',           ico:I('<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'), src:'Reference — terms & definitions'},
];
var TABS_ARCH = [
  {id:'a_context',   label:'Context & Drivers', ico:I('<path d="M14.1 5.5a2 2 0 0 0 1.8 0l3.6-1.8A1 1 0 0 1 21 4.6v12.8a1 1 0 0 1-.5.9l-4.6 2.3a2 2 0 0 1-1.8 0l-4.2-2.1a2 2 0 0 0-1.8 0l-3.6 1.8A1 1 0 0 1 3 19.4V6.6a1 1 0 0 1 .5-.9l4.6-2.3a2 2 0 0 1 1.8 0z"/><path d="M15 5.8v15"/><path d="M9 3.2v15"/>'), src:'BMAD Architecture · context'},
  {id:'a_decisions', label:'Decisions (ADRs)',  ico:I('<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>'), src:'BMAD Architecture · core decisions'},
  {id:'a_stack',     label:'Tech Stack',        ico:I('<path d="M12.8 2.2a2 2 0 0 0-1.6 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0l8.6-3.9a1 1 0 0 0 0-1.8Z"/><path d="m22 17.7-9.2 4.1a2 2 0 0 1-1.6 0L2 17.7"/><path d="m22 12.7-9.2 4.1a2 2 0 0 1-1.6 0L2 12.7"/>'), src:'BMAD Architecture · technologies & versions'},
  {id:'a_components',label:'Components',         ico:I('<path d="M5.5 8.5 9 12l-3.5 3.5L2 12z"/><path d="m12 2 3.5 3.5L12 9 8.5 5.5z"/><path d="M18.5 8.5 22 12l-3.5 3.5L15 12z"/><path d="m12 15 3.5 3.5L12 22l-3.5-3.5z"/>'), src:'BMAD Architecture · structure'},
  {id:'a_resources', label:'Resources',         ico:I('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>'), src:'Infrastructure · databases, queues, storage'},
  {id:'a_apis',         label:'APIs',          ico:I('<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>'), src:'BMAD Architecture · published API'},
  {id:'a_integrations', label:'Integrations',  ico:I('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>'), src:'External tools & systems'},
  {id:'a_security',  label:'Security',          ico:I('<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.7 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>'), src:'BMAD Architecture · security'},
  {id:'a_infra',     label:'Infrastructure',    ico:I('<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'), src:'BMAD Architecture · deployment'},
  {id:'a_design',    label:'Design / UX',       ico:I('<circle cx="13.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".8" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".8" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".8" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.7-1.7h2c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z"/>'), src:'Design system & key screens'},
  {id:'a_structure', label:'Project Structure', ico:I('<path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 14 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.9-.6l-.4-.8a1 1 0 0 0-.9-.6H12a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"/><path d="M3 5a2 2 0 0 0 2 2h3"/><path d="M3 3v13a2 2 0 0 0 2 2h3"/>'), src:'BMAD Architecture · structure & patterns'},
  {id:'a_kb',        label:'Knowledge Base',    ico:I('<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>'), src:'Reference · architecture patterns & decision criteria'},
];
var doc='prd';
function curTabs(){return doc==='arch'?TABS_ARCH:TABS_PRD;}

var active='overview';
var ovSub='why';
var ctxSub='domain';
var ucSub='journeys';
var ucvTab='overview';
var specSub='functional';
var frOpen={};
var aApiSub='apis';
var compView='domains';
var curDomain='';
var domSub='aggregate';
var curComp='';
var compTab='overview';
var compPage=false;
var mapOpen={};
var infraEnv='prod';

/* ---------- coverage indicators ---------- */
function status(tab){
  try{
  switch(tab){
    case 'overview':{let f=[S.overview.vision,S.overview.differentiator,S.overview.targetUsers].filter(Boolean).length+(S.overview.criteria.length?1:0);return f>=4?'done':f?'partial':'empty';}
    case 'context':{let f=(S.portfolio.domain?1:0)+(S.portfolio.owners.length?1:0)+(S.portfolio.dependencies.length?1:0)+(S.portfolio.objectives.length?1:0);return f>=3?'done':f?'partial':'empty';}
    case 'personas': return S.personas.length>=3?'done':S.personas.length?'partial':'empty';
    case 'product':{let f=(S.product.mvp.length?1:0)+(S.product.growth.length?1:0)+(S.product.vision.length?1:0)+(S.product.approach?1:0);return f>=3?'done':f?'partial':'empty';}
    case 'journeys': return S.journeys.length>=3?'done':S.journeys.length?'partial':'empty';
    case 'specs':{let f=(S.specs.functional.length?1:0)+(S.specs.nonfunctional.length?1:0);return f>=2?'done':f?'partial':'empty';}
    case 'governance': return S.governance.length>=3?'done':S.governance.length?'partial':'empty';
    case 'risk': return S.risk.length>=3?'done':S.risk.length?'partial':'empty';
    case 'release':{let f=(S.release.strategy?1:0)+(S.release.milestones.length?1:0);return f>=2?'done':f?'partial':'empty';}
    case 'glossary': return S.glossary.length>=3?'done':S.glossary.length?'partial':'empty';
    case 'a_context':{let f=(A.context.summary?1:0)+(A.context.drivers.length?1:0)+(A.context.constraints.length?1:0);return f>=3?'done':f?'partial':'empty';}
    case 'a_decisions': return A.decisions.length>=3?'done':A.decisions.length?'partial':'empty';
    case 'a_components': return A.domains.length>=3?'done':A.domains.length?'partial':'empty';
    case 'a_resources': return A.resources.length>=4?'done':A.resources.length?'partial':'empty';
    case 'a_apis': return A.apis.length>=3?'done':A.apis.length?'partial':'empty';
    case 'a_integrations': return A.integrations.length>=3?'done':A.integrations.length?'partial':'empty';
    case 'a_security': return A.security.length>=3?'done':A.security.length?'partial':'empty';
    case 'a_infra':{let f=(A.infra.summary?1:0)+(A.infra.environments.length?1:0);return f>=2?'done':f?'partial':'empty';}
    case 'a_stack': return A.stack.length>=4?'done':A.stack.length?'partial':'empty';
    case 'a_design': return A.design.links.length?'done':'empty';
    case 'a_structure':{let f=(A.structure.tree?1:0)+(A.structure.mapping.length?1:0)+(A.structure.patterns.length?1:0);return f>=2?'done':f?'partial':'empty';}
    case 'a_kb': return A.kb.patterns.length>=3?'done':A.kb.patterns.length?'partial':'empty';
  }
  }catch(e){return 'empty';}
}
function coverage(){const w={done:1,partial:.5,empty:0};const t=curTabs();return Math.round(t.reduce((a,x)=>a+w[status(x.id)],0)/t.length*100);}

var esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function tierTag(t){const c={Primary:'b',Secondary:'w',Admin:'g',Future:''}[t]||'';return t?`<span class="tag ${c}">${esc(t)}</span>`:'';}
function dirCls(d){return {inbound:'b',outbound:'w',bidirectional:'g'}[d]||'';}
function hexA(h,a){const n=parseInt(h.slice(1),16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;}
var COMP_TABS=[
  {k:'overview',l:'Overview',c:'#4f6cff'},
  {k:'trigger',l:'Trigger',c:'#d68a16'},
  {k:'businessRules',l:'Business rules',c:'#8b5cff'},
  {k:'command',l:'Command',c:'#1ba97a'},
  {k:'readModel',l:'Read model',c:'#2d9cdb'},
  {k:'writeModel',l:'Write model',c:'#c0367a'},
  {k:'resource',l:'Resource',c:'#6a39cc'},
  {k:'code',l:'Code',c:'#5b6680'},
  {k:'dependency',l:'Dependency',c:'#0f8a6a'},
  {k:'hotspot',l:'Hotspot',c:'#e2495c'}
];
var drow=(k,v)=>v?`<div class="detrow"><div class="dk">${k}</div><div class="dv">${esc(v)}</div></div>`:'';

function renderNav(){
  document.getElementById('docsel').innerHTML=
    `<button class="${doc==='prd'?'on':''}" onclick="setDoc('prd')">PRD</button>`+
    `<button class="${doc==='arch'?'on':''}" onclick="setDoc('arch')">Architecture</button>`;
  document.getElementById('nav').innerHTML=curTabs().map(t=>`
    <div class="navitem ${t.id===active?'active':''}" onclick="go('${t.id}')">
      <span class="ico">${t.ico}</span><span class="lab">${t.label}</span>
      <span class="dot ${status(t.id)}" title="${status(t.id)}"></span>
    </div>`).join('');
  document.getElementById('brandTitle').textContent=doc==='arch'?'Architecture':'PRD';
  document.getElementById('crumbName').textContent=S.overview.projectName||'Untitled';
  document.getElementById('brandSub').textContent='BMAD-structured · read-only';
  const p=coverage();
  document.getElementById('progFill').style.width=p+'%';
  document.getElementById('progTxt').textContent=p+'%';
}
function setDoc(d){if(doc===d)return;doc=d;active=curTabs()[0].id;closeModal();renderNav();render();document.getElementById('canvas').scrollTop=0;history.replaceState(null,'','#'+d+'/'+active);}
function go(id){active=id;if(id==='a_components'){compView='domains';compPage=false;}renderNav();render();document.getElementById('canvas').scrollTop=0;closeModal();
  history.replaceState(null,'','#'+(doc==='arch'?'arch/':'')+id);}
function gotoRef(ref){
  doc='prd';
  if(/^NFR/.test(ref)){active='specs';specSub='nonfunctional';renderNav();render();setTimeout(()=>detailNFR(ref),60);}
  else if(/^FR/.test(ref)){active='specs';specSub='functional';renderNav();render();setTimeout(()=>detailFR(ref),60);}
  else if(/^UC/.test(ref)){active='journeys';ucSub='usecases';renderNav();render();setTimeout(()=>detailUsecase(ref),60);}
  else if(/^J/.test(ref)){active='journeys';ucSub='journeys';renderNav();render();setTimeout(()=>detailJourney(ref),60);}
  else if(/^G/.test(ref)){active='governance';renderNav();render();setTimeout(()=>detailGov(ref),60);}
  else if(/^POL/.test(ref)){active='specs';specSub='policies';renderNav();render();setTimeout(()=>detailPolicy(ref),60);}
  else if(/^P/.test(ref)){active='personas';renderNav();render();setTimeout(()=>detailPersona(ref),60);}
  else if(/^SC/.test(ref)){active='overview';ovSub='metrics';renderNav();render();}
  else {active='overview';renderNav();render();}
}
function refTag(ref){return `<span class="tracelink" onclick="event.stopPropagation();gotoRef('${ref}')">${esc(ref)}</span>`;}
function gotoArch(tab,kind,id){doc='arch';active=tab;
  if(kind==='comp'){const dom=A.domains.find(d=>d.components.some(c=>c.id===id));if(dom){compView='domain';curDomain=dom.id;domSub='components';curComp=id;compTab='overview';compPage=true;}renderNav();render();return;}
  renderNav();render();setTimeout(()=>{if(kind==='adr')detailADR(id);else if(kind==='api')detailApi(id);else if(kind==='sec')detailSec(id);else if(kind==='res')detailResource(id);else if(kind==='intg')detailIntegration(id);},60);}
function archImpl(refId){
  const adrs=A.decisions.filter(d=>(d.affects||[]).includes(refId)).map(d=>`<span class="tracelink" onclick="gotoArch('a_decisions','adr','${d.id}')">🧭 ${d.id}</span>`);
  const comps=[];A.domains.forEach(d=>d.components.forEach(c=>{if((c.mapsTo||[]).includes(refId))comps.push(`<span class="tracelink" onclick="gotoArch('a_components','comp','${c.id}')">▢ ${esc(c.name)}</span>`);}));
  const apis=A.apis.filter(a=>(a.realizes||[]).includes(refId)).map(a=>`<span class="tracelink" onclick="gotoArch('a_apis','api','${a.id}')">🔌 ${a.id}</span>`);
  const secs=A.security.filter(x=>(x.addresses||[]).includes(refId)).map(x=>`<span class="tracelink" onclick="gotoArch('a_security','sec','${x.id}')">🔒 ${x.id}</span>`);
  const all=[...adrs,...comps,...apis,...secs];
  return all.length?`<div class="tracebox" style="margin-top:10px"><div class="tl">Implemented by (Architecture)</div>${all.join('')}</div>`:'';
}

function header(t){const tab=curTabs().find(x=>x.id===t)||{label:t,src:''};return `<div class="head"><div><h2>${tab.label}</h2><span class="src">${tab.src}</span></div><div class="sp"></div></div>`;}

function render(){
  const c=document.getElementById('canvas');
  try{
    if(doc==='arch'){
      const map={a_context:viewAContext,a_decisions:viewADecisions,a_stack:viewAStack,a_components:viewAComponents,a_resources:viewAResources,a_apis:viewAApis,a_integrations:viewAIntegrations,a_security:viewASecurity,a_infra:viewAInfra,a_design:viewADesign,a_structure:viewAStructure,a_kb:viewAKb};
      c.innerHTML=(map[active]||viewAContext)();
      setTimeout(drawMermaid,40);
      return;
    }
    if(active==='overview') c.innerHTML=viewOverview();
    else if(active==='context') c.innerHTML=viewContext();
    else if(active==='product') c.innerHTML=viewProduct();
    else if(active==='specs') c.innerHTML=viewSpecs();
    else if(active==='release') c.innerHTML=viewRelease();
    else if(active==='glossary') c.innerHTML=viewGlossary();
    else if(active==='journeys') c.innerHTML=viewJourneysTab();
    else c.innerHTML=viewList(active);
    if(active==='context') setTimeout(drawMermaid,40);
  }catch(e){
    c.innerHTML='<div class="empty-note">This section has no content yet. (Add it in data.js, then reload.)</div>';
  }
}

function viewOverview(){
  const o=S.overview;
  const groups={
    why:`<div class="ov">
       <div class="block full"><div class="k">Problem Statement</div><div class="v">${esc(o.problem)}</div></div>
       <div class="block full"><div class="k">Background &amp; Context</div><div class="v">${esc(o.background)}</div></div>
     </div>`,
    vision:`<div class="ov">
       <div class="block full"><div class="k">Vision</div><div class="v">${esc(o.vision)}</div></div>
       <div class="block full"><div class="k">Objectives</div><div class="v"><ul style="margin:0;padding-left:18px;line-height:1.7">${(o.objectives||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
       <div class="block"><div class="k">Differentiator</div><div class="v">${esc(o.differentiator)}</div></div>
       <div class="block"><div class="k">Target Users</div><div class="v">${esc(o.targetUsers)}</div></div>
     </div>`,
    metrics:`<div class="ov"><div class="block full">
       <div class="k">Success Metrics</div>
       ${o.criteria.map(cr=>`<div class="crit"><div class="num">${esc(cr.id)}</div><div><div class="v" style="font-size:13.5px">${esc(cr.text)}</div><span class="tag g" style="margin-top:7px;display:inline-block">🎯 ${esc(cr.metric)}</span></div></div>`).join('')}
     </div></div>`
  };
  const labels={why:'Problem & Background',vision:'Vision & Objectives',metrics:'Success Metrics'};
  if(!groups[ovSub]) ovSub='why';
  const pills=Object.keys(groups).map(k=>`<button class="subtab ${k===ovSub?'on':''}" onclick="setOv('${k}')">${labels[k]}</button>`).join('');
  return header('overview')+
  `<p class="lead">Executive context and measurable success criteria — the anchor of the BMAD traceability chain (Problem → Vision → Success Metrics → Journeys → Requirements).</p>
   <div class="subtabs">${pills}</div>
   ${groups[ovSub]}`;
}
function setOv(k){ovSub=k;document.getElementById('canvas').innerHTML=viewOverview();}

function viewProduct(){
  const p=S.product;
  const ph=(key,cls,label)=>`<div class="phase ${cls}"><div class="ph">${label}</div><ul>${p[key].map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div>`;
  const scopeList=(arr,mark)=>`<ul style="list-style:none;margin:0;padding:0">${(arr||[]).map(x=>`<li style="font-size:12.7px;color:var(--muted);padding:6px 0;display:flex;gap:8px"><span>${mark}</span><span>${esc(x)}</span></li>`).join('')}</ul>`;
  return header('product')+
  `<p class="lead">Product scope. The boundary (what's in and explicitly out) sits above the three BMAD phases — the MVP is the lean must-have set; Growth and Vision preserve the long-term roadmap.</p>
   <div class="block" style="margin-bottom:16px"><div class="k">MVP Strategy</div><div class="v">${esc(p.approach)}</div></div>
   <div class="ov" style="margin-bottom:18px">
     <div class="block"><div class="k" style="color:#147a55">✓ In Scope</div>${scopeList(p.inScope,'✓')}</div>
     <div class="block"><div class="k" style="color:#c0364a">✕ Out of Scope</div>${scopeList(p.outScope,'✕')}</div>
   </div>
   <div class="sectionlabel" style="margin-top:4px">Phased Roadmap</div>
   <div class="phases">${ph('mvp','mvp','① MVP')}${ph('growth','growth','② Growth')}${ph('vision','vision','③ Vision')}</div>`;
}

function viewSpecs(){
  const labels={functional:'Functional',nonfunctional:'Non-Functional',policies:'Policies'};
  if(!labels[specSub]) specSub='functional';
  const pills=Object.keys(labels).map(k=>`<button class="subtab ${k===specSub?'on':''}" onclick="setSpec('${k}')">${labels[k]}</button>`).join('');
  const lead=specSub==='functional'
    ? 'The capability contract. Functional requirements state <b>what</b> exists (not how) — each traces back to a journey and a success criterion.'
    : specSub==='nonfunctional'
    ? 'Quality attributes. Non-functional requirements must be measurable, with a metric, condition, and measurement method.'
    : 'Business rules and policies the product must enforce. Architecture component business rules link back to these.';
  const body=specSub==='functional'?frSection():specSub==='nonfunctional'?nfrSection():policiesSection();
  return header('specs')+`<p class="lead">${lead}</p><div class="subtabs">${pills}</div>${body}`;
}
function policiesSection(){const p=S.specs.policies||[];
  return `<div class="list">${p.map(x=>`<div class="lrow" onclick="detailPolicy('${x.id}')"><div class="lmain"><div class="lt">${esc(x.id)} · ${esc(x.name)}</div><div class="ls">${esc(x.statement)}</div></div><div class="lmeta">${x.traceFR?`<span class="tag g">${esc(x.traceFR)}</span>`:''}</div></div>`).join('')||'<div class="empty-note">No policies yet.</div>'}</div>`;
}
function detailPolicy(id){const p=(S.specs.policies||[]).find(x=>x.id===id);if(!p)return;
  const enf=[];A.domains.forEach(d=>d.components.forEach(c=>{(c.businessRules||[]).forEach(b=>{if(b.ref===id&&!enf.some(e=>e.id===c.id))enf.push(c);});}));
  openModal(mwrap(p.id+' · '+esc(p.name),
    `<div class="detrow"><div class="dk">Statement</div><div class="dv">${esc(p.statement)}</div></div>
     ${p.traceFR?`<div class="tracebox"><div class="tl">Relates to</div>${refTag(p.traceFR)}</div>`:''}
     ${enf.length?`<div class="tracebox" style="margin-top:10px"><div class="tl">Enforced by (Architecture)</div>${enf.map(c=>`<span class="tracelink" onclick="gotoArch('a_components','comp','${c.id}')">▢ ${esc(c.name)}</span>`).join('')}</div>`:''}`));
}
function setSpec(k){specSub=k;document.getElementById('canvas').innerHTML=viewSpecs();}
function frToggle(a){frOpen[a]=!(frOpen[a]!==false);document.getElementById('canvas').innerHTML=viewSpecs();}
function frExpandAll(v){[...new Set(S.specs.functional.map(x=>x.area))].forEach(a=>frOpen[a]=v);document.getElementById('canvas').innerHTML=viewSpecs();}
function frAccItem(a,extra){
  const f=S.specs.functional;const items=f.filter(x=>x.area===a);const open=frOpen[a]!==false;const key=a.replace(/'/g,"\\'");
  return `<button onclick="frToggle('${key}')" style="width:100%;text-align:left;cursor:pointer;border:1px solid var(--line);background:var(--panel);border-radius:10px;padding:12px 14px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;font-family:inherit;color:var(--ink);font-size:14px;font-weight:600">
       <span><span style="display:inline-block;width:16px;color:var(--soft)">${open?'▾':'▸'}</span>${esc(a)}</span>
       <span style="font-size:11px;color:var(--muted);background:var(--chip);border:1px solid var(--line);padding:2px 9px;border-radius:999px">${items.length}</span></button>
     ${open?`<div class="cards" style="margin-bottom:16px">${items.map(frCard).join('')}${extra||''}</div>`:''}`;
}
function frSection(){
  const areas=[...new Set(S.specs.functional.map(x=>x.area))];
  if(!areas.length) return '<div class="empty-note">No functional requirements.</div>';
  const ctrl=`<div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:10px"><button onclick="frExpandAll(true)" style="cursor:pointer;border:1px solid var(--line);background:var(--panel);color:var(--muted);border-radius:8px;padding:5px 10px;font-size:12px;font-family:inherit">Expand all</button><button onclick="frExpandAll(false)" style="cursor:pointer;border:1px solid var(--line);background:var(--panel);color:var(--muted);border-radius:8px;padding:5px 10px;font-size:12px;font-family:inherit">Collapse all</button></div>`;
  return ctrl+areas.map(a=>frAccItem(a)).join('');
}
function nfrSection(){const n=S.specs.nonfunctional;
  return `<div class="cards">${n.map(x=>`<div class="card" onclick="detailNFR('${x.id}')"><span class="role">${esc(x.cat)}</span><h3 style="font-size:13px;margin-top:5px">${x.id}</h3><p>${esc(x.text)}</p></div>`).join('')||'<div class="empty-note">No non-functional requirements.</div>'}</div>`;}
function frCard(fr){
  const j=S.journeys.find(x=>x.id===fr.traceJ);
  const sc=S.overview.criteria.find(x=>x.id===fr.traceSC);
  return `<div class="card" onclick="detailFR('${fr.id}')">
    <span class="role">${fr.id}</span><p style="margin-top:6px;color:var(--ink);font-size:13.3px">${esc(fr.text)}</p>
    <div class="tagrow">${j?`<span class="tag b">➤ ${esc(j.title.slice(0,22))}…</span>`:''}${sc?`<span class="tag g">🎯 ${sc.id}</span>`:''}</div></div>`;
}

function viewList(tab){
  if(tab==='personas'){const order={Primary:0,Secondary:1,Admin:2,Future:3};const ps=[...S.personas].sort((a,b)=>(order[a.tier]??9)-(order[b.tier]??9));
    const stk=(S.stakeholders||[]).map(s=>`<div class="card" onclick="detailStakeholder('${s.id}')"><span class="role">${esc(s.role)}</span><h3 style="margin-top:5px">${esc(s.name)}</h3><p>${esc(s.interest)}</p></div>`).join('');
    return header('personas')+`<p class="lead">Personas — promoted to first-class here (BMAD embeds them inside journeys). Each captures who they are and how they work: tier, goals and their own success metric, permissions, usage, decision authority, handoffs, touchpoints, and tooling. Stakeholders (people who care but don't use the product daily) follow below.</p><div class="cards">${ps.map(p=>`<div class="card" onclick="detailPersona('${p.id}')"><div style="display:flex;justify-content:space-between;align-items:center"><span class="role">${esc(p.role)}</span>${tierTag(p.tier)}</div><h3 style="margin-top:6px">${esc(p.name)}</h3><p>${esc(p.situation)}</p><div class="tagrow"><span class="tag">🎯 ${esc((p.goal||'').slice(0,30))}…</span></div></div>`).join('')}</div>${stk?`<div class="sectionlabel">Stakeholders</div><div class="cards">${stk}</div>`:''}`;}
  if(tab==='journeys') return header('journeys')+`<p class="lead">Narrative journeys with the BMAD story arc: opening scene → rising action → climax → resolution. Each reveals the capabilities that become functional requirements.</p><div class="cards">${S.journeys.map(j=>{const p=S.personas.find(x=>x.id===j.personaId);return `<div class="card" onclick="detailJourney('${j.id}')"><span class="role">${j.id} · ${p?esc(p.name):'—'}</span><h3 style="font-size:14px">${esc(j.title)}</h3><p>${esc(j.opening)}</p><div class="tagrow">${(j.capabilities||'').split(',').slice(0,3).map(c=>`<span class="tag b">${esc(c.trim())}</span>`).join('')}</div></div>`;}).join('')}</div>`;
  if(tab==='governance') return header('governance')+`<p class="lead">Governance — compliance obligations (BMAD domain requirements) plus the approvals, ownership, and key decisions that keep the project accountable.</p><div class="cards">${S.governance.map(g=>{const cls={Compliance:'r',Approval:'w',Ownership:'b',Decision:'g'}[g.type]||'';return `<div class="card" onclick="detailGov('${g.id}')"><span class="tag ${cls}">${esc(g.type)}</span><h3 style="font-size:14px;margin-top:9px">${esc(g.item)}</h3><div class="tagrow"><span class="tag">👤 ${esc(g.owner)}</span><span class="tag">${esc(g.status)}</span></div></div>`;}).join('')}</div>`;
  if(tab==='risk') return header('risk')+`<p class="lead">Risk register — consolidated from BMAD's scoping risks (technical, market, resource) with likelihood, impact, and a mitigation owner.</p><div class="cards">${S.risk.map(r=>{const sev=(r.impact==='High')?'r':(r.impact==='Medium'?'w':'g');return `<div class="card" onclick="detailRisk('${r.id}')"><span class="tag ${ {Technical:'b',Market:'w',Resource:'g'}[r.cat]||''}">${esc(r.cat)}</span><h3 style="font-size:14px;margin-top:9px">${esc(r.title)}</h3><div class="tagrow"><span class="tag ${sev}">Impact: ${esc(r.impact)}</span><span class="tag">Likelihood: ${esc(r.likelihood)}</span></div></div>`;}).join('')}</div>`;
}

function viewRelease(){
  const r=S.release;
  const sc={Planned:'',['In progress']:'w',Done:'g',Shipped:'g',Delayed:'r'};
  return header('release')+
  `<p class="lead">How and when the product ships. The rollout strategy plus dated milestones — distinct from Product scope, which covers <i>what</i> we build.</p>
   <div class="block" style="margin-bottom:18px"><div class="k">Rollout Strategy</div><div class="v">${esc(r.strategy)}</div></div>
   <div class="sectionlabel" style="margin-top:4px">Milestones</div>
   <div class="cards">${r.milestones.map(m=>`<div class="card" onclick="detailMilestone('${m.id}')"><div style="display:flex;justify-content:space-between;align-items:center"><span class="role">${esc(m.date)}</span><span class="tag ${sc[m.status]||''}">${esc(m.status)}</span></div><h3 style="margin-top:6px;font-size:14px">${esc(m.name)}</h3><p>${esc(m.notes)}</p></div>`).join('')}</div>`;
}
function viewGlossary(){
  const g=[...S.glossary].sort((a,b)=>a.term.localeCompare(b.term));
  return header('glossary')+
  `<p class="lead">Shared vocabulary for the document. Keeping terms defined in one place keeps the PRD precise and onboards new readers fast.</p>
   <div class="cards">${g.map(t=>`<div class="card" style="cursor:default"><h3 style="font-size:14px">${esc(t.term)}</h3><p style="color:var(--ink)">${esc(t.definition)}</p></div>`).join('')}</div>`;
}

/* ---------- Use Cases & Journeys (sub-tabbed) ---------- */
function viewJourneysTab(){
  const labels={journeys:'Journeys',usecases:'Use Cases'};
  if(!labels[ucSub]) ucSub='journeys';
  const pills=Object.keys(labels).map(k=>`<button class="subtab ${k===ucSub?'on':''}" onclick="setUc('${k}')">${labels[k]}</button>`).join('');
  const lead=ucSub==='journeys'
    ? 'Narrative journeys with the BMAD story arc: opening → rising → climax → resolution. Each reveals capabilities that become requirements.'
    : 'Formal use cases: trigger, actors, orchestration, numbered steps to terminal states, extensions, a workflow diagram, and behavioural acceptance criteria.';
  return header('journeys')+`<p class="lead">${lead}</p><div class="subtabs">${pills}</div>${ucSub==='journeys'?journeysSection():usecasesSection()}`;
}
function setUc(k){ucSub=k;document.getElementById('canvas').innerHTML=viewJourneysTab();}
function journeysSection(){return `<div class="cards">${S.journeys.map(j=>{const p=S.personas.find(x=>x.id===j.personaId);return `<div class="card" onclick="detailJourney('${j.id}')"><span class="role">${j.id} · ${p?esc(p.name):'—'}</span><h3 style="font-size:14px">${esc(j.title)}</h3><p>${esc(j.opening)}</p><div class="tagrow">${(j.capabilities||'').split(',').slice(0,3).map(c=>`<span class="tag b">${esc(c.trim())}</span>`).join('')}</div></div>`;}).join('')}</div>`;}
function usecasesSection(){return `<div class="cards">${S.usecases.map(u=>{const p=S.personas.find(x=>x.id===u.primaryActor);const j=S.journeys.find(x=>x.id===u.journeyId);return `<div class="card" onclick="detailUsecase('${u.id}')"><span class="role">${u.id}${p?(' · '+esc(p.name)):''}</span><h3 style="font-size:14px">${esc(u.title)}</h3><p>${esc(u.trigger)}</p><div class="tagrow"><span class="tag b">${u.mainFlow.length} steps</span><span class="tag g">${u.acceptance.length} acceptance</span>${j?`<span class="tag">➤ ${esc(j.title.slice(0,16))}…</span>`:''}</div></div>`;}).join('')}</div>`;}

function detailUsecase(id){ucvTab='overview';ucShow(id);}
function setUcv(t,id){ucvTab=t;ucShow(id);}
function ucShow(id){const u=S.usecases.find(x=>x.id===id);openModal(mwrap(u.id+' · '+esc(u.title),ucInner(u)),true);if(ucvTab==='workflow')setTimeout(drawMermaid,40);}
function accCard(a){const lines=(arr,kw)=>(arr||[]).map((x,i)=>`<div style="font-size:13px;line-height:1.6"><b style="color:var(--accent);font-weight:600;display:inline-block;min-width:48px">${i===0?kw:'and'}</b> ${esc(x)}</div>`).join('');
  return `<div class="block" style="margin-bottom:12px"><div class="k">${esc(a.title)}</div>${lines(a.given,'Given')}${lines(a.when,'When')}${lines(a.then,'Then')}</div>`;}
function ucInner(u){
  const tabs={overview:'Overview',flow:'Scenario',workflow:'Workflow',acceptance:'Acceptance'};
  const pills=Object.keys(tabs).map(k=>`<button class="subtab ${k===ucvTab?'on':''}" onclick="setUcv('${k}','${u.id}')">${tabs[k]}</button>`).join('');
  let b='';
  if(ucvTab==='overview'){
    const p=S.personas.find(x=>x.id===u.primaryActor);const j=S.journeys.find(x=>x.id===u.journeyId);
    const frObjs=(u.frs||[]).map(id=>S.specs.functional.find(f=>f.id===id)).filter(Boolean);
    const ts=(u.terminalStates||[]).map(t=>`<div class="detrow"><div class="dk"><span class="tag ${t.type==='Success'?'g':'r'}">${esc(t.type)}</span></div><div class="dv">${esc(t.text)}</div></div>`).join('');
    b=`${drow('Trigger',u.trigger)}${p?`<div class="detrow"><div class="dk">Primary actor</div><div class="dv">${esc(p.name)} — ${esc(p.role)}</div></div>`:''}${drow('Supporting',u.supportingActors)}${drow('Orchestration',u.orchestration)}${drow('Preconditions',u.preconditions)}${drow('Repeatability',u.repeatability)}${drow('Postconditions',u.postconditions)}
       <div class="sectionlabel" style="margin:16px 0 8px">Terminal states</div>${ts}
       <div class="tracebox" style="margin-top:14px"><div class="tl">Realizes journey</div>${j?`<span class="tracelink" onclick="ucSub='journeys';go('journeys');setTimeout(()=>detailJourney('${j.id}'),60)">➤ ${esc(j.title)}</span>`:'<span style=color:#8a93a8;font-size:12.5px>No journey linked.</span>'}</div>
       <div class="tracebox" style="margin-top:10px"><div class="tl">Functional requirements (${frObjs.length})</div>${frObjs.map(f=>`<span class="tracelink" onclick="go('specs');setTimeout(()=>detailFR('${f.id}'),60)">⚙ ${f.id} · ${esc(f.text.slice(0,34))}…</span>`).join('')||'<span style=color:#8a93a8;font-size:12.5px>No FRs mapped yet.</span>'}</div>`;
  } else if(ucvTab==='flow'){
    b=`<div class="sectionlabel" style="margin-top:0">Main success scenario</div><ol style="margin:0;padding-left:20px;line-height:1.9;font-size:13.5px">${u.mainFlow.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`;
    if(u.extensions&&u.extensions.length) b+=`<div class="sectionlabel">Extensions / alternate flows</div>${u.extensions.map(e=>`<div class="detrow"><div class="dk">${esc(e.at)}</div><div class="dv">${esc(e.text)}</div></div>`).join('')}`;
  } else if(ucvTab==='workflow'){
    b=window.mermaid?`<div class="mermaid" style="text-align:center">${u.workflow}</div>`:`<pre style="white-space:pre-wrap;font-size:12.5px;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px">${esc(u.workflow)}</pre>`;
  } else {
    b=(u.acceptance||[]).map(accCard).join('')||'<div class="empty-note">No acceptance scenarios.</div>';
  }
  return `<div class="subtabs" style="margin-bottom:16px">${pills}</div>${b}`;
}
function drawMermaid(){if(!window.mermaid)return;try{window.mermaid.run({nodes:document.querySelectorAll('.mermaid:not([data-processed])')});}catch(e){}}

/* ---------- Strategic Context (sub-tabbed) ---------- */
function setCtx(k){ctxSub=k;document.getElementById('canvas').innerHTML=viewContext();setTimeout(drawMermaid,40);}
function mclean(t){return (t||'').replace(/"/g,'').replace(/\n/g,' ');}
function kpiTree(){let s='flowchart TD\n';S.portfolio.objectives.forEach((o,i)=>{const on='O'+i;s+=`  ${on}["${mclean(o.objective)}"]\n`;o.keyResults.forEach((k,j)=>{const kn=on+'K'+j;s+=`  ${on} --> ${kn}["${mclean(k.kr)}"]\n  ${kn} --> ${kn}C["${mclean(k.metric||'contributes')}"]\n`;});});return s;}
function viewContext(){
  const P=S.portfolio;
  const labels={domain:'Domain & Value Stream',owners:'Ownership & Dependencies',align:'Strategic Alignment'};
  if(!labels[ctxSub]) ctxSub='domain';
  const pills=Object.keys(labels).map(k=>`<button class="subtab ${k===ctxSub?'on':''}" onclick="setCtx('${k}')">${labels[k]}</button>`).join('');
  let b='';
  if(ctxSub==='domain'){
    const vsStages=(P.valueStream||'').split(/->|→|⟶/).map(t=>mclean(t).trim()).filter(Boolean);
    const vs=vsStages.length>1?('flowchart LR\n'+vsStages.map((t,i)=>`  N${i}["${t}"]`).join('\n')+'\n'+vsStages.slice(1).map((_,i)=>`  N${i} --> N${i+1}`).join('\n')):'';
    b=`<div class="ov">
       <div class="block full"><div class="k">Business domain</div><div class="v">${esc(P.domain)}</div></div>
       <div class="block"><div class="k">Business capability</div><div class="v">${esc(P.capability)}</div></div>
       <div class="block"><div class="k">Value stream</div><div class="v">${esc(P.valueStream)}</div></div>
       <div class="block full"><div class="k">Where this product sits</div><div class="v">${esc(P.position)}</div></div>
       ${vs?`<div class="block full"><div class="k">Value stream map</div><div class="mermaid" style="text-align:center">${vs}</div></div>`:''}
     </div>`;
  } else if(ctxSub==='owners'){
    const ow=`<div class="block full"><div class="k">Owners</div>${P.owners.map(o=>`<div class="detrow"><div class="dk">${esc(o.role)}</div><div class="dv">${esc(o.name)}</div></div>`).join('')}</div>`;
    const deps=`<div class="sectionlabel">Dependencies on other products</div><div class="cards">${P.dependencies.map(d=>`<div class="card" onclick="detailDep('${d.id}')"><span class="tag ${d.direction==='upstream'?'b':'w'}">${esc(d.direction)}</span><h3 style="font-size:14px;margin-top:9px">${esc(d.product)}</h3><p>${esc(d.nature)}</p><div class="tagrow"><span class="tag">${esc(d.status)}</span></div></div>`).join('')}</div>`;
    b=`<div class="ov">${ow}</div>${deps}`;
  } else {
    b=`<div class="block full" style="margin-bottom:16px"><div class="k">KPI / OKR tree</div><div class="mermaid" style="text-align:center">${kpiTree()}</div></div>`+
      P.objectives.map(o=>`<div class="block" style="margin-bottom:12px"><div class="k">Objective${o.owner?` · ${esc(o.owner)}`:''}</div><div class="v" style="margin-bottom:10px">${esc(o.objective)}</div>${o.keyResults.map(k=>`<div class="detrow"><div class="dk">${esc(k.id)}</div><div class="dv"><span style="font-weight:500">${esc(k.kr)}</span><br><span style="color:var(--muted)">${esc(k.contribution)}</span> ${k.metric?refTag(k.metric):''}</div></div>`).join('')}</div>`).join('');
  }
  return header('context')+`<p class="lead">How this product relates to its domain, who owns it, what it depends on, and how it ladders up to strategy. Contributions link to the PRD success metrics they move.</p><div class="subtabs">${pills}</div>${b}`;
}
function detailDep(id){const d=S.portfolio.dependencies.find(x=>x.id===id);openModal(mwrap(esc(d.product),`${drow('Direction',d.direction)}${drow('Nature',d.nature)}${drow('Status',d.status)}${drow('Notes',d.notes)}`));}

/* ---------- Architecture & Design views ---------- */
function ulist(arr){return `<ul style="margin:0;padding-left:18px;line-height:1.7">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;}
function viewAContext(){const c=A.context;
  return header('a_context')+
  `<p class="lead">System context and the forces shaping the design. Drivers and constraints trace back to the PRD's NFRs and governance items.</p>
   <div class="ov">
     <div class="block full"><div class="k">Summary</div><div class="v">${esc(c.summary)}</div></div>
     <div class="block"><div class="k">Drivers</div><div class="v">${ulist(c.drivers)}</div></div>
     <div class="block"><div class="k">Constraints</div><div class="v">${ulist(c.constraints)}</div></div>
     <div class="block full"><div class="k">Assumptions</div><div class="v">${ulist(c.assumptions)}</div></div>
     <div class="block full"><div class="k">System context</div><div class="mermaid" style="text-align:center">${c.diagram}</div></div>
   </div>`;
}
function viewADecisions(){const sc={Accepted:'g',Proposed:'w',Superseded:'r',Deprecated:'r'};
  return header('a_decisions')+
  `<p class="lead">The decision log. Each ADR records the choice, why, alternatives, and consequences — and links to the PRD requirements it satisfies.</p>
   <div class="cards">${A.decisions.map(d=>`<div class="card" onclick="detailADR('${d.id}')"><div style="display:flex;justify-content:space-between;align-items:center"><span class="role">${d.id} · ${esc(d.cat)}</span><span class="tag ${sc[d.status]||''}">${esc(d.status)}</span></div><h3 style="font-size:14px;margin-top:6px">${esc(d.title)}</h3><div class="tagrow">${d.affects.map(r=>`<span class="tag b">${esc(r)}</span>`).join('')}</div></div>`).join('')}</div>`;
}
function detailADR(id){const d=A.decisions.find(x=>x.id===id);const sc={Accepted:'g',Proposed:'w',Superseded:'r',Deprecated:'r'};
  openModal(mwrap(d.id+' · '+esc(d.title),
    `<div style="margin-bottom:14px"><span class="tag ${sc[d.status]||''}">${esc(d.status)}</span> <span class="tag">${esc(d.cat)}</span></div>
     ${drow('Rationale',d.rationale)}${drow('Alternatives',d.alternatives)}${drow('Consequences',d.consequences)}
     <div class="tracebox"><div class="tl">Satisfies / affects (PRD)</div>${d.affects.map(refTag).join('')}</div>`),true);
}
function renderArchCanvas(){document.getElementById('canvas').innerHTML=viewAComponents();setTimeout(drawMermaid,40);}
function openDomain(id){compView='domain';curDomain=id;domSub='aggregate';compPage=false;renderArchCanvas();document.getElementById('canvas').scrollTop=0;}
function backToDomains(){compView='domains';compPage=false;renderArchCanvas();}
function setDomSub(k){domSub=k;compPage=false;renderArchCanvas();}
function openComp(id){curComp=id;compTab='overview';compPage=true;renderArchCanvas();document.getElementById('canvas').scrollTop=0;}
function closeComp(){compPage=false;renderArchCanvas();}
function setCompTab(k){compTab=k;renderArchCanvas();}
function viewAComponents(){return compView==='domain'?domainPage():domainsList();}
function mapToggle(key){mapOpen[key]=!mapOpen[key];renderArchCanvas();}
function mapBlocks(maps,scope){return (maps||[]).map((m,i)=>{const key=scope+'|'+i;const open=!!mapOpen[key];
  return `<button onclick="mapToggle('${key}')" style="width:100%;text-align:left;cursor:pointer;border:1px solid var(--line);background:var(--panel);border-radius:10px;padding:12px 14px;margin-bottom:${open?'10px':'8px'};display:flex;align-items:center;justify-content:space-between;font-family:inherit;color:var(--ink);font-size:14px;font-weight:600"><span><span style="display:inline-block;width:16px;color:var(--soft)">${open?'▾':'▸'}</span>${esc(m.title)}</span><span style="font-size:11px;color:var(--muted);background:var(--chip);border:1px solid var(--line);padding:2px 9px;border-radius:999px">map</span></button>${open?`<div class="block full" style="margin-bottom:14px"><div class="mermaid" style="text-align:center">${m.mermaid}</div></div>`:''}`;
}).join('');}
function domainsList(){
  const maps=mapBlocks(A.subdomainMaps,'sd');
  return header('a_components')+
  `<p class="lead">Components organised by Domain-Driven Design. The maps below show how the subdomains relate; each subdomain has one aggregate, its own maps, and the components (slices) that act on it.</p>
   ${maps?`<div class="sectionlabel" style="margin-top:0">Subdomain maps</div>${maps}`:''}
   <div class="sectionlabel">Subdomains</div>
   <div class="cards">${A.domains.map(d=>`<div class="card" onclick="openDomain('${d.id}')" style="border-left:4px solid ${d.color};border-radius:14px 14px 14px 14px">
       <span class="role" style="color:${d.color}">Subdomain</span>
       <h3 style="font-size:15px;margin-top:5px">${esc(d.name)}</h3>
       <p>${esc(d.summary)}</p>
       <div class="tagrow"><span class="tag">◇ ${esc(d.aggregate.name)}</span><span class="tag">${d.components.length} component${d.components.length===1?'':'s'}</span>${d.maps&&d.maps.length?`<span class="tag">${d.maps.length} map${d.maps.length===1?'':'s'}</span>`:''}</div></div>`).join('')}</div>`;
}
function domainPage(){
  const d=A.domains.find(x=>x.id===curDomain); if(!d) return domainsList();
  if(domSub==='components' && compPage){const comp=d.components.find(c=>c.id===curComp)||d.components[0];if(comp)return componentPage(d,comp);}
  const back=`<button onclick="backToDomains()" style="cursor:pointer;border:1px solid var(--line);background:var(--panel);color:var(--muted);border-radius:8px;padding:6px 12px;font-size:12.5px;font-family:inherit;margin-bottom:14px">← Subdomains</button>`;
  const head=`<div class="head"><div><h2 style="display:flex;align-items:center;gap:10px"><span style="width:13px;height:13px;border-radius:4px;background:${d.color};display:inline-block"></span>${esc(d.name)}</h2><span class="src">Subdomain · aggregate ${esc(d.aggregate.name)}</span></div></div>`;
  const labels={aggregate:'Aggregate',components:'Components',maps:'Maps'};
  const pills=Object.keys(labels).map(k=>`<button class="subtab ${k===domSub?'on':''}" onclick="setDomSub('${k}')">${labels[k]}</button>`).join('');
  const content=domSub==='maps'?mapsView(d):domSub==='components'?componentsView(d):aggregateView(d);
  return back+head+`<p class="lead">${esc(d.summary)}</p><div class="subtabs">${pills}</div>${content}`;
}
function mapsView(d){
  if(!d.maps||!d.maps.length) return '<div class="empty-note">No maps for this subdomain yet.</div>';
  return mapBlocks(d.maps,d.id);
}
function aggregateView(d){const a=d.aggregate;
  return `<div class="block full" style="margin-bottom:14px"><div class="k">Owned data store · ${esc(a.name)}</div>
     <div style="margin:2px 0 10px"><span style="font-family:monospace;background:var(--chip);border:1px solid var(--line);padding:3px 10px;border-radius:8px;font-size:12.5px">${esc(a.store)}</span></div>
     <div class="v">${esc(a.description)}</div></div>
   <div class="sectionlabel">Tables / entities</div>
   ${a.tables.map(t=>`<div class="block full" style="margin-bottom:12px"><div class="k" style="font-family:monospace;text-transform:none;letter-spacing:0;color:var(--ink);font-size:13px">${esc(t.name)}</div><div style="font-size:12.5px;color:var(--muted);margin:3px 0 10px">${esc(t.purpose)}</div><table class="dtable"><thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead><tbody>${(t.columns||[]).map(c=>`<tr><td style="font-family:monospace">${esc(c.name)}</td><td class="ty">${esc(c.type)}</td><td>${esc(c.desc)}</td></tr>`).join('')||'<tr><td colspan="3" style="color:var(--soft)">No columns defined.</td></tr>'}</tbody></table></div>`).join('')}`;
}
function componentsView(d){
  if(!d.components.length) return '<div class="empty-note">No components.</div>';
  return `<div class="cards">${d.components.map(c=>`<div class="card" onclick="openComp('${c.id}')"><div style="display:flex;justify-content:space-between;align-items:center"><span class="role">${esc(c.id)}</span>${c.hotspot&&c.hotspot.length?`<span class="tag r">⚠ ${c.hotspot.length} hotspot${c.hotspot.length===1?'':'s'}</span>`:''}</div><h3 style="font-size:14px;margin-top:5px">${esc(c.name)}</h3><p>${esc(c.overview)}</p><div class="tagrow">${(c.mapsTo||[]).map(r=>`<span class="tag b">${esc(r)}</span>`).join('')}</div></div>`).join('')}</div>`;
}
function componentPage(d,c){
  const back=`<button onclick="closeComp()" style="cursor:pointer;border:1px solid var(--line);background:var(--panel);color:var(--muted);border-radius:8px;padding:6px 12px;font-size:12.5px;font-family:inherit;margin-bottom:8px">← Components</button>`;
  const crumb=`<div style="font-size:12px;color:var(--soft);margin-bottom:12px">${esc(d.name)} <span style="opacity:.6">/</span> <span style="color:var(--ink)">${esc(c.name)}</span></div>`;
  return back+crumb+componentDetail(c);
}
function rwBlocks(entries){
  if(!entries||!entries.length) return '<div class="empty-note">None.</div>';
  const col={Subdomain:'#4f6cff',Product:'#8b5cff',External:'#d68a16',Database:'#1ba97a',API:'#2d9cdb'};
  return entries.map(e=>{
    const c=col[e.type]||'#5b6680';
    const tag=`<span class="tag" style="background:${hexA(c,0.12)};color:${c};border-color:${hexA(c,0.4)}">${esc(e.type)}</span>`;
    let inner='';
    if(e.table) inner+=`<div class="detrow"><div class="dk">Table</div><div class="dv" style="font-family:monospace">${esc(e.table)}</div></div>`;
    if(e.queue){const rq=(A.resources||[]).find(x=>x.name===e.queue);inner+=`<div class="detrow"><div class="dk">Queue</div><div class="dv">${rq?`<span class="tracelink" onclick="gotoArch('a_resources','res','${rq.id}')">🗃 ${esc(e.queue)}</span> <span style="color:var(--soft);font-size:11px">· ${esc(rq.engine)}</span>`:`<span style="font-family:monospace">${esc(e.queue)}</span> <span style="color:var(--soft);font-size:11px">· defined in Resources</span>`}</div></div>`;}
    if(e.api) inner+=`<div class="detrow"><div class="dk">API</div><div class="dv">${e.link?`<span class="tracelink" onclick="gotoArch('a_apis','api','${e.link}')">🔌 ${esc(e.api)}</span>`:esc(e.api)}</div></div>`;
    if(e.request) inner+=`<div class="detrow"><div class="dk">Request</div><div class="dv" style="font-family:monospace;font-size:12.5px">${esc(e.request)}</div></div>`;
    if(e.response) inner+=`<div class="detrow"><div class="dk">Response</div><div class="dv" style="font-family:monospace;font-size:12.5px">${esc(e.response)}</div></div>`;
    if(e.payload) inner+=`<div class="detrow"><div class="dk">Payload</div><div class="dv"><pre style="white-space:pre-wrap;margin:0;font-size:12px;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px">${esc(e.payload)}</pre></div></div>`;
    inner+=`<div class="detrow"><div class="dk">Why</div><div class="dv">${esc(e.desc)}</div></div>`;
    return `<div class="block full" style="margin-bottom:10px;border-left:3px solid ${c}">${tag}<div style="margin-top:10px">${inner}</div></div>`;
  }).join('');
}
function triggerBlocks(entries){
  if(!entries||!entries.length) return '<div class="empty-note">None.</div>';
  const col={API:'#2d9cdb',User:'#4f6cff',Scheduler:'#d68a16',Event:'#8b5cff'};
  return entries.map(e=>{
    const c=col[e.type]||'#5b6680';
    const tag=`<span class="tag" style="background:${hexA(c,0.12)};color:${c};border-color:${hexA(c,0.4)}">${esc(e.type)}</span>`;
    let inner='';
    inner+=drow('Caller',e.caller);
    if(e.endpoint) inner+=`<div class="detrow"><div class="dk">Endpoint</div><div class="dv" style="font-family:monospace;font-size:12.5px">${esc(e.endpoint)}</div></div>`;
    inner+=drow('Actor',e.actor)+drow('Action',e.action)+drow('Schedule',e.schedule)+drow('Source',e.source);
    if(e.name) inner+=`<div class="detrow"><div class="dk">Event</div><div class="dv" style="font-family:monospace">${esc(e.name)}</div></div>`;
    if(e.schema) inner+=`<div class="detrow"><div class="dk">Schema</div><div class="dv"><pre style="white-space:pre-wrap;margin:0;font-size:12px;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:10px">${esc(e.schema)}</pre></div></div>`;
    inner+=drow('Why',e.why||e.desc);
    return `<div class="block full" style="margin-bottom:10px;border-left:3px solid ${c}">${tag}<div style="margin-top:10px">${inner}</div></div>`;
  }).join('');
}
function brBlocks(rules){
  if(!rules||!rules.length) return '<div class="empty-note">None.</div>';
  return `<div class="list">${rules.map(r=>`<div class="lrow" style="cursor:default"><div class="lmain"><div class="lt" style="font-weight:400">${esc(r.rule)}</div></div><div class="lmeta">${r.ref?refTag(r.ref):''}</div></div>`).join('')}</div>`;
}
function cmdBlocks(cmds){
  if(!cmds||!cmds.length) return '<div class="empty-note">None.</div>';
  return `<div class="list">${cmds.map(c=>`<div class="lrow" style="cursor:default"><div class="lmain"><div class="lt" style="font-family:monospace;font-weight:400">${esc(c.command)}</div></div><div class="lmeta">${c.ref?refTag(c.ref):''}</div></div>`).join('')}</div>`;
}
function resBlocks(ids){
  if(!ids||!ids.length) return '<div class="empty-note">None.</div>';
  return `<div class="list">${ids.map(id=>{const r=(A.resources||[]).find(x=>x.id===id);if(!r)return '';return `<div class="lrow" onclick="gotoArch('a_resources','res','${r.id}')"><div class="lmain"><div class="lt">${esc(r.name)}</div><div class="ls">${esc(r.desc)}</div></div><div class="lmeta"><span class="tag">${esc(r.cat)}</span> <span class="tag b">${esc(r.engine)}</span></div></div>`;}).join('')}</div>`;
}
function findComp(id){let f=null;A.domains.forEach(d=>d.components.forEach(c=>{if(c.id===id)f=c;}));return f;}
function depBlocks(deps){
  if(!deps||!deps.length) return '<div class="empty-note">None.</div>';
  const tcls={resource:'b',component:'g',integration:'w'};
  return `<div class="list">${deps.map(d=>{
    let name='',meta='',onclick='';
    if(d.type==='resource'){const r=(A.resources||[]).find(x=>x.id===d.ref);name=r?r.name:d.ref;meta=r?r.engine:'resource';onclick=`gotoArch('a_resources','res','${d.ref}')`;}
    else if(d.type==='component'){const c=findComp(d.ref);name=c?c.name:d.ref;meta='component';onclick=`gotoArch('a_components','comp','${d.ref}')`;}
    else {const it=(A.integrations||[]).find(x=>x.id===d.ref);name=it?it.system:d.ref;meta='integration';onclick=`gotoArch('a_integrations','intg','${d.ref}')`;}
    return `<div class="lrow" onclick="${onclick}"><div class="lmain"><div class="lt">${esc(name)}</div><div class="ls">${esc(d.note||'')}</div></div><div class="lmeta"><span class="tag ${tcls[d.type]||''}">${esc(d.type)}</span> <span class="tag">${esc(meta)}</span></div></div>`;
  }).join('')}</div>`;
}
function hotspotBlocks(msgs){
  if(!msgs||!msgs.length) return '<div class="empty-note">No hotspots — nothing flagged for review.</div>';
  const col={Risk:'#e2495c',Security:'#e2495c',Performance:'#d68a16',Reliability:'#d68a16',Consistency:'#d68a16',Question:'#2d9cdb'};
  return msgs.map(m=>{const c=col[m.level]||'#5b6680';
    return `<div class="block full" style="margin-bottom:10px;border-left:3px solid ${c}"><span class="tag" style="background:${hexA(c,0.12)};color:${c};border-color:${hexA(c,0.4)}">${esc(m.level)}</span><div style="margin-top:8px;font-size:13.5px;line-height:1.6">${esc(m.text)}</div></div>`;
  }).join('');
}
function codeBlock(c){
  if(!c) return '<div class="empty-note">None.</div>';
  if(typeof c==='string') return `<div style="font-size:13.5px;line-height:1.6">${esc(c)}</div>`;
  const a=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;word-break:break-all">${esc(label||url)} ↗</a>`;
  const row=(k,url)=>url?`<div class="detrow"><div class="dk">${k}</div><div class="dv">${a(url)}</div></div>`:'';
  let h='';
  if(c.path) h+=`<div class="detrow"><div class="dk">Location</div><div class="dv" style="font-family:monospace">${esc(c.path)}</div></div>`;
  h+=row('Repository',c.repo)+row('CI/CD pipeline',c.pipeline)+row('Acceptance tests',c.tests)+row('Coverage',c.coverage)+row('Application',c.app)+row('Dashboard',c.dashboard)+row('Runbook',c.runbook);
  if(c.owners) h+=`<div class="detrow"><div class="dk">Code owners</div><div class="dv">${esc(c.owners)}</div></div>`;
  if(c.logs&&c.logs.length) h+=`<div class="detrow"><div class="dk">Logs</div><div class="dv">${c.logs.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener" class="tracelink" style="text-decoration:none">📄 ${esc(l.env)} ↗</a>`).join('')}</div></div>`;
  return h;
}
function componentDetail(c){
  const cur=COMP_TABS.find(t=>t.k===compTab)||COMP_TABS[0];
  const pills=COMP_TABS.map(t=>{const on=t.k===compTab;return `<button onclick="setCompTab('${t.k}')" style="cursor:pointer;font-family:inherit;font-size:12px;font-weight:600;border:1px solid ${on?t.c:'var(--line)'};background:${on?hexA(t.c,0.12):'var(--panel)'};color:${on?t.c:'var(--muted)'};border-radius:8px;padding:5px 10px;display:inline-flex;align-items:center;gap:6px"><span style="width:7px;height:7px;border-radius:50%;background:${t.c};display:inline-block"></span>${t.l}</button>`;}).join('');
  const v=c[compTab];
  let body;
  if(compTab==='readModel'||compTab==='writeModel'){ body=rwBlocks(v); }
  else if(compTab==='trigger'){ body=triggerBlocks(v); }
  else if(compTab==='businessRules'){ body=brBlocks(v); }
  else if(compTab==='command'){ body=cmdBlocks(v); }
  else if(compTab==='resource'){ body=resBlocks(v); }
  else if(compTab==='dependency'){ body=depBlocks(v); }
  else if(compTab==='hotspot'){ body=hotspotBlocks(v); }
  else if(compTab==='code'){ body=codeBlock(v); }
  else if(Array.isArray(v)){ body=ulist(v); }
  else { body=`<div style="font-size:13.5px;line-height:1.6">${esc(v||'—')}</div>`; }
  return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><h3 style="margin:0;font-size:16px">${esc(c.name)}</h3><span style="flex:1"></span>${(c.mapsTo||[]).map(refTag).join('')}</div>
   <div style="display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 16px">${pills}</div>
   <div class="block full" style="border-top:3px solid ${cur.c}"><div class="k" style="color:${cur.c}">${cur.l}</div>${body}</div>`;
}
function viewAData(){const d=A.data;
  return header('a_data')+
  `<p class="lead">The domain objects, what each means, and how those with a status move through their lifecycle. Open an object for its attribute table and lifecycle.</p>
   <div class="block full" style="margin-bottom:16px"><div class="k">Summary</div><div class="v">${esc(d.summary)}</div></div>
   <div class="block full" style="margin-bottom:16px"><div class="k">Entity relationships</div><div class="mermaid" style="text-align:center">${d.model}</div></div>
   <div class="sectionlabel">Objects</div>
   <div class="list">${d.objects.map(o=>`<div class="lrow" onclick="detailObject('${o.id}')"><div class="lmain"><div class="lt">${esc(o.name)}</div><div class="ls">${esc(o.definition)}</div></div><div class="lmeta">${o.lifecycle?'<span class="tag g">lifecycle</span> ':''}<span class="tag">${o.attributes.length} attrs</span></div></div>`).join('')}</div>
   <div class="ov" style="margin-top:16px"><div class="block"><div class="k">Stores</div><div class="v">${ulist(d.stores)}</div></div><div class="block"><div class="k">Data flow</div><div class="v">${esc(d.flow)}</div></div></div>`;
}
var objTab='attributes';
function detailObject(id){objTab='attributes';objShow(id);}
function setObjTab(t,id){objTab=t;objShow(id);}
function objShow(id){const o=A.data.objects.find(x=>x.id===id);
  const tabs=['attributes'].concat(o.lifecycle?['lifecycle']:[]);
  if(!tabs.includes(objTab)) objTab='attributes';
  const labels={attributes:'Attributes',lifecycle:'Lifecycle'};
  const pills=tabs.length>1?`<div class="subtabs" style="margin:6px 0 14px">${tabs.map(t=>`<button class="subtab ${t===objTab?'on':''}" onclick="setObjTab('${t}','${id}')">${labels[t]}</button>`).join('')}</div>`:'<div style="margin-bottom:6px"></div>';
  let body;
  if(objTab==='lifecycle'){body=`<div class="mermaid" style="text-align:center">${o.lifecycle}</div>`;}
  else{body=`<table class="dtable"><thead><tr><th>Attribute</th><th>Type</th><th>Description</th></tr></thead><tbody>${o.attributes.map(a=>`<tr><td style="font-family:monospace">${esc(a.name)}</td><td class="ty">${esc(a.type)}</td><td>${esc(a.desc)}</td></tr>`).join('')}</tbody></table>`;}
  openModal(mwrap(esc(o.name),`${drow('Definition',o.definition)}${pills}${body}`),true);
  if(objTab==='lifecycle') setTimeout(drawMermaid,50);
}
function viewAApis(){
  return header('a_apis')+`<p class="lead">The API surface this product publishes for others to consume. Each endpoint realizes one or more PRD requirements.</p>${apisList()}`;
}
function viewAIntegrations(){
  return header('a_integrations')+`<p class="lead">How this product integrates with external tools and systems — direction, protocol, and data exchanged. Integrations link to the portfolio dependency they realize.</p>${integList()}`;
}
function apisList(){return `<div class="list">${A.apis.map(a=>`<div class="lrow" onclick="detailApi('${a.id}')"><div class="lmain"><div class="lt"><span style="font-family:monospace;color:var(--accent);font-weight:600">${esc(a.method)}</span> <span style="font-family:monospace">${esc(a.path)}</span></div><div class="ls">${esc(a.purpose)}</div></div><div class="lmeta">${(a.realizes||[]).map(r=>`<span class="tag b" style="margin-left:4px">${esc(r)}</span>`).join('')}</div></div>`).join('')}</div>`;}
function integList(){return `<div class="list">${A.integrations.map(i=>`<div class="lrow" onclick="detailIntegration('${i.id}')"><div class="lmain"><div class="lt">${esc(i.system)}</div><div class="ls">${esc(i.protocol)} · ${esc(i.data)}</div></div><div class="lmeta"><span class="tag ${dirCls(i.direction)}">${esc(i.direction)}</span></div></div>`).join('')}</div>`;}
function detailApi(id){const a=A.apis.find(x=>x.id===id);
  openModal(mwrap(esc(a.method)+' '+esc(a.path),`${drow('Purpose',a.purpose)}${drow('Errors',a.errors)}<div class="tracebox"><div class="tl">Realizes (PRD)</div>${a.realizes.map(refTag).join('')}</div>`),true);
}
function detailIntegration(id){const i=A.integrations.find(x=>x.id===id);
  openModal(mwrap(esc(i.system),
    `<div style="margin-bottom:12px"><span class="tag ${dirCls(i.direction)}">${esc(i.direction)}</span></div>
     ${drow('Protocol',i.protocol)}${drow('Data exchanged',i.data)}${drow('Auth',i.auth)}${drow('Notes',i.notes)}
     ${i.dependsOn?`<div class="tracebox"><div class="tl">Portfolio dependency</div><span class="tracelink" onclick="doc='prd';active='context';ctxSub='owners';renderNav();render();setTimeout(()=>detailDep('${i.dependsOn}'),60)">🧩 ${esc(i.dependsOn)}</span></div>`:''}`),true);
}
function viewASecurity(){
  return header('a_security')+
  `<p class="lead">Security controls. Each maps to the PRD governance obligation or NFR it addresses.</p>
   <div class="cards">${A.security.map(s=>`<div class="card" onclick="detailSec('${s.id}')"><span class="role">${s.id}</span><h3 style="font-size:14px;margin-top:4px">${esc(s.control)}</h3><p>${esc(s.approach)}</p><div class="tagrow">${s.addresses.map(r=>`<span class="tag r">${esc(r)}</span>`).join('')}</div></div>`).join('')}</div>`;
}
function detailSec(id){const s=A.security.find(x=>x.id===id);
  openModal(mwrap(esc(s.control),`${drow('Approach',s.approach)}<div class="tracebox"><div class="tl">Addresses (PRD)</div>${s.addresses.map(refTag).join('')}</div>`),true);
}
function infraLinkList(arr){return `<div class="list">${arr.map(s=>`<div class="lrow" style="cursor:default"><div class="lmain"><div class="lt">${esc(s.name)}</div></div><div class="lmeta"><a href="${esc(s.url)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:12.5px">open ↗</a></div></div>`).join('')}</div>`;}
function setInfraEnv(id){infraEnv=id;document.getElementById('canvas').innerHTML=viewAInfra();}
function viewAInfra(){const i=A.infra;
  const link=(url,label)=>`<a href="${esc(url)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none">${esc(label)} ↗</a>`;
  if(!i.environments.some(e=>e.id===infraEnv)) infraEnv=i.environments[0].id;
  const e=i.environments.find(x=>x.id===infraEnv);
  const pills=i.environments.map(x=>`<button class="subtab ${x.id===infraEnv?'on':''}" onclick="setInfraEnv('${x.id}')">${esc(x.name)}</button>`).join('');
  return header('a_infra')+
  `<p class="lead">High-level infrastructure. Cloud-wide settings are here; everything environment-specific lives in the environment tabs below.</p>
   <div class="ov" style="margin-bottom:18px">
     <div class="block"><div class="k">Cloud</div><div class="v">${esc(i.cloud)}</div></div>
     <div class="block"><div class="k">Platform</div><div class="v">${esc(i.platform)}</div></div>
     <div class="block full"><div class="k">Summary</div><div class="v">${esc(i.summary)}</div></div>
     <div class="block full"><div class="k">Decisions</div><div class="v">${(i.adrs||[]).map(id=>`<span class="tracelink" onclick="gotoArch('a_decisions','adr','${id}')">🧭 ${esc(id)}</span>`).join('')}</div></div>
     <div class="block full"><div class="k">Meets NFR targets</div><div class="v">${i.meets.map(refTag).join(' ')}</div></div>
   </div>
   <div class="sectionlabel">Environments</div>
   <div class="subtabs">${pills}</div>
   ${e?`<div class="ov">
       <div class="block"><div class="k">Cluster</div><div class="v" style="font-family:monospace">${esc(e.cluster)}</div></div>
       <div class="block"><div class="k">Region</div><div class="v">${esc(e.region)}</div></div>
       <div class="block full"><div class="k">Access</div><div class="v">${link(e.accountUrl,'Cloud console')} &nbsp;·&nbsp; ${link(e.iacUrl,'Infrastructure-as-code repo')}</div></div>
       <div class="block full"><div class="k">Notes</div><div class="v">${esc(e.notes)}</div></div>
       <div class="block"><div class="k">Platform services</div>${infraLinkList(e.services)}</div>
       <div class="block"><div class="k">Dashboards &amp; logs</div>${infraLinkList(e.dashboards)}</div>
     </div>`:''}`;
}
function viewAResources(){
  const cats=['Databases','Cache','Object storage','Messaging','Configuration','Secrets','CDN'];
  const byCat={};A.resources.forEach(r=>{(byCat[r.cat]=byCat[r.cat]||[]).push(r);});
  const order=cats.filter(c=>byCat[c]).concat(Object.keys(byCat).filter(c=>!cats.includes(c)));
  return header('a_resources')+
  `<p class="lead">Every infrastructure resource the product provisions, grouped by category. Open one for its full configuration. Queues here are the ones referenced by component write models.</p>
   ${order.map(c=>`<div class="sectionlabel">${esc(c)}</div><div class="list">${byCat[c].map(r=>`<div class="lrow" onclick="detailResource('${r.id}')"><div class="lmain"><div class="lt">${esc(r.name)}</div><div class="ls">${esc(r.desc)}</div></div><div class="lmeta"><span class="tag">${esc(r.engine)}</span></div></div>`).join('')}</div>`).join('')}`;
}
function detailResource(id){const r=A.resources.find(x=>x.id===id);
  const pubs=[];A.domains.forEach(d=>d.components.forEach(c=>{(c.writeModel||[]).forEach(w=>{if(w.queue===r.name&&!pubs.some(p=>p.id===c.id))pubs.push(c);});}));
  openModal(mwrap(esc(r.name),
    `<div style="margin-bottom:12px"><span class="tag">${esc(r.cat)}</span> <span class="tag b">${esc(r.engine)}</span></div>
     <div class="detrow"><div class="dk">Description</div><div class="dv">${esc(r.desc)}</div></div>
     <div class="sectionlabel" style="margin:14px 0 6px">Configuration</div>
     <table class="dtable"><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody>${r.config.map(c=>`<tr><td style="white-space:nowrap;font-weight:500">${esc(c.k)}</td><td>${esc(c.v)}</td></tr>`).join('')}</tbody></table>
     ${pubs.length?`<div class="tracebox" style="margin-top:12px"><div class="tl">Written to by</div>${pubs.map(c=>`<span class="tracelink" onclick="gotoArch('a_components','comp','${c.id}')">▢ ${esc(c.name)}</span>`).join('')}</div>`:''}`),true);
}
function viewAStack(){
  return header('a_stack')+
  `<p class="lead">The technologies this product runs on, by layer. Versions should be re-verified against current stable/LTS releases before build.</p>
   <table class="dtable"><thead><tr><th>Layer</th><th>Technology</th><th>Version</th><th>Why</th></tr></thead><tbody>${A.stack.map(s=>`<tr><td style="white-space:nowrap;font-weight:500">${esc(s.layer)}</td><td>${esc(s.tech)}</td><td class="ty">${esc(s.version)}</td><td>${esc(s.why)}</td></tr>`).join('')}</tbody></table>`;
}
function viewADesign(){const d=A.design;
  return header('a_design')+
  `<p class="lead">Links to the external design sources — prototypes, system-design boards, and Figma mockups.</p>
   <div class="list">${(d.links||[]).map(l=>`<div class="lrow" style="cursor:default"><div class="lmain"><div class="lt">${esc(l.name)}</div></div><div class="lmeta"><a href="${esc(l.url)}" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;font-size:12.5px">open ↗</a></div></div>`).join('')||'<div class="empty-note">No design links yet.</div>'}</div>`;
}
function viewAStructure(){const s=A.structure;
  return header('a_structure')+
  `<p class="lead">Where each capability area lives in the codebase, and the conventions that keep it consistent for engineers and AI agents.</p>
   <div class="block full" style="margin-bottom:16px"><div class="k">Directory structure</div><pre style="white-space:pre;overflow:auto;font-size:12.5px;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px;margin:0;line-height:1.5">${esc(s.tree)}</pre></div>
   <div class="block full" style="margin-bottom:16px"><div class="k">Requirements → code mapping</div>${s.mapping.map(m=>`<div class="detrow"><div class="dk" style="width:auto;min-width:200px;text-transform:none;letter-spacing:0;color:var(--ink);font-weight:500">${esc(m.area)}</div><div class="dv" style="font-family:monospace;color:var(--muted)">${esc(m.path)}</div></div>`).join('')}</div>
   <div class="block full"><div class="k">Implementation patterns</div><div class="v">${ulist(s.patterns)}</div></div>`;
}
function viewAKb(){const kb=A.kb;
  return header('a_kb')+
  `<p class="lead">${esc(kb.intro)}</p>
   <div class="block full" style="margin-bottom:16px"><div class="k">How to choose — best practice</div><div class="v">${ulist(kb.guidance)}</div></div>
   <div class="block full" style="margin-bottom:16px"><div class="k">Decision criteria</div>${kb.criteria.map(c=>`<div class="detrow"><div class="dk" style="width:170px;text-transform:none;letter-spacing:0;color:var(--ink);font-weight:500">${esc(c.name)}</div><div class="dv" style="color:var(--muted)">${esc(c.q)}</div></div>`).join('')}</div>
   <div class="sectionlabel">Architecture patterns</div>
   <div class="list">${kb.patterns.map(p=>`<div class="lrow" onclick="detailPattern('${p.id}')"><div class="lmain"><div class="lt">${esc(p.name)}</div><div class="ls">${esc(p.summary)}</div></div><div class="lmeta"><span class="tag">${esc(p.family)}</span></div></div>`).join('')}</div>`;
}
function detailPattern(id){const p=A.kb.patterns.find(x=>x.id===id);
  const li=(arr)=>`<ul style="margin:6px 0 0;padding-left:18px;line-height:1.7;font-size:13px">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  openModal(mwrap(esc(p.name),
    `<div style="margin-bottom:12px"><span class="tag">${esc(p.family)}</span></div>
     <div class="detrow"><div class="dk">Summary</div><div class="dv">${esc(p.summary)}</div></div>
     <div class="sectionlabel" style="margin:14px 0 4px;color:#147a55">When to use</div>${li(p.whenUse)}
     <div class="sectionlabel" style="margin:14px 0 4px;color:#c0364a">When to avoid</div>${li(p.whenAvoid)}
     <div class="detrow" style="margin-top:14px"><div class="dk">Trade-offs</div><div class="dv">${esc(p.tradeoffs)}</div></div>
     <div class="detrow"><div class="dk">Best-fit signals</div><div class="dv">${esc(p.signals)}</div></div>
     <div class="tracebox" style="margin-top:12px"><div class="tl">Recorded decision</div><span class="tracelink" onclick="gotoArch('a_decisions','adr','ADR-05')">🧭 ADR-05 · architecture style</span></div>`),true);
}

/* ---------- read-only detail modals ---------- */
var ov, md;
function openModal(html,wide){md.innerHTML=html;md.classList.toggle('wide',!!wide);ov.classList.add('on');}
function closeModal(){ov.classList.remove('on');}
function mwrap(title,body){return `<div class="mh"><h3>${title}</h3><button class="x" onclick="closeModal()">×</button></div><div class="mb">${body}</div>`;}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

function detailPersona(id){const p=S.personas.find(x=>x.id===id);const js=S.journeys.filter(j=>j.personaId===id);
  openModal(mwrap(esc(p.name),
    `<div style="display:flex;align-items:center;gap:10px"><span style="color:var(--accent);font-size:11.5px;font-weight:600;letter-spacing:.4px;text-transform:uppercase">${esc(p.role)}</span>${tierTag(p.tier)}</div>
     ${p.quote?`<div style="margin-top:14px;font-size:14px;font-style:italic;color:var(--ink);border-left:3px solid var(--accent);padding:2px 0 2px 12px">“${esc(p.quote)}”</div>`:''}
     <div class="sectionlabel" style="margin:18px 0 10px">Story</div>
     ${drow('Situation',p.situation)}${drow('Goal',p.goal)}${drow('Obstacle',p.obstacle)}${drow('Solution',p.solution)}${drow('Success metric',p.successMetric)}
     <div class="sectionlabel" style="margin:18px 0 10px">How they work</div>
     ${drow('Tier',p.tier)}${drow('Authority',p.authority)}${drow('Permissions',p.permissions)}${drow('Frequency',p.frequency)}${drow('Work volume',p.volume)}${drow('Collaboration',p.collaboration)}${drow('Touchpoints',p.touchpoints)}${drow('Current tools',p.tools)}${drow('Regulatory',p.regulatory)}
     <div class="tracebox" style="margin-top:16px"><div class="tl">Drives these journeys</div>${js.map(j=>`<span class="tracelink" onclick="go('journeys');setTimeout(()=>detailJourney('${j.id}'),60)">➤ ${esc(j.title)}</span>`).join('')||'<span style=color:#8a93a8;font-size:12.5px>No journeys linked.</span>'}</div>`,true));
}
function detailStakeholder(id){const s=S.stakeholders.find(x=>x.id===id);const g=(S.governance||[]).find(x=>x.id===s.govLink);
  openModal(mwrap(esc(s.name),
    `<span style="color:var(--accent);font-size:11.5px;font-weight:600;letter-spacing:.4px;text-transform:uppercase">${esc(s.role)}</span>
     <div style="margin-top:14px">${drow('Interest',s.interest)}</div>
     ${g?`<div class="tracebox"><div class="tl">Linked governance</div><span class="tracelink" onclick="go('governance');setTimeout(()=>detailGov('${g.id}'),60)">⚖ ${esc(g.item)}</span></div>`:''}`));
}
function detailMilestone(id){const m=S.release.milestones.find(x=>x.id===id);
  openModal(mwrap(esc(m.name),`${drow('Target',m.date)}${drow('Status',m.status)}${drow('Notes',m.notes)}`));
}
function detailJourney(id){const j=S.journeys.find(x=>x.id===id);const p=S.personas.find(x=>x.id===j.personaId);
  const ucs=S.usecases.filter(u=>u.journeyId===id);
  const frIds=[...new Set([].concat(...ucs.map(u=>u.frs||[]),S.specs.functional.filter(f=>f.traceJ===id).map(f=>f.id)))];
  const frObjs=frIds.map(fid=>S.specs.functional.find(f=>f.id===fid)).filter(Boolean);
  openModal(mwrap(esc(j.title),
    `${p?`<span class="tracelink" onclick="go('personas');setTimeout(()=>detailPersona('${p.id}'),60)">☻ ${esc(p.name)}</span>`:''}
     <div style="margin-top:14px">
     <div class="detrow"><div class="dk">Opening</div><div class="dv">${esc(j.opening)}</div></div>
     <div class="detrow"><div class="dk">Rising</div><div class="dv">${esc(j.rising)}</div></div>
     <div class="detrow"><div class="dk">Climax</div><div class="dv">${esc(j.climax)}</div></div>
     <div class="detrow"><div class="dk">Resolution</div><div class="dv">${esc(j.resolution)}</div></div></div>
     <div class="tracebox"><div class="tl">Realized by use cases</div>${ucs.map(u=>`<span class="tracelink" onclick="ucSub='usecases';go('journeys');setTimeout(()=>detailUsecase('${u.id}'),60)">▤ ${u.id} · ${esc(u.title.slice(0,22))}…</span>`).join('')||'<span style=color:#8a93a8;font-size:12.5px>No use cases yet.</span>'}</div>
     <div class="tracebox" style="margin-top:10px"><div class="tl">Functional requirements (via use cases)</div>${frObjs.map(f=>`<span class="tracelink" onclick="go('specs');setTimeout(()=>detailFR('${f.id}'),60)">⚙ ${f.id}</span>`).join('')||'<span style=color:#8a93a8;font-size:12.5px>None yet.</span>'}</div>`));
}
function detailFR(id){const f=S.specs.functional.find(x=>x.id===id);const j=S.journeys.find(x=>x.id===f.traceJ);const sc=S.overview.criteria.find(x=>x.id===f.traceSC);
  const ucs=S.usecases.filter(u=>(u.frs||[]).includes(id));
  openModal(mwrap(f.id+' · '+esc(f.area),
    `<div class="detrow"><div class="dk">Requirement</div><div class="dv">${esc(f.text)}</div></div>
     <div class="tracebox"><div class="tl">Traceability chain</div>
       ${sc?`<span class="tracelink" onclick="go('overview')">🎯 ${sc.id}: ${esc(sc.text.slice(0,40))}…</span>`:''}
       ${j?`<span class="tracelink" onclick="go('journeys');setTimeout(()=>detailJourney('${j.id}'),60)">➤ ${esc(j.title)}</span>`:''}
     </div>
     ${ucs.length?`<div class="tracebox" style="margin-top:10px"><div class="tl">Exercised by use cases</div>${ucs.map(u=>`<span class="tracelink" onclick="ucSub='usecases';go('journeys');setTimeout(()=>detailUsecase('${u.id}'),60)">▤ ${u.id} · ${esc(u.title.slice(0,24))}…</span>`).join('')}</div>`:''}
     ${archImpl(id)}`));
}
function detailNFR(id){const n=S.specs.nonfunctional.find(x=>x.id===id);openModal(mwrap(n.id+' · '+esc(n.cat),`<div class="detrow"><div class="dk">Statement</div><div class="dv">${esc(n.text)}</div></div>${archImpl(id)}`));}
function detailGov(id){const g=S.governance.find(x=>x.id===id);openModal(mwrap(esc(g.item),
  `<div class="detrow"><div class="dk">Type</div><div class="dv">${esc(g.type)}</div></div>
   <div class="detrow"><div class="dk">Owner</div><div class="dv">${esc(g.owner)}</div></div>
   <div class="detrow"><div class="dk">Status</div><div class="dv">${esc(g.status)}</div></div>
   <div class="detrow"><div class="dk">Notes</div><div class="dv">${esc(g.notes)}</div></div>${archImpl(id)}`));}
function detailRisk(id){const r=S.risk.find(x=>x.id===id);openModal(mwrap(esc(r.title),
  `<div class="detrow"><div class="dk">Category</div><div class="dv">${esc(r.cat)}</div></div>
   <div class="detrow"><div class="dk">Likelihood</div><div class="dv">${esc(r.likelihood)}</div></div>
   <div class="detrow"><div class="dk">Impact</div><div class="dv">${esc(r.impact)}</div></div>
   <div class="detrow"><div class="dk">Mitigation</div><div class="dv">${esc(r.mitigation)}</div></div>
   <div class="detrow"><div class="dk">Owner</div><div class="dv">${esc(r.owner)}</div></div>`));}


window.boot = function(){
  ov=document.getElementById('overlay');md=document.getElementById('modal');if(ov)ov.addEventListener('click',function(ev){if(ev.target===ov)closeModal();});

if(window.mermaid) mermaid.initialize({startOnLoad:false, theme:'base', themeVariables:{ fontFamily:"'Geist','Inter',sans-serif", fontSize:'13px', primaryColor:'#eff6ff', primaryBorderColor:'#bfdbfe', primaryTextColor:'#1e3a8a', lineColor:'#94a3b8', secondaryColor:'#f8fafc', tertiaryColor:'#ffffff', clusterBkg:'#f8fafc', clusterBorder:'#e2e8f0', edgeLabelBackground:'#ffffff', nodeBorder:'#bfdbfe', mainBkg:'#ffffff' }});
var hash=location.hash.replace('#','');
if(hash.indexOf('arch/')===0){doc='arch';const h=hash.slice(5);if(TABS_ARCH.some(t=>t.id===h))active=h;else active=TABS_ARCH[0].id;}
else if(TABS_PRD.some(t=>t.id===hash)) active=hash;
renderNav();render();

};
