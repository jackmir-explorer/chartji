/*
 * knowledge-bundle.js — Librarian 자동 생성. 직접 편집 금지.
 *
 * ============================================================
 * B2 스키마 전환 중 (Phase 3A, 2026-04-20): v1 / v2 엔트리 공존 허용
 * ============================================================
 *
 * 본 파일은 순수 데이터 선언이다. 파서 로직은 없다.
 * 엔트리는 아래 두 shape 중 하나를 가질 수 있다.
 *
 * ---------- v1 shape (레거시, 기존 79 엔트리) ----------
 * "{keyword}": {
 *   "kind":              "disease" | "drug",    // 필수
 *   "exam":              "문진/검사 내용 | null",
 *   "treatment":         "처방/치료 내용 | null",
 *   "differential":      "감별진단 긴 텍스트 | null",
 *   "differentialShort": [{"d":"진단명","t":"h"|"z"}, ...] | null,
 *   "draftTemplate":     "질환 특이 Template | null",
 *   "draftAppend":       "Draft 출력사항 내용 | null"
 * }
 *
 * ---------- v2 shape (B2, 신규 엔트리 — Phase 3B/3C runtime 후 활성) ----------
 * "{keyword}": {
 *   "kind":           "disease" | "drug" | "topic",
 *   "keywords":       ["...synonyms"],
 *   "primarySources": ["Tier 1 출처"],
 *   "sections": {
 *     "{표준 섹션 key}": { "content": "...", "sources": [...] },
 *     "{자유 섹션 key}": { "content": "...", "sources": [...] }
 *   },
 *   "uiHooks": {
 *     "hint":          ["section key ..."],
 *     "guide":         ["section key ...", "*"],
 *     "draftAppend":   ["section key ..."] | null,
 *     "draftTemplate": "section key" | null   // 단일 key, 배열 불허
 *   }
 * }
 *
 * ---------- Consumer 감지 규칙 ----------
 *   entry.sections ? "v2" : "v1"
 *
 * v2 엔트리는 `src/app.js` uiHooks 경로(Phase 3B)와 `src/prompts.js` 조정(Phase 3C)
 * 구현 완료 후부터 실제 소비된다. 그 전에 v2 엔트리를 추가하면 Liby inject가 깨진다.
 *
 * ---------- 참조 ----------
 *   섹션 표준:       knowledge/section-vocabulary.md
 *   출처 규칙:       knowledge/sourcing-rules.md
 *   데이터 흐름:     rules/data-flow.md (UI surface × section 매트릭스)
 *   Librarian:       agents/librarian.md
 *   Ingest skill:    skills/knowledge-ingest/SKILL.md (Step 7 v1 / Step 7-B v2)
 * ============================================================
 */
var KNOWLEDGE_BUNDLE = {
  "BPPV": {
    "kind": "disease",
    "exam": "BPPV 진단: 1단계 Supine Head Roll Test(Horizontal canal). 안진 없으면 2단계 Dix-Hallpike(Posterior canal).",
    "treatment": "Horizontal canal 안진: Geotropic(바닥 beating)→병변=강한 쪽, Apogeotropic(천장 beating)→병변=약한 쪽, 치료=Barbeque Roll.\nPosterior canal 안진: 병변=beating 반대방향, 치료=Modified Epley Maneuver(병변 방향에서 시작).\n【약물】보나링 po PRN (증상 매우 심할 때만) — 반드시 고지: 졸릴 수 있음. 이석정복술 대비 효과 제한적.",
    "differential": null,
    "draftAppend": null
  },
  "이석증": {
    "kind": "disease",
    "exam": "BPPV 진단: 1단계 Supine Head Roll Test(Horizontal canal). 안진 없으면 2단계 Dix-Hallpike(Posterior canal).",
    "treatment": "Horizontal canal 안진: Geotropic(바닥 beating)→병변=강한 쪽, Apogeotropic(천장 beating)→병변=약한 쪽, 치료=Barbeque Roll.\nPosterior canal 안진: 병변=beating 반대방향, 치료=Modified Epley Maneuver(병변 방향에서 시작).\n【약물】보나링 po PRN (증상 매우 심할 때만) — 반드시 고지: 졸릴 수 있음. 이석정복술 대비 효과 제한적.",
    "differential": null,
    "draftAppend": null
  },
  "dizziness": {
    "kind": "disease",
    "exam": "어지럼증 기본 문진: ①언제부터 ②갑자기인지 ③과거 유사 episode ④한번 지속시간 ⑤괜찮을 땐 완전히 괜찮은지 ⑥구역/구토·휘청거림 ⑦귀먹먹함 ⑧이명 ⑨만성이면 월 빈도 ⑩어떤 상황에서 특히 어지러운지 ⑪최근 episode 시점\n편두통 추가 문진: 편두통 과거력, 두통 동반, 빛·소리 과민, 전조증상, 가족력, 발작 빈도.",
    "treatment": null,
    "differential": "【Horses — 흔한 원인】\n1. BPPV — 자세 변화 시 수초~1분, 가장 흔함\n2. 전정신경염 — 바이러스 후 지속성 현훈, 청력저하 없음\n3. 편두통성 어지럼증 — 편두통 과거력+반복성, 두통 없이도 발생 가능\n4. 기립성 저혈압 — 기립 시 발생, 노인·탈수·강압제 복용자\n5. 메니에르병 — 반복성 현훈+이명+편측 청력저하+이충만감\n【Zebra — 드물지만 절대 놓치면 안 됨】\n⚠ 소뇌경색/TIA — 갑작스러운 발병, 보행장애, 두통, 복시·안면마비·구음장애 동반 시 즉시 의심 [AAFP 2017]",
    "differentialShort": [
      {"d":"BPPV",           "t":"h"},
      {"d":"전정신경염",      "t":"h"},
      {"d":"편두통성 어지럼", "t":"h"},
      {"d":"기립성 저혈압",   "t":"h"},
      {"d":"메니에르",        "t":"h"},
      {"d":"소뇌경색/TIA",   "t":"z"}
    ],
    "draftAppend": null
  },
  "어지럼증": {
    "kind": "disease",
    "exam": "어지럼증 문진: 편두통 과거력 확인. 편두통 관련 문진 — 두통 동반 여부, 빛·소리 과민, 구역/구토, 전조증상, 두통 양상(박동성/지속시간), 가족력, 발작 빈도.",
    "treatment": null,
    "differential": "【Horses — 흔한 원인】\n1. BPPV — 자세 변화 시 수초~1분, 가장 흔함\n2. 전정신경염 — 바이러스 후 지속성 현훈, 청력저하 없음\n3. 편두통성 어지럼증 — 편두통 과거력+반복성, 두통 없이도 발생 가능\n4. 기립성 저혈압 — 기립 시 발생, 노인·탈수·강압제 복용자\n5. 메니에르병 — 반복성 현훈+이명+편측 청력저하+이충만감\n【Zebra — 드물지만 절대 놓치면 안 됨】\n⚠ 소뇌경색/TIA — 갑작스러운 발병, 보행장애, 두통, 복시·안면마비·구음장애 동반 시 즉시 의심 [AAFP 2017]",
    "differentialShort": [
      {"d":"BPPV",           "t":"h"},
      {"d":"전정신경염",      "t":"h"},
      {"d":"편두통성 어지럼", "t":"h"},
      {"d":"기립성 저혈압",   "t":"h"},
      {"d":"메니에르",        "t":"h"},
      {"d":"소뇌경색/TIA",   "t":"z"}
    ],
    "draftAppend": null
  },
  "vertigo": {
    "kind": "disease",
    "exam": "어지럼증 문진: 편두통 과거력 확인. 편두통 관련 문진 — 두통 동반 여부, 빛·소리 과민, 구역/구토, 전조증상, 두통 양상(박동성/지속시간), 가족력, 발작 빈도.",
    "treatment": null,
    "differential": "【Horses — 흔한 원인】\n1. BPPV — 자세 변화 시 수초~1분, 가장 흔함\n2. 전정신경염 — 바이러스 후 지속성 현훈, 청력저하 없음\n3. 편두통성 어지럼증 — 편두통 과거력+반복성, 두통 없이도 발생 가능\n4. 기립성 저혈압 — 기립 시 발생, 노인·탈수·강압제 복용자\n5. 메니에르병 — 반복성 현훈+이명+편측 청력저하+이충만감\n【Zebra — 드물지만 절대 놓치면 안 됨】\n⚠ 소뇌경색/TIA — 갑작스러운 발병, 보행장애, 두통, 복시·안면마비·구음장애 동반 시 즉시 의심 [AAFP 2017]",
    "differentialShort": [
      {"d":"BPPV",           "t":"h"},
      {"d":"전정신경염",      "t":"h"},
      {"d":"편두통성 어지럼", "t":"h"},
      {"d":"기립성 저혈압",   "t":"h"},
      {"d":"메니에르",        "t":"h"},
      {"d":"소뇌경색/TIA",   "t":"z"}
    ],
    "draftAppend": null
  },
  "vaccination": {
    "kind": "disease",
    "exam": "예방접종 전 일반 확인: 발열(38도↑ → 연기 고려), 이전 접종 이상반응(아나필락시스 이력), 임신 여부(생백신 금기: MMR·수두·BCG·황열), 면역저하 여부(생백신 주의). 항암치료 중 독감백신: ANC≥1,000 OK / ANC 500-1,000 접종 권고 / ANC<500 연기.",
    "treatment": "접종 간격 원칙[CDC]: 생+사→같은날OK, 간격제한없음. 생+생→같은날OK, 다른날이면 최소28일. 사+사→제한없음.\n생+생 간격 미준수→두번째 무효, 4주후 재접종.",
    "differential": null,
    "draftTemplate": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
    "draftAppend": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함."
  },
  "예방접종": {
    "kind": "disease",
    "exam": "예방접종 전 일반 확인: 발열(38도↑ → 연기 고려), 이전 접종 이상반응(아나필락시스 이력), 임신 여부(생백신 금기: MMR·수두·BCG·황열), 면역저하 여부(생백신 주의). 항암치료 중 독감백신: ANC≥1,000 OK / ANC 500-1,000 접종 권고 / ANC<500 연기.",
    "treatment": "접종 간격 원칙[CDC]: 생+사→같은날OK, 간격제한없음. 생+생→같은날OK, 다른날이면 최소28일. 사+사→제한없음.\n생+생 간격 미준수→두번째 무효, 4주후 재접종.",
    "differential": null,
    "draftTemplate": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
    "draftAppend": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함."
  },
  "백신": {
    "kind": "disease",
    "exam": "예방접종 전 일반 확인: 발열(38도↑ → 연기 고려), 이전 접종 이상반응(아나필락시스 이력), 임신 여부(생백신 금기: MMR·수두·BCG·황열), 면역저하 여부(생백신 주의). 항암치료 중 독감백신: ANC≥1,000 OK / ANC 500-1,000 접종 권고 / ANC<500 연기.",
    "treatment": "접종 간격 원칙[CDC]: 생+사→같은날OK, 간격제한없음. 생+생→같은날OK, 다른날이면 최소28일. 사+사→제한없음.\n생+생 간격 미준수→두번째 무효, 4주후 재접종.",
    "differential": null,
    "draftTemplate": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
    "draftAppend": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함."
  },
  "Tdap": {
    "kind": "disease",
    "exam": "Tdap 전 확인: 임신 여부(임신부→27~36주 접종 권고), 마지막 Td/Tdap 접종 시기(10년 경과 여부), 상처 방문 시 이전 Tdap 접종력 확인.",
    "treatment": "Tdap 스케줄: DTaP 완료자→매 10년 Tdap/Td. 임신부→매 임신 27~36주 Tdap[CDC]. DTaP 미접종/불명→3회[Tdap→Td(4-8주)→Td(6-12개월)]. 외상+Tdap 미접종→Tdap. 0.5mL 근육주사.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "파상풍": {
    "kind": "disease",
    "exam": "Tdap 전 확인: 임신 여부(임신부→27~36주 접종 권고), 마지막 Td/Tdap 접종 시기(10년 경과 여부), 상처 방문 시 이전 Tdap 접종력 확인.",
    "treatment": "Tdap 스케줄: DTaP 완료자→매 10년 Tdap/Td. 임신부→매 임신 27~36주 Tdap[CDC]. DTaP 미접종/불명→3회[Tdap→Td(4-8주)→Td(6-12개월)]. 외상+Tdap 미접종→Tdap. 0.5mL 근육주사.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "대상포진": {
    "kind": "disease",
    "exam": "대상포진 백신 전 확인: 조스타박스(ZVL) 이전 접종 여부(→2개월 후 싱그릭스 가능), 이전 대상포진 이환 이력(완전 회복 후 가능), 면역저하 여부(18세이상 중증면역저하자도 RZV 권고).",
    "treatment": "RZV(싱그릭스): 50세이상 or 18세이상 중증면역저하자. 2회 근육주사, 2-6개월 간격(최소 4주)[CDC]. 6개월 초과 지연→재시작 불필요. ZVL(조스타박스): 1회 피하. 면역저하자 ZVL 금기.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "폐렴구균": {
    "kind": "disease",
    "exam": "폐렴구균 백신 전 확인: 나이(65세이상→PPSV23), 만성질환 여부(당뇨/COPD/심부전/간경화/CKD/알코올/흡연), 면역저하 여부(무비증/HIV/혈액암/신증후군/장기이식→PCV13 우선).",
    "treatment": "폐렴구균: 65세이상→PPSV23(23가). 65세미만 만성질환자→PCV13. 면역저하자→PCV13 우선. 접종 원하는 경우→PCV13 가능.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "HPV": {
    "kind": "disease",
    "exam": null,
    "treatment": "HPV 백신: 여성 11~26세 권고(27~45세 상담 후 고려), 남성 9~26세. 3회: 0→2개월(최소1개월)→6개월(최소3개월)[CDC]. 1년 이내 완료.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "자궁경부암": {
    "kind": "disease",
    "exam": null,
    "treatment": "HPV 백신: 여성 11~26세 권고(27~45세 상담 후 고려), 남성 9~26세. 3회: 0→2개월(최소1개월)→6개월(최소3개월)[CDC]. 1년 이내 완료.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "obesity": {
    "kind": "disease",
    "exam": "표현형(Mayo Clinic): Hungry Brain/Gut→GLP-1 유효, Emotional Hunger→콘트라브+행동치료, Slow Burn→약물 제한적.\n\"적게 먹어도 살찐다\" 3유형: Metabolic(저장효율형,GLP-1좋음)/Perception(과소평가형,실제섭취인지)/Sarcopenic(근육↓기초대사↓,근력운동).\n초진Flow: 설문지→인바디→V/S→상담→Lab(HbA1c/Lipid/LFT/Cr)→약물선택→사용교육+주사→F/U안내.\nF/U 체크: A.보상회로(Food Noise·갈망) B.대사(Brain Fog·기력·단백질) C.위장관(포만감·불편) D.운동.\n단백질ABC순서: A(고기생선먼저)→B(채소)→C(탄수화물마지막). 체중×1.2~1.5g/kg.",
    "treatment": "위고비(Semaglutide) 처방 기준: BMI≥30→단독 가능. BMI 27~30+동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환)→가능. 비급여, 전액 환자 부담[FDA].\n절대금기: MTC 개인력/가족력, MEN2, semaglutide 과민반응, 임신(계획 시 2개월 전 중단).\n상대적주의: 췌장염 과거력, 수유중, 당뇨망막병증(혈당 급격 개선 시 악화), 담석증.",
    "differential": null,
    "draftTemplate": "CC 체중감량\n과거 사용했던 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n현재 사용 중인 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n\n현재 Life style\n* 운동 :\n* 식단 :\n\n경과\n0-4week :\n\nO\nV/S\n키 cm,  체중 kg,  BMI (목표체중 kg)\n\nA\n# 진단받은 질병\n# 가족력 :\n# 음주력 :\n# 흡연력 :\n# 수술력 :\n\n# 평소 운동 :\n# 평소 식단 :",
    "draftAppend": null
  },
  "비만": {
    "kind": "disease",
    "exam": "표현형(Mayo Clinic): Hungry Brain/Gut→GLP-1 유효, Emotional Hunger→콘트라브+행동치료, Slow Burn→약물 제한적.\n\"적게 먹어도 살찐다\" 3유형: Metabolic(저장효율형,GLP-1좋음)/Perception(과소평가형,실제섭취인지)/Sarcopenic(근육↓기초대사↓,근력운동).\n초진Flow: 설문지→인바디→V/S→상담→Lab(HbA1c/Lipid/LFT/Cr)→약물선택→사용교육+주사→F/U안내.\nF/U 체크: A.보상회로(Food Noise·갈망) B.대사(Brain Fog·기력·단백질) C.위장관(포만감·불편) D.운동.\n단백질ABC순서: A(고기생선먼저)→B(채소)→C(탄수화물마지막). 체중×1.2~1.5g/kg.",
    "treatment": "위고비(Semaglutide) 처방 기준: BMI≥30→단독 가능. BMI 27~30+동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환)→가능. 비급여, 전액 환자 부담[FDA].\n절대금기: MTC 개인력/가족력, MEN2, semaglutide 과민반응, 임신(계획 시 2개월 전 중단).\n상대적주의: 췌장염 과거력, 수유중, 당뇨망막병증(혈당 급격 개선 시 악화), 담석증.",
    "differential": null,
    "draftTemplate": "CC 체중감량\n과거 사용했던 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n현재 사용 중인 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n\n현재 Life style\n* 운동 :\n* 식단 :\n\n경과\n0-4week :\n\nO\nV/S\n키 cm,  체중 kg,  BMI (목표체중 kg)\n\nA\n# 진단받은 질병\n# 가족력 :\n# 음주력 :\n# 흡연력 :\n# 수술력 :\n\n# 평소 운동 :\n# 평소 식단 :",
    "draftAppend": null
  },
  "구강건조증": {
    "kind": "disease",
    "exam": null,
    "treatment": "① Pilocarpine(살라겐/필로겐) po — 가이드라인: 두경부암 방사선 후 5mg TID / 쇼그렌증후군 5mg QID / 임상패턴 BID 가능 [출처 미확인] — 급여: 두경부암 방사선 후 or 쇼그렌증후군 / 비급여: 그 외\n② 뮤코미스트 가글 — 10% 1amp + 물 100cc TID — 방사선 유발 xerostomia: Mayo Clinic RCT 근거 / 일반: 임상 경험 [출처 미확인]",
    "differential": null,
    "draftAppend": null
  },
  "구강건조": {
    "kind": "disease",
    "exam": null,
    "treatment": "① Pilocarpine(살라겐/필로겐) po — 가이드라인: 두경부암 방사선 후 5mg TID / 쇼그렌증후군 5mg QID / 임상패턴 BID 가능 [출처 미확인] — 급여: 두경부암 방사선 후 or 쇼그렌증후군 / 비급여: 그 외\n② 뮤코미스트 가글 — 10% 1amp + 물 100cc TID — 방사선 유발 xerostomia: Mayo Clinic RCT 근거 / 일반: 임상 경험 [출처 미확인]",
    "differential": null,
    "draftAppend": null
  },
  "dry mouth": {
    "kind": "disease",
    "exam": null,
    "treatment": "① Pilocarpine(살라겐/필로겐) po — 가이드라인: 두경부암 방사선 후 5mg TID / 쇼그렌증후군 5mg QID / 임상패턴 BID 가능 [출처 미확인] — 급여: 두경부암 방사선 후 or 쇼그렌증후군 / 비급여: 그 외\n② 뮤코미스트 가글 — 10% 1amp + 물 100cc TID — 방사선 유발 xerostomia: Mayo Clinic RCT 근거 / 일반: 임상 경험 [출처 미확인]",
    "differential": null,
    "draftAppend": null
  },
  "xerostomia": {
    "kind": "disease",
    "exam": null,
    "treatment": "① Pilocarpine(살라겐/필로겐) po — 가이드라인: 두경부암 방사선 후 5mg TID / 쇼그렌증후군 5mg QID / 임상패턴 BID 가능 [출처 미확인] — 급여: 두경부암 방사선 후 or 쇼그렌증후군 / 비급여: 그 외\n② 뮤코미스트 가글 — 10% 1amp + 물 100cc TID — 방사선 유발 xerostomia: Mayo Clinic RCT 근거 / 일반: 임상 경험 [출처 미확인]",
    "differential": null,
    "draftAppend": null
  },
  "burning mouth": {
    "kind": "disease",
    "exam": null,
    "treatment": "뮤코미스트 가글 — 10% 1amp + 물 100cc TID\n다기관 임상(2025): VAS 통증 + 삶의 질 유의 개선\nClonazepam 0.5mg/d 병용 시 반응률 60% → 80%\n[출처: Kim JW et al. Sci Rep 2025]",
    "differential": null,
    "draftAppend": null
  },
  "구강작열감": {
    "kind": "disease",
    "exam": null,
    "treatment": "뮤코미스트 가글 — 10% 1amp + 물 100cc TID\n다기관 임상(2025): VAS 통증 + 삶의 질 유의 개선\nClonazepam 0.5mg/d 병용 시 반응률 60% → 80%\n[출처: Kim JW et al. Sci Rep 2025]",
    "differential": null,
    "draftAppend": null
  },
  "BMS": {
    "kind": "disease",
    "exam": null,
    "treatment": "뮤코미스트 가글 — 10% 1amp + 물 100cc TID\n다기관 임상(2025): VAS 통증 + 삶의 질 유의 개선\nClonazepam 0.5mg/d 병용 시 반응률 60% → 80%\n[출처: Kim JW et al. Sci Rep 2025]",
    "differential": null,
    "draftAppend": null
  },
  "구강병변": {
    "kind": "disease",
    "exam": "백반증(white patch)/궤양: 1달 내 호전 확인 필수. 미호전 → 악성 전환 가능성 → ENT refer.",
    "treatment": "1단계: Dexamethasone powder + 물 1L → 하루 3-4회 가글\n2단계(가글 무효 시): 가글 유지 + 소론도(prednisolone) 2T #2 ×14일 → f/u\n3단계(미호전): ENT refer (생검 등 정밀검사)\n통증 심할 때: Tantum Verde(benzydamine) spray\nTriamcinolone 병변 내 주사 — 난치성 궤양 [CLINICAL]",
    "differential": "구강백반증(악성 전환율 ~1%/년), 구강편평태선, 캔디다증, 외상성 궤양, 구강암",
    "draftAppend": null
  },
  "oral white patch": {
    "kind": "disease",
    "exam": "백반증(white patch)/궤양: 1달 내 호전 확인 필수. 미호전 → 악성 전환 가능성 → ENT refer.",
    "treatment": "1단계: Dexamethasone powder + 물 1L → 하루 3-4회 가글\n2단계(가글 무효 시): 가글 유지 + 소론도(prednisolone) 2T #2 ×14일 → f/u\n3단계(미호전): ENT refer (생검 등 정밀검사)\n통증 심할 때: Tantum Verde(benzydamine) spray\nTriamcinolone 병변 내 주사 — 난치성 궤양 [CLINICAL]",
    "differential": "구강백반증(악성 전환율 ~1%/년), 구강편평태선, 캔디다증, 외상성 궤양, 구강암",
    "draftAppend": null
  },
  "구강궤양": {
    "kind": "disease",
    "exam": "백반증(white patch)/궤양: 1달 내 호전 확인 필수. 미호전 → 악성 전환 가능성 → ENT refer.",
    "treatment": "1단계: Dexamethasone powder + 물 1L → 하루 3-4회 가글\n2단계(가글 무효 시): 가글 유지 + 소론도(prednisolone) 2T #2 ×14일 → f/u\n3단계(미호전): ENT refer (생검 등 정밀검사)\n통증 심할 때: Tantum Verde(benzydamine) spray\nTriamcinolone 병변 내 주사 — 난치성 궤양 [CLINICAL]",
    "differential": "구강백반증(악성 전환율 ~1%/년), 구강편평태선, 캔디다증, 외상성 궤양, 구강암",
    "draftAppend": null
  },
  "LPR": {
    "kind": "disease",
    "exam": null,
    "treatment": "PPI (1차 치료, 근거 확립)\n뮤테란(아세틸시스테인 경구) 병용 — LPR 인후 분비물·점액 거담 목적 [TIPS]\nPPI 부작용 시: ① 알긴산(Gaviscon류) — raft 형성, 역류 물리적 차단 ② Promac(polaprezinc) — 위점막 보호제. 병용 가능 [TIPS — by ENT교수]",
    "differential": null,
    "draftAppend": null
  },
  "후두염": {
    "kind": "disease",
    "exam": null,
    "treatment": "PPI (1차 치료, 근거 확립)\n뮤테란(아세틸시스테인 경구) 병용 — LPR 인후 분비물·점액 거담 목적 [TIPS]\nPPI 부작용 시: ① 알긴산(Gaviscon류) — raft 형성, 역류 물리적 차단 ② Promac(polaprezinc) — 위점막 보호제. 병용 가능 [TIPS — by ENT교수]",
    "differential": null,
    "draftAppend": null
  },
  "인후두역류": {
    "kind": "disease",
    "exam": null,
    "treatment": "PPI (1차 치료, 근거 확립)\n뮤테란(아세틸시스테인 경구) 병용 — LPR 인후 분비물·점액 거담 목적 [TIPS]\nPPI 부작용 시: ① 알긴산(Gaviscon류) — raft 형성, 역류 물리적 차단 ② Promac(polaprezinc) — 위점막 보호제. 병용 가능 [TIPS — by ENT교수]",
    "differential": null,
    "draftAppend": null
  },
  "저음성난청": {
    "kind": "disease",
    "exam": "귀먹먹함 지속 시 청력검사 → 달팽이관 내압 직접 확인. 이명·반복성 여부 확인.",
    "treatment": "유턴정(베타히스틴) — 내림프수종 완화. 부작용(심계항진·혈압) 시 반알 감량. 크롬친화세포종 절대금기.\n다이크로짇(HCTZ) 반알 추가 — 달팽이관 내압 감소 [TIPS]\n귀먹먹함 단독 시: 유턴정 TID\n생활 지도: 스트레스 → 내압 상승 → 관리 중요",
    "differential": null,
    "draftAppend": null
  },
  "귀먹먹함": {
    "kind": "disease",
    "exam": "청력검사 고려 (달팽이관 내압 확인). 이명·반복성 여부.",
    "treatment": "유턴정(베타히스틴) TID [TIPS]\n미호전 시 청력검사\n스트레스 관리 중요 (내압 상승 요인)",
    "differential": null,
    "draftAppend": null
  },
  "이충만감": {
    "kind": "disease",
    "exam": "청력검사 고려 (달팽이관 내압 확인). 이명·반복성 여부.",
    "treatment": "유턴정(베타히스틴) TID [TIPS]\n미호전 시 청력검사\n스트레스 관리 중요 (내압 상승 요인)",
    "differential": null,
    "draftAppend": null
  },
  "lichen planus": {
    "kind": "disease",
    "exam": "백반증(white patch)/궤양: 1달 내 호전 확인 필수. 미호전 → 악성 전환 가능성 → ENT refer.",
    "treatment": "1단계: Dexamethasone powder + 물 1L → 하루 3-4회 가글\n2단계(가글 무효 시): 가글 유지 + 소론도(prednisolone) 2T #2 ×14일 → f/u\n3단계(미호전): ENT refer (생검 등 정밀검사)\n통증 심할 때: Tantum Verde(benzydamine) spray\nTriamcinolone 병변 내 주사 — 난치성 궤양 [CLINICAL]",
    "differential": "구강백반증(악성 전환율 ~1%/년), 구강편평태선, 캔디다증, 외상성 궤양, 구강암",
    "draftAppend": null
  },
  "위고비": {
    "kind": "drug",
    "exam": null,
    "treatment": "Wegovy(semaglutide) 처방: BMI≥30 단독 / BMI 27~30+동반질환. 비급여.\n시작 0.25mg, 순차증량(0.25→0.5→1.0→1.7→2.4mg).\n절대금기: MTC가족력, MEN2, 과민반응, 임신(2개월전 중단).\n주의: 췌장염, 수유, 당뇨망막병증, 담석.\nMASH F2-F3 지방간염도 적응증(FDA 2025). 소아 12세이상 BMI≥95th%ile(FDA 2022).",
    "differential": null,
    "draftAppend": null
  },
  "wegovy": {
    "kind": "drug",
    "exam": null,
    "treatment": "Wegovy(semaglutide) 처방: BMI≥30 단독 / BMI 27~30+동반질환. 비급여.\n시작 0.25mg, 순차증량(0.25→0.5→1.0→1.7→2.4mg).\n절대금기: MTC가족력, MEN2, 과민반응, 임신(2개월전 중단).\n주의: 췌장염, 수유, 당뇨망막병증, 담석.\nMASH F2-F3 지방간염도 적응증(FDA 2025). 소아 12세이상 BMI≥95th%ile(FDA 2022).",
    "differential": null,
    "draftAppend": null
  },
  "semaglutide": {
    "kind": "drug",
    "exam": null,
    "treatment": "Wegovy(비만): BMI≥30 단독 / BMI 27~30+동반질환. 비급여. 시작 0.25mg 순차증량.\nOzempic(T2DM급여): Met+SU 2~4개월 + HbA1c≥7% + BMI≥25. 3종병용으로 급여인정.\n절대금기: MTC가족력, MEN2, 과민반응, 임신.",
    "differential": null,
    "draftAppend": null
  },
  "마운자로": {
    "kind": "drug",
    "exam": null,
    "treatment": "Mounjaro/Zepbound(tirzepatide): T2DM(Mounjaro) + 비만(Zepbound).\n시작 2.5mg, 4주후 5mg 증량 유지. 웬티카 방식 간단.\n10mg까지 효과뚜렷, 15mg 추가이익 적음(+1.1%p).\n위고비 대비: 초반 감량 빠름, 최종 감량폭 큼(-20.2% vs -13.7%, SURMOUNT-5).\nT2DM 환자 실비보험 활용 가능 — 동반질환·가족력·HbA1c·BST 철저 기록.",
    "differential": null,
    "draftAppend": null
  },
  "mounjaro": {
    "kind": "drug",
    "exam": null,
    "treatment": "Mounjaro/Zepbound(tirzepatide): T2DM(Mounjaro) + 비만(Zepbound).\n시작 2.5mg, 4주후 5mg 증량 유지. 웬티카 방식 간단.\n10mg까지 효과뚜렷, 15mg 추가이익 적음(+1.1%p).\n위고비 대비: 초반 감량 빠름, 최종 감량폭 큼(-20.2% vs -13.7%, SURMOUNT-5).\nT2DM 환자 실비보험 활용 가능 — 동반질환·가족력·HbA1c·BST 철저 기록.",
    "differential": null,
    "draftAppend": null
  },
  "tirzepatide": {
    "kind": "drug",
    "exam": null,
    "treatment": "Mounjaro/Zepbound(tirzepatide): T2DM(Mounjaro) + 비만(Zepbound).\n시작 2.5mg, 4주후 5mg 증량 유지. 웬티카 방식 간단.\n10mg까지 효과뚜렷, 15mg 추가이익 적음(+1.1%p).\n위고비 대비: 초반 감량 빠름, 최종 감량폭 큼(-20.2% vs -13.7%, SURMOUNT-5).\nT2DM 환자 실비보험 활용 가능 — 동반질환·가족력·HbA1c·BST 철저 기록.",
    "differential": null,
    "draftAppend": null
  },
  "zepbound": {
    "kind": "drug",
    "exam": null,
    "treatment": "Mounjaro/Zepbound(tirzepatide): T2DM(Mounjaro) + 비만(Zepbound).\n시작 2.5mg, 4주후 5mg 증량 유지. 웬티카 방식 간단.\n10mg까지 효과뚜렷, 15mg 추가이익 적음(+1.1%p).\n위고비 대비: 초반 감량 빠름, 최종 감량폭 큼(-20.2% vs -13.7%, SURMOUNT-5).\nT2DM 환자 실비보험 활용 가능 — 동반질환·가족력·HbA1c·BST 철저 기록.",
    "differential": null,
    "draftAppend": null
  },
  "오젬픽": {
    "kind": "drug",
    "exam": null,
    "treatment": "Ozempic(semaglutide 1mg) — 위고비의 보험급여 버전(T2DM 적응증).\n급여조건: Met+SU 2~4개월 + HbA1c≥7% + BMI≥25(또는 인슐린불가). 3종병용 형태.\n급여 기준 까다로워 대부분 해당 안됨. 비만 목적→위고비(비급여).",
    "differential": null,
    "draftAppend": null
  },
  "ozempic": {
    "kind": "drug",
    "exam": null,
    "treatment": "Ozempic(semaglutide 1mg) — 위고비의 보험급여 버전(T2DM 적응증).\n급여조건: Met+SU 2~4개월 + HbA1c≥7% + BMI≥25(또는 인슐린불가). 3종병용 형태.\n급여 기준 까다로워 대부분 해당 안됨. 비만 목적→위고비(비급여).",
    "differential": null,
    "draftAppend": null
  },
  "A형간염": {
    "kind": "disease",
    "exam": null,
    "treatment": "A형간염: 고위험군 6-18개월 간격 2회.\n40세 미만→항체검사 없이 접종. 40세 이상→항체검사 후 음성이면 접종.\n여행: 1차 후 ~2주 보호항체 95%↑ → 출국 직전 1차 가능, 귀국 후 2차.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "hepatitis A": {
    "kind": "disease",
    "exam": null,
    "treatment": "A형간염: 고위험군 6-18개월 간격 2회.\n40세 미만→항체검사 없이 접종. 40세 이상→항체검사 후 음성이면 접종.\n여행: 1차 후 ~2주 보호항체 95%↑ → 출국 직전 1차 가능, 귀국 후 2차.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "B형간염": {
    "kind": "disease",
    "exam": "초진 혈액: HBsAg/HBsAb/Anti-HCV Ab/HIV Ag·Ab (4종). B형만: HBsAg/HBsAb (2종).",
    "treatment": "B형간염: 3회 근육주사(삼각근) 0·1·6개월[CDC].\n항체검사: 3차 1개월 후 anti-HBs.\nNon-responder(의료인등): 3회 재접종→1~2개월 후 재검→음성이면 판정. 추후 노출 시 HBIG+백신.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "hepatitis B": {
    "kind": "disease",
    "exam": "초진 혈액: HBsAg/HBsAb/Anti-HCV Ab/HIV Ag·Ab (4종). B형만: HBsAg/HBsAb (2종).",
    "treatment": "B형간염: 3회 근육주사(삼각근) 0·1·6개월[CDC].\n항체검사: 3차 1개월 후 anti-HBs.\nNon-responder(의료인등): 3회 재접종→1~2개월 후 재검→음성이면 판정. 추후 노출 시 HBIG+백신.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "herpes zoster": {
    "kind": "disease",
    "exam": "대상포진 백신 전 확인: 조스타박스(ZVL) 이전 접종 여부(→2개월 후 싱그릭스 가능), 이전 대상포진 이환 이력(완전 회복 후 가능), 면역저하 여부(18세이상 중증면역저하자도 RZV 권고).",
    "treatment": "RZV(싱그릭스): 50세이상 or 18세이상 중증면역저하자. 2회 근육주사, 2-6개월 간격(최소 4주)[CDC]. 6개월 초과 지연→재시작 불필요. ZVL(조스타박스): 1회 피하. 면역저하자 ZVL 금기.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "shingrix": {
    "kind": "disease",
    "exam": "대상포진 백신 전 확인: 조스타박스(ZVL) 이전 접종 여부(→2개월 후 싱그릭스 가능), 이전 대상포진 이환 이력(완전 회복 후 가능), 면역저하 여부(18세이상 중증면역저하자도 RZV 권고).",
    "treatment": "RZV(싱그릭스): 50세이상 or 18세이상 중증면역저하자. 2회 근육주사, 2-6개월 간격(최소 4주)[CDC]. 6개월 초과 지연→재시작 불필요. ZVL(조스타박스): 1회 피하. 면역저하자 ZVL 금기.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "싱그릭스": {
    "kind": "disease",
    "exam": "대상포진 백신 전 확인: 조스타박스(ZVL) 이전 접종 여부(→2개월 후 싱그릭스 가능), 이전 대상포진 이환 이력(완전 회복 후 가능), 면역저하 여부(18세이상 중증면역저하자도 RZV 권고).",
    "treatment": "RZV(싱그릭스): 50세이상 or 18세이상 중증면역저하자. 2회 근육주사, 2-6개월 간격(최소 4주)[CDC]. 6개월 초과 지연→재시작 불필요. ZVL(조스타박스): 1회 피하. 면역저하자 ZVL 금기.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "조스타박스": {
    "kind": "disease",
    "exam": "대상포진 백신 전 확인: 조스타박스(ZVL) 이전 접종 여부(→2개월 후 싱그릭스 가능), 이전 대상포진 이환 이력(완전 회복 후 가능), 면역저하 여부(18세이상 중증면역저하자도 RZV 권고).",
    "treatment": "RZV(싱그릭스): 50세이상 or 18세이상 중증면역저하자. 2회 근육주사, 2-6개월 간격(최소 4주)[CDC]. 6개월 초과 지연→재시작 불필요. ZVL(조스타박스): 1회 피하. 면역저하자 ZVL 금기.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "pneumococcal": {
    "kind": "disease",
    "exam": "폐렴구균 백신 전 확인: 나이(65세이상→PPSV23), 만성질환 여부(당뇨/COPD/심부전/간경화/CKD/알코올/흡연), 면역저하 여부(무비증/HIV/혈액암/신증후군/장기이식→PCV13 우선).",
    "treatment": "폐렴구균: 65세이상→PPSV23(23가). 65세미만 만성질환자→PCV13. 면역저하자→PCV13 우선. 접종 원하는 경우→PCV13 가능.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "인유두종바이러스": {
    "kind": "disease",
    "exam": null,
    "treatment": "HPV 백신: 여성 11~26세 권고(27~45세 상담 후 고려), 남성 9~26세. 3회: 0→2개월(최소1개월)→6개월(최소3개월)[CDC]. 1년 이내 완료.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "가다실": {
    "kind": "disease",
    "exam": null,
    "treatment": "HPV 백신: 여성 11~26세 권고(27~45세 상담 후 고려), 남성 9~26세. 3회: 0→2개월(최소1개월)→6개월(최소3개월)[CDC]. 1년 이내 완료.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "일본뇌염": {
    "kind": "disease",
    "exam": null,
    "treatment": "사백신(IXIARO): 2회(0일·28일), 필요시 1~2년후 추가. 부작용 적음.\n생백신(Imojev): 성인 1회. 임신부·면역저하자 금기.\n여행 직전(시간없음)→생백신 1회(금기없을때). 시간 여유→사백신 2회.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "Japanese encephalitis": {
    "kind": "disease",
    "exam": null,
    "treatment": "사백신(IXIARO): 2회(0일·28일), 필요시 1~2년후 추가. 부작용 적음.\n생백신(Imojev): 성인 1회. 임신부·면역저하자 금기.\n여행 직전(시간없음)→생백신 1회(금기없을때). 시간 여유→사백신 2회.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "광견병": {
    "kind": "disease",
    "exam": null,
    "treatment": "노출전예방: 기본 2회(0일·7일). 고위험(실험실/야생동물/유행지역3년초과)→3회(0·7·21-28일).\n추가접종: 완료 1년째 1회, 이후 5년마다.\n직업적 지속노출→항체역가 측정+추가접종[CDC/WHO].",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "rabies": {
    "kind": "disease",
    "exam": null,
    "treatment": "노출전예방: 기본 2회(0일·7일). 고위험(실험실/야생동물/유행지역3년초과)→3회(0·7·21-28일).\n추가접종: 완료 1년째 1회, 이후 5년마다.\n직업적 지속노출→항체역가 측정+추가접종[CDC/WHO].",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "수두": {
    "kind": "disease",
    "exam": null,
    "treatment": "수두(생백신): 1970년 이후 출생+면역없는 자. 4~8주 간격 2회.\n대상: 학생/군인/의료인/교사/해외여행/가임기여성/면역저하자 밀접접촉자.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "varicella": {
    "kind": "disease",
    "exam": null,
    "treatment": "수두(생백신): 1970년 이후 출생+면역없는 자. 4~8주 간격 2회.\n대상: 학생/군인/의료인/교사/해외여행/가임기여성/면역저하자 밀접접촉자.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "MMR": {
    "kind": "disease",
    "exam": null,
    "treatment": "MMR(생백신): 1967년 이전 출생→불필요(자연감염 항체). 1967년 이후+불확실→1회.\n고위험군(의료인/군인/대학생/해외여행)→2회(4주간격).\n항체검사 음성시 접종 고려.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "홍역": {
    "kind": "disease",
    "exam": null,
    "treatment": "MMR(생백신): 1967년 이전 출생→불필요(자연감염 항체). 1967년 이후+불확실→1회.\n고위험군(의료인/군인/대학생/해외여행)→2회(4주간격).",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "풍진": {
    "kind": "disease",
    "exam": null,
    "treatment": "MMR(생백신): 1967년 이전 출생→불필요. 1967년 이후+불확실→1회.\n고위험군→2회(4주간격).",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "폴리오": {
    "kind": "disease",
    "exam": null,
    "treatment": "IPV(사백신): 접종력 없음→3회(0·1~2개월·6~12개월).\n접종완료+고위험→1회 추가.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "IPV": {
    "kind": "disease",
    "exam": null,
    "treatment": "IPV(사백신): 접종력 없음→3회(0·1~2개월·6~12개월).\n접종완료+고위험→1회 추가.",
    "differential": null,
    "draftTemplate": null,
    "draftAppend": null
  },
  "후각감퇴": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부] CRS 동반 시 효과, post-viral 단독은 보조\nNasal steroid spray [CLINICAL — 조건부] CRS/비용종 효과, post-COVID 단독 미확립\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일 [TIPS — by ENT교수]\nSmell training: 표준 향 4종, 매일 2회, 최소 12주 [CLINICAL]\n비타민 B·C [TIPS — by ENT교수]\n후각검사: F/U 모니터링 목적, 초진 일상 시행 불필요 [TIPS — by ENT교수]",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상 (cribriform plate 손상)\n4. 알츠하이머·파킨슨 초기증상 (90%·85% — 운동·인지 증상 수년 선행)\n5. 갑상선저하증(가역적, T4 치료 후 회복) / 만성신부전(uremic toxin)",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "후각기능저하": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부] CRS 동반 시 효과, post-viral 단독은 보조\nNasal steroid spray [CLINICAL — 조건부] CRS/비용종 효과, post-COVID 단독 미확립\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일 [TIPS — by ENT교수]\nSmell training: 표준 향 4종, 매일 2회, 최소 12주 [CLINICAL]\n비타민 B·C [TIPS — by ENT교수]",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상\n4. 알츠하이머·파킨슨 초기증상\n5. 갑상선저하증/만성신부전",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "hyposmia": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부]\nNasal steroid spray [CLINICAL — 조건부]\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일\nSmell training: 표준 향 4종, 매일 2회, 최소 12주\n비타민 B·C",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상\n4. 알츠하이머·파킨슨 초기증상\n5. 갑상선저하증/만성신부전",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "anosmia": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부]\nNasal steroid spray [CLINICAL — 조건부]\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일\nSmell training: 표준 향 4종, 매일 2회, 최소 12주\n비타민 B·C",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상\n4. 알츠하이머·파킨슨 초기증상\n5. 갑상선저하증/만성신부전",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "후각소실": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부]\nNasal steroid spray [CLINICAL — 조건부]\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일\nSmell training: 표준 향 4종, 매일 2회, 최소 12주\n비타민 B·C",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상\n4. 알츠하이머·파킨슨 초기증상\n5. 갑상선저하증/만성신부전",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "냄새 못맡음": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상\n두부 외상력\n인지기능 저하·파킨슨 증상",
    "treatment": "식염수 코세척\nNasal steroid spray\nPrednisolone 7일 taper\nSmell training: 표준 향 4종, 매일 2회, 최소 12주\n비타민 B·C",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상\n4. 알츠하이머·파킨슨 초기증상\n5. 갑상선저하증/만성신부전",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "후각저하": {
    "kind": "disease",
    "exam": "선행 감염(COVID-19/감기) 여부·발병 시점\n비염·부비동염 증상(코막힘·콧물·안면통)\n두부 외상력\n인지기능 저하·파킨슨 증상\n갑상선기능저하·만성신부전(투석) 여부",
    "treatment": "식염수 코세척 [CLINICAL — 조건부] CRS 동반 시 효과, post-viral 단독은 보조\nNasal steroid spray [CLINICAL — 조건부] CRS/비용종 효과, post-COVID 단독 미확립\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일 [TIPS — by ENT교수]\nSmell training: 표준 향 4종, 매일 2회, 최소 12주 [CLINICAL]\n비타민 B·C [TIPS — by ENT교수]\n후각검사: F/U 모니터링 목적, 초진 일상 시행 불필요 [TIPS — by ENT교수]",
    "differential": "1. Post-viral(COVID-19) ★가장 흔함\n2. Sinusitis/CRS/비용종 ★흔함\n3. 두부 외상 (cribriform plate 손상)\n4. 알츠하이머·파킨슨 초기증상 (90%·85% — 운동·인지 증상 수년 선행)\n5. 갑상선저하증(가역적, T4 치료 후 회복) / 만성신부전(uremic toxin)",
    "differentialShort": [{"d":"Post-viral(COVID-19)","t":"h"},{"d":"Sinusitis/CRS","t":"h"},{"d":"두부외상","t":"z"},{"d":"알츠하이머·파킨슨","t":"z"},{"d":"갑상선저하증/신부전","t":"z"}],
    "draftTemplate": null,
    "draftAppend": null
  },
  "dysphonia": {
    "kind": "disease",
    "exam": null,
    "treatment": "생활습관: ① 수분 1~1.5L/day — 성대 점막 수분 유지 [CLINICAL — 조건부, PMID:29122414]\n② 목 앞 세로근(strap muscle) 꼬집기 마사지 — MTD(근긴장성발성장애)에서 효과 [CLINICAL — 조건부, PMID:37366280]\n※ 마사지는 MTD 대상. 기질성 병변엔 적응증 아님",
    "differential": null,
    "draftAppend": null
  },
  "쉰목소리": {
    "kind": "disease",
    "exam": null,
    "treatment": "생활습관: ① 수분 1~1.5L/day — 성대 점막 수분 유지 [CLINICAL — 조건부, PMID:29122414]\n② 목 앞 세로근(strap muscle) 꼬집기 마사지 — MTD(근긴장성발성장애)에서 효과 [CLINICAL — 조건부, PMID:37366280]\n※ 마사지는 MTD 대상. 기질성 병변엔 적응증 아님",
    "differential": null,
    "draftAppend": null
  },
  "hoarseness": {
    "kind": "disease",
    "exam": null,
    "treatment": "생활습관: ① 수분 1~1.5L/day — 성대 점막 수분 유지 [CLINICAL — 조건부, PMID:29122414]\n② 목 앞 세로근(strap muscle) 꼬집기 마사지 — MTD(근긴장성발성장애)에서 효과 [CLINICAL — 조건부, PMID:37366280]\n※ 마사지는 MTD 대상. 기질성 병변엔 적응증 아님",
    "differential": null,
    "draftAppend": null
  },
  "목소리이상": {
    "kind": "disease",
    "exam": null,
    "treatment": "생활습관: ① 수분 1~1.5L/day — 성대 점막 수분 유지 [CLINICAL — 조건부, PMID:29122414]\n② 목 앞 세로근(strap muscle) 꼬집기 마사지 — MTD(근긴장성발성장애)에서 효과 [CLINICAL — 조건부, PMID:37366280]\n※ 마사지는 MTD 대상. 기질성 병변엔 적응증 아님",
    "differential": null,
    "draftAppend": null
  },
  "경부종괴": {
    "kind": "disease",
    "exam": "촉진 → 초음파+도플러(혈관vs림프절 구분. 목정맥 확장이 종괴 오인 경우 있음) → 기저질환 확인 필수.\n필요시 초음파유도 aspiration, 애매한 경우 조직검사.",
    "treatment": "림프절염(가장 흔한 원인): 증상없음→관찰. 압통/발열/커짐→항생제(S.aureus·GAS 타겟).\n수주~수개월 지속 가능, 반복 발생 흔함.\n⚠️ 4~6주 이상 지속 or 치료 반응 없으면 → 조직검사 (림프종 오진 가능성)",
    "differential": "【Horses】① 림프절염/반응성 림프절병증 ★가장흔함 ② 피지낭종·지방종 ③ 갑상선결절\n【Zebra】⚠️ 림프종(4~6주지속/B증상/치료무반응) ⚠️ 전이성악성종양",
    "differentialShort": [
      {"d":"림프절염","t":"h"},
      {"d":"피지낭종/지방종","t":"h"},
      {"d":"갑상선결절","t":"h"},
      {"d":"림프종","t":"z"},
      {"d":"전이성악성종양","t":"z"}
    ],
    "draftAppend": null
  },
  "neck mass": {
    "kind": "disease",
    "exam": "촉진 → 초음파+도플러(혈관vs림프절 구분. 목정맥 확장이 종괴 오인 경우 있음) → 기저질환 확인 필수.\n필요시 초음파유도 aspiration, 애매한 경우 조직검사.",
    "treatment": "림프절염(가장 흔한 원인): 증상없음→관찰. 압통/발열/커짐→항생제(S.aureus·GAS 타겟).\n수주~수개월 지속 가능, 반복 발생 흔함.\n⚠️ 4~6주 이상 지속 or 치료 반응 없으면 → 조직검사 (림프종 오진 가능성)",
    "differential": "【Horses】① 림프절염/반응성 림프절병증 ★가장흔함 ② 피지낭종·지방종 ③ 갑상선결절\n【Zebra】⚠️ 림프종(4~6주지속/B증상/치료무반응) ⚠️ 전이성악성종양",
    "differentialShort": [
      {"d":"림프절염","t":"h"},
      {"d":"피지낭종/지방종","t":"h"},
      {"d":"갑상선결절","t":"h"},
      {"d":"림프종","t":"z"},
      {"d":"전이성악성종양","t":"z"}
    ],
    "draftAppend": null
  },
  "림프절염": {
    "kind": "disease",
    "exam": "초음파+도플러로 혈관 vs 림프절 구분. 기저질환 확인.",
    "treatment": "증상없음→관찰. 압통/발열/커짐→항생제.\n수주~수개월 지속 가능. 반복 발생 흔함.\n⚠️ 4~6주 이상 지속 or 치료 반응 없으면 조직검사 (림프종 감별)",
    "differential": null,
    "draftAppend": null
  },
  "lymphadenitis": {
    "kind": "disease",
    "exam": "초음파+도플러로 혈관 vs 림프절 구분. 기저질환 확인.",
    "treatment": "증상없음→관찰. 압통/발열/커짐→항생제.\n수주~수개월 지속 가능. 반복 발생 흔함.\n⚠️ 4~6주 이상 지속 or 치료 반응 없으면 조직검사 (림프종 감별)",
    "differential": null,
    "draftAppend": null
  },
  /* ─── v2 (B2) 엔트리 — Phase 3B end-to-end 검증용 1회 한정 수동 컴파일.
         원본: knowledge/by-disease/urticaria.md (Tier 1~3 출처 정합 완성본).
         정상 경로는 Liby ingest skill. Phase 4 마이그레이션에서 재ingest로 정합성 재확인 예정. ─── */
  "urticaria": {
    "kind": "disease",
    "keywords": ["urticaria","두드러기","혈관부종","angioedema","항히스타민","omalizumab","만성두드러기","CSU"],
    "primarySources": [
      "EAACI/GA²LEN/EuroGuiDerm/APAAACI 2021 — Urticaria Guideline (Zuberbier T. Allergy 2022;77(3):734-766. PMID:34536239, DOI:10.1111/all.15090)",
      "Semenya AM et al. AFP 2026 임상 리뷰 (Am Fam Physician 2026;113(3):222-228. PMID:41839072)"
    ],
    "sections": {
      "classification": {
        "content": "| 구분 | 정의 | 특징 |\n|---|---|---|\n| 급성 | 6주 미만 지속 | 자기제한적, 진단 검사 불필요 |\n| 만성 (CSU) | 6주 이상 지속 | 제한적 검사 권고 |\n\n혈관부종 동반 가능. 병태생리: 비만세포 탈과립 → histamine 유리.",
        "sources": []
      },
      "protocol": {
        "content": "### Step 1 — 표준 용량 2세대 H1 항히스타민제\nCetirizine 10mg, Loratadine 10mg, Fexofenadine 180mg, Levocetirizine 5mg, Bilastine 20mg, Desloratadine 5mg (1일 1회). 1세대 비권고(진정·항콜린). 6주 초과 시 평가.\n\n### Step 2 — 2~4주 반응 불충분 시 최대 4배 증량\nup-dosing (fourfold) — off-label이지만 EAACI 가이드라인 및 다수 RCT 근거. Cetirizine 40/Loratadine 40/Fexofenadine 720/Levocetirizine 20/Bilastine 80/Desloratadine 20 mg/일. 분할 복용 가능, 같은 약물 유지 권고. 증량 후 1~2주 재평가.\n동반 검사 (limited workup): CBC w/ diff, CRP/ESR, (선택) TSH·anti-TPO, ANA·간기능·D-dimer(임상 지시 시).\n\n### Step 3 — 4주 반응 없음 → Omalizumab 추가\nOmalizumab 300mg SQ q4w (만 12세↑). 반응률 ~70%. 2세대 H1 유지 병용. 전문의 의뢰(알레르기·피부과) 고려 시점.\n\n### Step 4 — Omalizumab 불응성 → Ciclosporin\n전문의 처방 영역. 신기능·혈압 모니터링 필수.",
        "sources": ["Ryan D. Clin Transl Allergy 2022;12(10):e12195. PMID:36225262, DOI:10.1002/clt2.12195"]
      },
      "monitoring": {
        "content": "- UAS7 (Urticaria Activity Score): wheal + itch 7일 합산 (0~42), 매일 환자 자가 기록\n- UCT (Urticaria Control Test): 4문항 총 16점, 주간 단위\n\n외래 F/U 시 치료 반응 객관화.",
        "sources": []
      },
      "pregnancy": {
        "content": "### 항히스타민제 안전성\n- Cetirizine: Cat B (선호). 모유 분비량 낮음 — 사용 가능\n- Loratadine: Cat B. 사용 가능\n- Levocetirizine: Cat B\n- Fexofenadine: Cat C. 대안 고려\n- Chlorpheniramine: Cat B. 고용량 시 영아 졸림 위험\n\n- 임신·수유에도 동일한 4배 증량 프로토콜 적용 가능 (EAACI)\n- 1세대 비권고 (fetal outcome 데이터 부족)\n- 경구 스테로이드: ≤ 20 mg/일, 최단 기간\n\n### Omalizumab 임신 중\nCat B. 필요 시 사용 가능 (PREG-CU 등 제한적 데이터).",
        "sources": ["Kocatürk E. Front Allergy 2022;3:892673. PMID:35873599, DOI:10.3389/falgy.2022.892673"]
      },
      "referral": {
        "content": "- Step 1~2(4배 증량)까지 반응 없음 → 알레르기·피부과\n- 혈관부종 반복 + 기도 증상 → 응급 평가\n- ACEi 유발 혈관부종 의심 → ACEi 중단 + 의뢰\n- 유전성 혈관부종(HAE) 의심 → 혈액검사 + 의뢰",
        "sources": []
      },
      "ocs-short-term-limit": {
        "content": "> 근거: EAACI primary care review (Ryan D 2022)\n\n- 허용: 급성 악화 시 3~5일 short burst, ≤ 1 mg/kg/일\n- 금지: 만성 두드러기 장기 사용 (RCT 메타분석상 부작용 다수)\n- 재발 시 반복 대신 → 항히스타민 최적화 + omalizumab 고려",
        "sources": ["Ryan D. Clin Transl Allergy 2022;12(10):e12195. PMID:36225262, DOI:10.1002/clt2.12195"]
      },
      "not-recommended": {
        "content": "- 1세대 H1 항히스타민제 (진정·항콜린)\n- 장기 OCS (만성 두드러기)\n- Leukotriene receptor antagonist (montelukast) — EAACI 비권고 (미국 일부 가이드라인만 3단계 포함)\n- 경험적 H2 차단제 병용 — 근거 상충, 개별 판단",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["protocol"],
      "guide": ["classification","exam","monitoring","contraindication","pregnancy","referral","differential"],
      "draftAppend": ["draft-append"],
      "draftTemplate": null
    }
  }
};
