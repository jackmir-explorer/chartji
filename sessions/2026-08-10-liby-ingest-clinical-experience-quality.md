# sessions/2026-08-10-liby-ingest-clinical-experience-quality.md

## 세션 정보

- 날짜: 2026-08-10
- 작업: **Liby ingest** — PubMed 논문 URL 1건 (PMID:15710959) → knowledge entry + bundle 컴파일
- 입력: 미르가 `https://pubmed.ncbi.nlm.nih.gov/15710959/` 링크 + "liby에 이 논문 내용 ingest 해"
- 브랜치: `claude/liby-paper-ingest-kznm4h`
- 건드린 파일:
  - `knowledge/guidelines/clinical-experience-quality.md` (신규)
  - `src/knowledge-bundle.js` (엔트리 1개 + alias 9개 추가)
  - `src/index.html` (캐시 버전 bump)
  - `knowledge/log.md` · `knowledge/index.md` (등록)

---

## 결정 배경

### 원 논문

Choudhry NK, Fletcher RH, Soumerai SB. *Systematic review: the relationship between clinical experience and quality of health care.* Ann Intern Med. 2005;142(4):260-73. PMID:15710959, DOI:10.7326/0003-4819-142-4-200502150-00008

MEDLINE 1966~2004.6, **62개 evaluation**. 32건(52%)이 모든 outcome에서 경력↑→수행↓, 13건(21%)이 일부 outcome에서 저하. 경력이 유리한 evaluation은 2건(3%)뿐. 가장 객관적인 outcome measure로 제한해도 결과 불변.

### 배치 결정 — 왜 guidelines/ + kind:"topic" 인가

`agents/librarian.md` 「신규 ingest 시 주제 정합성 체크」 적용:

1. 기존 후보 entry 2개 검토 — `clinical-reasoning`(인지편향), `delayed-diagnosis`(문서 단편화)
2. 새 컨텐츠 주제는 **의사 경력 연수 ↔ 진료 질의 집단 수준 연관**. 두 기존 entry의 primarySources·keywords·임상 흐름과 **명백히 다른 도메인**
3. → **신규 entry 생성** (「기존 entry에 이질 주제 추가 금지」 2026-05-06 규칙)
4. 질환·약물이 아니므로 `guidelines/`, `kind: "topic"`
5. topic kind → `parents` 부여 금지 (`section-vocabulary.md` parents 규칙) — 필드 자체 생략

### Triage 미등록 결정 (rules/forbidden.md Liby § 예외 적용)

`forbidden.md`의 "새 키 추가 시 Triage 감지 확장 자동 실행" 규칙을 **적용하지 않았다.**

- calcCategories는 **환자 transcript에서 감지되는 질환 카테고리** 목록이다. "의사 경력과 진료 질"은 환자 발화에서 감지될 수 있는 개념이 아니다 — 등록하면 영구 미발화 항목이거나 오탐 노이즈가 된다
- **선례 확인**: 동일 성격의 의사-대상 topic entry인 `clinical-reasoning`(kind:"topic")·`delayed-diagnosis` 모두 calcCategories에 **미등록** 상태로 운영 중
- topic kind 기본 uiHooks는 `hint:[]` / `guide:["*"]` — Triage·hint 경로를 타지 않고 Guide tab 큐레이션으로만 소비되므로 등록 없이도 설계 의도대로 동작
- entry 본문 `definition` 섹션에 "Triage 감지 대상 아님"을 명시해 후속 세션의 재판단 비용 제거

---

## Researcher 검증 결과 (Step 3)

`[CLINICAL]` 항목이므로 Researcher 서브에이전트 호출 (Liby 직접 WebSearch 금지 규칙 준수).

| 항목 | 판정 | 조치 |
|---|---|---|
| A. 원문 수치 8개 항목 | **일치** (축자 일치) | Tier 1 태그 부여 |
| B. Freshness (2005년 이후) | **조건부 지지** | 태그를 `[CLINICAL]` → **`[CLINICAL — 조건부]`** 로 변경 + `follow-up-evidence` 섹션 신설 |
| C. 한국 개원가 외삽 | **미확인** (한국 데이터 확보 실패) | `precaution`에 `[출처 미확인]` 명시 부기 |

### B의 실질 — 조절변수 3개

2005년 결론은 무조건 성립하지 않는다. 후속 문헌 5건이 성립 조건을 갈랐다:

| 축 | 근거 | 방향 |
|---|---|---|
| **진료량(volume)** | Tsugawa BMJ 2017 (PMID:28512089) | 재확인(사망률 10.8%→12.1%) — **단 고volume 의사에서 연관 소실** |
| **영역(인지 vs 술기)** | Tsugawa BMJ 2018 (PMID:29695473) | **역전** — 외과의 연령↑ → 수술 사망률 6.6%→6.3% (p for trend 0.001) |
| **현재 지식수준** | Gray JAMA Netw Open 2021 (PMID:34196714) | **기전 정정** — 처방 적정성을 가른 건 경력이 아니라 ABIM 성적(knowledge currency) |
| 교정 가능성 | Vandergrift HSR 2018 (PMID:28419451) | 주 CME 요건 강화 → 지식 점수 50→54 백분위 |
| 개입 효과 | Gray JAMA 2014 (PMID:25490325) | MOC 의무화 ↔ 외래 민감 입원(ACSH) 감소 **무관** |

→ 원 논문의 "이 subgroup이 QI intervention 대상" 권고는 **개입 효과로 직접 뒷받침되지 않는다**는 점까지 entry에 명시.

---

## 추가·수정 상세

### 신규 — `knowledge/guidelines/clinical-experience-quality.md`

섹션 6개 (표준 3 + 자유 3):

| 섹션 key | 종류 | 내용 |
|---|---|---|
| `definition` | 표준 | 통념 반박 + 연구 설계 + Triage 미등록 명시 |
| `evidence-distribution` | 자유 | 62 evaluation 6패턴 분포표 + 핵심 판독 |
| `follow-up-evidence` | 자유 | 성립/미성립/기전정정/교정가능성 4블록 (Researcher B) |
| `self-audit-routine` | 자유 | 외래 자가 점검 6항목 (논문 결론에서 도출한 적용안임을 명시) |
| `precaution` | 표준 | 저자 명시 한계 + 연령·경력 교란 + 한국 외삽 불가 |
| `notes` | 표준 | wikilinks 3건 |

- 자유 섹션 3개 사용 — topic kind 기본값이 `guide:["*"]`(전 섹션 순서대로)이므로 **`uiHooks` 오버라이드 불필요**, `uiHooks: null` 로 상속 (`librarian.md` "자유 섹션 사용 시 guide 오버라이드 필수"는 drug/disease 기본값이 부분 집합인 경우의 규칙 — topic `"*"`에는 해당 없음)
- `sources[]` 채움: `follow-up-evidence`만 Tier 2 5건 명시. 나머지 4개 섹션은 주제가 Tier 1 출처 범위에 온전히 포괄되므로 Tier 1 상속 (`sourcing-rules.md` Tier 1 중복 금지)
- **5-C 섹션↔출처 주제 일치 자가검증**: `follow-up-evidence` 키워드(physician age·volume·surgeon mortality·knowledge currency·CME) ↔ source 5건 전부 공통 개념 확인 ✓
- **5-D auto-wikilinks**: `[[clinical-reasoning]]` · `[[delayed-diagnosis]]` · `[[deprescribing]]` 3건 (전부 bundle 존재 확인). 섹션당 토큰 1회, `notes` 섹션에만 삽입. frontmatter·sources[] 내부 삽입 없음

### 수정 — `src/knowledge-bundle.js`

- `_clinical_experience_quality_v2` 객체 1개 + alias 9개 (`clinical-experience-quality`·`임상 경력과 진료 질`·`clinical experience`·`years in practice`·`physician age`·`지식 노후화`·`knowledge decay`·`평생교육`·`CME`)
- **키 중복 hard-check 통과**: 9개 키 전부 grep 0건 확인 후 삽입 (2026-05-07 "20건 데이터 손실 사건" 재발 방지 절차)
- 검증: `node --check` 통과 / 엔트리 로드 확인 / alias 9개 전부 동일 객체 resolve 확인 / 할당 1회 확인

### 수정 — `src/index.html`

`knowledge-bundle.js?v=0724-crp-aaa` → `?v=0810-clinexp` (coding-behavior.md 3번 — src/*.js 수정 시 캐시 우회 동시 bump)

---

## Liby ingest 4대 작업 점검 (CLAUDE.md 2026-05-12 명문화)

| # | 작업 | 상태 |
|---|---|---|
| 1 | Raw → knowledge/*.md | ✅ 완료 (본 세션 신규 1건) |
| 2 | inbox/ 파일 처리 | ✅ **처리 대상 없음** — inbox 잔여는 `README.md`·`gaps.md`·`blind-spots.md`(전부 스캔 제외) + `.hwp`·`.pptx`·확장자 없는 파일(미지원 형식) |
| 3 | **Deep Extract → bundle 컴파일 backlog** | ✅ **backlog 0건** — 2중 검증: ① `git log f453dff..HEAD -- knowledge/` 0건 ② log.md 최근 8개 항목 ↔ bundle 키 대조 8/8 존재 |
| 4 | gaps.md 처리 | ✅ **처리 대상 없음** — `inbox/gaps.md` 본문 카운트 0 (전량 Archive 이관 완료 상태) |

> `.hwp`·`.pptx`는 `agents/librarian.md` Inbox 트리거의 지원 형식(.md·이미지·.pdf)에 없다. 미르가 이 파일들 ingest를 원하면 별도 지시 필요 — 자동 처리하지 않음.

---

## 결과

- **판정: 통과**
- bundle 상태: unique objects 237 / alias keys 976
- 미르 확인 요망 사항 2건:
  1. **Triage 미등록 결정** — 위 「결정 배경」 근거로 자동 판단. 그래도 등록을 원하면 지시 요망
  2. **inbox 미지원 형식 4건** (`DIET 문진표 new.hwp` · `비만치료의 패러다임 전환 최종.pptx` · `위마 - 운동처방가이드.hwp` · `실수모음`) — 장기 방치 중. 처리 방침 결정 필요

## 다음 작업

- `knowledge/MAP.md` 갱신 지연 중 (updated 2026-05-08 기준, 이후 다수 entry 추가분 미반영) — Mapper 성격의 별도 세션 필요
- `inbox/` 미지원 형식 4건 처리 방침 결정

## 회고

- **예상과 달랐던 점**: 2005년 논문이라 "오래된 근거" 정도로 끝날 줄 알았으나, Researcher freshness 검증에서 **결론을 뒤집지 않으면서 성립 조건을 3축으로 쪼개는** 후속 근거가 나왔다. 특히 술기 영역 방향 역전(Tsugawa 2018)은 entry를 `[CLINICAL — 조건부]`로 낮추지 않았으면 잘못된 일반화를 저장할 뻔했다. **오래된 systematic review일수록 Researcher freshness 검증이 형식이 아니라 실질**임을 확인.
- **다음 세션 반영**: 의사-대상(자가 점검·교육) topic entry가 4건째 누적(`clinical-reasoning`·`delayed-diagnosis`·`persistent-physical-symptoms` 일부·본 entry). Triage 미등록 판단을 매번 재도출하는 대신 **"의사 대상 topic은 calcCategories 미등록"을 `rules/` 또는 `librarian.md`에 명문화**하는 것을 검토할 것.
