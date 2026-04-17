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

  /* ── 예방접종 참조 탭 ── */

  Tdap: {
    label: "파상풍(Tdap)",
    description: "ACIP · 대한감염학회 기반",
    resultLabel: "Tdap 접종 스케줄",
    referenceTable: {
      "접종 대상 · 시기": [
        {range:"DTaP 완료 성인",                   guidance:"매 10년마다 Tdap 또는 Td"},
        {range:"DTaP 미접종 / 접종력 불명",         guidance:"3회 시리즈: Tdap → Td(4~8주 후) → Td(6~12개월 후)"},
        {range:"임신부",                           guidance:"매 임신 27~36주에 Tdap"},
        {range:"신생아 주변 성인 (cocoon 전략)",    guidance:"Tdap 미접종이면 신생아 접촉 2주 전까지 접종"},
        {range:"외상 후 — Tdap 미접종",            guidance:"Tdap 접종"},
        {range:"외상 후 — Tdap 접종력 있음",       guidance:"Tdap 또는 Td 모두 가능"},
      ],
      "접종 방법": [
        {range:"용량 · 경로",                      guidance:"0.5mL 근육주사"},
        {range:"3회 시리즈 시 주의",               guidance:"최소 1회는 반드시 Tdap (나머지는 Td 가능)"},
      ],
    },
  },

  대상포진: {
    label: "대상포진",
    description: "ACIP 기반",
    resultLabel: "대상포진 백신 스케줄",
    referenceTable: {
      "접종 대상": [
        {range:"만 50세 이상",                     guidance:"RZV(싱그릭스) 또는 ZVL(조스타박스)"},
        {range:"만 18세 이상 중증면역저하자",       guidance:"RZV(싱그릭스) 권고 — 암치료 중, 면역억제제 복용 중"},
      ],
      "RZV · 싱그릭스 (사백신)": [
        {range:"접종 횟수",                        guidance:"2회 근육주사"},
        {range:"접종 간격",                        guidance:"2~6개월 (최소 4주)"},
        {range:"6개월 초과 지연 시",               guidance:"바로 2차 접종 — 재시작 불필요 (단, 효능 불확실)"},
        {range:"면역저하자",                       guidance:"사백신이므로 접종 가능"},
      ],
      "ZVL · 조스타박스 (생백신)": [
        {range:"접종 횟수",                        guidance:"1회 피하주사"},
        {range:"면역저하자",                       guidance:"생백신 — 금기"},
      ],
      "전환 · 특수상황": [
        {range:"조스타박스 → 싱그릭스 전환",       guidance:"조스타박스 접종 2개월 후부터 가능"},
        {range:"대상포진 이환 후",                 guidance:"완전 회복 후 싱그릭스 접종 가능"},
      ],
    },
  },

  폐렴구균: {
    label: "폐렴구균",
    description: "대한감염학회 · ACIP 기반",
    resultLabel: "폐렴구균 백신 권장",
    referenceTable: {
      "나이 기준": [
        {range:"65세 이상",                        guidance:"PPSV23 (23가 다당류 백신)"},
      ],
      "65세 미만 — 만성질환자": [
        {range:"당뇨, 흡연",                       guidance:"PCV13 접종"},
        {range:"만성 심혈관질환 (심부전·심근병증)", guidance:"PCV13 접종"},
        {range:"만성 폐질환 (COPD·폐기종·천식)",   guidance:"PCV13 접종"},
        {range:"만성 간질환, 알코올 중독",         guidance:"PCV13 접종"},
      ],
      "65세 미만 — 면역저하자": [
        {range:"무비증, 낫적혈구병, 만성 신질환",  guidance:"PCV13 우선"},
        {range:"전신성 암, HIV, 호지킨병",         guidance:"PCV13 우선"},
        {range:"면역억제제, 백혈병, 림프종",       guidance:"PCV13 우선"},
        {range:"다발성골수종, 신증후군, 고형장기이식", guidance:"PCV13 우선"},
      ],
      "기타": [
        {range:"위 해당 없으나 접종 원하는 경우",  guidance:"PCV13 접종 가능"},
      ],
    },
  },

  HPV: {
    label: "HPV",
    description: "ACIP 기반",
    resultLabel: "HPV 백신 접종 스케줄",
    referenceTable: {
      "접종 대상": [
        {range:"여성 11~12세",                     guidance:"기본 접종 대상"},
        {range:"여성 13~26세",                     guidance:"미접종 또는 미완료 시 권장"},
        {range:"여성 27~45세",                     guidance:"전문가 상담 후 이득 있는 경우 고려"},
        {range:"남성 9~26세",                      guidance:"접종 가능"},
      ],
      "접종 간격 (3회, 1년 이내 완료)": [
        {range:"1차",                              guidance:"0개월"},
        {range:"2차",                              guidance:"2개월 후 (최소 1개월 이후)"},
        {range:"3차",                              guidance:"6개월 후 (최소 3개월 이후)"},
      ],
    },
  },

  vaccination: {
    label: "예방접종 참조",
    description: "성인 예방접종 전체 참조표",
    resultLabel: "접종 참조",
    referenceTable: {
      "성인 기본 권장": [
        {range:"파상풍 (Tdap/Td)",                 guidance:"10년마다"},
        {range:"인플루엔자",                       guidance:"매년 — 65세↑, 만성질환자, 의료종사자 특히 권고"},
        {range:"MMR",                              guidance:"1967년 이후 출생, 항체 불확실 → 1회 (고위험군 2회·4주 간격)"},
      ],
      "고위험군 권장": [
        {range:"폐렴구균",                         guidance:"65세↑ 또는 만성질환자"},
        {range:"B형간염",                          guidance:"의료인·고위험군·만성질환자 — 0·1·6개월"},
        {range:"A형간염",                          guidance:"항체 없는 성인 (20~40대, 의료인, 해외여행자)"},
        {range:"대상포진",                         guidance:"50세↑"},
        {range:"HPV",                              guidance:"여성 26세↓, 남성 21세↓"},
        {range:"수두",                             guidance:"면역 없는 1970년 이후 출생자 — 4~8주 간격 2회"},
        {range:"수막구균",                         guidance:"집단생활, 군인, 해외유학"},
        {range:"광견병·일본뇌염·황열",             guidance:"해외여행·봉사 (지역별 맞춤)"},
      ],
      "A형간염": [
        {range:"고위험군",                         guidance:"6~18개월 간격 2회"},
        {range:"40세 미만 (일반)",                 guidance:"항체검사 없이 접종 권고"},
        {range:"40세 이상",                        guidance:"항체검사 후 음성이면 접종"},
        {range:"여행 직전 1차만 접종 시",          guidance:"약 2주 후 보호항체 형성(95%↑) → 출국 가능, 귀국 후 2차 완료"},
      ],
      "B형간염 (미접종 / 고위험군)": [
        {range:"기본 접종",                        guidance:"0·1·6개월 3회"},
        {range:"항체 확인 원하는 경우",            guidance:"3차 접종 1개월 후 HBsAb 검사"},
        {range:"초기 검사 세트",                   guidance:"HBsAg / HBsAb / Anti-HCV Ab / HIV Ag/Ab (B형간염만: HBsAg + HBsAb)"},
        {range:"3회 후 항체(-) — 고위험군·면역저하자", guidance:"추가 3회 재접종(0·1·6개월) → 1~2개월 후 anti-HBs 재검사"},
        {range:"재접종 후에도 항체(-)",            guidance:"비반응자 판정 — 추가 접종 불필요, 노출 시 즉시 HBIG + HBV 백신"},
        {range:"일반인 3회 후 항체(-)",            guidance:"추가 재접종 불필요"},
      ],
      "수두": [
        {range:"대상",                             guidance:"면역 없는 1970년 이후 출생자, 의료인, 교사, 군인, 가임기 여성, 해외여행자"},
        {range:"접종",                             guidance:"4~8주 간격 2회"},
      ],
      "MMR (생백신)": [
        {range:"1967년 이후 출생, 항체 불확실",    guidance:"1회 접종 권장"},
        {range:"고위험군 (의료인·군인·대학생·해외여행자)", guidance:"2회 (4주 간격)"},
        {range:"1967년 이전 출생",                 guidance:"자연감염 항체 보유 가능성↑ — 일반적으로 불필요 (음성 확인 시 고려)"},
      ],
      "폴리오 (IPV, 사백신)": [
        {range:"과거 접종력 없음",                 guidance:"3회: 0 → 1~2개월 → 6~12개월"},
        {range:"접종 완료 + 고위험 직업/유행지역 여행", guidance:"1회 추가접종"},
      ],
      "항암치료 중 독감백신": [
        {range:"ANC ≥ 1,000",                     guidance:"접종 OK"},
        {range:"ANC 500~999",                     guidance:"접종 권고 (효과 약간 감소 가능)"},
        {range:"ANC < 500",                       guidance:"연기 → 회복 후 접종"},
        {range:"표적항암치료 중 (leukopenia 경도~중등도)", guidance:"그대로 접종 안전"},
      ],
    },
  },

};
