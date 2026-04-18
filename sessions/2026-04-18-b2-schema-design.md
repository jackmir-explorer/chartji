# 2026-04-18 B2 스키마 설계안 (Liby 세션용 입력)

> 이 문서는 **내일 Liby 세션의 설계서 역할**을 한다.
> 오늘 미르와의 토론에서 확정된 방향을 구현 전 설계 산출물로 보존.

---

## 배경 요약

오늘 1번 과제(Liby 힌트 vs Guide tab 역할 분리 복원)를 다루다 미르가 본질적 질문을 제기:
> "knowledge에 포함된 md 문서 내용이 되게 많은데, 그게 treatment/differential/draftAppend/exam 4개로만 쪼개진다는거지?"

확인 결과:
- 현재 bundle 스키마(`exam`/`treatment`/`differential`/`draftAppend`/`draftTemplate`)가 원본 md의 풍부한 섹션을 **공격적으로 압축 손실**하고 있음
- `mounjaro.md`의 5개 섹션(적응증/실비보험/시작 용량/최대 용량/감량 속도)이 `treatment` 단일 필드로 뭉쳐져 **출처·구조 대부분 소실**
- `urticaria.md`(8개 섹션)는 **아예 bundle에 ingest 실패** (knowledge-bundle.js에 없음) — 스키마가 엔트리 형상을 표현 못 함
- 어제 Chrome 검증에서 "BPPV 모든 bullet `[출처 미확인]`" 문제의 진짜 원인: 원본 md가 아니라 **bundle 컴파일 단계에서 출처 증발**

## 스키마 선택 — **중간(B2)** 확정

### 3가지 안 비교

- **B1 (고정 확장)**: 현재 5필드에 drug용 `indication`/`dosing`/`insurance` 등 추가. → 새 지식 유형 출현마다 스키마 migration + 79 엔트리 재ingest. 미르 우려 직격("분류 문제 반복").
- **B2 (섹션 딕셔너리, 중간)**: **채택**. 표준 섹션 vocabulary + 자유 섹션 허용. 아래 상세.
- **C (원문 md 참조)**: 비용 폭증 + dual source of truth + Liby 역할 혼란. 별도 Phase 필요.

### B2 중간 스키마 구조

```jsonc
{
  "kind": "disease" | "drug" | "topic",
  "keywords": [...synonyms],
  "primarySources": ["EAACI 2021 (DOI:.../all.15090)", ...],   // 파일 전체 Tier1 출처

  "sections": {
    // 표준 섹션 (Liby가 dictionary 기반 정규화)
    "classification":  { "content": "...", "sources": [...] },
    "protocol":        { "content": "...", "sources": [...] },
    "monitoring":      { "content": "...", "sources": [...] },
    "pregnancy":       { "content": "...", "sources": [...] },
    ...

    // 자유 섹션 (원문 섹션명 slugify, dictionary에 없는 개념)
    "ocs-short-term-limit": { "content": "...", "sources": [...] },
    "not-recommended":      { "content": "...", "sources": [...] }
  },

  "uiHooks": {
    "hint":        ["protocol"],
    "guide":       ["classification","monitoring","pregnancy","ocs-short-term-limit","not-recommended","referral"],
    "draftAppend": null
  }
}
```

### B2의 핵심 특성

1. **한 섹션 → 한 UI (uiHooks)**: 중복 원천 차단.
2. **출처가 섹션 단위**: 3-tier (Tier1 파일, Tier2 섹션, Tier3 inline)와 자연 정합.
3. **스키마 불변**: 새 지식 유형 출현 시 섹션명만 추가. migration 불필요.
4. **UI 코드 단순화**: `uiHooks.hint.forEach(k => ...)` 순회 1회, if 체인 제거.
5. **정보 보존**: 표·리스트·subsection 마크다운 원문 유지.

---

## Multi-entity 파일 처리 — **β 확정**

한 md 파일에 여러 독립 주제가 있는 경우 (`hepatitis-ab-vaccine.md` = A형+B형, `varicella-mmr-polio-vaccine.md` = 3개 백신):

**β — 서브-엔트리 분할**:
- Liby ingest가 `## 서브타입` 헤더 기준으로 쪼개서 bundle에 독립 엔트리 생성
- `hepatitis-ab-vaccine.md` → `bundle.hepatitisA`, `bundle.hepatitisB`
- `varicella-mmr-polio-vaccine.md` → `bundle.수두`, `bundle.MMR`, `bundle.폴리오`
- 파일 관리의 편의성 유지 (관련 지식 한 파일에 묶어둠) + bundle 단위는 명확 분리

**topic kind**: `glp1-selection-strategy.md` 같은 전략/주제 문서는 `"kind": "topic"`으로 ingest. hint에는 안 뜨고 Guide tab에서만 활용.

---

## 섹션 표준화 — **중간(표준 dictionary + 자유 섹션 허용)**

### 표준 섹션 vocabulary 초안

의료 지식에 공통적으로 반복되는 개념만 표준화. 각 표준 섹션은 정의·동의어·설명 보유.

| 표준 섹션 key | 정의 | 정규화 대상 동의어 (예시) |
|---|---|---|
| `definition` | 질환·약물 정의 | 정의, 개요 |
| `classification` | 분류 기준 | 분류 기준, 분류 |
| `exam` | 문진/신체진찰 | 문진, 문진/검사, 진찰 |
| `protocol` | 단계별 치료 프로토콜 | 처방/치료, 처방 프로토콜, 단계별 처방 |
| `dosing` | 용량/용법 (약물용) | 용량, 용법, 시작 용량, 최대 용량, 증량 |
| `indication` | 적응증 (약물용) | 적응증, 처방 적응증, 접종 대상 |
| `monitoring` | 모니터링 도구/검사 | 모니터링, 추적검사 |
| `contraindication` | 금기 | 금기, 절대 금기, Contraindications |
| `precaution` | 주의사항 | 주의, 상대적 주의, Precautions |
| `pregnancy` | 임신·수유 | 임신, 임신·수유, 임신·수유부 프로토콜 |
| `differential` | 감별진단 | 감별진단, 감별 |
| `referral` | 의뢰 기준 | 의뢰 기준, 일차의료 의뢰 |
| `insurance` | 급여/보험 | 급여 기준, 실비보험 활용, 한국 급여 |
| `comparison` | 약물 간 비교 | 비교, 위고비와의 관계 |
| `notes` | 환자 설명용/기타 | 왜 이런 증상이 생기나, 기타 특이사항 |
| `sources` | 출처 요약 | 출처 요약, 참고문헌 |

### 자유 섹션

표준 dictionary에 없는 개념은 원문 섹션명 slugify해서 유지.
- 예: `"NOT Recommended"` → `not-recommended`
- 예: `"가글 처방 제조법"` → `gargle-recipe`

### uiHooks 기본값 (kind별)

```
disease 기본:
  hint:  ["protocol"]
  guide: ["classification","exam","monitoring","contraindication","pregnancy","referral","differential"]
  draftAppend: null

drug 기본:
  hint:  ["dosing","indication"]
  guide: ["contraindication","precaution","comparison","insurance"]
  draftAppend: null

topic 기본:
  hint:  []
  guide: ["*"]   // 전부 큐레이션
  draftAppend: null
```

엔트리마다 오버라이드 가능 (예: mounjaro의 "실비보험 활용"을 hint로 승격하고 싶으면 uiHooks 수정).

---

## Auditor 규칙 확장 — Vocabulary drift 감지

`agents/auditor.md` 감사 기준 표에 1행 추가:

| 항목 | 판단 기준 |
|---|---|
| **자유 섹션명 파편화** | 의미상 동일한 자유 섹션이 다른 이름으로 공존 → 표준 섹션으로 승격 or 섹션명 통일 제안 |

출력 템플릿에 섹션 추가:
```
## 📚 Vocabulary 정규화 제안
- 유사 자유 섹션 군: [파일명:섹션명, ...]
  제안: 통일명 "___" or 표준 섹션 "___"으로 승격
```

**실행 조건**: B2 스키마가 깔린 후에만 유의미 (현재 bundle은 섹션 개념 없음).

---

## 점진 Migration 전략

B2는 big-bang 아닌 점진 가능:

1. `knowledge-bundle.js` 스키마는 **v1(레거시 4필드) / v2(B2 sections) 공존 허용**
2. `src/app.js`는 엔트리에 `sections` 있으면 신규 경로, 없으면 레거시 경로
3. 레거시 엔트리는 Liby가 건드릴 때(내용 업데이트, 출처 보강 등) 기회에 B2로 변환
4. 목표: 향후 N주 내 전체 B2 전환

**오늘 Pre-patch와의 관계**: 오늘 `src/app.js:78-79` 제거는 **레거시 경로** 기준 버그 수정. B2 경로는 uiHooks로 어차피 중복 불가 구조라 pre-patch와 무관하게 안전.

---

## Liby 세션(내일)의 작업 목록

**Phase 1 — 설계 확정 (~1시간)**
1. 표준 섹션 dictionary 최종안 확정 (위 16개 ±)
2. `knowledge/section-vocabulary.md` 신설 (dictionary + 정규화 규칙)
3. uiHooks 기본값 3종(disease/drug/topic) 확정
4. 출처 3-tier 규칙 최종 문구 확정 (`knowledge/sourcing-rules.md` 신설)

**Phase 2 — 도구 개정**
5. `agents/librarian.md` ingest skill 전면 개정 (v1→v2 컴파일 규칙)
6. `agents/auditor.md` vocabulary drift 규칙 추가
7. `skills/librarian/SKILL.md` (있다면) 개정

**Phase 3 — Runtime 지원**
8. `src/knowledge-bundle.js` v1/v2 공존 허용 (현재는 v1만)
9. `src/app.js` uiHooks 경로 추가 (Liby 힌트 · Guide · Draft append 전부)
10. `src/prompts.js` KNOWLEDGE_CURATION_PROMPT를 uiHooks 기반으로 조정 (오늘 추가한 분업 문구는 그대로 유효, 경로만 바뀜)

**Phase 4 — 마이그레이션 시작**
11. `rules/data-flow.md` 신설 (B2 기준 UI surface × section 매트릭스, RedFlag 격리 원칙, Architect/Designer 계약)
12. 검증용 3개 엔트리 B2 변환 (mounjaro / wegovy / urticaria) → Chrome 실기 검증
13. 나머지 77 엔트리는 Liby가 건드릴 때 점진 변환

**Phase 5 — handoff**
14. 오늘의 handoff 문서 대체/아카이빙 방침 결정

---

## 오늘 세션에서 미확정으로 남긴 항목

- 표준 섹션 dictionary의 **구체 entry 16개** — 초안만 있음, 미르 확정 필요
- uiHooks 기본값의 **kind별 목록** — 초안만 있음, 미르 확정 필요
- 점진 migration 기간 — 미정 (향후 N주)
- `draftAppend` vs Working Draft literal append 중복 최종 처리 — B2 uiHooks에서 `draftAppend`가 Working Draft primary 맞는지, Guide에도 일부 뜰지 결정 필요

이 항목들은 내일 Liby 세션 Phase 1에서 확정.

---

## 참조

- 원래 handoff: `sessions/2026-04-17-handoff-to-next-session.md`
- 오늘 1번 세션: `sessions/2026-04-18-liby-hint-guide-role-restore.md`
- Architect 신설: `sessions/2026-04-18-architect-agent-new.md`
