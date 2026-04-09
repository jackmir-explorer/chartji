# 세션 기록 — 2026-04-09 Liby Inject 라우팅 재구성

## 세션 정보
- 날짜: 2026-04-09
- 작업: Liby knowledge 섹션별 출력 위치 분리

## 결정 배경
- Liby context가 Working Draft에 주입되면 의사가 시행하지 않은 PE/Plan이 Draft에 출력될 위험
- 라이브 패널에 새 섹션 추가는 진료 중 방해 우려
- Boss 검토 후 섹션별 라우팅으로 해결

## 최종 라우팅 구조
| BUNDLE 필드 | 목적지 | 시점 |
|------------|--------|------|
| exam | Missing 패널 컨텍스트 | 진료 중 실시간 |
| treatment | Draft 탭 힌트 (접이식 💡) + Working Draft 컨텍스트 | Draft 검토 시 |
| differential | Draft 탭 힌트 (접이식 💡) + Working Draft 컨텍스트 | Draft 검토 시 |
| draftAppend | Draft 하단 고정 문구 | EMR 입력 전 |

## 건드린 파일
- src/api.js — generateMissingPanel() knowledgeExamCtx 인자 추가
- src/app.js — BUNDLE context→섹션별, MissingPanel/DraftTab prop 전달
- src/components/panels.js — MissingPanel knowledgeExamCtx 수신+전달
- src/components/sections.js — DraftTab 힌트 접이식 섹션 추가
- src/knowledge-bundle.js — context 필드 → exam/treatment/differential/draftAppend 재컴파일
- skills/knowledge-inject/SKILL.md — 라우팅 규칙 업데이트
- skills/knowledge-ingest/SKILL.md — BUNDLE 필드 구조 업데이트

## 판정
QA 통과
