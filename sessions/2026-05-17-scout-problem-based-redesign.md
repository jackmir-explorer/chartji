# sessions/2026-05-17-scout-problem-based-redesign.md

## 세션 정보
- 날짜: 2026-05-17
- 작업: Scout 루틴 push형 daily radar → problem-based on-demand 전환
- 건드린 파일: `routines/scout.md`

---
## 결정 배경
- 미르가 첨부한 LLM 조언: 시스템 구축의 짜릿함으로 전문의 시험공부를 회피하는
  "생산적 미루기" 진단. 전문의 시험공부·외래진료가 1순위, 부수 시스템은 보조.
- 미르 지시: scout를 매일 발행하는 push형 radar에서, 시험공부·외래진료에서
  더 파고들 개념에 대해 논문 리뷰를 주는 problem-based 모델로 전환.
- 메타 가드레일 합의: "재설계는 기능 추가가 아니라 빼기. Chartji에 쓰는 시간이
  줄고 족보에 쓰는 시간이 늘어야 성공."

## Designer 설계서 (브레인스토밍 수렴 결과)
미르 결정 4건:
1. 출력 깊이 — 기존 Deep Extract/bundle 파이프라인 유지, **트리거만** problem-based
2. 발화 주기 — 완전 on-demand + 주1회 조건부 안전망
3. 시험 입력 — 별도 파일 없이 `inbox/gaps.md`에 `[시험]` prefix로 통합
4. 큐 순서 — `[시험]` prefix 자동 우선
추가 결정: Step 1-E "7일 연속 미해소 ⚠ 경고" 삭제 (불안 엔진 제거)

## Builder 결과
`routines/scout.md` 재작성:
- **제거**: 구 Step 1-A~1-D 영역 cycling + deprecated 0순위 풀 (~110줄),
  "매일 7건 의무", Mir-Tier 1 cover/횡단/Tier2 footer, 슬롯 양보 표,
  Step 2 슬롯-저널 매핑표, Step 2-B "8건 미달 자동완화",
  Step 1-E 7일 미해소 경고, 주의사항 "⭐ 8~10건 목표"
- **추가/변경**: 핵심 원칙·실행 모델 섹션 (on-demand + 주1회 안전망),
  Step 1을 gaps 기반 본체로 승격 (`[시험]` 자동 우선, 처리 건수 모드별 규정),
  Step 2 Anchor 저널을 보조 참조 표로 축소, Step 4 템플릿에 Gap/추출 키워드
  라인 필수화, Step 6 footer를 처리 모드·gap 출처 중심으로 단순화
- **유지**: Step 0 날짜 정책, Step 2-B 30일 중복차단 본체, Step 3 필터,
  Step 5 아카이브, Step 7 브랜치+PR 흐름, 마커 표

## Reviewer 결과
- rules/·agents/·deep-extract.md·scope.md·CLAUDE.md grep — 구 daily/7건/radar
  하드 의존 참조 **없음**. 과거 session 기록만 매칭(append-only, 수정 불요).
- 외부 스케줄(`~/.claude/scheduled-tasks/chartji-scout-daily/`)은 이 컨테이너에
  미존재 = Claude Code web 측 외부 설정. 문서만으로는 cron 미정지.

## QA 결과
- 판정: **통과** (문서 정합성 확인, 내부 모순 없음)
- ⚠ 잔여 액션: 외부 스케줄을 매일 → 주1회로 변경/제거하는 것은 harness 외부
  설정 — Claude 불가, 미르가 직접 수행 필요. 미수행 시 문서와 실제 동작 불일치.

---
## 결과
- 판정: 통과
- 다음 작업: 미르가 Claude Code web 스케줄을 매일 scout → 주1회로 변경

## 회고
- 예상과 달랐던 점: 재설계 자체가 "생산적 미루기"의 재발일 수 있어,
  성공 기준을 "빼기"로 못 박고 진행. 결과적으로 ~110줄 순삭제가 핵심 변경.
- 다음 세션 반영: scout 호출은 이제 미르가 명시 트리거해야 동작.
  cron 자동 발행 사라짐 — 후속 세션에서 "scout 안 돈다"는 정상 상태로 인지할 것.
  외부 스케줄 변경 여부를 다음 세션 시작 시 미르에게 확인.
