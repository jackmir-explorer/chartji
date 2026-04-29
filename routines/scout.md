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

### Step 1 — 슬롯 할당 (2026-04-29 Mir-Tier 1 재편 / 4-29 patch는 흡수·DEPRECATED)

> 본 routine은 미르의 임상 핵심영역(Mir-Tier 1)에 정렬된다.
> source of truth: `~/.claude/projects/.../memory/user_clinical_focus.md` + `knowledge/scope.md` Mir-Tier 1 섹션.
> 4-29 다양성 패치(영역 cap·0순위 풀)는 본 재편으로 흡수 — DEPRECATED, 아래 1-A~1-D로 대체.

**1-A. 영역 내부 세부 키워드 추출 (영역간 cap 폐기)**

`knowledge/log.md` 마지막 30개 항목 → Mir-Tier 1 7영역 각각의 빈도 TOP 1 세부 키워드 추출.

영역간 cap은 **폐기** (1-B Mir-Tier 1 슬롯 분배가 자동 보장). 1-A는 영역 **내부** 세부 키워드 도구로만 사용:

```
출력 형식 (7줄):
POCUS·초음파 중재: {세부 키워드}
비암성 만성통증·근골격: {세부 키워드}
암성통증·완화의료: {세부 키워드}
재택의료·노인의학: {세부 키워드}
만성질환 본체 확장: {세부 키워드}
임상약물학·Deprescribing: {세부 키워드}
생활습관의학: {세부 키워드}
```

해당 영역 log.md 항목이 없으면 영역 default 키워드 사용 (`knowledge/scope.md` Mir-Tier 1 표 "세부 키워드" 컬럼 참조).

**1-B. Mir-Tier 1 슬롯 할당 (매일 7건 의무)**

매일 7영역 × 1슬롯 = 7건 의무 cover:

| # | 영역 | 검색 키워드 (default) | Anchor 저널 |
|---|---|---|---|
| 1 | POCUS·초음파 중재 | `POCUS OR ultrasound-guided` | J Ultrasound Med · AFP |
| 2 | 비암성 만성통증·근골격 | `chronic non-cancer pain OR neuropathic pain` | Pain Medicine · AFP |
| 3 | 암성통증·완화의료 | `palliative care OR cancer pain` | J Pain Symptom Manage · AFP |
| 4 | 재택의료·노인의학 | `home-based care OR frailty` | J Am Geriatr Soc · Drugs & Aging |
| 5 | 만성질환 본체 확장 | `multimorbidity OR chronic disease management` | Ann Int Med ITC · NEJM Clinical Practice |
| 6 | 임상약물학·Deprescribing | `deprescribing OR drug interaction OR opioid stewardship` | Drugs & Aging · BMJ Practice Pointers |
| 7 | 생활습관의학 | `lifestyle medicine OR exercise prescription` | AFP · JAMA RCE |

각 슬롯 검색 키워드 = 1-A 추출 키워드 + default 키워드 OR 조합.

**Fallback**: 특정 영역에서 후보가 없거나 모두 ✕ 판정이면 슬롯 비우고 footer에 `{영역} 발행 부족` 기록 + 1-D Tier 2로 자동 이전(추가 1건).

**1-C. 횡단 모듈 슬롯 (3일 cycle)**

`day = (UNIX day epoch) % 3`:
- `0` → **A. 통증·완화·노인 정신건강** (`chronic pain depression OR palliative adjustment disorder OR geriatric depression`)
- `1` → **B. Communication & Counseling** (`motivational interviewing OR breaking bad news OR shared decision making`)
- `2` → **C. Diagnostic Reasoning** (`clinical problem solving OR diagnostic reasoning OR clinical pearls`)

Anchor 저널: NEJM Clinical Problem-Solving · JAMA Patient Page · AFP. 1슬롯.

**1-D. Tier 2 라운드로빈 (8일 cycle)**

`day = (UNIX day epoch) % 8`:

| Day % 8 | 영역 | 검색 키워드 |
|---|---|---|
| 0 | 호흡기 | `respiratory primary care` (4-24~28 보강 — 추가 시 빈도 낮춤) |
| 1 | 소화기 | `gastroenterology primary care` |
| 2 | 이비인후과 | `otolaryngology primary care` |
| 3 | 내분비외 만성질환 | `endocrinology primary care` |
| 4 | 비뇨·부인 기본 | `urology OR gynecology primary care OR menopause OR abnormal uterine bleeding` |
| 5 | 예방접종·건강검진 | `adult vaccination OR cancer screening primary care` |
| 6 | **외래응급** | `anaphylaxis OR hypoglycemia OR arrhythmia initial OR seizure OR laceration repair OR burn first aid primary care` |
| 7 | 심혈관·신경 | `cardiology OR neurology primary care OR headache OR dementia OR stroke prevention` |

직전 7일 scout 보고서 footer "Tier 2: [{영역}]" 회피해 cycling 보장. Anchor 저널: AFP · BMJ PP · NEJM CP · JAMA RCE · Ann Int Med ITC. 1슬롯.

**합계**: 1-B 7건 (의무) + 1-C 1건 + 1-D 1건 = **9건**. ⭐ 8~10 목표 안전 범위.

---

### (이전 4-29 patch 1-A·1-B는 본 재편으로 흡수)

기존 0순위 풀(피부·두통·갱년기·불면) 매핑:
- 피부과 → Tier 2 (1-D Day%8 별도 슬롯 없음, Anchor 저널·횡단 A에서 자연 등장)
- 두통 → Mir-T1 부속 A (1-C) + Tier 2 day=7 (심혈관·신경)
- 갱년기·월경이상 → Tier 2 day=4 (비뇨·부인 기본)
- 불면·수면 → Mir-T1 7) 생활습관 (1-B #7) + 부속 A (1-C, 노인 수면)

상세 매핑은 `knowledge/scope.md` "기존 0순위 풀 → Mir 매핑" 표 참조.

---

### (이하 deprecated 1-B 라운드로빈 풀 정의는 4-29 patch 기록 보존용 — 본 routine 동작에서는 사용 안 함)

`knowledge/scope.md` Tier 1~3 미터치/공백 영역에서 **라운드로빈 1개 분야 선택** (랜덤 아님 — 직전 7일 scout 파일에서 사용된 분야는 풀에서 제외해 cycling).

**공백 풀 (2026-04-29 갱신, 우선순위 순)**:

| 우선순위 | 분야 | 사유 |
|---|---|---|
| **🔴 0순위 미터치** | **피부과** | 4-22~29 ⭐ 0건 — Tier 2 외래 빈발인데 한 번도 ⭐ 안 됨 |
| **🔴 0순위 미터치** | **두통/신경과** | 4-22~29 ⭐ 1건(소아 뇌진탕만) — 편두통·긴장성·CCH·치매·뇌졸중 모두 공백 |
| **🔴 0순위 미터치** | **갱년기·월경이상** | 4-22~29 ⭐ 1건(성호르몬 VTE만) — 부인과 본체 공백 |
| **🔴 0순위 미터치** | **불면·수면** | 4-22~29 ⭐ 0건 — Tier 2 정신건강 + 생활습관 |
| 🟡 보강 진행 | 생활습관 의학 | 운동·수면·스트레스·식이·절주 — 금연 외 전무 |
| 🟡 보강 진행 | 근골격·통증 | 만성요통·손목굴 시작 — 두통 외 관절통·통풍·신경병증 |
| 🟡 보강 진행 | 건강검진 | FIT만 — 유방·자궁·간·갑상선·전립선 등 |
| 🟡 보강 진행 | 갑상선·골다공증 | 내분비 본체 공백 |
| 🟡 보강 진행 | 고혈압 본체 | resistant-HTN만 — 1차 처방·타깃 등 |
| 🟡 보강 진행 | 이상지질혈증 본체 | 당뇨 동반만 — 일반 statin·non-statin 선택 |
| 🟡 보강 진행 | 비뇨의학 본체 | 전립선·배뇨장애·성기능 |
| 🟢 보강됨 | 호흡기 | 4-24~28 활발 — 다음 cycle에서 빈도 낮춤 |
| 🟢 보강됨 | 소화기 | 4-29 IBS·기능성 소화불량 추가 — 다음 cycle 빈도 낮춤 |
| 🟢 보강됨 | 노인의학 | frailty·DOAC·deprescribing — 보강됨 |

**선택 알고리즘**:
1. 🔴 0순위 미터치 4영역(피부·두통·갱년기·불면) **우선 cycling** — 4일에 한 번씩 라운드로빈
2. 4영역 모두 1회 이상 cycling 후 → 🟡 보강 진행 영역으로 이동
3. 직전 7일 scout 보고서의 "공백채우기" 메모를 읽어 같은 분야 재선택 회피

**Tier 3 랜덤 탐색(Step 2 Tier 3)과는 별도** — 합쳐 2개 탐색 방향.

**목적**: scope.md Tier 2 미터치 영역이 자기강화 loop로 영구 공백화되는 것을 차단 (2026-04-29 다양성 검증 결과).

### Step 2 — 탐색 (Anchor 저널 + 영역 매핑 — 4-29 재편)

기존 3-Tier 구조(Tier 1 Anchor 저널 / Tier 2 귀납 / Tier 3 랜덤) 폐기. 새 구조: **Step 1 슬롯별 Anchor 저널 매핑**.

**Anchor 저널 영역 매핑** (Step 1 슬롯별 우선 검색 저널):

| 슬롯 | 저널 |
|---|---|
| 1-B #1 POCUS | J Ultrasound Med · AFP |
| 1-B #2 비암성 만성통증·근골격 | Pain Medicine · AFP |
| 1-B #3 암성통증·완화의료 | J Pain Symptom Manage · AFP |
| 1-B #4 재택의료·노인의학 | J Am Geriatr Soc · Drugs & Aging |
| 1-B #5 만성질환 본체 확장 | Ann Int Med ITC · NEJM Clinical Practice |
| 1-B #6 임상약물학·Deprescribing | Drugs & Aging · BMJ Practice Pointers |
| 1-B #7 생활습관의학 | AFP · JAMA RCE |
| 1-C 횡단 A·B·C | NEJM Clinical Problem-Solving · JAMA Patient Page · AFP |
| 1-D Tier 2 (8일 cycle) | AFP · BMJ PP · NEJM CP · JAMA RCE · Ann Int Med ITC |

**검색 쿼리 형식**:
```
"{저널명}"[Journal] AND ({1-A 추출 키워드} OR {default 키워드}) 2025[dp]:2026[dp]
```

**대체 검색 (논문 미발견 시)**:
- 영역 default 키워드 단독 + `primary care review 2024[dp]:2026[dp]`
- review·guideline·textbook 우선 (1차의료 외래 적용성 높음)

**탐색 부하**: 매일 평균 7저널 × 1~2 쿼리 = ~10 쿼리. 기존 5 anchor + Tier 2 + Tier 3 ≈ 7 쿼리와 비슷한 규모.

※ 전체 스코프·영역 정의: `knowledge/scope.md` Mir-Tier 1 섹션 참조

### Step 2-B — 중복 PMID 사전 차단 (2026-04-29 재편 — 30일 + 자동 완화)

Step 3 필터링 직전 적용:
1. `inbox/scout/` 의 **최근 30일 보고서** 모두 스캔 (archive/ 제외 + archive/ 포함 직전 30일 cover)
2. 각 보고서에서 ⭐ 항목으로 등록된 PMID 목록 추출 (정규식: `PMID:\s*\d+`)
3. 이번 run의 후보 논문 중 **위 목록과 일치하는 PMID는 사전 제외** ([o] 체크 여부와 무관)
4. 제외된 PMID는 보고서 footer "탐색 메모"에 한 줄 기록 (예: `중복 차단: PMID:41839077 (4-25 등록 후 30일 내)`)

**자동 완화 fallback (4-29 재편)**:
- 직전 2회 run에서 ⭐ 8건 미달이 연속이면 → 차단 기간 **30일 → 14일**로 자동 완화
- 14일 완화 후에도 8건 미달이면 → **14일 → 7일**로 추가 완화
- 8건 이상으로 회복되면 다음 run에서 자동 30일로 복귀
- 완화·복귀 모두 footer에 한 줄 기록 (예: `PMID 차단 완화 발동: 30→14일 (직전 2회 8건 미달)`)

**예외**: 미르가 직전 보고서에서 [x] 처리해 명시적으로 스킵한 PMID는 차단 대상 (기존 동작 유지). [ ] 미확인 상태도 차단 (재등장으로 알림 효과 보다 탐색 슬롯 낭비가 더 큼 — 2026-04-29 분석).

배경: 4-25↔4-26 같은 PMID(수막염·크루프·B형간염·DOAC·FIT) 5건 중복 ⭐ 등장으로 탐색 슬롯 ~6개 낭비 사례. Mir-Tier 1 7영역 매일 cover 의무로 차단 기간 확장(7→30일) 필요. 발행 부족 영역(POCUS·재택)에서 ⭐ 미달 시 자동 완화.

### Step 3 — 필터링
수집한 논문 각각에 대해 아래 기준으로 ⭐/✕ 평가:

| 등급 | 기준 |
|------|------|
| ⭐ | 1차의료 외래에서 바로 적용 가능한 실용 지식 포함 |
| ✕ | 전문과 수술·처치 중심, 일차의료 적용 어려움 / 배경 지식만 있고 즉각 처방 변화 없음 |

⭐ 항목만 최종 보고에 포함 (✕는 제외). 2026-04-24 △ 제거 — Deep Extract 대상이 아니므로 실효 없음.

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

*Scout 실행: {실행 시각} | 키워드: {사용한 키워드 목록}*
```

### Step 5 — 아카이브 정리
`inbox/scout/` 에서 오늘 날짜 기준 **7일 초과** 파일을 `inbox/scout/archive/` 로 이동한다.
(archive/ 는 보관 전용 — Deep Extract 대상 아님)

### Step 6 — 완료 보고 (4-29 재편 — Mir-Tier 1 cover footer 추가)

scout 보고서 footer에 다음 양식 추가:

```
---
Mir-Tier 1 cover: POCUS [✓/✕] · 통증 [✓/✕] · 완화 [✓/✕] · 재택 [✓/✕] · 만성질환 [✓/✕] · 약물 [✓/✕] · 생활습관 [✓/✕]
횡단 모듈: [A/B/C] (오늘 cycle)
Tier 2: [{오늘 영역}] (8일 cycle Day {N})
PMID 차단: {N}건 (기간 {30/14/7}일 — {30일 기본 / 완화 발동 사유})
영역별 발행 부족: [{영역명}, ...] (해당 시만)
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
- **하루 ⭐ 8~10건 목표 (2026-04-29 미르 지시)** — 하한 8건·상한 10건. Deep Extract 10건 상한과 동조.
  - 8건 미만: Tier 2 귀납 키워드/공백 풀에서 추가 탐색 시도. 그래도 부족하면 Tier 3 랜덤 1건 추가. 이래도 8건 미만이면 보고서 footer에 "탐색 부족 사유: ...(저널 신규 발행 부족·공백 영역 적합 논문 부재 등)" 한 줄 기재
  - 10건 초과: 일차의료 적용성·근거 강도 우선순위로 상위 10건만 선정, 나머지는 다음 run의 후보로 유지(자동 carryover 아님 — 다음 run의 일반 탐색에서 자연 등장 가능)
