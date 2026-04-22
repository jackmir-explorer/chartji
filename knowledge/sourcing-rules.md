# knowledge/sourcing-rules.md — B2 스키마 출처 규칙

tags: [META]
updated: 2026-04-19
schema: B2

---

## 목적

B2 스키마에서 **어떤 근거를 어느 계층(Tier)에 저장할지**, **태그 규약**, **출처 불확실 시 처리 원칙**을 정의한다.

핵심 원칙: **근거의 불확실성을 숨기지 않는다**. `[출처 미확인]` / `[TIPS]` 태그는 감점이 아니라 투명성이다.

---

## 3-tier 출처 모델

한 엔트리의 근거는 3개 계층으로 분산 저장된다.

```jsonc
{
  "primarySources": [ "Tier 1: 파일 전체 대표 출처" ],

  "sections": {
    "<key>": {
      "content": "...",
      "sources": [ "Tier 2: 이 섹션의 대표 출처" ]
    }
  }
  // Tier 3: 섹션 content 내부의 inline 인용 (DOI·PMID·URL·표 주석)
}
```

### Tier 1 — `primarySources[]` (엔트리 루트)
- **무엇**: 파일 전체를 대표하는 최상위 근거 (가이드라인 원전, 대표 리뷰)
- **언제**: 파일 전체가 하나의 가이드라인·원전에 기반할 때
- **예**: `urticaria.md` → EAACI/GA²LEN/EuroGuiDerm/APAAACI 2021 (`Zuberbier T. Allergy 2022;77(3):734-766. PMID:34536239`)
- **형식**: 문자열 배열. 각 항목은 출처명 + (DOI 또는 PMID 또는 URL)
- **최소 정보**: 제1저자 또는 기관 + 연도 + 식별자 1개 이상

### Tier 2 — `sections[key].sources[]` (섹션 루트)
- **무엇**: 해당 섹션이 의존하는 출처 (Tier 1과 다를 때만)
- **언제**: 섹션이 파일 전체 대표 출처와 다른 근거를 쓸 때 (보조 가이드라인, 특정 논문)
- **예**: `urticaria.md` → `referral` 섹션은 `Ryan D. Clin Transl Allergy 2022` (일차의료 적용 경로)
- **형식**: Tier 1과 동일
- **중복 금지**: Tier 1과 동일한 출처는 Tier 2에 재기재하지 않는다 (자동 상속 간주)

### Tier 3 — inline 인용 (content 내부)
- **무엇**: 표·리스트·단문 근거 (특정 숫자, 특정 권고 등급)
- **언제**: 섹션 내 세부 데이터가 Tier 1/2가 아닌 별도 소스일 때
- **예**: Step 2 증량 근거 표에 `(off-label, EAACI Recommendation 1)` 주석
- **형식**: 자유 (마크다운 관행 따름) — 표 footnote, 인용 링크, 괄호 주석 등
- **이동 기준**: inline 인용이 섹션 전반을 지배하면 Tier 2로 승격

---

## 태그 규약

### 파일 수준 태그 (`tags: [...]`)
Front matter에서 파일 전체 성격을 표시한다.

| 태그 | 의미 | 비고 |
|---|---|---|
| `[CLINICAL]` | 가이드라인·RCT·대규모 코호트 등 **검증된 임상 근거** | Researcher 검증 필수 |
| `[REGULATORY]` | 심평원·식약처 급여 기준 등 **규제·행정 근거** | 급여 기준 변경 시 업데이트 |
| `[INSIGHTS]` | 미르·동료 의사의 관찰 기반 통찰 (논문화 전) | 출처(by ㅇㅇㅇ) 필수 |
| `[TIPS]` | 미르·동료 의사의 실전 노하우 (경험 기반) | 출처(by ㅇㅇㅇ) 필수 |
| `[META]` | 지식 관리용 메타 문서 (scope, vocabulary 등) | 임상 내용 아님 |

### 섹션 수준 태그 (`## 제목 [태그]`)
해당 섹션의 근거 종류를 섹션 헤더에 표시한다. 파일 태그와 다른 경우만 명시.

예: `## 실비보험 활용 [TIPS — by 로컬원장님]` (`mounjaro.md` — 파일은 `[CLINICAL, TIPS]`)

### `[출처 미확인]` 태그
- **용도**: 내용은 있지만 신뢰 가능한 출처를 아직 특정하지 못한 항목
- **규칙**: 숨기지 않고 태그로 노출 → Researcher 검증 큐에 자동 등록
- **금지**: `[출처 미확인]` 태그를 임의로 `[CLINICAL]`로 승격 금지 — 반드시 Researcher 검증 통과 후에만 변경

### `[CLINICAL — 조건부]` 태그
- **용도**: Researcher가 검증했으나 **적용 조건 제약**이 있는 경우 (예: 특정 인구, 특정 용량 범위)
- **예**: `mounjaro.md` → `## 최대 용량 [CLINICAL — 조건부]`

---

## Attribution 원칙

### ⚠ GOTCHA (librarian.md 규칙 재확인)
- **Attribution 임의 추정 금지**: TIPS/INSIGHTS에 출처 힌트 없을 때 `by 미르`로 자동 저장 금지. **반드시 미르에게 질문 후 저장**.
- **Researcher 호출 생략 금지**: CLINICAL 항목이 하나라도 있으면 Researcher 서브에이전트 호출 필수.

### 출처 명명 규칙
- 논문: `제1저자 성 + 이니셜. Journal 연도;볼륨(이슈):페이지. PMID:xxx, DOI:yyy`
  - 예: `Zuberbier T. Allergy 2022;77(3):734-766. PMID:34536239`
- 가이드라인: `기관명 연도 — 가이드라인명` + DOI 또는 URL
  - 예: `EAACI 2021 — Urticaria Guideline (DOI:10.1111/all.15090)`
- 실전 Tip: `[TIPS — by {이름/소속}]`
  - 예: `[TIPS — by 로컬원장님]`, `[TIPS — by ENT교수]`
- 임시 라벨 (보강 대상): `[TIPS — 임시 (보강 대상)]` (2026-04-22 L2-patch 재정의)
  - 용도: Tier 1 논문·가이드라인·규제의 주제 범위 밖 섹션을 Liby ingest 시 **임시 placeholder**로 저장. 원본 근거는 아직 특정되지 않았거나 약리 공식 정보(indication·contraindication·reimbursement 등)로 추후 정확한 출처 매핑 대상.
  - **처리**: 임시 라벨은 **bundle `sections[k].sources[]`에만 저장**되며, Guide tab curation ctx(`src/app.js` `handleCuration`)·LLM prompt·UI에 **전달되지 않는다 (invisible)**. Auditor·Phase 5b 주기로 정식 출처(Tier 1 또는 TIPS — by {이름/소속})로 교체된다.
  - 최초 도입: `knowledge/by-drug/sglt2-inhibitors.md` · `knowledge/by-drug/vitamin-d.md` ingest (2026-04-22)
  - **공식 1급 아님.** 공식 출처 2 class(Tier 1 / TIPS — by {이름/소속})와 별개의 **임시 marker**. (LLM prompt 계약 — `src/prompts.js` KNOWLEDGE_CURATION_PROMPT 공식 출처 라벨 2 class 참조)
- 규제: `심평원 고시 YYYY-제N호` 또는 `식약처 허가사항 YYYY-MM`

---

## Liby ingest 출처 검증 절차

ingest 시 출처 처리는 다음 순서를 따른다.

1. 원문에서 출처 후보 추출 (파일 앞부분, 섹션 헤더 태그, inline 인용)
2. 파일 전체를 지배하는 근거를 `primarySources[]`에 배치
3. 섹션별 고유 근거를 Tier 2 `sections[key].sources[]`에 배치 (Tier 1과 중복 금지)
4. 섹션 내 세부 데이터 출처는 inline 그대로 유지 (Tier 3)
5. 모든 `[CLINICAL]` 항목 → Researcher 서브에이전트 호출 (병렬 가능)
6. 모든 `[TIPS]` / `[INSIGHTS]` 항목 → attribution 확인
   - 출처 힌트 있음 → 그대로 저장
   - 출처 힌트 없음 → **미르에게 질문** (자동 추정 금지)
7. Researcher 검증 실패·보류 항목 → `[출처 미확인]` 태그 유지 후 저장

---

## 금지 사항 요약

- 출처 없이 `[CLINICAL]` 태그 부여 금지
- Researcher 검증 없이 `[출처 미확인]` → `[CLINICAL]` 승격 금지
- TIPS/INSIGHTS에 attribution 없이 저장 금지 (자동 `by 미르` 금지)
- Tier 1과 중복되는 출처를 Tier 2에 재기재 금지
- 환자 식별 정보(이름·나이·정확한 날짜·기관명 등) ingest 금지

---

## 참조

- 스키마 설계서: `sessions/2026-04-18-b2-schema-design.md`
- 섹션 표준: `knowledge/section-vocabulary.md`
- Librarian 에이전트: `agents/librarian.md`
- Researcher 서브에이전트: `agents/researcher.md`
