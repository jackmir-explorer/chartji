# sessions/2026-04-24-wave1-knowledge-r1-r2-r3-r4.md

## 세션 정보
- 날짜: 2026-04-24
- 작업: Wave 1 knowledge 스키마 확장 (R1 메타필드 + R2 relations[]+auto-wikilinks + R3 섹션 5개 + R4 myth-log inject 격리)
- 건드린 파일:
  - Spec 6종: `rules/forbidden.md`, `rules/file-ownership.md`, `rules/data-flow.md`, `knowledge/section-vocabulary.md`, `skills/knowledge-ingest/SKILL.md`, `agents/librarian.md`
  - 엔트리 43개: `knowledge/by-disease/*.md` (21), `knowledge/by-drug/*.md` (18), `knowledge/guidelines/*.md` (4)
  - 신규 myth-log 2건: `knowledge/myth-log/glp1-gi-ae-myth.md`, `knowledge/myth-log/glp1-ir-myth.md`
  - 설계서: `sessions/design-2026-04-24-wave1-knowledge.md`

---

## Boss 승인서
- 원전: `sessions/2026-04-23-handoff-knowledge-ddx-next-session.md` §2 Boss 4관점 판정 매트릭스 + §7 2026-04-24 추가 확정 안건
- R1·R2·R3·R4 모두 즉시 채택 (R4는 inject 격리 조건부)
- 미르 권고 수용 "다 해보려고" — §3 결단 3개 + §7-2 결단 3개 모두 "권고대로" 해석 (본 세션 초반)
- 미르 결단 (R3 primary 매핑 5개 + R4 myth 3번째 보류): 세션 중반 확정

## Designer 설계서
- `sessions/design-2026-04-24-wave1-knowledge.md`
- 범위: Wave 1 knowledge 저위험 묶음. src/ 코드 변경 없음 (rule level 예약). routines/ 무관 (별도 설계서 W2 예고).
- 변경 10건 (위험도 오름차순):
  1. forbidden.md myth 조항 (낮음)
  2. file-ownership.md myth-log 경계 (낮음)
  3. librarian.md myth inject 차단 (낮음)
  4-5. myth-log 초기 2건 (낮음)
  6. section-vocabulary.md R1+R2+R3 통합 (중간)
  7. data-flow.md 5행 신설 (중간)
  8. SKILL.md 5-B 템플릿 + 5-D auto-wikilinks (중간)
  9. 43 엔트리 메타필드 백필 (중간 — 순회)
  10. 42 엔트리 wikilinks 백필 (중간 — 순회)

## Builder 결과

### #1~#3 규정 파일
- `rules/forbidden.md` Liby § 아래 myth 2조항 추가
- `rules/file-ownership.md` `knowledge/myth-log/` 경계 섹션 신설 (src/styles.css 직전)
- `agents/librarian.md` Inject 트리거 § 아래 "kind:myth 전면 차단" 섹션 추가

### #4~#5 myth-log 초기 2건
- `knowledge/myth-log/glp1-gi-ae-myth.md` (GLP-1 GI AE 미신)
- `knowledge/myth-log/glp1-ir-myth.md` (GLP-1 인슐린 저항성 개선 미신)
- 양쪽 모두 `kind: myth` + `tags: [MYTH]` + R1 4메타필드 + R2 relations: [] 포함
- 공부 근거 섹션은 `(미정)` — Liby 별도 ingest 시 채움

### #6 section-vocabulary.md
- dictionary 제목 `18개 → 23개` 갱신
- R3 5행 추가 (prognosis·lifestyle·complications·counseling·follow-up-schedule)
- `kind: "disease"` uiHooks 기본값 갱신 — hint에 lifestyle·follow-up-schedule, guide에 prognosis·complications·counseling 추가
- parents § 하단에 "R2 6개월 후 자연 퇴장 검토" 주석
- R1 메타필드 섹션 + R2 relations[] 섹션 신설 (parents § 아래)
- updated: 2026-04-19 → 2026-04-24

### #7 data-flow.md
- 매트릭스 `notes` / `draft-append` 사이에 5행 신설
- 각 row primary ✓ 정확히 1개 (lifestyle·follow-up-schedule은 hint, 나머지 3개는 guide)
- uiHooks 기본값 앵커 § 하단에 "2026-04-24 R3 Wave 1" 주석
- updated: 2026-04-19 → 2026-04-24

### #8 SKILL.md
- 5-B 템플릿: 메타필드 5줄 + relations: [] 추가
- 5-D 신설: auto-wikilinks 삽입 절차 (5-C와 5-A 사이에 배치)
- 7-B bundle 컴파일 v2 포맷에도 메타필드·relations[] 반영 + "bundle consumer 미소비" 주석

### #9 메타필드 43 엔트리 백필
- Agent 위임 (general-purpose). 43/43 파일 삽입 완료, skip·오류 0건.
- 총 diff: +258 / -0.
- Idempotent 규칙 적용 (이미 `version:` 존재 시 skip). 실제 발생 0건 (clean state).
- parents 라인 있는 파일: 0개 (BPPV.md는 상단 맥락 주석만 있고 YAML `parents:` 필드 없음). 모두 keywords: 아래 삽입.
- keywords 없는 파일 2건(mucomyst.md, pilocarpine.md): H1 제목 아래 빈 줄 다음에 안전 삽입.

### #10 wikilinks 43+2 엔트리 백필
- Agent 위임 (general-purpose). 14 파일에 29 wikilinks 삽입.
- myth-log 2건은 target 금지 준수 (어떤 엔트리에서도 myth-log로 링크 없음).
- 보수적 skip: 공백 차이 (`SGLT-2 억제제` vs `SGLT2 억제제`), 대소문자 (`Semaglutide` vs `semaglutide`), 부분 일치 (`당뇨병` vs keyword `당뇨`) 등 — 오변환 0건.
- 삽입 패턴: `[[target-key|원문 토큰]]`
- 섹션당 첫 등장 1회 원칙 — 가독성 확보.
- 표 내부 셀 삽입 허용, 인용문(`> 근거:`·`> 출처:`)·코드블록·frontmatter 내부 skip.

## Reviewer 결과
- Spec 3종 diff +122 / -6 — 설계 외 변경 없음
- 엔트리 43 diff +289 / -31 — 31 delete은 전부 wikilinks replace 패턴 (토큰 감싸기 시 라인 교체), 실제 라인 삭제 0건
- grep 검증: `relations: []` 정확히 43 파일 존재
- forbidden.md에 `kind: "myth"` 2회, file-ownership.md myth-log 섹션 존재, librarian.md `kind: "myth"` 차단 문구 1회, section-vocabulary.md "23개" 문자열 존재 — 전부 설계서 검증 기준 통과
- Surgical Changes 원칙 준수 — 본문 내용 의미 변경 0건

## QA 결과
- **판정: 통과**
- src/ 런타임 영향 0 (rule level 예약만)
- 임상 안전 충돌 없음 (inject 격리 강화)
- Obsidian 그래프 가시성 확대 (29 wikilinks 추가 — 수작업 5건 대비 약 6배 증가)
- myth-log 폴더는 inject 경로 완전 격리 상태로 존재

---

## 결과
- 판정: 통과
- 다음 작업:
  - **설계서 W2 (Scout/DE 개편)** — 미르 결단 D4·D5·D6 기반. 기존 Scout 확장 + 일 10건 + 🔺 제거 + `inbox/study-notes/` 신설 + A층 순수학습용. 별도 세션 권고.
  - **Wave 2 (R5+R6 DDx UI)** — Wave 1 완료 후 Architect 재호출 (panel-contracts.md 변경 + data-flow.md primary 신설 → STOP 판정 확정적, 별도 세션 최우선).
  - **myth-log 3번째 엔트리** — 미르가 차후 수동 선정 후 Liby에 제출.
  - **공백 차이 keyword 정규화 검토** — 1회성 정리 (예: `SGLT-2 억제제` vs `SGLT2 억제제` 표기 통일). 우선순위 낮음.

## 회고
- **예상과 달랐던 점**:
  - wikilinks 변환율 예상보다 낮음 (14/45 파일). 공백·대소문자 엄격 매칭 + 보수적 skip으로 인해 keyword 구성이 서로 orthogonal한 엔트리 조합에서 완전 일치가 드묾. 의도된 안전성의 대가.
  - 기존 엔트리 중 `parents:` YAML 필드 실사용 0건. 문서상 도입됐으나 실 엔트리 적용은 없었음 → R2 relations[] 도입 시 6개월 병존 부담은 작을 가능성.
- **다음 세션 반영**:
  - wikilinks 변환율 향상 위한 keyword 표기 정규화가 R2 kind:"parent" 활성화 전에 선행되면 효율적
  - 설계서 W1처럼 **대량 순회 작업을 Agent 위임**하는 패턴은 재현 가능 — Wave 2 / Phase 5 v2 변환에도 적용 가능
- **자동 시스템 영향 체크**:
  - routines/scout.md·deep-extract.md 변경 없음 — 본 세션 건드리지 않음 (W2 범위)
  - `src/` 변경 없음 — 앱 runtime 영향 0
  - Liby SKILL.md 변경 있음 — 다음 Liby 호출부터 5-B 템플릿에 R1 메타필드 자동 포함 + 5-D auto-wikilinks 자동 실행
  - **다음 세션 참조 필수** — Scout/DE 개편 설계서가 본 세션 인계 사항 (섹션 dictionary 23개) 전제로 작성됨
  → main 직접 머지 필요 (CLAUDE.md 세션 종료 체크리스트 3항목 모두 YES)
