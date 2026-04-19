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
| **Phase 3B — app.js uiHooks 4-field + confidence 필터 + mounjaro v2 fixture** | 🟡 착수 대기 | — | — |
| Phase 3C — prompts.js KNOWLEDGE_CURATION_PROMPT | ⏸ | — | — |
| Phase 4 — 엔트리 B2 마이그레이션 | ⏸ | — | — |
| Phase 5 — handoff 문서 아카이빙 | ⏸ | — | — |

---

## 2. Phase 3B 범위 (이번 세션에서 해야 할 것)

### 코드 변경 — `src/app.js`
- **엔트리 소비 시점에 v1/v2 dispatch** (bundle 헤더 감지 규칙 준수)
  - `entry.sections ? v2경로 : v1경로`
- **v2 경로 구현**: uiHooks 4-field 순회
  - `uiHooks.hint`  (배열) → Liby 힌트 패널
  - `uiHooks.guide` (배열, `"*"` 허용) → Guide tab 큐레이션
  - `uiHooks.draftAppend` (배열 or null) → Working Draft 하단 append
  - `uiHooks.draftTemplate` (단일 key or null) → Working Draft **전체 교체**
- **RedFlag exclusion**: uiHooks 어떤 field도 RedFlag 패널에 주입 금지 (`rules/data-flow.md` §2)
- **confidence 필터링** (CMO 안전 장치):
  - Liby 감지 confidence 임계값 미만이면 `draftTemplate` 배포 보류 → `draftAppend`로 fallback
  - 임계값 **결정 필요** (초안: 0.8). Designer 단계에서 미르와 확정

### 데이터 추가 — `src/knowledge-bundle.js`
- **mounjaro v2 fixture 엔트리 최초 도입** (end-to-end 검증용)
  - 원본: `knowledge/by-drug/mounjaro.md` (5 섹션: 적응증 / 실비보험 활용 / 시작 용량 / 최대 용량 / 감량 속도)
  - 컴파일 포맷: `skills/knowledge-ingest/SKILL.md` Step 7-B
  - 섹션 매핑 주의: dosing 3개(시작/최대/감량)를 **단일 `dosing` 섹션에 병합** or **자유 섹션으로 분리** 중 하나 — Designer에서 결정
  - uiHooks: drug 기본값 상속 (`hint: [indication, dosing, schedule]`, `guide: [contraindication, precaution, comparison, insurance]`)
  - "실비보험 활용" [TIPS — by 로컬원장님] → `insurance` 섹션, hint로 승격할지는 엔트리 오버라이드 옵션

### 검증 — Chrome 실기
- v1 엔트리 중 무작위 3개 샘플 (BPPV / dizziness / wegovy 등) regression-free 확인
- v2 mounjaro 엔트리 end-to-end:
  - hint에 indication/dosing 뜸
  - guide에 insurance/precaution 뜸
  - RedFlag에 미표시
  - Working Draft 생성 정상
- console 에러 없음

---

## 3. 이미 결정된 것들 (재논의 금지)

### ⭐ draft-template uiHooks 라우팅 — Option A 확정
**Boss 4관점(CMO/CLO/CFO/CVO) 만장일치 (2026-04-19)**

- `uiHooks.draftTemplate`: `"section key" | null` (신규 field)
- **단일 key만 허용** (배열 불허) — 스키마 레벨 거부
- 기본값: `null`
- 의미: Working Draft **전체 교체** (draftAppend = 하단 append와 다른 layer)
- 현재 사용 엔트리: `obesity.md`, `vaccination.md` 2개 (아직 v2 변환 전)

메모리 참조: `project_b2_draft_template_pending.md`

### CMO 안전 장치 (필수 구현)
- draftTemplate는 "전체 교체" 파괴적 동작 — Liby 감지 confidence 기준 필터링 필수
- confidence < 임계값 → draftTemplate 보류 + draftAppend fallback
- 임계값 결정은 Phase 3B Designer 단계 (권고: 0.8)

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
- **UI Surface: 3개** — Liby 힌트 / Guide tab / Working Draft (RedFlag는 제외)
- **Data Field**: 본격적 변경. bundle entry dispatch + uiHooks 전체 field 소비
- **파일**:
  - `src/app.js` (필수 수정)
  - `src/knowledge-bundle.js` (mounjaro v2 엔트리 추가 — Liby ingest skill 경유가 원칙이나 수동 추가 불가피, 이 예외 Designer 설계서에 명시)
  - **미건드림**: `src/prompts.js` (3C), `src/components/panels.js` (패널 props 변경 없이 app.js 단에서 dispatch)

### 기존 합의 대조 (예상)
- `panel-contracts.md`: Liby hint / Guide tab / Working Draft / RedFlag 역할 경계 — 3B가 역할 확장 아닌 라우팅 구현이므로 무관
- `data-flow.md`: ⭐ **primary ✓ 준수 필수**. 새 primary 추가 변경 있으면 STOP
- `file-ownership.md`: src/app.js 책임 "공유 상태 관리 + 레이아웃 조율" 넘기지 말 것 — 비즈니스 로직은 api.js 위임
- `forbidden.md`: "Liby ingest 후 KNOWLEDGE_BUNDLE 새 키 → Triage 감지 확장 자동 실행" — mounjaro v2 엔트리 추가 시 이 규칙 발동 검토 필요

### 예상 Designer 제약
1. v1 경로 코드 완전 보존 (함수 분리 권장, if-else dispatch)
2. RedFlag 패널 props 변경 금지
3. uiHooks 4 field 순서 고정: hint / guide / draftAppend / draftTemplate
4. confidence 임계값 결정 후 착수 (미르 확정)
5. mounjaro 컴파일 시 dosing 섹션 처리 방식 확정 (병합 vs 분리)
6. rules/data-flow.md matrix 위반 변경 발견 시 STOP 후 미르 질문

---

## 6. 성공 기준 (QA 체크리스트)

- [ ] v1 엔트리 동작 regression-free (Chrome 실기 샘플 3개 이상)
- [ ] v2 mounjaro end-to-end:
  - [ ] Liby 힌트에 indication/dosing 뜸
  - [ ] Guide tab에 insurance/precaution 뜸
  - [ ] RedFlag에 미표시
  - [ ] Working Draft 정상 생성 (draftTemplate 없음, generic template 사용)
- [ ] confidence 필터링 로직 존재 + 테스트 케이스 통과
- [ ] `rules/data-flow.md` matrix primary ✓ 준수 (시나리오 테스트)
- [ ] console 에러 없음
- [ ] `git diff` 스코프: `src/app.js` + `src/knowledge-bundle.js` (mounjaro 엔트리만)

---

## 7. 위험·GOTCHA

### 높음
- **draftTemplate 파괴적 동작**: Working Draft 전체 교체 — confidence 필터링 누락 시 오감지로 전체 draft 망가짐
- **mounjaro 컴파일의 dosing 처리**: 원본 md에 dosing 관련 섹션 3개(시작/최대/감량). 단일 `dosing` 섹션으로 병합할지, 자유 섹션으로 분리할지 Designer에서 결정 필요
- **Liby ingest 규칙 우회**: mounjaro 엔트리를 수동 추가하는 것은 Librarian 원칙("Liby ingest만 수정 권한") 위반이므로 설계서에 **명시적 예외** 기재 필요 ("Phase 3B end-to-end 검증용 1회 한정 수동 추가")

### 중간
- **kind 감지 vs sections 감지**: v1은 `kind: "disease"|"drug"`만, v2는 `kind: "disease"|"drug"|"topic"`. Consumer는 `entry.sections` 먼저 검사 후 kind 읽기
- **"*" guide 처리**: topic kind 기본값 `guide: ["*"]` — "전체 섹션 순서대로" 의미. 구현 시 순회 로직 주의
- **draftAppend는 배열, draftTemplate은 단일 key**: 쓰임새 다름. 타입 체크 필수

### 낮음
- confidence 0.8 임계값은 초안 — Chrome 실기 중 감지 확인해서 0.7/0.85 등 조정 가능성

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
- `knowledge/by-drug/mounjaro.md` — v2 컴파일 원본

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
- `project_b2_draft_template_pending.md` — **Option A 확정 상태** (단일 key field)

---

## 9. 세션 종료 체크리스트 (3B 완료 시 수행)

1. 다음 세션(3C) 참조 필수? **YES** — 3C가 3B의 uiHooks 경로 소비
2. routine/trigger/CI 영향? **YES** — Deep Extract → bundle compile → v2 경로. 머지 지연 시 drift
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **main 대상 PR 생성 필수**. 머지 후 Phase 3C 진입.

---

## 10. 추천 세션 시작 Prompt (새 세션에서)

```
Phase 3B 진행. sessions/2026-04-20-handoff-to-phase3b.md 읽고 시작해.
```

이 한 줄로 새 세션이 전체 컨텍스트를 얻는다. Architect 호출 → Designer 설계서 → 미르 승인 순으로 진행.
