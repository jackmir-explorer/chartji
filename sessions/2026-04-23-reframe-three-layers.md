# sessions/2026-04-23-reframe-three-layers.md — 3층위 아키텍처 reframe 메모

## 세션 정보
- 날짜: 2026-04-23
- 성격: **메모 — 결정 아님, 정식 의제화 대기**
- 선행: `reports/2026-04-23-boss-report-guide-vs-search.md` (Guide 탭/챗봇 UI 검토) → 그 직후 미르가 더 깊은 reframe 제시
- 후속 처리: Phase 5 + Wave 1~3 완료 후 Boss 정식 의제로 재소환. 그 전까지 휘발 방지 목적의 기록.

---

## 1. 배경 — 피로감의 출처

미르 발언 원문 요지:
- 의사는 "한눈에 보면 안다"는 암묵지를 쓰는데, LLM 기반 시스템은 명시지로 anchor해야 함 → 주입 노동 발생
- **그 주입 자체는 가치 있음** (카파시 LLM wiki처럼 지식 체계 만드는 건 의사로서 필수)
- **문제는 "적재 적소에 꺼내놓는 작업"의 정교한 튜닝이 소모적**
- Liby hint는 지금은 유용하지만 약품 DB가 커지면 3개 처방만 해도 overwhelm 확정
- EMR 상용구·약속처방 방식이 오히려 효율적일 수 있음 — 다만 지식에 종속

핵심 통찰: **지식 체계 자체에 대한 임상 압박을 분리하되, 쓸모있는 것은 상용구·약속처방으로 지속 승격**.

---

## 2. 3층위 모델 (미르가 언어화한 것)

| 층 | 이름 | 성격 | 현 상태 | 피로 여부 |
|---|---|---|---|---|
| **A** | 지식 체계 구축 | 비동기, 자기발전적, 공부 자체가 보상 (카파시 wiki형) | ingest/Researcher/Liby/Scout/Deep Extract 파이프라인 가동 중 | **피로 없음** |
| **B** | 실시간 임상 surfacing | 정교 타이밍·정교 내용. 튜닝 소모적 | Guide 탭 / Liby hint / Triage 감지 / 판단검토 | **피로의 출처** |
| **C** | 상용구·약속처방 브릿지 | 지식 → 검토 → 승격 → 임상 도구 | `templates.js` 질환별 템플릿 주입에 **부분적** 존재. 명시적 층으로 대우 안 됨 | 저피로 (선택형, 능동 호출) |

### 비유 매핑
- **A** = 카파시 LLM wiki (학습 자산)
- **C** = EMR 상용구·약속처방 (미르의 현실 임상 도구)
- **B** = 실시간 AI 코파일럿 야망 (이 층이 과다 야망이었을 가능성)

미르의 제안은 세 층을 **새 관계**로 배치하는 것:
- A → C 승격 루프를 **정식 라인**으로 만들고
- B의 야망을 **낮춘다** (완벽 타이밍 포기)

---

## 3. 이 reframe이 함의하는 것

### B 층 (실시간 surfacing)
- "완벽 타이밍" 포기 — 대신 **용량 상한·우선순위 필터**로 overwhelm 방지 (DB 확장 전 선제 방파제)
- Liby hint는 상한 있는 요약으로 변형
- Guide 탭 실증 측정 후 축소 검토 (Boss 보고서 D3과 연결)
- 챗봇 검색 UI 도입은 여전히 유보 (Boss 보고서 N4 STOP 판정 유효)

### C 층 (상용구·약속처방 브릿지)
- **제1 임상 인터페이스로 격상**
- "knowledge 검토 → 승격 후보 → 상용구/약속처방 반영" 루틴 설계 필요 (현재는 없음)
- `templates.js` 구조 확장 or 별도 레이어 신설 검토
- 승격 주체: 미르 (검토·결정) / 도우미: Liby (후보 추출) / 관리: 별도 skill 신설 가능성

### A 층 (지식 체계)
- **현재대로 유지**. Wave 1~2(R1~R6) 여전히 유효 — A 층 강화 작업.
- B에서 분리되므로 순수 학습 자산이 됨 (피로 경감)
- Karpathy-style wiki로 자기 완결성 보강 가능 (예: 읽기 좋은 인덱스, 자신의 사유 기록 등)

### Wave 영향
- Wave 1 (knowledge R1-R4): **그대로 진행** — A 층 강화
- Wave 2 (DDx R5+R6): **그대로 진행** — B 층이지만 이미 가드레일 6개로 overwhelm 방지 설계
- Wave 3 (R7): 이 reframe 반영해 **재기획 대상** — (a) Triage 3단 vs (b) mini-panel 비교에 "C 층 승격 경로"도 옵션으로 추가 가능성
- Wave 4 이후: **B 층 야망 축소** + **C 층 명시화**가 기본 원칙이 됨

---

## 4. 지금 결정하지 않는 이유

1. **감각 지속성 확인 필요** — 피로 상태에서 아키텍처 결정하면 후회 큼. 며칠 후에도 이 reframe이 유지되는지 확인.
2. **진행 중 Wave 영향 평가 필요** — R1~R6 완료 후 C 층 명시화가 실제로 얼마나 자연스러운지 확인.
3. **Boss 4관점 판정 필요** — 아키텍처급 reframe은 Boss 경유 필수. 특히 CVO(정체성 재정의), CFO(개발 비용 재분배).
4. **정식 의제화 타이밍** — Phase 5 + Wave 1~3 완료 후. 그때 이 메모를 근거로 External Audit → Boss 4관점 → Architect 경로 진입.

---

## 5. 다음 세션에서 이 메모의 사용법

1. 미르가 이 reframe을 **여전히 유지**한다면 → Phase 5 + Wave 1~3 진행 중에도 **관찰 항목 추가**:
   - Liby hint 용량·overwhelm 실측 (knowledge 엔트리 수 증가 속도 vs hint 길이)
   - templates.js 질환별 템플릿 사용 빈도 (C 층 실효성 실측)
   - Guide 탭 클릭률·dismiss 패턴 (B 층 실효성 실측, Boss 보고서 D3)
2. Wave 1~3 완료 시점에 **External Audit 재호출** — 대상: "3층위 분리 reframe의 채택 가부". `skills/external-audit/SKILL.md` 절차 적용.
3. External Audit 결과 → Boss 4관점 판정 → 미르 결단 → Architect 경로.

---

## 6. 관련 문서 (후속 참조용)

- `reports/2026-04-23-boss-report-guide-vs-search.md` — 선행 Boss 보고서 (Guide 탭/챗봇 UI 검토)
- `sessions/2026-04-23-handoff-knowledge-ddx-next-session.md` — Wave 1~3 계획 + 미르 결단 3개
- `reports/2026-04-22-boss-review-request-knowledge-ddx.md` — 권고 R1~R7
- `reports/2026-04-22-boss-report-knowledge-ddx.md` — Boss 판정 매트릭스
- `skills/external-audit/SKILL.md` — 재감사 시 사용할 절차
- `rules/panel-contracts.md` — B 층 현행 설계
- `src/templates.js` — C 층 현행 부분 구현

---

## 7. 기록의 성격 (자기 고지)

- 이 파일은 **결정이 아님**. 미르의 피로 상태에서 나온 아키텍처 reframe의 **원본 보존**.
- Claude가 정리·구조화했지만, 원문 통찰은 미르의 것.
- 며칠 후 재검토 시 이 감각이 사라지면 **파기 가능**. 유지되면 정식 의제화.
- 파기 시에도 이 메모는 "한때 이런 reframe을 고민했다"는 **탐색 이력**으로 가치 있음.
