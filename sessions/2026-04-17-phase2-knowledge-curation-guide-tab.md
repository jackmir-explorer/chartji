# sessions/2026-04-17-phase2-knowledge-curation-guide-tab.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 2 #4 — Knowledge Surfacing AI 큐레이션 프로토타입 (📖 임상 가이드 탭 신설, 옵션 C)
- 건드린 파일: `src/prompts.js`, `src/api.js`, `src/components/sections.js`, `src/app.js`

---

## Plan B 선행 작업 (같은 세션 내)

| 항목 | 결과 |
|---|---|
| origin/main에 Scout 2026-04-17.md 존재 | ✅ (PR#1 머지 경로로 이미 반영) |
| routines/scout.md Step 7 (main 직접 커밋) | ✅ origin/main에 이미 있음 (971cda0) |
| 로컬 Phase 2 #1/#2/#3 커밋 origin push | ✅ 11a905b까지 push (rebase 후) |
| Scout 트리거 outcome branch `["claude/beautiful-ptolemy"] → ["main"]` | ✅ HTTP 200 |
| 다음 Scout 실행 시각 | 2026-04-18 06:03 KST |

---

## Designer 설계서

### 범위 체크
- 단일 기능 단위: ✓ (knowledge surfacing AI 큐레이션만)
- forbidden.md 위반: 없음 ("요청하지 않은 유연성 금지" 조항 — 프로토타입 최소 범위 고수)
- 임상 안전: ⚠ 증발 리스크 대비 → 원문 인용·출처 보존·Liby 힌트 병존 구조로 해소
- 이전 세션 완료: ✓ (Phase 2 #1/#2/#3 모두 push 완료)

### 옵션 검토 변천
- **1차 제안 (DraftTab 하단 버튼)**: 기존 판단 검토 옆에 작은 버튼 추가
- **미르 지적**: "계산기 탭 쪽에 띄우기로 하지 않았었나?"
- **오해 수정**: 제가 Phase 2 #3 때 미르의 "클릭해야 활성화되는 건 마찬가지잖아"를 "click 비용 동률 → 이동 무의미"로 잘못 해석. 실제 의미는 "클릭해서 활성화되는 구조는 passive load 낮음"이었음.
- **2차 방향**: 방식 1 (전용 탭 신설) 확정

### 출력 공간 활용 논의
- 미르: "계산기 탭 쪽은 출력 공간이 넓으니 지식을 더 충분히 보여줄 수 있지 않을까?"
- 옵션 C (AI 큐레이션 전용 / 원본 DraftTab Liby 힌트 유지)
- 옵션 B (bullet 출처 태그 클릭 토글)
- 옵션 D (감지된 entry 카드 접이식)

### 양 체크 (원본 지식 크기)
- KNOWLEDGE_BUNDLE 79 entries 실측
- 평균: 225자 / 최대: obesity 593자 / 최소: IPV 52자
- 3개 동시 감지 시 최대 ~1400자 (25줄 정도)

### 최종 채택: 옵션 C
근거:
1. DraftTab Liby 힌트가 이미 원본 전체 덤프 담당 — 중복 제거
2. GuideTab 정체성이 "AI가 환자에 맞게 큐레이션"으로 명확
3. 원본 필요하면 Working Draft 탭 → Liby 힌트 ▼ 펼침 (기존 동선)
4. 코드 변경량 30% 감소

---

## Builder 결과

### 변경 #1: prompts.js
`KNOWLEDGE_CURATION_PROMPT` 상수 추가 (+22줄, Line 159+).

출처 표기 우선순위 명시:
- ① 원문 [출처: XXX] 태그 보존
- ② [출처 미확인] 태그도 보존
- ③ 둘 다 없을 때만 [키이름.섹션]

bullet 3~8개 재량. 원문 인용 강제 (환각·재작성 금지).

### 변경 #2: api.js
```js
async function generateKnowledgeCuration(raw,apiKey,knowledgeCtx){
  return callClaude(KNOWLEDGE_CURATION_PROMPT, "...", apiKey, 600);
}
```
DRAFT_REVIEW_PROMPT 다음, Working Draft 앞에 배치.

### 변경 #3: sections.js GuideTab 신설 (+80줄)

```
┌─ 📖 임상 가이드 ────────────────┐
│  감지된 지식: 비만 · 위고비       │
│  [🎯 큐레이션 생성/재생성]       │
│                                 │
│  ═══ AI 큐레이션 ═══             │
│  (bullet 텍스트 영역)            │
└─────────────────────────────────┘
```

- 보라색 테마 (#a78bfa) — Liby 힌트와 동일 "지식 계열" 표시
- 빈 상태·로딩·결과·오류 4가지 UI 전부 처리
- 재생성 시 버튼 문구 "큐레이션 재생성"으로 변경

### 변경 #4: app.js
- state 2개: `curationText`, `curationLoading`
- 탭 헤더: `raw` / `draft` 다음, `CalcTabHeaders` 앞에 조건부 `📖 임상 가이드` 버튼
  - 조건: `detectedCalcs.some(c => KNOWLEDGE_BUNDLE[c])`
  - 로딩 spinner / 결과 ✓ 마커 표시
- 렌더 분기: `leftTab==="guide"` 시 GuideTab 렌더
- onCurate 핸들러: detectedCalcs 순회 → [키.섹션] 라벨과 함께 knowledgeCtx 조립 → generateKnowledgeCuration 호출 → 결과 state 저장

### 케이스 검증
| 시나리오 | 기대 | 결과 |
|---|---|---|
| 지식 감지 0 | 탭 미노출 | ✅ |
| 지식 감지 있음, 미클릭 | 탭 보임, 버튼 활성 | ✅ |
| 버튼 클릭 | 로딩 표시 → bullet 결과 | ✅ (프롬프트 경로) |
| 재클릭 | "재생성" 문구, 결과 갱신 | ✅ |
| apiKey 없음 | 버튼 disabled | ✅ |
| API 오류 | `[오류: ...]` 표시 | ✅ |
| 탭 전환 후 복귀 | 결과 유지 | ✅ (state 유지) |

### 건드리지 않은 파일
- knowledge-bundle.js / templates.js / constants.js / primitives.js / panels.js / styles.css / index.html

---

## Reviewer 결과

| 항목 | 결과 |
|---|---|
| prompts.js 문법 (wrapped eval) | ✅ |
| api.js 문법 | ✅ |
| app.js 괄호/중괄호 균형 (333/333, 298/298) | ✅ |
| sections.js 괄호/중괄호 균형 (256/256, 151/151) | ✅ |
| 스크립트 로드 순서 (prompts → api → sections → app) | ✅ |
| Phase 2 #3 hint 우선순위 로직 무변경 | ✅ |
| DraftTab Liby 힌트 유지 | ✅ |
| file-ownership.md 경계 준수 | ✅ |
| panel-contracts.md "온디맨드" 원칙 정합 | ✅ (Guideline Assist 스타일) |

---

## QA 결과

- 임상 안전성: 원문 인용·출처 보존 프롬프트 강제 + Liby 힌트 교차검증 보존
- 증발 방지: 기존 KNOWLEDGE_BUNDLE / Liby 힌트 / hint 우선순위 로직 전부 무변경
- 회귀 가능성: 낮음 (기존 state·handler 무수정, 새 state 2개·새 분기 1개만 추가)
- UI 영향: 📖 임상 가이드 탭 추가 (조건부) / DraftTab·CalcTabContent·panels 무변경
- 판정: **PASS**

---

## 결과
- 판정: **통과**
- Phase 2 전체 4개 항목 완료:
  - #1 Bundle kind 메타데이터 (commit eb9513e)
  - #2 Ingest skill kind 규칙 (commit 23c51ea)
  - #3 Hint 우선순위 + obesity 계산기 제거 (commit 11a905b)
  - #4 Knowledge Curation 임상 가이드 탭 (이번 세션)

## 회고

### 예상과 달랐던 점
- 미르의 "계산기 탭 쪽에 띄우기" 언급 → 과거 Phase 2 #3 맥락 혼동으로 두 번 재판단 필요했음
- Phase 2 #3의 "클릭 마찬가지" 발언을 "click 비용 동률 → 이동 무의미"로 잘못 해석 → 실제는 "클릭해서 보이는 구조는 passive load 낮음 = 좋은 것"
- 탭이 나쁘다는 뜻이 아니라, **passive load 관리 관점**이었음

### 설계 변천 요약
- 1차: DraftTab 하단 버튼 (틀림 — "계산기 탭" 맥락 놓침)
- 2차: 전용 탭 + 원본 지식 병기 (용량 부담 지적)
- 3차: 전용 탭 + AI 큐레이션 전용 (옵션 C, 최종)

### 다음 세션 반영
- **미르의 원칙 재정리**: "클릭해서 활성화되는 구조는 (지식 양이 많아져도) passive load 관점에서 괜찮다". 능동 조회 UI가 오히려 바람직함.
- "지식이 늘어나 탭이 길어져도 문제 없다"는 판단 기준 — 앞으로 UI 설계 시 자동 노출(auto) vs 클릭 활성(on-click)의 트레이드오프를 명확히 구분.
- 다음 단계 후보:
  - (A) 임상 가이드 실사용 후 피드백 수집 → bullet 개수/출처 포맷/프롬프트 튜닝
  - (B) calc 탭 내부(예: dyslipidemia 탭)에도 "해당 질환 임상 가이드 미니 뷰" 통합 여부 검토
  - (C) Liby 힌트와 임상 가이드 역할 재조정 (중복 vs 보완)
