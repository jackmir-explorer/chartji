# 당뇨병 (Diabetes Mellitus, T2DM)

tags: [CLINICAL]
keywords: 당뇨, diabetes, T2DM, HbA1c, metformin, DPP-4, SGLT-2, GLP-1, 당화혈색소, 공복혈당, OGTT

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2025
applicability: 외래 성인 T2DM 진단·관리
relations: []

---

## 진단 기준

> 근거: KDA 2023 / ADA 2025 Standards of Care Section 2

다음 중 **1개 이상** (증상 없으면 다른 날 재검 필요):

1. **HbA1c ≥6.5%**
2. **공복혈장혈당 ≥126 mg/dL** (8시간 이상 금식)
3. **OGTT 2시간 ≥200 mg/dL** (75g 경구포도당부하)
4. 다뇨·다음·설명되지 않는 체중감소 + **무작위 혈장혈당 ≥200 mg/dL**

---

## 외래 문진·검사

**문진**: BMI, 운동, 식사, 합병증 증상
- **숨참·어지럼증** (CV 합병증)
- **소변 거품·빈뇨** (단백뇨)
- **시야 흐림** (당뇨망막병증)
- **체중감소·식욕** (조절 불량 신호)
- **손발저림** (말초신경병증 → [[diabetic-peripheral-neuropathy]])

**기본 랩**:
- HbA1c **3개월마다, 적어도 연 2회**
- 공복혈당, 지질(LDL/HDL/TG), eGFR, UA(미세알부민뇨/Cr ratio)
- LFT(지방간), TSH(갑상선)
- 안과 검진(연 1회), 발 검진

---

## 혈당 조절 목표

> 근거: KDA 2023

- **일반 성인 HbA1c <6.5%** (KDA 권고. ADA는 <7%)
- 고령·합병증·저혈당 위험군: 개별화 (7~8%까지 완화 가능)
- 임신 중: HbA1c <6%

---

## 약물 단계별 처방 프로토콜

### 1단계 — Metformin (1차)

> 근거: ADA 2025, KDA 2023, KDA-KSN CKD 합의문

- **시작**: XR 500mg bid (아침/저녁)
- **증량**: XR 750~1000mg bid
- **최대**: 2000~2500mg/day
- 위장관 부작용(설사·복부팽만) 시 천천히 증량·식사 직후 복용

**신기능 기준**:
| eGFR | 권고 |
|---|---|
| ≥45 | 정상 사용 |
| **45~30** | **신규 시작 금지, 기존 사용자 ≤1000mg/day로 감량** |
| **<30** | **금기** |

> ⚠ "<30 금기"만 기억하면 부족 — **45~30 구간 감량** 누락 빈번 (2026-05-06 검증).

### 2단계 — 병용 약물 선택

#### DPP-4 inhibitor (식후혈당, 메트포르민 시너지)
- 메트포르민 부작용·증량 어려움 또는 HbA1c 7.5~9% 추가 조절 필요 시
- 1일 1회, **저혈당 위험 낮음 / 체중 중립**
- 신기능에 따라 용량조절 (대부분 가능)
- ⚠ **Saxagliptin·Alogliptin은 심부전 입원 위험** (FDA 2016 경고) — HF 환자에서 주의/회피
- 급성췌장염 병력 주의

#### SGLT-2 inhibitor (비만·HF·CKD·단백뇨 동반)
- **심혈관 보호**: empagliflozin, canagliflozin
- **신장 보호**: dapagliflozin, canagliflozin
- 체중 감소·저혈당 위험 낮음

**eGFR 기준 (2024~ 갱신)**:
| 목적 | eGFR cutoff |
|---|---|
| **심·신장 보호 (시작)** | **≥20**까지 시작 가능 (투석 전까지 유지) |
| 혈당강하 (시작) | dapa <45 / empa·cana <30 (효과 감소) |

> ⚠ "eGFR<30 금기"는 **구버전** — 심·신장 보호 목적은 **eGFR≥20**부터 가능 (ADA 2024/2025, KDIGO 2024).

부작용: 요로/생식기 감염, DKA, 탈수/저혈압 → 반복 UTI 환자는 [[glp1-selection-strategy|GLP-1로 우선]].

#### GLP-1 RA / 이중작용제 (비만·CV 보호)
- [[wegovy]], [[mounjaro]], [[ozempic]] 별도 엔트리 참조
- 비만+T2DM 동반 시 우선 고려

---

## 모니터링

- **HbA1c**: 미달성·치료변경 시 3개월마다, 안정 시 연 2회
- 지질·신기능·UA: 연 1회 이상
- 안저·발 검진: 연 1회

---

## 의뢰 기준

- DKA/HHS 의심 → 응급실
- 단백뇨 진행, eGFR <30 → 신장내과 ([[CKD]])
- 망막증 발견 → 안과
- 1형 당뇨 의심, 임신 시, 다중약제 후 조절 불량 → 내분비
- 관련: [[diabetes-dyslipidemia]], [[CKD]], [[obesity]], [[glp1-selection-strategy]]

---

---

## 초기 T2DM에서 Tirzepatide — 정상혈당 60% 회복 (SURPASS-EARLY) [CLINICAL]

> [출처: Del Prato S et al. Tirzepatide Versus Intensified Conventional Care After 2 Years of Treatment in Early Type 2 Diabetes. Ann Intern Med. 2026 May 26. PMID:42184419, DOI:10.7326/ANNALS-25-05602]
> Phase 4 RCT (SURPASS-EARLY), n=794, 10개국 78개 기관, 오픈라벨. Eli Lilly 재원.
> ⚠ Eli Lilly 재원 RCT — 이해충돌 고려 필요.

**대상**: 진단 후 ≤4년, metformin 단독으로 조절 불충분한 초기 T2DM 성인

**결과 (tirzepatide 15mg vs 기존 강화치료 [ICC, GLP-1RA 포함 가능]):**

| 결과 지표 | 추정 치료 차이 (ETD) | 유의성 |
|---|---|---|
| HbA1c 변화 | **-0.68%p** (-0.84~-0.51) | p<0.001 |
| 체중 | **-8.0 kg** (-9.39~-6.50) | p<0.001 |
| 허리둘레 | **-6.2 cm** (-7.54~-4.93) | p<0.001 |
| **정상혈당 달성 (HbA1c<5.7%)** | **60.2% vs 24.0%** | 유의 |

**임상 적용:**
- **초기 T2DM + metformin 불충분** → tirzepatide 조기 도입의 Phase 4 근거
- "당뇨 관해" 목표 (HbA1c 달성 수준에서 정상혈당 회복으로) 전환을 환자 동기 부여에 활용
- GLP-1RA 불충분 시 tirzepatide 전환 우선 근거와 연결

관련: [[glp1-selection-strategy]] — tirzepatide vs semaglutide 선택 전략

---

## 외래 인슐린 관리 — 시작·증량·저혈당 최소화 (protocol) [CLINICAL]

> [출처: Marrison ST, Bragg S, Tran E. Type 2 Diabetes: Outpatient Insulin Management. Am Fam Physician. 2026 Jun;113(6):542-550. PMID:42301874]
> 리뷰. Medical University of South Carolina Department of Family Medicine.

**인슐린 1차 고려 적응증:**
- HbA1c >10%
- 혈당 ≥300 mg/dL (고혈당 증상 동반)
- 이화작용(catabolism) 징후 — 체중감소·근육소실

**외래 인슐린 처방 원칙:**

| 단계 | 권고 |
|---|---|
| **시작** | 기저인슐린(basal) 우선 — 취침 전 장기작용 analogue |
| **증량** | 2~3일 간격 titration 가능 (혈당 목표 도달 시까지) |
| **강화** | 기저인슐린 후 식사 혈당 미달성 → 식전(prandial) 또는 혼합(premixed) 추가 |

**장기작용 analogue 우선 이유:**
- 중간작용(NPH)보다 작용 지속시간 우수
- **저혈당 위험 감소** — 일차의료 외래에서 핵심 장점

**연속혈당측정(CGM) 적응증:**
- 인슐린 사용 환자에서 혈당 조절 개선 가능
- 저혈당 위험이 높은 환자 우선 고려

**저혈당 예방 전략:**
- 개별화 목표 설정 — 기대여명·나이·동반질환·저혈당 위험 고려
- 고령·다약제·신기능 저하 환자: HbA1c 목표 완화 (7.5~8%)
- 인슐린 시작 시 **교육 필수** — 저혈당 인지·대처·CGM 활용

**외래 실전 포인트:**
- 인슐린 꺼리는 이유(인슐린 공포) = 외래에서 가장 큰 장벽 → 저혈당 최소화 근거 제시로 대응
- 경구 3~4제 병용 vs 기저인슐린 단독: 복잡도·부작용·순응도 비교하여 결정
- 체중 증가 우려 환자 → GLP-1RA 병용 또는 대체 검토 ([[glp1-selection-strategy]] 참조)

---

## 출처

- KDA 2023 당뇨병 진료지침
- ADA 2025 Standards of Care
- KDIGO 2024 Diabetes in CKD
- KDA-KSN Metformin/CKD 합의문
- FDA Drug Safety Communication 2016 (DPP-4·HF)
