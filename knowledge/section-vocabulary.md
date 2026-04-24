# knowledge/section-vocabulary.md — B2 스키마 섹션 표준

tags: [META]
updated: 2026-04-24
schema: B2

---

## 목적

B2 스키마에서 knowledge/ 엔트리의 `sections` 딕셔너리가 사용하는 **표준 섹션 key의 vocabulary**를 정의한다.

- 표준 섹션은 Liby ingest가 동의어를 정규화해 고정 key로 저장한다.
- 표준에 없는 고유 개념은 **자유 섹션**으로 보존한다 (원문 섹션명 slugify).
- 표준 섹션은 UI 라우팅 기본값(`uiHooks`)의 앵커가 된다.

**전신 스키마 설계서**: `sessions/2026-04-18-b2-schema-design.md`

---

## 표준 섹션 dictionary (23개)

| key | 정의 | 정규화 대상 동의어 (예시) |
|---|---|---|
| `definition` | 질환·약물 정의 / 개요 | 정의, 개요 |
| `classification` | 분류 기준·표현형 | 분류 기준, 분류, 표현형, phenotype |
| `exam` | 문진·신체진찰 | 문진, 문진/검사, 진찰 |
| `protocol` | 단계별 치료·처방 프로토콜 | 처방/치료, 처방 프로토콜, 단계별 처방, Dose Escalation 프로토콜 |
| `dosing` | 용량·용법·투여 | 용량, 용법, 시작 용량, 최대 용량, 증량, 감량 속도, 투여 |
| `schedule` | 접종·복용 스케줄 (시간차 개념) | 접종 스케줄, 추가접종, 접종 간격 원칙, 접종 대상 및 스케줄 |
| `indication` | 적응증·접종 대상 | 적응증, 처방 적응증, 접종 대상, 대상 |
| `monitoring` | 모니터링 도구·추적검사 | 모니터링 도구, 모니터링, 추적검사 |
| `contraindication` | 금기 | 금기, 절대 금기, Contraindications |
| `precaution` | 주의·상대적 주의 | 주의, 상대적 주의, Precautions |
| `pregnancy` | 임신·수유 | 임신, 임신·수유, 임신·수유부 프로토콜 |
| `differential` | 감별진단 | 감별진단, 감별 |
| `referral` | 의뢰 기준 | 의뢰 기준, 일차의료 의뢰, 일차의료 의뢰 기준 |
| `insurance` | 급여·보험 | 급여 기준, 실비보험 활용, 한국 급여, 한국 급여 기준 |
| `comparison` | 약물·백신 간 비교 | 비교, 종류 비교, 위고비와의 관계, 선택 기준 |
| `notes` | 환자설명용·기타 특이사항 | 왜 이런 증상이 생기나, 환자설명용, 기타 특이사항, 비고 |
| `draft-append` | Working Draft 하단 literal append 텍스트 | Draft 출력사항, [DRAFT_APPEND] |
| `draft-template` | 질환·약물 특이 Draft 스켈레톤 | 질환 특이 Template, [TIPS] Template |
| `prognosis` | 예후·경과 | 예후, 경과, prognosis |
| `lifestyle` | 생활습관 치료 (운동·식이·수면·절주·금연) | 생활습관, 생활습관 치료, 운동·식이, lifestyle |
| `complications` | 합병증 | 합병증, complications |
| `counseling` | 환자 상담 내용 | 환자 상담, 상담 내용, counseling |
| `follow-up-schedule` | 추적 스케줄 | 추적, 추적 스케줄, follow-up, follow-up schedule |

> 2026-04-24 R3 Wave 1 확장 — 하단 5개(prognosis/lifestyle/complications/counseling/follow-up-schedule) 신설. 미르 결단 2026-04-24: lifestyle·follow-up-schedule은 hint primary (치료 성격), 나머지 3개는 guide primary (설명 성격). `rules/data-flow.md` 매트릭스 동시 개정.

### 제외·재정의 내역

- `sources`는 **표준 섹션이 아님**. 출처는 엔트리 루트 `primarySources[]` + 섹션별 `sources[]`로 분산 저장 (→ `sourcing-rules.md`). 중복 방지.

---

## 자유 섹션 규칙

표준 dictionary에 없는 개념은 자유 섹션으로 보존한다.

### 명명 규칙 (slugify)
- 원문 섹션 제목을 소문자 kebab-case로 변환
- 한글은 영문 의역 (의미가 명확한 경우) 또는 로마자 표기 (고유명사)
- 예시:
  - `단기 경구 스테로이드 (OCS) — 제한적 사용` → `ocs-short-term-limit`
  - `NOT Recommended (가이드라인 명시)` → `not-recommended`
  - `가글 처방 제조법` → `gargle-recipe`
  - `GLP-1 반응 예측 인자` → `response-predictors`
  - `GLP-1 Interval Tx 유지 전략` → `interval-therapy`
  - `노출 전 예방 (Pre-exposure Prophylaxis)` → `exposure-prophylaxis`

### 승격 조건 (자유 → 표준)
동일 의미의 자유 섹션이 **3개 이상 엔트리**에서 반복 등장하면 Auditor가 표준 섹션 승격을 제안한다. 승격은 이 파일 업데이트 + 기존 엔트리 재ingest로 실행한다.

---

## uiHooks 기본값 (kind별)

엔트리에 `uiHooks`가 명시되지 않은 경우 아래 기본값이 적용된다. 엔트리는 부분 오버라이드 가능.

### `kind: "disease"`
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule","referral","contraindication","precaution","pregnancy"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","monitoring","insurance","notes","prognosis","complications","counseling"],
  "triage":      ["differential"],
  "draftAppend": ["draft-append"]
}
```
(2026-04-21 Phase 5a 확대 — 백신 엔트리 indication/schedule/insurance 노출 위해. 기존 obesity·dysphonia·urticaria 동작은 교집합 원리로 안정.)
(2026-04-24 R3 확장 — lifestyle·follow-up-schedule은 치료 성격이므로 hint, prognosis·complications·counseling은 설명 성격이므로 guide. 미르 결단 2026-04-24.)
(2026-04-24 Wave 2 — `differential` primary를 guide → triage readonly로 이전 (미르 결단 Q1 옵션 B). 신규 필드 `triage` 도입. Phase 3 runtime 시 `UIHOOKS_DEFAULTS`·`getUiHooks`에서 triage 필드 소비 구현 필요 — 본 Wave는 rule 선언 + 현재 v1 `differentialShort` 렌더만 담당.)
(2026-04-24 — `referral` primary를 guide → hint로 이전 (미르 결단). R7 패널 분리안 불도입, 기존 hint 경로 재활용으로 의뢰 기준을 처방 맥락에서 확인.)
(2026-04-24 — `contraindication`·`precaution`·`pregnancy` primary를 guide → hint로 이전 (미르 결단, Boss 보고서 `reports/2026-04-24-boss-report-guide-scope.md` 근거). 처방 결정 시점 push가 본질. 선례: 같은 날 `referral` 이전과 동일 구조. Override 보유 엔트리 3건(`wegovy`·`위고비`·`heart-failure`)은 Liby 재ingest로 정리(Phase 2). `rules/data-flow.md` + `src/app.js` UIHOOKS_DEFAULTS 동시 동기화.)

### `kind: "drug"`
```jsonc
{
  "hint":        ["indication","dosing","schedule","contraindication","precaution"],
  "guide":       ["comparison","insurance"],
  "draftAppend": null
}
```

### `kind: "topic"`
```jsonc
{
  "hint":        [],
  "guide":       ["*"],
  "draftAppend": null
}
```

`"*"`는 **섹션 순서대로 전부**를 의미한다 (Guide tab 큐레이션).

### 보류 사항 — `draft-template` 라우팅
`draft-template` 섹션의 UI 라우팅은 **Phase 3(runtime 지원)에서 재논의**. Phase 1/2는 dictionary에 등록하되 uiHooks 연결 없이 보존만 한다.

---

## parents 메타 필드 (엔트리 루트, 2026-04-21 도입)

child 엔트리가 상위(parent) 맥락 주입이 필요할 때 선언하는 배열 필드.

```jsonc
{
  "parents": ["상위 엔트리 key", ...]
}
```

- 위치: 엔트리 루트 (`sections`·`uiHooks`와 동일 레벨)
- 타입: `string[]` (단일 string 불허)
- 동작: `src/app.js` `expandWithParents()` 헬퍼가 detectedCalcs → 확장 키 배열로 변환. 8개 inject 지점 공통 소비. Bundle consumer 로직 아님.
- parent 미존재 시 silent-skip (warning 없음). Liby ingest 시 "parent 선행 존재" 확인 의무 (→ `skills/knowledge-ingest/SKILL.md`).
- dedup은 app.js 측에서 `Array.from(new Set(...))` 보장.
- **금지**: hint/draft/guide 차등 확장 (단일 배열 단일 경로). `topic` kind 엔트리에는 parents 부여 금지.

예:
```jsonc
"BPPV": {
  "kind": "disease",
  "parents": ["dizziness"],
  "exam": "...",
  ...
}
```

> **2026-04-24 R2 예고**: parents 필드는 `relations[]` kind:"parent"로 **6개월 후(2026-10-24) 자연 퇴장** 검토. 그 전까지는 parents 우선(기존 expandWithParents 경로 유지), relations[] kind:"parent"는 관찰용.

---

## 엔트리 루트 메타필드 — R1 (2026-04-24 Wave 1 도입, 빈 값 예약)

`version`, `supersedes`, `freshness.primarySourceYear`, `applicability` 4개 필드를 엔트리 루트에 예약한다.

- 현재는 **모두 빈 값 `(미정)`**. Phase 5 이후 의미 정의 시 값 채움.
- 타입(예정):
  - `version`: string — 엔트리 버전 태그 (예: `"2026.04"`)
  - `supersedes`: string — 대체된 이전 엔트리 키 (없으면 `(미정)`)
  - `freshness.primarySourceYear`: integer — 대표 출처 연도 (예: `2024`)
  - `applicability`: string — 적용 범위 메모 (예: `"외래 성인 당뇨"`)
- md 파일 상단 frontmatter-like 블록에 `tags:`, `keywords:` 아래에 기재.
- **bundle consumer는 아직 소비하지 않음** — rule level 예약만.

---

## 엔트리 루트 메타필드 — R2 (2026-04-24 Wave 1 도입, relations[])

`relations[]` 배열을 엔트리 루트에 도입한다.

- 타입: `Array<{kind: string, target: string, note?: string}>`
- kind 5종 (초기): `parent` · `coprescribe` · `contraindicate` · `supersede` · `synergy`
- target: 엔트리 key (예: `"obesity"`)
- **parents 필드와 병존**: 6개월 후(2026-10-24) 자연 퇴장 검토. 그 전까지는 **parents 우선** (기존 `expandWithParents` 경로 유지), relations[] kind:"parent"는 관찰용.
- Liby ingest 시 kind 자가검증 — 5종 외 값 저장 금지 (→ `skills/knowledge-ingest/SKILL.md`).
- **bundle consumer는 아직 소비하지 않음** — rule level 예약 + 공부용 그래프(Obsidian wikilinks) 보조.

예:
```jsonc
"mounjaro": {
  "kind": "drug",
  "relations": [
    { "kind": "coprescribe", "target": "obesity" },
    { "kind": "contraindicate", "target": "pregnancy" }
  ],
  ...
}
```

---

## Liby ingest 정규화 절차

ingest 시 원문 md 섹션을 다음 순서로 처리한다.

1. 원문 `##` 헤더 추출 → 제목 normalize (공백/대괄호 태그 분리)
2. dictionary 동의어 매칭 시도
   - 매칭 성공 → 표준 key로 저장
   - 매칭 실패 → slugify하여 자유 섹션 key로 저장
3. 섹션 내용을 원문 마크다운 그대로 보존 (표·리스트·subsection 유지)
4. 섹션 헤더의 태그(`[CLINICAL]`, `[TIPS]` 등)는 해당 섹션 `sources[]`의 메타로 첨부
5. 섹션 내부 inline 출처(DOI·PMID·가이드라인명)는 `sources[]`에 중복 기록 금지 — `sourcing-rules.md` Tier 규칙 준수

---

## Auditor vocabulary drift 감지

`agents/auditor.md`가 vocabulary 정규화 상태를 감사한다. 감사 기준:

| 항목 | 판단 기준 |
|---|---|
| **자유 섹션명 파편화** | 의미상 동일한 자유 섹션이 다른 이름으로 ≥3 엔트리 공존 → 승격 제안 |
| **표준 동의어 누락** | 표준 섹션과 매칭돼야 할 원문 섹션이 자유 섹션으로 빠짐 → 동의어 표 보강 제안 |

### 출력 템플릿 섹션 (Auditor 보고서)
```
## 📚 Vocabulary 정규화 제안
- 유사 자유 섹션 군: [파일명:섹션명, ...]
  제안: 통일명 "___" or 표준 섹션 "___"으로 승격
```

**실행 조건**: B2 v2 엔트리가 존재할 때부터 유의미.

---

## 참조

- 스키마 설계서: `sessions/2026-04-18-b2-schema-design.md`
- 출처 규칙: `knowledge/sourcing-rules.md`
- 인덱스: `knowledge/index.md`
