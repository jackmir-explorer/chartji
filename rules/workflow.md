# rules/workflow.md — 워크플로우 정의

## 1. 기본 워크플로우 (구현)

사용자가 `Architect`를 호출하면 시작. (구 워크플로우는 Designer부터였음 — Architect 신설로 변경)

```
사용자 → Architect → Designer → 미르 승인 → Builder → Reviewer → QA → 사용자
           │                                   ↑                |
           STOP                                └── 이상 소견 ──┘
           │
           └→ 미르 판단 대기 (기존 합의 변경 여부)
```

- Architect가 구조 경계(`panel-contracts.md` / `data-flow.md` / `file-ownership.md`) 위반 여부를 판정한다
- STOP 판정 시 Designer로 넘기지 않고 미르 판단을 기다린다
- PASS 판정 시 Architect가 넘긴 제약을 전제로 Designer가 범위 체크 + 설계서를 작성한다
- 미르 승인 후 Builder가 실행한다
- Reviewer에서 이상 발견 시 Builder로 반환 (최대 3회)
- 3회 초과 시 미해결 이슈 목록과 함께 강제 QA 전달
- QA 통과 → sessions/ 기록
- QA 실패 → Designer 재설계

## 2. 심층 워크플로우 (전략 리뷰)

사용자가 `Boss`를 호출하면 시작.

```
사용자 → Boss → CMO → CLO → CFO → CVO → Boss 종합 보고서 → 사용자
```

- Boss가 PROJECT_STATUS.md + 최근 세션을 수집한다
- CMO/CLO/CFO/CVO 네 관점으로 순차 분석한다
- Boss가 종합 전략 보고서를 사용자에게 제출한다
- 사용자가 보고서를 검토하고 다음 행동을 결정한다
