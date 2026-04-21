# reports/2026-04-21-v1-inventory.md — v1 잔존 엔트리 인벤토리

- 작성일: 2026-04-21
- Bundle 현황: **81 keys = v1 64 + v2 17**
- 목적: v2 마이그레이션 우선순위 결정 + Phase 5a/5b/5d/5e 계획 기초 자료

---

## 1. v1 엔트리 그룹 (원본 md 파일 기준)

### 1-A. 임상 질환·증상 (8 md / 27 키 / 환자 대화 맥락 높음)

| md 파일 | 키 개수 | md 품질(줄/##/PMID/태그) | 판정 |
|---|---|---|---|
| **hyposmia.md** | 7 (후각감퇴·hyposmia·anosmia·…) | 55/4/0/4C·3T | ★★★ Researcher 검증완료 (Phase 3B 진입) — **Phase 5d 1순위** |
| **neck-mass.md** | 4 (경부종괴·neck mass·림프절염·lymphadenitis) | 50/4/**4**/3C | ★★★ PMID 확보 — Phase 5d |
| **dizziness.md** | 3 (dizziness·어지럼증·vertigo) | 43/4/0/1T | ★★ AAFP 2017 검증, 섹션 풍부 — Phase 5e |
| **BPPV.md** | 2 (BPPV·이석증) | 30/4/0/1T | ★★ 진단·치료 프로토콜 완결 — Phase 5e |
| **oral-lesion.md** | 4 (구강병변·oral white patch·구강궤양·lichen planus) | 33/4/0/1C·3T | ★★ Phase 5e |
| **dry-mouth.md** | 4 (구강건조증·…·xerostomia) | 31/4/0/1C·2미확인 | ★ 출처미확인 2건 — 보강 후 마이그레이션 |
| **LPR.md** | 3 (LPR·후두염·인후두역류) | 21/4/0/1C·2T | ★★ PPI 대안까지 확보 — Phase 5e |
| **burning-mouth.md** | 3 (burning mouth·구강작열감·BMS) | 18/4/0/1C | ★★ Sci Rep 2025 검증 — Phase 5e |
| **low-freq-hearing-loss.md** | 3 (저음성난청·귀먹먹함·이충만감) | 32/4/0/3T | ★ TIPS만 — Phase 5e |

### 1-B. 백신 묶음 (10 md / 29 키 / Phase 5a — md 보강 선행)

| md 파일 | 키 개수 | md 품질 | 판정 |
|---|---|---|---|
| **vaccination.md** | 3 (vaccination·예방접종·백신) | 38줄/5섹션/**0 PMID**/**0 태그**/미확인 1 | ✗ Researcher 선행 필수 |
| **tdap.md** | 2 (Tdap·파상풍) | 18/2/0/1C | ✗ PMID 0 |
| **herpes-zoster-vaccine.md** | 5 (대상포진·…·조스타박스) | 33/5/0/1C | ✗ PMID 0 |
| **pneumococcal-vaccine.md** | 2 (폐렴구균·pneumococcal) | 21/3/0/1C | ✗ PMID 0 |
| **hpv-vaccine.md** | 4 (HPV·자궁경부암·인유두종바이러스·가다실) | 16/2/0/1C | ✗ PMID 0 |
| **hepatitis-ab-vaccine.md** | 4 (A형간염·hepatitis A·B형간염·hepatitis B) | 42/2/0/1C | ✗ PMID 0 |
| **japanese-encephalitis-vaccine.md** | 2 (일본뇌염·Japanese encephalitis) | 19/2/0/1C | ✗ PMID 0 |
| **rabies-vaccine.md** | 2 (광견병·rabies) | 19/2/0/1C | ✗ PMID 0 |
| **varicella-mmr-polio-vaccine.md** | 7 (수두·…·IPV) | 34/3/0/1C | ✗ PMID 0 |

→ **vaccine 묶음 10 md는 Researcher 병렬 호출로 일괄 PMID 보강 후 Phase 5a**에서 묶어서 처리 권장 (CDC Pink Book / ACIP 2024/2025 일괄 검증).

### 1-C. v1 엔트리는 있으나 by-drug md가 있는 약물 (2 md — drug 분리 누락 의심)

| md 파일 | bundle 상태 | 판정 |
|---|---|---|
| **mucomyst.md** | bundle에 drug 엔트리 **없음** (dry-mouth/LPR 등에 녹아있음) | ⚠ 분리 ingest 필요 — drug 엔트리로 등록 가치 |
| **pilocarpine.md** | bundle에 drug 엔트리 **없음** (dry-mouth.md treatment에 묻혀있음) | ⚠ 분리 ingest 필요 |

---

## 2. v2 완료 엔트리 (17 키 / 참조용)

| md 파일 | v2 aliases | 섹션 구성 |
|---|---|---|
| obesity.md | obesity·비만 | classification/exam/protocol/notes/draft-template |
| dysphonia.md | dysphonia·쉰목소리·hoarseness·목소리이상 | protocol |
| urticaria.md | (urticaria·두드러기 추정) | classification/protocol/monitoring/pregnancy/referral/ocs-short-term-limit/not-recommended |
| resistant-hypertension.md | (저항성 고혈압 추정) | — |
| wegovy.md | 위고비·wegovy | indication/dosing/contraindication/insurance |
| semaglutide.md | semaglutide | overview |
| mounjaro.md | 마운자로·mounjaro·tirzepatide·zepbound | indication/dosing/insurance |
| ozempic.md | 오젬픽·ozempic | indication/insurance/notes |
| glp1 topic | glp1 | comparison/dosing/protocol/response-predictors/fast-weight-loss/interval-therapy/smi/prediabetes |

---

## 3. 추천 Phase 로드맵

| Phase | 범위 | 조건 |
|---|---|---|
| **Phase 5d** (추천 — 저비용) | hyposmia + neck-mass + resistant-hypertension(이미 v2) | PMID 확보 · Researcher 검증 완료 · 즉시 진행 가능 |
| **Phase 5e** (중견) | dizziness·BPPV·LPR·oral-lesion·burning-mouth (5개 md) | 섹션 풍부, 출처는 md 내부 (섹션명 표준화 + v2 shape 변환) |
| **Phase 5f** (drug 분리) | mucomyst·pilocarpine drug 엔트리 신규 ingest | 기존 disease 엔트리의 처방 내용을 drug로 재구성 |
| **Phase 5a** (vaccine 묶음) | 10 md / 29 키 | Researcher 병렬 호출로 PMID 보강 선행 필요 — 큰 세션 |
| **Phase 5b** (미르 영역) | dry-mouth·low-freq-hearing-loss 등 출처미확인 보강 | 미르 공부 중 TIPS/INSIGHTS 쌓일 때 ingest |

---

## 4. 관찰 (Liby/Auditor 학습 반영 후보)

1. **kind 부정합 의심**: mucomyst·pilocarpine이 by-drug 폴더에 있지만 bundle drug 0개 → ingest 시 파일 위치와 kind 부여 일관성 점검 규칙 필요
2. **md 품질 분포**: Researcher 검증 받은 md(hyposmia·neck-mass·resistant-hypertension·urticaria·obesity) vs 받지 않은 md(vaccine 전부·임상 증상 대부분) 양극화 — 기존 v1 ingest 시 Researcher 호출이 생략되었던 것으로 추정
3. **출처미확인 누적**: dry-mouth 2건 / wegovy 1건 / adult-vaccination-summary 1건 / pilocarpine 1건 / vaccination 1건 — 누적 시 신뢰도 오염 가능. Auditor 기준 #4 조기 경고 타겟
4. **v1 구조의 빈곤**: 64개 v1 엔트리 중 대부분이 `[treatment]` 단일 필드. v2 변환 시 섹션 분해 필요 (1개 긴 텍스트 → 여러 표준 섹션으로 쪼개기)
