# reports/2026-04-22-boss-review-request-knowledge-ddx.md — Boss 검토 요청서

- 날짜: 2026-04-22
- 제출: 미르 → Boss (Board 심층 리뷰 요청)
- 근거: 2026-04-22 세션 3개 보고서
  1. Knowledge 잠재력 브레인스토밍
  2. 10년 지평 knowledge 체계 외부 감사 (B3 스키마 제안)
  3. 감별진단 처리 공백 외부 감사 (DDx UI 재활성화 제안)
- 목적: 세 보고서에서 **꼭 반영해야 할 결단 포인트**만 추려 Boss의 CMO·CLO·CFO·CVO 4관점 분석을 요청

---

## 0. 요청 범위 선언

Boss는 본 요청서의 **7개 결단 항목**에 대해서만 판정한다. 브레인스토밍에서 나왔던 자유 확장 아이디어(외부 공유 포맷·의미론 검색·오디오 리더 등)는 **10년 지평 감사에서 이미 "1년 후 착수" 유보**로 분류되었으므로 본 요청서에 포함하지 않는다.

---

## 1. 상위 전략 결단 2개

### 결단 A. **Knowledge 스키마 B2 → B3 확장** (targeted, non-big-bang)

**핵심:** 현재 B2가 "문서 수집·정규화"로서 우수하나, 10년 운용에는 **결정·관계·시간·불확실성** 축이 부재. 지금 안 심으면 400 엔트리 시점에 소급 불가능한 4개 메타필드 + 5개 섹션 + 횡단 폴더 1개를 선제 예약.

**원칙:**
- 기존 44 엔트리 본문 불변 (소급 재작성 금지)
- 메타필드 빈 값으로 예약 심기 → 신규 ingest부터 활용 → Liby가 엔트리 건드릴 때 자연 승격
- Phase 5 완료 후 착수

---

### 결단 B. **DDx UI 재활성화** (Triage Panel 하단 복원, 경로 B-1)

**핵심:** 진료 5단계(CC→DDx→Risk→Scope→Plan→Review) 중 DDx만 UI 공백. `panels.js:66-67`에 "risk>benefit"으로 봉인된 렌더 블록 존재. 당시 Boss 판정은 knowledge 성숙·scope.md Horse/Zebra 철학 확립 **이전**. 재검토 필요.

**원칙:**
- AI 생성 DDx 금지 (현재 prompt 규약 그대로 유지)
- bundle `differentialShort` ingested readonly만 표시 (retrieval only)
- Horse 3 / Zebra 2 상한, dismiss 가능, 숫자·likelihood 금지
- 6개 가드레일 동시 설치 조건으로만 복원

---

## 2. 세부 실행 결단 7개

### ▢ 결단 A-1. `version` + `supersedes` 필드 예약
- **배경:** 10년 변경 추적의 토대. 지금 안 심으면 과거 결정의 "왜"가 영구 소실.
- **비용:** 44 엔트리에 빈 값 1회 스크립트 (~1시간)
- **감사 권고:** 즉시 심기
- **Boss 체크:** CFO — 단일 스크립트 vs 400 엔트리 시 20배 소급 비용

### ▢ 결단 A-2. `freshness.primarySourceYear` + `staleIf` 조건식
- **배경:** 가이드라인 stale 감지의 유일한 자동화 앵커. ACIP annual·임상지침 5y 등 규칙 기반.
- **감사 권고:** 즉시 심기 (primarySourceYear는 기존 출처 파싱으로 자동 채움 가능)
- **Boss 체크:** CMO — stale 감지 부재 시 환자 안전 리스크 (2022 심부전 지침이 2030년에도 그대로 발화)

### ▢ 결단 A-3. `relations[]` 필드 도입 (parents 대체·병존)
- **배경:** `heart-failure ↔ sglt2 ↔ vaccination` 삼각 관계 표현 불가. 현재 parents는 1-depth 단일 부모만.
- **kind 초기 허용 5종:** `parent` · `coprescribe` · `contraindicate` · `supersede` · `synergy`
- **감사 권고:** parents와 병존 후 6개월 자연 퇴장
- **Boss 체크:** CFO — kind 팽창 시 유지비 증가 (vocabulary drift 감사와 동일 승격 규칙 적용)

### ▢ 결단 A-4. `applicability` 필드 (age·pregnancy·renal·hepatic·primaryCareScope)
- **배경:** "임신 12주 환자에 해당 엔트리 적용 가능한가"를 자동 필터링할 자리 없음. `pregnancy` 섹션은 content일 뿐 속성 아님.
- **감사 권고:** 빈 객체로 자리 확보. 채우기는 Liby ingest 시점에.
- **Boss 체크:** CMO — 잘못된 applicability 값이 위험 환자에 적용 가능으로 오인될 가능성 검토

### ▢ 결단 A-5. 누락 섹션 5개 dictionary 등록
- **대상:** `prognosis` · `lifestyle` · `complications` · `counseling` · `follow-up-schedule`
- **배경:** 현재 18개 표준 섹션에 10년 임상 필수 개념 5개 누락. notes·protocol로 파묻힘.
- **감사 권고:** `section-vocabulary.md` 18→23개. 기존 엔트리 손대지 않음. 신규 ingest부터 활용.
- **Boss 체크:** CVO — 섹션 증가가 인지부하·Guide Tab 라우팅 복잡도 증가로 작용하는지

### ▢ 결단 A-6. `knowledge/myth-log/` 폴더 신설 + 초기 3건
- **배경:** `glp1`에서 반박된 "GI↑=효과↑", "IR=효과↑" 등 반박 아카이브가 본문에 산재. 의사 성장 자산 중 최고 가치인데 교차 검색 불가.
- **초기 3건:** glp1 GI-AE 미신 / glp1 IR 미신 / (미르 선정 1건)
- **감사 권고:** 폴더 신설 + 템플릿 정립. 채움은 점진.
- **Boss 체크:** CLO — "미신" 라벨이 환자·법적 문서에 노출되지 않도록 격리 보장 필요

### ▢ 결단 B-1. DDx UI 재활성화 (Triage Panel 하단 `differentialShort` 복원)
- **배경:** `panels.js:66-67` 주석 처리된 렌더 블록 복원. 데이터·파이프라인은 이미 bundle에 살아있음.
- **6개 가드레일:**
  1. `source: "ingested"` 아닌 항목 렌더 금지
  2. AI 생성 DDx 금지 (TRIAGE_PROMPT 현행 유지)
  3. 숫자·%·확률·likelihood 표현 0개
  4. Horse 최대 3 / Zebra 최대 2
  5. 각 항목 ingested 출처 표기 필수
  6. 의사 dismiss 가능 (세션 단위)
- **파생 변경:** `rules/panel-contracts.md` Triage 계약 개정 · `rules/data-flow.md` 매트릭스에 `differential` Triage readonly 셀 추가 · `bundle.differentialShort` 스키마에 `source` 필드 추가
- **감사 권고:** Boss 과거 risk>benefit 판정 재검토 후 Architect 경로
- **Boss 체크:** 4관점 모두 재판정 필수
  - **CMO**: DDx 표시가 의사 anchor bias를 증폭하는가, 완화하는가? Zebra 노출 이익이 false silence 위험보다 큰가?
  - **CLO**: "ingested readonly"가 의사의 진단을 대신하는 구조로 해석될 여지가 있는가?
  - **CFO**: 기존 파이프라인 재활용이므로 추가 API 호출 0. UI 복원 + 계약 문서 개정 비용만.
  - **CVO**: "놓치지 말아야 할 것을 간단하고 선명하게" 원칙 정렬 — Horse-Zebra가 이미 scope.md 핵심인데 UI에 구현 부재. 정렬 ↑.

---

## 3. (선택) 동시 처리 권고

### ▢ 결단 B-2. "내 범위" 의뢰 단서 Triage 하단 1줄 추가
- **배경:** 진료 5단계 #4("내가 볼 수 있나") 공백. Guide Tab `referral` 섹션은 탭 활성 필요 → 진료 한가운데 노출 불가.
- **제안:** B-1 확장 형태로 감지된 질환의 `referral.indication` 축약 1줄 추가.
- **감사 권고:** B-1과 **동시 처리** 권고 (별도 결단으로 분리하면 UI 변경 2회 발생 → 인지부하 2회)
- **Boss 체크:** CVO — Triage Panel 비대화 경계 판정

---

## 4. 감사에서 유보한 항목 (본 요청서 제외)

다음은 10년 감사에서 "데이터 충분히 쌓인 뒤 착수 (1년 후)"로 분류됨. Boss 판정 대상 **아님**:

- `decisions[]` 결정 로직 객체화 (if-then executable)
- `knowledge/patterns/` 환자 복합 패턴 폴더
- `knowledge/decision-nodes/` 반복 결정 지점 폴더
- Embedding 기반 의미론 검색
- 외부 동료 공유 포맷
- 환자 thread 자동 생성

이 항목들은 본 요청서 7개 결단 실행 + 3~6개월 데이터 축적 후 별도 Boss 세션으로 상정.

---

## 5. Boss 리뷰 요청 포맷

Boss는 다음 출력을 제출해주길 요청:

```
[Boss 전략 보고서 — 2026-04-22 Knowledge & DDx]

CMO 판정:
- A-2 freshness: [PASS / CONCERN / STOP]
- A-4 applicability: [PASS / CONCERN / STOP]
- B-1 DDx 재활성화: [PASS / CONCERN / STOP]  ← 핵심 재판정

CLO 판정:
- A-6 myth-log: [PASS / CONCERN / STOP]
- B-1 DDx 재활성화: [PASS / CONCERN / STOP]  ← 핵심 재판정

CFO 판정:
- A-1~6 메타필드·섹션·폴더 6개 총비용: [적정 / 과다 / 분할권고]
- B-1 UI 복원 + 계약 개정 비용: [적정 / 과다]

CVO 판정:
- A-5 섹션 5개 추가가 인지부하 증가인가: [정렬 / 이탈]
- B-1 Triage 확장이 본질 강화인가 비대화인가: [정렬 / 이탈]
- B-2 "내 범위" 1줄 추가 동시처리 권고: [적정 / 분리]

종합 판단:
권고 사항:
- 즉시 착수 항목: [...]
- Designer 경로 필요 항목: [...]
- Architect STOP 판정 우려 항목: [...]
- 유보·재검토 필요 항목: [...]
```

---

## 6. 미르의 최종 결단 포인트 (Boss 리뷰 후)

Boss 보고 수령 후 미르가 결정할 것:
1. 7개 결단 중 착수 우선순위
2. Phase 5 잔여 작업과의 순서 (Phase 5 완료 후 착수 원칙 유지 여부)
3. B-1 DDx 재활성화를 A-계열과 분리할지 동시 추진할지
4. Architect 경로 진입 시점 (설계서 → 미르 승인 → Builder)

---

## 참조

- 세션 3개 보고서 → 대화 내 인라인 (본 요청서 0절에 요약)
- 관련 rule 파일: `rules/panel-contracts.md` · `rules/data-flow.md` · `rules/forbidden.md`
- 관련 knowledge 메타: `knowledge/section-vocabulary.md` · `knowledge/sourcing-rules.md`
- 관련 agent: `agents/boss.md` · `agents/librarian.md` · `agents/architect.md`
- 과거 B2 설계서: `sessions/2026-04-18-b2-schema-design.md`
- 봉인 UI 위치: `src/components/panels.js:66-67`
