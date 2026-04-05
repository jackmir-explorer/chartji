# sessions/2026-04-04-draft-review.md

## 세션 정보
- 날짜: 2026-04-04
- 작업: Working Draft 판단 검토 버튼 (온디맨드)
- 건드린 파일:
  - `src/prompts.js` — DRAFT_REVIEW_PROMPT 신규 추가 (F. 섹션)
  - `src/api.js` — generateDraftReview() 함수 신규 추가
  - `src/app.js` — reviewText·reviewLoading 상태 추가 / clearSession() 초기화 추가 / Working Draft 탭 버튼+결과 렌더 추가

---

## 결정 배경
- Boss 승인서 기준: 온디맨드만 / 지시형 톤 금지 / draftText 없으면 비활성화
- clinic-scope.md 진료실 범위를 프롬프트에 직접 인라인 (외부 참조 없이 독립 동작)
- panel-contracts.md "Guideline Assist (온디맨드)" 역할과 일치

---

## Builder 결과

### prompts.js — DRAFT_REVIEW_PROMPT
- 임상 누락 0~3개 / 문서 리스크 0~3개 출력 형식
- clinic-scope.md 진료실 범위 인라인 (가능 검사·처치·협진·의뢰 목록)
- 지시형 톤 절대 금지 / 단정 금지 / 기록된 내용 반복 금지 명시

### api.js — generateDraftReview(draftText, apiKey)
- DRAFT_REVIEW_PROMPT 사용, max_tokens 600
- ctx 주입 없음 (draft 내용만 분석)

### app.js
- 상태: `reviewText`, `reviewLoading` 추가
- clearSession(): `setReviewText("") + setReviewLoading(false)` 추가
- Working Draft 탭: draftText 존재 시 하단에 "판단 검토" 버튼 표시
  - disabled: reviewLoading 또는 !apiKey
  - 클릭 시 generateDraftReview() 호출, 결과 reviewText에 저장
  - 재클릭 시 재생성 (setReviewText("") 후 재호출)
  - 결과 pre-wrap 텍스트로 렌더

---

## 결과
- 판정: 통과
- 버전: v16 → v17

## 다음 작업
- 추천검사/치료 탭 신규 구현

## 회고
- 예상과 달랐던 점: 없음. 명세대로 진행.
- clinic-scope.md를 외부 파일 참조 대신 프롬프트 인라인으로 처리한 것이 아키텍처상 깔끔함.
