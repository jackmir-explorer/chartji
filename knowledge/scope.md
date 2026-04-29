# 일차의료 학습 스코프

tags: [META]
updated: 2026-04-29

---

## 핵심 원칙 (모든 분야에 관통)

> **"Horses를 잘 감별하고, Zebra를 놓치지 않고, RedFlag를 걸러내고, 이 환자에게 내 외래에서 뭘 해줄 수 있는지"**

| 원칙 | 의미 |
|------|------|
| Horses first | 흔한 질환부터 정확하게 |
| Zebra 놓치지 않기 | 심한 질병의 초기·약한 증상 |
| RedFlag 감별 | 놓치면 안 되는 위험 신호 |
| 내 외래에서 할 수 있는 것 | 진단적 치료, 일차 처치, 의뢰 판단 |

**우선순위 기반 학습** — 백과사전식 나열이 아닌, 임상 빈도와 위험도 기준으로 우선순위를 두고 학습한다.

---

## Mir-Tier 1 — Core Clinical Identity (2026-04-29 선언)

> source of truth: `~/.claude/projects/C--Users-sk-Desktop------Claude-chartji-dev/memory/user_clinical_focus.md`
> 본 섹션은 chartji 프로젝트 내 mirror. 핵심영역 변경 시 메모리 먼저 갱신.

| # | 영역 | 정의 | 세부 키워드 | Anchor 저널 |
|---|---|---|---|---|
| 1 | **POCUS·초음파 중재** | 근골격·복부·흉부(폐)·심장·갑상선·연부조직·혈관 진단·중재 | POCUS · ultrasound-guided injection · MSK ultrasound · lung ultrasound · POCUS B-lines · thyroid US · soft tissue US · vascular US | J Ultrasound Med · AFP |
| 2 | **비암성 만성통증·근골격** | 통증약물·신경병증·근골격 진찰·통증 중재 + opioid 법적·임상 경계 | chronic non-cancer pain · neuropathic pain · musculoskeletal exam · trigger point · pain intervention · opioid stewardship · CDC opioid guideline | Pain Medicine · AFP |
| 3 | **암성통증·완화의료 증상관리** | 임종기 호흡곤란·식욕부진·섬망 + Breaking bad news·ACP·가족 의사소통 | cancer pain · palliative care · end-of-life dyspnea · anorexia · delirium · breaking bad news · advance care planning · family meeting | J Pain Symptom Manage · AFP |
| 4 | **재택의료·노인의학** | 다약제·frailty·낙상·인지장애·가정 방문 모델 + 한국 시범사업·정식사업 정책 | home-based care · house call · frailty · falls prevention · MCI · 재택의료 시범사업 · long-term care | J Am Geriatr Soc · Drugs & Aging |
| 5 | **만성질환 본체 확장** | 당뇨·고혈압·이상지질·CKD + 갑상선·골다공증·비만/대사·지방간·빈혈 + 노인 다질환 통합 | type 2 diabetes · hypertension · dyslipidemia · CKD · thyroid · osteoporosis · obesity · MASLD · anemia · multimorbidity guideline | Ann Int Med ITC · NEJM Clinical Practice |
| 6 | **임상약물학·Deprescribing** | 상호작용·신기능 용량 + opioid stewardship·BZD tapering·anticholinergic burden | drug interaction · renal dose adjustment · deprescribing · BZD taper · anticholinergic burden · STOPP/START · polypharmacy | Drugs & Aging · BMJ Practice Pointers |
| 7 | **생활습관의학** | 운동·수면·스트레스·식이·절주·금연 (만성질환 예방·치료 근본) | exercise prescription · sleep hygiene · stress management · dietary intervention · alcohol counseling · smoking cessation | AFP · JAMA RCE |

### Mir-Tier 1 부속 — 횡단 모듈 (Tier 1과 동급)

| 모듈 | 정의 | 키워드 | Anchor 저널 |
|---|---|---|---|
| **A. 통증·완화·노인 정신건강** | 만성통증 + 우울/불안, 완화 + 적응장애, 노인 우울·섬망·인지 (1차 약물치료까지 본인 영역) | chronic pain depression · palliative adjustment disorder · geriatric depression · delirium management | J Pain Symptom Manage · J Am Geriatr Soc · AFP |
| **B. Communication & Counseling** | Motivational interviewing·Breaking bad news·Shared decision making·가족 면담 | motivational interviewing · breaking bad news · shared decision making · family meeting · serious illness conversation | NEJM Clinical Problem-Solving · JAMA Patient Page · AFP |
| **C. Diagnostic Reasoning** | NEJM Clinical Problem-Solving 류, 가정의학 본질로서의 진단 추론 | clinical problem solving · diagnostic reasoning · clinical pearls · diagnostic error | NEJM Clinical Problem-Solving · JAMA RCE · AFP |

---

## Tier 2 — 빈발 외래 (Mir-T1 보조, 2026-04-29 재편)

매일 라운드로빈 1슬롯 (8일 cycle):

| Day % 8 | 영역 | 비고 |
|---|---|---|
| 0 | 호흡기 | 감기·천식·COPD·폐렴·만성기침 (4-22~28 보강 활발 — 추가 탐색 시 빈도 낮춤) |
| 1 | 소화기 | GERD·IBS·기능성소화불량·간염·지방간·담석 (4-29 IBS·기능성소화불량 추가) |
| 2 | 이비인후과 | 비염·LPR·어지럼증·구강·청각 (4-22~28 강점 유지) |
| 3 | 내분비외 만성질환 | Mir-T1 5에 안 잡히는 보조 만성질환 |
| 4 | 비뇨·부인 기본 | UTI·전립선·배뇨장애 + 갱년기·월경이상·HRT |
| 5 | 예방접종·건강검진 | 성인·노인·여행·소아 백신 + 암 스크리닝·검진 결과 상담 |
| 6 | **외래응급** | **아나필락시스·저혈당·부정맥 초기·호흡곤란·의식소실·경련·열상 봉합·화상 1차 처치 (의뢰가 아닌 본인 처치 영역)** |
| 7 | 심혈관·신경 | 부정맥·흉통·심부전 / 두통·치매·뇌졸중·안면신경마비 |

---

## 기존 0순위 풀 → Mir 매핑 (4-29 patch 흡수)

4-29 patch에서 신설한 0순위 풀(피부·두통·갱년기·불면)은 Mir-Tier 1 재편으로 다음과 같이 흡수:

| 기존 0순위 영역 | Mir 매핑 위치 |
|---|---|
| 피부과 | Tier 2 (외래 만성 분야 — Day % 8 별도 배정 없음, Anchor 저널에서 자연 등장 + Tier 3 흡수) |
| 두통 | Mir-T1 부속 A (통증·완화·노인 정신건강 — 만성 두통 포함) + Tier 2 day=7 (심혈관·신경) |
| 갱년기·월경이상 | Tier 2 day=4 (비뇨·부인 기본) |
| 불면·수면 | Mir-T1 7) 생활습관의학 또는 부속 A (노인 수면장애) |

---

## Scout 적용 규칙 (2026-04-29 재편)

- **Mir-T1 7영역**: 매일 슬롯 보장 (총 7건 의무) — 발행 부족 시 Tier 2로 fallback + footer 기록
- **부속 횡단 모듈**: 3일 cycle (day%3==0 → A · ==1 → B · ==2 → C), 1슬롯
- **Tier 2**: 8일 cycle 라운드로빈, 1슬롯 (직전 7일 회피)
- **합계**: 기본 7 + 1 + 1 = 9건 (⭐ 8~10건 목표 안전 범위)
- **Anchor 저널**: 영역별 매핑 (위 표) — 매일 평균 7저널 검색
- **PMID 30일 차단** + 직전 2회 8건 미달 시 14일 자동 완화 (`routines/scout.md` Step 2-B)

---

## Tier 1 — 매일 쓴다 (legacy, 4-22~29 ingest 라벨 호환용 보존)

> ⚠ **DEPRECATED 2026-04-29** — Mir-Tier 1으로 대체. 4-22~29 누적 41⭐ 라벨링 호환을 위해 보존. 5-6 재검증 시 삭제 여부 재결정.

| 분야 | 일차의료 렌즈 |
|------|-------------|
| 만성질환 관리 | 고혈압·당뇨·이상지질혈증·비만·CKD — 가이드라인 업데이트 팔로우, 약물선택 기준·타깃·검사지표 변경 추적 |
| 생활습관 의학 | 운동·수면·스트레스·식이·절주·금연 — 만성질환 예방·치료의 근본. 환자교육·행동변화 개입 자체가 가정의학과 의사의 무기 |
| 호흡기 | 감기, 천식, COPD, 폐렴, 기관지염, 만성기침 |
| 소화기 | GERD, 위염, 위궤양, 기능성 소화불량, IBS, 장염, 변비, 설사, 치질, 지방간, 간염, 담석증, 췌장염 등 흔한 질환 |
| 이비인후과 | 비염, 부비동염, 코피, 외이도염, 중이염, 어지럼증, 난청, 이명, 편도염, 인후염, LPR, 목소리 질환 — 가장 많이 오는 CC |
| 근골격/통증 | 요통, 경추통, 관절통, 관절염, 통풍, 만성통증, 비수술적 접근법|
| 건강검진 | 암 스크리닝·검진 결과 상담 — 고령화로 수요 증가 |
| 예방접종 | 성인,노인,여행,소아 — 가이드라인 변경 추적 |

---

## Tier 2 — 자주 만난다 (높은 우선순위)

| 분야 | 일차의료 렌즈 |
|------|-------------|
| 심혈관 | 부정맥, 흉통, 협심증, 심부전, 말초동맥질환, 말초정맥질환 — RedFlag 감별 중심, 예방적 관리 |
| 신경과 | 두통, 어지럼증, 치매, 파킨슨, 손발저림, 안면신경마비, 뇌전증, 뇌졸중, 초기증상 놓치지 않기 |
| 정신건강 | 불안, 우울, 공황장애, ADHD + 불면증 (다른 질환에 광범위 영향) |
| 내분비 | 당뇨합병증, 갑상선질환, 골다공증, 대사증후군 |
| 피부과 | 흔한 질환 + 놓치면 큰일나는 것 (악성 병변 감별) |
| 비뇨의학 | 요로감염·전립선·배뇨장애, 성기능장애 — 노인 환자 비율 높음 |
| 노인의학 | 노쇠·낙상·다약제·인지기능 — 고령사회 필수 역량 |
| 부인과 | 갱년기·폐경·HRT·월경이상 — 호르몬 관련 상담 |

---

## Tier 3 — 반드시 기본은 안다 (실전 대비)

| 분야 | 일차의료 렌즈 |
|------|-------------|
| 응급의학 | 걸어 들어오는 응급환자 — 일차 처치 + 심한 질병의 약한 초기증상 + 진단적 치료 |
| 일반외상 | 진료실에서 컨트롤 가능한 수준 — 열상·타박·화상 처치 |
| 소아과 | 발열·감기·복통,발진 야간 소아과 닫혔을 때 당황하지 않는 수준 |
| 완화의학 | 암 치료가 아닌 호스피스·완화적 케어 접근법 |
| 초음파 진단·인터벤션 | POCUS·근골격·연부조직·갑상선 진단 + 인터벤션 술기 — 봉사활동·저자원 환경(엑스레이 없는 곳)에서 handy tool |

---

## Scout 적용 규칙 (legacy — 4-29 재편 전 규정, 보존)

> ⚠ **DEPRECATED 2026-04-29** — 새 규칙은 상단 Mir-Tier 1 섹션 참조.

- **Tier 1~2**: Anchor Journal 검색 + 귀납 키워드 탐색에서 자연 커버
- **Tier 3**: Tier 3 랜덤 탐색 카테고리에 포함
- **필터링 기준**: 이 스코프의 "일차의료 렌즈"에 맞는 논문만 ⭐ 부여

### 🔴 0순위 미터치 풀 (2026-04-29 추가, scout.md Step 1-B 라운드로빈 대상)
> ⚠ **DEPRECATED 2026-04-29** — 위 "기존 0순위 풀 → Mir 매핑" 표로 흡수. 본 섹션은 4-29 patch 기록 보존.

4-22~29 8회 scout에서 **⭐ 0~1건만 등장한 Tier 2 영역** — 자기강화 loop 차단을 위해 명시적 cycling 우선:

| 분야 | 8회 ⭐ 누적 | 외래 빈도 | scout 키워드 예 |
|---|---|---|---|
| **피부과** | 0건 | 외래 빈발 (악성 병변·습진·여드름·사마귀·피부감염) | "atopic dermatitis primary care", "skin cancer screening primary care", "common dermatoses primary care review" |
| **두통/신경과** | 1건 (소아 뇌진탕만) | 두통 자체가 외래 최다 | "primary headache primary care", "migraine prophylaxis", "tension-type headache", "dementia screening primary care", "stroke prevention primary care" |
| **갱년기·월경이상** | 1건 (성호르몬 VTE만) | 부인과 본체 | "menopause management primary care", "perimenopause symptoms", "abnormal uterine bleeding outpatient", "PMS PMDD treatment" |
| **불면·수면** | 0건 | Tier 2 정신건강 + 생활습관 | "chronic insomnia CBT-I primary care", "sleep hygiene", "OSA primary care screening" |

라운드로빈 알고리즘은 `routines/scout.md` Step 1-B 참조. 4일 1회 cycling으로 4영역 1회 이상 cover 후 🟡 보강 진행 영역으로 이동.

### 🟡 보강 진행 풀 (이미 일부 ⭐ 등장, 추가 탐색 가치 있음)

호흡기/소화기/노인의학은 4-22~29에 활발히 보강됨 → 다음 cycle에서 빈도 낮춤. 대신 다음 영역들은 Tier 1 핵심임에도 부분 공백:

- **고혈압 본체** (resistant-HTN 외)
- **이상지질혈증 본체** (당뇨 동반 외)
- **갑상선·골다공증** (내분비 본체)
- **건강검진** (FIT 외 — 유방·자궁·간·갑상선·전립선)
- **근골격·통증** (만성요통·손목굴 외 — 관절통·통풍·신경병증)
- **비뇨의학 본체** (전립선·배뇨장애·성기능)
- **생활습관 의학** (금연 외 — 운동·수면·스트레스·식이·절주)
