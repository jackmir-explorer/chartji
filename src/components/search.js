/* ══════════════════════════════════════════════════════════
   SEARCH — Knowledge Search 모드 (수동, 클라이언트 only)
   참조: rules/panel-contracts.md Knowledge Search
         rules/data-flow.md §6 (수동 검색 채널)
         rules/file-ownership.md src/components/search.js
══════════════════════════════════════════════════════════ */

/* wikilink 추출: `[[target]]` / `[[target|alias]]` */
function extractWikilinks(text){
  if(!text||typeof text!=="string") return [];
  var out=[];
  var re=/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  var m;
  while((m=re.exec(text))!==null){
    out.push({target:m[1].trim(),alias:m[2]?m[2].trim():null});
  }
  return out;
}

/* 인덱스 빌드 — 런타임 1회. 반환: {entries, aliasToTarget, backlinks}
   myth 엔트리 제외 (forbidden.md Liby §). */
function buildSearchIndex(bundle){
  var entries=[]; var aliasToTarget={}; var backlinks={};
  if(!bundle) return {entries:entries,aliasToTarget:aliasToTarget,backlinks:backlinks};
  Object.keys(bundle).forEach(function(key){
    var e=bundle[key]; if(!e) return;
    if(e.kind==="myth") return;
    var titleTokens=[key];
    if(e.keywords&&e.keywords.length) titleTokens=titleTokens.concat(e.keywords);
    var sectionBlocks=[];
    if(e.sections){
      Object.keys(e.sections).forEach(function(sk){
        var s=e.sections[sk];
        if(s&&s.content) sectionBlocks.push({key:sk,content:s.content});
      });
    } else {
      ["exam","treatment","differential","draftAppend","draftTemplate"].forEach(function(f){
        if(e[f]) sectionBlocks.push({key:f,content:e[f]});
      });
    }
    sectionBlocks.forEach(function(b){
      extractWikilinks(b.content).forEach(function(L){
        if(L.alias) aliasToTarget[L.alias.toLowerCase()]=L.target;
        if(!backlinks[L.target]) backlinks[L.target]=[];
        if(backlinks[L.target].indexOf(key)===-1) backlinks[L.target].push(key);
      });
    });
    entries.push({
      key:key, kind:e.kind||"unknown",
      titleTokens:titleTokens,
      sectionBlocks:sectionBlocks,
      primarySources:e.primarySources||[]
    });
  });
  return {entries:entries,aliasToTarget:aliasToTarget,backlinks:backlinks};
}

/* 검색: 다중 토큰 AND, 가중치(title 5 / sectionKey 3 / content 1).
   alias 동의어 자동 치환. */
function searchEntries(query,index){
  var q=(query||"").trim().toLowerCase();
  if(!q||!index) return [];
  var raw=q.split(/\s+/).filter(Boolean);
  var tokens=raw.map(function(t){
    return index.aliasToTarget[t]?index.aliasToTarget[t].toLowerCase():t;
  });
  var results=[];
  index.entries.forEach(function(e){
    var titleStr=e.titleTokens.join(" ").toLowerCase();
    var sectionKeyStr=e.sectionBlocks.map(function(b){return b.key;}).join(" ").toLowerCase();
    var contentStr=e.sectionBlocks.map(function(b){return b.content;}).join("\n").toLowerCase();
    var score=0; var allMatch=true; var matchedSnippets=[];
    tokens.forEach(function(t){
      var hit=false;
      if(titleStr.indexOf(t)!==-1){score+=5; hit=true;}
      if(sectionKeyStr.indexOf(t)!==-1){score+=3; hit=true;}
      var idx=contentStr.indexOf(t);
      if(idx!==-1){
        score+=1; hit=true;
        var start=Math.max(0,idx-40);
        var end=Math.min(contentStr.length,idx+t.length+40);
        matchedSnippets.push({token:t,snippet:contentStr.slice(start,end)});
      }
      if(!hit) allMatch=false;
    });
    if(allMatch&&score>0) results.push({entry:e,score:score,snippets:matchedSnippets});
  });
  results.sort(function(a,b){return b.score-a.score;});
  return results;
}

/* 하이라이트 — 토큰을 <mark> 감싸기. HTML escape 후 적용. */
function highlightSearch(text,tokens){
  if(!text) return "";
  var safe=String(text).replace(/[&<>]/g,function(c){
    return c==="&"?"&amp;":c==="<"?"&lt;":"&gt;";
  });
  tokens.forEach(function(t){
    if(!t) return;
    var esc=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    var re=new RegExp("("+esc+")","gi");
    safe=safe.replace(re,'<mark style="background:rgba(245,166,35,.4);color:#f5a623;padding:0 2px;border-radius:2px">$1</mark>');
  });
  return safe;
}

function SearchScreen(){
  var bundle=(typeof KNOWLEDGE_BUNDLE!=="undefined")?KNOWLEDGE_BUNDLE:null;
  var index=React.useMemo(function(){return buildSearchIndex(bundle);},[bundle]);
  var [query,setQuery]=React.useState("");
  var [activeIdx,setActiveIdx]=React.useState(0);
  var [openKey,setOpenKey]=React.useState(null);
  var inputRef=React.useRef(null);

  React.useEffect(function(){if(inputRef.current) inputRef.current.focus();},[]);

  var results=React.useMemo(function(){return searchEntries(query,index);},[query,index]);
  var tokens=(query||"").trim().toLowerCase().split(/\s+/).filter(Boolean);

  function onKeyDown(e){
    if(e.key==="ArrowDown"){
      e.preventDefault();
      setActiveIdx(function(i){return Math.min(results.length-1,i+1);});
      return;
    }
    if(e.key==="ArrowUp"){
      e.preventDefault();
      setActiveIdx(function(i){return Math.max(0,i-1);});
      return;
    }
    if(e.key==="Enter"){
      e.preventDefault();
      var r=results[activeIdx];
      if(r) setOpenKey(function(prev){return prev===r.entry.key?null:r.entry.key;});
      return;
    }
    if(e.key==="Escape"){
      setQuery(""); setOpenKey(null); setActiveIdx(0);
      return;
    }
  }

  function jumpToKey(k){
    setQuery(k); setActiveIdx(0); setOpenKey(null);
    if(inputRef.current) inputRef.current.focus();
  }

  return (
    <div style={{padding:"40px 20px 20px",maxWidth:880,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:32,fontWeight:300,letterSpacing:".05em",color:"#94a3b8",marginBottom:6,
          fontFamily:"'JetBrains Mono',monospace"}}>
          🔍 Knowledge
        </div>
        <div style={{fontSize:11,color:"#4a5268"}}>
          {index.entries.length}개 엔트리 · wikilink {Object.keys(index.backlinks).length}개 타겟 · alias {Object.keys(index.aliasToTarget).length}개
        </div>
      </div>
      <input ref={inputRef} value={query}
        onChange={function(e){setQuery(e.target.value); setActiveIdx(0);}}
        onKeyDown={onKeyDown}
        placeholder="질환·약물·증상… (예: 어지럼증, metformin, 임신)"
        style={{width:"100%",fontSize:18,padding:"14px 20px",borderRadius:30,
          background:"#0d1018",border:"1px solid #1e2538",color:"#e2e4ec",outline:"none",
          boxShadow:"0 2px 12px rgba(0,0,0,.3)",boxSizing:"border-box"}}/>
      {!query&&(
        <div style={{marginTop:32,textAlign:"center",fontSize:11,color:"#2e374f",lineHeight:1.8}}>
          ↑↓ 이동 · Enter 펼침/닫음 · ESC 비움<br/>
          <span style={{color:"#4a5268"}}>참고용 — 진단·처방 추천 아님</span>
        </div>
      )}
      {query&&results.length===0&&(
        <div style={{marginTop:24,textAlign:"center",fontSize:13,color:"#4a5268"}}>
          유사 결과 없음
        </div>
      )}
      {query&&results.length>0&&(
        <div style={{marginTop:20}}>
          {results.slice(0,30).map(function(r,i){
            var on=i===activeIdx; var open=openKey===r.entry.key;
            return (
              <div key={r.entry.key}
                onClick={function(){
                  setActiveIdx(i);
                  setOpenKey(function(prev){return prev===r.entry.key?null:r.entry.key;});
                }}
                style={{padding:"10px 14px",borderRadius:8,marginBottom:6,cursor:"pointer",
                  background:on?"rgba(96,165,250,.06)":"transparent",
                  border:"1px solid "+(on?"rgba(96,165,250,.25)":"#1e2538")}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:9,color:"#4a5268",textTransform:"uppercase",
                    fontFamily:"'JetBrains Mono',monospace",letterSpacing:".07em"}}>
                    {r.entry.kind}
                  </span>
                  <span style={{fontSize:14,color:"#e2e4ec",fontWeight:600}}
                    dangerouslySetInnerHTML={{__html:highlightSearch(r.entry.key,tokens)}}/>
                  <span style={{marginLeft:"auto",fontSize:9,color:"#2e374f",
                    fontFamily:"'JetBrains Mono',monospace"}}>score {r.score}</span>
                </div>
                {r.snippets.length>0&&!open&&(
                  <div style={{marginTop:4,fontSize:11,color:"#94a3b8",lineHeight:1.6}}
                    dangerouslySetInnerHTML={{__html:"… "+highlightSearch(r.snippets[0].snippet,tokens)+" …"}}/>
                )}
                {open&&(
                  <div style={{marginTop:10,padding:"10px 12px",background:"#0d1018",
                    border:"1px solid #1e2538",borderRadius:6}}
                    onClick={function(e){e.stopPropagation();}}>
                    {r.entry.primarySources.length>0&&(
                      <div style={{fontSize:10,color:"#4a5268",marginBottom:8,lineHeight:1.6}}>
                        📚 {r.entry.primarySources.join(" · ")}
                      </div>
                    )}
                    {r.entry.sectionBlocks.map(function(b){
                      return (
                        <div key={b.key} style={{marginBottom:10}}>
                          <div style={{fontSize:10,color:"#a78bfa",fontWeight:700,
                            textTransform:"uppercase",letterSpacing:".07em",marginBottom:3,
                            fontFamily:"'JetBrains Mono',monospace"}}>{b.key}</div>
                          <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.8,whiteSpace:"pre-wrap"}}
                            dangerouslySetInnerHTML={{__html:highlightSearch(b.content,tokens)}}/>
                        </div>
                      );
                    })}
                    {(function(){
                      var bl=index.backlinks[r.entry.key]||[];
                      if(!bl.length) return null;
                      return (
                        <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #1e2538"}}>
                          <div style={{fontSize:10,color:"#4a5268",marginBottom:4,
                            fontFamily:"'JetBrains Mono',monospace",letterSpacing:".07em"}}>🔗 backlink</div>
                          <div style={{fontSize:11,lineHeight:1.8}}>
                            {bl.map(function(b){
                              return (
                                <span key={b}
                                  onClick={function(ev){ev.stopPropagation(); jumpToKey(b);}}
                                  style={{marginRight:10,cursor:"pointer",color:"#60a5fa",
                                    textDecoration:"underline"}}>{b}</span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })}
          {results.length>30&&(
            <div style={{textAlign:"center",fontSize:11,color:"#2e374f",marginTop:8}}>
              상위 30건 표시 (총 {results.length}건)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
