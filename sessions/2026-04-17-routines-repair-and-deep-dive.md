# sessions/2026-04-17-routines-repair-and-deep-dive.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 1 hotfix → 원격 Routines 복구 → Option A 적용 → Protocol Deep Dive 실증
- 건드린 파일 (신규/수정):
  - 신규: `skills/protocol-deep-dive/SKILL.md`, `sessions/2026-04-17-routines-repair-and-deep-dive.md`
  - 대폭 확장: `knowledge/by-disease/urticaria.md` (28 → 146줄)
  - 수정: `src/app.js`, `src/api.js`, `routines/scout.md`, `knowledge/log.md`, `.claude/settings.json`, `inbox/scout/2026-04-17.md`
  - 삭제: `~/.claude/scheduled-tasks/chartji-scout-daily/`, `~/.claude/scheduled-tasks/chartji-deep-extract-daily/`

---

## 작업 1 — Phase 1 hotfix (커밋 `7a2642b`)

### 발견된 이슈 3건 (라이브 앱 테스트 중)

1. **Working Draft에 비만 전용 draftTemplate이 사라짐** — 기존 기능 회귀
2. **판단검토가 "특이 사항 없음"** — knowledge inject가 의도대로 동작 안 함
3. **힌트 중복** (Phase 2에서 해결 예정이라 패스)

### 원인 분석

**#1 Working Draft stale closure 버그 (Phase 1과 무관한 기존 버그)**
- `app.js` useEffect 의존성 배열에 `detectedCalcs` 누락
- Triage 응답이 Draft debounce(3s)보다 늦으면:
  - Draft setTimeout이 stale `detectedCalcs=[]`를 closure로 캡처
  - 결과: `draftTemplate=null`, `knowledgeCtx=""` → 기본 EMR 포맷 출력
- Liby 힌트는 render 시점에 계산되어 최신 detectedCalcs 사용 — 괜찮았음
- 판단검토 onReview도 inline 핸들러라 괜찮았음
- **Working Draft만 stale** 이었던 이유

**#2 판단검토 지시문 과제약**
- Phase 1에서 추가한 "억지로 끼워넣기 금지" 문구가 너무 강하게 작용
- AI가 knowledge 기반 지적을 아예 회피 → MEN2 개인력 미확인 같은 중요 항목도 누락

### 적용한 수정

**hotfix #7 — app.js useEffect 의존성**
- `[raw,liveEnabled,apiKey,followUpCtx]` → `+ detectedCalcs`
- debounce clearTimeout 패턴이 재실행 흡수

**hotfix #8 — api.js generateDraftReview 지시문 재조정**
- Before: `"transcript 맥락에 해당 시만 반영. 억지로 끼워넣기 금지"`
- After: `"환자 상황에 직접 해당하는 금기·주의·미확인 항목이 있으면 적극적으로 지적하라. 환자 상황과 무관한 일반론은 생략한다."`

**hotfix #9 — cacheKey에 detectedCalcs 포함**
- #7만으로 부족: 첫 Draft가 빈 detectedCalcs로 생성 후 `lastDraftRef.current=trimmed` 잠금 → Triage 응답 후에도 재생성 안 됨
- `cacheKey = trimmed + "|" + detectedCalcs.join(",")` 로 변경
- detectedCalcs 변경 → cacheKey 변경 → 자동 재생성

**부수 수정 — `.claude/settings.json` 콤마 누락**
- JSON 파싱 실패 상태 → 콤마 추가로 유효 JSON화
- 내용 자체는 원본 그대로

### 라이브 테스트 결과 (Chrome 자동화)

비만 시나리오 (MTC 가족력 포함 transcript) 검증:
- ✅ Working Draft에 비만 draftTemplate 정상 복원 ("CC 체중감량\n과거 사용했던 비만 약물..." 포맷)
- ✅ RedFlag: `[HIGH] GLP-1 RA 금기 의심 — MTC 가족력 있는 환자에서 위고비 사용 고려 중`
- ✅ 판단검토: MEN2 병력, 췌장염/담석, 허리둘레 미측정, 혈압 경계역 재측정 — 모두 지적
- ✅ Network fetch intercept 검증: 2번째 Draft 호출 systemLen 970 (vs 1st 718), hasCustomTemplate=true, hasKnowledge=true

---

## 작업 2 — 로컬 scheduled task 정리

### 배경

세션 초반 미르 요청으로 `mcp__scheduled-tasks__create_scheduled_task` 로 생성한 로컬 task 2개:
- `chartji-scout-daily` (05:59)
- `chartji-deep-extract-daily` (12:13)

미르 스크린샷으로 확인 → 원격(Remote)에 이미 같은 용도 task 2개 존재 발견. 로컬은 PC awake 필요 + 중복 → 제거.

### 수행

- `~/.claude/scheduled-tasks/chartji-*` 디렉토리 rm -rf
- MCP에 delete 도구 미노출 → `update_scheduled_task enabled=false`로 처리
- UI에 disabled 상태로 남지만 실행 안 됨

---

## 작업 3 — 원격 Routines 복구 (핵심 발견)

### 문제

미르 제보: "GitHub inbox에 .gitkeep 말고 아무것도 없다. 논문 요약이 하나도 안 온다"

### 조사 결과

`RemoteTrigger list` 실행 → 2개 trigger 존재 확인:
- **Daily Pubmed Radar** (`trig_01CBT...`): cron `0 21 * * *` UTC = 06:00 KST
- **Deep Extract** (`trig_018Yz...`): cron `0 3 * * *` UTC = 12:00 KST

둘 다 `enabled:true`, prompt는 "Read the file `routines/scout.md` (또는 deep-extract.md) and execute". GitHub 리포지토리 `jackmir-explorer/chartji` 기준.

**치명적 발견**: `git ls-tree origin/main routines/` → **비어있음**. `routines/` 폴더 자체가 원격 리포지토리에 없음. 로컬 4개 커밋이 미푸시 상태.

원격 trigger가 매일 실행되지만 routines/scout.md를 못 찾아 no-op 종료. 그래서 inbox가 비어있었음.

### 해결

4개 커밋 push: `6e7d3b0..dbad9be` (routines/, skills/, knowledge/ 누적 변경 포함).

오타 1건도 함께 수정: `routines/scout.md` Line 5·68·86 모두 `[x]` → `[o]` 통일.

### 검증

**Scout 수동 trigger**:
- `RemoteTrigger run trig_01CBT...`
- 약 4분 후 `claude/beautiful-ptolemy-J0kNX` 브랜치 생성 확인
- `inbox/scout/2026-04-17.md` — ⭐ 5건 논문 + △ 1건 파생 리뷰
- 키워드 자동 추출: 비만/GLP-1, 예방접종, 어지럼증, 구강건조, LPR/후각 (`knowledge/log.md` 최근 패턴 정확 반영)

---

## 작업 4 — Option A 적용 (main 직접 커밋)

### 동기

Scout이 별도 branch(`claude/beautiful-ptolemy-J0kNX`)에 커밋 → 미르가 모바일 GitHub 앱에서 main 열람 시 inbox/scout 비어보임.

### 수행

- 오늘 결과 수동 merge → push (즉시 가시화)
- `routines/scout.md`에 **Step 7 — main 브랜치에 직접 커밋·푸시** 신설
  - `git checkout main → pull --rebase → add -A inbox/scout/ → commit → push`
  - 재시도 1회 로직 포함
- 재 trigger 실행 → ✅ 별도 branch 없이 `main`에 직접 `3437f4a` 커밋
- 동일 파일(오늘자) 덮어쓰며 더 실용적인 ⭐ 5건 (두드러기/저항성고혈압/CAP 단기항생제/GLP-1 정신질환/GLP-1 전당뇨)으로 교체됨

### Deep Extract는 branch 방식 유지

PR 리뷰 필요하므로 변경 안 함.

---

## 작업 5 — Deep Extract 실증 (PR #1)

미르가 모바일에서 ⭐ 4건을 `[o]` 마크:
- #1 두드러기, #2 저항성 고혈압, #4 GLP-1 정신질환, #5 GLP-1 전당뇨 (#3 CAP은 미선택)

`RemoteTrigger run trig_018Yz...` 실행 → 5분 후:
- `claude/deep-extract-2026-04-17` 브랜치 생성
- 커밋 3건:
  - `6a56c56 feat: Deep Extract — 4건`
  - `232a5b7 chore: scout 마커 [o] → [⏳ PR#1]`
  - `50dade3 docs: 세션 기록`
- 6개 파일 변경 / +236줄
- **PR #1 자동 생성**: https://github.com/jackmir-explorer/chartji/pull/1
- 미르 merge → `4cea42e` main 반영

knowledge 품질 검증:
- `urticaria.md`, `resistant-hypertension.md` 신규 — 분류/문진/처방 구조화
- `glp1-selection-strategy.md` 확장 — SMI 메타분석 수치(–6.17kg, –0.31%) + 약물별 정상혈당 회복률 표
- 출처 PMID + DOI 모두 정확

---

## 작업 6 — Protocol Deep Dive 실증 + 스킬 명세 (커밋 `6c5cb24`)

### 발단

미르 질문: "초록까지만 확인가능해? 항히스타민제 4배 증량의 구체적 용법과 부작용 등이 궁금하다"

### 탐색

1. 4건 논문 metadata 확인 → **모두 PMC ID 없음** = `get_full_text_article` 불가
2. AFP 공식 사이트 URL 추론 → WebFetch 성공 → **그러나 full text에도 "up to four times if needed" 원칙만 있음**
3. 핵심 발견: **리뷰 논문은 구현 디테일을 담지 않는다** — 원본 가이드라인 추적 필요

### 원본 가이드라인 추적

PubMed 검색: `EAACI urticaria guideline 2021-2023` → 5개 hit
- **PMID:34536239** EAACI/GA²LEN/EuroGuiDerm/APAAACI 원본 가이드라인 — PMC 없음 (Wiley 유료)
- **PMC9533216** Ryan 2022 일차의료 적용 경로 (Clin Transl Allergy, open access)
- **PMC9300824** Kocatürk 2022 임신·수유 관리 (Front Allergy, open access)

PMC 2건은 `get_full_text_article` 접근 가능 → 89KB full text 확보.

### 구체 정보 추출 (Python 파싱)

Full text에서 다음을 grep으로 추출:
- 약물별 표준/4배 용량 (cetirizine 10→40mg 등 6종)
- 재평가 타이밍 (2~4주, 4주)
- 동반 검사 (CBC, CRP/ESR, 선택적 TSH/anti-TPO)
- Omalizumab 300mg SQ q4w, ~70% 반응률
- UAS7/UCT 모니터링 도구
- 단기 OCS (3~5일 ≤1mg/kg) vs 장기 금지
- 임신 Pregnancy Category B (cetirizine 선호)
- 일차의료 의뢰 기준
- NOT Recommended (1세대 / montelukast EAACI 비권고 / 장기 OCS)

### knowledge/by-disease/urticaria.md 확장

28줄 → 146줄. 원본 Deep Extract 버전은 초록 기반 → Protocol Deep Dive 버전은 full text + 원본 가이드라인 기반.

### skills/protocol-deep-dive/SKILL.md 신규

명세 내용:
- 언제 쓰고 언제 안 쓰는지
- 6단계 실행 절차 (원본 가이드라인 식별 → full text 접근 경로 → 구체 정보 추출 → 파일 작성 → log 기록 → 커밋/PR)
- Full text 접근 우선순위: PMC → WebFetch → DOI → 2차 open-access 자료
- 품질 기준 (✓ 좋은 출력 / ✗ 나쁜 출력)
- 요청 방법 (현재는 데스크톱 chat, 모바일 queue는 향후)

---

## 판정

- **통과** — 모든 hotfix 커밋 + 라이브 검증 + 원격 routines 양방향 검증 + PR #1 merge + Protocol Deep Dive 실증

## 커밋 히스토리 (오늘)

```
6c5cb24 feat(knowledge): 두드러기 Protocol Deep Dive + protocol-deep-dive 스킬 명세
4cea42e Merge pull request #1 from jackmir-explorer/claude/deep-extract-2026-04-17
50dade3 docs: 세션 기록 — Deep Extract 2026-04-17
232a5b7 chore: scout 마커 업데이트 — [o] → [⏳ PR#1]
6a56c56 feat: Deep Extract — 급성·만성 두드러기·저항성 고혈압 외 4건
204f01e 2026-04-17.md (Scout 2nd run on main via Option A Step 7)
3437f4a feat(scout): 2026-04-17 Scout Report — ⭐ 5건
971cda0 feat(routines/scout): Option A — main 직접 커밋 Step 7 추가
d9a0b06 Merge remote-tracking branch 'origin/claude/beautiful-ptolemy-J0kNX'
48ef491 fix(routines): scout.md 잔여 [x] 오타 2건 수정
5e4723c feat(scout): 2026-04-17 Scout Report 생성 — ⭐ 5건 (1st run)
dbad9be fix(routines): scout.md 마커 오타 수정 — [x] → [o]
7a2642b fix: Phase 1 hotfix — Working Draft stale closure + 판단검토 지시문 재조정 + settings.json 콤마
```

## 다음 작업

**Phase 2** — Boss 전략 리뷰 로드맵 중:
1. Bundle 데이터 구조 정리 (obesity.treatment ↔ 위고비.treatment 중복 해소)
2. 힌트 생성 로직 변경 (질환 카테고리만 힌트, 약물 카테고리는 참조탭)
3. 참조 탭 하이브리드화 (CALCULATORS 없는 질환에 knowledge 참조 카드)
4. Knowledge Surfacing 프로토타입 (AI 큐레이션)

## 회고

### 예상과 달랐던 점

- **Phase 1이 "한 번에 끝"이 아니라 hotfix 사이클이 필요했다** — 설계·구현 완료 후 라이브 테스트에서만 드러나는 버그 2건 (stale closure, 지시문 과제약). QA 단계가 "sync check만"으로 부족함을 재확인.
- **원격 trigger는 로컬 리포지토리와 독립** — "commit만 해도 충분"이 아니라 "push까지 해야" 실제 동작. 당연한 사실이지만 로컬 개발 흐름에서 잊기 쉬움.
- **리뷰 논문의 본질적 한계** — abstract vs full text 차이보다 "리뷰 vs 원본 가이드라인" 차이가 훨씬 큼. 임상 구현 디테일은 대부분 원본 가이드라인에만 있음.

### 다음 세션 반영

- **라이브 스모크 테스트 자동화** 필요성 재확인 (Boss Q6 Phase 3) — Phase 2 검증에도 적용
- **원격 trigger 작업 시 "origin 최신?" 체크 루틴** 추가 — 로컬 개발 후 push 빠짐 방지
- **Protocol Deep Dive 적용 대상 후보 추적** — 오늘 Deep Extract로 추가된 `resistant-hypertension.md`, `glp1-selection-strategy.md` 확장도 Deep Dive 대상일 수 있음. 필요 시 미르가 추가 요청.
- **Phase 2는 라이브 테스트 빈도 높여서 진행** — hotfix 사이클 사전 차단

## Sync Check (수동)

오늘 변경 대상: knowledge-bundle.js / prompts.js는 건드리지 않음 → 원칙적으론 sync-check 실행 요건 아님. 다만 knowledge/ 대량 확장 + 신규 urticaria.md 추가는 있음.

향후 Phase 2에서 bundle 수정 시 `skills/sync-check/SKILL.md` 실행 필수.
