# 2026-04-21-parents-field.md — parents 메타 필드 도입

## 세션 정보
- 날짜: 2026-04-21
- 작업: child → parent 맥락 확장 메타 필드 도입 (expandWithParents 헬퍼 + 10 엔트리 parents 부여 + 문서 3건)
- 건드린 파일:
  - `src/app.js` (헬퍼 + 8 inject 지점 치환 + useMemo 2곳)
  - `src/knowledge-bundle.js` (10 엔트리 parents 필드 추가)
  - `src/index.html` (cache-bust `v=parents`)
  - `knowledge/section-vocabulary.md` (parents 루트 메타 섹션 신설)
  - `skills/knowledge-ingest/SKILL.md` (ingest 영구 체크리스트 — parents 판단 필수)
  - `agents/auditor.md` (parents 감사 4종 — dangling/순환/깊이/누락 후보)
- 설계서: `sessions/design-2026-04-21-parents-field.md`
- 관련 이전 세션: `sessions/2026-04-21-b2-phase5a-vaccines.md` (vaccination parent 우회 패턴)

---

## Boss 승인서
Boss 승인안 C + Architect PASS(조건부 제약 9개) 전제. 설계서에 전면 반영됨. Boss 성공 기준:
- ① BPPV 단독 감지 시 dizziness 상위 문진·감별 맥락 주입
- ② 위고비 단독 감지 시 obesity + 위고비 hint 동시 노출 (drug 우선순위 회귀 없음)

## Designer 설계서
`sessions/design-2026-04-21-parents-field.md` — 미르 승인 완료. 핵심:
1. app.js 내부 순수 헬퍼 `expandWithParents` + Set dedup
2. `hasDiseaseOriginal` 판정은 원본 detectedCalcs 기준 (parent 확장 제외) — drug 우선순위 회귀 방지
3. 제약 3 택일 (b) — vaccination 계열 parents 미부여 + dedup 보호
4. 대상 10 엔트리: BPPV·이석증(→dizziness) + GLP-1 drug 8종(→obesity)

## Builder 결과

### 1. app.js 변경
- `expandWithParents(detected)` 헬퍼 신설 (line 20~32, getUiHooks 직후)
  - 순수 함수, `Array.from(new Set(...))` dedup, parent 미존재 silent-skip
- App 함수 상단에 `draftHints` / `differentialShort` useMemo 2개 선언 (line 86~128)
  - dependency `[detectedCalcs]`
  - `hasDiseaseOriginal` 원본 기준 판정 (설계서 §2 #4 의도)
- 8 inject 지점 치환 (설계서 §2 #1~#8):
  - #1 Working Draft effect — line 226~228
  - #2 handleCuration — line 103~104
  - #3 Guide useEffect hasKnowledge — line 141~143
  - #4 DraftTab draftHints — prop 치환 (`draftHints={draftHints}`)
  - #5 TriagePanel differentialShort — prop 치환 (`differentialShort={differentialShort}`)
  - #6 Draft Review onReview knowledgeCtx — line 563~565
  - #7 Guide 탭 노출 조건 — line 496
  - #8 GuideTab detectedKeys — line 585

### 2. knowledge-bundle.js — 10 엔트리 parents 부여 확인
```
56:    "BPPV"        "parents": ["dizziness"]
64:    "이석증"       "parents": ["dizziness"]
577:   "위고비"       "parents": ["obesity"]
609:   "wegovy"      "parents": ["obesity"]
660:   "마운자로"      "parents": ["obesity"]
686:   "mounjaro"    "parents": ["obesity"]
712:   "tirzepatide" "parents": ["obesity"]
738:   "zepbound"    "parents": ["obesity"]
765:   "오젬픽"       "parents": ["obesity"]
793:   "ozempic"     "parents": ["obesity"]
```
vaccination 개별 엔트리에는 parents 미부여 (설계서 §4 제약 3 (b) 택일).

### 3. index.html cache-bust
`app.js?v=phase5a` → `app.js?v=parents`

### 4. 문서 3건 업데이트
- `knowledge/section-vocabulary.md`: "parents 메타 필드 (엔트리 루트, 2026-04-21 도입)" 섹션 신설
- `skills/knowledge-ingest/SKILL.md`: Step 7-B 하위에 "parents 메타 필드 판단" 영구 체크리스트 5단계 추가 + "parents 판단 생략 금지" GOTCHA
- `agents/auditor.md`: 감사 기준 4종 신설 (dangling · 순환 · 깊이 과다 · 누락 child 후보)

### 명세 외 변경: 없음

---

## Reviewer 결과
Builder 자체 검증:
- Grep으로 8 지점 모두 `expandWithParents(detectedCalcs)` 치환 확인
- `hasDiseaseOriginal=detectedCalcs.some` 원본 기준 유지 확인 (line 108)
- cacheKey는 detectedCalcs 기준 유지 (설계서 회귀 방지 #2)
- `useEffect` 활성 탭 자동 추가 (line 147) 및 `lastDraftRef` cacheKey는 원본 기준 (CALCULATORS lookup · 캐시 무효화 둘 다 out-of-scope)
- forbidden.md 위반 없음: 백업 파일 생성 (`*.bak-parents`), 전체 재작성 없음, 인접 코드 리팩터 없음, 스타일 드리프트 없음

후속 Reviewer는 Designer 설계서 §2 #1~#8 vs 실제 diff 1:1 추적 필요.

---

## QA 결과 (Chrome MCP 실기 127.0.0.1:8765)

### 런타임 검증
| # | 검증 | 결과 |
|---|---|---|
| Bundle 로드 | `KNOWLEDGE_BUNDLE["BPPV"].parents === ["dizziness"]` 외 10건 | PASS |
| 헬퍼 로드 | `typeof expandWithParents === "function"` | PASS |
| parent 선행 존재 | `obesity`·`dizziness` 엔트리 존재 | PASS |
| 콘솔 신규 에러 | 이번 세션 변경으로 새 경고 도입 여부 | 0건 (기존 `key={i}` 경고만 존재, spawn task 분리) |
| 앱 렌더 | `#root` innerHTML > 1000 + 탑바/탭 렌더 | PASS |

### 헬퍼 순수 함수 테스트 (페이지 내 JS 실행)
```
BPPV 단독      → ["BPPV","dizziness"]                     ✓
BPPV+이석증    → ["BPPV","이석증","dizziness"] (dedup)      ✓
위고비 단독    → ["위고비","obesity"]                       ✓
위고비+obesity → ["위고비","obesity"]        (dedup)        ✓
obesity 단독   → ["obesity"]                             ✓
empty          → []                                       ✓
unknown        → ["없는키"]                 (silent-skip)  ✓
mixed          → ["BPPV","위고비","dizziness","obesity"]   ✓
```

### drug 우선순위 회귀 시나리오 (설계서 §6 R1~R4)
| # | 시나리오 | expanded | hasDiseaseOriginal | parts | 판정 |
|---|---|---|---|---|---|
| R1 | obesity 단독 | `["obesity"]` | true | `obesity.protocol` | PASS |
| R2 | 위고비 단독 | `["위고비","obesity"]` | **false** | `위고비.dosing + 위고비.contraindication + obesity.protocol` | **PASS — 성공 기준 ② 충족** |
| R3 | obesity+위고비 | `["obesity","위고비"]` | true | `obesity.protocol` | PASS (기존 동작 보존) |
| R4 | BPPV 단독 | `["BPPV","dizziness"]` | true | `BPPV.treatment + dizziness.differential` | **PASS — 성공 기준 ① 충족** |

### Guide tab handleCuration ctx
- BPPV 단독 → `BPPV.exam + dizziness.exam` (dizziness.exam은 11항목 문진 + 편두통 추가 문진 텍스트 포함) → **성공 기준 ① 중 "Guide tab에 dizziness 11항목 문진" 충족**
- 위고비 단독 → 위고비 4 섹션 + obesity classification/exam/notes 동시 주입

### Working Draft effect ctx
- BPPV 단독 → `BPPV.treatment + dizziness.differential` knowledgeCtx 주입 → 성공 기준 ① 중 "Working Draft에 dizziness differential 반영" 충족

### 알려진 한계 (설계서 §5 Case A 사전 명시)
- BPPV 단독 감지 시 v1 `draftHints` 경로는 `dizziness.exam`(11항목)을 소비하지 않음 (v1 분기는 treatment/differential만) — Architect 제약 #4 "차등 확장 금지"로 본 세션 범위 밖. 사용자는 Guide tab에서 11항목 문진을 확인 가능.

### 스크린샷 / 로그
- 콘솔 로그 요약: 기존 `key={i}` 경고 (panels.js:186 / sections.js:406 / primitives.js:10) 외 신규 이슈 0건
- spawn task 생성: "Fix React key={i} warnings in components" (후속 세션으로 분리)

---

## 결과
- **판정: 통과**
- **Boss 성공 기준**:
  - ① BPPV 단독 → dizziness 11항목 문진 (Guide) + dizziness differential (Working Draft/DraftTab) 자동 주입 ✓
  - ② 위고비 단독 → 위고비 dosing/contraindication + obesity protocol 동시 노출, drug 우선순위 회귀 없음 ✓
- 다음 작업:
  - 후속: spawn task "React key={i} 경고 정리" (post-QA)
  - 후속: 필요 시 추가 child→parent 관계(HPV·Tdap 등 vaccine child) 검토 — 제약 3 재검토 시점

## 회고
- 예상과 달랐던 점:
  - 기존 React `key={i}` 경고가 baseline에 있었다는 점 — stash 대조로 확인됨. 본 세션에선 건드리지 않고 분리 처리 결정.
  - 설계서 §5 Case A의 "dizziness.draftAppend" 표현은 실제 bundle상 null임 (Guide tab에선 dizziness.exam·notes 등으로 대체 확인됨). Designer가 "draft-append"를 넓은 의미로 쓴 것.
- 다음 세션 반영:
  - parents 필드 영구 ingest 체크리스트 발효 — Liby 호출 시 SKILL.md Step 7-B 체크 필수
  - Auditor 실행 시 새 4 항목 감사 자동 포함
  - Phase 3(runtime v1/v2 공존) 이후 v2 disease child가 늘어나면 parents 부여 대상 확장 검토
