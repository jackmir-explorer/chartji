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
