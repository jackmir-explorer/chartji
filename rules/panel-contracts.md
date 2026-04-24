# rules/panel-contracts.md — 패널 역할 계약

각 패널은 하나의 역할만 한다. 역할이 겹치면 제거하거나 통합한다.

---

## Triage Panel
역할: 진료 초반 방향 anchor, CC 분류
출력: 방문 유형 + CC + anchor 문장 + DDx readonly (감별진단 후보 표시, 2026-04-24 Wave 2 재활성화)
금지: 진단 단정, 치료 계획 제안, RedFlag 언급
예외: ingested knowledge 기반 DDx readonly 표시 허용 (AI 추론 금지, 면책 문구 상시 노출)

### DDx readonly 가드레일 (2026-04-24 Wave 2, 5개)
1. **ingested-only**: bundle의 `differentialShort` (v1 레거시) 또는 `sections.differential` (v2, 미래) 데이터만 사용. LLM 생성 경로 전면 금지.
2. **AI 생성 금지**: prompts.js·api.js 어느 경로에서도 DDx 영역 컨텐츠 생성하지 않음.
3. **숫자 0개**: 확률·퍼센트·수치 표기 금지 (anchor bias 유발 방지).
4. **상한**: Horse(흔함) ≤ 3개, Zebra(드물지만 치명적) ≤ 2개. UI에서 slice.
5. **면책 문구 상시 노출**: `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` DDx 영역 하단 고정 표시.

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
역할: 의사가 버튼을 눌렀을 때만 가이드라인 제공 — **처방 이전 배경** (분류·비교·장기추적·exam·differential·notes)
출력: cue 한 줄 → 본문은 클릭 후 열림
금지: 자동 표시, 지시형 톤
제외 섹션 (2026-04-24 결단, Liby 힌트로 이전): contraindication · precaution · pregnancy — 처방 결정 시점 push가 본질이므로 Liby hint 전담

## Liby 힌트 (push)
역할: 처방 결정 시점 선제 감지 — indication/dosing/schedule/protocol/referral/contraindication/precaution/pregnancy
출력: 엔트리별 uiHooks.hint 섹션의 bundle 원문
금지: transcript에 없는 일반론 생성, LLM 자유 서술
