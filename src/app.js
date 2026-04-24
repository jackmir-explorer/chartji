const {useState,useRef,useEffect}=React;

/* kind별 uiHooks 기본값 (knowledge/section-vocabulary.md line 70-99 정합).
   엔트리가 uiHooks 필드를 명시하지 않으면 kind별 기본값을 상속. 필드별 부분 override 허용. */
var UIHOOKS_DEFAULTS={
  disease:{hint:["protocol","indication","schedule","referral"],guide:["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","notes"],draftAppend:["draft-append"]},
  drug:   {hint:["indication","dosing","schedule"],guide:["contraindication","precaution","comparison","insurance"],draftAppend:null},
  topic:  {hint:[],guide:["*"],draftAppend:null}
};
function getUiHooks(e){
  var base=UIHOOKS_DEFAULTS[e&&e.kind]||{};
  var over=(e&&e.uiHooks)||{};
  return {
    hint:        over.hint        !==undefined?over.hint        :base.hint,
    guide:       over.guide       !==undefined?over.guide       :base.guide,
    draftAppend: over.draftAppend !==undefined?over.draftAppend :base.draftAppend,
    draftTemplate: over.draftTemplate
  };
}
/* detectedCalcs → parent 엔트리까지 확장한 키 배열 반환.
   순수 함수. bundle consumer 로직 금지 (설계서 제약 1).
   parent 미존재는 silent-skip (설계서 제약 8), dedup은 Set 로 보장 (설계서 제약 2). */
function expandWithParents(detected){
  if(!detected||!detected.length) return [];
  if(typeof KNOWLEDGE_BUNDLE==="undefined") return detected.slice();
  var out=detected.slice();
  detected.forEach(function(c){
    var e=KNOWLEDGE_BUNDLE[c]; if(!e||!e.parents) return;
    e.parents.forEach(function(p){
      if(KNOWLEDGE_BUNDLE[p]) out.push(p);
    });
  });
  return Array.from(new Set(out));
}
/* Guide tab 노출 조건 — 엔트리가 실제 큐레이션 가능한 섹션을 가질 때만 true.
   기본값 상속 후 교집합이 공집합이면 탭 자체 숨김 (panel-contracts.md Guideline Assist 강화). */
function hasGuidableContent(e){
  if(!e) return false;
  if(e.sections){
    var keys=getUiHooks(e).guide||[];
    if(keys.indexOf("*")!==-1) return Object.keys(e.sections).length>0;
    return keys.some(function(k){return e.sections[k]&&e.sections[k].content;});
  }
  return !!(e.exam||e.draftAppend||e.treatment||e.differential);
}

/* Curation ctx 빌드 헬퍼 — handleCuration 실제 로직 단일 출처.
   L3 Smoke #1 (부팅 KB 무결성 체크)과 handleCuration이 동일 헬퍼 호출 (DRY).
   반환: {ctx: string, debug: {reason, emittedKeys}}
   - v2 엔트리: uiHooks.guide 키 순회, primarySources 포함, 임시 라벨만 있는 섹션 skip (L2-patch).
   - v1 엔트리: e.exam / e.draftAppend 만 반영 (handleCuration 실제 로직과 일치).
   Smoke #1의 broken 판정 기준도 여기서 도출 → false positive 없음. */
function buildCurationCtx(entry,key){
  if(!entry) return {ctx:"",debug:{reason:"no-entry",emittedKeys:[]}};
  var ctx="";
  var emitted=[];
  if(entry.sections){
    var hooks=getUiHooks(entry);
    var keys=hooks.guide||[];
    if(keys.indexOf("*")!==-1) keys=Object.keys(entry.sections);
    if(entry.primarySources&&entry.primarySources.length){
      ctx+="["+key+".primarySources]\n"+entry.primarySources.join("\n")+"\n\n";
      emitted.push("primarySources");
    }
    keys.forEach(function(k){
      var s=entry.sections[k]; if(!(s&&s.content)) return;
      /* L2-patch: sources[]가 모두 `[TIPS — 임시` 라벨이면 해당 섹션 skip. */
      if(s.sources&&s.sources.length){
        var allTemp=s.sources.every(function(src){
          return typeof src==="string"&&src.indexOf("[TIPS — 임시")===0;
        });
        if(allTemp) return;
      }
      ctx+="["+key+"."+k+"]\n"+s.content;
      if(s.sources&&s.sources.length) ctx+="\n[sources]\n"+s.sources.join("\n");
      ctx+="\n\n";
      emitted.push(k);
    });
    return {ctx:ctx,debug:{reason:emitted.length?"v2-ok":"v2-empty",emittedKeys:emitted}};
  }
  /* v1 fallback — handleCuration 실제 로직과 일치 (exam/draftAppend만). */
  if(entry.exam){ ctx+="["+key+".exam]\n"+entry.exam+"\n\n"; emitted.push("exam"); }
  if(entry.draftAppend){ ctx+="["+key+".draftAppend]\n"+entry.draftAppend+"\n\n"; emitted.push("draftAppend"); }
  return {ctx:ctx,debug:{reason:emitted.length?"v1-ok":"v1-empty",emittedKeys:emitted}};
}

/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
function App(){

  /* ── UI state ── */
  var [raw,       setRaw]       = useState("");
  var [consent,   setConsent]   = useState(false);
  /* ── 재진 Context ── */
  var [isFollowUp, setIsFollowUp] = useState(false);
  var followUpCtx = isFollowUp ? "재진" : "";

  /* ── Working Draft ── */
  var [draftText,    setDraftText]    = useState("");
  var [draftLoading, setDraftLoading] = useState(false);
  var [reviewText,   setReviewText]   = useState("");
  var [reviewLoading,setReviewLoading]= useState(false);
  var [curationText,   setCurationText]   = useState("");
  var [curationLoading,setCurationLoading]= useState(false);
  var [leftTab,      setLeftTab]      = useState("raw"); /* "raw" | "draft" | "guide" | "calc-xxx" */

  /* ── 계산기 탭 ── */
  var [detectedCalcs, setDetectedCalcs] = useState([]);
  var [activeCalcs,   setActiveCalcs]   = useState([]);
  var [calcInputs,    setCalcInputs]    = useState({});
  var [calcResults,   setCalcResults]   = useState({});

  var [compactMode,setCompactMode] = useState(false);
  var [liveEnabled,setLiveEnabled] = useState(true);
  var [rfKey,setRfKey] = useState(0);
  var [triageKey,setTriageKey] = useState(0);
  var [missingKey,setMissingKey] = useState(0);

  /* Timer refs */
  var draftTimerRef    = useRef(null);

  /* Last-analyzed text refs */
  var lastDraftRef     = useRef("");

  /* ── API 키 ── */
  var [apiKey,  setApiKey]  = useState(function(){return localStorage.getItem("cj_key")||"";});
  var [keyInput,setKeyInput]= useState("");
  var [showKey, setShowKey] = useState(!localStorage.getItem("cj_key"));

  /* ── 음성인식 ── */
  var recognitionRef = useRef(null);
  var finalTextRef   = useRef("");
  var taRef          = useRef(null);
  var [isRecording,setIsRecording] = useState(false);
  var [interimText,setInterimText] = useState("");
  var [voiceMsg,   setVoiceMsg]    = useState("");
  var voiceOk = typeof window!=="undefined"&&
    (window.SpeechRecognition||window.webkitSpeechRecognition);


  /* ── DraftTab hint parts (설계서 §2 #4) — parent 확장 포함하되 hasDisease 판정은 원본 기준.
         drug 우선순위 회귀 방지: 위고비 단독 감지 시 parent=obesity(disease) 자동 확장돼도 hasDisease=false 유지 → 위고비 hint 소실 방지. */
  var draftHints=React.useMemo(function(){
    if(typeof KNOWLEDGE_BUNDLE==="undefined") return null;
    var expanded=expandWithParents(detectedCalcs);
    if(!expanded.length) return null;
    var hasDiseaseOriginal=detectedCalcs.some(function(c){
      return KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].kind==="disease";
    });
    var parts=[];
    expanded.forEach(function(c){
      var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
      if(hasDiseaseOriginal&&e.kind==="drug") return;
      if(e.sections){
        var hooks=getUiHooks(e);
        (hooks.hint||[]).forEach(function(k){
          var s=e.sections[k];
          if(s&&s.content) parts.push(k+":\n"+s.content);
        });
      } else {
        if(e.treatment) parts.push("처방/치료:\n"+e.treatment);
        if(e.differential) parts.push("감별진단:\n"+e.differential);
      }
    });
    return parts.length?parts.join("\n\n"):null;
  },[detectedCalcs]);

  /* ── TriagePanel differentialShort (설계서 §2 #5) — parent 확장 + dedup. */
  var differentialShort=React.useMemo(function(){
    if(typeof KNOWLEDGE_BUNDLE==="undefined") return null;
    var expanded=expandWithParents(detectedCalcs);
    if(!expanded.length) return null;
    var list=[];
    expanded.forEach(function(c){
      if(KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].differentialShort){
        KNOWLEDGE_BUNDLE[c].differentialShort.forEach(function(item){
          if(!list.some(function(x){return x.d===item.d;})) list.push(item);
        });
      }
    });
    return list.length?list:null;
  },[detectedCalcs]);

  /* ── L3 Smoke #1 + #3: KB 부팅 무결성 체크 (dev 한정) ──
     #1: 모든 KB 키를 buildCurationCtx로 시뮬레이션 → 빈 ctx 반환 key 수집
     #3: v2 엔트리(e.sections)인데 primarySources 누락 key 수집
     경고만 표시, 앱 동작 영향 0. 프로덕션 사용자엔 노출 안 됨 (hostname 조건). */
  useEffect(function(){
    if(typeof KNOWLEDGE_BUNDLE==="undefined") return;
    var host=(typeof location!=="undefined"&&location.hostname)||"";
    if(host!=="localhost"&&host!=="127.0.0.1") return;
    var broken=[];
    var noSource=[];
    Object.keys(KNOWLEDGE_BUNDLE).forEach(function(k){
      var e=KNOWLEDGE_BUNDLE[k]; if(!e) return;
      var r=buildCurationCtx(e,k);
      if(!r.ctx) broken.push(k);
      if(e.sections&&(!e.primarySources||!e.primarySources.length)){
        noSource.push(k);
      }
    });
    if(broken.length){
      console.warn("[KB-SMOKE] Guide ctx 공백 엔트리:",broken);
    }
    if(noSource.length){
      console.warn("[KB-SMOKE] primarySources 누락 v2 엔트리:",noSource);
    }
    if(!broken.length&&!noSource.length){
      console.log("[KB-SMOKE] 통과 — 공백 엔트리 0, primarySources 누락 0");
    }
  },[]);

  /* ── 감지된 계산기 → 활성 탭 자동 추가 ── */
  useEffect(function(){
    if(!detectedCalcs.length||!raw.trim()) return;
    setActiveCalcs(function(prev){
      var next=prev.slice();
      detectedCalcs.forEach(function(c){
        if(CALCULATORS[c]&&next.indexOf(c)===-1) next.push(c);
      });
      return next;
    });
  },[detectedCalcs,raw]);

  /* ── 임상 가이드 큐레이션 핸들러 (버튼·탭진입 양쪽에서 호출) ──
     ctx 빌드 로직은 buildCurationCtx 헬퍼로 일원화 (L3 Smoke #1과 DRY). */
  async function handleCuration(){
    if(!apiKey||curationLoading) return;
    var knowledgeCtx="";
    if(typeof KNOWLEDGE_BUNDLE!=="undefined"){
      var expandedCalcs=expandWithParents(detectedCalcs);
      expandedCalcs.forEach(function(c){
        var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
        knowledgeCtx+=buildCurationCtx(e,c).ctx;
      });
    }
    if(!knowledgeCtx) return;  /* C: Guide tab 노출 조건 강화로 도달 불가 — 안전 guard만 유지 */
    setCurationLoading(true); setCurationText("");
    try{
      var r=await generateKnowledgeCuration(raw,apiKey,knowledgeCtx);
      setCurationText(r);
    }catch(e){setCurationText("[오류: "+e.message+"]");}
    finally{setCurationLoading(false);}
  }

  /* ── 임상 가이드 탭 진입 시 자동 큐레이션 (한 번만) ── */
  useEffect(function(){
    if(leftTab!=="guide") return;
    if(curationText||curationLoading) return;
    if(!apiKey) return;
    var expandedCalcs=expandWithParents(detectedCalcs);
    var hasKnowledge=typeof KNOWLEDGE_BUNDLE!=="undefined"
      &&expandedCalcs.some(function(c){return !!KNOWLEDGE_BUNDLE[c];});
    if(!hasKnowledge) return;
    handleCuration();
  },[leftTab]);

  /* ─────────────────────────────────────────────────────────────
     Working Draft
  ───────────────────────────────────────────────────────────── */
  useEffect(function(){
    if(!liveEnabled||!apiKey) return;
    var trimmed=raw.trim();

    /* Working Draft — 50자↑ / 3s debounce */
    var cacheKey=trimmed+"|"+(detectedCalcs||[]).join(",");
    if(trimmed.length>=50&&cacheKey!==lastDraftRef.current){
      clearTimeout(draftTimerRef.current);
      draftTimerRef.current=setTimeout(async function(){
        if(cacheKey===lastDraftRef.current) return;
        lastDraftRef.current=cacheKey;
        setDraftLoading(true);
        try{
          var knowledgeCtx="";
          var appendParts=[];
          var draftTemplate=null;
          var expandedCalcs=expandWithParents(detectedCalcs);
          if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandedCalcs.length){
            expandedCalcs.forEach(function(c){
              var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
              if(e.sections){
                /* v2: draftAppend 키만 literal append. knowledgeCtx inject 없음 (3C와 묶음).
                       draftTemplate 소비 안 함 (Phase 4 UI wiring 시점). */
                var hooks=getUiHooks(e);
                (hooks.draftAppend||[]).forEach(function(k){
                  var s=e.sections[k];
                  if(s&&s.content) appendParts.push(s.content);
                });
              } else {
                if(e.treatment) knowledgeCtx+=e.treatment+"\n";
                if(e.differential) knowledgeCtx+=e.differential+"\n";
                if(e.draftAppend) appendParts.push(e.draftAppend);
                if(e.draftTemplate&&!draftTemplate) draftTemplate=e.draftTemplate;
              }
            });
          }
          var d=await generateWorkingDraft(trimmed,apiKey,followUpCtx,knowledgeCtx||null,draftTemplate);
          if(appendParts.length) d=d+"\n\n---\n"+appendParts.join("\n");
          setDraftText(d);
        }catch(_){}
        finally{setDraftLoading(false);}
      },3000);
    }

    return function(){
      clearTimeout(draftTimerRef.current);
    };
  },[raw,liveEnabled,apiKey,followUpCtx,detectedCalcs]);

  /* ── API 키 저장 ── */
  function saveKey(){
    var k=keyInput.trim(); if(!k) return;
    localStorage.setItem("cj_key",k);
    setApiKey(k); setKeyInput(""); setShowKey(false);
  }

  /* ── 음성인식 ── */
  function startRecording(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return;
    var r=new SR();
    r.lang="ko-KR"; r.continuous=true; r.interimResults=true;
    r.onresult=function(e){
      var interim="",final=finalTextRef.current;
      for(var i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal) final+=e.results[i][0].transcript;
        else interim+=e.results[i][0].transcript;
      }
      finalTextRef.current=final; setRaw(final); setInterimText(interim);
    };
    r.onerror=function(e){setVoiceMsg("음성 오류: "+e.error);setIsRecording(false);};
    r.onend=function(){setIsRecording(false);setInterimText("");};
    recognitionRef.current=r; r.start(); setIsRecording(true); setVoiceMsg("");
  }
  function stopRecording(){
    if(recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false); setInterimText("");
  }

  /* ── 세션 초기화 ── */
  function clearSession(){
    setRaw(""); finalTextRef.current="";
    setDraftText(""); setDraftLoading(false);
    setReviewText(""); setReviewLoading(false);
    setIsFollowUp(false);
    setDetectedCalcs([]); setActiveCalcs([]); setCalcInputs({}); setCalcResults({});
    lastDraftRef.current=""; clearTimeout(draftTimerRef.current);
    setRfKey(function(k){return k+1;});
    setTriageKey(function(k){return k+1;});
    setMissingKey(function(k){return k+1;});
  }

  /* ════════════════════════════════════════════ RENDER ════════════════════════════════════════════ */
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",
      background:"#0d1018",color:"#e2e4ec",
      fontFamily:"'Noto Sans KR',-apple-system,sans-serif",fontSize:14}}>

      {/* 면책 배너 */}
      <div style={{background:"rgba(245,166,35,.07)",borderBottom:"1px solid rgba(245,166,35,.16)",
        padding:"7px 14px",display:"flex",gap:8,alignItems:"flex-start",flexShrink:0}}>
        <span style={{color:"#f5a623",flexShrink:0}}>⚠</span>
        <span style={{fontSize:11,color:"rgba(245,166,35,.85)",lineHeight:1.65}}>
          <b>임상 문서 보조 도구.</b> 진단·처방 제안 아님. 모든 초안은 의사 직접 검토 후 EMR 입력.{" "}
          <b>환자 식별 정보 입력 금지. 녹음은 브라우저에서만 처리.</b>
        </span>
      </div>

      {/* 탑바 */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 14px",height:50,background:"#131924",
        borderBottom:"1px solid #1e2538",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:16,fontWeight:800,color:"#c96442",letterSpacing:"-.02em"}}>차트지</span>
          <span style={{fontSize:10,color:"#2e374f",background:"#0d1018",
            border:"1px solid #1e2538",padding:"2px 8px",borderRadius:20,
            fontFamily:"'JetBrains Mono',monospace"}}>FM v19</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:5,background:"#0d1018",
            border:"1px solid #1e2538",padding:"4px 10px",borderRadius:20}}>
            <span style={{width:6,height:6,borderRadius:"50%",
              background:isRecording?"#f87171":"#1e2538",display:"inline-block",
              animation:isRecording?"blink 1.2s ease-in-out infinite":"none"}}/>
            <span style={{fontSize:11,color:isRecording?"#f87171":"#4a5268",fontWeight:600}}>
              {isRecording?"녹음 중":"대기"}</span>
          </div>
          <button onClick={function(){setShowKey(function(v){return !v;});}}
            style={{fontSize:11,padding:"4px 10px",borderRadius:5,background:"none",
              color:apiKey?"#34c77b":"#f5a623",
              border:"1px solid "+(apiKey?"rgba(52,199,123,.3)":"rgba(245,166,35,.3)")}}>
            {apiKey?"🔑 키 등록됨":"🔑 API 키 입력"}
          </button>
          <button onClick={function(){setCompactMode(function(v){return !v;});}}
            style={{fontSize:11,padding:"4px 10px",borderRadius:5,background:"none",
              color:compactMode?"#a78bfa":"#4a5268",
              border:"1px solid "+(compactMode?"rgba(167,139,250,.3)":"#1e2538")}}>
            {compactMode?"⊞ 전체":"⊡ 간략"}
          </button>
        </div>
      </div>

      {/* API 키 패널 */}
      {!compactMode&&showKey&&(
        <div style={{background:"#131924",borderBottom:"1px solid #1e2538",
          padding:"14px 16px",flexShrink:0,animation:"slideDown .2s ease"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#4a5268",marginBottom:10,
            fontFamily:"'JetBrains Mono',monospace"}}>🔑 Anthropic API 키</div>
          <div style={{display:"flex",gap:8,marginBottom:8}}>
            <input type="password" value={keyInput}
              onChange={function(e){setKeyInput(e.target.value);}}
              onKeyDown={function(e){if(e.key==="Enter")saveKey();}}
              placeholder="sk-ant-api03-..."
              style={{flex:1,background:"#0d1018",border:"1px solid #1e2538",
                borderRadius:7,padding:"9px 12px",color:"#e2e4ec",fontSize:13}}/>
            <button onClick={saveKey}
              style={{background:"#c96442",color:"#fff",borderRadius:7,
                padding:"9px 20px",fontSize:13,fontWeight:700}}>저장</button>
          </div>
          {apiKey&&!keyInput&&<div style={{fontSize:11,color:"#34c77b",marginBottom:6}}>✓ 키 등록됨</div>}
          <div style={{fontSize:11,color:"#2e374f",lineHeight:1.8}}>
            👉 <a href="https://console.anthropic.com" target="_blank" rel="noreferrer"
              style={{color:"#c96442"}}>console.anthropic.com</a> → API Keys → Create Key
          </div>
        </div>
      )}

      {/* ── 2-column: transcript (left) | 4-panel dashboard (right) ── */}
      <div style={{flex:1,padding:12,overflowY:"auto"}}>

        {/* ── 컨트롤 바 ── */}
        {!compactMode&&<div style={{background:"#131924",
          border:"1px solid "+(isRecording?"rgba(248,113,113,.3)":"#1e2538"),
          borderRadius:10,padding:"8px 12px",marginBottom:10,
          display:"flex",flexDirection:"column",gap:6}}>
          {/* 상단: 체크박스 + 버튼 한 줄 */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            {/* 동의 체크박스 */}
            <div onClick={function(){setConsent(function(v){return !v;});}}
              style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",userSelect:"none"}}>
              <div style={{width:15,height:15,borderRadius:3,flexShrink:0,
                border:"2px solid "+(consent?"#c96442":"#2e374f"),
                background:consent?"#c96442":"transparent",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {consent&&<span style={{color:"#fff",fontSize:10,fontWeight:900,lineHeight:1}}>✓</span>}
              </div>
              <span style={{fontSize:11,color:consent?"#94a3b8":"#4a5268"}}>동의</span>
            </div>
            {/* 구분선 */}
            <span style={{color:"#1e2538",fontSize:12}}>|</span>
            {/* 재진 체크박스 */}
            <div onClick={function(){setIsFollowUp(function(v){return !v;});}}
              style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",userSelect:"none"}}>
              <div style={{width:15,height:15,borderRadius:3,flexShrink:0,
                border:"2px solid "+(isFollowUp?"#60a5fa":"#2e374f"),
                background:isFollowUp?"#60a5fa":"transparent",
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {isFollowUp&&<span style={{color:"#fff",fontSize:10,fontWeight:900,lineHeight:1}}>✓</span>}
              </div>
              <span style={{fontSize:11,color:isFollowUp?"#60a5fa":"#4a5268",fontWeight:isFollowUp?600:400}}>재진</span>
            </div>
            {/* 구분선 */}
            <span style={{color:"#1e2538",fontSize:12}}>|</span>
            {/* 녹음 버튼 */}
            {!voiceOk?(
              <span style={{fontSize:11,color:"#f5a623"}}>⚠ Chrome 전용</span>
            ):!isRecording?(
              <button onClick={startRecording} disabled={!consent}
                style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:6,
                  cursor:consent?"pointer":"not-allowed",
                  background:consent?"#c96442":"transparent",
                  color:consent?"#fff":"#2e374f",
                  border:"1px solid "+(consent?"#c96442":"#2e374f"),
                  display:"flex",alignItems:"center",gap:5}}>
                🎙 녹음 시작
              </button>
            ):(
              <button onClick={stopRecording}
                style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:6,
                  cursor:"pointer",background:"rgba(248,113,113,.1)",color:"#f87171",
                  border:"1px solid rgba(248,113,113,.4)",
                  display:"flex",alignItems:"center",gap:5,
                  animation:"blink 1.4s ease-in-out infinite"}}>
                <span style={{width:8,height:8,borderRadius:2,background:"#f87171",display:"inline-block"}}/>
                녹음 중지
              </button>
            )}
            {/* 초기화 */}
            <button onClick={clearSession}
              style={{fontSize:11,color:"#4a5268",padding:"4px 10px",
                borderRadius:6,border:"1px solid #1e2538",background:"none"}}>
              🗑 초기화
            </button>
          </div>
          {/* interim text */}
          {interimText&&(
            <div style={{fontSize:11,color:"#60a5fa",fontStyle:"italic",
              borderTop:"1px dashed rgba(96,165,250,.2)",paddingTop:5,lineHeight:1.6}}>
              <span style={{fontSize:9,color:"#2e374f",fontStyle:"normal",marginRight:6}}>인식 중...</span>
              {interimText}
            </div>
          )}
          {voiceMsg&&<div style={{fontSize:11,color:"#4a5268",lineHeight:1.5}}>ℹ {voiceMsg}</div>}
        </div>}

        <div className="input-layout">

          {/* LEFT: Working Draft / Raw 탭 */}
          {!compactMode&&<div className="input-left">
            <div style={{background:"#131924",border:"1px solid #1e2538",
              borderRadius:12,padding:14,display:"flex",flexDirection:"column"}}>

              {/* 헤더: 탭 + 예시 버튼 */}
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:8}}>
                {/* 좌: 탭 */}
                <div style={{display:"flex",gap:2,alignItems:"center"}}>
                  {["raw","draft"].map(function(tab){
                    var on=leftTab===tab;
                    var tabColor=tab==="draft"?"#60a5fa":"#94a3b8";
                    var tabBorder=tab==="draft"?"rgba(96,165,250,.3)":"#1e2538";
                    var tabLabel=tab==="raw"?"전사":"Working Draft";
                    var isDraft=tab==="draft";
                    return (
                      <button key={tab}
                        onClick={function(){setLeftTab(tab);}}
                        style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:5,
                          color:on?tabColor:"#2e374f",
                          background:on?"#0d1018":"transparent",
                          border:"1px solid "+(on?tabBorder:"transparent"),
                          cursor:"pointer",letterSpacing:".05em",textTransform:"uppercase",
                          fontFamily:"'JetBrains Mono',monospace",
                          display:"flex",alignItems:"center",gap:4}}>
                        {tabLabel}
                        {isDraft&&draftLoading&&(
                          <span style={{width:6,height:6,border:"1px solid #252d42",
                            borderTopColor:"#60a5fa",borderRadius:"50%",display:"inline-block",
                            animation:"spin .65s linear infinite"}}/>
                        )}
                        {isDraft&&!draftLoading&&draftText&&(
                          <span style={{fontSize:8,color:"rgba(96,165,250,.5)"}}>✓</span>
                        )}
                      </button>
                    );
                  })}
                  {/* 📖 임상 가이드 탭 — 실제 큐레이션 가능한 섹션이 있을 때만 노출 (C 개선).
                       uiHooks.guide ∩ sections 교집합이 공집합이면 탭 자체 숨김. */}
                  {typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandWithParents(detectedCalcs).some(function(c){return hasGuidableContent(KNOWLEDGE_BUNDLE[c]);})&&(function(){
                    var on=leftTab==="guide";
                    return (
                      <button key="guide"
                        onClick={function(){setLeftTab("guide");}}
                        style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:5,
                          color:on?"#a78bfa":"#2e374f",
                          background:on?"#0d1018":"transparent",
                          border:"1px solid "+(on?"rgba(167,139,250,.35)":"transparent"),
                          cursor:"pointer",letterSpacing:".05em",
                          fontFamily:"'JetBrains Mono',monospace",
                          display:"flex",alignItems:"center",gap:4}}>
                        📖 임상 가이드
                        {curationLoading&&(
                          <span style={{width:6,height:6,border:"1px solid #252d42",
                            borderTopColor:"#a78bfa",borderRadius:"50%",display:"inline-block",
                            animation:"spin .65s linear infinite"}}/>
                        )}
                        {!curationLoading&&curationText&&(
                          <span style={{fontSize:8,color:"rgba(167,139,250,.6)"}}>✓</span>
                        )}
                      </button>
                    );
                  })()}
                  <CalcTabHeaders activeCalcs={activeCalcs} leftTab={leftTab}
                    setLeftTab={setLeftTab} setActiveCalcs={setActiveCalcs}/>
                  {leftTab==="raw"&&isRecording&&(
                    <span style={{fontSize:9,color:"#f87171",
                      background:"rgba(248,113,113,.1)",
                      border:"1px solid rgba(248,113,113,.3)",
                      padding:"2px 7px",borderRadius:10,marginLeft:4}}>● 자동 입력 중</span>
                  )}
                </div>
                {/* 우: 지우기 버튼 */}
                <div style={{display:"flex",gap:6}}>
                  {raw&&<button onClick={function(){setRaw("");finalTextRef.current="";}}
                    style={{fontSize:11,color:"#4a5268",padding:"4px 10px",
                      borderRadius:5,border:"1px solid #1e2538",background:"none"}}>지우기</button>}
                </div>
              </div>

              {/* 전사 탭 */}
              {leftTab==="raw"&&(
                <>
                  <textarea ref={taRef} value={raw}
                    onChange={function(e){setRaw(e.target.value);finalTextRef.current=e.target.value;}}
                    style={{background:"#0d1018",border:"1px solid #1e2538",borderRadius:8,
                      padding:"10px 12px",color:"#e2e4ec",fontSize:13,lineHeight:1.75,
                      minHeight:240,resize:"vertical"}}
                    placeholder={"🎙 녹음 또는 직접 타이핑\n\n화자 라벨 없어도 됩니다. 대화체 그대로.\n\n⚠ 환자 이름·주민번호 입력 금지"}/>
                  <div style={{fontSize:10,color:"#2e374f",textAlign:"right",marginTop:4,
                    fontFamily:"'JetBrains Mono',monospace"}}>{raw.length}자</div>
                </>
              )}

              {/* Working Draft 탭 */}
              {leftTab==="draft"&&(
                <DraftTab draftText={draftText} draftLoading={draftLoading}
                  reviewText={reviewText} reviewLoading={reviewLoading} apiKey={apiKey}
                  draftHints={draftHints}
                  onDraftChange={function(v){setDraftText(v);}}
                  onReview={async function(){
                    if(!apiKey||reviewLoading) return;
                    setReviewLoading(true); setReviewText("");
                    try{
                      var reviewPrompt=DRAFT_REVIEW_PROMPT.replace("{{CLINIC_SCOPE}}",CLINIC_SCOPE);
                      var knowledgeCtx="";
                      var expandedCalcs=expandWithParents(detectedCalcs);
                      if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandedCalcs.length){
                        expandedCalcs.forEach(function(c){
                          var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
                          if(e.sections) return;  /* v2: knowledgeCtx inject 없음 (3C와 묶음) */
                          if(e.treatment) knowledgeCtx+=e.treatment+"\n";
                          if(e.differential) knowledgeCtx+=e.differential+"\n";
                        });
                      }
                      var r=await generateDraftReview(raw,apiKey,reviewPrompt,knowledgeCtx||null);
                      setReviewText(r);
                    }catch(e){setReviewText("[오류: "+e.message+"]");}
                    finally{setReviewLoading(false);}
                  }}/>
              )}

              {/* 📖 임상 가이드 탭 콘텐츠 */}
              {leftTab==="guide"&&(
                <GuideTab
                  curationText={curationText} curationLoading={curationLoading}
                  apiKey={apiKey}
                  detectedKeys={typeof KNOWLEDGE_BUNDLE!=="undefined"
                    ? expandWithParents(detectedCalcs).filter(function(c){return !!KNOWLEDGE_BUNDLE[c];})
                    : []}
                  onCurate={handleCuration}/>
              )}

              {/* 계산기 탭 콘텐츠 */}
              {leftTab.indexOf("calc-")===0&&(function(){
                var calcKey=leftTab.replace("calc-","");
                var calc=CALCULATORS[calcKey];
                if(!calc) return null;
                var inputs=calcInputs[calcKey]||{};
                function setField(fieldId,value){
                  setCalcInputs(function(prev){
                    var updated=Object.assign({},prev);
                    var calcFields=Object.assign({},updated[calcKey]||{});
                    calcFields[fieldId]=value;
                    updated[calcKey]=calcFields;
                    return updated;
                  });
                }
                return (
                  <CalcTabContent calcKey={calcKey} calc={calc} inputs={inputs}
                    setField={setField} calcResults={calcResults}
                    onCalculate={function(){
                      var result=calc.calculate(inputs);
                      setCalcResults(function(prev){
                        var updated=Object.assign({},prev);
                        updated[calcKey]=result;
                        return updated;
                      });
                    }}/>
                );
              })()}

              <div style={{marginTop:10,padding:"9px 12px",
                background:"rgba(96,165,250,.04)",
                border:"1px solid rgba(96,165,250,.12)",borderRadius:8}}>
                <div style={{fontSize:11,color:"#4a5268",lineHeight:1.7}}>
                  v19 · Triage 10자↑·900ms / RedFlag 20자↑·1.2s / Missing 30자↑·1.8s / Draft 50자↑·3s
                </div>
                <div style={{fontSize:10,color:"#2e374f",marginTop:3}}>
                  각 패널 독립 갱신 · Working Draft 실시간 구조화
                </div>
              </div>
            </div>
          </div>}

          {/* RIGHT: 4-panel safety dashboard */}
          <div className={compactMode?"compact-right":"input-right"}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
              marginBottom:7,padding:"0 2px"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:5,height:5,borderRadius:"50%",
                  background:liveEnabled?"#60a5fa":"#2e374f",display:"inline-block"}}/>
                <span style={{fontSize:9,fontWeight:700,color:"#4a5268",
                  textTransform:"uppercase",letterSpacing:".07em",
                  fontFamily:"'JetBrains Mono',monospace"}}>안전 보조 패널</span>
                {followUpCtx.trim()&&(
                  <span style={{fontSize:8,color:"rgba(96,165,250,.6)",
                    background:"rgba(96,165,250,.08)",border:"1px solid rgba(96,165,250,.2)",
                    borderRadius:8,padding:"1px 5px",fontFamily:"'JetBrains Mono',monospace"}}>
                    재진 ctx
                  </span>
                )}
              </div>
              <button onClick={function(){setLiveEnabled(function(v){return !v;});}}
                style={{fontSize:10,color:liveEnabled?"#60a5fa":"#4a5268",background:"none",
                  border:"1px solid "+(liveEnabled?"rgba(96,165,250,.3)":"#1e2538"),
                  borderRadius:5,padding:"2px 9px",cursor:"pointer"}}>
                {liveEnabled?"ON":"OFF"}
              </button>
            </div>

            <RedFlagPanel key={"rf-"+rfKey} raw={raw} apiKey={apiKey}/>
            <MissingPanel key={"missing-"+missingKey} raw={raw} apiKey={apiKey} followUpCtx={followUpCtx}/>
            <TriagePanel key={"triage-"+triageKey} raw={raw} apiKey={apiKey} followUpCtx={followUpCtx}
              onDetect={function(cats){setDetectedCalcs(cats||[]);}}
              differentialShort={differentialShort}/>

          </div>

        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
