# sessions/design-2026-04-24-guide-hint-boundary-reform.md — Designer 설계서

**작업**: Guide tab vs Liby hint 섹션 경계 재정의 — `contraindication`·`precaution`·`pregnancy` primary Guide → hint 이전

**선행**:
- `reports/2026-04-24-boss-report-guide-scope.md` (Boss 보고서)
- Architect PASS 판정 (2026-04-24, 미르 결단 A 경로 선행)
- 선례: 2026-04-24 `referral` guide → hint 이전 / 2026-04-24 Wave 2 `differential` guide → triage 이전 (동일 구조)

---

## [DESIGNER 범위 체크]

- **단일 기능 단위**: ✓ (3개 섹션 primary 이전 + 이에 수반되는 curation prompt·rule 정합 일체)
- **forbidden.md 위반**: 없음 — RedFlag 격리 원칙 무관
- **임상 안전 충돌**: 없음 — 금기·precaution·pregnancy가 처방 시점 push로 이동하여 안전축 강화
- **이전 세션 완료**: ✓ (Wave 2 DDx UI · Wave 1 knowledge R1~R4 · referral 이전 모두 main 반영)
- **file-ownership.md 경계**: bundle 엔트리 override 정리는 Liby ingest 경로 사용 (직접 편집 금지 준수)
→ **통과**

---

## [DESIGNER 설계서]

### 가정 (명시)

1. **매트릭스 이전은 rule level 선언이 본체**: section-vocabulary·data-flow·app.js UIHOOKS_DEFAULTS 3종 동시 동기화. referral/differential 선례와 동일 구조.
2. **bundle override 정리 대상 3건**: `wegovy`·`위고비`·`heart-failure`만 기본값 외 guide override에 `contraindication`을 보유. `src/knowledge-bundle.js` 전수 grep 검증. 나머지는 default 상속이라 default 변경으로 자동 반영.
3. **bundle 직접 편집 금지**: override 정리는 **Liby 재ingest 경로**. 본 설계서는 bundle 수정을 Phase 2로 분리하고 Librarian 호출을 권고. Phase 1(rule + prompt + defaults)만 본 설계서 Builder 범위.
4. **위고비 = wegovy 병렬 엔트리**: 한국어 키 `위고비`는 `wegovy`와 sections/uiHooks 동일. 원본 md는 `knowledge/by-drug/wegovy.md` 1개 — Liby 재ingest 시 양 엔트리 동시 갱신 요구.
5. **heart-failure hint 추가 판단 유보**: 기존 hint는 `["referral","schedule","monitoring"]`로 Boss D안(2026-04-21) 명시적 결정. contraindication을 hint에 추가할지는 Liby의 임상 판단 영역 — 본 설계서는 **guide에서 제거만** 강제하고 hint 추가는 권고에 그침.
6. **curation prompt 정합**: bullet 상한 3~8 → 3~5 축소는 본 범위 포함. Boss 보고서 P4.

### 건드릴 파일

1. `rules/data-flow.md` — 매트릭스 3행 primary 이전 + 결단 주석
2. `knowledge/section-vocabulary.md` — disease/drug uiHooks 기본값 3종 이전 + 주석
3. `src/app.js` — UIHOOKS_DEFAULTS disease/drug 동기화
4. `src/prompts.js` — curation prompt Liby 담당 섹션 목록 갱신 + bullet 상한 3~5
5. `rules/panel-contracts.md` — Guideline Assist 범위 축소 명시

### 건드리지 않을 파일

- `src/knowledge-bundle.js` — 직접 편집 금지. override 정리는 Phase 2 Liby 재ingest
- `src/components/panels.js` · `src/components/sections.js` — UI 렌더 로직 변경 없음 (데이터 경로만 재배선)
- `src/api.js` — LLM 호출 경로 변경 없음
- `src/styles.css` · `src/index.html` — 시각 변경 없음
- `rules/forbidden.md` · `rules/file-ownership.md` — 금지 항목·책임 경계 변경 없음
- `agents/librarian.md` — Phase 2에서 영향 판정, 본 설계서 범위 외
- 다른 엔트리의 원본 md — Phase 2 Liby 작업 시 필요한 3개 md만 해당

---

### 변경 목록 (위험도 오름차순)

#### #1 (위험도: 낮음) — `rules/panel-contracts.md` Guideline Assist 범위 축소

**파일**: `rules/panel-contracts.md`

**old**:
```
## Guideline Assist (온디맨드)
역할: 의사가 버튼을 눌렀을 때만 가이드라인 제공
출력: cue 한 줄 → 본문은 클릭 후 열림
금지: 자동 표시, 지시형 톤
```

**new**:
```
## Guideline Assist (온디맨드)
역할: 의사가 버튼을 눌렀을 때만 가이드라인 제공 — **처방 이전 배경** (분류·비교·장기추적·exam·differential·notes)
출력: cue 한 줄 → 본문은 클릭 후 열림
금지: 자동 표시, 지시형 톤
제외 섹션 (2026-04-24 결단, Liby 힌트로 이전): contraindication · precaution · pregnancy — 처방 결정 시점 push가 본질이므로 Liby hint 전담

## Liby 힌트 (push)
역할: 처방 결정 시점 선제 감지 — indication/dosing/schedule/protocol/referral/contraindication/precaution/pregnancy
출력: 엔트리별 uiHooks.hint 섹션의 bundle 원문
금지: transcript에 없는 일반론 생성, LLM 자유 서술
```

**이유**: Guide tab 범위 축소 + Liby hint 범위 확장 명문화. Boss 보고서 시간축 분업 결론 반영.

**검증 기준**:
- "처방 이전 배경" 문구 존재
- "제외 섹션" 3개(contraindication·precaution·pregnancy) 명시
- Liby 힌트 계약 블록 신설

---

#### #2 (위험도: 낮음) — `rules/data-flow.md` 매트릭스 3행 이전

**파일**: `rules/data-flow.md`

**변경 3종** (한 셀씩):

(a) **`contraindication` row** (line 41)

**old**:
```
| `contraindication` | | ✓ (disease/drug) | | | ✗ 절대 금지 |
```

**new**:
```
| `contraindication` | ✓ (disease/drug) | | | | ✗ 절대 금지 |
```

(b) **`precaution` row** (line 42)

**old**:
```
| `precaution` | | ✓ (drug) | | | ✗ 절대 금지 |
```

**new**:
```
| `precaution` | ✓ (drug) | | | | ✗ 절대 금지 |
```

(c) **`pregnancy` row** (line 43)

**old**:
```
| `pregnancy` | | ✓ (disease) | | | ✗ 절대 금지 |
```

**new**:
```
| `pregnancy` | ✓ (disease) | | | | ✗ 절대 금지 |
```

(d) **결단 주석 블록 신설** — `2026-04-24 — referral primary 이전` 주석 바로 아래:

```
> **2026-04-24 — contraindication·precaution·pregnancy primary 이전**: guide → hint (미르 결단, Boss 보고서 2026-04-24 근거). 처방 결정 시점 push가 본질이므로 Liby 힌트 전담. 선례: 같은 날 `referral` 이전·Wave 2 `differential` 이전과 동일 구조. 영향 엔트리: default 상속 14건은 자동 반영, override 보유 3건(wegovy·위고비·heart-failure)은 Liby 재ingest로 정리(Phase 2). `section-vocabulary.md` uiHooks 기본값 + `src/app.js` UIHOOKS_DEFAULTS 동시 동기화.
```

**이유**: 매트릭스 primary 이전 rule level 선언 + 결단 근거·영향 범위 기록.

**검증 기준**:
- contraindication/precaution/pregnancy 3행 모두 hint 열에 ✓, guide 열 빈칸
- 결단 주석 블록 존재 ("2026-04-24 — contraindication·precaution·pregnancy primary 이전")
- 다른 row 변경 없음

---

#### #3 (위험도: 낮음) — `knowledge/section-vocabulary.md` uiHooks 기본값 갱신

**파일**: `knowledge/section-vocabulary.md`

**변경 2종**:

(a) `kind: "disease"` 블록 (line 84-85)

**old**:
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule","referral"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","notes","prognosis","complications","counseling"],
  "triage":      ["differential"],
  "draftAppend": ["draft-append"]
}
```

**new**:
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule","referral","contraindication","precaution","pregnancy"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","monitoring","insurance","notes","prognosis","complications","counseling"],
  "triage":      ["differential"],
  "draftAppend": ["draft-append"]
}
```

(b) `kind: "drug"` 블록 (line 97-101)

**old**:
```jsonc
{
  "hint":        ["indication","dosing","schedule"],
  "guide":       ["contraindication","precaution","comparison","insurance"],
  "draftAppend": null
}
```

**new**:
```jsonc
{
  "hint":        ["indication","dosing","schedule","contraindication","precaution"],
  "guide":       ["comparison","insurance"],
  "draftAppend": null
}
```

(c) 주석 추가 — 기존 2026-04-24 주석들(93행 referral 주석) 바로 아래:

```
(2026-04-24 — `contraindication`·`precaution`·`pregnancy` primary를 guide → hint로 이전 (미르 결단). 처방 결정 시점 push가 본질. 선례: `referral` 이전과 동일 구조. Override 보유 엔트리 3건(wegovy·위고비·heart-failure)은 Liby 재ingest로 정리. `rules/data-flow.md` + `src/app.js` UIHOOKS_DEFAULTS 동시 동기화.)
```

**이유**: uiHooks 기본값 이전. drug kind의 경우 기본 guide가 `["comparison","insurance"]` 2개로 축소 → override 없는 단순 drug 엔트리의 Guide tab 노출이 크게 줄어드는 것 예상 (대부분 drug는 `comparison` 섹션이 없어 Guide tab이 빈 상태가 될 수 있음 — 이는 Boss 보고서 "정보 밀도 감소는 feature" 원칙과 일치).

**검증 기준**:
- disease hint 배열에 contraindication/precaution/pregnancy 3개 포함
- disease guide 배열에서 contraindication/precaution/pregnancy 3개 제외
- drug hint 배열에 contraindication/precaution 포함
- drug guide 배열은 `["comparison","insurance"]` 2개만 남음
- 결단 주석 블록 존재

---

#### #4 (위험도: 중간) — `src/app.js` UIHOOKS_DEFAULTS 동기화

**파일**: `src/app.js` (line 6-7)

**old**:
```javascript
  disease:{hint:["protocol","indication","schedule","referral"],guide:["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","notes"],draftAppend:["draft-append"]},
  drug:   {hint:["indication","dosing","schedule"],guide:["contraindication","precaution","comparison","insurance"],draftAppend:null},
```

**new**:
```javascript
  disease:{hint:["protocol","indication","schedule","referral","contraindication","precaution","pregnancy"],guide:["classification","indication","exam","protocol","schedule","dosing","comparison","monitoring","insurance","notes"],draftAppend:["draft-append"]},
  drug:   {hint:["indication","dosing","schedule","contraindication","precaution"],guide:["comparison","insurance"],draftAppend:null},
```

**주의**:
- app.js의 disease guide 배열은 이미 Wave 1/R3에서 `prognosis/lifestyle/complications/counseling`이 빠져 있는 상태 (section-vocabulary와 괴리 존재). 본 변경은 **최소 변경 원칙** 준수 — contraindication/precaution/pregnancy만 이동. 괴리 해소는 별도 작업.
- `topic` kind는 변경 없음.

**이유**: rule(section-vocabulary.md + data-flow.md)과 runtime 간 정합 유지. override 없는 엔트리가 즉시 새 매트릭스대로 작동.

**검증 기준**:
- line 6 disease hint에 contraindication/precaution/pregnancy 3개 추가
- line 6 disease guide에서 contraindication/precaution/pregnancy 3개 제거
- line 7 drug hint에 contraindication/precaution 2개 추가
- line 7 drug guide에서 contraindication/precaution 2개 제거
- topic kind 변경 없음
- 앱 부팅 시 JavaScript parse 에러 없음 (CDN + Babel standalone)

---

#### #5 (위험도: 중간) — `src/prompts.js` curation prompt 갱신

**파일**: `src/prompts.js` (line 186~192)

**변경 3종**:

(a) **bullet 상한 축소** (line 188)

**old**:
```
출력: 이 환자 상황에 직접 관련 있는 3~8개 bullet (plain text)
```

**new**:
```
출력: 이 환자 상황에 직접 관련 있는 3~5개 bullet (plain text)
```

(b) **Liby 담당 섹션 목록 갱신** (line 190)

**old**:
```
- 입력 [지식 자료] 블록은 Guide tab에 할당된 섹션만 포함한다. 처방 프로토콜(protocol)·약물 dosing·schedule·indication 같은 "Liby 힌트" 담당 섹션은 이 입력에 들어오지 않는다.
```

**new**:
```
- 입력 [지식 자료] 블록은 Guide tab에 할당된 섹션만 포함한다. Liby 힌트 담당 섹션(protocol·dosing·schedule·indication·referral·contraindication·precaution·pregnancy·lifestyle·follow-up-schedule)은 이 입력에 들어오지 않는다 — 별도 경로(처방 시점 push)로 노출되므로 중복 출력 금지.
```

(c) **Guide 담당 섹션 예시 갱신** (line 191)

**old**:
```
- 들어온 블록 범위 안에서만 bullet을 만든다 (예: classification/exam/monitoring/contraindication/pregnancy/referral/differential/notes 등).
```

**new**:
```
- 들어온 블록 범위 안에서만 bullet을 만든다 (Guide 담당: classification/exam/monitoring/comparison/notes/prognosis/complications/counseling/insurance).
```

**이유**: curation prompt를 새 매트릭스와 정합. LLM이 hint 담당 섹션 문구를 bullet로 만들어내는 백도어 차단 (미르 memory "Guide tab은 ingested 지식만" 원칙 강화). bullet 상한 축소로 정보 밀도 감소.

**검증 기준**:
- line 188: "3~5개 bullet" 문자열 존재
- line 190: "protocol·dosing·schedule·indication·referral·contraindication·precaution·pregnancy" 8개 섹션 명시
- line 191: Guide 담당 섹션 예시에서 contraindication/pregnancy/referral/differential 제거 (differential은 Wave 2 Triage 이전 선례 반영)
- 다른 우선순위·출처 규칙 블록 변경 없음

---

### 임상 안전 확인 필요: **Y (경미)**

- 금기·precaution·pregnancy가 Liby 힌트로 이전 → **처방 시점 push** 강화 = 안전축 강화 방향
- 단기 부작용: Guide tab이 drug 엔트리에 대해 거의 비어 있게 됨 (comparison·insurance만 남음). 일부 엔트리는 Guide tab이 완전히 빈 상태가 될 수 있음 (예: wegovy override가 정리되기 전엔 일시적 중복, 정리 후엔 비어짐)
- 완화: (a) override 정리는 Phase 2로 분리해 즉시 영향 완화 (b) 엔트리 Guide tab이 비어도 Liby hint 쪽에서 전부 노출되므로 **정보 소실 없음**

### 예상 회귀 위험

1. **drug Guide tab 일시적 중복**: wegovy/위고비/heart-failure override가 정리되기 전엔 contraindication이 **hint + guide 양쪽 중복 노출**. Phase 2 Liby 재ingest로 해소. 단기 중복이지만 임상적 해 없음 (경고 강화 방향)
2. **app.js UIHOOKS_DEFAULTS parse 오류**: JavaScript 리터럴 수정만 — parse 검증은 Builder가 브라우저 로드 1회로 확인 가능
3. **override 없는 엔트리의 Guide tab 빈 상태**: drug 엔트리 대다수가 default 상속이므로 즉시 Guide tab이 `comparison/insurance` 2 섹션만 남음. 엔트리에 해당 섹션이 없으면 Guide tab 전체가 "버튼 눌러도 빈 curation" 상태 가능. **미르 철학("정보 밀도 감소 = feature") 원칙상 의도된 결과** — 회귀 아님
4. **L3 Smoke 회귀**: disease/drug uiHooks 기본값 배열 변경 → 기존 smoke가 hard-coded 배열 검증하면 실패 가능. **smoke 스펙 확인 필요** (Builder 단계)
5. **data-flow.md 매트릭스 주석 길이**: 여러 결단이 쌓이며 주석 블록이 증가. 가독성 영향은 경미

---

## Builder 실행 권고 순서

1. **#1** `rules/panel-contracts.md` — rule 선언 선행
2. **#2** `rules/data-flow.md` — 매트릭스 3행 이전
3. **#3** `knowledge/section-vocabulary.md` — uiHooks 기본값
4. **#4** `src/app.js` — UIHOOKS_DEFAULTS 동기화
5. **#5** `src/prompts.js` — curation prompt 정합

## 체크포인트

- #1~#3 완료 후 Reviewer 1차 (rule·vocabulary 정합)
- #4~#5 완료 후 **Chrome QA 필수**:
  - 임의 drug 엔트리(예: wegovy) 감지 시 Liby 힌트 영역에 `contraindication` 노출 확인
  - Guide tab 큐레이션 버튼 누를 때 bullet 3~5개 상한 작동 확인
  - bundle override 3건(wegovy·위고비·heart-failure)은 **일시적 중복 노출 허용** 상태 확인
- L3 Smoke #1 (KB 부팅 무결성) 회귀 경고 없음 확인

## Phase 2 — Bundle override 정리 (본 설계서 범위 외)

Phase 1(위 5개 변경) main 반영 후 Librarian 호출:

1. `knowledge/by-drug/wegovy.md` 재ingest → bundle `wegovy`·`위고비` 엔트리 `uiHooks.guide`에서 `contraindication·dosing·indication` 제거, `hint`는 `contraindication·dosing` 유지 또는 확장 Liby 판단
2. `knowledge/by-disease/heart-failure.md` 재ingest → bundle `heart-failure` 엔트리 `uiHooks.guide`에서 `contraindication` 제거. hint에 추가 여부는 Liby 판단 (기존 Boss D안 `referral/schedule/monitoring`과의 정합 고려)
3. `심부전` 엔트리(heart-failure 한국어) 역시 동시 정리

Phase 2 착수 시점 결단은 미르가 Phase 1 체감 후 별도 발의. 본 설계서는 Phase 2 범위 명시에 그침.

---

## 세션 종료 체크리스트 (CLAUDE.md 준수)

- 이번 변경이 다음 세션에서 참조 필요한가? **YES** — rules/vocabulary 개정, 이후 ingest·entry 설계 전부 본 매트릭스 참조
- routine/trigger/CI 등 자동 시스템 동작에 영향 주나? **YES** — Liby ingest skill이 새 uiHooks 기본값 사용
- 다른 브랜치·외부 시스템 의존 대상인가? **YES** — knowledge/ md 파일 재ingest 필요성

→ **main 직접 머지 대상**. PR 생성 금지 (CLAUDE.md 원칙 준수).
