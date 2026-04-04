# sessions/2026-04-04-template-injection.md

## 세션 정보
- 날짜: 2026-04-04
- 작업: 질환별 템플릿 동적 로드 (Working Draft 템플릿 주입)
- 건드린 파일:
  - `src/templates.js` — 신규 생성
  - `src/index.html` — templates.js script 태그 추가
  - `src/prompts.js` — WORKING_DRAFT_PROMPT 말미에 템플릿 섹션 + {{TEMPLATE_CONTENT}} 플레이스홀더 추가
  - `src/app.js` — generateWorkingDraft 호출 시 templateContent 조립 및 주입
  - `src/api.js` — generateWorkingDraft 시그니처에 customPrompt 4번째 인자 추가

---

## 결정 배경
- templates/*.md 의 "## 필수 포함 필드" 섹션만 JS 상수로 인라인
- "## 주의 문구" 섹션은 Working Draft 생성 시 미사용 (판단 검토 버튼용 — 다음 세션)
- 템플릿 선택은 Claude가 transcript 맥락으로 판단 (키워드 매칭 아님)
- api.js 수정은 금지 목록에 없으나 최소 변경: 시그니처에 옵셔널 인자 1개만 추가

---

## Builder 결과

### 신규: src/templates.js
- `TEMPLATES` 상수 — 9개 질환 키 (diabetes, dyslipidemia, obesity, musculoskeletal, gastrointestinal, insomnia, osteoporosis, thyroid, depression)
- 각 값: 해당 .md 파일의 "## 필수 포함 필드" 섹션 텍스트

### 수정: src/index.html
- `<script src="constants.js">` 다음 줄에 `<script src="templates.js">` 추가
- prompts.js 로드 전에 위치 (prompts.js가 TEMPLATES 참조하지 않으므로 순서 무관하나 논리적 순서 유지)

### 수정: src/prompts.js
- `WORKING_DRAFT_PROMPT` 말미에 `[질환별 템플릿]` 섹션 추가
- 카테고리 목록 9개 + 선택 규칙 + `{{TEMPLATE_CONTENT}}` 플레이스홀더

### 수정: src/app.js
- Working Draft debounce 콜백 내에서:
  - `Object.keys(TEMPLATES).map(...)` 로 templateContent 조립
  - `WORKING_DRAFT_PROMPT.replace('{{TEMPLATE_CONTENT}}', templateContent)` 로 프롬프트 생성
  - `generateWorkingDraft(trimmed, apiKey, followUpCtx, draftPrompt)` 로 호출

### 수정: src/api.js
- `generateWorkingDraft(raw, apiKey, ctx)` → `generateWorkingDraft(raw, apiKey, ctx, customPrompt)`
- `var sys = (customPrompt || WORKING_DRAFT_PROMPT) + ctxLine`

---

## 결과
- 판정: 통과
- 버전: v15 → v16

## 다음 작업
- "판단 검토" 버튼: templates/*.md 의 "## 주의 문구" 섹션을 활용한 온디맨드 임상 경고 패널

## 회고
- 예상과 달랐던 점: api.js 시그니처 수정이 필요했음 (작업 명세에 미포함). customPrompt 옵셔널 인자로 최소 변경 처리.
- 다음 세션 반영: api.js 변경이 필요한 경우 작업 명세에 명시할 것
