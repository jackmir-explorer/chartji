# sessions/2026-04-22-deep-extract-routine-refactor.md

## 세션 정보
- 날짜: 2026-04-22
- 작업: Deep Extract routine 개편 — PR 방식 폐기 + main 직접 머지 + 요약 보고서 + 과거 누락 복구
- 트리거: 미르가 PR #11 처리 중 구조적 혼동 지적 — (1) PR merge ≠ 앱 실제 반영 (bundle 컴파일 별도), (2) routine이 "오늘자 scout 파일만" 스캔해 과거 `[o]` 항목 10건 누락, (3) PR 왕복의 핸드폰 UX 비효율
- 건드린 파일:
  - `routines/deep-extract.md` — 전면 개편 (PR → main 직접 머지, 전체 scout 스캔, 요약 보고서, 경고 문구)
  - `rules/forbidden.md` — "PR 생성 금지" 원칙에 "자동 routine 산출물 예외" 한 줄 추가

---

## 결정 배경

### 미르 관찰 3가지
1. **"PR merge 하면 자동 ingest 되는가?"** — 실제로는 md 파일만 반영. bundle 컴파일은 Liby 별도 호출 필요. 이름("Deep Extract")이 오해 유발.
2. **과거 날짜 `[o]` 항목 10건 누락** — 04-18 (3건), 04-19 (1건), 04-20 (4건), 04-21 (2건). routine Step 1이 "오늘자만"으로 암묵 동작.
3. **"자동 머지 + 요약 보고로 바꾸면 덜 헷갈릴 듯"** — 핸드폰 왕복 부담 + `[o]` 체크 자체가 미르 승인 신호이므로 PR 게이트 중복.

### 핵심 설계 결정
- **옵션 A 채택** (자동 머지 + 요약 보고) vs B (PR 유지) vs C (bundle까지 자동화)
- C 기각 이유: bundle 컴파일은 parents 판단·TIPS 공식화·주제 일치 자가검증 필요 → 자동화 위험. 오늘 세운 3층 방어선 창작층(Liby ingest)이 무력화됨.
- A 채택 이유: `[o]` 체크가 사전 승인 신호, md 파일은 Auditor 사후 감사 가능, bundle 수동 유지로 위험 격리.
- **이름(`deep-extract`) 유지** (미르 지시) — Surgical Change 원칙. 이름 변경은 다수 세션 문서 참조 drift 유발.

---

## 수정 내역

### `routines/deep-extract.md`

**제목**: `Deep Extract (PR-based Knowledge Ingest)` → `Deep Extract (md 파일 자동 반영)`

**목적 블록 개편**:
- "PR을 생성해 미르의 최종 승인" → "main에 직접 머지해 즉시 반영"
- 경고 박스 추가: "이 routine은 `knowledge/*.md` 파일 반영까지만 수행. 앱 Guide/Hint/Draft 실제 노출은 Liby 별도 호출 필요"

**Step 1 — 대상 수집 (버그 수정)**:
- "`inbox/scout/` 에서 `[o]` 체크" → "`inbox/scout/` **전체 파일**에서 `[o]` 체크"
- "**오늘자만 처리하지 않는다**" 명시
- 출처 Scout 파일 날짜 추적 (요약에 "과거 누락 복구" 섹션)

**Step 3 — main 직접 머지 (구 Step 3+4 통합)**:
- 브랜치 생성 + gh pr create 블록 삭제
- "PR 생성 금지 — `rules/forbidden.md` 자동 routine 산출물 예외 적용" 헤더 박스
- Scout 마커 `[o]` → `[✓]` (과거 `[⏳ PR#N]` 중간 단계 제거, 과거 파일도 직접 수정)
- 커밋 메시지 양식 간소화 + "⚠ bundle 반영은 Liby 별도 호출 필요" 푸터 포함
- `git push -u origin main` 직접

**Step 4 — 요약 보고서 생성 (신설)**:
- `sessions/deep-extract-YYYY-MM-DD.md` 자동 생성
- 양식: 처리한 논문 표 / 핵심 요약 / **⚠ 다음 단계 필수 — Liby 별도 호출** 블록 / 과거 누락 복구 섹션
- Liby가 수행할 작업 6개 명시 (parents 판단 / kind / sources[] / 주제 일치 자가검증 / bundle 엔트리 / TRIAGE 확장)

**Step 5 — 완료 보고 (구 Step 6)**:
- "PR 생성 완료" → "main 반영됨 + ⚠ bundle Liby 별도 호출 필요 + 요약 파일 경로"

**주의사항 블록 개편**:
- "PR 1개당 5건" → "한 번 실행당 5건"
- 5건 초과 시 잔여 `[o]` 유지 (다음 trigger 재처리)
- "gh CLI 미설치 환경" 항목 삭제
- "md 파일과 bundle은 별도 반영 구조" 재명시

**폐기**: PR 검토 → 승인 방법 (핸드폰) 블록 전체 삭제

### `rules/forbidden.md`

세션 프로토콜 섹션 "PR 생성 금지" 바로 뒤에 한 줄 추가:

```
- **예외 — 자동 routine 산출물 (2026-04-22 확정)**: `routines/deep-extract.md` 등
  **자동 routine이 생성하는 md 파일 반영**은 PR 없이 **main 직접 머지**.
  `[o]` 체크 자체가 미르의 ingest 승인 신호이므로 추가 게이트 불필요.
  (`routines/scout.md`는 별도 규칙 유지 — Scout PR 방식은 trigger 진단 세션
  2026-04-19 후 확정된 경로로 존속.)
```

Scout는 별도 규칙 유지 — 2026-04-19 routines-trigger-diagnosis에서 push 차단 해결책으로 PR 경로 확정된 상태. 이번 개편 스코프는 Deep Extract만.

---

## 성공 기준 재확인 (QA)

| 기준 | 충족 |
|---|---|
| 다음 Deep Extract trigger 시 전체 scout 디렉토리의 `[o]` 수집 | ✓ (Step 1 "전체 파일" + "오늘자만 처리하지 않는다") |
| 산출물은 main 직접 머지, 미르 승인 게이트 없음 | ✓ (Step 3 + forbidden.md 예외) |
| `sessions/deep-extract-YYYY-MM-DD.md` 요약 보고서 자동 생성 | ✓ (Step 4 신설) |
| 요약·Scout 마킹에 "bundle Liby 별도 호출" 경고 | ✓ (목적 블록 + Step 4 필수 블록 + Step 5 완료 보고 + 커밋 푸터 + 주의사항 — 5곳) |
| `rules/forbidden.md` 자동 routine 예외 명문화 | ✓ |

### 자연 검증 포인트 (후속)
- **내일(2026-04-23) 정오 trigger** 실행 시 Step 1 버그 수정으로 04-18~04-21 누락된 10건이 자동 복구되는지 관찰
- 복구 건수 5 초과 시 우선순위 높은 것부터 처리 + 잔여 `[o]` 다음 trigger로 이월되는지 관찰

---

## 판정

**통과** (Reviewer 라인 추적 완료, QA 성공 기준 5/5 충족, forbidden/surgical 준수)

---

## 다음 작업

### 즉시 (이번 세션 또는 다음)
- **오늘 PR #11 merge 후 Liby 호출** — LPR·sglt2-inhibitors·depression-screening·vitamin-d·neffy 5건 bundle 반영. 3층 방어선(sections[].sources[] 채움 + TIPS 공식화 + 주제 일치 자가검증) 첫 실전 적용 기회.

### 후속
- **P0 #2** (원래 백로그): 심부전 ingest Chrome 실기 검증 + heart-failure.md sources[] 재감사
- **누락 10건 catch-up**: 내일 정오 trigger가 새 Step 1으로 자동 복구할 예정. 단 5건/회 제한이므로 2회 trigger(04-23, 04-24)에 걸쳐 분산 처리 예상. trigger 실패 시 수동 "deep extract 실행해줘" 지시로 보완.

---

## 회고

### 예상과 달랐던 점
- 개편 트리거는 "헷갈림 해소"였지만, 실제로 밝혀진 건 **Step 1 버그 + 정책 드리프트 + 구조 2단계 미고지**의 3중 문제였음. 세 원인이 하나의 UX 혼동으로 합쳐져 보였을 뿐.
- forbidden.md의 "PR 생성 금지" 원칙과 기존 routine의 `gh pr create` 블록이 2일간 공존하고 있었음(2026-04-20부터). 이런 정책 드리프트는 세션 종료 시 "이번 변경이 자동 시스템에 영향 주나?" 체크가 실제로 발동되지 않으면 재발 가능.

### 다음 세션 반영
- Deep Extract 요약 파일명 규칙(`sessions/deep-extract-YYYY-MM-DD.md`)이 기존 세션 파일명 규칙(`sessions/YYYY-MM-DD-작업명.md`)과 prefix 방향이 반대라 정렬 시 섞임. 당장 문제는 아니나 관찰 포인트.
- `routines/scout.md`는 PR 유지로 남음. Deep Extract와 정책이 갈라진 상태이므로 향후 Scout trigger도 재평가 여지 있음 (오늘 스코프 아님).

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — routine 핵심 명세 변경. 내일 trigger부터 즉시 적용.
2. routine/trigger/CI 영향? **YES** — Deep Extract routine 자체 동작 변경. main 기준 실행.
3. 다른 브랜치·외부 시스템 의존? **YES** — GitHub PR 경로 폐기, main 직접 push 경로 활성.

→ **Claude가 main 직접 머지**.
