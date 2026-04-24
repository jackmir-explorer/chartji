# sessions/2026-04-24-w2-scout-de-reform.md

## 세션 정보
- 날짜: 2026-04-24
- 작업: W2 Scout/Deep Extract routine 개편 (D4 Scout 확장 + D5 공부 보고서 + D6 🔺 제거 + inbox/study-notes/ 신설)
- 건드린 파일:
  - `routines/scout.md` — 일 10건, 🔺 제거, 공백 채우기 슬롯
  - `routines/deep-extract.md` — Step 2-B 공부 보고서, Step 4 양식
  - `rules/file-ownership.md` — inbox/study-notes/ 경계
  - `agents/librarian.md` — Inbox 스캔 제외 (scout/·study-notes/)
  - `inbox/study-notes/README.md` (신규)
  - 설계서: `sessions/design-2026-04-24-w2-scout-de.md`

---

## Boss 승인서
- 원전: 2026-04-23 핸드오프 §7-2 (Scout/DE 개편 안건)
- 미르 결단 (2026-04-24):
  - D4: 기존 Scout 확장
  - D5: Deep Extract 산출물 일부
  - D6: 🔺 완전 제거
  - 7: `inbox/study-notes/` 폴더
  - 8: A층 순수학습용

## Designer 설계서
- `sessions/design-2026-04-24-w2-scout-de.md`
- 범위: routines 2종 + inbox 폴더 1개 + rules 경계 1개 + librarian inbox 스캔 제외
- src/·knowledge/·panel-contracts·data-flow 전부 무관

## Builder 결과

### #1 rules/file-ownership.md
- `knowledge/myth-log/` 섹션 바로 아래에 `inbox/study-notes/` 경계 추가
- 책임: Deep Extract 공부 보고서 저장소 (A층)
- 금지: Liby ingest·bundle 편입·자동 아카이브

### #2 inbox/study-notes/README.md
- 폴더 신설 + README.md로 Git tracking 확보
- 격리 원칙 3개 명문화 (Liby ingest 금지·승격 금지·자동 아카이브 금지)

### #3 routines/scout.md
- Step 1 → 1-A (귀납) + 1-B (공백 채우기) 분리
- Step 2 Tier 2 쿼리 형식에 1-B 공백 분야 쿼리 추가 (review·guideline 중심)
- Step 3 등급 표: △ 행 제거, ✕ 기준에 "배경 지식만" 흡수
- Step 4 결과 파일 양식에서 `## △ 참고 논문` 섹션 제거
- 하단 주의사항: 일 5건 → **10건** (DE 10건 상향과 동조)

### #4 routines/deep-extract.md
- Step 2와 Step 3 사이에 **Step 2-B 신설** — 공부 보고서 `inbox/study-notes/YYYY-MM-DD-[슬러그].md` 생성
- 양식: PMID/저널/저자/출처 Scout + 초록 요약·주요 결과·배경방법·일차의료 적용·한계·관련 knowledge/
- 격리 원칙 재안내 (rules/file-ownership.md 참조)
- 부분 실패 허용 (Step 2-B 실패해도 Step 2 산출물 유지)
- Step 4 요약 보고서 테이블에 "공부 보고서" 칼럼 추가

### #5 agents/librarian.md (조건부 → 실행)
- Inbox 스캔 시 `processed/` 단독 제외였던 것을 **`processed/·scout/·study-notes/`** 3개 제외로 확장
- 스캔 제외 폴더 안내 문장 추가 (study-notes는 rules/file-ownership.md 참조 링크 포함)

## Reviewer 결과
- 4 파일 수정 diff +83 / -17
- grep 검증:
  - scout.md: "10건" ✓, "1-B" ✓, "공백 채우기" ✓, △ 남은 것 1건만 (메타 코멘트 "△ 제거" — 의도적)
  - deep-extract.md: "Step 2-B" ✓, "inbox/study-notes/" ✓, 테이블 "공부 보고서" 칼럼 ✓
  - file-ownership.md: `## inbox/study-notes/` ✓
  - librarian.md: "processed/·scout/·study-notes/ 제외" ✓
- Surgical Changes 원칙 준수 — 범위 외 변경 없음

## QA 결과
- **판정: 통과**
- routine 로직 복잡도 폭발 방지 (MAP.md 자동 파싱 회피 — scope.md + MAP §3 수동 인용)
- A층 격리 원칙 3중 방어 (file-ownership + README + librarian inbox 제외)
- 기존 Scout 파일 🔺 소급 변경 없음 (sessions 정합성 보존)

---

## 결과
- 판정: 통과
- 다음 작업:
  - **명일 06:00 KST Scout 자동 실행** — 공백 채우기 슬롯·🔺 제거·10건 상한 실전 검증 (Tier 1 당뇨/호흡기/소화기 등 공백 분야에서 논문 1건 랜덤 탐색 예상)
  - **명일 12:00 KST Deep Extract 자동 실행** — Step 2-B 공부 보고서 생성 검증. `inbox/study-notes/` 첫 파일 생성 확인
  - **Wave 2 (R5+R6 DDx UI)** — Architect 재호출 필수, panel-contracts.md + data-flow.md primary 신설 확실 STOP
  - **myth-log 3번째 엔트리** — 미르 수동 선정

## 회고
- **예상과 달랐던 점**:
  - Builder #5 조건부였으나 실제로는 명시 제외 필요 (librarian Inbox 스캔이 재귀적일 수 있어 study-notes가 ingest 시도될 위험). 조건부 → 확정 승격
  - 기존 scout.md에 이미 `## △ 참고 논문` 섹션이 있었음 (D6 "🔺 제거"의 △가 실제로는 삼각형 두 종류를 포함 — 🔺(warning triangle) 문자는 scout.md에 원래 없고 △(empty triangle)가 실제 등급. D6 해석 일관성 확인 완료)
- **다음 세션 반영**:
  - MAP.md 자동 파싱은 Scope Mapper routine으로 별도 설계 가능 (Wave 2 이후 후속 안건)
  - Scout 공백 채우기 슬롯이 초기 몇 주 운영 후 실제 채워진 엔트리 수 측정 — 실효성 평가
- **자동 시스템 영향 체크**:
  - Scout·DE routine 둘 다 내일부터 새 규칙으로 실행
  - 기존 `inbox/scout/*.md` 파일들 소급 변경 없음
  - `src/` 런타임 영향 0
  - **다음 세션 참조 필수** (study-notes 존재 전제로 후속 작업 설계)
  → main 직접 머지 필요
