# sessions/2026-04-21-b2-phase5a-vaccines.md

## 세션 정보
- 날짜: 2026-04-21
- 작업: Phase 5a — 백신 묶음 v2 마이그레이션 + ACIP 2024-2025 반영 (Z-full 에스컬레이션)
- 건드린 파일:
  - md 본문 8건 개정: `knowledge/by-drug/{pneumococcal-vaccine,hpv-vaccine,hepatitis-ab-vaccine,varicella-mmr-polio-vaccine,herpes-zoster-vaccine,rabies-vaccine,tdap}.md` + `knowledge/guidelines/adult-vaccination-summary.md`
  - `src/knowledge-bundle.js`: 기존 31 v1 keys → v2 + 2 신규 topic (vaccine-interval, vaccination-summary) = **v2 키 33개 추가**, bundle size 81 → 83
  - `src/prompts.js`: TRIAGE calcCategories에 vaccine-interval + vaccination-summary 2줄 추가
  - `src/app.js`: UIHOOKS_DEFAULTS.disease.guide **확대** (14개 섹션 포함)
  - `src/index.html`: `app.js?v=phase5a` cache-busting
  - `knowledge/section-vocabulary.md`: disease 기본값 문서 반영
  - `knowledge/log.md` + `knowledge/index.md`: 기록
  - 신규 세션 기록

---

## Architect PASS → Researcher 선발동

5a는 Phase 5c와 달리 vaccine md 품질(PMID 0, CDC 출처만)이 얇아 Researcher 호출 필요.

**Boss 전략 리뷰 Y vs Z**
- Boss 권고 Y (제한적 병렬): 2 배치 × "ACIP 2024-2025 변경 반영 + KDCA 차이점" 2축
- 에스컬레이션 규칙: 중대 변경 **≥3건** 시 Z 자동 전환

## Researcher 2 배치 병렬 → 에스컬레이션 발동

| 배치 | critical | moderate | minor |
|---|---|---|---|
| 1 (핵심 5) | 3 (pneumococcal / HPV / hepatitis) | 1 (zoster) | 1 (tdap) |
| 2 (여행·통합) | 2 (폴리오 / 항암 독감) | 2 (rabies booster / MMR 1967) | 2 |
| **합산** | **5** | **3** | **3** |

임계치 3건의 2.6배 초과 → 미르 판단: **Z-full 간결 버전**.

## 미르 지시 요지

> "다 해버리자. 백신은 꽤 중요하거든. 핵심내용만 담을수 있도록"

→ 완결성 + 간결성 동시 추구. Z 풀 검증하되 과도한 본문 확장 금지.

---

## Critical 5건 — md 본문 개정 요약

1. **pneumococcal**: ACIP 2024.10 **≥50세 PCV-naive universal** PCV15/PCV20/PCV21 체계 전면 개정. MMWR 74(1), 2025 (PMID:39773952) 기반. KDCA 차이 "PPSV23 ≥65세 NIP 유지 + PCV15/20/21 미포함" 명시.
2. **HPV**: 2-dose (<15세 개시) / 3-dose (≥15세 또는 면역저하자) 스케줄 분기 + 27~45세 SCDM 도입.
3. **hepatitis B**: **19-59세 universal** (ACIP 2022) + **Heplisav-B 2-dose** (0·1개월) 추가. KDCA universal 미채택 명시.
4. **폴리오**: 2023 ACIP MMWR 72(49) — 모든 미접종 성인 IPV 확대. "고위험만" 구권고 폐기.
5. **항암 독감**: ANC 500/1000 cutoff **폐기** (ASCO 2024 / IDSA 2025). 타이밍 기반(치료 7일 후·다음 2주 전) 전환.

## Moderate 3건
- **herpes zoster**: 18→**19세** 면역저하자 + ZVL 2020 미국 단종 + 면역저하자 1-2개월 단축 스케줄
- **rabies**: 2022 ACIP titer 기반 booster — "1년 추가·5년마다" 구공식 제거
- **MMR**: md "1967년" 오류 → **CDC 1957 / KDCA 1968** 병기 (국내 기준 우선)

---

## v2 마이그레이션 (33 keys)

**kind 배치**:
- disease (31 keys): vaccination·예방접종·백신 3 + Tdap·파상풍 2 + 대상포진·herpes zoster·shingrix·싱그릭스·조스타박스 5 + 폐렴구균·pneumococcal 2 + HPV·자궁경부암·인유두종바이러스·가다실 4 + A형간염·hepatitis A·B형간염·hepatitis B 4 + 일본뇌염·Japanese encephalitis 2 + 광견병·rabies 2 + 수두·varicella 2 + MMR·홍역·풍진 3 + 폴리오·IPV 2
- topic (2 신규): vaccine-interval + vaccination-summary

**parent 엔트리 vaccination** (3 aliases) — draft-template + draft-append 구조 유지. schedule 섹션에 개별 엔트리 참조 링크.

---

## 중요 발견·수정 (Chrome 실기 중)

### ❗ HPV Guide tab 공집합 문제 (Phase 6 C 개선 부작용)

**증상**: Chrome에서 HPV 단독 감지 시 Guide tab 자체가 뜨지 않음 (`hasGuidableContent: false`).

**원인**: disease 기본값 `guide: [classification,exam,monitoring,contraindication,pregnancy,referral,differential]`와 vaccine sections(indication/schedule/insurance) 교집합 = ∅. Phase 6 C(공집합 시 탭 숨김) 개선이 vaccine에 역작용.

**해결**: disease 기본값 guide 확대 → 14개 섹션 포함(indication·schedule·dosing·comparison·precaution·insurance·notes 등 추가).
- app.js `UIHOOKS_DEFAULTS.disease.guide` 수정
- section-vocabulary.md line 74-82 동기 업데이트

**기존 엔트리 영향 검증**: obesity/dysphonia/urticaria resolved guide 동일성 유지 (교집합 원리).

### Cache-busting

app.js 변경 후 Chrome이 구 버전 캐시. index.html에서 `app.js?v=phase5a` 쿼리 파라미터 추가로 해결.

---

## Chrome 실기 5 시나리오 QA

| # | Transcript 요지 | Triage 감지 | Curation 결과 |
|---|---|---|---|
| 1 | 55세 남환, 대상포진+독감 동시 | 대상포진 · vaccination | ✅ 생+사 동시 접종 가능 / RZV ≥50세 / 발열·아나필락시스 확인 (5 bullet 전부 출처 태깅) |
| 2 | 33세 여환 HPV 희망 | HPV | ✅ **27-45세 SCDM** / **≥15세 3-dose** / KDCA 성인 자비 / 최소 간격 (5 bullet) |
| 3 | 임신 28주 산모 Tdap | 파상풍(Tdap) | ✅ 27-36주 매 임신 / 28주 적기 / 0.5mL 삼각근 (4 bullet) |
| 4 | 65세 남환 폐렴구균 첫 접종 | 폐렴구균 | ✅ KDCA PPSV23 국가사업 / **ACIP ≥50세 PCV20/21 universal** / MMWR 2025 PMID:39773952 태깅 / 국가사업 vs 자비 구분 (5 bullet, 1건만 [출처 미확인] — LLM 매핑 누락) |
| 5 | 55세 여환 항암 3차, ANC 700, 독감 | 예방접종 참조 (수동 추가) | ✅ **ANC 기준 폐기** 명시 / 타이밍 기반 사이클 사이 / ASCO 2024·IDSA 2025 PMID 태깅 (4 bullet) |

**결과**: 5/5 통과 — 핵심 2024-2025 변경사항 모두 LLM curation에서 재현 확인.

**관찰**:
- Triage는 vaccination-summary를 자동 감지하지 못함 — 더 상위 vaccination 키로 통합 선택. 시나리오 5에서 수동 추가로 대체. TRIAGE prompt 설명이 더 specific해야 할 가능성 (후속 개선 후보).
- Scenario 1에서 "조스타박스(RZV)" LLM 문구 오류 (조스타박스=ZVL인데 RZV라고 표기) — bundle 내용은 정확, LLM 문구 오류. 관찰 기록만.

---

## 결과
- 판정: **통과**
- bundle size: 81 → 83 (vaccine-interval + vaccination-summary 신규)
- v1: 64 → 33, v2: 17 → 50 (+33)
- 남은 v1: 임상 증상 8 md 그룹 (dizziness·BPPV·LPR·oral-lesion·burning-mouth·dry-mouth·low-freq-hearing-loss) + 후각 7 aliases + 경부종괴 4 aliases

## 다음 작업 후보
1. Phase 5d — hyposmia + neck-mass (Researcher 검증 이미 완료, 즉시 가능)
2. Phase 5f — mucomyst·pilocarpine drug 분리 ingest
3. resistant-hypertension bundle ingest 누락 해소
4. TRIAGE prompt 세분화 (vaccination-summary 감지 활성화)
5. "조스타박스(RZV)" 같은 LLM 문구 오류 패턴 조사 — curation prompt에 "상품명-백신종류 정확 매칭" 명시 추가

---

## 회고

### 예상과 달랐던 점
1. **에스컬레이션 8건 초과** — Boss 예상 3건의 2.6배. vaccine md가 정말로 오래된 권고(2019-2022 이전) 기반이었음. Phase 5a 자체가 "md 품질이 얇다"는 A 리포트 판정이 정확했고, Researcher로 드러난 변경 폭도 그에 비례.
2. **Phase 6 C 개선의 부작용** — Guide tab 공집합 시 탭 숨김이 vaccine 엔트리(indication/schedule/insurance 중심)에 역작용. disease 기본값을 vaccine-friendly로 확대해야 했다. Phase 6 설계 시점에 vaccine v2 엔트리가 없어서 교집합 문제 예측 불가했음. Phase 5a가 해당 방어선 진단 역할.
3. **LLM의 키 선택 간소화** — Triage에서 vaccination-summary는 감지 리스트에 안 들어가고 상위 vaccination으로 통합. 의도치 않지만 이해 가능 — 하위 키들이 vaccination의 schedule 섹션에 참조 링크되어 있어 LLM이 상위 하나로 충분하다고 판단. prompt engineering 영역.
4. **Chrome cache 문제** — app.js script 태그에 query parameter 없으면 강한 캐시. 개발 중 필수 보강 (phase5a 이후 유지).

### Liby 학습 반영
- 이번 세션 자체가 Phase 6 Liby skill 학습의 실전 적용:
  - uiHooks: 33 엔트리 대부분 `null`로 축소 (disease 기본값 확대 덕분)
  - **예외**: vaccine-interval/vaccination-summary는 topic 기본값 준수로 null
  - primarySources 각 md별로 최신 공식 출처(MMWR·CDC·KDCA) 명시 — 규칙 ⑧ 활용 완벽
- `skills/knowledge-ingest/SKILL.md` 추가 고려사항: **"disease 기본값과 백신 엔트리 섹션 구성 차이"** GOTCHA — 백신 ingest 시 uiHooks 기본값 커버리지 미리 확인 필요. 다만 Phase 5a에서 기본값을 이미 확대했으므로 후속 대응은 불필요.

### 다음 세션 반영
1. vaccine md에 PMID 정밀 보강 (Phase 5b 후속) — 본 세션은 MMWR 번호 + 논문 제목만 primarySources. 추후 각 섹션별 sources[]에 세밀 인용 추가.
2. Phase 5b 진입 전 백신 엔트리를 clinical 실전 시범 운용 허용 — Boss 권고 "draft 표시 유지" 완료(md에 [CLINICAL] 태그), 현장 활용 가능 상태.
3. TRIAGE prompt의 vaccination-summary 설명 더 구체화 (예: "Triage 시 vaccination과 별도 감지, 전체 요약이 필요한 질문에만") — 다음 세션에서 처리.

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — v2 키 33개 구조 + uiHooks 확대 정책이 후속 Phase 5d/5e의 전제
2. routine/trigger/CI 영향? **YES** — main 기준 bundle + prompts + app.js + index.html 모두 변경
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
