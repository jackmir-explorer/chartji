# CLAUDE.md — Chartji 개발 하네스

Chartji는 한국 가정의학과 외래 대화 기반 진료 보조 도구다.
이 어플은 의사가 진료할 때 반드시 빠트려서는 안되는 사항들을 간단하고 선명하게 보여준다.
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
- **구현 작업이 필요할 때** → `Designer` 호출 (실무진 파이프라인)

워크플로우 상세 → `rules/workflow.md`

---

## 세션 프로토콜

0. `rules/forbidden.md` 문서를 매 세션 시작 시 먼저 읽는다.

### 기본 워크플로우 (구현)

1. Designer → 범위 체크 + 설계서
2. **미르 승인**
3. Builder → 실행
4. Reviewer → 검토
5. QA → 판정
6. 통과: sessions/ 기록 / 실패: 롤백 + 1번으로

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

## 상세 규칙 참조

- 워크플로우 → `rules/workflow.md`
- 파일별 책임 경계 → `rules/file-ownership.md`
- 패널 역할 계약 → `rules/panel-contracts.md`
- 절대 금지 목록 → `rules/forbidden.md`
