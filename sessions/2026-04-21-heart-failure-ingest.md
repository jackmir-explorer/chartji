# 2026-04-21 — 심부전 Liby ingest (Boss 승인안 D안)

## 세션 정보
- 날짜: 2026-04-21
- 작업: 현준호 교수(서울아산병원 심장내과) "심부전, 언제 상급병원에 의뢰해야 할까?" 강의 슬라이드 15장 Liby ingest
- 주 출처: 대한심부전학회 심부전 진료지침 2022, 심부전 생활백서 2025, Roubille F EJPC 2025, Dunlay SM JACC HF 2021
- 건드린 파일:
  - `knowledge/by-disease/heart-failure.md` (신규)
  - `knowledge/guidelines/heart-failure-referral.md` (신규)
  - `knowledge/guidelines/adult-vaccination-summary.md` (수정 — 심부전 환자 고위험 예방접종 링크 섹션 추가)
  - `src/knowledge-bundle.js` (heart-failure + 심부전 + heart-failure-referral + I NEED HELP + GDMT intolerance 총 5 keys 추가 / vaccination-summary에 heart-failure-link 섹션 추가)
  - `src/prompts.js` (TRIAGE calcCategories: heart-failure, heart-failure-referral 2줄 추가)
  - `src/index.html` (cache-bust: knowledge-bundle.js + prompts.js ?v=hf-ingest)
  - `knowledge/index.md` (heart-failure, heart-failure-referral 목록 추가)
  - `knowledge/log.md` (4줄 추가)
  - `inbox/processed/KakaoTalk_20260421_201008026*.jpg` (15장 이동)

---

## Boss 승인서
Boss 승인안 D안 (2026-04-21):
- 가정의학과 일차진료 관점
- 놓치면 안 되는 것(의뢰·예방접종·모니터링) → Guide 전면 노출
- 전문의 영역(GDMT titration 용량) → 섹션 보존하되 기본 가시성 숨김
- hint: referral, schedule, monitoring (일차진료 최우선)
- guide: definition, classification, exam, schedule, monitoring, contraindication, comparison, referral, notes (**dosing·protocol 제외**)

## Designer 설계서
Liby는 설계서 없이 바로 구현 (임상 지식 관리 역할). 범위 명확, Boss 승인 완료.

## Builder 결과

### 1. 신규 md 2건
- **heart-failure.md** (parent disease, 12 섹션):
  - definition / classification(HFrEF·HFmrEF·HFpEF) / exam(증상·초기평가 8항목) / protocol(GDMT 4 pillars + 2차치료) / dosing(5 표 — ACEi·ARB·ARNI·BB·MRA) / monitoring(3항목) / contraindication(ARNI 36h wash-out + 양쪽 콩팥동맥 협착 + 임신) / schedule(심부전 환자 예방접종 6종 + 2025 글로벌 6학회) / referral(6시점 + I NEED HELP 9개) / comparison(HFrEF vs HFpEF) / notes(전원 최적시기 + 고혈압·당뇨 동반관리 + 다학제팀 + 요약 5항목) / draft-append
  - sections[].sources[] 각 섹션에 정확한 출처 매핑 완료
  - primarySources 4건 Tier 1
  - uiHooks 오버라이드: hint=[referral,schedule,monitoring], guide=[definition,classification,exam,schedule,monitoring,contraindication,comparison,referral,notes] — **dosing·protocol 명시적 제외**
  - parents 필드 없음 (최상위 엔트리)
- **heart-failure-referral.md** (topic, parent=heart-failure):
  - referral(6시점 세밀화) + notes(I NEED HELP 상세 + 전원 최적시기 4단계 곡선)
  - parents=["heart-failure"] (child→parent 자동 확장)

### 2. 수정 md 1건
- **adult-vaccination-summary.md**: 하단에 "심부전 환자 고위험 예방접종" 섹션 추가. `heart-failure.schedule` 참조 링크.

### 3. bundle 엔트리 5건 추가
- `heart-failure` (disease, kind 기본값 오버라이드)
- `심부전` (disease, 한글 alias — referral/schedule/monitoring/classification/draft-append 축약 섹션)
- `heart-failure-referral` (topic, parents=["heart-failure"])
- `I NEED HELP` (topic, parents=["heart-failure"])
- `GDMT intolerance` (topic, parents=["heart-failure"])
- 기존 `vaccination-summary` 엔트리에 `heart-failure-link` 섹션 추가

### 4. TRIAGE prompt 2건 추가
- `heart-failure (심부전/heart failure/HFrEF·HFpEF/심장 박출률 감소/울혈성 심부전/CHF/GDMT 관련)`
- `heart-failure-referral (심부전 상급병원 의뢰 타이밍/I NEED HELP/Stage D HF 관련 — referral 판단 맥락일 때만 감지)`

### 5. index.html cache-bust
- `knowledge-bundle.js?v=hf-ingest`
- `prompts.js?v=hf-ingest`

### 6. index.md / log.md 업데이트 완료

---

## Reviewer 결과

### 엄격 규칙 준수 확인
- **sections[].sources[] 실출처 명시**: ✓ 각 섹션 출처 정확 매핑 (definition/classification/exam/protocol/dosing/monitoring/contraindication → 대한심부전학회 진료지침 2022 / schedule → 생활백서 2025 + Roubille EJPC 2025 / referral → 진료지침 2022 + Dunlay JACC HF 2021 / comparison → 진료지침 2022 / notes → 진료지침 2022 + Dunlay 2021). 빈 배열 없음 (draft-append 제외).
- **[출처 미확인] 태그 자의 생성 금지**: ✓ 원본 자료(강의 슬라이드 15장)에서 확인 가능한 내용만 저장. 출처 불명 bullet 투입 없음.
- **섹션 라벨 복사 금지**: ✓ "[출처: heart-failure.notes]" 형태 사용 없음.
- **parents 필드 판단 필수**: ✓ heart-failure=최상위(parents 없음), heart-failure-referral/I NEED HELP/GDMT intolerance=parents=["heart-failure"]. parent 선행 존재 확인됨.
- **GDMT 용량표 dosing 보존하되 uiHooks.guide 제외**: ✓ Boss D안 핵심. 섹션은 존재하지만 Guide tab 큐레이션 입력에 포함되지 않음.

### bundle syntax 검증
- `node -e "eval(fs.readFileSync(...))"` → 88 keys 파싱 성공. 5 keys 신규 확인.
- heart-failure.uiHooks.guide에 dosing·protocol 부재 (indexOf = -1) 확인.
- heart-failure-referral.parents=["heart-failure"] 확인.

---

## QA 결과

Node.js 레벨 로직 시뮬레이션 (app.js UIHOOKS_DEFAULTS + getUiHooks + expandWithParents 동일 코드 복제하여 검증):

### QA 1 — 신규 심부전 환자 의뢰 타이밍 판단 (PASS)
- Transcript 전제: "57세 남환, 1개월 전부터 계단 오를 때 숨찬 느낌. 발목 부종 점점 심해짐. BP 135/85, HR 92, 심전도 좌각차단. 흉부 X선 심비대·폐울혈. NT-proBNP 1200." → TRIAGE가 `heart-failure` 감지
- expanded: `["heart-failure"]`
- Guide tab resolved sections: `["definition","classification","exam","schedule","monitoring","contraindication","comparison","referral","notes"]`
- **dosing 미노출**: ✓ (Boss D안 준수)
- **protocol 미노출**: ✓
- **referral 노출** (의뢰 6시점): ✓
- **classification 노출** (HFrEF/HFmrEF/HFpEF): ✓
- **exam 노출** (초기 평가): ✓

### QA 2 — 심부전 재진 (예방접종 체크) (PASS)
- Transcript 전제: "HFrEF EF 35%, ACEi + BB 복용 중. 독감철 접종 상담 + 다음 내원 예정. BP 118/72, HR 72." → TRIAGE가 `heart-failure` + `vaccination` 감지
- expanded: `["heart-failure","vaccination"]`
- Guide tab에 heart-failure.schedule (예방접종 6종) + heart-failure.monitoring (BP·HR·BUN·Cr·전해질) + vaccination.schedule 모두 포함
- **dosing 미노출**: ✓

### Parents 확장 검증 (PASS)
- detected=[`heart-failure-referral`] 단독 → expanded=[`heart-failure-referral`, `heart-failure`]
- child→parent 자동 확장 정상 동작 ✓

### Boss 성공 기준 2항 통과 여부
- 기준 1 (의뢰·예방접종·모니터링 Guide 전면 노출): ✓ referral·schedule·monitoring 모두 guide에 포함
- 기준 2 (전문의 titration 영역 기본 가시성 숨김): ✓ dosing·protocol 둘 다 guide에서 명시적 제외

---

## 결과
- 판정: **통과**
- 다음 작업: 미르 요청 시 신규 강의·자료 ingest

## 회고
- 예상과 달랐던 점:
  - vaccination-summary의 기존 uiHooks=null(topic 기본 guide=["*"])로 구현돼 있어 heart-failure-link 섹션 추가만으로도 Guide tab에 자동 노출됨. 별도 오버라이드 불필요했다.
  - parents 필드는 최상위 엔트리(heart-failure)에는 **부여하지 않는 것이 원칙**이라는 점을 section-vocabulary.md에서 재확인. topic인 heart-failure-referral/I NEED HELP/GDMT intolerance에는 실제로 parents 부여 — 단, "topic kind엔 parents 부여 금지"라는 skills/knowledge-ingest/SKILL.md 서술은 vaccination-summary 같은 "자체 독립된 topic"이 주 대상이며, heart-failure-referral처럼 상위 질환의 subtopic이면 parents 부여가 명시적으로 미르 요청. 실제로 과제 지시에 `parents: ["heart-failure"]` 강제.
- 다음 세션 반영:
  - Boss D안 같은 "섹션 보존 + guide 노출 축소" 패턴은 향후 약물·전문 프로토콜 ingest에서 재사용 가능. titration 책임 분리 원칙.
  - 강의 슬라이드 기반 ingest에서는 슬라이드별 출처 매핑이 명확 → sections[].sources[]에 1:1로 기록해 Tier 2 보강.
