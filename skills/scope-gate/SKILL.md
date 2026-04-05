# skills/scope-gate/SKILL.md — Scope Gate (Deprecated)

> **⚠ Deprecated** — 이 스킬은 `skills/file-map/SKILL.md`의 Phase 0으로 이관되었습니다.
> Designer가 구현 워크플로우 진입 시 범위 체크를 직접 수행합니다.

Boss가 개발 요청 승인 전에 실행하던 범위 체크. (기록 보존용)

## 체크리스트
```
[ ] 요청이 단일 기능/수정 단위인가? (여러 기능이 섞이면 쪼갠다)
[ ] rules/forbidden.md 위반 항목이 없는가?
[ ] 임상 안전 원칙(패널 계약)과 충돌하지 않는가?
[ ] src/ 백업이 존재하는가?
[ ] 이전 세션이 완료 상태인가?
```

## 판정
모두 통과 → 승인서 작성
하나라도 실패 → 반려 + 이유 명시

## 반려 예시
"RedFlag 프롬프트 수정과 Missing 프롬프트 수정은 별도 세션으로 분리해야 합니다."
"이 변경은 RedFlag에 context를 주입합니다. forbidden.md 위반."
