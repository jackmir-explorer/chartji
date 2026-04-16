# sessions/2026-04-17-phase1-missing-cleanup.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 1 정비 — Missing exam inject 제거 + 판단검토 knowledge 주입 + Sync Check 스킬 신설
- 건드린 파일:
  - src/api.js (generateMissingPanel, generateDraftReview)
  - src/components/panels.js (MissingPanel)
  - src/app.js (MissingPanel 호출부, onReview 핸들러)
  - skills/sync-check/SKILL.md (신규)

---

## Boss 승인서

Boss 전략 리뷰 8개 질문 순차 처리 → 3단계 로드맵 확정.

Phase 1 권고:
1. Missing exam inject 제거 → 순수 안전 알림으로 복귀 (Q1·Q5 결론)
2. 판단검토에 knowledge inject 추가 (Q3 결론)
3. Sync Check 스킬 생성 → QA 단계에 추가 (Q6·Q7 결론)

미르 피드백 반영:
- Missing의 프로토콜 성격 제거에 동의
- knowledge 참조는 Phase 2에서 참조탭으로 이관 예정 (지금 Phase 1에서는 완전 제거만)

---

## Designer 설계서

### 범위 체크
- 단일 기능 단위: ✓ (knowledge 주입 채널 재정렬)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (Missing은 원래 계약으로 복귀)
- 이전 세션 완료: ✓ (a467b79 커밋 후 시작)
- → 통과

### 변경 목록 (6건)
1. api.js `generateMissingPanel` 시그니처 `(raw,apiKey,ctx,knowledgeExamCtx)` → `(raw,apiKey,ctx)`, `examLine` 제거
2. panels.js `MissingPanel` props에서 `knowledgeExamCtx` 제거
3. app.js MissingPanel 호출부에서 `knowledgeExamCtx` prop 블록 제거
4. api.js `generateDraftReview` 시그니처에 `knowledgeCtx` 파라미터 추가, `knowledgeLine` concat
5. app.js `onReview` 핸들러에서 treatment+differential 수집 후 전달
6. skills/sync-check/SKILL.md 신규 생성

---

## Builder 결과

모든 6개 변경을 Edit/Write 도구로 적용. 각 변경의 old/new 블록이 예상대로 매칭됨.

중간 오류 1회: api.js 변경 #1 적용 시 `문진/검사` 문자 Read 출력의 시각적 착각 → Grep으로 정확한 문자열 재확인 후 성공.

---

## Reviewer 결과

### file-ownership 준수
- src/api.js: 순수함수 유지, 비즈니스 로직 위임 원칙 준수 ✓
- src/components/panels.js: 패널 독립성 유지 ✓
- src/app.js: 공유 상태 관리 + 레이아웃 조율 역할 유지 ✓
- skills/sync-check/: 신규 위치 적절 ✓

### forbidden.md 준수
- 전체 재작성 없음 (모두 국소 수정) ✓
- 패널 계약 위반 없음 (Missing은 계약대로 복귀) ✓
- 빌드 파이프라인 도입 없음 ✓
- RedFlag에 followUpCtx 주입 없음 ✓

### 정합성 검증
- `knowledgeExamCtx` 전역 grep: src/ 전체 0건 매칭 (완전 제거 확인)
- `generateMissingPanel` 호출처: panels.js:90 (3개 파라미터) - 시그니처 일치 ✓
- `generateDraftReview` 호출처: app.js:403 (4개 파라미터) - 시그니처 일치 ✓
- MissingPanel `useEffect` 의존성 배열 `[raw,apiKey,followUpCtx]` - 변경 전후 동일 ✓

### 회귀 위험 재평가
- 설계서의 4개 위험 중 #1(의존성 배열), #2(역호환), #3(스킬 오탐) 모두 해소
- #4(Phase 2 연결성) — Phase 1 단독 상태에서는 exam 지식이 앱 표면에서 임시적으로 사라짐. Phase 2에서 참조탭 복원 필요

→ Reviewer 통과

---

## QA 결과

### Sync Check 실행 여부
이번 변경은 knowledge-bundle.js / prompts.js calcCategories를 건드리지 않았으므로 sync-check 실행 요건 미해당. 다만 스킬 자체를 신규 생성했으므로 **초기 베이스라인 확인 목적으로 1회 수동 실행** 수행.

### Sync Check 베이스라인 (수동 실행)
- knowledge↔bundle: 직전 커밋(a467b79)에서 dysphonia, neck-mass, Tantum Verde, Promac 모두 bundle 반영 확인됨
- bundle↔triage: prompts.js calcCategories 30개, 신규 추가 카테고리(dysphonia, 경부종괴, 위고비, 마운자로, 오젬픽, A형간염, B형간염, 일본뇌염, 광견병, 수두, MMR, 폴리오) 반영 확인됨
- 필수 필드: bundle 엔트리 전수 검사는 Phase 2 진행 전 별도 sync-check 실행으로 대체

**결과**: `[SYNC CHECK] PASS` (베이스라인)

### 임상 안전 확인 (Designer 설계서에서 Y로 지정)
Missing에서 exam 지식이 제거된 상태에서 비만/기타 시나리오 실제 출력 품질은 **미르가 앱 돌려서 확인** 필요. 코드 레벨에서는 Missing이 원래 프롬프트(MISSING_PROMPT)만으로 호출되므로 "일반 안전 체크리스트 수준" 회귀가 예상되며, 이는 Boss 리뷰에서 의도된 결과.

---

## 결과
- 판정: **통과**
- 다음 작업: 
  - **앱 라이브 테스트** (미르) — 비만·어지럼증·LPR 시나리오에서 Missing 출력, 판단검토 knowledge 반영 확인
  - **Phase 2 착수** — Bundle 데이터 구조 정리 + 참조탭 하이브리드화 + Knowledge Surfacing 프로토타입

## 회고

### 예상과 달랐던 점
- `examLine` 문자열 내 `문진/검사` 슬래시 문자 Read 출력의 시각적 착각 → Edit 실패 1회. Grep으로 실제 바이트 재확인 필요했음
- Phase 1은 "제거" 위주라 변경량이 작을 것으로 예상했는데, `generateDraftReview` 확장과 sync-check 스킬 생성까지 포함되면서 6개 변경으로 증가. 여전히 단일 논리 단위 내에서 처리 가능한 규모

### 다음 세션 반영
- Read 출력에서 특수 문자(슬래시, 역슬래시, 따옴표 등) 의심될 때 **Edit 전에 Grep으로 정확한 바이트 선행 확인**
- Phase 2 착수 전 `skills/sync-check/SKILL.md` 1회 전수 실행 → 베이스라인 리포트 세션 로그에 첨부
- Missing 복귀 후 **의사 체감 품질**은 앱 테스트로만 확인 가능 → Phase 3(시나리오 스모크 테스트)의 필요성이 여기서 드러남
