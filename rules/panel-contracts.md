# rules/panel-contracts.md — 패널 역할 계약

각 패널은 하나의 역할만 한다. 역할이 겹치면 제거하거나 통합한다.

---

## Triage Panel
역할: 진료 초반 방향 anchor, CC 분류
출력: 방문 유형 + CC + anchor 문장 + DDx readonly (감별진단 후보 표시, 2026-04-24 Wave 2 재활성화)
금지: 진단 단정, 치료 계획 제안, RedFlag 언급
예외: ingested knowledge 기반 DDx readonly 표시 허용 (AI 추론 금지, 면책 문구 상시 노출)

### DDx readonly 가드레일 (2026-04-24 Wave 2, 5개)
1. **ingested-only**: bundle의 `differentialShort` (v1 레거시) 또는 `sections.differential` (v2, 미래) 데이터만 사용. LLM 생성 경로 전면 금지.
2. **AI 생성 금지**: prompts.js·api.js 어느 경로에서도 DDx 영역 컨텐츠 생성하지 않음.
3. **숫자 0개**: 확률·퍼센트·수치 표기 금지 (anchor bias 유발 방지).
4. **상한**: Horse(흔함) ≤ 3개, Zebra(드물지만 치명적) ≤ 2개. UI에서 slice.
5. **면책 문구 상시 노출**: `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` DDx 영역 하단 고정 표시.

## Red Flag Panel
역할: transcript에서 진짜 위험 신호만 감지
출력: severity(high/medium) + 신호 + 근거
금지: routine reminder, followUpCtx 주입 (transcript-only 절대 원칙)

## Missing Checklist
역할: 안전상 놓치면 안 되는 항목(1순위) + 감별진단·치료 방향을 직접 바꾸는 결정적 항목(2순위)
출력: 항목 목록 (최대 3개)
금지: 이미 언급된 항목, generic 체크리스트, 교과서적 항목, 진단/치료 제안

## Working Draft
역할: EMR-ready 초안 자동 생성
출력: HPI / Key negatives / Findings / Assessment / Plan
금지: PE 필드 AI 추론, 의사 미발화 Plan, ROS 자동 완성

## Knowledge Search (수동, 2026-05-06 신설)
역할: 의사 능동 검색으로 knowledge/ 자산 raw 열람 — 진료 외 깊이 읽기 1순위, 진료 중 빠른 참조 2순위(Phase 2)
출력: ranked 결과 목록(파일명·매칭 snippet·하이라이트) + 클릭 시 인라인 본문 펼침 + wikilink alias 동의어 + backlink
금지: AI 추론 생성, 자동 진단 추천, top-1 단일 강조(항상 ranked list), RedFlag 컨텐츠 노출, myth 엔트리 포함
원칙: 클라이언트 only(LLM 호출 0), Obsidian Quick Switcher 수준 검색 품질
진입: 상단 모드 토글 "🩺 진료 / 🔍 검색"
참조: rules/data-flow.md §6 (수동 검색 채널)

## Guideline Assist — 폐기 (2026-05-06)
Knowledge Search가 흡수. `KNOWLEDGE_CURATION_PROMPT`·`generateKnowledgeCuration`·`GuideTab`·`hasGuidableContent`·`buildCurationCtx`·`handleCuration` 제거.

## Liby 힌트 (push)
역할: 처방 결정 시점 선제 감지 — indication/dosing/schedule/protocol/referral/contraindication/precaution/pregnancy
출력: 엔트리별 uiHooks.hint 섹션의 bundle 원문
금지: transcript에 없는 일반론 생성, LLM 자유 서술
