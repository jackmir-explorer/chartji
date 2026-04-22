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
