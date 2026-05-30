# Deep Extract — 2026-05-30

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| OA + 수면 장애 — CBT-i·운동·체중감량 경로 | by-disease/osteoarthritis.md (신규) | inbox/study-notes/2026-05-30-oa-sleep-cbti.md | [CLINICAL — 조건부] | 41876082 | 2026-05-28 |
| VA Whole Health 팀 vs CBT vs 일반치료 (wHOPE RCT, JAMA) | by-disease/chronic-pain-integrative.md | inbox/study-notes/2026-05-30-whole-health-team-chronic-pain.md | [CLINICAL] | 42054020 | 2026-05-28 |
| IBS 진단 — Rome 기준 적용 실태 (스웨덴 1차의료) | by-disease/ibs.md | inbox/study-notes/2026-05-30-ibs-rome-guideline-adherence.md | [INSIGHTS] | 41640253 | 2026-05-28 |
| 암성통증 오피오이드 전환 — MASCC·ASCO·AAHPM 합의 가이드라인 | by-disease/palliative-pain.md | inbox/study-notes/2026-05-30-opioid-conversion-cancer-mascc.md | [CLINICAL] | 41197973 | 2026-05-29 |
| 노인 항콜린 부담 감량 4단계 알고리즘 (Delphi 검증) | by-disease/anticholinergic-burden.md | inbox/study-notes/2026-05-30-anticholinergic-deprescribing-algorithm.md | [CLINICAL] | 42189088 | 2026-05-29 |

## 핵심 요약

### OA + 수면 장애 (Hall M et al. Osteoarthritis Cartilage 2026, PMID:41876082)
수면 장애는 OA 환자에서 흔하지만 진료에서 거의 다루어지지 않는다. 수면 장애는 OA 통증을 독립적으로 악화시키며, CBT-i·운동·체중감량이 수면 개선 → 통증 감소 이중 경로를 제공한다. OA 외래에서 수면 문진 루틴화 필요.

### VA Whole Health 팀 RCT (Seal KH et al. JAMA 2026, PMID:42054020)
n=764명, 6 VA센터. Whole Health 팀(PCP+통합의료 임상가+코치)이 CBT(p=.02) 및 일반치료(p=.002)보다 12개월 통증 간섭에서 유의하게 우월. CBT는 일반치료 대비 유의하지 않음. 효과 크기는 MCID(1.0점) 미만이나 JAMA 수준 RCT로 다학제 팀 접근 의뢰 근거 확보.

### IBS 진단 실태 (Rauma J et al. Scand J Prim Health Care 2026, PMID:41640253)
스웨덴 1차의료 1,943례. Rome 기준 충족 문서화 36.2%, 명시 기록 4.9%뿐. 대장내시경 의뢰 9.7%, CT 5.8% — 가이드라인 위반. Rome IV 기준 명시 기록 습관화 + alarm feature 없으면 기본 lab만 원칙 강조.

### 오피오이드 전환 합의 가이드라인 (Davis MP et al. J Pain Symptom Manage 2026, PMID:41197973)
5개 국제 학회 최초 합의. 암성통증 환자 최대 40%에서 전환 필요. 메타돈(반감기 가변·QTc 연장)·경피 펜타닐(비대칭 전환)의 복잡성 강조. 전환 후 24-48시간 집중 모니터링 권고.

### 항콜린 부담 감량 알고리즘 (Garcia TS et al. J Eval Clin Pract 2026, PMID:42189088)
Delphi 검증(CVI ≥0.8) 4단계 알고리즘. amitriptyline·paroxetine·promethazine 대체 Flowchart가 핵심. 기존 STOPP/START에 항콜린 부담 특화 체계적 접근 추가.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 osteoarthritis.md, ibs.md, chronic-pain-integrative.md, palliative-pain.md, anticholinergic-burden.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장

## 과거 누락 복구 (해당 시)

2026-05-28 scout 3건 (정오 미처리 — 오늘 실행으로 복구):
- OA 수면 (PMID:41876082) — 출처 inbox/scout/2026-05-28.md
- VA Whole Health RCT (PMID:42054020) — 출처 inbox/scout/2026-05-28.md
- IBS 진단 실태 (PMID:41640253) — 출처 inbox/scout/2026-05-28.md
