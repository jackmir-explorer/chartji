# Deep Extract — 2026-05-31

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| Evidence for Anchoring Bias During Physician Decision-Making | by-disease/clinical-reasoning.md (보강) | inbox/study-notes/2026-05-31-anchoring-bias-jama-va-data.md | [CLINICAL] | 37358843 | 2026-05-18 |
| Lymphadenopathy: Evaluation and Differential Diagnosis | by-disease/lymphadenopathy.md (보강) | inbox/study-notes/2026-05-31-lymphadenopathy-afp-2025.md | [CLINICAL] | 40961306 | 2026-05-18 |
| Infectious Mononucleosis: Rapid Evidence Review | by-disease/infectious-mononucleosis.md (신규) | inbox/study-notes/2026-05-31-infectious-mononucleosis-afp-2023.md | [CLINICAL] | 36689975 | 2026-05-18 |
| 누런 가래로 항생제 처방 — 교육 효과·한계 | by-disease/acute-bronchitis.md (보강) | inbox/study-notes/2026-05-31-purulent-sputum-abx-education-japan.md | [INSIGHTS] | 39596717 | 2026-05-19 |
| 앵커링 편향 극복의 핵심은 감별 지식 | by-disease/clinical-reasoning.md (보강) | inbox/study-notes/2026-05-31-anchoring-bias-discriminating-knowledge-bmj.md | [INSIGHTS] | 38365449 | 2026-05-19 |

## 핵심 요약

### Evidence for Anchoring Bias During Physician Decision-Making (Ly et al. JAMA Intern Med 2023)
VA 전국 108,019건 분석. triage 기록에 "CHF" 단 한 줄 기재만으로 PE 검사율이 4.6pp 감소하고 검사가 15.5분 지연됐다. BNP는 오히려 6.9pp 더 많이 시행됨 — anchoring이 확증 방향으로 검사를 편향시킨다는 대규모 근거.

### Lymphadenopathy: Evaluation and Differential Diagnosis (Falk et al. AFP 2025)
AFP 2025 공식 리뷰. "Corticosteroids should be avoided because they can mask the histologic diagnosis of lymphoma or other malignancy" 명시. 4주 이상 지속 or 전신증상 → CBC·CRP·ESR·TB 검사. >2cm/hard/matted → 악성 or 육아종성 의심. Supraclavicular/epitrochlear → 악성 우선.

### Infectious Mononucleosis: Rapid Evidence Review (Sylvester et al. AFP 2023)
발열·인두염·후경부 LAP 3주징. 초기 검사: CBC diff(>40% lymph + >10% atypical) + heterophile antibody(sens 87%, spec 91%). 위음성 주의: 5세 미만·발병 첫 1주. 치료: supportive care만 — 항바이러스제·corticosteroid 모두 routine 비권고. 발병 후 3주 운동 금지(비장파열 예방). EBV → 9종 암 연관.

### Purulent Sputum ABx Education (Kudoh et al. Antibiotics Basel 2024)
일본 1,100명 의사 대상. 교육 후 "누런 가래 = ABx 처방" 100%→29.9%로 감소. 그러나 "환자가 원해서" 처방은 100%→44%로 교육 효과 저조. 외래에서 환자 교육·포스터 등 구조적 개입 병행 필요.

### Anchoring Bias RCT (Mamede et al. BMJ Qual Saf 2024)
레지던트 68명 RCT. "신중하게 더 생각하는 것(metacognition)"만으로는 anchoring을 풀지 못함 — 더 긴 시간과 낮은 자신감(System 2 활성화 증거)은 두 그룹 동일했으나 감별 지식이 높은 그룹만 anchoring에 저항(p=0.02). 핵심은 A vs B를 구별하는 discriminating features 지식.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 clinical-reasoning.md / lymphadenopathy.md / infectious-mononucleosis.md / acute-bronchitis.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장

## 과거 누락 복구

05-18 scout에서 미처리였던 항목 3건 + 05-19 scout 미처리 2건 = 총 5건 모두 이번 실행으로 복구.
- PMID 37358843, 40961306, 36689975 — 출처 `inbox/scout/archive/2026-05-18.md`
- PMID 39596717, 38365449 — 출처 `inbox/scout/archive/2026-05-19.md`
