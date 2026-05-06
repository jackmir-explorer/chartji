# Knowledge Search Phase 1 신설 — 2026-05-06

## 세션 정보
- 날짜: 2026-05-06
- 작업: Knowledge Search 모드 신설 (구글 메인 스타일, Obsidian 수준 검색 UX) + Guideline Assist 폐기
- 브랜치: `claude/add-knowledge-search-6UhtS`
- 호출: 미르 — "검색기능을 만들어서 내가 검색하면 UI로 나한테 지식을 전달해주는거 어떤가?" → boss → architect → designer → builder
- 건드린 파일:
  - 신규: `src/components/search.js`, `sessions/2026-05-06-knowledge-search-phase1.md`
  - 수정: `rules/panel-contracts.md`, `rules/data-flow.md`, `rules/file-ownership.md`, `src/index.html`, `src/styles.css`, `src/app.js`, `src/components/sections.js`, `src/prompts.js`, `src/api.js`

---

## 결정 배경

### 미르 의도
- knowledge/ 자산(disease 89·drug 21·guidelines 12 + 기타) MD 파일 검색 기능
- 진료 외 깊이 읽기 1순위, 진료 중 빠른 참조 2순위(Phase 2)
- EMR 상용구·약속처방 검색처럼 보강 용도
- Obsidian 수준의 검색 품질
- Guideline Assist는 검색이 흡수, Liby 힌트는 유지 (Phase 1)
- 계산기 탭 제거는 Boss 검토 후 보류 결정

### Boss 4관점 권고 요약
- CMO: 검색은 의사 능동(pull) → AI 의존 risk 낮음. 단 fuzzy match는 ranked list 필수. Liby 힌트 안전 push 보존.
- CLO: pull 방식 SaMD 우호적. Guideline 제거 통과.
- CFO: Guideline·LLM 호출 제거로 단순화. 검색은 클라이언트 only — 토큰 비용 0.
- CVO: "구글 메인 + 임상 안전망" 차별화. 핵심가치 정합.

### Architect STOP→PASS
- 1차 STOP: 매트릭스 §1 충돌 외관 + 신규 surface 합의 필요
- 미르 4결단(UI A옵션 / Guideline 제거 OK / Liby 유지 / RedFlag ignore) → 재진단 PASS
- Designer 제약 7건 부여

---

## 결정 요약 (Q1~Q4)
1. **UI 옵션**: A 모드 토글 (🩺 진료 ⇄ 🔍 검색). 팝업 없음, 인라인 펼침. Phase 2에서 모달(C) pivot 가능성.
2. **Guideline Assist**: 폐기. 검색이 우월하게 대체.
3. **Liby 힌트**: 유지. 안전 push 그물 보존.
4. **RedFlag**: 검색에서 ignore. knowledge에 컨텐츠 없어 자동 제외 + rule level 가드.
5. **data-flow.md**: §6 신설("수동 검색 채널"). §1 매트릭스 무손상.
6. **계산기 탭**: 제거 보류 (Boss 권고).

---

## 변경 상세

### Rules
- `rules/panel-contracts.md`: Knowledge Search 항목 신설, Guideline Assist 폐기 명시
- `rules/data-flow.md`: §6 "수동 검색 채널 — 매트릭스 외 raw 열람" 신설. RedFlag 격리 §2 재확인. myth 자동 제외. Guideline 흡수 명시.
- `rules/file-ownership.md`: `src/components/search.js` 책임 추가

### 신규 코드
- `src/components/search.js`: SearchScreen + buildSearchIndex + extractWikilinks + searchEntries + highlightSearch
  - 다중 토큰 AND, 가중치(title 5/sectionKey 3/content 1), snippet ±40자, 하이라이트
  - wikilink alias 동의어 + backlink 인덱스
  - myth 엔트리 자동 제외 (forbidden.md)
  - 키보드 navigation (↑↓ Enter ESC), 결과 클릭 인라인 펼침

### 수정
- `src/app.js`:
  - `mode` state 추가, 상단 모드 토글 UI, 진료 영역 조건부 렌더(state 보존)
  - L3 Smoke #1(Guide ctx 공백 체크) 제거, #3(primarySources 누락) 유지
  - `hasGuidableContent`, `buildCurationCtx`, `handleCuration`, Guide 자동 큐레이션 useEffect, Guide 탭 버튼/콘텐츠 모두 제거
  - `curationText`/`curationLoading` state 제거
  - `UIHOOKS_DEFAULTS.guide` 필드는 매트릭스 historical 의도 표식으로 의도적 유지
- `src/components/sections.js`: GuideTab 함수 + 헤더 주석 제거
- `src/prompts.js`: KNOWLEDGE_CURATION_PROMPT 제거 (349 → 252 라인)
- `src/api.js`: generateKnowledgeCuration 제거
- `src/index.html`: search.js script 태그 추가, 캐시버스터 일괄 `?v=0506-search` 갱신
- `src/styles.css`: `.mode-toggle` 클래스 추가

---

## 검증 결과

### 정적 검증
- 모든 파일 brace balance ✓ (depth 0)
- 정적 서버 200 OK (index.html, search.js, app.js)
- Guideline 잔존 코드 grep 0건 (`GuideTab|hasGuidableContent|buildCurationCtx|handleCuration|generateKnowledgeCuration|KNOWLEDGE_CURATION|curationText|curationLoading`)

### 검색 기능 동적 검증 (실제 KNOWLEDGE_BUNDLE 463 엔트리)
- 인덱스 빌드: **4 ms** (목표 500ms 대비 125배 빠름)
- 검색 응답: **4 ms 이하**
- "어지럼증" → dizziness:6 / 어지럼증:6 / vertigo:6 / 저음성난청:1 / 귀먹먹함:1 ✓
- "metformin" → diabetes:6 / 당뇨:6 / T2DM:6 / HbA1c:6 / 당화혈색소:6 ✓
- "비만" → obesity:6 / 비만:6 / glp1:6 / GLP1전략:6 ✓
- "두통 임신" (다중 토큰 AND) → migraine:7 / 편두통:7 / 만성편두통:7 ✓
- "xyzqwert" → 빈 결과 (정상)

### Wikilink 인덱스
- 추출된 backlink target: 58개
- 추출된 alias 동의어: **1개만** ⚠

### 회귀 (코드 수준)
- RedFlag/Missing/Triage 패널 props·로직 무손상 → 회귀 0
- Working Draft DraftTab 무손상 → 회귀 0
- 계산기 탭 무손상 → 회귀 0
- Liby 힌트(`draftHints`, `differentialShort`) 무손상 → 회귀 0

---

## 판정
**통과** — 모든 정적·동적 검증 통과. 미르 브라우저 실사용 후 추가 회귀 발견 시 별도 패치.

---

## 다음 작업 (Phase 2 후보)
1. **Liby 힌트 거취 결단** (1~2주 검색 사용 후 실증 데이터 기반)
2. **검색 모드 C(모달) 추가**: 진료 중 빠른 참조용. 사용 누적 후 필요성 판단.
3. **Wikilink 보존 강화**: Liby ingest skill에서 `[[t]]`/`[[t|alias]]`를 sections.content에 보존하는 로직. 현재는 ingest 과정에서 wikilink 대부분 손실.
4. **계산기 ↔ 검색 통합**: 검색 결과에 계산기 진입점 (Boss 옵션 A).
5. **검색 옵션 확장 (Phase 1.5)**: fuzzy match · `disease:`/`drug:` 필터 · recent / starred.

---

## 회고

### 예상과 달랐던 점
1. **Wikilink alias 추출량 (58 target → alias 1개)**: knowledge/ MD 파일에는 207개 wikilink가 있으나 KNOWLEDGE_BUNDLE 컴파일 결과에는 거의 보존 안 됨. Liby ingest가 wikilink를 의도적으로 stripping하는지 확인 필요. backlink 기능은 일부만 작동.
2. **검색 성능**: 4ms로 목표 대비 압도적으로 빠름. fuzzy match·debounce 등 추가 최적화 불필요.
3. **Guideline 제거 응집도**: handleCuration·buildCurationCtx·hasGuidableContent·useEffect·탭 버튼·탭 콘텐츠·state·prompt·api 함수까지 9개 위치 산재. 단일 surface가 9개 코드 지점에 의존하는 구조였음 — 단순화 이득이 예상보다 컸음.

### 다음 세션 반영
- Liby ingest skill에 wikilink 보존 옵션 검토 필요 (Phase 2 선결 과제)
- `sections.differential` 등 v2 미사용 섹션이 검색에 raw 노출됨 — myth 외 추가 제외 필터 필요한지 미르 결단 필요
- 미르 실사용 후 "검색이 자주 안 되는 키워드" 로그 수집 → 동의어/검색 가중치 튜닝 입력
