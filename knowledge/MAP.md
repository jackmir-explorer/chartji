# knowledge/MAP.md — 지식 베이스 지도

tags: [META]
updated: 2026-05-08
generated: 수동 (추후 Mapper routine화 가능)
목적: **"지금 knowledge에 뭐가 있고 어디가 비어있는지"** 한 눈에 보기

---

## 🔎 핵심 요약 (한 줄)

**144개 고유 md 엔트리** (by-disease 109 · by-drug 20 · guidelines 15) + bundle **177 unique entry objects** (601 alias keys). **이비인후과·예방접종·GLP-1 강점 + 만성질환 본체 진입 + 완화의학·노인의학·POCUS 신설**. 4월말~5월 폭발적 성장 (42→144, 3.4배).

---

## 1. 엔트리 분포

| 카테고리                  | md 파일      | 비고                                                            |
| --------------------- | ---------- | ------------------------------------------------------------- |
| **by-disease/**       | 109        | 질환·증상 메인 저장소 (5월 78건 추가)                                      |
| **by-drug/**          | 20         | 약물·백신                                                         |
| **guidelines/**       | 15         | 공식 가이드·요약·CLINICAL/REGULATORY/INSIGHTS/TIPS                   |
| **myth-log/**         | 2          | 의학적 myth 학습 자원 (inject 격리)                                    |
| **메타 (root)**         | 6          | 운영 파일 (MAP·index·log·scope·sourcing-rules·section-vocabulary) |
| **합계**                | **152 md** |                                                               |
| Bundle unique objects | 177        | topic alias·deep-extract 흡수분 포함                               |
| Bundle alias keys     | 601        | 영문/한글/약어 다중 등록                                                |

### kind 분포 (bundle)
- disease: 109 / topic: 53 / drug: 15

---

## 2. 최근 활동 (2026-04-25 ~ 05-08, 2주)

| 날짜 | 추가/수정 건수 | 주요 테마 |
|---|---|---|
| 2026-05-08 | **20+ entry 변경** | Liby final ingest — 신규 14 (백신 7·heel-pain·persistent-physical-symptoms·pocus-focus-cardiac·adult-vax-summary·afp-poems-2025-dec) + 재컴파일 8 + Tier 1 분할 (palliative-pain·IM-2025-update) + 키 중복 20건 일괄 수습 |
| 2026-05-07 | 13 entry | deep-extract — ACB·PECARN 신생아발열·경증천식 외 7건 + post-split bundle 동기화 (heart-failure 5 sub-entry 흡수, alcohol-use-disorder 신규 ingest) |
| 2026-05-06 | **대규모** | knowledge search Phase 1 신설 + 5-D batch 256 wikilinks + heart-failure / glp1-selection-strategy 분할 + heart-failure-volume-overload 정화 + Auditor 7군 권고 |
| 2026-05-04 | 다수 | scout routine + 5-D 후행 |
| 2026-05-02 | 5건 | EOL deprescribing·dementia-eol·기타 cron |
| 2026-04-30 | 12+건 | ENT bulk (otitis-externa·meniere·sudden-hearing-loss·vestibular-neuritis·laryngitis·thyroid-fna-cnb·salivary-gland-stones·epistaxis 신규) |
| 2026-04-29 | scope.md Tier 1 선언 | 임상 핵심영역 8개 명문화 |
| 2026-04-28 | 8건 | HFpEF+비만·POCUS DUCS·Volume Overload·심부전 보강 |
| 2026-04-27 | 5건 | Volume Overload BNP+POCUS·obesity GRADE·기타 |
| 2026-04-26 | 4건 | ENT 보강·기타 |

**경향**: **2주 만에 100+ entry 추가** (4-23 시점 42 → 5-8 시점 144). 5-D auto-wikilinks 적용으로 옵시디언 그래프 가치 6.6배 증가 (60→385+).

---

## 3. 임상 Scope 커버리지 (scope.md 기준)

### Tier 1 — 매일 쓴다 (가장 중요)

| 분야 | 커버리지 | 엔트리 |
|---|---|---|
| 만성질환 — 고혈압 | 🟢 진입 | `hypertension`·`home-based-hypertension`·`resistant-hypertension` |
| 만성질환 — 당뇨 | 🟢 본체 진입 | `diabetes`·`diabetes-dyslipidemia`·`diabetic-peripheral-neuropathy` + GLP-1·SGLT-2·CGM 약물 |
| 만성질환 — 이상지질혈증 | 🟢 진입 | `dyslipidemia` |
| 만성질환 — 비만 | 🟢🟢 강함 | `obesity` + GLP-1 약물 4종 + `glp1-selection-strategy` + `glp1-safety-comparison` |
| 만성질환 — CKD | 🟢🟢 강함 | `CKD` v2 (VA/DoD CPG·SGLT2·finerenone) + `ckd-monitoring` + `proteinuria` |
| 만성질환 — 갑상선 | 🟡 부분 | `thyroid-disorder`·`thyroid-fna-cnb` |
| **생활습관 의학** | 🟡 부분 | `smoking-cessation`·`alcohol-use-disorder` (운동·수면·식이 본체는 공백) |
| 호흡기 — 천식·COPD·기관지염·만성기침 | 🟢 진입 | `asthma`·`COPD`·`chronic-cough`·`sinusitis`·`allergic-rhinitis` |
| 소화기 — GERD·IBS·기능성소화불량·담석·지방간 | 🟢 진입 | `LPR`·`functional-dyspepsia`·`ibs`·`gallstones`·`MASH` |
| **이비인후과** | 🟢🟢🟢 압도 | 20+ 엔트리 (BPPV·dizziness·hearing-loss·sudden-hearing-loss·vestibular-neuritis·meniere·tinnitus·hyposmia·dry-mouth·burning-mouth·oral-lesion·dysphonia·neck-mass·otitis-externa·laryngitis·salivary-gland-stones·parotitis-differential·epistaxis·sleep-apnea·low-freq-hearing-loss) |
| 근골격·통증 — 요통·관절·통증 | 🟢 진입 | `low-back-pain`·`ankle-sprain`·`carpal-tunnel-syndrome`·`msk-injection-therapy`·`heel-pain`·`chronic-pain-integrative` |
| 암 스크리닝 | 🟢 진입 | `cervical-cancer-screening`·`colorectal-cancer-screening` (위·간 공백) |
| **예방접종** | 🟢🟢🟢 완벽 | 7개 백신 + `vaccination`·`adult-vaccination-summary`·`travel-vaccination`·`vaccine-interval` |

### Tier 2 — 자주 만난다

| 분야 | 커버리지 | 엔트리 |
|---|---|---|
| 심혈관 | 🟢 강함 | `heart-failure` + 5 sub-entry (monitoring·gdmt-dosing·pocus-ducs·hfpef-obesity·cardiology-2025-update) + `cardiomyopathy`·`cardiac-rehabilitation`·`post-mi-deprescribing`·`ischemic-stroke-prevention`·`doac-elderly`·`cardiology-2025-update` |
| 신경 | 🟡 진입 | `headache`·`migraine`·`concussion`·`paresthesia` (치매·파킨슨·뇌전증 공백) |
| 정신건강 | 🟡 진입 | `depression-screening`·`anxiety-depression-cbt` (불안·공황·불면·ADHD 공백) |
| 내분비 | 🟢 강함 | 비만·GLP-1·당뇨·갑상선·`endocrinology-2025-update` (당뇨·이상지질혈증 본체 진입 완료) |
| 피부 | 🟡 부분 | `urticaria`만 |
| 비뇨 | 🟡 진입 | `recurrent-uti`·`hematuria`·`nocturia`·`proteinuria` (전립선·배뇨장애·성기능 공백) |
| **노인의학** | 🟢 진입 | `frailty`·`geriatric-assessment-4ms`·`anticholinergic-burden`·`prescribing-cascade`·`eol-deprescribing`·`osteoporosis`·`doac-elderly` (5월 신설 영역) |
| 부인과 | 🟡 진입 | `menopause`·`preconception-screening`·`sex-hormone-vte-risk`·`vte-hormone-therapy` |
| 혈액 | 🟡 부분 | `anemia`·`multiple-myeloma` |

### Tier 3 — 기본은 안다

| 분야              | 커버리지    | 엔트리                                                                                                                                                               |
| --------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 응급              | 🟡 부분   | `neffy`(아나필락시스)·`epistaxis` (기타 공백)                                                                                                                               |
| 일반외상            | 🟡 부분   | `tdap`(파상풍)·`ankle-sprain`                                                                                                                                        |
| 소아              | 🟢 진입   | `croup`·`neonatal-fever-pecarn`·`pediatric-antibiotic-stewardship`·`meningitis` (5월 추가)                                                                           |
| **완화의학**        | 🟢🟢 강함 | `palliative-pain`·`eol-deprescribing`·`afp-eol-symptom-management`·`cancer-fatigue`·`cancer-neuropathic-pain-steroid`·`goals-of-care-acp` (Tier 1 분할로 6 entry 완성) |
| **초음파 진단·인터벤션** | 🟢 진입   | `pocus-abdominal`·`pocus-lung`·`pocus-focus-cardiac`·`pocus-primary-care-efsumb`·`heart-failure-pocus-ducs` (5건)                                                  |
| 감염              | 🟡 부분   | `covid-outpatient-antivirals`·`hepatitis-b`·`pediatric-antibiotic-stewardship`                                                                                    |
| 기타              | 🟡 부분   | `unintentional-weight-loss`·`persistent-physical-symptoms`·`continuity-of-care`·`delayed-diagnosis`·`fatigue` (가정의학 메타)                                           |

### 🎯 Scope 커버리지 요약 (4-23 → 5-8 변화)
- **이비인후과**: 10 → **20+** (압도적 강점)
- **예방접종**: 10 → **11+** (완벽 유지 + adult-summary 통합)
- **GLP-1/비만 축**: 8 → **15+** (selection-strategy 분할 + safety-comparison + AUD/SMI/prediabetes/cancer-risk)
- **심부전 축**: 2 → **8** (5 sub-entry 분할)
- **노인의학**: 0 → **7** (신설)
- **완화의학**: 0 → **6** (신설, Tier 1 분할로 정합)
- **POCUS**: 0 → **5** (신설)
- **암 스크리닝**: 0 → 2 (cervical·colorectal)
- **만성질환 본체 진입**: 당뇨·이상지질혈증·갑상선 모두 entry 생성
- **호흡기·소화기 진입**: 5 + 5 = 10 entry (이전 0)

**남은 공백**: 피부 (urticaria만)·정신건강 (불면·불안·공황 등)·비뇨 (전립선·배뇨장애)·갱년기 본체

---

## 4. 태그 분포 (대략)

| 태그 | 추정 엔트리 수 | 의미 |
|---|---|---|
| `[CLINICAL]` | ~120 | 주요 처방·치료·진단 근거 |
| `[CLINICAL — 조건부]` | ~25 | 초록 기반 or 부분 지지 |
| `[REGULATORY]` | ~10 | 급여·법적·국가 지침 |
| `[TIPS]` | ~30 (중복) | 교수님·원장님·ENT 경험치 |
| `[INSIGHTS]` | ~15 | 리뷰·트렌드·POEMS |

**TIPS 출처 명시**: `by 로컬원장님`·`by ENT교수`·`by FM교수님`·`by 미르` 명시 (2026-04-14 규칙 적용 후 일관).

---

## 5. Parent-Child 관계 (B2 schema)

```
heart-failure (parent)
  ├─ heart-failure-monitoring
  ├─ heart-failure-gdmt-dosing
  ├─ heart-failure-pocus-ducs
  ├─ heart-failure-hfpef-obesity
  ├─ heart-failure-cardiology-2025-update
  ├─ heart-failure-volume-overload (topic)
  └─ heart-failure-referral (guideline)

vaccination (parent)
  ├─ tdap·herpes-zoster·pneumococcal·hpv·hepatitis-ab·jev·rabies·varicella-mmr-polio
  ├─ vaccine-interval (topic)
  └─ adult-vaccination-summary (topic)

palliative-pain (parent)
  ├─ eol-deprescribing
  ├─ cancer-neuropathic-pain-steroid
  ├─ afp-eol-symptom-management
  └─ cancer-fatigue (관련)

obesity ⟷ wegovy·mounjaro·zepbound·ozempic ⟷ glp1-selection-strategy ⟷ glp1-safety-comparison

dizziness (parent)
  ├─ BPPV·meniere·vestibular-neuritis·sudden-hearing-loss·tinnitus·low-freq-hearing-loss

CKD (parent)
  ├─ ckd-monitoring (topic, UACR·UPCR)
  └─ proteinuria

frailty (parent, 추정)
  ├─ geriatric-assessment-4ms
  ├─ anticholinergic-burden
  ├─ prescribing-cascade
  └─ eol-deprescribing
```

**진전**: 5-D auto-wikilinks 256건 + 추가 47건 적용으로 본문 cross-link 가시화. 옵시디언 그래프뷰 즉시 활용 가능.

---

## 6. Freshness (신선도) 신호

| 연도 | 대략 엔트리 수 | 대표 |
|---|---|---|
| 2026 | ~70 | AI-FoCUS·PECARN·NEJM/JAMA 2026 등 (대규모 5월 deep-extract) |
| 2024~2025 | ~50 | ACIP·KDCA·AFP 2024~2026 |
| 2021~2023 | ~15 | 학회지침 2022·기존 v1 |
| ~2020 이전 | ~5 | pilocarpine NEJM 1993 등 |

**전반적으로 매우 신선**. 75% 이상이 최근 2년 내 출처.

---

## 7. 공백 영역 (즉시 인지해야 할 gap)

### 🔴 잔여 우선 공백
1. **정신건강 — 불면·불안·공황·ADHD** (depression-screening·anxiety-depression-cbt만)
2. **갱년기 증상 본체** (HRT·VTE risk만 있고 vasomotor·뼈건강·성건강 본체 없음)
3. **비뇨의학 — 전립선·배뇨장애·성기능** (UTI·hematuria·nocturia·proteinuria만)
4. **피부과 — 악성 병변 감별·피부감염·습진** (urticaria만)
5. **생활습관 의학 본체 — 운동·수면·식이·스트레스** (smoking·AUD만)

### 🟡 보강 여지
- **여행의학 권고 조합** (특정 백신은 있으나 여행지별 조합 없음)
- **연령별 백신 trigger 규칙** (knowledge 아닌 규칙 영역)
- **위·간·췌장암 스크리닝** (cervical·colorectal만)

### 🟢 강점 영역 — 추가 보강은 신중
- 이비인후과 20+ (과집중 — 새 영역 우선)
- 예방접종 11+ (완벽)
- GLP-1/비만 15+
- 심부전 축 8
- 완화의학 6 (Tier 1 분할 후 정합)

---

## 8. 네비게이션 가이드

### 찾는 게 어디에 있나?

| 찾는 것 | 경로 |
|---|---|
| **검색 (모든 엔트리)** | 차트지 검색 모드 (🔍 Knowledge) — wikilinks 클릭 점프 가능 |
| 백신 권고 (특정 백신) | `by-drug/[백신명]-vaccine.md` 또는 차트지 검색 |
| 백신 전체 권고 요약 | `guidelines/adult-vaccination-summary.md` |
| 어지럼증 환자 대응 | `by-disease/dizziness.md` → BPPV/meniere/vestibular-neuritis/sudden-hearing-loss |
| 비만 환자 초진~처방 | `by-disease/obesity.md` + `by-drug/glp1-selection-strategy.md` (선택 전략) + `glp1-safety-comparison` (안전성) |
| 심부전 통합 관리 | `heart-failure` 본체 + 5 sub-entry (monitoring·dosing·pocus·hfpef·2025-update) + `heart-failure-referral` |
| 노쇠·다약제·인지 | `frailty`·`geriatric-assessment-4ms`·`anticholinergic-burden`·`prescribing-cascade` |
| 임종기·완화 통증 | `palliative-pain` (부프레노르핀 본연) + `eol-deprescribing`·`afp-eol-symptom-management`·`cancer-neuropathic-pain-steroid`·`goals-of-care-acp` |
| 만성통증 비약물 | `chronic-pain-integrative`·`low-back-pain`·`heel-pain`·`carpal-tunnel-syndrome` |
| POCUS 술기 | `pocus-primary-care-efsumb` (개관) + `pocus-abdominal`·`pocus-lung`·`pocus-focus-cardiac` |
| 우울·불안 스크리닝 | `depression-screening`·`anxiety-depression-cbt` |
| 흉통·심전도 후 처방 | `heart-failure`·`post-mi-deprescribing`·`doac-elderly`·`cardiology-2025-update` |
| 신생아 발열 | `neonatal-fever-pecarn` (PECARN 룰) |
| GERD vs LPR vs 천식 | `LPR` + `asthma-reflux-comorbidity` (guideline) + `functional-dyspepsia` |
| HRT·성호르몬 VTE 평가 | `vte-hormone-therapy`·`sex-hormone-vte-risk`·`menopause` |
| AFP TOP 20 / POEMS | `afp-top20-poems-2024`·`afp-poems-2025-dec` |
| 1차의료 top 20 (2024) | `primary-care-top20-2024` |

### 메타 파일 (운영)
- 전체 목록 한줄 요약: `knowledge/index.md`
- 추가 이력: `knowledge/log.md`
- 임상 학습 우선순위: `knowledge/scope.md` (Mir-Tier 1 영역)
- 섹션 표준 18개: `knowledge/section-vocabulary.md`
- 출처 규칙 3-tier: `knowledge/sourcing-rules.md`

---

## 9. 이 지도의 한계

- **자동 생성 아님**: 수동 작성. log.md·index.md·scope.md 교차 참조로 구성. 다음 갱신은 **새로운 entry 30+건 추가 시점**에.
- **bundle vs md 불일치**: bundle 177 unique objects vs md 144 — 차이 33은 topic alias·deep-extract 흡수분 (bundle에만 존재).
- **Freshness 정량화**: bundle entry frontmatter `freshness.primarySourceYear` 도입은 미래 작업.
- **갱신 타이밍**: 현재는 미르 수동 호출 시 갱신. Mapper routine 신설 검토 가능.

---

## 10. 최근 룰 보강 (2026-05-06~08)

진단부 사고 재발 방지 룰 7개 신설:
1. **§5-D.1 token-target priority** (cross-keyword 오변환 차단)
2. **거대 파일 분할 권한** Auditor 이관 (이해충돌 해소)
3. **Liby 거대 파일 분할 금지**
4. **기존 entry에 이질 주제 추가 금지** (heart-failure-volume-overload 사건 후속)
5. **신규 ingest 시 주제 정합성 체크** 5단계
6. **entry 주제 부조화 감사** (Auditor)
7. **키 중복 할당 hard-check** (palliative-pain·glp1·xerostomia 등 20건 사건 후속)
8. **동일 키 재할당 금지** (Liby)
9. **ingest 직전 grep 사전 체크** (SKILL.md)
10. **CLAUDE.md "Liby ingest 절대 원칙"**: deep-extract 수정 md 재컴파일 누락 금지

---

## 11. 관련 브레인스토밍·세션

- 2026-04-23 갈래 선택: `sessions/2026-04-23-knowledge-visibility-brainstorm.md`
- 2026-05-06 검색 신설: `sessions/2026-05-06-knowledge-search-phase1.md`
- 2026-05-06 5-D batch 3 wave: `sessions/2026-05-06-5d-wave[1-3].md`
- 2026-05-06 거대 파일 분할: `sessions/2026-05-06-large-file-split.md`
- 2026-05-06 topic-cohesion 감사: `audits/2026-05-06-topic-cohesion.md`
- 2026-05-07 Tier 1 분할: `sessions/2026-05-07-tier1-split.md`
- 2026-05-07 키 중복 20건 수습: `sessions/2026-05-07-overwrite-fix.md`
- 2026-05-07 Liby cleanup: `sessions/2026-05-07-liby-cleanup.md`
- 2026-05-08 final ingest: `sessions/2026-05-08-liby-final-ingest.md`
