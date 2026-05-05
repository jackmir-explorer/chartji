# skills/paper-extract/SKILL.md — Deep Paper Extract

## 목적
Scout에서 ⭐ 마킹된 논문을 임상에 바로 쓸 수 있는 knowledge/ 형식으로 변환한다.

## 입력
- 논문 제목 + PMID (또는 DOI)
- Scout 요약 (1줄)
- 대상 섹션 힌트 (선택)

## 절차

### 1. 전문(Full Text) / 초록 수집
- PubMed Central 또는 journal 사이트에서 초록 + 결론 섹션 수집
- 접근 불가 시: 초록만으로 진행, 본문 미확인 명시

### 2. 임상 핵심 추출 (아래 항목 중 해당 항목만)

각 항목은 `knowledge/section-vocabulary.md`의 B2 표준 섹션 key에 매핑된다.
ingest 단계에서 Liby가 md `##` 헤더를 정규화하므로, 추출 단계에서 **vocabulary 정합 헤더명** 사용을 권장한다.

| 항목 | 내용 | B2 섹션 key (매핑) |
|------|------|------|
| 적응 환자군 | 어떤 환자에게 적용 | `indication` (drug) / 본문 도입부 (disease) |
| 핵심 수치 | NNT, 효과 크기, 기준 수치 등 | 해당 섹션 content에 inline |
| 처방/치료 | 약물명·용량·기간 | `protocol` (disease) / `dosing` (drug) |
| 접종·복용 스케줄 | 시간차 요법, 추가접종 주기 | `schedule` (백신·주기성 약물) |
| 주의사항 | 금기·부작용·모니터링 | `contraindication` + `precaution` + `monitoring` |
| 감별 포인트 | 진단 판단에 도움되는 내용 | `differential` |
| 병태생리/기전 | 왜 이런 증상이 생기는지, 약이 왜 듣는지 — **환자에게 설명할 수 있는 쉬운 표현**으로 | `notes` |
| 1차의료 적용 | 외래에서 바로 쓸 수 있는지 여부 | `referral` (의뢰 가부 포함) |
| 임신·수유 적용 | 임신·수유 시 사용 가부 | `pregnancy` |
| 비교·선택 | 약물·백신 간 비교 | `comparison` |
| 급여·보험 | 한국 급여 기준, 실비 활용 | `insurance` |

### 3. 태그 결정
- 직접 임상 적용 가능한 RCT/메타분석 → `[CLINICAL]`
- 부분 지지 or 소규모 연구 → `[CLINICAL — 조건부]`
- 가이드라인 업데이트 → `[REGULATORY]` or `[CLINICAL]`
- 트렌드·리뷰 → `[INSIGHTS]`

### 4. Draft 작성
knowledge/ 파일 형식으로 초안 작성:
- 파일 경로 제안 (by-disease/ or by-drug/ or guidelines/)
- 기존 파일에 추가할지 신규 생성할지 명시
- 섹션 헤더는 **B2 표준 vocabulary에 정합되는 한글 제목** 사용 (Step 2 매핑 표 참조)
  - 예: `## 처방/치료` (protocol), `## 용량` (dosing), `## 감별진단` (differential), `## 임신·수유` (pregnancy)
- 출처 표기: `sourcing-rules.md`의 3-tier 모델 따름
  - 파일 전체 대표 근거 → 파일 상단 primary 출처로 (Tier 1)
  - 섹션 한정 근거 → 해당 `##` 섹션 직후 인용 블록으로 (Tier 2)
  - 표·수치 세부 근거 → 원문 inline 유지 (Tier 3)
- 출처 명명: `[출처: {제1저자} et al. {저널} {연도};{볼륨}({이슈}):{페이지}. PMID:{번호}, DOI:{번호}]`

### 5. 불확실 항목 마킹
- 초록만으로 추출한 내용: `[초록 기반 — 전문 미확인]` 태그
- 1차의료 적용 여부 불명확: 명시 후 미르 판단 요청
- 출처 검증이 부분 지지(PARTIALLY SUPPORTED) 또는 미확인 시: `sourcing-rules.md` Attribution 원칙 따름 — `[CLINICAL — 조건부]` / `[출처 미확인]` 태그 사용, Researcher 검증 큐 등록

### 6. study-note "일차의료 적용 포인트" 섹션 작성 가이드 (2026-05-05 신설)

study-note의 `## 일차의료 적용 포인트` 섹션은 미르가 매일 직접 읽는 main 학습 채널이다. 이 섹션은 **연구 본래 narrative를 평준화하지 않고**, 논문이 자연스럽게 제공하는 영역에서만 sub-bullet으로 작성한다.

**원칙**:
- **강제 frame 금지** — 모든 논문에 같은 sub-bullet 구조를 채우지 않음. 시스템 연구는 "약물 디테일" sub-bullet 자체를 안 만듬 (강제 N/A 표기 X)
- **할루시네이션 방어** — 한국 brand·보험·구체 분기 임계값은 논문에 없으면 `[출처 미확인 — researcher 검증 권장]` 또는 `[가이드라인 default 인용: {출처}]` 명시
- **연구 main message 보존** — 임상 적용 sub-bullet도 논문 강조점에서 도출. 강제로 frame에 짜맞추기 X

**sub-bullet 구성 — 자연스러운 영역만**:

| sub-bullet | 작성 가능 조건 |
|---|---|
| `### 진단·평가` | 논문이 진단 기준·검사 적응증·alarm feature를 명시 |
| `### 약물·처방 디테일` | 논문이 약물 가이드 또는 처방 권고를 포함 (시스템·정책 연구는 작성 X) |
| `### 외래 결정 분기` | 논문 메시지에서 외래 결정 흐름 도출 가능 (RCT는 "어떤 환자에 적용", 메타는 "효능 기반 단계", 가이드라인은 "단계별 분기") |
| `### 환자 교육` | 논문 메시지를 한국어 외래 톤 1-2문장으로 자연스럽게 변환 가능할 때만 |
| `### 한국 외래 변환 시 확인` | 한국 brand·보험·가용성·임상 외삽 위험 영역 |

**논문 type별 sub-bullet 구성 가이드**:

- **임상 가이드형** (Annals In the Clinic / NEJM Clinical Practice / AFP) → 진단·약물·결정·교육·한국 변환 모두 자연스러움
- **RCT 효능** (NEJM RCT 등) → "어떤 환자에 적용 / 미적용 case", 환자 교육은 효능 메시지 변환, 약물 디테일은 가이드라인 default 인용
- **메타·체계적 고찰** → 효능 합성을 임상 결정에 어떻게, 약물 디테일은 가이드라인 default
- **관찰 연구** (처방 패턴·실제 사용) → "임상 시사점" 위주, 표준 약물 디테일은 별 entry 인용 (예: "[[gabapentin]] 가이드라인 표준 용량 참조")
- **시스템·정책 연구** → 약물 sub-bullet 자체 작성 X. "어떤 환자 type 적용 / 미적용 / 한국 적용 시 핵심 (의료법·자가측정 교육)" 위주

**환자 교육 한국어 standard 작성 시**:
- 외래에서 1-2분 안에 말할 수 있는 자연스러운 톤
- 진단 메시지 + 치료 메시지 + 다시 와야 할 trigger 구조 권장
- 강제 X — 논문 type상 부자연스러우면 작성 안 함 (예: 처방 패턴 분석 논문)
- LLM 자체 작성 가능한 영역 (할루시네이션 위험 낮음 — 한국어 자연 문장)

**할루시네이션 방어 강제 항목**:
1. 한국 brand명 — 논문에 없으면 추정 금지, [출처 미확인] 태그
2. 한국 보험·급여 — 논문에 없으면 추정 금지, [출처 미확인 — researcher 검증 권장] 태그
3. 약물 용량 — 논문 명시 없으면 "[가이드라인 default 인용: {출처}]" 명시
4. Red flag 임계값 — 논문 또는 가이드라인 출처 명시

## 출력 형식
```
## [논문 제목 축약]

**대상:** {환자군}
**핵심:** {1-2줄 요약}

### 추출 내용 (B2 섹션 매핑)
{임상 항목별 내용 — 각 항목 앞에 대응 섹션 key 표기, 예: "[protocol]", "[differential]"}

**저장 위치 제안:** knowledge/{경로}/{파일명}.md
**기존 파일 추가:** {예/아니오 + 섹션명(vocabulary 정합 한글 헤더)}
**파일 태그:** [{CLINICAL|REGULATORY|INSIGHTS|TIPS}]
**Tier 1 primarySources:** {저자} et al. {저널} {연도};{볼륨}({이슈}):{페이지}. PMID:{번호}, DOI:{번호}
**Tier 2 섹션별 sources:** {해당 시 섹션별로 나열, Tier 1과 동일하면 생략}
```

---

## 참조

- 섹션 표준: `knowledge/section-vocabulary.md`
- 출처 규칙: `knowledge/sourcing-rules.md`
- 데이터 흐름: `rules/data-flow.md`
- 연동 Routine: `routines/deep-extract.md`
- 수용 skill: `skills/knowledge-ingest/SKILL.md` (출력이 이 skill의 입력)
