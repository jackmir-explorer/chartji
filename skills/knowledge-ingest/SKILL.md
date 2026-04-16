# skills/knowledge-ingest/SKILL.md — Knowledge Ingest

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

### 5. 파일 템플릿 (by-disease)
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

### 7. bundle 컴파일
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
    "exam":              "문진/검사 내용 (없으면 null)",
    "treatment":         "처방/치료 내용 (없으면 null)",
    "differential":      "감별진단 상세 설명 — Draft 💡 힌트용 긴 텍스트 (없으면 null)",
    "differentialShort": "Triage 패널 표시용 구조화 배열 (없으면 null) — 형식: [{\"d\":\"진단명\",\"t\":\"h\"},...] t=h(horse/흔함) or t=z(zebra/드물지만치명적)",
    "draftTemplate":     "질환 특이 Template (없으면 null — 범용 포맷 사용)",
    "draftAppend":       "Draft 출력사항 내용 (없으면 null)"
  }
};
```

### 8. Triage 감지 확장 (자동 실행 — 묻지 않음)
새 keywords가 추가된 경우 src/prompts.js의 TRIAGE_PROMPT calcCategories 목록에 자동 추가.
형식: `  {keyword} ({관련 표현} 관련)`

### 9. log.md + index.md 업데이트
- log.md: `YYYY-MM-DD | 파일명 | 내용 한 줄 요약`
- index.md: 파일 목록 갱신
