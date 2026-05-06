# sessions/2026-05-06-inbox-가정의학과insight-phase2.md

## 세션 정보
- 날짜: 2026-05-06
- 작업: inbox 가정의학과insight Phase 2 (10건) ingest — GROUP A 9~14 + GROUP B REGULATORY 4건
- 건드린 파일:
  - 신규 by-disease/: hematuria, proteinuria, fatigue, menopause, preconception-screening, parotitis-differential
  - 신규 guidelines/: bmd-coverage, breast-us-coverage, brain-metabolism-enhancers, travel-vaccination
  - 수정: src/knowledge-bundle.js (463 keys), src/prompts.js, knowledge/log.md, knowledge/index.md

---

## 결정 배경
- Phase 1 완료 후 미르가 "이어서 해보자" — Phase 2 진행
- 동일 워크플로우: Researcher 10 병렬 → 검증 결과 반영 → v2 B2 ingest

## Researcher 검증 (10 병렬)

| 주제 | 핵심 수정 |
|---|---|
| hematuria | AUA 2020: **현미경 ≥3 RBC/HPF 1회** (2회 이상 표준 X). risk-stratified Low/Int/High. routine 혈액검사(CBC/PT/aPTT/Uric acid/Ca/P) 표준 X — 임상 의심 시만 |
| proteinuria | KDIGO 2024 **A1<30 / A2 30~300 / A3>300** + 신증후군 ACR≥2200. raw 4단계 분류 정정. heatmap 연 1~4회 |
| fatigue | "90% 비특이적" 정확한 수치 미확인 → "검사로 진단 5%" 표현. **NICE NG206: ME/CFS GET 금기**. NICE 3mo / IOM 6mo 두 기준 병기 |
| menopause | **NAMS 2023: clonidine·pregabalin 권고 안 함** (raw 권장 정정). **fezolinetant (Veozah) 2023 FDA NK3 Level I 추가**. E2 cutoff ≤30 pg/mL |
| preconception | Varicella 2회 → 약 2mo 전 시작. HBsAg(+) 산모 HBV DNA + TDF 평가. 신생아 12h HepB+HBIG |
| parotitis | **1차 amoxi/clav** (외래) — **"cefazolin+metronidazole" 표준 X**, raw 정정. 초음파 routine X (모호·농양 시만) |
| BMD 급여 | 모든 항목 심평원 고시 일치 ✓ |
| breast US 급여 | 모든 항목 심평원 일치. 단순초음파(나940) 초회부터 80% 명확화 |
| 뇌대사 개선제 | **콜린알포 2025.9.21 치매 외 80% 선별급여 전환**. 니세틸 식약처 임상재평가(허가사항 변경, 심평원 고시 X). 사미온 5/10mg 뇌경색후유증·말초순환장애. 케타스 효능 = "어지러움(현훈) 개선" |
| travel vacc | 중동 등 B형간염은 위험행동 시. 광견병 동물접촉 위험 시 전 지역. **황열 ICVP 2016 IHR 평생 유효**. ACIP JE ≥1mo + 위험요인 |

## Builder 결과
- 6 disease + 4 topic v2 B2 entry (kind 분류: REGULATORY 4건은 topic — guidelines/ 표준 패턴)
- knowledge-bundle.js: 421 → 463 keys (10 entry + alias 32개)
- prompts.js: TRIAGE calcCategories 10개 신규
- log.md / index.md / sessions 기록

## QA 결과
- node 파싱: 463 keys, 10 신규 entry kind 검증 OK
- 표준 vocabulary section keys만 사용 (definition, classification, exam, differential, indication, protocol, contraindication, monitoring, schedule, precaution, insurance, notes, referral)
- wikilinks cross-reference (30+ 교차 링크)
- 환자 식별 정보 X 확인

---

## 결과
- 판정: 통과
- 다음 작업: Phase 3 (GROUP C 보강 5건 + GROUP D template 1건) — 손발저림·K-TIRADS·정신과 약물·음주 AUDIT/FRAMES·심부전 stage·CXR template

## 회고
- 콜린알포 2025.9.21 선별급여 전환은 임상 즉시 영향 — Researcher가 잡지 못했으면 잘못된 처방 코드 작성 가능
- NAMS 2023 fezolinetant·NICE 2021 GET 금기 등 raw에 빠진 최신 변경 다수 — Researcher 가치 입증
- 한국 심평원 고시 원문 직접 확인 어려움 (HIRA 사이트 403) — 의협신문·의사회 보험안내 보조
- 다음 phase부터 cancer-fatigue·diabetic-peripheral-neuropathy 등 기존 entry 보강은 Edit 작업 (신규 X)
