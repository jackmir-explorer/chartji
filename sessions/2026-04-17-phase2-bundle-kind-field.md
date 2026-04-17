# sessions/2026-04-17-phase2-bundle-kind-field.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 2 #1 — KNOWLEDGE_BUNDLE 엔트리에 `kind` 메타데이터 추가 (disease/drug 분류)
- 건드린 파일: `src/knowledge-bundle.js` (단일)

---

## Designer 설계서

### 범위 체크
- 단일 기능 단위: ✓ (Phase 2의 4개 항목 중 #1만 단독 수행)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (메타데이터 추가, 문자열 내용 무변경)
- 이전 세션 완료: ✓ (Phase 1 hotfix 검증 완료)
- → 통과

### 분류 원칙
- **drug**: 순수 약물명·성분명·제품명 (위고비/wegovy/semaglutide/마운자로/mounjaro/tirzepatide/zepbound/오젬픽/ozempic)
- **disease**: 질환명·증상명·백신 접종 카테고리 (백신류는 "질환 예방 상담" 맥락으로 hint 표시 필요 → disease)
- 미르 승인: 선택 A (백신류 = disease) 채택

### 변경 목록
- 79개 엔트리 각각에 `"kind": "disease"` 또는 `"kind": "drug"` 필드 삽입
- 기존 exam/treatment/differential/draftTemplate/draftAppend 문자열 무변경

---

## Builder 결과

### 실행 방식
- Edit 도구로 각 엔트리 개별 수정 (replace_all=false)
- 파일 내 고유성 확보: `  "키": {` + 다음 줄 앞부분 조합
- 배치 크기: 9~10개씩 병렬 호출, 총 8배치

### 결과 카운트 (Bash node 검증)
```
total: 79
no kind: 0
drug: 9
disease: 70
```

### drug 분류 (9)
위고비, wegovy, semaglutide, 마운자로, mounjaro, tirzepatide, zepbound, 오젬픽, ozempic

### disease 분류 (70)
BPPV, 이석증, dizziness, 어지럼증, vertigo, vaccination, 예방접종, 백신, Tdap, 파상풍, 대상포진, 폐렴구균, HPV, 자궁경부암, obesity, 비만, 구강건조증, 구강건조, dry mouth, xerostomia, burning mouth, 구강작열감, BMS, 구강병변, oral white patch, 구강궤양, LPR, 후두염, 인후두역류, 저음성난청, 귀먹먹함, 이충만감, lichen planus, A형간염, hepatitis A, B형간염, hepatitis B, herpes zoster, shingrix, 싱그릭스, 조스타박스, pneumococcal, 인유두종바이러스, 가다실, 일본뇌염, Japanese encephalitis, 광견병, rabies, 수두, varicella, MMR, 홍역, 풍진, 폴리오, IPV, 후각감퇴, 후각기능저하, hyposmia, anosmia, 후각소실, 냄새 못맡음, 후각저하, dysphonia, 쉰목소리, hoarseness, 목소리이상, 경부종괴, neck mass, 림프절염, lymphadenitis

---

## Reviewer 결과

| 항목 | 결과 |
|---|---|
| kind 필드 개수 | ✅ 79/79 |
| drug 분류 정확성 | ✅ 9개 모두 순수 약물 |
| disease 분류 정확성 | ✅ 70개 질환/증상/백신접종 카테고리 |
| 임상 문자열 변경 여부 | ✅ 0자 변경 |
| JSON 문법 | ✅ `node -e "eval(...)"` 통과 |
| 건드리지 않은 파일 | ✅ app.js / api.js / panels.js / sections.js / templates.js / ingest skill 전부 무수정 |
| 기존 주입 로직 영향 | ✅ `kind` 소비 로직 없음 → 동작 완전 동일 |

---

## QA 결과
- 임상 안전성: 영향 없음 (문자열 무수정)
- 회귀 가능성: 낮음 (메타데이터 추가만)
- 판정: **PASS**

---

## 결과
- 판정: **통과**
- 다음 작업: Phase 2 #2 — `src/app.js` 주입 로직 분기 + `skills/knowledge-ingest/SKILL.md` 템플릿에 `kind` 자동 부여 규칙 추가
  - disease → Liby hint로만
  - drug → 참조탭으로만
  - (#2부터 기능적 차이 발생)

## 회고
- 예상과 달랐던 점:
  - 처음 걱정했던 "old_string 비고유" 문제는 발생하지 않음 — 키 이름 자체가 고유하므로 `  "키": {` + 다음 줄 앞부분 조합으로 충분
  - 79건 Edit가 모두 첫 시도에 성공 (재시도 0건)
- 다음 세션 반영:
  - Phase 2 #2에서 ingest skill 템플릿 수정 시 본 세션 결과(kind 분류 기준)를 그대로 rule로 문서화
  - Librarian이 bundle 재생성 시 kind 필드 유실되지 않도록 skill이 강제해야 함 — #2 설계 시 반영 필요
  - 경계 키(백신류) disease 분류는 이번에 고정됐으므로 #2에서 번복 금지
