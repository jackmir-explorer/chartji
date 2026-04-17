# skills/protocol-deep-dive/SKILL.md — Protocol Deep Dive

리뷰 논문·초록 수준을 넘어서 **구체적 implementation details** (용법, 모니터링, 부작용, 의뢰 기준 등)을 추적 수집하는 심층 조사 스킬.

## 언제 사용하는가

다음 중 하나라도 해당 시:
- Scout/Deep Extract 결과물의 초록·리뷰 한계가 드러남 ("4배 증량" 같은 원칙만 있고 구체 용법 없음)
- 특정 질환·약물의 **실제 외래 처방 프로토콜**이 필요
- 미르가 "○○ 프로토콜 deep dive 해줘" 요청
- 기존 knowledge 파일에 `[초록 기반 — 전문 미확인]` 플래그가 있어 보강 필요

단순 지식 업데이트에는 사용하지 않는다. 그건 Scout + Deep Extract 루틴으로 충분.

## 언제 사용하지 않는가

- 한 번에 여러 주제를 몰아서 처리 (각 주제는 별도 실행)
- 초록만으로 충분히 구체적인 메타분석·RCT 결과 (숫자가 이미 초록에 있음)
- 병태생리·기전 질문 (이건 교과서·리뷰가 적합)

---

## 실행 절차

### Step 1 — 원본 가이드라인 / primary source 식별

먼저 리뷰 논문의 참조 가이드라인을 특정한다.

- 리뷰 논문 초록 + 본문 참고문헌 스캔 (WebFetch 또는 PubMed search)
- 국제 학회 가이드라인 이름 발견 (예: EAACI, ACC/AHA, KDIGO, NICE)
- 해당 가이드라인의 PubMed 원문 PMID 확보

검색 쿼리 예:
- `"{Society} {topic} guideline"` with year range
- `"{topic}" "practice guideline" AND English[lang]`

### Step 2 — Full text 접근 경로 탐색

우선순위 순으로 시도:

1. **PubMed MCP `get_article_metadata`** → `identifiers.pmc` 필드 확인
   - PMC ID 있음 → `get_full_text_article` 사용 (open access 확실)
2. **`convert_article_ids`** 로 PMID → PMC 변환 시도
3. **WebFetch for publisher site** — 무료 공개 저널이면 가능
   - AFP (aafp.org), Frontiers (frontiersin.org), MDPI, PLOS, BMC 등
4. **DOI 링크 직접 접근** — 일부 유료 저널도 초록+주요 표 공개
5. **관련 open-access 2차 자료** — 동일 주제의 primary care review, Frontiers 계열

모두 실패 시 원본 가이드라인 초록 + 2차 리뷰 종합으로 대체 (품질 저하 명시).

### Step 3 — 구체 정보 추출

full text를 확보하면 다음 항목을 의도적으로 추적:

**처방 프로토콜**
- 약물명 + 표준 용량 (brand name 포함 가능)
- 증량 schedule (언제, 얼마나, 간격)
- 최대 용량
- 용법 (bid/tid, 경구/주사)

**모니터링**
- 시점별 재평가 타이밍 (2주/4주/6주)
- 구체적 검사 항목 (CBC, CRP, TSH 등)
- 사용 가능한 객관적 도구 (activity score 등)

**부작용·안전**
- 단기 vs 장기 부작용
- 모니터링 요구 (BP, K+, 신기능 등)
- 특수 인구 주의 (임신, 노인, 신기능 저하 등)

**의뢰/Escalation 기준**
- 언제 전문의 의뢰
- 어떤 상황에서 약물 전환 vs 증량 vs 병용
- 응급 의뢰 사유

**NOT Recommended**
- 가이드라인이 명시적으로 비권고한 치료
- 근거 수준 낮은 요법
- 흔한 실수 (예: 장기 스테로이드)

### Step 4 — Knowledge 파일 작성 / 보강

대상 파일 결정:
- **기존 파일 확장**: `knowledge/by-disease/{disease}.md` 이미 존재 → 해당 파일에 상세 프로토콜 섹션 추가
- **신규 파일**: `knowledge/by-protocol/{protocol-name}.md` — 질환 간 cross-cut 프로토콜일 때

형식:
- 표 기반 (약물 ↔ 용량 매핑, 단계별 처방 등)
- 출처 **모든 PMID + DOI 링크** 포함
- 무료 full text 접근 가능했는지 명시 (`PMC{id} (open access)`)
- 초록만 참조했는지 full text까지 확인했는지 구분 표기

### Step 5 — log.md 기록

`knowledge/log.md`에 항목 추가:

```
YYYY-MM-DD | by-disease/{disease}.md | Protocol Deep Dive — {요점 한 줄} [CLINICAL] — {PMID 1차 출처} + PMC{id} full text
```

### Step 6 — 커밋 & PR (원격 환경에서 실행 시)

deep-extract 루틴과 동일 — branch 생성 + PR 생성. 로컬 세션에서 실행 시 직접 main에 commit 가능.

---

## 요청 방법

### 데스크톱 (Claude Code 세션)

미르가 직접 Claude에게 요청:
> "urticaria 4배 증량 프로토콜 deep dive 해줘"
> "저항성 고혈압 spironolactone 초기 용량 프로토콜 deep dive"

Claude는 이 스킬 절차를 따라 작업.

### 모바일 (GitHub 앱) — 현재 미구현

향후 필요 시 `inbox/deep-dive/queue.md` 파일 기반 큐 시스템 구축. 미르가 한 줄 append 하면 scheduled routine이 처리.

**구축 시점 판단**: 모바일 요청 필요성이 3~5회 누적되면 인프라 구축. 그 전까지는 데스크톱 요청만으로 충분.

---

## 품질 기준

### ✓ 좋은 Protocol Deep Dive 출력

- 약물별 구체 용량 표 있음
- 시점별 재평가 타이밍 명시 (예: "2~4주 후")
- 모니터링 검사 구체 명시 (예: "CBC, CRP, TSH")
- 특수 인구(임신·수유·소아) 별도 섹션
- 의뢰 기준 명시
- NOT Recommended 섹션 있음
- 모든 출처에 PMID + DOI 링크
- Open access full text 활용 여부 명시

### ✗ 나쁜 출력

- "4배 증량까지 사용" 수준의 원칙만 나열 → 초록과 동일, deep dive 실패
- 출처 불명확
- "가이드라인에 따르면" 반복하며 어느 가이드라인인지 불명
- 한국 일차의료 적용성 미고려 (모든 약물이 한국에 유통되는지 등)

---

## 주의사항

- **저작권**: 본문 발췌 최대 1건, 15단어 미만, 인용부호 사용
- **긴 요약 금지**: 30단어 초과 displacive 요약 금지 — 표·목록으로 재구성
- **환각 방지**: 모든 구체 수치는 full text 또는 초록에서 확인된 것만. 확인 불가면 "[확인 필요]" 플래그
- **Korean practice fit**: 한국에서 유통되는 약물·제품명 병기 (예: Cetirizine → 지르텍)
- **PubMed 귀속 필수**: "Based on articles retrieved from PubMed" + 모든 DOI 링크 포함

---

## 참고 — 이미 수행된 Deep Dive

| 날짜 | 주제 | 파일 | 출처 |
|------|------|------|------|
| 2026-04-17 | 만성 두드러기 4배 증량 프로토콜 | knowledge/by-disease/urticaria.md | PMID:34536239 + PMC9533216 + PMC9300824 |
