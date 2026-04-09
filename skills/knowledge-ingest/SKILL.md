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

### 3. 검증 (분류 결과에 따라 적용 범위 다름)

검증 제외 대상 (즉시 다음 단계로):
- guidelines/[TIPS] — 실전 경험, 문헌 검증 불필요
- guidelines/[INSIGHTS] — 최신지견, 문헌 검증 불필요

검증 대상:
- by-disease/, by-drug/, guidelines/[CLINICAL], guidelines/[REGULATORY]

검증 절차:
1. WebSearch로 핵심 키워드 + 프로토콜명 검색 (PubMed, UpToDate, 학회 가이드라인 우선)
2. 결과에 따라 세 가지 처리:

   ① 문헌 찾음 + 내용 일치
      → `[출처: {저자/가이드라인명 또는 학회명}]` 태그 추가 후 저장

   ② 문헌 못 찾음 (검색 한계, 틀렸다는 의미 아님)
      → `[출처 미확인]` 태그 추가 후 저장

   ③ 문헌 찾음 + 내용 불일치
      → 저장 중단. 미르에게 다음을 보고:
         - 입력 내용 요약
         - 문헌 내용 요약
         - 차이점 명시
         → 미르가 수정 or 그대로 저장([출처 미확인] 태그) 결정

### 4. 기존 파일 확인
파일이 존재하면 해당 섹션에 추가.
파일이 없으면 아래 템플릿으로 신규 생성.

### 5. 파일 템플릿 (by-disease)
파일 상단 600토큰(≈400자) 초과 시 섹션별 분리 파일로 분할.

```markdown
# {질환명}

keywords: {Triage calcCategories 값과 일치하는 키워드, 쉼표 구분}

## 문진/검사

## 처방/치료

## 감별진단

## Draft 출력사항 [DRAFT_APPEND]
```

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
    "exam":          "문진/검사 내용 (없으면 null)",
    "treatment":     "처방/치료 내용 (없으면 null)",
    "differential":  "감별진단 내용 (없으면 null)",
    "draftTemplate": "질환 특이 Template (없으면 null — 범용 포맷 사용)",
    "draftAppend":   "Draft 출력사항 내용 (없으면 null)"
  }
};
```

### 8. Triage 감지 확장 (자동 실행 — 묻지 않음)
새 keywords가 추가된 경우 src/prompts.js의 TRIAGE_PROMPT calcCategories 목록에 자동 추가.
형식: `  {keyword} ({관련 표현} 관련)`

### 9. log.md + index.md 업데이트
- log.md: `YYYY-MM-DD | 파일명 | 내용 한 줄 요약`
- index.md: 파일 목록 갱신
