# 안정형 흉통 — 폐쇄성 CAD 임상가능도 (RF-CL / CACS-CL)

tags: [CLINICAL]
keywords: 협심증, 안정형 흉통, stable chest pain, 폐쇄성 관상동맥질환, OCAD, obstructive CAD, pretest probability, PTP, clinical likelihood, RF-CL, CACS-CL, 관상동맥 칼슘점수, coronary artery calcium, CACS, Diamond-Forrester, 리스크 층화
sources:
  - 1차: Winther S et al. Incorporating Coronary Calcification Into Pre-Test Assessment of the Likelihood of Coronary Artery Disease. J Am Coll Cardiol 2020;76(21):2421-2432. PMID:33213720, DOI:10.1016/j.jacc.2020.09.585 (RF-CL·CACS-CL 모델 개발·검증)
  - 1차: Winther S et al. Coronary Calcium Scoring Improves Risk Prediction in Patients With Suspected Obstructive CAD. J Am Coll Cardiol 2022;80(21):1965-1977. PMID:36396197, DOI:10.1016/j.jacc.2022.08.805 (예후 검증)
  - 도구: calciumscorecalculator.com/en/ocad/ (RF-CL + CACS-CL 온라인 계산기, 미르 제공)
  - 맥락: 2024 ESC 만성 관상동맥 증후군(CCS) 지침이 clinical-likelihood 접근 채택 [원 지침 PMID 미확인 — Researcher 검증 권장]

version: Winther 2020 모델 (RF-CL / CACS-CL)
supersedes: (신규 — 기존 Diamond-Forrester 단독 PTP 표를 보완)
applicability: **안정형(만성) 흉통**으로 폐쇄성 CAD가 의심되는 증상 환자의 **검사 전 임상가능도** 추정·리스크 층화. 급성 흉통(ACS 배제)은 **다른 경로**. 1차의료에선 "이 흉통 환자를 어디까지 검사할까" 판단 보조.

---

## 한 줄

**증상 환자의 폐쇄성 CAD 가능도를 나이·성별·증상 + 위험인자(RF-CL), 필요 시 관상동맥 칼슘점수(CACS-CL)로 추정해 "검사 안 해도 되는 저위험"을 걸러낸다.** 단독 Diamond-Forrester PTP보다 저가능도로 안전하게 재분류되는 환자가 크게 늘어난다.

---

## 두 모델

| 모델 | 입력 | 용도 |
|---|---|---|
| **RF-CL** (위험인자 가중) | 증상유형(전형/비전형 협심증·비협심증성 흉통) + 나이 + 성별 + **당뇨·고혈압·이상지질혈증·흡연·조기 CAD 가족력** | 1차 임상가능도 추정 |
| **CACS-CL** (칼슘점수 가중) | RF-CL 입력 + **관상동맥 칼슘점수(CACS)** | 중간가능도에서 추가 층화 |

> 토대: Diamond-Forrester 접근(성·나이·증상)에 위험인자를 얹은 것이 RF-CL, 여기에 CACS를 더한 것이 CACS-CL.

---

## 가능도 구간과 처분 (리스크 층화)

| 구간 | 임상가능도 | 처분 방향 |
|---|---|---|
| **매우 낮음** | ≤ 5% | 추가 검사 불필요(안심·추적) |
| **낮음** | > 5 – ≤ 15% | 대개 검사 보류 가능. **CACS가 가장 유용한 구간**(재분류 NNT 최저) |
| **중간** | > 15 – ≤ 50% | 비침습 검사(CCTA 또는 기능검사) |
| **높음** | > 50% | 추가 평가 진행 |

> 실전 흐름: ① RF-CL 산출 → ② 매우낮음/낮음 → 검사 보류 또는 CACS로 재확인 / 중간 → CACS-CL 또는 비침습 검사 / 높음 → 평가 진행.

---

## 근거 (검증 수치)

- **개발·판별력**(Winther 2020, 개발 n=41,177·검증 n=15,411): 폐쇄성 CAD 판별 AUC **PTP 72 → RF-CL 75 → CACS-CL 85**. 저가능도 분류 비율 **PTP 11% → RF-CL 38% → CACS-CL 54%** — 재분류된 저가능도 환자는 추가 검사 불필요.
- **예후 검증**(Winther 2022, n=41,177 + 3,952): ≤5%로 하향 재분류 **PTP 18% → RF-CL 45% → CACS-CL 60%**인데도 연간 MI/사망률은 세 모델 모두 낮음(RF-CL 0.51%·CACS-CL 0.48%·PTP 0.37%). C-통계 **PTP 0.61 → RF-CL 0.64 → CACS-CL 0.69**. → RF-CL·CACS-CL은 각각 2.5배·3.3배 많은 환자를 "추가 검사 불필요"로 안전하게 식별.

---

## 주의

- **안정형(만성) 흉통 전용**: 급성 흉통·ACS 의심은 이 도구가 아니라 troponin·ECG 기반 응급 경로.
- **참조 기준이 해부학적 협착**(ICA/CCTA luminal stenosis) — 기능적 허혈과 완전 일치하지 않음. 최근 CCTA 기준 재보정 연구 진행 중.
- **CACS 가용성·보험**: 한국에서 관상동맥 칼슘 CT 접근성·급여는 별도 확인. CACS-CL은 CACS를 얻을 수 있을 때만.
- 매우낮음/낮음으로 분류돼도 **증상 경과·red flag(불안정 양상·고위험 특징)**는 임상 판단으로 재평가 — 모델은 확률일 뿐.
- 관련: [[clinical-reasoning]](pretest probability) · [[dyslipidemia]](CAC와 statin 결정) · [[dvt-d-dimer]](또 다른 PTP 기반 배제 전략).
