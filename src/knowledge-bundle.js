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
  keywords: ["LPR","후두염","인후두역류","laryngopharyngeal reflux","역류성후두염"],
  primarySources: [],
  sections: {
    protocol: {
      content: "PPI (1차 치료, 근거 확립)\n뮤테란(아세틸시스테인 경구) 병용 — LPR 인후 분비물·점액 거담 목적 (off-label)\nPPI 부작용 시:\n① 알긴산(Gaviscon류) — raft 형성, 역류 물리적 차단\n② Promac(polaprezinc) — 위점막 보호제. 알긴산과 병용 가능",
      sources: ["[TIPS — by ENT교수]"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["LPR"] = _LPR_v2;
KNOWLEDGE_BUNDLE["후두염"] = _LPR_v2;
KNOWLEDGE_BUNDLE["인후두역류"] = _LPR_v2;

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
      content: "### 어지럼증 기본 문진 11항목 [TIPS — 교수님 외래 참관]\n1. 언제부터 어지러웠는지\n2. 갑자기 발생했는지\n3. 과거 비슷한 episode 있었는지\n4. 한번 어지러울 때 얼마나 지속되는지\n5. 괜찮을 땐 완전히 괜찮은지 (삽화성 vs 지속성)\n6. 심한 정도 — 구역/구토 동반 여부, 휘청거림\n7. 귀먹먹함(이충만감) 동반 여부\n8. 이명 동반 여부\n9. 만성이면 한달 발생 빈도\n10. 어떤 상황에서 특히 어지러운지 (자세변화, 기립, 스트레스 등)\n11. 가장 최근 episode는 언제\n\n### 편두통성 어지럼증 추가 문진\n- 편두통 과거력 확인\n- 두통 동반 여부, 빛·소리 과민, 구역/구토, 전조증상, 두통 양상(박동성/지속시간), 가족력, 발작 빈도",
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
