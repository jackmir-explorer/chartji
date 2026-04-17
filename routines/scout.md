# Routine: Scout (Daily PubMed Radar)

## 실행 주기
매일 오전 6:00 자동 실행
→ 미르가 오전 중 핸드폰으로 확인, [o] 체크 (Deep Extract 대상으로 선택)
→ Deep Extract Routine이 정오 12:00에 [o] 항목 처리

## 목적
일차의료 외래 의사에게 유용한 최신 논문을 자동 탐색해
`inbox/scout/YYYY-MM-DD.md` 에 저장한다.
미르가 ⭐ 항목을 선택하면 Deep Extract Routine이 정식 ingest한다.

---

## 실행 절차

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
`inbox/scout/YYYY-MM-DD.md` 파일 생성:

```markdown
# Scout Report — YYYY-MM-DD

## ⭐ 주목 논문
### 1. {제목 축약}
- **저널:** {저널명} | **PMID:** {번호}
- **한 줄:** {임상 핵심 1줄}
- **왜 유용:** {1차의료 적용 포인트}
- **Deep Extract:** [ ] ← 원하면 [x]로 변경 → 정오 12시에 자동 처리

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
`> Scout 완료 {실행시각}. ⭐ {N}건 발견. 원하는 항목 [ ] → [x] 체크 시 정오 12:00에 자동 처리됩니다.`

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
