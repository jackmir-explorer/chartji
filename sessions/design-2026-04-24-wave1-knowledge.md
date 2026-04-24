# sessions/design-2026-04-24-wave1-knowledge.md — Designer 설계서 W1 (Wave 1 Knowledge)

## 세션 정보
- 날짜: 2026-04-24
- 작업: Wave 1 knowledge 스키마 확장 (R1 + R2 + R3 + R4)
- 의존: `agents/architect.md` 진단 (2026-04-24 본 세션) PASS 3건 + STOP 해제 (미르 답변 1~6)

---

## [DESIGNER 범위 체크]

- 단일 기능 단위: ✓ (주제 정합 — Wave 1 knowledge 스키마 확장, Boss 판정 매트릭스에서 "저위험 묶음"으로 확정)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (R4 inject 격리는 안전 강화)
- 이전 세션 완료: ✓ (`sessions/2026-04-23-handoff-knowledge-ddx-next-session.md` §7-4 다음 세션 최우선 순서 진입점)
→ **통과**

---

## [DESIGNER 설계서]

### 건드릴 파일 (6 spec + N 엔트리)

**Spec 파일**
1. `knowledge/section-vocabulary.md` — R1 메타필드 4개 + R2 relations[] + R3 섹션 5개 + parents 퇴장 주석
2. `rules/data-flow.md` — R3 매트릭스 5행 신설 + uiHooks 기본값 갱신
3. `skills/knowledge-ingest/SKILL.md` — R1 템플릿 갱신 + R2 auto-wikilinks Step 신설 + R3 dictionary 연동
4. `agents/librarian.md` — R4 inject 트리거 `kind:"myth"` 차단 분기
5. `rules/forbidden.md` — R4 myth-log inject/export 금지 조항
6. `rules/file-ownership.md` — R4 myth-log/ 경계 + knowledge-bundle.js 주석 문구 R1/R2 반영

**엔트리 파일**
- `knowledge/by-disease/*.md` (21 엔트리) — R1 메타필드 4개 빈 값, R2 relations[] 빈 값, R2 wikilinks 본문 삽입
- `knowledge/by-drug/*.md` (18 엔트리) — 동일
- `knowledge/guidelines/*.md` (4 엔트리) — 동일
- `knowledge/myth-log/glp1-gi-ae-myth.md` (신규) — R4 초기 엔트리 1
- `knowledge/myth-log/glp1-ir-myth.md` (신규) — R4 초기 엔트리 2

### 건드리지 않을 파일 (명시적 제외)

- `src/app.js`, `src/knowledge-bundle.js`, `src/prompts.js`, `src/components/**`, `src/api.js` — **본 Wave에서 runtime 변경 없음**. R1/R2 메타필드는 bundle에서 아직 소비하지 않는다. R3 섹션 5개는 section-vocabulary.md dictionary 등록만. 실제 uiHooks 기본값의 runtime 반영은 Phase 5 / Phase 3 runtime 진입 후.
- `src/templates.js`, `src/components/panels.js`, `src/components/sections.js` — 무관
- `rules/panel-contracts.md` — 무관 (패널 역할 변경 없음, R5 Wave 2 범위)
- `rules/workflow.md`, `rules/coding-behavior.md`, `rules/clinic-scope.md` — 무관
- `routines/scout.md`, `routines/deep-extract.md` — **본 설계서 범위 아님** (별도 설계서 W2)

---

### 가정 (명시)

1. **v1/v2 엔트리 공존**: 현재 엔트리 대부분 v1 레거시 포맷. R1 메타필드는 **파일 상단 frontmatter-like 블록**으로 명시 (현재 `tags:`, `keywords:` 위치와 동일 형식). Phase 5 v2 변환 시 엔트리 루트로 그대로 이주 가능.
2. **빈 값 표기 규약**: 아직 값 미상 → `(미정)` 문자열. `null`/빈 문자열은 쓰지 않음 — 사람이 md를 읽을 때 "의도적으로 예약된 빈 칸"임을 드러내기 위해.
3. **R2 auto-wikilinks 삽입 대상**: keywords 배열 매칭만 — relations[] 기반 삽입은 **Wave 1 범위 밖**. 본문 중 타 엔트리 keywords와 완전 일치하는 한글/영문 토큰을 `[[target-key|원문 토큰]]` Obsidian 형식으로 변환. Step 간 중복 삽입 금지(섹션당 첫 등장만).
4. **백필 1회성**: 42 엔트리 wikilinks 삽입은 본 세션 Builder의 일회성 작업. 이후 신규 ingest는 SKILL.md 개정으로 자동화 편입.
5. **R4 초기 myth 엔트리**: 2건만 신설. 3번째는 미르 결단 보류 — 나중에 수동 추가.

---

### 변경 목록 (위험도 오름차순)

#### #1 (위험도: 낮음) — `rules/forbidden.md` R4 조항 추가

**파일**: `rules/forbidden.md`

**old**:
```
## Liby (Librarian)
- Liby ingest 후 KNOWLEDGE_BUNDLE에 새 키가 추가되면 Triage 감지 확장을 물어보지 말고 자동 실행
- Triage 감지 확장 = TRIAGE_PROMPT calcCategories 목록에 새 항목 추가 (prompts.js)
```

**new**:
```
## Liby (Librarian)
- Liby ingest 후 KNOWLEDGE_BUNDLE에 새 키가 추가되면 Triage 감지 확장을 물어보지 말고 자동 실행
- Triage 감지 확장 = TRIAGE_PROMPT calcCategories 목록에 새 항목 추가 (prompts.js)
- **`kind: "myth"` 엔트리는 inject 경로 전면 차단** — knowledge/myth-log/ 하위 파일은 KNOWLEDGE_BUNDLE 컴파일 대상 아님. Guide tab·Liby 힌트·Draft append 모두 제외. RedFlag 격리와 동일 강도.
- **myth-log export 금지** — 외부 공유 포맷(설사 지원 도입 시에도) 대상 아님. 의사 본인 공부용으로만 존재.
```

**이유**: R4 inject 격리 원칙 명문화. RedFlag 격리와 동일 강도 문구 사용.

**검증 기준**: 해당 파일에 `kind: "myth"` 문자열 2회 이상 등장.

---

#### #2 (위험도: 낮음) — `rules/file-ownership.md` myth-log 경계 추가

**파일**: `rules/file-ownership.md`

**old**:
```
## src/styles.css
```

**new**:
```
## knowledge/myth-log/
책임: 임상 현장에서 반복되는 **미신·잘못된 통념**을 기록. 의사 본인 공부 자원.
포함: 각 myth 엔트리 md 파일 (kind:"myth")
금지: **inject 대상 아님** — Guide tab·Liby 힌트·Draft append·KNOWLEDGE_BUNDLE 컴파일 전부 제외
      export 대상 아님 (외부 공유 포맷 도입 시에도 제외)
      일반 by-disease/by-drug 엔트리를 myth-log로 재배치 금지 (보존 방향 반대)
참조: rules/forbidden.md Liby §, agents/librarian.md inject 트리거 분기

## src/styles.css
```

**이유**: file-ownership.md에 myth-log 경계 등록.

**검증 기준**: `knowledge/myth-log/` 섹션이 `src/styles.css` 섹션 직전에 존재.

---

#### #3 (위험도: 낮음) — `agents/librarian.md` inject 트리거 myth 차단

**파일**: `agents/librarian.md`

**old/new**: 현재 `agents/librarian.md` 내용 미확인 상태(Builder가 먼저 Read 후 inject 트리거 섹션을 식별 → `kind:"myth"` 차단 분기 추가). 설계서 #3은 "inject 트리거 섹션에 `kind:"myth"` 분기 추가"만 지정. **Builder 작업 시 실제 old/new 쌍 확정.**

**이유**: inject 경로 문서 레벨 차단. 코드 레벨은 knowledge-bundle.js 비편집 + compile 제외로 1차 방어, 본 조항은 Liby 스킬 레벨 2차 방어.

**검증 기준**: `agents/librarian.md` 본문에 `kind: "myth"` 차단 문구 1회 이상 등장.

---

#### #4 (위험도: 낮음) — `knowledge/myth-log/glp1-gi-ae-myth.md` 신규

**파일**: `knowledge/myth-log/glp1-gi-ae-myth.md` (신규)

**이유**: R4 초기 myth 엔트리 1. inject 안 되는 구조의 첫 테스트 케이스.

**내용 스펙**:
```markdown
# GLP-1 GI Adverse Event 미신

kind: myth
tags: [MYTH]
keywords: glp1, gi ae, 위장관 부작용, 오젬픽, 위고비

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []

## 통념
"GLP-1 RA는 모든 환자에서 위장관 부작용이 극심하고 장기 순응도가 낮다."

## 실제
- 위장관 부작용은 dose escalation 속도·식이 조절·baseline GI 상태에 따라 크게 다름
- 느린 증량과 환자 교육으로 대부분 관리 가능
- 장기 순응도는 체중 감량 성공 여부와 강하게 연관 — 일괄적으로 낮지 않음

## 왜 이 미신이 퍼지나
- 초기 RCT의 탈락률이 단면적으로 해석됨
- 증량 프로토콜 교육이 미흡한 초기 임상 경험

## 공부 근거
(미정 — Liby ingest 시 PMID·가이드라인 채움)
```

**검증 기준**: 파일 생성 + `kind: myth` 헤더 존재.

---

#### #5 (위험도: 낮음) — `knowledge/myth-log/glp1-ir-myth.md` 신규

**파일**: `knowledge/myth-log/glp1-ir-myth.md` (신규)

**이유**: R4 초기 myth 엔트리 2.

**내용 스펙**:
```markdown
# GLP-1 인슐린 저항성(IR) 개선 미신

kind: myth
tags: [MYTH]
keywords: glp1, insulin resistance, 인슐린 저항성, 당뇨 전단계

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []

## 통념
"GLP-1 RA는 인슐린 저항성을 직접 개선한다 (β세포 복원 + 말초 IR 개선)."

## 실제
- 주 작용은 **체중 감량·섭식 억제 경유**한 간접 IR 개선
- 직접적인 β세포 복원 근거는 제한적 — 체중 감량과 분리된 IR 개선 효과는 논쟁 중
- 체중이 빠지지 않으면 HOMA-IR 변화 폭 작음

## 왜 이 미신이 퍼지나
- incretin 효과의 직접 기전과 2차 효과(체중 감량) 구분이 마케팅에서 흐려짐
- 단기 연구의 IR 호전이 mechanism으로 귀속됨

## 공부 근거
(미정 — Liby ingest 시 PMID·가이드라인 채움)
```

**검증 기준**: 파일 생성 + `kind: myth` 헤더 존재.

---

#### #6 (위험도: 중간) — `knowledge/section-vocabulary.md` R1·R2·R3 통합 갱신

**파일**: `knowledge/section-vocabulary.md`

**변경 3종 묶음 (동일 파일 내 복수 위치)**:

(a) **표준 섹션 dictionary 18 → 23** (`## 표준 섹션 dictionary (18개)` 제목 "18개 → 23개" 갱신 + 표 5행 추가)

새 5행 추가 (R3):
| key | 정의 | 정규화 대상 동의어 |
|---|---|---|
| `prognosis` | 예후·경과 | 예후, 경과, prognosis |
| `lifestyle` | 생활습관 치료 (운동·식이·수면·절주·금연) | 생활습관, 생활습관 치료, 운동·식이, lifestyle |
| `complications` | 합병증 | 합병증, complications |
| `counseling` | 환자 상담 내용 | 환자 상담, 상담 내용, counseling |
| `follow-up-schedule` | 추적 스케줄 | 추적, 추적 스케줄, follow-up, follow-up schedule |

(b) **uiHooks 기본값 (`kind: "disease"`) 갱신**

**old**:
```jsonc
{
  "hint":        ["protocol","indication","schedule"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","differential","notes"],
  "draftAppend": ["draft-append"]
}
```

**new**:
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","differential","notes","prognosis","complications","counseling"],
  "draftAppend": ["draft-append"]
}
```

(주석 추가: `(2026-04-24 R3 확장 — lifestyle·follow-up-schedule은 치료 성격이므로 hint, prognosis·complications·counseling은 설명 성격이므로 guide. 미르 결단 2026-04-24.)`)

(c) **엔트리 루트 메타필드 섹션 신설 (R1 + R2)**

기존 `## parents 메타 필드 (엔트리 루트, 2026-04-21 도입)` 섹션 아래에 새 섹션 추가:

```markdown
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

## 엔트리 루트 메타필드 — R2 (2026-04-24 Wave 1 도입, relations[])

`relations[]` 배열을 엔트리 루트에 도입한다.

- 타입: `Array<{kind: string, target: string, note?: string}>`
- kind 5종 (초기): `parent` · `coprescribe` · `contraindicate` · `supersede` · `synergy`
- target: 엔트리 key (예: `"obesity"`)
- **parents 필드와 병존**: 6개월 후(2026-10-24) 자연 퇴장 검토. 그 전까지는 **parents 우선** (기존 expandWithParents 경로 유지), relations[] kind:"parent"는 관찰용.
- Liby ingest 시 kind 자가검증 — 5종 외 값 저장 금지 (skill 개정).
- **bundle consumer는 아직 소비하지 않음** — rule level 예약 + 공부용 그래프(Obsidian wikilinks) 보조.
```

**이유**: R1·R2·R3 전부 section-vocabulary.md에 정의 기록. primary UI 매핑은 uiHooks 기본값(kind:disease)에 반영.

**검증 기준**:
- "23개" 문자열 존재
- 5개 신설 섹션 key(`prognosis`·`lifestyle`·`complications`·`counseling`·`follow-up-schedule`) 표에 등장
- uiHooks 기본값 hint에 `lifestyle`·`follow-up-schedule` 등장
- `relations[]` 섹션 존재

---

#### #7 (위험도: 중간) — `rules/data-flow.md` 매트릭스 5행 추가

**파일**: `rules/data-flow.md`

**old** (매트릭스 섹션 일부):
```
| `differential` | | ✓ (disease) | | ✗ 절대 금지 |
| `referral` | | ✓ (disease) | | ✗ 절대 금지 |
| `insurance` | | ✓ (drug) | | ✗ 절대 금지 |
| `comparison` | | ✓ (drug) | | ✗ 절대 금지 |
| `notes` | | ✓ (설명용) | | ✗ 절대 금지 |
```

**new**:
```
| `differential` | | ✓ (disease) | | ✗ 절대 금지 |
| `referral` | | ✓ (disease) | | ✗ 절대 금지 |
| `insurance` | | ✓ (drug) | | ✗ 절대 금지 |
| `comparison` | | ✓ (drug) | | ✗ 절대 금지 |
| `notes` | | ✓ (설명용) | | ✗ 절대 금지 |
| `prognosis` | | ✓ (disease) | | ✗ 절대 금지 |
| `lifestyle` | ✓ (disease) | | | ✗ 절대 금지 |
| `complications` | | ✓ (disease) | | ✗ 절대 금지 |
| `counseling` | | ✓ (disease) | | ✗ 절대 금지 |
| `follow-up-schedule` | ✓ (disease) | | | ✗ 절대 금지 |
```

추가: `updated: 2026-04-19` → `updated: 2026-04-24` + "R3 5행 신설 (prognosis/lifestyle/complications/counseling/follow-up-schedule) — 미르 결단 2026-04-24" 주석.

**이유**: 미르 결단 1~5 반영. primary ✓는 row당 1개 원칙 준수.

**검증 기준**: 5개 새 row 존재 + row당 primary ✓ 정확히 1개.

---

#### #8 (위험도: 중간) — `skills/knowledge-ingest/SKILL.md` 개정

**파일**: `skills/knowledge-ingest/SKILL.md`

**변경 3종 묶음**:

(a) **5-B v2 템플릿에 R1 메타필드 + relations[] 반영**

**old** (5-B 템플릿 일부):
```markdown
# {질환명 또는 약물명 또는 주제명}

tags: [CLINICAL|REGULATORY|INSIGHTS|TIPS]   # 파일 전체 성격
keywords: {쉼표 구분 키워드 — Triage calcCategories와 일치}

> primarySources (Tier 1): {파일 전체 대표 출처}
```

**new**:
```markdown
# {질환명 또는 약물명 또는 주제명}

tags: [CLINICAL|REGULATORY|INSIGHTS|TIPS]   # 파일 전체 성격
keywords: {쉼표 구분 키워드 — Triage calcCategories와 일치}

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []

> primarySources (Tier 1): {파일 전체 대표 출처}
```

(b) **새 Step 신설 — auto-wikilinks 삽입 절차 (Step 5-D)**

5-C 바로 뒤에 추가:
```markdown
### 5-D. auto-wikilinks 삽입 (2026-04-24 R2 신설)

ingest 시 본문 중 기존 엔트리 keywords와 완전 일치하는 토큰을 Obsidian wikilinks로 자동 변환.

절차:
1. KNOWLEDGE_BUNDLE 또는 `knowledge/by-disease/`·`by-drug/`·`guidelines/` 스캔하여 모든 엔트리 key + keywords 집계
2. 현재 ingest 대상 md 본문에서 각 keyword와 완전 일치하는 토큰 탐색 (대소문자·한글 어미 고려)
3. 섹션당 첫 등장 1회만 `[[target-key|원문 토큰]]` 형식으로 변환 (중복 wikilinks 방지)
4. 자기 자신 key는 제외
5. relations[] 필드에 명시된 target은 kind 힌트로 활용 가능 (parent kind는 parent 맥락 wikilinks, 단 Wave 1에선 keyword 매칭만 필수)

목적: Obsidian 그래프 뷰에서 엔트리 간 연결 가시화 — 미르 공부 자원.
주의: wikilinks는 md 본문 내부에만 — frontmatter 블록, sources[] 내부 금지.
```

(c) **7-B v2 포맷에 메타필드 4개 + relations[] 설명** — "향후 Phase 3 runtime에서 소비" 주석 포함. Builder가 기존 7-B 섹션에 필드 추가 서술.

**이유**: R1/R2 ingest 워크플로우 편입. 백필 이후 신규 ingest 자동화.

**검증 기준**:
- 5-B 템플릿에 4개 메타필드 행 존재
- "5-D" 헤더 존재
- `[[target-key|원문 토큰]]` 예시 1개 이상

---

#### #9 (위험도: 중간 — 순회) — 43 엔트리 메타필드 4개 + relations[] 빈 값 일괄 삽입

**파일**: `knowledge/by-disease/*.md` (21) + `knowledge/by-drug/*.md` (18) + `knowledge/guidelines/*.md` (4) = **43 엔트리** (README 제외)

**적용 패턴** (Builder 반복 적용):

각 엔트리 파일 최상단 `tags:` + `keywords:` 아래 다음 블록 삽입:

```
version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []
```

**샘플 old/new — `knowledge/by-disease/obesity.md` (실제 형상은 Builder가 Read 후 확정)**

**old 패턴**:
```
# 비만 (Obesity)

tags: [CLINICAL]
keywords: obesity, 비만, BMI, ...

## ...
```

**new 패턴**:
```
# 비만 (Obesity)

tags: [CLINICAL]
keywords: obesity, 비만, BMI, ...

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []

## ...
```

**규칙**:
- `parents:` 필드 있는 엔트리는 **parents 라인 바로 아래**에 삽입 (parents와 relations[]가 시각적으로 인접)
- 기존 엔트리에 이미 해당 필드 존재 시 **skip** (idempotent)
- 본문 내용·섹션 순서 일체 변경 금지

**이유**: R1+R2 빈 값 예약 일괄 삽입.

**검증 기준**:
- 43 엔트리 전부에서 `version: (미정)` 등장
- `relations: []` 등장
- 기존 본문 텍스트 diff는 오직 추가만 (삭제 0건)

---

#### #10 (위험도: 중간 — 순회) — 42 엔트리 auto-wikilinks 백필

**파일**: #9와 동일 43 엔트리 (단, myth-log 신규 2건 제외 → 42 엔트리)

**규칙**:
- #8 (b) 5-D 절차를 Builder가 수동 1회 순회 적용
- **한 섹션당 첫 등장만** 변환 (중복 금지)
- 자기 자신 key 제외
- wikilinks 누락·오변환 발생 시 **해당 엔트리 skip하고 목록 보고** (일괄 자동 변환 실패 허용 — 이후 수동 보정)

**이유**: 백필 1회. 이후 신규 ingest는 5-D로 자동화.

**검증 기준**:
- 최소 20 엔트리 이상에서 `[[` 패턴 등장
- 기존 본문 텍스트 의미 변경 없음 (diff는 토큰 감싸기만)
- 오변환 발생 목록을 세션 기록에 첨부

---

### 임상 안전 확인 필요: N
- 본 설계서는 UI 노출·Bundle consumer runtime 변경 없음 (rule level 예약).
- R4 inject 격리는 안전 **강화** — false positive 줄어듦.

### 예상 회귀 위험

1. **엔트리 md 편집 중 기존 문장 오염**: Builder가 str_replace 중 `tags:` 라인을 오매치하거나 중복 삽입 가능. → **idempotent 규칙**으로 방어 (이미 `version:` 존재하면 skip).
2. **wikilinks 오변환**: 일반 어휘 중 keyword와 우연 일치하는 토큰 (예: "처방" 자체가 어떤 엔트리 keyword일 경우)이 과도하게 링크됨. → **대소문자·어미 엄격 매칭** + 섹션당 1회. 애매한 토큰은 skip 후 목록 보고.
3. **uiHooks 기본값 갱신의 runtime 영향**: Phase 5 bundle v2 컴파일 시점에 새 섹션이 noise로 흘러들 수 있음. 하지만 현재 엔트리에 새 섹션 내용이 없으므로(백지 상태) 교집합 원리로 안전.
4. **data-flow.md 5행 추가가 Architect 재진단 필요 사유 발생 가능성**: 향후 new row의 primary 재배치 요청 시 즉시 STOP — 미르 재확인 절차 명문화됨.

---

## Builder 실행 권고 순서

1. #1 · #2 · #3 (규정 파일 3종) — 10분 이내
2. #4 · #5 (myth 엔트리 2건 신설) — 10분 이내
3. #6 · #7 · #8 (spec 파일 3종) — 20~30분
4. #9 (43 엔트리 메타필드 백필) — 30~45분
5. #10 (42 엔트리 wikilinks 백필) — **분량 많음**. Builder 1 세션에 끝나지 않으면 세션 분할 허용.

---

## 체크포인트

- #1~#8 완료 후 Reviewer 1차 검토 (spec 정합성)
- #9 완료 후 샘플 5개 파일 QA (meta 필드 삽입 정확도)
- #10 완료 후 샘플 5개 파일 QA (wikilinks 매핑 정확도) + 오변환 목록 세션 기록

---

## 별도 설계서 예고

- **설계서 W2 — Scout/DE 개편** (D4 기존 Scout 확장 / D5 DE 산출물 일부 / D6 🔺 제거 + `inbox/study-notes/` 신설 / A층 순수학습용) — 본 설계서 Builder 완료 후 착수 권고. 혼재 시 설계서 규모가 비대해짐.
