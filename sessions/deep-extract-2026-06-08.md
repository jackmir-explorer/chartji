# sessions/deep-extract-2026-06-08.md

## 세션 정보
- 날짜: 2026-06-08
- 작업: Deep Extract Routine — 10건 처리 (3신규 knowledge entry + 7보강 + 10 study notes)
- 건드린 파일: 아래 목록 참고

---

## 처리 논문 목록 (10건)

| # | PMID | 저널 | 출처 Scout | knowledge 파일 | 처리 |
|---|---|---|---|---|---|
| 1 | 41905727 | JPSM 2026;72(1):e58-e63 | 05-30 | by-disease/palliative-depression-ketamine.md | 보강 |
| 2 | 42202366 | Am Fam Physician 2026;113:440-448 | 05-30 | by-disease/skin-soft-tissue-infection.md | **신규** |
| 3 | 42202351 | Am Fam Physician 2026;113:469-478 | 05-30 | by-disease/post-bariatric-surgery.md | **신규** |
| 4 | 41232955 | BMJ 2025;391:r1928 | 05-30 | by-disease/MASH.md | 보강 |
| 5 | 41833520 | JAGS 2026;74(5):1314-1325 | 05-31 | by-disease/prescribing-cascade.md | 보강 |
| 6 | 42184419 | Ann Intern Med 2026 (Epub 05-26) | 05-31 | by-disease/diabetes.md | 보강 |
| 7 | 42207626 | JAMA 2026;335(20) | 05-31 | by-disease/hypogonadism-male.md | **신규** |
| 8 | 41974007 | Ann Intern Med 2026;179(5_Suppl):e2600984 | 05-31 | by-disease/osteoarthritis.md | 보강 |
| 9 | 41665459 | Hum Vaccin Immunother 2026;22(1):2624234 | 06-01 | guidelines/adult-vaccination-korea-faq.md | 보강 |
| 10 | 41973459 | JAMA Intern Med 2026;186(6):668-676 | 06-02 | guidelines/deprescribing.md | 보강 |

---

## 신규 Study Notes (inbox/study-notes/)

| 파일명 | PMID |
|---|---|
| 2026-06-08-palliative-psychostimulants-depression.md | 41905727 |
| 2026-06-08-skin-soft-tissue-infection-afp.md | 42202366 |
| 2026-06-08-post-bariatric-surgery-family-physician.md | 42202351 |
| 2026-06-08-masld-bmj-2025-diagnosis.md | 41232955 |
| 2026-06-08-chei-oab-cascade-dementia.md | 41833520 |
| 2026-06-08-tirzepatide-early-t2dm-surpass-early.md | 42184419 |
| 2026-06-08-male-hypogonadism-jama-2026.md | 42207626 |
| 2026-06-08-rheumatology-2025-oa-metformin.md | 41974007 |
| 2026-06-08-immunofitness-elderly-vaccination.md | 41665459 |
| 2026-06-08-ppi-deprescribing-cluster-rct.md | 41973459 |

---

## 특이사항

- **PMID 41232955** (BMJ 2025;391:r1928): PubMed 초록 미제공 — Scout 요약 기반으로 작성, `[초록 미제공 — 전문 미확인]` 태그 부착
- **PMID 42184419** (tirzepatide SURPASS-EARLY): Eli Lilly 재원 오픈라벨 RCT — knowledge 및 study note 모두에 이해충돌 경고 명시
- **10건 한도 초과**: 12건 [o] 중 10건(최고령 우선) 처리 완료. 미처리 잔여 [o] 2건:
  - PMID:42202349 (AFP 2026 중증 고혈압) — 06-02 scout
  - PMID:40358102 (JAAPA 2025 림프절병증) — 06-02 scout
  - → 다음 Deep Extract 처리 대상 (scout에 [o] 그대로 유지)

---

## Builder 결과

- knowledge/ 신규 3: skin-soft-tissue-infection, post-bariatric-surgery, hypogonadism-male
- knowledge/ 보강 7: palliative-depression-ketamine, MASH, prescribing-cascade, diabetes, osteoarthritis, adult-vaccination-korea-faq, deprescribing
- study notes 10: inbox/study-notes/ 아래 모두 신규 작성
- scout 마커: [o] → [✓] 10건 (05-30 4건, 05-31 4건, 06-01 1건, 06-02 1건)
- knowledge/log.md: 2026-06-08 항목 추가

---

## 판정: 통과

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이번 Deep Extract는 **knowledge/*.md만 갱신**했다. 앱 실제 노출을 위해 반드시 별도 Liby ingest 호출로 `src/knowledge-bundle.js` 컴파일 필요.

Backlog (bundle 미반영 예상): 신규 3 + 보강 7 = 10 entries 모두 미반영.

---

## 회고

- PMID 41232955 초록 미제공 → Scout 기반 처리 원칙 올바르게 적용됨
- 10건 한도로 인해 2건 이월; 우선순위 정확히 적용(최고령 scout 우선)
- 미처리 잔여 [o] 2건 06-02 scout에 그대로 보존 — 다음 run 자동 감지 가능
