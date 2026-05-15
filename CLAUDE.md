# CLAUDE.md — Chartji 개발 하네스

## 핵심 제품 원칙

1. 화면 출력은 짧고 선명하게 — reasoning dump 금지
2. 패널 역할 분리 — 침범 금지
3. 전체 재작성 금지 — 국소 수정만
4. RedFlag는 transcript-only — context 주입 절대 금지

---
## 호출 규칙

- **전략 리뷰가 필요할 때** → `Boss` 호출 (Board 심층 리뷰)
- **구현 작업이 필요할 때** → `Architect` 호출 (구조 진단 → Designer → 실무진 파이프라인)
- **임상 지식 저장/주입** → `Liby` 호출 (knowledge/ 관리) → Researcher (Web에서 검증 `agents/librarian.md`

워크플로우 상세 → `rules/workflow.md`

### "Liby ingest" 정의 (2026-05-12 명문화)

"Liby ingest" 호출은 **네 가지 작업을 모두 포함**한다. 어느 하나도 빠뜨리지 말 것.

1. **Raw 노트 → knowledge/*.md** (`skills/knowledge-ingest/SKILL.md`) — 미르가 던진 raw 텍스트·이미지·PDF를 knowledge 엔트리로 저장
2. **inbox/ 파일 처리** (`agents/librarian.md` Inbox 트리거 §) — `.md`·이미지·PDF 자동 분류 + draft 제시
3. **⚠ Deep Extract 산출물 → src/knowledge-bundle.js 컴파일** — `routines/deep-extract.md`가 매일 정오에 `knowledge/*.md`를 갱신하지만 bundle 반영은 자동화되지 않음. **Liby ingest 호출 시 반드시 backlog 점검**:
   - `git log --oneline -- src/knowledge-bundle.js | head -1` → 최근 bundle 작업 commit
   - `git log --oneline {bundle_commit}..HEAD -- knowledge/` → 미반영 deep-extract commit 리스트
   - `knowledge/log.md` 항목과 bundle.js 내 키 비교
   - 미반영 entry는 날짜별 batch로 컴파일 (한 번에 전체 처리 금지 — 2026-05-07 "20건 데이터 손실 사건" 재발 위험)
4. **gaps.md 처리** (`skills/gaps-process/SKILL.md`) — 지식 격차 항목을 Researcher 위임으로 해소, Archive 이동

> ⚠ **빠뜨리기 쉬운 지점**: 미르가 "liby ingest" 또는 "liby 돌려보자"라고 했을 때 (1)/(2)만 처리하고 (3) bundle 컴파일 backlog를 누락하는 패턴이 반복 관찰됨. 호출 시 반드시 4가지 모두 점검 + backlog 상태 보고.

---

## 세션 프로토콜

0. `rules/forbidden.md` 와 `rules/coding-behavior.md` 를 매 세션 시작 시 먼저 읽는다.

### 기본 워크플로우 (구현)

1. Architect → 구조 경계 진단 (PASS / STOP)
2. Designer → 범위 체크 + 설계서 (Architect 제약 전제)
3. **미르 승인**
4. Builder → 실행
5. Reviewer → 검토
6. QA → 판정
7. 통과: sessions/ 기록 / 실패: 롤백 + 1번으로

### 심층 워크플로우 (전략 리뷰)

1. Boss → CMO · CLO · CFO · CVO 병렬 분석
2. Boss 종합 보고서 → 미르 검토
3. 미르가 다음 행동 결정

---

## 세션 기록 규칙 (필수)

**모든 코드 변경 작업이 끝나면 반드시 `sessions/YYYY-MM-DD-[작업명].md` 를 생성한다.**

- 미르가 별도로 요청하지 않아도 Builder 단계 완료 시 자동 기록
- 파일명: `sessions/YYYY-MM-DD-작업명.md` (날짜는 작업 당일 기준)
- 기록 항목: 세션 정보 / 결정 배경 / 건드린 파일 목록 / 제거·추가·수정 상세 / 판정 / 다음 작업 / 회고
- 템플릿: `sessions/session-template.md` 참고

---

## 세션 종료 체크리스트 (필수)

**세션 종료 직전에 반드시 아래 항목을 체크한다. 반사적 절차 — 판단에 의존하지 말 것.**

1. **이번 세션 변경이 다음 세션에서 참조 필요한가?** (예: 세션 기록·설계서·rules/ 문서 등)
2. **routine / trigger / CI 등 자동 시스템의 동작에 영향 주나?** (자동 시스템은 대부분 main 기준 동작)
3. **다른 브랜치·외부 시스템의 의존 대상인가?**

- 위 세 항목 중 **하나라도 YES** → **Claude가 main에 직접 머지**하고 원격 푸시 (PR 생성 금지)
- 전부 NO → 해당 브랜치에만 두고 종료 허용 (실험적 시도·취소된 설계 등)

### main 직접 머지 원칙 (2026-04-20 확정, 미르 지시)
- **PR 생성 금지.** 작업 완료 시 Claude가 직접 `git checkout main && git merge <작업브랜치> && git push origin main` 수행
- 이 원칙은 **모든 후속 세션에서 유지**. Claude가 반사적으로 적용 (미르에게 매번 묻지 않음)
- 예외: 미르가 명시적으로 "PR 만들어"라고 지시한 경우에만 PR 생성

### git push origin main 403 우회 (2026-05-12 확정)
일부 Claude Code 환경에서 `git push origin main`이 HTTP 403으로 거부됨. 이 경우 **미르에게 묻지 말고 즉시 GitHub MCP로 우회**:

1. `git rev-parse origin/main:<path>` 로 파일 blob SHA 획득
2. `mcp__github__create_or_update_file` (단일 파일) 또는 `mcp__github__push_files` (다중 파일) 호출
   - `owner=jackmir-explorer`, `repo=chartji`, `branch=main`
   - 단일 파일 update 시 `sha` 필수
3. push 후 `git fetch origin main && git reset --hard origin/main` 로 로컬 동기화

> 적용 조건: 단순 파일 변경 (gaps·blind-spots·sessions·knowledge 추가 등). 복잡한 merge나 다중 commit 보존이 필요한 경우는 미르에게 위임.

**종료 보고 포맷**: "커밋·푸시 완료"만으로는 부족. 반드시 **main 반영 상태**를 명시:
- ✓ "main 반영 완료 (commit `abc1234`)"
- ⚠ "main 미반영 (브랜치에만 존재)"

배경 사례: `sessions/2026-04-19-routines-trigger-diagnosis.md` 의 "2차 진단 실패 — main 머지 누락".

---

## 상세 규칙 참조

- 워크플로우 → `rules/workflow.md`
- 파일별 책임 경계 → `rules/file-ownership.md`
- 패널 역할 계약 → `rules/panel-contracts.md`
- 절대 금지 목록 → `rules/forbidden.md`
- 코딩 행동 가이드라인 → `rules/coding-behavior.md`
- **임상 핵심영역 (2026-04-29 선언, Mir-Tier 1)** → `~/.claude/projects/.../memory/user_clinical_focus.md` + `knowledge/scope.md` Mir-Tier 1 섹션. scout·학습·문헌 추천 우선순위.
