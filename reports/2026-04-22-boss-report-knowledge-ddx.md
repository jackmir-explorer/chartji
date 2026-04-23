# reports/2026-04-22-boss-report-knowledge-ddx.md — Boss 전략 보고서

- 날짜: 2026-04-22
- 입력: `reports/2026-04-22-boss-review-request-knowledge-ddx.md` (권고 7개)
- 참조: `PROJECT_STATUS.md` v18 · 최근 세션(B2 Phase 5/6, 3층 방어선) · `rules/forbidden.md`
- 4관점: CMO(임상 안전) · CLO(법적 리스크) · CFO(비용·유지보수) · CVO(제품 가치)

---

## 1. 관점별 판정 매트릭스

| | R1 메타필드 | R2 relations[] | R3 섹션 5개 | R4 myth-log | R5 DDx 재활성 | R6 6가드레일 | R7 의뢰 1줄 |
|---|---|---|---|---|---|---|---|
| **CMO** | PASS | PASS | PASS✎ | PASS⚠ | **CONCERN** | PASS | CONCERN |
| **CLO** | PASS | PASS | PASS | PASS✎ | **CONCERN** | PASS | PASS✎ |
| **CFO** | PASS | PASS | PASS✎ | PASS | PASS | PASS | PASS |
| **CVO** | PASS | PASS | PASS | PASS | **PASS(최고)** | PASS | **CONCERN** |

범례: PASS / PASS✎(조건부 주석) / PASS⚠(주의) / CONCERN / STOP

---

## 2. 관점별 상세

### CMO (임상 안전)

**R3 PASS✎** — `counseling`·`complications` 섹션이 draftAppend로 흘러가면 transcript 근거 없는 합병증 서술이 Working Draft에 섞일 위험. `rules/data-flow.md` 매트릭스에서 두 섹션 모두 **Guide Tab primary**로 고정 (draftAppend 배제).

**R4 PASS⚠** — myth-log는 절대로 inject 경로(hint/guide/draftAppend)에 노출 금지. "미신" 문구가 환자 상담 맥락에 튀면 혼란 유발. RedFlag 격리 원칙과 동일한 강도의 격리 필요. `agents/librarian.md` inject 트리거에서 `kind: "myth"` 전면 차단 조항 추가 필수.

**R5 CONCERN** — DDx 표시의 anchor bias는 이론적으로 예측되지만 실증 없음. 이번 감사에서 제시한 "ingested readonly는 본인 기억의 외화지 AI anchor가 아님"은 가설. **3개월 실기 측정 조건부 PASS**. 측정 항목: Zebra 노출에 의한 오진 회피 사례 수 / false silence(미등록 질환) 빈도 / 의사 dismiss 누르는 주기.

**R7 CONCERN** — 의뢰 단서가 ingested referral.indication에만 의존할 때, 등록 안 된 질환의 "의뢰 필요 여부" 공백이 false reassurance로 작용할 수 있음. "감지 없음" 상태를 명시 렌더 필수 (Missing Checklist와 동일 원칙).

### CLO (법적 리스크)

**R4 PASS✎** — myth-log는 **brand internal 자산**으로 격리. export·외부 공유 포맷 금지. "의사가 이런 미신을 가졌었다"가 외부 문서화되면 법적 해석 가능. `rules/forbidden.md` 외부 공유 §에 "myth-log export 금지" 항목 신설 권고.

**R5 CONCERN** — "AI가 진단 유도"로 해석될 여지가 UI 표기로 좌우됨. **면책 문구 필수**: Triage 패널 DDx 영역에 `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` 상시 노출. 이 문구 없이 재활성화 불가.

**R7 PASS✎** — 의뢰 기준 표시 자체는 표준 판단 보조 범위. 단 "표시된 기준에 해당하지 않는 환자를 의뢰하지 않음"이 사후 책임 논란이 될 때의 면책: referral 영역에도 동일 "ingested only" 문구 상시 노출.

### CFO (비용·유지보수)

**R1~R7 모두 PASS 또는 PASS✎** — 신규 API 호출 0, 프롬프트 길이 증가 미미, 파이프라인 재활용이 핵심. 주의점:

**R3 PASS✎** — 섹션 5개 추가는 `section-vocabulary.md` + `rules/data-flow.md` 매트릭스 + `knowledge-ingest/SKILL.md` + `src/app.js` `UIHOOKS_DEFAULTS` 4곳 동시 업데이트. Architect가 설계서에 4곳 명시 강제.

**R5+R6+R7 묶음 총비용 추산** — panels.js UI 로직 + panel-contracts.md 개정 + data-flow.md 매트릭스 행 추가 + bundle 스키마 `source` 필드. 1~2 builder 세션 내 완료 가능. CFO 부담 낮음.

### CVO (제품 가치)

**R5 PASS(최고)** — Chartji 핵심 원칙 "의사가 빠트려서는 안되는 사항들을 간단하고 선명하게"와 `scope.md` "Horses first / Zebra 놓치지 않기" 철학이 **진료 중 UI로 구현**되는 유일한 경로. 현재는 철학이 knowledge 분류에만 살아있고 진료 흐름에 발화 안 됨. R5 채택 시 본질 정렬 ↑↑.

**R7 CONCERN** — Triage Panel에 CC + DDx + 의뢰 3단 구조는 비대화 위험. "하나의 패널 하나의 역할" (`panel-contracts.md`) 원칙과 긴장. **Designer 단계에서 분리 배치 재검토 필수**: 경로 대안 (a) Triage 하단 3단 vs (b) DDx는 Triage 하단, 의뢰는 Red Flag 옆 mini-panel 분리. CVO는 (b) 선호.

**R1~R4 PASS** — 장기 토대 투자로 인정. "기능만 늘어난 것 아닌가" 우려 해소: R1/R2/R4는 UI 직접 노출 없음, R3은 기존 섹션과 동일 라우팅에 편입. 제품 복잡도 증가 미미.

---

## 3. 종합 판단

### 채택 권고 매트릭스

| 권고 | 판정 | 조건 |
|---|---|---|
| **R1** 메타필드 4개 예약 | **즉시 채택** | 없음 |
| **R2** relations[] 도입 | **즉시 채택** | Liby ingest 시 kind 자가검증 |
| **R3** 섹션 5개 추가 | **즉시 채택** | data-flow.md 매트릭스 primary 셀 4곳 동시 개정 |
| **R4** myth-log/ 폴더 | **조건부 채택** | inject 경로 전면 격리 + export 금지 명문화 |
| **R5** DDx 재활성화 | **조건부 채택** | R6 가드레일 + CLO 면책 문구 + 3개월 실기 측정 |
| **R6** 6개 가드레일 | **즉시 채택** | R5와 묶음 |
| **R7** 의뢰 1줄 추가 | **보류·재검토** | Designer 단계에서 분리 배치 옵션 비교 |

### 착수 순서 (Boss 권고)

**Wave 1 — knowledge 구조 (저위험, 즉시)**
R1 → R3 → R2 → R4 순. R4는 inject 격리 조항 먼저 선언.

**Wave 2 — DDx UI (중위험, Architect 경로)**
R5+R6 묶음. Designer 설계서 최상단에 CLO 면책 문구 · CMO 3개월 측정 항목 · panel-contracts.md 개정안 동시 제출.

**Wave 3 — R7 재논의**
Wave 2 Designer 단계에서 분리 배치 대안 비교. (a) Triage 3단 vs (b) 의뢰 mini-panel 분리. CVO 우려 해소 방안 확정 후 착수.

### Phase 5 관계

현재 B2 Phase 5(잔여 v1 엔트리 마이그레이션) 진행 중. Boss 권고: **Wave 1의 R1(메타필드 빈 값 예약)만 Phase 5 착수 전 선제 삽입** (어차피 v2 변환 중 같이 심는 게 최저비용). 나머지는 Phase 5 완료 후.

### Architect STOP 판정 우려 항목

- **R3 섹션 5개 추가**: `data-flow.md` 매트릭스 5행 신설 — primary 셀 변경 규칙상 Architect STOP 후 미르 확인 절차 필수.
- **R5 DDx 재활성화**: Triage Panel 역할 계약 변경 (`panel-contracts.md`) + `differential` section key의 Triage readonly primary 신설 — Architect 경로 2중 필수.

### 유보·재검토 필요

- **R7** — Designer 단계에서 분리 배치 대안 (a)/(b) 비교 후 재확정.
- **R5 실기 측정 이후 재판정** — 3개월 후 2차 Boss 세션에서 anchor bias 실측 데이터 기반 재판정. 측정 실패 시 DDx 재봉인 roll-back 가능성 유지.

---

## 4. 미르에게 전달

채택 조합은 **R1+R2+R3(수정)+R4(격리조항)+R5+R6 = 6개 즉시/조건부 채택, R7 보류**.

다음 행동:
1. Wave 1 R1 선제 삽입 여부 결단 (Phase 5 진행 중 같이 심을 것인가)
2. Wave 2 R5+R6에 대한 Architect 호출 타이밍 결단
3. R7 분리 배치 (a)/(b) 중 초기 선호 표명 (Designer 진입 전 방향 설정)
