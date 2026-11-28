#!/usr/bin/env node
// scout-digest.mjs — inbox/scout/*.md 를 한 장짜리 인터랙티브 웹페이지로 합친다.
// 학습 루프 한 화면: 훑기(카드) → 세부요약(deep) → 내 study-note → 반응/keeps.
// 출력 기본값 docs/index.html (GitHub Pages: main /docs). 무의존.
// 사용: node scripts/scout-digest.mjs [--days 14] [--out docs/index.html] [--max-unreacted 60]
//
// 입력:
//   inbox/scout/*.md                — 스카우트 리포트
//   inbox/scout/deep-summaries.json — PMID→deep 요약 캐시(전문/초록 기반)
//   inbox/study-notes/*.md          — 정오 Deep Extract 산출 study-note(PMID 매칭)
//   inbox/scout/keeps.md            — 개인 약속처방·메모(페이지 상단 렌더)

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SCOUT_DIR = path.join(ROOT, "inbox", "scout");
const NOTES_DIR = path.join(ROOT, "inbox", "study-notes");
const DEEP_FILE = path.join(SCOUT_DIR, "deep-summaries.json");
const KEEPS_FILE = path.join(SCOUT_DIR, "keeps.md");
const REPO = "https://github.com/jackmir-explorer/chartji";
const REPO_BLOB = `${REPO}/blob/main/inbox/scout`;
const KEEPS_EDIT = `${REPO}/edit/main/inbox/scout/keeps.md`;

const args = process.argv.slice(2);
const getArg = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] ? args[i + 1] : def; };
const DAYS = parseInt(getArg("days", "14"), 10);
const MAX_UNREACTED = parseInt(getArg("max-unreacted", "60"), 10);
const OUT = getArg("out", path.join(ROOT, "docs", "index.html"));

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
const domainOf = (s) => { for (const [re, color, label] of DOMAIN_COLORS) if (re.test(s || "")) return { color, label }; return { color: "#64748b", label: "일반" }; };

const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---- 경량 markdown → HTML (study-note·keeps용, 무의존) ----
function mdToHtml(md) {
  const lines = String(md || "").replace(/\r/g, "").split("\n");
  const inline = (s) => esc(s)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  let html = "", i = 0;
  const isBlock = (l) => /^(#{1,6}\s|>|\s*[-*]\s|\s*\d+\.\s|\|)/.test(l) || /^---+\s*$/.test(l) || /^\s*$/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) { i++; continue; }
    let h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lv = Math.min(h[1].length + 1, 6); html += `<h${lv}>${inline(h[2])}</h${lv}>`; i++; continue; }
    if (/^---+\s*$/.test(line)) { html += "<hr>"; i++; continue; }
    if (/^\|/.test(line) && i + 1 < lines.length && /-/.test(lines[i + 1]) && /^\|?[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const header = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2; const rows = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim())); i++; }
      html += "<table><thead><tr>" + header.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>" +
        rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</tbody></table>";
      continue;
    }
    if (/^>\s?/.test(line)) { const buf = []; while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, "")); i++; } html += `<blockquote>${inline(buf.join(" "))}</blockquote>`; continue; }
    if (/^\s*[-*]\s+/.test(line)) { const buf = []; while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { buf.push(lines[i].replace(/^\s*[-*]\s+/, "")); i++; } html += "<ul>" + buf.map((b) => `<li>${inline(b)}</li>`).join("") + "</ul>"; continue; }
    if (/^\s*\d+\.\s+/.test(line)) { const buf = []; while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) { buf.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++; } html += "<ol>" + buf.map((b) => `<li>${inline(b)}</li>`).join("") + "</ol>"; continue; }
    const buf = []; while (i < lines.length && !isBlock(lines[i])) { buf.push(lines[i]); i++; } html += `<p>${inline(buf.join(" "))}</p>`;
  }
  return html;
}

// ---- 스카우트 파싱 ----
function parseScout(file) {
  const raw = fs.readFileSync(file, "utf8");
  const base = path.basename(file, ".md");
  const dateM = raw.match(/Scout Report\s*—\s*(\d{4}-\d{2}-\d{2})/) || [null, base];
  const date = dateM[1];
  const papers = []; let cur = null;
  const push = () => { if (cur && cur.title) papers.push(cur); cur = null; };
  for (const line of raw.split("\n")) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) { push(); cur = { date, title: h[1].trim() }; continue; }
    if (!cur) continue;
    const f = (label) => { const m = line.match(new RegExp(`^-\\s*\\*\\*${label}:\\*\\*\\s*(.*)$`)); return m ? m[1].trim() : null; };
    let v;
    if ((v = f("저널")) !== null) { const pm = v.match(/\*\*PMID:\*\*\s*([0-9]+)/); cur.pmid = pm ? pm[1] : null; cur.journal = v.replace(/\s*\|\s*\*\*PMID:\*\*.*$/, "").trim(); }
    else if ((v = f("슬롯")) !== null) cur.slot = v;
    else if ((v = f("한 줄")) !== null) cur.oneLiner = v;
    else if ((v = f("왜 유용")) !== null) cur.why = v;
    else if ((v = f("💬 반응")) !== null) { const applied = /✅\s*반영/.test(v); const stripped = v.replace(/`[^`]*`/g, "").replace(/✅.*$/, "").trim(); const blank = /^_*$/.test(v.replace(/`/g, "").trim()); cur.reaction = { applied, reacted: applied || (!blank && stripped.length > 0) }; }
  }
  push();
  return papers;
}

// ---- study-note 로드(PMID→{html}) ----
function loadNotes() {
  const map = {};
  let files = [];
  try { files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".md")); } catch { return map; }
  for (const f of files) {
    const raw = fs.readFileSync(path.join(NOTES_DIR, f), "utf8");
    const pm = raw.match(/^\-\s*\*\*PMID\*\*:?\s*([0-9]+)/m);
    if (!pm) continue;
    const body = raw.replace(/^#\s+.*$/m, "").trim(); // 중복 제목(첫 H1) 제거
    map[pm[1]] = { html: mdToHtml(body) };
  }
  return map;
}

let DEEP = {}; try { DEEP = JSON.parse(fs.readFileSync(DEEP_FILE, "utf8")); } catch {}
const NOTES = loadNotes();
let KEEPS_HTML = ""; try { KEEPS_HTML = mdToHtml(fs.readFileSync(KEEPS_FILE, "utf8").replace(/<!--[\s\S]*?-->/g, "")); } catch {}

const files = fs.readdirSync(SCOUT_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().reverse();
let papers = [];
for (const f of files) papers = papers.concat(parseScout(path.join(SCOUT_DIR, f)));

const cutoff = new Date(Date.now() - DAYS * 86400000);
const inWindow = (p) => new Date(p.date) >= cutoff;
const unreacted = papers.filter((p) => p.reaction && !p.reaction.reacted);
const unreactedRecent = unreacted.filter(inWindow);
const unreactedOlder = unreacted.length - unreactedRecent.length;
const reactedRecent = papers.filter((p) => inWindow(p) && p.reaction && p.reaction.reacted);
// 복습 섹션: 반응 완료 + study-note 보유 (창 무관, 최근순 일부)
const reviewable = papers.filter((p) => p.reaction && p.reaction.reacted && p.pmid && NOTES[p.pmid]).slice(0, 12);

function renderDeep(deep) {
  if (!deep) return `<div class="deep-pending">📄 세부 요약 생성 대기 (매일 자동 추가)</div>`;
  const tag = /전문|full/i.test(deep.basis || "") ? "전문 기반" : "초록 기반";
  const points = (deep.points || []).map((p) => `<li>${esc(p)}</li>`).join("");
  return `<details class="deep">
    <summary>📄 세부 요약 펼치기 <span class="deep-tag">deep · ${esc(tag)}</span></summary>
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

function card(p) {
  const d = domainOf(p.slot + " " + p.title);
  const fileUrl = `${REPO_BLOB}/${p.date}.md`;
  const pubmed = p.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/` : null;
  const deep = p.pmid ? DEEP[p.pmid] : null;
  const note = p.pmid ? NOTES[p.pmid] : null;
  return `<article class="card" style="--c:${d.color}">
    <div class="meta"><span class="dom">${esc(d.label)}</span><span class="date">${esc(p.date)}</span>${p.reaction && !p.reaction.reacted ? `<span class="badge">미반응</span>` : ""}</div>
    <h2>${esc(p.title)}</h2>
    <div class="jr">${esc(p.journal || "")}${pubmed ? ` · <a href="${pubmed}" target="_blank" rel="noopener">PMID ${esc(p.pmid)} ↗</a>` : ""}</div>
    ${p.oneLiner ? `<div class="core"><div class="core-lbl">📌 핵심</div>${esc(p.oneLiner)}</div>` : ""}
    ${p.why ? `<div class="why-wrap"><div class="lbl">왜 유용한가</div>${/[①②③④⑤⑥⑦⑧⑨⑩]/.test(p.why) ? `<ul class="why">${p.why.split(/(?=[①②③④⑤⑥⑦⑧⑨⑩])/).map((s) => s.trim()).filter(Boolean).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : `<div class="why-plain">${esc(p.why)}</div>`}</div>` : ""}
    ${renderDeep(deep)}
    ${note ? `<details class="note"><summary>✅ 내 study-note 보기 <span class="note-tag">정오 Deep Extract</span></summary><div class="note-body">${note.html}</div></details>` : ""}
    <div class="actions">
      <a class="react" href="${fileUrl}" target="_blank" rel="noopener">💬 반응 쓰기 →</a>
      <button class="addkeep" type="button" data-ref="[${p.date}] ${esc(p.title)}">➕ keeps에 추가</button>
    </div>
  </article>`;
}

const genTime = new Date().toISOString().slice(0, 16).replace("T", " ");
const cardsHtml = unreactedRecent.slice(0, MAX_UNREACTED).map(card).join("\n");

const html = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chartji Scout Digest</title>
<style>
  :root{color-scheme:light only}
  *{box-sizing:border-box}
  body{margin:0;background:#f1f5f9;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;-webkit-text-size-adjust:100%}
  .wrap{max-width:660px;margin:0 auto;padding:20px 14px 48px}
  header h1{font-size:21px;font-weight:800;margin:0}
  header .sub{font-size:12px;color:#64748b;margin-top:3px}
  .stats{display:flex;background:#0f172a;border-radius:12px;margin:16px 0 20px;overflow:hidden}
  .stats div{flex:1;text-align:center;padding:14px 6px;color:#cbd5e1;border-right:1px solid #1e293b}
  .stats div:last-child{border-right:0}.stats b{display:block;font-size:26px;font-weight:800;line-height:1}
  .stats .s-un b{color:#fbbf24}.stats .s-ok b{color:#34d399}.stats .s-old b{color:#f1f5f9}.stats span{font-size:11px}
  .keeps{background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 16px;margin-bottom:22px}
  .keeps .kh{font-size:14px;font-weight:800;color:#92400e;margin-bottom:2px}
  .keeps .ks{font-size:11px;color:#b45309;margin-bottom:8px}
  .keeps-body{font-size:13px;line-height:1.6;color:#334155}
  .keeps-body h2{font-size:13px;font-weight:700;color:#92400e;margin:10px 0 4px}
  .keeps-body ul{margin:0 0 6px;padding-left:18px}.keeps-body li{margin-bottom:4px}
  .keeps a.edit{display:inline-block;margin-top:8px;font-size:12px;font-weight:700;color:#92400e;text-decoration:none;border:1px solid #fcd34d;border-radius:6px;padding:5px 11px}
  .keeps-ta{width:100%;min-height:118px;border:1px solid #fcd34d;border-radius:8px;padding:10px 12px;font-family:inherit;font-size:13px;line-height:1.65;color:#334155;background:#fff;resize:vertical}
  .keeps-actions{display:flex;align-items:center;gap:10px;margin-top:7px}
  .keeps-ind{font-size:11px;color:#059669;font-weight:700}
  .keeps-copy{font-size:12px;font-weight:700;color:#92400e;background:#fff;border:1px solid #fcd34d;border-radius:6px;padding:5px 11px;cursor:pointer;font-family:inherit}
  .keeps-repo{margin-top:11px}.keeps-repo summary{cursor:pointer;font-size:12px;font-weight:700;color:#b45309;list-style:none}
  .keeps-body h2{font-size:13px;font-weight:700;color:#92400e;margin:10px 0 4px}.keeps-body ul{margin:0 0 6px;padding-left:18px}.keeps-body li{margin-bottom:4px;font-size:13px;color:#334155}
  .sec-h{font-size:15px;font-weight:700;margin:0 0 2px}
  .sec-s{font-size:11px;color:#94a3b8;margin:0 0 14px}
  .card{background:#fff;border-left:4px solid var(--c);border-radius:10px;box-shadow:0 1px 3px rgba(15,23,42,.08);padding:17px 18px;margin-bottom:16px}
  .meta{font-size:11px;font-weight:700;letter-spacing:.3px;margin-bottom:6px}
  .meta .dom{color:var(--c)}.meta .date{color:#94a3b8;margin-left:8px}
  .meta .badge{background:#fef3c7;color:#92400e;padding:1px 7px;border-radius:10px;font-size:10px;margin-left:8px}
  .card h2{font-size:16px;line-height:1.4;font-weight:700;margin:0 0 7px}
  .jr{font-size:12px;color:#64748b;margin-bottom:12px}.jr a{color:#0369a1;text-decoration:none;font-weight:600}
  .core{background:#f8fafc;border-radius:7px;padding:11px 13px;margin-bottom:13px;font-size:14.5px;line-height:1.55;font-weight:600}
  .core-lbl{font-size:11px;color:var(--c);font-weight:700;margin-bottom:3px}
  .lbl{font-size:11px;color:#94a3b8;font-weight:700;margin-bottom:3px}
  .why-wrap{margin-bottom:13px}
  ul.why{margin:0;padding-left:0;list-style:none}ul.why li{font-size:13px;line-height:1.62;color:#334155;margin-bottom:6px}
  .why-plain{font-size:13px;line-height:1.62;color:#334155}
  details.deep,details.note{border:1px solid #e2e8f0;border-radius:8px;margin-bottom:13px;background:#fafcff}
  details.note{background:#f0fdf4;border-color:#bbf7d0}
  details.deep summary,details.note summary{cursor:pointer;list-style:none;padding:10px 13px;font-size:13px;font-weight:700;color:var(--c);user-select:none}
  details.note summary{color:#047857}
  details.deep summary::-webkit-details-marker,details.note summary::-webkit-details-marker{display:none}
  details.deep summary::before,details.note summary::before{content:"▸ ";font-size:11px}
  details.deep[open] summary::before,details.note[open] summary::before{content:"▾ "}
  .deep-tag,.note-tag{font-size:10px;font-weight:600;color:#94a3b8;background:#eef2f7;padding:1px 6px;border-radius:9px;margin-left:5px}
  .deep-body{padding:0 14px 14px;border-top:1px solid #eef2f7}
  .deep-core{font-size:13.5px;line-height:1.6;font-weight:600;margin:11px 0 10px}
  ul.deep-points{margin:0 0 11px;padding-left:18px}ul.deep-points li{font-size:13px;line-height:1.6;color:#334155;margin-bottom:6px}
  .deep-exam,.deep-apply,.deep-limit{font-size:12.5px;line-height:1.55;color:#334155;background:#f1f5f9;border-radius:6px;padding:8px 11px;margin-bottom:8px}
  .deep-exam b,.deep-apply b,.deep-limit b{display:block;font-size:11px;color:var(--c);margin-bottom:2px}
  .deep-limit{background:#fff7ed}.deep-limit b{color:#b45309}
  .deep-cite{font-size:11px;color:#94a3b8;line-height:1.5;margin-top:4px}
  .deep-pending{font-size:12px;color:#b45309;background:#fffbeb;border:1px dashed #fde68a;border-radius:8px;padding:9px 12px;margin-bottom:13px}
  .note-body{padding:4px 15px 14px;border-top:1px solid #d1fae5;font-size:13px;line-height:1.62;color:#1e293b}
  .note-body h2{font-size:14px;margin:14px 0 5px;color:#065f46}.note-body h3{font-size:12.5px;margin:11px 0 4px;color:#047857}
  .note-body ul,.note-body ol{padding-left:19px;margin:5px 0}.note-body li{margin-bottom:4px}
  .note-body blockquote{margin:6px 0;padding:6px 11px;border-left:3px solid #34d399;background:#ecfdf5;color:#065f46;border-radius:0 6px 6px 0}
  .note-body table{border-collapse:collapse;width:100%;margin:8px 0;font-size:12px}
  .note-body th,.note-body td{border:1px solid #d1fae5;padding:5px 8px;text-align:left;vertical-align:top}
  .note-body th{background:#ecfdf5;color:#065f46}
  .note-body code{background:#eef2f7;padding:1px 5px;border-radius:4px;font-size:12px}
  .actions{display:flex;gap:8px;flex-wrap:wrap}
  a.react{display:inline-block;font-size:12.5px;font-weight:700;color:#fff;background:var(--c);padding:9px 15px;border-radius:7px;text-decoration:none}
  .addkeep{display:inline-block;font-size:12.5px;font-weight:700;color:var(--c);background:#fff;border:1.5px solid var(--c);padding:8px 13px;border-radius:7px;text-decoration:none;cursor:pointer;font-family:inherit;line-height:1}
  footer{font-size:11px;color:#94a3b8;line-height:1.7;margin-top:26px;padding-top:18px;border-top:1px solid #e2e8f0}
</style></head>
<body><div class="wrap">
  <header><h1>🔬 Chartji Scout Digest</h1><div class="sub">최근 ${DAYS}일 · 생성 ${genTime}</div></header>
  <div class="stats">
    <div class="s-un"><b>${unreactedRecent.length}</b><span>미반응 (최근 ${DAYS}일)</span></div>
    <div class="s-ok"><b>${reactedRecent.length}</b><span>반영됨</span></div>
    <div class="s-old"><b>${unreactedOlder}</b><span>${DAYS}일 이전 미반응</span></div>
  </div>
  <section class="keeps">
    <div class="kh">📌 빠른 메모</div>
    <div class="ks">이 기기 브라우저에만 저장됩니다(동기화·레포 백업 아님). 환자 앞에서 믿고 쓰기 전 검증 원칙.</div>
    <textarea id="keeps-ta" class="keeps-ta" placeholder="꽂힌 내용을 한 줄씩…  (카드의 ‘➕ keeps에 추가’를 누르면 여기로 들어옵니다)"></textarea>
    <div class="keeps-actions"><span id="keeps-ind" class="keeps-ind"></span><button id="keeps-copy" type="button" class="keeps-copy">📋 복사</button></div>
    ${KEEPS_HTML ? `<details class="keeps-repo"><summary>레포 저장본(검증·백업용)</summary><div class="keeps-body">${KEEPS_HTML}</div><a class="edit" href="${KEEPS_EDIT}" target="_blank" rel="noopener">✏️ 레포 편집(GitHub)</a></details>` : ""}
  </section>
  <div class="sec-h">📬 아직 안 읽은 논문</div>
  <div class="sec-s">훑고 → 더 보려면 '세부 요약' · 반응 쓴 건 '내 study-note'로 복습 · 꽂히면 'keeps에 추가'</div>
  ${cardsHtml || `<div class="card">🎉 최근 ${DAYS}일 미반응 없음 — 다 읽으셨어요!</div>`}
  ${unreactedRecent.length > MAX_UNREACTED ? `<div class="sec-s">…외 ${unreactedRecent.length - MAX_UNREACTED}건 더</div>` : ""}
  ${reviewable.length ? `<div class="sec-h" style="margin-top:26px">✅ 복습 — 내 study-note</div><div class="sec-s">반응을 써서 정오 Deep Extract가 노트를 만든 논문. 카드에서 바로 펼쳐 복습</div>${reviewable.map(card).join("\n")}` : ""}
  <footer>반응을 쓴 논문만 정오 12:00 Deep Extract가 처리합니다. 세부 요약은 논문 초록·전문(PubMed) 기반이며 inbox/scout 에서 매일 자동 생성됩니다. 빠른 메모는 이 기기 브라우저에 저장됩니다.</footer>
</div>
<script>
(function(){
  var K='chartji_keeps_v1', ta=document.getElementById('keeps-ta'), ind=document.getElementById('keeps-ind');
  if(!ta) return;
  function save(){try{localStorage.setItem(K,ta.value);if(ind)ind.textContent='✓ 이 기기에 저장됨';}catch(e){if(ind)ind.textContent='⚠ 저장 불가(브라우저 설정)';}}
  try{var v=localStorage.getItem(K);if(v!==null)ta.value=v;}catch(e){}
  ta.addEventListener('input',save);
  document.querySelectorAll('.addkeep').forEach(function(b){
    b.addEventListener('click',function(){
      var ref=b.getAttribute('data-ref')||'', cur=ta.value.replace(/\\s*$/,'');
      ta.value=(cur?cur+'\\n':'')+'- '+ref; save();
      ta.scrollIntoView({behavior:'smooth',block:'center'});
      var o=b.textContent; b.textContent='✓ 추가됨'; setTimeout(function(){b.textContent=o;},1400);
    });
  });
  var cp=document.getElementById('keeps-copy');
  if(cp)cp.addEventListener('click',function(){try{navigator.clipboard.writeText(ta.value);cp.textContent='✓ 복사됨';setTimeout(function(){cp.textContent='📋 복사';},1400);}catch(e){}});
})();
</script>
</body></html>`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
try { fs.writeFileSync(path.join(path.dirname(OUT), ".nojekyll"), ""); } catch {}
console.log(JSON.stringify({
  out: OUT, totalPapers: papers.length,
  unreactedRecent: unreactedRecent.length, unreactedOlder, reactedRecent: reactedRecent.length,
  deepCached: Object.keys(DEEP).filter((k) => !k.startsWith("_")).length, notesLoaded: Object.keys(NOTES).length,
  subject: `🔬 Scout Digest — 안 읽은 논문 ${unreactedRecent.length}건 (최근 ${DAYS}일)`,
}));
