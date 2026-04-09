# 세션 기록 — 2026-04-09 질환 특이 Template

## 세션 정보
- 날짜: 2026-04-09
- 작업: BUNDLE draftTemplate 필드 추가 — 질환 특이 Draft 출력 형식 강제

## 결정 배경
- 예방접종·비만 등 단순 구조 진료에 범용 EMR 포맷 과잉
- 질환 특이 template으로 Working Draft 출력 형식 강제
- template 이탈 대화(새 증상 호소 등)는 [추가 호소] 섹션으로 별도 기록 (누락 금지)
- template 없는 질환은 기존 범용 포맷 fallback
- 코드 필드명 draftTemplate 유지, 문서 표기는 "질환 특이 Template"

## 건드린 파일
- src/api.js — generateWorkingDraft() draftTemplate 인자 추가 + template/fallback 분기
- src/app.js — BUNDLE draftTemplate 수집 + generateWorkingDraft() 전달
- src/knowledge-bundle.js — 예방접종 3개 키에 draftTemplate 추가
- skills/knowledge-ingest/SKILL.md — BUNDLE 필드 구조에 draftTemplate 추가
- skills/knowledge-inject/SKILL.md — 라우팅 표에 질환 특이 Template 행 추가

## 판정
QA 통과
