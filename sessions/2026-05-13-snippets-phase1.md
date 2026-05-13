# sessions/2026-05-13-snippets-phase1.md

## 세션 정보
- 날짜: 2026-05-13
- 작업: 트랙 A Phase 1 — 상용구 패널 (Snippets) 신설
- 건드린 파일: `src/components/snippets.js` (신설), `src/app.js`, `src/index.html`, `rules/file-ownership.md`, `rules/panel-contracts.md`
- 브랜치: claude/trusting-rhodes-a3ff5c
- 컨텍스트: 트랙 B (테마 토글) 머지 후 진입. 미르 brainstorm + Boss 검토 + Architect 진단 + 미르 결단 후 Designer Phase 1 진입

---

## 배경

미르가 ortho_hwang (Clinova) 영상 보고 *"상용구·약속처방을 의사가 직접 작성·호출하는 UX"* 가치 인식 → brainstorm 4 라운드 → Boss 4관점 검토 → Architect 진단 STOP + 미르 5개 결단 → 트랙 A Phase 1 시작.

**미르 결단**:
- Q-A1 (B): 상용구 별 surface 신설
- Q-A2 (b-3): localStorage + Export/Import
- Q-A3·A4 보류: LLM critical 호출·공부 todo 큐 작업 안 함
- Q-A5: Tier 분류 체계 자체 불필요
- Q-A6: 단축키 책임 Designer 위임

**핵심 원칙** (tacit/ai-content-human-digestion.md):
> AI 생성 콘텐츠는 미르 소화 후에만 임상 사용. Tier 0 (상용구·약속처방) = 미르 수작업, LLM 컴파일 ❌.

---

## Phase 분할 (Designer 권고)

| Phase | 내용 | 본 세션? |
|---|---|---|
| **Phase 1 (MVP)** | 데이터 store + UI + 클립보드 복사 + **Export/Import** | ✓ |
| Phase 2 | 단축키 hook + 검색 typeahead | 다음 |
| Phase 3 | 7일 reminder + 카테고리 필터 | 다음 |

Export/Import 를 Phase 1 에 포함한 근거: 미르 "GitHub 위에서 작업" 의도 = 데이터 보존이 MVP 의 일부.

---

## 파일 명명 — `snippets.js`

`src/templates.js` 가 이미 `CALCULATORS` (질환별 계산기) 점유. **상용구 = snippets** 로 명명 (templates 와 명확 구분).

---

## Designer 설계서 (요약)

7개 변경 (모두 위험도 ★☆☆):

1. **`src/components/snippets.js` 신설** (~242줄) — `SnippetsScreen` + localStorage I/O + Export/Import + 클립보드 복사
2. **`src/app.js`** mode 주석 갱신 (`"snippets"` 추가)
3. **`src/app.js`** 모드 토글 "📝 상용구" 버튼 추가
4. **`src/app.js`** snippets screen 분기 추가
5. **`src/index.html`** `?v=0513-theme` → `?v=0513-snippets` 9회 일괄 + snippets.js script 라인 추가
6. **`rules/file-ownership.md`** `src/components/snippets.js` 신항목
7. **`rules/panel-contracts.md`** "Snippets" 신항목

### 데이터 shape (최소 필드)
```js
{ id, name, content, updatedAt }
```
section 분할 (CC/PI/P/Ex/Imp/Plan) 은 Phase 확장 시 판단. Simplicity First.

### 호출 흐름
1. 모드 토글 "📝 상용구" 클릭 → SnippetsScreen 진입
2. 좌측 목록 + 우측 편집 form (이름·본문)
3. "📋 복사" → `navigator.clipboard.writeText` → 1.5초 "✓ 복사됨" → 미르 EMR 창 Ctrl+V
4. 신규: "+ 새 상용구" → 빈 항목
5. 편집 즉시 localStorage 자동 저장 (debounce 300ms)

### Export/Import
- ⬇ Export → `chartji-snippets-YYYY-MM-DD.json` 다운로드
- ⬆ Import → 파일 선택 → JSON 검증 → confirm 다이얼로그 → 덮어쓰기

---

## Builder 결과

7개 모두 ✓. 명세 외 변경 0.

| 변경 | 결과 |
|---|---|
| #1 `src/components/snippets.js` | ✓ Write 신설 (242줄) |
| #2 `src/app.js` mode 주석 | ✓ |
| #3 `src/app.js` 토글 버튼 | ✓ |
| #4 `src/app.js` screen 분기 | ✓ (들여쓰기 6 spaces — 실제 파일 컨벤션 적응) |
| #5-A `src/index.html` `?v=` 9회 bump | ✓ |
| #5-B `src/index.html` snippets.js script 라인 | ✓ |
| #6 `rules/file-ownership.md` | ✓ |
| #7 `rules/panel-contracts.md` | ✓ |

---

## Reviewer 결과

| 축 | 판정 |
|---|---|
| 파일 경계 | 통과 |
| 명세 범위 | 통과 |
| 라인 추적 | 통과 |
| 스타일 드리프트 | 없음 |
| 판정 | **통과** |

추가 검증:
- snippets.js CSS variables 일관성: ✓ (hex/rgba grep 0건, var() 30건)
- snippets.js LLM 경로: 0 (api·prompts·anthropic 참조 0)
- snippets.js KNOWLEDGE_BUNDLE 참조: 0
- 들여쓰기 #4: 정상 적응 (주변 코드 6 spaces 컨벤션)
- mode-toggle 위치: 정확 (진료/검색 그룹 안)
- index.html script 순서: 정확 (search → snippets → app)
- rules 신항목 위치: 정확 (별 surface 그룹핑)

---

## QA 결과

| | 통과 / 전체 |
|---|---|
| 기능 회귀 | 11/11 |
| 임상 안전 | 3/3 |
| 성공 기준 충족 | **11/11** |

### 11개 검증 기준
1. ✓ addNew + debounce 저장 — useEffect [snippets] + setTimeout 300ms + saveSnippets
2. ✓ copyContent + 1.5초 표시 — navigator.clipboard + execCommand fallback
3. ✓ Export JSON 다운로드 — Blob + URL.createObjectURL + `chartji-snippets-YYYY-MM-DD.json`
4. ✓ Import confirm + 로드 — FileReader + JSON.parse + Array.isArray + 항목별 검증
5. ✓ Import 취소 시 보존 — confirm 취소 → return, setSnippets 호출 0
6. ✓ Dark/Light CSS variables — 30개 var() 모두 양쪽 모드 정의
7. ✓ mode 주석 (시각)
8. ✓ 3 버튼 토글 — 진료/검색/상용구
9. ✓ screen 분기 + state 보존 — 동일 App 컴포넌트, mode 분기 unmount 0, 4-panel diff 0줄
10. ✓ index.html `?v=` 일관 — `?v=0513-snippets` 10건, `?v=0513-theme` 0건
11. ✓ rules 신항목 일치성 — 코드 실제 동작과 정의 일치

### 임상 안전
- ✓ 환자 식별 정보 banner — snippets.js L233-239
- ✓ clinic/snippets 격리 — mode 기본값 "clinic", clinic 진입 시 SnippetsScreen 렌더 ❌
- ✓ 4-panel 무손상 — panels.js·sections.js·primitives.js git diff 0줄

### 비-블로커 관찰 (Phase 2 후 검토)
- removeSnippet stale closure — React 비동기 갱신, 1-tick 지연 후 수렴. Phase 2 에서 useState updater 통일 고려.
- Import shape 검증 = id/updatedAt 자동 채움. 악의적 JSON·중복 id 방어는 Phase 확장 시.

롤백 필요: **N**

---

## 결과

- 판정: **통과**
- 다음 작업: 트랙 A Phase 2 — 단축키 hook + 검색 typeahead. 미르가 Phase 1 실 사용 후 *어떤 단축키가 자연스러운지* 피드백 받은 다음 진입 권고.

### 트랙 A 전체 진행 상태
- ✅ Phase 1 (본 세션 완료)
- ⏳ Phase 2 (단축키 + 검색 typeahead) — 미르 실 사용 피드백 후
- ⏳ Phase 3 (7일 reminder + 카테고리) — 상용구 ≥10개 작성 후 필요성 판단

### 보류 항목 (Q-A3/A4/A5)
- LLM critical 수동 호출 endpoint
- 공부 todo 큐
- rules/samd-boundary.md, rules/tier0-policy.md, librarian.md ingest skill 업데이트
- Tier 0 분류 체계 명문화

---

## 회고

### 잘된 점
- **Phase 분할 자체가 큰 산출** — 트랙 A 전체를 한 사이클로 가지 않고 MVP + 후속 Phase 로 분리. 1인 개발 자원 분산 회피.
- **Simplicity First 잘 지킴** — content 단일 필드, section 분할 ❌, 자동 분류 ❌, AI 자동 추론 ❌. 미르 수작업 입력만.
- **트랙 B CSS variables 즉시 활용** — 신설 컴포넌트가 처음부터 Dark/Light 양쪽 호환. 후속 정리 비용 0.
- **데이터 보존 mechanism 완비** — Export/Import 가 Phase 1 에 포함되어 localStorage 단점 (브라우저 격리) 의 1차 방어선 확보.

### 예상과 달랐던 점
- **Builder #4 들여쓰기 자동 조정** — Designer 설계서 8 spaces 가 추정치였고 실제 파일은 6 spaces. Builder 가 정상 적응. 향후 Designer 가 *실제 파일 확인 후 설계서 작성* 하는 게 정확도 ↑.
- **snippets.js 실제 242줄** (Designer 추정 ~210줄) — fallbackCopy + import 검증 + UI placeholder 등 디테일 포함. 명세 범위 내 정상.

### 다음 세션 반영
- Phase 2 진입 전 미르가 Phase 1 *실 사용* 1주. 어떤 단축키가 자연스러운지 미르 경험에서 결정. 지금 단축키 매핑 추정 ❌.
- removeSnippet stale closure 패턴이 Phase 2 검색 typeahead 에서도 등장 가능 — useState updater 통일 가이드 명문화 검토.
- Import 악의적 JSON 방어 (현재 shape 만 검증) — Phase 확장 시 quota·중복 id·재귀 깊이 등 추가.
- 미르가 상용구 작성 시 *section 분할이 필요하다고 느끼면* Phase 2 또는 별 트랙으로 검토. 현재는 content 단일 필드 충분.
