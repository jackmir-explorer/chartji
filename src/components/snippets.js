/* ══════════════════════════════════════════════════════════
   SNIPPETS — 상용구 별 surface (수동, 클라이언트 only, 2026-05-13 Phase 1)
   참조: rules/panel-contracts.md Snippets
         rules/file-ownership.md src/components/snippets.js
   데이터: localStorage key "cj_snippets" (JSON array)
   shape: [{id, name, content, updatedAt}] — 최소 필드.
          category·sections 분할은 미르 사용 후 Phase 확장.
══════════════════════════════════════════════════════════ */

var SNIPPETS_KEY="cj_snippets";

function loadSnippets(){
  try{
    var raw=localStorage.getItem(SNIPPETS_KEY);
    if(!raw) return [];
    var arr=JSON.parse(raw);
    return Array.isArray(arr)?arr:[];
  }catch(_){return [];}
}
function saveSnippets(arr){
  try{localStorage.setItem(SNIPPETS_KEY,JSON.stringify(arr));}catch(_){}
}
function newSnippetId(){
  return "s_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
}
function todayStr(){
  var d=new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}

function exportSnippets(snippets){
  var blob=new Blob([JSON.stringify(snippets,null,2)],{type:"application/json"});
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");
  a.href=url; a.download="chartji-snippets-"+todayStr()+".json";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}
function importSnippetsFromFile(file,onLoaded){
  var reader=new FileReader();
  reader.onload=function(ev){
    try{
      var arr=JSON.parse(ev.target.result);
      if(!Array.isArray(arr)){onLoaded(null,"JSON 배열 아님"); return;}
      for(var i=0;i<arr.length;i++){
        var s=arr[i];
        if(!s||typeof s.name!=="string"||typeof s.content!=="string"){
          onLoaded(null,"항목 "+i+" shape 불일치"); return;
        }
        if(!s.id) s.id=newSnippetId();
        if(!s.updatedAt) s.updatedAt=todayStr();
      }
      onLoaded(arr,null);
    }catch(e){onLoaded(null,"JSON 파싱 실패: "+e.message);}
  };
  reader.readAsText(file);
}

function SnippetsScreen(){
  var [snippets,setSnippets]=React.useState(loadSnippets);
  var [activeId,setActiveId]=React.useState(function(){
    var arr=loadSnippets(); return arr.length?arr[0].id:null;
  });
  var [copiedId,setCopiedId]=React.useState(null);
  var [importMsg,setImportMsg]=React.useState("");
  var saveTimer=React.useRef(null);
  var fileInputRef=React.useRef(null);

  React.useEffect(function(){
    clearTimeout(saveTimer.current);
    saveTimer.current=setTimeout(function(){saveSnippets(snippets);},300);
    return function(){clearTimeout(saveTimer.current);};
  },[snippets]);

  var active=snippets.find(function(s){return s.id===activeId;})||null;

  function addNew(){
    var s={id:newSnippetId(),name:"새 상용구",content:"",updatedAt:todayStr()};
    setSnippets(function(prev){return [s].concat(prev);});
    setActiveId(s.id);
  }
  function updateField(id,field,value){
    setSnippets(function(prev){
      return prev.map(function(s){
        if(s.id!==id) return s;
        var next=Object.assign({},s); next[field]=value; next.updatedAt=todayStr();
        return next;
      });
    });
  }
  function removeSnippet(id){
    if(!confirm("이 상용구를 삭제할까요? (되돌릴 수 없습니다)")) return;
    setSnippets(function(prev){return prev.filter(function(s){return s.id!==id;});});
    if(activeId===id){
      var remain=snippets.filter(function(s){return s.id!==id;});
      setActiveId(remain.length?remain[0].id:null);
    }
  }
  function copyContent(s){
    if(!s||!s.content) return;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(s.content).then(function(){
        setCopiedId(s.id);
        setTimeout(function(){setCopiedId(function(c){return c===s.id?null:c;});},1500);
      }).catch(function(){fallbackCopy(s.content,s.id);});
    } else {
      fallbackCopy(s.content,s.id);
    }
  }
  function fallbackCopy(text,id){
    var ta=document.createElement("textarea");
    ta.value=text; ta.style.position="fixed"; ta.style.opacity="0";
    document.body.appendChild(ta); ta.select();
    try{document.execCommand("copy"); setCopiedId(id);
      setTimeout(function(){setCopiedId(function(c){return c===id?null:c;});},1500);
    }catch(_){}
    document.body.removeChild(ta);
  }

  function handleImportFile(e){
    var f=e.target.files&&e.target.files[0]; if(!f) return;
    importSnippetsFromFile(f,function(arr,err){
      if(err){setImportMsg("⚠ 가져오기 실패: "+err); return;}
      if(!confirm("총 "+arr.length+"개 상용구를 가져옵니다. 기존 데이터를 덮어쓸까요?")){
        setImportMsg("ℹ 가져오기 취소"); return;
      }
      setSnippets(arr);
      setActiveId(arr.length?arr[0].id:null);
      setImportMsg("✓ "+arr.length+"개 가져옴");
      setTimeout(function(){setImportMsg("");},2500);
    });
    e.target.value="";
  }

  return (
    <div style={{padding:"30px 20px 20px",maxWidth:1080,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:28,fontWeight:300,letterSpacing:".05em",
          color:"var(--text-secondary)",marginBottom:6,
          fontFamily:"'JetBrains Mono',monospace"}}>📝 Snippets</div>
        <div style={{fontSize:11,color:"var(--text-muted)"}}>
          {snippets.length}개 · 자동 저장 (localStorage) · 진료 외에서만 사용
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
        <button onClick={addNew}
          style={{fontSize:12,fontWeight:700,padding:"6px 14px",borderRadius:6,
            color:"var(--brand)",background:"var(--bg-panel)",
            border:"1px solid var(--brand)",cursor:"pointer"}}>+ 새 상용구</button>
        <button onClick={function(){exportSnippets(snippets);}}
          disabled={snippets.length===0}
          style={{fontSize:12,padding:"6px 14px",borderRadius:6,
            color:snippets.length?"var(--accent-blue)":"var(--text-faint)",
            background:"var(--bg-panel)",
            border:"1px solid "+(snippets.length?"var(--accent-blue-soft)":"var(--border)"),
            cursor:snippets.length?"pointer":"not-allowed"}}>⬇ Export (.json)</button>
        <button onClick={function(){fileInputRef.current&&fileInputRef.current.click();}}
          style={{fontSize:12,padding:"6px 14px",borderRadius:6,
            color:"var(--accent-purple)",background:"var(--bg-panel)",
            border:"1px solid var(--accent-purple-mid)",cursor:"pointer"}}>⬆ Import</button>
        <input ref={fileInputRef} type="file" accept=".json,application/json"
          onChange={handleImportFile} style={{display:"none"}}/>
        {importMsg&&<span style={{fontSize:11,color:"var(--text-secondary)",alignSelf:"center"}}>{importMsg}</span>}
      </div>

      {snippets.length===0&&(
        <div style={{padding:"40px 20px",textAlign:"center",fontSize:13,
          color:"var(--text-muted)",border:"1px dashed var(--border)",borderRadius:8}}>
          아직 상용구가 없습니다. "+ 새 상용구" 또는 "⬆ Import" 로 시작하세요.
        </div>
      )}

      {snippets.length>0&&(
        <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{flex:"0 0 240px",maxHeight:"60vh",overflowY:"auto"}}>
            {snippets.map(function(s){
              var on=s.id===activeId;
              return (
                <div key={s.id} onClick={function(){setActiveId(s.id);}}
                  style={{padding:"8px 10px",borderRadius:6,marginBottom:4,cursor:"pointer",
                    background:on?"var(--accent-blue-soft)":"transparent",
                    border:"1px solid "+(on?"var(--accent-blue)":"var(--border)")}}>
                  <div style={{fontSize:12,color:"var(--text-primary)",fontWeight:600,
                    whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                    {s.name||"(이름 없음)"}
                  </div>
                  <div style={{fontSize:10,color:"var(--text-muted)",marginTop:2}}>
                    {s.updatedAt} · {(s.content||"").length}자
                  </div>
                </div>
              );
            })}
          </div>
          {active&&(
            <div style={{flex:1,minWidth:0,background:"var(--bg-panel)",
              border:"1px solid var(--border)",borderRadius:10,padding:14}}>
              <div style={{display:"flex",gap:8,marginBottom:10,alignItems:"center"}}>
                <input value={active.name}
                  onChange={function(e){updateField(active.id,"name",e.target.value);}}
                  placeholder="이름 (예: 소화불량 일반)"
                  style={{flex:1,fontSize:14,fontWeight:600,padding:"8px 12px",borderRadius:6,
                    background:"var(--bg-input)",color:"var(--text-primary)",
                    border:"1px solid var(--border)"}}/>
                <button onClick={function(){copyContent(active);}}
                  style={{fontSize:12,fontWeight:700,padding:"8px 14px",borderRadius:6,
                    color:copiedId===active.id?"var(--success)":"var(--brand)",
                    background:"var(--bg-panel)",
                    border:"1px solid "+(copiedId===active.id?"var(--success)":"var(--brand)"),
                    cursor:"pointer"}}>
                  {copiedId===active.id?"✓ 복사됨":"📋 복사"}
                </button>
                <button onClick={function(){removeSnippet(active.id);}}
                  style={{fontSize:11,padding:"8px 10px",borderRadius:6,
                    color:"var(--danger)",background:"var(--bg-panel)",
                    border:"1px solid var(--border)",cursor:"pointer"}}>🗑</button>
              </div>
              <textarea value={active.content}
                onChange={function(e){updateField(active.id,"content",e.target.value);}}
                placeholder="상용구 본문… (그대로 EMR에 붙여넣을 텍스트)"
                style={{width:"100%",minHeight:340,padding:"10px 12px",borderRadius:8,
                  background:"var(--bg-input)",color:"var(--text-primary)",
                  border:"1px solid var(--border)",fontSize:13,lineHeight:1.7,resize:"vertical"}}/>
              <div style={{fontSize:10,color:"var(--text-faint)",marginTop:6,
                fontFamily:"'JetBrains Mono',monospace",textAlign:"right"}}>
                {(active.content||"").length}자 · 편집 즉시 자동 저장
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{marginTop:24,padding:"10px 14px",
        background:"var(--accent-purple-soft)",
        border:"1px solid var(--accent-purple-mid)",borderRadius:8,
        fontSize:11,color:"var(--text-muted)",lineHeight:1.7}}>
        ⚠ 환자 식별 정보 입력 금지. localStorage 는 브라우저 단위 — 다른 PC/브라우저는 Export/Import 로 이전.
        진단·처방 추천 아님 (의사 본인 작성 텍스트 복사 도구).
      </div>
    </div>
  );
}
