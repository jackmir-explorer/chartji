# skills/knowledge-ingest/SKILL.md — Knowledge Ingest

> **B2 스키마 전환 중** (2026-04-19 기준 Phase 2).
> v1 레거시 경로(아래 Step 5/7 템플릿)는 기존 79 엔트리 호환 유지. 신규 엔트리는 **v2 B2 포맷** 권장 (Step 5-B / 7-B 참조).
> - 섹션 표준: `knowledge/section-vocabulary.md`
> - 출처 규칙: `knowledge/sourcing-rules.md`
> - 데이터 흐름: `rules/data-flow.md`

## 입력
미르가 제공한 임상 경험/가이드라인 raw 텍스트

## 절차

### 1. 환자 식별 정보 확인
이름·주민번호·나이·날짜·기관명 등 식별 정보 포함 시 즉시 거부.

### 2. 분류
- 질환/증상 단위 → knowledge/by-disease/{질환명}.md
- 약물 단위 → knowledge/by-drug/{약물명}.md
- 공식 가이드라인·심평원 기준·최신지견·실전 Tip → knowledge/guidelines/{파일명}.md

#### Attribution 체크 (TIPS/INSIGHTS 전용)

상세 규칙은 `knowledge/sourcing-rules.md` Attribution 원칙 참조. 핵심 요약:

분류 결과가 [TIPS] 또는 [INSIGHTS]인 경우:
1. 사용자 입력에 출처 힌트가 있으면 추출
   - "교수님 외래에서", "이비인후과 교수님이" → `by ENT교수`
   - "연수강의에서" → `by 연수강의`
   - "내가" / 미르가 직접 말한 내용 → `by 미르`
2. 힌트가 없으면 저장 전 반드시 질문:
   "이 내용의 출처를 알려주세요. (예: by 미르 / by ENT교수 / by 연수강의)"
3. 저장 형식: `[TIPS — by ㅇㅇㅇ]` / `[INSIGHTS — by ㅇㅇㅇ]`

> ⚠ **GOTCHA**: 힌트가 없을 때 "by 미르"로 임의 추정하지 말 것. 반드시 질문 먼저.

> ⚠ **GOTCHA — 약물명**: 약물의 성분명·계열·기전을 모를 때 절대 추정하지 말 것. 예) "Promac = P-CAB"처럼 자의로 분류 금지. 모르면 저장 전 반드시 미르에게 확인: "이 약의 성분/계열을 알려주세요."

### 3. 검증 (Researcher 서브에이전트에 위임)

> ⚠ **GOTCHA**: CLINICAL 항목이 하나라도 있으면 반드시 호출. Step 4(파일 저장)와 병렬 실행 가능하지만 결과 반영 전 파일 최종 확정 금지.

검증 제외 대상 (즉시 Step 4):
- guidelines/[TIPS] — 실전 경험, 문헌 검증 불필요
- guidelines/[INSIGHTS] — 최신지견, 문헌 검증 불필요

검증 대상:
- by-disease/, by-drug/, guidelines/[CLINICAL], guidelines/[REGULATORY]

절차:
1. Researcher에게 전달: 검증 대상 내용 요약 + 핵심 키워드 + 분류 태그
2. Researcher가 복수 소스 병렬 검색 후 결과 반환 (agents/researcher.md 참조)
3. 결과에 따라:

   ① 일치
      → `[출처: {저자/가이드라인명 또는 학회명}]` 태그 추가 후 Step 4

   ② 조건부 지지 (PARTIALLY SUPPORTED — 맥락에 따라 효과 다름)
      → 태그: `[CLINICAL — 조건부]`
      → 본문에 "효과 있는 조건 / 효과 미확립 조건" 명시

   ③ 미확인 (검색 한계, 틀렸다는 의미 아님)
      → 저장 중단. 미르에게 다음을 보고:
         - 미확인 항목 요약
         - 검색 시도 내용 (어떤 키워드로 찾았는지)
         → 미르가 그대로 저장([출처 미확인] 태그) or 추가 확인 결정

   ④ 불일치
      → 저장 중단. 미르에게 다음을 보고:
         - 입력 내용 요약
         - 문헌 내용 요약
         - 차이점 명시
         → 미르가 수정 or 그대로 저장([출처 미확인] 태그) 결정

### 4. 기존 파일 확인
파일이 존재하면 해당 섹션에 추가.
파일이 없으면 아래 템플릿으로 신규 생성.

#### 토큰 절감 규칙 (필수)
- **Glob 결과 = 파일 없음** → Read 없이 바로 Write로 신규 생성
- **Glob 결과 = 파일 있음** → 추가할 섹션만 Read (전체 파일 읽기 금지)
- **knowledge-bundle.js 삽입 위치** → `Grep(pattern="^};")` 으로 줄 번호 확인 후 마지막 항목 끝만 Read. 전체 파일 Read 금지.

### 5. 파일 템플릿 (by-disease) — v1 레거시

> **v1 레거시 템플릿**. 기존 79 엔트리와의 호환 유지용. **신규 엔트리는 Step 5-B(v2 B2 템플릿)를 우선 사용**한다.

파일 상단 600토큰(≈400자) 초과 시 섹션별 분리 파일로 분할.

```markdown
# {질환명}

keywords: {Triage calcCategories 값과 일치하는 키워드, 쉼표 구분}

## 문진/검사

## 처방/치료

## 감별진단

## 왜 이런 증상이 생기나 (환자설명용)

## Draft 출력사항 [DRAFT_APPEND]
```

#### 병태생리/기전 저장 규칙
- 섹션명: `## 왜 이런 증상이 생기나 (환자설명용)`
- **환자에게 설명할 수 있는 수준**으로 작성 — 전문 용어 최소화
- 비유·일상 언어 사용 권장 (예: "혈관이 좁아져서" > "동맥경화로 인한 관류 저하")
- 약물 기전도 동일: "이 약은 ~를 막아서 ~가 줄어듭니다" 형태
- 해당 내용이 없거나 단순한 질환은 섹션 생략 가능

### 5-B. 파일 템플릿 — v2 (B2) 신규 권장

`##` 헤더는 `knowledge/section-vocabulary.md`의 18개 표준 섹션 vocabulary와 정합되는 한글 제목 사용.
표준 dictionary에 없는 고유 개념은 원문 섹션명 그대로 유지 (Liby ingest가 자유 섹션으로 slugify).

```markdown
# {질환명 또는 약물명 또는 주제명}

tags: [CLINICAL|REGULATORY|INSIGHTS|TIPS]   # 파일 전체 성격
keywords: {쉼표 구분 키워드 — Triage calcCategories와 일치}

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: (미정)
applicability: (미정)
relations: []

> primarySources (Tier 1): {파일 전체 대표 출처}
> 예: `EAACI 2021 (PMID:34536239, DOI:10.1111/all.15090)`

---

## {표준 섹션 제목 — 예: 분류 기준 / 문진/검사 / 처방/치료 / 용량 / 적응증 / 감별진단 / 임신·수유 / 의뢰 기준 / 급여 기준 / 주의 / 금기}

{해당 섹션 내용}

{해당 섹션 고유 출처 있으면 Tier 2로 섹션 상단에 인용 블록:}
> 근거: {저자} et al. {저널} {연도} PMID:{번호}

---

## {자유 섹션 — 표준 dictionary에 없는 고유 개념}

{내용}
```

#### 섹션 이름 선택 가이드
- `knowledge/section-vocabulary.md` dictionary 18개 중 하나와 의미가 일치하면 해당 표준 섹션 제목 사용
- 의미가 고유하거나 복합적이면 원문 섹션명 그대로 — Liby가 slugify해서 자유 섹션 key로 보존
- `Draft 출력사항 [DRAFT_APPEND]` → v2에서는 `draft-append` 섹션으로 자동 정규화
- **`draft-template` 섹션**: dictionary 등록만 되어 있음. uiHooks 라우팅은 **Phase 3에서 재논의**로 보류 — 파일에 써도 되지만 현재는 UI로 흐르지 않음

#### 출처 처리
`knowledge/sourcing-rules.md`의 3-tier 모델 준수:
- Tier 1 `primarySources`: 파일 상단 인용 블록
- Tier 2 섹션별: 섹션 `##` 직후 인용 블록 (Tier 1과 중복 금지)
- Tier 3 inline: 표·수치·리스트 주석으로 원문 보존

#### sections[].sources[] 채움 원칙 (2026-04-22 신설 — 3층 방어선 창작층)

curation 주제 부조화 할루시네이션의 근본 원인은 섹션 sources[] 공백 → primarySources fallback 과의존. ingest 단계에서 차단한다.

1. **원칙**: 섹션 content가 Tier 1 `primarySources`로 **온전히 뒷받침되지 않으면** `sections[key].sources[]`를 반드시 채운다 (빈 배열 금지).
   - "온전히 뒷받침" = Tier 1 출처의 주제 범위가 섹션 content 주제를 포괄할 때.
   - 포괄 여부가 애매하면 채우는 쪽으로 판단 (curation fallback 의존 축소).

2. **TIPS 출처 타입 공식화**: 섹션 content가 **임상 경험·관찰·강의 기반** (문헌/가이드라인/심평원 출처가 없을 때)인 경우 → sources[]에 **TIPS 타입 문자열**을 명시 등록:
   - `"[TIPS — 임상 경험 (미르 관찰)]"`
   - `"[TIPS — by 로컬원장님]"`
   - `"[TIPS — by ENT교수]"`
   - `"[TIPS — 연수강의]"`
   → **출처가 없는 게 아니라 TIPS가 곧 출처 타입**. curation rule ⑧이 이 문자열을 그대로 `[출처: ...]`에 매핑하므로 라벨 할루시네이션이 재발하지 않는다.

3. **매핑 진짜 불가능** → ingest 중단, 미르에게 질문. `[출처 미확인]` 자동 부여 금지 (Attribution GOTCHA와 동일 원칙).

4. **Tier 1 중복 금지 예외**: 섹션 주제가 Tier 1 출처와 정확히 일치해 Tier 2에 같은 출처를 재기재해야 하는 상황이면 — Tier 2를 비워두고 Tier 1 자동 상속으로 처리 (`sourcing-rules.md` 기존 규칙).

> ⚠ **GOTCHA — sources[] 공백 방치 금지**: 2026-04-21 오젬픽 재진 QA에서 섹션 라벨 `[출처: obesity.notes]`가 3건 발생한 뿌리 원인. prompt 사후 패치로 막았지만 창작층에서 sources[] 채워야 근본 해소. Phase 5b (미르 담당) 전이라도 신규 ingest부터는 적용.

#### 병태생리/기전 저장 규칙 (v2)
- 표준 섹션 `notes`로 저장: `## 왜 이런 증상이 생기나 (환자설명용)` → Liby가 `notes`로 정규화
- 내용 작성 원칙은 v1과 동일: 환자 설명 가능한 수준, 비유·일상 언어

### 5-C. 섹션↔출처 주제 일치 자가검증 (2026-04-22 신설 — 3층 방어선 창작층)

curation rule ⑧ "주제 일치" 조건의 **사전 방어선**. 저장 직전 Liby가 스스로 확인한다.

절차:
1. 각 섹션에 대해 content 주제 키워드 1~2개 추출 (예: `adaptive thermogenesis`·`렙틴` / `HFrEF 4제 요법`·`SGLT2i`).
2. 해당 섹션 `sources[]` 항목별로 주제 키워드와 source 문자열(저자·저널·가이드라인명·TIPS 라벨) 비교.
3. 판정:
   - ✓ 주제 키워드와 source 문자열에 공통 개념이 있음 → 유지
   - ✗ 명백한 부조화 (공통 단어·개념 0) → 해당 source 제거 또는 섹션 분리
   - 애매 → 미르에게 보고. 자동 매핑 금지.
4. TIPS 라벨 source는 자가검증 면제 (TIPS는 주제 매핑이 아니라 **출처 타입 선언**이기 때문).

예시 (좋음):
- 섹션 `## 단백질 섭취` + sources `["Noronha JC. Obes Pillars 2025;17:100234. PMID:41322078"]` → "단백질" 키워드가 source Obes Pillars 주제 범주와 일치 ✓

예시 (나쁨):
- 섹션 `## adaptive thermogenesis` + sources `["Acosta A. Mayo Clinic 비만 표현형. Obesity 2021"]` → "표현형" 논문이 "적응성 열발생" 주제 아님 → source 제거 후 정확한 출처로 교체 or 미르에게 보고.

목적: primarySources fallback 의존을 줄여 curation 할루시네이션 재발 차단. 감사층(auditor)이 사후 잡는 것보다 창작층에서 걸러내는 게 우선.

### 5-D. auto-wikilinks 삽입 (2026-04-24 R2 신설)

ingest 시 본문 중 **기존 엔트리 keywords와 완전 일치하는 토큰**을 Obsidian wikilinks로 자동 변환한다.

절차:
1. `knowledge/by-disease/`·`by-drug/`·`guidelines/` 스캔하여 모든 엔트리 key + keywords 집계 (myth-log/ 제외)
2. 현재 ingest 대상 md 본문에서 각 keyword와 완전 일치하는 토큰 탐색 (대소문자·한글 어미 엄격 매칭)
3. **섹션당 첫 등장 1회만** `[[target-key|원문 토큰]]` 형식으로 변환 (중복 wikilinks 방지)
4. 자기 자신 key는 제외
5. `relations[]` 필드에 명시된 target은 kind 힌트로 활용 가능 (parent kind는 parent 맥락 wikilinks, 단 Wave 1에선 keyword 매칭만 필수)

주의:
- wikilinks는 md 본문 내부에만 — **frontmatter 블록, sources[] 내부 금지**
- 애매한 토큰(일반 어휘와 우연 일치)은 skip 후 세션 기록에 오변환 후보 목록 첨부
- myth-log/ 엔트리 본문은 wikilinks 삽입 대상 **포함** (Obsidian 공부 자원). 단, myth-log key 자체가 target이 되는 건 금지(inject 격리 원칙)

예:
- 원문: `obesity 환자에서 GLP-1 RA 처방 시 모니터링 필요`
- 변환: `[[obesity|obesity]] 환자에서 [[mounjaro|GLP-1 RA]] 처방 시 [[ckd-monitoring|모니터링]] 필요` (섹션 첫 등장만)

목적: Obsidian 그래프 뷰에서 엔트리 간 연결 가시화 — 미르 공부 자원.

#### 5-D.1 token-target 우선순위 (2026-05-06 보강 — Wave 1 cross-keyword 오변환 학습)

같은 토큰이 여러 target entry의 keywords에 등장할 때 **target priority** 적용:

1. 토큰 == target.key (정확 일치) — **최우선**
2. 토큰 == target.keywords[0] (canonical synonym) — **차순위**
3. 토큰 == target.keywords[1+] (보조 별칭·관련 개념) — **단독 매칭일 때만** 적용

**충돌 해소**: 같은 토큰이 후보 A(우선순위 1·2) + 후보 B(우선순위 3) 동시 매칭 시 → 후보 A로만 변환, 후보 B는 **skip + `ambiguous-token` 로그**.

**예시 — Wave 1에서 학습된 오변환**:
- `MASH` entry keywords에 "GLP-1" 포함 (보조 개념) vs `glp1` entry keywords[0] == "GLP-1" → 토큰 "GLP-1"은 `[[glp1|GLP-1]]`로만 변환, `[[MASH|GLP-1]]` 차단
- `zepbound` entry keywords에 "마운자로" 포함 (cross-brand) vs `마운자로` entry key == "마운자로" → 토큰 "마운자로"는 `[[마운자로|마운자로]]`로만 변환, `[[zepbound|마운자로]]` 차단

**섹션당 토큰 1회 강화**: 같은 섹션 내 동일 토큰은 wikilinks 1개만 허용 (target 다르더라도). 5-D 본 규칙의 "섹션당 첫 등장 1회만"을 (섹션, 토큰) 단위로 엄격 해석 — Wave 1에서 (섹션, target) 단위로 느슨하게 해석되어 동일 토큰이 여러 target으로 분산 변환된 사례 차단.

### 5-A. 긴 문서 축약 규칙

적용 조건: 원문이 600토큰(≈400자) 초과하는 가이드라인·심평원 자료·진단기준

#### 반드시 보존
- 수치 기준 (BMI ≥30, HbA1c ≥7 등 — 수치 변경 절대 금지)
- 절대금기 전체
- 급여 코드 · 기준 고시 날짜
- 1차의료 적용 가능 여부

#### 축약 가능
- 배경·역학·도입 경위
- 근거 등급 해설 (결론 수치만 보존)
- 전문과 전용 세부 처치 내용
- 중복 표현·예시

#### 마커 규칙
- 파일 최상단에 `[축약됨 — 원문: {가이드라인명 또는 출처}]` 표기
- 수치는 축약 불가이므로 별도 표시 불필요

#### 분량 목표
- by-disease, by-drug: 400자 이내
- guidelines/[CLINICAL], [REGULATORY]: 600자 이내

### 6. guidelines 태그
파일명 또는 헤더에 태그 표기:
- 임상 가이드라인: [CLINICAL]
- 심평원·급여 기준: [REGULATORY]
- 최신지견 (연구·트렌드): [INSIGHTS]
- 실전 Tip (경험 기반 요령): [TIPS]

### 7. bundle 컴파일 — v1 레거시 포맷

> **v1 레거시 포맷**. 기존 79 엔트리 호환 유지용. **v2 B2 포맷은 Step 7-B 참조** — 단, v2 엔트리 컴파일 경로는 **Phase 3 runtime 지원(`src/knowledge-bundle.js` v1/v2 공존) 후 활성화**된다.

내용 변경 후 반드시 src/knowledge-bundle.js 재생성.

형식:
```javascript
/* knowledge-bundle.js — Librarian 자동 생성. 직접 편집 금지. */
var KNOWLEDGE_BUNDLE = {
  "{keyword}": {
    "context": "문진/검사 + 처방/치료 + 감별진단 합본 (600토큰 이하)",
    "draftAppend": "주의사항 내용 (없으면 null)"
  }
};
```

keywords 배열의 각 항목을 키로 등록.
Triage calcCategories 값(dyslipidemia, osteoporosis, depression, diabetes, obesity)과 일치시킬 것.

BUNDLE 필드 구조 (섹션별 분리):
```javascript
var KNOWLEDGE_BUNDLE = {
  "{keyword}": {
    "kind":              "\"disease\" or \"drug\" (필수 — 아래 7-A 분류 기준)",
    "exam":              "문진/검사 내용 (없으면 null)",
    "treatment":         "처방/치료 내용 (없으면 null)",
    "differential":      "감별진단 상세 설명 — Draft 💡 힌트용 긴 텍스트 (없으면 null)",
    "differentialShort": "Triage 패널 표시용 구조화 배열 (없으면 null) — 형식: [{\"d\":\"진단명\",\"t\":\"h\"},...] t=h(horse/흔함) or t=z(zebra/드물지만치명적)",
    "draftTemplate":     "질환 특이 Template (없으면 null — 범용 포맷 사용)",
    "draftAppend":       "Draft 출력사항 내용 (없으면 null)"
  }
};
```

### 7-B. bundle 컴파일 — v2 (B2) 포맷 소개

> **활성 조건**: Phase 3 runtime (`src/knowledge-bundle.js` v1/v2 공존 허용) 구현 완료 후.
> Phase 2 시점에는 **설계서 역할만** — 실제 컴파일 경로는 미작동.

v2 엔트리 형상:
```javascript
var KNOWLEDGE_BUNDLE = {
  "{keyword}": {
    "kind":           "\"disease\" | \"drug\" | \"topic\" | \"myth\" (myth는 inject 격리)",
    "keywords":       ["...synonyms"],
    "version":                       "(미정) — R1 예약",
    "supersedes":                    "(미정) — R1 예약",
    "freshness.primarySourceYear":   "(미정) — R1 예약",
    "applicability":                 "(미정) — R1 예약",
    "relations":      [
      // R2 예약 — 예: { "kind": "coprescribe", "target": "obesity" }
      // kind 5종: parent·coprescribe·contraindicate·supersede·synergy
    ],
    "primarySources": ["파일 전체 Tier 1 출처 배열"],
    "sections": {
      "{표준 섹션 key}":  { "content": "...", "sources": ["섹션 Tier 2 출처(Tier 1과 중복 시 생략)"] },
      "{자유 섹션 key}":  { "content": "...", "sources": [...] }
    },
    "uiHooks": {
      "hint":        ["section key 배열 — 기본값은 section-vocabulary.md kind별 기본값 상속"],
      "guide":       ["section key 배열"],
      "draftAppend": ["section key 배열 | null"]
    }
  }
};
```

> **2026-04-24 R1/R2 메타필드 예약**: `version`·`supersedes`·`freshness.primarySourceYear`·`applicability`·`relations[]` 5개 필드는 **bundle consumer가 아직 소비하지 않음**. md 파일 상단에 빈 값(`(미정)` / `[]`)으로 예약만. Phase 5 이후 runtime 편입 시 재활성화.

엔트리별 uiHooks 오버라이드는 `rules/data-flow.md`의 primary 셀 원칙을 위반하지 않는 범위에서만 허용.
RedFlag 대상 노출은 uiHooks 어떤 필드에도 **절대 금지** (§rules/data-flow.md §2).

#### uiHooks 기본값 상속 (2026-04-21 Phase 6 적용)

`src/app.js` `UIHOOKS_DEFAULTS` + `getUiHooks()` 로 kind별 기본값 상속 구현됨. 엔트리 작성 시:

- **kind 기본값과 완전 동일** → `"uiHooks": null` 로 저장 (필드 전체 생략). 상속으로 resolve.
- **일부 필드만 다름** → `"uiHooks": { "hint": [...] }` 처럼 다른 필드만 명시 (필드별 partial override 지원). 명시하지 않은 필드는 기본값 상속.
- **전혀 다른 커스텀** → 전 필드 명시. 이유를 주석으로 남겨 미래 엔트리가 기본값 복귀 여부 판단 가능하게 함.

예) `위고비` 엔트리는 drug 기본값(`hint: indication,dosing,schedule`)과 다르게 `hint: dosing,contraindication`으로 customize — 이유는 "비만약은 schedule 불필요, 금기/용량이 최우선" (Phase 5c 회고).

> ⚠ **GOTCHA — 중복 저장 금지**: 기본값과 동일한 필드를 관행적으로 복붙해 저장하면 D 리팩터(Phase 6) 효과 무력화. 기본값 확인 후 생략.

#### parents 메타 필드 판단 (2026-04-21 도입 — 영구 규칙)

모든 ingest에서 저장 전 반드시 수행 (미르 지시, 2026-04-21):

1. **child 후보 판단**: 이 엔트리의 기본 문진·감별·draft가 더 상위 개념 엔트리에 있다면 parent 후보.
   - 예: `BPPV`의 어지럼증 11항목 문진·감별진단 6개는 `dizziness` 엔트리에 이미 상세 저장 → `parents: ["dizziness"]`
   - 예: `위고비`의 BMI·생활요법 상위 맥락은 `obesity` 엔트리에 → `parents: ["obesity"]`
2. **parent 선행 존재 확인**: 모든 parent key가 bundle에 실제 존재해야 ingest 진행.
   - 미존재 parent 발견 → ingest 중단. 미르에게 보고: "parent `___` 엔트리가 bundle에 없습니다. 먼저 ingest 후 재시도하거나 parents에서 제외하시겠습니까?"
   - silent-skip 동작은 런타임 보호 장치일 뿐, ingest 단계에서는 **명시적 판단 필수**.
3. **부여 제외 케이스**:
   - 상위 엔트리가 bundle에 없음 → parents 배열에 넣지 않음
   - `kind: "topic"` 엔트리 → parents 부여 금지 (`section-vocabulary.md` parents 규칙)
   - vaccination 계열처럼 schedule 참조 링크로 이미 간접 주입되는 구조 → 부여 보류 (설계 제약 (b) 택일)
4. **저장 형식**: 엔트리 루트에 `"parents": ["key1","key2"]` 배열 추가 (단일 string 불허). v1/v2 shape 혼재 허용.
5. **금지**: parents 확장으로 인한 기존 엔트리 본문 수정 — parents는 child→parent 단방향 참조만 추가한다 (parent 본문 편집 금지).

> ⚠ **GOTCHA — parents 판단 생략 금지**: Triage가 child 단독 감지 시 상위 맥락 누락 사고 재발 방지 (BPPV→dizziness 문진 11항목 누락 사건, 2026-04-21 Phase 6 후속). ingest 체크리스트의 **영구 항목**.

#### kind 부여 일관성 점검 (2026-04-21 Phase 6 GOTCHA)

ingest 완료 후 반드시 확인:
- `knowledge/by-drug/{파일}.md` → bundle에 `kind: "drug"` 엔트리가 **실제로 등록**되었는지 Glob/grep으로 확인
- 파일은 있으나 bundle 엔트리가 없는 경우(예: `mucomyst.md` · `pilocarpine.md` Phase 6 스캔에서 발견) → **분리 ingest 누락**. 기존 disease 엔트리 treatment에 내용이 묻혀있다면 drug 엔트리로 별도 등록 필요.

### 7-A. kind 필드 분류 기준 (필수)

모든 엔트리는 반드시 `kind: "disease"` · `kind: "drug"` · `kind: "topic"` 중 하나를 가진다. 기본값 없음 — 누락 시 bundle 불완전.

> **v2 추가**: `topic` kind는 전략·주제 문서용 (예: `glp1-selection-strategy.md`). hint에 뜨지 않고 Guide tab에서만 큐레이션된다. v1 레거시는 disease/drug 2종 체제.

#### drug (약물)
**조건:** 엔트리 키가 **명시적인 약물 상품명·성분명·계열명**일 때만.
- 예: 위고비, wegovy, semaglutide, 마운자로, mounjaro, tirzepatide, zepbound, 오젬픽, ozempic
- 약물의 용량·적응증·보험급여·금기 정보가 treatment 본문의 중심일 때

> ⚠ **GOTCHA**: 키가 영어 성분명이어도 "그 성분의 계열/기전을 내가 확실히 안다"는 확신이 없으면 drug로 자의 분류 금지. 기존 Step 2의 "약물명 GOTCHA"와 동일 원칙 — 모르면 미르에게 확인.

#### disease (질환·증상·백신접종 카테고리)
**조건:** 엔트리 키가 **질환명·증상명·예방접종 카테고리**일 때.
- 예: BPPV, 비만, obesity, 구강건조증, LPR, 후각감퇴
- **백신류 포함**: Tdap, MMR, HPV, Shingrix, 싱그릭스, 조스타박스, 폐렴구균 등
  - 이유: 진료 현장에서 "질환 예방 상담" 맥락으로 쓰임 → Liby hint에 원칙이 떠야 자연스러움
  - 순수 "약 제품명"만 drug, 백신은 disease (2026-04-17 Phase 2 #1 세션 확정)

#### 경계 케이스 판단
- 약물명이 질환 맥락에서 쓰이면 → disease (예: "싱그릭스" 키는 대상포진 예방 상담에 쓰임 → disease)
- 질환명이지만 treatment 본문이 특정 약물의 용량/보험에만 집중하면 → 해당 약물명으로 별도 drug 엔트리 추가를 우선 검토
- **topic 판정 (v2)**: 특정 질환·약물에 귀속되지 않는 **전략·선택 기준·주제 문서**는 topic. 예: `glp1-selection-strategy.md` (위고비 vs 마운자로 선택 전략)

#### 자동 부여 규칙 (Ingest 시)
- knowledge/by-disease/{파일}.md → 해당 파일의 모든 keyword 엔트리 → **disease**
- knowledge/by-drug/{파일}.md → 해당 파일의 모든 keyword 엔트리 → **drug**
- 단, **by-drug 내 백신 파일**(tdap.md, shingrix가 포함된 herpes-zoster-vaccine.md 등)은 예외: keyword가 백신 카테고리면 disease로 부여
- 경계 판단이 애매하면 저장 전 미르에게 질문

### 8. Triage 감지 확장 (자동 실행 — 묻지 않음)
새 keywords가 추가된 경우 src/prompts.js의 TRIAGE_PROMPT calcCategories 목록에 자동 추가.
형식: `  {keyword} ({관련 표현} 관련)`

### 9. log.md + index.md 업데이트
- log.md: `YYYY-MM-DD | 파일명 | 내용 한 줄 요약`
- index.md: 파일 목록 갱신

### 10. 외부 entry 참조 — wikilinks 형식 의무 (2026-05-05 신설)

knowledge md에서 다른 entry를 참조할 때는 **반드시 옵시디언 wikilinks `[[entry-name]]` 형식**을 사용한다. 이는 옵시디언 그래프뷰에서 entry간 연결을 시각화·탐색하기 위한 필수 규칙.

**OK 형식**:
- `[[hyposmia]]` — 옵시디언이 자동으로 `knowledge/by-disease/hyposmia.md`로 link
- `([[ibs]] 참조)` — 괄호·문장에 자연 삽입
- `관련 [[meniere]]` — 추론·연관 표시

**금지 형식**:
- ❌ `` `hyposmia.md` `` — backtick 코드 형식. 옵시디언 link 인식 X
- ❌ `[hyposmia](by-disease/hyposmia.md)` — markdown link. 옵시디언이 인식하나 wikilinks가 더 자연·일관
- ❌ `knowledge/by-disease/hyposmia.md 참조` — plain text path. link X

**적용 영역**:
- `## 의뢰 기준` 섹션의 cross-reference
- `## 비고` / `## notes` 섹션의 관련 entry 언급
- 본문 inline 어디든 (예: "동반 시 [[functional-dyspepsia]] 참조")
- knowledge/by-drug/·guidelines/ 파일도 동일 적용

**확인 절차**:
- 신규 entry ingest 시 외부 참조 모두 `[[X]]` 형식인지 자가 검증
- 기존 entry 보강 시 새 참조도 동일 적용
- Auditor가 정기 감사로 누락·잘못된 형식 검출 (`agents/auditor.md` link 감사 기준 참조)

> 미래 entry rename·삭제 시 dangling wikilinks가 발생할 수 있음. Auditor가 detect → 보완.

---

## 참조

- B2 스키마 설계서: `sessions/2026-04-18-b2-schema-design.md`
- 섹션 표준: `knowledge/section-vocabulary.md`
- 출처 규칙: `knowledge/sourcing-rules.md`
- 데이터 흐름 매트릭스: `rules/data-flow.md`
- 입력 skill: `skills/paper-extract/SKILL.md` (Deep Extract routine 산출)
- Librarian agent: `agents/librarian.md`
