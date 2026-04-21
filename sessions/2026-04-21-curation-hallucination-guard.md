# sessions/2026-04-21-curation-hallucination-guard.md

## 세션 정보
- 날짜: 2026-04-21
- 작업: Guide tab curation 할루시네이션 백도어 차단 — LLM 자의 [출처 미확인] 태깅 금지
- 트리거: 미르 지적 — "출처 없는 정보를 [출처 미확인]으로 표시한 건 정상이 아니다. 진료실에서 근거 유무는 매우 중요하고, Guide tab은 ingest된 검증 지식만 보여주는 도구다. 그럴듯한 bullet에 [출처 미확인] 태그 붙이면 할루시네이션 여지."
- 건드린 파일:
  - `src/prompts.js` — KNOWLEDGE_CURATION_PROMPT 규칙 ⑥⑦ 재정의 + 근거 규칙 강화 + 출력 예시에서 [출처 미확인] bullet 삭제 + bullet 개수 재량 "3개 미만 허용" 추가
  - `src/index.html` — prompts.js cache-bust (`?v=curation-guard`)
  - tacit memory 1건 추가 (`tacit/guide-tab-no-hallucination.md`)

---

## 원인

KNOWLEDGE_CURATION_PROMPT 규칙 ⑦이 할루시네이션 백도어:

> ⑦ 위 어디에도 해당 안 되면 → [출처 미확인]

LLM은 bundle 원문에 없는 "일반 의학 상식"·"class effect"·"임상 통념"을 bullet로 만들고 [출처 미확인] 태그를 붙여 통과시킬 수 있었다. 의사 입장에서는 bullet 본문만 보면 ingest된 검증 지식인지 LLM 할루시네이션인지 구분 불가.

기존 tacit `evidence-transparency.md`("근거 불확실성 숨기지 않기")는 **원본 md 작성 시 미르가 의도적으로 [출처 미확인] 태그를 단 경우**를 수용하는 원칙. LLM이 자의로 [출처 미확인] 태그를 생성하는 건 완전히 다른 이슈.

## 실증

오젬픽 재진 시나리오 (3개월 경과 관찰, HbA1c 7.2→6.5, 체중 4kg 감량).

### 수정 전 (6 bullet · 3 출처 · 3 미확인)
- HbA1c 급여 재검토 [출처: 심평원]
- BMI 30 경계 급여 재평가 [출처: 심평원]
- **3개월 HbA1c 0.7% 감소·체중 4kg 감량 양호한 반응** [출처 미확인] ← bundle 근거 없음
- **위장관 부작용 일반적·시간 경과 호전** [출처 미확인] ← class effect 상식
- 급여 기준 변경 가능 [출처: 심평원]
- **장기 관리 계획 수립 필요** [출처 미확인] ← 일반 원칙

### 수정 후 (5 bullet · 5 출처 · 0 미확인)
- 급여 3조건 재평가 [출처: 심평원 2024.02 고시]
- 렙틴/그렐린 식욕 변화 [출처: Acosta A et al. Mayo Clinic 2021]
- 단백질 1.2-1.5g/kg [출처: Noronha JC et al. Obes Pillars 2025]
- 적응성 열발생 [출처: Acosta A et al. Mayo Clinic]
- ABC 식사 순서 [출처: Sun L et al. Clin Nutr 2019]

근거 없는 3 bullet drop → obesity parent 엔트리의 실제 PMID 논문 근거 bullet 4건이 승격. parent expansion의 실질적 값어치 확인.

---

## 수정 내역

### `src/prompts.js`

**지식 근거 규칙 강화** (최우선 블록):
- "Guide tab은 **검증해서 ingest한 지식만** 큐레이션하는 도구" 명시
- "원문에 없는 '상식'·'class effect'·'일반 통념' bullet 금지" 추가
- "출처 매핑 불가하면 bullet drop" 명시

**규칙 ⑥ 재정의**:
- 기존: "[출처 미확인] 태그가 원문에 있으면 → [출처 미확인]"
- 신규: "원문에 [출처 미확인] 태그가 **명시적으로** 있으면 → [출처 미확인] (미르가 의도적으로 붙인 불확실성 표시만 보존)"

**규칙 ⑦ 재정의**:
- 기존: "위 어디에도 해당 안 되면 → [출처 미확인]"
- 신규: "위 어디에도 해당 안 되면 → **해당 bullet을 출력하지 않는다**. LLM이 자의로 [출처 미확인] 태그를 생성해 내보내는 것은 금지 (할루시네이션 여지)."

**출력 형식**:
- "bullet 3~8 재량" → "매핑 가능한 bullet 3 미만이면 3 미만 허용, 0개면 빈 출력 허용" (억지로 채우지 말 것)

**출력 예시**: [출처 미확인] bullet 삭제

### `src/index.html`
- `prompts.js?v=curation-guard` cache-bust

### Memory
- `tacit/guide-tab-no-hallucination.md` 신규 저장
- `MEMORY.md` 인덱스 업데이트
- 기존 `tacit/evidence-transparency.md`는 **원본 md 작성 시 태그 수용**에 한정되는 것으로 스코프 명확화 (본 tacit과 상호 보완)

---

## 결과
- 판정: **통과**
- 검증 시나리오: 오젬픽 재진 — [출처 미확인] 0건, 실PMID 출처 4건 등장, 심평원 고시 1건 태깅
- forbidden.md 준수: 국소 수정(prompts.js + index.html), 전체 재작성 금지, 패널 침범 없음

## 회고

### 내 실수
1차 답변에서 "[출처 미확인] 태깅은 미르 tacit 원칙과 부합하니 정상"이라고 판단. 두 tacit의 스코프를 혼동했음:
- `evidence-transparency`: **원본 md 작성 시 미르 주도 태깅** 수용 (유효)
- `guide-tab-no-hallucination`: **LLM curation 자의 태깅** 금지 (신규)

진료실 신뢰도 관점에서 LLM 자의 태깅은 임상 판단 왜곡 위험이므로 차단해야 함. Boss 수준 리뷰 없이 tacit만 보고 "정상"이라 판단한 것이 오판.

### 다음 세션 반영
- curation 관련 변경은 Chrome 실기 검증 전에 "의사가 이 bullet을 환자 앞에서 신뢰하고 쓸 수 있는가?" 기준으로 판단
- tacit knowledge는 "어떤 상황에 해당하는지" scope까지 포함해서 조회
- bundle 근거 없는 그럴듯한 bullet은 없느니만 못함 — LLM이 빈 bullet 출력하는 것이 낫다

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — curation prompt 근본 규칙 변경. 후속 Phase 5b(md 출처 보강) 때도 이 원칙 전제
2. routine/trigger/CI 영향? **YES** — main 기준 curation 동작 변경
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
