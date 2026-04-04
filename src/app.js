const {useState,useRef,useEffect}=React;
/* ══════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════ */
function App(){

  /* ── UI state ── */
  var [raw,       setRaw]       = useState("");
  var [consent,   setConsent]   = useState(false);
  var [autoDelete,setAutoDelete]= useState(false);

  /* ── 재진 Context ── */
  var [followUpCtx,  setFollowUpCtx]  = useState("");
  var [showCtxInput, setShowCtxInput] = useState(false);

  /* ── Working Draft ── */
  var [draftText,   setDraftText]   = useState("");
  var [draftLoading,setDraftLoading]= useState(false);
  var [leftTab,     setLeftTab]     = useState("raw"); /* "raw" | "draft" */

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


  /* ─────────────────────────────────────────────────────────────
     Working Draft
  ───────────────────────────────────────────────────────────── */
  useEffect(function(){
    if(!liveEnabled||!apiKey) return;
    var trimmed=raw.trim();

    /* Working Draft — 50자↑ / 3s debounce */
    if(trimmed.length>=50&&trimmed!==lastDraftRef.current){
      clearTimeout(draftTimerRef.current);
      draftTimerRef.current=setTimeout(async function(){
        if(trimmed===lastDraftRef.current) return;
        lastDraftRef.current=trimmed;
        setDraftLoading(true);
        try{
          var templateContent=Object.keys(TEMPLATES)
            .map(function(key){return "["+key+"]\n"+TEMPLATES[key];})
            .join("\n\n");
          var draftPrompt=WORKING_DRAFT_PROMPT.replace("{{TEMPLATE_CONTENT}}",templateContent);
          var d=await generateWorkingDraft(trimmed,apiKey,followUpCtx,draftPrompt);
          setDraftText(d);
        }catch(_){}
        finally{setDraftLoading(false);}
      },3000);
    }

    return function(){
      clearTimeout(draftTimerRef.current);
    };
  },[raw,liveEnabled,apiKey,followUpCtx]);

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
    setFollowUpCtx("");
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
            fontFamily:"'JetBrains Mono',monospace"}}>FM v15</span>
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
        </div>
      </div>

      {/* API 키 패널 */}
      {showKey&&(
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

        {/* 사용 설정 */}
        <div style={{background:"#131924",border:"1px solid #1e2538",
          borderRadius:12,padding:14,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#4a5268",textTransform:"uppercase",
            letterSpacing:".08em",marginBottom:12,
            fontFamily:"'JetBrains Mono',monospace"}}>사용 설정</div>
          <div onClick={function(){setConsent(function(v){return !v;});}}
            style={{display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",marginBottom:12}}>
            <div style={{width:18,height:18,borderRadius:4,flexShrink:0,marginTop:1,
              border:"2px solid "+(consent?"#c96442":"#2e374f"),
              background:consent?"#c96442":"transparent",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              {consent&&<span style={{color:"#fff",fontSize:12,fontWeight:900,lineHeight:1}}>✓</span>}
            </div>
            <span style={{fontSize:12,color:"#94a3b8",lineHeight:1.75}}>
              음성 전사 사용에 동의합니다. 녹음은 브라우저에서만 처리되며 외부 저장 없음. 환자 식별 정보 미포함 주의.
            </span>
          </div>

          {/* ── 재진 Context ── */}
          <div style={{paddingTop:10,borderTop:"1px solid #1e2538"}}>
            <div onClick={function(){setShowCtxInput(function(v){return !v;});}}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                cursor:"pointer",userSelect:"none"}}>
              <span style={{fontSize:11,fontWeight:600,
                color:followUpCtx.trim()?"#60a5fa":"#4a5268",
                display:"flex",alignItems:"center",gap:5}}>
                재진 Context
                {followUpCtx.trim()&&(
                  <span style={{fontSize:9,background:"rgba(96,165,250,.15)",
                    border:"1px solid rgba(96,165,250,.3)",color:"#60a5fa",
                    borderRadius:10,padding:"1px 6px",fontFamily:"'JetBrains Mono',monospace"}}>ON</span>
                )}
              </span>
              <span style={{fontSize:9,color:"#2e374f"}}>{showCtxInput?"▲":"▼"}</span>
            </div>
            {showCtxInput&&(
              <div style={{marginTop:8,animation:"slideDown .15s ease"}}>
                <textarea value={followUpCtx}
                  onChange={function(e){setFollowUpCtx(e.target.value);}}
                  rows={3}
                  placeholder={"예) DM f/u. 지난달 HbA1c 8.2. metformin 500mg bid 복용 중.\n비워두면 초진과 동일하게 동작."}
                  style={{width:"100%",background:"#0d1018",
                    border:"1px solid rgba(96,165,250,.2)",
                    borderRadius:6,padding:"8px 10px",color:"#94a3b8",fontSize:12,
                    lineHeight:1.65,resize:"vertical"}}/>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",marginTop:4}}>
                  <span style={{fontSize:10,color:"#2e374f"}}>
                    ⚑ Red Flag 판단에 영향 없음
                  </span>
                  <span style={{fontSize:10,color:"#2e374f",
                    fontFamily:"'JetBrains Mono',monospace"}}>
                    {followUpCtx.length}자
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 음성 컨트롤 */}
        <div style={{background:"#131924",
          border:"1px solid "+(isRecording?"rgba(248,113,113,.35)":"#1e2538"),
          borderRadius:12,padding:14,marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:700,color:"#4a5268",textTransform:"uppercase",
            letterSpacing:".08em",marginBottom:12,
            fontFamily:"'JetBrains Mono',monospace"}}>음성 입력</div>
          {!voiceOk?(
            <div style={{padding:"10px 12px",background:"rgba(245,166,35,.07)",
              border:"1px solid rgba(245,166,35,.2)",borderRadius:8,fontSize:12,
              color:"#f5a623",lineHeight:1.7}}>
              ⚠ Chrome 브라우저에서만 음성인식이 지원됩니다.
            </div>
          ):(
            <div>
              <div style={{display:"flex",gap:8,marginBottom:10}}>
                {!isRecording?(
                  <button onClick={startRecording} disabled={!consent}
                    style={{flex:1,padding:"12px 0",fontSize:14,fontWeight:700,
                      borderRadius:8,cursor:consent?"pointer":"not-allowed",
                      background:consent?"#c96442":"#1e2538",
                      color:consent?"#fff":"#4a5268",
                      display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                    <span style={{fontSize:18}}>🎙</span> 녹음 시작
                  </button>
                ):(
                  <button onClick={stopRecording}
                    style={{flex:1,padding:"12px 0",fontSize:14,fontWeight:700,
                      borderRadius:8,cursor:"pointer",
                      background:"rgba(248,113,113,.1)",color:"#f87171",
                      border:"1px solid rgba(248,113,113,.4)",
                      display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                      animation:"blink 1.4s ease-in-out infinite"}}>
                    <span style={{width:12,height:12,borderRadius:2,
                      background:"#f87171",display:"inline-block"}}/> 녹음 중지
                  </button>
                )}
                <button onClick={clearSession}
                  style={{background:"#0d1018",color:"#4a5268",
                    border:"1px solid #1e2538",borderRadius:8,
                    padding:"12px 14px",fontSize:13,fontWeight:600}}>🗑 초기화</button>
              </div>
              {interimText&&(
                <div style={{padding:"8px 10px",background:"rgba(96,165,250,.05)",
                  border:"1px dashed rgba(96,165,250,.25)",borderRadius:6,
                  fontSize:12,color:"#60a5fa",lineHeight:1.75,marginBottom:8,fontStyle:"italic"}}>
                  <span style={{fontSize:10,color:"#2e374f",display:"block",
                    marginBottom:2,fontStyle:"normal"}}>인식 중...</span>
                  {interimText}
                </div>
              )}
            </div>
          )}
          {voiceMsg&&<div style={{fontSize:12,color:"#4a5268",lineHeight:1.6,marginTop:8}}>ℹ {voiceMsg}</div>}
        </div>

        <div className="input-layout">

          {/* LEFT: Working Draft / Raw 탭 */}
          <div className="input-left">
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
                  {leftTab==="raw"&&isRecording&&(
                    <span style={{fontSize:9,color:"#f87171",
                      background:"rgba(248,113,113,.1)",
                      border:"1px solid rgba(248,113,113,.3)",
                      padding:"2px 7px",borderRadius:10,marginLeft:4}}>● 자동 입력 중</span>
                  )}
                </div>
                {/* 우: 예시/지우기 버튼 */}
                <div style={{display:"flex",gap:6}}>
                  <button onClick={function(){setRaw(SAMPLE);finalTextRef.current=SAMPLE;setVoiceMsg("예시(단순) 입력됨.");}}
                    style={{fontSize:11,color:"#4a5268",padding:"4px 10px",
                      borderRadius:5,border:"1px solid #1e2538",background:"none"}}>예시(단순)</button>
                  <button onClick={function(){setRaw(SAMPLE_COMPLEX);finalTextRef.current=SAMPLE_COMPLEX;setVoiceMsg("예시(복합) 입력됨.");}}
                    style={{fontSize:11,color:"#f5a623",padding:"4px 10px",
                      borderRadius:5,border:"1px solid rgba(245,166,35,.3)",background:"none"}}>예시(복합)</button>
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
                <div style={{background:"#0d1018",border:"1px solid #1e2538",borderRadius:8,
                  padding:"10px 12px",minHeight:240,overflowY:"auto",fontSize:12.5,
                  color:"#94a3b8",lineHeight:1.9,
                  fontFamily:"'JetBrains Mono',monospace",whiteSpace:"pre-wrap"}}>
                  {draftLoading&&!draftText&&(
                    <div style={{display:"flex",alignItems:"center",gap:6,color:"#2e374f",fontStyle:"italic"}}>
                      <span style={{width:8,height:8,border:"1.5px solid #252d42",
                        borderTopColor:"#60a5fa",borderRadius:"50%",display:"inline-block",
                        animation:"spin .65s linear infinite"}}/>
                      Working Draft 생성 중...
                    </div>
                  )}
                  {!draftLoading&&!draftText&&(
                    <span style={{color:"#2e374f",fontStyle:"italic"}}>
                      전사 탭에 50자 이상 입력되면 자동 생성됩니다.
                    </span>
                  )}
                  {draftText&&(
                    <div>
                      <div style={{fontSize:9,fontWeight:700,color:"#2e374f",
                        textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,
                        borderBottom:"1px solid #1e2538",paddingBottom:4}}>
                        Working Draft — 의사 검토 필수
                        {draftLoading&&(
                          <span style={{marginLeft:8,width:6,height:6,border:"1px solid #252d42",
                            borderTopColor:"#60a5fa",borderRadius:"50%",display:"inline-block",
                            animation:"spin .65s linear infinite",verticalAlign:"middle"}}/>
                        )}
                      </div>
                      {draftText}
                    </div>
                  )}
                </div>
              )}

              <div style={{marginTop:10,padding:"9px 12px",
                background:"rgba(96,165,250,.04)",
                border:"1px solid rgba(96,165,250,.12)",borderRadius:8}}>
                <div style={{fontSize:11,color:"#4a5268",lineHeight:1.7}}>
                  v15 · Triage 10자↑·900ms / RedFlag 20자↑·1.2s / Missing 30자↑·1.8s / Draft 50자↑·3s
                </div>
                <div style={{fontSize:10,color:"#2e374f",marginTop:3}}>
                  각 패널 독립 갱신 · Working Draft 실시간 구조화
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 4-panel safety dashboard */}
          <div className="input-right">
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

            <RedFlagPanel key={rfKey} raw={raw} apiKey={apiKey}/>
            <MissingPanel key={missingKey} raw={raw} apiKey={apiKey} followUpCtx={followUpCtx}/>
            <TriagePanel key={triageKey} raw={raw} apiKey={apiKey} followUpCtx={followUpCtx}/>
          </div>

        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
