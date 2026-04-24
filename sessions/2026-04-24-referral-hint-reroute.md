# sessions/2026-04-24-referral-hint-reroute.md

## 세션 정보
- 날짜: 2026-04-24
- 작업: `referral` primary 이동 guide → hint (R7 불도입 대안)
- 건드린 파일: `rules/data-flow.md` · `knowledge/section-vocabulary.md` · `src/app.js`

---
## Boss 승인서
해당 없음 — R7(Triage 3단 vs mini-panel 분리)이 Boss 권고에서 **보류·재검토** 상태였으나, 미르 결단으로 R7 자체를 **불도입**. 대안으로 `referral`을 기존 Liby hint 경로에 편입 (신규 UI 설계 불필요, 최소 리스크).

## Architect 진단
- `panel-contracts.md` 영향 0 (hint는 패널 아님)
- `data-flow.md` matrix L44 primary cell **수정** → 원칙상 STOP. 미르 결단(이번 턴) 완료로 해제
- `file-ownership.md`·`forbidden.md` 정합 유지
- 판정: **PASS with constraint** (3-file 동시 개정 필수 — Wave 2 선례 패턴)

## Designer 설계서
변경 3건 (위험도 오름차순):
1. `rules/data-flow.md` — matrix `referral` row primary cell guide → hint 이동 + 2026-04-24 주석
2. `knowledge/section-vocabulary.md` — disease.hint 끝에 `"referral"` 추가, disease.guide에서 제거 + 주석
3. `src/app.js` — UIHOOKS_DEFAULTS.disease 동일 반영 (hint에 추가, guide에서 제거)

## Builder 결과
- 3-file 모두 단일 Edit로 처리
- 기타 섹션 키 불변
- app.js는 Wave 2와 동일하게 Phase 5a 확대 섹션(`lifestyle`·`follow-up-schedule`·`prognosis`·`complications`·`counseling`) 미동기화 유지 (**의도된 drift**, 범위 외)

## Reviewer 결과
- 3-file 정합 ✓
- primary 1개 원칙 준수 ✓
- 기타 배열 원소 불변 ✓
- Wave 2 차이 패턴 일관 ✓

## QA 결과
- rule 정합 검증 통과
- Chrome 시각 검증 생략 — uiHooks 배열 재배치만으로 runtime 로직 변경 0건 (Wave 2처럼 UI 복원이 아니므로 육안 확인 불필요). 실전 노출은 다음 진료 세션에서 자연 확인

---
## 결과
- 판정: **통과**
- main 반영 완료 (commit `___`)
- 원격 push 완료

## 다음 작업
- 의뢰 기준 없는 엔트리(현재 v2 5건 외)에 `## 의뢰 기준 (referral)` 섹션 누적 ingest 시 자연 노출 확대
- 3개월 후: Liby 힌트 과부하 여부 체감 검토. 힌트 영역 스크롤 필요 수준 도달하면 hint 배열 슬림화 재협의
- R7 공식 폐기 — 핸드오프(2026-04-23) Wave 3 계획 삭제

## 회고
- **예상과 달랐던 점**: R7을 새 UI 설계 없이 기존 hint 경로에 1엘리먼트 추가로 해소. "작은 이동이 큰 재설계 회피" — 패널 분리안 설계·구현 비용 0 달성. CVO가 선호한 (b) mini-panel 분리안보다 더 가벼운 해법.
- **다음 세션 반영**: UI 신설 제안이 들어올 때 **기존 경로 확장으로 해소 가능한지** 먼저 확인하는 판단 경로 추가. Boss 권고 전 Designer·Architect 단계에서 저비용 대안 자가 점검.
