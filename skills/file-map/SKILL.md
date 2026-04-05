# skills/file-map/SKILL.md — File Map + Scope Gate

Designer가 구현 요청을 받았을 때 실행하는 스킬.
**범위 체크를 먼저 수행**하고, 통과 시 파일 변경 목록을 작성한다.

---

## Phase 0. 범위 체크 (scope-gate)

설계서 작성 전에 반드시 먼저 수행한다.

```
[ ] 요청이 단일 기능/수정 단위인가? (여러 기능이 섞이면 쪼갠다)
[ ] rules/forbidden.md 위반 항목이 없는가?
[ ] 임상 안전 원칙(패널 계약)과 충돌하지 않는가?
[ ] 이전 세션이 완료 상태인가?
```

- 모두 통과 → Phase 1로 진행
- 하나라도 실패 → **즉시 반려** + 이유 명시 (설계서 작성하지 않음)

---

## Phase 1. 작업 유형 분류

요청을 읽고 아래 중 해당하는 유형을 찾는다:

| 작업 유형 | 주 파일 | 연관 파일 |
|----------|---------|----------|
| 패널 동작/UI 수정 | panels.js | — |
| 새 패널 추가 | panels.js | api.js, prompts.js |
| 프롬프트 내용 수정 | prompts.js | — |
| API 함수 수정 | api.js | — |
| Working Draft 수정 | app.js | prompts.js |
| 질환 템플릿 수정 | templates.js | templates/*.md |
| 공통 UI 컴포넌트 수정 | primitives.js | — |
| 스타일 수정 | styles.css | — |
| 상수/샘플 수정 | constants.js | — |

## Phase 2. 건드리지 않을 파일 명시

작업 유형에서 나온 파일 외 나머지는 모두 "건드리지 않을 파일"로 명시한다.

## Phase 3. 섹션 특정

해당 파일의 섹션 주석을 확인해서 변경 대상 범위를 좁힌다.

```bash
grep -n "^/\*\|^function \|^const \|^  function \|^  var \[" src/파일명.js
```

## Phase 4. old/new 쌍 작성

- old 문자열: 해당 파일에서 grep -c 결과가 반드시 1
- 위험도 낮은 변경 먼저 정렬
- 하나의 논리 변경 = 하나의 old/new 쌍 (묶지 않음)
