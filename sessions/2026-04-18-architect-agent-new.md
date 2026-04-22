# 2026-04-18 Architect agent 신설

## 세션 정보
- 날짜: 2026-04-18
- 작업: Designer 앞단에 Architect agent 신설 (구조 경계 진단 전용)
- 건드린 파일:
  - `agents/architect.md` (신규)
  - `CLAUDE.md` (호출 규칙 + 기본 워크플로우)
  - `rules/workflow.md` (Architect 단계 + STOP 분기)

---

## 결정 배경

`2026-04-17-handoff-to-next-session.md`의 0번 과제. Phase 2 #4에서 발생한 역할 중복 사고 — Liby 힌트와 Guide tab이 `treatment`/`differential`를 이중으로 노출하여 인지부하 증가 + 토큰 비용 증가 + 유지보수 부담 — 의 구조적 원인을 Boss 리뷰로 분석한 결과, **Designer가 "구현 설계"와 "아키텍처 판단"을 동시에 책임져서** `/compact` 직후 기존 합의를 재검토 없이 깼음이 드러남.

역할 분리:
- Designer → "이 기능 **어떻게** 구현?" (how)
- Architect → "이 변경이 **구조적으로** 맞나?" (should we?)

handoff 문서의 3가지 안(A/B/C) 중 **A안(정식 Architect agent 신설)** 채택. 이유:
1. B/C 모두 Designer의 자기판단에 의존 → 같은 실수 재발 가능
2. Chartji는 Phase 단위 구조 변경이 잦음
3. 차후 `rules/data-flow.md`가 생기면 Architect가 자연스러운 "문서 지기" 역할

`rules/data-flow.md`는 0번 scope에서 제외. 1번 작업(역할 분리 복원)이 곧 data-flow 경계 확정 작업이므로 그 산출물로 묶는 게 낭비 없음.

---

## 건드린 파일 상세

### 신규: `agents/architect.md`

- 역할: Designer 앞에서 구조 규칙 위반 여부 판정
- 기본 성향: **보수적** — 확신 없으면 PASS 대신 STOP
- 먼저 확인하는 문서 5종: panel-contracts, data-flow(없으면 "미작성"), file-ownership, forbidden, 최근 3~5개 sessions
- 출력 포맷:
  - 영향 경계 (UI Surface / Data Field / 파일)
  - 기존 합의 대조
  - 판정: PASS | STOP
  - PASS 시 Designer 제약 / STOP 시 미르 확인 질문
- 규칙:
  - STOP 시 Designer로 넘기지 않음
  - data-flow 매트릭스의 primary ✓ 중복 시 즉시 STOP
  - data-flow.md 없는 상태에서 data ownership을 건드리는 작업이면 "이번 작업 산출물에 data-flow.md 포함"을 Designer 제약에 반드시 추가
  - 코드 변경 설계 금지 — 경계 판정만

### 수정: `CLAUDE.md`

- 호출 규칙: "`Designer` 호출" → "`Architect` 호출 (구조 진단 → Designer → 실무진 파이프라인)"
- 기본 워크플로우: 6단계 → 7단계 (1. Architect 추가, 기존 단계 번호 +1)

### 수정: `rules/workflow.md`

- 기본 워크플로우 도식에 Architect 단계 + STOP 분기 추가
- 설명 문단에 Architect 책임 / STOP 시 미르 판단 대기 명시

---

## 커밋

- `f6d6b27` — feat(architect): Architect agent 신설 — Designer 앞 구조 경계 진단

## 판정

- **통과** (구조 도큐 변경만, 코드 미변경 — Builder/Reviewer/QA 해당 없음)

## 다음 작업

1번 — **Liby 힌트 vs 임상 가이드 역할 분리 복원 + `rules/data-flow.md` 신설**
- Architect 먼저 호출해서 진단 (이번 신설한 규칙대로 즉시 첫 적용)
- Designer → 미르 승인 → Builder → ... 순서 진행
- Boss 권고: data-flow.md에 "UI Surface × Data Field 매트릭스" + "데이터 경로 예시" + "RedFlag 격리 원칙" + "Architect/Designer 계약" 4섹션 포함

## 회고

- 예상과 달랐던 점: 없음. handoff 문서가 상세해서 0번 scope 판단이 단순했음.
- 다음 세션 반영: 1번부터 Architect를 실제로 **첫 호출**해서 규칙이 돌아가는지 실전 검증. 출력 포맷이 너무 무겁거나 경직되어 있으면 Architect agent 파일 즉시 튜닝.
