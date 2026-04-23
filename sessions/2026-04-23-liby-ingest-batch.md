# 2026-04-23 Liby ingest — 11건 batch (A 7신규 + B 4보강)

## 세션 정보
- 담당: Liby (librarian)
- 범위: Deep Extract가 끝낸 knowledge/ md 11건 → src/knowledge-bundle.js v2 이식 + TRIAGE 확장 + cache-bust
- 경계: md 재편집 금지 · app.js 수정 금지 · L3 스모크/재QA 상위 판단

## 결정 배경
- Deep Extract 세션(`sessions/2026-04-23-deep-extract-batch.md`)이 md 단계를 마치고 bundle 미반영 상태로 종료
- 3층 방어선 "창작층(Liby ingest)"에서 vocabulary·sources·uiHooks 정합 보장 필요
- dizziness는 v1 형태로 bundle에 존재 → VA 도플러 referral 보강과 묶어 v2 승격 권장 받음
- 신규 drug 2건(mucomyst·pilocarpine)은 drug kind 기본 guide(4 key)가 protocol/indication/dosing 섹션을 커버하지 못하므로 uiHooks.guide ["*"] 오버라이드 필수 (librarian.md GOTCHA)
- mucomyst·pilocarpine 본문은 기존 xerostomia/BMS treatment 섹션에 묻혀있던 내용을 drug 엔트리로 별도 등록 (Phase 6 스캔 GOTCHA 해소)

## 처리 결과 표

### 카테고리 A — 신규 엔트리 7건

| # | key (primary + aliases) | kind | sections (수) | TRIAGE 추가 | parents |
|---|---|---|---|---|---|
| 1 | resistant-hypertension · 저항성고혈압 · resistant hypertension | disease | 4 (definition, exam, protocol, referral) | ✓ `저항성고혈압` | — (parent `hypertension` bundle 미존재) |
| 2 | mucomyst · 뮤코미스트 · acetylcysteine · NAC | drug | 2 (protocol, indication) | ✗ (xerostomia/BMS 간접) | — (drug — parents 미부여 관행) |
| 3 | pilocarpine · 필로카르핀 · 살라겐 · 필로겐 | drug | 3 (indication, dosing, insurance) | ✗ (xerostomia 간접) | — |
| 4 | ckd-monitoring · CKD · 만성콩팥병 | topic | 4 (definition, monitoring, referral, notes) | ✓ `CKD` | — (topic 금지) |
| 5 | sex-hormone-vte-risk · 성호르몬-VTE · HRT · 피임약 | topic | 5 (indication, notes, precaution, referral, comparison) | ✓ `성호르몬-VTE` | — (topic 금지) |
| 6 | smoking-cessation · 금연 | topic | 4 (definition, comparison, protocol, notes) | ✓ `smoking-cessation` | — (topic 금지) |
| 7 | afp-top20-poems-2024 · POEM | topic | 10 (overview + 8 주제 + notes) | ✗ (환자 호소에서 직접 감지 불가) | — (topic 금지) |

### 카테고리 B — 기존 bundle 엔트리 보강 4건

| # | key | 추가 섹션 (수) | 비고 |
|---|---|---|---|
| 1 | glp1 | 3 (tirzepatide-discontinuation, glp1-review-nejm2026, aud-hospitalization) | topic 기본 `guide: ["*"]`로 자동 노출 |
| 2 | obesity · 비만 | 1 (indication — 청소년 GLP-1 RA) | disease 기본 guide에 indication 포함 — override 불필요 |
| 3 | dizziness · 어지럼증 · vertigo | v1 → v2 승격 (3 섹션: exam, differential, referral) | VA 도플러 referral 신규. 참조 공유 `_dizziness_v2` 패턴 |
| 4 | vaccination-summary | 1 (prescription-based-flu — Vaccine 2026 PMID:42000148) | topic 기본 `guide: ["*"]` |

## 엔트리별 구조 결정

### dizziness v2 승격 — v1 → v2 매핑

v1 필드가 상위 질환 parent 역할을 하고 있어 B1 migration 패턴(참조 공유)으로 승격. `_dizziness_v2` 본체 변수 + 3 alias 할당.

| v1 필드 | v2 매핑 |
|---|---|
| `exam` (11항목 + 편두통 추가 문진) | `sections.exam` (원문 유지, `[TIPS — 교수님 외래 참관]` 라벨 보존) |
| `differential` (텍스트) | `sections.differential.content` |
| `differentialShort` (구조 배열) | v2에는 구조 배열 필드 없음 — 본 엔트리에서는 content 마크다운 내부에 Horses/Zebra 번호 매김으로 정보 보존. UI에서 쓰던 differentialShort는 BPPV·이석증(v1 유지) 엔트리에 그대로 남아 있어 parent 감지 시 자동 inject 유지됨 (parents=["dizziness"] 구조로 상속) |
| `treatment` | null (원본 md에 실체 없음 — 승격 시 섹션 생성 안 함) |
| `draftAppend` | null (원본 md에 실체 없음) |
| (신규) VA 도플러 의뢰 기준 [CLINICAL — 조건부] | `sections.referral` — Kurşun O 2025 PMID:40950820 |

### 신규 drug 엔트리 uiHooks.guide override 값

- `mucomyst` (NAC): `{guide: ["*"]}` — protocol·indication 섹션 모두 drug 기본 guide 외. `["*"]` 선택 이유: 미래 섹션 추가 시 자동 포함, 구강병변·LPR 등 다발 적응증이 모두 실전 유의미
- `pilocarpine`: `{guide: ["*"]}` — indication·dosing·insurance 3섹션. insurance는 drug 기본에 포함되지만 indication·dosing은 외. 일관성 + 미래 대비 `["*"]`

### parents 필드 판단 결과

librarian.md GOTCHA 영구 규칙(2026-04-21)에 따라 각 엔트리별 명시 판단:

| 엔트리 | parent 후보 | 판단 | 사유 |
|---|---|---|---|
| resistant-hypertension | `hypertension` | **미부여** | bundle에 `hypertension` key 없음 (Grep 확인). silent-skip 대신 명시적 미부여 |
| mucomyst | — | 미부여 | drug 엔트리, xerostomia parent 관행 없음 (dry-mouth 엔트리도 mucomyst를 참조로만 언급) |
| pilocarpine | — | 미부여 | 동일 |
| ckd-monitoring | — | **금지** | kind=topic은 parents 부여 금지 (section-vocabulary.md parents 규칙) |
| sex-hormone-vte-risk | — | **금지** | kind=topic |
| smoking-cessation | — | **금지** | kind=topic |
| afp-top20-poems-2024 | — | **금지** | kind=topic |

카테고리 B는 모두 기존 엔트리 본문에 섹션 추가만 수행 — parents 수정 없음.

### TRIAGE calcCategories 추가 카테고리 리스트 (src/prompts.js)

추가한 카테고리 4개:
1. `저항성고혈압` — "3제 복용에도 혈압 조절 안 됨 / MRA / spironolactone / 이차성 고혈압 의심" 맥락
2. `CKD` — "eGFR 30-59 / 크레아티닌·시스타틴C / 신장기능 추적" 맥락 (기존 `sglt2-inhibitors` 와 중복 감지 허용)
3. `성호르몬-VTE` — "피임약 처방 / HRT / 갱년기 / 성별확정호르몬 / VTE 과거력" 맥락
4. `smoking-cessation` — "금연 / 전자담배 / NRT / varenicline" 맥락

**추가 미실시** 근거:
- `afp-top20-poems-2024` — 환자 호소에서 직접 감지 불가. keyword 기반 접근 유일. TRIAGE 노이즈만 증가. 미등록이 맞음.
- `mucomyst`·`pilocarpine` — 기존 xerostomia(구강건조증)·burning mouth(BMS)·LPR 카테고리 감지 시 연동 가능. 약물 단독 TRIAGE 불필요. keywords 배열에 `뮤코미스트`·`NAC`·`acetylcysteine`·`살라겐`·`필로겐` 등록으로 키워드 매칭은 커버됨.

## 건드린 파일 목록

### 수정 (4)
- `src/knowledge-bundle.js`
  - 삭제: v1 `dizziness`·`어지럼증`·`vertigo` 엔트리 본문 (line 70-114, 45줄)
  - 보강: `obesity` + `비만` → `indication` 섹션 추가 (청소년 GLP-1)
  - 보강: `glp1` → 3 섹션 추가 (tirzepatide-discontinuation / glp1-review-nejm2026 / aud-hospitalization)
  - 보강: `vaccination-summary` → `prescription-based-flu` 섹션 추가
  - 추가: 파일 하단 `_dizziness_v2` + 6 신규 본체 변수 (resistant-hypertension / mucomyst / pilocarpine / ckd-monitoring / sex-hormone-vte-risk / smoking-cessation / afp-top20-poems-2024) + 21 alias 할당
- `src/prompts.js` — TRIAGE calcCategories 4 추가 (저항성고혈압 / CKD / 성호르몬-VTE / smoking-cessation)
- `src/index.html` — `knowledge-bundle.js?v=0423-ingest`, `prompts.js?v=0423-ingest` cache-bust
- `knowledge/index.md` — 신규 md 4건 등재 + 보강 파일 3건 갱신

### 신규 (1)
- `sessions/2026-04-23-liby-ingest-batch.md` (본 파일)

### 변경 없음 (경계 준수)
- `knowledge/by-disease/*.md` · `knowledge/by-drug/*.md` · `knowledge/guidelines/*.md` — Deep Extract 산출물 그대로 이식만
- `src/app.js` — 이번 세션 경계 외
- `inbox/scout/*.md` — Deep Extract 세션에서 이미 [✓] 처리 완료 확인

## 판정

- bundle parse 검증: `vm.runInContext()` PASS — 총 key 수 115 (11 본체 + alias 포함 순증)
- 각 신규 entry kind·sections 검증 완료 (script 출력 로그)
- drug 엔트리 uiHooks.guide override 누락 체크: mucomyst/pilocarpine 둘 다 `{guide: ["*"]}` 확인
- vocabulary key 준수: 모든 섹션 key가 18 표준 또는 slugify 자유 섹션 (treatment 영문 금지 준수)
- parents 판단 의무 이행: 7 신규 + 4 보강 모두 명시적 판단 기록
- 출처 표기: primarySources Tier 1 + sections[k].sources Tier 2 3-tier 모델 준수. `[초록 기반 — 전문 미확인]` 태그는 원본 md 그대로 보존 (smoking-cessation·resistant-hypertension·obesity.indication)

## 다음 작업

- L3 스모크 재실행 여부는 상위 판단 (L3 fixture는 변경 없음)
- 커밋·main 머지 상위 판단
- Researcher 큐: AFP abstract 비공개 2건 (resistant-hypertension PMID:41544280, smoking-cessation PMID:41839085), 청소년 GLP-1 (PMID:41544290) — 전문 확보 시 보강 필요
- Auditor 큐: ckd-monitoring `referral` 섹션의 `[TIPS — 임상 표준]` 라벨은 임시성이 있음 — 정식 출처 매핑 필요 (Phase 5b)

## 회고

- **vocabulary 정합 재발 0건**: section-vocabulary.md 확인 선행 → `treatment`·`dosage` 같은 영문 자유 key 사용 없음. drug 엔트리 uiHooks override 체크를 ingest 전 완료.
- **완결성 부담 회피**: Chartji 철학("정보 밀도 감소는 feature") 준수. afp-top20-poems-2024는 TRIAGE 미등록 — 감지 불가한 overview 문서에 TRIAGE 노이즈 추가하지 않음. mucomyst·pilocarpine도 기존 parent 질환 감지에 위임.
- **parents 판단 의무 명시화**: 7개 각각 bundle grep 확인 후 판단 기록. `hypertension` 부재 발견 → 명시적 미부여 (silent-skip 대신).
- **참조 공유 패턴 재적용**: dizziness v2 승격은 LPR·xerostomia·BMS(L1 B1)와 동일 패턴. `_dizziness_v2` 본체 + alias 3개. 객체 mutation 금지 주석 유지.
- **3층 방어선 창작층 sources[] 채움**: 임시 [TIPS — 임상 표준] 라벨은 2곳(`ckd-monitoring.referral`, `smoking-cessation.protocol`)만 사용. 나머지는 primarySources Tier 1 상속 또는 구체 [TIPS — by XXX] 라벨.
- **암묵지 연계**: sessions/2026-04-23-deep-extract-batch.md "다음 단계 — Liby ingest 대상" 8개 항목 100% 소화 + 기존 md 3건(resistant-hypertension/mucomyst/pilocarpine) 추가 ingest = 11건.
