# rules/file-ownership.md — 파일별 책임 경계

각 파일은 명시된 책임만 가진다. 경계를 넘으면 구조가 무너진다.

---

## src/constants.js
책임: 앱 전반에서 쓰는 상수와 유틸 함수
포함: PROB_COLORS, CC_KEYWORDS, detectLocalCC(), EMPTY_PANEL_STATE, SAMPLE*
금지: 프롬프트 문자열, UI 컴포넌트, API 호출

## src/prompts.js
책임: Claude API에 전달되는 시스템 프롬프트 상수
포함: *_PROMPT 상수 9개
금지: 로직, UI, API 호출, 조건문

## src/api.js
책임: Claude API 호출 순수함수
포함: callClaude(), safeParseJSON(), buildCtxNote(), generate*()
금지: useState 참조, JSX, UI 상태 직접 변경
원칙: 입력 → 출력만. 사이드이펙트 없음.

## src/components/primitives.js
책임: 재사용 UI 기본 컴포넌트
포함: BulletList, PanelEmpty, SubLabel, PanelCard
금지: API 호출, 비즈니스 로직, 임상 판단

## src/components/panels.js
책임: 실시간 패널 컴포넌트
포함: TriagePanel, RedFlagPanel, MissingPanel,
      ProblemsPanel (display:none — UI 비표시, Guideline 데이터 공급 전용)
각 패널 props: {raw, apiKey, followUpCtx} + 리셋용 key
금지: App 공유 상태 직접 참조, 패널 간 데이터 공유
원칙: 각 패널은 자체 state·debounce·API 호출로 완전 독립

## src/components/sections.js
책임: app.js에서 추출한 탭 콘텐츠 컴포넌트
포함: CalcTabHeaders (계산기 탭 헤더 + 추가 메뉴),
      DraftTab (Working Draft 표시 + 판단 검토),
      CalcTabContent (계산기 폼 + 결과 + 참조표 + 면책)
금지: 공유 상태 직접 참조 (props로만 수신), API 호출

## src/templates.js
책임: 질환별 계산 도구 정의 상수
포함: CALCULATORS 객체 (질환 키 → {label, description, fields[], calculate()?, referenceTable?, externalLink?})
      질환: dyslipidemia, osteoporosis, depression, diabetes, obesity
      calculate() 있는 질환: dyslipidemia (한국 가이드라인 위험군+LDL 목표), obesity (BMI)
      externalLink 있는 질환: dyslipidemia (MDCalc), osteoporosis (FRAX)
      Triage 패널의 calcCategories 감지 결과로 탭 활성화
금지: API 호출, UI 코드
참조: templates/*.md (원본 문서)

## src/knowledge-bundle.js
책임: Librarian 자동 생성 KNOWLEDGE_BUNDLE 데이터. 순수 데이터 선언, 파서 로직 없음.
포함: v1 / v2 엔트리 공존 허용 (2026-04-20 Phase 3A 전환 중)
      - v1 shape: {kind, exam, treatment, differential, differentialShort, draftTemplate, draftAppend}
      - v2 shape: {kind, keywords, primarySources, sections, uiHooks}
      Consumer 감지 규칙: `entry.sections ? "v2" : "v1"`
금지: **직접 편집 금지** — 수정은 Liby ingest skill만 권한 있음
      v2 엔트리를 3B/3C runtime 준비 전에 추가 금지 (inject 깨짐)
      파일 내 파싱·변환 로직 도입 금지 (consumer 책임)
참조: skills/knowledge-ingest/SKILL.md (Step 7 v1 / Step 7-B v2)
      knowledge/section-vocabulary.md, knowledge/sourcing-rules.md
      rules/data-flow.md (UI surface × section 매트릭스)

## src/app.js
책임: 공유 상태 관리 + 레이아웃 조율
포함: raw, apiKey, followUpCtx, consent 등 공유 상태
      WorkingDraft 생성 로직
금지: 패널별 debounce 로직 (각 패널이 직접 소유)
      비즈니스 로직 (api.js에 위임)

## knowledge/myth-log/
책임: 임상 현장에서 반복되는 **미신·잘못된 통념**을 기록. 의사 본인 공부 자원.
포함: 각 myth 엔트리 md 파일 (kind: "myth")
금지: **inject 대상 아님** — Guide tab·Liby 힌트·Draft append·KNOWLEDGE_BUNDLE 컴파일 전부 제외
      export 대상 아님 (외부 공유 포맷 도입 시에도 제외)
      일반 by-disease/by-drug 엔트리를 myth-log로 재배치 금지 (보존 방향 반대)
참조: rules/forbidden.md Liby §, agents/librarian.md inject 트리거 분기

## src/styles.css
책임: 모든 스타일
금지: 인라인 스타일로 기능 제어 (display:none으로 로직 숨기기 등)

## src/index.html
책임: CDN 로딩 + script 태그 순서 + <div id="root">
포함: React, ReactDOM, Babel CDN + 각 js 파일 script 태그
금지: 인라인 JS, 인라인 스타일
