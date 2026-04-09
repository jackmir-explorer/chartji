# rules/panel-contracts.md — 패널 역할 계약

각 패널은 하나의 역할만 한다. 역할이 겹치면 제거하거나 통합한다.

---

## Triage Panel
역할: 진료 초반 방향 anchor, CC 분류
출력: 방문 유형 + CC + anchor 문장
금지: 진단 단정, 치료 계획 제안, RedFlag 언급

## Red Flag Panel
역할: transcript에서 진짜 위험 신호만 감지
출력: severity(high/medium) + 신호 + 근거
금지: routine reminder, followUpCtx 주입 (transcript-only 절대 원칙)

## Missing Checklist
역할: 안전상 놓치면 안 되는 항목(1순위) + 감별진단·치료 방향을 직접 바꾸는 결정적 항목(2순위)
출력: 항목 목록 (최대 3개)
금지: 이미 언급된 항목, generic 체크리스트, 교과서적 항목, 진단/치료 제안

## Working Draft
역할: EMR-ready 초안 자동 생성
출력: HPI / Key negatives / Findings / Assessment / Plan
금지: PE 필드 AI 추론, 의사 미발화 Plan, ROS 자동 완성

## Guideline Assist (온디맨드)
역할: 의사가 버튼을 눌렀을 때만 가이드라인 제공
출력: cue 한 줄 → 본문은 클릭 후 열림
금지: 자동 표시, 지시형 톤
