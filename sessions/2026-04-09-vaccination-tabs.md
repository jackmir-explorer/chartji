# Session: 예방접종 참조 탭 추가

## 세션 정보
- 날짜: 2026-04-09
- 작업명: vaccination-tabs
- 단계: Designer → Builder → Reviewer → QA

## 결정 배경
미르가 대량의 백신 임상 데이터(Tdap, 대상포진, 폐렴구균, HPV, 광견병, 일본뇌염, A형간염, B형간염, 수두, MMR, 폴리오, leukopenia 독감 규칙)를 입력하며 "계산기 탭에 vaccination 탭 추가해서 관련있는 백신 정보 보여주는 것 가능한지" 물음. Boss 검토 후 진행.

핵심 설계 결정:
- CALCULATORS 기존 패턴(referenceTable only, calculate 없음) 그대로 재사용
- 백신별 개별 탭(Tdap, 대상포진, 폐렴구균, HPV) + 통합 탭(vaccination) 구조
- Triage calcCategories가 이미 이 키들을 감지하고 있었으나 CALCULATORS 항목이 없어 탭이 안 열리던 상태 → 이번에 추가로 해소

## 건드린 파일
- `src/templates.js` — CALCULATORS 객체에 5개 항목 추가

## 변경 상세

### src/templates.js
**추가 (str_replace 단위, 기존 osteoporosis 이후)**

| 키 | label | 내용 |
|---|---|---|
| `Tdap` | 파상풍(Tdap) | 접종 대상·시기 6행 + 접종 방법 2행 |
| `대상포진` | 대상포진 | 접종 대상, RZV, ZVL, 전환·특수상황 |
| `폐렴구균` | 폐렴구균 | 나이기준, 만성질환자, 면역저하자, 기타 |
| `HPV` | HPV | 접종 대상, 접종 간격(3회) |
| `vaccination` | 예방접종 참조 | 성인 기본 권장, 고위험군, A형간염, B형간염, 수두, MMR, 폴리오, 항암치료 중 독감백신 |

**삭제**: 없음  
**수정**: 없음

## 판정
QA 통과 — Triage 키 일치, JS 문법 정상, 기존 항목 무결

## 다음 작업
- 광견병 / 일본뇌염 탭 필요 시 Triage calcCategories 추가 + templates.js 추가
- 백신 탭에 나이/면역저하 입력 필드 추가(calculate 포함)로 개인화 강화 — 선택적

## 회고
기존 calc 탭 아키텍처가 이 작업을 위해 이미 준비된 구조였음. templates.js 1개 파일만으로 완결.
