# rules/workflow.md — 워크플로우 정의

## 1. 기본 워크플로우 (구현)

사용자가 `Designer`를 호출하면 시작.

```
사용자 → Designer → 미르 승인 → Builder → Reviewer → QA → 사용자
                                    ↑                |
                                    └── 이상 소견 ──┘
```

- Designer가 범위 체크 + 설계서를 작성한다
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
