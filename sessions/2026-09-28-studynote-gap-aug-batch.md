# sessions/2026-09-28-studynote-gap-aug-batch.md

## 세션 정보
- 날짜: 2026-09-28
- 작업: study-note gap 컴파일 — 08월 batch (미르 "study note 전부 ingest" → 최근·고가치 우선 선택)
- 건드린 파일: `src/knowledge-bundle.js` · `src/prompts.js` · `src/index.html` · `knowledge/log.md`

---
## 배경 — study-note 대조가 드러낸 진짜 backlog
- 미르 "스카우트→deep-extract→study-note, 그것들 전부 ingest".
- 규칙 확인: study-notes는 `file-ownership.md`상 **A층 순수학습용·ingest 금지**(원본 상세 보존 전용). deep-extract가 만든 **knowledge md → bundle**이 정식 ingest 경로.
- 232개 study-note PMID를 bundle과 대조 → **194 covered · 38 gap**. gap 재분류:
  - **36건 = bundle 미컴파일 backlog**(knowledge md엔 있으나 bundle 없음 — 05-06~08-30 deep-extract의 "⚠ bundle 반영 별도 호출"이 여러 달 미실행). 세션시작 체크(2dcafc2 이후)가 못 봄.
  - **2건 = 진짜 study-note-only**(knowledge md 없음): episodic-vestibular-menopause, tramadol-depression-risk.
- 미르 결정(AskUserQuestion): **최근·고가치 우선** → 08월분 먼저, 05~07월 후속.

## 08월 batch — 신규 4 + 보강 11 (PMID별 검증 후)
- **신규 4**(bundle 엔트리 없던 것, Triage 등록): cannabinoid-chronic-pain(41429020) · ckm-syndrome(42415318, parents diabetes·CKD·dyslipidemia) · dbt-brief-counseling(40736500, parent anxiety-depression-cbt) · **obesity 일반**(42636450+33759389, GLP-1 flow[TIPS 로컬원장님] — 일반 비만 엔트리가 아예 없던 것 최초 신설).
- **보강 11**(기존 엔트리 in-place 섹션 추가): cancer-pain-supportive-care(40639401)·transitional-care-elderly(42601806)·deprescribing×3(40856967·42536335·42570168)·clinical-experience-quality(40736666)·diabetes(42301874)·clinical-reasoning×2(40152954·42455821)·palliative-pain(42362165)·pocus-primary-care-efsumb(42546326).
- 신규 키 hard-check 0, 15 PMID 전부 반영, node -c OK. ?v liby2→liby3(bundle+prompts).

## 결과
- 판정: 통과. main 반영.
- **다음 작업(후속 세션)**: 05~07월 미컴파일 backlog ~21건(dyslipidemia Ez-PAVE·anemia 3건·frailty 3건·hypertension·resistant-hypertension·CKD 항바이러스·recurrent-uti·sinusitis·incidental-physical-activity·statin·glp1-hypersomnolence·depression-screening SDOH·continuity-of-care·heart-failure-pocus VEXUS·prescribing-cascade 등) + 진짜 study-note-only 2건.

## 회고
- study-note "전부 ingest" 요청이 실은 **오래된 bundle 미컴파일 backlog**를 드러냄 — study-note가 아니라 knowledge md가 앱에 안 닿아 있던 것. 미르 직감 정확.
- **근본 원인**: deep-extract가 md만 갱신하고 bundle 컴파일은 수동(별도 Liby 호출) — 수개월 누락. 향후 routine 자동화 검토 가치(미채택 옵션 C).
- 날짜별 batch 원칙 준수(08월만; 05~07월 분리). 다음 세션 반영: bundle·Triage 변경 → main 필수.
