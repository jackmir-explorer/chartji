# sessions/2026-05-06-inbox-가정의학과insight-phase1.md

## 세션 정보
- 날짜: 2026-05-06
- 작업: inbox/가정의학과insight.md (24 topics) 중 Phase 1 (Tier 1 공백 직격 8 topics) ingest
- 건드린 파일:
  - 신규: knowledge/by-disease/{dyslipidemia, diabetes, hypertension, osteoporosis, anemia, headache, thyroid-disorder, unintentional-weight-loss}.md
  - 수정: src/knowledge-bundle.js, src/prompts.js, knowledge/log.md, knowledge/index.md
  - 이동: inbox/가정의학과insight.md → inbox/processed/2026-05-06-가정의학과insight-phase1-8topics.md

---

## 결정 배경
- 미르가 inbox 큰 insight 파일(1061줄, ~24 주제)을 던지고 ingest 요청
- Liby 트리아지: MAP.md scope coverage GAP과 정확히 일치 → Phase 1으로 Tier 1 공백 메우기 우선
- 미르 승인: Phase 1 (8건), 모두 인터넷 검색 출처 → CLINICAL 검증 필수, CXR template은 by 미르

## Researcher 검증 (8 병렬)
8개 주제 각각 별도 Researcher subagent 호출. 주요 수정사항:

| 주제 | 핵심 수정 |
|---|---|
| dyslipidemia | Pitava 1mg=중등도(저강도 X). 초고위험=관상동맥(MI 포함)<55. Ezetimibe 1차 statin 병용은 보험 일반 인정 X |
| diabetes | Metformin eGFR 45~30 감량 누락 보완. SGLT-2i "<30 금기" 구버전 — 심·신 보호는 eGFR≥20부터(2024 갱신) |
| hypertension | 위험인자 cutoff는 ESC/ESH 기반(KSH 본문 X). BB는 DM에서 주의(우선 적응증 X). 이차성 cutoff "≥55~60세 새 발생" 보정. SBP 감소 stroke 효과 출처 MacMahon 메타 |
| osteoporosis | BP 신기능 약제별 차이 (Aln/Zol<35, Ris/Iban<30). 데노수맙 호전 시 추가 2년/4회 (인터넷 자료 "1년/2회"는 오기). 졸레드로네이트 6회 한도는 데노수맙 기준과 혼동 |
| anemia | 1차 검사 단계화 (필수 1차 → MCV 기반 2차). IDA ferritin <45(AAFP 2021 권고)/<15(매우 특이). 추가 투여 3개월(통상)~6개월(흡수불량). PPI/H2RA 12개월+도 B12 결핍 위험군 |
| headache | Ergotamine 1차 제외(IHS 2024 회피). Amitriptyline은 편두통 예방 Level B(1차 X). TTH 단독 진통제(병용 1차 권고 X). Ketorolac 30~60mg |
| thyroid | MMI 12~18개월 명시. LT4 식전 30~60분 또는 취침 전 마지막 식사 후 ≥3시간. 고령 TSH 4~6 상향 고려 |
| weight loss | 외래 노인 코호트는 암>비악성GI>우울(요양시설만 우울 1순위). Tumor marker 1차 X. 9 평가영역(약물·사회적 추가). 치매 USPSTF I statement |

## Builder 결과
- 8개 v2 B2 md 파일 생성 (간결, sections key vocabulary 18개 + standard에 없는 자유 섹션 무)
- knowledge-bundle.js 끝에 8 entry 추가 (kind:disease, uiHooks:null로 default 상속)
- 주요 keyword alias 등록 (한글/영문)
- prompts.js TRIAGE_PROMPT calcCategories에 5개 신규 추가 (hypertension·anemia·headache·thyroid-disorder·unintentional-weight-loss). dyslipidemia·osteoporosis·diabetes는 기존 카테고리에 엔트리 충원
- log.md / index.md 갱신

## QA 결과
- node 파싱 검증: bundle 421 keys, 8 신규 entry kind:disease 모두 등록 확인
- section keys 모두 vocabulary 표준 (definition, classification, exam, indication, protocol, monitoring, insurance, comparison, lifestyle, differential, referral) — 자유 섹션 X → uiHooks 기본값 상속 OK
- wikilinks 다른 entry로 cross-reference 추가 ([[CKD]], [[diabetes-dyslipidemia]], [[wegovy]] 등)
- 환자 식별 정보 X 확인

---

## 결과
- 판정: 통과
- 다음 작업: Phase 2 — GROUP A 9~14 (preconception-screening·menopause·fatigue·hematuria·proteinuria·parotitis-differential) + GROUP B REGULATORY 4건 (BMD·breast US·brain metabolism·travel vaccination)

## 회고
- 예상과 달랐던 점:
  - 데노수맙 보험 호전 시 인정 횟수가 인터넷 자료에 잘못 퍼져 있음 — 2024.12 고시 정정 필요
  - SGLT-2i eGFR 기준이 2024 갱신으로 크게 바뀜 (≥20부터 심·신 보호) — 한국 자료에는 옛 기준 잔존
  - Pitava 1mg 강도 분류 한국 vs ACC/AHA 차이 — 한국 임상 통념을 점검
- 다음 세션 반영:
  - inbox 큰 파일은 phase 분할 진행 (8건씩 batch가 적정)
  - Researcher 병렬 호출 효과적 — 단일 명확 prompt + 5줄 출력 형식 강제
  - 검증된 수정사항을 entry 본문에 ⚠ 마킹으로 명시 → 미래 재발 방지
