# 2026-04-23 Deep Extract — 10-paper batch

## 세션 정보
- 담당: paper-extract 서브에이전트
- 범위: inbox/scout/[o] 체크 논문 10건 Deep Extract → knowledge/ md 생성·보강
- 경계: paper-extract 단계 한정. bundle compile·prompts.js 미포함 (다음 Liby ingest 대상)

---

## 처리 결과 (논문별)

### 1. PMID 41985134 — 성호르몬 요법 VTE·심혈관 위험 (NEJM 2026)
- **처리:** 신규
- **경로:** `knowledge/by-disease/sex-hormone-vte-risk.md`
- **핵심:** 성호르몬 7개 치료 맥락(HRT·COC·GAHT·과다월경·배란 억제·종양 호르몬·ART) 별 VTE 위험 분화 / 4축 평가(제형·혈전성향증·VTE과거력·임상인자) / 경피 에스트라디올 우선 원칙 / 수술 전후 관리 필요
- **출처 태그:** [CLINICAL] — Skeith L, Bates SM. NEJM 2026;394(15):1514-1528. PMID:41985134, DOI:10.1056/NEJMra2202438
- **비고:** NEJM 초록은 요약형 — 상세 제형별 수치·프로토콜은 본문 추가 확인 필요

### 2. PMID 41962807 — Tirzepatide 중단 후 체중 반동·전환 (JAPhA 2026)
- **처리:** 보강
- **경로:** `knowledge/by-drug/glp1-selection-strategy.md` (새 섹션)
- **핵심:** 중단 후 12개월 +1.9% 비유의 / 81.9%가 대체 OM으로 전환 / 중단 이유 80.7%가 약값 / 전환 전략이 반동 억제에 기여
- **출처 태그:** [CLINICAL — 조건부] — Huang L et al. J Am Pharm Assoc 2026;8:103112. PMID:41962807
- **비고:** 관찰 후향 단일기관 n=83 — 조건부 태그

### 3. PMID 41856526 — 중등도 CKD GFR 이중 방정식 (BMJ 2026)
- **처리:** 신규
- **경로:** `knowledge/by-disease/ckd-monitoring.md`
- **핵심:** eGFR 30-59 3년 추적 / 크레아티닌+시스타틴C 통합 방정식 78.6~80.2% vs 크레아티닌 단독 73.1% / 모두 P<0.001 / 시스타틴C 추가 권장
- **출처 태그:** [CLINICAL] — Lamb EJ et al. BMJ 2026;392:e085005. PMID:41856526

### 4. PMID 41931049 — GLP-1 RA 종합 리뷰 (NEJM 2026)
- **처리:** 보강
- **경로:** `knowledge/by-drug/glp1-selection-strategy.md` (새 섹션)
- **핵심:** 기전(incretin·위배출 지연·글루카곤 억제·시상하부·장내미생물) / CV·신 보호 확립 / GI 부작용·근·골 손실 / 장기 순응도·중단 후 회복 미해결
- **출처 태그:** [CLINICAL] — Rosen CJ, Ingelfinger JR. NEJM 2026;394(13):1313-1324. PMID:41931049
- **비고:** `obesity.md` 중간 점검 문진(단백질 1.2g/kg + 근력운동)과 정합

### 5. PMID 40736492 — AFP 2024 TOP 20 POEMs (AFP 2025)
- **처리:** 신규 (overview 파일)
- **경로:** `knowledge/guidelines/afp-top20-poems-2024.md`
- **핵심:** GLP-1·phentermine-topiramate 체중 최강 / semaglutide CV 2차예방 (비당뇨 비만) / SGLT-2i·GLP-1 T2DM 우월 / amitriptyline IBS 2차 / benzyl benzoate 25% scabies / lactobacillus rUTI / 단순 담석 보존
- **출처 태그:** [CLINICAL] — Grad R, Ebell MH. AFP 2025;112(1):34-41. PMID:40736492
- **비고:** POEM 각 항목의 원논문은 별도 Deep Extract 대상 — 본 파일은 외래 변경 포인트 요약

### 6. PMID 41544290 — 청소년 비만 GLP-1 (AFP 2026)
- **처리:** 보강
- **경로:** `knowledge/by-disease/obesity.md` (새 섹션)
- **핵심:** ≥12세 liraglutide·semaglutide FDA 승인 맥락 / 성인 기준 그대로 확장 금지 / 성장·섭식장애·정신건강 동반 평가 / 근·골 손실 성인보다 주의
- **출처 태그:** [CLINICAL — 조건부, 초록 기반] — Schoenherr DT et al. AFP 2026;113(1):91-94. PMID:41544290
- **⚠ 접근 제한:** AFP 원문 abstract 비공개 — 본 섹션은 scout 한 줄 요약 + 통용 임상 지식 결합. 구체 용량·BMI cutoff는 전문 확인 필요

### 7. PMID 40950820 — 어지럼증 척추동맥 도플러 (Noro Psikiyatr Ars 2025)
- **처리:** 보강
- **경로:** `knowledge/by-disease/dizziness.md` (의뢰 기준 섹션 추가)
- **핵심:** 1,021명 중 ~90% 유의 병변 없음 / 5.1% hemodynamically significant (≥60세 + CV risk 집중) / <60세 + CV risk 없으면 도플러 생략 / red flag는 도플러 아닌 즉시 뇌영상
- **출처 태그:** [CLINICAL — 조건부] — Kurşun O, Karataş H. Noro Psikiyatr Ars 2025;62(3):256-258. PMID:40950820
- **비고:** 후향 단일기관 — 조건부 태그

### 8. PMID 42000148 — 처방 기반 독감백신 모델 (Vaccine 2026)
- **처리:** 보강
- **경로:** `knowledge/guidelines/adult-vaccination-summary.md` (새 섹션)
- **핵심:** 3-arm 군집 RCT ≥60세 n=839 / 대조 9.55% / 처방 루틴 삽입 30.86% / 소액 수수료 면제 추가 시 83.23% / 교육·소득·인지 낮은 서브그룹에서도 효과
- **출처 태그:** [CLINICAL] — Zhang L et al. Vaccine 2026;82:128588. PMID:42000148
- **비고:** 한국 NIP 맥락에서도 "한 마디" 중재 가치 재확인

### 9. PMID 41839085 — 전자담배 vs NRT 껌 (AFP 2026)
- **처리:** 신규
- **경로:** `knowledge/by-disease/smoking-cessation.md`
- **핵심:** 전자담배가 NRT 껌보다 금연 성공률 높음 (RCT 요약 수준) / 1차 선택 전환 금지 / 장기 안전성 unknowns
- **출처 태그:** [CLINICAL — 조건부, 초록 기반] — Shaughnessy AF. AFP 2026;113(3). PMID:41839085
- **⚠ 접근 제한:** AFP POEM abstract 비공개 — 구체 RCT 수치·질·추적 기간 전문 확인 필요

### 10. PMID 39535805 — GLP-1 RA와 AUD (JAMA Psychiatry 2025)
- **처리:** 보강
- **경로:** `knowledge/by-drug/glp1-selection-strategy.md` (새 섹션)
- **핵심:** 스웨덴 within-individual Cox n=227,866 / semaglutide aHR 0.64 (36%↓) / liraglutide aHR 0.72 (28%↓) / 기존 AUD 약 aHR 0.98 (무효) / 추가 somatic 입원 감소 / 자살시도 무효
- **출처 태그:** [CLINICAL — 조건부] — Lähteenvuo M et al. JAMA Psychiatry 2025;82(1):94-98. PMID:39535805
- **비고:** 관찰연구 — RCT 필요 (저자 직접 언급)

---

## 건드린 파일 목록

### 신규 (4)
- `knowledge/by-disease/sex-hormone-vte-risk.md`
- `knowledge/by-disease/ckd-monitoring.md`
- `knowledge/by-disease/smoking-cessation.md`
- `knowledge/guidelines/afp-top20-poems-2024.md`

### 보강 (3 — 6 섹션 추가)
- `knowledge/by-drug/glp1-selection-strategy.md` (3 섹션 추가: Tirzepatide 중단 전략 / NEJM 2026 리뷰 / AUD)
- `knowledge/by-disease/obesity.md` (청소년 GLP-1 섹션)
- `knowledge/by-disease/dizziness.md` (척추동맥 도플러 의뢰 기준)
- `knowledge/guidelines/adult-vaccination-summary.md` (처방 기반 독감백신)

### 메타
- `knowledge/log.md` — 10 줄 추가 (2026-04-23 헤더)
- `inbox/scout/2026-04-18.md` · `2026-04-19.md` · `2026-04-20.md` · `2026-04-21.md` — [o] → [✓]

---

## 접근 실패·불완전

| PMID | 문제 | 대응 |
|---|---|---|
| 41544290 | AFP 2026 Jan 청소년 GLP-1 — abstract 비공개 | [초록 기반 — 전문 미확인] 태그 / overview만 작성 / 전문 확인 필요 |
| 41839085 | AFP 2026 Mar 금연 POEM — abstract 비공개 | [초록 기반 — 전문 미확인] 태그 / 결론만 반영 / 구체 RCT 수치 미확인 |

나머지 8건은 PubMed abstract 전문 확보 완료.

---

## 다음 단계 — Liby ingest 대상

이 세션 산출 md 파일들은 다음 ingest agent가 bundle v2에 반영할 대상이다.

**신규 ingest 대상 (신규 파일 4):**
1. `by-disease/sex-hormone-vte-risk.md` — kind=disease, sections=[indication, notes, precaution, referral, comparison]
2. `by-disease/ckd-monitoring.md` — kind=disease, sections=[definition, monitoring, referral, notes]
3. `by-disease/smoking-cessation.md` — kind=disease, sections=[definition, comparison, protocol, notes]
4. `guidelines/afp-top20-poems-2024.md` — kind=topic

**섹션 추가 reingest 대상 (기존 4):**
5. `by-drug/glp1-selection-strategy.md` — 3 섹션 추가 (tirzepatide-discontinuation 자유 / glp1-review-nejm2026 자유 / aud-hospitalization 자유)
6. `by-disease/obesity.md` — "청소년 비만 — GLP-1 RA" (자유 섹션 `adolescent-glp1`)
7. `by-disease/dizziness.md` — referral 섹션 (VA doppler 추가)
8. `guidelines/adult-vaccination-summary.md` — "처방 기반 독감백신" (자유 섹션 `prescription-based-flu`)

---

## 판정

- 10건 모두 해당 scout entry [o] → [✓] 처리 완료
- 2건(41544290·41839085)은 abstract 비공개로 [초록 기반] 태그 부여 — 전문 확보 시 보강 필요 (Researcher 큐)
- vocabulary 표준 한글 헤더 준수 (`## 적응증` `## 모니터링` `## 의뢰 기준` `## 처방/치료` `## 비교` `## 비고` `## 주의` `## 감별진단` 등)
- 영문 `treatment`·`dosage` 헤더 금지 준수
- 기존 파일 중복 체크 후 신규/보강 분리 결정

---

## 회고

- **재사용 우선이 잘 작동:** GLP-1 관련 3건(41962807·41931049·39535805)을 신규 파일로 분산하지 않고 기존 `glp1-selection-strategy.md`에 섹션 추가 → 중복 파일 파편화 방지.
- **abstract 비공개 2건 대응:** AFP 최신호 POEM은 PubMed abstract 비공개가 흔함 — [초록 기반] 태그 + Researcher 큐 등록 패턴 확립.
- **3-tier 출처 원칙 준수:** 신규 파일은 상단 Tier 1 primary source, 섹션별 Tier 2 출처 (PMID 다른 경우만), 표·수치 inline Tier 3.
- 다음 세션: Liby ingest agent가 8개 md(신규 4 + 보강 4) → knowledge-bundle.js v2 entry 생성·병합.
