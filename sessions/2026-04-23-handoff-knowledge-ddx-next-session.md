# sessions/2026-04-23-handoff-knowledge-ddx-next-session.md

## 세션 정보
- 날짜: 2026-04-23
- 작업: knowledge 10년 재설계 + DDx UI 공백 — 권고 도출 → Boss 4관점 검토 → 다음 세션 인계
- 산출물:
  - `reports/2026-04-22-boss-review-request-knowledge-ddx.md` (권고 요청서, 슬림 버전)
  - `reports/2026-04-22-boss-report-knowledge-ddx.md` (Boss 4관점 판정)
  - 본 핸드오프

---

## 1. Claude 권고 요약 (브레인스토밍 + 2개 외부감사 → 권고 7개로 수렴)

### Knowledge 스키마 (B2 → B3 확장)
- **R1** `version` + `supersedes` + `freshness.primarySourceYear` + `applicability` 4개 메타필드 빈 값 일괄 예약 (44 엔트리)
- **R2** `relations[]` 도입 — 초기 kind 5종(`parent`·`coprescribe`·`contraindicate`·`supersede`·`synergy`), parents와 6개월 병존 후 자연 퇴장
- **R3** 표준 섹션 dictionary 5개 추가 — `prognosis`·`lifestyle`·`complications`·`counseling`·`follow-up-schedule`
- **R4** `knowledge/myth-log/` 폴더 신설 + 초기 3건 (glp1 GI-AE 미신·glp1 IR 미신 + 미르 선정 1건)

### DDx UI (진료 5단계 #2 공백 해소)
- **R5** `panels.js:66-67` 봉인된 `differentialShort` 렌더 블록 복원 (Triage Panel 하단 readonly)
- **R6** R5 동시 설치 6개 가드레일: ingested-only / AI 생성 금지 / 숫자 0개 / Horse≤3 Zebra≤2 / 출처 표기 / 세션 단위 dismiss
- **R7** "내 범위" 의뢰 단서 1줄 추가 (감지 질환의 `referral.indication` 축약, R5 동시 처리 권고)

### 권고 도출 시 명시 제외 (1년 후 별도 세션)
decisions[] 객체화 / patterns/ · decision-nodes/ 폴더 / 의미론 검색 / 외부 공유 포맷 / 환자 thread 자동 생성

---

## 2. Boss 권고 정리 (CMO·CLO·CFO·CVO 판정 종합)

### 채택 매트릭스

| 권고 | 판정 | 조건 |
|---|---|---|
| **R1** 메타필드 4개 예약 | 즉시 채택 | 없음 |
| **R2** relations[] 도입 | 즉시 채택 | Liby ingest 시 kind 자가검증 |
| **R3** 섹션 5개 추가 | 즉시 채택 | `data-flow.md` 매트릭스 primary 셀 4곳 동시 개정 |
| **R4** myth-log/ 폴더 | 조건부 채택 | inject 경로 전면 격리 + export 금지 명문화 |
| **R5** DDx 재활성화 | 조건부 채택 | R6 묶음 + CLO 면책 문구 + 3개월 실기 anchor bias 측정 |
| **R6** 6개 가드레일 | 즉시 채택 | R5와 묶음 |
| **R7** 의뢰 1줄 | **보류·재검토** | Designer 단계에서 (a) Triage 3단 vs (b) mini-panel 분리 비교 — CVO는 (b) 선호 |

### 착수 순서 권고
- **Wave 1 (knowledge, 저위험)**: R1 → R3 → R2 → R4
- **Wave 2 (DDx UI, Architect 경로 필수)**: R5 + R6 묶음. Designer 설계서에 panel-contracts.md 개정안 + data-flow 매트릭스 신규 셀 동시 제출
- **Wave 3**: R7 분리 배치 대안 확정 후 착수

### Phase 5와의 관계
**R1(메타필드 빈 값 예약)만 Phase 5 착수 전 선제 삽입 권고** — 어차피 v2 변환 중 같이 심는 게 최저비용. 나머지 6개는 Phase 5 완료 후.

### Architect STOP 판정 우려
- **R3**: `data-flow.md` 매트릭스 5행 신설 → primary 셀 변경 규칙상 Architect STOP 후 미르 확인 절차 필수
- **R5**: Triage Panel 역할 계약 변경(`panel-contracts.md`) + `differential` section key의 Triage readonly primary 신설 → Architect 경로 2중 필수

### 핵심 가드 (Boss 강조 사항)
- **R4 myth-log inject 격리**: `agents/librarian.md` inject 트리거에서 `kind: "myth"` 전면 차단. RedFlag 격리 원칙과 동일 강도.
- **R5 CLO 면책 문구**: Triage 패널 DDx 영역에 `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` 상시 노출. 이 문구 없이 재활성화 불가.
- **R5 측정 항목**: Zebra 노출 오진 회피 사례 수 / false silence 빈도 / 의사 dismiss 주기. 3개월 실기 후 2차 Boss 재판정.

---

## 3. 다음 세션 미르 결단 사항 3개

1. **Wave 1 R1을 Phase 5 진행 중 선제 삽입할 것인가** — 같이 심을 것인가 vs Phase 5 완료 후 착수
2. **Wave 2 R5+R6 Architect 호출 타이밍** — Wave 1 완료 직후 vs 별도 간격
3. **R7 분리 배치 초기 선호** — (a) Triage 3단 vs (b) mini-panel 분리 (CVO 권고는 b)

---

## 4. 부수 작업 — Deep Extract

### 본 세션에서 처리
- **상한 5건 → 10건 상향** (`66f6dc7`) — 백로그 누적 사례 대응

### 백로그 (내일 정오 자동 trigger 대기 — 7건)
- 2026-04-20: PMID 41544290 (청소년 비만 GLP-1) · PMID 40950820 (어지럼증 척추동맥 도플러) · PMID 42000148 (독감백신 처방 모델)
- 2026-04-21: PMID 41839085 (전자담배 금연) · PMID 39535805 (GLP-1 RA 알코올사용장애)
- 2026-04-23: PMID 41839108 (비허혈성 심근증) · PMID 41839073 (B형간염 스크리닝)

### Liby 별도 호출 대기 (오늘 아침 자동 trigger가 반영한 5건의 bundle 컴파일)
```
Liby 불러서 knowledge/by-disease/vte-hormone-therapy.md, knowledge/by-disease/CKD.md,
knowledge/by-drug/mounjaro.md, knowledge/by-drug/glp1-selection-strategy.md,
knowledge/guidelines/primary-care-top20-2024.md bundle 반영해줘
```

---

## 5. main 반영 commit 목록 (오늘 세션)

| Commit | 내용 |
|---|---|
| `28a388b` | Boss 검토 요청서 슬림화 (권고 7개만) |
| `93ae72a` | Boss 전략 보고서 — 4관점 판정 매트릭스 |
| `66f6dc7` | deep-extract 1회 상한 5건 → 10건 |
| (본 commit) | 다음 세션 인계 핸드오프 |

---

## 6. 다음 세션 시작 시 첫 행동

1. 본 핸드오프 + 두 reports/ 파일 미르가 재확인
2. §3 결단 3개 + §7-2 결단 3개 표명
3. 결단에 따라:
   - Wave 1 착수면 → Architect 호출 (R3 STOP 판정 가능성 인지 + §7-1 auto-wikilinks 편입 + §7-2 Scout/DE 개편 동시 심의 여부)
   - Liby 호출 먼저면 → 5건 md bundle 컴파일
   - Phase 5 잔여 작업 우선이면 → 그쪽 진행 후 본 건 재진입

---

## 7. 추가 확정 안건 (2026-04-24 세션 말미 추가)

### 7-1. Wave 1 R2 auto-wikilinks 편입 확정 (갈래 C)
- `sessions/2026-04-23-knowledge-visibility-brainstorm.md` 갈래 C 채택
- Wave 1 R2(relations[]) 구현 시 `skills/knowledge-ingest/SKILL.md` 개정하여 **ingest 자동 wikilinks 삽입** 포함
- 기존 42개 엔트리 **백필 1회** (R1 메타필드 예약 순회와 묶음)
- 별도 Wave 아님 — Wave 1 R2 구현 범위 확장
- 본 세션 실험: 5개 엔트리 수동 wikilinks 심음 → 미르 Obsidian 그래프 체감 OK (2026-04-24)

### 7-2. Scout + Deep Extract routine 개편 안건 (미르 지시, 2026-04-24)

**배경**: `knowledge/MAP.md` 공백 영역(생활습관·호흡기·소화기·근골격·당뇨 본체 등)을 지속적으로 메워야 함. 교과서적 내용·최신 가이드라인 포함. 일차의료 공부 지속 루프. 3층위 reframe의 **A 층(지식 체계 구축)** 강화 방향.

**구체 변경 요청 (미르)**:
1. **Scout 공백 채우기 슬롯 추가** — `knowledge/MAP.md` 🔴 공백 영역을 Scout 일일 탐색 입력으로 반영. 교과서·가이드라인·최신 논문 모두 대상.
2. **일일 상한 5건 → 10건** (Deep Extract는 2026-04-23 이미 10건으로 상향 — Scout도 동조)
3. **마킹 단순화** — ⭐ / 🔺 / 없음 → ⭐ / 없음 (🔺 제거). 🔺는 deep extract 대상 아니라 실효 없음.
4. **Deep Extract 공부용 보고서 신설** — ingest/inject와 **분리된 학습 자원**. 추출된 논문 상세 내용을 미르가 공부용으로 읽을 수 있도록 별도 파일 생성. 경로 후보: `study-notes/YYYY-MM-DD-[논문제목].md` 등.

**Architect 점검 포인트** (다음 세션 호출 시):
- Scout ⭐ 판단 기준 개정(공백 포함)이 기존 POEMs·임상가치 필터와 충돌 없는지
- 공부용 보고서 = 새로운 데이터 흐름. `rules/data-flow.md` 영향 있는지
- Deep Extract 10건 + 공부 보고서 생성 시 일일 API 비용·시간 증가 (CFO 관점)
- 공부 보고서가 C 층(상용구·약속처방 승격) 후보 pool인지, A 층(순수 학습) 전용인지 — 3층위 reframe과 관계 명시 필요

**미르 결단 필요 (Architect 선행 질문)**:
- **D4**: Scout 공백 채우기를 **기존 Scout 확장**으로? 아니면 **별도 Study routine 신설**로?
- **D5**: 공부용 보고서가 **Deep Extract 산출물 일부**? 아니면 **별도 루틴**?
- **D6**: 🔺 완전 제거 vs 유지(단 UI에서 숨김)

### 7-3. scope.md / MAP.md 업데이트 반영 (2026-04-24 완료)
- **Tier 1 추가**: 생활습관 의학 (운동·수면·스트레스·식이·절주·금연 — 가정의학 핵심 무기)
- **Tier 3 추가**: 초음파 진단·인터벤션 (POCUS + 봉사활동 handy tool)
- **Tier 2 삭제**: 임상영양 (생활습관 의학으로 흡수)
- **Tier 3 삭제**: 일반외과 감별
- **Tier 4 폐지**: 재택의료·호스피탈리스트·의학 AI·보완적 접근 전부 제거

### 7-4. 다음 세션 최우선 순서 (제안)
1. §3 결단 3개 (R1 선제·R5+R6 timing·R7 배치)
2. §7-2 결단 3개 (D4·D5·D6 — Scout/DE 개편)
3. Architect 호출 (Wave 1 R1+R2 + auto-wikilinks + Scout/DE 개편 묶음 가능 여부 판정)
4. Designer 진입
