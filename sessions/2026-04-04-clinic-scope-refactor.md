# sessions/2026-04-04-clinic-scope-refactor.md

## 세션 정보
- 날짜: 2026-04-04
- 작업: 판단 검토 버튼 개선 — CLINIC_SCOPE 단일 소스화 + 프롬프트 재작성 + 입력 변경
- 건드린 파일:
  - `src/constants.js` — CLINIC_SCOPE 상수 추가
  - `src/prompts.js` — DRAFT_REVIEW_PROMPT 재작성 ({{CLINIC_SCOPE}} 플레이스홀더)
  - `src/api.js` — generateDraftReview() 시그니처 변경 (draftText→raw, customPrompt 추가)
  - `src/app.js` — 판단 검토 호출부: CLINIC_SCOPE 치환 + 입력을 raw로 변경

---

## 결정 배경
- DRAFT_REVIEW_PROMPT에 진료실 정보 하드코딩 → 향후 Disposition 패널, 추천검사/치료 탭에서 동일 정보 필요
- templates.js 패턴과 동일하게 constants.js에 CLINIC_SCOPE 인라인
- 체크리스트 카테고리 구분이 모델 판단을 제한 → 열린 질문 방식으로 교체
- 입력: Working Draft(중간 가공물) → raw transcript(원본) — 더 정확한 판단 가능

---

## Builder 결과

### constants.js — CLINIC_SCOPE
- rules/clinic-scope.md 핵심 내용을 단일 문자열 상수로 인라인
- SAMPLE_COMPLEX 상수 앞에 배치
- 포함: 가능/불가 검사·처치, 협진/의뢰 전문과, Disposition 단계

### prompts.js — DRAFT_REVIEW_PROMPT 재작성
- `{{CLINIC_SCOPE}}` 플레이스홀더로 하드코딩 제거
- 카테고리([임상 누락]/[문서 리스크]) 구분 제거 → 중요도 순 자유 나열
- 최대 5개(기존 3+3=6개 → 단순화)
- 없으면 "특이 사항 없음" 한 줄

### api.js — generateDraftReview()
- `(draftText, apiKey)` → `(raw, apiKey, customPrompt)`
- `customPrompt || DRAFT_REVIEW_PROMPT` 패턴 (generateWorkingDraft와 동일)
- 유저 메시지: "Working Draft를 검토하라" → "진료 대화를 검토하라"

### app.js — 호출부
- `DRAFT_REVIEW_PROMPT.replace("{{CLINIC_SCOPE}}", CLINIC_SCOPE)` 로 프롬프트 조립
- `generateDraftReview(raw, apiKey, reviewPrompt)` — draftText → raw

---

## 결과
- 판정: 통과
- 버전: v17 → v18

## 다음 작업
- Disposition 패널 또는 추천검사/치료 탭에서 CLINIC_SCOPE 재사용

## 회고
- file-ownership.md: constants.js "금지: 프롬프트 문자열" 조항 주의
  → CLINIC_SCOPE는 프롬프트 자체가 아닌 진료실 메타데이터로 판단, templates.js 패턴과 동일하게 허용
  → 향후 file-ownership.md에 CLINIC_SCOPE 명시 권장
