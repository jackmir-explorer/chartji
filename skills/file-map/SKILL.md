# skills/file-map/SKILL.md — File Map

Designer가 기능 요청을 파일 변경 목록으로 변환하는 스킬.
rules/file-ownership.md 테이블을 기준으로 즉시 결정한다.

## Step 1. 작업 유형 분류

요청을 읽고 아래 중 해당하는 유형을 찾는다:

| 작업 유형 | 주 파일 | 연관 파일 |
|----------|---------|----------|
| 패널 동작/UI 수정 | panels.js | — |
| 새 패널 추가 | panels.js | api.js, prompts.js |
| 프롬프트 내용 수정 | prompts.js | — |
| API 함수 수정 | api.js | — |
| Final Chart 수정 | chart-output.js | — |
| Working Draft 수정 | app.js | prompts.js |
| Guideline 수정 | app.js | prompts.js |
| 공통 UI 컴포넌트 수정 | primitives.js | — |
| 스타일 수정 | styles.css | — |
| 상수/샘플 수정 | constants.js | — |

## Step 2. 건드리지 않을 파일 명시

작업 유형에서 나온 파일 외 나머지는 모두 "건드리지 않을 파일"로 명시한다.

## Step 3. 섹션 특정

해당 파일의 섹션 주석을 확인해서 변경 대상 범위를 좁힌다.

```bash
grep -n "^/\*\|^function \|^const \|^  function \|^  var \[" src/파일명.js
```

## Step 4. old/new 쌍 작성

- old 문자열: 해당 파일에서 grep -c 결과가 반드시 1
- 위험도 낮은 변경 먼저 정렬
- 하나의 논리 변경 = 하나의 old/new 쌍 (묶지 않음)
