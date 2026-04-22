# Session — 2026-04-22 L1 B1-patch-v2 (Builder)

## 세션 정보
- 일자: 2026-04-22
- 역할: Builder
- 브랜치: `claude/jovial-lovelace-c6e481`
- 선행 세션: `sessions/2026-04-22-L1B1patch-builder.md` — LPR·xerostomia·BMS 3 unique `treatment → protocol` rename
- 후속 맥락: bundle 전수조사 결과 **동일 실수**가 Liby 2026-04-22 de5 ingest의 v2 엔트리 3건에서도 재발 확인 → scope 확대 patch

## 결정 배경

### 원인 (선행과 동일, 주체만 다름)
직전 patch는 L1 B1 Builder의 승격 실수였으나, 이번은 Liby de5 ingest 자체의 실수. 2026-04-22 ingest된 v2 엔트리 3건이 `sections.treatment` key로 저장됨:
- `LPR-consensus` (line 1680)
- `depression-screening` (line 1704)
- `neffy` (line 1787)

`knowledge/section-vocabulary.md` 표준 18 key 표에 `treatment` 없음 → `protocol`이 표준 ("처방/치료" 정규화). `UIHOOKS_DEFAULTS.{disease,topic,drug}.guide` 기본값에 `treatment` 키가 없어 해당 섹션 content가 Guide tab curation ctx에 전달되지 않는 invisible 상태.

### 왜 L3 스모크가 이번엔 못 잡았나
이 3건은 **다른 섹션**이 Guide ctx에 hit (LPR-consensus.exam, depression-screening.indication/exam/referral, neffy.indication/dosing/notes/contraindication). 스모크는 "엔트리 공백" 판정만 감지 — **부분 누락**은 놓친다. → librarian.md 보강 항목에 이 한계 명시.

### 근본 원인 & 재발 방지
Liby ingest agent가 section-vocabulary.md 표준 18 key를 cross-check하지 않고 자유롭게 key 생성. `agents/librarian.md`에 section key 준수 절차 추가로 체계적 재발 방지.

## 건드린 파일 목록

| 경로 | 작업 |
|---|---|
| `src/knowledge-bundle.js` | 3 v2 엔트리 섹션 key rename + patch 주석 추가 |
| `agents/librarian.md` | "⚠ section key 준수" 서브섹션 추가 (B2 스키마 섹션 내) |
| `src/index.html` | cache-bust `v=L1B1patch` → `v=L1B1patch-v2` |
| `sessions/2026-04-22-L1B1patch-v2-builder.md` | 본 세션 기록 생성 |

**건드리지 않음**: app.js, prompts.js, constants.js, 기타 v1·v2 엔트리, section-vocabulary.md.

## 제거·추가·수정 상세

### 1. `src/knowledge-bundle.js`

#### `LPR-consensus` (line 1680 주변)
- `sections.treatment` → `sections.protocol` (content·sources 불변)
- 엔트리 앞 블록 주석에 한 줄 추가: `2026-04-22 L1 B1-patch-v2: treatment → protocol (vocabulary 정합, Liby de5 ingest 사후 교정)`

#### `depression-screening` (line 1704 주변)
- `sections.treatment` → `sections.protocol` (content·sources 불변)
- 동일 주석 한 줄 추가

#### `neffy` (line 1787 주변)
- `sections.treatment` → `sections.protocol` (content·sources 불변)
- 동일 주석 한 줄 추가

### 2. `agents/librarian.md`
- 삽입 위치: "B2 스키마 (2026-04-19 Phase 2 전환 중)" 섹션 내부, 기존 bullet 리스트 바로 아래, "서브에이전트" 섹션 직전
- 추가 서브섹션: `### ⚠ section key 준수 (2026-04-22 재발 방지)`
  - 표준 18 key + slugify 자유 섹션 규칙 명시
  - 흔한 오류 예시: `treatment` → `protocol`
  - ingest 직전 체크 절차
  - 자유 섹션 사용 시 `uiHooks.guide` 오버라이드 의무
  - invisible 위험 및 L3 스모크 한계 설명 (부분 누락은 못 잡음)
  - 배경 사례(de5 ingest 3건) 언급

### 3. `src/index.html`
- Line 11: `knowledge-bundle.js?v=L1B1patch` → `knowledge-bundle.js?v=L1B1patch-v2`

## 전수 확인 — 이번 세션까지 rename된 엔트리 (6건)

직전 B1-patch (unique 3):
1. `_LPR_v2` → protocol
2. `_xerostomia_v2` → protocol + `protocol-gargle` (자유 섹션)
3. `_BMS_v2` → protocol

이번 B1-patch-v2 (v2 3):
4. `LPR-consensus` → protocol
5. `depression-screening` → protocol
6. `neffy` → protocol

bundle 전체에서 `"treatment"` 섹션 key 잔존 0건 (검증 완료).

## 판정
- Builder 단계 완료
- Reviewer·QA·Smoke 재검증·커밋·main merge는 상위 판단

## 기타 발견
- `LPR-consensus`와 `_LPR_v2`(v1 승격본)는 동일 TRIAGE 카테고리(LPR·후두염·인후두역류)에서 동시 hit 가능. 기존 설계(topic 격리)대로 두 엔트리가 공존하며 다른 섹션(v1: protocol, v2: exam/protocol/notes)을 커버 — 중복 없음.
- `neffy`는 drug kind. `UIHOOKS_DEFAULTS.drug.guide = ["contraindication","precaution","comparison","insurance"]`에 `protocol`이 없음 → neffy.protocol 내용은 **여전히 Guide tab에 노출되지 않는다**. 단, 이는 kind 설계상 의도된 동작 (drug은 dosing/contraindication 중심). neffy 엔트리가 `uiHooks.guide` 오버라이드로 protocol을 추가해야 아나필락시스 처치 순서가 Guide에 노출된다 — 상위 판단 사안.
- `depression-screening` (topic kind, `guide: ["*"]`) 및 `LPR-consensus` (topic): 전체 섹션 순회 대상 → rename 즉시 Guide ctx에 protocol 내용 노출 회복.

## 다음 작업 기대
- bundle 재로드 시 topic 2건(LPR-consensus·depression-screening)의 protocol 섹션 Guide ctx 복구
- neffy.protocol은 `drug` kind 설계상 별도 uiHooks 오버라이드 없이는 미노출 — 상위 결정 필요
- 이후 Liby ingest는 librarian.md 신설 체크 절차 적용

## 회고
- 이번 재발은 Builder가 아닌 Liby ingest 자체에서 발생 → 문서화(librarian.md) 보강이 재발 방지의 유일한 구조적 수단
- L3 스모크의 "부분 누락 놓침" 한계가 실전에서 확인됨. 엔트리 공백 + 섹션별 vocabulary 검증 2중 점검 필요성은 Phase 5c 이후 L3 확장에서 고려
- 3층 방어선(Liby creation + Auditor audit + L3 smoke) 중 **Liby creation 층의 강화**가 이번 교훈

---

## Scope 연장 — neffy uiHooks 오버라이드 (같은 세션, 동일 Builder 흐름)

### 배경
직전 리포트 "기타 발견" (c)-1에서 제기: neffy는 `drug` kind이므로 `UIHOOKS_DEFAULTS.drug.guide = ["contraindication","precaution","comparison","insurance"]` 4 key 기본값에 `protocol`이 없음. treatment → protocol rename 후에도 neffy.protocol 내용이 Guide tab에 여전히 invisible. neffy는 아나필락시스 응급 처치 약물 → 의사가 protocol(비강 투여 용량 2mg/비공, 재투여 5-10분, 응급실 이송)·indication·notes(EpiPen vs Neffy 비교) 전체를 실시간 참고할 필요 있음 → 상위(미르) 판단으로 본 세션에 scope 확대 머지 결정.

### 결정: 옵션 1 `uiHooks: {guide: ["*"]}`
옵션 2(명시 8개 key 나열)와 비교:
- **옵션 1 선택 이유**: (a) 응급 약물 실전 부합 (전체 섹션 노출이 임상 요구와 일치), (b) 미래 섹션 추가 시 자동 포함 (누락 방지 구조적 이점), (c) topic kind(`guide: ["*"]`)와 일관된 패턴 — drug이지만 topic-like 전체 노출 의도 명시.
- 옵션 2의 단점(키 추가 시 수동 갱신 필요, 실수 누락 위험)이 응급 약물에선 치명적.

### 추가 수정 파일

| 경로 | 작업 |
|---|---|
| `src/knowledge-bundle.js` | neffy 엔트리 `uiHooks: null` → `{"guide": ["*"]}` + 블록 주석 3줄 추가 (scope 연장 근거 명시) |
| `agents/librarian.md` | "⚠ section key 준수" 서브섹션 말미에 drug kind 특이 주의 bullet 2개 append |
| `src/index.html` | cache-bust `v=L1B1patch-v2` → `v=L1B1patch-v3` (v2는 treatment→protocol rename용, v3은 neffy uiHooks 반영) |
| `sessions/2026-04-22-L1B1patch-v2-builder.md` | 본 "Scope 연장" 섹션 append |

### librarian.md 추가 bullet 요약
기존 "자유 섹션 사용 시 `uiHooks.guide` 오버라이드 필수" 문단 바로 다음, "배경:" 문단 직전 위치에 삽입:
1. drug kind 기본값이 4 key로 좁다는 구조적 사실 + `{guide: [...]}` 또는 `{guide: ["*"]}` 오버라이드 의무 재명시 (표준 vocabulary key라도 drug 기본값 밖이면 invisible 경고 포함)
2. 응급 약물·전체 정보 노출 엔트리는 `{guide: ["*"]}` 권장 (미래 섹션 자동 포함) + neffy 예시 인라인

동시에 "배경:" 문단에 본 scope 연장 경위(neffy가 rename 후에도 Guide 미노출 → uiHooks 오버라이드 추가) 한 줄 추가.

### 전체 drug 엔트리 동일 문제 가능성 스캔 (본 세션에서 경량 확인)
bundle 내 `kind: "drug"` 엔트리 10건 전수 확인 (Grep `"kind":\s*"drug"` → line 513, 545, 578, 596, 622, 648, 674, 701, 729, 1735). 결과:

| # | 엔트리 | uiHooks 상태 | 기본값 밖 섹션 노출 여부 |
|---|---|---|---|
| 1 | `위고비` (line 513) | `guide: ["indication","dosing","contraindication","insurance"]` 명시 | OK |
| 2 | `wegovy` (line 545) | 동일 명시 | OK |
| 3 | `semaglutide` (line 578) | `guide: ["overview"]` 명시 | OK |
| 4 | `마운자로` (line 596) | `guide: ["indication","dosing","insurance"]` 명시 | OK |
| 5 | `mounjaro` (line 622) | 동일 명시 | OK |
| 6 | `tirzepatide` (line 648) | 동일 명시 | OK |
| 7 | `zepbound` (line 674) | 동일 명시 | OK |
| 8 | `오젬픽` (line 701) | `guide: ["indication","insurance","notes"]` 명시 | OK |
| 9 | `ozempic` (line 729) | 동일 명시 | OK |
| 10 | `neffy` (line 1735) | **이전 `null` → 본 세션에서 `{guide: ["*"]}` 추가** | 해결 |

**결론**: 현 bundle의 drug kind 엔트리 중 동일 invisible 문제 잔존 건수 0. neffy만 단일 사례였고 본 세션에서 해소.

→ 다음 세션 시드(프리벤티브): Liby ingest 시 drug kind 엔트리가 기본값 4 key 외 섹션을 포함하면 `uiHooks.guide` 오버라이드 필수 체크를 ingest SKILL 단계에서 자동 적용. `knowledge/ingest-checklist.md` 형태의 경량 체크리스트 문서화 검토 (현재 librarian.md 안에 문단으로 산재 → 단일 체크리스트 분리 여부 판단 필요).

### 판정
- Builder scope 연장 완료
- Reviewer·QA·Smoke·커밋·main merge는 상위 판단
- drug kind 전수 스캔은 의도적 out-of-scope (경계 준수)
