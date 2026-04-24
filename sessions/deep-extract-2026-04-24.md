# Deep Extract — 2026-04-24

## 처리한 논문

| 논문 | 저장 위치 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|
| 비허혈성 심근증: 일차의료 가이드 | knowledge/by-disease/cardiomyopathy.md | [CLINICAL] | 41839108 | 2026-04-23 |
| B형간염 스크리닝·예방 업데이트 | knowledge/by-drug/hepatitis-ab-vaccine.md (보완) | [REGULATORY] | 41839073 | 2026-04-23 |
| 난치성 만성기침 — Duloxetine RCT | knowledge/by-disease/chronic-cough.md | [CLINICAL — 조건부] | 41530764 | 2026-04-24 |
| ARIA 2024-2025 알레르기비염 가이드라인 | knowledge/by-disease/allergic-rhinitis.md | [REGULATORY] | 41324154 | 2026-04-24 |

## 핵심 요약

### 비허혈성 심근증 (PMID:41839108 — AFP 2026 Feb)
비대성(HCM)·확장성(DCM)·제한성(RCM)·ARVC 4가지 유형 정리. HCM은 모든 환자에서 ICD 위험도 평가 필수. 심근증 의심 시 심전도+심초음파 초기 평가 후 심장 전문의 의뢰. 심부전 동반 시 GDMT 적용 (heart-failure.md 연계). 가족력 청취 필수.

### B형간염 Triple Panel 스크리닝 (PMID:41839073 — AFP 2026 Mar)
CDC 신규 권고: 모든 성인 1회 triple panel(HBsAg+anti-HBs+anti-HBc) 시행. 기존 2종(HBsAg+anti-HBs)에서 anti-HBc 추가가 핵심 — 과거 감염력·자연면역 확인 가능. 미국 만성 HBV 환자 2/3가 진단 모르는 상황. 한국 KDCA 채택 미완이나 임상 판단으로 적용 가능.

### 난치성 만성기침 + Duloxetine (PMID:41530764 — BMC Med 2026)
표준치료 실패 RCC에서 duloxetine 8주 치료: 기침 횟수/시간 83.96→33.12 (위약 87.67→80.36, p<0.001), LCQ 개선 유의. 기전: SNRI가 기침 감각신경 과반응성 조절. 부작용 오심(11.4%)·어지럼(15.9%)·졸음(9.1%) 주의. 단일기관 중국 RCT(n=98)로 근거 강도 한계 — 가바펜틴·모르핀 대비 일차의료 접근성 유리.

### ARIA 2024-2025 알레르기비염 가이드라인 (PMID:41324154 — Allergy 2025)
권고 서열: INAH+INCS 복합 > INCS 단독 > INAH 단독. 2025 개정의 핵심 변화: INAH+INCS가 INCS 단독보다 명시적으로 우선 권고로 격상. mHealth 리얼월드 데이터를 근거에 처음 반영. 비염은 한국 외래 최다 호소증상 — 처방 기준 즉시 업데이트 필요.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/cardiomyopathy.md, by-drug/hepatitis-ab-vaccine.md, by-disease/chronic-cough.md, by-disease/allergic-rhinitis.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)
