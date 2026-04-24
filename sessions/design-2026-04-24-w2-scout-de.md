# sessions/design-2026-04-24-w2-scout-de.md — Designer 설계서 W2 (Scout/Deep Extract 개편)

## 세션 정보
- 날짜: 2026-04-24
- 작업: Scout + Deep Extract routine 개편 (D4 Scout 확장 + D5 DE 공부 보고서 + D6 🔺 제거 + inbox/study-notes/ 신설)
- 의존: 본 세션 Wave 1 완료 + `sessions/2026-04-23-handoff-knowledge-ddx-next-session.md` §7-2

---

## [DESIGNER 범위 체크]

- 단일 기능 단위: ✓ (주제 정합 — Scout·DE routine 동일 궤도 개편)
- forbidden.md 위반: 없음 (자동 routine 산출물 예외 계속 유지)
- 임상 안전 충돌: 없음
- 이전 세션 완료: ✓ (Wave 1 W1 main 반영 7706a1b)
→ **통과**

---

## [DESIGNER 설계서]

### 건드릴 파일

1. `routines/scout.md` — 일 10건, 🔺 제거, 공백 채우기 슬롯 추가, scope.md 참조 갱신
2. `routines/deep-extract.md` — Step 2-B 공부 보고서 생성 추가, 저장 위치 명시
3. `rules/file-ownership.md` — `inbox/study-notes/` 경계 신설
4. `inbox/study-notes/` 폴더 신설 (빈 `.gitkeep` 또는 `README.md` 1개로 폴더 존재 확보)

### 건드리지 않을 파일

- `routines/` 외 파일 전부
- `src/**`, `rules/panel-contracts.md`, `rules/data-flow.md`, `rules/forbidden.md` (기존 "자동 routine 산출물 예외" 조항 계속 유효, 추가 없음)
- `agents/librarian.md` — Liby는 본 개편 범위 밖 (공부 보고서는 ingest 대상 아님, A층)
- **기존 `inbox/scout/*.md` 파일들** — 🔺 마커 소급 변경 금지 (앞으로의 파일만 적용)

---

### 가정 (명시)

1. **공백 채우기 슬롯 입력 소스**: `knowledge/MAP.md` 자동 파싱은 복잡도 폭발. 대신 **`knowledge/scope.md` Tier 1~3 + MAP.md § 3 🔴 영역 수동 인용**을 Scout Step 1 "관심 키워드" 확장에 편입. MAP.md 자동 파싱은 추후 Mapper routine화 시 재검토.
2. **🔺 제거 범위**: 앞으로 생성될 Scout 파일부터. 기존 `inbox/scout/*.md` 파일 일괄 편집 금지 (sessions/기존 세션의 정합성 보존).
3. **공부 보고서 편성 경로**: Deep Extract의 Step 2 `paper-extract/SKILL.md` 실행 **직후 Step 2-B**로 공부 보고서 생성. knowledge/ md 반영과는 별개의 output. A층 전용 — KNOWLEDGE_BUNDLE에도 bundle consumer에도 접근 금지.
4. **공부 보고서 파일명**: `inbox/study-notes/YYYY-MM-DD-[논문제목-slug].md`. 슬러그는 kebab-case 영문 또는 한글 짧은 제목 (예: `2026-04-24-glp1-adolescent-obesity.md`).
5. **공부 보고서 양식**: 초록 + 결론 + 임상 적용 포인트 + 배경·역학·방법 상세. Deep Extract가 knowledge/ md에 추출한 축약본보다 **풍부한 내용** (공부용). 원문 저작권 재현은 금지 (요약·인용만).
6. **study-notes 정리 규칙**: 자동 아카이브 없음 (누적 자원). 주기적 정리는 미르 수동.

---

### 변경 목록 (위험도 오름차순)

#### #1 (위험도: 낮음) — `rules/file-ownership.md` inbox/study-notes 경계

**파일**: `rules/file-ownership.md`

**old**:
```
## knowledge/myth-log/
책임: 임상 현장에서 반복되는 **미신·잘못된 통념**을 기록. 의사 본인 공부 자원.
포함: 각 myth 엔트리 md 파일 (kind: "myth")
금지: **inject 대상 아님** — Guide tab·Liby 힌트·Draft append·KNOWLEDGE_BUNDLE 컴파일 전부 제외
      export 대상 아님 (외부 공유 포맷 도입 시에도 제외)
      일반 by-disease/by-drug 엔트리를 myth-log로 재배치 금지 (보존 방향 반대)
참조: rules/forbidden.md Liby §, agents/librarian.md inject 트리거 분기
```

**new**: 위 블록 바로 아래에 다음 섹션 추가.

```
## inbox/study-notes/
책임: Deep Extract routine이 추출한 **공부용 논문 보고서** 저장소. A층 순수학습용.
포함: `YYYY-MM-DD-[논문제목-slug].md` 파일 (Deep Extract 자동 생성)
금지: **Liby ingest 대상 아님** — Guide tab·Liby 힌트·Draft append·KNOWLEDGE_BUNDLE 전부 제외
      knowledge/ 트리로 승격 금지 (bundle 편입은 별도 paper-extract 경로로만. study-notes는 원본 상세 보존 전용)
      아카이브 자동화 금지 (미르 수동 정리)
참조: routines/deep-extract.md Step 2-B
```

**이유**: `inbox/study-notes/` 책임 경계 명시. A층 격리 명문화 — RedFlag·myth-log와 동일 패턴.

**검증 기준**: `## inbox/study-notes/` 섹션 존재.

---

#### #2 (위험도: 낮음) — `inbox/study-notes/` 폴더 생성

**파일**: `inbox/study-notes/README.md` (신규)

**내용**:
```markdown
# inbox/study-notes/

Deep Extract routine이 생성하는 **공부용 논문 보고서** 저장소.

## 역할 (A층 순수학습용)

- Deep Extract가 논문을 knowledge/ md로 추출할 때 **동시에** 상세 공부 보고서를 본 폴더에 생성
- 파일명: `YYYY-MM-DD-[논문제목-slug].md`
- 내용: 초록·결론·배경·방법 요약 + 임상 적용 포인트 (원문 재현 금지)
- 목적: 미르가 나중에 찬찬히 읽으며 공부하기 위한 자원

## 격리 원칙

- **Liby ingest 대상 아님** — 앱 Guide/Hint/Draft·KNOWLEDGE_BUNDLE 어디에도 흘러가지 않음
- **bundle 편입 승격 금지** — 승격이 필요한 내용은 기존 paper-extract 경로로 knowledge/에 직접 추출
- 자동 아카이브 없음 — 누적 자원, 미르 수동 정리

## 참조
- `routines/deep-extract.md` Step 2-B
- `rules/file-ownership.md` inbox/study-notes §
```

**이유**: 폴더 존재 확보 + 경계 재안내. Git tracking을 위한 최소 파일.

**검증 기준**: `inbox/study-notes/README.md` 파일 존재.

---

#### #3 (위험도: 중간) — `routines/scout.md` 개정

**파일**: `routines/scout.md`

**변경 4종 묶음**:

(a) **일일 상한 5 → 10건** — 파일 하단 "하루 최대 ⭐ 5건 제한" 문구 변경.

**old**:
```
- 하루 최대 ⭐ 5건 제한 (과부하 방지)
```

**new**:
```
- 하루 최대 ⭐ 10건 제한 (과부하 방지, 2026-04-24 Deep Extract 10건 상향과 동조)
```

(b) **🔺 제거** — 등급 표에서 🔺(△) 행 삭제 + 후속 문구 정리. (실제 파일은 `△`로 표기됨)

**old** (Step 3 필터링):
```
| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래에서 바로 적용 가능한 실용 지식 포함 |
| △ | 배경 지식으로 유용하나 즉각 처방 변화 없음 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 |

⭐ 항목만 최종 보고에 포함 (△는 선택 포함, ✕는 제외)
```

**new**:
```
| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래에서 바로 적용 가능한 실용 지식 포함 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 / 배경 지식만 있고 즉각 처방 변화 없음 |

⭐ 항목만 최종 보고에 포함 (✕는 제외). 2026-04-24 △ 제거 — Deep Extract 대상이 아니므로 실효 없음.
```

**old** (Step 4 결과 파일 양식의 △ 참고 논문 섹션):
```
## △ 참고 논문 (선택)
### 1. {제목}
- **PMID:** {번호} | **한 줄:** {요약}

---
```

**new**: 위 블록 전체 삭제 (양식에서 △ 섹션 제거).

(c) **공백 채우기 슬롯 추가** — Step 1 + Step 2에 scope.md Tier 1~3 연동 + MAP.md 🔴 공백 인용.

**old** (Step 1):
```
### Step 1 — 관심 키워드 귀납 추출
`knowledge/log.md` 마지막 30개 항목을 읽는다.
자주 등장하는 질환·약물·키워드 TOP 5를 추출한다.
(예: 비만 GLP-1 어지럼증 예방접종 구강건조 → 이번 탐색 키워드로 사용)
```

**new**:
```
### Step 1 — 관심 키워드 귀납 추출 + 공백 채우기 슬롯 (2026-04-24 확장)

**1-A. 귀납 키워드 (기존)**
`knowledge/log.md` 마지막 30개 항목을 읽는다.
자주 등장하는 질환·약물·키워드 TOP 5를 추출한다.
(예: 비만 GLP-1 어지럼증 예방접종 구강건조 → 이번 탐색 키워드로 사용)

**1-B. 공백 채우기 슬롯 (신규)**
`knowledge/scope.md` Tier 1~3 + `knowledge/MAP.md` §3의 🔴 공백 영역을 **추가 탐색 입력**으로 편입.
- scope.md Tier 1 공백 (현재 상태): 당뇨 본체·이상지질혈증·생활습관 의학·호흡기·소화기·근골격·건강검진
- scope.md Tier 2 공백: 노인의학·비뇨의학 대부분
- 1회 실행당 **공백 영역 중 1개 분야를 랜덤 선택**하여 교과서·가이드라인·최신 논문 탐색 쿼리에 포함
- 공백 채우기 슬롯은 Tier 3 랜덤 탐색(Step 2 Tier 3)과 **별도** — 합쳐서 2개 탐색 방향

목적: 공백 영역이 MAP.md에 누적되지 않도록 Scout가 능동 보충 (A층 지식 체계 구축 강화).
```

(d) **Step 2 Tier 2 귀납 키워드 쿼리 보강** — 공백 분야 key-term 예시 추가.

**old** (Step 2 Tier 2):
```
**Tier 2 — 귀납 키워드**
Step 1 에서 추출한 키워드로 PubMed 검색
쿼리 형식: `{키워드} primary care outpatient 2025[dp]:2026[dp]`
```

**new**:
```
**Tier 2 — 귀납 키워드 + 공백 채우기**
Step 1-A 귀납 키워드 + Step 1-B 공백 채우기 슬롯으로 PubMed 검색.
쿼리 형식:
- 1-A: `{귀납 키워드} primary care outpatient 2025[dp]:2026[dp]`
- 1-B: `{공백 분야 key-term} primary care review 2024[dp]:2026[dp]` (review·guideline·textbook 중심)
  - 예: `"type 2 diabetes" primary care review 2024[dp]:2026[dp]`
  - 예: `"irritable bowel syndrome" primary care management 2024[dp]:2026[dp]`
```

**이유**:
- (a)(b): D5·D6 미르 결단 반영
- (c)(d): D4 미르 결단 반영 — 기존 Scout 확장 방식

**검증 기준**:
- "10건" 문자열 존재
- △ 등급 행·섹션 제거
- "공백 채우기 슬롯" 문구 존재
- "1-B" 표기 존재

---

#### #4 (위험도: 중간) — `routines/deep-extract.md` Step 2-B 공부 보고서 신설

**파일**: `routines/deep-extract.md`

**변경 2종**:

(a) **Step 2 아래에 Step 2-B 신설**

**old**:
```
### Step 2 — 논문별 Deep Extract

각 대상 논문에 대해 `skills/paper-extract/SKILL.md` 실행:
1. PubMed/저널 사이트에서 초록 + 결론 수집
2. 임상 핵심 추출
3. knowledge/ 형식 draft 작성
4. 저장 위치 결정 (기존 파일 추가 or 신규 생성)

### Step 3 — main 직접 머지
```

**new**:
```
### Step 2 — 논문별 Deep Extract

각 대상 논문에 대해 `skills/paper-extract/SKILL.md` 실행:
1. PubMed/저널 사이트에서 초록 + 결론 수집
2. 임상 핵심 추출
3. knowledge/ 형식 draft 작성
4. 저장 위치 결정 (기존 파일 추가 or 신규 생성)

### Step 2-B — 공부 보고서 생성 (2026-04-24 신설, A층 순수학습용)

Step 2와 **동시에** 각 논문에 대한 공부 보고서를 `inbox/study-notes/` 에 생성한다.

**저장 경로**: `inbox/study-notes/YYYY-MM-DD-[논문제목-slug].md`
- `YYYY-MM-DD` = 실행 당일 KST
- `[논문제목-slug]` = 논문 제목을 kebab-case 영문 슬러그 (또는 짧은 한글). 예: `glp1-adolescent-obesity`, `influenza-rx-model`

**양식**:
```markdown
# {논문 제목}

- **PMID**: {번호}
- **저널 / 연도**: {저널명} {연도}
- **저자**: {제1저자 et al.}
- **출처 Scout**: inbox/scout/YYYY-MM-DD.md

## 초록 요약
{초록 재구성 — 원문 재현 금지, 2~3문단}

## 주요 결과
{핵심 수치·지표·effect size}

## 배경·방법
{왜 이 연구가 필요했는지, 어떻게 설계됐는지 — 교과서적 설명}

## 일차의료 적용 포인트
- {외래 실전 연결 포인트 1}
- {외래 실전 연결 포인트 2}

## 한계·주의
{표본·edge case·외삽 한계}

## 관련 knowledge/ 엔트리
- {Deep Extract가 반영한 knowledge/ md 파일 경로}
```

**격리 원칙** (`rules/file-ownership.md` inbox/study-notes §):
- 본 보고서는 **Liby ingest 대상 아님**
- KNOWLEDGE_BUNDLE·Guide·Hint·Draft 어느 경로에도 흘러가지 않음
- 미르가 **나중에 찬찬히 읽으며 공부하기 위한 자원** 전용

Step 2-B는 Step 2 knowledge/ md 반영 **완료 후** 별도 Write로 생성. 실패해도 Step 2 산출물은 유지 (부분 실패 허용).
```

(b) **Step 4 요약 보고서에 study-notes 언급 추가**

**old**:
```
## 처리한 논문

| 논문 | 저장 위치 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|
| {제목 축약} | knowledge/{경로} | [CLINICAL] | {번호} | YYYY-MM-DD |
```

**new**:
```
## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| {제목 축약} | knowledge/{경로} | inbox/study-notes/{파일명} | [CLINICAL] | {번호} | YYYY-MM-DD |
```

**이유**: D5 미르 결단 — 공부 보고서는 Deep Extract 산출물 일부. A층 순수학습용 (D8 결단).

**검증 기준**:
- "Step 2-B" 헤더 존재
- "inbox/study-notes/" 문자열 존재
- "A층 순수학습용" 문자열 존재

---

### 임상 안전 확인 필요: N

### 예상 회귀 위험

1. **Scout 🔺 제거가 기존 파일에 소급 적용되는 실수**: 가정 2로 차단. 앞으로 생성 파일만 적용.
2. **공부 보고서 저작권 재현**: Step 2-B 양식에 "원문 재현 금지" 명시. Deep Extract routine이 기존 요약 원칙 유지.
3. **inbox/study-notes/ 자동 Liby ingest 침투**: rules/file-ownership.md에 명문화 + README.md에 재안내. Liby inbox 트리거는 `.md` 파일 처리 대상에 study-notes 경로를 스캔할 수 있음 → `agents/librarian.md` Inbox § 스캔 범위에 study-notes 제외 명시 필요한지 **재확인 대상**. (Builder 작업 시 확인)
4. **study-notes 폴더가 GitHub 모바일 알림 소음 유발**: Deep Extract main 직접 머지 방식은 동일. 추가 파일이 커밋에 포함될 뿐 알림은 동일 채널.

---

### ⚠ Builder 선행 확인 사항

Liby Inbox 트리거 (`agents/librarian.md`) 스캔 범위에 `inbox/study-notes/` 가 포함되는지 Builder가 먼저 Read로 확인.
- 포함된다면 → Builder는 librarian.md inbox § 에 "study-notes 제외" 분기 1줄 추가 (변경 #5로 편입)
- 포함되지 않는다면(processed/ 제외만 있고 study-notes는 명시 안 됨) → 변경 #5 불필요

---

## Builder 실행 권고 순서

1. #1 file-ownership.md inbox/study-notes 경계
2. #2 inbox/study-notes/README.md 생성
3. #3 routines/scout.md 개정
4. #4 routines/deep-extract.md Step 2-B 추가
5. #5 (조건부) agents/librarian.md inbox § study-notes 제외 — Builder 확인 후 결정

## 체크포인트

- #1~#4 완료 후 Reviewer 1차 검토 (문서 정합성)
- 다음 Scout 자동 실행 시 (명일 06:00 KST) 공백 채우기 슬롯·🔺 제거·10건 상한 실전 검증
- 다음 Deep Extract 실행 시 (명일 12:00 KST 또는 수동) Step 2-B 공부 보고서 생성 검증
