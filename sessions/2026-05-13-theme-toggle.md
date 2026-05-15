# sessions/2026-05-13-theme-toggle.md

## 세션 정보
- 날짜: 2026-05-13
- 작업: 트랙 B — Dark/Light mode 토글 + 형광색 차분화 (EMR 위화감 감소)
- 건드린 파일: `src/app.js`, `src/index.html`, `src/styles.css`
- 브랜치: claude/trusting-rhodes-a3ff5c
- 컨텍스트: 미르 brainstorm (ortho_hwang Clinova 영상) → Boss 4관점 검토 → Architect 진단 → 두 트랙 분리 (B 먼저, A 후속)

---

## 배경

미르 지적: "UI가 EMR하고 너무 동떨어져 있어서 환자 앞에서 사용하기가 힘들어. Dark/Light mode 정도 선택할 수 있으면 좀 나을 거 같애. 형광색은 좀 덜 사용하고."

차트지의 핵심 사용 환경 = EMR 옆 의사 PC. EMR 은 대부분 Light 톤 + 차분한 색상. 차트지 v18 의 *Dark + 형광 4종* (`#f5a623` 주황, `#a78bfa` 보라, `#60a5fa` 파랑, `rgba(245,166,35,.4)` mark) 은 환자 앞에서 시각적 위화감 발생.

본 트랙은 트랙 A (상용구 패널) brainstorm 진행 중 *즉시 가치* 항목으로 분리됨. Architect 진단 시 트랙 A 와 styles.css 충돌 회피 위해 *B 먼저 완주 → A 진입* 순서 권고.

---

## Architect 진단 (요약)

PASS. Designer 제약 7개:
1. CSS custom properties 도입은 `styles.css` 내부만 (책임 종류 변경 ❌)
2. 토글 UI 위치 = 기존 mode-toggle 영역 인접 (새 surface ❌)
3. 영속성 = localStorage. `app.js` state 1개 + useEffect 1개 한정
4. 색상 교체 범위 = 형광색 → 차분 대체만 (레이아웃·spacing·typography 불변)
5. WCAG AA 보장
6. sessions/ 기록 의무
7. 트랙 A 진입 전 완주

---

## Designer 설계서 (요약)

6개 변경 (위험도 낮은 순):
1. `src/index.html` — `?v=0508-recompile` → `?v=0513-theme` (캐시 bump, 9회)
2. `src/styles.css` — `:root` + `body.theme-light` CSS variables 정의 블록 삽입 (각 ~21개 변수)
3. `src/styles.css` — 색상 리터럴 26개 → `var(--...)` 일괄 치환
4. `src/app.js` — `themeMode` state + useEffect (body classList toggle + localStorage 동기화)
5. `src/app.js` — 🌙 다크 / ☀ 라이트 토글 UI 추가 (mode-toggle 인접)
6. `src/app.js` — 최상위 div + 탑바 + 모드토글 분리선 5곳 인라인 색상 → `var(--...)`

### 형광색 차분 대체
| 현재 | Dark 대체 | Light 대체 |
|---|---|---|
| `#f5a623` 주황 | `#d4a574` | `#a8763d` |
| `#a78bfa` 보라 | `#9b8db8` | `#6b5b95` |
| `#60a5fa` 파랑 | `#7a9cc4` | `#3a6a9b` |
| `rgba(245,166,35,.4)` mark | `rgba(212,165,116,.22)` | `rgba(168,118,61,.18)` |

### 의도된 부분 적용
본 트랙은 *form 영역* (최상위·탑바·모드토글·search-md) 한정. `components/*.js` 패널 내부 (RedFlag·Missing·Triage·DraftTab·primitives) 의 인라인 색상은 **본 트랙에서 미변환**. Light 토글 시 패널 내부는 Dark 톤 유지 (의도). 후속 트랙에서 단계적 변환.

근거: Architect 제약 4 + forbidden.md "요청 외 변경 금지". 패널 내부 인라인 색상 일괄 변환 = 회귀 위험 ↑.

---

## Builder 결과

33개 변경 모두 적용 ✓. 명세 외 변경 0.

| 변경 | 파일 | 결과 |
|---|---|---|
| #1 | src/index.html | ✓ `?v=0513-theme` 9회 |
| #2 | src/styles.css | ✓ `:root` + `body.theme-light` 21+21 변수 |
| #3-1~26 | src/styles.css | ✓ 26개 리터럴 치환 |
| #4-A,B | src/app.js | ✓ state + useEffect |
| #5 | src/app.js | ✓ 토글 UI |
| #6-A,B | src/app.js | ✓ 최상위·탑바 5곳 |

백업: git tracking.

---

## Reviewer 결과

| 축 | 판정 |
|---|---|
| 파일 경계 | 통과 |
| 명세 범위 | 통과 |
| 라인 추적 | 통과 |
| 스타일 드리프트 | 없음 |
| 판정 | **통과** |

추가 확인:
- styles.css 잔존 색상 리터럴: 본문 0개 (모두 `:root`/`body.theme-light` 내). 누락 없음.
- app.js 잔존 인라인 색상: ~60건. 모두 트랙 B 범위 외 (form 영역 외 — API key 카드·녹음·draft·라이브 모드). 정상.
- CSS variable 중복 정의: 0. `:root` 1회, `body.theme-light` 1회.
- index.html `?v=` 일관성: 9/9, 잔존 `0508-recompile` 0회.
- drive-by 리팩터 흔적: 없음.

---

## QA 결과

| | 통과 / 전체 |
|---|---|
| 기능 회귀 | 4/4 |
| 임상 안전 | 4/4 |
| 성공 기준 충족 | **9/9** |

### 검증 기준 9개

1. ✓ 빌드/로드 — `?v=0513-theme` 9회, syntax 오류 0
2. ✓ `--bg-base` 정의 — `:root` `#0d1018` 반환 보장
3. ✓ 마크다운 채도 ↓ — `#a78bfa` HSL(255°,92%,76%) → `#9b8db8` HSL(258°,19%,64%), 채도 -73pp
4. ✓ 토글 → body classList + localStorage 동기화 — useEffect 의존성 `[themeMode]` 정확
5. ✓ 🌙/☀ 버튼 2개 노출, 활성 색상 전환
6. ✓ 부분 적용 (최상위·탑바·모드토글만 변환, 패널 내부 Dark 유지) — 의도 일치
7. ✓ prefs 유지 — `localStorage.getItem("cj_theme")||"dark"` 폴백
8. ✓ WCAG AA — Dark `#d4a574` on `#0d1018` **8.37:1** (AAA), Light `#1f2533` on `#f6f7f9` **14.24:1** (AAA)
9. ✓ 4-panel 회귀 0 — `components/*.js` 변경 0

롤백 필요: N

### 비-블로커 관찰
- `app.js:288` 브랜드명 `color:"#c96442"`, `app.js:289` `#2e374f`·`#0d1018` 하드코딩 — Light 전환 시 일부 시각 미정렬 가능. 설계서 변경 6 부분 적용 의도와 부합.
- 색맹 안전성: 형광 → 차분 톤 전환은 명도 대비 유지(8.37/14.24:1) 되어 식별성 손상 없음.

---

## 결과

- 판정: **통과**
- 다음 작업: **트랙 A — 상용구 패널 신설** (`knowledge/templates/` 데이터 + 별 surface + 단축키 hook + 앱 내 편집 UI + localStorage + export/import + 자동 reminder banner). 미르 결단 (b-3) 채택. Designer 호출 진입.

### 트랙 A 진입 prerequisite (자동 해소)
- ~~`rules/samd-boundary.md` 신설~~ — 트랙 A 에서 LLM critical 호출 보류 → SaMD 경계 진입 안 함. 보류.
- ~~`rules/tier0-policy.md` 신설~~ — 미르 결정: Tier 0 분류 체계 자체 불필요. 보류.
- ~~`agents/librarian.md` ingest skill 업데이트~~ — Tier 0 ingest 없음, 미르 수작업. 불필요.

### 메모리 영향
- `project_tier_classification.md` 삭제 (분류 체계 불필요)
- `project_llm_critical_recall.md` 보류 표시 (brainstorm 보존)
- `tacit/ai-content-human-digestion.md` 신설 (본질 — 임상 사용 콘텐츠 미르 수작업)

---

## 회고

### 예상과 달랐던 점
- *부분 적용 (form 영역만) 트레이드오프* — Light 토글 시 패널 내부가 Dark 유지되는 것이 미르 의도와 정합하는가? 본 세션은 "범위 외 변경 금지" 원칙을 우선해 부분 적용 채택. 후속 검증에서 미르 실 사용 인상에 따라 확장 여부 결정.
- *components/*.js 인라인 색상 60건* — 차트지 v18 의 styling 패턴이 *인라인 우선* 임을 확인. 향후 트랙 (또는 별도 refactor) 에서 점진적 CSS class 화 검토 가치 있음. 단 본 트랙 범위 외.
- *형광색 채도 -73pp* — 미르 지적이 정확. Dark mode 안에서도 형광 4종이 EMR 위화감의 주 원인이었음. 채도 감소만으로 환자 앞 사용 가능성 크게 향상.

### 다음 세션 반영
- 트랙 A Designer 진입 시 styles.css 변수 체계 *그대로 활용* — 신설 상용구 패널은 처음부터 `var(--...)` 기반으로 작성.
- 트랙 A 의 패널 내부도 *Light 호환* 으로 작성 (인라인 색상 → `var(--...)`).
- 후속 별 세션 후보: `components/*.js` 인라인 색상 → `var(--...)` 단계적 변환 (현재 60건). 위험도 낮은 surgical refactor.
- 미르가 실 사용 후 Light mode 인상 보고 — 채도 더 줄일지, 다른 톤 시도할지 결정.
