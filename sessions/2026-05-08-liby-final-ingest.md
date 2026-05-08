# sessions/2026-05-08-liby-final-ingest.md

## 세션 정보
- 날짜: 2026-05-08
- 작업: Liby 미ingest 잔여 14건 + MAP.md 검토 일괄 처리
- 건드린 파일:
  - src/knowledge-bundle.js (append 신규 entry 12건 + alias 통합 2건)
  - src/knowledge-bundle.js.bak-2026-05-08-ingest (백업)
  - /tmp/2026-05-08-ingest-log.txt (변환 로그)
  - sessions/2026-05-08-liby-final-ingest.md (본 파일)

---

## 결정 배경
미르 결단 (2026-05-08): 미ingest 잔여 백로그 일괄 처리. 14 md 파일 + MAP.md 정체성 확인.

## 입력 검토 결과
- knowledge/MAP.md: META index 문서 (tags:[META]). 임상 entry 아님 → ingest skip.
- 백신 7건 + adult-vaccination-summary 한글 alias 정합 체크: bundle에 한글 alias 객체 미존재 (B형간염·A형간염·HPV·일본뇌염·폐렴구균·광견병·MMR 등 모두 키로 미등록). 따라서 모든 백신 md를 신규 entry로 ingest.
- hepatitis-b.md: 기존 _hepb_mgmt_v2 (hepatitis-b-management) entry와 동일 PMID:41839074, 동일 주제 → alias 통합.
- primary-care-top20-2024.md: 기존 _afp_poems_2024_v2 (afp-top20-poems-2024)와 동일 PMID:40736492, MAP.md alias pair 명시 → alias 통합.

## 추가/통합/폐기 entry

### 신규 entry (12건)
1. heel-pain (disease, 5 sections, PMID:41533410)
2. persistent-physical-symptoms (topic, 6 sections, PMID:41823400)
3. pocus-focus-cardiac (topic, 6 sections, PMID:42094314)
4. hepatitis-ab-vaccine (disease, 5 sections, 4 sources)
5. herpes-zoster-vaccine (disease, 5 sections, 3 sources)
6. hpv-vaccine (disease, 3 sections, 2 sources)
7. japanese-encephalitis-vaccine (disease, 2 sections, 2 sources)
8. pneumococcal-vaccine (disease, 3 sections, 2 sources)
9. rabies-vaccine (disease, 3 sections, 2 sources)
10. varicella-mmr-polio-vaccine (disease, 3 sections, 3 sources)
11. adult-vaccination-summary (topic, 4 sections, 6 sources)
12. afp-poems-2025-dec (topic, 2 sections, PMID:41533401)

### Alias 통합 (2건, 신규 객체 미생성)
- hepatitis-b.md → 기존 _hepb_mgmt_v2 (alias: hepatitis-b, B형간염, HBV)
- primary-care-top20-2024.md → 기존 _afp_poems_2024_v2 (alias: primary-care-top20-2024, 일차의료-top20-2024)

→ palliative-pain·glp1·xerostomia·MASH·heart-failure-volume-overload 사건 재발 방지: 동일 키 재할당 0건, 이질 주제 추가 0건.

## 검증 결과 (Builder + Reviewer + QA 통합)

### bundle stats
- before (backup): 485 KNOWLEDGE_BUNDLE 직접 할당
- after: 553 KNOWLEDGE_BUNDLE 직접 할당 (+68 키 = 12 신규 entry × 평균 5 alias + 통합 alias 5건)

### 검증
- node -c src/knowledge-bundle.js → syntax OK
- 키 중복 (`grep ... | sort | uniq -d`): **0건**
- node eval Object.keys: 600 (duplicates 0)
- 19 wikilinks 타겟 모두 KNOWLEDGE_BUNDLE에 resolve OK (heart-failure, COPD, fatigue, neffy 등)
- 새 entry sample 30+ 키 resolve OK (kind/sections/primarySources 모두 정상)

### 5-D auto-wikilinks
- 총 21건 wikilinks 삽입, 19 unique targets
- 5-D.1 우선순위: target.key 정확 일치만 사용
- (섹션, 토큰) 1회 규칙 준수
- 자기 자신 key 제외, frontmatter / sources[] 미변환
- 의심 변환·주제 부조화: 없음

## 판정
**통과** — 모든 검증 항목 OK.

## 다음 작업
- 미르 검토 후 main 머지 권고 가능 (자동 routine·CI에 영향 가능 — 백신 entry는 inject 경로 활성)
- TRIAGE_PROMPT calcCategories 확장 (forbidden.md "Liby ingest 후 자동 실행" 룰): 새 백신 키들이 calcCategories 분류 카테고리에 해당되면 자동 추가 — 단, 본 ingest는 백신 entry이며 calcCategories는 만성질환 분류 (dyslipidemia·osteoporosis·depression·diabetes·obesity 등) 중심이므로 추가 대상 없음. 별도 trigger 없음.

## 회고
- 예상과 달랐던 점:
  - "한글 alias가 이미 존재"라는 작업 지시는 MAP.md 기반의 추정이었으나 실제 bundle 검사 결과 한글 vaccine entry 미존재 → 모두 신규 ingest로 단순화 (alias 통합 케이스 0건, hepatitis-b 1건과 primary-care-top20-2024 1건만 통합)
  - tdap·vaccine-interval entry도 bundle 미존재 → 새 vaccine entry parents:[] 보류
- 다음 세션 반영:
  - tdap·vaccine-interval md 파일이 있다면 후속 ingest 필요 (parent로 활용 가능해짐)
  - MAP.md "alias 쌍" 표는 bundle 실제 상태와 부분 불일치 — Auditor가 정기 동기화 필요 (예: hepatitis-b는 이제 alias로 통합됨)

---

## ADDENDUM — 2026-05-08 deep-extract 보강분 8건 재컴파일 (미르 직접 명령 "deep extract 무조건 포함해라")

### 배경
원 작업(신규 14건 ingest + 백신 alias 통합)이 완료된 후, 미르가 추가로 2026-05-08 deep-extract(commit 2292a47)와 이전 deep-extract 보강분의 bundle 미반영분을 재컴파일하라고 명령. 이 추가분은 신규 entry가 아닌 **기존 bundle entry의 sections·primarySources·keywords 보강**.

### 재컴파일 대상 8건

| # | Entry | 추가 섹션 / 보강 | PMID |
|---|---|---|---|
| 1 | `cancer-fatigue` | notes에 운동+행동지원 대장암 생존율 추가 (POEM) | 41544293 |
| 2 | `low-back-pain` | exam·protocol에 급성 LBP AFP 통합 + precaution 신설 (척추 주사·RFA 금지) | 41252835, 41252845 |
| 3 | `opioid-use-disorder` | 검토 결과 md ↔ bundle 일치 — 변경 없음 (sync 확인만) | (sync) |
| 4 | `palliative-pain` | oud_cancer_pain·rotation_real_world 두 섹션 신설 — 부프레노르핀 본연 도메인 (5-7 분할 룰 준수) | 42092642, 42009265 |
| 5 | `sudden-hearing-loss` | 검토 결과 md ↔ bundle 일치 — 변경 없음 (sync 확인만) | (sync) |
| 6 | `vaccination` | ckd_elderly_flu 섹션 신설 + **백신 alias 통합** (3중 inline 중복 → 단일 entry 참조 공유) | 41771129 |
| 7 | `deprescribing` | protocol 섹션 내부에 노인 Z-수면제 BI 통합 추가 | 42031000 |
| 8 | `goals-of-care-acp` | dementia_eol_quality 섹션 신설 (notes ↔ referral 사이) | 41856050 |

### 백신 alias 통합 (원 작업의 미완 항목 마무리)
- 기존 inline 중복 3건 (vaccination / 예방접종 / 백신 — 각자 독립 sections 사본 보유) 제거
- vaccination 본체 1건 유지 + KNOWLEDGE_BUNDLE 후처리 reference 할당으로 예방접종·백신 통합
- 검증: `KNOWLEDGE_BUNDLE['vaccination'] === KNOWLEDGE_BUNDLE['예방접종']` → true / `=== ['백신']` → true
- 본체 변경 시 alias 자동 반영 (CLAUDE.md "참조 공유" 패턴)

### 변경 / 추가 카운트
- cancer-fatigue: +0 새 섹션 (notes 내부 보강), primarySources 1→2, keywords 8→12, alias +1 (`colorectal-cancer-survival`)
- low-back-pain: +1 precaution 신설, primarySources 2→4, keywords 11→17
- palliative-pain: +2 oud_cancer_pain·rotation_real_world, primarySources 2→4, keywords 9→16
- vaccination: +1 ckd_elderly_flu, primarySources 2→3, keywords 8→12, alias 3중 inline → 1 본체 + 2 reference
- deprescribing: +0 새 섹션 (protocol 내부 보강), primarySources 2→3, keywords 11→17
- goals-of-care-acp: +1 dementia_eol_quality, primarySources 2→3, keywords 13→17

### 검증 (재컴파일분)
- syntax: `require('./src/knowledge-bundle.js')` → SYNTAX OK
- 8 신규 PMID 모두 bundle 내 ≥3회 등장 (sources 라벨 + content 인용 + primarySources 합계)
- 키 재할당 중복 검사: KNOWLEDGE_BUNDLE 직접 할당 중 같은 키 2회+ 케이스 0건
- 총 키 수: 601 (백신 alias inline 2건 제거 → reference 2건 추가, 순감 0)
- cache version bump: `?v=0508-hier` → `?v=0508-recompile` (src/index.html, coding-behavior.md §3 룰 준수)
- 백업: `src/knowledge-bundle.js.bak-2026-05-08-recompile`

### 5-D / 5-D.1 가드 (재컴파일분)
- 새 추가 섹션 본문 내 wikilinks (`[[opioid-use-disorder]]`, `[[예방접종|예방접종]]`, `[[afp-top20-poems-2024|AFP]]`) 모두 섹션당 첫 등장 1회 룰 준수
- 동일 토큰 cross-target 위험 케이스 없음

### 추가분 판정
**통과** — syntax / PMID 보존 / no duplicate keys / alias 일관성 모두 OK.

### 추가분 회고
- opioid-use-disorder·sudden-hearing-loss는 md ↔ bundle 이미 동기 상태였음 — 미르 지시 8건 중 2건은 검증만으로 종결
- 백신 alias 통합 패턴(inline 중복 → 후처리 reference 할당)은 다른 한국어/영어 듀얼 keyword에도 확장 적용 가능 (예: 자궁경부암 / cervical-cancer-screening 등 — 별도 세션에서 검토)
- palliative-pain은 5-7 분할 룰("부프레노르핀 본연 entry만 남김") 준수 확인 후 추가 — OUD+암 / 오피오이드 내성 전환 둘 다 부프레노르핀 약리·완화의료 통증 도메인이므로 문제 없음
