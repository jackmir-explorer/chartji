# sessions/2026-04-04-remove-final-chart.md

## 세션 정보
- 날짜: 2026-04-04
- 작업: Final Chart / Guideline 탭 완전 제거 (옵션 B)
- 건드린 파일:
  - `src/components/chart-output.js` — 삭제
  - `src/index.html` — chart-output.js script 태그 제거
  - `src/prompts.js` — Final Chart 관련 프롬프트 5개 제거
  - `src/api.js` — Final Chart 관련 함수 3개 제거
  - `src/app.js` — 전면 재작성 (Final Chart·Guideline 관련 상태·함수·렌더 전체 제거)

---

## 결정 배경
옵션 A(단계적 제거) 대신 옵션 B(한 번에 완전 제거)를 선택.
파일 절반 삭제된 상태로 운영하는 것보다 Guideline 탭이 잠깐 없어지는 것이 더 안전하다는 판단.

---

## Builder 결과

### 삭제
- `src/components/chart-output.js` 전체 (parseChartText, SectionBlock, VisitTypeBadge, OnDemandPanel, ProblemCard, GuidelineRenderer, ChartOutput)

### prompts.js 제거 항목
- `BASE_CHART_PROMPT`
- `PROBLEM_LIST_PROMPT`
- `PROBLEM_IMPRESSION_PROMPT`
- `PROBLEM_PLAN_PROMPT`
- `PROBLEM_QUESTION_PROMPT`

### api.js 제거 항목
- `generateBaseChart()`
- `extractProblemList()`
- `generateProblemAnalysis()`

### app.js 제거 항목 (상태)
- `screen`, `chartText`, `loading`, `loadMsg`, `editMode`, `copied`, `problemAnalyses`
- `guidelineText`, `guidelineLoading`

### app.js 제거 항목 (함수)
- `generate()`
- `copyChart()`
- `handleAnalysisUpdate()`
- `handleGuidelineTabClick()`

### app.js 제거 항목 (렌더)
- 탭바 (input/output 전환)
- Guideline 탭 (leftTab 옵션에서 제거)
- 출력 탭 전체 (screen==="output" 블록)

---

## 결과
- 판정: 통과
- 버전: v14 → v15
- 현재 상태: 전사 · Working Draft · 안전 보조 패널(RedFlag·Missing·Triage) 만 남음

## 다음 작업
- 추천검사/치료 탭 신규 구현 (다음 세션)

## 회고
- 예상과 달랐던 점: src/ 루트 파일들이 find로 바로 검색되지 않아 경로 확인 필요했음
- 다음 세션 반영: 새 탭 구현 시 chart-output.js 대신 별도 컴포넌트 파일로 분리할 것
