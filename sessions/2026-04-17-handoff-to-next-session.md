# 2026-04-17 Handoff — 다음 세션으로 (Liby 세션 예정)

> 이 문서는 오늘 세션의 **휘발성 맥락**을 내일 세션으로 넘기기 위한 브리핑.
> 새 세션 시작 시 이 파일을 먼저 읽고 작업하면 맥락이 복원된다.

---

## 오늘 완료된 것 (완전 보존 — commit 됨)

| # | 커밋 | 내용 |
|---|---|---|
| 1 | `eb9513e` | Phase 2 #1 — bundle kind 메타데이터 (disease/drug) |
| 2 | `23c51ea` | Phase 2 #2 — ingest skill kind 분류 규칙 |
| 3 | `11a905b` | Phase 2 #3 — hint 우선순위 분기 + 비만 BMI 계산기 제거 |
| 4 | `433c3a0` | Phase 2 #4 — 📖 임상 가이드 탭 신설 (AI 큐레이션) |
| 5 | `344bccd` | Phase 2 #4 hotfix — 자동실행 + 출처 규칙 강화 |

각각의 상세는 `sessions/2026-04-17-*.md` 5개 파일 참조.

### 실기 검증 (Claude in Chrome)
- 비만 + 위고비 시나리오: 기능 동작 ✓, [출처: FDA] 일부 추출 ✓
- BPPV 시나리오: 기능 동작 ✓, 하지만 모든 bullet `[출처 미확인]` ← 데이터 문제 노출

---

## 🚨 내일 1번 작업 — Liby 힌트 vs 임상 가이드 역할 분리 복원

### 미르의 원래 의도 (오늘 확인)

- **Liby 힌트** = KNOWLEDGE_BUNDLE disease 엔트리의 `treatment + differential` 있는 그대로
- **임상 가이드 (Guide tab)** = 나머지 섹션 (`exam`, `draftAppend` 등)에서 AI가 큐레이션

### 현재 코드 상태 (위 의도와 어긋남)

**`src/app.js:451-452` — Liby 힌트 (현재 맞게 구현됨)**:
```js
if(KNOWLEDGE_BUNDLE[c].treatment)    parts.push("처방/치료:\n"+...);
if(KNOWLEDGE_BUNDLE[c].differential) parts.push("감별진단:\n"+...);
```

**`src/app.js:77-80` — Guide tab handleCuration (4개 섹션 모두 주입 → 중복)**:
```js
if(b.exam)         knowledgeCtx+="["+c+".exam]\n"+b.exam+"\n\n";
if(b.treatment)    knowledgeCtx+="["+c+".treatment]\n"+...   // ← 제거 대상
if(b.differential) knowledgeCtx+="["+c+".differential]\n"+... // ← 제거 대상
if(b.draftAppend)  knowledgeCtx+="["+c+".draftAppend]\n"+...
```

### 수정 방법 (5분 작업)

1. `src/app.js` handleCuration에서 `treatment`, `differential` 라인 제거 (2줄)
2. `src/prompts.js` KNOWLEDGE_CURATION_PROMPT에 분업 문구 추가:
   ```
   💡 Liby 힌트(DraftTab)가 이미 처방·감별진단을 담당. 
   너는 문진·검사(exam)·draft 특이사항(draftAppend) 등 '나머지 지식'에서만 추출.
   treatment/differential 재언급 금지.
   ```
3. Chrome 검증: Guide tab bullet이 exam/draftAppend 내용만 다루는지 확인

### 왜 놓쳤나

Phase 2 #4 Designer 단계에서 "감지된 지식 전부를 AI에 주자"라고 단순 설계. 이전 Phase 2 #3 때 미르와 합의했던 "역할 분리" 맥락을 재검토하지 않음. → Boss 리뷰 결과 별도 참조 (이 파일 하단).

---

## 미해결 아키텍처 질문 2가지

### Q1. 출처 보강 전략 (3-Tier) — 내일 Liby 세션에서 확정

원본 MD 파일에 출처 보강 시 **한 문장 한 문장 다 달면 과잉**. 제안한 3-tier:

| Tier | 위치 | 대상 |
|---|---|---|
| 1 | 파일 상단 `primary_sources` 메타 | 파일 전체 기본 출처 |
| 2 | 섹션 상단 `> 출처: XXX` | 그 섹션의 주 출처 |
| 3 | 문장 끝 inline `[출처: XXX]` | 섹션 기본과 다른 예외·수치·금기 등 임상 결정적 정보 |

**"임상 결정 직접 영향 정보"만 inline 필수**, 교과서적 상식은 생략 OK.

### Q2. 기존 79 엔트리 백필 순서

- **긴급 백필** (원본에 출처 있으나 bundle에서 누락): wegovy, obesity, 위고비, …
- **보강 필요** (원본 자체에 출처 거의 없음): BPPV, 대부분의 disease 엔트리
- **유지 OK** (출처가 TIPS/EXPERT 형식으로 충분): 미르 임상 경험 기반

### 부가 관찰 (내일 고려 or 별건)

1. `detectedCalcs` 바뀌어도 `curationText` state 안 지워짐 → 의사가 재생성 수동 클릭 필요. useEffect에 `detectedCalcs` 의존성 추가 + 변화 시 reset 할지 판단.
2. Triage가 구체 진단명 감지 시 상위 카테고리 생략 (BPPV 감지되면 dizziness 누락) → `dizziness.differential`의 `[AAFP 2017]` 같은 풍부한 출처 input 제외됨.
3. AI가 transcript 내용을 bullet로 만드는 경우 여전히 존재 (프롬프트 위반). 추가 강화 필요할 수도.

---

## 내일 Liby 세션 제안 순서

1. **긴급 수정 (5분)**: Liby 힌트 vs 임상 가이드 역할 분리 복원 (본 문서 상단)
2. **Liby ingest skill 업데이트**: 3-tier 출처 규칙 명시, bundle 컴파일 시 출처 보존 강제
3. **wegovy.md, obesity.md 재ingest**: Tier 1 메타 추가 + 재컴파일
4. **Chrome 재검증**: 출처가 [출처: FDA prescribing info] 등으로 제대로 뜨는지
5. **bundle 백필 범위 결정**: 나머지 77 엔트리 처리 방침 미르 판단
6. **부가 관찰 #1** (curationText 리셋) 수정 여부 판단
7. **handoff-to-next-session.md** 업데이트 or 아카이빙

---

## 🎯 Boss 전략 리뷰 — Designer 맥락 손실 방지 구조

### 사건 요약
Phase 2 #3 Designer 단계에서 "Liby 힌트 = treatment+differential / 나머지 = Guide tab" 역할 분리 합의. 그러나 Phase 2 #4 Designer 단계에서 (`/compact` 이후) 이 합의를 재검토하지 않고 "지식 전부 주자"로 단순 재설계 → 역할 중복 발생.

### CMO (임상 안전)
- **우려**: "의사의 판단을 흐리게 만드는 정보 과잉" 체크리스트 위반. Liby 힌트와 Guide tab에 같은 내용(treatment/differential)이 두 번 나타나 **인지부하 증가 + 빠른 판단 방해**.
- **Prevention**: UI surface별 data ownership이 명문화되어야 "같은 정보가 두 surface에 나타나는지"를 기계적으로 체크 가능.

### CLO (법적 리스크)
- **우려 수준 낮음**: 중복 자체는 법적 문제 아님.
- **잠재 우려**: Guide tab이 "AI 큐레이션"이라는 이름으로 treatment/ddx를 재가공하면, 역할 분리가 모호한 상태에서 "의사 판단 대체 도구"처럼 보일 리스크 약간 상승.
- **Prevention**: 각 UI surface의 법적 역할을 명시적 문서화 (Liby 힌트 = 참고자료 / 임상 가이드 = 환자 맞춤 추출).

### CFO (비용/효율)
- **명확한 위반**: "같은 정보를 여러 패널에서 중복 생성하지 않는가?" 체크리스트 직접 위반.
- **비용 영향**: Guide tab knowledgeCtx에 treatment/ddx 포함 → input token ~40% 증가 → API 비용 증가 + 프롬프트 길이 낭비.
- **유지보수 부담**: 같은 내용이 두 곳에서 동기화 필요.
- **Prevention**: Designer 단계에서 token accounting + data source 중복 체크 필수화.

### CVO (제품 가치)
- **명확한 위반**: "단순히 기능만 늘어난 것은 아닌가?" 체크리스트 직접 위반. 역할 분리 없는 기능 추가는 제품 복잡도만 증가.
- **핵심가치와 어긋남**: "의사의 인지부하 감소" 방향에 역행.
- **Prevention**: 새 기능 추가 시 "기존 기능과 responsibility가 겹치는가?" 필수 질문.

### 종합 판단

**이 실수의 구조적 원인 3가지**:
1. **세션 경계를 넘는 `데이터 소유권 원칙`이 문서화되지 않음** — `rules/panel-contracts.md`는 있으나 data-flow는 없음.
2. **각 세션이 "이전 경계"를 재확인하는 절차 부재** — Designer 단계에서 기존 합의 검색 미실시.
3. **/compact/새 세션 전환 시 architectural constraints 손실** — session 로그는 "무엇을 했나"는 기록하지만 "어떤 경계를 유지해야 하는가"는 부족.

### 권고 (근본 예방책 — 우선순위 순)

**1. `rules/data-flow.md` 신설 (CFO + CMO + CVO 모두 지지)**
```
파일 포맷 예시:
## UI Surface × Data Field 매트릭스

| UI Surface              | exam | treatment | differential | draftAppend | sources |
|-------------------------|------|-----------|--------------|-------------|---------|
| DraftTab Liby 힌트       | ✗    | ✓         | ✓            | ✗           | ✗       |
| GuideTab 임상 가이드     | ✓    | ✗         | ✗            | ✓           | ✓       |
| DraftTab Working Draft  | (ctx)| (ctx)     | ✗            | ✓           | ✗       |
| DraftReview 판단검토    | (ctx)| (ctx)     | (ctx)        | ✗           | ✗       |
```

**원칙**: 한 field는 primary surface 1곳 + context 사용은 여러 곳 OK.

**Designer 계약**: 이 매트릭스를 변경하는 작업은 `data-flow.md` 업데이트가 PR 일부여야 함.

**성공 기준**: 데이터 중복이 0건이어야 하며, 매트릭스의 ✓가 두 행에 있으면 경고.

**2. `agents/designer.md` 업데이트 (모든 Chief 지지)**

Designer가 작업 시작 시 무조건 수행하는 3단계 pre-check 추가:
```
Step 0 — 기존 맥락 재확인 (Designer 절대 생략 금지)

1. `rules/panel-contracts.md` 읽기
2. `rules/data-flow.md` 읽기
3. `sessions/*.md` 중 이번 작업 keyword 검색:
   - grep 키워드: 이번 작업에 등장하는 UI surface 명, data field 명
   - 이전 3-5개 세션의 결정사항 리뷰
4. 기존 경계와 충돌하면 → 미르에게 "기존 X 합의를 변경하시겠습니까?" 질문
5. 충돌 없으면 → Designer 본 작업 진입
```

**성공 기준**: Designer 산출물에 "기존 합의 재확인 완료" 섹션이 있어야 Builder로 진행.

**3. Handoff 문서 제도화 (CVO 지지)**

CLAUDE.md에 추가:
```
### 세션 경계 handoff 규칙
- 세션 마지막에 미해결 아키텍처 결정이 남으면 `sessions/YYYY-MM-DD-handoff-to-next.md` 작성
- 포함: 완료된 것 / 미해결 질문 / 미르 판단 대기 / 다음 세션 제안 순서
- 다음 세션 시작 시 이 파일을 먼저 읽고 작업한다
```

**성공 기준**: /compact 또는 새 세션 전환 시 이 파일이 존재해야 하며, 새 세션 Designer는 이 파일을 읽었다는 증거(해당 미해결 항목 언급)를 산출물에 포함.

**4. 보조 — tacit/ 파일로 불변 원칙 영구화 (낮은 우선순위)**

오늘 언어화된 원칙 중 미래에도 적용될 것들:
- `tacit/passive-load-vs-active-click.md` — "클릭해서 활성화 구조는 passive load 낮음"
- `tacit/data-ownership-by-surface.md` — data-flow.md 요약본

### 결론

- **긴급 필요**: `rules/data-flow.md` 신설 + 즉시 현재 상태 반영 (한 번의 작업으로 영구 방지)
- **중기 필요**: `agents/designer.md`의 Step 0 확장, CLAUDE.md의 handoff 규칙
- **장기 필요**: 각 세션 기록 시 "UI surface × data field" 영향 명시 (세션 템플릿 수정)

**미르 판단 필요**:
1. 위 3가지 권고 모두 수용? 아니면 우선 1번(data-flow.md)만?
2. data-flow.md 첫 작성 시점: 내일 Liby 세션 시작 전? Liby 세션 끝난 후?
3. Designer agent 업데이트는 누가 담당? (Boss 권고대로 하면 Designer-skill 수정 필요)
