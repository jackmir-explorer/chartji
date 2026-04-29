# Liby Bundle 백로그 일괄 Ingest — 2026-04-29

## 세션 정보
- 호출: 미르 — "차트지에 그동안 쌓인 지식들 Liby ingest 하자" → "A 하고 C 해야지. 다 해버려"
- 역할: Liby (Librarian)
- 브랜치: claude/flamboyant-cartwright-d9e5d0

---

## 결정 배경

### 발견된 백로그 구조

미르 질문 "scout 한 다음에 deep extract 한 지식들은 자동으로 ingest 되는게 아니잖아 .. 지금 그거는 어떻게 된거야 사라진거야?" 에 대한 추적 결과:

- `routines/deep-extract.md` Step 4 명시: deep-extract는 `knowledge/*.md` 반영까지만 자동, **`src/knowledge-bundle.js` 컴파일은 Liby 수동 호출 필수** (자동화 위험 관리)
- 4-23 ~ 4-28 deep-extract 5회 산출물 중:
  - **4-23 batch (11건)**: bundle 끝부분에 이미 ingest 완료 (vte-hormone-therapy=sex-hormone-vte-risk, CKD=ckd-monitoring, primary-care-top20=afp-top20-poems-2024 등)
  - **4-24 ~ 4-28 batch (~19건 신규 + 4건 보완)**: bundle 미반영 백로그 — md는 main에 살아있으나 앱 Guide/Hint/Draft에서 invisible

### 추가 작업 (asthma-reflux-comorbidity)

미르 `inbox/insight` 한 줄 메모: "천식증상이 충분한 약물 사용에도 나아지지 않으면 LPR, GERD 치료도 고려 (PPI, 알긴산)"
- Researcher 검증 결과 **조건부 지지** — 무증상 일률 처방은 근거 약함, 식도/인후두 증상 동반 시에 한해 empiric trial이 표준 권고
- 분류 결정 (미르 지시): C 옵션 — `knowledge/guidelines/asthma-reflux-comorbidity.md` 신규 [CLINICAL — 조건부]
- 출처: `[TIPS — by ENT교수]`

---

## 건드린 파일 목록

### 신규 작성
- `knowledge/guidelines/asthma-reflux-comorbidity.md` (신규)

### 수정
- `src/knowledge-bundle.js` — 백로그 누적분 + asthma 신규 alias 패턴으로 일괄 추가 (라인 2176~)
- `src/prompts.js` — calcCategories에 16개 신규 카테고리 추가
- `src/index.html` — `?v=0423-ingest` → `?v=0429-ingest` (knowledge-bundle.js, prompts.js 캐시 우회)
- `knowledge/log.md` — 4-29 신규 2줄 추가
- `knowledge/index.md` — guidelines/ 섹션 끝에 asthma-reflux-comorbidity 1줄 추가

### 이동
- `inbox/insight` → `inbox/processed/2026-04-29-insight-asthma-reflux.md`

---

## Bundle 추가 엔트리 (총 22개)

### 신규 20개 (asthma + 4-24/4-26/4-27/4-28 누적)

#### 4-29 신규 (1)
- `asthma-reflux-comorbidity` (topic) — 천식+역류 동반이환 가이드. ENT교수 메모 + GINA·AGA·San Diego·Chan WW 메타분석 통합 [CLINICAL — 조건부]

#### 4-24 batch (3)
- `cardiomyopathy` (disease) — 비허혈성 심근증 4분류 (HCM·DCM·RCM·ARVC), GDMT, ICD 평가, 가족력 청취 (PMID:41839108)
- `chronic-cough` (disease) — 난치성 만성기침(RCC) duloxetine RCT, 1·2단계 신경조절 [CLINICAL — 조건부] (PMID:41530764)
- `allergic-rhinitis` (disease) — ARIA 2024-2025 INAH+INCS 우선 [REGULATORY] (PMID:41324154)

#### 4-26 batch (7)
- `meningitis` (disease) — 4대 증상, LP 판독, 1시간 rule 항생제, 덱사메타손 병용, 화학예방 (PMID:41839077)
- `croup` (disease) — Westley score, Dexamethasone 0.6mg/kg, 응급 감별 (PMID:41839076)
- `doac-elderly` (topic) — 80세 이상 Apixaban 우선, HAS-BLED, 낙상 단독으론 항응고 중단 비권고 (PMID:41839090) [초록]
- `carpal-tunnel-syndrome` (disease) — 부목→주사→수술 3단계, 18개월 회복률 수술 우월 (PMID:41839082) [초록]
- `multiple-myeloma` (disease) — CRAB, SPEP/UPEP, 즉시 혈액종양내과 의뢰 (PMID:41839075)
- `anxiety-depression-cbt` (topic) — 375 RCT 메타, PTSD g=1.27, 약물+CBT 병합 권고 (PMID:40238104)
- `hepatitis-b-management` (topic, 기존 v1 키와 분리) — 만성 HBV 치료 기준, TDF/TAF/ETV, HCC 감시 6개월 (PMID:41839074)

#### 4-27 batch (3)
- `concussion` (disease) — 소아 뇌진탕 RCE, mental fog LR 12, near-point convergence LR 7.0, 두통 없으면 배제 (PMID:41941197) [초록]
- `low-back-pain` (disease) — SMART RCT, PT > CBT 기능 우월(ODI 2.8), 비반응자 마음챙김=전환 동등 (PMID:42008809)
- `recurrent-uti` (disease) — AUA 16권고, D-만노스, 폐경 여성 질 에스트로겐, 자가 치료 프로토콜 (PMID:40551332) [초록]

#### 4-28 batch (6)
- `covid-outpatient-antivirals` (topic) — Simnotrelvir 회복 -35.8h, **Molnupiravir Long COVID 감소 8.5% vs 11.0%★**, Paxlovid 약물상호작용 (PMID:41662710)
- `MASH` (disease) — Tirzepatide·Semaglutide·비만수술 MASH 해소 우월, TBWL%=핵심 매개변수, FIB-4 의뢰 기준 (PMID:41804193)
- `COPD` (disease) — GOLD 2025 ABE, 호산구 ≥300 ICS 추가/<100 회피, LABA+LAMA (PMID:41769574)
- `colorectal-cancer-screening` (topic) — 우편 FIT 키트 45~49세 완료율 최고, FIT 매년 (PMID:41839084) [초록]
- `diabetes-dyslipidemia` (topic) — Non-HDL-C 표적(<130/100/85), Statin→Ezetimibe→Bempedoic/PCSK9 (PMID:41968323)
- `pediatric-antibiotic-stewardship` (topic) — WHO AWaRe 80개국, 2차에서도 Access 우선, 한국 마크로라이드 30~40% 내성 (PMID:40896455)

### 보완 신규 topic 2개
- `glp1-selection-strategy` (topic) — 위고비 vs 마운자로 10기준, dose escalation 4주 3질문, Tirzepatide 중단 후 +1.9%(비유의), AUD·SMI·전당뇨 누적 (PMID:41931049, 41962807, 39535805, 41565568, 41618880)
- `heart-failure-volume-overload` (topic) — BNP+POCUS B-lines RCE(LR 6.9 / 0.09) + HFpEF+비만 GLP-1 운동능력 개선 (PMID:41729549, 41802118)
- `obesity-pharmacotherapy-grade` (topic) — TOS/OMA/OAC GRADE 강력권고 4약 + 동반질환별 GLP-1 우선 (PMID:41859682)

### 기존 v1 키 본문 보존 원칙
- v1 `B형간염`·`hepatitis B`·`heart-failure`·`obesity`·`mounjaro`·`glp1` 등은 **본문 미수정**. 보완 누적분은 별도 topic 키로 격리 (참조 공유 aliasing 패턴 위반 회피).

---

## TRIAGE 감지 확장 (calcCategories +16)

`src/prompts.js` TRIAGE_PROMPT calcCategories 목록 끝에 추가:
- asthma-reflux-comorbidity, allergic-rhinitis, chronic-cough, croup
- carpal-tunnel-syndrome, anxiety-depression-cbt, hepatitis-b-management, concussion
- low-back-pain, recurrent-uti, COPD, colorectal-cancer-screening
- diabetes-dyslipidemia, MASH, covid-outpatient-antivirals, obesity-pharmacotherapy-grade

추가 보류 (응급/특수/희귀 — LLM 자연 매핑 어려움):
- meningitis, multiple-myeloma, doac-elderly, cardiomyopathy, pediatric-antibiotic-stewardship, heart-failure-volume-overload (heart-failure 키로 자동 보완)

---

## kind / parents / sources 자가검증

- **drug 엔트리 없음** → uiHooks.guide ["*"] 강제 GOTCHA 해당 없음
- **topic kind**: parents 부여 금지 룰 준수 (asthma-reflux, doac-elderly, hepatitis-b-management 등 모두 parents 미설정)
- **disease kind**: parents 후보 검토 — 모두 새 단독 엔트리이거나 parent 부재로 미설정
- **sources[]**: TIPS 라벨이 명시된 항목(asthma-reflux의 indication, glp1-selection의 comparison/protocol/notes, mounjaro 보완)에 `[TIPS — by ENT교수]`/`[TIPS — by 로컬원장님]` 등 출처 타입 문자열 명시 (skill 5-B 원칙)
- **섹션↔출처 자가검증**: primarySources 다출처 엔트리(glp1-selection-strategy 5개, asthma-reflux 4개)에서 섹션별 주제와 source 주제 매핑 확인 — TIPS 라벨은 자가검증 면제

---

## 판정

**Builder 단계 완료.**
- bundle.js 통합 (라인 2175 → ~2700+)
- prompts.js calcCategories 16개 추가
- index.html 캐시 키 0429-ingest로 bump
- log.md / index.md 갱신
- inbox/insight → processed/

QA: 미르가 외래에서 새 키들이 tile에 노출되는지 실전 확인 필요 (L3 smoke runner는 v1/v2 alias 모두 통과 가정).

---

## 다음 작업

- 미르 외래 환경에서 신규 키 hint·Guide tab 노출 확인
- 다음 scout/deep-extract cycle (5-X) 후 bundle 반영 누락 재발 방지 위해 routine 명세 보강 가능성 — Liby 호출 trigger 자동화 검토 (현재는 의도된 수동 게이트)

---

## 회고

### 잘된 점
- 대규모 백로그(20+ 신규 + 보완 2개)를 단일 세션에 일괄 처리 — 부분 처리 후 분산되는 위험 회피
- v1 본문 보존 원칙으로 기존 통합 검증된 엔트리(`obesity`·`heart-failure`·`hepatitis B`·`mounjaro`·`glp1`) 미파괴
- 4-23 batch 11건이 이미 처리된 상태를 grep으로 사전 식별 — 중복 작업 회피

### 주의점
- **bundle 미반영 누적은 routine 설계상 의도된 수동 게이트** — 자동화하면 자동화 위험(잘못된 inject) 발생. 수동 호출 잊지 않도록 deep-extract 보고서마다 "⚠ Liby 호출 필요" 명시는 유지.
- 4-26 hepatitis-b 보완은 기존 v1 `B형간염`·`hepatitis B` 키와 충돌 회피 위해 별도 topic 키 `hepatitis-b-management`로 격리 — TRIAGE에서 양쪽 모두 감지될 수 있도록 calcCategories에 별도 등록.
- glp1 누적은 점점 비대 — 향후 LCM 분기점에서 `glp1-strategy`·`glp1-prediabetes`·`glp1-mental-health` 등으로 분할 검토 필요.

### 메모리 후보
- 사용자 요청이 "다 해버려"일 때 batch 분할(A/B 등)은 토큰 안전성 측면에서 합리적이나, 미르가 한 세션 완료를 기대했다면 분할 communication을 명확히. 이번엔 batch A/B 후 보완 + 메타까지 모두 단일 세션에서 완료.
