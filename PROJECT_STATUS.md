# PROJECT_STATUS.md — Chartji 프로젝트 현황

## 현재 버전
v18

## 아키텍처
- 브라우저 기반 React 앱 (CDN + Babel standalone, 빌드 파이프라인 없음)
- 단일 페이지: 좌측 전사/Working Draft 탭, 우측 안전 패널 3개 (RedFlag, Missing, Triage)
- API: Anthropic Claude API 직접 호출 (api.js)
- 프롬프트: prompts.js 상수 + {{PLACEHOLDER}} replace 패턴
- 템플릿: 9개 질환별 필수 포함 필드 (templates.js → Working Draft 주입)
- 상수: CLINIC_SCOPE (constants.js) — 가용 검사/시술/의뢰 단일 소스

## 주요 기능
- 음성 전사 (Web Speech API, Chrome only)
- 실시간 안전 패널 (RedFlag / Missing / Triage) — 독립 debounce
- Working Draft 자동 생성 (50자↑, 3초 debounce, 질환별 템플릿 주입)
- 판단 검토 (Draft Review) — CLINIC_SCOPE 기반 열린 질문 방식
- 재진 Context 입력 (RedFlag에 영향 없음)

## 최근 변경 이력
- v18: CLINIC_SCOPE 단일 소스화, 판단 검토 입력 raw transcript로 변경
- v17: 판단 검토 버튼 추가
- v16: Final Chart 완전 제거, 질환별 템플릿 동적 주입

## 주요 위험/기술 부채
- gotchas.md 파일 미생성 (이전 세션에서 의도만 있었음)
- chartji_v14.html 레거시 파일 잔존 (src/)
- 빌드 파이프라인 없음 — CDN 의존
