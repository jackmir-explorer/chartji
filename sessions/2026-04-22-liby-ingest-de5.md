# sessions/2026-04-22-liby-ingest-de5.md

## 세션 정보
- 날짜: 2026-04-22
- 작업: Deep Extract 5건 → Liby v2 B2 bundle 반영 (오늘 PR #11 머지된 md 파일들)
- 트리거: 미르 "liby. deep extract 된 내용들 ingest 해줘"
- 건드린 파일:
  - `src/knowledge-bundle.js` — v2 엔트리 5개 추가
  - `src/prompts.js` — TRIAGE calcCategories 5 항목 추가
  - `src/index.html` — cache-bust (`knowledge-bundle.js?v=de5-ingest`, `prompts.js?v=triage-de5`)
  - `knowledge/index.md` — 신규 5건 등재
  - `inbox/scout/2026-04-22.md` — 5 항목 마커 `[⏳ PR#11]` → `[✓]` (PR 방식 처리분 정리)

---

## 결정 배경

이번 ingest는 **오늘 세운 3층 방어선의 첫 실전 적용** (`sessions/2026-04-22-3layer-defense-ingest-audit.md`).

미르 confirm된 판단:
1. **LPR**: 옵션 B — 기존 v1 3 aliases (`LPR`/`후두염`/`인후두역류`) 본문 불변, San Diego Consensus는 **`LPR-consensus` topic으로 격리**
2. **vitamin-d**: kind는 **topic** (md 파일 위치는 by-drug지만 본문 중심이 가이드라인 입장 해석 → topic 분류가 자연스러움)
3. **parents 전부 부여 안 함**: 5건의 논리적 parent 후보(gerd·diabetes·anaphylaxis) 모두 bundle 미존재 → SKILL.md "부여 제외 케이스" 적용 (topic 3건은 부여 금지, drug 2건은 미존재 제외)
4. **TRIAGE neffy → 아나필락시스 카테고리**: bundle 키는 `neffy`이나 TRIAGE 감지는 임상 맥락(아나필락시스) 우선 — 환자 응급 상황에서 Neffy가 옵션으로 떠오르는 흐름 자연스러움

---

## 수정 내역

### `src/knowledge-bundle.js` — v2 엔트리 5개 추가 (마지막 `};` 직전)

| key | kind | parents | primarySources | TIPS 사용 |
|---|---|---|---|---|
| `LPR-consensus` | topic | — | Yadlapati R. Am J Gastroenterol 2025. PMID:40197644 | — |
| `depression-screening` | topic | — | Mabry-Hernandez IR. AFP 2026. PMID:41839080 | — |
| `sglt2-inhibitors` | drug | — | Swanson J. AFP 2026. PMID:41839088 | indication / contraindication / reimbursement (3 섹션) |
| `vitamin-d` | topic | — | Dakkak M. AFP 2026. PMID:41839092 | dosing (1 섹션) |
| `neffy` | drug | — | Wolf J. AFP 2026. PMID:41839078 | — |

각 엔트리 주석에 ingest 날짜·원본 md 경로 명시.

### `src/prompts.js` — TRIAGE calcCategories 5 항목 추가 (`heart-failure-referral` 다음)

```
LPR-consensus (만성 인후 증상·후두 역류 진단·치료 알고리즘 맥락)
depression-screening (정신건강 선별 맥락)
sglt2-inhibitors (당뇨·심부전·CKD 처방 또는 비뇨생식기 감염 우려 맥락)
vitamin-d (비타민D 결핍·보충·질병예방 상담 관련)
아나필락시스 (응급 알레르기 처치 맥락 — Neffy/EpiPen 포함)
```

`아나필락시스` 카테고리 → bundle keyword 매칭으로 `neffy` 엔트리 inject. 추후 `urticaria` 등도 같은 카테고리에서 함께 노출될 여지.

### `src/index.html`
- `knowledge-bundle.js?v=hf-ingest` → `?v=de5-ingest`
- `prompts.js?v=label-guard` → `?v=triage-de5`

### `inbox/scout/2026-04-22.md`
- 5 항목 `[⏳ PR#11]` → `[✓]` (PR 방식으로 처리되었던 마커, 새 routine 명세에 맞춰 정리)

---

## 3층 방어선 첫 실전 적용 결과 (회고적 검증)

### TIPS 공식화 (`[TIPS — 일반 약리 지식]`) 사용 4건
| 엔트리 | 섹션 | 사용 이유 |
|---|---|---|
| sglt2-inhibitors | indication | Tier 1 출처(AFP 비뇨생식기 감염 논문)는 "비뇨생식기 감염" 한 주제만 — 적응증(당뇨/HF/CKD)은 일반 약리 지식 |
| sglt2-inhibitors | contraindication | DKA/하지절단/Fournier는 일반 SGLT2 약리 — Tier 1 직접 다루지 않음 |
| sglt2-inhibitors | reimbursement | 한국 심평원 기준은 Tier 1 출처 범위 외 |
| vitamin-d | dosing | Tier 1(가이드라인 입장)은 정확한 dosing 프로토콜 직접 다루지 않음 |

**가설 검증**: backlog P0 #1 가설 "sources[] 공백 방치 시 curation primarySources fallback 과의존 발생" → 이번 ingest에서 **TIPS 공식화로 4건의 sources[] 공백 케이스를 자연스럽게 흡수**. curation rule ⑧이 sources[] 배열의 `[TIPS — 일반 약리 지식]` 문자열을 `[출처: TIPS — 일반 약리 지식]`으로 그대로 매핑하므로 라벨 할루시네이션 재발하지 않음.

### 5-C 자가검증 통과
모든 섹션의 주제 키워드 ↔ Tier 1 source 문자열 비교:
- LPR-consensus 모든 섹션 (LPS vs LPRD / 알고리즘 / 후두 과반응) ↔ Yadlapati Am J Gastroenterol 2025 — 일치 ✓
- depression-screening 모든 섹션 (USPSTF 권고 / PHQ / 치료 / 의뢰) ↔ Mabry-Hernandez AFP 2026 USPSTF 요약 — 일치 ✓
- sglt2-inhibitors notes (비뇨생식기 감염) ↔ Swanson AFP 2026 — 일치 ✓ (다른 섹션은 TIPS로 분리)
- vitamin-d indication / notes ↔ Dakkak AFP 2026 Endocrine Society 요약 — 일치 ✓ (dosing은 TIPS로 분리)
- neffy 모든 섹션 (적응증 / 용량 / 처치 / 비교 / 주의) ↔ Wolf AFP 2026 — 일치 ✓

부조화 발견 0건. 사전 방어선 작동 확인.

### 검증된 향후 보강 대상 (Phase 5b — 미르 담당)
- `[TIPS — 일반 약리 지식]` 라벨 4건 → 정확한 약리·심평원 출처로 교체 후보. Auditor 실행 시 sources 공백 감사 + Phase 5b 우선순위 리스트 생성 가능.

---

## 성공 기준 재확인 (QA)

| 기준 | 충족 |
|---|---|
| 5건 v2 B2 형식으로 bundle 등록 | ✓ |
| TRIAGE 감지 5 카테고리 추가 (neffy → 아나필락시스 카테고리) | ✓ |
| 3층 방어선 적용 (TIPS 공식화 + 5-C 자가검증) | ✓ |
| 기존 v1 LPR 3개 본문 불변 | ✓ |
| index.md / scout 마커 / cache-bust 정리 | ✓ |

---

## 판정

**통과** — 3층 방어선 실전 작동 확인. Reviewer 라인 추적 완료, surgical 준수.

---

## 다음 작업

### 즉시 후보
- **Chrome MCP 실기 검증** — 5건 inject 동작 확인
  - 시나리오 1: 만성 인후두 증상 환자 → LPR-consensus 감지 + San Diego 알고리즘 노출 확인 + `[출처: TIPS]` 라벨 0건 (3층 방어선)
  - 시나리오 2: 당뇨+SGLT2 처방 검토 → sglt2-inhibitors 감지 + 비뇨생식기 감염 교육 노출 + TIPS 라벨 적절성
  - 시나리오 3: 비타민D 상담 → vitamin-d indication 광범위 보충 미권고 노출
  - 시나리오 4: 알레르기 응급 → 아나필락시스 카테고리 + Neffy/EpiPen 비교 노출
  - 시나리오 5: PHQ-9 외래 스크리닝 → depression-screening 절차 노출

### 백로그 환원
- **P0 #2** (원래 backlog): heart-failure Chrome 실기 검증 + sources[] 재감사 — 위 시나리오들과 함께 한 세션에 묶어 처리 가능
- **P3 #9** (미르 담당): Phase 5b md 출처 보강 — 오늘 등록한 `[TIPS — 일반 약리 지식]` 4건도 우선순위 후보로 합류

### Routine 자연 검증
- 내일(2026-04-23) 정오 trigger가 누락 10건 자동 복구하는지 관찰 (어제 routine 개편의 효과)

---

## 회고

### 예상과 달랐던 점
- **TIPS 공식화의 실전 가치 즉시 확인됨** — 5건 중 2건(sglt2-inhibitors, vitamin-d)에서 "Tier 1만으로 모든 섹션 뒷받침되지 않는" 문제 발생. 어제 만든 `[TIPS — 일반 약리 지식]` 라벨이 이 case들을 자연스럽게 흡수. 라벨이 없었으면 sources[] 공백 → primarySources fallback 과의존 → curation 라벨 할루시네이션 위험. 첫 실전에서 검증됨.
- **parents 부여 가능 case 0건** — 신규 5건의 논리적 parent 후보(gerd·diabetes·anaphylaxis)가 모두 bundle 미존재. parent 엔트리 ingest의 별도 백로그 우선순위 재고 필요.
- **LPR 옵션 B 결정**: 기존 v1 3 aliases 중복 저장 패턴(`LPR`/`후두염`/`인후두역류`)과 충돌 회피 + v1 본문 불변 원칙 보존이 동시에 가능. 추후 Phase 6 후속 정리(v1 aliases → v2 통합)에서 같이 다룰 대상.

### 다음 세션 반영
- Chrome 실기에서 LPR-consensus 감지가 기존 v1 LPR과 함께 동시 inject되는지 (중복 노출 우려) 관찰. 중복 시 prompt에서 "동일 주제 엔트리 중 v2 우선" 규칙 추가 검토 가능.
- TIPS 라벨이 curation 출력에서 어떻게 보이는지 직접 관찰 (`[출처: TIPS — 일반 약리 지식]`). 미르 입장에서 이 표기가 진료 신뢰도에 어떤 영향 주는지 피드백 필요.
- 신규 카테고리 5건 중 한국어 카테고리는 `아나필락시스` 단 1건. 영어 카테고리(`LPR-consensus`·`sglt2-inhibitors`·`vitamin-d`·`depression-screening`)와 불균등 — TRIAGE 일관성 점검 여지.

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — 5건 새 엔트리 + 3층 방어선 첫 실전 데이터 + Chrome 실기 검증 대상.
2. routine/trigger/CI 영향? **YES** — Triage 감지 카테고리 변경, bundle 변경. main 기준 즉시 적용.
3. 다른 브랜치·외부 시스템 의존? **YES** — 앱 Guide/Hint/Draft 실제 노출은 main 기준.

→ **Claude가 main 직접 머지**.
