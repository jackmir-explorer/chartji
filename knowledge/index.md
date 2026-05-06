# knowledge/index.md — 임상 지식 베이스

미르의 임상 경험, 최신 가이드라인, 처방 노하우를 축적한다.
Liby(Librarian 에이전트)가 이 폴더를 관리한다.

---

## 폴더 구조
```
knowledge/
  by-disease/    질환/증상 단위 메인 저장소 (4개 섹션 + keywords)
  by-drug/       약물 단위 (처방 노하우·부작용 패턴)
  guidelines/    공식 가이드라인 [CLINICAL] · 심평원 기준 [REGULATORY]
                 · 최신지견 [INSIGHTS] · 실전 Tip [TIPS]
  log.md         추가 기록 (날짜순)
  index.md       전체 목록 (이 파일)
```

---

## 추가 방법

내용을 던지고 Librarian을 호출하면 정리한다.
명령: "Liby, 이 내용 ingest해줘"

---

## Inject 동작

진료 중 Triage 패널이 질환을 감지하면 자동으로 관련 knowledge가
Working Draft에 주입된다.
- 문진/검사 · 처방/치료 · 감별진단 → 프롬프트 컨텍스트 (API 일반 지식보다 우선)
- Draft 출력사항 [DRAFT_APPEND] → Working Draft 하단 자동 삽입

RedFlag 패널에는 절대 inject 하지 않는다.

---

## 파일 목록

### by-disease/
- vaccination.md — 예방접종 parent: 전 확인 문진·draft-template/append + 개별 백신 참조 링크 [CLINICAL]
- dizziness.md  — 어지럼증: 편두통 과거력/문진 [문진/검사]
- BPPV.md       — BPPV: 진단 프로토콜 + Barbeque Roll / Epley + 보나링 PRN [문진/검사·처방/치료]
- dry-mouth.md  — 구강건조증: pilocarpine + 뮤코미스트 가글 [처방/치료]
- burning-mouth.md — 구강작열감증후군(BMS): 뮤코미스트 가글 [처방/치료]
- oral-lesion.md  — 구강병변(백반증/궤양): 1달 기준, dexamethasone 가글, ENT refer [문진/처방]
- LPR.md          — 인후두역류(LPR): PPI + 뮤테란, 알긴산 대안 [처방/치료] · San Diego Consensus 2025 (LPS vs LPRD/식도증상별 알고리즘) topic 분리 [CLINICAL]
- depression-screening.md — 성인 우울증·자살위험 스크리닝(USPSTF 2026): PHQ-2→PHQ-9, C-SSRS [REGULATORY] — topic
- low-freq-hearing-loss.md — 저음성난청/귀먹먹함: 유턴정(베타히스틴), 다이크로짇(HCTZ) [TIPS]
- dizziness.md    — 어지럼증 기본 문진 11항목 + 편두통 추가 문진 [문진/검사]
- obesity.md    — 비만 체중감량 Draft Template + 위고비 처방 기준 + Mayo Clinic 표현형 + 단백질 ABC [CLINICAL/TIPS/REGULATORY]
- dysphonia.md  — 목소리 이상/쉰목소리: 수분 섭취·strap muscle 마사지 (MTD) [CLINICAL — 조건부]
- heart-failure.md — 심부전 parent: 분류(HFrEF/HFmrEF/HFpEF) + GDMT 4 pillars + 의뢰 6시점 + I NEED HELP + 감염 예방접종 6종 [CLINICAL] — dosing·protocol은 guide 제외 (전문의 titration 영역)
- resistant-hypertension.md — 저항성 고혈압: 3제 최적화 후 MRA(spironolactone) 추가, 진단 전 백의고혈압·비순응·이차성 배제 [CLINICAL] (AFP 2026 PMID:41544280, 초록 기반)
- ckd-monitoring.md — 중등도 CKD(G3) 모니터링: 크레아티닌+시스타틴C 이중 방정식 > 크레아티닌 단독 [CLINICAL] (BMJ 2026 PMID:41856526) — topic
- sex-hormone-vte-risk.md — 성호르몬 요법 VTE·심혈관 위험: HRT/COC/GAHT 제형·혈전성향증·과거력 4축 평가, 경피 우선 [CLINICAL] (NEJM 2026 PMID:41985134) — topic
- smoking-cessation.md — 금연: 전자담배 vs NRT 껌 AFP 2026 POEM, 장기 안전성 unknowns [CLINICAL — 조건부, 초록 기반] (PMID:41839085) — topic
- dyslipidemia.md — 이상지질혈증 외래 본체: KSoLA 2022 위험도 LDL 목표 + ACC/AHA 2018 statin 강도 (Pitava 1mg=중등도) + 심평원 보험기준 + CAC≥100 강력권고 [CLINICAL, REGULATORY]
- diabetes.md — T2DM 외래 본체: KDA 2023/ADA 2025 진단·HbA1c<6.5%, Metformin 단계+eGFR 45~30 감량(KDA-KSN), DPP-4 HF 주의, SGLT-2i 심·신 보호 eGFR≥20+ [CLINICAL]
- hypertension.md — 일반 고혈압 외래 본체: KSH 2022 target BP·표적장기손상·약물 선택, BB는 DM에서 주의(정정), MacMahon 메타 강압효과 [CLINICAL]
- osteoporosis.md — 골다공증 외래 본체: KSBMR 2024 T-score, BP 신기능 약제별 차이(Aln/Zol CrCl<35, Ris CrCl<30), 데노수맙 2024.5/12 고시 호전 시 추가 2년/4회, CTX/P1NP [CLINICAL, REGULATORY]
- anemia.md — 빈혈 외래 본체: AAFP 2018/2021 단계적 검사, IDA ferritin <15 매우특이/<45 권고 cutoff, 경구철 4~8주·교정 후 3개월~6개월, 메트포르민·PPI 12mo+ B12 결핍 [CLINICAL]
- headache.md — 두통 외래 본체: SNNOOP10 red flag, 편두통 트립탄 1차+ergotamine 회피(IHS 2024), 예방 propranolol·topiramate 1차/amitriptyline Level B, TTH 단독 진통제 [CLINICAL]
- thyroid-disorder.md — 갑상선 외래 본체: ATA 2016 항진증 MMI 12~18mo·무과립구증 모니터링, ATA 2014 저하증 LT4 1.6μg/kg·TSH>10·식전 30~60분, target 0.4~4.6 [CLINICAL]
- unintentional-weight-loss.md — 의도하지 않은 체중감소 외래 본체: AAFP 2021 5%/6~12mo, 외래 노인 암>비악성GI>우울(요양시설 한정 우울 1순위), 9 평가영역, tumor marker 1차 X, GDS·MMSE [CLINICAL]

### by-drug/
- vaccine-interval.md — 백신 접종 간격 원칙 (생+사/생+생/사+사) [CLINICAL] — topic
- tdap.md — Tdap/파상풍 + 임신부 27-36주 + 외상 상처 기준 (Tdap 우선 2024) [CLINICAL]
- herpes-zoster-vaccine.md — 대상포진 RZV ≥50세(ACIP)/≥60세(KDCA), ≥19세 면역저하, ZVL 2020 단종 [CLINICAL]
- pneumococcal-vaccine.md — 폐렴구균 PCV15/20/21 ≥50세 ACIP / KDCA PPSV23 ≥65세 NIP [CLINICAL — MMWR 2025 PMID:39773952]
- hpv-vaccine.md — HPV 9-14세 2-dose / ≥15세·면역저하 3-dose / 27-45세 SCDM [CLINICAL]
- rabies-vaccine.md — 광견병 PrEP 2회(0·7일, 2022 ACIP) + titer 기반 booster [CLINICAL]
- japanese-encephalitis-vaccine.md — 일본뇌염 사백신(IXIARO) vs 생백신(Imojev 미국 미승인) [CLINICAL]
- hepatitis-ab-vaccine.md — B형간염 19-59세 universal(ACIP) + Heplisav-B 2회 / A형간염 한국 40세 기준 [CLINICAL]
- varicella-mmr-polio-vaccine.md — 수두 / MMR KDCA 1968 기준 / 폴리오 모든 미접종 성인(2023 ACIP) [CLINICAL]
- wegovy.md — 위고비(Semaglutide) 비만 적응증·용량·금기·비급여 [REGULATORY/CLINICAL]
- mounjaro.md — 마운자로/Zepbound(Tirzepatide) T2DM·비만 적응증·용량·실비보험 [CLINICAL/TIPS]
- ozempic.md — 오젬픽(Semaglutide 1mg) 한국 급여 기준 3조건 [CLINICAL — 조건부]
- pilocarpine.md — 살라겐/필로겐 용량(TID/QID/BID)·급여기준 [REGULATORY]
- mucomyst.md — NAC 가글 처방법·BMS/구강건조증/LPR 근거 [TIPS/CLINICAL/INSIGHTS]
- glp1-selection-strategy.md — GLP-1 비만약 선택 전략: 위고비 vs 마운자로 10기준·Dose Escalation·반응예측·Interval Tx·SMI·전당뇨 + Tirzepatide 중단 전환 전략(PMID:41962807) + NEJM 2026 종합 리뷰(PMID:41931049) + AUD 입원↓(PMID:39535805) [TIPS/INSIGHTS/CLINICAL]
- sglt2-inhibitors.md — SGLT-2 억제제 계열: 적응증(당뇨/HFrEF·HFpEF/CKD) + **비뇨생식기 감염 위험** 처방 전 환자교육 [CLINICAL]
- vitamin-d.md — 비타민D: Endocrine Society 2025 가이드라인 (75세↑·임신부·흡수불량 권고, 일반 광범위 보충 미권고) [REGULATORY] — topic
- neffy.md — 비강내 에피네프린 Neffy: 아나필락시스 응급 (EpiPen 대체) — 비강 분무 2 mg/비공 + 응급실 이송 필수 [CLINICAL]

### guidelines/
- adult-vaccination-summary.md — 성인 예방접종 전체 요약 + 항암 독감백신 **타이밍 기반** (ANC 폐기, ASCO 2024) + 심부전 환자 고위험 예방접종 링크 + **처방 기반 독감백신 접종률 제고** (Vaccine 2026 PMID:42000148, 처방 루틴 삽입 시 접종률 3배) [CLINICAL] — topic
- heart-failure-referral.md — 심부전 상급병원 의뢰 기준: 의뢰 6시점 세밀화 + I NEED HELP 약어 + 전원 최적시기 4단계 곡선 [CLINICAL] — topic (parent: heart-failure)
- afp-top20-poems-2024.md — AFP 2024 TOP 20 POEMs overview: 비만·CV 2차예방·당뇨·IBS·옴·rUTI·담석 외래 적용 요약 [CLINICAL] (AFP 2025 PMID:40736492) — topic (TRIAGE 미등록)
- asthma-reflux-comorbidity.md — 천식+역류 동반이환: 조절불량 천식 + 위·식도/인후두 증상에서만 PPI·알긴산 empiric trial. 무증상 일률 처방 미권고. GINA 2025·AGA 2023(PMID:37061897)·San Diego 2025(PMID:40197644)·Chan WW 2011(PMID:21482834) 통합 [CLINICAL — 조건부] — topic [TIPS — by ENT교수]
