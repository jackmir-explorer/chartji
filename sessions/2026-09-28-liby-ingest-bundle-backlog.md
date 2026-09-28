# sessions/2026-09-28-liby-ingest-bundle-backlog.md

## 세션 정보
- 날짜: 2026-09-28
- 작업: 전면 Liby ingest — 4작업 + bundle backlog 컴파일 (미르 "liby ingest 해야하는거 전부 다 하자. 필요하면 web search")
- 건드린 파일: `src/knowledge-bundle.js` · `src/prompts.js` · `src/index.html` · `knowledge/guidelines/myopia-outdoor-activity-taiwan.md` · `knowledge/log.md`

---
## Liby ingest 4작업 결과
1. **Raw 노트**: 이번 턴 신규 raw 없음 ✓
2. **inbox 처리**: 스캔대상 0건 (.hwp 2·.pptx 1·실수모음 — 미지원 포맷) ✓
3. **Deep Extract → bundle 컴파일**: 핵심 작업 (아래 상세)
4. **gaps.md**: 본문 0건(Archive만) ✓

## Task 3 — bundle backlog 컴파일 (09-15·09-16 deep-extract)
- **PMID별 검증 우선** (CLAUDE.md "log↔bundle 키 비교") → backlog 가정 교정:
  - **CKD(PMID:41461086)·chronic-pain nonopioid(40834375)**: 이미 bundle 반영됨 → **skip**(중복·"동일 키 재할당" 방지). 검증 안 했으면 중복 삽입할 뻔.
- **신규 1**: `amenorrhea` — Klein AFP 2026 PMID:42607239. kind:disease, uiHooks:{guide:["*"]}, 6키 등록, 신규 키 hard-check 0 통과. Triage calcCategories 자동 등록(규칙).
- **보강 6**(기존 엔트리 in-place, 신규 섹션+primarySources 추가, 키 재할당 없음):
  - chronic-pain-integrative ← 장기 오피오이드 AFP 2025 PMID:40531149 (nonopioid는 기존)
  - clinical-communication ← 소아 백신 망설임 NEJM 2026 PMID:42160716
  - osteoarthritis ← 유산소>저항 AFP POEM PMID:42301876 (+러닝/연골 근거외 참고)
  - pocus-primary-care-efsumb ← FM POCUS 10년 alumni + 피부 POCUS PMID:42308619
  - deprescribing ← 노인 오피오이드 안전처방 Drugs Aging PMID:42627454
  - myopia-outdoor-taiwan ← Dai 메타분석 PMID:41928550 (2h 임계치 OR 0.74 독립 검증)
- study-note-only(4Ms·croup·fall-prevention)는 knowledge md 미변경 → bundle 대상 아님 ✓

## ⭐ web search 활용 (미르 허용)
- **WebSearch는 이 환경에서 작동**(직접 curl/WebFetch egress는 여전히 403 차단 — 경로 다름).
- myopia의 유일한 `[원 논문 미확인]` 해소: Wu PC 분절회귀 원 논문 = **Wu PC et al. Ophthalmology 2020;127(11):1462-1469. PMID:32197911** 확정 → bundle+md primarySources 정식 인용 교체.

## 검증
- `node -c` bundle·prompts 통과. 7개 대상 PMID 전부 반영. amenorrhea 6키 중복 0. myopia 엔트리 미확인 마커 0.
- `?v` 0910-myopia/0724-crp-aaa → **0928-liby** (bundle+prompts 동시 bump, coding-behavior 규칙 3).

## 결과
- 판정: 통과
- 다음 작업: 없음. 다음 deep-extract 발생 시 동일 절차(PMID별 검증 후 컴파일).

## 회고
- **PMID별 검증이 backlog 가정을 교정** — "2dcafc2 이후 변경 전부 컴파일" 방식이었으면 CKD·nonopioid 중복 삽입 위험. CLAUDE.md의 "log↔bundle 비교" 단계가 실효.
- WebSearch 작동 확인 = 향후 Researcher 검증(CLINICAL PMID 확보)이 이 환경에서 가능. `[원 논문 미확인]` 마커들 점진 해소 경로 확보.
- 다음 세션 반영: bundle·prompts·Triage 변경 → 앱 runtime 영향 → main 반영 필수.

---

## 추가 — 09-28 deep-extract 배치 (세션 중 main에 새로 착지)
09-15/16 컴파일 push 직후, rebase 중 origin main에 **09-28 deep-extract(9건)** 가 이미 올라와 있음을 발견. "전부 다" 지시에 따라 이어서 컴파일.

- **PMID별 검증**: dvt-d-dimer의 PMID:41490105(age-adjusted D-dimer)는 clinical-reasoning에 이미 있었으나, 신규 md는 **DVT 특화 standalone**(Wells·2점 프로토콜·indication)이라 별개 키로 신규 생성 판단(중복 아님).
- **신규 3**: dvt-d-dimer · primary-aldosteronism · knee-pain-evaluation (각 kind:disease, uiHooks:{guide:["*"]}, 신규 키 hard-check 0, Triage 등록). relations 필드로 clinical-reasoning/hypertension/osteoarthritis 관계 표기(R2 예약·inert).
- **보강 6**: MASH·pocus-focus-cardiac·dyslipidemia·diabetes-prevention·chronic-pain-integrative·myopia (섹션+source 추가, 키 재할당 없음).
- 검증: node -c OK, 9 PMID 전부 반영, 3키 중복 0. ?v 0928-liby→0928-liby2.
- 회고: **PMID별 검증이 dvt-d-dimer 중복 오판을 방지**(clinical-reasoning과 주제 분리 확인 후 별개 생성). 세션 중 새 deep-extract가 착지하는 경우가 있으니, 컴파일 후에도 origin 재확인 필요.
