#!/usr/bin/env node
// scout-digest.mjs — inbox/scout/*.md 를 한 장짜리 인터랙티브 웹페이지로 합친다.
// 목적: 매일 쌓이는 scout 리포트를 "눌러 들어가는 병목" 없이 한눈에 + 카드 안에서
//       '세부 요약(deep-extract급)' 토글로 펼쳐 보기.
// 사용: node scripts/scout-digest.mjs [--days 28] [--out digest.html] [--max-unreacted 60]
//
// 입력:
//   inbox/scout/*.md               — 스카우트 리포트(파싱)
//   inbox/scout/deep-summaries.json — PMID→deep 요약 캐시(초록 기반; 매일 새 논문만 추가)

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SCOUT_DIR = path.join(ROOT, "inbox", "scout");
const DEEP_FILE = path.join(SCOUT_DIR, "deep-summaries.json");
const REPO_BLOB = "https://github.com/jackmir-explorer/chartji/blob/main/inbox/scout";

const args = process.argv.slice(2);
const getArg = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const DAYS = parseInt(getArg("days", "28"), 10);
const MAX_UNREACTED = parseInt(getArg("max-unreacted", "60"), 10);
const OUT = getArg("out", path.join(SCOUT_DIR, "digest.html"));

const DOMAIN_COLORS = [
  [/약물|deprescrib|polypharm|처방|BZD|benzodiaz/i, "#b45309", "약물"],
  [/생활습관|lifestyle|운동|exercise|식이|diet|alcohol|smoking/i, "#047857", "생활습관"],
  [/감염|antibiotic|vaccin|부비동|URI|POCUS|초음파|ultrasound/i, "#0369a1", "감염·술기"],
  [/심|cardio|CVD|고혈압|HTN|지질|statin|CKD|신장|renal|빈혈|anemia/i, "#be123c", "심·신"],
  [/신경|neuro|두통|어지럼|dizz|통증|pain|migraine/i, "#7c3aed", "신경·통증"],
  [/내분비|당뇨|diabet|갑상|thyroid|비만|obes/i, "#c026d3", "내분비"],
  [/정신|psych|우울|depress|불안|anxiety/i, "#4f46e5", "정신"],
  [/Wildcard|Liby|Follow/i, "#475569", "와일드카드"],
];
const domainOf = (slot) => {
  for (const [re, color, label] of DOMAIN_COLORS) if (re.test(slot || "")) return { color, label };
  return { color: "#64748b", label: "일반" };
};

function parseFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const base = path.basename(file, ".md");
  const dateM = raw.match(/Scout Report\s*—\s*(\d{4}-\d{2}-\d{2})/) || [null, base];
  const date = dateM[1];
  const papers = [];
  let cur = null;
  const pushCur = () => { if (cur && cur.title) papers.push(cur); cur = null; };
  for (const line of raw.split("\n")) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) { pushCur(); cur = { date, title: h[1].trim() }; continue; }
    if (!cur) continue;
    const field = (label) => { const m = line.match(new RegExp(`^-\\s*\\*\\*${label}:\\*\\*\\s*(.*)$`)); return m ? m[1].trim() : null; };
    let v;
    if ((v = field("저널")) !== null) {
      const pm = v.match(/\*\*PMID:\*\*\s*([0-9]+)/);
      cur.pmid = pm ? pm[1] : null;
      cur.journal = v.replace(/\s*\|\s*\*\*PMID:\*\*.*$/, "").trim();
    } else if ((v = field("슬롯")) !== null) cur.slot = v;
    else if ((v = field("한 줄")) !== null) cur.oneLiner = v;
    else if ((v = field("왜 유용")) !== null) cur.why = v;
    else if ((v = field("💬 반응")) !== null) {
      const applied = /✅\s*반영/.test(v);
      const stripped = v.replace(/`[^`]*`/g, "").replace(/✅.*$/, "").trim();
      const isBlank = /^_*$/.test(v.replace(/`/g, "").trim());
      cur.reaction = { applied, reacted: applied || (!isBlank && stripped.length > 0) };
    }
  }
  pushCur();
  return papers;
}

const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function renderWhy(why) {
  if (!why) return "";
  const parts = why.split(/(?=[①②③④⑤⑥⑦⑧⑨⑩])/).map((s) => s.trim()).filter(Boolean);
  if (parts.length > 1) return `<ul class="why">` + parts.map((p) => `<li>${esc(p)}</li>`).join("") + `</ul>`;
  return `<div class="why-plain">${esc(why)}</div>`;
}

function renderDeep(deep) {
  if (!deep) return `<div class="deep-pending">📄 세부 요약 생성 대기 (매일 자동 추가)</div>`;
  const points = (deep.points || []).map((p) => `<li>${esc(p)}</li>`).join("");
  return `<details class="deep">
    <summary>📄 세부 요약 펼치기 <span class="deep-tag">deep · 초록 기반</span></summary>
    <div class="deep-body">
      ${deep.core ? `<div class="deep-core">${esc(deep.core)}</div>` : ""}
      ${points ? `<ul class="deep-points">${points}</ul>` : ""}
      ${deep.exam ? `<div class="deep-exam"><b>시험·실무 포인트</b> ${esc(deep.exam)}</div>` : ""}
      ${deep.apply ? `<div class="deep-apply"><b>1차의료 적용</b> ${esc(deep.apply)}</div>` : ""}
      ${deep.limits ? `<div class="deep-limit"><b>한계·주의</b> ${esc(deep.limits)}</div>` : ""}
      ${deep.cite ? `<div class="deep-cite">${esc(deep.cite)}${deep.basis ? ` · ${esc(deep.basis)}` : ""}</div>` : ""}
    </div>
  </details>`;
}

// ---- 수집 ----
let DEEP = {};
try { DEEP = JSON.parse(fs.readFileSync(DEEP_FILE, "utf8")); } catch {}
const files = fs.readdirSync(SCOUT_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().reverse();
let papers = [];
for (const f of files) papers = papers.concat(parseFile(path.join(SCOUT_DIR, f)));

const cutoff = new Date(Date.now() - DAYS * 86400000);
const inWindow = (p) => new Date(p.date) >= cutoff;
const unreacted = papers.filter((p) => p.reaction && !p.reaction.reacted);
const unreactedRecent = unreacted.filter(inWindow);
const unreactedOlder = unreacted.length - unreactedRecent.length;
const reactedRecent = papers.filter((p) => inWindow(p) && p.reaction && p.reaction.reacted);

function card(p) {
  const d = domainOf(p.slot + " " + p.title);
  const fileUrl = `${REPO_BLOB}/${p.date}.md`;
  const pubmed = p.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/` : null;
  const deep = p.pmid ? DEEP[p.pmid] : null;
  return `<article class="card" style="--c:${d.color}">
    <div class="meta"><span class="dom">${esc(d.label)}</span><span class="date">${esc(p.date)}</span>${p.reaction && !p.reaction.reacted ? `<span class="badge">미반응</span>` : ""}</div>
    <h2>${esc(p.title)}</h2>
    <div class="jr">${esc(p.journal || "")}${pubmed ? ` · <a href="${pubmed}" target="_blank" rel="noopener">PMID ${esc(p.pmid)} ↗</a>` : ""}</div>
    ${p.oneLiner ? `<div class="core"><div class="core-lbl">📌 핵심</div>${esc(p.oneLiner)}</div>` : ""}
    ${p.why ? `<div class="why-wrap"><div class="lbl">왜 유용한가</div>${renderWhy(p.why)}</div>` : ""}
    ${renderDeep(deep)}
    <a class="react" href="${fileUrl}" target="_blank" rel="noopener">💬 반응 한 문장 쓰기 →</a>
  </article>`;
}

const genTime = new Date().toISOString().slice(0, 16).replace("T", " ");
const cards = unreactedRecent.slice(0, MAX_UNREACTED).map(card).join("\n");

const html = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chartji Scout Digest</title>
<style>
  :root{color-scheme:light only}
  *{box-sizing:border-box}
  body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;-webkit-text-size-adjust:100%}
  .wrap{max-width:640px;margin:0 auto;padding:20px 14px 48px}
  header h1{font-size:21px;font-weight:800;margin:0}
  header .sub{font-size:12px;color:#64748b;margin-top:3px}
  .stats{display:flex;background:#0f172a;border-radius:12px;margin:16px 0 22px;overflow:hidden}
  .stats div{flex:1;text-align:center;padding:14px 6px;color:#cbd5e1;border-right:1px solid #1e293b}
  .stats div:last-child{border-right:0}
  .stats b{display:block;font-size:26px;font-weight:800;line-height:1}
  .stats .s-un b{color:#fbbf24}.stats .s-ok b{color:#34d399}.stats .s-old b{color:#f1f5f9}
  .stats span{font-size:11px}
  .sec-h{font-size:15px;font-weight:700;margin:0 0 2px}
  .sec-s{font-size:11px;color:#94a3b8;margin:0 0 14px}
  .card{background:#fff;border-left:4px solid var(--c);border-radius:10px;box-shadow:0 1px 3px rgba(15,23,42,.08);padding:17px 18px;margin-bottom:16px}
  .meta{font-size:11px;font-weight:700;letter-spacing:.3px;margin-bottom:6px}
  .meta .dom{color:var(--c)}.meta .date{color:#94a3b8;margin-left:8px}
  .meta .badge{background:#fef3c7;color:#92400e;padding:1px 7px;border-radius:10px;font-size:10px;margin-left:8px}
  .card h2{font-size:16px;line-height:1.4;font-weight:700;margin:0 0 7px}
  .jr{font-size:12px;color:#64748b;margin-bottom:12px}
  .jr a{color:#0369a1;text-decoration:none;font-weight:600}
  .core{background:#f8fafc;border-radius:7px;padding:11px 13px;margin-bottom:13px;font-size:14.5px;line-height:1.55;font-weight:600;color:#0f172a}
  .core-lbl{font-size:11px;color:var(--c);font-weight:700;margin-bottom:3px}
  .lbl{font-size:11px;color:#94a3b8;font-weight:700;margin-bottom:3px}
  .why-wrap{margin-bottom:13px}
  ul.why{margin:0;padding-left:0;list-style:none}
  ul.why li{font-size:13px;line-height:1.62;color:#334155;margin-bottom:6px}
  .why-plain{font-size:13px;line-height:1.62;color:#334155}
  details.deep{border:1px solid #e2e8f0;border-radius:8px;margin-bottom:13px;background:#fafcff}
  details.deep summary{cursor:pointer;list-style:none;padding:10px 13px;font-size:13px;font-weight:700;color:var(--c);user-select:none}
  details.deep summary::-webkit-details-marker{display:none}
  details.deep summary::before{content:"▸ ";font-size:11px}
  details.deep[open] summary::before{content:"▾ "}
  .deep-tag{font-size:10px;font-weight:600;color:#94a3b8;background:#eef2f7;padding:1px 6px;border-radius:9px;margin-left:5px}
  .deep-body{padding:0 14px 14px;border-top:1px solid #eef2f7}
  .deep-core{font-size:13.5px;line-height:1.6;color:#0f172a;font-weight:600;margin:11px 0 10px}
  ul.deep-points{margin:0 0 11px;padding-left:18px}
  ul.deep-points li{font-size:13px;line-height:1.6;color:#334155;margin-bottom:6px}
  .deep-exam,.deep-apply,.deep-limit{font-size:12.5px;line-height:1.55;color:#334155;background:#f1f5f9;border-radius:6px;padding:8px 11px;margin-bottom:8px}
  .deep-exam b,.deep-apply b,.deep-limit b{display:block;font-size:11px;color:var(--c);margin-bottom:2px}
  .deep-limit{background:#fff7ed}.deep-limit b{color:#b45309}
  .deep-cite{font-size:11px;color:#94a3b8;line-height:1.5;margin-top:4px}
  .deep-pending{font-size:12px;color:#b45309;background:#fffbeb;border:1px dashed #fde68a;border-radius:8px;padding:9px 12px;margin-bottom:13px}
  a.react{display:inline-block;font-size:12.5px;font-weight:700;color:#fff;background:var(--c);padding:9px 15px;border-radius:7px;text-decoration:none}
  footer{font-size:11px;color:#94a3b8;line-height:1.7;margin-top:26px;padding-top:18px;border-top:1px solid #e2e8f0}
</style></head>
<body><div class="wrap">
  <header>
    <h1>🔬 Chartji Scout Digest</h1>
    <div class="sub">최근 ${DAYS}일 · 생성 ${genTime}</div>
  </header>
  <div class="stats">
    <div class="s-un"><b>${unreactedRecent.length}</b><span>미반응 (최근 ${DAYS}일)</span></div>
    <div class="s-ok"><b>${reactedRecent.length}</b><span>반영됨</span></div>
    <div class="s-old"><b>${unreactedOlder}</b><span>${DAYS}일 이전 미반응</span></div>
  </div>
  <div class="sec-h">📬 아직 안 읽은 논문</div>
  <div class="sec-s">제목·핵심만 훑고, 더 보고 싶으면 '세부 요약 펼치기' · 쓸 게 있으면 '반응' 버튼으로 바로 점프</div>
  ${cards || `<div class="card">🎉 최근 ${DAYS}일 미반응 없음 — 다 읽으셨어요!</div>`}
  ${unreactedRecent.length > MAX_UNREACTED ? `<div class="sec-s">…외 ${unreactedRecent.length - MAX_UNREACTED}건 더</div>` : ""}
  <footer>
    반응을 쓴 논문만 정오 12:00 Deep Extract가 처리합니다. 빈칸은 넘어갑니다.<br>
    세부 요약은 논문 초록(PubMed) 기반이며 inbox/scout 에서 매일 자동 생성됩니다.
  </footer>
</div></body></html>`;

fs.writeFileSync(OUT, html);
console.log(JSON.stringify({
  out: OUT, totalPapers: papers.length,
  unreactedRecent: unreactedRecent.length, unreactedOlder, reactedRecent: reactedRecent.length,
  deepCached: Object.keys(DEEP).filter((k) => !k.startsWith("_")).length,
  subject: `🔬 Scout Digest — 안 읽은 논문 ${unreactedRecent.length}건 (최근 ${DAYS}일)`,
}));
