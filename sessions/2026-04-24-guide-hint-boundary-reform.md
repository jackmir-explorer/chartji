# sessions/2026-04-24-guide-hint-boundary-reform.md

## 세션 정보
- 날짜: 2026-04-24
- 작업: Guide tab vs Liby 힌트 섹션 경계 재정의 — `contraindication`·`precaution`·`pregnancy` primary Guide → hint 이전
- 건드린 파일:
  - `rules/panel-contracts.md`
  - `rules/data-flow.md`
  - `knowledge/section-vocabulary.md`
  - `src/app.js`
  - `src/prompts.js`
  - (신규) `sessions/design-2026-04-24-guide-hint-boundary-reform.md`
  - (신규) `reports/2026-04-24-boss-report-guide-scope.md`
  - (신규) `sessions/2026-04-24-guide-hint-boundary-reform.md` (본 파일)

---

## 결정 배경

미르 발의: "가이드 탭에 진짜 필요한 것만 출력되어야 할 것 같은데 뭐가 좋을까? boss"

### Boss 심의 전개
1. **1차 Boss 보고서** — 4 class(환자우려·RedFlag맥락·drug safety·일반indication)를 3 class로 축소 권고 (bullet 3~5 상한)
2. **미르 질문**: "contraindication·drug safety·pregnancy 이것도 현행 Liby hint에 나오지 않아?"
3. **실코드 확인**: wegovy/위고비 엔트리(`knowledge-bundle.js:513,545`)가 hint에 contraindication override 보유. 매트릭스(`data-flow.md:41`)는 contraindication을 Guide primary로 선언 — **bundle이 매트릭스 위반** 상태
4. **Boss 정정**: 시간축 분업 재정의 — 처방 시점 push(hint) vs 처방 이전 배경(Guide). 금기·precaution·pregnancy는 처방 시점 본질 → hint 전담
5. **미르 결단**: "그래" → "A로 가야겠다" (매트릭스 이전 경로)
6. **Architect PASS**: 선례 2건(referral·differential 이전, 모두 2026-04-24)과 동일 구조 확인
7. **Designer 설계서 → 미르 승인 → Builder 실행**

### 핵심 근거
- Boss 보고서: `reports/2026-04-24-boss-report-guide-scope.md`
- 시간축 분업:
  - **Liby 힌트 (push)**: indication·dosing·schedule·protocol·referral·contraindication·precaution·pregnancy
  - **Guide tab (pull)**: classification·exam·comparison·monitoring·differential(→Triage)·notes·insurance·prognosis·complications·counseling·lifestyle

---

## 제거·추가·수정 상세

### #1 `rules/panel-contracts.md`
- Guideline Assist 역할에 "처방 이전 배경" 문구 추가
- "제외 섹션 (2026-04-24 결단, Liby 힌트로 이전)" 명시
- `## Liby 힌트 (push)` 계약 블록 신설

### #2 `rules/data-flow.md`
- 매트릭스 3행(`contraindication`/`precaution`/`pregnancy`) primary Guide ✓ 제거 → hint ✓ 추가
- 결단 주석 블록 추가 (referral 이전 주석 바로 아래)

### #3 `knowledge/section-vocabulary.md`
- `kind:"disease"` uiHooks 기본값:
  - hint 배열에 `contraindication`·`precaution`·`pregnancy` 3개 추가
  - guide 배열에서 동일 3개 제거
- `kind:"drug"` uiHooks 기본값:
  - hint 배열에 `contraindication`·`precaution` 2개 추가
  - guide 배열에서 동일 2개 제거 → guide 배열이 `["comparison","insurance"]` 2개로 축소
- 결단 주석 추가

### #4 `src/app.js:6-7` UIHOOKS_DEFAULTS
- disease/drug 기본값을 section-vocabulary.md와 동기화
- `topic` kind 변경 없음

### #5 `src/prompts.js` KNOWLEDGE_CURATION_PROMPT
- bullet 상한 `3~8` → `3~5` 축소 (line 188)
- Liby 담당 섹션 목록 갱신 — 8개 섹션(protocol·dosing·schedule·indication·referral·contraindication·precaution·pregnancy·lifestyle·follow-up-schedule) 명시 (line 190)
- Guide 담당 섹션 예시 재작성 (line 191)

---

## Reviewer 결과

### 검증 기준 전부 통과 (grep 확인)

- panel-contracts.md: "제외 섹션 (2026-04-24 결단, Liby 힌트로 이전)" 존재 ✓, "## Liby 힌트 (push)" 계약 블록 존재 ✓
- data-flow.md: 3행 hint ✓ 열 존재 ✓, 결단 주석 블록 존재 ✓
- section-vocabulary.md: disease hint에 3개 포함 ✓, drug hint에 2개 포함 ✓, 결단 주석 존재 ✓
- app.js: disease hint 배열에 3개 추가 ✓, drug hint 배열에 2개 추가 ✓
- prompts.js: "3~5개 bullet" 문자열 ✓, Liby 담당 섹션 8개 명시 ✓, Guide 담당 섹션 예시 갱신 ✓

### Smoke / 자동 회귀
- 프로젝트에 자동 smoke 스크립트 없음 (rule level 검증 routine)
- L3 Smoke는 design 단계 개념 검증 — hard-coded 배열 검증 부재로 회귀 충돌 없음
- `src/knowledge-bundle.js` 직접 편집 없음 (`file-ownership.md:59` 준수)

---

## QA 결과

### 통과 항목 (정적 검증)
- 5개 파일 변경 사항 grep 검증 ✓
- `rules/forbidden.md` 금지 항목과 저촉 없음
- `rules/file-ownership.md` 파일 책임 경계 준수
- 선례 2건(referral·differential 이전)과 구조 정합

### 보류 항목 (Chrome 실사용 대상)
- 브라우저에서 실제 drug 엔트리 감지 시 Liby 힌트 영역에 contraindication 노출 확인 — **미르 수동 QA**
- Guide tab 큐레이션 버튼 누를 때 bullet 3~5개 상한 작동 확인 — **미르 수동 QA**
- override 보유 3건(wegovy·위고비·heart-failure)의 일시적 중복 노출 허용 상태 확인 — **미르 수동 QA**

### 단기 알려진 부작용 (의도된 결과)
- drug 엔트리 대다수가 Guide tab에 `comparison`·`insurance` 2섹션만 노출 → Guide tab이 빈 curation이 될 수 있음. 미르 철학("정보 밀도 감소 = feature") 정합 — 회귀 아님
- override 3건은 Phase 2 Liby 재ingest 전까지 contraindication이 hint+guide 양쪽 중복 노출. 임상적 해 없음(경고 강화 방향)

---

## Phase 2 (본 세션 범위 외)

Phase 1(본 세션) main 반영 후 Liby 재ingest로 정리:
- `knowledge/by-drug/wegovy.md` 재ingest → bundle `wegovy`·`위고비` override 정리
- `knowledge/by-disease/heart-failure.md` 재ingest → bundle `heart-failure` override 정리

Phase 2 착수 시점은 미르가 Phase 1 체감 후 별도 발의.

---

## 결과
- **판정: 통과**
- **다음 작업**:
  1. main 직접 머지 + push (세션 종료 체크리스트 3항목 모두 YES)
  2. Phase 1 실사용 체감 (브라우저 QA)
  3. Phase 2 Liby 재ingest 별도 발의

---

## 회고

### 예상과 달랐던 점
- 미르의 후속 질문("Liby에 나오지 않아?")이 bundle의 **매트릭스 위반 실태**를 드러냄. Boss 1차 보고서가 "C2 — 계획 중 처방의 금기"를 Guide 고유로 분류한 것은 매트릭스만 봤기 때문. 실코드(wegovy override)를 확인했더라면 처음부터 시간축 분업 제안이 나왔을 것.
- Architect 경로는 통상 STOP 예상이었으나, 선례 2건(referral·differential 이전, 모두 같은 날)이 이미 PASS되어 있어 동일 구조로 PASS 가능했음.

### 다음 세션 반영
- **Boss 분석 시 bundle override 실태 grep 병행 필수**: rule level 매트릭스만 보면 bundle 위반을 놓침. 향후 Boss 호출 시 실코드 grep을 분석 자료에 포함
- **primary 이전 선례가 쌓이는 중**: 2026-04-24 하루에만 3개 섹션군 이전(referral / differential / contraindication·precaution·pregnancy). 향후 매트릭스 리팩토링이 빈발할 가능성 — section-vocabulary.md와 app.js UIHOOKS_DEFAULTS 동기화를 자동화할 routine 검토 가치 있음 (단 별도 발의 시점까지 유보, 현재는 수동 정합으로 충분)
- **Phase 분리가 유용**: bundle 직접 편집 금지 원칙을 지키면서도 실효성 확보. Phase 1(rule+default) 즉시 반영, Phase 2(override 정리) 미르 판단 시점에 별도 Liby 작업으로.
