# 2026-05-07 — Liby Cleanup (Bundle 동기화 일괄 처리)

## 세션 정보
- 호출자: 미르
- 에이전트: Liby (Librarian)
- 작업: 미ingest 잔여 + 비대칭 entry 동기화 + 오늘 deep-extract 신규 md → bundle 동기화
- 브랜치: `liby-cleanup-2026-05-07`

## 결정 배경
2026-05-06 audit 후속 데이터 위생 처리. 3개 영역의 bundle/md 비동기화 누적 해소:
- 작업 1: tirzepatide·zepbound entry에 mounjaro의 rebound 섹션 부재 (비대칭)
- 작업 2: by-disease/·by-drug/ 10개 md 미ingest (auditor 보고)
- 작업 3: 오늘(2026-05-07) deep-extract ce4fd09 커밋의 신규 3 + 수정 7 md 미반영

## 건드린 파일
- `src/knowledge-bundle.js` — 일괄 추가/수정 (501 → 548 keys, 105 → 118 v2 entries)
- `src/knowledge-bundle.js.bak-liby-cleanup` — 백업 (작업 시작 시 cp)
- `/tmp/liby-cleanup-log.txt` — 변환 로그

knowledge/ md 파일은 **수정 없음** (이번 작업은 bundle 컴파일만).

## 변경 상세

### 작업 1 — tirzepatide / zepbound rebound 미러링
**방식 선택**: SECTION 미러링 (alias 통합 아님).

**사유**: 4개 키가 4개 별도 객체로 등록되어 있고 hint/guide·parents·primarySources가 각자 다름. alias 통합 시 hint 동작·기존 캐싱 깨질 위험. 미러링이 안전하며 컨텐츠 동등성 확보 충분.

- `tirzepatide` entry: rebound 섹션 추가 + primarySources에 PMID:41962807, guide에 "rebound" 추가
- `zepbound` entry: 동일

신규 entry 0, 신규 sections 2.

### 작업 3 — 신규 3건
| key | kind | sections | primarySources | aliases |
|---|---|---|---|---|
| anticholinergic-burden | topic | 5 | 1 (PMID:41824280) | 항콜린부담, ACB, anticholinergic |
| asthma | disease | 5 | 1 (PMID:41839117) | 천식, 경증천식 |
| neonatal-fever-pecarn | disease | 4 | 1 (PMID:41359314) | 신생아발열, PECARN, neonatal-fever |

### 작업 3 — 수정 7건
| entry | 변경 | 추가 PMID |
|---|---|---|
| chronic-pain-integrative | protocol에 AFP 비오피오이드 가이드 통합 | 40834375 |
| ckd-monitoring | monitoring에 UACR vs UPCR 비교 + UACR/UPCR alias 추가 | 41183334 |
| low-back-pain | 신규 lifestyle section (활동 안전) | 41511791 |
| palliative-pain | precaution에 패치 조기 효력 소실 통합 | 41617142 |
| deprescribing | notes에 감약 거부 면담 전략 | 42068533 |
| goals-of-care-acp | notes에 치매 ACP 처방설정형/목표도출형 | 42069237 |
| nocturia (작업 2와 통합) | mirabegron frail OAB 포함 ingest | 42070202 |

### 작업 2 — 미ingest 10건
| key | kind | sections | primarySources |
|---|---|---|---|
| anti-amyloid-mab | drug | 10 | 2 (CLARITY AD, TRAILBLAZER-ALZ 2) |
| gallstones | disease | 10 | 2 (C-GALL BMJ, HTA) |
| cgm-t2dm | drug | 9 | 1 (AFP POEMs) |
| nocturia | disease | 6 | 2 (AFP, mirabegron) |
| geriatric-assessment-4ms | topic | 5 | 1 |
| hyponatremia | disease | 7 | 1 |
| pocus-primary-care-efsumb | topic | 4 | 1 |
| vte-hormone-therapy | topic | 5 | 1 |
| continuity-of-care | topic | 3 | 1 |
| delayed-diagnosis | topic | 3 | 1 |

`anti-amyloid-mab`·`cgm-t2dm`은 task spec에 by-disease/로 표기됐으나 실제는 by-drug/ 위치 — md frontmatter에 따라 kind: "drug" 부여. 지정된 `uiHooks: { guide: ["*"] }` 명시 (md에 명기됨).

## 5-D / 5-D.1 wikilinks 적용
- 신규/수정 본문에 wikilinks 약 15건 삽입
- target priority 적용: target.key 정확 일치 우선 (예: deprescribing·nocturia·anticholinergic-burden·COPD·pocus-lung·pocus-abdominal·low-back-pain·hyponatremia·continuity-of-care)
- (섹션, 토큰) 1회 엄격 — 동일 토큰은 1개 wikilink만
- 일반 어휘·약어 (OAB·PT·CBT·EHR·AD·LP·GFR·OSA) 변환 보류
- 의심 후보·skip 로그 사례: **0건** (이번 일괄에서 cross-keyword 충돌 없음)

## 키 중복 검증
모든 신규 키 (총 47개 alias) — 각 1회만 KNOWLEDGE_BUNDLE에 할당. grep 검사 통과. palliative-pain·glp1 사건 재발 방지 OK.

## 주제 정합성 (2026-05-06 신설 룰) 검증
6개 modify entry 모두 기존 entry 핵심 도메인과 추가 컨텐츠 도메인 일치 확인:
- chronic-pain-integrative: 만성 통증 비약물 → 비오피오이드 약물 (보강)
- ckd-monitoring: GFR 추정 → 단백뇨 측정 (CKD 모니터링 동일 도메인)
- low-back-pain: 비약물 1차 → 활동 안전 (lifestyle 분리 섹션)
- palliative-pain: buprenorphine 약리 → buprenorphine 패치 약동학 변이 (동일 약물)
- deprescribing: 가이드라인 → 환자 거부 면담 전략 (동일 영역)
- goals-of-care-acp: 7대 요소 → 치매 ACP 접근법 (ACP 영역)

이질 도메인 추가 사례 0건. heart-failure-volume-overload·palliative-pain v2_full 사건 패턴 재발 차단.

## Bundle stats
| 지표 | Before | After | Δ |
|---|---|---|---|
| Total keys | 501 | 548 | **+47** |
| v2 var entries | 105 | 118 | **+13** |
| 키 중복 (사전 존재) | 14 | 14 | 0 (unchanged) |

## 판정
- syntax: `node -c` OK
- 런타임 평가: 548 keys 정상 로드
- 13개 신규 entry 정상 (kind/sections 모두 검증)
- 6개 modify entry 추가 컨텐츠 모두 반영 (PMID·section content 검증)
- tirzepatide/zepbound rebound 정상
- alias 라우팅 검증 (UACR→ckd-monitoring, mirabegron→nocturia, ACB→anticholinergic-burden, PECARN→neonatal-fever-pecarn): 전부 통과
- PMID md→bundle 카운트 일치

**판정: PASS**

## 다음 작업
- main 머지 권고 (이번 변경은 다음 세션에서 참조 필요 + Liby inject runtime 영향)
- 의심 wikilinks 또는 주제 부조화 우려: **없음**
- knowledge md 파일은 unchanged이므로 Auditor 분할 후보 분석 영향 없음

## 회고
- 작업량 대규모(13 신규 + 6 수정)였으나 일괄 append 방식으로 bundle 일관성 유지
- task spec 일부 오류(by-disease/ vs by-drug/ 위치) — md frontmatter·glob 검증 후 정정
- nocturia가 작업 2(미ingest)와 작업 3(수정) 양쪽에 걸침 — 신규 ingest로 처리하면서 mirabegron 섹션 자연 통합
- 5-D wikilinks 의심 사례 0건 — 신규 컨텐츠가 깔끔한 PMID 단위라 cross-keyword 충돌 적음
