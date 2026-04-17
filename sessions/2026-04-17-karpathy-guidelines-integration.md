# sessions/2026-04-17-karpathy-guidelines-integration.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Karpathy 4원칙(`forrestchang/andrej-karpathy-skills`)을 chartji 하네스에 3-레이어로 통합
- 건드린 파일:
  - CLAUDE.md
  - rules/forbidden.md
  - rules/coding-behavior.md (신설)
  - agents/boss.md
  - agents/designer.md
  - agents/builder.md
  - agents/reviewer.md
  - agents/qa.md

---

## 결정 배경
- 미르 요청: 링크(`forrestchang/andrej-karpathy-skills`) 검토 후 chartji CLAUDE.md 개선안 고민
- 원전 4원칙: Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution
- chartji 현황 진단:
  - `Surgical Changes`는 "전체 재작성 금지 — 국소 수정만"으로 이미 일부 존재
  - `Think Before Coding`·`Goal-Driven`은 Designer·QA에 단편적으로만 존재
  - `Simplicity First`는 UI 레벨 원칙만 있고 코드 레벨 명문 부재
- 전파 경로 분석: `rules/*.md`에 포인터만 두면 강제 로드가 안 됨 → 3-레이어 병행 필요
  - Layer 1: `rules/forbidden.md` (강제 로드 파일에 핵심 금지 삽입)
  - Layer 2: `rules/coding-behavior.md` 신설 + CLAUDE.md 세션 프로토콜 0번에 강제 로드 추가
  - Layer 3: 5개 역할 에이전트(Boss/Designer/Builder/Reviewer/QA) 정의 파일에 직접 삽입

---

## Boss 승인서
해당 없음 — 메타 규칙 수정 세션 (전략 리뷰 아님)

## Designer 설계서
해당 없음 — CLAUDE.md·rules·agents 문서 수정 세션으로 Designer 파이프라인 미경유
(미르 승인: 대화상 B 3-레이어 진행 합의)

## Builder 결과

### Layer 1 — rules/forbidden.md
- "코드 수정" 섹션 +2줄
  - 요청하지 않은 기능·추상화·"유연성" 추가 금지
  - 스타일 드리프트 금지 (따옴표·타입힌트·포매팅 임의 변경)
- "판단" 섹션 신설 3줄
  - 가정 명시 없이 구현 금지 — 드러내고 시작한다
  - 성공 기준 없이 Builder 실행 금지
  - 모호한 요청에 침묵 금지 — 멈추고 미르에게 질문

### Layer 2 — rules/coding-behavior.md 신설 + CLAUDE.md 갱신
- `rules/coding-behavior.md` 신규 작성
  - Karpathy 4원칙 한국어 번역 + chartji 맥락 주석 (의료 도구 → 가정 오류가 환자 안전 리스크)
  - 역할별 중점 매핑 표(Boss/Designer/Builder/Reviewer/QA)
  - 작동 징후 체크
- CLAUDE.md:31 세션 프로토콜 0번 갱신
  - 기존: `rules/forbidden.md`만 강제 로드
  - 변경: `rules/forbidden.md` + `rules/coding-behavior.md` 강제 로드
- CLAUDE.md:66 상세 규칙 인덱스에 포인터 추가

### Layer 3 — 에이전트 정의 파일
- `agents/boss.md`
  - "행동 원칙" 섹션 신설 — 가정 드러내기 / 성공 기준 동반 권고
- `agents/designer.md`
  - "행동 원칙" 섹션 신설 — 가정 설계서 명시 / 변경별 검증 기준 / 범위 외 개선 금지
- `agents/builder.md`
  - "절대 금지" 섹션 +3줄 — 스타일 드리프트 / 명세 외 에러처리·유연성 / 설계서 외 줄 금지
- `agents/reviewer.md`
  - 출력 블록에 `라인 추적` / `스타일 드리프트` 항목 추가
  - "행동 원칙" 섹션 신설
- `agents/qa.md`
  - 출력 블록에 `성공 기준 충족 N/M (설계서 기준)` 추가
  - "행동 원칙" 섹션 신설 — 성공 기준 누락 시 통과 보류

## Reviewer 결과
해당 없음 — 파이프라인 미경유. 셀프 체크만:
- 파일 경계: 통과 (CLAUDE.md·rules·agents 한정, src/ 미변경)
- 명세 범위: 통과 (대화상 합의한 3-레이어만)
- 라인 추적: 통과 (모든 변경이 B 플랜에 직접 추적)
- 스타일 드리프트: 없음 (기존 헤딩·불릿 톤 유지)

## QA 결과
해당 없음 — 코드 회귀·임상 안전 영향 없음 (문서 전용 변경)

---

## 결과
- 판정: 통과 (문서 수정 세션)
- 다음 작업:
  - 커밋 보류 (같은 폴더 병렬 Claude 작업 진행 중 — 충돌 회피)
  - 다음 Designer 호출 시 설계서에 "가정" / "검증 기준"이 실제로 들어오는지 관찰
  - Reviewer 출력에 `라인 추적` 항목이 채워지는지 관찰
  - QA 출력에 `성공 기준 충족` 항목이 채워지는지 관찰
  - 관찰 결과에 따라 문구 조정 (1~2 세션 후)

## 회고
- 예상과 달랐던 점:
  - B 옵션(단일 파일 신설)만으론 전파력 부족 진단 — rules/ 참조는 강제 로드가 아니라서
  - 결국 1·2·3 레이어 병행이 필수 판단
  - Boss도 "가정·성공 기준" 원칙 대상이라는 미르 지적으로 매핑 확장
- 다음 세션 반영:
  - 문서·규칙 수정도 경량 Designer/Reviewer 체크리스트가 있으면 좋을지 검토 (현재는 template이 코드 변경 전제)
  - 실사용 1~2 세션 후 원칙 문구가 실제 행동을 유도하는지 재검증
