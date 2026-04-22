# Chrome QA 결과 — 2026-04-22

> 실기 세션: 데스크탑 Claude Code + Chrome MCP, `http://localhost:7777`
> 원본 가이드: `sessions/2026-04-22-chrome-qa-scenarios.md`
> 판정: **중단 (심각한 regression 2건 발견)** — 브랜치에만 기록, main 푸시 보류

---

## 요약

- **계획**: 7 시나리오 실행
- **실제 실행**: 2 시나리오 (LPR-consensus A / sglt2-inhibitors)
- **중단 사유**: 2건 모두에서 pre-LLM·post-LLM 두 층에서 중대 결함 발견 → 원인 진단 우선
- **3층 방어선 1차 소견**: 창작층(ingest 품질)·감사층은 형식 OK로 보이지만, **출력층(큐레이션) 도달 자체가 실패**하거나 **도달 후 핵심 bullet이 drop**됨 → 3층 방어선 효과 측정 불가

---

## 사전 확인 (전부 통과)

- ✓ 앱 서빙 `http://localhost:7777` 200
- ✓ main 최신 `cd67ff5` (Chrome MCP QA 가이드 merge 완료)
- ✓ Cache-bust: `knowledge-bundle.js?v=de5-ingest`, `prompts.js?v=triage-de5`
- ✓ Bundle smoke: 5 엔트리(LPR-consensus/depression-screening/sglt2-inhibitors/vitamin-d/neffy) 전부 kind 일치, sections ≥3
- ✓ TRIAGE smoke: `src/prompts.js`에 5 카테고리 문자열 전부 존재 (라인 57~61)
- ✓ v1 LPR 보존: `KNOWLEDGE_BUNDLE.LPR.kind="disease"`, `treatment` 필드 유지

---

## 시나리오 1 — LPR-consensus A 분기 — **FAIL**

### Transcript
> 목이 답답하고 기침이 3개월째 계속 나요. 자꾸 목청소하게 되고 가래 뱉고 싶어요.
> 속쓰림이나 역류감도 가끔 있어요. 일반 감기약은 효과 없었어요. 후두경은 한 번 봤는데 정상이라 했어요.

### 관찰

| 기대 | 실제 |
|---|---|
| Triage: `LPR-consensus` primary (+ 기존 `LPR`/`후두염` 병렬 가능) | **`LPR`만 감지** — `LPR-consensus` miss |
| Guide: San Diego Consensus 알고리즘 A 노출 (PPI BID ×3개월 + 알긴산) | **Guide 큐레이션 아예 생성 안 됨** (버튼 클릭해도 아무 반응 없음, 로딩 스피너 없음, 네트워크 요청 없음) |
| `[출처: Yadlapati R...]` 태깅 | 해당 없음 (큐레이션 자체가 비생성) |
| 공통 4지표 | 측정 불가 |

### 근본 원인 2건 — 이중 결함

**(1) TRIAGE miss — `LPR-consensus` 미감지**
- `src/prompts.js:57`에 키워드 잘 기재됨: `LPR/후두염/인후두역류/LPS/LPRD/San Diego Consensus 관련 — 만성 인후 증상·후두 역류 진단·치료 알고리즘 맥락`
- 하지만 transcript(만성 기침 3개월·목 이물감·간헐 역류)에서 LLM이 `LPR` 구카테고리만 선택, `LPR-consensus` 신카테고리를 동시 감지 못 함
- **가설**: 구/신 카테고리 중복 시 LLM이 하나만 고르는 경향. 가이드 문서 "LPR-consensus (LPR/후두염/...) 관련" 표기가 LPR과의 1:1 aliasing처럼 읽혔을 가능성
- **처방 후보**: (a) prompts.js에서 `LPR`과 `LPR-consensus`의 트리거 관계 명시 (LPR-consensus가 v1 LPR을 대체하는 상위라는 방향 신호), 또는 (b) LPR·LPR-consensus 동시 감지를 유도하는 명시적 예시 삽입

**(2) v1 treatment-only 엔트리의 Guide ctx 공백 — 조용한 실패 (pre-existing bug)**
- `KNOWLEDGE_BUNDLE.LPR` keys: `["kind","exam","treatment","differential","draftAppend"]`
- 하지만 `exam=""`, `draftAppend=""` (빈 문자열), `treatment` 만 172 chars 채워짐
- `src/app.js:181-182` handleCuration v1 fallback:
  ```js
  if(e.exam)         knowledgeCtx+="..."+e.exam+"\n\n";
  if(e.draftAppend)  knowledgeCtx+="..."+e.draftAppend+"\n\n";
  ```
  **`e.treatment` 필드를 읽지 않음**
- 결과: `knowledgeCtx=""` → line 186 `if(!knowledgeCtx) return;` → **조용히 return, UI 변화 없음**
- 도입 시점: commit `14b2b89` (Phase 3B v1/v2 dispatch) — 그 이전엔 v1 단일 경로로 `treatment` 포함해서 빌드되었으나 v2 분기 시 `exam`/`draftAppend`만 살림
- **영향 범위**: `treatment`만 채워진 v1 엔트리 전부. LPR·후두염이 대표 샘플

### 검증 데이터 (Chrome 콘솔)
```
KNOWLEDGE_BUNDLE.LPR → { kind, exam, treatment, differential, draftAppend }
hasExam: false, hasDraftAppend: false, treatmentLen: 172
```

---

## 시나리오 3 — sglt2-inhibitors — **PARTIAL FAIL**

### Transcript
> 50대 여성 당뇨 환자, HbA1c 7.8. 메트포르민 쓰고 있고 추가로 포시가 넣으려고 해요.
> 근데 요로감염 자주 걸리는 편이에요. 작년에만 방광염 3번. 이 약 써도 되나요?

### 관찰

| 체크 | 결과 | 비고 |
|---|---|---|
| `sglt2-inhibitors` 감지 | PASS | TRIAGE 정상 |
| RedFlag 격리 | PASS | MODERATE "SGLT2+재발성요로감염" 정확히 RedFlag 패널에만, Guide inject 없음 |
| 반복 UTI 기왕력 → 위험-편익 재평가 bullet | **FAIL** | Guide 큐레이션에 UTI 관련 bullet **0건** |
| 환자 교육 3개 (수분·위생·증상) | FAIL | 0건 |
| TIPS 라벨 `[출처: TIPS — 일반 약리 지식]` indication/contraindication/reimbursement bullet 매핑 | **FAIL** | 해당 섹션 3개 전부 bullet에서 drop |
| Tier 1 `[출처: Swanson J...]` 비뇨생식기 bullet 매핑 | FAIL | UTI bullet 자체가 없음 |
| 섹션 라벨 오용(`[출처: sglt2-inhibitors.indication]` 등) | 0건 ✓ | 안전 |
| `[출처 미확인]` 자의 태깅 | 0건 ✓ | 안전 |

### 실제 출력 Guide 큐레이션 bullet (3개)
1. 당뇨병성 케톤산증(DKA) 위험 — 수술·공복 시 일시 중단 고려 `[출처: Swanson J et al. Am Fam Physician 2026;113(3):281-282. PMID:41839088]`
2. Fournier 괴저 (희귀하나 심각) `[출처: Swanson J...]`
3. eGFR < 45 ml/min/1.73m² 이하에서 혈당 강하 효과 감소 `[출처: Swanson J...]`

### 근본 원인 후보

**(3) 주제 부조화 drop이 과도 — transcript 핵심 우려 사항을 역으로 누락**
- Transcript 핵심 우려: **재발성 UTI 환자에게 SGLT2i 써도 되는가?**
- 지식 엔트리에는 해당 경고가 틀림없이 있고, RedFlag 판정 기준으로도 트리거됨 (MODERATE)
- 하지만 Guide 큐레이션 LLM이 UTI 관련 bullet을 **하나도 출력하지 않음**
- 대신 transcript에 언급 없는 DKA·Fournier·eGFR 3개 일반 위험만 나열
- **가설**: "sources[]에 실제 일치 출처 없는 bullet drop"(rule ⑧) 규칙이 과도하게 작동했거나, LLM이 "이미 RedFlag에 나왔으니 Guide엔 불필요" 판단을 내렸을 가능성 (한 곳만 정제하는 편향)

**(4) TIPS 라벨 섹션이 bullet에 전혀 매핑 안 됨 — 출처 하이어라키 편향**
- `sglt2-inhibitors` 엔트리의 `indication/contraindication/reimbursement` 3개 섹션은 출처가 `[출처: TIPS — 일반 약리 지식]`
- bullet 3개 모두 **Tier 1 (Swanson PMID)** 출처만 사용. TIPS 라벨 bullet은 0건
- **가설**: LLM이 Tier 1(학술 출처) 우선 편향. TIPS 라벨을 "2등 출처"로 간주해 누락. 3층 방어선의 "TIPS 공식화" 효과가 출력층에서 미발현

### 정상 요소 (기록)

- v2 sections 경로는 LLM 호출까지 정상 도달 (약 5-8초 후 결과 스트리밍)
- 섹션 라벨 오용 없음 (`[출처: sglt2-inhibitors.xxx]` 0건) — 3층 방어선 규칙 ⑤ **통과**
- `[출처 미확인]` 자의 태깅 없음 — 규칙 ⑦ **통과**
- Tier 1 PMID 정확 인용 — 출처 포맷 규칙 통과
- RedFlag 격리 동작 (`rules/data-flow.md §2`) — 통과
- 계산기 탭 "당뇨" 자동 추가 — 기대 동작

---

## 시나리오 2,4,5,6,7 — **미실행**

시나리오 1의 근본 결함 2건이 v1 계열(LPR-consensus B 시나리오 2에서도 v1 LPR 병렬 감지 시 재발 가능성)과 시나리오 3의 출력층 편향(4,5,6,7 전부 v2 엔트리 → UTI-drop류 반복 리스크)을 광범위하게 건드림.

실행해도 신호가 중복되므로 **원인 진단 후 재실행**이 효율적이라 판단. 미르 승인 후 후속 세션에서 재개.

---

## 3층 방어선 첫 실전 — 중간 평가

| 층 | 설계 의도 | 실측 |
|---|---|---|
| **창작층** (Liby/skill-learner, ingest 시점) | v2 shape·sources·primarySources 필수화 | ✓ 동작 (5 엔트리 ingest 형식 OK) |
| **감사층** (Auditor) | ingest 후 regression 방지 | ✓ 동작 (기존 KB 보존 확인) |
| **출력층** (prompts·app.js Guide 큐레이션) | 섹션 라벨 오용 0 / 출처 미확인 0 / TIPS 매핑 / 부조화 drop | ✗ **제대로 검증 못 함** |

**결론**: 3층 방어선 중 창작·감사층은 형식 보증에 성공했으나, **출력층 이전 단계(Triage 감지·v1 ctx 빌드)에서 이미 깨져서 출력층 실제 효과를 측정할 수 없었음**. 3층 방어선이 아닌 "4층"(감지층 포함)으로 확장이 필요할 수 있음.

---

## 발견된 문제 (우선순위)

- **P0 #1**: v1 treatment-only 엔트리 Guide ctx 공백 — `src/app.js:181-182`에 `e.treatment` 읽기 추가 필요. 또는 해당 v1 엔트리를 v2로 마이그레이션 (`exam`에 넣거나 `draftAppend`에 합치기). LPR·후두염이 대표 샘플
- **P0 #2**: TRIAGE가 LPR-consensus를 LPR과 동시 감지 못 함 — `src/prompts.js` 카테고리 간 상위/중복 관계 명시 필요
- **P1 #3**: Guide 큐레이션의 주제 부조화 drop이 과도 — transcript 핵심 우려(UTI)를 드롭하는 실패 사례. `KNOWLEDGE_CURATION_PROMPT` 에 "환자 주 호소에 직접 연결된 bullet은 drop 금지" 규칙 추가 검토
- **P1 #4**: TIPS 라벨 bullet 매핑 0건 — Tier 1 출처 편향 관찰. prompt에서 TIPS 라벨을 명시적으로 1급 출처로 인정하는 지시 보강
- **P2 #5**: (관찰) `LPR-consensus` 감지 실패 시 대체 경로로 `LPR` v1이 사용되는데 이 경로 자체가 P0 #1으로 죽어있음 → 사용자 체감으론 "Guide tab이 비어있다"의 이중 실패

---

## 세션 종료 체크리스트

1. **이번 세션 변경이 다음 세션에서 참조 필요한가?** → **YES** (결과 기록은 후속 수정 세션의 입력)
2. **routine/trigger/CI 영향?** → **NO**
3. **다른 브랜치·외부 의존?** → **NO**

⇒ **main 머지 대상이나, 가이드 "심각한 regression 발견 시 main 푸시 보류" 명시** → 브랜치 `claude/jovial-lovelace-c6e481`에만 기록. 미르 결정 후 머지.

## 다음 작업 (미르 결정 대기)

**Option A**: 즉시 P0 #1·P0 #2 수정 → 재QA
- 장점: 원인이 명확, 수정량 작음 (app.js 2줄·prompts.js 1문단)
- 단점: 수정 세션 1개 + 재QA 세션 1개 = 2 세션 추가

**Option B**: P0 #1·#2만 고치고 이 결과 파일을 main에 먼저 merge → 독립 세션에서 재QA
- 장점: 현 세션의 발견을 안정적으로 보존 (브랜치 분실 리스크 0)
- 단점: 세션 3개

**Option C**: 7 시나리오 전부 일단 소화 후 Phase 진단 (context 잡힐 때)
- 미권장: 이번 세션에서 context 고갈, 이미 신호는 충분

**권장: Option B** — 회귀 기록 보존이 진단보다 우선.

---

## 회고

- Chrome MCP 연결은 정상이었음. read_page / javascript_tool / form_input / screenshot 전부 작동
- 첫 번째 클릭 반응 없음 → React fiber 확인 → props.onClick 직접 호출 경로로 원인 특정: pre-existing v1 bug
- QA 문서(2026-04-22-chrome-qa-scenarios.md)의 사전 점검 리스트는 유효했음. 사전 점검 단계에서 놓친 것은 "LPR 엔트리의 exam·draftAppend 실체 확인" — 다음 QA 사전 점검엔 **대표 감지 키 엔트리의 ctx 빌드 시뮬레이션**(knowledgeCtx 문자열이 실제 생성되는지 JS 스모크) 항목 추가 제안
