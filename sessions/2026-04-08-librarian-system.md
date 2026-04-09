# 세션 기록 — 2026-04-08 Librarian 시스템 구축

## 세션 정보
- 날짜: 2026-04-08
- 작업: Librarian 에이전트 + knowledge 인프라 신규 구축

## 결정 배경
- 미르의 임상 경험/가이드라인을 구조화해서 Working Draft 품질 향상
- Boss 다중 라운드 검토 후 최종 설계 확정
- knowledge 폴더 로컬 전용 (gitignore) — 의료 정보 보호

## 주요 설계 결정
- by-disease/ 질환 단위 메인 저장소 (4개 섹션: 문진/검사·처방/치료·감별진단·주의사항)
- by-drug/ 약물 단위
- guidelines/ 공식 가이드라인[CLINICAL] · 심평원[REGULATORY] · 최신지견[INSIGHTS] · 실전Tip[TIPS]
- 주의사항 [DRAFT_APPEND] → Working Draft 하단 자동 삽입 (API 주입 아님)
- knowledge > API 우선순위: 프롬프트 상단 삽입
- Inject detection: Triage onDetect 신호 재활용 (추가 API 호출 없음)
- RedFlag inject 절대 금지
- 파일당 600토큰 분리 분기점

## 건드린 파일

### 신규 생성
- agents/librarian.md
- skills/knowledge-ingest/SKILL.md
- skills/knowledge-inject/SKILL.md
- .gitignore
- src/knowledge-bundle.js
- knowledge/by-disease/README.md
- knowledge/by-drug/README.md

### 수정
- knowledge/index.md — 새 폴더 구조 반영
- src/index.html — knowledge-bundle.js 스크립트 태그 추가
- src/api.js — generateWorkingDraft() knowledgeCtx 인자 추가 (customPrompt 제거)
- src/app.js — KNOWLEDGE_BUNDLE 조회 + knowledgeCtx 조립 + draftAppend 처리

### 삭제
- knowledge/clinical-experience/ (by-disease/로 대체)
- knowledge/drug-notes/ (by-drug/로 대체)

## 판정
QA 통과

## 다음 작업
- Librarian 첫 번째 ingest 테스트 (미르가 내용 던지면 실행)
- PR 생성

## 회고
Boss 4라운드 검토로 설계가 탄탄하게 확정됨.
inject 메커니즘이 브라우저 앱 제약(로컬 파일 직접 접근 불가) 때문에
pre-compiled bundle 방식으로 해결 — 런타임 오버헤드 없음.
