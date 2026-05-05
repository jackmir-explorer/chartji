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
  /* dizziness v1 → v2 승격 (2026-04-23 ingest batch).
     참조 공유 본체는 파일 하단 `_dizziness_v2` 변수 참조. */
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
      },
      "heart-failure-link": {
        "content": "### 심부전 환자 고위험 예방접종\n심부전 환자: 감염은 심혈관 합병증(급성 심근염·부정맥·혈전·사망) 위험 계기 → 독감·폐렴구균·대상포진·RSV·COVID·Tdap 권고. 세부 권고·기전은 `heart-failure.schedule` 참조.",
        "sources": [
          "대한심부전학회 심부전 생활백서 2025",
          "Roubille F et al. Eur J Prev Cardiol 2025. doi:10.1093/eurjpc/zwaf366"
        ]
      },
      "prescription-based-flu": {
        "content": "### 처방 기반 독감백신 접종률 제고 [CLINICAL]\n군집 RCT, ≥60세 839명, 5개 지역보건센터 (중국 Binzhou), 3-arm.\n\n핵심 수치:\n| 중재군 | 독감백신 접종률 |\n|---|---|\n| 일상 진료 (대조군) | 9.55% |\n| 처방 기반 모델 (외래 처방 시 독감백신 권유 루틴 삽입) | 30.86% |\n| 처방 기반 모델 + 소액 수수료 면제 | 83.23% |\n\n중재 메커니즘:\n- 외래 처방 시 의료진이 \"독감백신 맞으셨어요?\" 루틴 질문 삽입 + 당일 접종 연계\n- 처방-접종 동선을 하나로 묶는 것이 핵심 — 별도 예약·방문 장벽 제거\n- 소액 행정수수료 면제만으로 접종률이 추가 ~2.7배 상승 (백신 비용은 본인부담 유지)\n- 교육 수준·소득·인지 기능 낮은 서브그룹에서도 효과 일관\n\n1차의료 적용:\n- 매 처방 시 한 마디 + 당일 접종 → 접종률 3배 향상 전략\n- 한국 상황: 65세 이상 국가 무료 접종(NIP) 맥락에서 \"한 마디\" 중재의 가치 재확인 — NIP 내에서도 우연 접종 유도 가능\n- 의료기관 프로세스 개선 대상: 만성질환 재처방 외래에 접종 권유 루틴 내장",
        "sources": [
          "Zhang L et al. Effectiveness of prescription-based influenza vaccination services among older adults in Binzhou, China. Vaccine 2026;82:128588. PMID:42000148, DOI:10.1016/j.vaccine.2026.128588"
        ]
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
      "indication": {
        "content": "### 청소년 비만 — GLP-1 RA [CLINICAL — 조건부, 초록 기반]\n- FDA: Liraglutide(Saxenda) ≥12세, Semaglutide(Wegovy) ≥12세 청소년 비만 적응증 승인\n- Tirzepatide는 청소년 적응증 미승인 (2026 기준, 성인만)\n- 국내 위고비 소아(≥12세) 적응증: 체중 60kg 이상 + BMI ≥ 성인 비만 기준 (FDA 라벨 참조; 국내 허가사항 별도 확인)\n- 보호자 동반 상담·동의 필수\n\n### 청소년 처방 실전 포인트\n- 성인 기준 그대로 확장 금지 — 성장·영양·정신건강 동반 평가\n- 체중·BMI percentile·성장속도·생활습관·식이장애 선별 필수\n- 근·골 손실 위험 성인보다 더 주의 (성장기 → 단백질·칼슘·비타민 D·근력운동 강조)\n- 보호자에게 장기 사용·중단 후 체중 회복 가능성 고지\n- 복잡 케이스(섭식장애·정신과 동반·대사 이상)는 소아내분비·청소년정신과 협진 고려\n\n*[초록 기반 — 전문 미확인] AFP 2026 원 논문 abstract 비공개. 구체 연령·용량·BMI cutoff·모니터링 프로토콜은 AFP 원문 확인 필요.*",
        "sources": [
          "Schoenherr DT, Swinton MK, Madison KE. GLP-1 Receptor Agonists for Obesity in Adolescents. Am Fam Physician 2026;113(1):91-94. PMID:41544290"
        ]
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
      "indication": {
        "content": "### 청소년 비만 — GLP-1 RA [CLINICAL — 조건부, 초록 기반]\n- FDA: Liraglutide(Saxenda) ≥12세, Semaglutide(Wegovy) ≥12세 청소년 비만 적응증 승인\n- Tirzepatide는 청소년 적응증 미승인 (2026 기준, 성인만)\n- 국내 위고비 소아(≥12세) 적응증: 체중 60kg 이상 + BMI ≥ 성인 비만 기준 (FDA 라벨 참조; 국내 허가사항 별도 확인)\n- 보호자 동반 상담·동의 필수\n\n### 청소년 처방 실전 포인트\n- 성인 기준 그대로 확장 금지 — 성장·영양·정신건강 동반 평가\n- 체중·BMI percentile·성장속도·생활습관·식이장애 선별 필수\n- 근·골 손실 위험 성인보다 더 주의 (성장기 → 단백질·칼슘·비타민 D·근력운동 강조)\n- 보호자에게 장기 사용·중단 후 체중 회복 가능성 고지\n- 복잡 케이스(섭식장애·정신과 동반·대사 이상)는 소아내분비·청소년정신과 협진 고려\n\n*[초록 기반 — 전문 미확인] AFP 2026 원 논문 abstract 비공개. 구체 연령·용량·BMI cutoff·모니터링 프로토콜은 AFP 원문 확인 필요.*",
        "sources": [
          "Schoenherr DT, Swinton MK, Madison KE. GLP-1 Receptor Agonists for Obesity in Adolescents. Am Fam Physician 2026;113(1):91-94. PMID:41544290"
        ]
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
    "treatment": "식염수 코세척 [CLINICAL — 조건부] CRS 동반 시 효과, post-viral 단독은 보조\nNasal steroid spray [CLINICAL — 조건부] CRS/비용종 효과, post-COVID 단독 미확립\n**INS 병용 시 후각연습 효과 ↑** [TIPS — by ENT교수] olfactory cleft 점막 부종 감소 → 자극 전달 효율 ↑\nPrednisolone(소론도) 7일 taper: 4T#2 ×5일 → 2T#2 ×2일 [TIPS — by ENT교수]\nSmell training: 표준 향 4종(rose/eucalyptus/lemon/clove), 매일 2회, 최소 12주 [CLINICAL]\n비타민 B·C [TIPS — by ENT교수]\n후각검사: F/U 모니터링 목적, 초진 일상 시행 불필요 [TIPS — by ENT교수]\n\n### 난치성 CRSwNP — Dupilumab(Dupixent) [CLINICAL]\n적응: 난치성 CRSwNP — 표준 INS·코세척·OCS·수술 실패\n후각 회복 효과: UPSIT +10.54 vs placebo (24주, p<0.0001), anosmic 60% 이상이 24주에 후각 회복, week 1 이내 효과\n코막힘(NPS)도 개선되나 **후각 회복 폭이 더 인상적**\n처방: 알레르기·이비인후 전문의 영역 (생물학적 제제, 보험·적응증 평가 필요)\n[출처: Bachert Lancet 2019 PMID:31543428; Mullol JACI-IP 2022 PMID:34628065]",
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
      },
      "tirzepatide-discontinuation": {
        "content": "### Tirzepatide 중단 후 체중 반동 — 대체 비만약 전환 전략 [CLINICAL — 조건부]\n후향 코호트 n=83, 미국 UNC Health (임상약사 지원 외래).\n\n핵심 수치:\n| 지표 | 값 |\n|---|---|\n| Tirzepatide 중단 전 평균 사용기간 | 11개월 |\n| 중단 전 평균 체중 감소 | -6.7% |\n| 중단 후 12개월 체중 변화 | +1.9% (P=0.11, 비유의) |\n| 대체 비만약으로 전환한 환자 비율 | 81.9% (n=68) |\n| 중단 주된 이유 (약값·접근성 문제) | 80.7% |\n\n임상 적용 (외래 상담 메시지):\n- 비용 부담으로 tirzepatide 중단 상담 시: \"다른 비만약으로 전환하면 평균 체중 반동이 통계적으로 유의하지 않습니다 (12개월 +1.9%)\" — 근거 제시 가능\n- 단순 중단 ≠ 전환 전략. 약사·의사가 다음 약물로의 transition을 적극 지원한 연구 → \"전환\" 자체가 키 중재\n- 전환 대상 약물: OMs 전반 — 다른 GLP-1/GLP-1-GIP, phentermine-topiramate, naltrexone-bupropion 등\n- 한계: 후향·단일 기관. \"중단 후 방치\"한 군과 직접 비교 없음. 평균치이며 개인차 큼",
        "sources": [
          "Huang L et al. J Am Pharm Assoc 2026;8:103112. PMID:41962807, DOI:10.1016/j.japh.2026.103112"
        ]
      },
      "glp1-review-nejm2026": {
        "content": "### GLP-1 RA 종합 리뷰 — NEJM 2026 [CLINICAL]\n\n기전 (환자설명용):\n- 인크레틴 유사체: 포도당 의존적 인슐린 분비 촉진\n- 위 배출 지연 (포만감 지속, 초기 GI 부작용 원인)\n- 글루카곤 분비 억제 (간 포도당 신생 감소)\n- 장내미생물 beneficial 변화\n- 시상하부 직접 작용 → 포만감 증강 (음식 갈망 감소의 중추 기전)\n\n치료 효과 — 확립된 근거:\n- 혈당·체중 개선 외\n- 심혈관 위험 감소 (고위험군·T2DM) — 대규모 RCT 확인\n- 신기능 악화 지연 (신부전 진행 저하)\n\n부작용·미해결 이슈:\n- 위장관 증상 (대부분) — 메스꺼움·변비·소화불량\n- 근육·골량 손실 — 환자 교육 필수 (단백질 1.2g/kg + 근력운동 병행)\n- 장기 순응도 미확인\n- 중단 후 체중 회복 — 개인차 큼\n- 근·골 손실의 기능적 영향 장기 데이터 부족\n\n1차의료 적용:\n- GLP-1 처방 환자 상담 스크립트 근거 자료 — 기전·부작용·장기 이슈 설명\n- `obesity.md` GLP-1 중간 점검 문진(단백질 1.2g/kg, 운동 체크)이 이 리뷰의 근·골 손실 경고와 정합\n- 특히 고령·저근육량 환자에서 aggressive 감량 시 근·골 손실 위험 고지 필수",
        "sources": [
          "Rosen CJ, Ingelfinger JR. GLP-1 Receptor Agonists. N Engl J Med 2026;394(13):1313-1324. PMID:41931049, DOI:10.1056/NEJMra2500106"
        ]
      },
      "aud-hospitalization": {
        "content": "### GLP-1 RA와 알코올사용장애(AUD) — 입원 위험 감소 [CLINICAL — 조건부]\n스웨덴 전국 등록자료 within-individual Cox regression, 2006-2023.\n\n핵심 수치:\n- 대상: AUD 진단자 227,866명 (남성 63.5%, 평균 40세, 중앙값 추적 8.8년)\n- Semaglutide (n=4,321): AUD 입원 위험 aHR 0.64 (95% CI 0.50-0.83) — 36% 감소\n- Liraglutide (n=2,509): AUD 입원 위험 aHR 0.72 (95% CI 0.57-0.92) — 28% 감소\n- 기존 AUD 치료제 (naltrexone/acamprosate/disulfiram) — aHR 0.98 (거의 차이 없음)\n- 추가 효과: 타 물질사용장애 입원↓, 신체질환 입원↓\n- 무효: 자살시도 감소 유의 효과 없음\n\n1차의료 적용:\n- GLP-1 처방 환자 중 음주 문제 동반 사례에서 추가 이득 기대 가능\n- 위고비/오젬픽 초진 시 음주력 문진 강화 근거 (AUD 동반 선별)\n- 비만·T2DM + AUD 환자에서 기존 AUD 치료제보다 GLP-1 우선 고려 근거 형성\n- 한계: 관찰연구 — RCT 필요. AUD 단독 적응증 아님 (비만·T2DM 병존 상태에서만 검증)",
        "sources": [
          "Lähteenvuo M et al. Repurposing Semaglutide and Liraglutide for Alcohol Use Disorder. JAMA Psychiatry 2025;82(1):94-98. PMID:39535805, DOI:10.1001/jamapsychiatry.2024.3599"
        ]
      }
    },
    "uiHooks": null
  },
  /* ═══════════════════════════════════════════════════════════════════════
     v2 (B2) — 2026-04-21 Liby ingest. 원본: knowledge/by-disease/heart-failure.md
     Boss 승인안 D안: dosing·protocol은 guide에서 제외 (전문의 titration 영역).
     hint: referral·schedule·monitoring → 일차진료에서 놓치면 안 되는 것만.
     ═══════════════════════════════════════════════════════════════════════ */
  "heart-failure": {
    "kind": "disease",
    "keywords": ["heart-failure","심부전","heart failure","CHF","congestive heart failure","HFrEF","HFpEF","HFmrEF","GDMT"],
    "primarySources": [
      "대한심부전학회. 심부전 진료지침 2022",
      "대한심부전학회 사회봉사사/공헌위원회. 심부전 생활백서 2025 (https://www.kshf.or.kr/renewal/page/kshf_date.php)",
      "Roubille F et al. Eur J Prev Cardiol 2025. doi:10.1093/eurjpc/zwaf366",
      "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
    ],
    "sections": {
      "definition": {
        "content": "심부전은 심장이 구조적·기능적 이상으로 전신에 필요한 혈액을 충분히 박출하지 못하거나 충분히 받아들이지 못해 증상·징후(호흡곤란·부종·피로)가 발생하는 임상 증후군. 단일 질환이 아니라 다양한 심혈관·대사 원인이 수렴하는 최종 표현형.",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "classification": {
        "content": "### LVEF 기반 3분류\n| 구분 | LVEF | 특징 |\n|---|---|---|\n| HFrEF | ≤ 40% | 수축기능 저하. GDMT 4 pillars 대상 |\n| HFmrEF | 41–49% | 중간 범주. HFrEF 치료 일부 준용 |\n| HFpEF | ≥ 50% | 이완기능 장애 중심 |",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "exam": {
        "content": "### 증상·징후\n- 호흡곤란(운동 시 → 안정 시 → 좌위 호흡 순으로 진행)\n- 하지 부종, 체중 증가\n- 피로·운동능력 저하\n- 야간 기침, 발작성 야간 호흡곤란(PND)\n- 경정맥 팽대, 폐 수포음, S3 gallop\n\n### 초기 평가 (일차진료 범위)\n- 병력·신체진찰\n- 심전도 (좌각차단 등 비정상 시 주의)\n- 흉부 X선 (심비대·폐울혈)\n- NT-proBNP 또는 BNP\n- 혈액검사: CBC, 전해질, BUN/Cr, LFT, TSH, 철 대사(ferritin·TSAT), HbA1c\n- 심초음파 (LVEF 확인 — 상급기관 필요 시 의뢰)",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "protocol": {
        "content": "### 1차 표준치료 — GDMT 4 Pillars (HFrEF)\n동시 또는 빠른 순차 titration이 원칙. **용량 titration은 전문의 영역**.\n1. ARNI / ACEi / ARB\n2. Beta-blocker (베타차단제)\n3. MRA (Spironolactone·Eplerenone)\n4. SGLT2 inhibitor\n\n### 2차 추가치료\n- 동율동·안정 시 HR ≥ 70 → 이바브라딘\n- 표준치료에도 악화로 입원 필요 → 베리시구앗\n- 심박수 조절 필요한 심방세동 → 디곡신\n\n### 비약물\n- 좌심실보조장치(LVAD), 심장이식, 완화치료\n- ICD/CRT-D (부정맥 예방)",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "dosing": {
        "content": "> **전문의 titration 영역 — 일차진료는 모니터링 용도로만 참조**.\n\n### 표 1. ACEi 시작·목표 용량\n| 약제 | 시작 | 목표 |\n|---|---|---|\n| Captopril | 6.25 mg tid | 50 mg tid |\n| Enalapril | 2.5 mg bid | 10–20 mg bid |\n| Fosinopril | 5–10 mg qd | 40 mg qd |\n| Lisinopril | 2.5–5 mg qd | 20–40 mg qd |\n| Perindopril | 2 mg qd | 8–16 mg qd |\n| Ramipril | 2.5 mg qd | 5 mg bid |\n| Trandolapril | 0.5 mg qd | 4 mg qd |\n\n### 표 2. ARB 시작·목표 용량\n| 약제 | 시작 | 목표 |\n|---|---|---|\n| Candesartan | 4–8 mg qd | 32 mg qd |\n| Valsartan | 20–40 mg qd | 160 mg bid |\n| Losartan | 25–50 mg qd | 150 mg qd |\n\n### 표 3. ARNI\n| 약제 | 시작 | 목표 |\n|---|---|---|\n| Sacubitril/Valsartan | 49/51 mg bid | 97/103 mg bid |\n\n### 표 4. Beta-blocker\n| 약제 | 시작 | 목표 |\n|---|---|---|\n| Bisoprolol | 1.25 mg qd | 10 mg qd |\n| Carvedilol | 3.125 mg bid | 25 mg bid |\n| Metoprolol succinate (서방) | 12.5–25 mg qd | 200 mg qd |\n| Nebivolol | 1.25 mg qd | 10 mg qd |\n\n### 표 5. 신장기능별 MRA\n| 약제 | eGFR > 50 시작·유지 | eGFR 30–49 시작·유지 |\n|---|---|---|\n| Spironolactone | 12.5–25 → 25 qd / QOD | 12.5 → 12.5–25 qd |\n| Eplerenone | 25 → 50 qd | 25 QOD → 25 qd |",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "monitoring": {
        "content": "1. 표준약물 치료 후 LVEF 40% 이상으로 개선된 경우에도 **표준약물 치료 유지 권고** (중단 금지)\n2. **혈압(BP), 심박수(HR) 확인**\n3. **신기능(BUN/Cr), 전해질(ELE) 모니터링**\n\n재진 시 고정 체크 항목 — 일차진료의 역할.",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "contraindication": {
        "content": "- ACEi → ARNI 전환 시: **최소 36시간 wash-out** 필요 (혈관부종 위험)\n- 양쪽 콩팥동맥 협착\n- 임신 (ACEi/ARB/ARNI/SGLT2 모두 금기)\n- 기타 약물별 절대금기는 개별 제품 허가사항 참조",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "schedule": {
        "content": "### 감염 = 심부전 악화 계기\n독감·COVID-19·폐렴구균·RSV·대상포진 감염은 심혈관 합병증 위험을 높인다(염증·응고항진·직접독성 경로). 심부전 환자에서 예방접종은 심부전 악화·입원·사망 예방의 선제적 관리 수단.\n\n### 심부전 환자 권고 예방접종 6종 (대한심부전학회 생활백서 2025)\n- **독감(인플루엔자) 백신**: 매년\n- **폐렴구균 백신**: PCV20 1회 또는 PCV15 + PPSV23 순차접종\n- **대상포진 백신**: 재조합 대상포진 백신(싱그릭스) 2회(0–6개월)\n- **RSV 백신**: ≥60세 1회 권고\n- **COVID-19 백신**: 최신 권장 간격대로 추가접종\n- **Tdap 백신**: 파상풍·디프테리아·백일해 매 10년마다\n\n### 2025 글로벌 심장학회 신규 발표 예방접종 권고\n- ACC (미국), ESC (유럽), EJPC (유럽), TSOC (대만), CSANZ (호주·뉴질랜드), FAC·SAC·CONAREC (아르헨티나) — 6개 학회 2025년 가이드라인에서 심부전/심혈관 환자 예방접종 권고 공통.\n\n성인 전체 예방접종 요약은 `vaccination-summary`, 개별 백신 엔트리는 `Tdap` / `대상포진` / `폐렴구균` 참조.",
        "sources": [
          "대한심부전학회 사회봉사사/공헌위원회. 심부전 생활백서 2025",
          "Roubille F et al. Eur J Prev Cardiol 2025. doi:10.1093/eurjpc/zwaf366"
        ]
      },
      "referral": {
        "content": "### 진료지침에 따른 심부전 전문가 의뢰 6시점\n1. **LVEF와 상관없이 새롭게 발생한 심부전**\n2. **만성 심부전에서 위험요인이 새롭게 발생하거나 지속적으로 보일 때**\n   - 수축기 혈압 < 90 mmHg 또는 증상이 동반된 저혈압\n   - (지속적·반복적) 주사용 강심제 필요\n   - 폐울혈에 의해 NYHA III–IV 증상이나 심각한 피로 지속\n3. **3개월 이상 GDMT에도 지속적인 LVEF ≤ 35%**\n4. **심부전의 원인으로 2차적인 소견이 요구될 때** (심근염 의심, 판막질환 교정, 관상동맥 재관류)\n5. **매년 환자의 전반적 검토를 통한 예후 및 근본적 치료 계획 수립**\n6. **임상연구 등록 가능성 평가**\n\n### I NEED HELP (Stage D HF 약어)\n중증 심부전 대표 예시: Persistent or progressive severe LV failure / Repeated worsening (ER·hospitalization) / Persistent severe symptoms (NYHA III–IV).\n- **I**notropes need (강심제 필요)\n- **N**YHA Fc IV\n- **E**nd-organ dysfunction\n- **E**F < 20%\n- **D**efibrillator shock for VAs\n- **H**F hospitalization (recurrent)\n- **E**scalating diuretics dose\n- **L**ow BP\n- **P**rogressive GDMT intolerance",
        "sources": [
          "대한심부전학회 심부전 진료지침 2022",
          "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
        ]
      },
      "comparison": {
        "content": "### HFrEF vs HFpEF 약물 차이\n| 구분 | HFrEF | HFpEF |\n|---|---|---|\n| 기본 약물 | GDMT 4 pillars (ARNI/ACE/ARB + BB + MRA + SGLT2) | SGLT2 억제제 + RAS 차단제 + 이뇨제 |\n| 이바브라딘 | 동율동·HR ≥ 70 조건부 추가 | 일반 권고 아님 |\n| 베리시구앗 | 표준치료에도 악화 시 | 일반 권고 아님 |",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "notes": {
        "content": "### 전원 최적시기 개념 (그림 1)\n심부전 상태는 시간에 따라 중증도가 변동. 전원 시점은 너무 조기도, 너무 늦지도 않은 \"최적기\"가 중요.\n| 단계 | 상태 | 전원 판단 |\n|---|---|---|\n| 심부전 시작·지속 | NYHA I–II / GDMT 충족 / 입원 없음 | 조기 전원 불필요 |\n| **심부전 진행·악화** | NYHA III–IV / GDMT 감량 필요 / 잦은 입원 / ICD shock 반복 / 신장기능 악화 | **전원·의뢰 최적기** |\n| 심장 펌프 부전 | 다발성 장기 부전 / 심각한 영양실조 / 심장 액사 | 의뢰 너무 늦음 (비가역) |\n\n### 동반 고혈압 관리\n- LVEF 관계없이 BP ≥ 140/90 → 고혈압 약물치료 권고\n- HFrEF: ACEi/ARB + BB + 이뇨제 + MRA 사용 권고\n- 목표 미달 시 디하이드로피리딘계 CCB 추가 고려\n- HFpEF: HFrEF와 유사 기준·목표\n- 좌심실비대 동반 시 RAS 차단제 + CCB + 이뇨제 조합, SBP 120–130 mmHg 목표\n\n### 동반 당뇨병 관리\n- CVD 있거나 위험 높은 당뇨 환자: 심부전 없어도 SGLT2 억제제 표준치료 권고 (심혈관 사망·심부전 입원 예방)\n- HFrEF/HFmrEF + 당뇨: empagliflozin 또는 dapagliflozin 표준치료",
        "sources": [
          "대한심부전학회 심부전 진료지침 2022",
          "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
        ]
      },
      "draft-append": {
        "content": "심부전 환자 재진 시 체크: ① 예방접종 상태(독감·폐렴구균·RSV·대상포진·COVID·Tdap) ② 의뢰 기준 해당 여부(I NEED HELP) ③ BP/HR ④ BUN·Cr·전해질.",
        "sources": []
      }
    },
    /* Boss D안: dosing·protocol은 guide에서 제외 (전문의 titration 영역). hint는 referral/schedule/monitoring 우선. */
    "uiHooks": {
      "hint":        ["referral","schedule","monitoring"],
      "guide":       ["definition","classification","exam","schedule","monitoring","contraindication","comparison","referral","notes"],
      "draftAppend": ["draft-append"]
    }
  },
  "심부전": {
    "kind": "disease",
    "keywords": ["심부전","heart-failure","heart failure","CHF","HFrEF","HFpEF"],
    "primarySources": [
      "대한심부전학회. 심부전 진료지침 2022",
      "대한심부전학회 사회봉사사/공헌위원회. 심부전 생활백서 2025",
      "Roubille F et al. Eur J Prev Cardiol 2025. doi:10.1093/eurjpc/zwaf366",
      "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
    ],
    "sections": {
      "referral": {
        "content": "### 의뢰 6시점\n1. LVEF와 상관없이 새롭게 발생한 심부전\n2. 만성 심부전에서 위험요인이 새롭게 발생·지속 (SBP < 90 / 주사용 강심제 필요 / NYHA III–IV 증상·피로)\n3. 3개월 이상 GDMT에도 지속적인 LVEF ≤ 35%\n4. 심부전의 원인으로 2차적 소견 요구 (심근염·판막·관상동맥)\n5. 매년 전반적 검토·예후·치료계획 수립\n6. 임상연구 등록 가능성 평가\n\n### I NEED HELP (Stage D HF)\nInotropes need / NYHA Fc IV / End-organ dysfunction / EF < 20% / Defibrillator shock for VAs / Recurrent HF hospitalization / Escalating diuretics dose / Low BP / Progressive GDMT intolerance",
        "sources": [
          "대한심부전학회 심부전 진료지침 2022",
          "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
        ]
      },
      "schedule": {
        "content": "### 심부전 환자 권고 예방접종 6종 (생활백서 2025)\n독감(매년) / 폐렴구균(PCV20 1회 또는 PCV15+PPSV23) / 대상포진(싱그릭스 2회 0–6개월) / RSV(≥60세) / COVID-19 / Tdap(10년마다)\n\n감염 = 심부전 악화 계기. 염증·응고항진·직접독성 경로로 심혈관 합병증 위험↑.",
        "sources": [
          "대한심부전학회 사회봉사사/공헌위원회. 심부전 생활백서 2025",
          "Roubille F et al. Eur J Prev Cardiol 2025. doi:10.1093/eurjpc/zwaf366"
        ]
      },
      "monitoring": {
        "content": "1. 표준약물 치료 후 LVEF ≥ 40%로 개선돼도 표준약물 유지\n2. BP·HR 확인\n3. BUN/Cr·전해질 모니터링",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "classification": {
        "content": "HFrEF(LVEF ≤ 40%) / HFmrEF(41–49%) / HFpEF(≥ 50%)",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "draft-append": {
        "content": "심부전 환자 재진 시 체크: ① 예방접종 상태(독감·폐렴구균·RSV·대상포진·COVID·Tdap) ② 의뢰 기준 해당 여부(I NEED HELP) ③ BP/HR ④ BUN·Cr·전해질.",
        "sources": []
      }
    },
    "uiHooks": {
      "hint":        ["referral","schedule","monitoring"],
      "guide":       ["classification","schedule","monitoring","referral"],
      "draftAppend": ["draft-append"]
    }
  },
  /* v2 (B2) topic — 2026-04-21 Liby ingest. 원본: knowledge/guidelines/heart-failure-referral.md */
  "heart-failure-referral": {
    "kind": "topic",
    "parents": ["heart-failure"],
    "keywords": ["heart-failure-referral","심부전 의뢰","심부전 전원","상급병원 의뢰","GDMT intolerance","I NEED HELP","Stage D HF"],
    "primarySources": [
      "대한심부전학회 심부전 진료지침 2022",
      "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
    ],
    "sections": {
      "referral": {
        "content": "### 의뢰 6시점 — 세밀화\n**01. LVEF와 상관없이 새롭게 발생한 심부전**\n- 새 진단 시 원인 감별·초기 약물치료·심초음파 위해 의뢰\n- HFrEF/HFmrEF/HFpEF 어느 쪽이든 최초 진단 시점은 상급 평가 대상\n\n**02. 만성 심부전에서 위험요인이 새롭게 발생·지속**\n- 수축기 혈압 < 90 mmHg 또는 증상이 동반된 저혈압\n- (지속적·반복적) 주사용 강심제 필요\n- 폐울혈에 의해 NYHA III–IV 증상·심각한 피로 지속\n\n**03. 3개월 이상 GDMT에도 지속적인 LVEF ≤ 35%**\n- ICD/CRT 등 device therapy 후보\n\n**04. 심부전의 원인으로 2차적 소견 요구**\n- 심근염 의심, 심장판막질환·판막교정, 관상동맥질환 재관류 가능성\n\n**05. 매년 전반적 검토·예후·근본치료 계획**\n- 안정기 환자도 연 1회 정기 검토\n\n**06. 임상연구 등록 가능성 평가**",
        "sources": ["대한심부전학회 심부전 진료지침 2022"]
      },
      "notes": {
        "content": "### I NEED HELP — Stage D HF 9개 단서\n| 약어 | 의미 | 일차진료 관찰 포인트 |\n|---|---|---|\n| **I**notropes need | 강심제 필요 | 타기관 입원력·주사제 기록 |\n| **N**YHA Fc IV | 안정 시에도 증상 | 일상생활 수행력 |\n| **E**nd-organ dysfunction | 말단장기기능 이상 | Cr·AST/ALT 상승, 저산소증 |\n| **E**F < 20% | 박출률 심한 감소 | 최근 심초음파 |\n| **D**efibrillator shock for VAs | 심실 부정맥 ICD shock | ICD 기록 |\n| **H**F hospitalization (recurrent) | 반복 입원 | 1년 이내 2회 이상 |\n| **E**scalating diuretics dose | 이뇨제 용량 증가 | furosemide 추이 |\n| **L**ow BP | 저혈압 | SBP < 90 반복 |\n| **P**rogressive GDMT intolerance | 표준치료 점진적 내약성 저하 | 신장·혈압·칼륨으로 GDMT 감량·중단 |\n\n특히 GDMT 내약성 저하(P)는 일차진료에서 가장 먼저 관찰되는 신호.\n\n### 전원 최적시기 4단계 곡선\n| 단계 | 축상 위치 | 상태 | 전원 판단 |\n|---|---|---|---|\n| 심부전 시작·지속 | 중증도 낮음 | NYHA I–II / GDMT 충족 / 입원 없음 | 조기 전원 불필요 |\n| **심부전 진행·악화** | 중증도 상승 | NYHA III–IV / GDMT 감량 필요 / 잦은 입원 / ICD shock / 신장 악화 | **전원·의뢰 최적기** |\n| 심장 펌프 부전 | 중증도 매우 높음 | 다발성 장기 부전 / 심각한 영양실조 / 심장 액사 | 의뢰 너무 늦음 (비가역 진입) |\n| 사망 | — | — | — |\n\n**상급 심부전센터 다학제팀**: 말기완화치료 / 정신건강의학과 / 약사 / 심장내과 / 심장혈관외과 / 간호사 / 의료보조사 / 사회사업팀.",
        "sources": [
          "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732",
          "대한심부전학회 심부전 진료지침 2022"
        ]
      }
    },
    "uiHooks": null
  },
  "I NEED HELP": {
    "kind": "topic",
    "parents": ["heart-failure"],
    "keywords": ["I NEED HELP","Stage D HF","심부전 의뢰","GDMT intolerance"],
    "primarySources": [
      "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"
    ],
    "sections": {
      "notes": {
        "content": "### I NEED HELP — Stage D HF 9개 단서\nInotropes need / NYHA Fc IV / End-organ dysfunction / EF < 20% / Defibrillator shock for VAs / Recurrent HF hospitalization / Escalating diuretics dose / Low BP / Progressive GDMT intolerance\n\n다수 해당 시 전원·의뢰 최적기 단서. 상세 표는 `heart-failure-referral` 엔트리 참조.",
        "sources": ["Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732"]
      }
    },
    "uiHooks": null
  },
  "GDMT intolerance": {
    "kind": "topic",
    "parents": ["heart-failure"],
    "keywords": ["GDMT intolerance","심부전 표준치료 내약성","Progressive GDMT intolerance"],
    "primarySources": [
      "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732",
      "대한심부전학회 심부전 진료지침 2022"
    ],
    "sections": {
      "notes": {
        "content": "GDMT(Guideline-Directed Medical Therapy) 점진적 내약성 저하는 I NEED HELP 9 단서 중 P에 해당. 일차진료에서 가장 먼저 관찰되는 신호 — 신장·혈압·칼륨 수치로 GDMT 감량·중단이 반복되면 전원 검토.",
        "sources": [
          "Dunlay SM et al. JACC Heart Fail 2021;9(10):722-732",
          "대한심부전학회 심부전 진료지침 2022"
        ]
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) topic — 2026-04-22 Liby ingest. 원본: knowledge/by-disease/LPR.md (San Diego Consensus 2025 추가분).
     기존 v1 "LPR"·"후두염"·"인후두역류" 엔트리는 본문 불변 원칙으로 보존, 신규 consensus 내용은 topic으로 격리.
     2026-04-22 L1 B1-patch-v2: treatment → protocol (vocabulary 정합, Liby de5 ingest 사후 교정) */
  "LPR-consensus": {
    "kind": "topic",
    "keywords": ["LPR-consensus","San Diego Consensus","LPS","LPRD","laryngopharyngeal symptoms","laryngopharyngeal reflux disease","후두 과반응","laryngeal hyperresponsiveness"],
    "primarySources": [
      "Yadlapati R et al. Am J Gastroenterol 2025;121(2):322-336. PMID:40197644, DOI:10.14309/ajg.0000000000003482"
    ],
    "sections": {
      "exam": {
        "content": "### LPS vs LPRD 구분 (San Diego Consensus 2025)\n- **LPS** (Laryngopharyngeal Symptoms): 기침·음성변화·인후 청소·과다점액·인후통 — 역류가 원인일 수 있는 인후두 증상 (≥주 2회, ≥8주)\n- **LPRD** (Laryngopharyngeal Reflux Disease): LPS + **객관적 역류 증거** — 둘은 다르다. LPS 환자의 ~60%는 보행성 역류 모니터링 정상.\n\n**핵심 분기 — 식도 증상 동반 여부로 진단·치료 알고리즘 분기**:\n- LPS + 식도 역류 증상(속쓰림·역류감) → PPI 경험적 치료 가능\n- 고립 LPS (식도 증상 없음) → 내시경 + 보행성 역류 모니터링 필요 (PPI 경험적 미권고)\n\n### 후두경의 역할과 한계\n- 후두경: 다른 후두 원인(악성 포함) 배제 목적으로 필요 — **후두경 소견만으로 LPRD 진단 불가**\n- 적막부종·발적 등 LPRD 특이도 낮음 (정상인에서도 관찰)\n- RSI(역류증상지수) ≥13 기준은 LPRD 진단에 충분한 특이도 없음 → 진단 도구로 사용 불가",
        "sources": []
      },
      "protocol": {
        "content": "### San Diego Consensus 치료 알고리즘\n\n**A. LPS + 식도 증상 동반 (속쓰림·역류감 있음)**\n1. PPI 표준용량 BID × 3개월 + 생활습관 교정\n2. 알긴산 4회/일 (식후 3회 + 취침 전) 병용 가능 — PPI 단독 대비 증상 개선 추가 효과\n3. 반응 없으면 → 내시경 + 보행성 역류 모니터링\n\n**B. 고립 LPS (식도 증상 없음)**\n1. PPI 경험적 치료 미권고 — 객관적 역류 증거 없이 장기 산 억제제 회피\n2. 내시경 + 보행성 역류 모니터링 먼저\n   - 24h pH-impedance (근위 역류·비산성 역류 평가)\n   - 96h wireless pH (AET 일내 변동성 보정)\n3. AET < 4.0% (96h wireless 전 일수) → 역류 기전 가능성 낮음 → 후두 과반응·심리 요인 평가",
        "sources": []
      },
      "notes": {
        "content": "### 후두 과반응 (Laryngeal Hyperresponsiveness)\n- LPS/LPRD 모두에서 기여 가능 — LPRD 치료 반응 불완전 시 고려\n- 언어치료(LRT: 후두 재조정 치료) — 전문 언어치료사 의뢰\n- 신경조절제: 가바펜틴·프레가발린 (만성 기침 중심 증거), TCA (항콜린 부작용 주의)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) topic — 2026-04-22 Liby ingest. 원본: knowledge/by-disease/depression-screening.md
     2026-04-22 L1 B1-patch-v2: treatment → protocol (vocabulary 정합, Liby de5 ingest 사후 교정) */
  "depression-screening": {
    "kind": "topic",
    "keywords": ["depression-screening","우울증","depression","PHQ-9","PHQ-2","자살위험","suicide risk","USPSTF","스크리닝","우울증 스크리닝"],
    "primarySources": [
      "Mabry-Hernandez IR et al. Am Fam Physician 2026;113(3):273-274. PMID:41839080"
    ],
    "sections": {
      "indication": {
        "content": "### USPSTF 권고 (2026 업데이트)\n- **성인 (18세 이상)**: 외래 루틴 우울증 스크리닝 권고 (Grade B)\n- **임신·산후 여성 포함** 대상\n- **자살위험**: 우울증 스크리닝과 함께 자살 위험 추가 평가 권고",
        "sources": []
      },
      "exam": {
        "content": "### 1단계 — 초기 선별 (PHQ-2, 2문항)\n- \"지난 2주간 기분이 가라앉거나 희망이 없다고 느낀 날이 있었습니까?\"\n- \"지난 2주간 평소에 즐기던 일에 흥미를 잃은 날이 있었습니까?\"\n- 각 0-3점 → **PHQ-2 ≥ 3** 시 PHQ-9 시행\n\n### 2단계 — 확인 진단 (PHQ-9, 9문항)\n- 0-4: 최소 / 5-9: 경도 / 10-14: 중등도 / 15-19: 중등고도 / 20-27: 고도\n- **PHQ-9 항목 9 (자해·자살 생각) 양성 → 즉시 자살위험 평가**\n\n### 자살위험 평가\n- **C-SSRS** (Columbia Suicide Severity Rating Scale) 또는 간이 질문:\n  - \"죽고 싶다는 생각이 드신 적 있습니까?\"\n  - \"스스로 해치거나 자해할 계획이 있습니까?\"\n- 고위험: 응급 의뢰 / 입원 조정",
        "sources": []
      },
      "protocol": {
        "content": "### 경도-중등도 우울증\n- **정신치료(1차)**: CBT 또는 IPT\n- **약물치료**: SSRI (escitalopram, sertraline) — 4-8주 후 PHQ-9 재시행\n\n### 중등고도-고도 우울증\n- 약물치료 + 정신건강의학과 의뢰",
        "sources": []
      },
      "referral": {
        "content": "- PHQ-9 ≥15 (중등고도 이상)\n- 자살위험 양성\n- 2회 이상 치료 실패\n- 양극성 우울 의심 (조증 삽화 과거력)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) drug — 2026-04-22 Liby ingest. 원본: knowledge/by-drug/sglt2-inhibitors.md.
     일부 섹션은 Tier 1(AFP 비뇨생식기 감염 논문) 주제 범위를 넘어 임시 (Phase 5b 보강 대상) — [TIPS — 임시 (보강 대상)] 라벨.
     임시 라벨 섹션은 Guide tab curation ctx에 전달되지 않는다 (invisible, L2-patch 2026-04-22). */
  "sglt2-inhibitors": {
    "kind": "drug",
    "keywords": ["sglt2-inhibitors","SGLT2i","SGLT-2억제제","포시가","자디앙","다파글리플로진","엠파글리플로진","dapagliflozin","empagliflozin"],
    "primarySources": [
      "Swanson J et al. Am Fam Physician 2026;113(3):281-282. PMID:41839088"
    ],
    "sections": {
      "indication": {
        "content": "- 2형 당뇨병 혈당 조절\n- 심부전 (HFrEF·HFpEF) — 입원율·사망률 감소\n- 만성 콩팥병 진행 억제",
        "sources": ["[TIPS — 임시 (보강 대상)]"]
      },
      "notes": {
        "content": "### 비뇨생식기 감염 위험\nSGLT-2 억제제 처방 시 요로감염(UTI) 및 생식기 진균감염(여성: 질효모균증, 남성: 음경포피염) 위험 상승.\n\n**위험인자:**\n- 여성 (특히 반복성 UTI 기왕력)\n- 불량한 회음부 위생\n- 면역저하자\n\n**처방 전 반드시 교육:**\n- 충분한 수분 섭취 권고\n- 회음부 위생 교육 (소변 후 앞→뒤 닦기, 속옷 관리)\n- 증상 발생 시 즉시 내원 지시 (소변 시 통증·작열감, 분비물 변화)\n- 반복성 UTI 기왕력 환자: 위험-편익 재평가 후 처방 여부 결정",
        "sources": []
      },
      "contraindication": {
        "content": "- 당뇨병성 케톤산증(DKA) 위험 — 수술·공복 시 일시 중단 고려\n- 하지 절단 위험 (엠파글리플로진 > 다파글리플로진, 주의 환자에서)\n- Fournier 괴저 (희귀하나 심각)\n- eGFR < 45 ml/min/1.73m² 이하에서 혈당 강하 효과 감소 (신장·심부전 적응증은 eGFR 기준 별도)",
        "sources": ["[TIPS — 임시 (보강 대상)]"]
      },
      "reimbursement": {
        "content": "- 2형 당뇨: 메트포르민 병용 또는 인슐린과 병용 기준으로 급여\n- 심부전/CKD 적응증: 별도 급여 기준 확인 필요 (적응증별 차이)",
        "sources": ["[TIPS — 임시 (보강 대상)]"]
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) topic — 2026-04-22 Liby ingest. 원본: knowledge/by-drug/vitamin-d.md.
     md 파일 위치는 by-drug이나, 내용 중심이 일반 보충 근거 가이드라인 해석 → topic 분류.
     dosing 섹션은 Tier 1 가이드라인이 직접 다루지 않아 임시 (Phase 5b 보강 대상) — [TIPS — 임시 (보강 대상)] 라벨.
     임시 라벨 섹션은 Guide tab curation ctx에 전달되지 않는다 (invisible, L2-patch 2026-04-22). */
  "vitamin-d": {
    "kind": "topic",
    "keywords": ["vitamin-d","비타민D","vitamin D","cholecalciferol","비타민D보충","질병예방","Endocrine Society"],
    "primarySources": [
      "Dakkak M et al. Am Fam Physician 2026;113(3):291-293. PMID:41839092"
    ],
    "sections": {
      "indication": {
        "content": "### 내분비학회(Endocrine Society) 2025 가이드라인 핵심 입장\n\n**근거 있는 적응증:**\n- 1세 미만 유아: 구루병 예방 — 권고\n- 1-18세 소아청소년: 구루병·골연화증 예방 — 권고\n- 75세 이상 고령자: 낙상·골절 예방 — 조건부 권고\n- 임신부: 임신합병증 감소 일부 근거 — 조건부 권고\n- 흡수불량 증후군, 비타민D 결핍 확인 환자 — 권고\n\n**근거 약한 적응증 (일반 성인 광범위 보충):**\n- 뼈건강 이외 목적 (암 예방·심혈관·당뇨·인지 기능·자가면역): **근거 불충분** — 일상적 보충 미권고\n- 50-74세 건강 성인 일반 보충: **미권고**\n\n**환자 상담 포인트:**\n- \"비타민D는 암·당뇨·심장병을 예방하지 않습니다\" — 최신 가이드라인 기반으로 명확히 안내 가능\n- 75세 이상, 임신부, 흡수불량 환자는 보충 근거 있음",
        "sources": []
      },
      "dosing": {
        "content": "- 일반 성인 (결핍 확인 시): 1,500-2,000 IU/일 (cholecalciferol)\n- 유지 목표 혈중 25(OH)D: 20-50 ng/mL (결핍 < 20 ng/mL)\n- 고용량 치료 (결핍 교정): 50,000 IU 주 1회 × 8주 후 유지용량 전환",
        "sources": ["[TIPS — 임시 (보강 대상)]"]
      },
      "notes": {
        "content": "### 모니터링\n- 결핍 치료 중: 3개월 후 25(OH)D 재측정\n- 과잉 독성 (25(OH)D > 150 ng/mL): 고칼슘혈증 → 신부전 위험\n- 일반 건강인 정기 측정: 근거 없음 (증상 없는 일반 성인 스크리닝 불필요)",
        "sources": []
      }
    },
    "uiHooks": null
  },
  /* v2 (B2) drug — 2026-04-22 Liby ingest. 원본: knowledge/by-drug/neffy.md.
     TRIAGE 감지는 별도 "아나필락시스" 카테고리에서 (Neffy 단독 키 X) — 임상 맥락 우선 (미르 2026-04-22).
     2026-04-22 L1 B1-patch-v2: treatment → protocol (vocabulary 정합, Liby de5 ingest 사후 교정)
     2026-04-22 L1 B1-patch-v2 scope 연장: uiHooks.guide={"*"} 오버라이드 추가.
       drug kind 기본값 guide=["contraindication","precaution","comparison","insurance"] 4개에
       neffy 보유 섹션(indication·dosing·protocol·notes) 미포함 → Guide tab invisible.
       응급 약물 특성상 전체 섹션 노출이 필요 (미래 섹션 추가 자동 포함). */
  "neffy": {
    "kind": "drug",
    "keywords": ["neffy","Neffy","비강내에피네프린","intranasal epinephrine","에피네프린","epinephrine","아나필락시스","anaphylaxis","알레르기응급","EpiPen"],
    "primarySources": [
      "Wolf J et al. Am Fam Physician 2026;113(3):270-272. PMID:41839078"
    ],
    "sections": {
      "indication": {
        "content": "- I형 즉시형 알레르기 반응 응급 치료 (아나필락시스)\n- 에피네프린 자동주사기(EpiPen) 대체 옵션\n- 특히 적합: 주사 공포 환자, 소아, 자가 투여 어려운 환자",
        "sources": []
      },
      "dosing": {
        "content": "- **1회 비강 내 분무 (한쪽 비공)**: 에피네프린 2 mg/비공\n- 5-10분 후 증상 지속 시 반대쪽 비공에 추가 투여\n- 투여 후 **반드시 응급실 이송** (에피네프린 효과 소실 후 이상성 반응 위험)",
        "sources": []
      },
      "protocol": {
        "content": "### 아나필락시스 처치 순서\n1. **Neffy 비강 투여** (즉시) — 자동주사기 대체 가능\n2. 앙와위 (다리 올리기) — 혈압 유지\n3. 119 호출 또는 응급실 이송\n4. 필요 시 2차 투여 (5-10분 후)\n5. 항히스타민제·스테로이드 — 2차 치료 (에피네프린 대체 불가)",
        "sources": []
      },
      "notes": {
        "content": "### EpiPen vs Neffy 비교\n| 항목 | EpiPen (자동주사기) | Neffy (비강내) |\n|------|---------------------|----------------|\n| 투여 방법 | 허벅지 근육주사 | 비강 분무 |\n| 주사 공포 | 장벽 있음 | 없음 |\n| 소아 적용 | 가능 (체중별 용량) | 적용 가능 |\n| 흡수 속도 | 빠름 | 비교적 빠름 |\n| 비강충혈 시 | 해당 없음 | 흡수 감소 가능 |\n| 처방 | 급여 여부 확인 필요 | 신규 옵션 |\n\n### 환자 교육\n- \"주사기 없이 코에 뿌리는 에피네프린\" — 휴대 편의성 강조\n- 처방 시 사용법 시연 교육 필수\n- 유효기간 확인 및 교체 주기 안내\n- 항상 2개 처방 (1개 사용 후 효과 불충분 시 대비)",
        "sources": []
      },
      "contraindication": {
        "content": "- 비강 충혈·비강 폴립 환자에서 흡수 감소 가능\n- 에피네프린 효과 단기간 (20-30분) → 반드시 응급실 이송\n- 이상성 아나필락시스(biphasic anaphylaxis): 초기 호전 후 수 시간 내 재발 — 응급실 관찰 필요\n- 국내 급여/허가 현황 확인 필요 (2026 기준 신규 제제)",
        "sources": []
      }
    },
    "uiHooks": {"guide": ["*"]}
  }
};

/* ═══════════════════════════════════════════════════════════════════
   L1 Phase B1 — v2 승격 (참조 공유 aliasing) · 2026-04-22
   설계서: sessions/design-2026-04-22-L1b-v1-migration.md
   원본 md 라벨을 sections[k].sources[]에 이식. 신설 라벨 없음.
   참조 공유 주의: unique 본체 변수(_XXX_v2) 수정 시 모든 alias 자동 반영.
                   객체 mutation 금지.
═══════════════════════════════════════════════════════════════════ */

/* v2 승격 — 2026-04-22 L1 B1 — 원본: knowledge/by-disease/LPR.md
   원본 md 라벨: [TIPS — by ENT교수] (뮤테란 off-label 거담, PPI 부작용 대안).
   경험적 치료 파트만 이 엔트리에 담는다. San Diego Consensus 진단 알고리즘은
   별도 topic `LPR-consensus` 엔트리가 커버 (TRIAGE 동시 감지).
   2026-04-22 L1 B1-patch: treatment → protocol (vocabulary 정합) */
var _LPR_v2 = {
  kind: "disease",
  keywords: ["LPR","laryngopharyngeal reflux","역류성후두염","인후두역류","목 열감","목 화끈거림","P-CAB","자큐보"],
  primarySources: [],
  sections: {
    exam: {
      content: "### 환자 표현 — '목 열감' + 기침 [TIPS — by ENT 교수]\n'목에 열감이 있으면서 기침이 나와요'라고 호소하는 환자에서 **'열감'은 진짜 발열이 아니라 타는 듯한 느낌, 화끈거림의 표현**.\n→ **LPR / GERD 의심** — 인후 burning sensation은 LPS 핵심 증상.\n\n### 동반 증상 점검\n- 식도 증상 (속쓰림·역류감) 동반 여부 — 진단 알고리즘 분기점\n- 인후이물감·잦은 헛기침·잠긴 목소리·점액 과다",
      sources: []
    },
    protocol: {
      content: "### 1차 — PPI + 뮤테란 [CLINICAL + TIPS]\n- PPI 표준용량 BID — LPR 1차 치료 (근거 확립)\n- 뮤테란(아세틸시스테인 200mg 경구) 병용 — LPR 인후 분비물·점액 거담 [TIPS — by ENT교수, off-label]\n\n### PPI 부작용 시 대안 [TIPS — by ENT 교수]\n- **알긴산(Alginic acid, Gaviscon류)** — raft 형성, 역류 물리적 차단\n- **Promac(polaprezinc)** — 위점막 보호제. 알긴산과 병용 가능",
      sources: []
    },
    "follow-up-schedule": {
      content: "### LPR f/u 간격 [TIPS — by ENT 교수]\n- LPR 진단 환자는 **30일 간격으로 약을 주면서 증상 호전될 때까지 지켜본다**\n- 첫 3개월은 PPI 표준 BID 유지, 호전 시 단계적 감량 (de-escalation)",
      sources: []
    }
  },
  uiHooks: {
    hint: ["protocol","follow-up-schedule","referral","contraindication","precaution","pregnancy"],
    guide: ["classification","indication","exam","protocol","follow-up-schedule","comparison","monitoring","insurance","notes"],
    triage: ["differential"],
    draftAppend: ["draft-append"]
  }
};
KNOWLEDGE_BUNDLE["LPR"] = _LPR_v2;
KNOWLEDGE_BUNDLE["인후두역류"] = _LPR_v2;
KNOWLEDGE_BUNDLE["역류성후두염"] = _LPR_v2;

/* v2 승격 — 2026-04-22 L1 B1 — 원본: knowledge/by-disease/dry-mouth.md
   원본 md 라벨:
     - Pilocarpine 섹션: [출처: NEJM 1993 Leveque et al., Salagen SPC] (Tier 1).
                         임상패턴 BID는 원본이 [출처 미확인] 태그 → 섹션 본문에 그대로 보존.
     - 뮤코미스트 가글 섹션: [출처: Sio TT et al. Mayo Clin Proc 2019] (Tier 1).
                             일반 xerostomia 직접 gargle은 [출처 미확인] — 본문 내 인라인 보존.
   2026-04-23 통합: protocol + protocol-gargle 두 섹션을 단일 protocol로 통합 (자유 섹션 제거).
   가글 치료도 치료 프로토콜의 일부 — 별도 자유 섹션으로 분리할 필요 없음. sources[] 배열로 두 Tier 1 출처 모두 보존. */
var _xerostomia_v2 = {
  kind: "disease",
  keywords: ["구강건조증","구강건조","dry mouth","xerostomia"],
  primarySources: [],
  sections: {
    protocol: {
      content: "① Pilocarpine(살라겐/필로겐) po\n  - 두경부암 방사선 후 구강건조증: 5mg TID (가이드라인)\n  - 쇼그렌증후군: 5mg QID (가이드라인)\n  - 임상 패턴: BID 가능 (부작용 경감 목적) [출처 미확인]\n  - 급여: 두경부암 방사선 후 or 쇼그렌증후군 진단 시\n  - 비급여: 그 외 원인 (당뇨·약물 유발 등)\n\n② 뮤코미스트 10% 1 ampule + 물 100cc → TID 가글\n  - 방사선 유발 xerostomia: 10% NAC rinse 주간 유의 개선 (Mayo Clinic Pilot RCT, 2019)\n  - 일반 구강건조증: 직접 gargle 근거 없음, 임상 경험 기반 [출처 미확인]",
      sources: ["Leveque FG et al. NEJM 1993 (Pilocarpine)","Salagen SPC","Sio TT et al. Mayo Clin Proc 2019"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["구강건조증"] = _xerostomia_v2;
KNOWLEDGE_BUNDLE["구강건조"] = _xerostomia_v2;
KNOWLEDGE_BUNDLE["dry mouth"] = _xerostomia_v2;
KNOWLEDGE_BUNDLE["xerostomia"] = _xerostomia_v2;

/* v2 승격 — 2026-04-22 L1 B1 — 원본: knowledge/by-disease/burning-mouth.md
   원본 md 라벨: [CLINICAL] + [출처: Kim JW et al. Sci Rep 2025] (Tier 1).
   2026-04-22 L1 B1-patch: treatment → protocol (vocabulary 정합) */
var _BMS_v2 = {
  kind: "disease",
  keywords: ["burning mouth","구강작열감","구강작열감증후군","BMS"],
  primarySources: [
    "Kim JW et al. Sci Rep 2025"
  ],
  sections: {
    protocol: {
      content: "뮤코미스트 가글 — 10% 1 ampule + 물 100cc → TID 가글\n- 2025 다기관 임상에서 VAS 통증 + 삶의 질(OHIP-14K) 유의 개선\n- Clonazepam 0.5mg/d 병용 시 반응률 증가 (단독 60% → 병용 80%)",
      sources: ["Kim JW et al. Sci Rep 2025"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["burning mouth"] = _BMS_v2;
KNOWLEDGE_BUNDLE["구강작열감"] = _BMS_v2;
KNOWLEDGE_BUNDLE["BMS"] = _BMS_v2;

/* ═══════════════════════════════════════════════════════════════════
   2026-04-23 Liby ingest batch — 11건 (A 7신규 + B 4보강)
   원본 md는 이미 Deep Extract 완료. 본 ingest는 bundle 이식만.
   설계 메모:
   - resistant-hypertension: parents=["hypertension"] 후보지만 bundle에 hypertension 없음 → parents 생략
   - ckd-monitoring: kind=topic → parents 부여 금지 (section-vocabulary.md parents 규칙)
   - sex-hormone-vte-risk·smoking-cessation·afp-top20-poems-2024: 동일 사유로 parents 없음
   - mucomyst·pilocarpine: kind=drug + protocol/indication/dosing 섹션 → uiHooks.guide ["*"] 필수
   - dizziness v2 승격: v1(exam·differential·differentialShort·draftAppend) 매핑 → v2(exam/differential/referral/notes)
═══════════════════════════════════════════════════════════════════ */

/* dizziness v2 — v1 승격. 2026-04-23 ingest (L1 B1 패턴).
   v1→v2 매핑:
   - exam (기본 11항목 + 편두통 추가 문진) → sections.exam
   - differential (텍스트) → sections.differential.content
   - differentialShort (구조 배열) → sections.differential 본문에 마크다운으로 삽입 보존
   - draftAppend (null) → draft-append 섹션 생략
   - 신규 VA 도플러 의뢰 섹션 → sections.referral [CLINICAL — 조건부] */
var _dizziness_v2 = {
  kind: "disease",
  keywords: ["dizziness","어지럼증","어지러움","현기증","vertigo"],
  primarySources: [],
  sections: {
    exam: {
      content: "### 어지럼증 기본 문진 11항목 [TIPS — 교수님 외래 참관]\n1. 언제부터 어지러웠는지\n2. 갑자기 발생했는지\n3. 과거 비슷한 episode 있었는지\n4. 한번 어지러울 때 얼마나 지속되는지\n5. 괜찮을 땐 완전히 괜찮은지 (삽화성 vs 지속성)\n6. 심한 정도 — 구역/구토 동반 여부, 휘청거림\n7. 귀먹먹함(이충만감) 동반 여부\n8. 이명 동반 여부\n9. 만성이면 한달 발생 빈도\n10. 어떤 상황에서 특히 어지러운지 (자세변화, 기립, 스트레스 등)\n11. 가장 최근 episode는 언제\n\n### 편두통성 어지럼증 추가 문진\n- 편두통 과거력 확인\n- 두통 동반 여부, 빛·소리 과민, 구역/구토, 전조증상, 두통 양상(박동성/지속시간), 가족력, 발작 빈도\n\n### 환자가 '어지럽다'고 할 때 [TIPS — by ENT 교수]\n- '어지럽냐'고 물으면 다 어지럽다고 함 → **구체화 질문** 필수\n- **'걸을 때 비틀거리거나 중심을 못 잡은 적 있는지'** — 진짜 vertigo·ataxia 감별의 시작점\n\n### 어지럼증 초진 검사 표준 [TIPS — by ENT 교수]\n| 항목 | 확인 |\n|---|---|\n| 구토 여부 | 동반 여부·빈도 |\n| 일상생활 지장 정도 | 침상안정·휘청거림 정도 |\n| **Head Impulse Test (HIT)** | 말초 vs 중추 감별 (catch-up saccade 유무) |\n| **Tandem gait** | 소뇌·후순환 의심 시 |\n| 난청·이명·귀 먹먹함 | 메니에르·내이수종 감별 |\n| **고막 시진** | 외이염·중이염·천공 |\n\nHIT abnormal + skew deviation 없음·nystagmus 단방향 = **HINTS 양성 → 말초성**\nHIT normal + skew deviation 있음·nystagmus 변화 = **HINTS 음성 → 중추성 의심 (소뇌 경색)**\n\n### 귀에 물약 → 일시적 어지럼 [TIPS — by ENT 교수]\n- 귀에 물약을 넣었을 때 어지러울 수 있음\n- 원인: 물약이 차가움 → 외이도 내 온도 자극 → caloric stimulation\n- 환자 교육: **물약을 손에 잠시 쥐어 체온 정도로 데워서** 점안",
      sources: ["[TIPS — 교수님 외래 참관]"]
    },
    differential: {
      content: "### Horses — 흔한 원인 (빈도순)\n1. **BPPV** — 자세 변화 시 수초~1분 내 소실. 가장 흔함(말초성 현훈의 절반 이상)\n2. **전정신경염** — 바이러스 후 급성 지속성 현훈. 청력저하 없음. 오심·보행장애 동반\n3. **편두통성 어지럼증 (Vestibular migraine)** — 편두통 과거력 + 반복성. 두통 없이도 어지럼만 올 수 있음\n4. **기립성 저혈압** — 기립 시 어지럼. 노인·탈수·강압제 복용자\n5. **메니에르병** — 반복성 현훈 + 이명 + 편측 청력저하 + 이충만감 동반\n\n### Zebra — 드물지만 절대 놓치면 안 됨\n- ⚠ **소뇌경색 / TIA** — 갑작스러운 발병. 보행장애, 두통, 복시·안면마비·구음장애 동반 시 즉시 의심. RedFlag 영역.",
      sources: ["AAFP Am Fam Physician 2017","NCBI StatPearls"]
    },
    referral: {
      content: "### 척추동맥 도플러 — 90%는 불필요 [CLINICAL — 조건부]\n어지럼증 환자 1,021명 후향 분석 (단일 신경과 클리닉).\n\n핵심 수치:\n- 약 90% — 유의한 척추동맥 죽상경화 없음\n- 5.1% — 혈역학적으로 유의한 척추동맥 병변\n- 유의 병변은 ≥60세 + 심혈관 위험인자 보유 남성에 집중\n\n검사 의뢰 기준 (실전 적용):\n| 환자 | 도플러 권고 |\n|---|---|\n| <60세 + 심혈관 위험인자 없음 | 생략 가능 — 불필요한 검사·비용 절감 |\n| ≥60세 + 심혈관 위험인자 있음 (HTN·DM·이상지질·흡연) | 고려 — 5.1%에서 의미 있는 병변 발견 |\n| Red flag 동반 (보행장애·복시·구음장애·편측 위약) | 도플러가 아닌 즉시 뇌영상·응급 의뢰 |\n\n주의:\n- 도플러는 red flag (소뇌·뇌간 경색 의심) 환자의 적합한 first-line이 아님 — 정상 결과가 후순환 뇌졸중을 배제하지 못함\n- 외래 어지럼증에서 선택적 의뢰 기준으로서의 의미. 일반 루틴 screening 금지",
      sources: ["Kurşun O, Karataş H. Vertebral Artery Doppler Necessity in Vertigo Patients. Noro Psikiyatr Ars 2025;62(3):256-258. PMID:40950820, DOI:10.29399/npa.28793"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["dizziness"] = _dizziness_v2;
KNOWLEDGE_BUNDLE["어지럼증"] = _dizziness_v2;
KNOWLEDGE_BUNDLE["vertigo"] = _dizziness_v2;

/* 저항성 고혈압 — 신규 (Deep Extract 대기 중이었던 기존 md).
   parents: hypertension 엔트리가 bundle에 없음 → 생략 (silent skip, librarian GOTCHA 준수). */
var _resistant_htn_v2 = {
  kind: "disease",
  keywords: ["저항성고혈압","resistant hypertension","스피로노락톤","spironolactone","MRA","이차성고혈압","백의고혈압"],
  primarySources: [
    "Haley SP et al. Resistant Hypertension. Am Fam Physician 2026;113(1):43-50. PMID:41544280 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "3제 항고혈압제(이뇨제 포함) 최적 또는 최대 용량에도 혈압 목표 미달.",
      sources: []
    },
    exam: {
      content: "### 진단 전 배제 사항 (먼저 확인)\n| 확인 항목 | 방법 |\n|----------|------|\n| 백의고혈압 | 가정혈압 모니터링, 정확한 측정 기술 확인 |\n| 약물 비순응 | 복약 이행도 확인 |\n| 이차성 고혈압 | 원인 탐색 (신장·내분비 등) |\n| 치료 최적화 미흡 | 선호 항고혈압제 사용 여부·용량 확인 |\n| 공존질환 미관리 | 동반 질환 조절 상태 확인 |\n| 생활습관·사회적 요인 | 식염, 비만, 음주, 약물 상호작용 등 |",
      sources: []
    },
    protocol: {
      content: "### 기본 3제 조합 (최적화 우선)\n```\nDHP-CCB (예: amlodipine)\n+ ARB 또는 ACEi (예: losartan, enalapril)\n+ Thiazide 계열 이뇨제 (예: chlorthalidone, HCTZ)\n```\n\n### 4제 추가 — 1차 선택\n- **Mineralocorticoid receptor antagonist (MRA)** — spironolactone 선호\n- 근거: 저항성 고혈압에서 4제 중 가장 강한 근거\n\n### 4제 이후 추가 약물\n- 환자 요인 + 공동 의사결정에 따라 개별화\n\n### 비약물 중재\n- 증거 기반 생활습관 교정\n- 사회적 요인 개선 계획 포함",
      sources: []
    },
    referral: {
      content: "### 1차의료 적용\n- 가정혈압 모니터링 + 정확한 측정 기술 확인 먼저\n- 3제 최적화 확인 후 spironolactone 추가\n- 조절 불가 시 심장내과·신장내과 의뢰\n\n### 시술적 옵션 (의뢰 고려)\n- 신장 교감신경 차단술 (Renal sympathetic denervation)\n- 경동맥 압수용체 증폭술 (Carotid baroreceptor amplification)\n- 적응: 약물 내성 또는 충분한 혈압 조절 불가 시",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["resistant-hypertension"] = _resistant_htn_v2;
KNOWLEDGE_BUNDLE["저항성고혈압"] = _resistant_htn_v2;
KNOWLEDGE_BUNDLE["resistant hypertension"] = _resistant_htn_v2;

/* 뮤코미스트 (NAC) — 신규 drug 엔트리. drug kind 기본 guide 4개가
   protocol/indication/dosing 섹션을 커버하지 않으므로 uiHooks.guide ["*"] 필수 (librarian GOTCHA). */
var _mucomyst_v2 = {
  kind: "drug",
  keywords: ["mucomyst","뮤코미스트","acetylcysteine","N-Acetylcysteine","NAC"],
  primarySources: [],
  sections: {
    protocol: {
      content: "### 가글 처방 제조법 [TIPS — by ENT교수]\n뮤코미스트 10% 1 ampule + 물 100cc 혼합 → TID 가글\n\n주의: 황 냄새(계란 냄새)/쓴맛 미리 고지. Preservative-free 제품 사용 권장.",
      sources: ["[TIPS — by ENT교수]"]
    },
    indication: {
      content: "### Burning Mouth Syndrome (구강작열감증후군) [CLINICAL]\n- 액상 NAC 구강세정(oral rinse) 형태로 효과 확인\n- 2025 다기관 전향 임상: NAC 단독 및 clonazepam 병용군 모두 VAS + 삶의 질(OHIP-14K) 유의 개선\n- Clonazepam 병용 시 효과 증가 (반응률 NAC 단독 60.3% vs 병용 80.0%)\n\n### 구강건조증 — 방사선 유발 [CLINICAL]\n- 10% NAC rinse (swish-and-spit) 5회/일: 주간 xerostomia 유의 개선 (P=.02)\n- Mayo Clinic Pilot RCT: Phase 3 추가 연구 필요\n- 청구 농도(10%) = RCT 농도 일치\n\n### 구강건조증 — 일반 (약물 유발 등) [INSIGHTS — by ENT교수]\n- 방사선 유발 외 일반 구강건조증에 대한 직접 gargle 근거 없음\n- 임상 경험 기반 사용\n\n### LPR (인후두역류 / 후두염) [INSIGHTS — by ENT교수]\n- RCT 존재하나 경구 전신 투여 (gargle 직접 근거 아님)\n- Omeprazole 병용 시에만 RSI(주관적 증상) 유의 개선; NAC 단독 경구는 비유의\n- Gargle 경로 효과는 임상 보고 수준, 직접 RCT 없음",
      sources: [
        "Kim JW et al. Sci Rep 2025 (BMS)",
        "Sio TT et al. Mayo Clin Proc 2019 (방사선 xerostomia)",
        "Han S et al. Oral Surg Oral Med 2021 (BMS 보조근거)",
        "Dabirmoghaddam P et al. Acta Med Iranica 2013 (LPR 경구)"
      ]
    }
  },
  uiHooks: {"guide": ["*"]}
};
KNOWLEDGE_BUNDLE["mucomyst"] = _mucomyst_v2;
KNOWLEDGE_BUNDLE["뮤코미스트"] = _mucomyst_v2;
KNOWLEDGE_BUNDLE["acetylcysteine"] = _mucomyst_v2;
KNOWLEDGE_BUNDLE["NAC"] = _mucomyst_v2;

/* 필로카르핀 (Pilocarpine / 살라겐 / 필로겐) — 신규 drug 엔트리.
   drug kind 기본 guide 미포함 섹션(indication/dosing/insurance) → uiHooks.guide ["*"] 필수. */
var _pilocarpine_v2 = {
  kind: "drug",
  keywords: ["pilocarpine","필로카르핀","살라겐","필로겐"],
  primarySources: [
    "Leveque FG et al. NEJM 1993 (Pilocarpine 두경부암 방사선 후)",
    "Salagen SPC (HPRA)"
  ],
  sections: {
    indication: {
      content: "- 두경부암 방사선 치료 후 구강건조증 (xerostomia)\n- 쇼그렌증후군(Sjögren's syndrome) 구강건조증·안구건조증",
      sources: []
    },
    dosing: {
      content: "| 적응증 | 가이드라인 용량 | 비고 |\n|---|---|---|\n| 두경부암 방사선 후 | 5mg TID | NEJM 1993 검증 |\n| 쇼그렌증후군 | 5mg QID | Arch Intern Med 1991 검증 |\n| 임상 패턴 | BID 가능 | 부작용 경감 목적 [출처 미확인] |\n\n급여 인정 기간: 12주",
      sources: []
    },
    insurance: {
      content: "### 급여 기준 [REGULATORY]\n- 급여: 두경부암 방사선 후 or 쇼그렌증후군 진단 코드 확인 필요\n- 비급여: 그 외 원인 (당뇨·약물 유발 등)",
      sources: []
    }
  },
  uiHooks: {"guide": ["*"]}
};
KNOWLEDGE_BUNDLE["pilocarpine"] = _pilocarpine_v2;
KNOWLEDGE_BUNDLE["필로카르핀"] = _pilocarpine_v2;
KNOWLEDGE_BUNDLE["살라겐"] = _pilocarpine_v2;
KNOWLEDGE_BUNDLE["필로겐"] = _pilocarpine_v2;

/* CKD 모니터링 G3 — 신규. kind=topic (parents 금지). */
var _ckd_monitoring_v2 = {
  kind: "topic",
  keywords: ["CKD","만성콩팥병","ckd-monitoring","eGFR","크레아티닌","시스타틴C","cystatin C","creatinine","CKD-EPI","EKFC"],
  primarySources: [
    "Lamb EJ et al. Performance of creatinine and cystatin C based GFR estimating equations in moderate CKD. BMJ 2026;392:e085005. PMID:41856526, DOI:10.1136/bmj-2025-085005"
  ],
  sections: {
    definition: {
      content: "- 중등도 CKD (G3): eGFR 30-59 mL/min/1.73 m²\n- 대상군: 일차의료에서 3년 이상 모니터링하는 안정 CKD stage 3 환자",
      sources: []
    },
    monitoring: {
      content: "### 크레아티닌+시스타틴C 이중 방정식 > 크레아티닌 단독 [CLINICAL]\n영국 6센터 다기관 연구, 중등도 CKD 환자 875명 3년 추적.\n\nGFR 변화 일치도 (measured GFR 대비):\n| 방정식 | 일치도 |\n|---|---|\n| CKD-EPI (크레아티닌 단독) | 73.1% |\n| CKD-EPI (크레아티닌+시스타틴C) | **78.6%** |\n| CKD-EPI 2021 (크레아티닌+시스타틴C) | 78.1% |\n| EKFC (크레아티닌+시스타틴C) | **80.2%** |\n\n→ 이중 바이오마커 방정식이 단일 크레아티닌보다 유의하게 정확 (모두 P<0.001).\n\n### 임상 적용\n- 중등도 CKD 환자 추적 시 시스타틴C 추가 검사 권장\n- 크레아티닌 단독은 근육량·식이·약물 영향 커 GFR 감소를 과소평가 → 진행 조기 포착 실패 위험\n- 시스타틴C는 근육량 독립적이어서 sarcopenic·고령·절단·vegan 환자에서 특히 유용\n- 단독이 아닌 크레아티닌+시스타틴C 통합 방정식 사용이 핵심 (시스타틴C 단독 사용 아님)",
      sources: []
    },
    referral: {
      content: "(파일 대표 근거 밖 — 기존 임상 통용 기준 유지)\n- eGFR <30 (G4 이상), 급격 감소(3개월 내 >25%), 단백뇨 동반, 저항성 고혈압 — 신장내과 의뢰",
      sources: ["[TIPS — 임상 표준]"]
    },
    notes: {
      content: "- 한국 급여: 시스타틴C는 일부 적응 하에서 급여. 일차의료 CKD G3 모니터링 항목 보강 시 검사 추가 비용·급여 적용 여부 환자 안내 필요\n- 단일 방정식에서 이중으로 넘어가면 GFR 변화 동향이 더 정확 — 진행 vs stable 판단 오류 감소가 핵심 이점",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["ckd-monitoring"] = _ckd_monitoring_v2;
KNOWLEDGE_BUNDLE["CKD"] = _ckd_monitoring_v2;
KNOWLEDGE_BUNDLE["만성콩팥병"] = _ckd_monitoring_v2;

/* 성호르몬 요법 VTE·심혈관 위험 — 신규. kind=topic (parents 금지). */
var _sex_hormone_vte_v2 = {
  kind: "topic",
  keywords: ["성호르몬-VTE","피임약","HRT","호르몬대체요법","성별확정호르몬","VTE","정맥혈전색전증","혈전","estrogen","progestin","갱년기"],
  primarySources: [
    "Skeith L, Bates SM. Sex Hormone Influences on Venous Thrombotic and Cardiovascular Risk. N Engl J Med 2026;394(15):1514-1528. PMID:41985134, DOI:10.1056/NEJMra2202438"
  ],
  sections: {
    indication: {
      content: "성호르몬 요법을 처방·상담하는 모든 임상 상황 — 일차의료에서 자주 만나는 맥락:\n- 복합 경구 피임약(COC) 처방\n- 갱년기 호르몬대체요법(HRT)\n- 과다월경 치료용 호르몬\n- 성별 확정 호르몬 치료(GAHT)\n- 난임 보조생식술(ART) 전후 상담\n- 유방암·전립선암 등 항호르몬(oncologic hormone) 치료 위험 평가",
      sources: []
    },
    notes: {
      content: "NEJM 2026 종합 리뷰. 혈전은 성호르몬 요법 전 범주에서 인지된 합병증이며, 제형·혈전성향증·혈전 과거력·임상 위험인자를 통합한 개별화된 평가 필요.\n\n### 위험 평가 축 4가지\n1. 호르몬 제형 (경구 vs 경피, 에스트라디올 vs 합성 에스트로겐, progestin 종류)\n2. 유전성 혈전성향증 (Factor V Leiden, prothrombin 20210A 변이 등)\n3. VTE 과거력 — 재발 위험 층화\n4. 임상 위험인자 (수술, 부동, 비만, 흡연, 연령, 악성종양 등)",
      sources: []
    },
    precaution: {
      content: "### 처방 전 점검 (실전 — 리뷰 지배 원칙) [CLINICAL — 조건부]\n> 개별 수치는 전문 미확인 — 리뷰 주요 messaging 정리.\n\n- VTE 과거력·유전성 혈전성향증 보유 → 에스트로겐 함유 요법 피하고 progestin-only·경피 경로 고려\n- 수술·장기 부동 예정 시 수술 전후 관리 (일시 중단 여부 + 기간 + heparin 예방 적응증) 반드시 상담\n- 흡연·비만·연령(≥35세)·고혈압 동반 시 COC 위험 누적 — 비호르몬 피임(구리 IUD 등) 대안 제시\n\n### 경피 vs 경구 (일반 원칙)\n- 경피 에스트라디올은 경구 제제보다 VTE 위험이 낮다고 알려짐 (first-pass hepatic effect 회피)\n- 혈전 위험 있는 환자에서 HRT 필요 시 경피 제형 우선 선택이 리뷰 기조",
      sources: []
    },
    referral: {
      content: "- VTE 과거력 있는 환자의 호르몬 요법 필요 시 → 혈액내과·산부인과 협진\n- 유전성 혈전성향증 확인된 환자 피임·HRT 결정 → 전문의 의뢰\n- 수술 예정 환자의 호르몬 요법 주산기 관리 → 해당 진료과 협력",
      sources: []
    },
    comparison: {
      content: "리뷰가 다루는 7개 치료 맥락 (같은 \"성호르몬\"이라도 위험 프로파일 다름):\n1. 호르몬 결핍 대체\n2. 피임\n3. 과다월경 치료\n4. 성별 확정 호르몬 치료\n5. 배란 억제\n6. 종양학적 호르몬 치료\n7. 보조생식\n\n→ 범주 간 일괄 해석 금지. 환자 상황별 제형·목적·기간을 구분하여 위험 재평가.\n\n*전문 미확인. 초록·저자 핵심 conclusion 기반 정리. 상세 수치·제형별 RR·수술 전후 프로토콜은 NEJM 본문 참조 필요 (Researcher 검증 대상).*",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["sex-hormone-vte-risk"] = _sex_hormone_vte_v2;
KNOWLEDGE_BUNDLE["성호르몬-VTE"] = _sex_hormone_vte_v2;
KNOWLEDGE_BUNDLE["HRT"] = _sex_hormone_vte_v2;
KNOWLEDGE_BUNDLE["피임약"] = _sex_hormone_vte_v2;

/* 금연 (Smoking Cessation) — 신규. kind=topic. md 전체가 [초록 기반] 태그 포함 — 본문 보존. */
var _smoking_cessation_v2 = {
  kind: "topic",
  keywords: ["smoking-cessation","금연","smoking cessation","전자담배","vaping","NRT","니코틴 대체요법","varenicline"],
  primarySources: [
    "Shaughnessy AF. Vaping Is Better Than Nicotine Replacement Gum for Smoking Cessation. Am Fam Physician 2026;113(3). PMID:41839085 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "외래 금연 상담 시 약물·비약물 중재 선택지 정리. 2026 AFP POEM은 전자담배(vaping)가 니코틴 대체요법 껌(NRT gum)보다 금연 성공률이 높다고 요약.",
      sources: []
    },
    comparison: {
      content: "### 전자담배(vaping) vs NRT 껌 — AFP 2026 POEM [CLINICAL — 조건부]\n> [초록 기반 — 전문 미확인]\n\n- **결론:** RCT 근거상 전자담배(vaping)가 NRT 껌보다 금연 성공률 높음\n- **함의:** 기존 NRT 우선 접근을 재고 가능. 금연 시도 상담 시 전자담배를 NRT 대안으로 제시하는 근거 형성.\n\n### 주의\n- 1차 선택으로 전환 금지. POEM 한 편 요약 — 전문 확인 + 지속적 폐·심혈관 위해 평가 필요.\n- 국내 규제·급여 상황 미반영. 성인 금연 시도 환자 맞춤 상담 시 옵션으로 소개하되 장기 안전성 unknowns 고지.\n- 기존 varenicline·NRT 패치/껌/로젠지·bupropion 옵션 병존. 전자담배 단독 추천 아님.",
      sources: []
    },
    protocol: {
      content: "(초록 외 상세 용량·중재 프로토콜 미확인 — 전문 확인 후 보강 예정)\n\n외래 일반 접근 (기존 가이드라인 통용):\n- 금연 의사 확인 → 5As (Ask, Advise, Assess, Assist, Arrange)\n- 약물 옵션: varenicline, NRT(패치+단기작용 병용), bupropion SR\n- 행동 치료 병용 시 성공률 상승",
      sources: ["[TIPS — 임상 표준]"]
    },
    notes: {
      content: "전자담배는 청소년·비흡연자 유해로 별도 경고 대상. 본 권고는 흡연 중단 의사가 있는 성인 흡연자 대상.\n\n*초록 기반 — AFP 원문·원 RCT 본문 미확인. 구체 수치·RR·추적 기간은 전문 확인 필요 (Researcher 검증 큐).*",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["smoking-cessation"] = _smoking_cessation_v2;
KNOWLEDGE_BUNDLE["금연"] = _smoking_cessation_v2;

/* AFP 2024 TOP 20 POEMs overview — 신규. kind=topic.
   TRIAGE 미등록 (환자 호소에서 직접 감지 불가). keywords에만 POEM·근거기반 진료. */
var _afp_poems_2024_v2 = {
  kind: "topic",
  keywords: ["afp-top20-poems-2024","POEM","patient-oriented evidence","AFP","일차의료 근거","2024 POEM","근거기반 진료"],
  primarySources: [
    "Grad R, Ebell MH. Top 20 Research Studies of 2024 for Primary Care Physicians. Am Fam Physician 2025;112(1):34-41. PMID:40736492"
  ],
  sections: {
    overview: {
      content: "AFP(American Family Physician) 2024 POEM(Patient-Oriented Evidence that Matters) TOP 20 선별 요약. 외래 처방 변경을 유발할 수 있는 근거 집약. 본 문서는 초록·공개된 핵심 conclusion 기반 — 개별 항목의 원논문은 필요 시 별도 Deep Extract 대상.",
      sources: []
    },
    obesity: {
      content: "### 비만·체중 감량\n- Phentermine-topiramate와 GLP-1 RA가 가장 효과적인 체중감량 약물\n- 관련 knowledge: `obesity`, `glp1` 엔트리 참조",
      sources: []
    },
    "cv-secondary-prevention": {
      content: "### 심혈관 2차 예방\n- 세마글루타이드(Semaglutide)는 비당뇨 비만 환자의 심혈관 2차 예방에 효과적\n- 외래 적용: 기존 CV 병력 있는 비만 환자 GLP-1 선택 근거 (SELECT trial 맥락)\n- 관련: `wegovy`",
      sources: []
    },
    "diabetes-drugs": {
      content: "### 당뇨 치료\n- SGLT-2 억제제와 GLP-1 RA가 기존 약물보다 환자중심 아웃컴 우월\n- 관련: `sglt2-inhibitors`, `glp1`",
      sources: []
    },
    "ibs-amitriptyline": {
      content: "### 과민성대장증후군 (IBS)\n- 저용량 amitriptyline, IBS 2차 치료로 효과적\n- 외래 적용: 식이·섬유 조정 후 증상 지속 환자에서 10-30mg hs 범위 고려 (ATLANTIS trial 맥락)",
      sources: []
    },
    "scabies-benzyl-benzoate": {
      content: "### 옴(Scabies)\n- Benzyl benzoate 25%, 청소년·성인 옴에 높은 효과\n- 외래 적용: permethrin 대안으로 고려 (국내 제제 가용성 확인 필요)",
      sources: []
    },
    "ruti-probiotics": {
      content: "### 재발성 요로감염(rUTI)\n- Lactobacillus 함유 프로바이오틱스, 폐경 전 여성 rUTI 예방에 효과\n- 외래 적용: 예방적 항생제 대신 비약물 옵션으로 상담",
      sources: []
    },
    "gallstone-conservative": {
      content: "### 단순 담석\n- 단순 무증상·경증 담석은 보존적 관리가 합리적 선택\n- 외래 적용: 영상 우연 발견 담석 환자에 수술 의뢰 전 관찰 전략 상담",
      sources: []
    },
    "other-topics": {
      content: "### 기타 (논문 언급)\n- 항생제·항바이러스제 사용\n- RSV 예방\n- 금연 (전자담배 포함 — `smoking-cessation` 참조)\n- 알코올사용장애 (GLP-1 맥락 — `glp1` 참조)\n- Long COVID\n- 알츠하이머 치료",
      sources: []
    },
    notes: {
      content: "이 문서는 POEM 리뷰의 외래 적용 포인트 요약이며, 개별 처방 결정은 각 원논문·해당 knowledge 파일의 상세 섹션을 참고한다. 항목별 별도 Deep Extract는 필요 시 scout 대상으로 재선별.\n\n*초록·공개 conclusion 기반. 개별 POEM 항목의 full text는 AFP 링크를 통해 확인 필요 (원논문은 각 POEM마다 별도 출처).*",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["afp-top20-poems-2024"] = _afp_poems_2024_v2;
KNOWLEDGE_BUNDLE["POEM"] = _afp_poems_2024_v2;

/* ═══════════════════════════════════════════════════════════════════
   2026-04-29 Liby ingest batch — 백로그 누적분 + asthma-reflux 신규
   원본 md는 4-24·4-26·4-27·4-28 Deep Extract 또는 4-29 신규 작성.
   본 ingest는 md 파일 → bundle 이식.
   설계 메모:
   - 모두 disease/topic kind (drug 없음 → uiHooks.guide ["*"] 강제 불필요)
   - topic kind는 parents 부여 금지 (section-vocabulary.md 규칙)
   - hepatitis-b-management 키: 기존 v1 "B형간염"·"hepatitis B" 본문 보존, 신규 진단·치료 protocol은 별도 topic 키로 격리
   - glp1-selection-strategy 키: 기존 v1 "glp1"·"마운자로"·"위고비" 본문 보존, 선택 전략·중단 후 전환·SMI·전당뇨 예방 등 신규 누적분은 별도 topic 키로 격리
   - asthma-reflux-comorbidity 키: 천식 본 엔트리 부재로 신규 작성. ENT교수 메모(by) + GINA·AGA·San Diego 기반 검증
═══════════════════════════════════════════════════════════════════ */

/* asthma-reflux-comorbidity — 신규 ingest (4-29 미르 메모 + Researcher 검증).
   TIPS by ENT교수 + GINA 2025·AGA 2023·San Diego 2025·Chan WW 2011 메타분석 통합. */
var _asthma_reflux_v2 = {
  kind: "topic",
  keywords: ["asthma-reflux-comorbidity","천식-역류","asthma reflux","uncontrolled asthma","조절되지않는 천식","천식 GERD","천식 LPR","asthma comorbidity"],
  primarySources: [
    "GINA 2025 Strategy Report (Global Initiative for Asthma)",
    "AGA Clinical Practice Update on Extraesophageal GERD 2023. PMID:37061897, DOI:10.1016/j.cgh.2023.01.040",
    "San Diego Consensus on LPR/LPS 2025. PMID:40197644, DOI:10.14309/ajg.0000000000003482",
    "Chan WW et al. Arch Intern Med 2011 — PPI for Asthma Meta-analysis. PMID:21482834"
  ],
  sections: {
    indication: {
      content: "조절되지 않는 천식 환자에서 다음과 같은 위·식도/인후두 증상이 동반될 때 GERD/LPR 동반 평가·치료 고려:\n- 속쓰림 (heartburn)\n- 역류감 (regurgitation)\n- 만성 기침\n- 인후이물감 (globus)\n- 음성 변화·잦은 인후 청소\n\nGINA 2025: 무증상 GERD에 일률 PPI 사용 반대. 증상이 있는 GERD에 한해 치료 권고.",
      sources: ["[TIPS — by ENT교수]"]
    },
    protocol: {
      content: "### A. 증상성 GERD 동반 (속쓰림·역류감 명확)\n- PPI 1일 1회 → 반응 부족 시 2회/일 trial × 8-12주 (AGA 2023, PMID:37061897)\n- 알긴산(Gaviscon류) 병용 가능 — 증상 추가 개선\n- 동시에 표준 천식 치료 (ICS/LABA) 최적화 유지\n\n### B. LPS(인후두역류 의심) 동반\n- 식도 증상 동반 시 → PPI BID × 3개월 + 알긴산 4회/일 (San Diego Consensus 2025)\n- 식도 증상 없는 고립 LPS → PPI 경험적 처방 미권고. 내시경/24h pH-impedance 우선 (LPR-consensus 엔트리 참조)\n\n### C. 무증상 GERD (천식 단독 조절 불량)\n- PPI/알긴산 추가 효과 근거 약함 (Chan WW 2011, n=2524 메타분석: morning PEF 통계적 소폭 차이뿐, 증상·QoL·FEV1 개선 없음)\n- 일률 처방 미권고 — 환자별 증상 평가 후 결정",
      sources: []
    },
    precaution: {
      content: "- \"천식이 안 잡히면 무조건 PPI 추가\" 식의 일률 처방은 근거 부족 — Chan WW 2011 메타분석에서 임상적 의미 있는 개선 미확인\n- PPI는 골다공증·CKD·소장세균과증식·C. difficile 위험 증가 — 장기 처방 시 위험-편익 재평가\n- 알긴산은 PPI 대비 안전 프로파일 우수 — PPI 부작용 환자에서 우선 고려 가능 (LPR.md 참조)",
      sources: []
    },
    referral: {
      content: "- PPI BID 8-12주 trial 후 증상 지속 → 소화기내과 (내시경, pH-impedance)\n- 인후두 증상 우세 → 이비인후과 (후두경, 후두 과반응 평가)\n- 천식 자체 조절 불량 지속 (반복 악화·경구 스테로이드 의존) → 호흡기내과 (severe asthma 평가, 생물학적 제제 후보 평가)",
      sources: []
    },
    notes: {
      content: "[CLINICAL — 조건부] 메모 방향성은 맞지만 \"무증상에도 일률 PPI/알긴산\"은 근거 약함. 식도/인후두 증상 동반 시에 한해 empiric trial이 표준 가이드라인 권고. 처방 전 환자에게 \"속쓰림·역류감·기침·인후 이물감\"을 직접 질문해야 한다 (증상 매핑이 핵심).",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["asthma-reflux-comorbidity"] = _asthma_reflux_v2;
KNOWLEDGE_BUNDLE["천식-역류"] = _asthma_reflux_v2;
KNOWLEDGE_BUNDLE["asthma reflux"] = _asthma_reflux_v2;

/* cardiomyopathy — 비허혈성 심근증 (4-24 deep-extract). [초록 기반 — 전문 미확인] */
var _cardiomyopathy_v2 = {
  kind: "disease",
  keywords: ["심근증","cardiomyopathy","비대성심근증","HCM","확장성심근증","DCM","제한성심근증","RCM","ARVC","비허혈성"],
  primarySources: [
    "Coppiano J et al. Cardiomyopathy: A Guide for Primary Care. Am Fam Physician 2026;113(2):166-173. PMID:41839108 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    classification: {
      content: "| 유형 | 특징 |\n|---|---|\n| **HCM** (비대성) | 가장 흔한 원발성. 좌심실 벽 비대, 유출로 폐색 가능. 돌연사 위험. |\n| **DCM** (확장성) | 심실 확장 + 수축기능 저하 (HFrEF 표현형). 가족력·바이러스·음주·자가면역. |\n| **RCM** (제한성) | 이완기능 장애 위주. 아밀로이도증 가장 흔한 원인. |\n| **ARVC** | 우심실 근육 지방·섬유 조직 치환. 부정맥·돌연사 위험. |",
      sources: []
    },
    exam: {
      content: "### 증상\n- 호흡곤란, 피로 (공통)\n- 부정맥, 실신 → HCM/ARVC 특히 주의\n- 흉통, 기좌호흡, 야간 발작성 호흡곤란\n\n### 초기 평가\n- **개인력 + 가족력** 필수 — 심근증·돌연사 가족력\n- 신체진찰 (수축기 잡음 → HCM 유출로 폐색 시사)\n- 심전도 (좌심실 비대, Q파, ARVC 우각 이상)\n- 심초음파 — 표현형·기능 평가 핵심\n- 필요 시 cardiac MRI",
      sources: []
    },
    protocol: {
      content: "**공통:**\n- 심부전 동반 시 → GDMT 4 pillars (heart-failure 엔트리 참조)\n- 부정맥 → rate or rhythm control\n- 혈전위험 → 항응고\n\n**HCM 특이:**\n- 모든 환자 ICD 위험도 평가 (AHA/ACC 권고)\n- 유출로 폐색(LVOTO) → disopyramide, beta-blocker, 수술적 격벽절제, 알코올 격벽절제술\n- 운동 제한: 고강도 경쟁 스포츠 주의\n\n**DCM:**\n- HFrEF 기준 GDMT\n- 원인 교정 (음주·독성)\n\n**중증/진행:** 심장이식 고려",
      sources: []
    },
    referral: {
      content: "| 상황 | 행동 |\n|---|---|\n| 심초음파 이상 (심근증 의심) | 심장 전문의 |\n| HCM 진단 | 심장 전문의 (ICD 평가 포함) |\n| 실신·부정맥·돌연사 가족력 | 즉시 의뢰 |\n| GDMT titration | 심장 전문의 주도 |\n| 중증·진행성 | 심장이식 센터 |",
      sources: []
    },
    notes: {
      content: "- 가족력 청취 필수: 원인 불명 심근증 = 유전성 가능성. 직계 가족 스크리닝 필요.\n- HCM ≠ 수술 선행: 대부분 약물 관리. 유출로 폐색 증상성 환자에서만 중재.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["cardiomyopathy"] = _cardiomyopathy_v2;
KNOWLEDGE_BUNDLE["심근증"] = _cardiomyopathy_v2;
KNOWLEDGE_BUNDLE["HCM"] = _cardiomyopathy_v2;
KNOWLEDGE_BUNDLE["DCM"] = _cardiomyopathy_v2;

/* chronic-cough — 난치성 만성기침(RCC) Duloxetine RCT (4-24 deep-extract). [CLINICAL — 조건부] */
var _chronic_cough_v2 = {
  kind: "disease",
  keywords: ["만성기침","chronic cough","난치성기침","RCC","refractory chronic cough","duloxetine","SNRI","기침과민"],
  primarySources: [
    "Wang S et al. Duloxetine for refractory chronic cough RCT. BMC Med 2026;24(1):82. PMID:41530764, DOI:10.1186/s12916-025-04613-x"
  ],
  sections: {
    definition: {
      content: "**난치성 만성기침(RCC)**: 표준 치료(PPI·항히스타민·흡입기 등)로 해결되지 않는 8주 이상 지속 기침.\n기전: 기침 과민 증후군 — 감각신경 과반응성(sensory nerve hyperresponsiveness)이 주요 경로.",
      sources: []
    },
    protocol: {
      content: "### 1단계 — 원인 제거 우선\n- **GERD/LPR**: PPI ± alginic acid (asthma-reflux-comorbidity 참조)\n- **알레르기비염·후비루**: 항히스타민, INCS\n- **천식·기관지경련**: SABA, ICS\n- **약물(ACEi)**: 중단 후 4-6주 관찰\n\n### 2단계 — 난치성(RCC) 확인 후 신경조절 요법\n\n**Duloxetine (RCC에서 1b 수준 근거)**\n\n| 항목 | 내용 |\n|---|---|\n| 대상 | 표준치료 실패 RCC, 기분장애 없는 환자 |\n| 기전 | 5-HT + NE 재흡수 억제 → 기침 감각신경 과반응성 감소 |\n| 효과 | 기침 횟수/시간 83.96→33.12 (위약 87.67→80.36), p<0.001 |\n| 삶의질 | LCQ 12.75→14.88 (위약 12.17→12.81), p<0.001 |\n| 치료기간 | 8주 (RCT 기준) |\n\n**비교 옵션:** Gabapentin (신경병증 기침), Morphine low-dose (영국 가이드, 부작용↑), Speech pathology 기침 억제 훈련.",
      sources: []
    },
    precaution: {
      content: "- 오심 11.36%, 어지럼 15.91%, 졸음 9.09% — 위약보다 유의 ↑\n- 기분장애(우울·불안) 환자는 RCT 제외 — 동반 시 별도 판단\n- 운전·기계 조작 주의 (졸음)\n- 단일 기관(중국 상하이 동제병원) RCT, n=98 — 근거 강도 한계",
      sources: []
    },
    notes: {
      content: "현재까지 RCC duloxetine 가장 명확한 RCT (PMID:41530764). 가바펜틴보다 부작용 프로파일 유리, 모르핀보다 일차의료 접근성↑. 기분장애 병발 환자는 오히려 duloxetine 적합할 수 있으나 RCT 범위 밖. [단일기관 n=98 — 대규모 재현 연구 필요. CLINICAL — 조건부]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["chronic-cough"] = _chronic_cough_v2;
KNOWLEDGE_BUNDLE["만성기침"] = _chronic_cough_v2;
KNOWLEDGE_BUNDLE["RCC"] = _chronic_cough_v2;

/* allergic-rhinitis — ARIA 2024-2025 + 한국 외래 임상 패턴 (4-24 deep-extract + 4-30 ENT bulk). [REGULATORY + TIPS] */
var _allergic_rhinitis_v2 = {
  kind: "disease",
  keywords: ["알레르기비염","allergic rhinitis","AR","비강내 스테로이드","INCS","비강내 항히스타민","INAH","ARIA","계절성비염","지속성비염","비염","리노벤트","Ipratropium","cryotherapy","ClariFix","NAR","비알러지비염","vasomotor rhinitis"],
  primarySources: [
    "Sousa-Pinto B et al. ARIA-EAACI Guidelines 2024-2025: Intranasal Treatments. Allergy 2025;81(4):954-976. PMID:41324154, DOI:10.1111/all.70131",
    "Choi et al. ClariFix cryoablation meta-analysis. J Rhinol 2024. DOI:10.18787/jr.2024.00015",
    "Young et al. ClariFix efficacy. Am J Rhinol Allergy 2023. DOI:10.1177/19458924231152331"
  ],
  sections: {
    protocol: {
      content: "### 비강내 치료 권고 서열 (ARIA 2024-2025)\n```\nINAH+INCS 복합 > INCS 단독 > INAH 단독\n```\n\n| 비교 | 권고 방향 |\n|---|---|\n| INAH+INCS vs INAH 단독 | **INAH+INCS 우선** (강화) |\n| INAH+INCS vs INCS 단독 | **INAH+INCS 우선** (강화 — 핵심 변화) |\n| INCS 단독 vs INAH 단독 | INCS 우선 (유지) |\n\n### 약제 분류 (한국 외래)\n| 분류 | 대표 약제 |\n|---|---|\n| INCS | Fluticasone(플루티카손), Mometasone(모메타손), Budesonide(부데소니드) |\n| INAH | Azelastine(아젤라스틴) |\n| INAH+INCS 복합 | Dymista (azelastine+fluticasone) — 2025 우선 권고 |\n| 비충혈제거제 | Oxymetazoline 등 — 단기(≤3-5일)만 |\n\n### 적용 원칙\n- 계절성 AR: 노출 직전 또는 증상 발현 시 시작 (preseason 전처치 가능)\n- 지속성 AR: 지속 사용 (INCS ± INAH)\n- 단기 증상 → INAH 또는 경구 항히스타민\n- 중등도 이상 또는 QoL 저하 → INCS 또는 INAH+INCS",
      sources: []
    },
    "clinical-pattern": {
      content: "### 한국 외래 처방 패턴 [TIPS — by ENT 교수, 조진희 교수님, 강윤진 교수님]\n\n**단순 비염**: INS + 리노에바스텔 (Loratadine 계열) — 최소 처방으로 충분\n\n**심한 비염**:\n- INS **2회 분무 BID** (아침·저녁) → 호전 시 **1회 분무 QD**로 감량\n- 처방 기간: 2주 후 f/u\n\n**INS 사용법 환자 교육**:\n- 사용 시간대 자유 — 꼭 아침에만 쓸 필요 없음. **가장 불편한 시간대**에 사용\n- 분사 방향: 비중격 아닌 **외측벽 향**\n\n**조진희 교수님 처방**: Xyzal (levocetirizine) + Lukio (montelukast) + 코세척 + INS\n— 류코트리엔 차단제 병용 (AR + asthma overlap·비용종 동반 시)\n\n**강윤진 교수님 처방 (비염 + 기침)**: 리노에바스텔 + 애니코프 + 움카민 시럽 + INS + 코세척\n— 스프레이 사용 강조, 미사용자에게 사용법 재교육 핵심\n\n### 비염 환자 문진 표준\n- 코막힘 / 콧물 / 재채기 / 가려움 / **냄새 잘 맡는지** (후각 동반 저하 → 비용종·CRS 의심)\n- **심한 시점**: 하루 중·연중 (계절성 vs 통년성 감별)\n- 알러지 검사력\n- INS 스프레이 사용력 (있다면 효과·순응도)",
      sources: []
    },
    procedure: {
      content: "### Cryotherapy (posterior nasal nerve cryoablation, ClariFix) [CLINICAL]\n\n- 메커니즘: posterior nasal nerve 동결 (점막 분비세포 자체가 아님)\n- **유효율**: TNSS ≥30% 감소 ~71% (메타분석), 효과 12개월까지 지속\n- AR·NAR (vasomotor) 모두 적응\n- 부작용: 시술부 통증 10–40%, 두통 18–20%, 일시적 비강건조·구개감각저하 <5%\n- **환자 상담 문구**: \"약 70%에서 의미있는 호전, 12개월까지 효과 보고됨\"\n\n[TIPS 미르 인상: 성공률 절반·재발 흔하다고 느낌 — 메타분석 평균과 차이. 환자별 selection·기대치 관리 필요]",
      sources: ["Choi 2024 J Rhinol DOI:10.18787/jr.2024.00015", "Young 2023 Am J Rhinol Allergy DOI:10.1177/19458924231152331"]
    },
    "nar-treatment": {
      content: "### 노인 비알러지 비염 (NAR / Vasomotor) [TIPS — by ENT 교수]\n\n- **리노벤트 nasal spray (Ipratropium bromide 0.03%)** — anticholinergic\n- 표준 용법: 1–2회 분무 BID–TID per nostril\n- **녹내장·BPH 환자**: 충분히 감량 — **이틀에 1회** 정도로 사용\n\n약리: ipratropium은 muscarinic 차단 → glandular hypersecretion 감소. AR보다는 NAR(특히 watery rhinorrhea)에 효과.",
      sources: []
    },
    precaution: {
      content: "- INCS: 비강 건조, 출혈 (올바른 방향 분사 교육 필수 — 비중격 아닌 외측벽 향)\n- Decongestant 비강 스프레이 3-5일 초과 금지 — 약물유발비염(rhinitis medicamentosa)\n- 비충혈제거제 경구: 고혈압·심혈관·녹내장·전립선비대 환자 주의\n- 리노벤트(Ipratropium): 녹내장·BPH 주의 — 이틀에 1회로 감량 가능",
      sources: []
    },
    referral: {
      content: "- INCS+INAH 복합 치료에도 반응 없음 → 알레르기 전문의 (면역요법 고려)\n- 비용종 동반 → 이비인후과\n- 동반 천식 (AR-asthma overlap) → 천식 병행 관리\n- 후각 저하 동반 → CRS·비용종 평가 위해 ENT (난치성 후각 저하 → Dupixent 적응 가능)",
      sources: []
    },
    notes: {
      content: "2024-2025 개정 핵심: INAH+INCS 복합이 INCS 단독보다 우선 권고로 격상. mHealth 데이터 가이드라인 근거 첫 공식 반영. 환자 선호도·약가 고려 명시.",
      sources: []
    }
  },
  uiHooks: {
    hint: ["protocol","clinical-pattern","nar-treatment","procedure","referral","contraindication","precaution","pregnancy"],
    guide: ["classification","indication","exam","protocol","clinical-pattern","procedure","nar-treatment","comparison","monitoring","insurance","notes"],
    triage: ["differential"],
    draftAppend: ["draft-append"]
  }
};
KNOWLEDGE_BUNDLE["allergic-rhinitis"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["알레르기비염"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["ARIA"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["비염"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["NAR"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["리노벤트"] = _allergic_rhinitis_v2;
KNOWLEDGE_BUNDLE["cryotherapy"] = _allergic_rhinitis_v2;

/* meningitis — 세균성·무균성 수막염 (4-26 deep-extract). [CLINICAL] */
var _meningitis_v2 = {
  kind: "disease",
  keywords: ["수막염","meningitis","세균성수막염","무균성수막염","경부강직","뇌척수액","화학예방","수막구균"],
  primarySources: [
    "Krebs L et al. Am Fam Physician 2026;113(3):260-269. PMID:41839077"
  ],
  sections: {
    definition: {
      content: "수막염: 뇌·척수를 둘러싼 수막의 염증. 자기제한적부터 사망·장애까지 다양.\n\n| 유형 | 주요 원인균 | 경과 |\n|---|---|---|\n| **세균성** | S. pneumoniae(폐렴구균), N. meningitidis(수막구균), H. influenzae type B, GBS | 응급 — 미치료 시 사망 |\n| **무균성(바이러스성)** | Enterovirus (가장 흔함), HSV, HIV | 대부분 자기제한적 (2주 이내) |",
      sources: []
    },
    exam: {
      content: "### RedFlag 증상 조합\n- **4대**: 발열 + 두통 + 경부강직 + 의식 변화\n- 수막구균: 점출혈·자반(petechiae/purpura) → 즉시 응급\n- 영·유아: 구토·수유거부·무기력·대천문 팽창\n\n### 요추천자(LP) — 진단 핵심\n| 항목 | 세균성 | 바이러스성 |\n|---|---|---|\n| 개압 | >200 mmH₂O | 정상~경미 ↑ |\n| 백혈구 | 다핵구 우세 수백~수천 | 단핵구 우세 수십~수백 |\n| 단백질 | >100 mg/dL | 정상~경미 ↑ |\n| 당 (CSF/혈당) | <0.4 | ≥0.6 |\n| 그람염색 | 양성(60~80%) | 음성 |\n\nLP 필수 항목: 개압·세포수·총단백·당·그람염색·배양·PCR",
      sources: []
    },
    protocol: {
      content: "### 세균성 수막염 — **발현 1시간 내 IV 항생제** (1시간 rule)\n```\n경험적 (성인, 지역사회 획득):\n  Ceftriaxone 2g IV q12h\n+ Vancomycin 15-20 mg/kg IV q8-12h  (S. pneumoniae 내성 커버)\n+ Ampicillin 2g IV q4h              (50세 이상·임신·면역저하 — Listeria)\n```\n- **덱사메타손 병용**: Dexamethasone 0.15 mg/kg IV q6h × 4일 — 항생제 직전 또는 동시 (신경학적 후유증 감소)\n\n### 무균성 (바이러스성)\n- 지지치료: 진통제·수액·안정\n- HSV 의심(행동변화·측두엽) → Acyclovir 경험적",
      sources: []
    },
    differential: {
      content: "| 질환 | 감별 포인트 |\n|---|---|\n| 두개내압 상승 | 유두부종 → LP 전 CT 필요 |\n| Listeria 수막염 | ≥50세·면역저하·임신 — ampicillin 추가 필수 |\n| Herpes encephalitis | 행동변화·측두엽 증상 → Acyclovir |\n| 결핵 수막염 | 만성 경과, 저당·고단백, 림프구 우세 |",
      sources: []
    },
    referral: {
      content: "### 화학예방 (Chemoprophylaxis)\n| 원인균 | 약제 |\n|---|---|\n| **N. meningitidis** | Rifampin 600mg PO q12h × 2일 / Ciprofloxacin 500mg PO 1회 / Ceftriaxone 250mg IM 1회 |\n| **H. influenzae B** | Rifampin 20mg/kg/일 × 4일 (최대 600mg/일) |\n\n### 의뢰\n- 수막염 임상 의심 → 즉시 응급 이송 (항생제 투여 후 이송)\n- LP 금기(유두부종·의식 저하·국소 신경증상) → CT 먼저\n- 세균성 확진 → 보건당국 신고 의무",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["meningitis"] = _meningitis_v2;
KNOWLEDGE_BUNDLE["수막염"] = _meningitis_v2;
KNOWLEDGE_BUNDLE["세균성수막염"] = _meningitis_v2;

/* croup — 소아 상기도 폐쇄 (4-26 deep-extract). [CLINICAL] */
var _croup_v2 = {
  kind: "disease",
  keywords: ["크루프","croup","짖는기침","흡기성협착음","덱사메타손","dexamethasone","에피네프린","소아기침"],
  primarySources: [
    "Cooke A et al. Am Fam Physician 2026;113(3):254-258. PMID:41839076"
  ],
  sections: {
    definition: {
      content: "성문하 구조의 바이러스성 염증으로 인한 소아 상기도 폐쇄.\n- 주요 원인: Parainfluenza virus (1형 가장 흔함)\n- 유행 시기: 10~11월 (가을)\n- 호발 연령: 6개월~3세",
      sources: []
    },
    exam: {
      content: "### 3대 증상 (Classic triad)\n- 컹컹 짖는 기침 (barking/seal-like cough)\n- 쉰 목소리 (hoarseness)\n- 흡기성 협착음 (inspiratory stridor)\n- 발열 동반 가능\n\n### 중증도 (Westley Croup Score)\n| 점수 | 중증도 | 처치 |\n|---|---|---|\n| 0~2 | 경증 | 덱사메타손 단독 + 귀가 |\n| 3~5 | 중등도 | 덱사메타손 + 흡입 에피네프린 + 관찰 |\n| ≥6 | 중증 | 즉시 응급 이송 |\n\n### 영상 검사\n- 대부분 불필요. AP 경부 X-ray Steeple sign — 특이도 낮아 진단 기준 아님",
      sources: []
    },
    protocol: {
      content: "### 경증 (Westley 0~2)\n```\nDexamethasone 0.6 mg/kg PO 1회 (최대 12 mg)\n```\n- 프레드니솔론 대체 가능 (1 mg/kg/day × 3일)\n- 2~3시간 관찰 후 개선 확인 → 귀가\n\n### 중등도~중증 (Westley 3 이상)\n```\nDexamethasone 0.6 mg/kg PO/IM 1회\n+ 네뷸라이즈드 에피네프린:\n    L-epinephrine 1:1,000 — 5 mL 흡입\n    (또는 Racemic epinephrine 2.25% — 0.05 mL/kg, 최대 0.5 mL)\n```\n- 에피네프린 후 **2~4시간 관찰 필수** (rebound)\n- 무반응 → 기도확보 + 응급 이송\n\n### 권고하지 않는 처치\n- Cool mist humidifier (근거 없음)\n- 1세대 항히스타민제\n- 항생제 (바이러스성 — 세균성 기관염 의심 시 제외)\n- 헬리옥스",
      sources: []
    },
    differential: {
      content: "| 질환 | 감별 포인트 |\n|---|---|\n| **세균성 기관염** | 고열 + 독성 외관 + 덱사메타손 무반응 → 즉시 응급 기도 확보 |\n| **후두개염** | 침 흘림 + tripod 자세 + 목 뻣뻣함 + 눕지 않으려 함 |\n| **후인두농양** | 경부 강직 + 경부 X-ray 전방 연조직 비대 |\n| **이물질 흡인** | 갑작스런 발병, 발열 없음 |\n| **혈관성 부종** | 알레르기 노출력, 두드러기 |",
      sources: []
    },
    referral: {
      content: "- Westley ≥3 (중등도 이상) → 응급 평가\n- 덱사메타손 무반응 → 세균성 기관염·후두개염 의심 → 즉시 이송\n- **반복성 크루프 (3회 이상)** → 해부학적 이상·기저 질환 평가 (이비인후과·소아과)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["croup"] = _croup_v2;
KNOWLEDGE_BUNDLE["크루프"] = _croup_v2;

/* doac-elderly — 80세 이상 DOAC 출혈 위험 (4-26 deep-extract). [CLINICAL — 조건 기반] */
var _doac_elderly_v2 = {
  kind: "topic",
  keywords: ["DOAC","항응고","고령DOAC","80세이상","출혈위험","노인항응고","apixaban","HAS-BLED"],
  primarySources: [
    "Ebell M. Am Fam Physician 2026;113(3):285-286. PMID:41839090 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "80세 이상 DOAC 사용자에서 출혈 위험이 유의미하게 증가. 뇌졸중 예방 이익(CHA₂DS₂-VASc) vs 출혈 위험(HAS-BLED) 재평가가 필요한 시점.",
      sources: []
    },
    exam: {
      content: "### 출혈 위험 인자\n| 인자 | 임상 포인트 |\n|---|---|\n| 나이 ≥80세 | 독립 위험 인자 |\n| 신기능 저하 | GFR↓ → DOAC 배설↓ → 농도↑ |\n| 저체중 (≤60 kg) | 용량 조정 기준 |\n| 낙상·프레일티 | 두개내 출혈 위험 |\n| 다약제 복용 | NSAID·아스피린·항생제 상호작용 |\n| 과거 출혈력 | 소화기 출혈 특히 주의 |\n| 조절 불량 고혈압 | 뇌졸중+출혈 위험 동시 ↑ |\n\n### HAS-BLED ≥3 → 고위험: 교정 가능 인자(혈압·NSAID·알코올) 적극 교정",
      sources: []
    },
    protocol: {
      content: "### 80세 이상 DOAC 선택\n| 약제 | 고령 특이사항 | 용량 조정 |\n|---|---|---|\n| **Apixaban** | 고령 출혈 프로파일 가장 유리 | 2.5 mg BID: ≥80세 + 체중≤60 kg + Cr≥1.5 mg/dL **2가지 이상** 해당 시 |\n| Rivaroxaban | 1일 1회 편의 | GFR 15~50 시 15 mg qd |\n| Dabigatran | 신장 배설 80% — 신기능↓ 특히 주의 | GFR <30 금기 |\n| Edoxaban | — | 체중·신기능 기반 조정 |\n\n→ **80세 이상 Apixaban 우선 고려** (임상 근거 가장 많음)\n\n### 항응고 시작 기준 (심방세동)\n- CHA₂DS₂-VASc ≥2 (남) / ≥3 (여) → 항응고 시작 권고 유지\n- 나이 자체가 점수 포함 (65~74세=1점, ≥75세=2점)",
      sources: []
    },
    notes: {
      content: "- 처방 전: GFR·체중·다약제 상호작용 확인\n- 정기 모니터링: 신기능(6~12개월), 출혈 징후 교육\n- **낙상 예방**: 항응고 중단 이유보다 낙상 예방에 집중 (낙상 위험만으로 항응고 중단 비권고)\n- 공유의사결정(SDM): 80세 이상에서 뇌졸중 예방 이익과 출혈 위험을 환자·가족과 함께 논의",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["doac-elderly"] = _doac_elderly_v2;
KNOWLEDGE_BUNDLE["고령DOAC"] = _doac_elderly_v2;
KNOWLEDGE_BUNDLE["80세이상DOAC"] = _doac_elderly_v2;

/* carpal-tunnel-syndrome — 손목굴증후군 수술 vs 주사 (4-26 deep-extract). [CLINICAL — 초록] */
var _carpal_tunnel_v2 = {
  kind: "disease",
  keywords: ["손목굴증후군","carpal tunnel syndrome","수근관증후군","손저림","스테로이드주사","수근관수술","정중신경"],
  primarySources: [
    "Barry HC. Am Fam Physician 2026;113(3):online. PMID:41839082 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "손목 정중신경(median nerve)의 수근관 내 압박 신경병증.\n- 여성 > 남성 (약 3:1), 40~60대 호발\n- 위험 인자: 반복 손목 동작, 당뇨, 갑상선 저하증, 임신, 비만, RA",
      sources: []
    },
    exam: {
      content: "### 증상\n- 엄지~약지(1~4번째) 저림·통증 (야간 악화, 손 흔들면 일시 호전)\n- 동작 중 물건 떨어트림\n- 심한 경우: **무지구근(thenar eminence) 위축** — 즉시 수술 의뢰 신호\n\n### 진단 도구\n| 검사 | 민감도 | 특이도 |\n|---|---|---|\n| Phalen's test | ~75% | ~47% |\n| Tinel's sign | ~50% | ~77% |\n| **NCS/EMG** | 진단 표준 (수술 전 권고) | — |",
      sources: []
    },
    protocol: {
      content: "### Step 1 — 보존적 (경증~중등도)\n- 야간 손목 부목 (wrist splint, 중립위)\n- 활동 수정\n- 기저 질환 교정 (당뇨·갑상선·비만)\n\n### Step 2 — 코르티코스테로이드 주사\n- 수근관 내 국소 (예: triamcinolone 10~40 mg + lidocaine)\n- **단기 증상 완화** 효과 확실\n- **장기(18개월) 회복률은 수술 대비 열등** (PMID:41839082)\n\n### Step 3 — 수술 (확정적 치료)\n적응증:\n- 보존·주사 치료 실패 (2회 이상 주사 후 재발)\n- 무지구근 위축 (중증 신경 손상)\n- NCS 중등도~중증 신경 손상\n\n술식: 수근관 유리술 (Carpal Tunnel Release — 내시경 또는 개방). 18개월 추적 시 수술군 회복률 유의 우월.",
      sources: []
    },
    referral: {
      content: "- 무지구근 위축 → 신경외과·정형외과 즉시 의뢰\n- 2회 주사 후 재발 → 수술 의뢰\n- NCS 중등도 이상 신경 손상 → 수술 의뢰 고려\n- 환자 상담: \"주사는 단기 완화, 근본 해결은 수술\" — 공유의사결정",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["carpal-tunnel-syndrome"] = _carpal_tunnel_v2;
KNOWLEDGE_BUNDLE["손목굴증후군"] = _carpal_tunnel_v2;
KNOWLEDGE_BUNDLE["수근관증후군"] = _carpal_tunnel_v2;

/* multiple-myeloma — 다발성골수종 1차의료 의심·의뢰 (4-26 deep-extract). [CLINICAL] */
var _multiple_myeloma_v2 = {
  kind: "disease",
  keywords: ["다발성골수종","multiple myeloma","형질세포","M-protein","CRAB","SPEP","UPEP","MGUS"],
  primarySources: [
    "Hughes PR et al. Am Fam Physician 2026;113(3):244-253. PMID:41839075"
  ],
  sections: {
    definition: {
      content: "형질세포(plasma cell)의 혈액 악성 종양 — 단클론 단백(M-protein) 과다 생성.\n- 미국 연간 36,000건 신규 진단, 중앙 진단 연령 69세\n- 전구 단계: MGUS → Smoldering → 증상성 다발성골수종",
      sources: []
    },
    exam: {
      content: "### 의심 증상 조합 — CRAB + 기타\n| 증상 | 기전 |\n|---|---|\n| **C — 고칼슘혈증** | 파골세포 활성화 |\n| **R — 신부전** | M-protein, 고칼슘혈증, 탈수 |\n| **A — 빈혈** | 골수 침범 |\n| **B — 뼈 통증·병적골절** | 용해 병변 |\n| 피로·체중감소 | 전신 악성 |\n| 반복 감염 | 정상 면역글로불린 억제 |\n\n→ 고령 환자에서 빈혈 + 신부전 + 고칼슘혈증 조합 → 다발성골수종 적극 배제\n\n### 초기 평가 (1차의료)\n- CBC + 감별, CMP, **SPEP** (M-protein), **UPEP** (Bence-Jones), UA, TSH, X-ray (증상 부위)",
      sources: []
    },
    protocol: {
      content: "> 치료 결정·실행은 혈액종양내과 영역. 1차의료 = 의심·의뢰·추적·지지.\n\n### 표준 흐름\n```\n유도 치료 (3~4제 병합)\n→ 자가 줄기세포이식 (ASCT — 적격 시)\n→ 유지 치료 (lenalidomide 등)\n```\n\n### 보조\n- 비스포스포네이트 (zoledronic acid) 또는 Denosumab — 골 보호\n- VTE 예방 (aspirin/항응고 — 면역조절제 사용 시)",
      sources: []
    },
    referral: {
      content: "- SPEP/UPEP M-protein 확인 → **혈액종양내과 즉시 의뢰**\n- 신부전 + 고칼슘혈증 + 빈혈 → **긴급 의뢰**\n- 척추 압박골절 + M-protein → 정형외과·신경외과 동시\n\n### 협력 관리 (의뢰 후)\n- 합병증 모니터링 (감염·빈혈·신기능·고칼슘혈증)\n- 심리사회적 지지·완화 의료 연계\n- 동반 질환 관리 (당뇨·고혈압·골다공증)\n- 재발 신호 감시 (지속 피로·뼈 통증 재발·감염 반복)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["multiple-myeloma"] = _multiple_myeloma_v2;
KNOWLEDGE_BUNDLE["다발성골수종"] = _multiple_myeloma_v2;
KNOWLEDGE_BUNDLE["MGUS"] = _multiple_myeloma_v2;

/* anxiety-depression-cbt — CBT 통합 메타분석 (4-26 deep-extract). [CLINICAL] */
var _cbt_meta_v2 = {
  kind: "topic",
  keywords: ["인지행동치료","CBT","불안장애","우울증","PTSD","강박장애","OCD","심리치료"],
  primarySources: [
    "Cuijpers P et al. JAMA Psychiatry 2025;82(6):563-571. PMID:40238104, DOI:10.1001/jamapsychiatry.2025.0482"
  ],
  sections: {
    definition: {
      content: "인지행동치료(CBT)는 대부분의 정신질환에서 1차 치료(first-line)로 권고되는 구조화된 심리치료. JAMA Psy 2025 메타분석 — 375 RCT, 32,968명.",
      sources: []
    },
    exam: {
      content: "### 효과 크기 (Hedges g) — CBT vs 대조군\n| 질환 | g | 근거 강도 |\n|---|---|---|\n| **PTSD** | **1.27** (최대) | 강력 |\n| **특정 공포증** | >1.0 | 강력 |\n| 사회불안·공황·GAD | 0.5~1.0 | 강력 |\n| 폭식증·BED | 0.5~1.0 | 강력 |\n| **주요우울증 (MDD)** | 0.5~1.0 | 강력 |\n| 강박장애 (OCD) | 0.5~1.0 | 강력 |\n| 양극성장애·정신증 | <0.5 | 보조적 |\n\n- Waitlist 대조군: g >0.94 (효과 더 큼)\n- 일상치료(TAU) 대조군: 0.22~1.13 (보수적)\n- 중도 탈락률: 특정 공포증 8% ~ PTSD 24%",
      sources: []
    },
    protocol: {
      content: "### CBT 의뢰 적응증\n| 질환 | 권고 강도 |\n|---|---|\n| PTSD | **1차 치료** — 강력 권고 |\n| 특정 공포증 | **1차 치료** |\n| 불안장애 (공황·사회불안·GAD) | 약물 + CBT 병합 권고 |\n| 주요우울증 | 약물 단독 대비 장기 재발 예방 우수 |\n| OCD | ERP (노출반응방지) — CBT 특수 기법 |\n\n### 외래 실용\n- **불안·우울 초진**: 약물 처방 + CBT 동시 의뢰 → 최적 결과\n- 제공 경로: 임상심리사·정신건강복지사·정신건강의학과 협진\n- 디지털 CBT (iCBT): 전통 CBT 대비 유사 효과 — 접근성 보조\n- 통상 8~20회기 (주 1회)",
      sources: []
    },
    precaution: {
      content: "- 중증 정신증·양극성장애: CBT 단독 불충분 — 약물 우선, CBT 보조\n- 자살 위험: CBT 의뢰 전 안전 계획 수립\n- 효과 크기는 대조군 종류에 크게 의존 (waitlist vs TAU)\n- 한국: CBT 보험 급여 제한 → 접근성 제약 현실 고려\n- 대부분 RCT 서양 인구 → 문화적 적응 효과 차이 가능",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["anxiety-depression-cbt"] = _cbt_meta_v2;
KNOWLEDGE_BUNDLE["CBT"] = _cbt_meta_v2;
KNOWLEDGE_BUNDLE["인지행동치료"] = _cbt_meta_v2;

/* hepatitis-b-management — B형간염 진단·치료·HCC 감시 (4-26 deep-extract).
   기존 v1 "B형간염"·"hepatitis B" 키 본문 보존(예방 vs 진단/치료 분리), 진단·치료 protocol은 별도 topic으로 격리. */
var _hepb_mgmt_v2 = {
  kind: "topic",
  keywords: ["hepatitis-b-management","만성B형간염","HBV진단","HBV치료","tenofovir","entecavir","HCC감시"],
  primarySources: [
    "Moore II R et al. Am Fam Physician 2026;113(3):235-243. PMID:41839074"
  ],
  sections: {
    definition: {
      content: "| 유형 | 진단 기준 | 자연 경과 |\n|---|---|---|\n| **급성 HBV** | HBsAg(+) + IgM anti-HBc(+) + 증상(황달·AST/ALT↑) | 성인 >95% 자연 회복 |\n| **만성 HBV** | HBsAg(+) **6개월 이상** 지속 | 간경변·HCC 위험 |\n\n예방·스크리닝(triple panel HBsAg/Anti-HBs/Anti-HBc, 백신) → 별도 vaccine 엔트리 참조.",
      sources: []
    },
    exam: {
      content: "### 급성 HBV\n- 증상: 구역·구토·복통·황달 (잠복기 1~4개월)\n- 검사: HBsAg, IgM anti-HBc, AST/ALT, 빌리루빈, PT\n- **전격성 간염 RedFlag**: PT 연장 + 황달 + 의식 변화 → 즉시 의뢰\n\n### 만성 HBV 초기 평가\n| 영역 | 검사 |\n|---|---|\n| HCC 가족력 | 병력 청취 |\n| 간기능·섬유화 | AST/ALT, 혈소판, FibroScan |\n| 바이러스 상태 | HBeAg/HBeAb, HBV DNA (IU/mL) |\n| 공존 감염 | Anti-HCV, Anti-HDV, HIV |",
      sources: []
    },
    protocol: {
      content: "### 치료 시작 기준\n```\n아래 중 하나 충족:\n1. ALT 상승 + HBV DNA >2,000 IU/mL\n2. 간경변 + 바이러스 검출 가능 (any level)\n3. 면역억제요법(항암·생물학적제제) 시작 전 — 예방적 투여\n```\n\n### 1차 약제\n| 약제 | 용량 | 특이사항 |\n|---|---|---|\n| **Tenofovir disoproxil (TDF)** | 300 mg PO qd | 신기능·골밀도 모니터링 |\n| **Tenofovir alafenamide (TAF)** | 25 mg PO qd | TDF 대비 신·골 부작용 ↓ |\n| **Entecavir (ETV)** | 0.5 mg PO qd (de novo) | 임신 카테고리 C |\n\n- 내성 장벽 높음 → 장기 복용 가능 (중단 없이 유지)\n- 기능적 치료(HBsAg 소실)는 현행 치료제로 드묾 (<10%/년)\n\n### 예방적 투여\n- 적응: 항암화학·rituximab 등 생물학적제제·장기이식 전\n- 치료 기준 미달이라도 HBsAg(+)이면 예방 투여 권고",
      sources: []
    },
    monitoring: {
      content: "### 치료 중 추적\n| 항목 | 주기 |\n|---|---|\n| AST/ALT | 3~6개월 |\n| HBV DNA | 6~12개월 |\n| 신기능 (TDF) | 6~12개월 |\n| HBeAg seroconversion | HBeAg(+) 환자 |\n\n### HCC 감시 — 6개월마다\n대상: 간경변 환자 / HCC 고위험군 (50세 이상 남성, 가족력, 지속 고바이러스혈증)\n```\n복부 초음파 (RUQ US) + AFP (알파태아단백)\n```",
      sources: []
    },
    referral: {
      content: "- 간경변 확인·의심 → 소화기내과 공동 관리\n- 치료 기준 충족 (ALT↑ + HBV DNA >2,000) → 항바이러스제 처방 시작 또는 전문의 협진\n- 전격성 간염 → 즉시 응급·간이식팀\n- HCC 의심 (초음파 결절·AFP 상승) → 즉시 의뢰",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["hepatitis-b-management"] = _hepb_mgmt_v2;
KNOWLEDGE_BUNDLE["만성B형간염"] = _hepb_mgmt_v2;
KNOWLEDGE_BUNDLE["HBV치료"] = _hepb_mgmt_v2;

/* concussion — 소아 뇌진탕 임상 진단 (4-27 deep-extract). [CLINICAL — 초록] */
var _concussion_v2 = {
  kind: "disease",
  keywords: ["concussion","뇌진탕","소아뇌진탕","mild traumatic brain injury","mTBI","SCAT","near-point convergence"],
  primarySources: [
    "Shah SN et al. Does This Child Have a Concussion? JAMA RCE Systematic Review. JAMA 2026. PMID:41941197, DOI:10.1001/jama.2026.1233 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "두부 외상에 의한 경증 외상성 뇌손상(mTBI). 구조적 손상 없이 뇌 기능 이상이 나타나는 임상 증후군. 미국 연간 소아 110만~190만 건 추정.",
      sources: []
    },
    exam: {
      content: "### Rule-in — 특이도 높은 증상 (JAMA 2026 RCE, 23개 연구)\n| 증상 | LR | 특이도 |\n|---|---|---|\n| Mental fog (멘탈 포그) | **11.8–12.0** | 0.96 |\n| 소음 과민 | 6.9 | 0.94 |\n| 오심 | 6.7 | 0.93 |\n| 빛 과민 | 6.4 | 0.93 |\n\n### Rule-out\n| 증상 | LR | 민감도 |\n|---|---|---|\n| 두통 없음 | **0.20** | 0.74 |\n\n→ 두통 없으면 뇌진탕 가능성 낮다 (단, 두통 있다고 단독 확진 불가)\n\n### 신체검진 (안구 운동 — 특이도↑, 민감도↓)\n| 소견 | LR | 특이도 |\n|---|---|---|\n| Near-point convergence 이상 | **7.0** | 0.97 |\n| Smooth pursuits 이상 | 6.5 | 0.96 |\n| Saccades 이상 | 4.8 | 0.92 |\n\n주의: 이상 소견 → 뇌진탕 가능성 매우 높음. 민감도 모두 <40% — 없다고 배제 불가.\n\n### SCAT (Sport Concussion Assessment Tool)\n증상 우려 시 SCAT으로 포괄 평가.",
      sources: []
    },
    protocol: {
      content: "### 급성기 관리\n1. 즉각 활동 중단 (Return-to-Play/Return-to-Learn 프로토콜 시작)\n2. 인지·신체 활동 단계적 복귀\n3. 소아과·스포츠의학·신경과 의뢰 기준 확인\n\n### 급성 두통\n- 아세트아미노펜(타이레놀) 우선\n- NSAIDs·아스피린 초기 출혈 우려 시 주의",
      sources: []
    },
    referral: {
      content: "- CT/MRI 적응: 의식소실, 기억상실, 반복 구토, 증상 악화, 신경학적 이상\n- 증상 4주 이상 지속 → 뇌진탕 전문 클리닉·소아신경과·스포츠의학\n- 안구 운동 이상(near-point convergence·smooth pursuits·saccades) 병존 → 조기 의뢰 고려",
      sources: []
    },
    notes: {
      content: "외래에서:\n1. Mental fog + 소음/빛 과민 + 오심 → 뇌진탕 고강도 의심\n2. **Near-point convergence 검사** — \"코끝에 손가락 대고 천천히 접근, 두 개로 보이는 시점\" 체크. 외래 즉시 가능한 간단 검사\n3. 두통 없으면 배제 유력 — 다른 원인 고려",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["concussion"] = _concussion_v2;
KNOWLEDGE_BUNDLE["뇌진탕"] = _concussion_v2;
KNOWLEDGE_BUNDLE["소아뇌진탕"] = _concussion_v2;

/* low-back-pain — 만성 요통 PT vs CBT SMART RCT (4-27 deep-extract). [CLINICAL] */
var _low_back_pain_v2 = {
  kind: "disease",
  keywords: ["low back pain","요통","만성요통","chronic LBP","physical therapy","cognitive behavioral therapy","PT","CBT","물리치료"],
  primarySources: [
    "Fritz JM et al. Effectiveness of Nonpharmacologic Treatments for Chronic Low Back Pain: SMART RCT. Ann Intern Med 2026. PMID:42008809, DOI:10.7326/ANNALS-25-04645"
  ],
  sections: {
    definition: {
      content: "만성 요통(cLBP): 12주 이상 지속 요부 통증. 비특이적 만성 요통이 대부분.",
      sources: []
    },
    exam: {
      content: "### 만성 요통 초진 체크\n- 통증 기간·부위·방사 여부\n- 야간통·발열·체중감소 → RedFlag 배제\n- 기능장애 평가: Oswestry Disability Index(ODI) 또는 Roland-Morris\n- 이전 치료력 (물리치료·약물·주사·수술)\n- 우울·불안 동반 (만성화 위험인자)",
      sources: []
    },
    protocol: {
      content: "### 비약물치료 1차 — SMART RCT 근거 (Ann Int Med 2026, n=749, 52주)\n\n**Stage I (8주)**\n| 치료 | 기능 개선(ODI) | 통증 강도 | 권고 |\n|---|---|---|---|\n| **물리치료(PT)** | ODI 2.8점 더 개선 (96% CI 0.38–5.1) | 유의차 없음 | **1차 우선** |\n| 인지행동치료(CBT) | 기준 | 동등 | 2차 대안 |\n\n주의: ODI 2.8점은 통계적으로 유의하나 임상적 최소 유의차(MID 6점) 미만.\n\n**Stage II (비반응자 8주 재치료)**\n| 전략 | 기능·통증 | 결과 |\n|---|---|---|\n| 마음챙김(Mindfulness) | 차이 없음 | 동등 |\n| 치료 전환(switch) | 차이 없음 | 동등 |\n\n→ 1차 비반응자: 마음챙김 또는 치료 전환 모두 동등 효과 — 환자 선호도·접근성으로 선택.",
      sources: []
    },
    referral: {
      content: "**PT 의뢰 — 1차 우선**\n- 만성 비특이적 요통 → PT 8주 의뢰\n\n**RedFlag → 즉시 영상·전문과**\n- 신경학적 결손 (하지 근력·감각 이상, 방광·직장 기능 이상)\n- 척추 골절 의심 (외상·골다공증)\n- 악성·감염 의심 (발열·체중감소·야간통·면역저하)\n\n**PT 비반응 (8주 후 개선 없음)**\n- 마음챙김 기반 치료 또는 CBT 의뢰\n- 필요 시 통증클리닉·재활의학과 협진",
      sources: []
    },
    notes: {
      content: "- PT가 CBT보다 기능 회복 우월하나 통증 강도 차이 없음 → 기능 중심 목표 환자에게 PT 근거 제시\n- 비반응자에서 치료 전환 vs 마음챙김 동등 → 환자 선호도·비용·접근성 중심 결정\n- CBT 참여율이 PT보다 낮았음 (연구 제한) → 실제 임상에서 CBT 접근성 고려",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["low-back-pain"] = _low_back_pain_v2;
KNOWLEDGE_BUNDLE["요통"] = _low_back_pain_v2;
KNOWLEDGE_BUNDLE["만성요통"] = _low_back_pain_v2;

/* recurrent-uti — 여성 재발성 UTI AUA (4-27 deep-extract). [CLINICAL — 초록] */
var _recurrent_uti_v2 = {
  kind: "disease",
  keywords: ["recurrent UTI","재발성 요로감염","여성 요로감염","UTI prevention","D-mannose","vaginal estrogen","질에스트로겐","예방적항생제"],
  primarySources: [
    "Pair LS, Somerall WE. Recurrent uncomplicated UTI based on AUA guidelines. Nurse Pract 2025;50(7):41-47. PMID:40551332, DOI:10.1097/01.NPR.0000000000000333 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    definition: {
      content: "재발성 UTI: 12개월 내 3회 이상, 또는 6개월 내 2회 이상 비합병 요로감염.",
      sources: []
    },
    exam: {
      content: "### 진단 확인 (AUA)\n- **요배양 검사 확인** 필수 — 증상만으로 진단 금지\n- 균종·감수성 확인 (항생제 내성 방지)\n- 위험인자 탐색: 성생활 패턴, 살정제 피임, 폐경, 해부학적 이상",
      sources: []
    },
    protocol: {
      content: "### AUA 16개 권고 — 예방 전략 3축\n\n**1. 예방적 항생제**\n- 저용량 항생제 지속요법 또는 성교 후 단회 요법\n- 균종·감수성 결과 기반 (요배양 선행 필수)\n\n**2. 비항생제 예방**\n- **D-만노스(D-mannose)**: 대장균 요로 부착 억제. 경구 보충제, 부작용 적음\n- 크랜베리: 근거 약하나 환자 선호도 높을 때 고려\n\n**3. 호르몬 치료 (폐경 여성)**\n- **질 에스트로겐**: 폐경 여성 재발성 UTI — 질 점막 회복, 정상 세균총 복원\n- 경구 에스트로겐보다 국소 질 에스트로겐 우선 (전신 흡수 최소)\n\n### 자가 치료 프로토콜\n- 증상 인지 즉시 미리 처방된 항생제 자가 복용\n- 조건: 재발성 UTI 확인 환자, 증상 명확, 요배양 추후 확인",
      sources: []
    },
    referral: {
      content: "- 해부학적 이상 의심 (잦은 재발·비전형 균종): 비뇨기과\n- 임신 중 재발성 UTI: 산부인과·비뇨기과 협진\n- 다제내성균(MDR) 동반: 감염내과",
      sources: []
    },
    notes: {
      content: "외래 실전:\n- **폐경 여성 재발성 UTI → 질 에스트로겐 크림/좌제** 처방 고려 (비항생제 1차)\n- 재발 예방 시 요배양 없이 항생제 처방 반복 금지 → 내성 유발\n- D-만노스는 OTC — 경증 예방에 먼저 안내 가능",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["recurrent-uti"] = _recurrent_uti_v2;
KNOWLEDGE_BUNDLE["재발성요로감염"] = _recurrent_uti_v2;
KNOWLEDGE_BUNDLE["recurrent UTI"] = _recurrent_uti_v2;

/* covid-outpatient-antivirals — COVID 외래 항바이러스 ACP v3 (4-28 deep-extract). [CLINICAL — 초록] */
var _covid_antiviral_v2 = {
  kind: "topic",
  keywords: ["COVID-19","코로나","항바이러스","molnupiravir","nirmatrelvir","Paxlovid","simnotrelvir","Long COVID"],
  primarySources: [
    "Sommer I et al. ACP Living Rapid Review v3. Ann Intern Med 2026;179(4):524-534. PMID:41662710, DOI:10.7326/ANNALS-25-03691 [초록 기반]"
  ],
  sections: {
    indication: {
      content: "성인 외래 COVID-19 확진자, 특히:\n- 중증 진행 위험인자 (고령, 면역저하, 비만, 당뇨, 심혈관)\n- 증상 발현 5일 이내 치료 시작 가능",
      sources: []
    },
    comparison: {
      content: "| 약물 | 근거 | 회복 개선 | 회복 시간 | 특이사항 |\n|---|---|---|---|---|\n| **Simnotrelvir-ritonavir** | high CoE | — | **–35.8h** 중앙값 | AE↑ 28.9% vs 21.6% |\n| **Molnupiravir** | moderate CoE | 31.8% vs 22.6% | 9d vs 15d | **3~6개월 지속증상 8.5% vs 11.0% ★** |\n| **Nirmatrelvir-ritonavir (Paxlovid)** | low CoE | 70.7% vs 53.6% | P=0.011 | 약물상호작용 광범위 |\n| **Ensitrelvir 125mg** | low CoE | 차이 없을 수 있음 | — | AE↑ 44.2% vs 24.8% |\n\n### Molnupiravir 장기 이익 ★\n- 3~6개월 지속증상(Long COVID) 감소: 8.5% vs 11.0% (moderate CoE)\n- 사망·입원·중증 이상반응 차이 없음\n- 기존 항바이러스제 중 **Long COVID 예방 근거가 있는 유일한 약물**",
      sources: []
    },
    protocol: {
      content: "- **Simnotrelvir-ritonavir**: 회복 가장 빠름 (high CoE), 국내 허가 여부 확인\n- **Molnupiravir**: 회복 개선 + Long COVID 감소 → 고령·지속증상 우려 환자 우선 고려\n- **Paxlovid**: 회복 가능성↑ 있으나 낮은 근거, 약물상호작용 주의\n- Ensitrelvir: 표준 용량(125mg) 효과 불충분 가능",
      sources: []
    },
    precaution: {
      content: "- Paxlovid: 리토나비르 → **약물상호작용 광범위** (스타틴, 항응고제, 면역억제제)\n- Molnupiravir: **임신부 금기** (태아 돌연변이 가능성)\n- 모든 항바이러스제: **증상 발현 5일 이내** 투여 시 효과\n- 근거 제한: 7건 RCT, Omicron 시기, 일부 결과 low CoE",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["covid-outpatient-antivirals"] = _covid_antiviral_v2;
KNOWLEDGE_BUNDLE["COVID-19"] = _covid_antiviral_v2;
KNOWLEDGE_BUNDLE["코로나항바이러스"] = _covid_antiviral_v2;

/* MASH — MASLD/MASH GLP-1 네트워크 메타분석 (4-28 deep-extract). [CLINICAL] */
var _mash_v2 = {
  kind: "disease",
  keywords: ["MASH","MASLD","지방간","지방간염","NASH","NAFLD","비알코올성지방간"],
  primarySources: [
    "Monami M et al. GLP-1 RA in MASH: Network Meta-Analysis. Diabetes Obes Metab 2026;28(5):4253-4260. PMID:41804193, DOI:10.1111/dom.70617"
  ],
  sections: {
    definition: {
      content: "- **MASLD** (Metabolic dysfunction-Associated Steatotic Liver Disease): 과거 NAFLD\n- **MASH** (Metabolic dysfunction-Associated SteatoHepatitis): 과거 NASH. 염증+손상 동반 — 간섬유화·간경변 진행 위험\n\n명명 변경 (2023): NAFLD/NASH → MASLD/MASH (국제 합의)",
      sources: []
    },
    exam: {
      content: "### 적응 환자군 선별\n- 비만(BMI ≥27) + 인슐린저항성(당뇨전단계·T2DM) → MASLD 가능성 높음\n- 대부분 무증상; 일부 우상복부 불편감\n- 비침습 평가: ALT↑ + 지방간 에코 (복부초음파)\n\n### 비침습 섬유화 지표\n- **FIB-4 지수** (나이×AST / [혈소판×√ALT])\n  - <1.30: 고도 섬유화 배제 가능\n  - ≥2.67: 고도 섬유화 의심 → 간전문의 의뢰\n- 간초음파 + FibroScan (탄성초음파)",
      sources: []
    },
    protocol: {
      content: "### 핵심: 체중 감량 = 조직학적 개선의 핵심 매개변수\n\n6개 RCT 네트워크 메타분석 (n=1379, biopsy-confirmed MASH):\n| 중재 | MASH 해소 |\n|---|---|\n| **Tirzepatide** | 위약 대비 유의 우월 |\n| **Semaglutide** | 위약 대비 유의 우월 |\n| 슬리브 위절제술 | 우월 |\n| 루와이 위우회술(RYGB) | 우월 |\n\n**핵심 발견:** TBWL%(총 체중 감량%)가 MASH 해소율·섬유화 개선의 주요 매개변수.\n\n주의: 네트워크 연결 약하고 위약군 중심 → 간접 비교 추정치 불정확. 약물 간 직접 비교 RCT 부재. **탐색적(exploratory)** 결과.\n\n### FDA 허가\n- **Semaglutide 2.4mg (위고비)**: FDA 2024 MASH F2-F3 섬유화 적응증 추가 (BMI ≥30, 또는 ≥27 + 동반질환)\n\n### 생활습관\n- 체중 5~10% 감량 → 간지방·ALT 개선\n- 체중 10% 이상 감량 → MASH 해소 가능 (조직학적 개선 기대)\n- 알코올 금주, 당 제한, 규칙적 운동",
      sources: []
    },
    notes: {
      content: "비만 → 인슐린저항성 → 간 지방 축적 → 산화스트레스·염증 → MASH → 간성상세포 활성화 → 섬유화 → 간경변·HCC\n\nGLP-1 효과 경로:\n1. 체중 감량 → 내장지방↓ → 인슐린저항성↓\n2. 직접 간 효과 (체중독립은 불확실)",
      sources: []
    },
    referral: {
      content: "- FIB-4 ≥1.30 (중간) → FibroScan 또는 소화기내과 협진\n- FIB-4 ≥2.67 → 간전문의 (진행성 섬유화 가능성)\n- 간경변 의심 (복수·황달·혈소판↓) → 즉시 의뢰\n- 비만수술 고려 → 외과",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["MASH"] = _mash_v2;
KNOWLEDGE_BUNDLE["MASLD"] = _mash_v2;
KNOWLEDGE_BUNDLE["지방간염"] = _mash_v2;

/* COPD — GOLD 2025 ABE + 호산구 (4-28 deep-extract). [CLINICAL, REGULATORY] */
var _copd_v2 = {
  kind: "disease",
  keywords: ["COPD","만성폐쇄성폐질환","GOLD 2025","ABE","호산구","ICS","LABA","LAMA","흡입기"],
  primarySources: [
    "Basoshvili N. GOLD 2025 vs ATS/ERS COPD Review. Cureus 2026;18(1):e102479. PMID:41769574, DOI:10.7759/cureus.102479",
    "GOLD 2025: Global Initiative for Chronic Obstructive Lung Disease 2025 Update"
  ],
  sections: {
    exam: {
      content: "### 진단\n- **기도 폐쇄**: 기관지 확장제 후 **FEV1/FVC < 0.70** (GOLD 고정)\n- 증상: 호흡곤란, 만성 기침, 객담\n- 위험인자: 흡연(주요), 대기오염, 직업적 노출, α1-antitrypsin 결핍\n\n### 중증도 (GOLD 등급)\n| 등급 | FEV1 (%) |\n|---|---|\n| 1 (경증) | ≥80 |\n| 2 (중등도) | 50–79 |\n| 3 (중증) | 30–49 |\n| 4 (최중증) | <30 |",
      sources: []
    },
    classification: {
      content: "### GOLD 2025 ABE 분류\n| 그룹 | 기준 | 처방 |\n|---|---|---|\n| **A** | 증상 없거나 경미 (mMRC 0-1 / CAT <10) AND 악화 위험 없음 (≤1회 비입원) | LABA 또는 LAMA 단독 |\n| **B** | 증상 있음 (mMRC ≥2 / CAT ≥10) OR 악화 위험 ≥1회 | LABA + LAMA 병용 |\n| **E** | 악화 ≥2회/년 OR 입원 ≥1회/년 | LABA + LAMA (±ICS); 호산구 ≥300 → ICS 추가 강력 고려 |\n\n**GOLD 2025 핵심 변경:** B·D 그룹 → B·E 그룹 단순화 (이전 C 그룹 소멸)",
      sources: []
    },
    protocol: {
      content: "### 흡입기 단계\n```\n초기:\n  A군 → LABA 또는 LAMA 단독\n  B/E군 → LABA + LAMA (이중 기관지확장제)\n\n증상/악화 지속:\n  E군 + 호산구 ≥300 → LABA + LAMA + ICS (삼중)\n  E군 + 호산구 <100 → ICS 회피 (효과↓ + 폐렴↑)\n```\n\n### 혈중 호산구 기반 ICS 결정\n| 호산구 | ICS 권고 |\n|---|---|\n| **≥300 cells/μL** | ICS 강력 고려 |\n| 100–299 | 효과 불확실 — 개별 판단 |\n| **<100 cells/μL** | ICS **회피** (폐렴 위험↑, 효과↓) |\n\nGOLD 2025 핵심: 혈중 호산구를 ICS 사용·제거 의사결정에 공식 바이오마커로 통합.\n\n### 비약물\n- **금연** — 가장 중요한 예후 개선\n- 폐재활 (운동능력·QoL 개선)\n- 예방접종: 독감(매년), 폐렴구균, COVID-19, Tdap",
      sources: []
    },
    monitoring: {
      content: "- mMRC / CAT 점수 — 매 외래\n- 스파이로메트리: 1–2년마다\n- 혈중 호산구: ICS 결정·유지 시 주기적 재평가\n- 폐렴·악화 에피소드 기록 (E군 분류 근거)\n- 흡입기 사용 기술 확인 (방문마다)",
      sources: []
    },
    precaution: {
      content: "- ICS 장기 사용 → 폐렴 위험↑ (특히 호산구 <100)\n- Beta-blocker: COPD + 심혈관 동반 시 선택적 β1 차단제(비소프롤롤·메토프롤롤)는 안전 — 금기 아님\n- 산소치료: PaO₂ <55mmHg 또는 SpO₂ ≤88% → 장기 산소치료 적응",
      sources: []
    },
    referral: {
      content: "- 외래에서 ABE 분류 + 호산구 → 흡입기 처방 결정 가능\n- 의뢰: 진단 불확실, FEV1 <30%, 잦은 입원 악화, 수술 고려, α1-AT 결핍 의심",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["COPD"] = _copd_v2;
KNOWLEDGE_BUNDLE["만성폐쇄성폐질환"] = _copd_v2;

/* colorectal-cancer-screening — 우편 FIT 키트 45~49세 (4-28 deep-extract). [CLINICAL — 초록] */
var _crc_screening_v2 = {
  kind: "topic",
  keywords: ["대장암","대장암스크리닝","FIT","대장내시경","colonoscopy","45세 스크리닝","colorectal cancer screening"],
  primarySources: [
    "Slawson D. AFP POEM. Am Fam Physician 2026;113(3):online. PMID:41839084 [초록 기반 — 전문 미확인]"
  ],
  sections: {
    indication: {
      content: "### 스크리닝 시작 연령\n| 기관 | 시작 연령 |\n|---|---|\n| USPSTF (2021) | **45세** (이전 50세에서 하향) |\n| ACG | 45세 (일반), 40세 (고위험) |\n| 국내(KNHSP) | 50세 (분변잠혈 2년마다) |\n\n45~49세 연령군은 새로 추가된 스크리닝 대상 — 효과적 전략 선택이 중요.",
      sources: []
    },
    comparison: {
      content: "### 우편 FIT 키트 — 45~49세 최고 완료율 (PMID:41839084)\n45~49세에서 **우편 FIT 키트 발송**이 스크리닝 완료율 가장 높임 (클리닉 내 의사처방 방식 대비 우월).\n\n| 전략 | 완료율 | 특징 |\n|---|---|---|\n| **우편 FIT 키트** | **최고** | 환자 능동 참여 불필요, 집에서 채취·반송 |\n| 클리닉 내 처방·안내 | 낮음 | 의사 지시 후 환자 스스로 — 탈락 많음 |\n\n### gFOBT vs FIT\n| 검사 | 민감도 | 식이제한 |\n|---|---|---|\n| gFOBT | 낮음 | 필요 (적육류·아스피린 제한) |\n| **FIT** | 높음 | **불필요** |\n\n### 스크리닝 전체 선택지\n| 방법 | 주기 | 일차진료 활용성 |\n|---|---|---|\n| **FIT** | 매년 | ★★★ 1순위 |\n| 대장내시경 | 10년 | ★★ 조직검사·용종 절제 가능 |\n| CT 대장조영술 | 5년 | ★ 전처치 필요 |\n| 분변 DNA (Cologuard) | 1–3년 | ★ 비용↑ |",
      sources: []
    },
    protocol: {
      content: "- **45세 이상 신환** → 대장암 스크리닝 상담 시 **우편 FIT 전략 우선 권유**\n- FIT 양성 → 대장내시경 의뢰 (내과·외과)\n- FIT는 **매년** 시행 (한 번 음성 = 영구 안전 아님)\n- FIT 양성 → 대장내시경까지 추적 중요 (추적 실패 = 스크리닝 프로그램 실패)\n\n### 고위험군 — 대장내시경 우선\n- 1촌 가족 중 50세 미만 대장암 또는 진행 선종 진단\n- 가족성 선종성 용종증(FAP), 린치증후군 가족력\n- 40세부터 또는 가족 진단 10년 전부터",
      sources: []
    },
    precaution: {
      content: "- 75세 이상: 개별화 (USPSTF: 75–85세 선택적, 85세 이상 권고 안 함)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["colorectal-cancer-screening"] = _crc_screening_v2;
KNOWLEDGE_BUNDLE["대장암스크리닝"] = _crc_screening_v2;
KNOWLEDGE_BUNDLE["FIT"] = _crc_screening_v2;

/* diabetes-dyslipidemia — 당뇨 Non-HDL·ApoB 지질 (4-28 deep-extract). [CLINICAL, REGULATORY] */
var _dm_dyslipidemia_v2 = {
  kind: "topic",
  keywords: ["당뇨이상지질혈증","diabetes dyslipidemia","non-HDL","ApoB","LDL","statin","ezetimibe","PCSK9","잔류위험"],
  primarySources: [
    "Brandts J et al. Diabetes Dyslipidemia Management. Cardiovasc Diabetol 2026;25(1). PMID:41968323, DOI:10.1186/s12933-026-03166-4"
  ],
  sections: {
    definition: {
      content: "**당뇨 환자의 지질 이상은 LDL-C만으로 잡히지 않는다.**\n- 당뇨 특유: 중성지방↑ + HDL↓ + 잔류 죽상경화성 지단백 증가\n- LDL-C가 정상이어도 잔류 죽상위험 높을 수 있음\n- **Non-HDL-C** 와 **ApoB** 가 잔류 위험 파악에 LDL-C보다 우월",
      sources: []
    },
    exam: {
      content: "### 표적 수치 (Non-HDL-C 기준 — ADA/AACE/ESC 통합)\n| 위험도 | LDL-C | **Non-HDL-C** | ApoB |\n|---|---|---|---|\n| 중등도 | <100 | **<130** | <100 |\n| 고위험 | <70 | **<100** | <80 |\n| 매우 고위험 (기존 ASCVD) | <55 | **<85** | <65 |\n\nNon-HDL-C 계산: 총 콜레스테롤 − HDL-C (일반 검사에서 바로 계산 가능)",
      sources: []
    },
    protocol: {
      content: "### 단계별 강화 전략\n```\n1단계 — Statin (고강도 우선)\n  ↓ LDL-C 미달 또는 최대용량 불충분\n2단계 — Ezetimibe 추가\n  ↓ 여전히 미달\n3단계 — Bempedoic acid 또는 PCSK9 억제제\n  - Bempedoic acid: statin 불내성 시 대안, LDL-C 20–25% 추가 감소\n  - PCSK9 억제제 (에볼로쿠맙/알리로쿠맙): LDL-C 50–60% 추가 감소\n```\n\n### 중성지방 관리 (TG ≥500 — 췌장염 예방)\n- 고순도 오메가-3 (EPA): REDUCE-IT MACE 감소 근거\n- 피브린산계 (fenofibrate): TG↓↓ 강함, but **CV outcome 개선 불확실**, statin 병용 시 근병증 주의",
      sources: []
    },
    monitoring: {
      content: "- 지질 패널: 진단 시 + 치료 시작 후 4–12주 + 목표 달성 후 6–12개월\n- 모니터: TC, LDL-C, HDL-C, TG → Non-HDL-C 자동 계산\n- Statin + fibrate 병용: CK, ALT (근병증·간독성)\n- Statin 고용량: 당뇨 악화 가능 (2–3% HbA1c↑) — 위험/이득 상담",
      sources: []
    },
    precaution: {
      content: "- Fibrate: CKD eGFR <30에서 용량 조절 (fenofibrate 신독성)\n- Statin 금기: 임신, 활성 간질환\n- PCSK9 억제제: 고비용 (급여 확인), 주사제 (2주 또는 월 1회)\n- Bempedoic acid: 통풍 위험 약간↑ (요산↑)",
      sources: []
    },
    notes: {
      content: "전형적 당뇨 이상지질혈증:\n- TG↑↑ (인슐린저항성 → 간 VLDL 분비↑)\n- HDL-C↓ (CETP 활성↑)\n- Small dense LDL 입자↑ (LDL-C 정상이어도 입자수↑)\n→ Non-HDL-C·ApoB가 잔류 위험 더 잘 포착",
      sources: []
    },
    referral: {
      content: "- 당뇨 환자 지질 검사 시 **Non-HDL-C 계산해 목표 달성 여부 확인** — 직접 적용\n- Statin → Ezetimibe 추가: 일차진료 처방\n- PCSK9 억제제: 보험 기준 확인 후 처방 (고위험군 급여 요건)\n- 심혈관 전문의: 매우 고위험 + 목표 미달 + PCSK9 고려 시",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["diabetes-dyslipidemia"] = _dm_dyslipidemia_v2;
KNOWLEDGE_BUNDLE["당뇨이상지질혈증"] = _dm_dyslipidemia_v2;
KNOWLEDGE_BUNDLE["non-HDL"] = _dm_dyslipidemia_v2;

/* pediatric-antibiotic-stewardship — WHO AWaRe 80개국 (4-28 deep-extract). [CLINICAL — 초록] */
var _pediatric_abx_v2 = {
  kind: "topic",
  keywords: ["소아항생제","pediatric antibiotic","AWaRe","Access","Watch","AMR","항균제내성","소아감염"],
  primarySources: [
    "Donà D et al. Pediatric Antibiotic Stewardship Across 80 Countries. EClinicalMedicine 2025;87:103437. PMID:40896455, DOI:10.1016/j.eclinm.2025.103437 [초록 기반]"
  ],
  sections: {
    definition: {
      content: "### WHO AWaRe 분류\n| 그룹 | 의미 | 대표 약물 |\n|---|---|---|\n| **Access** | 1차 치료, 내성 위험 낮음 | 아목시실린, 아목시실린-클라불라네이트, TMP-SMX, 니트로푸란토인 |\n| **Watch** | 2차 치료, 내성 유발 위험↑ | 세팔로스포린 2/3세대, 마크로라이드, 퀴놀론, 반코마이신 |\n| Reserve | 최후 수단 | 카르바페넴, 콜리스틴 |\n\n**UNGA 2024 목표:** 사람 항생제 사용의 70% 이상을 Access군으로",
      sources: []
    },
    exam: {
      content: "### 80개국 분석 핵심 (PMID:40896455)\n| 처방 단계 | Access 비율 | 평가 |\n|---|---|---|\n| **1차 항생제** | **>70%** | ✅ WHO 권고 일치 |\n| **2차 항생제** | <50% (Watch >50%) | ⚠️ Watch군 과다 사용 |\n\n→ 1차 실패 후 2차 항생제 선택 시에도 Access군 유지 시도해야 AMR 목표 달성.",
      sources: []
    },
    protocol: {
      content: "### 질환별 1차 항생제 (Access 우선)\n| 감염 | 1차 선택 | 비고 |\n|---|---|---|\n| **급성 중이염** | 아목시실린 80–90mg/kg/day | 페니실린 알레르기: TMP-SMX |\n| **급성 편도인두염** (A군 연구균) | 아목시실린 또는 페니실린 V | Macrolide: 한국 30~40% 내성 주의 |\n| **지역사회획득 폐렴** | 아목시실린 (경증) | 비전형: Macrolide 병용 |\n| **급성 요로감염** | TMP-SMX 또는 니트로푸란토인 | 지역 내성 패턴 |\n| **피부연조직 감염** | 아목시실린-클라불라네이트 | MRSA 의심: TMP-SMX |\n\n### 2차 항생제 — Access 우선 유지\n1차 실패 시 Watch로 도약 전 고려:\n- 충분한 용량·기간으로 1차 사용했는가?\n- 재배양·내성 확인 가능한가?\n- **아목시실린-클라불라네이트(Access)** — 많은 경우 2차로 선택 가능\n- Watch군(세팔3세대·마크로라이드) 사용 시 기간 최소화",
      sources: []
    },
    monitoring: {
      content: "- 48–72시간 내 임상 반응 평가\n- 반응 없을 때: 2차 전환 전 재배양·균검사 먼저\n- 알레르기 반응 (특히 아목시실린 — 발진 vs 진성 아나필락시스 감별)",
      sources: []
    },
    precaution: {
      content: "- 바이러스성 상기도감염에 항생제 불필요 — 처방 전 세균성 근거 확인\n- 아목시실린 발진: 전염성단핵구증 동반 시 발진 흔함 — 진성 페니실린 알레르기와 감별\n- 퀴놀론계: 소아 관절연골 독성 우려 → 회피 (예외: 일부 요로감염)\n- 마크로라이드: A군 연구균 한국 30–40% 내성",
      sources: []
    },
    notes: {
      content: "왜 2차에서 Watch가 과다 사용되는가?\n- \"강한 약이 더 효과적\" 인식 (근거 없음)\n- 1차 실패 원인 분석 없이 경험적 강화\n- 가이드라인 부재 또는 Watch 기본 처방 관행\n\nAMR 영향: Watch 남용 → 내성균 선택압↑ → CA-MRSA, ESBL 증가. 소아 발생 내성균은 가족·지역사회 전파 위험.",
      sources: []
    },
    referral: {
      content: "- 소아 외래 1차 처방: **아목시실린계(Access) 우선** — 직접 적용\n- 1차 실패 시: Watch 전환 전 용량·기간 재검토 + 아목시실린-클라불라네이트 고려\n- 의뢰: 패혈증 징후, 2회 이상 항생제 실패, 반복 감염 (면역이상 의심)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["pediatric-antibiotic-stewardship"] = _pediatric_abx_v2;
KNOWLEDGE_BUNDLE["AWaRe"] = _pediatric_abx_v2;
KNOWLEDGE_BUNDLE["소아항생제"] = _pediatric_abx_v2;

/* glp1-selection-strategy — GLP-1 비만 선택 전략 누적분 (4-23~4-28 deep-extract).
   기존 v1 "glp1"·"위고비"·"마운자로" 본문 보존, 선택 전략·중단 후 전환·SMI·전당뇨 예방 등 누적 신규는 별도 topic으로 격리. */
var _glp1_strategy_v2 = {
  kind: "topic",
  keywords: ["glp1-selection-strategy","위고비-마운자로 선택","GLP-1 선택 전략","비만 GLP-1","용량증량","GLP-1 유지전략","Tirzepatide 중단","GLP-1 SMI","GLP-1 전당뇨"],
  primarySources: [
    "Rosen CJ, Ingelfinger JR. GLP-1 RA NEJM Review. N Engl J Med 2026;394(13):1313-1324. PMID:41931049, DOI:10.1056/NEJMra2500106",
    "Huang L et al. Tirzepatide Discontinuation. J Am Pharm Assoc 2026;8:103112. PMID:41962807, DOI:10.1016/j.japh.2026.103112",
    "Lähteenvuo M et al. Repurposing GLP-1 for AUD. JAMA Psychiatry 2025;82(1):94-98. PMID:39535805, DOI:10.1001/jamapsychiatry.2024.3599",
    "Tentolouris A et al. GLP-1 in Prediabetes T2DM Prevention. Prim Care Diabetes 2026;20(2):178-184. PMID:41565568, DOI:10.1016/j.pcd.2026.01.003",
    "Srisurapanont M et al. GLP-1 in Severe Mental Illness. Int J Psychiatry Med 2026;61(3):312-328. PMID:41618880, DOI:10.1177/00912174261422822"
  ],
  sections: {
    comparison: {
      content: "### 위고비 vs 마운자로 선택 기준\n| 기준 | 위고비 | 마운자로 |\n|---|---|---|\n| 목표 감량 | 15% 미만 | 15% 이상 |\n| 2형 당뇨 동반 | 오젬픽(보험) 고려 | 마운자로 실비 가능 |\n| 주사 편의성 | — | 웬티카, 더 편리 |\n| 소화기 부작용 민감 | 상대적 유리 | 상대적으로 많음 |\n| 근감소 우려 (고령·저근육) | 저용량 전략 | aggressive 감량 주의 |\n| 장기 유지 비용 | 저렴 | — |\n| 장기 유지 편의 | — | 1회용 펜 |\n\n### 시작 용량 비교\n| 항목 | 위고비 | 마운자로 |\n|---|---|---|\n| 시작 용량 | 0.25mg | 2.5mg |\n| 유지 단계 | 0.25→0.5→1.0→1.7→2.4mg | 4주 후 5mg으로 |\n| 초반 감량 속도 | 느림 | 빠름 |\n| 최대 효과 | — | 10mg(4단계)까지 효과 뚜렷 |\n\n> SURMOUNT-5(NEJM 2025): 마운자로 -20.2% vs 위고비 -13.7% 전체 우월성.\n> 마운자로 10mg→15mg 증분 +1.1%p로 급격히 감소.",
      sources: ["[TIPS — by 로컬원장님]"]
    },
    protocol: {
      content: "### Dose Escalation — 4주마다 3가지 질문 [TIPS — by 로컬원장님]\n1. 체중 몇 % 줄었나?\n2. 식욕 조절 만족도?\n3. 부작용 어느 정도?\n→ 3가지 중 하나라도 불만족 → 증량 보류\n\n### 감량 기준별 결정\n- 4~5% 이상 → 증량 안 함 (잘 되고 있음)\n- 2~4% → 환자 만족도 고려해 결정\n- 2% 미만 → 대체로 증량 (사용 기간 고려)\n- 부작용 tolerable → 증량 가능\n- intolerable → 유지 또는 감량\n\n### Non-responder\n- Saxenda(리라글루타이드): 16주 4% 미만 → 중단 고려 (FDA label)\n- Wegovy(세마글루타이드): 공식 stopping rule **없음** (증량 자체가 16-20주 소요)\n- 1개월 체중감소 = 6개월 반응의 유일한 유의 예측인자 (Maccora 2019, PMID:31682516)\n\n### Interval Tx 유지 전략 [INSIGHTS — by 로컬원장님]\n- 기본 3~4주 간격, 3~4개월마다 내원\n- 2kg 이상 증가 시에만 내원 → 1회 투여 후 귀가\n- 특정 시기(여행·스트레스)에만 사용\n- 장점: 비용↓, 순응도↑, 장기유지 가능성↑\n- 한계: RCT 근거 거의 없음, 개인차 큼",
      sources: ["[TIPS — by 로컬원장님]"]
    },
    indication: {
      content: "### Tirzepatide 중단 후 전환 (PMID:41962807, n=83 후향)\n- 중단 전 평균 사용기간 11개월, 평균 체중 감소 -6.7%\n- **중단 후 12개월 체중 변화: +1.9% (P=0.11, 비유의)**\n- 81.9%가 다른 비만약으로 전환 (약사·의사 지원)\n- 중단 주된 이유 80.7%: 약값·접근성\n→ \"단순 중단 ≠ 전환 전략\". 비용 부담으로 마운자로 중단 상담 시 \"다른 비만약으로 전환하면 12개월 +1.9% (비유의)\" 근거 제시.\n\n### 당뇨전단계 + 비만 — T2DM 예방·CV 보호 (PMID:41565568)\n| 약물 | 효과 | 근거 |\n|---|---|---|\n| **Semaglutide 2.4mg** | 정상혈당 회복률 최대 84% | STEP 1·5 |\n| **Tirzepatide** | T2DM 발생 90% 감소 (HR 0.07) | SURMOUNT-1 |\n| **Semaglutide** | CV 이벤트 HR 0.80 (전당뇨 포함) | SELECT |\n→ 비만+당뇨전단계 환자 GLP-1 처방 시 \"살 빼면서 당뇨 예방 + 심혈관 보호\" 직접 제시.\n\n### 중증 정신질환(SMI) + 비만 (PMID:41618880, RCT 10건 메타, N=665)\n- 체중 감소 -6.17 kg (95% CI: -9.10 ~ -3.25)\n- HbA1c 감소 -0.31%\n- 부작용 탈락률 위약과 차이 없음\n→ 항정신병약 복용 중 체중 증가 환자에 GLP-1RA 처방 근거.\n\n### 알코올사용장애(AUD) + 비만/T2DM (PMID:39535805, 스웨덴 22.7만명)\n- Semaglutide AUD 입원 위험 36% 감소 (aHR 0.64)\n- Liraglutide 28% 감소 (aHR 0.72)\n- 기존 AUD 치료제 (naltrexone/acamprosate) aHR 0.98 (거의 차이 없음)\n→ 위고비/오젬픽 초진 시 음주력 문진 강화 근거.",
      sources: []
    },
    notes: {
      content: "### NEJM 2026 종합 리뷰 (PMID:41931049)\n기전:\n- 인크레틴 유사체: 포도당 의존적 인슐린 분비 촉진\n- 위 배출 지연 (포만감 지속, 초기 GI 부작용 원인)\n- 글루카곤 분비 억제\n- 시상하부 직접 작용 → 포만감 증강\n\n확립된 효과: 혈당·체중 + **CV 위험 감소** (고위험·T2DM) + **신기능 악화 지연**\n\n부작용·미해결:\n- 위장관 증상 (대부분)\n- **근육·골량 손실** — 환자 교육 필수 (단백질 1.2g/kg + 근력운동 병행)\n- 장기 순응도 미확인\n- 중단 후 체중 회복 — 개인차 큼\n\n### 빠른 감량 원하는 환자 [TIPS — by 로컬원장님]\n1. 너무 빠른 감량 → 뇌가 위기 인식 → 에너지 절전 모드(adaptive thermogenesis)\n2. 초기 고용량으로 빨리 올리면 나중에 올릴 용량이 없음\n3. 고용량 노출 시 GLP-1 receptor desensitization 가능성↑\n4. 빠른 감량 시 피부 탄력 저하 + 탈모 가능성↑",
      sources: ["[TIPS — by 로컬원장님]"]
    },
    precaution: {
      content: "### GLP-1 반응 예측 인자 — 미신 vs 근거\n- ❌ **위장관 부작용이 큰 경우** → 미신. 부작용과 체중감량은 독립적 (STEP 1-3 mediation, GI AE 기여 <1%p, PMID:34514682)\n- ❌ **Insulin resistance 있는 경우** → 반대. T2DM 환자가 오히려 감량 적음 (STEP2 ~10% vs STEP1 ~15-17%, PMID:36050763)\n- ✓ 초기 식욕 감소·meal size↓ [CLINICAL — 조건부]\n- ✓ 음식 보상/갈망 감소 [CLINICAL — 조건부]\n- ✓ **초기 체중감소 속도 — 가장 강력한 predictor** (PMID:31682516)\n\n### 효과 안 좋을 것으로 예상\n1. Adaptive thermogenesis 강한 경우 [CLINICAL]\n2. 식사량 이미 적음 [TIPS — 출처미확인]\n3. 다이어트 반복 이력 [TIPS — 출처미확인]\n4. 조기 plateau\n5. 근육량 낮음 [CLINICAL — 조건부] (효능보다 안전성 우려)\n6. GLP-1 사용 중에도 음주 지속 [TIPS — 출처미확인]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["glp1-selection-strategy"] = _glp1_strategy_v2;
KNOWLEDGE_BUNDLE["GLP1전략"] = _glp1_strategy_v2;
KNOWLEDGE_BUNDLE["비만GLP-1"] = _glp1_strategy_v2;

/* heart-failure-volume-overload — Volume Overload 평가 (4-27 BNP+POCUS) + HFpEF+비만 체중감량 전략 (4-28).
   기존 v1 "heart-failure"·"심부전" 본문 보존, 보완 누적분은 별도 topic 키로 격리. */
var _hf_volume_v2 = {
  kind: "topic",
  keywords: ["heart-failure-volume-overload","volume overload","BNP","POCUS","B-lines","HFpEF","비만 심부전","심부전 체중감량"],
  primarySources: [
    "Cohen MT et al. Volume Overload Rational Clinical Examination. JAMA 2026. PMID:41729549",
    "Borlaug BA et al. HFpEF + Obesity Weight-Loss Strategy. PMID:41802118"
  ],
  sections: {
    exam: {
      content: "### Volume Overload — BNP + POCUS B-lines (JAMA 2026 RCE)\n호흡곤란 환자의 volume overload 평가.\n\n| 검사 | 단독 강도 | LR |\n|---|---|---|\n| **BNP ≥100 ng/mL** | 최강 rule-in | LR 6.9 |\n| **POCUS B-lines 없음** | 최강 rule-out | LR 0.09 |\n| JVD·crackles·하지 부종 | 전통 진찰 | 정확도 BNP+POCUS보다 열등 |\n\n→ 외래·응급에서 호흡곤란 → BNP + POCUS B-lines 조합이 임상 검진보다 우월.\n\n> 출처: Cohen MT et al. JAMA 2026 RCE. PMID:41729549",
      sources: []
    },
    protocol: {
      content: "### HFpEF + 비만 — 체중감량이 최우선 치료 전략 (PMID:41802118)\n비만 ↔ HFpEF 악순환 기전:\n- 비만 → 심외막 지방·전신 염증 → 좌심실 강성·확장기 기능장애 → 운동내약↓\n- HFpEF → 운동제한 → 체중↑ → 비만 악화\n\n### GLP-1 RCT 근거 (HFpEF + 비만)\n| 약물 | 효과 |\n|---|---|\n| **Semaglutide** (STEP-HFpEF) | 운동능력·증상·QoL 개선 |\n| **Tirzepatide** (SUMMIT) | 운동능력·증상·QoL 개선, 비만 클수록 이익 큼 |\n\n→ HFpEF에서 체중감량=현재 최우선 치료 전략.\n→ HFrEF에서는 obesity paradox로 불확실 (현재 GDMT 4 pillars + 신중 체중관리).\n\n### 외래 적용\n- BMI ≥30 + HFpEF → GLP-1 (semaglutide/tirzepatide) 적극 고려\n- 체중 5~10% 감량 목표 → 운동내약·증상 개선 가시화\n- 동반 OSA·MASH·당뇨 → GLP-1 종합 이익",
      sources: []
    },
    notes: {
      content: "### 임상 적용 (volume overload 평가)\n- 호흡곤란 환자 외래 → BNP + POCUS B-lines 우선 (POCUS 가능 시)\n- BNP <100 + B-lines 없음 → 심부전 가능성 매우 낮음\n- BNP ≥100 단독 → rule-in 강력. 하지만 신부전·고령에서 위양성 주의 (NT-proBNP age-adjusted cutoff 고려)\n\n### 한계\n- POCUS B-lines: 검사자 의존성, 폐렴·간질성 폐질환에서 위양성\n- HFpEF + 비만 RCT 대부분 비당뇨 비만 — 실세계 다질환 환자 외삽 시 주의",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["heart-failure-volume-overload"] = _hf_volume_v2;
KNOWLEDGE_BUNDLE["BNP-POCUS"] = _hf_volume_v2;
KNOWLEDGE_BUNDLE["HFpEF-비만"] = _hf_volume_v2;

/* obesity-pharmacotherapy-grade — TOS/OMA/OAC 비만 약물치료 GRADE 권고 (4-27 deep-extract).
   기존 v1 "obesity"·"비만" 본문 보존, GRADE 권고 누적은 별도 topic 키로 격리. */
var _obesity_grade_v2 = {
  kind: "topic",
  keywords: ["obesity-pharmacotherapy-grade","비만 약물치료","TOS","OMA","OAC","GRADE","항비만약물 권고","obesity GRADE"],
  primarySources: [
    "Apovian CM et al. Pharmacotherapy for Adult Obesity: TOS/OMA/OAC GRADE Recommendations. PMID:41859682"
  ],
  sections: {
    indication: {
      content: "### 강력 권고 (Strong recommendation)\n- **Semaglutide 2.4mg** (위고비)\n- **Tirzepatide** (마운자로/zepbound)\n- **Bupropion-naltrexone** (Contrave)\n- **Setmelanotide** (특정 유전성 비만)\n→ 위 약물들은 일반 비만(BMI ≥30, 또는 ≥27 + 동반질환)에서 강력 권고.\n\n### 체중 유지 중 약물 지속 — **강력 권고**\n약물 중단 시 체중 회복이 일반적 → 장기 유지 필요성을 환자 교육 필수.",
      sources: []
    },
    comparison: {
      content: "### 동반질환별 GLP-1 우선 — 조건부 권고\n다음 동반 비만에서 GLP-1 계열 우선 권고:\n| 동반질환 | 권고 강도 | 근거 |\n|---|---|---|\n| **HFpEF** | 조건부 | STEP-HFpEF, SUMMIT — 운동능력·QoL 개선 |\n| **OSA** (수면무호흡) | 조건부 | Tirzepatide SURMOUNT-OSA — AHI 개선 |\n| **MASH** | 조건부 | Semaglutide FDA 적응증 (F2-F3) |\n| **골관절염** (knee OA) | 조건부 | STEP-OA — 통증·기능 개선 |\n| **기존 ASCVD** | 조건부 | SELECT — Semaglutide CV HR 0.80 |\n| **T2DM** | 조건부 | 당뇨·체중 동시 관리 |",
      sources: []
    },
    protocol: {
      content: "### 외래 적용 알고리즘\n```\n1. BMI ≥30 (또는 ≥27 + 동반질환) 평가\n2. 동반질환 매핑 (HFpEF·OSA·MASH·OA·ASCVD·T2DM)\n3. 약물 선택:\n   - 동반질환 매칭 → GLP-1 (위고비/마운자로) 우선\n   - 동반질환 없음 → 환자 선호·접근성으로 GLP-1 vs Bupropion-naltrexone\n   - 유전성 비만 → Setmelanotide\n4. 효과 확인 후 장기 유지 (중단 시 회복 강조)\n```",
      sources: []
    },
    notes: {
      content: "### 1차의료 적용 메시지\n- \"비만은 만성질환\" — 약물은 평생 관리 도구로 인식 전환\n- 약물 단독 ≠ 해법: 단백질 1.2g/kg + 근력운동 + 식습관 동반\n- 동반질환 기반 처방은 보험 급여 + 임상 근거 동시 충족 (GLP-1+CV·신·간 보호)\n- glp1-selection-strategy 엔트리 참조: 위고비 vs 마운자로 선택 기준, 4주 dose escalation 질문",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["obesity-pharmacotherapy-grade"] = _obesity_grade_v2;
KNOWLEDGE_BUNDLE["비만약물 GRADE"] = _obesity_grade_v2;
KNOWLEDGE_BUNDLE["항비만약물 권고"] = _obesity_grade_v2;

/* ═══════════════════════════════════════════════════════════════════
   2026-04-30 Liby ingest batch — Mir-Tier 1 재편 후 첫 cron 산출물
   원본 md: deep-extract 4-30 (10건 처리, 신규 7 + 보완 4)
   신규 8건 (post-mi-deprescribing 포함, bundle 미등록 상태였음 — 신규 추가)
   보완은 별도 topic 키로 격리 (v1 본문 보존 원칙):
   - heart-failure-pocus-ducs (POCUS DUCS topic)
   - internal-medicine-2025-update (Cardiology + Endocrinology 2025 update 합본)

   Mir-Tier 1 cover 검증:
   - POCUS·초음파 중재 ← heart-failure-pocus-ducs ✓
   - 비암성 만성통증·근골격 ← diabetic-peripheral-neuropathy ✓
   - 암성통증·완화의료 ← palliative-pain ✓
   - 재택의료·노인의학 ← home-based-hypertension + frailty ✓✓
   - 만성질환 본체 확장 ← internal-medicine-2025-update ✓
   - 임상약물학·Deprescribing ← prescribing-cascade + post-mi-deprescribing ✓✓
   - Tier 2 소화기 ← ibs + functional-dyspepsia ✓
═══════════════════════════════════════════════════════════════════ */

/* IBS — 과민성 대장 증후군 (4-30 deep-extract). [CLINICAL] Mir-T2 day=1 소화기 */
var _ibs_v2 = {
  kind: "disease",
  keywords: ["IBS","과민성대장증후군","irritable bowel syndrome","Rome IV","저FODMAP","rifaximin","linaclotide","loperamide","IBS-C","IBS-D","IBS-M"],
  primarySources: [
    "Greer KB & Sultan S. Irritable Bowel Syndrome. Ann Intern Med 2025;178(8):ITC113-ITC128. PMID:40789179, DOI:10.7326/ANNALS-25-01965 (In the Clinic) [초록 기반]"
  ],
  sections: {
    definition: {
      content: "IBS는 기질적 원인 없이 만성 복통 + 배변 습관 이상(설사·변비·혼합)을 동반하는 기능성 위장관 질환. 유병률 4~10%. Rome IV 양성 진단(positive diagnosis)이 핵심 — alarm feature 없으면 광범위 검사 없이 진단 가능.\n\n| 아형 | 우세 패턴 | 특징 |\n|---|---|---|\n| IBS-C | 변비 우세 | 복부 팽만감 심함 |\n| IBS-D | 설사 우세 | 긴박감·사회적 제약 |\n| IBS-M | 변비+설사 교대 | |",
      sources: []
    },
    exam: {
      content: "### Rome IV 기준\n- 반복 복통 ≥1회/주 (최근 3개월), 시작 6개월 이상\n- 아래 중 ≥2가지 동반: 배변 연관 / 빈도 변화 연관 / 형태 변화 연관\n\n### Alarm feature (즉시 검사)\n- 직장 출혈, 체중 감소, 발열, 야간 증상, 가족력(대장암·IBD), 50세 이상 신규 발생",
      sources: []
    },
    protocol: {
      content: "### 1단계 — 식이·생활습관\n- **저 FODMAP 식이** (IBS-D/M 1차 권고, 4~8주 시도 후 재도입)\n- 규칙적 식사, 카페인·알코올·고지방식 제한\n\n### 2단계 — 아형별 약물\n**IBS-C (변비형):**\n| 약물 | 기전 |\n|---|---|\n| Linaclotide | 구아닐레이트 시클라아제-C — 복통+변비 동시 개선 |\n| Lubiprostone | CIC-2 Cl 채널 |\n| Psyllium (차전자피) | 수용성 섬유소 1차 |\n\n**IBS-D (설사형):**\n| 약물 | 기전 |\n|---|---|\n| Loperamide | μ-오피오이드 — 긴박감·빈도↓ |\n| Rifaximin | 비흡수 항생제 — 단기(2주), 재투여 가능 |\n| Eluxadoline | 혼합 오피오이드 — 담낭 절제 환자 췌장염 위험 주의 |\n| Alosetron | 5-HT3 길항 — 중증 여성, 허혈성 대장염 risk |\n\n**IBS-M / 복통 우세:**\n- 저용량 TCA (아미트립틸린 10~25mg hs) 또는 SSRI — 내장 통각 과민 조절\n- Peppermint oil 캡슐 — 평활근 경련",
      sources: []
    },
    precaution: {
      content: "- Rifaximin: 재투여 가능하나 내성 모니터링\n- Eluxadoline: 담낭 절제·오피오이드 복용·중증 변비 시 **금기**\n- 저 FODMAP: 영양사 지도 권장 — 장기 독립 시행 시 영양 불균형",
      sources: []
    },
    referral: {
      content: "- Alarm feature 존재 → 소화기내과 대장내시경\n- 표준 치료 4~8주 무반응 → 소화기내과\n- 체중 감소·야간 설사 → IBD 감별",
      sources: []
    },
    notes: {
      content: "- IBS와 기능성 소화불량 중복 흔함 — 동시 치료 ([[functional-dyspepsia]] 참조)\n- 심리 요인(불안·우울) 강한 연관 — CBT 보조 근거 ([[anxiety-depression-cbt]])\n- \"검사 없이 진단\" 패러다임 — Rome 기준 + alarm 배제로 충분",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["ibs"] = _ibs_v2;
KNOWLEDGE_BUNDLE["IBS"] = _ibs_v2;
KNOWLEDGE_BUNDLE["과민성대장증후군"] = _ibs_v2;

/* functional-dyspepsia — 기능성 소화불량 (4-30 deep-extract). [CLINICAL] */
var _fd_v2 = {
  kind: "disease",
  keywords: ["기능성소화불량","functional dyspepsia","FD","dyspepsia","PPI","TCA","아미트립틸린","Rome IV","PDS","EPS","식후불편증후군","명치통증증후군"],
  primarySources: [
    "Pasricha PJ & Talley NJ. Functional Dyspepsia. N Engl J Med 2026;394(2):166-176. PMID:41499733, DOI:10.1056/NEJMcp2501860 (Clinical Practice) [초록 기반]"
  ],
  sections: {
    definition: {
      content: "기능성 소화불량(FD): 상부 위장관 증상(식후 포만·조기 포만·명치 통증·작열감) ≥3개월 + 기질적 원인 배제. **\"기능성\"은 위험하지 않다는 의미가 아님** — 입원·체중 감소 가능한 심각한 기능성 질환. 승인 약물 없음 — 모든 치료 증상 기반 경험적.\n\n| 아형 | 핵심 증상 | 기전 가설 |\n|---|---|---|\n| **PDS** (식후불편) | 식후 포만·조기 포만 | 위 적응 장애·배출 지연 |\n| **EPS** (명치통증) | 명치 통증·작열감 | 내장 통각 과민 |\n| 중복 | PDS+EPS 동시 | |",
      sources: []
    },
    exam: {
      content: "### Rome IV 기준\n- 식후 포만감 / 조기 포만 / 명치 통증 / 명치 작열감 ≥3개월 (시작 ≥6개월 전), 기질적 배제\n\n### Alarm\n- 비자발적 체중 감소, 연하곤란, 구토 반복, 흑변·혈변, 가족력(상부 GI 악성), 55세 이상 신규 → 상부 위내시경\n\n### 동반 질환 중복\n- IBS와 20~30% 중복 ([[ibs]])\n- GERD와 중복 — 제산제 반응 불완전",
      sources: []
    },
    protocol: {
      content: "### 1단계 — PPI\n- 오메프라졸 20mg 또는 동등 PPI, 4~8주\n- H2 차단제 대안 가능\n- 4주 후 평가 — 무반응 시 2단계\n\n### 2단계 — 신경조절제 병합\n- **저용량 TCA**: 아미트립틸린 10~25mg hs\n  - EPS 아형에 효과적 — 내장 통각 과민 조절\n  - 저용량에서 항콜린 부작용 최소화\n- **SSRI/SNRI**: 불안·우울 동반 시 유용\n- **Mirtazapine**: 식욕 부진 + FD 동반 시 고려\n\n### PDS 특이\n- Acotiamide — 위 적응 개선제 (한국 급여 확인)\n- Itopride, Mosapride — 위운동 촉진제\n\n### 비약물\n- 정신적 지지 + 식이 상담 (지방 제한, 소량 빈번)\n- CBT — 만성 치료불응 FD에 근거\n- Hypnotherapy — 일부 근거",
      sources: []
    },
    precaution: {
      content: "- TCA: 부정맥·녹내장·전립선비대 주의\n- PPI 장기: 마그네슘 저하·C.diff 위험 — 최소 용량 유지\n- Th2 점막 미세염증 subgroup 존재 — 단순 위산 억제 이상 접근 (전문의 영역)",
      sources: []
    },
    referral: {
      content: "- Alarm → 소화기내과 상부 위내시경 우선\n- 8~12주 무반응 + 체중 감소 → 소화기내과\n- IBS 중복 + 치료불응 → 소화기내과",
      sources: []
    },
    notes: {
      content: "환자 교육 시 \"심각하게 인식하고 함께 치료한다\"는 메시지 — \"기능성\" = 가벼운 것 아님. 삶의 질 심각하게 저하·체중 감소·입원 가능.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["functional-dyspepsia"] = _fd_v2;
KNOWLEDGE_BUNDLE["기능성소화불량"] = _fd_v2;
KNOWLEDGE_BUNDLE["FD"] = _fd_v2;

/* frailty — 허약 가역성 (4-30 deep-extract, Mir-T1 #4 재택의료·노인의학). [CLINICAL] */
var _frailty_v2 = {
  kind: "topic",
  keywords: ["frailty","허약","노쇠","근감소증","sarcopenia","다약제","polypharmacy","낙상","비계획입원","허약회복","Beers","STOPP","START","CGA"],
  primarySources: [
    "Serra-Prat M et al. Frailty reversal and its main determinants. Fam Med Community Health 2025;13(2). PMID:40295111, DOI:10.1136/fmch-2024-003250"
  ],
  sections: {
    definition: {
      content: "허약(Frailty)은 노화·질병·다약제로 생리적 예비능 저하 → 스트레스 취약 상태. **가역적** — 연간 자연 회복률 7.1% (Catalonia 2019 코호트 n=1,465,312명). 전허약(prefrailty)은 4.6%.\n\n| 상태 | 연간 회복률 |\n|---|---|\n| 허약 | **7.1%** |\n| 전허약 | 4.6% |\n\n회복: 남성 > 여성, 나이 들수록 ↓. 다중이환·다약제·기능적 의존성 시 회복 가능성 ↓.",
      sources: []
    },
    exam: {
      content: "### 스크리닝 도구\n| 도구 | 항목 | 특징 |\n|---|---|---|\n| **FRAIL Scale** | 5문항 (피로·저항력·보행·질환·체중감소) | 1차 선별 |\n| **Fried Phenotype** | 체중감소·피로·저활동·보행속도·악력 | 표준 |\n| **CFS** | 1–9점 관찰 척도 | 빠른 임상 판단 |\n\n### 평가\n- 보행 속도 (<0.8 m/s = 위험)\n- 악력 (성별·체중 기준 하위 사분위)\n- 기립성 저혈압\n- 약물 목록 검토 (≥5종 = 다약제)",
      sources: []
    },
    protocol: {
      content: "### 회복 가능성을 높이는 중재 우선순위\n| 중재 | 근거 | 실전 |\n|---|---|---|\n| **비계획 입원 회피** | 가장 큰 인자 | 폐렴·낙상·약물부작용 예방 |\n| **다약제 감소** | 독립 보호 인자 | ≥5종 재검토; 불필요 약물 중단 |\n| **낙상 방지** | 직접 연결 | 기립성 저혈압 교정·환경 개선 |\n| 빈혈 교정 | e-SIF 구성 | Hb 모니터링·철 결핍 교정 |\n| 시력 손상 교정 | e-SIF 구성 | 안과 의뢰 (백내장·굴절) |\n\n### 일차의료 중재\n1. **Deprescribing** — Beers·STOPP/START; 항콜린제·BZD·수면제 우선 검토 ([[prescribing-cascade]])\n2. **낙상 예방** — 집 환경 평가·기립성 저혈압 약물 조정\n3. **영양** — 단백질 ≥1.2 g/kg/일·비타민 D\n4. **운동** — 저항 운동 + 균형 훈련 (주 2~3회)·물리치료\n5. **예방접종** — 독감·폐렴구균·대상포진·COVID",
      sources: []
    },
    precaution: {
      content: "- 다중이환(≥2개) + 기능 의존성 → 회복 ↓ — 완화의료 논의 병행\n- 근감소성 비만(sarcopenic obesity): BMI 정상이어도 근육량 저하 가능\n- 단기 입원(계획 수술 포함)도 허약 악화 계기",
      sources: []
    },
    referral: {
      content: "- 허약 + 보행 장애 → 재활의학·노인의학 (운동 처방)\n- 허약 + 다약제 복잡 → 노인의학 (CGA: 포괄적 노인 평가)\n- 허약 + 영양 불량 → 영양사",
      sources: []
    },
    notes: {
      content: "허약은 **가역적**임을 환자·보호자에게 명확히 — \"노화이니 어쩔 수 없다\"는 허무주의 탈피. 일차의료에서 다약제 재검토·낙상 예방·예방접종이 회복 핵심 레버.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["frailty"] = _frailty_v2;
KNOWLEDGE_BUNDLE["허약"] = _frailty_v2;
KNOWLEDGE_BUNDLE["노쇠"] = _frailty_v2;

/* diabetic-peripheral-neuropathy — DPN 통증 (4-30 deep-extract, Mir-T1 #2 비암성 만성통증). [CLINICAL+INSIGHTS] */
var _dpn_v2 = {
  kind: "disease",
  keywords: ["DPN","당뇨신경병증","diabetic peripheral neuropathy","gabapentin","pregabalin","duloxetine","tramadol","신경통","neuropathic pain"],
  primarySources: [
    "Schuster NM et al. Real World Treatment Patterns Among Patients with Painful Diabetic Peripheral Neuropathy. Pain Med 2026. PMID:42015888, DOI:10.1093/pm/pnag055 [초록 기반]"
  ],
  sections: {
    definition: {
      content: "당뇨병성 말초신경병증 통증(DPN): 당뇨로 인한 말초신경 손상에서 발생하는 만성 신경병성 통증. 타는 듯·전기 자극·찌르는 통증·이질통, 주로 하지 원위부.\n\n**현재 치료 옵션의 한계 실증** — 실제 처방 75%가 12개월 내 중단 (Schuster 2026, n=22,955).",
      sources: []
    },
    notes: {
      content: "### 실제 처방 패턴 핵심 수치\n| 항목 | 수치 |\n|---|---|\n| 1차 가바펜틴 비율 | 59.0% |\n| 1차 프레가발린 | 5.3% |\n| 1차 트라마돌 | 15.1% |\n| 1차 둘록세틴 | 5.2% |\n| 권장 용량 미달 처방 | 79% (가바) / 91% (프레가) / 61% (둘록) |\n| 용량 증량 안 함 | 81~96% |\n| 12개월 내 초치료 중단 | ~75% |\n| 3개월 내 중단 | >50% |\n\n**임상 포인트:** 가바펜티노이드가 우세이나 권장 용량 미달·높은 중단율 — **충분한 용량(증량)·충분한 기간 시도 후 평가**가 핵심.",
      sources: []
    },
    protocol: {
      content: "### 1단계 — 1차 약물\n| 약물 | 용량 | 근거 |\n|---|---|---|\n| **둘록세틴** | 60~120mg/일 | SNRI; 당뇨+우울 병용 효과 |\n| **가바펜틴** | 300~3600mg/일 (분3) | 용량 의존적; 신기능 조절 |\n| **프레가발린** | 150~600mg/일 (분2) | FDA 승인; 수면 개선 |\n\n→ **권장 용량까지 증량 후 평가** — 용량 미달로 효과 없다고 조기 중단 주의\n\n### 2단계 — 반응 불량 시\n- **저용량 TCA** (아미트립틸린 25~75mg hs) — 저렴, 수면 개선, 항콜린 주의 (고령)\n- **트라마돌** — 단기·구제 목적, 의존성·낙상\n- **병합** (둘록세틴+가바펜틴) — 단독 부분 반응 시\n\n### 3단계 — 전문 의뢰\n- 신경 차단·척수 자극기 → 통증의학과",
      sources: []
    },
    monitoring: {
      content: "- NRS 통증(0–10): 4주 후 ≥50% 감소 시 효과 판정\n- 둘록세틴: 혈압·간기능\n- 가바펜틴/프레가발린: eGFR 기반 용량·졸음·낙상",
      sources: []
    },
    precaution: {
      content: "- 가바펜틴 고령: 졸음·어지럼·낙상 — 저용량 시작·천천히 증량\n- 오피오이드(트라마돌·옥시코돈): 만성 통증 장기 1차 사용 권고 안 됨\n- 혈당 조절 자체가 신경병증 통증 완화 — HbA1c 목표 병행",
      sources: []
    },
    referral: {
      content: "- 2단계 후 NRS ≥6 지속 → 통증의학과\n- 심한 이질통·보행 장애 → 신경과·통증의학과\n- 운동 신경 침범 (근력 약화) → 신경과",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["diabetic-peripheral-neuropathy"] = _dpn_v2;
KNOWLEDGE_BUNDLE["DPN"] = _dpn_v2;
KNOWLEDGE_BUNDLE["당뇨신경병증"] = _dpn_v2;

/* palliative-pain — 완화의료 부프레노르핀 (4-30 deep-extract, Mir-T1 #3 암성통증·완화). [CLINICAL] */
var _palliative_pain_v2 = {
  kind: "topic",
  keywords: ["완화의료","palliative care","buprenorphine","부프레노르핀","오피오이드","암성통증","경피패치","transdermal","호스피스"],
  primarySources: [
    "Jose V et al. The Effectiveness and Safety of Buprenorphine in Palliative Care: Systematic Review. J Pain Symptom Manage 2025;71(5):e525-e539. PMID:41475688, DOI:10.1016/j.jpainsymman.2025.12.009"
  ],
  sections: {
    definition: {
      content: "부프레노르핀은 부분 오피오이드 작용제(μ 부분 작용, κ/δ 길항). 완화의료에서 모르핀·펜타닐 등 완전 작용제와 **동등한 진통 효과**. 경피 패치는 연하 곤란·장 기능 저하 환자에 특히 유리.",
      sources: []
    },
    notes: {
      content: "### 효능 — 43개 연구(RCT 15건, 전향 19건, 후향 9건) 체계적 고찰\n| 비교 | 결과 |\n|---|---|\n| 단기 작용 부프레노르핀 vs 모르핀·트라마돌·펜타닐 | 동등 진통 (6/6 RCT) |\n| 장기 작용 부프레노르핀 vs 펜타닐·모르핀·옥시코돈 | 동등 또는 우월 (4/5 RCT) |\n| 경피 부프레노르핀 vs 위약 | 유의한 진통 |\n| 부작용 프로파일 | 완전 작용제와 통계적으로 차이 없음 |",
      sources: []
    },
    protocol: {
      content: "### 부프레노르핀 형태별 적응\n| 제형 | 특징 | 적합 환자 |\n|---|---|---|\n| **경피 패치** | 72시간 또는 7일 교체 | 연하곤란·오심·장 기능 저하 말기 |\n| 설하정 | 빠른 흡수, 구강 점막 흡수 | 경구 불가하나 구강 점막 가능 |\n| 정맥/근주 | 빠른 작용 | 입원·CICU |\n\n### 모르핀 환산 (rotation 참고)\n- 경피 부프레노르핀 35 μg/h ≈ 경구 모르핀 60–80mg/일 (대략 — 임상 모니터링 필수)\n- 오피오이드 전환 시 전문의/호스피스 팀 협력",
      sources: []
    },
    precaution: {
      content: "- 완전 오피오이드 → 부프레노르핀 전환 시 **금단 증상 주의** — 마지막 완전 작용제 후 12~24시간 경과 후 시작 (또는 전문가 지도)\n- 천장 효과: 호흡 억제 ceiling은 안전성 장점, 진통 효과는 고용량에서도 선형 유지\n- 신부전: 간(CYP3A4) 대사 → **신부전 환자에서 안전** (모르핀 M6G 축적 문제 회피)",
      sources: []
    },
    comparison: {
      content: "| 특성 | 부프레노르핀 | 모르핀 | 펜타닐 |\n|---|---|---|---|\n| 진통 효과 | 동등 | 표준 | 동등 |\n| 투여 경로 | 경피/설하/IV | 경구/IV/SC | 경피/IV |\n| 신부전 | 안전 | 주의 (M6G) | 안전 |\n| 의존 우려 | 낮음 | 높음 | 높음 |\n| 연하곤란 | 경피 유리 | 경구 불가 | 경피 가능 |\n| 부작용 | 모르핀과 유사 | 표준 | 변비 적음 |",
      sources: []
    },
    referral: {
      content: "- 완화의료 통증 조절 시작 시 — 호스피스·완화의학 팀 초기부터 협력\n- 오피오이드 rotation 필요 → 완화의학·통증의학과\n- 말기 환자 — 가정 호스피스 팀 연계",
      sources: []
    },
    notes_extra: {
      content: "암성통증 완화의료에서 **경피 부프레노르핀은 연하 곤란·장 기능 저하 말기 환자의 1차 대안**. OUD 우려 환자에서 부분 작용제 스튜어드십 대안으로도 활용.",
      sources: []
    },
    counseling: {
      content: "### 암환자의 '원인' 욕구 [INSIGHTS — by 미르 관찰]\n\n암환자들은 '원인'을 항상 알고 싶어한다. 내가 왜 걸린 건지, 유전인지, 환경인지, 무슨 인자가 있는 건지. 전근대에는 그것을 죄나 업보로 해석했다. 사람들은 **'설명'되기를 원하며 적절한 설명을 들으면 마음을 놓는 것 같다**.\n\n### 임상 함의\n- **답할 수 없는 질문에도 답하려는 시도가 정서적 의미** — '정확한 원인은 알기 어렵지만…'으로 시작\n- 가족력 / 환경 / 흡연 / 식이 / 감염 등 **알려진 위험인자를 점검·언급**\n- 환자가 '내 잘못 아닌데' 안심할 수 있는 framing — 자책·죄의식 완화\n- 모를 때는 **'많은 경우 명확한 단일 원인은 없습니다'**라고 명시 — 솔직함이 신뢰 형성\n- **시간을 충분히** — 1–2분의 설명이 환자 만족도·치료 순응도에 큰 영향\n\n### 전근대 vs 현대\n- 전근대: 죄·업보·악령\n- 현대: 유전·환경·생활습관·확률\n- 공통: **사람은 '설명되지 않은 고통'을 견디기 매우 어려워함** → 의사가 의미 부여(meaning-making) 역할\n\n[Related: Communication & Counseling 횡단 모듈]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["palliative-pain"] = _palliative_pain_v2;
KNOWLEDGE_BUNDLE["완화의료"] = _palliative_pain_v2;
KNOWLEDGE_BUNDLE["buprenorphine"] = _palliative_pain_v2;
KNOWLEDGE_BUNDLE["부프레노르핀"] = _palliative_pain_v2;

/* home-based-hypertension — 재택 고혈압 CHW+원격 RCT (4-30 deep-extract, Mir-T1 #4 재택의료). [CLINICAL] */
var _home_htn_v2 = {
  kind: "topic",
  keywords: ["재택의료","home-based care","home-based hypertension","CHW","지역사회건강요원","IMPACT-BP","원격의료","telemedicine","방문진료"],
  primarySources: [
    "Siedner MJ et al. Home-Based Care for Hypertension in Rural South Africa (IMPACT-BP). N Engl J Med 2025;393(13):1304-1314. PMID:40888742, DOI:10.1056/NEJMoa2509958"
  ],
  sections: {
    definition: {
      content: "CHW(지역사회건강요원) 방문 + 원격 간호사 결정지원 결합 모델이 외래 표준 관리 대비 SBP를 유의 감소 (NEJM RCT, n=774, 6개월 추적). **방문 어려운 고령·이동 제한 고혈압 환자**에서 대안 관리 모델 강력 근거.",
      sources: []
    },
    notes: {
      content: "### 핵심 수치 (IMPACT-BP, n=774, 평균 62세, 여성 76%)\n| 비교 | SBP 차이 (6개월) | 조절률 |\n|---|---|---|\n| CHW 방문군 vs 표준 | **-7.9 mmHg** (95% CI -10.5~-5.3) | 57.4% vs 32.5% |\n| 강화 CHW군(자동 전송) vs 표준 | **-9.1 mmHg** (95% CI -11.7~-6.4) | 61.3% vs 32.5% |\n\n- 12개월까지 개선 지속\n- 이상 반응·사망 군간 유사\n- 추적 유지율 95%+",
      sources: []
    },
    protocol: {
      content: "### IMPACT-BP 모델 구성\n| 구성 | 역할 |\n|---|---|\n| CHW | 가정 방문 — 혈압 측정·약물 전달·데이터 수집 |\n| 원격 간호사 | 모바일 앱 기반 혈압 검토 + 처방 결정 지원 |\n| 자가 혈압계 | 환자 자가 측정 (강화군: 자동 전송) |\n| 의약품 전달 | CHW 가정 직접 전달 |\n\n### 한국 재택의료 적용 시사점\n- 방문간호사 + 원격 의사 결정 모델 → 한국 재택의료 시범사업과 구조 유사\n- 고령·이동 제한·도서산간 고혈압 → 방문간호 + 원격 처방 조정 가능성\n- 자가 혈압 측정 + 원격 모니터링 앱 결합이 핵심 — 단순 약물 배달만으론 효과 불충분",
      sources: []
    },
    precaution: {
      content: "- 본 연구 맥락: 남아프리카 농촌, 저자원 환경 (HIV 동반 46.5%) — 한국 일반화 한계 주의\n- 처방 결정 주체(간호사·원격 의사)와 책임 범위 — 국내 의료법 검토 필요\n- 자가 혈압계 정확도·측정 교육이 모델 성공 전제",
      sources: []
    },
    referral: {
      content: "- 재택 모델에서도 3개월 미조절(SBP ≥160) → 심장내과\n- 이차성 고혈압 의심 → 내과·신장내과\n- 저항성 고혈압 → [[resistant-hypertension]]",
      sources: []
    },
    notes_extra: {
      content: "한국 재택의료 시범사업 설계 시 참고 가능한 NEJM 수준 근거. 혈압 조절률 32.5% → 57~61% 2배 향상이 핵심. **방문 + 원격 결합**이 단독 방문보다 효과적.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["home-based-hypertension"] = _home_htn_v2;
KNOWLEDGE_BUNDLE["재택고혈압"] = _home_htn_v2;
KNOWLEDGE_BUNDLE["IMPACT-BP"] = _home_htn_v2;

/* prescribing-cascade — 처방 연쇄 (4-30 deep-extract, Mir-T1 #6 임상약물학). [CLINICAL] */
var _cascade_v2 = {
  kind: "topic",
  keywords: ["처방연쇄","prescribing cascade","다약제","polypharmacy","ADR","adverse drug reaction","deprescribing","Beers","STOPP","START"],
  primarySources: [
    "Carollo M et al. Prescribing Cascades: An Umbrella Review. Drugs Aging 2026. PMID:41949780, DOI:10.1007/s40266-026-01295-9"
  ],
  sections: {
    definition: {
      content: "처방 연쇄(Prescribing Cascade): **기존 약물 부작용(ADR)을 새 질환 증상으로 오인하여 추가 약물을 처방**하는 패턴. 84가지 ADR이 추가 처방을 유발 (우산 고찰, 190개 연구). 고령 다약제에서 부적절 폴리파머시 핵심 기전.",
      sources: []
    },
    notes: {
      content: "### 가장 흔한 원인 약물군\n| 약물군 | 대표 ADR | cascade 예시 |\n|---|---|---|\n| **항우울제** | 구역·불면·성기능 장애 | 항구토제·수면제·PDE5 추가 |\n| **AChEI (항치매약)** | 구역·서맥·요실금 악화 | 항구토제·항부정맥제·항무스카린제 |\n| **항정신병약** | 파킨슨 유사 | 항파킨슨제 |\n| **항고혈압제** | 어지럼·기립성저혈압·부종 | 항구토제·이뇨제 |\n| **스타틴** | 근육통 | 진통제·근이완제 |\n| **BZD/수면제** | 낙상·혼동 | 항불안제·항정신병약 |\n\n### 대표 사례\n- CCB → 발목 부종 → 이뇨제 → 전해질 이상 → 보충제\n- 도네페질(AChEI) → 오심 → 메토클로프라미드 → 지연성 운동이상증 → 항파킨슨제\n- 베타차단제 → 우울증상 → 항우울제\n- NSAID → 위장 → PPI → 마그네슘 저하 → 보충제",
      sources: []
    },
    differential: {
      content: "### 새 증상 발생 시 반드시 물어야 할 것\n**\"최근 처방 변경(새 약 추가·용량 변경)이 있었나요?\"**\n\n| 새 증상 | 의심 cascade 유발 | 확인 |\n|---|---|---|\n| 어지럼·기립 어려움 | 항고혈압·이뇨제·항우울제 | 기립성 BP·시점 대조 |\n| 파킨슨 유사 | 항정신병·메토클로프라미드 | 약물 중단 후 관찰 |\n| 오심·구역 | AChEI·오피오이드·메트포르민 | 용량·시간 조정 |\n| 근육통 | 스타틴·피브레이트 | CK·중단 후 반응 |\n| 변비 | 오피오이드·항콜린·칼슘 보충제 | 원인 조정·하제 우선 |\n| 요실금 악화 | AChEI·이뇨제 | 시간 조정·항무스카린제 cascade 주의 |",
      sources: []
    },
    protocol: {
      content: "### 감별·중단 알고리즘\n1. **타임라인 확인** — 새 증상 vs 처방 변경 시점 (PSSA 방법론)\n2. **의심 약물 일시 중단** — 부작용 vs 질환 감별\n3. **중단 후 증상 소실** → cascade 확인 → 원인 약물 중단·대체\n4. **중단 후 증상 지속** → 다른 원인 탐색 (진단 재고)\n\n### Deprescribing 도구\n- **Beers Criteria** — 고령 부적절 약물\n- **STOPP/START** — 고령 처방 검토\n- **MedStopper 앱** — 중단 순서 제안",
      sources: []
    },
    monitoring: {
      content: "- 고령 다약제(≥5종) 재진: 매 3~6개월 약물 목록 전체 재검토\n- 새 약 추가 후 2~4주: 새로운 증상 적극 확인\n- cascade 의심 → 의심 약물 중단 후 2~4주 추적",
      sources: []
    },
    notes_extra: {
      content: "처방 연쇄는 **인지되지 않은 채 지속**되는 것이 가장 큰 문제. \"새 약이 필요한 증상인가 vs 기존 약 부작용인가\"를 매번 자문하는 습관이 핵심 예방. 고령 외래에서 다약제 처방 전 반드시 cascade 가능성 점검.",
      sources: []
    },
    "elderly-mir-tips": {
      content: "### 노인 부종 → NSAIDs 문진 [TIPS — by 미르 경험]\n노인에서 이유 없이 붓는 경우 **NSAIDs를 꼭 문진**.\n- NSAID-induced edema: PGE2 차단 → renal sodium retention\n- 동반 약물: 칼슘 차단제(amlodipine), TZD, gabapentin\n- Cascade 회피: 이뇨제 추가 전 NSAIDs 중단·교체 우선\n\n### 노인 스테로이드 처방 전 4가지 사전 확인 [TIPS — by ENT 교수]\n| 확인 | 이유 |\n|---|---|\n| **당뇨** | 혈당 상승 — DM도 처방 가능, 환자 교육 필수 |\n| **황반변성** | 스테로이드 악화 — 다른 옵션 우선 고려 |\n| **녹내장** | 안압 상승 |\n| **위궤양·BPSD** | 소화기 출혈·정신 증상 악화 |\n\nDM이 있다고 절대 금지가 아님 — '혈당 상승에 유의'라는 환자 교육.\n\n### Cascade 방지 핵심 질문\n새 증상 호소 노인 환자에서 **첫 질문은 '기존 약 부작용?'**\n- 부종 → NSAIDs·CCB·TZD?\n- 변비 → CCB·항콜린·opioid?\n- 기침 → ACEi?\n- 어지럼 → 항고혈압·BZD·항히스타민?\n- 인지 저하 → 항콜린 burden·BZD?\n\n→ STOPP/START·Beers 활용 우선, 추가 처방은 마지막 수단.",
      sources: []
    }
  },
  uiHooks: {
    hint: ["protocol","elderly-mir-tips","referral","contraindication","precaution","pregnancy"],
    guide: ["*"],
    triage: ["differential"],
    draftAppend: ["draft-append"]
  }
};
KNOWLEDGE_BUNDLE["prescribing-cascade"] = _cascade_v2;
KNOWLEDGE_BUNDLE["처방연쇄"] = _cascade_v2;

/* post-mi-deprescribing — MI 후 BB 재평가 REDUCE-AMI (4-30 신규 bundle 등록, Mir-T1 #6). [CLINICAL] */
var _post_mi_dep_v2 = {
  kind: "topic",
  keywords: ["post-MI","심근경색후","beta-blocker 중단","REDUCE-AMI","preserved EF","LVEF 50","2차예방 다약제","secondary prevention"],
  primarySources: [
    "Yndigegn T et al. Beta-Blockers after MI and Preserved EF (REDUCE-AMI). N Engl J Med 2024;390(15):1372-1381. PMID:38587241, DOI:10.1056/NEJMoa2401479",
    "Johner N et al. Routine BB after acute coronary syndromes: end of an era? Eur J Clin Invest 2024;54(12):e14309. PMID:39257189",
    "Atalla M et al. Cardiology 2025 update. Ann Intern Med 2026. PMID:41974015 [초록 기반]"
  ],
  sections: {
    definition: {
      content: "MI 후 \"2차 예방 표준\"으로 수십 년 처방되어 온 베타차단제(BB)는 PCI + 고강도 statin + RAAS 시대에서 **LVEF 보존(≥50%) 환자에게 사망·재MI 예방 이득 없음** — REDUCE-AMI(2024, n=5,020, 추적 3.5년).",
      sources: []
    },
    classification: {
      content: "### LVEF 3구간 BB 근거\n| LVEF | 근거 | 처방 |\n|---|---|---|\n| **≤ 40% (HFrEF)** | 명확한 사망·입원 감소 | **유지 필수** (GDMT 4 pillars) |\n| **41 – 49%** (mildly reduced) | RCT 부족, 관찰 일부 시사 | **개별 판단** (협심증·AF·HTN 동반?) |\n| **≥ 50% (preserved)** | REDUCE-AMI 이득 **없음** 확증 | **타 적응증 없으면 중단 고려** |",
      sources: []
    },
    protocol: {
      content: "### Step 1 — LVEF 확인\n에코 또는 관상동맥조영 LV gram. 12개월 내 데이터 없으면 에코 의뢰.\n\n### Step 2 — BB 타 적응증 점검 (하나라도 해당하면 유지)\n- 지속·발작성 AF (심박수 조절)\n- 현재 anginal symptoms\n- 조절 불량 HTN에서 BB 기여\n- 빈맥성 부정맥\n- LVEF 41-49% + 광범위 관상동맥질환\n\n### Step 3 — 중단 의사결정\nLVEF ≥50% + Step 2 적응증 모두 부재 → 중단 고려. 환자 공동 의사결정.\n\n### Step 4 — 점진 감량\n- 메토프롤롤 숙시네이트 100→50→25mg → 중단 (각 2주)\n- 비소프롤롤 5→2.5→1.25mg → 중단 (각 2주)\n- 저용량(예: 12.5mg qd)은 1-2주 감량 후 중단 가능",
      sources: []
    },
    indication: {
      content: "BB **유지** 적응증:\n- LVEF ≤ 40% (HFrEF) — HF 엔트리 GDMT 경로 ([[heart-failure]])\n- 지속/발작성 AF + RVR\n- 운동 유발 협심증 (CCS II 이상)\n- 다른 약제로 조절 안 되는 HTN\n- 유전성 QT 연장·특정 cardiomyopathy",
      sources: []
    },
    contraindication: {
      content: "BB **중단 부적절**:\n- MI 발생 후 1개월 이내\n- 최근 VT/VF\n- 급성 ACS 재발 고위험\n- HF 증상 환자 (LVEF ≥50%라도)",
      sources: []
    },
    monitoring: {
      content: "중단 후 4-8주 체크포인트:\n- 혈압·심박수 (HR 너무 빨라지면 재평가)\n- 증상 재발 (흉통·두근거림·운동 내약성)\n- AF 재발 (기왕력 시)\n\n3개월 안정 → 장기 종결.",
      sources: []
    },
    referral: {
      content: "- LVEF 41-49% 개별 판단 어려운 경우\n- 중단 후 증상 재발 (협심증·부정맥)\n- 복합 심질환 (판막·cardiomyopathy 공존)",
      sources: []
    },
    notes_extra: {
      content: "고전적 BB 이득 trials(ISIS-1·BHAT)은 PCI·statin·ACEi 이전 시대. 현대 재관류 + 이차예방 약물로 잔여 위험 급감 → BB 부가 이득 희석. Ann Intern Med 2026 cardiology update(PMID:41974015)에서도 MI 후 BB 일률 처방 재고 방향 재확인. MI 후 연간 리뷰 시 에코 + LVEF 확인 → BB 재평가 루틴화.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["post-mi-deprescribing"] = _post_mi_dep_v2;
KNOWLEDGE_BUNDLE["MI후-BB중단"] = _post_mi_dep_v2;
KNOWLEDGE_BUNDLE["REDUCE-AMI"] = _post_mi_dep_v2;

/* heart-failure-pocus-ducs — POCUS DUCS 심부전 예후 (4-30 deep-extract, Mir-T1 #1 POCUS).
   기존 heart-failure·heart-failure-volume-overload 본문 보존, POCUS DUCS는 별도 topic. [CLINICAL — 조건부] */
var _hf_ducs_v2 = {
  kind: "topic",
  keywords: ["heart-failure-pocus-ducs","DUCS","lung ultrasound","B-lines","VEXUS","POCUS HF","ADHF prognosis","ΔDUCS"],
  primarySources: [
    "Garg S et al. POCUS Dual Ultrasound Congestion Score (DUCS) in ADHF. J Ultrasound Med 2026. PMID:41863026, DOI:10.1002/jum.16XXX [초록 기반]"
  ],
  sections: {
    definition: {
      content: "DUCS(Dual Ultrasound Congestion Score) = **폐초음파(B-lines) + VEXUS** 복합 점수. ADHF(급성 비대상 심부전) 환자의 입원 사망·재입원 예측에 유용.",
      sources: []
    },
    exam: {
      content: "### 핵심 수치\n| 지표 | AUC | 의미 |\n|---|---|---|\n| **ΔDUCS (입원→퇴원)** | **0.76** | 입원 사망 예측 |\n| **퇴원 시 DUCS** | **0.77** | 30일 사망·재입원 예측 |\n\n→ 폐초음파만 단독 사용보다 VEXUS 결합이 정보량 ↑. 이뇨제 치료 반응 모니터링 도구로 POCUS 확장 개념.",
      sources: []
    },
    protocol: {
      content: "### POCUS DUCS 임상 적용\n1. 입원 시 DUCS 측정 (baseline)\n2. 이뇨제 치료 후 ΔDUCS 추적\n3. 퇴원 전 DUCS 재측정 → 30일 위험 stratification\n4. 퇴원 시 DUCS 높음 → 30일 follow-up 강화\n\n### POCUS 술기 요점\n- B-lines: 8 zone scan (≥3 B-lines = positive)\n- VEXUS: IVC + 간 정맥·문맥·간세정맥 doppler grade 0~3",
      sources: []
    },
    notes: {
      content: "기존 heart-failure-volume-overload(BNP+POCUS B-lines 단독) 보강 — VEXUS 추가로 우심부전 동반 평가까지 확장. ADHF 외래·응급 환경에서 POCUS 보유 시 적용 가능 (Mir-T1 #1 POCUS·초음파 중재 영역).",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["heart-failure-pocus-ducs"] = _hf_ducs_v2;
KNOWLEDGE_BUNDLE["DUCS"] = _hf_ducs_v2;
KNOWLEDGE_BUNDLE["VEXUS"] = _hf_ducs_v2;

/* internal-medicine-2025-update — Cardiology + Endocrinology 2025 보완 합본 (4-30 deep-extract).
   기존 키 본문 보존, 보완은 별도 topic으로 격리. [CLINICAL] */
var _im_2025_v2 = {
  kind: "topic",
  keywords: ["internal-medicine-2025-update","cardiology-2025","endocrinology-2025","AF anticoagulation","mavacamten","aficamten","finerenone","피네레논","GLP-1 NAION","SGLT-2 UTI 비교"],
  primarySources: [
    "Atalla M et al. Cardiology 2025 update. Ann Intern Med 2026. PMID:41974015, DOI:10.7326/ANNALS-26-01014 [초록 기반]",
    "Endocrinology 2025 update. Ann Intern Med 2026. PMID:41974004, DOI:10.7326/ANNALS-26-01015 [초록 기반]"
  ],
  sections: {
    cardiology: {
      content: "### 심장내과 2025 핵심 변화 (PMID:41974015)\n- **AF 항응고**: 아픽사반 vs 리바록사반 재평가\n- **MI 후 BB**: LVEF≥50% 일률 처방 재고 방향 재확인 ([[post-mi-deprescribing]])\n- **HCM 신약**: mavacamten·aficamten 인식 확대\n- **AF + 커피**: 예상보다 안전 (실용 메시지)",
      sources: []
    },
    endocrinology: {
      content: "### 내분비 2025 핵심 변화 (PMID:41974004)\n- **GLP-1 NAION 부작용 신호**: 시야 변화 모니터링 교육 추가 ([[glp1-selection-strategy]])\n- **SGLT-2 vs GLP-1 비뇨생식기 감염 비교**: SGLT-2 위험 ↑ → **반복 UTI 환자 GLP-1 우선 고려**\n- **피네레논 (Finerenone)**: T2DM + CKD 신보호 추가 근거. SGLT-2i + 피네레논 병합 전략 가능성\n- **MASH + GLP-1**: 적응증 확대 ([[MASH]])",
      sources: []
    },
    notes: {
      content: "본 엔트리는 두 Ann Intern Med 2026 update 논문 합본. 개별 영역의 상세는 관련 엔트리(post-mi-deprescribing·glp1-selection-strategy·sglt2-inhibitors·CKD·MASH) 본문 참조. 본 엔트리는 **2025년 내과 변화 한눈에 보기** 목적.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["internal-medicine-2025-update"] = _im_2025_v2;
KNOWLEDGE_BUNDLE["cardiology-2025"] = _im_2025_v2;
KNOWLEDGE_BUNDLE["endocrinology-2025"] = _im_2025_v2;

/* ========== 4-30 ENT bulk ingest (Batch 4 — 비강·축농증) ========== */

/* sinusitis — 부비동염 항생제 ladder + 가이드라인 정렬 (4-30 ENT bulk). [CLINICAL] */
var _sinusitis_v2 = {
  kind: "disease",
  keywords: ["부비동염","축농증","sinusitis","ABRS","acute bacterial rhinosinusitis","rhinosinusitis","만성부비동염","CRS"],
  primarySources: [
    "IDSA 2012 ABRS guideline. Chow et al. CID 2012;54:e72",
    "AAO-HNS 2015 Adult Sinusitis CPG. PMID:25832968",
    "EPOS 2020 European Position Paper on Rhinosinusitis"
  ],
  sections: {
    protocol: {
      content: "### 항생제 ladder — 가이드라인 정렬 [CLINICAL]\n| 단계 | 약제 | 비고 |\n|---|---|---|\n| 1차 | **Amoxicillin/clavulanate (목시클)** 5–10일 | IDSA·AAO-HNS·EPOS 1차 |\n| 7일 내 호전 없음 | **High-dose amox/clav** 또는 **Cefditoren (메이액트)** | 다른 베타락탐 step-up |\n| 그래도 실패 | **Levofloxacin / Moxifloxacin** | 퀴놀론 step-up |\n| PCN 알러지 (non-anaphylactic) | **Macrolide** (Clarithromycin / Roxithromycin) 또는 cefditoren | **alternative만**, step-up 약제 아님 |\n\n⚠ Macrolide는 *S. pneumoniae* 내성률 ~30% — IDSA는 경험적 1차 비추천. PCN 알러지·intolerance 시 alternative로만.\n\n### 사용 기간 [TIPS — by ENT 교수]\n- ABRS 표준 5–10일. 호전 없으면 약제 교체.\n- F/U **5–7일 간격** — 호전 무이면 step-up 또는 약제 변경.\n- **누적 1개월(2–3 cycle 합) 후에도 호전 없음** → 항생제 중단 + 대증치료 + ENT 의뢰. 만성 부비동염(CRS)·structural 평가 영역.\n\n### 보조\n- 비강 식염수 세척\n- INS 병용 (점막 부종 감소)",
      sources: []
    },
    exam: {
      content: "### 영상 — CT 적응증 [TIPS — by ENT 교수]\n- **재발성 부비동염**: CT 적극 권고 (anatomical anomaly·진균성 구분)\n- 항생제 ladder 끝까지 실패 → CT\n- 일회성 ABRS 진단에는 CT 불필요 (임상 진단)",
      sources: []
    },
    referral: {
      content: "- 누적 1개월 항생제 후에도 증상 지속\n- 재발성 (연 4회 이상)\n- 안와·두개내 합병증 의심 (안구 운동 제한·시력 저하·심한 두통·의식 변화) → **응급**\n- 항진균 의심 (단측 골 침식·면역저하)",
      sources: []
    },
    notes: {
      content: "한국 외래에서 매크로라이드(특히 Roxithromycin)를 step에 끼워 쓰는 임상 관행 존재 — 가이드라인과 괴리 [TACIT — guideline-vs-practice]. ABRS 90% 이상은 viral → 항생제 없이 자연 호전. 항생제 적응증: 10일 이상 지속 + 악화 + 고열·심한 안면통.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["sinusitis"] = _sinusitis_v2;
KNOWLEDGE_BUNDLE["부비동염"] = _sinusitis_v2;
KNOWLEDGE_BUNDLE["축농증"] = _sinusitis_v2;
KNOWLEDGE_BUNDLE["ABRS"] = _sinusitis_v2;
KNOWLEDGE_BUNDLE["만성부비동염"] = _sinusitis_v2;
KNOWLEDGE_BUNDLE["CRS"] = _sinusitis_v2;

/* epistaxis — 코피 응급처치 + 만성 비출혈 (4-30 ENT bulk). [TIPS] */
var _epistaxis_v2 = {
  kind: "disease",
  keywords: ["코피","epistaxis","nosebleed","비출혈","코딱지","비강건조"],
  primarySources: [],
  sections: {
    protocol: {
      content: "### 가벼운 만성 비출혈·코딱지 [TIPS — by ENT 교수]\n- **Nasalin spray** (식염수 가습) + **리노힐** (창상피복제)\n- 리노힐 대체: **바셀린** (nasal vestibule에 소량 도포)\n- 메커니즘: Kiesselbach plexus 점막 보호 + 가습으로 미세 출혈 예방\n\n### 급성 코피 응급 처치 [TIPS — by ENT 교수]\n| 단계 | 처치 | 시간 |\n|---|---|---|\n| 1단계 | **콧망울(soft cartilaginous portion) 쥐고 고개 숙임** — 떼지 않고 지속 압박 | 10분 |\n| 2단계 | 1단계로 멎지 않으면 **추가 10분** 압박 | +10분 |\n| 3단계 | 그래도 지속 → **응급실 이송** | — |\n\n**응급실 처치**:\n- 1차: 바셀린 거즈 패킹 (anterior nasal packing)\n- 2차: Bipolar electrocautery — ⚠ **Septal perforation 리스크 설명 필수**\n\n**환자 교육 핵심**:\n- 고개를 **뒤로 젖히지 않음** (혈액 후두 흡인 위험) — **앞으로 숙여야** 함\n- 압박 중간에 손 떼지 않음 (응고 진행 차단됨)",
      sources: []
    },
    referral: {
      content: "- 20분 압박에도 멎지 않음 → ER\n- 반복적·다량 출혈 (Hb 저하 동반)\n- Posterior bleeding 의심 (insertion oral cavity) → ENT 응급\n- 항응고제·항혈소판제 복용자 다량 출혈",
      sources: []
    },
    notes: {
      content: "응급실은 패킹·cautery까지 가능. 1차 진료에서는 압박 → 미흡 시 즉시 ER 이송이 안전. 만성·반복성 환자는 INS·decongestant 과다 사용 여부 확인 (rhinitis medicamentosa). HHT (유전성 출혈성 모세혈관확장증) 가족력 의심 시 ENT의뢰.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["epistaxis"] = _epistaxis_v2;
KNOWLEDGE_BUNDLE["코피"] = _epistaxis_v2;
KNOWLEDGE_BUNDLE["비출혈"] = _epistaxis_v2;
KNOWLEDGE_BUNDLE["nosebleed"] = _epistaxis_v2;

/* sleep-apnea — 수면무호흡 1차 진찰 (4-30 ENT bulk). [TIPS] */
var _sleep_apnea_v2 = {
  kind: "disease",
  keywords: ["수면무호흡","OSA","sleep apnea","코골이","무호흡","PSG","수면다원검사"],
  primarySources: [],
  sections: {
    exam: {
      content: "### 1차 진료 진찰 [TIPS — by ENT 교수]\n진단 핵심: 상기도 협착 부위 확인 — **비강 + 인후두 모두**\n\n| 부위 | 가정의학과 진찰 | ENT 추가 |\n|---|---|---|\n| **비강 (부비강 협착)** | 비경 (anterior rhinoscopy) | 내시경 |\n| **구인두** | 설압자 (Mallampati class·tonsil grade) | — |\n| **인후두 (하인두·후두)** | **불가** — 보이지 않음 | **내시경 필수** |\n\n→ 구인두까지는 1차 진료, 인후두는 ENT 의뢰\n\n### 진단 기준\n- **PSG (polysomnography)** = 표준 진단. AHI ≥5 + 증상 또는 AHI ≥15\n- 가정형 simplified test (HSAT) = 보조\n\n### 동반 평가\n- BMI / 목둘레 / Mallampati / Friedman score\n- STOP-BANG questionnaire (선별)\n- 동반: 고혈압·당뇨·심방세동·우울 — 모두 확인",
      sources: []
    },
    referral: {
      content: "- 코골이 + 주간 졸림 (Epworth ≥10) + 무호흡 목격 → 수면센터·ENT\n- 인후두 협착 의심 → ENT 내시경\n- 소아 OSA 의심 → 소아 ENT (편도·아데노이드)",
      sources: []
    },
    notes: {
      content: "CPAP은 표준 치료. 적응 어려운 환자에 구강내장치(MAD)·체위 치료. 비만 환자 5–10% 체중 감소만으로 AHI 유의 감소. OSA 미치료 시 심혈관·대사·인지 위험 증가.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["sleep-apnea"] = _sleep_apnea_v2;
KNOWLEDGE_BUNDLE["수면무호흡"] = _sleep_apnea_v2;
KNOWLEDGE_BUNDLE["OSA"] = _sleep_apnea_v2;
KNOWLEDGE_BUNDLE["코골이"] = _sleep_apnea_v2;

/* ========== 4-30 ENT bulk ingest (Batch 5 — 이명·청력) ========== */

/* tinnitus — 이명 (4-30 ENT bulk). [TIPS + CLINICAL] */
var _tinnitus_v2 = {
  kind: "disease",
  keywords: ["이명","tinnitus","ringing in ears","귀울림","일과성 귀잡음","myoclonic tinnitus","middle ear myoclonus","MEM","청신경종양","vestibular schwannoma","리보트릴","clonazepam","baclofen"],
  primarySources: [
    "Curr Opin Otolaryngol HNS 2025. PMID:40836771 (MEM pathophysiology and management)",
    "Westerberg 1996 baclofen RCT. PMID:8915419",
    "Liu 2011 — Revisiting Baclofen for Severe Chronic Tinnitus. PMC3297816"
  ],
  sections: {
    exam: {
      content: "### 이명 vs 일과성 귀잡음 감별 [TIPS — by ENT 교수]\n- 지속 시간 + 빈도 질문 — 이명은 지속, 일과성은 가끔\n- \"하루·일주일에 몇 번 발생하는지\"\n- \"안 들릴 때도 있는지\"\n\n### 이명 환자 표준 문진 [TIPS — by ENT 교수]\n- **악화 시점**: 오전·오후·취침 전 (취침 전 강화 → 수면 영향)\n- **동반 증상**: 난청·어지럼·귀먹먹함\n- **들리는 소리 종류**: 매미·우웅·다다닥·고음 단조음·박동성\n- **스트레스 사건**: 발생 시점 사건, 그 사건이 **현재 진행 중인지 해결됐는지**\n- **음역대 청력 저하**: 고주파(2-8 kHz) 청력 저하 동반 시 이명 더 강하게 인지 (central gain)\n- **직업력**: 소음 환경 노출 (공장·건설·군 사격·음악)\n\n### Red flag — 한쪽 이명 [TIPS — by ENT 교수]\n- **편측성 이명** → **청신경종양 (vestibular schwannoma)** 가능성\n- 특수 검사: ABR(청신경 검사), MRI internal auditory canal\n- ENT 의뢰 필수",
      sources: []
    },
    protocol: {
      content: "### Myoclonic tinnitus (Middle Ear Myoclonus, MEM) [CLINICAL — researcher 4-30 검증]\n\n**임상 단서**: 말하기·씹기·삼키기와 동기화된 클릭/딸각/다다닥 이명, 한쪽 귀, 객관적 (이경·청진으로 들림 가능). Palatal myoclonus는 양측 일정 리듬, MEM은 비주기성·burst.\n\n**약물 선택지** (high-quality evidence 부족, 모두 off-label):\n| 단계 | 약제 | 용량 |\n|---|---|---|\n| 1차 | **Clonazepam (리보트릴)** 0.5 mg HS → 0.5 mg TID | 가장 자주 first-line으로 보고 |\n| 1차 | **Carbamazepine (테그레톨)** 100 mg BID 시작 | — |\n| 2차/병용 | **Baclofen** 5 mg TID(15 mg/day) → 10 mg TID(30 mg/day) | 한국 10 mg 1정 → ½T TID → 1T TID |\n\n해외 표준 baclofen escalation은 60 mg/day까지이나 졸림·어지럼·혼동으로 26% 중도탈락. 외래에서는 30 mg/day 이내 현실적.\n\n**4-6주 시도 후 무효** → ENT 의뢰 (botulinum toxin intratympanic, 또는 stapedius/tensor tympani tenotomy).\n\n[TIPS 미르 routine: 'Baclofen 1.5T#3 줘본다' — 보수적 시작이지만 1차약은 clonazepam·carbamazepine. researcher 검증 4-30 수정]\n\n### 야간 이명 — 수면 영향 [TIPS — by ENT 교수]\n- **Clonazepam (리보트릴) 1 mg HS** (전액 본인부담)\n- 졸음 심하면 **0.5 mg HS**로 감량\n- 적응: 이명으로 입면 곤란",
      sources: []
    },
    referral: {
      content: "- **편측성 이명** → ENT (ABR + MRI IAC)\n- 박동성 이명(맥박 동기) → 혈관성(vascular loop·glomus tumor) → ENT/neurology\n- 4–6주 약물 무효 → ENT\n- 청력검사 이상 동반 → ENT\n- 내이수종 의심 (저주파 난청·먹먹함·어지럼) → ENT",
      sources: []
    },
    notes: {
      content: "### 음역대와 이명 [CLINICAL]\n- 인간 가청 범위: 20–20,000 Hz\n- 회화 영역(speech frequencies): 250–4,000 Hz\n- **이명은 고주파 영역(특히 2–8 kHz, EHF >8 kHz) 청력 저하와 강하게 연관**: tinnitus 환자 ~70%에서 EHF hearing loss (대조군 ~40%)\n- 표준 audiogram이 정상이어도 EHF 검사·hidden hearing loss(synaptopathy) 가능\n- **기전**: 고주파 deafferentation → 중추 central gain 보상성 상승 → tinnitus 인식\n- **임상 함의**: 이명 호소 환자 표준 PTA만으로 부족, EHF audiometry(>8 kHz) 의뢰 고려\n\n[researcher 4-30 수정: 미르 raw '음역대 500-2000Hz'는 회화 영역과 가청 범위 혼동. 정확화]\n\n### 내이수종 이명 [TIPS — by ENT 교수]\n매미·우웅 등 다양한 소리, 비행기/물에 들어간 듯한 먹먹함 동반 — 메니에르·저주파 난청 spectrum (low-freq-hearing-loss 참조). U-turn(Betahistine 계열) 고려.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["tinnitus"] = _tinnitus_v2;
KNOWLEDGE_BUNDLE["이명"] = _tinnitus_v2;
KNOWLEDGE_BUNDLE["귀울림"] = _tinnitus_v2;
KNOWLEDGE_BUNDLE["myoclonic-tinnitus"] = _tinnitus_v2;
KNOWLEDGE_BUNDLE["MEM"] = _tinnitus_v2;

/* hearing-loss — 난청·노인성 난청·보청기 (4-30 ENT bulk). [CLINICAL + TIPS] */
var _hearing_loss_v2 = {
  kind: "disease",
  keywords: ["난청","hearing loss","presbycusis","노인성 난청","감각신경성 난청","sensorineural","보청기","hearing aid","청력검사","audiometry","auditory deprivation"],
  primarySources: [
    "Lancet 2024 Dementia Commission",
    "ACHIEVE RCT 2023. PMID:37478886",
    "ACHIEVE secondary analysis 2025. PMID:40369891 (DOI:10.1002/alz.70156)"
  ],
  sections: {
    exam: {
      content: "### 난청 환자 표준 문진 [TIPS — by ENT 교수]\n- **직업력 — 소음 환경 노출** (공장·건설·군 사격·음악·항공) 필수\n- 발병 시점·진행 속도 (점진 vs 급성)\n- 동반 증상: 이명·어지럼·귀먹먹함\n- 약물력: ototoxic (aminoglycoside·cisplatin·loop diuretic·NSAID 장기)\n- 가족력\n\n### 노인 청력 저하 단독 — 1차 진료 접근 [TIPS — by ENT 교수]\n- 동반 증상 없이 청력 저하만 → 감각신경성 난청 의심\n- **고막 시진** → 이상 없으면 **청력검사만 의뢰**\n- 양측 점진성 = presbycusis\n- 편측 또는 급성 = 돌발성 난청 / 메니에르 / vestibular schwannoma → ENT 즉시 의뢰\n\n### 청력 추적 [TIPS — by ENT 교수]\n- 청력 감소 진단된 환자: **2년에 1회** 청력검사\n- 보청기 사용자: 1년에 1회 + fitting 점검",
      sources: []
    },
    counseling: {
      content: "### 보청기 권유 근거 [CLINICAL — researcher 4-30 검증]\n\n- 청력손실은 **중년기 최대 modifiable dementia risk factor** (Lancet Dementia Commission 2024, PAF ~7%, 14개 위험요인 중 1위)\n- **ACHIEVE RCT 2023**: 전체 cohort 인지저하 차이 없음(p=0.96), **고위험군(ARIC subgroup)에서 3년 인지저하 유의 둔화**\n- **2025 secondary**: 인지저하 위험 상위 25% 환자에서 보청기 사용군 **3년 인지저하 ~62% 둔화**\n- **Auditory deprivation**: 미착용 시 unaided ear word recognition 점진 저하\n\n### 환자 설명문 (권장)\n> \"보청기를 안 쓰면 말소리를 알아듣는 능력이 점점 더 떨어지고, 특히 인지·치매 위험도 함께 높아진다는 연구가 있어 가능한 일찍 시작하시는 것이 좋습니다.\"\n\n### 기전 정확화 [researcher 4-30 정정]\n- '신경 퇴화'는 cochlear nerve atrophy 함의해 부정확\n- 실제 기전: **central auditory pathway 가소성 저하** + 인지·청각 cortex 자극 결핍\n- ACHIEVE primary endpoint는 negative였음 → '반드시 인지 보호' 단정 금지, 고위험군에서만 robust\n\n[TIPS 미르 raw: '보청기 미착용 시 청력·신경 퇴화' → 'central plasticity 저하 + 인지저하 위험'으로 정확화]",
      sources: []
    },
    referral: {
      content: "- **편측 / 급성 / 변동성 난청** → ENT 즉시 (돌발성 난청·메니에르·vestibular schwannoma)\n- 양측 점진성 + 보청기 적응증 → ENT 또는 청각센터\n- 직업성 소음 노출 + 산재 가능성 → ENT + 산재 진단서\n- 소아 난청 의심 → 소아 ENT (ABR·OAE)",
      sources: []
    },
    notes: {
      content: "### 음역대 청력 저하 패턴\n- **Presbycusis**: 고주파 우세 (4-8 kHz) → 자음 변별 곤란 ('말소리는 들리는데 무슨 말인지 모르겠다')\n- **소음성 난청**: 4 kHz notch\n- **메니에르**: 저주파 변동성\n\n가청 범위 20-20,000 Hz, 회화 영역 250-4,000 Hz. 이명 동반 흔함 (`tinnitus` 참조). ARIA·AR 심한 환자에서 만성 중이염 동반 가능 → 전음성 난청 감별.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["hearing-loss"] = _hearing_loss_v2;
KNOWLEDGE_BUNDLE["난청"] = _hearing_loss_v2;
KNOWLEDGE_BUNDLE["presbycusis"] = _hearing_loss_v2;
KNOWLEDGE_BUNDLE["노인성난청"] = _hearing_loss_v2;
KNOWLEDGE_BUNDLE["보청기"] = _hearing_loss_v2;
KNOWLEDGE_BUNDLE["감각신경성난청"] = _hearing_loss_v2;

/* ========== 4-30 ENT bulk ingest (Batch 7 — 메니에르·저주파·돌발성) ========== */

/* low-freq-hearing-loss — 급성 저주파 감각신경성 난청 (4-30 ENT bulk, v1 alias 마이그레이션). [TIPS] */
var _low_freq_v2 = {
  kind: "disease",
  keywords: ["저음성난청","저주파난청","급성 저주파 감각신경성 난청","ALHL","low-frequency SNHL","귀먹먹함","이충만감","내이수종","endolymphatic hydrops","U-turn","Betahistine","메칠론"],
  primarySources: [],
  sections: {
    definition: {
      content: "**급성 저주파 감각신경성 난청 (Acute Low-tone Sensorineural Hearing Loss, ALHL)**: 내이수종(달팽이관 내압 상승)으로 저주파 영역(125–500 Hz) 청력이 변동적으로 떨어지는 상태. 메니에르의 전 단계 또는 monosymptomatic spectrum.",
      sources: []
    },
    exam: {
      content: "### 증상 [TIPS — by ENT 교수]\n- 청력 저하\n- **귀먹먹함 / 이충만감** (비행기 탔거나 물에 들어간 듯한 느낌)\n- 어지럼증 (경미~중등도, 회전성은 드묾)\n- 매미·우웅 등 다양한 소리의 이명 동반 가능\n\n### 진단\n- 청력검사 (PTA): 저주파(125–500 Hz) 손실 — 변동성\n- 고막 시진 정상\n- 내이 MRI는 일반적으로 불필요",
      sources: []
    },
    protocol: {
      content: "### 급성기 [TIPS — by ENT 교수]\n**스테로이드 + 위장약 + 내이 미세순환제**:\n| 약제 | 용량 | 기간 |\n|---|---|---|\n| **메칠론(Methylprednisolone)** | 10T#2 ×3일 → 8T#2 → 6T#2 → 4T#2 → 2T#2 (1일씩 감량) | 총 7일 tapering |\n| **Storgar** (위장약) | 표준 용량 병용 | 동기간 |\n| **U-turn (Betahistine)** | 1T TID | 동기간 |\n\n30%는 약 무반응 — **컨디션 조절(생활습관)이 더 중요**.\n\n### 유지/만성 [TIPS — by ENT 교수]\n- **U-turn (Betahistine)** TID — 내림프수종 완화 (귀먹먹함 단독 시 단독 처방 가능)\n- **Dichlozid (HCTZ) ½T** 추가 — 티아지드 이뇨제로 내압 감소\n- 미호전 시 청력검사 재평가",
      sources: []
    },
    lifestyle: {
      content: "### 생활습관 개선 [TIPS — by ENT 교수]\n- **저염식**\n- **금주, 카페인(커피) 제한**\n- **물 많이 마시기**\n- **스트레스 관리** — 스트레스 → 내압 상승 → 증상 악화",
      sources: []
    },
    precaution: {
      content: "### U-turn (Betahistine) 부작용 [TIPS — researcher 4-30 보강]\n- **흔한 부작용: 두통**\n- **편두통력 미리 확인** — 편두통 동반 시 두통 악화 가능\n- 두통 심하면: U-turn ½T TID로 감량\n- 심한 두통 발생 시 신경과 consult 고려\n\n### 일반\n- 크롬친화세포종(pheochromocytoma) 절대 금기\n- 심계항진·혈압 변화 시 ½T로 감량\n- HCTZ: 저칼륨혈증·저나트륨혈증·고요산혈증 — 노인·이뇨제 병용 주의",
      sources: []
    },
    notes: {
      content: "### 환자 교육 [TIPS — by ENT 교수]\n환자에게 **내이림프 부종 그림(달팽이관 단면)을 모니터로 보여주며 설명**하면 이해가 빠르다. 내이수종 개념을 환자가 잘 이해 못 함.\n\n### 메니에르 진행\n반복되는 ALHL은 메니에르로 진행 가능 [TIPS — by ENT 교수]. 메니에르 분리 진단: 회전성 현훈 + 변동 청력 + 이명/이충만감 (`meniere.md` 참조). ALHL 단계에서 생활습관·약물 관리가 메니에르 진행 예방.",
      sources: []
    },
    referral: {
      content: "- 7일 스테로이드 후 호전 없음\n- 회전성 현훈 동반 → 메니에르 의심 → ENT\n- 청력 저하가 저주파 외 영역 동반 → 돌발성 난청 가능성 → ENT 즉시",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["low-freq-hearing-loss"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["저주파난청"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["저음성난청"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["귀먹먹함"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["이충만감"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["ALHL"] = _low_freq_v2;
KNOWLEDGE_BUNDLE["내이수종"] = _low_freq_v2;

/* meniere — 메니에르병 (4-30 ENT bulk). [TIPS] */
var _meniere_v2 = {
  kind: "disease",
  keywords: ["메니에르","메니에르병","Meniere","Menieres","내이수종","endolymphatic hydrops","U-turn","Betahistine","Dichlozid","보나링"],
  primarySources: [],
  sections: {
    definition: {
      content: "내이림프 수종(endolymphatic hydrops)으로 인한 반복성 회전성 현훈 + 변동 감각신경성 난청 (저주파 우세) + 이명/이충만감 삼주증.",
      sources: []
    },
    exam: {
      content: "### 진단 기준\n- 자발성 회전성 현훈 ≥2회, 각 20분 이상 ~12시간 미만\n- 변동 감각신경성 난청 (저주파 우세, 청력검사 확인)\n- 이명 또는 이충만감 (편측)\n- 다른 원인 배제\n\n### 환자 교육 — 내이수종 그림 시각화 [TIPS — by ENT 교수]\n환자에게 **내이림프 부종이 일어난 그림(달팽이관 단면)을 모니터로 보여주며 설명**. 환자가 이해하기 어려운 개념이라 시각 자료가 효과적.\n\n### 환자 표현 [TIPS — by ENT 교수]\n- '비행기 탄 듯한 먹먹함' / '물에 들어간 듯한 느낌'\n- 이명: 매미·우웅 등 다양한 소리",
      sources: []
    },
    protocol: {
      content: "### 유지 약물 [TIPS — by ENT 교수]\n| 약제 | 용량 | 역할 |\n|---|---|---|\n| **U-turn (Betahistine)** | 1T TID | 내림프 수종 완화 (1차) |\n| **Dichlozid (HCTZ)** | ½T 추가 | 티아지드 이뇨제로 내압 감소 |\n\n### 응급 약물 (acute attack) [TIPS — by ENT 교수]\n- **보나링 (Meclizine)** — 회전성 현훈 발작 시\n- 오심·구토 동반 시 항히스타민 진토 효과",
      sources: []
    },
    lifestyle: {
      content: "- 저염식 (sodium <1500 mg/day)\n- 금주·카페인 제한·물 충분 섭취\n- 스트레스 관리 (내압 상승 요인)",
      sources: []
    },
    precaution: {
      content: "### U-turn (Betahistine) 부작용 [TIPS — researcher 4-30 보강]\n- **흔한 부작용: 두통**, 편두통력 확인 — 편두통 동반 시 두통 악화 가능\n- 두통 심하면 ½T TID로 감량, 심하면 신경과 consult\n\n### 일반\n- 크롬친화세포종(pheochromocytoma) 절대 금기\n- HCTZ: 저칼륨·저나트륨·고요산 모니터링",
      sources: []
    },
    notes: {
      content: "반복되는 급성 저주파 감각신경성 난청(ALHL)은 메니에르로 진행 가능 (`low-freq-hearing-loss.md`). 진행성 청력 저하 — 보청기 적응 시점 고려. 양측성 메니에르(~30%)·자가면역 내이질환 의심 시 ENT/면역 평가. 난치성 — 화학적 미로파괴(intratympanic gentamicin)·외과(endolymphatic sac decompression) ENT 영역.",
      sources: []
    },
    referral: {
      content: "- 처음 메니에르 의심 → ENT 정식 진단·청력검사\n- 약물 무반응·삶의 질 저하 → ENT (intratympanic 치료)\n- 양측성 또는 자가면역 의심 → 이비인후·류마티스/면역",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["meniere"] = _meniere_v2;
KNOWLEDGE_BUNDLE["메니에르"] = _meniere_v2;
KNOWLEDGE_BUNDLE["메니에르병"] = _meniere_v2;
KNOWLEDGE_BUNDLE["Meniere"] = _meniere_v2;

/* sudden-hearing-loss — 돌발성 난청 SSNHL (4-30 ENT bulk). [TIPS] */
var _sudden_hl_v2 = {
  kind: "disease",
  keywords: ["돌발성난청","sudden hearing loss","SSNHL","sudden sensorineural hearing loss","메칠론","MPD","ITS","intratympanic steroid"],
  primarySources: [],
  sections: {
    definition: {
      content: "72시간 이내 발생한 ≥30 dB 감각신경성 난청 (3개 이상 인접 주파수). 응급 — 발생 후 가능한 빨리(이상적으로 14일 이내) 치료 시작 시 회복률 ↑.",
      sources: []
    },
    exam: {
      content: "### 증상\n- **갑작스러운 편측 청력 저하** (보통 아침에 일어나 보니 안 들림)\n- 이명·이충만감 동반 흔함\n- 어지럼증 동반 시 예후 불량\n\n### 진단\n- 청력검사 (PTA) — 즉시 시행\n- 고막 시진 정상 (전음성 난청 배제)\n- MRI internal auditory canal — vestibular schwannoma 배제 (특히 이명 동반)\n\n### 동반 평가 [TIPS — by ENT 교수]\n- **당뇨 확인 — 스테로이드 처방 전 필수**\n- 고혈압·심혈관 위험 평가",
      sources: []
    },
    protocol: {
      content: "### 표준 — 경구 스테로이드 [TIPS — by ENT 교수]\n- **Methylprednisolone (메칠론) 8T#2 → 7일 tapering**\n  - 가능한 빨리 시작 (발생 후 14일 이내가 효과 큼)\n\n### Intratympanic Steroid (ITS) [TIPS — by ENT 교수]\n- 호전을 빠르게 하고 싶을 때 추가\n- 적응: 경구 단독 미반응 / 빠른 회복 필요 / DM·궤양 등 경구 부담\n- ENT 시술\n\n### 보조\n- 산소·hyperbaric oxygen (논쟁 중, 일부 가이드라인 권장)\n- 안정·스트레스 관리",
      sources: []
    },
    precaution: {
      content: "### 스테로이드 처방 전 필수 확인 [TIPS — by ENT 교수]\n- **당뇨**: 혈당 상승 — DM 환자도 처방 가능하지만 혈당 모니터링·환자 교육 필수\n- **녹내장·황반변성**: 스테로이드 외 옵션 고려 (특히 황반변성)\n- 위궤양·소화기 출혈 과거력\n- 정신질환·BPSD\n- 활동성 감염",
      sources: []
    },
    notes: {
      content: "자연 회복률 ~30~65% (변동성 큼). 어지럼증 동반·심한 청력 손실·고령 시 예후 불량. 30일 후 청력 plateau — 회복 평가 시점. 보청기 적응 시점 — 6개월 후 청력 안정 시 고려.",
      sources: []
    },
    referral: {
      content: "- **돌발성 난청 의심 즉시 ENT 의뢰** — 시간이 회복률 결정\n- ITS 시술 필요 → ENT\n- 어지럼증 심한 동반 → 신경이과·내이 진단\n- vestibular schwannoma 의심 (편측·이명 동반) → MRI IAC + ENT",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["sudden-hearing-loss"] = _sudden_hl_v2;
KNOWLEDGE_BUNDLE["돌발성난청"] = _sudden_hl_v2;
KNOWLEDGE_BUNDLE["SSNHL"] = _sudden_hl_v2;

/* ========== 4-30 ENT bulk ingest (Batch 6 — 어지럼·BPPV·외이도염) ========== */

/* BPPV — v1 → v2 마이그레이션 + 3일 f/u 보강 (4-30 ENT bulk). [TIPS] */
var _bppv_v2 = {
  kind: "disease",
  parents: ["dizziness"],
  keywords: ["BPPV","이석증","양성돌발성체위성현훈","체위성현훈"],
  primarySources: [],
  sections: {
    exam: {
      content: "BPPV 진단:\n- **1단계 Supine Head Roll Test** — Horizontal canal 안진 확인\n- **2단계 Dix-Hallpike** — 안진 없으면 시행, Posterior canal 안진 확인",
      sources: []
    },
    protocol: {
      content: "### 이석정복술\n**Horizontal canal 안진**:\n- Geotropic(바닥 beating) → 병변 = 안진이 강하게 발생하는 쪽\n- Apogeotropic(천장 beating) → 병변 = 안진이 약하게 발생하는 쪽\n- 치료: **Barbeque Roll** (병변 반대방향으로 360도 회전)\n\n**Posterior canal 안진**:\n- 병변 = beating 반대방향\n- 치료: **Modified Epley Maneuver** (병변 방향에서 시작)\n\n### 약물치료 [TIPS — by ENT 교수]\n- 약물은 이석정복술에 비해 효과 제한적\n- 증상이 매우 심할 때 PRN으로 **보나링(meclizine)** po 처방 가능\n- 반드시 안내: '너무 심할 때만 복용, 졸릴 수 있음'",
      sources: []
    },
    "follow-up-schedule": {
      content: "### BPPV 치료 후 3일 f/u [TIPS — by ENT 교수]\n| 단계 | 시행 | 판정 |\n|---|---|---|\n| 1 | **Supine roll test** 후 안진 확인 | 안진 없음 → 다음 |\n| 2 | **전정재활** 권고 | side-lying 운동 시작 |\n| 3 | side-lying 운동이 힘듦 | **보나링** 복용 후 재활 |\n| 4 | 2일 이상 이상 없으면 운동 중단 | — |\n\n### 환자 교육\n- **어지럽지 않은 쪽으로 자도록** 권유\n- **몸에 진동 주는 행위 금지** (러닝머신·진동기·자동차 험로 등)",
      sources: []
    }
  },
  uiHooks: {
    hint: ["protocol","follow-up-schedule","referral","contraindication","precaution","pregnancy"],
    guide: ["classification","indication","exam","protocol","follow-up-schedule","comparison","monitoring","insurance","notes"],
    triage: ["differential"],
    draftAppend: ["draft-append"]
  }
};
KNOWLEDGE_BUNDLE["BPPV"] = _bppv_v2;
KNOWLEDGE_BUNDLE["이석증"] = _bppv_v2;
KNOWLEDGE_BUNDLE["양성돌발성체위성현훈"] = _bppv_v2;
KNOWLEDGE_BUNDLE["체위성현훈"] = _bppv_v2;

/* vestibular-neuritis — 전정신경염 (4-30 ENT bulk). [TIPS] */
var _vestibular_neuritis_v2 = {
  kind: "disease",
  parents: ["dizziness"],
  keywords: ["전정신경염","vestibular neuritis","전정장애","급성 전정장애","U-turn","보나링","전정재활"],
  primarySources: [],
  sections: {
    definition: {
      content: "전정신경 (CN VIII vestibular branch)의 바이러스성 (또는 후바이러스성) 염증. **급성 지속성 회전성 현훈** + 청력 저하/이명 없음. 며칠~수주에 걸쳐 호전.",
      sources: []
    },
    exam: {
      content: "### 임상 양상\n- 갑작스러운 회전성 현훈 — 수일 지속\n- 오심·구토·보행 장애\n- **청력 저하·이명 없음** (있으면 미로염·메니에르·SSNHL 감별)\n- 자발 안진 — horizontal/torsional, 빠른 상은 정상 측\n\n### 진단 검사\n- **HIT (Head Impulse Test) — abnormal** (catch-up saccade 양성)\n- HINTS — 말초성 패턴\n- Tandem gait — 가능 (중추성이면 곤란)\n\n중추성(소뇌 경색) 감별이 핵심. HINTS 음성 또는 다른 신경학적 이상 → 즉시 뇌영상.",
      sources: []
    },
    protocol: {
      content: "### 경험적 약물 [TIPS — by ENT 교수]\n- **U-turn (Betahistine)** 1T TID\n- **보나링 (Meclizine)** — 진토·진정 (PRN, 단기 사용)\n\n단기 vestibular suppressant는 회복 기간이 길어질 수 있어 **3–5일 이내**가 원칙.\n\n### 스테로이드 (조건부)\n- 일부 가이드라인 — 발병 3일 이내 prednisolone 시작 (효과 논쟁)\n- 미르 routine은 외래 일상 처방 아님",
      sources: []
    },
    lifestyle: {
      content: "### 전정재활 (rehabilitation) [TIPS — by ENT 교수]\n빠른 회복의 핵심 — 약물보다 재활 운동이 중심.\n\n**기본 운동 (외래에서 환자에게 가르침)**:\n- **엄지손가락을 응시하며 고개를 천천히 도리도리 30도 정도 젓기**\n  - 1회 1–2분, 하루 3–5회\n  - 응시 안정화 + 전정 보상 자극\n- 보행 시 머리 회전·고개 끄덕임 운동\n- 진행 단계: 침상 → 좌위 → 입위 → 보행 → 고개 회전",
      sources: []
    },
    referral: {
      content: "- HINTS 음성·중추성 의심 → **즉시 뇌영상·신경과**\n- 청력 저하·이명 동반 → 미로염 의심 → ENT\n- 1주 이상 호전 없음 → ENT\n- 반복 발작 → 메니에르 또는 vestibular migraine 감별 → 신경이과",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["vestibular-neuritis"] = _vestibular_neuritis_v2;
KNOWLEDGE_BUNDLE["전정신경염"] = _vestibular_neuritis_v2;
KNOWLEDGE_BUNDLE["전정장애"] = _vestibular_neuritis_v2;

/* otitis-externa — 외이도염 + 미르 가려움 처방 (4-30 ENT bulk). [TIPS] */
var _otitis_externa_v2 = {
  kind: "disease",
  keywords: ["외이도염","otitis externa","swimmer's ear","귀가려움","외이도 가려움","Advantan","오큐프록스","ofloxacin"],
  primarySources: [],
  sections: {
    definition: {
      content: "외이도(external auditory canal) 점막·피부의 염증. 급성·만성·진균성 구분. 한국 외래에서 가려움 호소가 흔함.",
      sources: []
    },
    exam: {
      content: "### 임상 양상\n- 가려움 (가장 흔함, 만성)\n- 통증 (급성·세균성)\n- 분비물·딱지·청력 저하 (외이도 폐쇄)\n- Tragus 압통·tugging 통증\n\n### 감별\n- 진균성 (Otomycosis): 검은·흰 점·실 모양 분비물 — 청소 + clotrimazole 점이\n- 세균성 (보통 *Pseudomonas*, *S. aureus*): 강한 통증·분비물\n- 만성 가려움 (eczematous, atopic): 가려움 단독, 분비물 적음",
      sources: []
    },
    protocol: {
      content: "### 표준 치료 [CLINICAL]\n- Topical antibiotic + steroid otic drop: **ciprofloxacin/dexamethasone (Ciprodex)**, ofloxacin otic\n- 외이도 청소·debris 제거\n- 통증 관리 (NSAID·acetaminophen)\n\n### 가려움 호소 환자 — 미르 임상 처방 (off-label) [TIPS — by ENT 교수, researcher 4-30 보강]\n| 항목 | 내용 |\n|---|---|\n| 약제 | **아드반탄 연고** (methylprednisolone aceponate) + **오큐프록스 안연고** (ofloxacin 0.3%) |\n| 비율 | **1:1 혼합** |\n| 사용량 | **쌀알 크기**, 외이도 입구 도포 |\n| 보관 | **냉장 보관** — 시원한 감각이 가려움 완화 |\n\n오큐**프록스** = ofloxacin 안연고 (한국 brand명). 미르 raw '오큐플렉스'는 오기.",
      sources: []
    },
    precaution: {
      content: "⚠ **Tympanic membrane perforation 또는 tympanostomy tube 의심 시 사용 금지**\n- Ofloxacin은 fluoroquinolone 중 ototoxicity 가장 낮은 편이나, 혼합 vehicle 미검증\n- 천공 의심 → 안전한 ofloxacin otic 단독 또는 ENT 의뢰\n\n오큐프록스는 **안과용 ofloxacin** — 외이도 사용은 off-label.\n\nAminoglycoside (neomycin·gentamicin) 함유 점이제는 천공 시 **ototoxicity 위험** → 이번 처방은 ofloxacin이라 상대적으로 안전.",
      sources: []
    },
    notes: {
      content: "한국 외래에서 가려움만 호소하는 만성 외이도염 환자에게 미르 routine 효과적 (냉장 보관 + 시원한 감각 = 가려움 완화 메커니즘). 진균성 의심 시 (검은·흰 분비물) → 별 처방 (clotrimazole 1% 점이) 또는 ENT 의뢰. **당뇨·면역저하 환자 외이도염 → 악성 외이도염(necrotizing OE) 의심 → ENT 응급**.",
      sources: []
    },
    referral: {
      content: "- 1–2주 치료 무반응\n- 강한 통증·발열·림프절 부음 → 세균성 심한 형 또는 supraurricular 합병증\n- 천공 의심·진단 → ENT\n- 당뇨·면역저하 + 심한 외이도염 → ENT 응급 (necrotizing OE)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["otitis-externa"] = _otitis_externa_v2;
KNOWLEDGE_BUNDLE["외이도염"] = _otitis_externa_v2;
KNOWLEDGE_BUNDLE["귀가려움"] = _otitis_externa_v2;

/* ========== 4-30 ENT bulk ingest (Batch 3 — 후두·LPR) ========== */

/* dysphonia v2 — 사레들림 문진·노화 성대·성대마비 CT·red flag 보강 (4-30 ENT bulk) */
var _dysphonia_v2_full = {
  kind: "disease",
  keywords: ["dysphonia","쉰목소리","hoarseness","목소리이상","발성장애","음성장애","vocal palsy","성대마비","presbyphonia","노화성대"],
  primarySources: [
    "Alves M et al. J Voice 2019 PMID:29122414 (SR)",
    "Barsties v. Latoszek et al. Laryngoscope 2024 PMID:37366280 (meta-analysis)"
  ],
  sections: {
    exam: {
      content: "### 후두 의심 시 — 사레들림 문진 [TIPS — by ENT 교수]\n쉰 목소리·목에 걸리는 느낌·낮은 목소리·목소리 변화 호소 시:\n- **사레들리는지 묻는다** → 양성 시 **vocal palsy 등 의심** → ENT 의뢰\n\n흡인(aspiration) 신호는 후두·뇌신경(CN X) 평가의 결정적 단서.\n\n### Red flag — 호흡곤란 동반 [TIPS — by ENT 교수]\n- **목소리 변화 + 호흡곤란 동반** → **응급실로 즉시 이송**\n- 상기도 폐쇄(상부기도 종양·후두 부종·acute epiglottitis) 가능성\n\n### 노화 성대 (presbyphonia) [TIPS — by ENT 교수]\n- 성대도 근육이라 **나이 들면 근육이 빠지면서 성대도 날씬해져 목이 쉴 수 있다**\n- 자연 노화 — 안심 시키되 vocal palsy·종양 배제 후 진단\n\n### 성대 마비 — 원인 유무에 따른 CT 적응증 [TIPS — by ENT 교수]\n| 분류 | 경과 | CT 필요 |\n|---|---|---|\n| **원인 없는 성대 마비** | 갑자기 이유 없이 좋아질 수 있음 | 즉시 CT 불필요 |\n| **원인 있는 성대 마비** | 종양 관련성 큼 | **CT 적응증** — 목 + 폐 (폐는 LDCT) |\n\nRecurrent laryngeal nerve가 thoracic 경유 (특히 좌측은 aortic arch 지나서 폐·종격 압박 가능). **폐암 first manifestation**이 vocal palsy일 수 있음.",
      sources: []
    },
    protocol: {
      content: "### 생활습관 개선 [CLINICAL — 조건부, by ENT교수]\n\n**수분 섭취**\n- 하루 1~1.5L 물 섭취 권고\n- 성대 점막 수분 유지 → 진동 효율 개선, 염증 완화\n- ※ 1~1.5L 특정 용량 RCT 없음, 전문가 컨센서스\n\n**목 앞 근육 마사지 (Laryngeal Manual Therapy)**\n- 목 앞 세로 근육(strap muscle)을 꼬집듯 마사지\n- 대상: Muscle Tension Dysphonia (MTD)\n- ※ MTD에서 효과 확립. 일반 기질성 병변에는 적응증 아님",
      sources: ["Alves 2019 PMID:29122414","Barsties 2024 PMID:37366280"]
    },
    referral: {
      content: "- 호흡곤란 동반 → ER (상기도 폐쇄 의심)\n- 사레들림 양성 (vocal palsy 의심) → ENT\n- 원인 있는 성대 마비 (CT 양성) → 흉부외과·종양내과\n- 3주 이상 지속되는 쉰 목소리 → ENT (성대 polyp·종양 배제)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["dysphonia"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["쉰목소리"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["hoarseness"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["목소리이상"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["발성장애"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["음성장애"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["vocal-palsy"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["성대마비"] = _dysphonia_v2_full;
KNOWLEDGE_BUNDLE["presbyphonia"] = _dysphonia_v2_full;

/* laryngitis — 후두염 + 미르 routine (4-30 ENT bulk). [TIPS] */
var _laryngitis_v2 = {
  kind: "disease",
  keywords: ["후두염","laryngitis","인후두염","자큐보","소론도","뮤테란","voice rest","P-CAB"],
  primarySources: [],
  sections: {
    definition: {
      content: "후두 점막의 염증. 급성(주로 바이러스성)·만성·급성 악화 구분. 한국 외래에서 쉰 목소리·인후통 호소가 흔함.",
      sources: []
    },
    exam: {
      content: "- 쉰 목소리·인후통·기침\n- 발열 동반 여부 (감염성)\n- 음성 남용력 (말 많이·노래·소리 지름)\n- 흡연·음주\n- 위식도 역류 동반 (LPR — `LPR.md` 참조)\n\n### Red flag\n- **목소리 변화 + 호흡곤란** → 응급 (epiglottitis·상기도 폐쇄)\n- **3주 이상 지속되는 쉰목소리** → ENT (성대 polyp·종양·vocal palsy 배제)",
      sources: []
    },
    protocol: {
      content: "### 가벼운 후두염\n- **Voice rest** — 가장 중요\n- 충분한 수분 섭취\n- NSAID 인후통 관리\n- 흡연 중단·자극 회피\n\n### 심한 후두염 — 미르 routine [TIPS — by ENT 교수]\n| 약제 | 용량 | 역할 |\n|---|---|---|\n| **소론도 (Prednisolone)** | 2T#2 | 단기 스테로이드 — 후두 부종 감소 |\n| **자큐보 (Zaqubo)** | 1T qd | P-CAB — LPR 동반 시 |\n| **뮤테란 (Acetylcysteine 200mg)** | 3T#3 | 거담·점액 배출 |\n\n**처방 기간**: 보통 5–7일, 호전 시 단계적 감량\n\n**적응** — 위 처방 고려 시점:\n- 음성 사용 직업 (교사·강사·가수)\n- 심한 부종으로 발성 곤란\n- LPR 동반 (목 열감·기침)\n- 단순 voice rest로 호전 안 되는 경우",
      sources: []
    },
    precaution: {
      content: "**소론도 — 당뇨·녹내장·황반변성 환자 처방 전 확인** [TIPS — by ENT 교수]\n- DM: 혈당 모니터링·환자 교육\n- 황반변성: 다른 옵션 우선 고려\n- 위궤양·소화기 출혈 과거력\n- 정신질환 (BPSD·우울 악화 가능)",
      sources: []
    },
    referral: {
      content: "- 3주 이상 지속 → ENT (간접후두경·내시경)\n- 호흡곤란 동반 → ER\n- 흡인 의심 (사레들림) → ENT (vocal palsy 평가)\n- 흡연자·음성 사용 직업·중년 이상 + 만성 → ENT (악성 배제)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["laryngitis"] = _laryngitis_v2;
KNOWLEDGE_BUNDLE["후두염"] = _laryngitis_v2;
KNOWLEDGE_BUNDLE["인후두염"] = _laryngitis_v2;

/* eagle-syndrome — Eagle syndrome (4-30 ENT bulk, researcher 검증 HIGH). [CLINICAL] */
var _eagle_syndrome_v2 = {
  kind: "disease",
  keywords: ["Eagle syndrome","stylohyoid syndrome","elongated styloid process","편도 안쪽 통증","styloidectomy"],
  primarySources: [
    "Baba et al. Clin Case Rep 2017. DOI:10.1002/ccr3.806",
    "Nogueira-Reis et al. Clin Oral Investig 2021. DOI:10.1007/s00784-021-04285-w (prevalence meta-analysis)"
  ],
  sections: {
    definition: {
      content: "**Elongated styloid process (>30 mm)** 또는 **calcified stylohyoid ligament**가 인근 신경·혈관 구조를 압박하여 인후·안면·이부 통증을 유발하는 증후군. 일반 인구에서 elongation은 ~30%에서 관찰되나 **대부분 무증상** — 영상만으로 진단 불가.",
      sources: []
    },
    exam: {
      content: "### 임상 단서\n- **편도 바로 안쪽(tonsillar fossa) 통증**\n- 인후이물감·삼킴 시 통증\n- 귀·얼굴로 referral pain (CN V·IX 분포)\n- **삼차신경통과 유사** → 정체불명 통증으로 **진단 지연 흔함**\n- 만성·일측성\n\n### 진단 핵심 — Tonsillar fossa palpation\n**손가락으로 tonsillar fossa 촉진 시 통증 재현 + 귀·얼굴로 referral**이 임상 진단 핵심.\n- 영상 단독 부족 — 일반인 30%에서 elongation 관찰\n- 임상소견(촉진 + 증상 양상) + 영상 결합 필수\n\n### 영상\n- **CT 3D recon** — styloid 길이·calcification 평가, 진단 표준\n- 일반 X-ray로도 elongation 확인 가능하나 정밀도 낮음",
      sources: []
    },
    differential: {
      content: "- **삼차신경통 (Trigeminal neuralgia)** — 짧은 발작성, 안면 trigger zone\n- **만성 인두염 / LPR** — 인후 burning, 양측 흔함\n- **TMJ disorder** — 턱 관절 기원, 저작 시 악화\n- **편도결석 / 만성 편도염** — 백색 분비물·악취\n- **악성 종양 (oropharyngeal cancer)** — 흡연·음주 위험인자, 체중 감소",
      sources: []
    },
    protocol: {
      content: "### 1차 — 보존적\n- NSAID·근이완제·항우울제 (저용량 TCA·SNRI) 신경병증성 통증 약물\n- 가바펜틴/프레가발린 (신경병증성 통증)\n\n### 외과적\n- **Styloidectomy** (transoral 또는 transcervical)\n- 성공률 84–97%이나 **일부 잔존 통증 가능** (~12.5%)\n- ENT/oromaxillofacial 영역",
      sources: []
    },
    referral: {
      content: "- **만성 일측 인후통/이통 + tonsillar fossa 압통 재현** → ENT 의뢰 + CT 3D recon\n- 삼차신경통·만성 안면통 진단 후에도 호전 없음 → Eagle syndrome 재평가\n- 외과 평가 필요 → ENT 또는 구강악안면외과",
      sources: []
    },
    notes: {
      content: "가정의학과 1차 진료의 핵심: **Eagle syndrome 가능성 고려 → tonsillar fossa palpation → 양성 시 ENT 의뢰**. 진단 지연 흔하므로 **만성 정체불명 인후·이부 통증 환자는 한 번씩 의심**. 수술 후에도 잔존 가능 — 환자 기대치 관리 (수술 = 완치 보장 아님).",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["eagle-syndrome"] = _eagle_syndrome_v2;
KNOWLEDGE_BUNDLE["Eagle syndrome"] = _eagle_syndrome_v2;
KNOWLEDGE_BUNDLE["stylohyoid-syndrome"] = _eagle_syndrome_v2;

/* ========== 4-30 ENT bulk ingest (Batch 1 — 구강·혀) ========== */

/* oral-lesion v2 보강 — 치아문제 우선·헥사메딘 칸디다·디플루칸 (4-30 ENT bulk) */
var _oral_lesion_v2_full = {
  kind: "disease",
  keywords: ["구강병변","oral white patch","구강궤양","leukoplakia","lichen planus","oral candidiasis","구강 칸디다","헥사메딘","chlorhexidine","디플루칸","fluconazole"],
  primarySources: [],
  sections: {
    exam: {
      content: "백반증(white patch)·궤양: **1달 내 호전 확인 필수**. 미호전 → 악성 전환 가능성 → ENT refer.\n\n### 구강 ulcer ↔ 치아문제 [TIPS — by ENT 교수]\n구강 내 ulcer는 **치아 문제(날카로운 치아·잘 안 맞는 보철·마모면)를 먼저 해결**해야 할 수 있다.\n- 치아·보철 검사 → 적합화·연삭 후 ulcer 자연 호전 확인\n- 치과 의뢰 후 1–2주 관찰 → 미호전 시 약물 치료 단계로",
      sources: []
    },
    protocol: {
      content: "### 1단계 — Dexamethasone 가글 [TIPS]\nDexamethasone powder + 물 1L 혼합 → 하루 3–4회 가글\n\n### 2단계 — 가글 무효 시 경구 스테로이드 [TIPS — by ENT교수]\nUlcer 장기 지속 또는 lichen planus에서 dexamethasone 가글 무효 시:\n- 가글 유지하면서 소론도(prednisolone) 추가\n- **소론도 2T #2 × 14일** → f/u\n\n### 3단계 — 미호전 시 ENT refer\n정밀검사 (생검 등) 필요\n\n### 통증 심할 때 — Tantum Verde spray [TIPS — by ENT교수]\n통증 심한 구강 궤양에 Tantum Verde (benzydamine) spray 처방\n\n### 기타 — Triamcinolone injection [CLINICAL]\n재발성 구강 병변·난치성 궤양에 병변 내 주사\n\n### 구강 칸디다 — 헥사메딘 가글 [TIPS — by ENT 교수, researcher 4-30 보강]\n- **헥사메딘(chlorhexidine 0.12–0.2%)** 가글: *Candida*에 항진균 활성 있음\n- 가벼운 백태/구내염 **보조 가글**로 가능\n- ⚠ **명확한 oral candidiasis 1차 치료는 nystatin 현탁액 또는 fluconazole(디플루칸)**\n- Nystatin 병용 시 **30분 이상 간격** 둘 것 (상호작용으로 효능 저하)\n\n### 구강 칸디다 심함 — 디플루칸 경구 [TIPS — by ENT 교수]\n- **Fluconazole(디플루칸) 100–200mg PO qd × 7–14일**\n- 적응: 광범위 백태·통증 심함·면역저하·반복성\n- 보조: 헥사메딘 가글 (간격 두고)",
      sources: []
    },
    differential: {
      content: "구강백반증(악성 전환율 ~1%/년), 구강편평태선, 캔디다증, 외상성 궤양, 구강암",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["구강병변"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["oral white patch"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["구강궤양"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["oral-lesion"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["구강칸디다"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["디플루칸"] = _oral_lesion_v2_full;
KNOWLEDGE_BUNDLE["헥사메딘"] = _oral_lesion_v2_full;

/* burning-mouth v2 보강 — 시진 표준·뮤테란/Pilocarpine/제로바·심한 혀통증 routine (4-30 ENT bulk) */
var _BMS_v2_full = {
  kind: "disease",
  keywords: ["burning mouth","구강작열감","구강작열감증후군","BMS","혀통증","glossodynia","glossalgia","뮤테란","제로바","pilocarpine"],
  primarySources: [
    "Kim JW et al. Sci Rep 2025"
  ],
  sections: {
    exam: {
      content: "### 혀 화끈거림 환자 — 시진 표준 [TIPS — by ENT 교수]\n- **건조함 동반 여부**\n- **혀 표면이 울퉁불퉁한지** 시진 (정상인에서는 없는 것이 맞음 — 비정상 소견)\n- 혀 가장자리 indentation (scalloped tongue) — 부종·구강건조 시사\n- 백태·발적·궤양 동반 여부",
      sources: []
    },
    protocol: {
      content: "### 뮤코미스트 가글 [CLINICAL]\n뮤코미스트 10% 1 ampule + 물 100cc → TID 가글\n- 2025 다기관 임상: VAS 통증 + 삶의 질(OHIP-14K) 유의 개선\n- Clonazepam 0.5mg/d 병용 시 반응률 ↑ (단독 60% → 병용 80%)\n\n### 혀 화끈거림 일반 처방 [TIPS — by ENT 교수]\n- **뮤테란 가글** (효과 ↑) — 탄툼·헥사메딘은 burning에 효과 제한\n- **Pilocarpine** (살라겐/필로겐) — 구강건조 동반 시 (`dry-mouth` 참조)\n- **제로바 spray** — 구강 보습·통증 완화\n\n### 심한 혀통증 — 미르 routine [TIPS — by ENT 교수]\n| 약제 | 용법 |\n|---|---|\n| **Dexa high gargle** | Dexamethasone 2T + 물 1L → 하루 3회 가글 |\n| **제로바 spray** | 통증 부위 도포 |\n| **Clonazepam (리보트릴)** | **½T HS** — 신경병증성 통증·수면 영향 |",
      sources: ["Kim JW et al. Sci Rep 2025"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["burning mouth"] = _BMS_v2_full;
KNOWLEDGE_BUNDLE["구강작열감"] = _BMS_v2_full;
KNOWLEDGE_BUNDLE["BMS"] = _BMS_v2_full;
KNOWLEDGE_BUNDLE["burning-mouth"] = _BMS_v2_full;
KNOWLEDGE_BUNDLE["혀통증"] = _BMS_v2_full;
KNOWLEDGE_BUNDLE["glossodynia"] = _BMS_v2_full;

/* xerostomia v2 보강 — 노화 분비량·dry tongue 관리 (4-30 ENT bulk, researcher 4-30 정정) */
var _xerostomia_v2_full = {
  kind: "disease",
  keywords: ["구강건조증","구강건조","dry mouth","xerostomia","dry tongue","saliva aging"],
  primarySources: [
    "Leveque FG et al. NEJM 1993 (Pilocarpine)",
    "Salagen SPC",
    "Sio TT et al. Mayo Clin Proc 2019",
    "Affoo et al. JAGS 2015. PMID:26469080"
  ],
  sections: {
    exam: {
      content: "### 노화와 분비량 [TIPS — by ENT 교수, researcher 4-30 정정]\n- 건강한 성인 침 분비량 약 **0.5–1.5 L/day**, 콧물 약 **1–2 L/day**\n- 노화 시 침 분비는 **gland-specific 점진 감소** — 특히 submandibular/sublingual; parotid는 비교적 보존 (Affoo 2015)\n- ⚠ Dry mouth의 주원인은 **노화 자체보다 polypharmacy·Sjögren·anticholinergic 약제** 가능성이 높음\n- 노인 dry mouth 호소 시 **약물·전신질환부터 점검**\n\n[TIPS 미르 raw: '60대 50% 미만 감소'는 출처 미확인 — 환자 비유로만 사용]\n\n### Dry tongue 관리 [TIPS — by ENT 교수]\n- **Dry tongue을 그냥 내버려 두면 너무 아파서 밥을 아예 못 먹기도 함**\n- 원인: mouth breathing·구강건조·약물·Sjögren·당뇨 미조절·방사선 후\n- 적극 관리 필요",
      sources: []
    },
    protocol: {
      content: "① **Pilocarpine(살라겐/필로겐)** po\n  - 두경부암 방사선 후 구강건조증: 5mg TID (가이드라인)\n  - 쇼그렌증후군: 5mg QID (가이드라인)\n  - 임상 패턴: BID 가능 (부작용 경감 목적) [출처 미확인]\n  - 급여: 두경부암 방사선 후 or 쇼그렌증후군 진단 시\n\n② **뮤코미스트 10% 1 ampule + 물 100cc → TID 가글**\n  - 방사선 유발 xerostomia: 10% NAC rinse 유의 개선 (Mayo 2019 RCT)\n  - 일반 dry mouth: 직접 gargle 근거 없음, 임상 경험 기반 [출처 미확인]\n\n③ **제로바 spray** — 구강 보습 보조",
      sources: ["Leveque FG et al. NEJM 1993","Salagen SPC","Sio TT et al. Mayo Clin Proc 2019"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["구강건조증"] = _xerostomia_v2_full;
KNOWLEDGE_BUNDLE["구강건조"] = _xerostomia_v2_full;
KNOWLEDGE_BUNDLE["dry mouth"] = _xerostomia_v2_full;
KNOWLEDGE_BUNDLE["xerostomia"] = _xerostomia_v2_full;
KNOWLEDGE_BUNDLE["dry-mouth"] = _xerostomia_v2_full;
KNOWLEDGE_BUNDLE["dry-tongue"] = _xerostomia_v2_full;

/* ========== 4-30 ENT bulk ingest (Batch 2 — 경부·갑상선·타석) ========== */

/* neck-mass v2 보강 — 림프절 양상 감별 (4-30 ENT bulk) */
var _neck_mass_v2 = {
  kind: "disease",
  keywords: ["경부종괴","목에 혹","목 멍울","neck mass","경부림프절","cervical lymphadenopathy","림프절염","lymphadenitis"],
  primarySources: [
    "Am Fam Physician 2016. PMID:27929264",
    "Ying M et al. Cancer Imaging 2014. PMID:24434158",
    "Ahuja AT et al. PMID:28439430"
  ],
  sections: {
    exam: {
      content: "### 초진 접근 [CLINICAL — 조건부, by ENT 교수]\n1. **촉진** — 위치, 크기, 경도, 압통, 이동성 확인\n2. **기저질환 확인** — 감염, 자가면역, 악성종양 병력\n3. **초음파 + 도플러**\n   - 혈관(목정맥)과 림프절 구분 — 도플러 필수\n   - 목정맥(내경정맥) 확장이 종괴 오인 경우 있음\n4. 필요 시 aspiration (초음파 유도)\n5. 애매한 경우 조직검사 고려\n\n### 경부림프절 양상 감별 [TIPS — by ENT 교수]\n| 양상 | 의심 |\n|---|---|\n| **말랑·움직임 양호** | 양성 (반응성 림프절병증·감염성) |\n| **고정·단단** | 악성·전이 의심 |\n\n- **둘 다 초음파로 관찰 가능**\n- 후자(고정·단단)는 **ENT 의뢰 — 조직검사** 진행\n- 대칭성·압통·표면 양상도 동시 평가",
      sources: []
    },
    protocol: {
      content: "### 림프절염 (가장 흔한 원인) [CLINICAL — 조건부]\n경부종괴 2/3 이상이 양성 — 림프절염/반응성 림프절병증.\n\n**경과**: 수주~수개월 지속 가능. 감염 소실 후에도 림프절 정상화 1–6개월. 새로운 상기도 감염마다 재발 패턴 흔함.\n\n**치료 원칙**:\n- 증상 없음 → 관찰\n- 압통/커짐/발열 → 항생제 (S. aureus·GAS 타겟)\n- 바이러스성 → 대증치료\n\n⚠ **4–6주 이상 지속 or 치료 반응 없음** → 조직검사 (림프종 오진 가능성)",
      sources: []
    },
    differential: {
      content: "**Horses**: 림프절염/반응성 림프절병증 ★가장 흔함 / 피지낭종·지방종 / 갑상선 결절\n\n**Zebra**: ⚠ 림프종 (4–6주 지속·B증상·치료 무반응) / ⚠ 전이성 악성종양",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["경부종괴"] = _neck_mass_v2;
KNOWLEDGE_BUNDLE["neck mass"] = _neck_mass_v2;
KNOWLEDGE_BUNDLE["neck-mass"] = _neck_mass_v2;
KNOWLEDGE_BUNDLE["경부림프절"] = _neck_mass_v2;
KNOWLEDGE_BUNDLE["lymphadenopathy"] = _neck_mass_v2;

/* thyroid-fna-cnb — 갑상선 FNA/CNB 시술 전 항혈전제·합병증 (4-30 ENT bulk). [TIPS] */
var _thyroid_fna_cnb_v2 = {
  kind: "topic",
  keywords: ["갑상선 FNA","갑상선 CNB","fine needle aspiration","core needle biopsy","갑상선 결절","thyroid nodule","hematoma","항혈전제"],
  primarySources: [],
  sections: {
    definition: {
      content: "갑상선 결절·경부 림프절 평가의 표준 조직 진단 도구.\n- **FNA**: 22–27G 가는 바늘. 출혈 위험 낮음. 세포 진단(Bethesda system).\n- **CNB**: 18–20G 코어 바늘. 조직 진단(architecture 평가). FNA 미진단 또는 atypia 시 사용. **출혈 위험 FNA보다 높음**.",
      sources: []
    },
    protocol: {
      content: "### 시술 전 평가 — 항혈전제 확인 [TIPS — by ENT 교수]\n**FNA / CNB 하기 전 반드시 먹는 약을 확인한다 (항혈전제)**\n\n| 약제 | FNA | CNB |\n|---|---|---|\n| Aspirin | 보통 지속 가능 | 시술자 판단, 보통 지속 또는 5–7일 중단 |\n| Clopidogrel·prasugrel·ticagrelor | 5–7일 중단 | 7일 중단 |\n| Warfarin | INR <2.0 또는 시술자 판단 | INR <1.5 권고 |\n| DOAC (apixaban·rivaroxaban·dabigatran) | 24–48h 중단 | 48h 중단 |\n\n항혈전제 중단 결정 = **혈전 위험 vs 출혈 위험** (특히 stent 후·기계 판막). 환자별 필수 확인 — 누락 시 합병증 위험.",
      sources: []
    },
    complications: {
      content: "### CNB 출혈·혈종 [TIPS — by ENT 교수]\n갑상선 CNB 후 합병증으로 **출혈과 혈종**이 있음. 혈종이 심하면 ER로 와서 **응급수술로 목을 열어야 함**.\n\n**환자 교육 (응급실 내원 trigger)**:\n- **숨이 답답해지거나 부어오르면 즉시 ER 내원**\n- 시술 후 24h 이내가 위험 — 환자에게 명시적 안내\n- 압박 지혈을 충분히 (시술 후 10–20분)\n\n**응급 처치 (ER)**: 기도 확보 → 응급 외과적 감압 (drainage / open exploration) → vital·CBC·coagulation panel.\n\n### 기타\n- 일시적 통증 (24–48h)\n- 일시적 음성 변화 (recurrent laryngeal n. 자극)\n- 감염 (드묾)\n- vasovagal 반응",
      sources: []
    },
    referral: {
      content: "- 갑상선 결절 ATA TI-RADS 4–5 → 갑상선·내분비외과 (FNA/CNB 시행)\n- 시술 후 호흡곤란·심한 부종 → ER 응급\n- 시술 후 음성 변화 지속 → ENT (vocal cord 평가)",
      sources: []
    },
    notes: {
      content: "가정의학과 1차 진료에서 직접 시술 영역 아님 — 의뢰 후 합병증 인지·환자 교육이 1차 의료 책임. 시술 전 환자 약 복용력 (특히 노인 다약제) 정확 확인 필수 (의뢰 시 약 list 동봉).",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["thyroid-fna-cnb"] = _thyroid_fna_cnb_v2;
KNOWLEDGE_BUNDLE["갑상선FNA"] = _thyroid_fna_cnb_v2;
KNOWLEDGE_BUNDLE["갑상선CNB"] = _thyroid_fna_cnb_v2;
KNOWLEDGE_BUNDLE["thyroid biopsy"] = _thyroid_fna_cnb_v2;

/* salivary-gland-stones — 타석증 (4-30 ENT bulk). [TIPS] */
var _salivary_stones_v2 = {
  kind: "disease",
  keywords: ["타석증","sialolithiasis","salivary gland stones","침샘 돌","설하샘 돌","턱밑샘 돌","submandibular stone","sublingual stone"],
  primarySources: [],
  sections: {
    definition: {
      content: "침샘관·실질 칼슘 침착(석회화). 타액 분비 폐쇄 → 식사 시 침샘 부음·통증.\n\n| 침샘 | 빈도 | 특징 |\n|---|---|---|\n| **턱밑샘 (Submandibular)** | 80–90% | Wharton's duct, 큰 결석 흔함 |\n| 이하선 (Parotid) | 5–20% | Stensen's duct, 작은 다발 |\n| 설하샘 (Sublingual) | 드묾 | 구강 저면 |",
      sources: []
    },
    exam: {
      content: "### 임상 양상\n- 식사 시·식후 침샘 부음·통증 (mealtime swelling)\n- 압박 시 통증·악화\n- 탈수·구강건조 시 악화\n- 만성 시 만성 침샘염·농양 합병\n\n### 진찰 — 한쪽 vs 양쪽 [TIPS — by ENT 교수]\n| 부위 | 패턴 | 다음 단계 |\n|---|---|---|\n| **턱밑샘 부음 — 한쪽** | 흔한 타석 양상 | 진단·국소마취 절개 시도 가능 |\n| **턱밑샘 부음 — 양쪽** | 단순 타석 아님 | **CT 꼭 확인** — 다른 원인(Sjögren·IgG4·림프종·림프상피낭종) 의심 |\n\n### 설하샘 돌 [TIPS — by ENT 교수]\n- **눈으로 보이는 표재성 돌** → 국소마취 후 **eye scissor로 미세절개·배석** 가능\n- 시술 후 계속 불편 → **CT 시행** (deep stone·canalicular stenosis 확인)\n\n### 영상\n- 단순 X-ray (occlusal view) — submandibular calcification\n- **초음파** — 1차\n- **CT** — 표준 (소량·작은 결석 검출, 양측성 평가)\n- Sialendoscopy — ENT 영역",
      sources: []
    },
    protocol: {
      content: "### 보존적 (작은 결석)\n- 충분한 수분 섭취\n- 침샘 마사지 (식전·식후)\n- **Sialagogue** — 신 음식·신 사탕(레몬 사탕)으로 침 분비 자극\n- 항생제 — 급성 감염 동반 시 (amox/clav, clindamycin)\n\n### 시술\n- **Eye scissor 미세절개·배석** — 표재성 설하샘 돌 (1차 진료 가능)\n- **Sialendoscopy** — ENT\n- **외과적 절제** — 큰 결석·재발·만성 sialadenitis (submandibulectomy)",
      sources: []
    },
    referral: {
      content: "- 미세절개로 안 빠지는 deep stone → ENT (sialendoscopy)\n- **양측성 부음** → CT + ENT (감별진단 광범위)\n- 만성 sialadenitis·반복 감염 → ENT (외과 평가)\n- 농양 형성 → ENT 응급",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["salivary-gland-stones"] = _salivary_stones_v2;
KNOWLEDGE_BUNDLE["sialolithiasis"] = _salivary_stones_v2;
KNOWLEDGE_BUNDLE["타석증"] = _salivary_stones_v2;
KNOWLEDGE_BUNDLE["설하샘 돌"] = _salivary_stones_v2;
KNOWLEDGE_BUNDLE["턱밑샘 돌"] = _salivary_stones_v2;
KNOWLEDGE_BUNDLE["침샘염"] = _salivary_stones_v2;

/* ========== 5-1~5-4 cron deep-extract Liby ingest (Mir-T1 #1 POCUS) ========== */

/* pocus-abdominal — GP 직접 복부 POCUS 적합 영역 (5-2 cron). [CLINICAL — 조건부] */
var _pocus_abdominal_v2 = {
  kind: "topic",
  keywords: ["POCUS","복부초음파","abdominal ultrasound","담석증","cholelithiasis","요로결석","urolithiasis","복부대동맥류","AAA","hydronephrosis","수신증","RUQ POCUS","의뢰 절감"],
  primarySources: [
    "Geivers J et al. Eur J Gen Pract 2026;32(1):2606572. PMID:41528024, DOI:10.1080/13814788.2025.2606572"
  ],
  sections: {
    definition: {
      content: "복부 POCUS(Point-of-Care Ultrasound): GP가 외래에서 즉각 시행하는 초음파. 특정 단순 진단 질문에 대해 방사선과 의뢰를 대체하거나 줄일 수 있는 도구. 네덜란드 GP 의뢰서 1,053건 분석에서 75%가 질환 배제 판독, 대안 진단 발견 <10% — 단순 적응증에서 GP 직접 시행 가능성.",
      sources: []
    },
    indication: {
      content: "### GP 직접 POCUS 적합 4대 영역\n| 영역 | 적합 이유 |\n|---|---|\n| **담석증 (RUQ POCUS)** | 단순 질문(담낭 결석 유무), 심각한 진단 누락 위험 낮음 |\n| **요로결석 (신장 POCUS)** | 수신증(Hydronephrosis) 직접 확인 가능 |\n| **수신증** | 요로폐색 여부 신속 확인 |\n| **복부 대동맥류 (AAA)** | 직경 측정으로 응급 여부 판단 |\n\n### 적합 조건\n1. 단일·명확한 임상 질문 ('담석증 있는가?' / '수신증 있는가?' / 'AAA 배제 가능?')\n2. 이상 소견 없으면 임상 경과관찰로 충분한 환자\n3. 양성 소견 시 즉시 확인·처치 가능한 환경\n\n### 방사선과 의뢰 지속 권고\n- 복부 통증 + 비특이 증상 (여러 감별 필요)\n- 췌장·간 병변 의심 (복잡 해석)\n- 복수·복막 병변 의심",
      sources: []
    },
    precaution: {
      content: "- 네덜란드 GP 시스템 근거 — 한국 외래 직접 적용 시 맥락 검토\n- GP POCUS는 전문 훈련·프로토콜 기반 시행 필요\n- AAA 스크리닝: 최대 직경 측정 정확도·판독 프로토콜 숙지 필수\n- '의료 질문 없는 의뢰' 16% — POCUS 도입 시 명확한 임상 질문 정의 원칙 필요",
      sources: []
    },
    notes: {
      content: "단순 담석증·요로결석 의심 환자에서 방사선과 의뢰 전 RUQ 또는 신장 POCUS 직접 시행 → 의뢰 절감·진료 속도 향상. 외래 AAA 스크리닝도 GP POCUS로 정확도 보고됨.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["pocus-abdominal"] = _pocus_abdominal_v2;
KNOWLEDGE_BUNDLE["복부POCUS"] = _pocus_abdominal_v2;
KNOWLEDGE_BUNDLE["abdominal-pocus"] = _pocus_abdominal_v2;
KNOWLEDGE_BUNDLE["RUQ-POCUS"] = _pocus_abdominal_v2;

/* pocus-lung — 폐 POCUS B-lines 위험 분류 + 현장 프로토콜 (5-2·5-4 cron). [CLINICAL — 조건부] */
var _pocus_lung_v2 = {
  kind: "topic",
  keywords: ["폐 POCUS","lung ultrasound","B-lines","폐초음파","폐렴","위험분류","입원 예측","12구역 스캔","기흉","간질성 증후군","prehospital"],
  primarySources: [
    "Oliva-Fanlo B et al. NPJ Prim Care Respir Med 2026. PMID:42031864, DOI:10.1038/s41533-026-00515-4",
    "Purkarthofer D et al. J Ultrasound Med 2026. PMID:41793408, DOI:10.1002/jum.70218"
  ],
  sections: {
    definition: {
      content: "일차의료 의사가 5시간 표준화 훈련으로 시행 가능한 폐 POCUS. 호흡기 환자 위험 분류·재택의료·자원 제한 환경에서 즉석 의사결정 도구.",
      sources: []
    },
    protocol: {
      content: "### 12구역 스캔 프로토콜\n전흉부·측흉부·후흉부 양측 — 총 12구역 체계적 스캔, 각 구역에서 B-lines 수 기록.\n\n### POCUS 양성 기준\n| 소견 | 의미 |\n|---|---|\n| **B-lines ≥3개/구역** (1개 이상 구역) | 폐 부종·염증 신호 |\n| 흉막 이상 + 흉막하 경결 | 폐렴 가능성 |\n| 엽성 경결 | 폐렴 고위험 |\n\n### 즉석 의사결정 흐름\n```\n호흡기 증상 환자 → 폐 POCUS 12구역 스캔\n  ↓\nB-lines ≥3/구역 + 흉막 이상?\n  ↓ 예                       ↓ 아니오\n입원 의뢰 강력 고려         SpO₂·활력징후 정상이면\n+ 연령>50·SpO₂<95%·        외래 경과관찰 가능\n  당뇨·고혈압 종합 판단\n```\n\n### 핵심 수치 (n=624 COVID-19 환자, 스페인 일차의료)\n- B-lines 양성 입원 독립 예측: **RR 1.34** (95% CI 1.07–1.67)\n- 폐렴 진단 민감도 68.3% / 특이도 43.6% / PPV 78.7% / NPV 31.1%\n- POCUS 양성 환자 병원 의뢰율 72.4% vs 음성 22.8% (OR 8.83)\n\n### 현장(병원 전) 프로토콜 — 기흉·간질성 증후군 감별 [CLINICAL]\n오스트리아 구급대 표준 프로토콜:\n- 기흉 + 간질성 증후군(B-lines 패턴) 신속 감별\n- 표준 스캔 시퀀스 + 시간 제한 + 표준 문서화 + 훈련/QA\n- 외래·응급 POCUS 입문자 훈련 모델 벤치마킹 가능",
      sources: ["Oliva-Fanlo 2026 PMID:42031864","Purkarthofer 2026 PMID:41793408"]
    },
    precaution: {
      content: "- 폐 POCUS는 보조 도구 — 임상 판단·SpO₂·병력 우선\n- 음성 POCUS가 폐렴 배제 의미 X (NPV 31.1%)\n- 표준화 훈련·프로토콜 없이 시행 시 판독 오류 위험\n- 비만·흉막 유착·피하기종 등 음창 획득 어려움\n- COVID-19 단일 맥락 연구 — 일반 호흡기 감염 외삽 시 주의",
      sources: []
    },
    notes: {
      content: "자원 제한 환경(CT·X-ray 즉시 불가)·재택의료·방문 진료 환경에서 즉각 위험 분류 도구로 가치. POCUS 단독으로 폐렴 진단 X — 임상 변수(연령·SpO₂)와 종합 판단.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["pocus-lung"] = _pocus_lung_v2;
KNOWLEDGE_BUNDLE["폐POCUS"] = _pocus_lung_v2;
KNOWLEDGE_BUNDLE["lung-ultrasound"] = _pocus_lung_v2;
KNOWLEDGE_BUNDLE["B-lines"] = _pocus_lung_v2;

/* msk-injection-therapy — 근골격 주사 치료 + 외측상과염 RCT (5-2·5-4 cron). [CLINICAL] */
var _msk_injection_v2 = {
  kind: "topic",
  keywords: ["근골격 주사","MSK injection","코르티코스테로이드","corticosteroid","히알루론산","hyaluronic acid","prolotherapy","PRP","혈소판농축혈장","초음파 유도","ultrasound-guided injection","외측상과염","tennis elbow","lateral epicondylitis"],
  primarySources: [
    "Sako B et al. FP Essent 2026 Feb;561:14-22. PMID:41838996",
    "Raeissadat SA et al. Future Sci OA 2026. PMID:41972873, DOI:10.1080/20565623.2026.2644326"
  ],
  sections: {
    comparison: {
      content: "### 주사 재질별 비교\n| 재질 | 효과 근거 | 장점 | 단점 |\n|---|---|---|---|\n| **코르티코스테로이드** | 광범위·항염 명확 | 빠른 통증 완화·급여 | 반복 시 연골독성·단기 효과 |\n| **히알루론산 (HA)** | 통증 완화·낮은 위험 | 낮은 부작용 | 비급여·효과 비교 데이터 혼재 |\n| **프롤로 치료 (Prolotherapy)** | 낮은 위험·일부 지지 | 비교적 안전 | 비급여·보험 미적용 |\n| **혈소판 농축 혈장 (PRP)** | 다양한 적응증 혼재된 결과 | 자가 혈액 활용 | 고비용·근거 혼재 |\n| **줄기세포 치료** | 실험적 단계 | — | 미확립·비급여 |\n\n### 외측상과염 — 3제 비교 RCT (n=90, 8주·6개월 추적)\n| 군 | 8주 | 6개월 |\n|---|---|---|\n| Methylprednisolone | 유의 개선 | 유의 개선 |\n| 저백혈구 PRP | 유의 개선 | 유의 개선 |\n| 의료용 오존 | 유의 개선 | 유의 개선 |\n| **군간 비교** | **유의 차이 없음** | **유의 차이 없음** |\n\n→ **6개월 시점 동등 효과** — 약제 선택 기준은 환자 선호·비용·발현 속도. 환자가 'PRP가 더 낫다'고 주장 시 '6개월 결과는 세 가지 모두 통계 동등'으로 상담 가능.",
      sources: ["Raeissadat 2026 PMID:41972873"]
    },
    protocol: {
      content: "### 코르티코스테로이드 — 실전 처방\n**적응증**: 급성·아급성 활막염 (관절 내) / 점액낭염 (Bursitis) / 건초염 (Tenosynovitis — 이두근·회전근개·방아쇠 수지) / 주관절·고관절 점액낭염\n\n**연골독성 주의 원칙**:\n- 동일 관절 1년 내 **3회 초과 주사 회피**\n- 주사 후 2~3일 활동 제한 (연골 보호)\n- 당뇨 환자: 주사 후 1~3일 혈당 상승 가능 — 사전 교육\n\n**대표 약물**: Triamcinolone acetonide 10~40mg (관절 크기에 따라) / Betamethasone (장기 작용) / Methylprednisolone acetate\n\n### 초음파 유도 주사 (POCUS-Guided)\n**장점**:\n- 정확도: 표적 구조 직접 시각화\n- 안전성: 혈관·신경 회피\n- **이전에 전문과 의뢰가 필요했던 시술을 FM 외래에서 가능**\n\n**적합 시술**: 깊은 부위 관절(고관절·견봉하·腱 주위) / 신경 주변 / 건 파열 위험 부위 / 소관절\n\n**랜드마크 vs 초음파 유도**:\n- 큰 관절(무릎·어깨·팔꿈치)에서는 동등 효과 가능\n- 복잡 해부·비만·반복 주사 시 초음파 유도 우선",
      sources: ["Sako 2026 PMID:41838996"]
    },
    referral: {
      content: "- 스테로이드 3회 이상 필요 예상 → PRP·초음파 유도 HA 고려 또는 정형외과\n- 인대 손상·건 파열 동반 → MRI + 정형외과\n- 초음파 유도 없이 시행 시 위험한 부위 → 통증의학과·근골격 전문의",
      sources: []
    },
    precaution: {
      content: "- 주사 부위 감염·피부 취약 → 시행 금지\n- 항응고제 사용 중 → 출혈 위험 평가 후 결정\n- 면역억제 상태 → 감염 위험 신중 판단\n- 당뇨 환자: 코르티코스테로이드 후 혈당 모니터링 교육\n- 스테로이드 주사 무반응: 진단 재검토 (구조 손상·악성)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["msk-injection-therapy"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["근골격주사"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["MSK-injection"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["lateral-epicondylitis"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["외측상과염"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["테니스엘보"] = _msk_injection_v2;
KNOWLEDGE_BUNDLE["ultrasound-guided-injection"] = _msk_injection_v2;

/* ========== 5-1~5-4 cron Liby ingest (Batch 2 — 완화·EOL·deprescribing) ========== */

/* palliative-pain v2 보강 — 임종기 deprescribing·암성 신경병증·AFP EOL (5-2·5-4 cron) */
var _palliative_pain_v2_full = {
  kind: "disease",
  keywords: ["완화의료","palliative care","buprenorphine","부프레노르핀","오피오이드","암성통증","경피패치","transdermal","호스피스","EOL","end of life","deprescribing","LBM","steroid","corticosteroid","neuropathic pain"],
  primarySources: [
    "Jose V et al. J Pain Symptom Manage 2025;71(5):e525-e539. PMID:41475688",
    "Thorpe JM et al. J Am Geriatr Soc 2026 Apr 2. PMID:41925169",
    "Koike R et al. J Pain Symptom Manage 2026 Feb 5;71(5):668-675.e1. PMID:41654095",
    "McGregor TL et al. Am Fam Physician 2025 Nov;112(5):493-503. PMID:41252832"
  ],
  sections: {
    definition: {
      content: "부프레노르핀(Buprenorphine)은 부분 오피오이드 작용제(μ 부분 작용, κ/δ 길항)로, 완화의료에서 모르핀·펜타닐 등 완전 작용제와 동등한 진통 효과를 보이는 대안 오피오이드. 경피 패치 형태가 연하 곤란·장 기능 저하 환자에 특히 유리. 완화의료 영역은 부프레노르핀 외에도 임종기 deprescribing·암성 신경병증·AFP 가정의학과 EOL 관리 통합.",
      sources: []
    },
    notes: {
      content: "### 부프레노르핀 효능 핵심 수치 (Jose 2025)\n| 비교 | 결과 |\n|---|---|\n| 단기 부프레노르핀 vs 모르핀·트라마돌·펜타닐 | 동등 진통 (6/6 RCT) |\n| 장기 부프레노르핀 vs 장기 펜타닐·모르핀·옥시코돈 | 동등 또는 우월 (4/5 RCT) |\n| 경피 부프레노르핀 vs 위약 | 유의 진통 (전 연구) |\n| 부작용 프로파일 | 완전 작용제와 통계 차이 없음 |",
      sources: []
    },
    protocol: {
      content: "### 부프레노르핀 형태별 적응\n| 제형 | 특징 | 적합 환자 |\n|---|---|---|\n| **경피 패치** | 72시간 또는 7일 교체; 연하 불필요 | 연하곤란·오심·장 기능 저하 말기 |\n| 설하정 | 빠른 흡수; 구강 점막 흡수 | 경구 불가하나 구강 점막 가능 |\n| 정맥/근주 | 빠른 작용 | 입원·CICU |\n\n### 모르핀 환산\n- 경피 부프레노르핀 35 μg/h ≈ 경구 모르핀 60–80mg/일 (대략적 — 모니터링 필수)\n- 오피오이드 전환 시 전문의/호스피스 협력 권고",
      sources: []
    },
    precaution: {
      content: "- 완전 작용제 → 부프레노르핀 전환 시 **오피오이드 금단 주의** — 마지막 완전 작용제 후 12~24시간 경과 후 시작 (또는 전문가 지도)\n- 천장 효과(ceiling): 호흡 억제는 천장(안전성 장점), 진통은 선형 유지\n- 신기능 저하: 간(CYP3A4) 대사 — 신부전 상대적 안전 (모르핀의 M6G 축적 문제 없음)",
      sources: []
    },
    comparison: {
      content: "| 특성 | 부프레노르핀 | 모르핀 | 펜타닐 |\n|---|---|---|---|\n| 진통 효과 | 동등 | 표준 | 동등 |\n| 투여 경로 | 경피/설하/IV | 경구/IV/SC | 경피/IV |\n| 신부전 시 | 안전 | 주의 (M6G 축적) | 안전 |\n| 오피오이드 의존 우려 | 낮음 | 높음 | 높음 |\n| 연하곤란 시 | 경피 패치 유리 | 경구 불가 | 경피 가능 |\n| 부작용 | 모르핀과 유사 | 표준 | 변비 적음 |",
      sources: []
    },
    "eol-deprescribing": {
      content: "### 임종기 비필수 약물 중단 (Thorpe 2026 PMID:41925169)\n후향 코호트 n=37,193 재향군인 임종자 (≥65세 지역사회).\n\n**핵심 수치**:\n- 임종 전 마지막 1년 시작 시점 **73%**가 LBM(이익 제한 약물) 복용\n- LBM 중단 경험: **22.0%** → 78%가 임종까지 LBM 지속\n- 전문 완화의료 연계 환자: LBM 중단률 **유의 ↑**\n\n### LBM 예시\n| 약물군 | 임종기 재검토 이유 |\n|---|---|\n| 스타틴 | 장기 심혈관 이익 — 임종 수개월 내 편익 없음 |\n| 경구 혈당강하제 | 저혈당 위험 + 삶의 질 이익 없음 |\n| 항고혈압제 | 낙상·기립성 저혈압 위험 |\n| 항혈전제 | 출혈 vs 이익 재검토 |\n| 위산 억제제 (PPI) | 무증상 예방 사용 중단 |\n| 항치매제 (ChEI·메만틴) | 기능 보존 불가 단계 중단 고려 |\n\n### 시작 기준\n- 기대 여명 < 6개월 (또는 hospice 전환 시점)\n- 환자·가족과 '편안함 중심 치료' 목표 합의\n- 완화의료 팀 협진 → 중단률 유의 ↑\n\n### 환자/가족 대화 예시\n> '지금 복용하시는 약 중에 앞으로 도움이 되지 않는 것들이 있습니다. 줄여서 드시기 편하게 해드리는 게 어떨까요?'",
      sources: []
    },
    "cancer-neuropathic-pain": {
      content: "### 암성 신경병증 통증 — 코르티코스테로이드 반응 예측 (Koike 2026 PMID:41654095)\n전향 다기관 관찰 코호트 n=97 (일본 17개 완화의료, 무작위 X) [CLINICAL — 조건부]\n\n**다변수 로지스틱 회귀 결과 (반응 예측 인자)**:\n| 예측 인자 | 통계 | 임상 의미 |\n|---|---|---|\n| **정상 WBC (≤8,500/μL)** | p=.005 | 염증 과부하 없는 환자 → 스테로이드 반응 기대 |\n| **낮은 KPS (≤40)** | p=.008 | 전신상태 저하에서 역설적 반응↑ |\n| **두개내 종양 기원** | p=.082 (경계) | 뇌부종·압박 기전 → 스테로이드 반응 기대 |\n\n결과 분포: 97명 중 50명(52%) 통증 완화, 47명 무반응.\n\n**임상 적용**:\n- 암성 신경병증 통증 스테로이드 처방 전 WBC·KPS·종양 위치 확인\n- WBC ≤8,500 + KPS ≤40 + 두개내 기원 → 스테로이드 시도 타당\n- 반대 조건 → 효과 기대 낮음, 대안 고려",
      sources: []
    },
    "afp-eol-management": {
      content: "### 임종기 완화의료 — 가정의학과 역할 (McGregor AFP 2025 PMID:41252832)\n[초록 기반 — 전문 미확인]\n\n### 증상별 처방 원칙\n| 증상 | 1차 접근 | 추가 |\n|---|---|---|\n| **통증·호흡곤란** | 오피오이드 우선 | 자세·냉각·마사지 |\n| **오심** | 원인 수용체 타깃 | 촉진 인자 제거 |\n| **변비** | 삼투성+자극성 하제 동시 예방 | 중증 오피오이드 변비 → 직장관장·μ-길항제 |\n| **식욕부진** | 대부분 특별 치료 불필요 | 자극제: 연하·오심·변비 해결 후 |\n| **섬망** | 조기 인식·원인 약물 감량·지남력 교정 | 향정신약 최소화 |\n| **기분장애** | 슬픔·인지저하와 구별 | 예후·치료 발현 시간 고려 |\n\n### 임종기 오피오이드 원칙\n- 통증 + 호흡곤란 → 오피오이드 핵심 치료\n- 보조 약물·비약물 중재로 필요량 지연·감소 가능\n- **오피오이드 사용 = 삶 단축 X (이중효과 원칙)**\n\n### 가정의학과 단독 처치 범위\n- 경구 오피오이드 조절·하제·항구역제\n- 섬망 원인 약물 감량·가족 교육\n- 전문 완화의료 의뢰 전 증상 조절 유지 가능",
      sources: []
    },
    referral: {
      content: "- 완화의료 통증 조절 시작 시 — 호스피스·완화의학 팀 초기 협력\n- 오피오이드 rotation 필요 → 완화의학·통증의학과\n- 말기 환자 — 가정 호스피스 팀 연계\n- 임종기 deprescribing — 완화의료 팀 협진 권고",
      sources: []
    },
    counseling: {
      content: "### 암환자의 '원인' 욕구 [INSIGHTS — by 미르 관찰]\n\n암환자들은 '원인'을 항상 알고 싶어한다. 내가 왜 걸린 건지, 유전인지, 환경인지, 무슨 인자가 있는 건지. 전근대에는 그것을 죄나 업보로 해석했다. 사람들은 **'설명'되기를 원하며 적절한 설명을 들으면 마음을 놓는 것 같다**.\n\n### 임상 함의\n- **답할 수 없는 질문에도 답하려는 시도가 정서적 의미** — '정확한 원인은 알기 어렵지만…'으로 시작\n- 가족력 / 환경 / 흡연 / 식이 / 감염 등 **알려진 위험인자 점검·언급**\n- 환자가 '내 잘못 아닌데' 안심할 수 있는 framing — 자책·죄의식 완화\n- 모를 때는 **'많은 경우 명확한 단일 원인은 없습니다'** — 솔직함이 신뢰\n- **시간을 충분히** — 1–2분 설명이 환자 만족도·치료 순응도에 큰 영향\n\n### 전근대 vs 현대\n- 전근대: 죄·업보·악령\n- 현대: 유전·환경·생활습관·확률\n- 공통: **사람은 '설명되지 않은 고통'을 견디기 매우 어려워함** → 의사가 의미 부여(meaning-making) 역할",
      sources: []
    }
  },
  uiHooks: {
    hint: ["protocol","eol-deprescribing","cancer-neuropathic-pain","afp-eol-management","counseling","referral","contraindication","precaution","pregnancy"],
    guide: ["*"],
    triage: ["differential"],
    draftAppend: ["draft-append"]
  }
};
KNOWLEDGE_BUNDLE["palliative-pain"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["완화의료"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["buprenorphine"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["부프레노르핀"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["EOL-deprescribing"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["임종기"] = _palliative_pain_v2_full;
KNOWLEDGE_BUNDLE["cancer-pain-steroid"] = _palliative_pain_v2_full;

/* goals-of-care-acp — ACP·GOC 7대 핵심 요소 + 외래 적용 (5-2 cron). [INSIGHTS] */
var _goc_acp_v2 = {
  kind: "topic",
  keywords: ["ACP","사전돌봄계획","goals of care","GOC","완화의료","임종기","advance care planning","의사소통","EHR","구조화 대화","POLST","DNAR"],
  primarySources: [
    "Ma JE et al. J Pain Symptom Manage 2026;71(5):e579-e590. PMID:41548727, DOI:10.1016/j.jpainsymman.2026.01.006"
  ],
  sections: {
    definition: {
      content: "Goals of Care(GOC) 대화는 중증 질환 환자의 삶의 질·환자/가족 만족도·의료비 절감과 연관. 그러나 실제 임상에서 질환 말기에야 이루어지거나 전혀 안 일어나는 경우 많음.",
      sources: []
    },
    protocol: {
      content: "### 효과적 GOC 이니셔티브 7대 핵심 요소 (미국 8개 의료기관 비교)\n| # | 핵심 요소 | 실전 내용 |\n|---|---|---|\n| 1 | **이니셔티브 목적 정의** | GOC 대화 목표를 기관·팀 차원에서 명확화 |\n| 2 | **대상 환자군 식별** | 진단 코드·AI 알고리즘·입원 기간 등으로 자동 식별 |\n| 3 | **핵심 이해관계자 참여** | 환자·보호자·일선 의료진·리더십 모두 |\n| 4 | **대화 촉진** | 의료진 교육 + EHR 프롬프트·알림 |\n| 5 | **EHR 문서화** | 대화 내용·결정 사항 EHR 공식 기록 |\n| 6 | **데이터 측정** | 완료율·시기 추적 |\n| 7 | **지속성·확장성** | 리더십 지원·재정으로 시스템 내재화 |\n\n### 일차의료 외래 적용\n**GOC 시작 트리거 (고위험 환자)**:\n- 말기 만성질환 (CKD G4-5, 중증 심부전, COPD GOLD III-IV, 전이암)\n- 최근 입원·악화\n- 연령 ≥75세 + 다중 이환\n- 허약 점수 (CFS ≥5)\n\n**대화 구조 7요소 → 외래 적용**:\n1. **목적**: '오늘은 앞으로의 치료 방향에 대해 함께 이야기하고 싶습니다'\n2. **대상**: EHR 자동 알림 또는 진단 기반 선별\n3. **이해관계자**: 가능하면 가족·주 돌봄자 동석\n4. **대화 유도**: '가장 두려우신 것은 무엇인가요?' '어떤 상태가 되면 집에서 지내고 싶으신가요?'\n5. **EHR 기록**: 진료 기록 요약 + POLST/DNAR 연동\n6. **측정**: 다음 방문 재확인 추적\n7. **지속**: 정기 재검토 (상태 변화 시 update)",
      sources: []
    },
    notes: {
      content: "### ACP 핵심 질문 예시\n- '지금 가장 중요하게 생각하시는 것이 무엇인가요?'\n- '치료가 어렵거나 힘들어지는 상황에서 어떻게 하기를 원하시나요?'\n- '가족에게 돌봄 결정을 맡기신다면, 어떤 방향을 원하시는지 알고 계신가요?'\n- '집에서 편안하게 지내는 것과 병원에서 적극 치료하는 것 중 어느 쪽이 더 중요하신가요?'",
      sources: []
    },
    referral: {
      content: "- 복잡한 GOC 결정 → 완화의료 팀 협진\n- 가족 갈등·의사결정 대리인 불명확 → 사회복지사·의료윤리팀\n- 호스피스 전환 상담 → 완화의학과",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["goals-of-care-acp"] = _goc_acp_v2;
KNOWLEDGE_BUNDLE["사전돌봄계획"] = _goc_acp_v2;
KNOWLEDGE_BUNDLE["ACP"] = _goc_acp_v2;
KNOWLEDGE_BUNDLE["GOC"] = _goc_acp_v2;
KNOWLEDGE_BUNDLE["advance-care-planning"] = _goc_acp_v2;

/* deprescribing — 부적절 처방 선별·캐나다 가이드라인 (5-4 cron). [CLINICAL + REGULATORY] */
var _deprescribing_v2 = {
  kind: "topic",
  keywords: ["deprescribing","부적절 처방","PIP","STOPP","START","Beers","노인 다약제","polypharmacy","medication review","처방 최적화","STOPP-Frail"],
  primarySources: [
    "McDonald EG et al. Can Fam Physician 2026 Mar;72(3):173-178. PMID:41844291, DOI:10.46747/cfp.7203173"
  ],
  sections: {
    protocol: {
      content: "### 캐나다 일차의료 권고 (2026)\n\n**권고 1 (강력, 중등도 근거)**: ≥65세 성인은 약물 적절성 최적화를 위한 **처방 점검(Prescription Checkup) 또는 관련 중재**를 받아야 함. 효과적 중재 형태: 처방의·약사가 **구조적 접근법 또는 규칙 기반 도구** 사용. 도구 예: STOPP/START, Beers, RAMQ.\n\n**권고 2 (강력, 중등도 근거)**: 정부는 약물 적절성 중재를 **재정 지원**해야 함.\n\n### 구조적 접근 도구\n| 도구 | 대상 | 활용 |\n|---|---|---|\n| **STOPP/START** | ≥65세 | 부적절(STOPP) + 누락(START) 동시 검출 |\n| **Beers Criteria** | ≥65세 (미국) | 노인 부적절 약물 목록 |\n| **STOPP-Frail** | 허약 노인 | 완화 목적 처방 최소화 |\n\n### 외래 적용 프로세스\n1. ≥65세 환자 → 연 1회 처방 전체 재검토 루틴화\n2. STOPP 도구로 부적절 약물 flagging\n3. 처방의·약사 협력: 확인·중단·대체\n4. 환자·보호자 상담 (중단 이유·기대 효과)\n5. 중단 후 추적: 증상 재발·금단 모니터링",
      sources: []
    },
    notes: {
      content: "### 우선 재검토 약물군\n| 약물군 | 재검토 이유 |\n|---|---|\n| PPI | 장기 무증상 예방 사용 → 중단 시도 |\n| 수면진정제 (BZD·Z-drug) | 낙상·인지저하·의존 |\n| 항콜린 약물 | ACB 1도 낮은 부하도 영향 |\n| 스타틴 (임종기) | 단기 환자 이익 없음 |\n| 경구 혈당강하제 (임종기) | 저혈당 위험 vs 이익 |\n| 항고혈압제 (임종기·낙상) | 낙상 위험 vs 이익 |",
      sources: []
    },
    precaution: {
      content: "- 처방 중단 시 **점진 감량** — 급격 중단은 금단·반동 위험 (BZD·오피오이드·스테로이드·베타차단제)\n- 중단 후 증상 재발 시 재처방 가능 — 중단이 '실패'가 아님\n- 환자/가족 설명: '덜 먹는 게 더 건강할 수 있습니다' 메시지",
      sources: []
    },
    referral: {
      content: "- 복잡 다약제(≥10종) + 다중이환 → 노인의학과 (CGA)\n- 약물 상호작용 고복잡도 → 임상약사 협진\n- 항응고제·항경련제·항정신병약 중단 → 전문과 협의 필요\n- 관련: [[frailty]] (허약 노인 다약제), [[palliative-pain]] (임종기 LBM 중단), [[prescribing-cascade]] (처방 연쇄)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["deprescribing"] = _deprescribing_v2;
KNOWLEDGE_BUNDLE["부적절처방"] = _deprescribing_v2;
KNOWLEDGE_BUNDLE["PIP"] = _deprescribing_v2;
KNOWLEDGE_BUNDLE["STOPP-START"] = _deprescribing_v2;
KNOWLEDGE_BUNDLE["medication-review"] = _deprescribing_v2;

/* ========== 5-1·5-2 cron Liby ingest (Batch 3 — 신경·정신) ========== */

/* migraine — 편두통 예방 (5-1 cron). [CLINICAL + REGULATORY] */
var _migraine_v2 = {
  kind: "disease",
  keywords: ["편두통","migraine","두통","headache","propranolol","metoprolol","topiramate","valproate","CGRP","erenumab","amitriptyline","botox","botulinumtoxin","만성편두통"],
  primarySources: [
    "Moreland P et al. Am Fam Physician 2025;111(5):443-450. PMID:40378325"
  ],
  sections: {
    indication: {
      content: "### 예방치료 적응증 [REGULATORY]\n다음 중 하나 이상 해당 시 예방치료 고려:\n- **편두통 빈도↑** (월 4회 이상이 일반적 기준)\n- **급성 치료 실패** 또는 금기\n- **급성 치료제 과사용** (오남용 두통 위험)\n- **환자 선호** (예방치료 원하는 경우)\n\n**예방치료 목표**: 두통 중증도·빈도 감소 / 급성 치료 반응 개선 / 장애일수 감소 / 삶의 질 향상 / 환자 주도권 부여",
      sources: []
    },
    protocol: {
      content: "### 1차 약물\n| 약물 | 특이사항 |\n|---|---|\n| **Propranolol** | 베타차단제; 고혈압 동반 시 유리 |\n| **Metoprolol** | 베타차단제; 천식·COPD 금기 |\n| **Topiramate** | 항경련제; **임신 금기**(기형), 체중 감소 부작용 |\n| **Divalproex / Valproate** | 항경련제; **임신 금기**, 체중 증가 |\n| **CGRP 수용체 길항제** (erenumab 등) | 편두통 특이 예방약; **비용·보험 장벽** 현실적 |\n\n### 2차 약물\n| 약물 | 특이사항 |\n|---|---|\n| **Amitriptyline** | TCA; 부작용(진정·구강건조) 많음 |\n| **Venlafaxine** | SNRI; 근거 수준 상대적 낮음 |\n\n### 만성 편두통 (월 15일 이상)\n- **OnabotulinumtoxinA (Botox)** 만성 편두통 예방 승인, 다른 약물과 동등 효과, 내약성 우수, **중단율 낮음**\n- 보험급여 기준 확인 필요 (국내: 신경과 처방 영역)",
      sources: []
    },
    precaution: {
      content: "### 흔한 편두통 유발 요인 — 환자 교육·일지 권고\n- 알코올, 불안/스트레스, 탈수, 과도한 카페인\n- 눈 피로, 공복, 수면 부족, 극도 피로",
      sources: []
    },
    notes: {
      content: "### 비약물 치료\n| 방법 | 근거 수준 |\n|---|---|\n| **인지행동치료(CBT)** | 지지 근거 있음 |\n| **침술(Acupuncture)** | 지지 근거 있음 |\n| **운동** | 지지 근거 있음 |\n| 신경 자극기 | 다양한 근거 |\n| Feverfew, 마그네슘, 멜라토닌 | 효과 있음; 일반적 내약성 양호 |",
      sources: []
    },
    referral: {
      content: "- **일차의료 처방 가능**: propranolol, metoprolol, topiramate, amitriptyline\n- CGRP 길항제: 비용 장벽 상담 후 처방 여부 결정\n- Botox / 신경자극기: 신경과 의뢰\n- 예방치료 2~3종 실패 시 신경과 의뢰\n- 관련: [[dizziness]] (편두통성 어지럼증·전정 편두통 감별)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["migraine"] = _migraine_v2;
KNOWLEDGE_BUNDLE["편두통"] = _migraine_v2;
KNOWLEDGE_BUNDLE["만성편두통"] = _migraine_v2;
KNOWLEDGE_BUNDLE["CGRP"] = _migraine_v2;

/* ischemic-stroke-prevention — 재발성 허혈성 뇌졸중 이차예방 (5-2 cron). [CLINICAL] */
var _stroke_prevention_v2 = {
  kind: "disease",
  keywords: ["뇌졸중","stroke","TIA","이차예방","항혈소판","항응고제","antiplatelet","anticoagulation","아스피린","클로피도그렐","DAPT","심방세동","NOAC","스타틴","경동맥 협착","CEA","OSA"],
  primarySources: [
    "Ford B et al. Am Fam Physician 2026 Jan;113(1):57-69. PMID:41544282"
  ],
  sections: {
    definition: {
      content: "허혈성 뇌졸중: 전체 뇌졸중의 **87%**. 5년 내 재발률 **12%**. 이차예방 핵심: **원인 파악 + 위험인자 조절 + 적절한 항혈전 요법**.",
      sources: []
    },
    protocol: {
      content: "### 원인별 항혈전 전략\n| 뇌졸중 원인 | 1차 항혈전 | 비고 |\n|---|---|---|\n| **비색전성** (죽상경화·소혈관) | 항혈소판 | 아스피린 단독 또는 아스피린+클로피도그렐 |\n| **AF 동반** | 항응고제 | NOAC 우선 (와파린 대비 비열등 이상) |\n| **원인 불명 (Cryptogenic)** | 장기 심장 모니터링 후 결정 | 잠복성 AF 발견 시 항응고제 전환 |\n\n### TIA / 경미한 뇌졸중 초기 (21일 이내)\n- **이중 항혈소판 (DAPT)**: 아스피린 + 클로피도그렐 — **단기(21일)** 사용 후 단독 전환\n- **21일 초과 DAPT 금지** — 출혈 위험 증가\n\n### 혈압 조절\n- **목표: 130/80 mmHg 미만**\n- 뇌졸중 후 혈압 조절이 재발 예방 가장 중요한 단일 인자\n- 약물: ACEi 또는 ARB + 이뇨제 조합 일반적 선호\n\n### 스타틴 치료\n- **모든 허혈성 뇌졸중·TIA 환자에게 스타틴 권고 (원인 무관)**\n- 강도: 고강도 (atorvastatin 40~80mg or rosuvastatin 20~40mg)\n- LDL-C 목표: **<70 mg/dL**\n- 출혈성 뇌졸중 병력 시 개별화 필요\n\n### 위험인자 통합 관리\n| 위험인자 | 목표 / 개입 |\n|---|---|\n| 혈압 | <130/80 mmHg |\n| 혈당 | HbA1c 개별화 (고령·인지저하 시 완화) |\n| 지질 | LDL-C <70 mg/dL |\n| 식이 | 지중해식 / DASH |\n| 운동 | 주 150분 중강도 유산소 |\n| 흡연 | 완전 금연 |\n| 음주 | 과도한 음주 중단 |\n| **OSA** | 스크리닝 + CPAP |",
      sources: []
    },
    monitoring: {
      content: "- **원인 불명 뇌졸중**: 24~48h ECG 외에 **장기 심장 모니터링** (30일+ 홀터 또는 삽입형 루프) — 잠복성 AF 발견 시 항응고제 전환\n- AF 진단 후 항응고제 시작: 출혈 전환 위험 고려해 뇌졸중 후 **4~14일** 후 시작 권고",
      sources: []
    },
    referral: {
      content: "### 경동맥 협착\n- 경동맥 협착 + TIA·동측 뇌졸중 → 혈관외과/신경외과\n  - **≥70% 협착**: 경동맥 내막절제술(CEA) 우선 고려\n  - 50~69%: 선택적 — 수술 위험 vs 이익 개별화\n- 난원공 개존(PFO) + 원인 불명 뇌졸중 → 신경과·순환기 (폐쇄술 고려)",
      sources: []
    },
    precaution: {
      content: "- 항혈소판 + 항응고제 병합 → 출혈 위험 크게 증가 — AF 동반 뇌졸중에서 항혈소판 중단하고 항응고제 단독\n- 출혈성 뇌졸중 병력: 스타틴·항혈소판제 신중 재검토\n- 신기능 저하 환자: NOAC 용량 조정\n- 관련: [[sleep-apnea]] (OSA 스크리닝·CPAP)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["ischemic-stroke-prevention"] = _stroke_prevention_v2;
KNOWLEDGE_BUNDLE["뇌졸중예방"] = _stroke_prevention_v2;
KNOWLEDGE_BUNDLE["허혈성뇌졸중"] = _stroke_prevention_v2;
KNOWLEDGE_BUNDLE["TIA"] = _stroke_prevention_v2;
KNOWLEDGE_BUNDLE["DAPT"] = _stroke_prevention_v2;
KNOWLEDGE_BUNDLE["secondary-stroke-prevention"] = _stroke_prevention_v2;

/* opioid-use-disorder — OUD·MOUD·금단·과다복용 (5-2 cron). [CLINICAL] */
var _oud_v2 = {
  kind: "disease",
  keywords: ["OUD","오피오이드 사용장애","opioid use disorder","MOUD","부프레노르핀","buprenorphine","메타돈","methadone","날트렉손","naltrexone","날록손","naloxone","과다복용","overdose","금단증상","Suboxone","로페시딘","clonidine"],
  primarySources: [
    "Harris MTH et al. JAMA 2026;335(11):986-998. PMID:41671014, DOI:10.1001/jama.2025.26348"
  ],
  sections: {
    definition: {
      content: "OUD는 강박적 오피오이드 사용으로 직장·학교·가정 기능 장애 및 심각한 고통을 초래하는 질환. 세계 3위 물질사용장애. 미국 2022년 유병률 3.7% (~937만 명).",
      sources: []
    },
    notes: {
      content: "### 핵심 수치\n- OUD 환자 중 MOUD 치료율: **25.1%** (2022) — 심각한 치료 공백\n- MOUD vs 미사용 — all-cause 사망률: **aHR 0.52** (95% CI 0.42–0.63)\n- 지역사회 날록손 배포 → 과다복용 사망률 **25~46% 감소**",
      sources: []
    },
    comparison: {
      content: "### MOUD 3종 비교\n| 약물 | 처방 장소 | 사망률 감소 | 특이사항 |\n|---|---|---|---|\n| **부프레노르핀** | 외래 처방 가능, 가정 복용 | ✓ | 부분 작용제; 단독 or 날록손 복합(Suboxone) |\n| **메타돈** | 연방 규정 클리닉 직접 방문만 | ✓ | 완전 작용제; 접근성 제한 |\n| **날트렉손** | 외래 처방 가능, 가정 복용 | 데이터 제한적 | 길항제; 금단 후 7~14일 경과 후 시작 |\n\n**처방 원칙**: 공유 의사 결정으로 선택. 부프레노르핀이 외래 처방 접근성 최고 — 일차의료에서 직접 처방 가능.",
      sources: []
    },
    protocol: {
      content: "### 오피오이드 금단 관리\n**금단 증상**: 불안·불면·통증·오심·구토·설사\n\n| 약물 | 역할 |\n|---|---|\n| **부프레노르핀 또는 메타돈** | 오피오이드 작용제 — 금단 완화 (동시 MOUD 시작) |\n| **로페시딘 (Lofexidine)** | α2 작용제 — 자율신경 금단 (미국 FDA 승인) |\n| **클로니딘 (Clonidine)** | α2 — 로페시딘 대안 (저혈압 주의) |\n| **이부프로펜** | 통증 |\n| **온단세트론** | 오심·구토 |\n\n⚠ 금단 치료 후 **반드시 MOUD 연결** — 금단만 치료하고 MOUD 없으면 사망률 감소 없음 (aHR 0.52는 MOUD 지속 기반)\n\n### 오피오이드 과다복용 응급\n**날록손 (Naloxone)**:\n| 경로 | 용량 |\n|---|---|\n| 근주 (IM) | 0.4 mg |\n| 비강 (Intranasal) | 2~4 mg |\n\n- **목표**: 정상 호흡수 회복에 필요한 **최소 용량** (과다 투여 시 급성 금단)\n- 작용 시간 30~90분 — 오피오이드 지속 시 반복 투여\n- **지역사회 배포**: OUD 환자·가족에게 날록손 처방 → 사망률 25~46% ↓",
      sources: []
    },
    referral: {
      content: "- OUD + 공존 정신질환 → 정신건강의학과 협진\n- 메타돈 치료 필요 → 중독 전문 클리닉\n- 복합 물질 사용장애 → 통합 중독 치료 프로그램\n- **한국 내 마약류 처방 규정·MOUD 적용 범위 확인 필수**",
      sources: []
    },
    precaution: {
      content: "- 날트렉손은 오피오이드 완전 중단 후 **7~14일 후 시작** (그 전 투여 시 급성 금단)\n- 부프레노르핀 유도: 경증 금단 발현 후 시작 (COWS 점수 확인)\n- 메타돈 **QT 연장 위험** — 심전도 모니터링\n- 한국 의료 환경: MOUD 처방 가능 범위·규정 미국과 다름 — 처방 전 규제 확인 필수",
      sources: []
    },
    counseling: {
      content: "1. **마약성 진통제 장기 처방 환자**: OUD 발생 위험 주기적 스크리닝 (AUDIT-C 변형, DSM-5 기준)\n2. **OUD 진단 시**: 공유의사결정으로 부프레노르핀 외래 처방 시작 고려 (한국 규정 확인)\n3. **날록손 처방 확대**: OUD 환자·고용량 오피오이드 사용자에게 상비 처방 권고\n4. **치료율 25%**: OUD는 만성질환 — '의지 문제' 아님 환자·가족 교육",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["opioid-use-disorder"] = _oud_v2;
KNOWLEDGE_BUNDLE["OUD"] = _oud_v2;
KNOWLEDGE_BUNDLE["MOUD"] = _oud_v2;
KNOWLEDGE_BUNDLE["오피오이드사용장애"] = _oud_v2;
KNOWLEDGE_BUNDLE["naloxone"] = _oud_v2;
KNOWLEDGE_BUNDLE["날록손"] = _oud_v2;

/* ========== 5-1·5-4 cron Liby ingest (Batch 4 — 예방·암·통증) ========== */

/* cervical-cancer-screening — 자궁경부암 스크리닝 (5-1 cron). [REGULATORY] */
var _cervical_screening_v2 = {
  kind: "disease",
  keywords: ["자궁경부암","cervical cancer","HPV","세포검사","Pap smear","스크리닝","ASCCP","USPSTF","primary HPV","KNHSP","CIN"],
  primarySources: [
    "Wiser A et al. Am Fam Physician 2026;113(2):137-144. PMID:41839104"
  ],
  sections: {
    indication: {
      content: "### 스크리닝 대상\n- **무증상 평균위험군** 자궁경부암 스크리닝\n- 자궁경부암: 전 세계 여성 4번째 흔한 암\n- 미국 내 **과소 스크리닝**이 사회경제적 격차와 연관",
      sources: []
    },
    schedule: {
      content: "### 시작 연령 및 주기\n| 기관 | 시작 연령 | 방법 | 주기 |\n|---|---|---|---|\n| **ACS** (미국암학회) | 25세 | Primary HPV 선호 | 5년마다 |\n| **USPSTF 2024 초안** | 30세 | Primary HPV 선호 | 5년마다 |\n| USPSTF 2024 (21~29세) | 21세 | 세포검사 단독 | 3년마다 |\n| **국내 KNHSP** | 만 20세 이상 | 세포검사 | **2년마다** |\n\n### 종료 기준\n**65세** 종료 — 단, 아래 조건 **모두** 충족 시:\n1. 최근 25년간 **고등급 CIN 또는 자궁경부암 없음**\n2. **60세 및 65세**에서 적절한 음성 스크리닝 결과",
      sources: []
    },
    protocol: {
      content: "### 스크리닝 방법\n| 방법 | 설명 |\n|---|---|\n| **세포검사 단독 (Cytology)** | Pap smear; 단독 사용 허용 |\n| **공동검사 (Cotesting)** | 세포검사 + HPV 검사 동시; 허용 |\n| **Primary HPV 검사** | HPV 단독 검사; **현재 선호 방법** |\n\n### 비정상 결과 관리\n- **2019 ASCCP 위험 기반 관리 합의 지침** 준수\n- 결과 이상 시 → 위험도 기반 접근 (즉시 질확대경 / 관찰 / 반복검사 분류)",
      sources: []
    },
    referral: {
      content: "- 일차의료에서 직접 스크리닝·상담 가능\n- 비정상 결과 (고위험 HPV 양성, ASC-H, HSIL 이상) → 산부인과 (질확대경)\n- 자궁경부암 과거력 / 면역저하자 → 개별화 (조기 시작·짧은 주기)\n- 관련: [[hpv-vaccine]] / [[adult-vaccination-summary]] HPV 예방접종",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["cervical-cancer-screening"] = _cervical_screening_v2;
KNOWLEDGE_BUNDLE["자궁경부암스크리닝"] = _cervical_screening_v2;
KNOWLEDGE_BUNDLE["HPV-screening"] = _cervical_screening_v2;
KNOWLEDGE_BUNDLE["Pap-smear"] = _cervical_screening_v2;

/* cancer-fatigue — 암 관련 피로 + 저항운동 (5-4 cron). [CLINICAL] */
var _cancer_fatigue_v2 = {
  kind: "disease",
  keywords: ["암 관련 피로","cancer-related fatigue","CRF","저항운동","resistance training","운동처방","항암치료","재활"],
  primarySources: [
    "Eckert H et al. Am Fam Physician 2025 Nov;112(5):487-488. PMID:41252831"
  ],
  sections: {
    notes: {
      content: "### 핵심 결론 [출처: Eckert H AFP 2025 Nov POEM]\n**저항운동(Resistance Training)은 암 환자의 암 관련 피로(CRF)를 유의하게 감소시킨다.**\n\n- AFP POEM 형식 — 일차의료 즉시 적용 권고 수준 요약\n- 저항운동이 항암치료 중·후 피로 관리에 근거 기반 중재\n- [초록 미제공 — POEM 포맷, 전문 미확인]",
      sources: []
    },
    protocol: {
      content: "### 외래 운동 처방 원칙\n- 암 관련 피로 호소 시 **저항운동을 적극적 치료 옵션**으로 제시\n- **항암치료 중 시작 가능** — 중단 말고 유지·시작 권고\n- 운동 강도: 환자 컨디션에 맞게 조절 (저~중강도로 시작)\n\n### 처방 포인트\n- '운동해도 되나요?' → '저항운동이 피로에 도움이 됩니다' — 근거 기반 답변\n- 재활 의뢰 또는 운동 교육 처방전 발급 근거\n- 피로 악화 시 → 운동 중단보다 강도 감소 후 지속",
      sources: []
    },
    precaution: {
      content: "- 골 전이 부위 충격 운동 금지 — 병적 골절 위험\n- 혈소판 감소증 (항암 기간) → 출혈 위험, 강도 제한\n- 중심정맥관 (Port, PICC) 삽입 환자 → 해당 팔 저항운동 주의",
      sources: []
    },
    referral: {
      content: "- 심한 피로 + 기저 빈혈·심폐 기능 저하 → 재활의학 (운동 처방 최적화)\n- 암성 통증·골 전이 동반 → 운동 종류·부하 세심 조정 (전문가 협진)\n- 관련: [[palliative-pain]] (암성 통증 완화의료)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["cancer-fatigue"] = _cancer_fatigue_v2;
KNOWLEDGE_BUNDLE["암관련피로"] = _cancer_fatigue_v2;
KNOWLEDGE_BUNDLE["CRF"] = _cancer_fatigue_v2;
KNOWLEDGE_BUNDLE["resistance-training-cancer"] = _cancer_fatigue_v2;

/* chronic-pain-integrative — 만성 통증 통합 중재 (5-4 cron). [CLINICAL — 조건부] */
var _chronic_pain_integrative_v2 = {
  kind: "disease",
  keywords: ["만성 통증","chronic pain","태극권","Tai Chi","웰니스","PTSD","우울","비약물 중재","마음챙김","재향군인","Gulf War Illness"],
  primarySources: [
    "Polizzi CP et al. J Psychiatr Res 2026 Feb 25;197:97-106. PMID:41774973, DOI:10.1016/j.jpsychires.2026.02.045"
  ],
  sections: {
    notes: {
      content: "### 핵심 수치 (n=114 만성 통증+GWI 재향군인, 2 RCT 합산)\n| 결과 지표 | 태극권 | 웰니스 |\n|---|---|---|\n| 건강 증상 | 유의 개선 | 유의 개선 |\n| 통증 간섭 | 유의 개선 | 유의 개선 |\n| 우울 | 유의 개선 | 유의 개선 |\n| 불안 | 유의 개선 | 유의 개선 |\n| 마음챙김 | 유의 개선 | 유의 개선 |\n| 신체 HRQoL | 유의 개선 | 유의 개선 |\n| 정신 HRQoL | 유의 개선 | 유의 개선 |\n| PTSD 증상 | 유의 개선 | 유의 개선 |\n\n**대면 vs 원격 비교**: 효과 차이 없음 — 두 방식 동등.",
      sources: []
    },
    protocol: {
      content: "### 적용 대상\n- 만성 통증 + 우울·불안·PTSD 동반 환자\n- 다양한 심리·신체 증상 복합 호소 환자\n\n### 중재 옵션\n| 중재 | 특징 | 접근 방식 |\n|---|---|---|\n| **태극권** | 중국 전통 마음-몸 수련 | 그룹 프로그램 (대면/원격) |\n| **웰니스 프로그램** | 건강 생활습관·이완·스트레스 관리 | 그룹 프로그램 (대면/원격) |\n\n### 원격 프로그램 동등 효과 의미\n- 교통·시간 장벽 있는 환자에도 적용 가능\n- 재택 온라인 프로그램 의뢰 가능\n\n### 임상 적용\n- 만성 통증 + 정신건강 동반 환자에게 비약물 통합 중재 RCT 근거 제시 가능\n- '태극권 같은 운동치료가 통증과 우울에 모두 도움이 됩니다' — 환자 교육\n- 두 중재 효과 유사 → **환자 접근 가능한 프로그램 우선 선택**",
      sources: []
    },
    precaution: {
      content: "- Gulf War Illness 재향군인 대상 — 일반 만성 통증 외삽 시 주의\n- 대조군 없음 (액티브 비교군 설계) — 자연 경과와의 구분 불가\n- 군 특수 증후군(GWI) 복합 증상 — 일반 근골격 만성 통증과 다를 수 있음 [CLINICAL — 조건부]",
      sources: []
    },
    referral: {
      content: "관련:\n- [[anxiety-depression-cbt]] (우울·불안 CBT 근거)\n- [[palliative-pain]] (암성 통증 동반 정신건강)\n- [[low-back-pain]] (만성 요통 비약물 1차)",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["chronic-pain-integrative"] = _chronic_pain_integrative_v2;
KNOWLEDGE_BUNDLE["만성통증통합중재"] = _chronic_pain_integrative_v2;
KNOWLEDGE_BUNDLE["태극권"] = _chronic_pain_integrative_v2;
KNOWLEDGE_BUNDLE["Tai-Chi"] = _chronic_pain_integrative_v2;

/* ========== 5-2 cron Liby ingest (Batch 5 — 근골격·심회복) ========== */

/* ankle-sprain — 급성 발목 염좌 PEACE&LOVE (5-2 cron). [CLINICAL] */
var _ankle_sprain_v2 = {
  kind: "disease",
  keywords: ["발목 염좌","ankle sprain","Ottawa rules","PEACE LOVE","발목 보조기","brace","신경근 재활","외측 인대","ATFL","CFL","semirigid brace"],
  primarySources: [
    "Wu V et al. Am Fam Physician 2025 Dec;112(6):609-617. PMID:41533404"
  ],
  sections: {
    definition: {
      content: "급성 발목 염좌는 흔한 근골격 손상으로 외측 인대(ATFL, CFL, PTFL) 손상이 가장 흔함. 초기 평가에서 **골절 감별 + 염좌 중증도 평가**가 핵심.",
      sources: []
    },
    exam: {
      content: "### Ottawa Ankle Rules — X-ray 적응증\n| 소견 | X-ray 필요 |\n|---|---|\n| 비골 원위부 6cm 또는 후방 내과 압통 | 예 |\n| 발 5번 중족골 기저부 압통 | 예 |\n| 주상골(Navicular) 압통 | 예 |\n| 체중 부하 4걸음 불가 | 예 |\n| 위 소견 없음 | X-ray 불필요 |\n\n### 검사 정확도 향상 팁\n- 손상 직후 부종·통증으로 검사 정확도 저하 → **4~7일 후 재평가 시 염좌 중증도 진단 정확도 향상**\n- 여러 발목 특이 검사 조합 (전방 서랍 징후, 내반 스트레스 검사)\n\n### 중증도 분류\n| 등급 | 특징 | 치료 |\n|---|---|---|\n| Grade I | 미세 파열, 기능 유지 | PEACE&LOVE + 조기 복귀 |\n| Grade II | 부분 파열, 불안정성↑ | 외부 지지대 5~10일, 재활 |\n| Grade III | 완전 파열, 불안정 | 보조기 + 8~12주 재활; MRI 검토 |",
      sources: []
    },
    protocol: {
      content: "### 초급성기 — PEACE & LOVE\n기존 RICE에서 **PEACE&LOVE**로 패러다임 전환:\n\n**PEACE** (급성기 0~3일):\n- **P**rotection — 손상 부위 보호 (체중 부하 제한, 완전 고정 지양)\n- **E**levation — 발목 심장보다 높게 거상\n- **A**void anti-inflammatory modalities — 소염제·냉찜질 과도 사용 회피 (초기 염증은 치유에 필요)\n- **C**ompression — 탄성 붕대 적용\n- **E**ducation — 충분한 설명·기대 교육\n\n**LOVE** (아급성기 3일~):\n- **L**oad — 점진적 체중 부하, 통증 허용 범위 내 조기 활동\n- **O**ptimism — 회복 긍정적 기대 (예후 좋음 교육)\n- **V**ascularization — 조기 유산소 운동 (혈류 개선)\n- **E**xercise — 신경근 재활 프로그램\n\n### 외부 지지대 및 재활\n- **초기 지지대**: 반경성 보조기(Semirigid brace) 또는 air stirrup — **5~10일** 착용\n- **재활 기간**: 표적 신경근 재활 프로그램 **8~12주**\n  - 균형·고유감각 훈련 (한발 서기, 보수 볼)\n  - 근력 강화 (족저 굴근, 비골근)\n  - 기능적 운동 (점프·방향 전환)\n\n### 통증 조절 약물\n- 아세트아미노펜·NSAIDs·오피오이드 — 통증 조절 효과 동등\n- NSAIDs 과도 사용 시 초기 치유 억제 가능성 (PEACE 원칙과 상충) — 단기 최소 용량\n\n### 재발 예방\n- 재활 후 스포츠 복귀 시 **외부 발목 지지대** 유지 → 재발률 감소\n- 기능적 운동 지속 (신경근 조절 유지)",
      sources: []
    },
    referral: {
      content: "### MRI 권고 상황\n- 기대 회복 경과 미달 (4~6주 이상 지연)\n- 거골 골절(Talar fracture) 의심\n- 비골 건(Peroneal tendon) 손상 의심\n- 3등급 염좌 + 불안정성 지속 → 정형외과",
      sources: []
    },
    precaution: {
      content: "- 소아: 골단판 손상 가능성 → Ottawa Rules 적용 연령 기준 확인\n- 노인: 골다공증 골절 감별 더욱 중요\n- 반복 발목 염좌: 만성 발목 불안정성(CAI) 진단 및 정형외과 의뢰 고려",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["ankle-sprain"] = _ankle_sprain_v2;
KNOWLEDGE_BUNDLE["발목염좌"] = _ankle_sprain_v2;
KNOWLEDGE_BUNDLE["PEACE-LOVE"] = _ankle_sprain_v2;
KNOWLEDGE_BUNDLE["Ottawa-ankle-rules"] = _ankle_sprain_v2;

/* cardiac-rehabilitation — 심장재활 가정의 역할 (5-2 cron). [CLINICAL] */
var _cardiac_rehab_v2 = {
  kind: "disease",
  keywords: ["심장재활","cardiac rehabilitation","심근경색","심부전","PCI","CABG","운동처방","생활습관","가정의학과","의뢰"],
  primarySources: [
    "Boggiano VL et al. Am Fam Physician 2025 Sep;112(3):272-277. PMID:40961304"
  ],
  sections: {
    definition: {
      content: "심장재활(Cardiac Rehabilitation)은 심혈관질환 환자에게 **운동·교육·심리 지원을 통합 제공**하여 이환율·사망률을 줄이고 삶의 질을 향상시키는 프로그램.",
      sources: []
    },
    indication: {
      content: "- 심근경색 (Myocardial Infarction)\n- 심부전 (Heart Failure — **안정기**)\n- 경피적 관상동맥 중재술 (PCI / Angioplasty)\n- 관상동맥 우회술 (CABG)\n- 심장 판막 수술 후",
      sources: []
    },
    protocol: {
      content: "### 핵심 3요소\n| 요소 | 내용 | 실전 |\n|---|---|---|\n| **운동 처방** | 유산소+저항 운동 / 주 3~5회 / 12주 기본 | 심폐 운동 부하 검사 기반 강도 설정 |\n| **교육** | 위험인자 교정 (식이·금연·체중·혈압·지질) | 환자·가족 포함 |\n| **심리 지원** | 우울·불안 스크리닝·개입 | PHQ-9·GAD-7 병행 |\n\n### 가정의 직접 수행 최소 재활 패키지\n1. 운동 처방: 걷기 목표(심박수·주당 시간) 명시\n2. 식이 교정: 지중해식·DASH 처방\n3. 금연: 상담 + 약물 (varenicline 우선)\n4. 혈압·지질·혈당 목표 관리\n5. 우울 스크리닝 + 필요 시 상담/약물",
      sources: []
    },
    notes: {
      content: "### 효과 근거\n- 심장재활 참여 → 이환율·사망률 감소 명확\n- 미국 내 **프로그램 이용률 낮음** — 의뢰율 부족이 주원인\n- 가정의의 적극 의뢰 + 이탈 방지 지원이 프로그램 실제 효과 결정",
      sources: []
    },
    referral: {
      content: "### 의뢰 시점\n- **입원 중 또는 퇴원 직후** — 가능하면 입원 중 의뢰 계획 수립\n- 안정기 심부전 진단 직후\n- PCI·CABG 후 추적 외래 방문 시 의뢰 미확인 → 즉시 의뢰\n\n### 의뢰 후 가정의 역할\n- 재활 참여 여부 확인·독려 (매 외래)\n- 생활습관 처방 지속·강화 (프로그램 종료 후 유지 핵심)\n- 위험인자(혈압·지질·혈당·체중) 목표 달성 모니터링\n\n### 의뢰 장벽 극복\n- 교통·시간 장애 → 가정 기반·원격 심장재활 안내\n- 환자 동기 부족 → 사망률 감소 효과 명확 설명\n\n관련: [[heart-failure]], [[smoking-cessation]], [[anxiety-depression-cbt]]",
      sources: []
    },
    precaution: {
      content: "- 비안정 심부전·불안정 협심증·조절 안 된 심박수 → 재활 시작 전 안정화\n- 심각한 판막 질환·대동맥 협착 → 판막 교정 전 운동 처방 제한\n- 고위험 환자: 초기 감독 하 운동 필요 → 심장재활 프로그램 직접 의뢰",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["cardiac-rehabilitation"] = _cardiac_rehab_v2;
KNOWLEDGE_BUNDLE["심장재활"] = _cardiac_rehab_v2;
KNOWLEDGE_BUNDLE["cardiac-rehab"] = _cardiac_rehab_v2;

/* ========== 5-2·5-4 cron Liby ingest (Batch 6 — 만성질환 보강 5개) ========== */

/* CKD v2 보강 — VA/DoD 2025 + Finerenone + KDIGO/AKIPS 통합 (5-2 cron) */
var _ckd_v2_full = {
  kind: "disease",
  keywords: ["CKD","만성신장병","만성신부전","eGFR","시스타틴C","cystatin C","크레아티닌","신기능 추적","SGLT-2i","GLP-1","피네레논","finerenone","VA/DoD","KDIGO"],
  primarySources: [
    "Scandrett K et al. BMJ 2026;392:e085005. PMID:41856526",
    "Schwartz AR et al. 2025 VA/DoD CKD CPG. Ann Intern Med 2025 Dec 30;179(3):411-424. PMID:41461086"
  ],
  sections: {
    definition: {
      content: "만성 신장병(CKD): eGFR <60 또는 신손상 지표 3개월 이상. G3 중등도(eGFR 30-59).",
      sources: []
    },
    monitoring: {
      content: "### CKD G3 — 이중 바이오마커 방정식 (BMJ 2026)\n| 방정식 | 측정 GFR 일치율 |\n|---|---|\n| CKD-EPI (Cr 단독) | 73.1% — GFR 하락 **과소평가** 위험 |\n| CKD-EPI (Cr + 시스타틴C) | 78.6% — 권고 우선 |\n| EKFC (이중) | **80.2% 최고** |\n\n전체 15.9%에서 3년 내 진행. 진행 감지 민감도 <54%·특이도 >90%.\n\n### 정기 모니터링\n- eGFR: 안정 G3 연 2회 / G3b 진행 중 연 4회\n- UACR: ACR ≥30 시 신손상 표지\n- 전해질 (K⁺), 중탄산염, 혈압, Hb (신성빈혈)\n- **6-12개월 간격 eGFR + 시스타틴C 이중 측정** (진행 추적 정확도)",
      sources: []
    },
    protocol: {
      content: "### VA/DoD 2025 — 23 GRADE 권고 핵심 update\n| 약물/전략 | 2025 권고 |\n|---|---|\n| **SGLT-2 억제제** | CKD+T2DM 또는 단백뇨 CKD에서 **신장 보호 1순위** 강화 |\n| **GLP-1 수용체 작용제** | CKD+T2DM 심혈관·신장 보호 신규 권고 |\n| **피네레논 (Finerenone)** | 비스테로이드성 MRA — T2DM+CKD 단백뇨 추가 신장 보호 |\n| **스타틴** | 심혈관 위험 감소 강화 권고 |\n| **ACEi / ARB** | 혈압·단백뇨 — 기존 1차 유지 |\n| **조영제 유발 AKI 예방** | 생리식염수 수화 프로토콜 강화 |\n\n### Finerenone 처방 검토 대상\nT2DM + CKD (단백뇨 동반) + SGLT-2i 사용 중에도 진행하는 경우 → 내분비·신장내과 협진 후 피네레논 추가 고려.\n\n### 공유 의사 결정\n- 투석·이식 vs 보존적 관리 — 환자 선호·기능 상태 기반 개별화\n- 진행·심혈관 위험 함께 설명 후 결정",
      sources: []
    },
    referral: {
      content: "- eGFR <30 (G4) → 신장내과\n- eGFR 30–44 (G3b) + 단백뇨 (ACR >300) → 조기 의뢰\n- eGFR 빠른 감소 (>5 mL/min/1.73m²/year) → 의뢰\n- 원인 불명 CKD·혈뇨 동반·약물 내성 고혈압 → 의뢰\n- 관련: [[diabetes-dyslipidemia]], [[heart-failure]], [[glp1-selection-strategy]]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["CKD"] = _ckd_v2_full;
KNOWLEDGE_BUNDLE["만성콩팥병"] = _ckd_v2_full;
KNOWLEDGE_BUNDLE["만성신장병"] = _ckd_v2_full;
KNOWLEDGE_BUNDLE["chronic-kidney-disease"] = _ckd_v2_full;
KNOWLEDGE_BUNDLE["finerenone"] = _ckd_v2_full;

/* MASH v2 보강 — JAAPA 2025 MASLD 1차의료 가이드 + 레스메티롬 (5-4 cron) */
var _mash_v2_full = {
  kind: "disease",
  keywords: ["MASH","MASLD","비알코올지방간염","NAFLD","NASH","지방간염","FIB-4","GLP-1","semaglutide","resmetirom","Rezdiffra","FibroScan","간섬유화"],
  primarySources: [
    "Geary A. JAAPA 2025 Dec 23;39(1):21-25. PMID:41369205, DOI:10.1097/01.JAA.0000000000000296"
  ],
  sections: {
    definition: {
      content: "MASLD (Metabolic dysfunction-associated steatotic liver disease) = 대사 이상 동반 지방간. 진행 형: MASH (MASL + 염증·간세포 손상). 미국 NAFLD 유병률 ~25%, MASH 1.5-6.5%.",
      sources: []
    },
    exam: {
      content: "### FIB-4 기반 섬유화 위험 분층 (1차의료 적용)\n| FIB-4 값 | 해석 | 일차의료 행동 |\n|---|---|---|\n| **<1.30** | 고도 섬유화 배제 가능 | 추적 + 생활습관 교육 |\n| **1.30–2.67** | 중간 위험 | **FibroScan 또는 소화기내과 협진** |\n| **≥2.67** | 고도 섬유화 의심 | **간전문의 의뢰** |\n\n*FIB-4 = 나이(세) × AST(IU/L) / [혈소판(×10⁹/L) × √ALT(IU/L)]*",
      sources: []
    },
    protocol: {
      content: "### 레스메티롬 (Resmetirom, Rezdiffra) — FDA 승인 MASH 약물\n**적응증**: 비간경변 MASH + **중등도~고도 섬유화 (F2–F3)** — **간 생검 불필요** (AASLD 지침 지지)\n- 기전: 간 선택적 갑상선호르몬 수용체 β(THRβ) 작용제 → 간 지방·MASH 조직학 개선\n- 용량: **80mg 또는 100mg 1일 1회** (체중 기준)\n- 약물 상호작용: CYP3A4 기질 다수 — 스타틴·면역억제제 상호작용 확인 필수\n- 안전성 모니터링: ALT/AST, 임신 가능 여성 **피임 필수** (생식독성)\n\n**처방 포인트**:\n- FIB-4 ≥1.30 + 초음파 지방간 → FibroScan F2 이상 확인 후 처방 고려\n- 1차의료 시작 가능하나 **간전문의 협진 권장** (복잡 모니터링)\n\n### 세마글루타이드 (Semaglutide) — MASH 신흥 옵션\n- 비간경변 MASH 조직학적 개선 데이터 축적 중\n- 비만+MASH 환자에서 체중 감량 + 간 개선 이중 효과\n- 2025년 기준 MASH 단독 적응증 FDA 미승인 (비만·당뇨 적응증 내 사용)\n\n### 생활습관 — 여전히 1차\n- 체중 **5~10% 감량** → 간지방·ALT 개선\n- 체중 **10% 이상** → MASH 조직학적 해소 가능\n- 알코올 금주, 당·정제탄수화물 제한, 유산소+저항 운동 병행",
      sources: []
    },
    referral: {
      content: "- FIB-4 ≥2.67 → 간전문의 의뢰\n- FibroScan F2 이상 + 레스메티롬 처방 고려 → 간전문의 협진\n- 알코올 사용장애 동반 시 (MASH-Alc 중복) → 간내과 + 중독전문\n- 관련: [[wegovy]], [[glp1-selection-strategy]], [[diabetes-dyslipidemia]]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["MASH"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["MASLD"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["NAFLD"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["NASH"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["지방간염"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["FIB-4"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["resmetirom"] = _mash_v2_full;
KNOWLEDGE_BUNDLE["Rezdiffra"] = _mash_v2_full;

/* frailty v2 보강 — Ann Int Med ITC 2026 (5-4 cron) */
var _frailty_v2_full = {
  kind: "disease",
  keywords: ["frailty","허약","노쇠","frailty syndrome","CFS","Clinical Frailty Scale","FRAIL Scale","Fried","CGA","comprehensive geriatric assessment","deprescribing"],
  primarySources: [
    "Orkaby AR et al. Frailty. Ann Intern Med 2026 Feb 10;179(2):ITC17-ITC32. PMID:41662715, DOI:10.7326/ANNALS-25-04412"
  ],
  sections: {
    definition: {
      content: "허약(Frailty): 다계통 생리적 예비능(physiologic reserve) 저하 증후군. 스트레스(감염·수술·약물)에 회복력 저하 → **입원·장애·시설화·사망 위험 증가** + 의인성 합병증(고위험 약물·시술) 피해 가능성 ↑.\n\n**핵심 메시지: 허약은 가역적**. 진단 후 즉각 개입으로 기능 유지·개선 가능. '노화이니 어쩔 수 없다'는 허무주의 탈피.",
      sources: []
    },
    exam: {
      content: "### 허약 스크리닝 — 진료 환경별 도구 (ITC 2026)\n| 환경 | 권장 도구 | 특징 |\n|---|---|---|\n| **외래** | **FRAIL Scale, CFS** | 빠른 선별 (5문항) |\n| **입원** | CFS, Fried Phenotype | 시술 전 위험 평가 |\n| **지역사회 종합** | CGA (Comprehensive Geriatric Assessment) | 다영역 평가 |\n\n**가이드라인**: 만성질환 관리·입원 중 치료 모두에서 허약 스크리닝 권고. 허약 확인 → 위험 감소 + 환자 목표 정렬 ([[goals-of-care-acp]] 연계).",
      sources: []
    },
    protocol: {
      content: "### 허약 역전 가능 중재 (ITC 2026)\n- **영양 중재** — 단백질 보충 ≥1.2g/kg/일\n- **저항운동 + 균형 훈련**\n- **다약제 감소 (Deprescribing)** — [[deprescribing]], [[prescribing-cascade]] 참조\n- **만성질환 최적화** — 빈혈·갑상선·우울 교정\n\n### 일차의료 4대 핵심 레버 (Fam Med Community Health 2025 기존 근거)\n| 중재 | 효과 |\n|---|---|\n| **비계획 입원 회피** | 가장 큰 회복 인자 |\n| **다약제 감소** | 의인성 합병증 차단 |\n| **낙상 방지** | 골절 → 기능 저하 cascade 차단 |\n| **예방접종 (인플루엔자·폐렴구균·대상포진)** | 감염 → 비계획 입원 차단 |",
      sources: []
    },
    referral: {
      content: "- CFS ≥5 + 다중이환 → 노인의학과 CGA\n- 비계획 입원 반복 → 노인의학과·재택의료\n- 영양 중재 필요 → 영양사 협진\n- 관련: [[goals-of-care-acp]], [[deprescribing]], [[prescribing-cascade]], [[home-based-hypertension]]",
      sources: []
    },
    notes: {
      content: "허약은 가역적임을 환자·보호자에게 명확히 전달. 일차의료에서 다약제 재검토·낙상 예방·예방접종이 허약 회복의 핵심 레버. ITC 2026 표준화: 정의·스크리닝·역전 가능성 모두 일관 메시지.",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["frailty"] = _frailty_v2_full;
KNOWLEDGE_BUNDLE["허약"] = _frailty_v2_full;
KNOWLEDGE_BUNDLE["노쇠"] = _frailty_v2_full;
KNOWLEDGE_BUNDLE["CFS"] = _frailty_v2_full;
KNOWLEDGE_BUNDLE["FRAIL-Scale"] = _frailty_v2_full;
KNOWLEDGE_BUNDLE["CGA"] = _frailty_v2_full;

/* glp1-selection-strategy v2 보강 — 암 위험 메타분석 (5-4 cron) */
var _glp1_strategy_v2_full = {
  kind: "topic",
  keywords: ["GLP-1","GLP-1RA","semaglutide","tirzepatide","wegovy","ozempic","mounjaro","NAION","비뇨생식기감염","UTI","SGLT-2 비교","cancer-risk","갑상선암","췌장암","유방암"],
  primarySources: [
    "Escudero C et al. Endocrinology: What You May Have Missed in 2025. Ann Intern Med 2026. PMID:41974004",
    "Ko A et al. Risk for Cancer With GLP-1RA: SR + Meta-analysis. Ann Intern Med 2025 Dec 9;179(2):216-229. PMID:41359966"
  ],
  sections: {
    definition: {
      content: "GLP-1 수용체 작용제(GLP-1RA)·이중작용제 선택 전략. 비만·당뇨·MASH·CKD·심부전 적응증 확장. SGLT-2i와의 비교·암 위험 안전성·동반질환별 우선순위.",
      sources: []
    },
    comparison: {
      content: "### 동반질환별 GLP-1 vs SGLT-2 우선순위\n- **반복성 UTI 환자**: **GLP-1 우선** (SGLT-2i는 비뇨생식기 감염↑)\n- **HFpEF·HFrEF**: SGLT-2i 1순위 (다파글리플로진·엠파글리플로진), GLP-1은 비만+HF 동반 시 보조\n- **CKD+T2DM 단백뇨**: SGLT-2i 1순위, GLP-1은 추가 신장 보호\n- **MASH**: GLP-1 (특히 세마글루타이드) 우선 — 체중 + 간 동시\n\n### NAION 시야 부작용 신호 (2025)\n- GLP-1 사용 환자 코호트에서 NAION 발생률 ↑ 신호 (인과 미확립)\n- 모니터링 교육 추가: 갑작스런 시야 결손 → 즉시 안과",
      sources: []
    },
    notes: {
      content: "### GLP-1RA 암 위험 — 메타분석 안전성 (Ko 2025)\n**48 RCT 메타, n=94,245명 위약 대조 무작위 시험.**\n\n**결론: GLP-1RA는 주요 암 위험 증가 없음 (중등도 근거)**\n| 암 종류 | OR (95% CI) | 근거 |\n|---|---|---|\n| 갑상선암 | 1.37 (0.82–2.31) | 중등도 |\n| 췌장암 | 0.84 (0.53–1.35) | 중등도 |\n| 유방암 | 0.95 (0.60–1.49) | 중등도 |\n| 신장암 | 1.12 (0.78–1.60) | 중등도 |\n| 대장·식도·간·담낭·난소·자궁내막·다발골수종·수막종 | 효과 없음 | 낮음 |\n| 위암 | 불확실 | 매우 낮음 |\n\n**서브그룹**: 세마글루타이드·티르제파타이드 단독에서도 일관. 추적·집단·용량·지속시간 하위분석 일관.\n\n### 환자 상담 표준 답변\n- '암 위험 높아지지 않나요?' → **'48개 대규모 임상시험 94,245명 분석에서 주요 암 위험 증가 없습니다'**\n- 처방 동의 안전성 상담 근거\n- 갑상선 수질암(MTC) 주의 — 메타 미포함; FDA 블랙박스 경고 유지\n\n**한계**: 포함 RCT가 암 결과 평가 설계 아님, 추적 기간 단기 — 장기 위험·편익 추가 연구 필요.",
      sources: []
    },
    referral: {
      content: "- MASH 처방 고려 시 → 간전문의 협진 ([[MASH]])\n- 비뇨생식기 감염 반복 → SGLT-2i 회피, GLP-1 검토\n- NAION 시야 결손 → 안과 즉시\n- 관련: [[obesity]], [[diabetes-dyslipidemia]], [[heart-failure]], [[CKD]]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["glp1-selection-strategy"] = _glp1_strategy_v2_full;
KNOWLEDGE_BUNDLE["GLP-1"] = _glp1_strategy_v2_full;
KNOWLEDGE_BUNDLE["GLP-1RA"] = _glp1_strategy_v2_full;
KNOWLEDGE_BUNDLE["GLP-1-cancer-risk"] = _glp1_strategy_v2_full;

/* depression-screening — PETRUSHKA 개인맞춤 항우울제 처방 (5-1 cron). [CLINICAL] */
var _depression_screening_v2 = {
  kind: "disease",
  keywords: ["우울증 스크리닝","depression screening","PHQ-9","GAD-7","항우울제","SSRI","PETRUSHKA","개인맞춤 처방","first-line antidepressant","MDD"],
  primarySources: [
    "Cipriani A et al. JAMA 2026;335(14):1219-1231. PMID:41779422, DOI:10.1001/jama.2026.1327"
  ],
  sections: {
    exam: {
      content: "### 스크리닝 도구\n- **PHQ-9** (우울증 — 9문항)\n- **GAD-7** (불안 — 7문항)\n\n### 동반 평가\n- 자살 사고 (PHQ-9 #9)\n- 양극성 우울 의심 (조증 삽화 과거력)\n- 신체질환·약물 유발 우울 감별",
      sources: []
    },
    protocol: {
      content: "### 항우울제 개인맞춤 처방 — PETRUSHKA RCT (Cipriani 2026)\n**3개국 47개 기관, n=540, 중등도~고도 MDD**\n\n| 결과 | PETRUSHKA 결정지원 | 일반 처방 | 효과 |\n|---|---|---|---|\n| **8주 중단율 (any cause)** | **17%** | 27% | RR 0.62 (CI 0.44–0.88), p=0.007 |\n| **8주 중단율 (부작용)** | **9%** | 16% | RR 0.59 (CI 0.36–0.97), p=0.04 |\n| **24주 PHQ-9** | **7.1** | 9.2 | 차이 –1.92, p<0.001 |\n| **24주 GAD-7** | **4.6** | 5.8 | 차이 –1.39, p=0.002 |\n\n**핵심 임상 메시지**:\n- 근거 기반 알고리즘으로 첫 항우울제를 **개인 증상 프로파일에 맞게 선택**하면 조기 중단 38% 감소\n- 첫 처방 선택의 정확도가 치료 결과 결정\n- 한계: 비맹검 설계, 탈락률 높음 → 결과 해석 시 주의\n\n### 일차의료 적용\n- 중등도 이상 MDD 항우울제 처음 시작 시 환자의 증상 특이성(불면·불안·체중·성기능 등) 고려한 처방\n- **SSRI 일률 처방보다 증상 맞춤 선택 원칙 강화**",
      sources: []
    },
    referral: {
      content: "- 자살 사고 양성 → 즉시 정신건강의학과·응급실\n- 항우울제 2-3종 실패 → 정신건강의학과 (TRD 평가)\n- 양극성 의심 → 정신건강의학과\n- 관련: [[anxiety-depression-cbt]], [[chronic-pain-integrative]]",
      sources: []
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["depression-screening"] = _depression_screening_v2;
KNOWLEDGE_BUNDLE["우울증스크리닝"] = _depression_screening_v2;
KNOWLEDGE_BUNDLE["PHQ-9"] = _depression_screening_v2;
KNOWLEDGE_BUNDLE["PETRUSHKA"] = _depression_screening_v2;
