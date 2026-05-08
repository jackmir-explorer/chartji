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
