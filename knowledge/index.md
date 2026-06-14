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
- hematuria.md — 혈뇨 외래 본체: AUA 2020 미세현미경 ≥3 RBC/HPF 1회 진단, risk-stratified (Low/Int/High) cystoscopy+CTU/sono, 사구체 vs 비사구체 분기 [CLINICAL]
- proteinuria.md — 단백뇨 외래 본체: KDIGO 2024 A1/A2/A3 + 신증후군 ACR≥2200, A3 신장내과 의뢰, 일과성 배제 새벽뇨 재검, heatmap 연 1~4회 [CLINICAL]
- fatigue.md — 일반 피로 외래 본체: AAFP 2023 검사로 진단 5%, Red flag·1차 표적 검사, NICE NG206 ME/CFS GET 금기·CBT 보조, NICE 3mo / IOM 6mo 기준 병기 [CLINICAL] (cancer-fatigue와 별도)
- menopause.md — 폐경기 외래 본체: NAMS 2022 HT 60세-10년 timing/자궁 유무 ET·EPT, NAMS 2023 nonhormone fezolinetant Level I·paroxetine 7.5mg FDA 유일, clonidine·pregabalin 권고 안 함 [CLINICAL]
- preconception-screening.md — 임신 전 항체검사: KSOG/CDC 기본 Rubella·HBsAg·VZV, USPSTF 매독·HIV·HBV·HCV, MMR/varicella 1~2mo 전, HBsAg(+) 12h HepB+HBIG [CLINICAL]
- parotitis-differential.md — 귀밑 부종/염증 감별: 5감별(화농성·mumps·림프절·턱밑·치성), 1차 amoxi/clav, "cefazolin+metro" 표준 X 정정, 초음파 routine X [CLINICAL]
- paresthesia.md — 일반 손발저림: AAFP 2020 대칭 vs 비대칭 분류(갑상선저하증 대칭 분류), SPEP/IFE 1차 패널, AAN 2022 painful DPN 4계열 동등, ASCO 2020 CIPN duloxetine 유일 적정 근거, INH B6 결핍 [CLINICAL]
- thyroid-fna-cnb.md — **K-TIRADS 분류 5단계 보강** (K2 <2%, K3 2~10%·>1.5cm, K4 10~40%·≥1cm, K5 >60%·≥1cm) — 기존 항혈전제·CNB 합병증 + 분류표 [CLINICAL/TIPS]
- anxiety-depression-cbt.md — **정신과 약물 plan 보강**: 1차 SSRI·동반증상별 선택·follow-up·불안 NICE CG113·불면 AASM 2017 (trazodone/멜라토닌 1차 X, 고령 BZD/Z-drug Beers 회피) — 기존 CBT 효과크기 + 약물 처방 [CLINICAL]
- alcohol-use-disorder.md — **AUDIT/FRAMES/음주량 정의 보강**: AUDIT-K 두 버전(원판/KR), AUDIT-C 컷오프, 음주량 정의(폭음 여 4잔 정정), FRAMES 6요소, USPSTF 2018 — 기존 naltrexone·acamprosate + brief intervention [CLINICAL]
- heart-failure.md — **ACC/AHA Stage A/B/C/D 분류 보강** (Stage B에 BNP/NT-proBNP 포함), BNP cutoff 외래 vs 응급실 분리, 유발 약물 — 기존 GDMT 4 pillars + Stage 매핑 [CLINICAL]
- clinical-reasoning.md — 진단추론 4대 함정 (lab-driven·anchoring·premature closure·pretest probability 무시) + Stern Symptom to Diagnosis 흐름 + anchoring 검증 routine [INSIGHTS/TIPS] PMID:12915363 Croskerry Acad Med 2003 — topic
- elderly-nonspecific-symptoms.md — 65세+ \"기운없음\" 8축 감별 + post-hospital syndrome (Krumholz NEJM 2013) + BANC + Red flag 자동배제 리스트 (TB·악성·endocarditis·PE·약물부작용) [CLINICAL/INSIGHTS] parents=fatigue PMID:23301730/20370761
- diaphoresis.md — 발한·야간발한 9축 감별 (감염·악성·갑상선·당뇨·심혈관·자율신경·약물·호르몬·심리/수면) + AAFP minimum workup + B symptoms red flags [CLINICAL] PMID:12643362 Mold AFP 2003 + Bryce AFP 2020
- acute-pyelonephritis.md — APN 전형 vs 비전형 (고령 CVAT sensitivity ~50-60%·fever 부재 최대 20%) + 재발성 APN workup + 외래 항생제 (cipro·levo·TMP-SMX·ceftriaxone) [CLINICAL] PMID:21888302 Colgan AFP 2011 + IDSA 2010
- lymphadenopathy.md — 림프절병증 평가 7요소 + high-risk (supraclavicular·B sx·matted·firm·fixed) + **LAP+발열 진단 전 steroid 금지** (림프종 mask·TLS·감염 progression) + minimum workup [CLINICAL] PMID:27929264 Gaddey AFP 2016 — bundle key는 peripheral-lymphadenopathy
- ldh-interpretation.md — LDH 단계별 (>2000 응급 HLH/TLS·1000-2000 림프종/용혈/sepsis·500-1000 경증 용혈/간염/폐렴) + HLH cluster + 용혈 평가 + in vitro hemolysis 함정 [CLINICAL] — topic
- acute-bronchitis.md — 급성 기관지염 90% viral + **가래 색 myth** (호중구 MPO, Cochrane: 가래색·인후통 단독 ABx 효과 예측 X) + **외래 호흡기 vital 필수** (SpO2·RR·CRB-65) + post-infectious cough [CLINICAL] PMID:29488727 Smith Cochrane 2017 + AAFP 2025
- chronic-diarrhea-workup.md — 만성 설사 ≥4주 + Red flags (빈혈·체중감소·혈변·야간설사·50세+ 신규·CRP↑) + IBS 가정 금지 + 5축 organic 감별 (celiac·IBD·colon ca·microscopic colitis·bile acid) + Anti-tTG·fecal calprotectin [CLINICAL] PMID:32293842 Burgers AFP 2020 + AGA 2019
- ibd.md — 염증성 장 질환(크론병·UC): 한국 역학 92,665명(30%↑) + 초가공곡물 IBD 위험 (≥19g/day 86%↑·식빵 1장/day 2.1배, PURE Study 21개국) + 보호식품 + 의뢰 기준 [INSIGHTS — by 코메디닷컴/Narula 2025] PMID:40758217
- hematologic-malignancy-uri-screening.md — 관해 중 혈액암 환자 URI: ANC·LDH·LN·B sx gatekeeper + febrile neutropenia 응급 + Rituximab HBV/PJP/백신 cross-link [CLINICAL] PMID:30575480 Shapiro NEJM 2018 + AAFP PMID:25591238
- anthracycline-cardiotoxicity.md — Doxorubicin 노출+DOE 지속 = cardiomyopathy 의심: BNP/NT-proBNP+troponin→TTE→cardio-oncology, CTRCD 기준 (LVEF<50% or GLS>15% 상대 감소) [CLINICAL] PMID:36017568 ESC 2022 cardio-oncology
- ana-interpretation.md — ANA Titer 1:40-1:640 해석·Pattern과 연관 항체·FP(약물/감염/악성/정상변이)·FN(early SLE/cutaneous lupus/면역억제) [CLINICAL] PMID:31385462 ACR/EULAR 2019 + PMID:30862649 ICAP + PMID:15767027 Rubin 2005 — topic
- afp-elevation-workup.md — AFP HCC cutoff (>20/>200) + 5축 differential (임신/간질환/GCT/흡연/유전적 baseline) + anchoring 함정 cross-link [CLINICAL] PMID:25921665 Wong Clin Liver Dis 2015
- pancreatic-cystic-lesion.md — Kyoto IPMN 2024 worrisome features (≥30mm·MPD 5-9mm·CA19-9·new-onset DM·가족력) + HRS (MPD≥10·mural nodule≥5mm·황달) + 50세+ NOD 췌장암 6-8배 [CLINICAL] PMID:38182527 Ohtsuka Pancreatology 2024
- hepatic-cyst.md — Simple vs complex (septation/mural nodule/thick wall/enhancement→GI 의뢰) + PCLD ADPKD link + 크기별 임상 컨벤션 (4cm/4-10cm/10cm+ 또는 증상) [CLINICAL] PMID:35728731 EASL 2022
- lymphocytosis-workup.md — ALC 계산 (WBC×Lymph%) + 연령별 first concern (<30 감염/30-50 자가면역+감염/≥65 악성) + iwCLL 2018 (clonal B≥5,000×3mo) + MBL (pre-CLL 1-2%/y) [CLINICAL] PMID:29540348 Hallek iwCLL 2018
- neutropenia-workup.md — ANC 분류 (mild 1k-1.5k/moderate/severe <500) + 약물·만성감염·자가면역·MDS·BEN(Duffy)·B12/Folate 감별 + febrile neutropenia 응급 임계 [CLINICAL] AAFP 2025 + PMID:30828799 Atallah-Yunes BEN 2019
- statin-myopathy-management.md — Statin + CK 평가 quick reference: 5×ULN history → 보류 적응(ACC/AHA 2018)·10× 중단·rhabdo (≥10×+myoglobinuria/AKI) + rechallenge rosuvastatin/pravastatin/fluvastatin 우선·격일 옵션 [CLINICAL] PMID:30586774 ACC/AHA 2018 + NLA SAMS 2022
- qtc-interpretation.md — QTc 정상/경계/연장(>500ms TdP·>60ms baseline 증가)·short QT + QT 연장 약물 list (QTP·맥페란·퀴놀론·매크로라이드·azole·TCA·항부정맥)·위험요인 [CLINICAL] PMID:20142454 AHA/ACCF Drew 2010 — topic
- cardiorenal-anemia-syndrome.md — HF·CKD·빈혈 악순환 삼각·EPO 부족·hepcidin·정맥울혈 신정맥압·평가 패널·3축 동시 개입 [CLINICAL] PMID:15202610 Silverberg 2004 + PMID:16868702
- cardiorenal-aki-diuretic-management.md — 울혈성 prerenal AKI 이뇨제 결정 (혈압 아니라 용적 상태)·post-renal 폐색 배제 우선·48-72h Cr/K 재검·매일 체중 0.5-1kg/d·Spiro vs Furosemide 역할 [CLINICAL] PMID:34447992 ESC 2021 + PMID:35379503 AHA/ACC/HFSA 2022
- platelet-function-test.md — PFA-100/200 EPI/ADP 해석·aspirin 효과·vWD 단서·**clopidogrel 민감도 낮음** 정정·Hct/platelet 위양성·LTA/vWF 정밀 평가 [CLINICAL] PMID:16377544 Hayward 2006 + PMID:26179127 Favaloro 2015
- subacute-thyroiditis.md — De Quervain: URI 선행 50-70%·갑상선 통증·phase 변화·ESR>50·sono hypoechoic·NSAID 1차/prednisolone 40mg moderate-severe·β-blocker·자연회복 1년·5-15% 영구 hypothyroid [CLINICAL] PMID:27521067 ATA 2016
- cervical-referred-pain.md — "등 통증"이 경추 referred·Dwyer facet pain map (C2-T1)·myofascial trigger point·radiculopathy C7-T1 견갑골 안쪽/등 중심부 referred·Spurling test routine [CLINICAL] PMID:2402682 Dwyer Spine 1990 + PMID:27250899 + PMID:27175952 AAFP
- gsm-genitourinary-menopause.md — GSM 질·요도(recurrent UTI ≥3/y)·외음 sx + Step 1 non-hormonal (lubricant·moisturizer) + Step 2 topical estrogen loading 2주 daily → maintenance 주 2회·DHEA/ospemifene·postmenopausal bleeding 즉시 평가 [CLINICAL] PMID:32852449 NAMS 2020 — topic
- uti-complicated-classification.md — Uncomplicated (건강 비임신 폐경 전 여성) vs Complicated (남성·임신·65+·면역억제·DM·해부학 이상·BPH·catheter·다제내성)·**폐경 후 자동 complicated 아님 정정**·2025 IDSA localized/systemic 재정비 [CLINICAL] PMID:21292654 IDSA 2011 + PMID:31042112 AUA recurrent 2019 — topic
- adult-vaccination-korea-faq.md (guidelines/) — 성인 예방접종 5대 환자 우려 응답·면역노화·훈련면역·65+ 5종 systematic (HD-flu/PCV/RSV/RZV/COVID)·KDCA NIP 활용 [INSIGHTS] PMID:42101598 Coles AFP 2026 + PMID:41665459 Hum Vaccin Immunother 2026 — topic

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
- bmd-coverage.md — BMD 골밀도검사 급여기준: 심평원 7대상·고위험 3요소·추적 일반/스테로이드/임신골절·4주 예외 [REGULATORY] — topic
- breast-us-coverage.md — 유방·액와부 초음파 급여: 심평원 나942가·나940, 진단/경과관찰/수술 후 비교 1회·초과 80%, 단순초음파 초회부터 80%, 산정특례 우선 [REGULATORY] — topic
- brain-metabolism-enhancers.md — 뇌대사 개선제 급여: 7약제 1종만, **콜린알포 2025.9.21 치매 외 80% 선별급여 전환**, 사미온 5/10mg 적응증, 소마지나 24h 6주, 케타스 어지러움, 니세틸 시장 퇴출 [REGULATORY] — topic
- travel-vaccination.md — 해외여행 예방접종: CDC Yellow Book 2024 지역별 매트릭스, 황열 ICVP 2016 평생 유효, 일본뇌염 ≥1mo+위험요인, 말라리아 화학예방, 사우디 ACWY 의무 [CLINICAL] — topic
- chest-xray-template.md — 기숙사 입소·검진 SOAP template (Z115), 변형 4종 (취업·학교·흉부 검진) [TIPS — by 미르] — topic
- immunocompromised-vaccination.md — 면역저하자 백신 일차의료 프로토콜: RZV(생백신 금기·항암 후 3mo)·HD-influenza·PCV20/PCV15→≥8주 PPSV23·RSV 60세+·COVID·Tdap·Rituximab HBV screening 필수 [CLINICAL] PMID:24421306 IDSA 2013 — topic
