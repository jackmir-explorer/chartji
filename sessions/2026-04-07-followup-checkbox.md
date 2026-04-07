# 세션 기록 — 재진 Context UI 단순화

## 세션 정보
- 날짜: 2026-04-07
- 버전: v19
- 작업명: followup-checkbox

## 결정 배경
Boss 심층 리뷰 결과:
- 칩 방식 검토 → 가정의학과 재진 스펙트럼이 너무 넓어 칩이 항상 부족
- 재진 신호(binary)만으로 prompts가 충분히 작동 가능
- 구체적 이전 데이터는 transcript에서 유입
- textarea → 체크박스 단독으로 충분

## 건드린 파일

### 수정 (2개)
- src/app.js — followUpCtx+showCtxInput 제거 → isFollowUp bool + 파생 상수
- src/prompts.js — "재진 Context가 있으면" → "재진 방문으로 표시된 경우" 3곳

## 수정 상세

### app.js
- 제거: `followUpCtx` state, `showCtxInput` state
- 추가: `isFollowUp` bool state
- 파생: `var followUpCtx = isFollowUp ? "재진" : ""`
- clearSession: `setIsFollowUp(false)`
- UI: 접혀있는 textarea → 체크박스 한 줄 (consent 체크박스와 동일 패턴)
- 하위 props(MissingPanel, TriagePanel, generateWorkingDraft) 시그니처 변경 없음

### prompts.js
- Triage / Missing / Working Draft 3곳: "Context가 있으면" → "방문으로 표시된 경우"

## 판정
QA 통과.

## 회고
- 입력 부담 제거가 핵심. 3단계(열기→입력→닫기) → 1단계(체크)
- followUpCtx를 파생 상수로 유지해 하위 컴포넌트 전혀 건드리지 않음 — 깔끔한 리팩터링
