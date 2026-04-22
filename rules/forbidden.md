# rules/forbidden.md — 절대 금지

## 코드 수정
- 전체 파일 재작성 금지 — str_replace 단위만
- 명세 없는 인접 코드 "정리" 금지
- 백업 없이 수정 금지
- 요청하지 않은 기능·추상화·"유연성" 추가 금지
- 스타일 드리프트 금지 (따옴표·타입힌트·포매팅 임의 변경)

## 판단
- 가정 명시 없이 구현 금지 — 드러내고 시작한다
- 성공 기준 없이 Builder 실행 금지
- 모호한 요청에 침묵 금지 — 멈추고 미르에게 질문

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
- **세션 종료 시 main 반영 체크 생략 금지** — 이번 세션 변경이 (a) 다음 세션에서 참조 필요 / (b) routine·trigger·CI 등 자동 시스템 동작에 영향 / (c) 다른 브랜치·외부 시스템 의존 대상 인 경우 **Claude가 직접 main에 머지**하고 원격 푸시. 커밋·푸시만으로 "완료"라 보고하지 말 것. 체크리스트 상세: `CLAUDE.md` 「세션 종료 체크리스트」 참조.
- **PR 생성 금지 (2026-04-20 미르 지시)** — 미르가 명시적으로 "PR 만들어"라고 지시하지 않는 한 PR 생성 금지. 대신 Claude가 main에 직접 머지. 후속 세션에서도 유지.
- **예외 — 자동 routine 산출물 (2026-04-22 확정)**: `routines/deep-extract.md` 등 **자동 routine이 생성하는 md 파일 반영**은 PR 없이 **main 직접 머지**. `[o]` 체크 자체가 미르의 ingest 승인 신호이므로 추가 게이트 불필요. 과거 routine 명세의 "PR 생성 후 미르 승인" 경로는 폐기. (`routines/scout.md`는 별도 규칙 유지 — Scout PR 방식은 trigger 진단 세션 2026-04-19 후 확정된 경로로 존속.)

## Liby (Librarian)
- Liby ingest 후 KNOWLEDGE_BUNDLE에 새 키가 추가되면 Triage 감지 확장을 물어보지 말고 자동 실행
- Triage 감지 확장 = TRIAGE_PROMPT calcCategories 목록에 새 항목 추가 (prompts.js)

### ⚠ GOTCHA — ingest 시 반복 실수
- **Attribution 임의 추정 금지**: TIPS/INSIGHTS에 출처 힌트가 없을 때 "by 미르"로 자동 저장 금지. 반드시 미르에게 질문 후 저장.
- **Researcher 호출 생략 금지**: CLINICAL 항목이 하나라도 있으면 Step 3 Researcher 서브에이전트 호출 필수. ingest와 동시에 병렬 호출 가능.
