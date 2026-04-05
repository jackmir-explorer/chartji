# 세션 기록 — 하네스 구조 개편

## 세션 정보
- 날짜: 2026-04-05
- 버전: v18 (코드 무변경, 하네스 문서만 변경)
- 작업명: harness-restructure

## 결정 배경
HARNESS_AGENTS.md 문서를 기반으로 에이전트 구조를 개편. Boss를 전략 리뷰 전용으로 분리하고 CMO/CLO/CFO/CVO 4개 Chief를 추가. Designer가 scope-gate를 흡수하여 구현 워크플로우 진입점 역할. HARNESS_AGENTS.md에서 핵심 워크플로우만 추출하여 rules/workflow.md로 축약. CLAUDE.md를 라우팅+원칙만 남기도록 축소.

## 건드린 파일

### 신규 생성 (10개)
- agents/cmo.md — CMO 시스템 프롬프트
- agents/clo.md — CLO 시스템 프롬프트
- agents/cfo.md — CFO 시스템 프롬프트
- agents/cvo.md — CVO 시스템 프롬프트
- skills/cmo-review/SKILL.md — CMO 임상 안전 체크리스트
- skills/clo-review/SKILL.md — CLO 법적 리스크 체크리스트
- skills/cfo-review/SKILL.md — CFO 비용/효율 체크리스트
- skills/cvo-review/SKILL.md — CVO 제품 가치 체크리스트
- rules/workflow.md — 기본/심층 워크플로우 정의
- PROJECT_STATUS.md — 프로젝트 현황 문서

### 수정 (4개)
- agents/boss.md — scope-gate 전용 → 전략 리뷰 전용 (4 Chief 소집)
- agents/designer.md — scope-gate 흡수, 구현 워크플로우 진입점
- skills/file-map/SKILL.md — Phase 0 범위 체크 추가
- CLAUDE.md — 라우팅+원칙+기록규칙으로 축소

### 폐기 표기 (1개)
- skills/scope-gate/SKILL.md — Deprecated, file-map Phase 0으로 이관

## 판정
QA 통과. 롤백 불필요.

## 다음 작업
- rules/gotchas.md 실제 파일 생성
- src/chartji_v14.html 레거시 파일 정리 검토

## 회고
- HARNESS_AGENTS.md 213줄 중 핵심 워크플로우만 30줄로 축약 (rules/workflow.md)
- CLAUDE.md 비대화 방지: 에이전트 테이블, 파일 구조맵 등 제거하고 라우팅 규칙만 유지
- scope-gate를 Designer에 통합하여 중복 파일 읽기 제거
- harness.js는 Claude Code 환경에 부적합하여 불채택
