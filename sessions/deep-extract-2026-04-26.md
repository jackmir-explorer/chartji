# Deep Extract — 2026-04-26

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| 세균성·무균성 수막염: 진단·치료·예방 | knowledge/by-disease/meningitis.md | inbox/study-notes/2026-04-26-bacterial-aseptic-meningitis.md | [CLINICAL] | 41839077 | 2026-04-25 |
| 크루프: 신속 근거 리뷰 | knowledge/by-disease/croup.md | inbox/study-notes/2026-04-26-croup-rapid-review.md | [CLINICAL] | 41839076 | 2026-04-25 |
| B형간염 파트2: 진단 및 치료 업데이트 | knowledge/by-disease/hepatitis-b.md | inbox/study-notes/2026-04-26-hepatitis-b-diagnosis-therapy.md | [CLINICAL] | 41839074 | 2026-04-25 |
| 80세 이상 DOAC 복용 시 출혈 위험 | knowledge/by-disease/doac-elderly.md | inbox/study-notes/2026-04-26-doac-elderly-bleeding.md | [CLINICAL — 조건부, 초록 기반] | 41839090 | 2026-04-25 |
| 손목굴증후군: 수술 vs 스테로이드 주사 18개월 비교 | knowledge/by-disease/carpal-tunnel-syndrome.md | inbox/study-notes/2026-04-26-carpal-tunnel-surgery-vs-injection.md | [CLINICAL] | 41839082 | 2026-04-25 |
| 다발성골수종: 진단과 치료 | knowledge/by-disease/multiple-myeloma.md | inbox/study-notes/2026-04-26-multiple-myeloma-diagnosis-treatment.md | [CLINICAL] | 41839075 | 2026-04-25 |
| CBT 통합 메타분석 (375 RCT, 32,968명) | knowledge/by-disease/anxiety-depression-cbt.md | inbox/study-notes/2026-04-26-cbt-mental-disorders-meta-analysis.md | [CLINICAL] | 40238104 | 2026-04-25 |

## 핵심 요약

### 세균성·무균성 수막염 (PMID:41839077)
발열+두통+경부강직+의식 변화 → 1시간 내 경험적 IV 항생제 필수. LP는 개압·세포수·단백·당·그람염색·PCR 포함. 수막구균·Hib 밀접접촉자 화학예방(Rifampin/Ciprofloxacin). 덱사메타손 항생제 동시 투여로 신경 후유증 감소.

### 크루프 (PMID:41839076)
짖는 기침+쉰 목소리+흡기성 협착음 → Westley 0~2: Dexamethasone 0.6mg/kg PO 1회(최대 12mg) + 귀가. Westley 3+: 네뷸라이즈드 에피네프린 추가 + 2~4시간 관찰. 덱사메타손 무반응+독성 외관 → 세균성 기관염 의심 → 즉시 이송.

### B형간염 진단·치료 (PMID:41839074)
만성 HBV 치료 기준: ALT↑ + HBV DNA >2,000 IU/mL **또는** 간경변+검출 가능 바이러스. 1차 약제: TDF/TAF/ETV. 면역억제 전 HBsAg(+)이면 예방적 투여. HCC 감시: RUQ US + AFP 6개월마다.

### 80세 이상 DOAC 출혈 위험 (PMID:41839090)
80세 이상 독립 위험 인자. Apixaban 출혈 프로파일 최우수. 용량 감소 기준: ≥80세+체중≤60kg+Cr≥1.5mg/dL 중 2가지 이상. 낙상 위험만으로 항응고 중단 비권고. [초록 기반 — 전문 미확인]

### 손목굴증후군 수술 vs 주사 (PMID:41839082)
18개월 회복률: 수술 > 스테로이드 주사. 주사는 단기 완화용. 수술 의뢰 전 NCS 권고. 무지구근 위축 → 즉시 수술 의뢰. [초록 기반 — 전문 미확인 POEM]

### 다발성골수종 (PMID:41839075)
CRAB(고칼슘혈증·신부전·빈혈·뼈 통증) + 고령 → SPEP/UPEP 포함 초기 검사. M-protein 확인 시 혈액종양내과 즉시 의뢰. 1차의료: 의뢰 후 합병증 모니터링·심리지지·동반 질환 유지.

### CBT 통합 메타분석 (PMID:40238104)
375 RCT, 32,968명. PTSD g=1.27(최대), 특정공포증 g>1.0, 불안장애·우울·OCD g=0.5~1.0. 불안·우울 외래: 약물+CBT 동시 의뢰 권고. 양극성·정신증은 CBT 단독 불충분.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/meningitis.md, by-disease/croup.md, by-disease/hepatitis-b.md, by-disease/doac-elderly.md, by-disease/carpal-tunnel-syndrome.md, by-disease/multiple-myeloma.md, by-disease/anxiety-depression-cbt.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)

## 처리 제외 항목

- 항목 5 (45~49세 대장암 스크리닝, PMID:41839084): `[ ]` — 미르가 체크 안 함

## 과거 누락 복구

없음 — 이번 실행은 2026-04-25 Scout 파일의 [o] 항목만 처리. 과거 날짜 파일에 [o] 항목 없음.
