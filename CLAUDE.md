# CLAUDE.md — Chartji 개발 하네스

Chartji는 한국 가정의학과 외래 대화 기반 진료 보조 도구다.
이 어플은 의사가 진료할 때 반드시 빠트려서는 안되는 사항들을 간단하고 선명하게 보여준다.
이 어플은 의사가 빠르고 정확한 판단을 할수 있도록 진료를 보조한다.
이 어플은 진료 대화를 기반으로, 핵심이 잘 축약된 문서를 출력한다.

---

## 핵심 제품 원칙

1. 화면 출력은 짧고 선명하게 — reasoning dump 금지
2. 패널 역할 분리 — 침범 금지
3. 전체 재작성 금지 — 국소 수정만
4. RedFlag는 transcript-only — context 주입 절대 금지

---

## 호출 규칙

- **전략 리뷰가 필요할 때** → `Boss` 호출 (Board 심층 리뷰)
- **구현 작업이 필요할 때** → `Architect` 호출 (구조 진단 → Designer → 실무진 파이프라인)
- **임상 지식 저장/주입** → `Liby` 호출 (knowledge/ 관리) → `agents/librarian.md`

워크플로우 상세 → `rules/workflow.md`

---

## 세션 프로토콜

0. `rules/forbidden.md` 와 `rules/coding-behavior.md` 를 매 세션 시작 시 먼저 읽는다.

### 기본 워크플로우 (구현)

1. Architect → 구조 경계 진단 (PASS / STOP)
2. Designer → 범위 체크 + 설계서 (Architect 제약 전제)
3. **미르 승인**
4. Builder → 실행
5. Reviewer → 검토
6. QA → 판정
7. 통과: sessions/ 기록 / 실패: 롤백 + 1번으로

### 심층 워크플로우 (전략 리뷰)

1. Boss → CMO · CLO · CFO · CVO 순차 분석
2. Boss 종합 보고서 → 미르 검토
3. 미르가 다음 행동 결정

---

## 세션 기록 규칙 (필수)

**모든 코드 변경 작업이 끝나면 반드시 `sessions/YYYY-MM-DD-[작업명].md` 를 생성한다.**

- 미르가 별도로 요청하지 않아도 Builder 단계 완료 시 자동 기록
- 파일명: `sessions/YYYY-MM-DD-작업명.md` (날짜는 작업 당일 기준)
- 기록 항목: 세션 정보 / 결정 배경 / 건드린 파일 목록 / 제거·추가·수정 상세 / 판정 / 다음 작업 / 회고
- 템플릿: `sessions/session-template.md` 참고

---

## 세션 종료 체크리스트 (필수)

**세션 종료 직전에 반드시 아래 항목을 체크한다. 반사적 절차 — 판단에 의존하지 말 것.**

1. **이번 세션 변경이 다음 세션에서 참조 필요한가?** (예: 세션 기록·설계서·rules/ 문서 등)
2. **routine / trigger / CI 등 자동 시스템의 동작에 영향 주나?** (자동 시스템은 대부분 main 기준 동작)
3. **다른 브랜치·외부 시스템의 의존 대상인가?**

- 위 세 항목 중 **하나라도 YES** → **Claude가 main에 직접 머지**하고 원격 푸시 (PR 생성 금지)
- 전부 NO → 해당 브랜치에만 두고 종료 허용 (실험적 시도·취소된 설계 등)

### main 직접 머지 원칙 (2026-04-20 확정, 미르 지시)
- **PR 생성 금지.** 작업 완료 시 Claude가 직접 `git checkout main && git merge <작업브랜치> && git push origin main` 수행
- 이 원칙은 **모든 후속 세션에서 유지**. Claude가 반사적으로 적용 (미르에게 매번 묻지 않음)
- 예외: 미르가 명시적으로 "PR 만들어"라고 지시한 경우에만 PR 생성

**종료 보고 포맷**: "커밋·푸시 완료"만으로는 부족. 반드시 **main 반영 상태**를 명시:
- ✓ "main 반영 완료 (commit `abc1234`)"
- ⚠ "main 미반영 (브랜치에만 존재)"

배경 사례: `sessions/2026-04-19-routines-trigger-diagnosis.md` 의 "2차 진단 실패 — main 머지 누락".

---

## 상세 규칙 참조

- 워크플로우 → `rules/workflow.md`
- 파일별 책임 경계 → `rules/file-ownership.md`
- 패널 역할 계약 → `rules/panel-contracts.md`
- 절대 금지 목록 → `rules/forbidden.md`
- 코딩 행동 가이드라인 → `rules/coding-behavior.md`
