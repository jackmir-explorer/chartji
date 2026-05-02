# Deep Extract — 2026-04-27

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| Volume Overload — BNP + POCUS B-lines | by-disease/heart-failure.md (exam 서브섹션 추가) | inbox/study-notes/2026-04-27-volume-overload-bnp-pocus.md | [CLINICAL] | 41729549 | 2026-04-26 |
| 소아 뇌진탕 임상 진단 — JAMA RCE | by-disease/concussion.md (신규) | inbox/study-notes/2026-04-27-pediatric-concussion-rce.md | [CLINICAL] | 41941197 | 2026-04-26 |
| 만성 요통 비약물치료 — PT vs CBT RCT | by-disease/low-back-pain.md (신규) | inbox/study-notes/2026-04-27-chronic-low-back-pain-pt-cbt.md | [CLINICAL] | 42008809 | 2026-04-26 |
| 비만 약물치료 GRADE — TOS/OMA/OAC | by-disease/obesity.md (섹션 추가) | inbox/study-notes/2026-04-27-obesity-pharmacotherapy-grade.md | [CLINICAL] | 41859682 | 2026-04-26 |
| 여성 재발성 요로감염 — AUA 가이드라인 | by-disease/recurrent-uti.md (신규) | inbox/study-notes/2026-04-27-recurrent-uti-aua-guidelines.md | [CLINICAL — 조건부, 초록 기반] | 40551332 | 2026-04-26 |

## 핵심 요약

### Volume Overload — BNP + POCUS B-lines (PMID: 41729549)
JAMA 2026 Rational Clinical Examination. BNP ≥100 ng/mL(LR 6.9)가 단독 최강 rule-in, POCUS B-lines 없음(LR 0.09)이 단독 최강 rule-out. 기존 JVD·crackles·하지 부종보다 정확도 우월. 호흡곤란 환자에서 BNP + POCUS B-lines 조합이 외래·응급 의사결정 직접 지원.

### 소아 뇌진탕 임상 진단 — JAMA RCE (PMID: 41941197)
23개 연구 체계적 고찰. Mental fog(LR 11.8–12.0) > near-point convergence 이상(LR 7.0) > 소음 과민(LR 6.9) 순으로 특이적. 두통 없으면 배제 유력(LR 0.20). 소아과 응급 없는 외래에서 near-point convergence 검사 즉시 가능.

### 만성 요통 PT vs CBT SMART RCT (PMID: 42008809)
749명 52주 추적. PT가 CBT보다 기능 개선 우월(ODI 2.8점, MID 미만이나 유의). 통증 강도 차이 없음. 비반응자에서 마음챙김 vs 치료 전환 동등. 만성 요통 1차 치료로 PT 의뢰의 RCT 근거.

### 비만 약물치료 GRADE 권고 — TOS/OMA/OAC (PMID: 41859682)
Semaglutide·tirzepatide·bupropion-naltrexone·setmelanotide 강력 권고. HFpEF·OSA·MASH·골관절염·기존 심혈관질환·T2DM 동반 비만 시 GLP-1+ 조건부 권고. 체중 유지 중 약물 지속 강력 권고. 비만 기저질환별 약물 선택 최신 근거 제공.

### 여성 재발성 요로감염 — AUA 가이드라인 (PMID: 40551332)
AUA 16개 권고 핵심: 요배양 확인 → 예방적 항생제(저용량 지속 or 성교 후 단회) / D-만노스(OTC) / 질 에스트로겐(폐경 여성) / 자가 치료 프로토콜. 폐경 여성 재발성 UTI에 질 에스트로겐 비항생제 1차 전략 적용 가능.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/heart-failure.md, by-disease/concussion.md, by-disease/low-back-pain.md, by-disease/obesity.md, by-disease/recurrent-uti.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)

## 과거 누락 복구 (해당 시만)

해당 없음 — 과거 Scout 파일에는 `[o]` 체크 항목 없음 (모두 footer 템플릿 텍스트만).
