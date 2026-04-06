# 세션 기록 — 계산기 탭 분리 Phase 1

## 세션 정보
- 날짜: 2026-04-05
- 버전: v19 (구조 변경)
- 작업명: calculator-tabs-phase1

## 결정 배경
템플릿이 Working Draft를 간섭하는 문제 해결. Board 전략 리뷰(CMO/CLO/CFO/CVO) 결과 4/4 긍정.
체크리스트는 Missing 패널이 이미 담당하므로, 템플릿을 계산 도구 전용 탭으로 분리.
Triage 패널의 대화 맥락 추론으로 질환 감지 → 추가 API 호출 없이 탭 활성화.

## 건드린 파일

### 수정 (5개)
- src/prompts.js — TRIAGE_PROMPT에 calcCategories 추가, WORKING_DRAFT_PROMPT 템플릿 섹션 제거
- src/components/panels.js — TriagePanel에 onDetect 콜백 prop
- src/templates.js — TEMPLATES → CALCULATORS 전체 교체 (5개 질환 계산기 정의)
- src/app.js — 템플릿 주입 제거, 계산기 탭 상태/UI/렌더링 추가, onDetect 연동
- rules/file-ownership.md — templates.js 책임 업데이트

## 수정 상세

### prompts.js
- TRIAGE_PROMPT: JSON 출력에 calcCategories 배열 필드 추가 (5개 질환)
- WORKING_DRAFT_PROMPT: [질환별 템플릿] 섹션 + {{TEMPLATE_CONTENT}} 제거

### panels.js
- TriagePanel: onDetect prop 수신, API 결과에 calcCategories 있으면 콜백 호출

### templates.js
- TEMPLATES (9개 질환 체크리스트) → CALCULATORS (5개 질환 계산기 폼 정의)
- dyslipidemia: ASCVD risk (9 fields)
- osteoporosis: FRAX (10 fields)
- depression: PHQ-9/GAD-7 (2 fields + 참조표)
- diabetes: eGFR 약물 적합성 (2 fields + 참조표)
- obesity: BMI 등급 (4 fields + 참조표)

### app.js
- Working Draft: templateContent/draftPrompt 코드 제거 → 단순 호출
- 신규 상태: detectedCalcs, activeCalcs, calcInputs
- useEffect: detectedCalcs → activeCalcs 자동 반영
- 탭 헤더: 계산기 탭 동적 생성 + ✕ 제거 + 수동 추가(+) 메뉴
- 탭 콘텐츠: 입력 폼 + 참조 테이블 렌더링
- TriagePanel에 onDetect 콜백 전달
- clearSession() 리셋 확장

## 판정
QA 통과. 롤백 불필요.

## 다음 작업 (Phase 2)
- 실제 계산 로직 구현 (ASCVD, FRAX, BMI)
- 계산 결과 UI 표시
- 면책 표기 추가 (CLO 권고)

## 회고
- Board 리뷰가 방향성 검증에 효과적이었음 (특히 CVO의 "잘못된 결합 해소" 판단)
- 미르의 "인지부하" 우려로 체크리스트 → 계산기 전용으로 역할 재정립
- Triage 콜백 방식으로 패널 독립성 유지하면서 질환 감지 재활용 성공
