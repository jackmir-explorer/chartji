# sessions/2026-04-17-phase2-ingest-skill-kind-rule.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 2 #2 (옵션 S) — Ingest skill에 kind 필드 자동 부여 규칙 추가
- 건드린 파일: `skills/knowledge-ingest/SKILL.md` (단일)

---

## Designer 설계서

### 범위 체크
- 단일 기능 단위: ✓ (skill 템플릿 동기화만)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (앱 코드 무수정)
- 이전 세션 완료: ✓ (Phase 2 #1 commit a4e6b58)
- → 통과

### 3가지 옵션 비교 결과
| 옵션 | 범위 | 선택 여부 |
|---|---|---|
| S | Skill-only | **✓ 선택** |
| M | skill + hint 중복제거 로직 | 보류 |
| F | #2+#3 한번에 (hint 분기 + 참조탭 drug 렌더) | 보류 |

선택 근거:
1. Phase 2 #1에서 kind 필드가 막 들어갔으므로 ingest skill이 이 규칙을 모름 → 다음 ingest 때 kind 유실 리스크 즉시 제거 필요
2. hint 중복 문제는 불편하지만 임상 안전 이슈 아님 → 서두를 필요 없음
3. 옵션 F는 #3(참조탭 하이브리드)과 커플링되므로 "단일 기능 단위" 원칙에 어긋남

---

## Builder 결과

### 변경 내용
1. **Section 7 BUNDLE 필드 구조 템플릿**에 `"kind":` 필드 추가 (Line 153)
2. **Section 7-A 신설 — kind 필드 분류 기준** (Line 164-190)
   - drug 기준: 명시적 약물 상품명·성분명·계열명
   - disease 기준: 질환명·증상명·백신접종 카테고리 (백신류 포함)
   - 경계 케이스 판단 가이드
   - by-disease/by-drug 폴더 자동 부여 규칙 + 예외(백신)

### GOTCHA 재강조
기존 Step 2 "약물명 GOTCHA" 원칙 재인용 — 성분/계열 모를 때 자의 분류 금지, 미르에게 확인.

### 건드리지 않은 파일
- src/* 전부 (app.js, knowledge-bundle.js, api.js, panels.js, sections.js, templates.js, prompts.js)

---

## Reviewer 결과

| 항목 | 결과 |
|---|---|
| kind 템플릿 추가 | ✅ |
| 분류 기준 섹션 신설 | ✅ |
| 앱 코드 무수정 | ✅ |
| 기존 규칙 정합 | ✅ Step 2 GOTCHA 재인용 |
| #1 세션 분류 기준 일치 | ✅ 백신=disease |

---

## QA 결과
- 임상 안전성: 영향 없음 (문서 수정만)
- 회귀 가능성: 0 (앱 코드 무변경)
- 판정: **PASS**

---

## 결과
- 판정: **통과**
- 다음 작업: Phase 2 #3 — 참조탭 하이브리드화 + hint 분기 (drug 카드 렌더 + hint에서 drug 제외)
  - sections.js에 knowledge-only 탭 렌더 로직 추가
  - app.js draftHints 생성 시 disease만 포함하도록 분기
  - (#2 옵션 S에서 보류했던 hint 분기를 #3에서 흡수)

## 회고
- 예상과 달랐던 점: 참조탭 렌더링이 엄격히 CALCULATORS 객체에만 의존한다는 사실 확인 → #3의 범위가 명확해짐 (drug 엔트리에게 "집"을 마련하는 작업)
- 다음 세션 반영:
  - Phase 2 #3는 옵션 F의 축소판 — hint 분기 + 참조탭 drug 렌더를 묶음으로 다뤄야 공백 없이 이행 가능
  - #3 완료 시점에서 "위고비 + 비만" 중복 문제가 실제로 해소되는지 라이브 검증 필수
