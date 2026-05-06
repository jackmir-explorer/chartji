# sessions/2026-05-06-inbox-가정의학과insight-phase3.md

## 세션 정보
- 날짜: 2026-05-06
- 작업: inbox 가정의학과insight Phase 3 (6건) — GROUP C 보강 5건 + GROUP D template 1건
- 건드린 파일:
  - 신규 by-disease/: paresthesia
  - 신규 guidelines/: chest-xray-template [TIPS — by 미르]
  - 보강 by-disease/: thyroid-fna-cnb (K-TIRADS), anxiety-depression-cbt (정신과 약물), alcohol-use-disorder (AUDIT/FRAMES), heart-failure (Stage A/B/C/D + BNP cutoff)
  - 수정: src/knowledge-bundle.js (478 keys), src/prompts.js, knowledge/log.md, knowledge/index.md

---

## 결정 배경
- 미르 지시: "손발저림은 따로 섹션을 분리하고 link로 연결" → paresthesia.md 신규 생성, [[diabetic-peripheral-neuropathy]]·[[carpal-tunnel-syndrome]]·[[CKD]]·[[anemia]]·[[thyroid-disorder]]·[[alcohol-use-disorder]]·[[multiple-myeloma]] 7개 entry로 wikilinks 연결
- GROUP C 4건은 기존 entry md 보강 + bundle entry sections 추가
- GROUP D 1건은 [TIPS — by 미르] 신규 등록

## Researcher 검증 (5 병렬)

| 주제 | 핵심 수정 |
|---|---|
| paresthesia | **갑상선저하증 → 대칭 분류** (raw 비대칭 정정). 1차 패널에 **SPEP/IFE 추가** (단클론 스크리닝 표준). AAN 2022: **TCA·SNRI·gabapentinoid·Na channel blocker 4계열 동등** (단일 1차 X). ASCO 2020 CIPN: **duloxetine은 유일하게 적정 근거 (조건부, modest)**. Coasting 효과 — oxaliplatin·cisplatin·vincristine. INH B6 결핍 |
| K-TIRADS | **K2 <2%** (raw "<3%"), **K3 2~10%·>1.5cm** (raw "3~10%·>2cm"). 심평원 갑상선초음파 판독 K-TIRADS 기재 필수. ATA pattern-based / ACR-TIRADS point-based / K-TIRADS 한국 PTC 반영 sensitivity 우선 |
| 정신과 약물 | **AASM 2017: trazodone·멜라토닌 불면 1차 X**. 고령 BZD/Z-drug Beers 강한 권고 회피 (triazolam·zolpidem). NICE GAD: BZD routine X — PRN/단기. Duloxetine 60mg 이상 추가 효과 근거 부족 |
| alcohol AUDIT/FRAMES | AUDIT-K 한국형 두 버전 명시: **원판 (≥12·≥15·≥26)** vs **AUDIT-KR (남≥10·여≥8)**. 폭음 **여 4잔/2시간** (raw 3잔 정정). 표준 1잔 미국 14g·WHO 10g·한국 7~8g. WHO 4 zones (0~7/8~15/16~19/≥20) |
| heart-failure stage | **Stage B: BNP/NT-proBNP 지속 상승 포함** (2022 ACC/AHA 갱신). 외래 BNP <35 / NT-proBNP <125 vs 응급 NT-proBNP age-adjusted 분리. **Stage C HFrEF는 4 pillars** (이미 protocol 섹션에 있음). Digoxin은 보조요법 |

## Builder 결과
- paresthesia.md 신규 (175줄, 7개 cross-link)
- chest-xray-template.md 신규 (TIPS by 미르)
- 4 entry md 보강:
  - thyroid-fna-cnb.md: K-TIRADS 분류 5단계 표 신설
  - anxiety-depression-cbt.md: 약물 처방 plan 섹션 (우울/불안/불면) 신설
  - alcohol-use-disorder.md: AUDIT 두 버전 + 음주량 정의 + FRAMES 6요소 보강
  - heart-failure.md: classification에 ACC/AHA Stage A/B/C/D 추가, exam에 BNP cutoff 외래 vs 응급실 분리
- knowledge-bundle.js: 463 → 478 keys
  - 신규 entry: paresthesia, chest-xray-template
  - 기존 entry sections 추가: thyroid-fna-cnb (classification), anxiety-depression-cbt (dosing), heart-failure (classification·exam)
- prompts.js: TRIAGE calcCategories 2개 신규 (paresthesia, chest-xray-template)
- log.md / index.md / sessions 기록

## QA 결과
- node 파싱: 478 keys, 신규 4 key 검증 OK (paresthesia, chest-xray-template, psychiatric-pharmacology alias, K-TIRADS alias)
- 표준 vocabulary section keys만 사용
- wikilinks cross-reference 다수 (paresthesia → 7 entry)
- 환자 식별 정보 X 확인

## 미반영 동기화 (후속)

> ⚠ heart-failure entry는 line 1495 객체와 line 1570의 "심부전" 별도 객체 두 개 — line 1570은 미동기화. 후속 sync 필요.
> ⚠ alcohol-use-disorder는 bundle entry 미등록 (md만 존재). md에는 AUDIT/FRAMES 보강 완료. 후속에서 신규 v2 entry 등록.

---

## 결과
- 판정: 통과
- 다음 작업: inbox 가정의학과insight 24개 주제 ingest 완료 (Phase 1: 8건 / Phase 2: 10건 / Phase 3: 6건 = **총 24건**). 미반영 동기화는 별도 작업으로 분리.

## 회고
- 미르 결정: 손발저림 분리 + link 연결 — wikilinks 그래프뷰가 entry간 연결 가시화. 분리가 옳았음 (1차 의료 일반 손발저림 ≠ 당뇨성 신경병증)
- AAN 2022 painful DPN의 4계열 동등 권고는 raw에 없던 중요 정보 (단일 1차 약물 통념 정정)
- AASM 2017이 trazodone·멜라토닌을 불면 1차에서 제외했다는 사실은 한국 임상에서 잘 알려져 있지 않음 — Researcher 가치
- bundle 객체와 md file의 sync는 점진적 진행 가능 — md가 source of truth, bundle은 빠른 lookup. 모든 보강이 양쪽 동시 갱신 필수는 아니다 (시간·복잡도 trade-off)
- "심부전" alias 별도 entry 패턴은 현재 v2 schema 한계. KNOWLEDGE_BUNDLE alias 단일 객체 참조로 단순화 가능 (후속 리팩터)
