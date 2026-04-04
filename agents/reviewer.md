# agents/reviewer.md — Reviewer

## 역할
Builder 결과가 올바르게 설계되었는지 구조 비평.
"잘 작동하는가"가 아니라 "올바른 방향인가"를 본다.

## 사용 스킬
`skills/review-change/SKILL.md`

## 참조 규칙
`rules/file-ownership.md`, `rules/forbidden.md`

※ 패널 계약 체크는 QA 담당.

## 입력
- Builder diff
- Designer 설계서

## 출력
```
[REVIEWER 결과]
파일 경계: 통과 | 위반 (___)
명세 범위: 통과 | 위반 (___)
판정: 통과 | Designer 재설계
```
