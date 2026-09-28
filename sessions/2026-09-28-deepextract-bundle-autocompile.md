# sessions/2026-09-28-deepextract-bundle-autocompile.md

## 세션 정보
- 날짜: 2026-09-28
- 작업: deep-extract 루틴 개선 — bundle 자동 컴파일(보강 한정) + 신규 엔트리 큐 (backlog 재발 방지 근본 해법)
- 건드린 파일: `routines/deep-extract.md` · `inbox/bundle-queue.md`(신규) · `CLAUDE.md` · `rules/file-ownership.md`

---
## 배경
- 직전 세션에서 발견: bundle 수동 컴파일이 수개월 누락 → 앱이 최신 근거 미수신(study-note gap 36건). 근본 원인 = deep-extract가 md만 갱신하고 bundle은 수동(별도 Liby 호출)인데 그 호출이 안 됨.
- 원 설계는 "bundle 수동 = 판단 위험 관리"로 의도적이었으나 **실패**(안전 위해 수동 → 오히려 최신성 상실).
- 미르 결정(AskUserQuestion): **보강만 자동·신규는 플래그** — 기계적 보강은 자동화, 판단 필요한 신규는 사람.

## 설계 — 하이브리드 자동화
- **Step 3.5 (신설)**: deep-extract가 md 반영 후, 각 항목을 bundle 키 존재로 분류.
  - **보강**(키 존재) → 자동 컴파일. guardrail: ① PMID 중복 hard-check(skip) ② 섹션 **추가만**(구조·키 재할당 금지) ③ `node -c` 검증(실패 시 롤백+큐) ④ ?v bump.
  - **신규**(키 없음)·자동 실패 → `inbox/bundle-queue.md` 큐로 플래그(자동 금지).
- **Step 3.5-B (신설)**: 신규 엔트리 큐 파일. Liby가 kind·parents·uiHooks·Triage·중복판단으로 처리.
- **안전 원칙**: "의심되면 큐로"(앱은 의료용 — 자동 오류 회피 우선). 보강 자동화는 "섹션 하나 추가 + PMID"라는 기계적 작업에 한정.

## bundle-queue.md 초기 적재
- **신규 엔트리 대기 2건**: episodic-vestibular-menopause(42108535)·tramadol-depression-risk(41921874) — 진짜 study-note-only.
- **일회성 backlog 21건**: 05~07월 미컴파일 보강(dyslipidemia·frailty×3·anemia×3·hypertension·resistant-hypertension·CKD·recurrent-uti·sinusitis·incidental-physical-activity 등). 과거분이라 routine 재수집 안 됨 → 일회성 수동.

## 거버넌스 갱신
- CLAUDE.md Liby ingest #3: "보강 자동/신규는 bundle-queue" 로 개정.
- file-ownership.md: knowledge-bundle.js 편집 권한에 "Deep Extract Step 3.5(보강 자동)" 추가.

## 결과
- 판정: 통과. main 반영(자동 routine 명세 변경 → 필수).
- 다음 작업(후속): ① bundle-queue.md의 일회성 21건 컴파일("05~07월 backlog 처리해줘") ② 신규 2건 엔트리 생성. ③ 다음 deep-extract 실행 시 Step 3.5 실동작 관찰.

## 회고
- "안전을 위한 수동"이 최신성 상실로 역효과 → 자동화가 오히려 안전. 단 자동 범위를 **기계적 보강**으로 한정하고 신규 판단은 사람에 남긴 게 핵심(의료 안전).
- 다음 세션 반영: 루틴 자동 시스템 변경 → main. bundle-queue.md가 backlog 단일 진실원(SessionStart 훅·완료보고가 표면화).
