# sessions/2026-04-20-handoff-to-phase3b.md

> **이 문서는 새 세션이 Phase 3B에 바로 착수할 수 있도록 작성된 handoff.**
> 새 세션에서는 이 파일 + 메모리 + rules/ + knowledge/를 먼저 훑으면 context 확보 완료.

---

## 1. 현재 상태 (한눈에)

| Phase | 상태 | PR | 머지일 |
|---|---|---|---|
| Phase 1 — 섹션 vocabulary + 출처 3-tier | ✅ | [#6](https://github.com/jackmir-explorer/chartji/pull/6) | 2026-04-19 |
| Phase 2 — 도구 개정 + data-flow.md 승격 | ✅ | [#6](https://github.com/jackmir-explorer/chartji/pull/6) | 2026-04-19 |
| Phase 3A — bundle 헤더 docs + file-ownership | ✅ | [#7](https://github.com/jackmir-explorer/chartji/pull/7) | 2026-04-20 |
| Phase 3B — app.js uiHooks 3-field + urticaria v2 fixture | ✅ | main 직접 머지 | 2026-04-21 |
| Phase 3C — prompts.js KNOWLEDGE_CURATION_PROMPT | ⏸ | — | — |
| Phase 4 — 엔트리 B2 마이그레이션 | ⏸ | — | — |
| Phase 5 — handoff 문서 아카이빙 | ⏸ | — | — |

---

## 2. Phase 3B 범위 (이번 세션에서 해야 할 것)

### 코드 변경 — `src/app.js`
- **엔트리 소비 시점에 v1/v2 dispatch** (bundle 헤더 감지 규칙 준수)
  - `entry.sections ? v2경로 : v1경로`
- **v2 경로 구현**: uiHooks **3-field** 순회 (draftTemplate은 Phase 4로 이연 — §3 참조)
  - `uiHooks.hint`  (배열) → Liby 힌트 (DraftTab draftHints)
  - `uiHooks.guide` (배열, `"*"` 허용) → Guide tab 큐레이션
  - `uiHooks.draftAppend` (배열 or null) → Working Draft 하단 append
  - `uiHooks.draftTemplate` → **Phase 3B에서 소비하지 않음**. bundle data layer에 field만 보존.
    v2 경로 Working Draft 생성은 generic template 사용 (v1 동작과 동일).
- **RedFlag exclusion**: uiHooks 어떤 field도 RedFlag 패널에 주입 금지 (`rules/data-flow.md` §2)

### 데이터 추가 — `src/knowledge-bundle.js`
- **urticaria v2 fixture 엔트리 최초 도입** (end-to-end 검증용, 2026-04-21 확정)
  - 원본: `knowledge/by-disease/urticaria.md` (Tier 1~3 출처 정합 완성본 — PMID 4개 / DOI 4개)
  - 사유: 초기에 mounjaro.md로 계획했으나 md 원본에 PMID/DOI 없고 출처 밀도 약함 → 자료 가치 확보 위해
    출처 정합 완성된 urticaria로 교체 (Boss 재검토 결과, §3 소비 경로 재확정과 동일 세션)
  - 컴파일 포맷: `skills/knowledge-ingest/SKILL.md` Step 7-B
  - uiHooks: disease 기본값 상속 (`hint: [protocol]`, `guide: [classification, exam, monitoring, contraindication, pregnancy, referral, differential]`)
  - 자유 섹션 2개: `ocs-short-term-limit`, `not-recommended` (section-vocabulary.md 예시 slugify)
  - 출처 간결 원칙: content에는 가이드라인·저자 이름 수준만, PMID/DOI 정밀 메타는 `primarySources[]` / `sections[].sources[]` 배열에 보관 (Phase 3C/4 렌더링 경로 개통 시 활용)

### 검증 — Chrome 실기
- v1 엔트리 중 무작위 3개 샘플 (BPPV / dizziness / wegovy 등) regression-free 확인
- v2 urticaria 엔트리 end-to-end:
  - hint에 protocol 섹션 뜸
  - guide에 classification/monitoring/pregnancy/referral 큐레이션
  - RedFlag에 미표시
  - Working Draft 생성 정상 (knowledgeCtx inject 없음, generic template)
- console 에러 없음

---

## 3. 이미 결정된 것들 (재논의 금지)

### ⭐ draft-template schema — Option A 확정
**Boss 4관점(CMO/CLO/CFO/CVO) 만장일치 (2026-04-19)**

- `uiHooks.draftTemplate`: `"section key" | null` (신규 field)
- **단일 key만 허용** (배열 불허) — 스키마 레벨 거부
- 기본값: `null`
- 의미: Working Draft **전체 교체** (draftAppend = 하단 append와 다른 layer)
- 현재 사용 엔트리: `obesity.md`, `vaccination.md` 2개 (아직 v2 변환 전)

### ⭐ draft-template 소비 경로 — 의사 수동 선택 확정 (2026-04-20 Boss 재검토)
**Boss 4관점 만장일치 — 자동 swap + confidence 필터 방안 폐기**

- 이전 plan(자동 swap + confidence ≥ 0.8 필터)은 CMO false-positive 파괴 리스크 최대 우려 → 원천 제거 위해 폐기
- **확정 정책**: Working Draft 기본 생성은 generic template. 엔트리에 `draftTemplate` 값이 있을 때
  UI에 "템플릿 적용" 버튼/드롭다운 노출 → 의사 수동 클릭 시에만 전체 교체
- UI wiring은 **Phase 4** (obesity/vaccination v2 마이그레이션 시점)와 함께 구현.
  Phase 3B는 bundle data layer field 보존만.
- 근거: confidence 기계 제거로 (a) CMO 파괴 리스크 소멸, (b) CLO 의사 주도권 명시,
  (c) CFO 코드·유지보수 단순화, (d) CVO 인지부하 감소 — 4관점 모두 개선.

(이전 확정 메모리 `project_b2_draft_template_pending.md`는 repo에 물리 파일로 존재하지 않음 — ghost reference.
본 §3가 확정 상태의 단일 source of truth.)

### 섹션 vocabulary 18개 + uiHooks 기본값 (confirmed 2026-04-19)
- `knowledge/section-vocabulary.md`에 확정
- kind 3종: disease / drug / topic
- uiHooks 기본값은 `rules/data-flow.md` 매트릭스와 정합

### RedFlag 격리 원칙 (rule level, 2026-04-19)
- `rules/data-flow.md` §2 — rule level 명문화
- uiHooks 어떤 field도 RedFlag 대상 ✗ 절대 금지
- Architect가 RedFlag 열 ✓ 추가 변경 즉시 STOP

---

## 4. 세션 시작 시 필수 독해

```
rules/forbidden.md                  - 절대 금지
rules/coding-behavior.md            - 4원칙 (Think Before/Simplicity/Surgical/Goal-Driven)
rules/workflow.md                   - Architect → Designer → 미르승인 → Builder → Reviewer → QA
rules/data-flow.md                  - ⭐ Phase 3B 핵심 계약 (UI × section 매트릭스)
rules/panel-contracts.md            - 4 패널 역할 경계
rules/file-ownership.md             - src/app.js / src/knowledge-bundle.js 책임
knowledge/section-vocabulary.md     - 18개 표준 섹션 + uiHooks 기본값
skills/knowledge-ingest/SKILL.md    - Step 7-B v2 bundle 포맷 (mounjaro 엔트리 컴파일 레퍼런스)
sessions/2026-04-18-b2-schema-design.md  - B2 마스터 설계서
sessions/2026-04-20-b2-phase3a.md   - 직전 세션 기록
```

---

## 5. Architect 호출 예상 진단

### 영향 경계
- **UI Surface: 3개** — Liby 힌트 / Guide tab / Working Draft draftAppend (RedFlag는 제외)
- **Data Field**: bundle entry dispatch + uiHooks **3-field**(hint/guide/draftAppend) 소비.
  draftTemplate은 Phase 4로 이연 (§3 참조).
- **파일**:
  - `src/app.js` (v1/v2 dispatch — 4개 소비 지점)
  - `src/knowledge-bundle.js` (urticaria v2 엔트리 — Liby ingest 1회 한정 예외)
  - `src/prompts.js` (TRIAGE calcCategories에 `urticaria` 1줄 추가 — forbidden.md Liby 규칙 "새 키 → Triage 감지 확장 자동 실행" 반사)
  - **미건드림**: `src/components/panels.js` (패널 props 변경 없이 app.js 단에서 dispatch)

### 기존 합의 대조 (Architect 2026-04-20 진단 결과)
- `panel-contracts.md`: **무관** — 3B는 역할 확장 아닌 라우팅 구현
- `data-flow.md`: **primary ✓ 준수**. urticaria 섹션은 전부 표준 key(+ 자유 섹션 2개) — 매트릭스 primary 이동·추가 없음
- `file-ownership.md`: src/app.js 책임 "공유 상태 관리 + 레이아웃 조율" 유지
- `forbidden.md`: "KNOWLEDGE_BUNDLE 직접 편집 금지" — urticaria 수동 추가는 **1회 한정 예외**로 설계서 명시

### Designer 제약 (확정)
1. v1 경로 코드 완전 보존. `entry.sections` 감지 후 if-else dispatch.
2. v2 경로 uiHooks **3-field** 순서 고정: hint → guide → draftAppend.
3. `draftTemplate`은 Phase 3B에서 소비 금지. bundle data layer에서 field만 보존 (Phase 4 UI wiring과 함께 consumer 구현).
4. RedFlagPanel props 변경 절대 금지. Reviewer diff 검사 필수.
5. `"*"` guide 값 처리 (topic kind 기본값) — 전 섹션 순서대로 펼치는 generic 로직. urticaria는 disease라 해당 없으나 구현은 3C 호환되게.
6. urticaria 섹션 컴파일: 표준 섹션 5개(classification/protocol/monitoring/pregnancy/referral) + 자유 섹션 2개(ocs-short-term-limit/not-recommended). section-vocabulary.md 예시 slugify 준수.
7. urticaria 수동 추가는 Liby ingest 원칙의 **1회 한정 예외**. Phase 4 마이그레이션에서 재ingest로 정합성 재확인.
8. v2 경로 Working Draft 정책: `draftAppend`만 literal append. hint/guide content의 prompt inject는 Phase 3C prompts.js 개편과 묶어 결정.
9. 출처 간결 원칙: content는 가이드라인/저자 이름 수준까지만. PMID/DOI 정밀 메타는 `primarySources[]`/`sections[].sources[]` 배열에 보관 (Phase 3C/4에서 UI inject 경로 결정).
10. 구조 문서 업데이트 필요 **없음** — 본 Phase 3B는 기존 rule 계약의 구현.

---

## 6. 성공 기준 (QA 체크리스트)

- [ ] v1 엔트리 동작 regression-free (Chrome 실기 샘플 3개 이상)
- [ ] v2 urticaria end-to-end:
  - [ ] Triage가 "두드러기가 6주 넘었고 Cetirizine 먹어도..." 입력 시 `urticaria` 감지
  - [ ] Liby 힌트에 `protocol` 섹션(Step 1~4) 표시
  - [ ] Guide tab 큐레이션에 classification/monitoring/pregnancy/referral 내용 inject
  - [ ] RedFlag 패널에 미표시
  - [ ] Working Draft 정상 생성 (knowledgeCtx inject 없음, generic template 사용)
- [x] confidence 관련 코드 **전무** (grep 결과 0건)
- [x] draftTemplate 소비는 v1 else 블록 내부 한정 (Phase 4 UI는 이연)
- [ ] `rules/data-flow.md` matrix primary ✓ 준수 (시나리오 테스트)
- [ ] console 에러 없음
- [x] `git diff` 스코프: `src/app.js` + `src/knowledge-bundle.js` + `src/prompts.js` (urticaria 엔트리 + TRIAGE 1줄)

---

## 7. 위험·GOTCHA

### 높음
- **Liby ingest 규칙 우회**: urticaria 엔트리 수동 추가는 Librarian 원칙("Liby ingest만 수정 권한")의 1회 한정 예외. Phase 4 마이그레이션에서 재ingest로 정합성 재확인.
- **draftTemplate 소비 금지**: Phase 3B에서 draftTemplate field를 읽어 Working Draft 교체 코드 작성 금지 (Phase 4 UI와 함께 구현). 실수로 v1 draftTemplate 경로 제거도 금지 — v1 엔트리에는 그대로 남아 있어야 함.
- **출처 배열 사문화 상태**: `primarySources[]` / `sections[].sources[]`는 Phase 3B runtime에서 어떤 UI 경로에도 inject되지 않음. 의사에게 도달하는 출처는 `content` text에 녹아있는 것뿐. Phase 3C/4에서 inject 경로 개통 필수.

### 중간
- **kind 감지 vs sections 감지**: v1은 `kind: "disease"|"drug"`만, v2는 `kind: "disease"|"drug"|"topic"`. Consumer는 `entry.sections` 먼저 검사 후 kind 읽기
- **"*" guide 처리**: topic kind 기본값 `guide: ["*"]` — "전체 섹션 순서대로" 의미. 구현 시 순회 로직 주의
- **draftAppend 타입**: 배열(section key 리스트). 엔트리의 해당 섹션 content를 Working Draft 하단에 순서대로 append.

---

## 8. 참고 파일 위치 (빠른 조회)

### 코드
- `src/knowledge-bundle.js` — v1/v2 공존 선언 완료 (Phase 3A)
- `src/app.js` — v1 경로만 있음, 3B에서 v2 추가
- `src/prompts.js` — KNOWLEDGE_CURATION_PROMPT (3C 대상)
- `src/components/panels.js` — RedFlagPanel/TriagePanel/MissingPanel (props 변경 금지)

### Rules & Knowledge
- `rules/data-flow.md` — ⭐⭐ 매트릭스 (primary ✓ 위반 즉시 STOP)
- `rules/file-ownership.md` — src/app.js 책임, src/knowledge-bundle.js 책임
- `rules/panel-contracts.md` — 4 패널 역할
- `knowledge/section-vocabulary.md` — 18개 + uiHooks 기본값
- `knowledge/sourcing-rules.md` — 3-tier
- `knowledge/by-disease/urticaria.md` — v2 컴파일 원본 (Phase 3B 확정 fixture)

### Skills & Agents
- `skills/knowledge-ingest/SKILL.md` — Step 7-B v2 bundle 포맷 (컴파일 레퍼런스)
- `skills/knowledge-inject/SKILL.md` — inject 로직 (3B 참조)
- `agents/architect.md` — PASS/STOP 규칙
- `agents/librarian.md` — B2 스키마 섹션

### Sessions
- `sessions/2026-04-18-b2-schema-design.md` — ⭐ B2 마스터 설계 (Phase 3 #10-12가 3B 대상)
- `sessions/2026-04-19-b2-phase1.md` — vocabulary/sourcing-rules 확정
- `sessions/2026-04-19-b2-phase2.md` — tools + data-flow.md 신설
- `sessions/2026-04-20-b2-phase3a.md` — bundle 헤더 + file-ownership 블록

### Memory
- `project_b2_draft_template_pending.md` — ghost reference (물리 파일 없음). 확정 상태는 본 문서 §3 참조.

---

## 9. 세션 종료 체크리스트 (3B 완료 시 수행)

1. 다음 세션(3C) 참조 필수? **YES** — 3C가 3B의 uiHooks 경로 소비
2. routine/trigger/CI 영향? **YES** — Deep Extract → bundle compile → v2 경로. 머지 지연 시 drift
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main에 직접 머지** (2026-04-20 확정 원칙, `CLAUDE.md` 참조). PR 생성 금지. 머지 후 Phase 3C 진입.

---

## 10. 추천 세션 시작 Prompt (새 세션에서)

```
Phase 3B 진행. sessions/2026-04-20-handoff-to-phase3b.md 읽고 시작해.
```

이 한 줄로 새 세션이 전체 컨텍스트를 얻는다. Architect 호출 → Designer 설계서 → 미르 승인 순으로 진행.
