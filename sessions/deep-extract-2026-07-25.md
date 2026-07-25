# Deep Extract — 2026-07-25

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| FRIDs 낙상위험약물 — 낙상 입원 위험 | by-disease/fall-prevention-awv.md (보강) | inbox/study-notes/2026-07-25-frids-fall-risk-drugs-aging-2026.md | [CLINICAL] | 42343007 | 2026-07-21 |
| Incidental Physical Activity — 심혈관 이점 | by-disease/incidental-physical-activity.md (신규) | inbox/study-notes/2026-07-25-incidental-physical-activity-afp-poem.md | [CLINICAL] | 41533422 | 2026-07-22 |
| 성인 경부 종괴 평가 AFP 2026 | 기반영 (2026-05-27) | inbox/study-notes/2026-07-25-neck-mass-imaging-decision-afp-2026.md | [CLINICAL] | 41839107 | 2026-07-23 |
| 급성 비부비동염 AFP 2025 RER | by-disease/sinusitis.md (보강) | inbox/study-notes/2026-07-25-acute-rhinosinusitis-afp-rapid-evidence-review.md | [CLINICAL] | 39823615 | 2026-07-24 |

## 핵심 요약

### FRIDs 낙상위험약물 (PMID:42343007)
이탈리아 지역사회 노인 32,236명 nested case-control. FRIDs 복용 → 낙상 입원 위험 51% 상승(aOR 1.51). 개별 약물 중 오피오이드(aOR 1.40)·항우울제(aOR 1.45)가 가장 높은 위험. 30일 내 현재 복용이 위험 최고(aOR 1.78), 9개월 초과 장기 복용도 위험 높음(aOR 1.69). fall-prevention-awv.md에 FRIDs 섹션 추가.

### Incidental Physical Activity (PMID:41533422)
AFP POEM 요약 — 원저 UK Biobank Circulation 2025. 구조적 운동 없는 24,139명에서 일상 고강도 활동 4.6분/일 → 심혈관 사망 38%↓. 중강도 23.8분/일 → 50%↓. L자형 용량반응 — 조금만 해도 효과 큼. 강도별 등가(고강도 1분=중강도 3분=저강도 35-49분) 계산법과 외래 처방 메시지 포함. incidental-physical-activity.md 신규 생성.

### 성인 경부 종괴 (PMID:41839107)
2026-05-27 기반영. 미르 반응(영상 결정 포인트)에 집중한 study-note 새로 생성. 영상 선택 요약: 갑상선→US / 비박동성/비갑상선→CE-CT / 박동성→CTA / 두개신경→MRI / 잠재전이→PET.

### 급성 비부비동염 AFP 2025 RER (PMID:39823615)
AFP 2025 Rapid Evidence Review. 항생제 기준 3가지: 중증 3일+·3~5일 악화·7일 이상 지속. 경증·7일 미만 → 대기. Amoxicillin = amoxicillin-clavulanate (동등 효과, 비용 우위). sinusitis.md에 AFP 2025 섹션 추가.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/fall-prevention-awv.md · by-disease/incidental-physical-activity.md · by-disease/sinusitis.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (새 키 추가 시)

## 과거 누락 복구

- PMID:42343007 — 출처 `inbox/scout/2026-07-21.md` (2026-07-21 scout, 오늘 복구)
- PMID:41533422 — 출처 `inbox/scout/2026-07-22.md` (2026-07-22 scout, 오늘 복구)
- PMID:41839107 — 출처 `inbox/scout/2026-07-23.md` (2026-07-23 scout, 오늘 복구 — knowledge 기반영, study-note 신규)
- PMID:39823615 — 출처 `inbox/scout/2026-07-24.md` (2026-07-24 scout, 오늘 복구)
