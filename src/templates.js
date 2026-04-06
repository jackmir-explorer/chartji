/* ══════════════════════════════════════════════════════════
   CALCULATORS — 질환별 계산/참조 도구 정의
   Triage 패널의 calcCategories 감지 결과로 탭 활성화
   - calculate() 있는 경우: 입력 폼 + 계산 버튼 + 결과
   - calculate() 없는 경우: 참조표만 표시
   - externalLink 있는 경우: 외부 도구 링크
══════════════════════════════════════════════════════════ */
const CALCULATORS = {

  dyslipidemia: {
    label: "이상지질혈증",
    description: "한국지질동맥경화학회 가이드라인 기반 LDL 목표",
    fields: [
      {id:"cad",       label:"관상동맥질환",                          type:"select", options:["아니오","예"]},
      {id:"ascvd",     label:"뇌졸중·TIA·경동맥·말초동맥·복부대동맥류", type:"select", options:["아니오","예"]},
      {id:"dm",        label:"당뇨",                                 type:"select", options:["없음","10년 미만","10년 이상"]},
      {id:"organDmg",  label:"표적장기손상(알부민뇨,CKD,망막병증 등)",  type:"select", options:["아니오","예"]},
      {id:"age",       label:"나이",          type:"number", placeholder:"세"},
      {id:"sex",       label:"성별",          type:"select", options:["남","여"]},
      {id:"fhx",       label:"조기 심혈관질환 가족력", type:"select", options:["아니오","예"]},
      {id:"htn",       label:"고혈압(≥140/90 또는 약물)", type:"select", options:["아니오","예"]},
      {id:"smoking",   label:"현재 흡연",     type:"select", options:["아니오","예"]},
      {id:"hdl",       label:"HDL-C",         type:"number", placeholder:"mg/dL"},
    ],
    resultLabel: "위험군 분류 + LDL / non-HDL 목표",
    calculate: function(inp){
      /* ── 1. 기존 심혈관질환 → 초고위험/매우고위험 ── */
      if(inp.cad==="예")
        return {위험군:"초고위험 (관상동맥질환)",LDL목표:"< 55 mg/dL","non-HDL목표":"< 85 mg/dL",비고:"기저치 대비 50%↓ 동시 권고"};

      if(inp.ascvd==="예")
        return {위험군:"매우고위험 (죽상경화성 혈관질환)",LDL목표:"< 70 mg/dL","non-HDL목표":"< 100 mg/dL",비고:"기저치 대비 50%↓ 동시 권고"};

      /* ── 2. 당뇨 분기 ── */
      if(inp.dm==="10년 이상"||inp.dm==="10년 미만"){
        /* 위험인자 카운팅 (당뇨 환자용) */
        var age=parseFloat(inp.age), hdl=parseFloat(inp.hdl);
        var rf=0;
        if(age&&inp.sex==="남"&&age>=45) rf++;
        if(age&&inp.sex==="여"&&age>=55) rf++;
        if(inp.fhx==="예") rf++;
        if(inp.htn==="예") rf++;
        if(inp.smoking==="예") rf++;
        if(hdl&&hdl<40) rf++;
        if(hdl&&hdl>=60) rf--;

        var hasOrganDmg=inp.organDmg==="예";
        var longDm=inp.dm==="10년 이상";

        if(longDm||hasOrganDmg||rf>=1){
          var result={위험군:"매우고위험 (당뇨 + ",LDL목표:"< 70 mg/dL","non-HDL목표":"< 100 mg/dL",비고:"기저치 대비 50%↓ 동시 권고"};
          if(longDm) result.위험군+="유병기간 ≥10년";
          else if(hasOrganDmg) result.위험군+="표적장기손상";
          else result.위험군+="위험인자 동반";
          result.위험군+=")";
          if(hasOrganDmg&&rf>=3) result.비고+=" / LDL < 55 선택적 고려 가능";
          return result;
        }
        /* DM <10년, 위험인자 없음 */
        return {위험군:"고위험 (당뇨, 위험인자 없음)",LDL목표:"< 100 mg/dL","non-HDL목표":"< 130 mg/dL"};
      }

      /* ── 3. 기존 질환·당뇨 없음 → 위험인자 카운팅 ── */
      var age=parseFloat(inp.age), hdl=parseFloat(inp.hdl);
      if(!age) return {error:"나이를 입력하세요."};

      var rf=0;
      if(inp.sex==="남"&&age>=45) rf++;
      if(inp.sex==="여"&&age>=55) rf++;
      if(inp.fhx==="예") rf++;
      if(inp.htn==="예") rf++;
      if(inp.smoking==="예") rf++;
      if(hdl&&hdl<40) rf++;
      if(hdl&&hdl>=60) rf--;

      if(rf>=2)
        return {위험군:"중등도 위험군 (위험인자 "+rf+"개)",LDL목표:"< 130 mg/dL","non-HDL목표":"< 160 mg/dL"};
      return {위험군:"저위험군 (위험인자 "+rf+"개)",LDL목표:"< 160 mg/dL","non-HDL목표":"< 190 mg/dL"};
    },
  },

  obesity: {
    label: "비만",
    description: "BMI 등급 분류",
    fields: [
      {id:"weight",  label:"체중",     type:"number", placeholder:"kg"},
      {id:"height",  label:"키",       type:"number", placeholder:"cm"},
      {id:"waist",   label:"허리둘레",  type:"number", placeholder:"cm (선택)"},
      {id:"sex",     label:"성별",     type:"select", options:["남","여"]},
    ],
    resultLabel: "BMI + 비만 등급 (아시아태평양 기준)",
    calculate: function(inp){
      var w=parseFloat(inp.weight), h=parseFloat(inp.height);
      if(!w||!h) return {error:"체중과 키를 입력하세요."};
      var hm=h/100;
      var bmi=(w/(hm*hm)).toFixed(1);

      var grade;
      if(bmi<18.5) grade="저체중";
      else if(bmi<23) grade="정상";
      else if(bmi<25) grade="과체중 (위험)";
      else if(bmi<30) grade="비만 1단계";
      else grade="비만 2단계";

      var result={bmi:bmi, grade:grade};

      var waist=parseFloat(inp.waist);
      if(waist){
        var isMale=inp.sex==="남";
        var threshold=isMale?90:85;
        result.waistResult=waist>=threshold
          ?"복부비만 ("+inp.sex+" 기준 ≥"+threshold+"cm)"
          :"정상 범위";
      }
      return result;
    },
    referenceTable: {
      bmi: [
        {range:"<18.5",    grade:"저체중"},
        {range:"18.5~22.9",grade:"정상"},
        {range:"23~24.9",  grade:"과체중 (위험)"},
        {range:"25~29.9",  grade:"비만 1단계"},
        {range:"≥30",      grade:"비만 2단계"},
      ],
    },
  },

  depression: {
    label: "우울/불안",
    description: "PHQ-9 / GAD-7 점수 참조",
    resultLabel: "점수별 중증도",
    referenceTable: {
      "PHQ-9 (우울)": [
        {range:"0~4",   grade:"정상"},
        {range:"5~9",   grade:"경도 우울"},
        {range:"10~14", grade:"중등도 우울"},
        {range:"15~19", grade:"중등도-중증 우울"},
        {range:"20~27", grade:"중증 우울"},
      ],
      "GAD-7 (불안)": [
        {range:"0~4",   grade:"정상"},
        {range:"5~9",   grade:"경도 불안"},
        {range:"10~14", grade:"중등도 불안"},
        {range:"15~21", grade:"중증 불안"},
      ],
    },
  },

  diabetes: {
    label: "당뇨",
    description: "eGFR 기반 약물 적합성 참조",
    resultLabel: "eGFR별 메트포르민 가이드",
    referenceTable: {
      "eGFR (mL/min/1.73m²)": [
        {range:"≥60",    guidance:"정상 용량 가능"},
        {range:"45~59",  guidance:"유지, 신기능 3~6개월 추적"},
        {range:"30~44",  guidance:"감량 (최대 1000mg/일), 신기능 3개월 추적"},
        {range:"<30",    guidance:"메트포르민 금기"},
      ],
    },
  },

  osteoporosis: {
    label: "골다공증",
    description: "FRAX 골절 위험도",
    externalLink: {
      url: "https://frax.shef.ac.uk/FRAX/tool.aspx?country=25",
      label: "FRAX 공식 계산기 (Sheffield)",
    },
    resultLabel: "골다공증 치료 기준 참조",
    referenceTable: {
      "치료 시작 기준 (NOF)": [
        {range:"T-score ≤ -2.5",          guidance:"약물 치료 권고"},
        {range:"T-score -1.0 ~ -2.5",     guidance:"FRAX 결과에 따라 판단"},
        {range:"FRAX 주요골절 ≥20%",       guidance:"약물 치료 권고"},
        {range:"FRAX 고관절골절 ≥3%",      guidance:"약물 치료 권고"},
      ],
    },
  },

};
