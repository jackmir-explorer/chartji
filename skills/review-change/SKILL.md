# skills/review-change/SKILL.md — Review Change

Reviewer가 Builder diff를 검토하는 스킬.

## 체크 항목

### 파일 경계 (rules/file-ownership.md 기준)
- [ ] 설계서에 없는 파일이 변경되지 않았는가
- [ ] api.js에 useState/JSX 참조가 없는가
- [ ] prompts.js에 조건문/로직 코드가 없는가
- [ ] panels.js 각 패널이 {raw, apiKey, followUpCtx} 이외 App 상태를 참조하지 않는가

### 명세 범위
- [ ] 설계서 "건드리지 않을 파일"이 실제로 변경되지 않았는가
- [ ] 명세 외 "정리" 변경이 없는가
- [ ] 변경 줄 수가 설계서 예상 범위를 크게 벗어나지 않는가

※ 패널 계약 및 임상 안전 체크는 QA(clinical-qa)에서 담당한다.

## 출력
```
[REVIEWER 결과]
파일 경계: 통과 | 위반 (___)
명세 범위: 통과 | 위반 (___)
판정: 통과 | Designer 재설계
```
