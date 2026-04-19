# Routine: Scout (Daily PubMed Radar)

## 실행 주기
매일 오전 6:00 (KST) 자동 실행
→ 결과는 `claude/scout-YYYY-MM-DD` 브랜치에 커밋되어 PR 생성 (main ← head)
→ 미르가 모바일 GitHub 앱 알림으로 PR 확인 → 원탭 머지
→ main 반영된 파일에서 [o] 체크 (Deep Extract 대상으로 선택)
→ Deep Extract Routine 이 정오 12:00 (KST) 에 [o] 항목 처리

## 목적
일차의료 외래 의사에게 유용한 최신 논문을 자동 탐색해
`inbox/scout/YYYY-MM-DD.md` 에 저장한다.
미르가 ⭐ 항목을 선택하면 Deep Extract Routine이 정식 ingest한다.

---

## 실행 절차

### Step 0 — 오늘 날짜 결정 (KST 기준, 신규 생성 우선)

⚠ 시간대 주의: cron이 UTC 21:00 (= KST 06:00)에 실행되므로,
runner의 기본 "오늘"이 UTC 기준으로 어제일 수 있다.
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

### Step 1 — 관심 키워드 귀납 추출
`knowledge/log.md` 마지막 30개 항목을 읽는다.
자주 등장하는 질환·약물·키워드 TOP 5를 추출한다.
(예: 비만 GLP-1 어지럼증 예방접종 구강건조 → 이번 탐색 키워드로 사용)

### Step 2 — 탐색 (3-Tier)

**Tier 1 — Anchor Journals (우선)**
아래 저널에서 최근 30일 이내 발행된 논문 검색:
- American Family Physician (AFP)
- BMJ Practice Pointers
- NEJM Clinical Practice (Review)
- JAMA Rational Clinical Examination
- Annals of Internal Medicine In the Clinic

검색 쿼리: `site:pubmed.ncbi.nlm.nih.gov "{저널명}" {키워드} 2026`

**Tier 2 — 귀납 키워드**
Step 1 에서 추출한 키워드로 PubMed 검색
쿼리 형식: `{키워드} primary care outpatient 2025[dp]:2026[dp]`

**Tier 3 — 랜덤 탐색 (1건)**
다음 중 랜덤 1개 카테고리에서 논문 1건 탐색:
응급의학 / 일반외과 감별 / 외상 / 피부과 / 정형외과 / 소아과 /
신경과 / 노인의학 / 비뇨의학 / 부인과(호르몬) / 심혈관 / 정신건강 /
완화의학 / 임상영양 / 재택의료 / 호스피탈리스트 / 의학AI / 보완의학

※ 전체 스코프 및 우선순위: `knowledge/scope.md` 참조

### Step 3 — 필터링
수집한 논문 각각에 대해 아래 기준으로 ⭐/△/✕ 평가:

| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래에서 바로 적용 가능한 실용 지식 포함 |
| △ | 배경 지식으로 유용하나 즉각 처방 변화 없음 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 |

⭐ 항목만 최종 보고에 포함 (△는 선택 포함, ✕는 제외)

### Step 4 — 결과 파일 작성
`inbox/scout/$TODAY.md` 파일 **신규 생성** (Step 0의 KST 날짜 사용):

```markdown
# Scout Report — YYYY-MM-DD

## ⭐ 주목 논문
### 1. {제목 축약}
- **저널:** {저널명} | **PMID:** {번호}
- **한 줄:** {임상 핵심 1줄}
- **왜 유용:** {1차의료 적용 포인트}
- **Deep Extract:** [ ] ← 원하면 [o]로 변경 → 정오 12시에 자동 처리

### 2. ...

## △ 참고 논문 (선택)
### 1. {제목}
- **PMID:** {번호} | **한 줄:** {요약}

---
*Scout 실행: {실행 시각} | 키워드: {사용한 키워드 목록}*
```

### Step 5 — 아카이브 정리
`inbox/scout/` 에서 오늘 날짜 기준 **7일 초과** 파일을 `inbox/scout/archive/` 로 이동한다.
(archive/ 는 보관 전용 — Deep Extract 대상 아님)

### Step 6 — 완료 보고
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

# Scout 결과 파일 + archive 이동 결과 stage
git add -A inbox/scout/

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
- body: ⭐ 논문 각각의 PMID + 한 줄 요약 (미르가 모바일에서 제목·본문만 보고도 대략 파악 가능하도록)

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
- 탐색 실패 시 (검색 결과 없음): 해당 Tier 건너뜀, 사유 기록
- 하루 최대 ⭐ 5건 제한 (과부하 방지)
