#!/usr/bin/env node
// scout-digest.mjs — inbox/scout/*.md 를 한 장짜리 뉴스레터(HTML)로 합친다.
// 목적: 매일 쌓이는 scout 리포트를 "눌러 들어가는 병목" 없이 한눈에.
// 사용: node scripts/scout-digest.mjs [--days 28] [--out digest.html] [--max-unreacted 40]
//
// 파싱 대상(파일당 1개 이상 논문 블록):
//   # Scout Report — YYYY-MM-DD
//   ### <제목>
//   - **저널:** <journal> | **PMID:** <pmid>
//   - **슬롯:** <slot>
//   - **한 줄:** <one-liner>
//   - **왜 유용:** <why>
//   - **💬 반응:** <text | `___`>  [ `✅ 반영됨 DATE` ]

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SCOUT_DIR = path.join(ROOT, "inbox", "scout");
const REPO_BLOB = "https://github.com/jackmir-explorer/chartji/blob/main/inbox/scout";

// ---- args ----
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const DAYS = parseInt(getArg("days", "28"), 10);
const MAX_UNREACTED = parseInt(getArg("max-unreacted", "40"), 10);
const OUT = getArg("out", path.join(ROOT, "inbox", "scout", "digest.html"));

// ---- 도메인(슬롯) → 색 ----
const DOMAIN_COLORS = [
  [/약물|deprescrib|polypharm|처방/i, "#b45309", "약물"],
  [/생활습관|lifestyle|운동|exercise|식이|alcohol|smoking/i, "#047857", "생활습관"],
  [/감염|antibiotic|vaccin|부비동|URI/i, "#0369a1", "감염"],
  [/심|cardio|CVD|고혈압|HTN|지질|statin/i, "#be123c", "심혈관"],
  [/신경|neuro|두통|어지럼|dizz|헤드|migraine/i, "#7c3aed", "신경"],
  [/내분비|당뇨|diabet|갑상|thyroid|비만|obes/i, "#c026d3", "내분비"],
  [/정신|psych|우울|depress|불안|anxiety/i, "#4f46e5", "정신"],
  [/Wildcard|Liby|Follow/i, "#475569", "와일드카드"],
];
const domainOf = (slot) => {
  for (const [re, color, label] of DOMAIN_COLORS) if (re.test(slot || "")) return { color, label };
  return { color: "#64748b", label: "일반" };
};

// ---- 파싱 ----
function parseFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const base = path.basename(file, ".md");
  const dateM = raw.match(/Scout Report\s*—\s*(\d{4}-\d{2}-\d{2})/) || [null, base];
  const date = dateM[1];
  const lines = raw.split("\n");
  const papers = [];
  let cur = null;
  const pushCur = () => { if (cur && cur.title) papers.push(cur); cur = null; };
  for (const line of lines) {
    const h = line.match(/^###\s+(.+?)\s*$/);
    if (h) { pushCur(); cur = { date, title: h[1].trim() }; continue; }
    if (!cur) continue;
    const field = (label) => {
      const m = line.match(new RegExp(`^-\\s*\\*\\*${label}:\\*\\*\\s*(.*)$`));
      return m ? m[1].trim() : null;
    };
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
      const isBlank = /^_*$/.test(v.replace(/`/g, "").trim()) || stripped === "" && !applied && /_{3,}/.test(v);
      cur.reaction = { raw: v, applied, reacted: applied || (!isBlank && stripped.length > 0) };
    }
  }
  pushCur();
  return papers;
}

const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const truncate = (s, n) => (s && s.length > n ? s.slice(0, n).trim() + "…" : s || "");

// ---- 수집 ----
const files = fs.readdirSync(SCOUT_DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).sort().reverse();
let papers = [];
for (const f of files) papers = papers.concat(parseFile(path.join(SCOUT_DIR, f)));

const today = new Date();
const cutoff = new Date(today.getTime() - DAYS * 86400000);
const inWindow = (p) => new Date(p.date) >= cutoff;

const unreacted = papers.filter((p) => p.reaction && !p.reaction.reacted);
const unreactedRecent = unreacted.filter(inWindow);
const unreactedOlder = unreacted.length - unreactedRecent.length;
const reactedRecent = papers.filter((p) => inWindow(p) && p.reaction && p.reaction.reacted);

// ---- 렌더 ----
function card(p) {
  const d = domainOf(p.slot);
  const fileUrl = `${REPO_BLOB}/${p.date}.md`;
  const pubmed = p.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/` : null;
  return `
  <tr><td style="padding:0 0 14px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-left:4px solid ${d.color};background:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(15,23,42,.08);">
      <tr><td style="padding:14px 16px;">
        <div style="font-size:11px;color:${d.color};font-weight:700;letter-spacing:.3px;">
          ${esc(d.label)} &nbsp;·&nbsp; <span style="color:#94a3b8;font-weight:600;">${esc(p.date)}</span>
          ${p.reaction && !p.reaction.reacted ? `&nbsp;·&nbsp;<span style="background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:10px;font-size:10px;">미반응</span>` : ""}
        </div>
        <div style="font-size:15px;line-height:1.35;font-weight:700;color:#0f172a;margin:5px 0 6px;">${esc(p.title)}</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:8px;">
          ${esc(p.journal || "")}${pubmed ? ` &nbsp;·&nbsp; <a href="${pubmed}" style="color:#0369a1;text-decoration:none;">PMID ${esc(p.pmid)} ↗</a>` : ""}
        </div>
        ${p.oneLiner ? `<div style="font-size:13.5px;line-height:1.5;color:#1e293b;margin-bottom:8px;">${esc(p.oneLiner)}</div>` : ""}
        ${p.why ? `<div style="font-size:12px;line-height:1.5;color:#64748b;margin-bottom:10px;">${esc(truncate(p.why, 240))}</div>` : ""}
        <a href="${fileUrl}" style="display:inline-block;font-size:12px;font-weight:600;color:#ffffff;background:${d.color};padding:6px 12px;border-radius:6px;text-decoration:none;">💬 반응 한 문장 쓰기 →</a>
      </td></tr>
    </table>
  </td></tr>`;
}

const dateRange = `${papers.length ? papers[papers.length - 1].date : ""} ~ ${papers.length ? papers[0].date : ""}`;
const genTime = new Date().toISOString().slice(0, 10);

const html = `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Chartji Scout Digest</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;"><tr><td align="center" style="padding:20px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

  <!-- header -->
  <tr><td style="padding:4px 4px 16px;">
    <div style="font-size:20px;font-weight:800;color:#0f172a;">🔬 Chartji Scout Digest</div>
    <div style="font-size:12px;color:#64748b;margin-top:3px;">최근 ${DAYS}일 · 생성 ${genTime}</div>
  </td></tr>

  <!-- summary strip -->
  <tr><td style="padding:0 0 18px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:10px;">
      <tr>
        <td align="center" style="padding:14px 8px;color:#fff;">
          <div style="font-size:26px;font-weight:800;color:#fbbf24;">${unreactedRecent.length}</div>
          <div style="font-size:11px;color:#cbd5e1;">미반응 (최근 ${DAYS}일)</div>
        </td>
        <td align="center" style="padding:14px 8px;color:#fff;border-left:1px solid #1e293b;border-right:1px solid #1e293b;">
          <div style="font-size:26px;font-weight:800;color:#34d399;">${reactedRecent.length}</div>
          <div style="font-size:11px;color:#cbd5e1;">반영됨</div>
        </td>
        <td align="center" style="padding:14px 8px;color:#fff;">
          <div style="font-size:26px;font-weight:800;color:#f1f5f9;">${unreactedOlder}</div>
          <div style="font-size:11px;color:#cbd5e1;">${DAYS}일 이전 미반응</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- unreacted -->
  <tr><td style="padding:0 0 6px;"><div style="font-size:14px;font-weight:700;color:#0f172a;">📬 아직 안 읽은 논문</div>
    <div style="font-size:11px;color:#94a3b8;margin:2px 0 10px;">한 줄만 읽고, 쓸 게 있으면 카드의 버튼으로 바로 점프</div></td></tr>
  <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${unreactedRecent.slice(0, MAX_UNREACTED).map(card).join("") || `<tr><td style="padding:20px;text-align:center;color:#94a3b8;font-size:13px;background:#fff;border-radius:8px;">🎉 최근 ${DAYS}일 미반응 없음 — 다 읽으셨어요!</td></tr>`}
  </table></td></tr>
  ${unreactedRecent.length > MAX_UNREACTED ? `<tr><td style="padding:4px 0 0;font-size:12px;color:#94a3b8;">…외 ${unreactedRecent.length - MAX_UNREACTED}건 더</td></tr>` : ""}

  <!-- footer -->
  <tr><td style="padding:22px 4px 8px;border-top:1px solid #e2e8f0;margin-top:10px;">
    <div style="font-size:11px;color:#94a3b8;line-height:1.6;">
      반응을 쓴 논문만 정오 12:00 Deep Extract가 처리합니다. 빈칸은 넘어갑니다.<br>
      이 다이제스트는 inbox/scout/*.md 에서 매일 자동 생성됩니다.
    </div>
  </td></tr>

</table></td></tr></table></body></html>`;

fs.writeFileSync(OUT, html);
// stdout: 요약(예약 작업이 이메일 제목/본문에 쓰도록)
console.log(JSON.stringify({
  out: OUT,
  totalPapers: papers.length,
  unreactedRecent: unreactedRecent.length,
  unreactedOlder,
  reactedRecent: reactedRecent.length,
  dateRange,
  subject: `🔬 Scout Digest — 안 읽은 논문 ${unreactedRecent.length}건 (최근 ${DAYS}일)`,
}));
