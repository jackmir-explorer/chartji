# Routine: Scout (Problem-Based Scout)

## 핵심 원칙 (2026-05-17 재편)
전문의 시험공부·외래진료가 1순위. Scout는 그 둘에서 더 파고들어야 할
개념에 대해서만 논문 리뷰를 제공한다. **매일 자동 발행하는 push형 radar 폐기.**
`inbox/gaps.md`는 "비워야 할 할 일 목록"이 아니라 "원할 때 꺼내 쓰는 주차장"이다.
미해소가 default·정상 — 소진 의무 없음.

## 실행 모델
- **on-demand (기본)**: 미르가 세션에서 호출할 때만 발화.
  - `scout [시험] 부정맥 초기대응` 식으로 직접 개념 지정, 또는
  - `inbox/gaps.md` 에 항목 추가 후 `scout` 호출
  - `[시험]` prefix 항목 자동 우선 처리
- **주1회 안전망 (조건부)**: gaps.md에 미해소(`[x]` 아닌) 항목이 있을 때만 발화.
  - 가장 오래된 ≤3건만 (`[시험]` prefix 우선) 처리
  - 영역 cycling·자체 검색어 생성 **금지** — 기존 gap 항목만 처리
  - 미해소 항목 없으면 **조용히 종료** (보고서 생성 안 함)

→ 결과는 `claude/scout-YYYY-MM-DD` 브랜치에 커밋되어 PR 생성 (main ← head)
→ 미르가 모바일 GitHub 앱 알림으로 PR 확인 → 원탭 머지
→ main 반영된 파일에서 [o] 체크 (Deep Extract 대상으로 선택)
→ Deep Extract Routine 이 정오 12:00 (KST) 에 [o] 항목 처리

## 목적
시험공부·외래진료에서 미르가 부딪힌 구체적 문제(`inbox/gaps.md`)에 대해
PubMed에서 타깃 논문을 찾아 `inbox/scout/YYYY-MM-DD.md` 에 저장한다.
미르가 ⭐ 항목을 선택하면 Deep Extract Routine이 정식 ingest한다.

---

## 실행 절차

### Step 0 — 오늘 날짜 결정 (KST 기준, 신규 생성 우선)

⚠ 시간대 주의: 호출 시점 runner의 기본 "오늘"이 UTC 기준이면
KST와 어긋날 수 있다 (특히 주1회 안전망이 UTC 야간에 돌 때).
**파일명에 사용하는 "오늘"은 반드시 한국 표준시(KST, UTC+9) 기준이다.**

Bash로 결정:
```bash
TODAY=$(TZ=Asia/Seoul date +%Y-%m-%d)
echo "Scout 대상 날짜 (KST): $TODAY"
```

이 `$TODAY`를 모든 후속 단계의 파일명에 사용한다.

#### 기존 파일 정책
- `inbox/scout/$TODAY.md` 가 **이미 존재하면 → 현재 run 종료** (덮어쓰기·자동 보완 금지, 전날 파일을 잘못 수정하는 사고 방지)
- 같은 날짜 재실행이 필요하면: 미르가 기존 파일을 `inbox/scout/archive/` 로 이동 후 재실행

### Step 1 — Gaps 기반 탐색 (2026-05-17 본체 승격)

`inbox/gaps.md`가 유일한 입력원. 영역 cycling·자체 검색어 생성 없음 —
미르가 던진 문제만 처리한다. (구 1-A~1-D 영역 cycling·"매일 7건 의무"는 본 재편으로 폐기)

#### 1-1. 대상 항목 선정

1. `inbox/gaps.md`에서 `- ` 로 시작하는 줄 중 `[x]`가 아닌 항목 수집
2. **`[시험]` prefix 항목 자동 우선** — 시험공부가 1순위. `[시험]` 항목을 큐 맨 앞으로 정렬
3. 처리 건수:
   - **on-demand + 미르가 개념 지정**: 지정한 문제만 (gaps.md 추가 여부 무관)
   - **on-demand (지정 없음)**: `[시험]` 우선 → 최근 추가 순, 미르가 멈추라 할 때까지 또는 상한 ≤5
   - **주1회 안전망**: 가장 오래된 ≤3건만 (`[시험]` 우선). 미해소 0건이면 보고서 생성 없이 종료
4. 환자 식별 정보 격리 불필요 (2026-05-10 미르 결단 — 본인 통제로 신뢰)

#### 1-2. 키워드 추출 및 검색

각 항목에서:
1. 의학 개념 추출 (질환·약물·술기·감별진단 등)
2. 대괄호 prefix는 1순위 키워드로 활용
   - `[시험]`은 **우선순위 마커일 뿐 검색 키워드 아님** — 항목 본문에서 개념 추출
   - `[POCUS] IVC collapsibility 해석` → "POCUS" + "IVC" + "collapsibility"
3. PubMed 쿼리:
   - `"{개념}" AND (primary care OR family medicine OR general practice) 2024[dp]:2026[dp]`
   - 결과 부족 시: `"{개념}" review 2023[dp]:2026[dp]`
   - 시험 항목은 review·guideline·핵심 정리 우선 (회독 적합성)
4. Step 2 Anchor 저널은 보조 참조 (개념 영역 저널 우선 검색에만 활용)
5. Step 3 필터링(⭐/✕) 동일 기준 적용

#### 1-3. gaps.md 마커 갱신

- ⭐ 논문 배정 시 → `- [x] {원문} (→ PMID {번호}, {날짜})` 으로 자동 변경
- 검색했으나 적합 논문 없음 → 미처리 유지, 보고서 footer에 `gap 미해소: {항목}` 기록 (다음 호출 시 재시도 가능)
- `[x]` 30건 초과 시 → gaps.md Archive 섹션으로 자동 이동
- (구 "7일 연속 미해소 ⚠ 경고" 폐지 2026-05-17 — 미해소는 default·정상, 잔소리 엔진 제거)

### Step 2 — 탐색 (Anchor 저널 보조 참조)

Step 1-2에서 만든 쿼리를 PubMed에 실행한다. 개념 영역에 해당하는
Anchor 저널이 있으면 우선 검색 (1차의료 적용성 높은 review·guideline 우선):

| 개념 영역 | 우선 저널 |
|---|---|
| POCUS·초음파 | J Ultrasound Med · AFP |
| 통증·완화 | Pain Medicine · J Pain Symptom Manage · AFP |
| 재택·노인 | J Am Geriatr Soc · Drugs & Aging |
| 만성질환·약물 | Ann Int Med ITC · Drugs & Aging · BMJ Practice Pointers |
| 진단추론·일반 | NEJM Clinical Problem-Solving · AFP · BMJ PP · JAMA RCE |

저널 매핑은 강제 아님 — 개념이 표에 안 맞으면 일반 PubMed 검색.

**대체 검색 (논문 미발견 시)**:
- 개념 키워드 단독 + `primary care review 2024[dp]:2026[dp]`
- review·guideline·textbook 우선 (1차의료/시험 적용성 높음)

※ 전체 스코프 정의: `knowledge/scope.md` 참조

### Step 2-B — 중복 PMID 사전 차단 (30일)

Step 3 필터링 직전 적용:
1. `inbox/scout/` 의 **최근 30일 보고서** 모두 스캔 (archive/ 포함 직전 30일 cover)
2. 각 보고서에서 ⭐ 항목 PMID 추출 (정규식: `PMID:\s*\d+`)
3. 이번 run 후보 중 위 목록과 일치하는 PMID는 사전 제외 ([o] 체크 여부 무관)
4. 제외된 PMID는 footer "탐색 메모"에 한 줄 기록 (예: `중복 차단: PMID:41839077 (4-25 등록 후 30일 내)`)

**예외**: 미르가 직전 보고서에서 [x] 처리해 명시적으로 스킵한 PMID도 차단 (재등장 방지). [ ] 미확인 상태도 차단.

(2026-04-29 "직전 2회 8건 미달 → 30→14→7일 자동완화"는 폐지 2026-05-17 — problem-based 전환으로 8건 목표 소멸)

### Step 3 — 필터링
수집한 논문 각각에 대해 아래 기준으로 ⭐/✕ 평가:

| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래 또는 전문의 시험에서 바로 적용 가능한 실용 지식 포함 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 / 배경 지식만 있고 즉각 처방·시험 변화 없음 |

⭐ 항목만 최종 보고에 포함 (✕는 제외).

### Step 4 — 결과 파일 작성
`inbox/scout/$TODAY.md` 파일 **신규 생성** (Step 0의 KST 날짜 사용):

```markdown
# Scout Report — YYYY-MM-DD

## ⭐ 주목 논문
### 1. {제목 축약}
- **저널:** {저널명} | **PMID:** {번호}
- **한 줄:** {임상 핵심 1줄}
- **왜 유용:** {1차의료/시험 적용 포인트}
- **Gap:** {원본 gap 항목 — `[시험]` 여부 포함}
- **추출 키워드:** {gap → PubMed 변환 키워드}  ← 변환 정확도 검증용 (필수)
- **Deep Extract:** [ ] ← 원하면 [o]로 변경 → 정오 12시에 자동 처리

### 2. ...

*Scout 실행: {실행 시각} | 모드: {on-demand / 주1회 안전망}*
```

추출 키워드 라인은 **필수** — 한 줄 gap → PubMed 변환 정확도 검증 가능.

### Step 5 — 아카이브 정리
`inbox/scout/` 에서 오늘 날짜 기준 **7일 초과** 파일을 `inbox/scout/archive/` 로 이동한다.
(archive/ 는 보관 전용 — Deep Extract 대상 아님)

### Step 6 — 완료 보고 (2026-05-17 problem-based 재편)

scout 보고서 footer에 다음 양식 추가:

```
---
처리 모드: {on-demand / 주1회 안전망}
처리 gap: {N}건 ([시험] {n1}건 · 외래 {n2}건)
gap 미해소: [{항목}, ...] (해당 시만 — 미해소는 정상, 다음 호출 시 재시도 가능)
PMID 중복 차단: {N}건
```

마지막 줄에 다음 추가:
`> Scout 완료 {실행시각}. ⭐ {N}건 발견. 원하는 항목 [ ] → [o] 체크 시 정오 12:00에 자동 처리됩니다.`

### Step 7 — 브랜치 생성 + PR (Deep Extract 와 동일 흐름)

**배경 (2026-04-19 변경)**: 이전 Step 7 은 `git push origin main` 직접 푸시였으나,
플랫폼 샌드박스가 main 직접 push 를 차단하고 `main-{random}` 브랜치로 자동 리다이렉트함이 확인됨 (`sessions/2026-04-19-routines-trigger-diagnosis.md` 참조).
예측 가능한 브랜치명 + PR 생성으로 전환 — 미르가 모바일 GitHub 앱 알림으로 인지 → 원탭 머지.

#### 7-1. 브랜치 생성 및 push

```bash
BRANCH="claude/scout-$TODAY"

# origin/main 최신을 base 로 새 브랜치 생성
git fetch origin main
git checkout -B $BRANCH origin/main

# Scout 결과 파일 + archive 이동 결과 + gaps.md 마커 갱신 stage
git add -A inbox/scout/ inbox/gaps.md

# 커밋 ({TODAY}, {N} 은 실제 값으로 치환)
git commit -m "feat(scout): $TODAY Scout Report — ⭐ {N}건"

# 브랜치 push (실패 시 1회 재시도)
git push -u origin $BRANCH || (sleep 5 && git push -u origin $BRANCH)
```

#### 7-2. PR 생성 (MCP GitHub 도구)

`mcp__github__create_pull_request` 로:
- owner: `jackmir-explorer`
- repo: `chartji`
- base: `main`
- head: `$BRANCH` (즉 `claude/scout-$TODAY`)
- title: `feat(scout): $TODAY Scout Report — ⭐ {N}건`
- body: ⭐ 논문 각각의 PMID + 한 줄 요약 + gap 출처 (미르가 모바일에서 제목·본문만 보고도 대략 파악 가능하도록)

#### 7-3. 동작 흐름
- 미르가 GitHub 모바일 앱 PR 알림 확인 → 원탭 머지 → main 반영
- merge 후 [o] 체크는 main 의 `inbox/scout/$TODAY.md` 에서 수행 가능
- Deep Extract routine 은 정오 12:00 에 main 기준으로 [o] 항목 처리 (기존 동작 그대로)

#### 주의
- 브랜치명은 예측 가능한 `claude/scout-YYYY-MM-DD` — 랜덤 suffix 금지
- 재실행 방지는 Step 0 의 "기존 파일 존재 시 종료" 정책이 담당 — Step 7 에 도달하는 시점에는 항상 새 파일
- PR 생성 실패 시 사유 기록 후 종료 (브랜치는 이미 push 됐으므로 미르가 수동으로 PR 생성 가능)

---

## 논문 상태 마커
Scout 파일 내 각 항목의 상태는 다음 마커로 표시됨:

| 마커 | 의미 |
|------|------|
| `[ ]` | 미확인 |
| `[o]` | Deep Extract 선택 (정오 처리 예정) |
| `[⏳]` | PR 생성 완료 — 미르 Merge 대기 중 |
| `[✓]` | knowledge/ 반영 완료 |
| `[x]` | 스킵 (관심없음) |

---

## 주의사항
- 논문 내용 재현 금지 (저작권) — 핵심 임상 포인트 + PMID 링크만
- PMID 없는 논문은 DOI 또는 저널+연도+저자 표기
- 탐색 실패 시 (검색 결과 없음): 해당 gap 건너뜀, footer에 `gap 미해소` 기록
- **발행량 목표 없음** (2026-05-17 problem-based 전환) — ⭐ 건수는 미르가 던진 문제 수에 종속. 0건도 정상.
  - 구 "하루 ⭐ 8~10건 목표"(2026-04-29) 폐지. 미해소 gap을 "비워야 할 큐"로 취급 금지.
  - 전문의 시험공부·외래진료가 1순위, scout는 보조 — 주객전도 방지.
