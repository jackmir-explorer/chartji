# sessions/2026-04-21-phase6-structural.md

## 세션 정보
- 날짜: 2026-04-21
- 작업: Phase 6 — 구조 개선 3종 (A/C/D) + Liby/Auditor 학습사항 반영
  - **A**. v1 잔존 엔트리 인벤토리 스캔 (읽기 전용 리포트)
  - **C**. Guide tab 공집합 UX 개선 (탭 조건부 노출)
  - **D**. uiHooks kind별 기본값 상속 구현 + 중복 저장 제거
- 건드린 파일:
  - `src/app.js` (UIHOOKS_DEFAULTS + getUiHooks + hasGuidableContent 신규, 4 dispatch 지점 교체)
  - `src/knowledge-bundle.js` (8개 v2 엔트리 uiHooks → null 축소)
  - `skills/knowledge-ingest/SKILL.md` (기본값 상속 + kind 부정합 GOTCHA 추가)
  - `agents/auditor.md` (감사 기준 3개 신설)
  - `reports/2026-04-21-v1-inventory.md` (A 스캔 결과)

---

## 미르 지시 배경

> "1,2,3번 시행하자. 그리고 Liby가 이런 작업들을 통해 배워야할 게 있을까?
> 처음 저장할 때부터 잘 해야할거 같은데.
> Auditor는 이미 저장된 지식들 분류할 때 잘 검증해야할거 같고."

→ Phase 6의 이중 목적:
1. **구조 부채 청산** (A/C/D 실무 작업)
2. **재발 방지 학습** (Liby 초기 저장 품질 + Auditor 사후 검증 강화)

---

## Architect 진단 (C+D 통합 PASS)

영향 경계:
- `src/app.js`: handleCuration + Guide tab 버튼 렌더 + DraftTab hint dispatch + v2 uiHooks 참조 3지점
- `src/knowledge-bundle.js`: v2 17 엔트리 중 8개 uiHooks 축소

기존 합의 대조:
- `knowledge/section-vocabulary.md` line 70-99: kind별 uiHooks 기본값 **이미 명세로 존재**. 지금까지 "문서만 있고 코드 미구현" — Phase 6에서 구현만 (새 결정 없음)
- panel-contracts.md Guideline Assist: "자동 표시 금지" → 큐레이션 가능 content 있을 때만 탭 노출은 계약 강화 방향 ✓
- forbidden.md: 새 키 없음, 주입 경로 불변, transcript-only RedFlag 유지

---

## Designer 설계 확정 (미르 승인)

### A. v1 스캔 리포트
단순 데이터 추출 (읽기 전용). Architect 생략, 바로 실행.

### C. Guide tab 공집합 UX
- 현재: `detectedCalcs.some(c => !!KNOWLEDGE_BUNDLE[c])` — 엔트리 존재만 확인
- 개선: `hasGuidableContent(e)` 헬퍼 — `uiHooks.guide ∩ sections.keys` 교집합 확인. 공집합이면 탭 숨김
- `[감지된 지식 없음]` 메시지는 도달 불가능해져서 제거 (안전 guard `return;` 만 유지)

### D. uiHooks 기본값 상속
- app.js 상단에 `UIHOOKS_DEFAULTS = {disease, drug, topic}` 상수 (section-vocabulary.md 정합)
- `getUiHooks(e)` helper — 필드별 fallback (부분 override 지원)
- 4 dispatch 지점 (handleCuration / Working Draft draftAppend / DraftTab hint / hasGuidableContent)에서 `e.uiHooks||{}` → `getUiHooks(e)` 교체
- v2 8개 엔트리 uiHooks → null 축소:
  - disease 기본값 동일 7개: obesity · 비만 · dysphonia · 쉰목소리 · hoarseness · 목소리이상 · urticaria
  - topic 기본값 동일 1개: glp1
- 명시 유지 9개: 위고비 · wegovy · semaglutide · 마운자로 · mounjaro · tirzepatide · zepbound · 오젬픽 · ozempic (drug 기본값과 다름 — customize 사유 있음)

---

## Builder 결과

### A 리포트 — `reports/2026-04-21-v1-inventory.md`
- Bundle: v1 64 / v2 17
- Phase 5d 추천: hyposmia (7 aliases, 검증완료) + neck-mass (4 aliases, PMID 4)
- Phase 5e: dizziness · BPPV · LPR · oral-lesion · burning-mouth (5 md)
- Phase 5a: vaccine 10 md / 29 키 — Researcher 선행 필수
- **Phase 5f 발견**: mucomyst · pilocarpine이 by-drug 폴더에 있으나 bundle drug 엔트리 0개 (ingest 누락)
- **resistant-hypertension.md**: md는 존재하지만 bundle에 미등록 상태 (로그에 있으나 실제 ingest 누락)

### D 구현
- `src/app.js` line 1–30: UIHOOKS_DEFAULTS 상수 + getUiHooks + hasGuidableContent 헬퍼 신설
- line 79 (handleCuration v2): `e.uiHooks||{}` → `getUiHooks(e)`
- line 142 (Working Draft draftAppend): 동일 교체
- line 474 (DraftTab hint): 동일 교체
- bundle 8개 엔트리 `uiHooks: null` 축소

### C 구현
- line 404 (Guide tab 버튼 렌더 조건): `detectedCalcs.some(c => !!KNOWLEDGE_BUNDLE[c])` → `detectedCalcs.some(c => hasGuidableContent(KNOWLEDGE_BUNDLE[c]))`
- line 97: `[감지된 지식 없음]` 분기 → 안전 `return`만 유지

### Liby 학습 사항 반영 (skills/knowledge-ingest/SKILL.md)
Step 7-B uiHooks 주석 추가:
- "kind 기본값과 동일" → `uiHooks: null` 저장
- "일부 필드만 다름" → partial override
- **GOTCHA**: 중복 저장 금지 (D 리팩터 효과 무력화)
- **GOTCHA**: kind 부여 일관성 점검 — by-drug 파일이 실제로 bundle drug로 등록되었는지 확인 (mucomyst·pilocarpine 재발 방지)

### Auditor 학습 사항 반영 (agents/auditor.md)
감사 기준 테이블에 3개 신설:
1. **kind 부정합**: by-drug 파일 존재하지만 bundle drug 엔트리 없음
2. **v1/v2 혼재 비율**: v2 승격 가치 후보 자동 선별 (섹션 ≥3 + PMID ≥1)
3. **uiHooks 기본값 중복 저장**: null 축소 가능 엔트리 감지
4. 출처 불명 누적 기준 구체화 (누적 10건 임계)

---

## Reviewer 결과 (자체 검증)

### 코드 레벨
- ✅ `node --check src/knowledge-bundle.js` 통과 (app.js는 JSX로 node check 불가 — 정상)
- ✅ bundle size 81 유지
- ✅ **리팩터 전후 resolved uiHooks 완전 동일** — 12개 대표 엔트리 `getUiHooks(K[k])` 결과가 Phase 5c 시점 명시 저장값과 일치 (pass=12, fail=0)

### Chrome 실기
- ✅ UIHOOKS_DEFAULTS Chrome 로드 확인
- ✅ getUiHooks / hasGuidableContent 전역 함수 등록 확인
- ✅ **dysphonia `guidable: false`** ← protocol 섹션만 있고 guide hook(7 표준)과 교집합 없음 → Guide tab 숨김
- ✅ obesity/glp1/urticaria/BPPV `guidable: true` → 정상 노출
- ✅ `stored_uiHooks: null` 엔트리가 getUiHooks로 kind 기본값 완벽 resolve
- ✅ customize 엔트리(위고비·마운자로·오젬픽·semaglutide)는 stored_uiHooks 그대로 override 유지

### 문서 정합성
- ✅ section-vocabulary.md line 70-99 정의 ↔ app.js UIHOOKS_DEFAULTS 상수 내용 일치
- ✅ skills/knowledge-ingest/SKILL.md에 D 상속 규칙 + Phase 6 GOTCHA 추가
- ✅ agents/auditor.md에 kind 부정합·v1/v2 혼재·uiHooks 중복 3개 기준 신설

---

## 결과
- 판정: **통과**
- 다음 작업 후보 (우선순위):
  1. **Phase 5d** — hyposmia + neck-mass v2 마이그레이션 (A 리포트 기반, 즉시 가능)
  2. **resistant-hypertension bundle ingest 누락 해소** — md 존재하지만 bundle 미등록 (소규모 건)
  3. **Phase 5f** — mucomyst · pilocarpine drug 분리 ingest (소규모)
  4. **Phase 5a** — vaccine 10 md Researcher 일괄 + v2 마이그레이션 (큰 세션)
  5. draftTemplate UI wiring — 메모리 `project_b2_draft_template_pending.md` 보류 상태

---

## 회고

### 예상과 달랐던 점
1. **기본값 상속 로직은 이미 명세로 존재** — section-vocabulary.md line 70-99에 uiHooks 기본값이 정식 문서화되어 있었음. Phase 6 D는 "새 설계"가 아니라 "기존 명세의 코드 구현" 성격. 그래서 Architect 판단이 빨랐고 Reviewer 검증 기준이 명확함 (명세 정합성).
2. **drug 기본값이 백신류 기준** — `hint: [indication,dosing,schedule]`. 비만약은 schedule 없어도 교집합에서 자동으로 빠지므로 기본값 변경 불필요. section-vocabulary.md 기본값의 철학이 "가능한 섹션 우선순위"였고, 엔트리별 실제 sections와 교집합 취하는 방식이라 별도 drug 분류(drug-medicine/drug-vaccine) 필요 없었음.
3. **resistant-hypertension bundle 미등록** — 로그에는 있으나 bundle ingest가 누락됨. A 스캔 덕에 발견. 이 경우가 정확히 Auditor가 감지해야 할 "kind 부정합 / 미등록" 사례.
4. **mucomyst · pilocarpine drug 분리 누락** — 기존 disease 엔트리(dry-mouth, LPR, burning-mouth)의 treatment에 처방 내용이 묻혀있음. Phase 5f로 별도 분리 필요.

### Liby/Auditor 학습 일반화 패턴
- **"처음 저장할 때부터 잘 해야"** (미르 철학) → Liby ingest skill에 GOTCHA 블록을 점진적으로 축적. Phase 3B의 Attribution GOTCHA, Phase 6의 uiHooks 중복 + kind 부정합 GOTCHA가 누적. 미래 Phase에서 반복 실수 감지 시 동일 방식으로 추가.
- **사후 검증은 Auditor** → 감사 기준 테이블에 누적. Phase 6에서 3개 신설. 기준의 "감지 패턴 명시" 중요 (단순 선언이 아니라 "무엇을 어떻게 감지할지" 기록).
- **독립성 원칙**: Liby는 수집자 / Auditor는 감사자. 둘이 이해충돌하지 않도록 agents/auditor.md line 5에 "Liby와 독립적으로 동작" 명시 유지.

### 다음 세션 반영
1. **Phase 5d** hyposmia · neck-mass v2 마이그레이션 시 **uiHooks 기본값 상속 활용** — 기본값 동일하면 `null`로 저장 (Liby 학습 적용 실례)
2. **Auditor 실행** 한 번 해볼 타이밍 — v2 17개로 파편화 임계는 아직 미달이지만 kind 부정합(resistant-hypertension · mucomyst · pilocarpine) + 출처미확인 누적(현재 6건) 감지 시뮬레이션 가능
3. **section-vocabulary.md 기본값**이 실제 코드에 반영되었으니, 향후 기본값 수정은 양쪽 동시 수정 필요. 문서에 크로스 레퍼런스 명시 고려

### 세션 종료 체크리스트 판정
1. 다음 세션 참조 필수? **YES** — A 리포트가 Phase 5d/5e/5f 로드맵 기초, D 리팩터 규칙이 Liby 후속 ingest 전제
2. routine/trigger/CI 영향? **YES** — main 기준 app.js 함수 시그니처 + bundle uiHooks 저장 형식 변경
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
