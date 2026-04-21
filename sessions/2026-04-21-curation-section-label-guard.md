# sessions/2026-04-21-curation-section-label-guard.md

## 세션 정보
- 날짜: 2026-04-21
- 작업: Guide tab curation — 섹션 라벨 출처 오용 회귀 차단 (`[출처: obesity.notes]` 금지)
- 트리거: 오젬픽 재진 Chrome QA에서 섹션 라벨 출처 3건(obesity.notes ×2, obesity.exam ×1) 발견 → 미르 지시
- 건드린 파일:
  - `src/prompts.js` — KNOWLEDGE_CURATION_PROMPT 지식 근거 규칙에 섹션 라벨 금지 규칙 격상·강화, rule ⑧ "주제 일치 필수" 조건 명시, 출력 예시에 금지 패턴 추가
  - `src/index.html` — cache-bust `prompts.js?v=label-guard`

---

## 원인

기존 curation prompt에 "[키이름.섹션] 형태 출처 금지" 규칙이 출처 표기 섹션 맨 하단에 1줄로 있었음. LLM이 다음 상황에서 위반:
- 섹션 content에 대한 정확한 출처가 섹션.sources[]에 없음
- primarySources에 여러 논문이 있지만 bullet 주제와 딱 맞는 것 없음
- → LLM이 creative fallback으로 "섹션 라벨"을 출처처럼 복사

rule ⑧의 "가장 부합하는 항목 1개" 표현이 모호해 LLM이 "부조화 매핑"도 허용된다고 해석하는 백도어도 있었음.

## 수정 내역

### `src/prompts.js` KNOWLEDGE_CURATION_PROMPT

1. **지식 근거 규칙 블록 (최상단 "절대 준수")에 섹션 라벨 금지 격상**:
   ```
   - 섹션 라벨 출처 금지 (절대) — [출처: obesity.notes]·[출처: heart-failure.exam]·[출처: wegovy.protocol] 같이 "[키.섹션]" 형태를 출처로 쓰는 것은 금지.
     이는 자료 분류 이름이지 실제 출처가 아니다. 섹션 라벨을 출처로 넣는 것은 할루시네이션으로 간주한다.
     섹션 sources[]·primarySources에 등록된 실제 출처 문자열만 사용한다.
   ```

2. **rule ⑧ 구체화 (주제 일치 필수 + 부조화 시 drop)**:
   - "가장 부합하는 항목 1개" → "bullet 내용이 해당 [sources] 항목의 주제(subject-matter)와 **실제로 일치할 때만**"
   - "같은 섹션에 있으니 가장 가까운 출처 아무거나 방식 금지 — 주제 부조화 시 bullet drop"
   - 좋은 예 + 나쁜 예 대조 예시 명시 (adaptive thermogenesis + Mayo Clinic 비만 표현형 논문 부조화 케이스)

3. **출력 예시에 절대 금지 섹션 추가**:
   ```
   절대 금지 (섹션 라벨 복사):
   ● adaptive thermogenesis로 렙틴↓ 그렐린↑ [출처: obesity.notes]
   ● GLP-1 follow-up 4파트 체크 [출처: obesity.exam]
   → 이런 내용은 원문에 실제 출처가 없으면 bullet 자체를 출력하지 말 것.
   ```

### `src/index.html`
- `prompts.js?v=label-guard` cache-bust

## Chrome QA

**시나리오**: 오젬픽 재진 (동일 transcript로 수정 전후 대조)

| 지표 | 수정 전 | 수정 후 |
|---|---|---|
| `[출처: xxx.section]` | 3건 | **0건** ✓ |
| `[출처 미확인]` | 0건 | 0건 ✓ |
| 실제 출처 태깅 | 2건 | **4건 전부** |

### 수정 후 출력 (4 bullet)
1. 급여 기준 재확인 [출처: 건강보험심사평가원 2024.02 고시]
2. 오젬픽=위고비 성분 동일 [출처: 건강보험심사평가원 2024.02 고시]
3. GLP-1 follow-up 4파트 체크 [출처: 건강보험심사평가원 2024.02 고시]
4. 단백질 1.2-1.5g + ABC 순서 [출처: Noronha JC et al. Obes Pillars 2025;17:100234. PMID:41322078]

## 결과
- 판정: **통과** (1차 목표 섹션 라벨 0건 달성)
- 잔존 이슈: bullet 2·3에서 "주제 부조화 매핑"(심평원 고시가 오젬픽 성분·GLP-1 follow-up 체크리스트 주제와 실제로는 불일치) — rule ⑧ 주제 일치 조건이 LLM에 약하게 작동. bundle의 `sections[].sources[]` 명시적 보강(Phase 5b)으로 해소 가능한 영역.
- forbidden.md 준수: 국소 prompt 수정 + index.html cache-bust만

## 다음 작업 후보
- Phase 5b md 출처 보강 진행 시 bundle의 sections[].sources[]에 실제 섹션 콘텐츠에 해당하는 출처 1:1 매핑 (예: obesity.notes = ["Adaptive Thermogenesis 환자 교육용 TIPS"] 명시)
- TIPS 카테고리 공식화 — 섹션 본문 또는 sources[]에 "[TIPS — 임상 경험]" 마커 있으면 [출처: TIPS — 임상 경험] 태깅 허용 (미르 tacit "근거 불확실성 숨기지 않기" 원칙과 부합)

## 회고

### 예상과 달랐던 점
- 섹션 라벨 금지 규칙이 **하단 1줄**로만 있었던 게 실제 LLM 순응도에 영향이 컸음. 최상단 "절대 준수" 블록으로 격상 + 부정 예시 명시 후 즉각 0건 달성.
- rule ⑧의 "주제 일치" 조건은 글로 강화해도 LLM이 완전 준수하지 않음. **prompt만으로 해결 불가한 영역**은 bundle 데이터 품질(sources[] 1:1 매핑)로 넘어가야 함.

### 다음 세션 반영
- prompt 변경 검증은 반드시 Chrome MCP 실기로. Node.js 시뮬레이션은 데이터 흐름 검증만 가능하고 LLM 순응도는 실기로만 확인됨.

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — curation 핵심 규칙. Phase 5b·Liby ingest 때 섹션 라벨 금지 원칙 전제
2. routine/trigger/CI 영향? **YES** — main 기준 curation 동작
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
