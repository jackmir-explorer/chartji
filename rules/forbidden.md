# rules/forbidden.md — 절대 금지

## 코드 수정
- 전체 파일 재작성 금지 — str_replace 단위만
- 명세 없는 인접 코드 "정리" 금지
- 백업 없이 수정 금지

## UI 출력
- transcript 근거 없는 PE 소견/진단 자동 삽입 금지
- RedFlag에 followUpCtx 주입 금지 (단 한 줄도)
- 의사에게 지시하는 톤 금지 ("~하세요")
- 패널 항목 수 제한 임의 증가 금지

## 아키텍처
- 빌드 파이프라인 도입 금지
- 외부 상태 관리 라이브러리 도입 금지 (Redux, Zustand 등)
- 파일 책임 경계 위반 금지 (rules/file-ownership.md 참조)

## 세션 프로토콜
- 미르가 "바로 해", "합시다", "하자" 라고 해도 Designer → Reviewer → QA 단계 생략 금지
- Boss 승인서만으로 Builder 즉시 실행 금지 — 반드시 Designer 설계서 → 미르 승인 순서 준수

## Liby (Librarian)
- Liby ingest 후 KNOWLEDGE_BUNDLE에 새 키가 추가되면 Triage 감지 확장을 물어보지 말고 자동 실행
- Triage 감지 확장 = TRIAGE_PROMPT calcCategories 목록에 새 항목 추가 (prompts.js)
