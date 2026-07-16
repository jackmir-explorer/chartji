# Routine: Scout (Daily PubMed Radar)

## 실행 주기
매일 오전 6:00 (KST) 자동 실행
→ 결과는 `claude/scout-YYYY-MM-DD` 브랜치에 커밋되어 PR 생성 (main ← head)
→ 미르가 모바일 GitHub 앱 알림으로 PR 확인 → 원탭 머지
→ main 반영된 파일에서 관심 논문의 💬 반응 칸에 한 문장 작성 (답변 게이트 = Deep Extract 신호)
→ Deep Extract Routine 이 정오 12:00 (KST) 에 반응이 채워진 항목 처리

## 목적
일차의료 외래 의사·전문의 시험에 유용한 최신 논문을 자동 탐색해
`inbox/scout/YYYY-MM-DD.md` 에 저장한다.
미르가 ⭐ 항목을 선택하면 Deep Extract Routine이 정식 ingest한다.

## 핵심 원칙 (2026-05-26 재편)
- **회전 기반 push형 radar 복귀** — 2026-05-17 problem-based 전환에서 0~3건 산출 패턴 굳어진 문제 해결
- **하루 ⭐ 3-5건 목표** — 9-10건 매일 의무 폐기, 영역 rotation으로 cycle 내 cover
- **gaps.md 의존 제거** — 미르가 Google Drive에서 수동 관리, scout는 읽지도 쓰지도 않음
- **Liby Follow-up 슬롯 신설** — 최근 업데이트된 `knowledge/*.md` 주제를 회전 탐색하여 자기보강

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
- `inbox/scout/$TODAY.md` 가 **이미 존재하면 → 현재 run 종료** (덮어쓰기·자동 보완 금지)
- 같은 날짜 재실행이 필요하면: 미르가 기존 파일을 `inbox/scout/archive/` 로 이동 후 재실행

### Step 1 — 슬롯 할당 (2026-05-26 rotation 재편)

> 본 routine은 미르의 임상 핵심영역(Mir-Tier 1)에 정렬된다.
> source of truth: `~/.claude/projects/.../memory/user_clinical_focus.md` + `knowledge/scope.md` Mir-Tier 1 섹션.
> **2026-05-26**: 7영역 매일 cover 의무 폐기 → **매일 2영역 rotation (7일 cycle)**. 1-E gaps 슬롯을 **Liby Follow-up**으로 교체.

**1-A. 영역 내부 세부 키워드 추출**

`knowledge/log.md` 마지막 30개 항목 → Mir-Tier 1 7영역 각각의 빈도 TOP 1 세부 키워드 추출.

오늘 cover하는 2영역에 대해서만 추출하면 충분. 해당 영역 log.md 항목이 없으면 영역 default 키워드 사용 (`knowledge/scope.md` Mir-Tier 1 표 "세부 키워드" 컬럼 참조).

**1-B. Mir-Tier 1 슬롯 할당 (매일 2영역 rotation, 7일 cycle)**

7영역에 인덱스 0~6 부여:

| # | idx | 영역 | 검색 키워드 (default) | Anchor 저널 |
|---|---|---|---|---|
| 1 | 0 | POCUS·초음파 중재 | `POCUS OR ultrasound-guided` | J Ultrasound Med · AFP |
| 2 | 1 | 비암성 만성통증·근골격 | `chronic non-cancer pain OR neuropathic pain` | Pain Medicine · AFP |
| 3 | 2 | 암성통증·완화의료 | `palliative care OR cancer pain` | J Pain Symptom Manage · AFP |
| 4 | 3 | 재택의료·노인의학 | `home-based care OR frailty` | J Am Geriatr Soc · Drugs & Aging |
| 5 | 4 | 만성질환 본체 확장 | `multimorbidity OR chronic disease management` | Ann Int Med ITC · NEJM Clinical Practice |
| 6 | 5 | 임상약물학·Deprescribing | `deprescribing OR drug interaction OR opioid stewardship` | Drugs & Aging · BMJ Practice Pointers |
| 7 | 6 | 생활습관의학 | `lifestyle medicine OR exercise prescription` | AFP · JAMA RCE |

**오늘 cover 영역 결정**:
```bash
DAY=$(($(date -d "$TODAY" +%s) / 86400))
IDX1=$((DAY % 7))
IDX2=$(((DAY + 1) % 7))
# 오늘 cover = [영역 IDX1, 영역 IDX2]
```

각 슬롯 1건 → **2건 의무**. 검색 키워드 = 1-A 추출 키워드 + default 키워드 OR 조합.

**Fallback**: 특정 영역에서 후보가 없거나 모두 ✕ 판정이면 슬롯 비우고 footer에 `{영역} 발행 부족` 기록. 보충 슬롯은 두지 않음 (다음 cycle에서 자연 회복).

**1-C. 횡단 모듈 슬롯 (3일 cycle, 1건)**

`day = (UNIX day epoch) % 3`:
- `0` → **A. 통증·완화·노인 정신건강** (`chronic pain depression OR palliative adjustment disorder OR geriatric depression`)
- `1` → **B. Communication & Counseling** (`motivational interviewing OR breaking bad news OR shared decision making`)
- `2` → **C. Diagnostic Reasoning** (`clinical problem solving OR diagnostic reasoning OR clinical pearls`)

Anchor 저널: NEJM Clinical Problem-Solving · JAMA Patient Page · AFP. 1슬롯.

**1-D. Tier 2 라운드로빈 (8일 cycle, 1건)**

`day = (UNIX day epoch) % 8`:

| Day % 8 | 영역 | 검색 키워드 |
|---|---|---|
| 0 | 호흡기 | `respiratory primary care` |
| 1 | 소화기 | `gastroenterology primary care` |
| 2 | 이비인후과 | `otolaryngology primary care` |
| 3 | 내분비외 만성질환 | `endocrinology primary care` |
| 4 | 비뇨·부인 기본 | `urology OR gynecology primary care OR menopause OR abnormal uterine bleeding` |
| 5 | 예방접종·건강검진 | `adult vaccination OR cancer screening primary care` |
| 6 | **외래응급** | `anaphylaxis OR hypoglycemia OR arrhythmia initial OR seizure OR laceration repair OR burn first aid primary care` |
| 7 | 심혈관·신경 | `cardiology OR neurology primary care OR headache OR dementia OR stroke prevention` |

직전 7일 scout 보고서 footer "Tier 2: [{영역}]" 회피해 cycling 보장. Anchor 저널: AFP · BMJ PP · NEJM CP · JAMA RCE · Ann Int Med ITC. 1슬롯.

**1-E. Liby Follow-up 슬롯 (2026-05-26 신설, 1건)**

최근 업데이트된 `knowledge/*.md` 주제를 회전 탐색해 **knowledge 엔트리 자체를 보강**하는 후속 논문을 찾는다. 미르가 이미 학습한 주제의 신규 review·guideline·반박 RCT 등을 자연 등장시키는 메커니즘.

#### 후보 풀 추출

```bash
# 최근 14일 내 knowledge/log.md에 기록된 파일들 추출
git log --since="14 days ago" --name-only --pretty=format: -- 'knowledge/*.md' \
  | grep -v '^$' | grep -v 'log.md\|index.md\|scope.md\|MAP.md' \
  | sort -u
```

또는 `knowledge/log.md` 최근 14일 항목에서 파일명 파싱.

#### 회피 규칙

직전 7일 scout 보고서 footer의 `Liby Follow-up: {파일명}` 줄을 읽어 같은 파일 연속 선택 회피. 후보 풀 전체가 회피 대상이면 풀을 30일로 확대.

#### 회전 선택

후보 풀에서 1건 선택 (가장 최근 업데이트 → 가장 오래된 업데이트 순으로 순회, 회피 대상 건너뛰기).

#### 검색 키워드 생성

선택된 파일에서 핵심 주제 키워드 추출 (파일명·첫 H1·section vocabulary 활용). 예:
- `by-disease/acute-bronchitis.md` → "acute bronchitis" + "AFP" + "GRACE score"
- `by-drug/glp1-selection-strategy.md` → "GLP-1 receptor agonist" + "weight loss" + "primary care"

PubMed 쿼리:
```
"{주제 키워드}" AND (review OR guideline OR consensus) 2025[dp]:2026[dp]
```

해당 파일이 이미 인용한 PMID는 사전 제외 (Step 2-B에 위임).

#### Scout 보고서 표기

⭐ 판정 시 footer에 출처 명시:
```
Liby Follow-up: by-disease/acute-bronchitis.md (last update 2026-05-26)
```

**합계**: 1-B 2건 + 1-C 1건 + 1-D 1건 + 1-E 1건 = **5건 목표**. ⭐ 3~5 안전 범위. 발행 부족 영역 있어도 3건 하한 회복 가능.

### Step 2 — 탐색 (Anchor 저널 + 영역 매핑)

Step 1 슬롯별 Anchor 저널 매핑:

| 슬롯 | 저널 |
|---|---|
| 1-B #0 POCUS | J Ultrasound Med · AFP |
| 1-B #1 비암성 만성통증·근골격 | Pain Medicine · AFP |
| 1-B #2 암성통증·완화의료 | J Pain Symptom Manage · AFP |
| 1-B #3 재택의료·노인의학 | J Am Geriatr Soc · Drugs & Aging |
| 1-B #4 만성질환 본체 확장 | Ann Int Med ITC · NEJM Clinical Practice |
| 1-B #5 임상약물학·Deprescribing | Drugs & Aging · BMJ Practice Pointers |
| 1-B #6 생활습관의학 | AFP · JAMA RCE |
| 1-C 횡단 A·B·C | NEJM Clinical Problem-Solving · JAMA Patient Page · AFP |
| 1-D Tier 2 (8일 cycle) | AFP · BMJ PP · NEJM CP · JAMA RCE · Ann Int Med ITC |
| 1-E Liby Follow-up | (주제 영역에 매핑된 저널 사용 — 위 표 참조) |

**검색 쿼리 형식**:
```
"{저널명}"[Journal] AND ({1-A 추출 키워드} OR {default 키워드}) 2025[dp]:2026[dp]
```

**대체 검색 (논문 미발견 시)**:
- 영역 default 키워드 단독 + `primary care review 2024[dp]:2026[dp]`
- review·guideline·textbook 우선 (1차의료 외래 적용성 높음)

**탐색 부하**: 매일 ~5 슬롯 × 1~2 쿼리 = ~7-10 쿼리.

※ 전체 스코프·영역 정의: `knowledge/scope.md` Mir-Tier 1 섹션 참조

### Step 2-B — 중복 PMID 사전 차단 (30일)

Step 3 필터링 직전 적용:
1. `inbox/scout/` 의 **최근 30일 보고서** 모두 스캔 (archive/ 포함 직전 30일 cover)
2. 각 보고서에서 ⭐ 항목으로 등록된 PMID 목록 추출 (정규식: `PMID:\s*\d+`)
3. 이번 run의 후보 논문 중 **위 목록과 일치하는 PMID는 사전 제외** (반응 작성 여부와 무관)
4. 제외된 PMID는 보고서 footer "탐색 메모"에 한 줄 기록 (예: `중복 차단: PMID:41839077 (4-25 등록 후 30일 내)`)

**1-E Liby Follow-up 추가 차단**: 선택된 knowledge 파일이 이미 인용한 PMID도 차단 (해당 파일 grep으로 PMID 추출).

**예외**: 미르가 직전 보고서에서 반응 없이 스킵한(=`___` 유지) PMID도 차단 대상 (재등장 방지). 반응 작성·미작성 상태 모두 차단.

(2026-04-29 "직전 2회 8건 미달 → 자동완화" 폐지 2026-05-26 — rotation 재편으로 3건 하한 안정 확보)

### Step 3 — 필터링
수집한 논문 각각에 대해 아래 기준으로 ⭐/✕ 평가:

| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래·전문의 시험에서 바로 적용 가능한 실용 지식 포함 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 / 배경 지식만 있고 즉각 처방 변화 없음 |

⭐ 항목만 최종 보고에 포함.

### Step 4 — 결과 파일 작성
`inbox/scout/$TODAY.md` 파일 **신규 생성** (Step 0의 KST 날짜 사용):

```markdown
# Scout Report — YYYY-MM-DD

> **답변 게이트 (2026-07-16)**: Deep Extract를 원하는 논문은 `💬 반응:` 뒤 `___` 를 지우고 **한 문장**을 쓰세요. 예측·반박·연결 무엇이든 됩니다 ("우리 클리닉은 이미 안 함", "aOR 0.29? 의외", "다음에 85세 다약제 환자 오면 이걸로"). **한 문장이 곧 ingest 신호** — 반응을 쓴 논문만 정오 12:00 Deep Extract가 처리하고, 그 반응은 study-note에 함께 저장됩니다. 빈칸(`___`)은 처리하지 않습니다.

## ⭐ 주목 논문
### 1. {제목 축약}
- **저널:** {저널명} | **PMID:** {번호}
- **슬롯:** {1-B #N / 1-C / 1-D / 1-E Liby Follow-up}
- **한 줄:** {임상 핵심 1줄}
- **왜 유용:** {1차의료/시험 적용 포인트}
- **💬 반응:** `___`

### 2. ...

*Scout 실행: {실행 시각} | 키워드: {사용한 키워드 목록}*
```

### Step 5 — 아카이브 정리
`inbox/scout/` 에서 오늘 날짜 기준 **7일 초과** 파일을 `inbox/scout/archive/` 로 이동한다.
(archive/ 는 보관 전용 — Deep Extract 대상 아님)

### Step 6 — 완료 보고 (2026-05-26 rotation footer)

scout 보고서 footer에 다음 양식 추가:

```
---
오늘 cover 영역 (1-B): [{영역명1}, {영역명2}] (7일 cycle Day {N})
횡단 모듈: [A/B/C] (3일 cycle)
Tier 2: [{영역}] (8일 cycle Day {N})
Liby Follow-up: {파일경로} (last update YYYY-MM-DD)
PMID 차단: {N}건 (30일)
영역별 발행 부족: [{영역명}, ...] (해당 시만)
```

마지막 줄에 다음 추가:
`> Scout 완료 {실행시각}. ⭐ {N}건 발견. 관심 논문의 💬 반응 칸에 한 문장 쓰면 정오 12:00에 자동 처리됩니다.`

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

# Scout 결과 파일 + archive 이동 결과만 stage (gaps.md 제외 — 2026-05-26)
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
- body: ⭐ 논문 각각의 PMID + 한 줄 요약 + 슬롯 출처 (미르가 모바일에서 제목·본문만 보고도 대략 파악 가능하도록)

#### 7-3. 동작 흐름
- 미르가 GitHub 모바일 앱 PR 알림 확인 → 원탭 머지 → main 반영
- merge 후 💬 반응 작성은 main 의 `inbox/scout/$TODAY.md` 에서 수행 가능
- Deep Extract routine 은 정오 12:00 에 main 기준으로 반응이 채워진 항목 처리 (답변 게이트)

#### 주의
- 브랜치명은 예측 가능한 `claude/scout-YYYY-MM-DD` — 랜덤 suffix 금지
- 재실행 방지는 Step 0 의 "기존 파일 존재 시 종료" 정책이 담당 — Step 7 에 도달하는 시점에는 항상 새 파일
- PR 생성 실패 시 사유 기록 후 종료 (브랜치는 이미 push 됐으므로 미르가 수동으로 PR 생성 가능)
- **gaps.md는 절대 stage 하지 않음** (2026-05-26) — 미르가 Google Drive에서 수동 관리하므로 scout는 읽지도 쓰지도 않는다

---

## 논문 상태 마커 (2026-07-16 답변 게이트로 개편)
Scout 파일 내 각 논문의 상태는 `💬 반응:` 필드로 표시됨:

| 반응 필드 상태 | 의미 |
|------|------|
| `💬 반응:` `___` | 미확인 — 처리 안 함 |
| `💬 반응:` {미르 한 문장} | Deep Extract 신호 (정오 처리 예정) |
| `💬 반응:` {미르 한 문장}  `✅ 반영됨 YYYY-MM-DD` | knowledge/ 반영 완료 (Deep Extract가 태그 부착) |

- **스킵**: 반응을 안 쓰면(=`___` 유지) 자동으로 스킵. 별도 마커 불필요.
- Deep Extract는 반응이 채워졌고 `✅ 반영됨` 태그가 **없는** 논문만 처리한다.

---

## 주의사항
- 논문 내용 재현 금지 (저작권) — 핵심 임상 포인트 + PMID 링크만
- PMID 없는 논문은 DOI 또는 저널+연도+저자 표기
- 탐색 실패 시 (검색 결과 없음): 해당 슬롯 건너뜀, 사유 기록
- **하루 ⭐ 3-5건 목표 (2026-05-26 rotation 재편)** — 하한 3건·상한 5건. push형 daily radar 복귀 + 회전 기반으로 cycle 내 cover 보장.
  - 3건 미만: 1-B Fallback 슬롯에서 대체 키워드(영역 default OR review 단독) 추가 탐색 시도. 그래도 부족하면 footer에 "탐색 부족 사유: ...(저널 신규 발행 부족·공백 영역 적합 논문 부재 등)" 한 줄 기재
  - 5건 초과: 일차의료/시험 적용성·근거 강도 우선순위로 상위 5건만 선정
- **gaps.md 의존 절대 금지** (2026-05-26) — scout는 `inbox/gaps.md`를 읽지도 쓰지도 않는다. 미르가 Google Drive에서 수동 관리 중.
