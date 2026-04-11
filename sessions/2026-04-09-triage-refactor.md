# Session: Triage 패널 개편 + 감별진단 실험

## 세션 정보
- 날짜: 2026-04-09
- 작업명: triage-refactor
- 단계: Boss 리뷰 × 3회 → Designer → Builder → Reviewer → QA

## 결정 배경

### 1. initialFocus 제거
Triage의 `initialFocus` (진료 힌트 한 줄)가 Missing 패널과 역할 중복. Boss 검토 후 렌더링 제거.

### 2. differentialShort 실험 → 롤백
어지럼증 감별진단(horses/zebras)을 Triage에 표시하는 B안 설계·구현 후,
추가 Boss 리뷰에서 Risk > Benefit 판정:
- 진료 중 인지 부하 증가
- 경험 의사에게 redundant
- broad symptom(빈혈, 흉통) 확장 시 스케일 붕괴
→ 렌더링 비활성화 (데이터/파이프라인은 유지)

## 건드린 파일

### src/components/panels.js
- `initialFocus` 관련 코드 전체 제거 (var focus, 인라인 표시, expanded 섹션)
- `expanded`/`rawLen` dead state 제거
- Triage 패널 구조를 단순 CC 한 줄 바로 변경
- differentialShort 렌더링 블록 추가 후 비활성화 (주석 처리)

### src/app.js
- TriagePanel에 `differentialShort` prop 전달 추가 (파이프라인 유지)

### src/knowledge-bundle.js
- dizziness/어지럼증/vertigo 3키에 `differentialShort` 배열 추가
  (horses 5개 + zebra 1개 구조)

### skills/knowledge-ingest/SKILL.md
- BUNDLE 필드 명세에 `differentialShort` 추가

## 추가 작업 (같은 세션)

### 어지럼증 감별진단 ingest
- knowledge/by-disease/dizziness.md 감별진단 섹션 채움
- BPPV/전정신경염/편두통성 어지럼증/기립성 저혈압/메니에르 (horses)
- AAFP Am Fam Physician 2017 검증 ✓
- knowledge-bundle.js differential 필드 업데이트

## 판정
QA 통과

## 최종 Triage 패널 상태
- CC 한 줄만 표시 (initialFocus 없음)
- differentialShort 데이터 있음, 렌더링 off
- calcCategories 감지 + onDetect 정상 동작

## 회고
"가능한 기능"과 "써야 하는 기능"은 다르다.
differential 데이터를 쌓는 것 자체는 의미 있음 (AI 컨텍스트 주입, Draft 힌트).
하지만 진료 중 화면 표시는 이 제품의 사용 맥락과 맞지 않았다.
Boss 다중 리뷰가 이 판단을 정확히 잡아냄.
