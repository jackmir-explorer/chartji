# 2026-04-19 Routines Trigger 진단 — main-{random} 리다이렉트 사건

## 세션 정보
- 날짜: 2026-04-19
- 작업: Scout/Deep Extract trigger "미발화" 의심 → 진단 → 실제 원인은 플랫폼의 main 직접 push 차단 + `main-{random}` 자동 리다이렉트였음을 확인
- 건드린 파일: (기록만. 실제 수정은 후속 세션에서)

---

## 미르 제보

"routines에 등록된 것처럼 오늘자 논문이 github inbox에 들어가야하는데 아무것도 없어"

즉 `inbox/scout/2026-04-19.md` 가 main 브랜치에 안 보임.

---

## 내 초기 진단 (틀렸음)

**가설**: Scout trigger가 4-18, 4-19 두 번 모두 발화 실패.

근거로 든 것:
- `ls inbox/scout/` → 2026-04-17.md 까지만
- `git log --all --since="2 days ago" -- inbox/scout/` → 새 파일 생성 흔적 없음
- 4-17 이후 trigger 관련 커밋 0건 (main 기준)

제시했던 원인 후보:
- 원인 A: 외부 스케줄러 인프라 문제
- 원인 B: c870186 직후 trigger message 부수 update 오류
- 원인 C: routines/scout.md Step 0 "신규 생성을 우선" 한국어 모호성 (LLM 오해)

→ 진단 방향을 전부 "왜 안 돌았나"로 고정.

---

## 실제 원인 (미르가 trigger 수동 실행 후 발견)

미르가 routines 탭에서 수동 실행 → log 공유:
> "Scout 완료. inbox/scout/2026-04-19.md 생성 후 **main-gRDCd 브랜치**에 푸시했습니다."

**즉 trigger는 정상 발화·routine도 정상 실행·파일도 생성됐다.** 단지 `git push origin main`이 플랫폼 샌드박스에서 차단되며 `main-{random suffix}` 브랜치로 자동 리다이렉트.

### 증거 (미르 힌트 받은 후 `git branch -r` 실행)

| 브랜치 | 최신 커밋 | 내용 |
|---|---|---|
| `origin/main` | `c870186` (4-18 17:55) | KST fix까지만 |
| `origin/main-N1ISl` | `3c5954c` | **4-18 Scout ⭐5건** |
| `origin/main-gRDCd` | `a3d1b71` | **4-19 Scout ⭐4건** |

→ 4-18, 4-19 두 번의 Scout 결과가 **숨겨져 있던 것**이지 소실된 게 아니었음.

### 4-17은 왜 됐는데 4-18부터 안 됐나

4-17 `3437f4a`은 실제로 main 직접 랜딩 (`main-*` 유사 브랜치 없음). 4-17과 4-18 사이에 **플랫폼이 main 직접 push 차단 정책을 추가**한 것으로 추정 (Anthropic 측 or GitHub branch protection 측). 우리 routine 코드 문제는 아님.

---

## 4-19 Scout ⭐ 4건 (main-gRDCd 브랜치 내용)

- PMID 41931049 — NEJM GLP-1 RA 종합 리뷰 2026: 근육·골 손실 부작용, 중단 후 체중 회복 상담
- PMID 41950475 — NEJM Celiac Disease Clinical Practice: IgA anti-tTG 기반 진단
- PMID 39535805 — JAMA Psychiatry: Semaglutide/Liraglutide → AUD 입원 위험 36%/28% 감소
- PMID 41739597 — IDSA COVID-19 백신 가이드라인(면역저하자): 2025-2026 시즌 강력 권고

△ 참고 2건: 성호르몬-혈전 위험(NEJM), 어지럼증-척추동맥 도플러 필요성.

---

## 진단 실패 회고

### 왜 놓쳤나

1. **가설 고정 (fixation)**: "파일 없음 = trigger 안 돎"으로 일찍 고정. 반대 가설("돌았는데 결과가 다른 곳에 갔다")을 세우지 않았음.
2. **관측 범위 협소**: `inbox/scout/` 디렉토리 + main 브랜치만 조사. `git branch -a` / `git branch -r` 한 번도 안 돌렸음 — 돌렸으면 1분 내 답 나왔을 일.
3. **이전 세션 기록 맹신**: 4-17 세션의 "Option A = main 직접 커밋 성공" 기록을 재검증 없이 전제로 사용. 플랫폼 정책이 바뀌었을 가능성을 후보에서 뺐음.
4. **외부 상태 정보 요청 지연**: 플랫폼 UI의 trigger run log는 내부 리포지토리에서 볼 수 없는 결정적 단서. 초반에 미르에게 "routines 탭 log 공유해달라" 요청했어야 함.

### 재발 방지 체크리스트

"뭔가 안 나타남" 류 디버깅 시 반사적으로:
1. `git branch -a` / `git ls-remote origin` 먼저 — **"어디에 있는지"를 "있는지 없는지"보다 먼저 묻는다**
2. 항상 **두 개의 반대 가설** 동시 세우기: "X가 안 일어났다" vs "X가 일어났는데 다른 곳에 있다"
3. 플랫폼 외부 상태가 결정적일 수 있는 영역에선 **미르에게 해당 정보(UI log, 스케줄러 상태) 공유 요청을 초반에** 하기
4. 이전 세션의 "성공" 기록은 당시 시점 사실로만 취급. **재검증 없이 현재 전제로 사용 금지.**

---

## 다음 작업 (후속 세션에서)

### 즉시 복구
- `origin/main-N1ISl` 의 4-18 Scout 결과를 `main`으로 머지
- `origin/main-gRDCd` 의 4-19 Scout 결과를 `main`으로 머지
- 두 머지 후 `main-N1ISl`, `main-gRDCd` 브랜치 삭제

### 근본 수정 — routines/scout.md Step 7 개편

두 방향 검토:

**방법 A — MCP GitHub 도구로 main 직접 커밋 (최적)**
- `mcp__github__create_or_update_file` 또는 `mcp__github__push_files` 사용
- GitHub API 경유 → 샌드박스의 git push 차단 우회 가능 (branch protection만 없으면)

**방법 B — 브랜치 + 자동 머지 PR (Fallback)**
- 브랜치명 `claude/scout-$TODAY` (랜덤 suffix 아닌 예측 가능)
- PR 자동 생성 + auto-merge 플래그
- 미르 모바일 GitHub 앱에 알림

어느 방법이 통할지는 플랫폼 제약에 따름. 방법 A부터 시도하고 실패 시 B로 전환 권고.

### 기타 유지
- `deep-extract.md` 는 이미 PR 방식이라 수정 불필요
- `routines/scout.md` Step 0 한국어 모호성은 병행 정리하면 좋음 (근본 원인 아니지만 청소)

---

## 회고

- 예상과 달랐던 점:
  - 진단이 잘못된 방향으로 깊이 들어갔고 미르가 직접 단서 찾아줘야 했음. "가설 고정" 실수의 대가가 생각보다 컸음 (약 1시간 진단 시간).
  - 플랫폼 정책이 세션 사이에 바뀔 수 있다는 감각이 약했음.
- 다음 세션 반영:
  - 위 재발 방지 체크리스트 반사적으로 적용
  - 세션 시작 시 "이전 세션의 성공 전제가 현재도 유효한가?" 1분 검증 루틴 고려
