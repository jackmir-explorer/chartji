/* L3 Smoke #2 Runner — dev 콘솔 수동 실행.
   사용법:
     await runTriageSmoke()
   전제:
     - window.TRIAGE_SMOKE_FIXTURES 로드됨 (triage-smoke.js)
     - localStorage("cj_key") 에 Anthropic API 키 저장됨
     - window.generateTriagePanel (api.js 전역) 사용 가능
   비용: fixture 7건 × 실제 API 호출 (~0.3 USD 예상). CI 자동화 안 함.
*/
window.runTriageSmoke=async function(){
  if(!window.TRIAGE_SMOKE_FIXTURES){
    console.error("[KB-SMOKE] TRIAGE_SMOKE_FIXTURES 로드 안 됨 — triage-smoke.js script tag 확인");
    return;
  }
  var apiKey=(typeof localStorage!=="undefined")&&localStorage.getItem("cj_key");
  if(!apiKey){
    console.error("[KB-SMOKE] API 키 없음 — localStorage.cj_key 확인");
    return;
  }
  if(typeof generateTriagePanel!=="function"){
    console.error("[KB-SMOKE] generateTriagePanel 로드 안 됨 — api.js 확인");
    return;
  }
  console.log("[KB-SMOKE] TRIAGE fixture "+window.TRIAGE_SMOKE_FIXTURES.length+"건 실행 시작...");
  var results=[];
  for(var i=0;i<window.TRIAGE_SMOKE_FIXTURES.length;i++){
    var f=window.TRIAGE_SMOKE_FIXTURES[i];
    var detected=[];
    var err=null;
    try{
      var resp=await generateTriagePanel(f.transcript,apiKey,"");
      detected=(resp&&resp.calcCategories)||[];
    }catch(e){
      err=e.message||String(e);
    }
    var missingAll=(f.expectAll||[]).filter(function(c){return detected.indexOf(c)===-1;});
    var missingAny=(f.expectAny||[]).filter(function(set){
      return !set.some(function(c){return detected.indexOf(c)!==-1;});
    });
    var pass=!err&&!missingAll.length&&!missingAny.length;
    results.push({
      name:f.name,
      pass:pass,
      detected:detected.join(","),
      missingAll:missingAll.join(","),
      missingAny:missingAny.map(function(s){return "["+s.join("|")+"]";}).join(","),
      err:err||""
    });
  }
  console.table(results);
  var passed=results.filter(function(r){return r.pass;}).length;
  console.log("[KB-SMOKE] 결과: "+passed+"/"+results.length+" pass");
  return results;
};
