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
    "parents": ["dizziness"],
    "exam": "BPPV 진단: 1단계 Supine Head Roll Test(Horizontal canal). 안진 없으면 2단계 Dix-Hallpike(Posterior canal).",
    "treatment": "Horizontal canal 안진: Geotropic(바닥 beating)→병변=강한 쪽, Apogeotropic(천장 beating)→병변=약한 쪽, 치료=Barbeque Roll.\nPosterior canal 안진: 병변=beating 반대방향, 치료=Modified Epley Maneuver(병변 방향에서 시작).\n【약물】보나링 po PRN (증상 매우 심할 때만) — 반드시 고지: 졸릴 수 있음. 이석정복술 대비 효과 제한적.",
    "differential": null,
    "draftAppend": null
  },
  "이석증": {
    "kind": "disease",
    "parents": ["dizziness"],
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
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-disease/vaccination.md */
  "vaccination": {
    "kind": "disease",
    "keywords": ["vaccination","예방접종","백신","독감","폐렴구균","대상포진","HPV","Tdap"],
    "primarySources": [
      "CDC General Best Practice Guidelines for Immunization 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "exam": {
        "content": "### 예방접종 전 일반 확인\n- 발열(38도↑ → 연기 고려)\n- 이전 접종 이상반응(아나필락시스 이력)\n- 임신 여부 (생백신 금기: MMR·수두·BCG·황열)\n- 면역저하 여부 (생백신 주의 — 전문의 상담)",
        "sources": []
      },
      "schedule": {
        "content": "세부 스케줄은 개별 엔트리 참조:\n- Tdap / 대상포진 / 폐렴구균 / HPV / A·B형간염 / 일본뇌염 / 광견병 / 수두 / MMR / 폴리오\n- 접종 간격 원칙 → `vaccine-interval` 엔트리\n- 성인 전체 권장 요약 → `vaccination-summary` 엔트리",
        "sources": []
      },
      "draft-template": {
        "content": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
        "sources": []
      },
      "draft-append": {
        "content": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함.",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "예방접종": {
    "kind": "disease",
    "keywords": ["예방접종","vaccination","백신"],
    "primarySources": [
      "CDC General Best Practice Guidelines for Immunization 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "exam": {
        "content": "### 예방접종 전 일반 확인\n- 발열(38도↑ → 연기 고려)\n- 이전 접종 이상반응(아나필락시스 이력)\n- 임신 여부 (생백신 금기: MMR·수두·BCG·황열)\n- 면역저하 여부 (생백신 주의 — 전문의 상담)",
        "sources": []
      },
      "schedule": {
        "content": "세부 스케줄은 개별 엔트리 참조:\n- Tdap / 대상포진 / 폐렴구균 / HPV / A·B형간염 / 일본뇌염 / 광견병 / 수두 / MMR / 폴리오\n- 접종 간격 원칙 → `vaccine-interval` 엔트리\n- 성인 전체 권장 요약 → `vaccination-summary` 엔트리",
        "sources": []
      },
      "draft-template": {
        "content": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
        "sources": []
      },
      "draft-append": {
        "content": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함.",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "백신": {
    "kind": "disease",
    "keywords": ["백신","vaccination","예방접종"],
    "primarySources": [
      "CDC General Best Practice Guidelines for Immunization 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "exam": {
        "content": "### 예방접종 전 일반 확인\n- 발열(38도↑ → 연기 고려)\n- 이전 접종 이상반응(아나필락시스 이력)\n- 임신 여부 (생백신 금기: MMR·수두·BCG·황열)\n- 면역저하 여부 (생백신 주의 — 전문의 상담)",
        "sources": []
      },
      "schedule": {
        "content": "세부 스케줄은 개별 엔트리 참조:\n- Tdap / 대상포진 / 폐렴구균 / HPV / A·B형간염 / 일본뇌염 / 광견병 / 수두 / MMR / 폴리오\n- 접종 간격 원칙 → `vaccine-interval` 엔트리\n- 성인 전체 권장 요약 → `vaccination-summary` 엔트리",
        "sources": []
      },
      "draft-template": {
        "content": "CC: 예방접종\nfever (-) uri sx (-) drug adverse effect (-) allergy (-)\n\n기존 접종력:\n기저 질환:\n\nVital Sign:\n\n접종: [백신명] [n차]\n추후 접종 계획: [백신명] [n개월 뒤] [n차]",
        "sources": []
      },
      "draft-append": {
        "content": "예방접종 후 원내 30분 안정 취한 후 귀가 권고함.",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) topic — Phase 5a Liby ingest. 원본: knowledge/by-drug/vaccine-interval.md */
  "vaccine-interval": {
    "kind": "topic",
    "keywords": ["vaccine-interval","접종 간격","생백신","사백신","live vaccine","inactivated vaccine"],
    "primarySources": [
      "CDC General Best Practice Guidelines — Timing and Spacing of Immunobiologics 2024"
    ],
    "sections": {
      "rules": {
        "content": "### 접종 간격 원칙\n- 생백신 + 사백신 → 같은 날 접종 가능. 간격 제한 없음\n- 생백신 + 생백신 → 같은 날 접종 가능. 다른 날이면 **최소 4주(28일) 간격**\n- 사백신 + 사백신 → 간격 제한 없음\n\n### 비고\n- 생+생 간격 미준수 시 두 번째 접종 무효 → 4주 후 재접종\n- 4일 유예 기간(grace period)은 생백신 간격에 적용되지 않음",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) topic — Phase 5a Liby ingest. 원본: knowledge/guidelines/adult-vaccination-summary.md */
  "vaccination-summary": {
    "kind": "topic",
    "keywords": ["vaccination-summary","성인예방접종 요약","adult vaccination","성인 백신"],
    "primarySources": [
      "CDC Adult Immunization Schedule 2025",
      "ASCO 2024 Vaccination of Adults With Cancer (JCO.24.00032)",
      "IDSA 2025 Immunocompromised RTI Vaccines"
    ],
    "sections": {
      "overview": {
        "content": "### 일반 성인 기본 권장\n| 백신 | 주기 / 대상 |\n|---|---|\n| 파상풍(Td/Tdap) | 10년마다 |\n| 인플루엔자 | 매년 (특히 ≥65세·만성질환자·의료종사자) |\n| MMR | 1968년 이후 출생, 항체 불확실 시 (KDCA 기준) |",
        "sources": []
      },
      "high-risk": {
        "content": "### 고위험군별 추가 권장\n| 백신 | 대상 |\n|---|---|\n| 폐렴구균 | ≥65세 PPSV23 (KDCA) / ≥50세 PCV15/20/21 (ACIP) / 만성질환·면역저하자 PCV13 |\n| B형간염 | ACIP 19-59세 universal / KDCA 의료인·고위험군 |\n| A형간염 | 40세 미만 항체 없이, 40세 이상 항체검사 후, 의료인·해외여행자 |\n| 대상포진 | ≥50세 RZV (ACIP) / ≥60세 RZV (KDCA) |\n| HPV | 9-26세 routine (성별 무관), 27-45세 SCDM |\n| 수두·수막구균 | 집단생활·군인·해외유학 |\n| 광견병·일본뇌염·황열 | 해외여행·봉사 (지역별 맞춤) |",
        "sources": []
      },
      "chemotherapy-influenza": {
        "content": "### 항암치료 중 독감백신 — 타이밍 기반 (ASCO 2024 / IDSA 2025)\n- **불활성 독감백신 권고** (생백신 금기)\n- 이상적 타이밍: **화학요법 직전 치료 ≥7일 후 & 다음 치료 2주 전** — 사이클 사이 접종\n- ANC 절대수치 기준(이전 500/1000 cutoff)은 현행 지침에서 **폐기** — 타이밍 중심으로 전환\n- 표적항암치료 중 경도~중등도 leukopenia → 독감백신 특히 권고\n- 생백신(MMR·수두·ZVL 등): 항암 중·후 3-6개월 금기 (개별 상담)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/tdap.md */
  "Tdap": {
    "kind": "disease",
    "keywords": ["Tdap","파상풍","백일해","pertussis"],
    "primarySources": [
      "CDC DTaP/Tdap/Td ACIP Recommendations 2024"
    ],
    "sections": {
      "indication": {
        "content": "- **DTaP 완료자**: 매 10년마다 Tdap 또는 Td 1회 (Td 공급 제약으로 **Tdap 우선**)\n- **DTaP 미접종 / 기록 불명 / 1958년 이전 출생**: 3회 접종\n- **임신부**: 매 임신마다 27~36주에 Tdap\n- **영아 밀접접촉자** (의료·보육 종사자, 신생아 부모·조부모): Tdap 미접종 시 접촉 2주 전까지\n- **외상 후 상처**:\n  - 청결 상처: 접종력 없으면 Tdap, 완료자는 마지막 ≥10년 시 booster\n  - 오염 상처(dirty wound): 마지막 접종 ≥5년 경과 시 booster",
        "sources": []
      },
      "schedule": {
        "content": "3회 접종자 스케줄: Tdap → Td or Tdap (4-8주 후) → Td or Tdap (6-12개월 후). 3회 중 최소 1회는 Tdap (3회 모두 Tdap 허용)",
        "sources": []
      },
      "dosing": {
        "content": "0.5 mL 근육주사 (삼각근)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "파상풍": {
    "kind": "disease",
    "keywords": ["파상풍","Tdap","백일해"],
    "primarySources": [
      "CDC DTaP/Tdap/Td ACIP Recommendations 2024"
    ],
    "sections": {
      "indication": {
        "content": "- **DTaP 완료자**: 매 10년마다 Tdap 또는 Td 1회 (Td 공급 제약으로 **Tdap 우선**)\n- **DTaP 미접종 / 기록 불명 / 1958년 이전 출생**: 3회 접종\n- **임신부**: 매 임신마다 27~36주에 Tdap\n- **영아 밀접접촉자** (의료·보육 종사자, 신생아 부모·조부모): Tdap 미접종 시 접촉 2주 전까지\n- **외상 후 상처**:\n  - 청결 상처: 접종력 없으면 Tdap, 완료자는 마지막 ≥10년 시 booster\n  - 오염 상처(dirty wound): 마지막 접종 ≥5년 경과 시 booster",
        "sources": []
      },
      "schedule": {
        "content": "3회 접종자 스케줄: Tdap → Td or Tdap (4-8주 후) → Td or Tdap (6-12개월 후). 3회 중 최소 1회는 Tdap (3회 모두 Tdap 허용)",
        "sources": []
      },
      "dosing": {
        "content": "0.5 mL 근육주사 (삼각근)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/herpes-zoster-vaccine.md */
  "대상포진": {
    "kind": "disease",
    "keywords": ["대상포진","herpes zoster","shingrix","싱그릭스","조스타박스","ZVL","RZV"],
    "primarySources": [
      "MMWR 71(3), 2022 — RZV in Immunocompromised Adults",
      "CDC Shingrix HCP Considerations 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "comparison": {
        "content": "| 백신 | 종류 | 접종 | 상태 |\n|---|---|---|---|\n| RZV (Shingrix, 싱그릭스) | 사백신 | 2회 근주 | 1차 권고 |\n| ZVL (Zostavax, 조스타박스) | 생백신 | 1회 피하 | **2020년 미국 단종**, KDCA NIP 미포함 |",
        "sources": []
      },
      "indication": {
        "content": "- **ACIP**: ≥50세 성인 / **≥19세** 중증면역저하자 (암치료 중, 면역억제제 복용 중)\n- **KDCA**: ≥60세 권고. 면역저하자 RZV는 임상 상황에 따라 자비 접종\n- ZVL: 미국 단종으로 사실상 폐용",
        "sources": []
      },
      "schedule": {
        "content": "**면역정상 성인** (RZV 2회): 2-6개월 간격 (최소 4주). 6개월 초과 지연 시 재시작 불필요, 바로 2차\n\n**면역저하자** (RZV 2회): **1-2개월 간격** (단축 스케줄)",
        "sources": []
      },
      "contraindication": {
        "content": "면역저하자: 생백신(ZVL) 금기 → **RZV만** 사용",
        "sources": []
      },
      "notes": {
        "content": "- 조스타박스(ZVL) 접종 이력 → 2개월 후부터 싱그릭스(RZV) 접종 가능\n- 이전 대상포진 이환 이력 → 완전 회복 후 싱그릭스 접종 가능",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/pneumococcal-vaccine.md */
  "폐렴구균": {
    "kind": "disease",
    "keywords": ["폐렴구균","pneumococcal","폐렴백신","PCV13","PCV15","PCV20","PCV21","PPSV23"],
    "primarySources": [
      "MMWR 74(1), 2025 — Expanded PCV Recs for Adults ≥50y (PMID:39773952)",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### ACIP 2024 (≥50세 universal PCV)\n| 대상 | 권고 |\n|---|---|\n| ≥50세 PCV-naive | PCV20 **또는** PCV21 단독 / **또는** PCV15 후 1년 뒤 PPSV23 |\n| ≥19세 면역저하·무비증·CSF 누출·인공와우 | PCV20/21 단독 / 또는 PCV15 후 ≥8주 PPSV23 |\n| ≥65세 PCV-naive | 위 ≥50세 공식과 동일 |\n| PPSV23만 기접종자 | ≥1년 후 PCV15/20/21 1회 보완 |\n\n> PCV13 단독 신규 접종은 면역저하·무비증·CSF 누출·인공와우 중심으로 축소",
        "sources": []
      },
      "insurance": {
        "content": "### 한국 KDCA 2024\n- ≥65세 **PPSV23 국가사업 유지** (1회)\n- ≥19세 PCV13: 면역저하자·무비증·CSF 누출·인공와우에만 NIP 적용\n- PCV15·PCV20·PCV21은 KDCA NIP 미포함, 자비 접종 고려\n- 실전: **국가사업 대상은 PPSV23 유지 + 고위험군은 PCV13 우선**, ACIP 확대안은 참고",
        "sources": []
      },
      "notes": {
        "content": "### 만성질환자 해당 범위\n알코올중독 · 만성 심혈관질환 · 만성 간질환 · 만성 폐질환(COPD·폐기종·천식) · 흡연 · 당뇨병\n\n### 면역저하자 해당 범위\n선천·후천성 무비증 · 낫적혈구병 · 만성 신질환 · 전신성 암 · HIV · 호지킨병 · 면역억제제 · 백혈병 · 림프종 · 다발성 골수종 · 신증후군 · 고형장기이식",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/hpv-vaccine.md */
  "HPV": {
    "kind": "disease",
    "keywords": ["HPV","자궁경부암","인유두종바이러스","가다실","가다실9"],
    "primarySources": [
      "CDC ACIP HPV Vaccination Considerations 2024",
      "KDCA 예방접종도우미 — HPV 국가사업"
    ],
    "sections": {
      "indication": {
        "content": "- **9~26세**: routine 권고 (성별 구분 없음)\n- **27~45세**: shared clinical decision-making (SCDM) — 파트너·감염 이력·미접종 상태 고려\n- **면역저하자**: 9~26세 routine, 연령 무관 3-dose",
        "sources": []
      },
      "schedule": {
        "content": "| 개시 연령 | 스케줄 | 최소 간격 |\n|---|---|---|\n| 9~14세 | **2회** (0·6-12개월) | 1-2차 ≥5개월 |\n| ≥15세 또는 면역저하자 | **3회** (0·2·6개월) | 1-2차 4주 / 2-3차 12주 / 1-3차 5개월 |\n\n> 2회 스케줄은 <15세 개시 시에만. 15세 이상으로 미완 시 3회로 전환",
        "sources": []
      },
      "insurance": {
        "content": "### 한국 KDCA 국가사업\n- **여성 만 12세**: NIP 무료 접종 (2가 또는 4가)\n- **저소득층 만 13~17세 여성**: 무료 접종\n- **성인 routine 권고**: 여성 자비 / 남성 routine 권고 제한적\n- 27~45세 shared decision은 ACIP 기준으로 임상 판단",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "자궁경부암": {
    "kind": "disease",
    "keywords": ["자궁경부암","HPV","인유두종바이러스"],
    "primarySources": [
      "CDC ACIP HPV Vaccination Considerations 2024",
      "KDCA 예방접종도우미 — HPV 국가사업"
    ],
    "sections": {
      "indication": {
        "content": "- **9~26세**: routine 권고 (성별 구분 없음)\n- **27~45세**: shared clinical decision-making (SCDM)\n- **면역저하자**: 9~26세 routine, 연령 무관 3-dose",
        "sources": []
      },
      "schedule": {
        "content": "| 개시 연령 | 스케줄 |\n|---|---|\n| 9~14세 | **2회** (0·6-12개월) |\n| ≥15세 또는 면역저하자 | **3회** (0·2·6개월) |",
        "sources": []
      },
      "insurance": {
        "content": "KDCA NIP: 여성 만 12세 무료. 저소득층 만 13~17세 여성 무료. 성인 자비.",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 4 Liby ingest. 원본: knowledge/by-disease/obesity.md */
  "obesity": {
    "kind": "disease",
    "keywords": ["obesity","비만","phenotype","hungry brain","hungry gut","slow burn","emotional hunger"],
    "primarySources": [
      "Acosta A et al. Mayo Clinic 비만 표현형. Obesity 2021 (PMID:33759389)",
      "FDA prescribing information — Wegovy (semaglutide 2.4mg)"
    ],
    "sections": {
      "classification": {
        "content": "### Mayo Clinic 표현형\n| 표현형 | 핵심 특징 | 권장 접근 |\n|---|---|---|\n| Hungry Brain | 뇌 포만감 신호 이상, 과식 경향 | GLP-1 효과 좋음 |\n| Hungry Gut | 위장관 포만감 신호 이상 | GLP-1 효과 좋음 |\n| Emotional Hunger | 감정적 섭식·스트레스·보상 섭식 | 콘트라브 + 행동치료 |\n| Slow Burn | 대사율 저하·근육량 부족 | 약물 효과 제한적, 까다로움 |\n표현형 기반 처방군 체중감량 15.9% vs 비표현형 9.0% (12개월, 1.75배).\n\n### \"적게 먹어도 살이 찐다\" 3유형\n| 유형 | 특징 | 접근 |\n|---|---|---|\n| Metabolic (저장효율형) | intake↓인데 유지/증가, 공복 힘듦, 요요 반복 | GLP-1 반응 좋음. 중단 시 regain 빠름 |\n| Perception (과소평가형) | 간식·액상칼로리·주말과식·음주 — 실제 섭취 많음 | 실제 섭취 칼로리 인지 유도 |\n| Sarcopenic low BMR | 식사량 적고 근육↓ 기초대사↓ 활동↓ | 규칙 식사·정제탄수↓·단백질 먼저·주2회+ 근력운동 |",
        "sources": []
      },
      "exam": {
        "content": "### 환자 기대 청취 (첫 문진)\n- 목표 체중 몇 kg인가\n- 목표 기간 언제까지인가\n→ 환자와 함께 계획 세워야 순응도 ↑\n\n### GLP-1 초진 Flow (8단계)\n1. 비만/대사 설문지 작성\n2. 인바디 검사\n3. BP, pulse, 심전도(prn)\n4. 인바디 + 설문지 바탕 상담\n5. 필요 시 Lab: HbA1c·Lipid·LFT·Cr·HOMA-IR(prn)·TSH(prn)\n6. 위고비/오젬픽 vs 마운자로 결정\n7. 사용법 교육 + 1회 주사\n8. 주의사항·다음 내원일·전화 문의 안내\n\n### 설문지 활용 포인트\n- \"몸무게에 대한 스트레스를 받고 있다\" 문항 체크 여부 중요\n- BMI 정상 범위에서도 GLP-1 처방 사유가 됨 (법적 보호: 스트레스 문항 체크 기록이 처방 근거)\n\n### GLP-1 Follow-up 4파트 체크\nA. 보상회로/갈망 — Food Noise(1-10), 단맛/짠맛 선호 변화, 술·간식 갈망(1-10)\nB. 대사/활력 — Brain Fog(1-10), 기력 저하, 단백질 섭취 (체중×1.2g/kg 충족)\nC. 위장관 적응 — 포만감 시점, 메스꺼움·변비·소화불량\nD. 운동 — 종류·빈도(주 N회)·시간(N분)\n\n### 단백질 섭취 교육 — ABC 식사 순서\n- A (Amino acid) 고기·생선·두부·달걀·유제품 먼저 (전체의 1/3)\n- B (Blocking) 채소로 당 흡수 차단\n- C (Carbohydrate) 탄수화물 가장 마지막 소량\n\n체중 1kg당 1.2~1.5g 단백질, 매끼 나눠 섭취. 단백질이 GLP-1 분비 촉진·혈당 스파이크 억제·식이 열발생(TEF) 최대화.",
        "sources": [
          "Sun L et al. Clin Nutr 2019;38(2):638-645. PMID:31053510 (V-M-R 순서 혈당·GLP-1 최대)",
          "Noronha JC et al. Obes Pillars 2025;17:100234. PMID:41322078 (단백질 >1.2g/kg/day 국제 전문가 합의)"
        ]
      },
      "protocol": {
        "content": "### 위고비(Semaglutide) 처방 기준\n- BMI ≥ 30 → 단독 처방 가능\n- BMI 27~30 + 동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환) → 처방 가능\n- 비급여, 전액 환자 부담\n\n### 금기·주의\n- 절대 금기: MTC 개인력/가족력, MEN2, semaglutide 과민반응, 임신(계획 시 2개월 전 중단)\n- 상대적 주의: 췌장염 과거력, 수유 중, 당뇨망막병증(혈당 급격 개선 시 악화), 담석증",
        "sources": []
      },
      "notes": {
        "content": "### 다이어트 후 요요 — Adaptive Thermogenesis (환자설명용)\n체중이 줄면 몸은 \"위기 상황\"으로 인식. 인류사에서 굶주림이 더 흔했기에 체중 감소를 생존 위협으로 해석.\n\n몸이 하는 일:\n- 포만감 호르몬(렙틴) ↓ → 배고픔 증가\n- 배고픔 호르몬(그렐린) ↑ → 식욕 폭발\n- 갈색지방 열 생산 ↓ → 에너지 절약 모드\n- 무의식적 움직임(NEAT) ↓ → 가만히 앉아있게 됨\n- 근육이 같은 일을 더 적은 에너지로 수행 → 운동 효율 역설적 증가\n\n환자에게 설명: \"살을 너무 빨리 빼면 몸이 '굶고 있구나'로 착각해서 에너지 절약 모드로 들어갑니다. 그래서 천천히 빠지는 게 오히려 요요가 안 옵니다.\"",
        "sources": []
      },
      "draft-template": {
        "content": "CC 체중감량\n과거 사용했던 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n현재 사용 중인 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n\n현재 Life style\n* 운동 :\n* 식단 :\n\n경과\n0-4week :\n\nO\nV/S\n키 cm,  체중 kg,  BMI (목표체중 kg)\n\nA\n# 진단받은 질병\n# 가족력 :\n# 음주력 :\n# 흡연력 :\n# 수술력 :\n\n# 평소 운동 :\n# 평소 식단 :",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "비만": {
    "kind": "disease",
    "keywords": ["비만","obesity","phenotype","hungry brain","hungry gut","slow burn","emotional hunger"],
    "primarySources": [
      "Acosta A et al. Mayo Clinic 비만 표현형. Obesity 2021 (PMID:33759389)",
      "FDA prescribing information — Wegovy (semaglutide 2.4mg)"
    ],
    "sections": {
      "classification": {
        "content": "### Mayo Clinic 표현형\n| 표현형 | 핵심 특징 | 권장 접근 |\n|---|---|---|\n| Hungry Brain | 뇌 포만감 신호 이상, 과식 경향 | GLP-1 효과 좋음 |\n| Hungry Gut | 위장관 포만감 신호 이상 | GLP-1 효과 좋음 |\n| Emotional Hunger | 감정적 섭식·스트레스·보상 섭식 | 콘트라브 + 행동치료 |\n| Slow Burn | 대사율 저하·근육량 부족 | 약물 효과 제한적, 까다로움 |\n표현형 기반 처방군 체중감량 15.9% vs 비표현형 9.0% (12개월, 1.75배).\n\n### \"적게 먹어도 살이 찐다\" 3유형\n| 유형 | 특징 | 접근 |\n|---|---|---|\n| Metabolic (저장효율형) | intake↓인데 유지/증가, 공복 힘듦, 요요 반복 | GLP-1 반응 좋음. 중단 시 regain 빠름 |\n| Perception (과소평가형) | 간식·액상칼로리·주말과식·음주 — 실제 섭취 많음 | 실제 섭취 칼로리 인지 유도 |\n| Sarcopenic low BMR | 식사량 적고 근육↓ 기초대사↓ 활동↓ | 규칙 식사·정제탄수↓·단백질 먼저·주2회+ 근력운동 |",
        "sources": []
      },
      "exam": {
        "content": "### 환자 기대 청취 (첫 문진)\n- 목표 체중 몇 kg인가\n- 목표 기간 언제까지인가\n→ 환자와 함께 계획 세워야 순응도 ↑\n\n### GLP-1 초진 Flow (8단계)\n1. 비만/대사 설문지 작성\n2. 인바디 검사\n3. BP, pulse, 심전도(prn)\n4. 인바디 + 설문지 바탕 상담\n5. 필요 시 Lab: HbA1c·Lipid·LFT·Cr·HOMA-IR(prn)·TSH(prn)\n6. 위고비/오젬픽 vs 마운자로 결정\n7. 사용법 교육 + 1회 주사\n8. 주의사항·다음 내원일·전화 문의 안내\n\n### 설문지 활용 포인트\n- \"몸무게에 대한 스트레스를 받고 있다\" 문항 체크 여부 중요\n- BMI 정상 범위에서도 GLP-1 처방 사유가 됨 (법적 보호: 스트레스 문항 체크 기록이 처방 근거)\n\n### GLP-1 Follow-up 4파트 체크\nA. 보상회로/갈망 — Food Noise(1-10), 단맛/짠맛 선호 변화, 술·간식 갈망(1-10)\nB. 대사/활력 — Brain Fog(1-10), 기력 저하, 단백질 섭취 (체중×1.2g/kg 충족)\nC. 위장관 적응 — 포만감 시점, 메스꺼움·변비·소화불량\nD. 운동 — 종류·빈도(주 N회)·시간(N분)\n\n### 단백질 섭취 교육 — ABC 식사 순서\n- A (Amino acid) 고기·생선·두부·달걀·유제품 먼저 (전체의 1/3)\n- B (Blocking) 채소로 당 흡수 차단\n- C (Carbohydrate) 탄수화물 가장 마지막 소량\n\n체중 1kg당 1.2~1.5g 단백질, 매끼 나눠 섭취. 단백질이 GLP-1 분비 촉진·혈당 스파이크 억제·식이 열발생(TEF) 최대화.",
        "sources": [
          "Sun L et al. Clin Nutr 2019;38(2):638-645. PMID:31053510 (V-M-R 순서 혈당·GLP-1 최대)",
          "Noronha JC et al. Obes Pillars 2025;17:100234. PMID:41322078 (단백질 >1.2g/kg/day 국제 전문가 합의)"
        ]
      },
      "protocol": {
        "content": "### 위고비(Semaglutide) 처방 기준\n- BMI ≥ 30 → 단독 처방 가능\n- BMI 27~30 + 동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환) → 처방 가능\n- 비급여, 전액 환자 부담\n\n### 금기·주의\n- 절대 금기: MTC 개인력/가족력, MEN2, semaglutide 과민반응, 임신(계획 시 2개월 전 중단)\n- 상대적 주의: 췌장염 과거력, 수유 중, 당뇨망막병증(혈당 급격 개선 시 악화), 담석증",
        "sources": []
      },
      "notes": {
        "content": "### 다이어트 후 요요 — Adaptive Thermogenesis (환자설명용)\n체중이 줄면 몸은 \"위기 상황\"으로 인식. 인류사에서 굶주림이 더 흔했기에 체중 감소를 생존 위협으로 해석.\n\n몸이 하는 일:\n- 포만감 호르몬(렙틴) ↓ → 배고픔 증가\n- 배고픔 호르몬(그렐린) ↑ → 식욕 폭발\n- 갈색지방 열 생산 ↓ → 에너지 절약 모드\n- 무의식적 움직임(NEAT) ↓ → 가만히 앉아있게 됨\n- 근육이 같은 일을 더 적은 에너지로 수행 → 운동 효율 역설적 증가\n\n환자에게 설명: \"살을 너무 빨리 빼면 몸이 '굶고 있구나'로 착각해서 에너지 절약 모드로 들어갑니다. 그래서 천천히 빠지는 게 오히려 요요가 안 옵니다.\"",
        "sources": []
      },
      "draft-template": {
        "content": "CC 체중감량\n과거 사용했던 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n현재 사용 중인 비만 약물 :\n* 부작용 :\n* 약물 효과 :\n\n현재 Life style\n* 운동 :\n* 식단 :\n\n경과\n0-4week :\n\nO\nV/S\n키 cm,  체중 kg,  BMI (목표체중 kg)\n\nA\n# 진단받은 질병\n# 가족력 :\n# 음주력 :\n# 흡연력 :\n# 수술력 :\n\n# 평소 운동 :\n# 평소 식단 :",
        "sources": []
      }
    },
    "uiHooks": null
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
  /* v2 (B2) drug — Phase 5c Liby ingest. 원본: knowledge/by-drug/wegovy.md */
  "위고비": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["위고비","wegovy","semaglutide 2.4mg"],
    "primarySources": [
      "FDA prescribing information — Wegovy (semaglutide 2.4mg)"
    ],
    "sections": {
      "indication": {
        "content": "### 성인\n- BMI ≥ 30 → 단독 처방 가능\n- BMI 27~30 + 동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환) → 처방 가능\n- MASH + 중등도~중증 섬유화(F2-F3) → FDA 2025 승인 (간경변 단계는 효과 미입증, ESSENCE Phase 3, NEJM 2025)\n\n### 소아청소년\n- 12세 이상 + BMI ≥ 95th percentile → FDA 2022.12 승인\n- STEP TEENS: 68주 BMI -16.1% vs placebo +0.6%\n- 한국 식약처 소아 허가 여부는 별도 확인",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량 스케줄\n- 시작: 0.25mg\n- 순차 증량: 0.25 → 0.5 → 1.0 → 1.7 → 2.4mg (4주 간격)\n- 저칼로리 식이 + 신체활동 증가 병행\n\n> [TIPS — by FM교수님] 이미 비만약을 많이 시도해본 환자는 0.5mg부터 시작해볼 수 있음",
        "sources": []
      },
      "contraindication": {
        "content": "### 절대 금기\n- MTC(수질성 갑상선암) 개인력/가족력\n- MEN 2 (다발성 내분비 종양 2형)\n- Semaglutide/부형제 중증 과민반응(아나필락시스)\n- 임신 — 계획 시 최소 2개월 전 중단 (반감기 길어 체내 잔류)\n\n### 상대적 주의\n- 췌장염 과거력 — 급성 췌장염(괴사성 포함) 보고, 복통 시 중단 고려\n- 수유 중 — 동물실험 모유 분비 확인\n- 당뇨망막병증 — 혈당 급격 개선 시 망막병증 악화, 안과 모니터링\n- 담석증/담낭질환 — 체중 감량 과정에서 담석 발생 위험 증가",
        "sources": []
      },
      "insurance": {
        "content": "비급여 약물. 처방 시 비용 전액 환자 부담.",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","contraindication"],
      "guide": ["indication","dosing","contraindication","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  "wegovy": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["wegovy","위고비","semaglutide 2.4mg"],
    "primarySources": [
      "FDA prescribing information — Wegovy (semaglutide 2.4mg)"
    ],
    "sections": {
      "indication": {
        "content": "### 성인\n- BMI ≥ 30 → 단독 처방 가능\n- BMI 27~30 + 동반질환(고혈압/T2DM/이상지질혈증/OSA/심혈관질환) → 처방 가능\n- MASH + 중등도~중증 섬유화(F2-F3) → FDA 2025 승인 (간경변 단계는 효과 미입증, ESSENCE Phase 3, NEJM 2025)\n\n### 소아청소년\n- 12세 이상 + BMI ≥ 95th percentile → FDA 2022.12 승인\n- STEP TEENS: 68주 BMI -16.1% vs placebo +0.6%\n- 한국 식약처 소아 허가 여부는 별도 확인",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량 스케줄\n- 시작: 0.25mg\n- 순차 증량: 0.25 → 0.5 → 1.0 → 1.7 → 2.4mg (4주 간격)\n- 저칼로리 식이 + 신체활동 증가 병행\n\n> [TIPS — by FM교수님] 이미 비만약을 많이 시도해본 환자는 0.5mg부터 시작해볼 수 있음",
        "sources": []
      },
      "contraindication": {
        "content": "### 절대 금기\n- MTC(수질성 갑상선암) 개인력/가족력\n- MEN 2 (다발성 내분비 종양 2형)\n- Semaglutide/부형제 중증 과민반응(아나필락시스)\n- 임신 — 계획 시 최소 2개월 전 중단 (반감기 길어 체내 잔류)\n\n### 상대적 주의\n- 췌장염 과거력 — 급성 췌장염(괴사성 포함) 보고, 복통 시 중단 고려\n- 수유 중 — 동물실험 모유 분비 확인\n- 당뇨망막병증 — 혈당 급격 개선 시 망막병증 악화, 안과 모니터링\n- 담석증/담낭질환 — 체중 감량 과정에서 담석 발생 위험 증가",
        "sources": []
      },
      "insurance": {
        "content": "비급여 약물. 처방 시 비용 전액 환자 부담.",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","contraindication"],
      "guide": ["indication","dosing","contraindication","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  /* v2 (B2) drug — Phase 5c Liby ingest. semaglutide 성분명 fallback (상품명 기준 상세 참조). */
  "semaglutide": {
    "kind": "drug",
    "keywords": ["semaglutide","세마글루타이드"],
    "primarySources": [],
    "sections": {
      "overview": {
        "content": "Semaglutide 성분은 한국에서 두 상품명으로 시판 — 적응증·급여가 다름.\n- Wegovy(위고비): 비만 적응증, 비급여. 상세는 `위고비` 키 참조.\n- Ozempic(오젬픽): T2DM 적응증, 급여 조건부. 상세는 `오젬픽` 키 참조.",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": [],
      "guide": ["overview"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  /* v2 (B2) drug — Phase 5c Liby ingest. 원본: knowledge/by-drug/mounjaro.md */
  "마운자로": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["마운자로","mounjaro","zepbound","tirzepatide"],
    "primarySources": [],
    "sections": {
      "indication": {
        "content": "- T2DM (Mounjaro) — 단독 또는 병용, FDA 2022 승인\n- 비만 (Zepbound) — HTN/이상지질혈증/OSA/CVD 동반 시, FDA 2023.11 승인\n  - CVD: 우월성 미입증, 비열등성 수준 (SURPASS-CVOT)",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량\n- 시작: 2.5mg\n- 4주 후: 5mg 증량 후 유지\n- 주사 방법: 웬티카 방식, 위고비보다 간단\n\n### 최대 용량 [CLINICAL — 조건부]\n- 4단계(10mg)까지 효과 뚜렷\n- 5단계(12.5mg) / 6단계(15mg) 추가 이익 크지 않음\n  - SURMOUNT-1: 10mg -21.4% / 15mg -22.5% (+1.1%p 증분)\n  - 12.5mg 단독 비교 RCT는 없음; 임상적 추론",
        "sources": []
      },
      "insurance": {
        "content": "### 실비보험 활용 [TIPS — by 로컬원장님]\n2형 당뇨 환자에게 처방 시 실비보험 적용 가능.\n\n처방 시 철저히 조사·기록해야 할 항목:\n- 동반질환 (HTN, 이상지질혈증, OSA, CVD 등)\n- 가족력\n- 최근 측정 HbA1c\n- 당일 BST\n- 현재 복용 중인 약물\n\n> 보험회사에 제출할 수 있도록 차트에 명확히 기록",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","insurance"],
      "guide": ["indication","dosing","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  "mounjaro": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["mounjaro","마운자로","zepbound","tirzepatide"],
    "primarySources": [],
    "sections": {
      "indication": {
        "content": "- T2DM (Mounjaro) — 단독 또는 병용, FDA 2022 승인\n- 비만 (Zepbound) — HTN/이상지질혈증/OSA/CVD 동반 시, FDA 2023.11 승인\n  - CVD: 우월성 미입증, 비열등성 수준 (SURPASS-CVOT)",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량\n- 시작: 2.5mg\n- 4주 후: 5mg 증량 후 유지\n- 주사 방법: 웬티카 방식, 위고비보다 간단\n\n### 최대 용량 [CLINICAL — 조건부]\n- 4단계(10mg)까지 효과 뚜렷\n- 5단계(12.5mg) / 6단계(15mg) 추가 이익 크지 않음\n  - SURMOUNT-1: 10mg -21.4% / 15mg -22.5% (+1.1%p 증분)\n  - 12.5mg 단독 비교 RCT는 없음; 임상적 추론",
        "sources": []
      },
      "insurance": {
        "content": "### 실비보험 활용 [TIPS — by 로컬원장님]\n2형 당뇨 환자에게 처방 시 실비보험 적용 가능.\n\n처방 시 철저히 조사·기록해야 할 항목:\n- 동반질환 (HTN, 이상지질혈증, OSA, CVD 등)\n- 가족력\n- 최근 측정 HbA1c\n- 당일 BST\n- 현재 복용 중인 약물\n\n> 보험회사에 제출할 수 있도록 차트에 명확히 기록",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","insurance"],
      "guide": ["indication","dosing","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  "tirzepatide": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["tirzepatide","티어제파타이드","마운자로","zepbound"],
    "primarySources": [],
    "sections": {
      "indication": {
        "content": "- T2DM (Mounjaro) — 단독 또는 병용, FDA 2022 승인\n- 비만 (Zepbound) — HTN/이상지질혈증/OSA/CVD 동반 시, FDA 2023.11 승인\n  - CVD: 우월성 미입증, 비열등성 수준 (SURPASS-CVOT)",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량\n- 시작: 2.5mg\n- 4주 후: 5mg 증량 후 유지\n- 주사 방법: 웬티카 방식, 위고비보다 간단\n\n### 최대 용량 [CLINICAL — 조건부]\n- 4단계(10mg)까지 효과 뚜렷\n- 5단계(12.5mg) / 6단계(15mg) 추가 이익 크지 않음\n  - SURMOUNT-1: 10mg -21.4% / 15mg -22.5% (+1.1%p 증분)\n  - 12.5mg 단독 비교 RCT는 없음; 임상적 추론",
        "sources": []
      },
      "insurance": {
        "content": "### 실비보험 활용 [TIPS — by 로컬원장님]\n2형 당뇨 환자에게 처방 시 실비보험 적용 가능.\n\n처방 시 철저히 조사·기록해야 할 항목:\n- 동반질환 (HTN, 이상지질혈증, OSA, CVD 등)\n- 가족력\n- 최근 측정 HbA1c\n- 당일 BST\n- 현재 복용 중인 약물\n\n> 보험회사에 제출할 수 있도록 차트에 명확히 기록",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","insurance"],
      "guide": ["indication","dosing","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  "zepbound": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["zepbound","마운자로","mounjaro","tirzepatide"],
    "primarySources": [],
    "sections": {
      "indication": {
        "content": "- T2DM (Mounjaro) — 단독 또는 병용, FDA 2022 승인\n- 비만 (Zepbound) — HTN/이상지질혈증/OSA/CVD 동반 시, FDA 2023.11 승인\n  - CVD: 우월성 미입증, 비열등성 수준 (SURPASS-CVOT)",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 및 증량\n- 시작: 2.5mg\n- 4주 후: 5mg 증량 후 유지\n- 주사 방법: 웬티카 방식, 위고비보다 간단\n\n### 최대 용량 [CLINICAL — 조건부]\n- 4단계(10mg)까지 효과 뚜렷\n- 5단계(12.5mg) / 6단계(15mg) 추가 이익 크지 않음\n  - SURMOUNT-1: 10mg -21.4% / 15mg -22.5% (+1.1%p 증분)\n  - 12.5mg 단독 비교 RCT는 없음; 임상적 추론",
        "sources": []
      },
      "insurance": {
        "content": "### 실비보험 활용 [TIPS — by 로컬원장님]\n2형 당뇨 환자에게 처방 시 실비보험 적용 가능.\n\n처방 시 철저히 조사·기록해야 할 항목:\n- 동반질환 (HTN, 이상지질혈증, OSA, CVD 등)\n- 가족력\n- 최근 측정 HbA1c\n- 당일 BST\n- 현재 복용 중인 약물\n\n> 보험회사에 제출할 수 있도록 차트에 명확히 기록",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["dosing","insurance"],
      "guide": ["indication","dosing","insurance"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  /* v2 (B2) drug — Phase 5c Liby ingest. 원본: knowledge/by-drug/ozempic.md */
  "오젬픽": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["오젬픽","ozempic","semaglutide 1mg"],
    "primarySources": [
      "건강보험심사평가원 2024.02 고시 (오젬픽 급여 기준)"
    ],
    "sections": {
      "indication": {
        "content": "오젬픽 = 위고비의 **보험급여 버전** (성분 동일: semaglutide, 용량 다름)\n- 오젬픽: T2DM 적응증, 보험급여 가능\n- 위고비: 비만 적응증, 비급여",
        "sources": []
      },
      "insurance": {
        "content": "### 한국 급여 기준 [CLINICAL — 조건부]\n아래 조건 **모두** 충족 시 급여 인정:\n\n1. Metformin + Sulfonylurea 2~4개월 이상 병용 중\n2. HbA1c ≥ 7.0% (조절 불충분)\n3. BMI ≥ 25 kg/m² 또는 인슐린 요법 불가 조건 중 하나\n\n> 3종 병용(오젬픽 + Metformin + SU) 형태로 급여 인정\n> ⚠ 급여 기준은 변경될 수 있으므로 최신 심평원 기준 확인 필요",
        "sources": []
      },
      "notes": {
        "content": "- 급여 기준이 까다로워 대부분 환자는 해당 안 됨\n- 급여 가능한 경우 비용 부담 크게 감소\n- 비만 목적이면 위고비(비급여) 처방",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["insurance"],
      "guide": ["indication","insurance","notes"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  "ozempic": {
    "kind": "drug",
    "parents": ["obesity"],
    "keywords": ["ozempic","오젬픽","semaglutide 1mg"],
    "primarySources": [
      "건강보험심사평가원 2024.02 고시 (오젬픽 급여 기준)"
    ],
    "sections": {
      "indication": {
        "content": "오젬픽 = 위고비의 **보험급여 버전** (성분 동일: semaglutide, 용량 다름)\n- 오젬픽: T2DM 적응증, 보험급여 가능\n- 위고비: 비만 적응증, 비급여",
        "sources": []
      },
      "insurance": {
        "content": "### 한국 급여 기준 [CLINICAL — 조건부]\n아래 조건 **모두** 충족 시 급여 인정:\n\n1. Metformin + Sulfonylurea 2~4개월 이상 병용 중\n2. HbA1c ≥ 7.0% (조절 불충분)\n3. BMI ≥ 25 kg/m² 또는 인슐린 요법 불가 조건 중 하나\n\n> 3종 병용(오젬픽 + Metformin + SU) 형태로 급여 인정\n> ⚠ 급여 기준은 변경될 수 있으므로 최신 심평원 기준 확인 필요",
        "sources": []
      },
      "notes": {
        "content": "- 급여 기준이 까다로워 대부분 환자는 해당 안 됨\n- 급여 가능한 경우 비용 부담 크게 감소\n- 비만 목적이면 위고비(비급여) 처방",
        "sources": []
      }
    },
    "uiHooks": {
      "hint": ["insurance"],
      "guide": ["indication","insurance","notes"],
      "draftAppend": null,
      "draftTemplate": null
    }
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/hepatitis-ab-vaccine.md */
  "A형간염": {
    "kind": "disease",
    "keywords": ["A형간염","hepatitis A"],
    "primarySources": [
      "CDC Hepatitis A Vaccination HCP 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### 한국 임상 기준\n- 고위험군(의료인·해외여행자·만성 간질환자 등): 2회 접종\n- **40세 미만**: 항체검사 없이 접종 권고\n- **40세 이상**: 항체검사 후 음성이면 접종 권고\n\n> 미국 CDC는 2020 이후 요청 시 모든 성인 접종 가능. 한국은 연령 기반 임상 기준 유지.",
        "sources": []
      },
      "schedule": {
        "content": "2회: 6-18개월 간격",
        "sources": []
      },
      "notes": {
        "content": "### 여행 관련\n- 1차 접종 후 ~2주: 보호항체 95%↑ → **여행 직전 1차만 맞고 출국 가능**\n- 장기면역(20년+): 2차 완료 필요 → 귀국 후 추가 접종",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "hepatitis A": {
    "kind": "disease",
    "keywords": ["hepatitis A","A형간염"],
    "primarySources": [
      "CDC Hepatitis A Vaccination HCP 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### 한국 임상 기준\n- 고위험군(의료인·해외여행자·만성 간질환자 등): 2회 접종\n- **40세 미만**: 항체검사 없이 접종 권고\n- **40세 이상**: 항체검사 후 음성이면 접종 권고",
        "sources": []
      },
      "schedule": {
        "content": "2회: 6-18개월 간격",
        "sources": []
      },
      "notes": {
        "content": "여행: 1차 후 ~2주 보호항체 95%↑ → 여행 직전 1차만 맞고 출국 가능. 20년+ 장기면역은 2차 완료 필요",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "B형간염": {
    "kind": "disease",
    "keywords": ["B형간염","hepatitis B","Heplisav-B"],
    "primarySources": [
      "MMWR 71(13), 2022 — Universal HepB in Adults 19-59y",
      "MMWR 73(48), 2024 — Updated Universal HepB Recs",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### ACIP Universal 전략 (2022)\n- **19~59세 성인**: 위험군 평가 없이 **universal 접종 권고**\n- ≥60세: 위험군 기반 접종 (의료인·투석·감염 노출 가능성 등)\n\n> 한국 KDCA는 **universal 미채택** — 위험군·고위험군 기반 유지. 의료인·신생아·고위험군 중심 NIP",
        "sources": []
      },
      "schedule": {
        "content": "| 백신 | 스케줄 | 경로 |\n|---|---|---|\n| Engerix-B / Recombivax HB | 0·1·6개월 (3회) | 삼각근 근주 |\n| **Heplisav-B** | 0·1개월 (**2회**) | 삼각근 근주 |\n\n> Heplisav-B는 임신부에게도 허용 (2024.9 ACIP)",
        "sources": []
      },
      "exam": {
        "content": "### 초진 시 혈액검사 세트\n- B형간염 + 기타: HBsAg / HBsAb / Anti-HCV Ab / HIV Ag/Ab — 4종\n- B형만 확인: HBsAg / HBsAb — 2종\n- 항체검사 원하는 경우: 3차 접종 1개월 후 anti-HBs",
        "sources": []
      },
      "notes": {
        "content": "### Non-responder 관리 (노출 고위험군·면역저하자)\n1. 기본 3회 완료 후 anti-HBs (-) → 3회 재접종 (0·1·6개월)\n2. 재접종 완료 1-2개월 후 anti-HBs 재검사\n3. 재접종 후에도 (-) → Non-responder 판정 — 추가접종 불필요, HBsAg 음성 확인, 추후 노출 시 즉시 HBIG + HBV 백신\n\n> 일반인은 재접종 불필요",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "hepatitis B": {
    "kind": "disease",
    "keywords": ["hepatitis B","B형간염","Heplisav-B"],
    "primarySources": [
      "MMWR 71(13), 2022 — Universal HepB in Adults 19-59y",
      "MMWR 73(48), 2024 — Updated Universal HepB Recs",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### ACIP Universal (2022)\n- 19~59세 universal / ≥60세 위험군 기반\n- 한국 KDCA는 universal 미채택, 위험군 기반 유지",
        "sources": []
      },
      "schedule": {
        "content": "Engerix-B / Recombivax HB: 3회 (0·1·6개월)\n**Heplisav-B**: **2회** (0·1개월), 임신부 허용",
        "sources": []
      },
      "exam": {
        "content": "초진 혈액: HBsAg/HBsAb/Anti-HCV Ab/HIV Ag·Ab (4종). B형만: HBsAg/HBsAb (2종)",
        "sources": []
      },
      "notes": {
        "content": "Non-responder: 3회 재접종 → 재검 → (-)이면 판정. 노출 시 HBIG + 백신",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "herpes zoster": {
    "kind": "disease",
    "keywords": ["herpes zoster","대상포진","shingrix","RZV","ZVL"],
    "primarySources": [
      "MMWR 71(3), 2022 — RZV in Immunocompromised Adults",
      "CDC Shingrix HCP Considerations 2024",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "comparison": {
        "content": "| 백신 | 종류 | 접종 | 상태 |\n|---|---|---|---|\n| RZV (Shingrix, 싱그릭스) | 사백신 | 2회 근주 | 1차 권고 |\n| ZVL (Zostavax, 조스타박스) | 생백신 | 1회 피하 | **2020년 미국 단종**, KDCA NIP 미포함 |",
        "sources": []
      },
      "indication": {
        "content": "- ACIP: ≥50세 / ≥**19세** 중증면역저하자\n- KDCA: ≥60세 권고. 면역저하자 RZV는 자비",
        "sources": []
      },
      "schedule": {
        "content": "면역정상: RZV 2회, 2-6개월 간격\n면역저하: RZV 2회, **1-2개월 간격** (단축)",
        "sources": []
      },
      "contraindication": {
        "content": "면역저하자: ZVL 금기 → **RZV만**",
        "sources": []
      },
      "notes": {
        "content": "ZVL 접종 이력 → 2개월 후 RZV 가능. 대상포진 이환 이력 → 완전 회복 후 RZV 가능",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "shingrix": {
    "kind": "disease",
    "keywords": ["shingrix","싱그릭스","RZV","대상포진"],
    "primarySources": [
      "MMWR 71(3), 2022 — RZV in Immunocompromised Adults",
      "CDC Shingrix HCP Considerations 2024"
    ],
    "sections": {
      "indication": {
        "content": "- ACIP: ≥50세 / ≥19세 중증면역저하자\n- KDCA: ≥60세 권고",
        "sources": []
      },
      "schedule": {
        "content": "면역정상: 2-6개월 간격 2회\n면역저하: **1-2개월 간격** 2회",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "싱그릭스": {
    "kind": "disease",
    "keywords": ["싱그릭스","shingrix","RZV","대상포진"],
    "primarySources": [
      "MMWR 71(3), 2022 — RZV in Immunocompromised Adults",
      "CDC Shingrix HCP Considerations 2024"
    ],
    "sections": {
      "indication": {
        "content": "- ACIP: ≥50세 / ≥19세 중증면역저하자\n- KDCA: ≥60세 권고",
        "sources": []
      },
      "schedule": {
        "content": "면역정상: 2-6개월 간격 2회\n면역저하: **1-2개월 간격** 2회",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "조스타박스": {
    "kind": "disease",
    "keywords": ["조스타박스","ZVL","대상포진"],
    "primarySources": [
      "CDC Shingrix HCP Considerations 2024"
    ],
    "sections": {
      "notes": {
        "content": "ZVL(Zostavax, 조스타박스): **2020년 미국 단종**, KDCA NIP 미포함.\n이전 ZVL 접종 이력 → 2개월 후부터 RZV(싱그릭스) 접종 권고",
        "sources": []
      },
      "contraindication": {
        "content": "면역저하자: 생백신 ZVL **금기** → RZV(싱그릭스)만 사용",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "pneumococcal": {
    "kind": "disease",
    "keywords": ["pneumococcal","폐렴구균","PCV13","PCV15","PCV20","PCV21","PPSV23"],
    "primarySources": [
      "MMWR 74(1), 2025 — Expanded PCV Recs for Adults ≥50y (PMID:39773952)",
      "KDCA 성인 예방접종 가이드 2024"
    ],
    "sections": {
      "indication": {
        "content": "### ACIP 2024\n- ≥50세 PCV-naive: PCV20 / PCV21 / PCV15+PPSV23\n- ≥19세 면역저하·무비증·CSF누출·인공와우: PCV20/21 / PCV15+PPSV23 (≥8주)\n- ≥65세 PCV-naive: ≥50세와 동일",
        "sources": []
      },
      "insurance": {
        "content": "### KDCA 2024\n- ≥65세 PPSV23 국가사업 유지\n- ≥19세 PCV13: 면역저하·무비증·CSF누출·인공와우 NIP\n- PCV15/20/21은 NIP 미포함 (자비)\n- 실전: 국가사업 대상 PPSV23 + 고위험 PCV13 우선, ACIP 확대안 참고",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "인유두종바이러스": {
    "kind": "disease",
    "keywords": ["인유두종바이러스","HPV","자궁경부암"],
    "primarySources": [
      "CDC ACIP HPV Vaccination Considerations 2024"
    ],
    "sections": {
      "indication": {
        "content": "- 9~26세: routine 성별 무관\n- 27~45세: SCDM\n- 면역저하: 9~26세 routine",
        "sources": []
      },
      "schedule": {
        "content": "9~14세: **2회** (0·6-12개월)\n≥15세·면역저하자: **3회** (0·2·6개월)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "가다실": {
    "kind": "disease",
    "keywords": ["가다실","HPV","인유두종바이러스"],
    "primarySources": [
      "CDC ACIP HPV Vaccination Considerations 2024",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "indication": {
        "content": "- 9~26세: routine 성별 무관\n- 27~45세: SCDM",
        "sources": []
      },
      "schedule": {
        "content": "9~14세: 2회 (0·6-12개월)\n≥15세: 3회 (0·2·6개월)",
        "sources": []
      },
      "insurance": {
        "content": "KDCA NIP: 여성 만 12세 무료, 저소득층 만 13~17세 여성 무료",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/japanese-encephalitis-vaccine.md */
  "일본뇌염": {
    "kind": "disease",
    "keywords": ["일본뇌염","Japanese encephalitis","IXIARO","Imojev"],
    "primarySources": [
      "CDC Yellow Book 2024 — Japanese Encephalitis",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "comparison": {
        "content": "| 구분 | 사백신(IXIARO) | 생백신(Imojev) |\n|---|---|---|\n| 접종 횟수 | 2회 (0·28일) | 성인 1회 |\n| 추가접종 | KDCA 11개월 후 3차 / 이후 필요 시 1-2년마다 | — |\n| 특징 | 부작용 적음, 미국 사용 | 편의성, 호주·아태 사용 (미국 미승인) |\n| 금기 | 없음 | 임신부·면역저하자 금기 |",
        "sources": []
      },
      "schedule": {
        "content": "- 사백신 IXIARO: 0·28일 2회. KDCA는 11개월 후 3차 추가\n- 생백신 Imojev: 성인 1회. 미국 미승인, 한국·아태 허용",
        "sources": []
      },
      "contraindication": {
        "content": "생백신(Imojev): 임신부·면역저하자 금기",
        "sources": []
      },
      "notes": {
        "content": "- 여행 직전(시간 부족): 생백신 1회 (금기 없을 때)\n- 시간 여유: 사백신 2회 완료\n- 소아기 접종 기록 불확실해도 성인 추가접종 안전",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "Japanese encephalitis": {
    "kind": "disease",
    "keywords": ["Japanese encephalitis","일본뇌염"],
    "primarySources": [
      "CDC Yellow Book 2024 — Japanese Encephalitis"
    ],
    "sections": {
      "comparison": {
        "content": "사백신 IXIARO 2회 (0·28일) / 생백신 Imojev 1회. Imojev 미국 미승인.",
        "sources": []
      },
      "schedule": {
        "content": "사백신: 0·28일 2회 (KDCA는 11개월 후 3차 추가)\n생백신: 성인 1회",
        "sources": []
      },
      "contraindication": {
        "content": "생백신: 임신부·면역저하자 금기",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/rabies-vaccine.md */
  "광견병": {
    "kind": "disease",
    "keywords": ["광견병","rabies"],
    "primarySources": [
      "MMWR 71(18), 2022 — Modified PrEP 2-dose Schedule",
      "CDC Rabies PrEP Clinical Care 2024"
    ],
    "sections": {
      "indication": {
        "content": "### 노출 전 예방 (PrEP)\n- **기본 2회** (2022 ACIP): 0일·7일, 어깨세모근 근주\n- 기본 3회 (0·7·21 또는 28일): 실험실 종사자 / 야생동물·유기동물 취급 직업군 / 유행지역 장기 체류(>3년)",
        "sources": []
      },
      "schedule": {
        "content": "2022 ACIP 개정 — 면역정상 ≥18세 성인 PrEP 2회(0·7일) 근주",
        "sources": []
      },
      "notes": {
        "content": "### Booster — 2022 ACIP 개정\n위험 카테고리(1-5군)별 titer 기반:\n- 지속 직업 노출군(실험실·동물 취급): titer 측정, <0.5 IU/mL 시 booster\n- 간헐적 노출군: 노출 이벤트 시 post-exposure 처치\n- 과거 \"1년 추가 + 5년마다\" 공식은 구 3회 시대 경험칙, 현 CDC 권고 아님\n\n### KDCA 참고\nKDCA 건강정보포털은 2022 ACIP 2회 스케줄 미반영. 임상은 CDC 2회를 국제 표준 적용",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "rabies": {
    "kind": "disease",
    "keywords": ["rabies","광견병"],
    "primarySources": [
      "MMWR 71(18), 2022 — Modified PrEP 2-dose Schedule",
      "CDC Rabies PrEP Clinical Care 2024"
    ],
    "sections": {
      "indication": {
        "content": "노출 전 예방 기본 2회(0·7일) / 고위험 3회(0·7·21 or 28일)",
        "sources": []
      },
      "schedule": {
        "content": "2022 ACIP: 면역정상 성인 PrEP 2회(0·7일) 근주",
        "sources": []
      },
      "notes": {
        "content": "Booster는 위험 카테고리별 titer 기반 (과거 5년마다 공식 폐기)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) — Phase 5a Liby ingest. 원본: knowledge/by-drug/varicella-mmr-polio-vaccine.md */
  "수두": {
    "kind": "disease",
    "keywords": ["수두","varicella"],
    "primarySources": [
      "CDC Varicella Vaccine HCP 2024"
    ],
    "sections": {
      "indication": {
        "content": "1970년 이후 출생 중 면역 없는 자: 학생·군인·의료인·교사·해외여행자·비자발급·고위험군(면역저하자) 밀접접촉자·가임기 여성",
        "sources": []
      },
      "schedule": {
        "content": "4-8주 간격 2회 (생백신)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "varicella": {
    "kind": "disease",
    "keywords": ["varicella","수두"],
    "primarySources": [
      "CDC Varicella Vaccine HCP 2024"
    ],
    "sections": {
      "indication": {
        "content": "1970년 이후 출생 중 면역 없는 자 — 학생·군인·의료인·교사·해외여행·가임기 여성",
        "sources": []
      },
      "schedule": {
        "content": "4-8주 간격 2회",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "MMR": {
    "kind": "disease",
    "keywords": ["MMR","홍역","볼거리","풍진"],
    "primarySources": [
      "CDC Measles Vaccine Considerations 2024",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "indication": {
        "content": "| 대상 | 권고 |\n|---|---|\n| **1968년 이전 출생 (KDCA 기준)** | 자연감염 항체 가능성 — 불필요, 음성 시 접종 고려 |\n| CDC 기준 | 1957년 이전 출생자 presumptive immunity |\n| 1968년 이후, 항체 불확실/접종력 불명 | MMR 1회 |\n| 고위험군 (의료인·군인·대학생·해외여행·비자발급) | MMR 2회 (4주 간격) |\n\n> 국내 진료는 KDCA 1968년 기준. CDC 1957 vs KDCA 1968 역학 차이",
        "sources": []
      },
      "schedule": {
        "content": "고위험군: 4주 간격 2회. 일반: 1회",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "홍역": {
    "kind": "disease",
    "keywords": ["홍역","MMR","measles"],
    "primarySources": [
      "CDC Measles Vaccine Considerations 2024",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "indication": {
        "content": "KDCA 1968년 이전 출생 불필요 (CDC 1957 기준). 1968년 이후 불확실 1회, 고위험 2회(4주)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "풍진": {
    "kind": "disease",
    "keywords": ["풍진","MMR","rubella"],
    "primarySources": [
      "CDC Measles/Mumps/Rubella Vaccine 2024",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "indication": {
        "content": "KDCA 1968년 이전 출생 불필요. 1968년 이후 불확실 1회, 고위험 2회(4주)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "폴리오": {
    "kind": "disease",
    "keywords": ["폴리오","IPV","polio"],
    "primarySources": [
      "MMWR 72(49), 2023 — Adult IPV Updated Recs",
      "KDCA 예방접종도우미"
    ],
    "sections": {
      "indication": {
        "content": "### 2023 ACIP 개정\n- **미접종 또는 불완전 접종 성인 (전 대상)**: IPV 3회\n- 접종 완료 + 고위험 직업 / 유행지역 여행: 1회 booster\n\n> 2023 ACIP로 기존 \"고위험군 한정\" → 모든 미접종 성인 확대. 2022 NY 유행 이후 정책 변경",
        "sources": []
      },
      "schedule": {
        "content": "3회: 0·1-2개월·6-12개월. 고위험 booster 1회",
        "sources": []
      },
      "insurance": {
        "content": "KDCA: 성인 폴리오 routine 권고 제한적 — 여행자·고위험 직업 중심. 미접종 성인 IPV 3회는 임상 판단 자비",
        "sources": []
      }
    },
    "uiHooks": null
  },
  "IPV": {
    "kind": "disease",
    "keywords": ["IPV","폴리오","polio"],
    "primarySources": [
      "MMWR 72(49), 2023 — Adult IPV Updated Recs"
    ],
    "sections": {
      "indication": {
        "content": "2023 ACIP: 미접종·불완전 성인 전체 IPV 3회 / 완료+고위험 1회 booster",
        "sources": []
      },
      "schedule": {
        "content": "3회: 0·1-2개월·6-12개월",
        "sources": []
      }
    },
    "uiHooks": null
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
  /* v2 (B2) — Phase 4 Liby ingest. 원본: knowledge/by-disease/dysphonia.md */
  "dysphonia": {
    "kind": "disease",
    "keywords": ["dysphonia","쉰목소리","hoarseness","목소리이상","발성장애","음성장애"],
    "primarySources": [],
    "sections": {
      "protocol": {
        "content": "### 생활습관 개선 [CLINICAL — 조건부, by ENT교수]\n\n#### 수분 섭취\n- 하루 1~1.5L 물 섭취 권고\n- 성대 점막 수분 유지 → 진동 효율 개선, 염증 완화\n- ※ 1~1.5L 특정 용량을 확립한 RCT 없음. 전문가 컨센서스 기반.\n\n#### 목 앞 근육 마사지 (Laryngeal Manual Therapy)\n- 목 앞 세로 근육(strap muscle)을 꼬집듯 마사지\n- 대상: Muscle Tension Dysphonia (MTD) — 성대 주변 근육 과긴장으로 인한 발성장애\n- ※ MTD에서 효과 확립. 일반 기질성 병변에는 적응증 아님",
        "sources": [
          "Alves M et al. J Voice 2019;33(4):512.e13-19. PMID:29122414 (systematic review)",
          "García Real T et al. An Otorrinolaringol Ibero Am 2002;29(3):253-262. PMID:12462931",
          "Barsties v. Latoszek B et al. Laryngoscope 2024;134(1):18-27. PMID:37366280 (meta-analysis, 2 RCTs)",
          "Roy N et al. J Voice 1997;11(3):321-331. PMID:9297677"
        ]
      }
    },
    "uiHooks": null
  },
  "쉰목소리": {
    "kind": "disease",
    "keywords": ["쉰목소리","dysphonia","hoarseness","목소리이상","발성장애","음성장애"],
    "primarySources": [],
    "sections": {
      "protocol": {
        "content": "### 생활습관 개선 [CLINICAL — 조건부, by ENT교수]\n\n#### 수분 섭취\n- 하루 1~1.5L 물 섭취 권고\n- 성대 점막 수분 유지 → 진동 효율 개선, 염증 완화\n- ※ 1~1.5L 특정 용량을 확립한 RCT 없음. 전문가 컨센서스 기반.\n\n#### 목 앞 근육 마사지 (Laryngeal Manual Therapy)\n- 목 앞 세로 근육(strap muscle)을 꼬집듯 마사지\n- 대상: Muscle Tension Dysphonia (MTD) — 성대 주변 근육 과긴장으로 인한 발성장애\n- ※ MTD에서 효과 확립. 일반 기질성 병변에는 적응증 아님",
        "sources": [
          "Alves M et al. J Voice 2019;33(4):512.e13-19. PMID:29122414 (systematic review)",
          "García Real T et al. An Otorrinolaringol Ibero Am 2002;29(3):253-262. PMID:12462931",
          "Barsties v. Latoszek B et al. Laryngoscope 2024;134(1):18-27. PMID:37366280 (meta-analysis, 2 RCTs)",
          "Roy N et al. J Voice 1997;11(3):321-331. PMID:9297677"
        ]
      }
    },
    "uiHooks": null
  },
  "hoarseness": {
    "kind": "disease",
    "keywords": ["hoarseness","dysphonia","쉰목소리","목소리이상","발성장애","음성장애"],
    "primarySources": [],
    "sections": {
      "protocol": {
        "content": "### 생활습관 개선 [CLINICAL — 조건부, by ENT교수]\n\n#### 수분 섭취\n- 하루 1~1.5L 물 섭취 권고\n- 성대 점막 수분 유지 → 진동 효율 개선, 염증 완화\n- ※ 1~1.5L 특정 용량을 확립한 RCT 없음. 전문가 컨센서스 기반.\n\n#### 목 앞 근육 마사지 (Laryngeal Manual Therapy)\n- 목 앞 세로 근육(strap muscle)을 꼬집듯 마사지\n- 대상: Muscle Tension Dysphonia (MTD) — 성대 주변 근육 과긴장으로 인한 발성장애\n- ※ MTD에서 효과 확립. 일반 기질성 병변에는 적응증 아님",
        "sources": [
          "Alves M et al. J Voice 2019;33(4):512.e13-19. PMID:29122414 (systematic review)",
          "García Real T et al. An Otorrinolaringol Ibero Am 2002;29(3):253-262. PMID:12462931",
          "Barsties v. Latoszek B et al. Laryngoscope 2024;134(1):18-27. PMID:37366280 (meta-analysis, 2 RCTs)",
          "Roy N et al. J Voice 1997;11(3):321-331. PMID:9297677"
        ]
      }
    },
    "uiHooks": null
  },
  "목소리이상": {
    "kind": "disease",
    "keywords": ["목소리이상","dysphonia","쉰목소리","hoarseness","발성장애","음성장애"],
    "primarySources": [],
    "sections": {
      "protocol": {
        "content": "### 생활습관 개선 [CLINICAL — 조건부, by ENT교수]\n\n#### 수분 섭취\n- 하루 1~1.5L 물 섭취 권고\n- 성대 점막 수분 유지 → 진동 효율 개선, 염증 완화\n- ※ 1~1.5L 특정 용량을 확립한 RCT 없음. 전문가 컨센서스 기반.\n\n#### 목 앞 근육 마사지 (Laryngeal Manual Therapy)\n- 목 앞 세로 근육(strap muscle)을 꼬집듯 마사지\n- 대상: Muscle Tension Dysphonia (MTD) — 성대 주변 근육 과긴장으로 인한 발성장애\n- ※ MTD에서 효과 확립. 일반 기질성 병변에는 적응증 아님",
        "sources": [
          "Alves M et al. J Voice 2019;33(4):512.e13-19. PMID:29122414 (systematic review)",
          "García Real T et al. An Otorrinolaringol Ibero Am 2002;29(3):253-262. PMID:12462931",
          "Barsties v. Latoszek B et al. Laryngoscope 2024;134(1):18-27. PMID:37366280 (meta-analysis, 2 RCTs)",
          "Roy N et al. J Voice 1997;11(3):321-331. PMID:9297677"
        ]
      }
    },
    "uiHooks": null
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
    "uiHooks": null
  },
  /* v2 (B2) topic — Phase 4 Liby ingest. 원본: knowledge/by-drug/glp1-selection-strategy.md */
  "glp1": {
    "kind": "topic",
    "keywords": ["glp1","GLP-1","GLP1","비만약 선택","위고비 마운자로","Dose Escalation","Interval Tx","비만약 전략"],
    "primarySources": [],
    "sections": {
      "comparison": {
        "content": "### 위고비 vs 마운자로 선택 기준 [TIPS — by 로컬원장님]\n| 기준 | 위고비 선택 | 마운자로 선택 |\n|---|---|---|\n| 목표 감량 | 15% 미만 목표 | 15% 이상 목표 |\n| 2형 당뇨 동반 | 오젬픽(보험) 고려 | 마운자로 실비 가능 (향후 급여 예상) |\n| 주사 편의성 | — | 웬티카 방식, 더 편리 |\n| 소화기 부작용 민감 | 상대적 유리 | 상대적으로 많음 |\n| 근감소 우려 (고령·저근육·활동 적음) | 저용량 전략 선택 | aggressive 감량 주의 |\n| 장기 유지 비용 | 저렴 | — |\n| 장기 유지 편의 | — | 1회용 펜, 사용 편의 |\n| 식습관 안정적 | 충분 | — |\n| 술 자주·보상 섭식 강함 | — | 유리한 경우 있음 |\n\n### 용량 조절 유연성\n- 마운자로: 중간 용량이 없어 부작용 발생 시 세밀 조절 어려움 → 부작용이 크게 나타날 수 있음\n- 위고비: 단계가 많아 천천히 증량 가능 → 부작용 관리 유리",
        "sources": []
      },
      "dosing": {
        "content": "### 시작 용량 및 감량 속도 비교\n| | 위고비 | 마운자로 |\n|---|---|---|\n| 시작 용량 | 0.25mg | 2.5mg |\n| 유지 용량 | 순차(0.25→0.5→1.0→1.7→2.4mg) | 4주 후 5mg으로 증량 후 유지 |\n| 주사 방법 | 상대적 복잡 | 웬티카 방식, 간단 |\n| 초반 감량 속도 | 느림 | 빠름 [CLINICAL — 조건부] |\n| 최대 용량 효과 | — | 10mg(4단계)까지 효과 뚜렷, 이후 추가 이익 감소 [CLINICAL — 조건부] |\n\n- SURMOUNT-5 (NEJM 2025): 마운자로 -20.2% vs 위고비 -13.7% (전체 우월성 확인). 초반 수주 직접 비교 데이터는 미공개.\n- SURMOUNT-1: 5mg(-16.0%) / 10mg(-21.4%) / 15mg(-22.5%) — 10mg→15mg 증분 +1.1%p로 급격히 감소. 12.5mg 단독 비교 RCT 없음.",
        "sources": []
      },
      "protocol": {
        "content": "### Dose Escalation 프로토콜 — 4주마다 3가지 질문 [TIPS — by 로컬원장님]\n1. 체중 몇 % 줄었나? (감량 속도)\n2. 식욕 조절 만족도?\n3. 부작용 어느 정도? (내약성)\n→ 3가지 중 하나라도 불만족이면 증량 보류\n\n### 감량 기준별 결정\n- 4~5% 이상 감량 → 증량 안 함 (잘 되고 있음)\n- 2~4% 감량 → 환자 만족도 고려 결정\n- 2% 미만 감량 → 대체로 증량 (사용 기간 고려)\n- 부작용 tolerable → 증량 가능\n- 부작용 intolerable → 유지 또는 감량까지 고려",
        "sources": []
      },
      "response-predictors": {
        "content": "### 효과 좋을 것으로 예상되는 경우\n1. 위장관 부작용이 큰 경우 → ❌ 미신. 부작용과 체중감량은 독립적 (STEP 1-3 mediation analysis: GI AE 기여 <1%p)\n2. Insulin resistance 있는 경우 → ❌ 반대. T2DM 환자가 오히려 감량 적음 (STEP2 ~10% vs STEP1 ~15-17%)\n3. 초기 식욕 감소 (식사 시작 욕구↓, meal size↓) [조건부]\n4. 음식 보상/갈망 감소, 특히 술 [조건부]\n5. 초기 체중감소 속도 — 가장 강력한 predictor\n\n### Non-responder 기준 [조건부]\n- 강의 \"12주 5% 미만\"은 실제 허가 기준과 다름\n- Saxenda(liraglutide): 16주 4% 미만 → 중단 고려 (FDA label)\n- Wegovy(semaglutide): 공식 stopping rule 없음 (증량 자체가 16-20주 소요)\n- 참고: 1개월 체중감소가 6개월 반응의 유일 유의 예측인자\n\n### 효과 안 좋을 것으로 예상되는 경우\n1. Adaptive thermogenesis 강한 경우\n2. 식사량 이미 적은 경우\n3. 다이어트 반복 이력\n4. 조기 체중감소 plateau (위 inverse)\n5. 근육량 낮은 경우 (효능보다 안전성 우려)\n6. GLP-1 사용 중에도 음주 지속",
        "sources": [
          "Wharton S et al. Diabetes Obes Metab 2021;23(7):1553-1564. PMID:34514682 (STEP 1-3 mediation analysis)",
          "Nauck MA & D'Alessio DA. Cardiovasc Diabetol 2022;21:169. PMID:36050763",
          "Maccora C et al. Endocr Pract 2019;25(11):1148-1155. PMID:31682516 (1개월 체중감소 유일 predictor)",
          "Egan AM & Collins AL. Proc Nutr Soc 2022;81(2):183-199. PMID:35103583 (adaptive thermogenesis)"
        ]
      },
      "fast-weight-loss": {
        "content": "### 빠른 감량 원하는 환자 대응 [TIPS — by 로컬원장님]\n1. 너무 빠른 감량 → 뇌가 위기 인식 → 에너지 절전 모드(adaptive thermogenesis) → 서서히 감량이 장기 만족도 높음을 전달\n2. 초기에 고용량으로 빨리 올리면 나중에 올릴 용량이 없음\n3. 고용량 노출 시 GLP-1 receptor desensitization 발생 가능성 ↑\n4. 빠른 감량 시 피부 탄력 저하 + 탈모 가능성 ↑",
        "sources": []
      },
      "interval-therapy": {
        "content": "### GLP-1 Interval Tx 유지 전략 [INSIGHTS — by 로컬원장님]\n근거: RCT 아직 거의 없음. 임상 경험 기반 전략.\n\n기본 원칙:\n- 기본 3~4주 간격 투여, 3~4개월마다 내원\n- 필요 시 저용량으로 조정하면서 간격 유지\n- 환자 반응 보면서 간격 조절\n\n실전 활용:\n- 2kg 이상 증가 시에만 내원 → 1회 투여 후 귀가\n- 특정 시기(여행·스트레스 등)에만 사용\n\n장점: 비용 부담↓, 순응도↑, 환자 만족도↑, 장기유지 가능성↑\n한계: RCT 근거 거의 없음 / 개인차 커서 간격 설정 어려움 / 너무 긴 간격 → 부작용 재발 가능",
        "sources": []
      },
      "smi": {
        "content": "### GLP-1RA — 중증 정신질환(SMI) 환자 적용 [CLINICAL — 조건부]\nRCT 10건 메타분석 (N=665) — exenatide, liraglutide, semaglutide\n\n적응 환자군: 조현병·조현병 스펙트럼·양극성장애 + 과체중/비만 또는 전당뇨\n\n핵심 수치:\n| 결과 | 효과 (vs 위약/일반치료) |\n|---|---|\n| 체중 감소 | –6.17 kg (95% CI: –9.10 ~ –3.25) |\n| HbA1c 감소 | –0.31% (95% CI: –0.40 ~ –0.22) |\n| 탈락률 (전체) | 위약과 차이 없음 (RR=0.98) |\n| 부작용 탈락률 | 위약과 차이 없음 (RR=0.99) |\n근거 수준: 효과 — 낮은 확실성 / 수용성 — 중간 확실성\n\n1차의료 적용:\n- 항정신병약 복용 중 체중 증가 환자 → GLP-1RA 처방 근거\n- 위고비·마운자로 처방 시 정신과 약과의 병용 내약성 근거\n- 정신건강의학과 협진 후 GLP-1RA 추가 고려 시 데이터 제공",
        "sources": [
          "Srisurapanont M et al. Int J Psychiatry Med 2026;61(3):312-328. PMID:41618880, DOI:10.1177/00912174261422822"
        ]
      },
      "prediabetes": {
        "content": "### GLP-1RA — 전당뇨 치료 [INSIGHTS]\n리뷰 논문 — 향후 대규모 RCT 필요\n\n적응 환자군: 전당뇨(공복혈당장애 또는 내당능장애) + 과체중/비만\n\n정상혈당 회복률:\n| 약물 | 정상혈당 회복 |\n|---|---|\n| Tirzepatide | 최대 93.3% |\n| Semaglutide | 최대 81% |\n| Liraglutide | 최대 66% |\n\n추가 효과: T2DM 진행 지연 / 체중↓ / 지방량↓ / 인슐린 감수성↑ / ASCVD·심부전 위험↓ (특히 tirzepatide) / MASLD 개선 가능성\n주의: 약물 중단 후 효과 부분적 소실 → 장기 유지 필요성 환자 교육 필수\n\n1차의료 적용:\n- 전당뇨+비만 환자 GLP-1RA 처방 시 '살 빼면서 혈당도 잡는다' 수치 근거\n- 약물 중단 후 효과 감소 → 장기 유지 필요성 상담 활용",
        "sources": [
          "Panou T et al. Diabetes Ther 2026. PMID:41984373, DOI:10.1007/s13300-026-01865-5"
        ]
      }
    },
    "uiHooks": null
  }
};
