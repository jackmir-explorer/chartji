# sessions/2026-05-06-large-file-split.md

## 세션 정보
- 날짜: 2026-05-06
- 작업: Auditor 보고서 Tier A 거대 파일 분할 (heart-failure.md / glp1-selection-strategy.md)
- 호출자: Liby (Librarian)
- 건드린 파일:
  - 분할 원본 (수정): `knowledge/by-disease/heart-failure.md`, `knowledge/by-drug/glp1-selection-strategy.md`
  - 약물 entry 보강 (수정): `knowledge/by-drug/wegovy.md`, `knowledge/by-drug/mounjaro.md`, `knowledge/by-disease/alcohol-use-disorder.md`
  - 신규 파일: `knowledge/by-disease/heart-failure-monitoring.md` (사전 생성됨), `heart-failure-gdmt-dosing.md`, `heart-failure-pocus-ducs.md`, `heart-failure-hfpef-obesity.md`, `heart-failure-cardiology-2025-update.md`
  - 기존 보강 (수정): `knowledge/guidelines/heart-failure-referral.md` (강의 정리 5요점 추가)
  - 백업: `knowledge/by-disease/heart-failure.md.bak`, `knowledge/by-drug/glp1-selection-strategy.md.bak`

---

## 결정 배경

Auditor 2026-05-06 보고서 §1 Tier A 3건 중 분할 가능한 2건 실행. (3번째 alcohol-use-disorder.md는 응집 컨텐츠 — 분할 불요로 판정됨, 단 GLP-1 AUD 섹션 이전 처리.)

분할 원칙:
- 임상 컨텐츠는 **이동만** (추가·삭제 없음)
- 수치·PMID·DOI·임상 권고 강도 그대로 보존
- wikilinks로 양방향 연결
- 약물별 디테일은 약물 entry로, 약물선택 메타·안전성은 잔존

---

## heart-failure.md 분할

### Before
- 425 lines / 15 sections

### After
- `heart-failure.md`: **253 lines / 9 sections** (≤ Auditor 임계 9)
  - 보유: definition, classification, exam (Volume Overload BNP+POCUS B-lines 포함), protocol, contraindication, schedule (백신 6종), referral (6시점 + I NEED HELP), notes (HFrEF vs HFpEF 비교 + 동반 HTN/DM), draft-append
  - 임계 250줄 약간 초과 (253) — 추가 trim은 임상 의미 손상 위험으로 보류
- 신규 파일 (모두 `parents: [heart-failure]`):
  - `heart-failure-monitoring.md` 33 lines / 2 sections (사전 생성)
  - `heart-failure-gdmt-dosing.md` 66 lines / 2 sections (ACEi/ARB/ARNI/BB/MRA 표 5개 — 수치 그대로)
  - `heart-failure-pocus-ducs.md` 45 lines / 2 sections (DUCS AUC 0.76/0.77 PMID:41863026)
  - `heart-failure-hfpef-obesity.md` 54 lines / 2 sections (Costa 2026 PMID:41802118)
  - `heart-failure-cardiology-2025-update.md` 46 lines / 2 sections (Atalla 2026 PMID:41974015)
- 기존 `guidelines/heart-failure-referral.md` (103 → ~115 lines)에 강의 정리 5요점 추가 (notes 섹션의 강의 요약 통합)

---

## glp1-selection-strategy.md 분할

### Before
- 349 lines / 16 sections

### After
- `glp1-selection-strategy.md`: **207 lines / 9 sections** (목표 ≤200 거의 도달)
  - 보유: 위고비 vs 마운자로 선택 기준, 시작 용량·감량 속도 비교, Dose Escalation 프로토콜, 반응 예측 인자, 빠른 감량 대응, Interval Tx 전략, 당뇨전단계·T2DM 예방 (CLINICAL+INSIGHTS 통합), NEJM 2026 종합 리뷰 (압축), 안전성 (NAION + GU 감염 + 암 메타분석)
  - 통합: 기존 "GLP-1 당뇨전단계 T2DM 예방 [CLINICAL]" + "GLP-1RA 전당뇨 치료 [INSIGHTS]" 2개를 한 섹션으로 합침 (PMID 양쪽 모두 보존: 41565568 + 41984373)
- 약물 entry로 이전된 섹션 **3건**:
  1. **중증 정신질환(SMI) 환자 적용** [Srisurapanont 2026, PMID:41618880] → `wegovy.md` (semaglutide 主)
  2. **Tirzepatide 중단 후 체중 반동 — 대체 비만약 전환 전략** [Huang 2026, PMID:41962807] → `mounjaro.md` (기존 동일 섹션에 unique data: 전환 대상 약물 목록, 단순중단≠전환, 한계 추가)
  3. **GLP-1 RA와 알코올사용장애(AUD) — 입원 위험 감소** [Lähteenvuo 2025, PMID:39535805] → `alcohol-use-disorder.md`

---

## 보존 검증

### PMID 카운트 (분할 전후)
- heart-failure family (분할 후 6 파일 합계): **4 unique** (PMID:41729549, 41802118, 41863026, 41974015) — 분할 전과 동일
- glp1 family (선택 전략 + wegovy/mounjaro/ozempic/alcohol-use-disorder 합계): **14 unique** (12 + alcohol-use-disorder 기존 PMID:37934220, 38551564) — glp1 측 12 PMID 모두 보존

### 핵심 수치 spot-check (모두 그대로 보존)
- BMI ≥ 30 / BMI ≥ 27 (wegovy)
- –6.17 kg, RR=0.98 (SMI 메타 → wegovy)
- aHR 0.64, aHR 0.72, 36% / 28% 감소 (AUD → alcohol-use-disorder)
- HR 0.07, HR 0.80, 84%, 81%, 66%, 93.3% (당뇨전단계 → glp1-selection-strategy)
- 94,245, OR 1.37/0.84/0.95/1.12 (암 메타 → glp1-selection-strategy)
- –6.7%, +1.9%, 81.9%, 80.7%, 11개월 (Tirzepatide 중단 → mounjaro)
- –20.2% vs –13.7%, –21.4%, –22.5% (SURMOUNT → glp1-selection-strategy + mounjaro)

### 임상 권고 강도 라벨 보존
- [CLINICAL], [CLINICAL — 조건부], [INSIGHTS], [TIPS — by 로컬원장님], [TIPS — by FM교수님] 모두 원본 위치·태그 동일.

---

## wikilinks 정합

### 신규 양방향 링크
- `heart-failure.md` ↔ `heart-failure-monitoring`/`-gdmt-dosing`/`-pocus-ducs`/`-hfpef-obesity`/`-cardiology-2025-update`/`-referral` (모두 wikilink로 연결)
- `glp1-selection-strategy.md` ↔ `wegovy`/`mounjaro`/`alcohol-use-disorder` (이전된 섹션의 새 위치를 메모로 안내)
- `wegovy.md` SMI 섹션 → `[[mounjaro]]`, `[[glp1-selection-strategy]]`
- `mounjaro.md` 기존 Tirzepatide 중단 섹션 (이미 `[[wegovy]]` 링크 보유)
- `alcohol-use-disorder.md` GLP-1 AUD 섹션 → `[[wegovy]]`, `[[ozempic]]`, `[[glp1-selection-strategy]]`

### Inbound 참조 영향 없음
- `glp1-selection-strategy` 참조 (knowledge/MAP.md, index.md, log.md, obesity.md, MASH.md, diabetes-dyslipidemia.md, diabetes.md, afp-top20-poems-2024.md) — 모두 파일명·키워드 그대로 사용 → 깨지지 않음
- `index.md` glp1-selection-strategy 한 줄 요약은 약물 entry로 이전된 섹션 일부를 언급(SMI·전당뇨·중단 전환·NEJM·AUD) → 다음 ingest 호출 시 갱신 권고

### 중복 파일 제거
- 작업 도중 `knowledge/by-disease/heart-failure-referral.md`를 새로 만들었으나, 기존 `knowledge/guidelines/heart-failure-referral.md` 발견 → 신규 파일 삭제, 기존 파일에 강의 정리 5요점만 추가 통합

---

## bundle 미동기화

src/knowledge-bundle.js 수정 **없음** (작업 지시 §7).
- glp1-selection-strategy 본문에서 SMI/Tirzepatide-rebound/AUD 컨텐츠가 약물 entry로 옮겨졌으므로 bundle entry 본문도 동기화 필요
- heart-failure entry는 본문이 대폭 축소되었으므로 bundle context도 재컴파일 필요
- **다음 Liby ingest 호출 시 일괄 재생성 권고** (모든 분할 결과 + 5-D wave 4 등과 묶어서 처리)
- 인덱스 한 줄 요약 (`knowledge/index.md` line 94) 갱신도 동시 처리 권고

---

## 결과
- 판정: **통과**
- 다음 작업:
  1. bundle 재컴파일 (heart-failure family + glp1 family + wegovy/mounjaro/alcohol-use-disorder 본문)
  2. `index.md` 행 갱신 (glp1-selection-strategy / heart-failure 신규 파일 5개 추가)
  3. `log.md` 추가 (2026-05-06 — 분할 기록)
  4. Auditor 권고 §4 미ingest md 11건 처리 (특히 alcohol-use-disorder ingest — 본 세션에서 GLP-1 AUD 섹션이 추가되었으므로 다시 갱신해 ingest)

---

## 회고

### 예상과 달랐던 점
- heart-failure.md 250줄 도달이 어려움 — schedule(백신 6종 + 2025 글로벌 학회 표) + 의뢰 6시점 + I NEED HELP + notes(HTN/DM 권고)는 모두 진료 흐름에 직결되어 추가 분할이 임상 의미 손상 위험. 253줄에서 최종 정지.
- glp1-selection-strategy.md도 비슷한 이유로 207줄. 안전성(NAION/GU/암) 3건은 GLP-1 공통이라 잔존시킴.
- 기존 `guidelines/heart-failure-referral.md` 존재를 사전 grep에서 누락. 작업 중반 발견 후 신규 파일 삭제 + 기존 파일에 통합. **교훈**: 분할 시 새 파일 생성 전 `find knowledge/ -name "<key>*"` 확인 절차 필요.

### 다음 세션 반영
- bundle 재컴파일은 분할 직후가 아니라 묶음 처리. 다음 Liby ingest 시 명시적으로 "분할 후 동기화 필요" 표기.
- 분할 결과 파일 5개의 parent: heart-failure는 명시되었으나, kind는 disease vs topic 결정 필요 (현재 by-disease/ 폴더 위치이므로 disease 기본값 적용 예정).
