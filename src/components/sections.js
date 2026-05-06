/* ══════════════════════════════════════════════════════════
   SECTIONS — app.js에서 추출한 탭 콘텐츠 컴포넌트
   CalcTabHeaders : 계산기 탭 헤더 + 추가 메뉴
   DraftTab       : Working Draft 표시 + 판단 검토
   CalcTabContent : 계산기 폼 + 결과 + 참조표
══════════════════════════════════════════════════════════ */

function CalcTabHeaders(props){
  var activeCalcs=props.activeCalcs, leftTab=props.leftTab,
      setLeftTab=props.setLeftTab, setActiveCalcs=props.setActiveCalcs;
  return (
    <>
      {activeCalcs.map(function(calcKey){
        var calc=CALCULATORS[calcKey];
        if(!calc) return null;
        var on=leftTab==="calc-"+calcKey;
        return (
          <button key={"calc-"+calcKey}
            onClick={function(){setLeftTab("calc-"+calcKey);}}
            style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:5,
              color:on?"#34c77b":"#2e374f",
              background:on?"#0d1018":"transparent",
              border:"1px solid "+(on?"rgba(52,199,123,.3)":"transparent"),
              cursor:"pointer",letterSpacing:".05em",
              fontFamily:"'JetBrains Mono',monospace",
              display:"flex",alignItems:"center",gap:4}}>
            {calc.label}
            <span onClick={function(e){
              e.stopPropagation();
              setActiveCalcs(function(prev){return prev.filter(function(c){return c!==calcKey;});});
              if(leftTab==="calc-"+calcKey) setLeftTab("draft");
            }}
              style={{fontSize:8,color:"#4a5268",cursor:"pointer",marginLeft:2}}>✕</span>
          </button>
        );
      })}
      {/* 수동 추가 버튼 */}
      {(function(){
        var available=Object.keys(CALCULATORS).filter(function(k){return activeCalcs.indexOf(k)===-1;});
        if(!available.length) return null;
        return (
          <div style={{position:"relative",display:"inline-block"}}>
            <button
              onClick={function(){
                var el=document.getElementById("calc-add-menu");
                if(el) el.style.display=el.style.display==="block"?"none":"block";
              }}
              style={{fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:5,
                color:"#2e374f",background:"transparent",
                border:"1px dashed #1e2538",cursor:"pointer",
                fontFamily:"'JetBrains Mono',monospace"}}>+</button>
            <div id="calc-add-menu" style={{display:"none",position:"absolute",top:"100%",left:0,
              marginTop:4,background:"#131924",border:"1px solid #1e2538",borderRadius:6,
              padding:4,zIndex:10,minWidth:120}}>
              {available.map(function(k){
                return (
                  <div key={k}
                    onClick={function(){
                      setActiveCalcs(function(prev){return prev.concat([k]);});
                      setLeftTab("calc-"+k);
                      document.getElementById("calc-add-menu").style.display="none";
                    }}
                    style={{fontSize:11,color:"#94a3b8",padding:"5px 8px",cursor:"pointer",
                      borderRadius:4}}
                    onMouseEnter={function(e){e.target.style.background="#1e2538";}}
                    onMouseLeave={function(e){e.target.style.background="transparent";}}>
                    {CALCULATORS[k].label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </>
  );
}

function DraftTab(props){
  var draftText=props.draftText, draftLoading=props.draftLoading,
      reviewText=props.reviewText, reviewLoading=props.reviewLoading,
      onReview=props.onReview, apiKey=props.apiKey, onDraftChange=props.onDraftChange,
      draftHints=props.draftHints||null;
  var _useState=React.useState(false), editing=_useState[0], setEditing=_useState[1];
  var _useState2=React.useState(""), copyMsg=_useState2[0], setCopyMsg=_useState2[1];
  var _useState3=React.useState(false), hintsOpen=_useState3[0], setHintsOpen=_useState3[1];
  return (
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
            borderBottom:"1px solid #1e2538",paddingBottom:4,
            display:"flex",alignItems:"center"}}>
            <span>
              Working Draft — 의사 검토 필수
              {draftLoading&&(
                <span style={{marginLeft:8,width:6,height:6,border:"1px solid #252d42",
                  borderTopColor:"#60a5fa",borderRadius:"50%",display:"inline-block",
                  animation:"spin .65s linear infinite",verticalAlign:"middle"}}/>
              )}
            </span>
          </div>
          {editing?(
            <textarea value={draftText}
              onChange={function(e){if(onDraftChange) onDraftChange(e.target.value);}}
              style={{width:"100%",background:"#131924",border:"1px solid rgba(96,165,250,.25)",
                borderRadius:6,padding:"8px 10px",color:"#e2e4ec",fontSize:12.5,
                lineHeight:1.9,minHeight:200,resize:"vertical",
                fontFamily:"'JetBrains Mono',monospace"}}/>
          ):(
            draftText
          )}
          <div style={{marginTop:10,marginBottom:2}}>
            {!editing?(
              <button onClick={function(){setEditing(true);}}
                style={{fontSize:12,fontWeight:700,padding:"7px 0",borderRadius:7,
                  width:"100%",cursor:"pointer",color:"#60a5fa",
                  background:"rgba(96,165,250,.06)",
                  border:"1px solid rgba(96,165,250,.3)"}}>
                ✏ 수정하기
              </button>
            ):(
              <button onClick={function(){
                  setEditing(false);
                  navigator.clipboard.writeText(draftText).then(function(){
                    setCopyMsg("복사됨");
                    setTimeout(function(){setCopyMsg("");},2000);
                  });
                }}
                style={{fontSize:12,fontWeight:700,padding:"7px 0",borderRadius:7,
                  width:"100%",cursor:"pointer",color:"#34c77b",
                  background:"rgba(52,199,123,.08)",
                  border:"1px solid rgba(52,199,123,.35)"}}>
                ✓ 완료하고 클립보드에 저장하기
              </button>
            )}
            {copyMsg&&(
              <div style={{fontSize:11,color:"#34c77b",textAlign:"center",marginTop:5}}>
                {copyMsg}
              </div>
            )}
          </div>
          {draftHints&&(
            <div style={{marginTop:8,borderTop:"1px solid rgba(167,139,250,.15)",paddingTop:8}}>
              <div onClick={function(){setHintsOpen(function(v){return !v;});}}
                style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                  cursor:"pointer",marginBottom:hintsOpen?6:0}}>
                <span style={{fontSize:9,fontWeight:700,color:"#4a3f6b",
                  textTransform:"uppercase",letterSpacing:".07em",
                  fontFamily:"'JetBrains Mono',monospace"}}>
                  💡 Liby 힌트
                </span>
                <span style={{fontSize:9,color:"#4a3f6b"}}>{hintsOpen?"▲":"▼"}</span>
              </div>
              {hintsOpen&&(
                <div style={{fontSize:11,color:"#6b5c8a",lineHeight:1.8,
                  whiteSpace:"pre-wrap",padding:"6px 8px",
                  background:"rgba(167,139,250,.04)",
                  border:"1px solid rgba(167,139,250,.12)",borderRadius:6}}>
                  {draftHints}
                </div>
              )}
            </div>
          )}
          <div style={{marginTop:8,borderTop:"1px solid #1e2538",paddingTop:8}}>
            <button onClick={onReview}
              disabled={reviewLoading||!apiKey}
              style={{fontSize:10,fontWeight:700,padding:"4px 12px",
                borderRadius:6,cursor:(reviewLoading||!apiKey)?"not-allowed":"pointer",
                color:"#a78bfa",background:"transparent",
                border:"1px solid rgba(167,139,250,.35)",
                opacity:(reviewLoading||!apiKey)?.5:1,
                display:"flex",alignItems:"center",gap:5}}>
              {reviewLoading&&(
                <span style={{width:7,height:7,border:"1px solid #252d42",
                  borderTopColor:"#a78bfa",borderRadius:"50%",display:"inline-block",
                  animation:"spin .65s linear infinite"}}/>
              )}
              판단 검토
            </button>
            {reviewText&&(
              <div style={{marginTop:8,fontSize:12,color:"#94a3b8",
                lineHeight:1.8,whiteSpace:"pre-wrap"}}>
                {reviewText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CalcTabContent(props){
  var calcKey=props.calcKey, calc=props.calc, inputs=props.inputs,
      setField=props.setField, calcResults=props.calcResults, onCalculate=props.onCalculate;
  if(!calc) return null;
  var result=calcResults[calcKey];
  return (
    <div style={{background:"#0d1018",border:"1px solid rgba(52,199,123,.2)",borderRadius:8,
      padding:"12px 14px",minHeight:240,overflowY:"auto"}}>
      <div style={{fontSize:9,fontWeight:700,color:"#34c77b",
        textTransform:"uppercase",letterSpacing:".07em",marginBottom:4,
        fontFamily:"'JetBrains Mono',monospace"}}>
        {calc.label} — {calc.description}
      </div>
      <div style={{fontSize:10,color:"#2e374f",marginBottom:12,
        borderBottom:"1px solid #1e2538",paddingBottom:6}}>
        참고용 계산 도구. 의사 판단 필수.
      </div>
      {/* 외부 링크 */}
      {calc.externalLink&&(
        <div style={{marginBottom:10,padding:"7px 10px",
          background:"rgba(96,165,250,.06)",border:"1px solid rgba(96,165,250,.2)",
          borderRadius:6,display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:12}}>🔗</span>
          <a href={calc.externalLink.url} target="_blank" rel="noreferrer"
            style={{fontSize:12,color:"#60a5fa",textDecoration:"none",fontWeight:600}}>
            {calc.externalLink.label}
          </a>
        </div>
      )}
      {/* 입력 폼 */}
      {calc.fields&&calc.fields.length>0&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {calc.fields.map(function(f){
            return (
              <div key={f.id} style={{display:"flex",alignItems:"center",gap:8}}>
                <label style={{fontSize:11,color:"#94a3b8",minWidth:100,flexShrink:0}}>
                  {f.label}
                </label>
                {f.type==="number"?(
                  <input type="number"
                    value={inputs[f.id]||""}
                    onChange={function(e){setField(f.id,e.target.value);}}
                    placeholder={f.placeholder||""}
                    style={{flex:1,background:"#131924",border:"1px solid #1e2538",
                      borderRadius:5,padding:"5px 8px",color:"#e2e4ec",fontSize:12,
                      maxWidth:120}}/>
                ):(
                  <select
                    value={inputs[f.id]||""}
                    onChange={function(e){setField(f.id,e.target.value);}}
                    style={{flex:1,background:"#131924",border:"1px solid #1e2538",
                      borderRadius:5,padding:"5px 8px",color:"#e2e4ec",fontSize:12,
                      maxWidth:120}}>
                    <option value="">선택</option>
                    {(f.options||[]).map(function(opt){
                      return <option key={opt} value={opt}>{opt}</option>;
                    })}
                  </select>
                )}
              </div>
            );
          })}
          {calc.calculate&&(
            <button onClick={onCalculate}
              style={{marginTop:4,fontSize:12,fontWeight:700,padding:"7px 16px",
                borderRadius:6,cursor:"pointer",alignSelf:"flex-start",
                color:"#34c77b",background:"rgba(52,199,123,.08)",
                border:"1px solid rgba(52,199,123,.35)"}}>
              계산
            </button>
          )}
        </div>
      )}
      {/* 계산 결과 */}
      {result&&(
        <div style={{marginTop:10,padding:"8px 10px",
          background:result.error?"rgba(248,113,113,.07)":"rgba(52,199,123,.06)",
          border:"1px solid "+(result.error?"rgba(248,113,113,.3)":"rgba(52,199,123,.25)"),
          borderRadius:6}}>
          <div style={{fontSize:10,fontWeight:700,marginBottom:4,
            color:result.error?"#f87171":"#34c77b",
            fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>
            {result.error?"오류":calc.resultLabel}
          </div>
          {result.error?(
            <div style={{fontSize:12,color:"#f87171"}}>{result.error}</div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {Object.keys(result).map(function(k){
                return (
                  <div key={k} style={{fontSize:12,color:"#e2e4ec",
                    display:"flex",gap:8,alignItems:"baseline"}}>
                    <span style={{fontSize:10,color:"#4a5268",minWidth:80,
                      fontFamily:"'JetBrains Mono',monospace"}}>{k}</span>
                    <span style={{fontWeight:600}}>{result[k]}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {/* 참조 테이블 */}
      {calc.referenceTable&&(
        <div style={{marginTop:14,paddingTop:10,borderTop:"1px solid #1e2538"}}>
          <div style={{fontSize:10,fontWeight:700,color:"#4a5268",marginBottom:6,
            fontFamily:"'JetBrains Mono',monospace"}}>{calc.resultLabel}</div>
          {Object.keys(calc.referenceTable).map(function(tableKey){
            var table=calc.referenceTable[tableKey];
            if(!Array.isArray(table)) return (
              <div key={tableKey} style={{fontSize:11,color:"#94a3b8",marginBottom:4}}>
                {typeof table==="object"?Object.values(table).join(" / "):String(table)}
              </div>
            );
            return (
              <div key={tableKey} style={{marginBottom:8}}>
                <div style={{fontSize:10,color:"#4a5268",marginBottom:3,
                  textTransform:"uppercase"}}>{tableKey}</div>
                {table.map(function(row,i){
                  return (
                    <div key={(row.range||"")+"-"+i} style={{fontSize:11,color:"#94a3b8",
                      display:"flex",gap:8,padding:"2px 0"}}>
                      <span style={{color:"#60a5fa",minWidth:70,
                        fontFamily:"'JetBrains Mono',monospace"}}>{row.range}</span>
                      <span>{row.grade||row.guidance}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      {/* 면책 표기 */}
      <div style={{marginTop:12,paddingTop:8,borderTop:"1px solid #1e2538",
        fontSize:10,color:"#2e374f",lineHeight:1.6,fontStyle:"italic"}}>
        참고용 계산 결과이며 임상 판단을 대체하지 않습니다. 반드시 의사가 직접 확인 후 사용하십시오.
      </div>
    </div>
  );
}
