const {useState,useRef,useEffect}=React;

function TriagePanel(props){
  var raw=props.raw, apiKey=props.apiKey, followUpCtx=props.followUpCtx, onDetect=props.onDetect,
      differentialShort=props.differentialShort||null;
  var [data,setData]=useState(null);
  var [loading,setLoading]=useState(false);
  var timerRef=useRef(null);
  var lastRef=useRef("");

  var localCC=detectLocalCC(raw||"");

  useEffect(function(){
    if(!apiKey) return;
    var trimmed=raw?raw.trim():"";
    if(trimmed.length<10||trimmed===lastRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(async function(){
      if(trimmed===lastRef.current) return;
      lastRef.current=trimmed;
      setLoading(true);
      try{
        var result=await generateTriagePanel(trimmed,apiKey,followUpCtx);
        setData(result); setLoading(false);
        if(onDetect&&result&&result.calcCategories){onDetect(result.calcCategories);}
      }catch(e){
        setLoading(false);
      }
    },900);
    return function(){clearTimeout(timerRef.current);};
  },[raw,apiKey,followUpCtx]);

  var cc=(data&&data.chiefComplaint)||localCC||null;

  if(!cc&&!loading) return null;

  return (
    <div style={{
      marginBottom:8,
      padding:"5px 10px",
      border:"1px solid rgba(245,166,35,.18)",
      borderLeft:"2px solid rgba(245,166,35,.35)",
      borderRadius:7,
      background:"rgba(245,166,35,.03)",
      display:"flex",flexDirection:"column",gap:4,
    }}>
      {/* CC 행 */}
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <span style={{fontSize:8,fontWeight:700,color:"rgba(245,166,35,.55)",
          fontFamily:"'JetBrains Mono',monospace",flexShrink:0,textTransform:"uppercase",
          letterSpacing:".06em"}}>CC</span>
        {cc?(
          <span style={{fontSize:12,color:"#c9a84c",fontWeight:600,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1}}>
            {cc}
          </span>
        ):(
          <span style={{fontSize:11,color:"#3a3018",fontStyle:"italic"}}>분석 중...</span>
        )}
        {loading&&(
          <span style={{width:7,height:7,border:"1px solid rgba(245,166,35,.2)",
            borderTopColor:"rgba(245,166,35,.6)",borderRadius:"50%",display:"inline-block",
            animation:"spin .7s linear infinite",flexShrink:0}}/>
        )}
      </div>
      {/* differentialShort 렌더링 비활성화 — Boss 권고 (risk>benefit) */}
      {/* 데이터/파이프라인은 유지, 재활성화 필요 시 위 블록 복원 */}
    </div>
  );
}

function MissingPanel(props){
  var raw=props.raw, apiKey=props.apiKey, followUpCtx=props.followUpCtx;
  var [data,setData]=useState(null);
  var [loading,setLoading]=useState(false);
  var [error,setError]=useState("");
  var timerRef=useRef(null);
  var lastRef=useRef("");

  useEffect(function(){
    if(!apiKey) return;
    var trimmed=raw?raw.trim():"";
    if(trimmed.length<30||trimmed===lastRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(async function(){
      if(trimmed===lastRef.current) return;
      lastRef.current=trimmed;
      setLoading(true); setError("");
      try{
        var result=await generateMissingPanel(trimmed,apiKey,followUpCtx);
        setData(result); setLoading(false);
      }catch(e){
        setError(e.message||"Missing 오류"); setLoading(false);
      }
    },1800);
    return function(){clearTimeout(timerRef.current);};
  },[raw,apiKey,followUpCtx]);

  var hasAny=data&&(
    (data.missingQuestions&&data.missingQuestions.length>0)||
    (data.missingExam&&data.missingExam.length>0)||
    (data.missingObjectiveData&&data.missingObjectiveData.length>0)
  );

  return (
    <PanelCard title="Missing Checklist" icon="✓"
      loading={loading} borderColor="#34c77b" headerBg="rgba(52,199,123,.04)">
      {!data&&!loading&&!error&&<PanelEmpty/>}
      {data&&!hasAny&&<PanelEmpty text="현재 명확한 누락 항목 없음"/>}
      {data&&hasAny&&(
        <div style={{animation:"fadeIn .2s ease"}}>
          {data.missingQuestions&&data.missingQuestions.length>0&&(
            <div style={{marginBottom:6}}>
              <SubLabel icon="❓" title="미확인 질문" color="#34c77b"/>
              <BulletList items={data.missingQuestions} color="#34c77b" small={true}/>
            </div>
          )}
          {data.missingExam&&data.missingExam.length>0&&(
            <div style={{marginBottom:6}}>
              <SubLabel icon="🩺" title="미시행 진찰" color="#60a5fa"/>
              <BulletList items={data.missingExam} color="#60a5fa" small={true}/>
            </div>
          )}
          {data.missingObjectiveData&&data.missingObjectiveData.length>0&&(
            <div>
              <SubLabel icon="📊" title="미확인 객관 데이터" color="#a78bfa"/>
              <BulletList items={data.missingObjectiveData} color="#a78bfa" small={true}/>
            </div>
          )}
        </div>
      )}
      {error&&<div style={{fontSize:10,color:"#f87171",fontStyle:"italic",marginTop:4}}>⚠ {error}</div>}
    </PanelCard>
  );
}

function RedFlagPanel(props){
  var raw=props.raw, apiKey=props.apiKey;
  var [data,setData]=useState(null);
  var [loading,setLoading]=useState(false);
  var [error,setError]=useState("");
  var timerRef=useRef(null);
  var lastRef=useRef("");

  useEffect(function(){
    if(!apiKey) return;
    var trimmed=raw?raw.trim():"";
    if(trimmed.length<20||trimmed===lastRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(async function(){
      if(trimmed===lastRef.current) return;
      lastRef.current=trimmed;
      setLoading(true); setError("");
      try{
        /* ⚠ ctx 주입 금지 — transcript 기준으로만 */
        var result=await generateRedFlagPanel(trimmed,apiKey);
        setData(result); setLoading(false);
      }catch(e){
        setError(e.message||"RedFlag 오류"); setLoading(false);
      }
    },1200);
    return function(){clearTimeout(timerRef.current);};
  },[raw,apiKey]);

  var findings=data&&data.findings?data.findings:[];
  var hasHigh=findings.some(function(f){return f.severity==="high";});

  var sevStyle={
    high:    {color:"#f87171",bg:"rgba(248,113,113,.1)",border:"rgba(248,113,113,.45)"},
    moderate:{color:"#f5a623",bg:"rgba(245,166,35,.08)",border:"rgba(245,166,35,.35)"},
    clarify: {color:"#fbbf24",bg:"rgba(251,191,36,.07)",border:"rgba(251,191,36,.3)"},
  };

  return (
    <PanelCard title="Red Flag Detector" icon="⚑"
      loading={loading}
      borderColor={hasHigh?"#f87171":"#4a5268"}
      headerBg={hasHigh?"rgba(248,113,113,.07)":"rgba(74,82,104,.04)"}>
      {!data&&!loading&&!error&&<PanelEmpty/>}
      {data&&findings.length===0&&<PanelEmpty text="감지된 위험 신호 없음"/>}
      {data&&findings.length>0&&(
        <div style={{animation:"fadeIn .2s ease",display:"flex",flexDirection:"column",gap:5}}>
          {findings.map(function(f,i){
            var ss=sevStyle[f.severity]||sevStyle.clarify;
            return (
              <div key={i} style={{padding:"5px 8px",background:ss.bg,
                border:"1px solid "+ss.border,borderRadius:5}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span style={{fontSize:8,fontWeight:700,color:ss.color,
                    background:"rgba(0,0,0,.25)",border:"1px solid "+ss.border,
                    borderRadius:3,padding:"1px 5px",fontFamily:"'JetBrains Mono',monospace",
                    flexShrink:0,textTransform:"uppercase"}}>{f.severity}</span>
                  <span style={{fontSize:12,fontWeight:700,color:"#e2e4ec",lineHeight:1.3}}>
                    {f.label}
                  </span>
                </div>
                {f.reason&&(
                  <div style={{fontSize:10.5,color:"#94a3b8",lineHeight:1.5,marginBottom:f.actionCue?2:0}}>
                    {f.reason}
                  </div>
                )}
                {f.actionCue&&(
                  <div style={{fontSize:10.5,fontWeight:700,color:ss.color}}>→ {f.actionCue}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {error&&<div style={{fontSize:10,color:"#f87171",fontStyle:"italic",marginTop:4}}>⚠ {error}</div>}
    </PanelCard>
  );
}

function sanitizeProblemSummary(text){
  if(!text) return "";
  var banned=["가능성","확인 필요","평가 필요","고려","의심","제안","권장","다약제","polypharmacy","상호작용","주의"];
  for(var i=0;i<banned.length;i++){
    if(text.indexOf(banned[i])!==-1) return "";
  }
  return text;
}

function ProblemsPanel(props){
  var raw=props.raw, apiKey=props.apiKey, followUpCtx=props.followUpCtx, onData=props.onData;
  var [data,setData]=useState(null);
  var [loading,setLoading]=useState(false);
  var [error,setError]=useState("");
  var timerRef=useRef(null);
  var lastRef=useRef("");

  useEffect(function(){
    if(!apiKey) return;
    var trimmed=raw?raw.trim():"";
    if(trimmed.length<50||trimmed===lastRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(async function(){
      if(trimmed===lastRef.current) return;
      lastRef.current=trimmed;
      setLoading(true); setError("");
      try{
        var result=await generateProblemsPanel(trimmed,apiKey,followUpCtx);
        setData(result); setLoading(false);
        if(onData) onData(result);
      }catch(e){
        setError(e.message||"Problems 오류"); setLoading(false);
      }
    },2500);
    return function(){clearTimeout(timerRef.current);};
  },[raw,apiKey,followUpCtx]);

  var problems=data&&data.problems?data.problems:[];

  return (
    <PanelCard title="Problem List" icon="📌"
      loading={loading} borderColor="#a78bfa" headerBg="rgba(167,139,250,.04)">
      {!data&&!loading&&!error&&<PanelEmpty/>}
      {data&&problems.length===0&&<PanelEmpty text="문제 목록 구성 중"/>}
      {data&&problems.length>0&&(
        <div style={{animation:"fadeIn .2s ease",display:"flex",flexDirection:"column",gap:5}}>
          {problems.map(function(prob,i){
            var c=PROB_COLORS[i%PROB_COLORS.length];
            return (
              <div key={prob.id||i} style={{display:"flex",gap:7,alignItems:"flex-start",
                padding:"5px 8px",background:c.bg,
                borderLeft:"2px solid "+c.line,borderRadius:5}}>
                <span style={{fontSize:9,fontWeight:700,color:c.line,
                  fontFamily:"'JetBrains Mono',monospace",flexShrink:0,marginTop:2}}>
                  P{i+1}
                </span>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:"#e2e4ec",lineHeight:1.4}}>
                    {prob.title}
                  </div>
                  {sanitizeProblemSummary(prob.summary)&&(
                    <div style={{fontSize:11,color:"#94a3b8",lineHeight:1.5,marginTop:1}}>
                      {sanitizeProblemSummary(prob.summary)}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {error&&<div style={{fontSize:10,color:"#f87171",fontStyle:"italic",marginTop:4}}>⚠ {error}</div>}
    </PanelCard>
  );
}
