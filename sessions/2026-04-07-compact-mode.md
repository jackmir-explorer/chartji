# 세션 기록 — 작은 화면 모드 (Compact Strip)

## 세션 정보
- 날짜: 2026-04-07
- 버전: v19
- 작업명: compact-mode

## 결정 배경
Boss UI 검토 결과:
- 진료 중 핵심 3패널(RedFlag/Missing/Triage)만 보고 싶은 니즈
- 전사·Draft·계산기·컨트롤 바는 진료 흐름 중에 불필요
- 안 2(compact strip): 탑바 + 면책 배너 + 3패널 수평 배치

## 건드린 파일

### 수정 (2개)
- src/app.js — compactMode state + 탑바 버튼 + 조건부 렌더링
- src/styles.css — compact-right / compact-panels / compact-panels>* 클래스 추가

## 수정 상세

### app.js
- 추가: `compactMode` boolean state (default false)
- 추가: 탑바 버튼 "⊡ 간략" / "⊞ 전체" 토글
- compact ON 시 숨김: API 키 패널 (`!compactMode&&showKey`)
- compact ON 시 숨김: 컨트롤 바 전체 (`!compactMode&&`)
- compact ON 시 숨김: left column (`!compactMode&&`)
- compact ON 시: right column → `compact-right` class (full-width)
- compact ON 시: 3패널 wrapper → `compact-panels` class (수평 3열)

### styles.css
- `.compact-right`: flex:1; min-width:0
- `.compact-panels`: display:flex; flex-direction:row; gap:8px; align-items:flex-start
- `.compact-panels>*`: flex:1; min-width:0

## 판정
QA 통과. 기능 변경 없음. 면책 배너 항상 표시 유지.

## 회고
- 로직 전혀 건드리지 않고 순수 조건부 렌더 + CSS 클래스로 구현 — 깔끔
- RedFlag transcript-only 원칙 유지 (컴포넌트 내부 무변경)
- clearSession, liveEnabled ON/OFF 등 모든 기능 compact 해제 시 완전 복귀
