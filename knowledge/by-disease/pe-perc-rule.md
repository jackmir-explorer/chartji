# PERC 규칙 — 폐색전 배제 기준 (Pulmonary Embolism Rule-out Criteria)

tags: [CLINICAL]
keywords: PERC, 폐색전, 폐동맥색전증, pulmonary embolism, PE, 배제규칙, rule-out, D-dimer, D-이합체, pretest probability, gestalt, Wells, CTPA, VTE
sources:
  - 1차: Kline JA et al. J Thromb Haemost 2008;6(5):772-80. PMID:18318689 (전향 다기관 검증 — 정식 8항목 PERC 정의)
  - 1차: Freund Y et al. (PROPER) JAMA 2018;319(6):559-566. PMID:29450523 (클러스터 RCT — 비열등성)
  - 보조: Singh B et al. Ann Emerg Med 2012;59(6):517-20.e1-4. PMID:22177109 (체계적 고찰·메타분석)
  - 유도: Kline JA et al. J Thromb Haemost 2004;2(8):1247-55. PMID:15304025 (최초 유도)

version: 2008 검증판 (Kline)
supersedes: (없음 — 신규)
applicability: 폐색전 **임상 의심이 낮은(gestalt <15%)** 성인에서, 추가 검사 없이 PE를 배제해도 되는지 판단. ED 유래·검증. 1차의료에선 "저위험인데 D-dimer/CT까지 가야 하나" 판단 보조.

---

## 한 줄

**PERC는 "이미 임상적으로 PE 가능성이 낮다"고 판단된 환자에서만 쓰는 2차 필터다.** 8개를 모두 만족하면 D-이합체·영상 없이 PE를 배제할 수 있다. 중등도 이상 의심에는 쓰지 않는다(특이도가 낮아 rule-in 불가).

---

## 8항목 (하나라도 어기면 PERC 적용 불가)

| # | 기준 |
|---|---|
| 1 | 50세 미만 |
| 2 | 맥박 100/min 미만 |
| 3 | SaO₂ ≥ 95% (실내공기) |
| 4 | 객혈 없음 |
| 5 | 에스트로겐 사용 없음 |
| 6 | 이전 VTE(DVT/PE) 없음 |
| 7 | 한쪽 다리 부종 없음 |
| 8 | 최근 4주 내 입원을 요한 수술·외상 없음 |

> 8개 **전부 음성(PERC−)** → PE 배제, 추가 검사 불필요.
> **하나라도 양성** → PERC로 배제 불가 → Wells/Geneva 기반 위험층화 + (나이-보정) D-이합체로 진행 → [[dvt-d-dimer]].

---

## 핵심 전제 — 순서가 전부다

PERC는 **독립 진단 도구가 아니라 pretest probability가 낮을 때만 유효한 필터**다.

1. **먼저** gestalt(임상적 종합 인상) 또는 Wells로 **낮은 의심(<15%)**을 확정.
2. 저의심일 때만 PERC 8항목 확인.
3. PERC− → 종료 / PERC 중 1개라도 + → D-이합체 등 정식 평가.

중등도·고위험 환자에 PERC를 적용하는 것이 **가장 흔한 오용**이다. 특이도가 낮아(≈22%) PE를 **확정(rule-in)하는 용도로는 쓸 수 없고**, 오직 저위험에서 배제용으로만.

---

## 근거 (검증 수치)

- **전향 다기관 검증** (Kline 2008, n=8,138): gestalt 저의심 + PERC− 조합에서 45일 VTE/사망 **위양성률 1.0%**(16/1666), 민감도 97.4%, 특이도 21.9%. 외래 PE 의심 환자의 약 20%가 이 조합에 해당.
- **메타분석** (Singh 2012, 12개 코호트·13,885명): 통합 민감도 0.97, 특이도 0.23, 음성우도비 0.17.
- **RCT** (PROPER, Freund 2018, 클러스터 교차 RCT): 저위험 환자에서 PERC 전략이 관행 대비 **3개월 혈전색전 사건 비열등**(PERC군 추적 중 사건 0.1%), **CTPA 시행 13% vs 23%**, 체류시간·입원율 감소.

---

## 주의

- **ED 유래·검증**: 응급실 저위험 코호트에서 나온 규칙. 1차의료·다른 유병률 환경엔 직접 외삽 주의(저위험일수록 더 안전).
- **배제 전용**: 특이도 낮음 → PE를 확정하지 못함. PERC+ 는 "PE다"가 아니라 "PERC로는 못 거른다"는 뜻.
- **임신**: 에스트로겐·심박수·하지부종 항목에서 임신부는 흔히 걸리므로 PERC로 배제되지 않는 경우가 많음 — 임신 PE는 별도 경로.
- **한국 보험·runtime**: 특정 cutoff·보험 적용은 별도 확인.
- 관련: [[dvt-d-dimer]](Wells + 나이-보정 D-이합체) · [[clinical-reasoning]](pretest probability·anchoring).
