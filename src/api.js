/* ── Core HTTP ── */
async function callClaude(systemPrompt,userContent,apiKey,maxTokens){
  var res=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "x-api-key":apiKey,
      "anthropic-version":"2023-06-01",
      "anthropic-dangerous-direct-browser-access":"true",
    },
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:maxTokens||1500,
      system:systemPrompt,
      messages:[{role:"user",content:userContent}],
    }),
  });
  if(!res.ok){var e=await res.json();throw new Error((e.error&&e.error.message)||"API 오류 "+res.status);}
  var data=await res.json();
  return (data.content&&data.content[0]&&data.content[0].text)||"";
}

/* ── Helpers ── */
function safeParseJSON(text){
  var c=text
    .replace(/```json[\s\S]*?```/g,function(m){return m.replace(/```json\n?|```\n?/g,"");})
    .replace(/```[\s\S]*?```/g,function(m){return m.replace(/```\n?/g,"");})
    .trim();
  var s=c.indexOf("{"),e=c.lastIndexOf("}");
  if(s===-1||e===-1) throw new Error("JSON 파싱 실패: "+c.slice(0,60));
  return JSON.parse(c.slice(s,e+1));
}

/* ctx 주입 헬퍼 — 재진 Context가 있을 때만 시스템 프롬프트에 추가 */
function buildCtxNote(rule,ctx){
  if(!ctx||!ctx.trim()) return "";
  return "\n\n[재진 Context 반영 규칙]\n"+rule+"\n재진 Context (핵심만): "+ctx.trim().slice(0,200);
}

/* 4 panel API calls */
async function generateTriagePanel(raw,apiKey,ctx){
  var extra=buildCtxNote(
    "follow-up / lab review / medication adjustment 등 방문 성격을 initialFocus에 제한적으로 반영 가능.",ctx);
  var t=await callClaude(
    TRIAGE_PROMPT+extra,
    "외래 초반 transcript를 분석해 문진 가이드를 JSON으로 반환하라.\n\n[Transcript]\n"+raw,
    apiKey,500);
  return safeParseJSON(t);
}
async function generateMissingPanel(raw,apiKey,ctx){
  var extra=buildCtxNote(
    "improvement / worsening / adherence / side effects / results review / new symptoms 같은 follow-up 질문을 우선한다.",ctx);
  var t=await callClaude(
    MISSING_PROMPT+extra,
    "외래 transcript에서 안전 관련 누락 항목을 JSON으로 반환하라.\n\n[Transcript]\n"+raw,
    apiKey,400);
  return safeParseJSON(t);
}
async function generateRedFlagPanel(raw,apiKey){
  /* ⚠ 재진 Context 영향 없음 — transcript 기준으로만 판단 */
  var t=await callClaude(
    REDFLAG_PROMPT,
    "외래 transcript에서 즉시 주의가 필요한 안전 신호를 JSON으로 반환하라.\n\n[Transcript]\n"+raw,
    apiKey,400);
  return safeParseJSON(t);
}
async function generateProblemsPanel(raw,apiKey,ctx){
  var extra=buildCtxNote(
    "문제 구조를 follow-up 중심으로 잡을 수 있음. 처방 연장·결과 확인 등 follow-up 항목을 P1 우선 배치.",ctx);
  var t=await callClaude(
    PROBLEMS_PROMPT+extra,
    "외래 transcript에서 문제 목록을 JSON으로 반환하라.\n\n[Transcript]\n"+raw,
    apiKey,400);
  return safeParseJSON(t);
}

/* Draft Review — on-demand only */
async function generateDraftReview(raw,apiKey,customPrompt,knowledgeCtx){
  var sys=customPrompt||DRAFT_REVIEW_PROMPT;
  var knowledgeLine=knowledgeCtx?"\n\n==질환 특이 참고==\n아래는 해당 질환·약물에 대한 임상 지식이다. 이 환자 상황(transcript)에 직접 해당하는 금기·주의·미확인 항목이 있으면 적극적으로 지적하라. 환자 상황과 무관한 일반론은 생략한다.\n\n"+knowledgeCtx:"";
  return callClaude(
    sys+knowledgeLine,
    "다음 진료 대화를 검토하라.\n\n[Transcript]\n"+raw,
    apiKey,600);
}

/* Working Draft */
async function generateWorkingDraft(raw,apiKey,ctx,knowledgeCtx,draftTemplate){
  var knowledgeLine=knowledgeCtx?"\n\n==임상 경험 컨텍스트 (API 일반 지식보다 우선 적용)==\n"+knowledgeCtx:"";
  var ctxLine=ctx&&ctx.trim()?"\n\n재진 Context (한 줄만 반영): "+ctx.trim().slice(0,200):"";
  var sys;
  if(draftTemplate){
    sys="한국 일차진료 외래 Working Draft 생성 도구.\n"
      +"==절대 금지==\n"
      +"- transcript에 없는 정보 생성 금지\n"
      +"- doctor-stated 아닌 plan 생성 금지\n"
      +"- 하지 않은 신체진찰(PE) 생성 금지\n"
      +"- 마크다운 서식 금지 — plain text만 출력\n"
      +"==출력 형식==\n"
      +draftTemplate+"\n\n"
      +"위 형식을 우선 사용하되, 형식과 무관한 새 증상·호소가 있으면 "
      +"하단에 [추가 호소] 섹션을 기존 EMR 형식(CC/HPI/PE/Assessment/Plan)으로 별도 기록한다. 누락 금지.\n"
      +knowledgeLine+ctxLine;
  } else {
    sys=WORKING_DRAFT_PROMPT+knowledgeLine+ctxLine;
  }
  return callClaude(
    sys,
    "다음 진료 transcript로 Working Draft를 작성하라.\n\n[Transcript]\n"+raw,
    apiKey,700);
}
