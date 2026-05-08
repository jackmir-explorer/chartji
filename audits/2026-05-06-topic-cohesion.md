# Bundle 주제 부조화 감사 — 2026-05-06

배경: 2026-05-06 미르가 `heart-failure-volume-overload` entry에 HFpEF+비만 체중감량 protocol이 잘못 합쳐져 있음을 발견 (commit 57ef79e로 정화). pre-existing dirty data + Liby가 이전 ingest에서 "보완 누적"을 같은 entry에 잘못 추가한 사례. 재발 방지를 위해 bundle 전수 audit 실시.

스캔 범위: `src/knowledge-bundle.js` 전 entry. 별칭(alias) 제외 unique 정의 약 130개 (`KNOWLEDGE_BUNDLE[...] = _xxx_v2` 약 454건 중 var 정의 기준).

휴리스틱: 주석 자백 문구(`+`, `통합`, `별도 topic 키로 격리`, `보완 누적`, `합본`, `보강`) + primarySources 도메인 분기 + keywords 이질성 + sections 키 이름의 주제 분기.

---

## 🔴 Tier 1 (즉시 분리 권고)

### 1. `palliative-pain` (line 4243~4308, `_palliative_pain_v2_full`)
주석: `palliative-pain v2 보강 — 임종기 deprescribing·암성 신경병증·AFP EOL (5-2·5-4 cron)`
근거:
- definition 본문이 자백: "완화의료 영역은 부프레노르핀 외에도 임종기 deprescribing·암성 신경병증·AFP 가정의학과 EOL 관리 **통합**"
- primarySources 4건이 서로 다른 주제 (Jose 2025 부프레노르핀 진통 / Thorpe 2026 LBM deprescribing / Koike 2026 corticosteroid 신경병증 통증 / McGregor 2025 AFP EOL 종합)
- keywords 도메인 혼재: 약물(buprenorphine) + 처방행위(deprescribing) + 증상(neuropathic pain) + 시기(EOL)
- sections 키 분기: `protocol`/`comparison`(부프레노르핀 약리) vs `eol-deprescribing`(LBM 중단) vs `cancer-neuropathic-pain`(스테로이드 반응 예측) vs `afp-eol-management`(증상별 처방)

분리 제안:
- `palliative-pain` (본 entry) → 부프레노르핀 약리 진통만 유지 (definition 후반부 정화 + protocol/comparison/precaution/notes)
- 신규 `eol-deprescribing` topic entry → Thorpe 2026 + 관련 LBM 섹션 이전
- 신규 `cancer-neuropathic-pain-steroid` topic entry → Koike 2026 + cancer-neuropathic-pain 섹션 이전
- 신규 `afp-eol-symptom-management` topic entry → McGregor AFP 2025 + afp-eol-management 섹션 이전 (counseling INSIGHTS 포함 가능)

### 2. `glp1-selection-strategy` v2_full (line 4783~4814, **중복 정의 + 주제 확장**)
주석: `glp1-selection-strategy v2 보강 — 암 위험 메타분석 (5-4 cron)`
근거:
- **bundle.js에서 동일 키 `glp1-selection-strategy`가 2번 할당**: line 2967 `_glp1_strategy_v2` (선택 전략) → line 4811 `_glp1_strategy_v2_full` (암 위험·SGLT-2 비교·NAION)로 **덮어씀**. 4811 시점에서 선택 전략 본문 전부 손실. 별도 사건 (Tier 1 즉시 보고).
- v2_full 본체도 keywords가 cancer-risk·갑상선암·췌장암·유방암 등 새 도메인 + NAION 시야부작용 + SGLT-2 비교를 한 entry에 혼재
- primarySources 2건이 서로 다른 주제 (Escudero 2025 endocrinology update / Ko 2025 cancer-risk meta)

분리 제안:
- 즉시 조치: 4811의 덮어쓰기 사건 자체가 치명적 — line 2967 v2(선택 전략)와 line 4811 v2_full(암 위험)이 **동일 키로 충돌**. 한 쪽을 살리고 다른 쪽은 신규 키로 분리해야 함
- 신규 `glp1-cancer-safety` topic → Ko 2025 메타 (notes 섹션) 이전
- 신규 `endocrinology-2025-update`로 흡수하거나 (이미 internal-medicine-2025-update에 endocrinology 섹션 있음 — 중복) Escudero NAION/SGLT-2 비교 섹션 이전
- `glp1-selection-strategy`는 line 2967 _v2 (선택 전략·중단 후 전환·SMI·전당뇨)만 유지

### 3. `internal-medicine-2025-update` (line 3415~3442, `_im_2025_v2`)
주석: `Cardiology + Endocrinology 2025 보완 합본 (4-30 deep-extract). 기존 키 본문 보존, 보완은 별도 topic으로 격리`
근거:
- 자백 문구 "**합본**" + notes 본문 "본 엔트리는 두 Ann Intern Med 2026 update 논문 합본"
- primarySources 2건이 명백히 다른 도메인 (Atalla 2026 cardiology / Endocrinology 2026)
- sections 키 자체가 주제 분기 선언: `cardiology`, `endocrinology`
- keywords 혼재: AF/mavacamten/aficamten(심장) + GLP-1/finerenone/SGLT-2(내분비)

분리 제안:
- `cardiology-2025-update` topic → cardiology 섹션 + Atalla PMID 이전
- `endocrinology-2025-update` topic → endocrinology 섹션 + Endocrinology PMID 이전
- 본 키는 alias로 두 entry 모두 가리키게 하거나 deprecate

---

## 🟡 Tier 2 (검토)

### 4. `obesity-pharmacotherapy-grade` (line 2994, `_obesity_grade_v2`)
주석: `기존 v1 "obesity"·"비만" 본문 보존, GRADE 권고 누적은 별도 topic 키로 격리`
- 격리 의도 자체는 정합 (v1 obesity와 분리된 topic entry). 단일 출처(Apovian PMID:41859682). sections이 GRADE 권고로 응집. 즉시 분리 불필요. **다만 향후 ingest로 비만 약물 일반론·동반질환 매칭이 추가되면 부조화 발생 가능 — 모니터링.**

### 5. `allergic-rhinitis` (line 2313, `_allergic_rhinitis_v2`)
주석: `ARIA 2024-2025 + 한국 외래 임상 패턴 (4-24 deep-extract + 4-30 ENT bulk)`
- "+" 신호 + 한국 임상 패턴(clinical-pattern)·NAR(nar-treatment)·cryotherapy(procedure)가 이질적이지만 상위 주제(allergic rhinitis) 응집은 유지. ARIA 가이드라인 + 한국 처방 TIPS + ClariFix 시술이 단일 질환 entry 안에서 공존하는 것은 정합 범위. **분리 권고 아님 — 다만 ENT bulk 추가분이 향후 더 누적되면 nar-treatment·procedure 분리 검토.**

### 6. `BPPV` (line 3735, `_bppv_v2`)
주석: `v1 → v2 마이그레이션 + 3일 f/u 보강 (4-30 ENT bulk)`
- 마이그레이션 + 보강이라 주제 응집. follow-up-schedule 신규 자유 섹션이 ENT 교수 TIPS이지만 BPPV 본 주제 안. 정합. 분리 불필요.

### 7. `CKD` v2_full (line 4675, `_ckd_v2_full`)
주석: `VA/DoD 2025 + Finerenone + KDIGO/AKIPS 통합 (5-2 cron)`
- "통합" 자백. primarySources 2건 (Scandrett BMJ 2026 cystatin C + Schwartz VA/DoD 2025 가이드라인). 두 출처 모두 CKD G3 management 단일 도메인 → 응집 OK. **단 Finerenone 약리·KDIGO 가이드라인 추가 누적되면 약물 entry 분리 후보.**

### 8. `MASH` v2 보강 / `frailty` v2 보강 (line 4709, 4745)
주석에 "보강" 명시. 검토 결과 둘 다 단일 가이드라인 보강(JAAPA 2025 / Ann IM ITC 2026)이라 주제 응집. 정합.

### 9. `dysphonia v2 보강` (line 3840) / `oral-lesion v2 보강` (line 3949) / `burning-mouth v2 보강` (line 3978) / `xerostomia v2 보강` (line 4004) / `neck-mass v2 보강` (line 4035)
ENT bulk 보강이지만 모두 단일 ENT 증상 entry 응집. 정합. 분리 불필요.

---

## 통계
- 전수 스캔: bundle.js 약 130개 unique 정의 (별칭 제외, 주석/comment 휴리스틱 + sections·keywords·primarySources 교차 점검)
- 🔴 Tier 1 (즉시 분리 권고): **3건** — palliative-pain, glp1-selection-strategy v2_full(중복 정의 + 주제 확장), internal-medicine-2025-update
- 🟡 Tier 2 (모니터링): **6건**

---

## 추가 발견 — 동일 키 중복 정의 (별도 사건)
`KNOWLEDGE_BUNDLE["glp1-selection-strategy"]`가 line 2967과 line 4811에서 **두 번 할당**, 후자가 전자를 덮어씀. 결과: line 2967 `_glp1_strategy_v2`의 선택 전략·SMI·전당뇨·tirzepatide 중단 등 sections이 런타임에서 접근 불가. line 4811 `_glp1_strategy_v2_full` (암 위험·NAION·SGLT-2 비교)만 노출. **사실상 데이터 손실** — 이는 Tier 1과 별개로 미르 결단 시급. (별칭 `GLP1전략`/`비만GLP-1`은 _v2를 가리키므로 그쪽으로는 접근 가능, 하지만 메인 키는 v2_full로 고정.)

---

## 미르 결단 필요
1. Tier 1 3건 (palliative-pain·glp1-selection-strategy·internal-medicine-2025-update) 다음 세션에 분할 작업 진행할지
2. `glp1-selection-strategy` 키 중복 할당 — line 2967 v2를 살리고 4811 v2_full을 신규 키로 옮길지, 두 entry를 합본해 sections를 모두 보유할지
3. 분할 시 작업 순서 (palliative-pain 가장 큰 분기 — 4 sub-entry 후보)

---

## 2026-05-07 후속 처리 (overwrite-fix)

추가 발견(line 88-89) 동일 패턴이 **8개 entry 그룹 / 20건** 더 있음을 확인. 미르 결단 A (일괄 수정) 적용.

| 그룹 | 결단 | 메모 |
|---|---|---|
| xerostomia | (c) v2 폐기 | v2_full이 상위집합 |
| BMS | (c) v2 폐기 | v2_full이 상위집합 |
| CKD | (b) 분리 | _ckd_monitoring_v2(topic) vs _ckd_v2_full(disease) 분리 라우팅 |
| MASH | (a) 통합 | v2의 GLP-1 네트워크 메타를 v2_full에 흡수 |
| frailty | (a) 통합 | v2(topic)의 회복률·5단계 중재를 v2_full(disease)에 흡수 |
| HF-POCUS-DUCS | (a) 통합 | v2의 protocol을 v2_full(disease, parents=hf)에 흡수 |
| 침샘염 alias | (c) 부분 폐기 | salivary-stones에서 제거, parotitis 단일 라우팅 |
| 편두통 alias | (c) 부분 폐기 | headache에서 제거(keywords 포함), migraine 단일 라우팅 |

상세: `sessions/2026-05-07-overwrite-fix.md`, 변환 로그: `/tmp/overwrite-fix-log.txt`.

검증:
- 키 중복 hard-check: 0건 (이전 20건)
- syntax: OK
- PMID 보존: 127개 = 127개 (0 손실)

재발 방지:
- `agents/auditor.md` — 키 중복 hard-check 항목 신설
- `agents/librarian.md` — "동일 키 재할당 금지" 절대 금지 신설
- `skills/knowledge-ingest/SKILL.md` — Step 7 직전 grep 체크 신설
