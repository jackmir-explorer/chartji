# knowledge/MAP.md — 지식 베이스 지도

tags: [META]
updated: 2026-04-23
generated: 수동 (추후 Mapper routine화 가능)
목적: **"지금 knowledge에 뭐가 있고 어디가 비어있는지"** 한 눈에 보기

---

## 🔎 핵심 요약 (한 줄)

**42개 엔트리**(by-disease 21 · by-drug 18 · guidelines 3 + alias 3) — **이비인후과·예방접종 강점**, **만성질환(당뇨·이상지질혈증)·호흡기·소화기·근골격 대부분 공백**.

---

## 1. 엔트리 분포

| 카테고리 | 엔트리 수 | 비고 |
|---|---|---|
| **by-disease/** | 21 | 질환·증상 메인 저장소 |
| **by-drug/** | 18 | 약물·백신 |
| **guidelines/** | 3 + 2 alias | 공식 가이드·요약 |
| **메타 (index·log·scope·vocabulary·sourcing)** | 5 | 운영 파일 |
| **합계** | 47 파일 (본문 42 고유) | |

### alias 쌍 (동일 엔트리, 이름만 다름)
- `CKD.md` ≡ `ckd-monitoring.md`
- `vte-hormone-therapy.md` ≡ `sex-hormone-vte-risk.md`
- `primary-care-top20-2024.md` ≡ `afp-top20-poems-2024.md`

---

## 2. 최근 30일 활동 (2026-03-24 ~ 04-23)

| 날짜 | 추가/수정 건수 | 주요 테마 |
|---|---|---|
| 2026-04-23 | **10건** (신규 4 + 보강 6) | 성호르몬-VTE, CKD 모니터링, GLP-1 리뷰 3건, 청소년 비만 GLP-1, 어지럼증 척추동맥, 독감백신 처방, 금연 전자담배 |
| 2026-04-22 | 5건 | LPR San Diego, SGLT-2 비뇨감염, 우울 스크리닝, 비타민D, Neffy |
| 2026-04-21 | 3건 + Phase 5a/5c 마이그레이션 | 심부전·심부전 의뢰·백신 v2 · drug v2 · Phase 4 v2 |
| 2026-04-17 | 4건 | urticaria·resistant-HT·GLP-1 SMI·GLP-1 전당뇨 |
| 2026-04-16 | 7건 | obesity 대폭 보강·GLP-1 반응 예측·구강병변 escalation·LPR 대안·dysphonia·neck-mass |
| 2026-04-15 | 9건 | GLP-1/비만/wegovy 집중 보강·hyposmia 신규 |
| 2026-04-14 | 4건 | TIPS 출처 규칙 소급 수정 |
| 2026-04-11 | 9건 | 구강/이비인후과 집중 (BPPV·dry-mouth·burning-mouth·LPR 등) |
| 2026-04-08~09 | 12건 | 초기 vaccination·vaccine 계열·dizziness·BPPV |

**경향**: 최근 활동 매우 활발. 주당 평균 10건+ 추가·보강. 주제는 **GLP-1/비만·이비인후과·백신**이 3대 축.

---

## 3. 임상 Scope 커버리지 (scope.md 기준)

### Tier 1 — 매일 쓴다 (가장 중요)

| 분야 | 커버리지 | 엔트리 |
|---|---|---|
| 만성질환 — 고혈압 | 🟡 부분 | `resistant-hypertension` (저항성만) |
| 만성질환 — 당뇨 | 🔴 **공백** | 약물(GLP-1·SGLT-2)만 있고 질환 엔트리 없음 |
| 만성질환 — 이상지질혈증 | 🔴 **공백** | — |
| 만성질환 — 비만 | 🟢 강함 | `obesity`, GLP-1 약물 4종, `glp1-selection-strategy` |
| 만성질환 — CKD | 🟢 있음 | `CKD`, `ckd-monitoring` |
| **생활습관 의학** | 🔴 **공백** | scope.md 2026-04-23 추가 — 운동·수면·스트레스·식이·절주·금연. 가정의학 핵심 무기. smoking-cessation·obesity 단백질 ABC 부속만 존재 |
| 호흡기 — 감기·천식·COPD·폐렴·기관지염·만성기침 | 🔴 **전면 공백** | — |
| 소화기 — GERD·위염·궤양·IBS·장염·변비·설사·치질·지방간·담석·췌장염 | 🔴 **전면 공백** | `LPR`이 인접하지만 GERD 본체는 없음 |
| **이비인후과** | 🟢🟢 강점 | BPPV·dizziness·LPR·dysphonia·hyposmia·oral-lesion·burning-mouth·dry-mouth·low-freq-hearing-loss·neck-mass (10건) |
| 근골격·통증 — 요통·경추통·관절통·관절염·통풍·만성통증 | 🔴 **전면 공백** | — |
| 건강검진 — 암 스크리닝·결과 상담 | 🔴 **공백** | — (우울 스크리닝만 별도) |
| **예방접종** | 🟢🟢 완벽 | 9개 백신·간격·성인 요약·NIP·ACIP 전부 |

### Tier 2 — 자주 만난다

| 분야 | 커버리지 | 엔트리 |
|---|---|---|
| 심혈관 | 🟡 부분 | `heart-failure`, `heart-failure-referral`, `resistant-hypertension` (부정맥·흉통·협심증·PAD 등 공백) |
| 신경과 | 🟡 매우 부분 | `dizziness`만 (두통·치매·파킨슨·뇌졸중·안면신경마비·뇌전증 전부 공백) |
| 정신건강 | 🟡 부분 | `depression-screening`, `smoking-cessation` (불안·공황·불면·ADHD 공백) |
| 내분비 | 🟡 부분 | 비만·GLP-1만 (갑상선·골다공증·당뇨 본체 공백) |
| 피부과 | 🟡 부분 | `urticaria`만 (악성 병변 감별·피부감염·습진 공백) |
| 비뇨의학 | 🔴 거의 공백 | SGLT-2 UTI 부속만 (UTI 본체·전립선·배뇨장애·성기능 공백) |
| 노인의학 | 🔴 **공백** | — |
| 부인과 | 🟡 부분 | `vte-hormone-therapy`(HRT/COC/GAHT) (갱년기·월경이상 공백) |

### Tier 3 — 기본은 안다

| 분야 | 커버리지 | 엔트리 |
|---|---|---|
| 응급 | 🟡 부분 | `neffy`(아나필락시스) (기타 응급 공백) |
| 일반외상 | 🟡 부분 | tdap 외상 상처 기준만 |
| 소아 | 🔴 **공백** | — |
| 완화의학 | 🔴 **공백** | — |
| **초음파 진단·인터벤션** | 🔴 **공백** | scope.md 2026-04-23 추가 — POCUS·근골격·연부조직·갑상선 + 봉사활동·저자원 환경(엑스레이 부재)에서 handy tool |

### Tier 4 — 폐지 (2026-04-24)
Tier 4 전체 제거. 학습 우선순위 체계를 Tier 1~3에 집중.

### 🎯 Scope 커버리지 요약
- **강점 영역 2개**: 이비인후과 10건 / 예방접종 10건 → **합쳐서 전체의 ~48%**
- **GLP-1/비만 축**: 8건 (의심 없이 핵심 관심 영역)
- **Tier 1 중 전면 공백**: 호흡기 · 소화기 · 근골격 · 건강검진 · 당뇨 본체 · 이상지질혈증
- **Tier 2 거의 공백**: 노인의학 · 비뇨의학 대부분
- **Tier 3~4 거의 전무**

---

## 4. 태그 분포 (대략)

| 태그 | 추정 엔트리 수 | 의미 |
|---|---|---|
| `[CLINICAL]` | ~30 | 주요 처방·치료·진단 근거 |
| `[CLINICAL — 조건부]` | ~8 | 초록 기반 or 부분 지지 |
| `[REGULATORY]` | ~5 | 급여·법적·국가 지침 |
| `[TIPS]` | ~15 (중복) | 교수님·원장님·ENT 경험치 |
| `[INSIGHTS]` | ~3 | 리뷰·트렌드 |

**TIPS 출처 명시 (Attribution)**: 대부분 `by 로컬원장님`, `by ENT교수`, `by FM교수님` 명시됨 (2026-04-14 규칙 적용 후).

---

## 5. Parent-Child 관계 (현재 알려진)

현재 `parents[]` 필드로 연결된 구조 (B2 schema 도입 후):

```
vaccination (parent)
  ├─ tdap
  ├─ herpes-zoster-vaccine
  ├─ pneumococcal-vaccine
  ├─ hpv-vaccine
  ├─ hepatitis-ab-vaccine
  ├─ japanese-encephalitis-vaccine
  ├─ rabies-vaccine
  ├─ varicella-mmr-polio-vaccine
  ├─ vaccine-interval (topic)
  └─ adult-vaccination-summary (topic)

heart-failure (parent)
  └─ heart-failure-referral (topic)

dizziness (parent, 추정)
  ├─ BPPV
  └─ low-freq-hearing-loss (?)

obesity (연관, parent 관계는 미명시)
  ⟷ wegovy, mounjaro, ozempic (drug)
  ⟷ glp1-selection-strategy (topic)
```

**현재 한계**: parent 관계만 있고 `coprescribe`·`contraindicate`·`synergy` 같은 횡적 관계는 아직 없음 → Wave 1 R2(relations[]) 도입 후 채워질 영역.

---

## 6. Freshness (신선도) 신호

`freshness.primarySourceYear` 필드는 Wave 1 R1로 도입 예정. 현재는 엔트리 본문의 primary source 연도를 눈대중:

| 연도 | 대략 엔트리 수 | 대표 |
|---|---|---|
| 2026 | ~12 | 최근 추가물 (4월 대량) |
| 2024~2025 | ~20 | 주요 가이드라인 (ACIP·KDCA·AFP 2024~2026) |
| 2021~2023 | ~5 | heart-failure 학회지침 2022 등 |
| ~2020 이전 | ~3 | pilocarpine NEJM 1993 등 |

**전반적으로 신선**. 5년 이상 된 소스 비중 낮음 (pilocarpine 용량·ZVL 2020 단종 언급 정도).

---

## 7. 공백 영역 (즉시 인지해야 할 gap)

scope.md 대비 **Tier 1에서 전면 공백인 영역** (우선순위 순):

### 🔴 최우선 공백 (Tier 1 매일 쓰는 분야)
1. **생활습관 의학** — 운동·수면·스트레스·식이·절주·금연 (가정의학 핵심 무기)
2. **호흡기 전체** — 감기·천식·COPD·폐렴 등 외래 최다 CC 축
3. **소화기 전체** — GERD 본체·IBS·변비·설사·치질·지방간 등
4. **근골격·통증 전체** — 요통·경추통·관절통·통풍
5. **당뇨 본체** — 약물 side만 있고 질환 관리·합병증·HbA1c 전략 없음
6. **이상지질혈증** — statin·non-statin 선택·검사 주기 없음
7. **건강검진 상담** — 암 스크리닝 결과 해석·권고

### 🟡 준공백 (Tier 2 자주 만나는)
8. **비뇨의학** — UTI·전립선·배뇨장애
9. **노인의학** — 노쇠·낙상·다약제·인지기능
10. **정신건강** — 불안·공황·불면 (우울만 있음)
11. **피부과** — 악성 병변 감별·피부감염
12. **갱년기·월경이상** — HRT만 있고 갱년기 본체·월경장애 없음

### 🟢 보강 여지 (이미 있지만 확장 가능)
- **여행의학**: `hepatitis-ab-vaccine`·`japanese-encephalitis-vaccine`·`rabies-vaccine`은 있지만 **여행지별 권고 조합**(인도·동남아·아프리카 등) 없음 → 2026-04-23 Boss 보고서 N1 권고 대상
- **연령별 백신 선제 권고**: 백신별 파일은 완비, 나이 window 기반 "60세 대상포진 cue" 같은 **trigger 규칙**은 공백 (knowledge 아닌 규칙 공백)

### 🆕 신규 우선 영역 (2026-04-23 scope.md 추가)
- **초음파 진단·인터벤션** (Tier 3): POCUS·근골격·연부조직·갑상선 진단 + 술기. 봉사활동·저자원 환경에서 엑스레이 없을 때 handy tool. 엔트리 0건.
- **생활습관 의학** (Tier 1): 운동·수면·스트레스·식이·절주·금연 개별 주제. smoking-cessation 외 전무.

---

## 8. 네비게이션 가이드

### 찾는 게 어디에 있나?

| 찾는 것 | 경로 |
|---|---|
| 백신 권고 (특정 백신) | `by-drug/[백신명]-vaccine.md` |
| 백신 전체 권고 요약 | `guidelines/adult-vaccination-summary.md` |
| 백신 접종 간격 규칙 | `by-drug/vaccine-interval.md` |
| 어지럼증 환자 대응 | `by-disease/dizziness.md` → BPPV 의심 시 `BPPV.md` |
| 비만 환자 초진~처방 | `by-disease/obesity.md` + `by-drug/glp1-selection-strategy.md` |
| GLP-1 약물 선택 | `by-drug/glp1-selection-strategy.md` (위고비 vs 마운자로) |
| 심부전 의뢰 판단 | `guidelines/heart-failure-referral.md` (6시점 + I NEED HELP) |
| 구강 문제 | `by-disease/oral-lesion.md` / `burning-mouth.md` / `dry-mouth.md` |
| LPR·쉰목소리·코막힘 | `by-disease/LPR.md` · `dysphonia.md` · `hyposmia.md` |
| 우울 스크리닝 | `by-disease/depression-screening.md` |
| 금연 | `by-disease/smoking-cessation.md` |
| 두드러기 | `by-disease/urticaria.md` (4배 증량 프로토콜 포함) |
| HRT·성호르몬 VTE 평가 | `by-disease/vte-hormone-therapy.md` |
| AFP TOP 20 요약 | `guidelines/afp-top20-poems-2024.md` |

### 메타 파일 (운영)
- 전체 목록 한줄 요약: `knowledge/index.md`
- 추가 이력: `knowledge/log.md`
- 임상 학습 우선순위: `knowledge/scope.md`
- 섹션 표준 18개: `knowledge/section-vocabulary.md`
- 출처 규칙 3-tier: `knowledge/sourcing-rules.md`

---

## 9. 이 지도의 한계

- **자동 생성 아님**: 수동 작성. `log.md`·`index.md`·`scope.md` 교차 참조로 구성.
- **관계(relations) 정보 얕음**: Wave 1 R2 도입 전이라 횡적 관계(coprescribe·contraindicate 등) 미반영.
- **Freshness 정량화 없음**: Wave 1 R1 `freshness.primarySourceYear` 도입 후에야 정확 분포 가능.
- **승격 상태 축 없음**: 3층위 reframe 채택 시 "A 학습 / C 승격(상용구·약속처방) / B 노출" 축이 추가될 수 있음.
- **갱신 타이밍**: 새 ingest마다 지도가 자동 갱신되지 않음 → 최근 ingest가 많이 몰린 시점에 수동 재생성 또는 Mapper routine 신설 필요.

---

## 10. 관련 브레인스토밍

이 지도는 `sessions/2026-04-23-knowledge-visibility-brainstorm.md`에서 **갈래 2 (정적 MAP.md)**로 선택된 실험 결과물이다.

- 유효하다면: Mapper routine 신설 검토 (Wave 1~2 완료 후)
- 부족하다면: 갈래 1 (Obsidian + wikilinks) 재시도 — Wave 1 R2 완료 후 자연스럽게 경로 열림
- 3층위 reframe 채택 시: A층 전용 도구로 격상 (B층 오염 금지)
