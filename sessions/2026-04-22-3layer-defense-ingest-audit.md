# sessions/2026-04-22-3layer-defense-ingest-audit.md

## 세션 정보
- 날짜: 2026-04-22
- 작업: 출처 신뢰도 3층 방어선 — 창작층(Liby ingest) + 감사층(Auditor) 명세 강화
- 트리거: `sessions/backlog-2026-04-21.md` P0 #1. 2026-04-21 curation 라벨 할루시네이션(섹션 라벨 `[출처: obesity.notes]` 3건, `[출처 미확인]` 백도어) 세션에서 prompt 사후 패치로 차단했으나, **근본 원인인 sections[].sources[] 공백**은 잔존 → primarySources fallback 과의존 구조적 리스크로 식별됨. 창작·감사 두 층에서 구조화된 방어선 필요.
- 건드린 파일:
  - `skills/knowledge-ingest/SKILL.md` — Step 5-B 출처 처리 하위 블록 + 5-C 자가검증 섹션 신설
  - `agents/auditor.md` — 감사 기준 표 2행 추가

---

## 결정 배경

### 3층 방어선 설계 (backlog에서)
| 층 | 파일 | 상태 |
|---|---|---|
| **창작** | `skills/knowledge-ingest/SKILL.md` | 이번 세션 강화 ✓ |
| **감사** | `agents/auditor.md` | 이번 세션 강화 ✓ |
| **출력** | `src/prompts.js` | 2026-04-21 강화 완료 (섹션 라벨 금지 격상 + rule ⑧ 주제 일치 필수) — 유지 |

### 핵심 판단
1. **curation prompt 추가 수정 불필요**: rule ⑧이 이미 sources[] 배열 문자열을 그대로 매핑 허용. `"[TIPS — 임상 경험 (미르 관찰)]"`를 sources[]에 넣으면 자동 인식.
2. **TIPS 공식화의 의미**: 출처가 없는 게 아니라 **출처 타입 선언**. 임상 경험·관찰·강의 기반 섹션은 `[TIPS — ...]` 문자열을 sources[]에 명시 등록. sourcing-rules.md의 기존 attribution 원칙과 정합.
3. **데이터 수정 안 함**: 기존 79 bundle 엔트리 본문 불변. P3 미르 담당(Phase 5b md 출처 보강)으로 위임. 신규 ingest부터 규칙 적용.
4. **Auditor는 명세만**: 실행 로직 구현은 이번 세션 out of scope. 기준표에 2행 추가해서 미르 호출 시 "Phase 5b 우선순위 리스트" 산출 근거 확보.

---

## 수정 내역

### `skills/knowledge-ingest/SKILL.md`

**A-1. Step 5-B 출처 처리 하위 블록 "sections[].sources[] 채움 원칙 (2026-04-22 신설)" 신설** (149행 "출처 처리" 바로 뒤)

4개 원칙:
1. 섹션 content가 Tier 1 primarySources로 온전히 뒷받침되지 않으면 `sections[key].sources[]` 반드시 채움 (빈 배열 금지)
2. **TIPS 출처 타입 공식화** — 임상 경험·관찰·강의 기반 섹션은 TIPS 타입 문자열을 sources[]에 명시 등록
   - `"[TIPS — 임상 경험 (미르 관찰)]"` / `"[TIPS — by 로컬원장님]"` / `"[TIPS — by ENT교수]"` / `"[TIPS — 연수강의]"`
3. 매핑 진짜 불가능 → ingest 중단 미르 질문 (`[출처 미확인]` 자동 부여 금지, Attribution GOTCHA와 동일 원칙)
4. Tier 1 중복 금지 예외 — 섹션 주제가 Tier 1과 정확히 일치하면 Tier 2 비움 (자동 상속)

GOTCHA: sources[] 공백 방치 금지. 2026-04-21 오젬픽 라벨 할루시네이션 뿌리 원인 기록.

**A-2. 5-C "섹션↔출처 주제 일치 자가검증" 신설** (Step 5-B와 5-A 사이)

curation rule ⑧의 **사전 방어선**. Liby가 저장 직전 스스로 확인.

절차:
1. 섹션 content 주제 키워드 1~2개 추출
2. sources[] 항목별 주제 키워드 vs source 문자열(저자·저널·가이드라인명·TIPS 라벨) 비교
3. 판정: 일치 → 유지 / 부조화 → 제거 or 섹션 분리 / 애매 → 미르 보고
4. TIPS 라벨 source는 자가검증 면제 (주제 매핑이 아닌 출처 타입 선언)

좋은 예: 단백질 섭취 섹션 + Noronha JC Obes Pillars 2025 → ✓
나쁜 예: adaptive thermogenesis 섹션 + Mayo Clinic 비만 표현형 논문 → 제거

### `agents/auditor.md`

**감사 기준 표에 2행 추가** (parents 누락 child 후보 항목 바로 뒤, line 27 인근)

```
| **sections[].sources[] 공백** (2026-04-22 신설 — 3층 방어선 감사층)
| **bullet↔출처 주제 부조화** (2026-04-22 신설 — 3층 방어선 감사층)
```

- sources 공백: v2 엔트리 섹션 sources[] 빈 배열 + primarySources 주제 포괄 약할 때 → Phase 5b 우선순위 리스트 추출. TIPS 등록 섹션은 제외.
- 주제 부조화: 섹션 content 주요 키워드(2~3개) vs source 문자열 공통 단어 0 → 검토 권고. 텍스트 키워드 매칭 수준 휴리스틱, false positive 허용.

---

## 성공 기준 재확인 (QA)

1. ✓ Liby 신규 ingest 시 sources[] 공백 방지 분기 보유 — TIPS 타입 명시 등록 경로 + 매핑 불가 시 미르 질문
2. ✓ Auditor 기준표 감사 항목 2개 추가
3. ✓ Auditor 실행 시 Phase 5b 우선순위 리스트 산출 근거 명시

검증 한계:
- 실제 실효성은 차기 ingest·audit 세션에서 측정. 이번은 명세 수준만.
- P0 #2 (heart-failure Chrome 실기)에서 sources[] 공백 섹션 목록 실제 추출 가능한지가 첫 실기 검증 포인트.

---

## 판정

**통과** (Reviewer·QA 통과, 설계서 범위 내 surgical 수정)

---

## 다음 작업

- **P0 #2**: 심부전 ingest Chrome 실기 검증 + `heart-failure.md` sections[].sources[] 재감사 (이 세션 방어선 실효성 첫 검증)
- **P1 #3**: Phase 5d — hyposmia + neck-mass v2 마이그레이션
- **P3 #9**: 미르 담당 Phase 5b md 출처 보강 (Auditor 리스트 산출 후 우선순위 결정)

---

## 회고

### 예상과 달랐던 점
- 처음엔 "sources 필수"를 엄격하게 할지 고민했으나, sourcing-rules.md Tier 2 "Tier 1과 다를 때만" 원칙과 충돌 회피 필요. → **"Tier 1으로 온전히 뒷받침되지 않으면"** 조건부로 타협. 중복 금지 원칙 유지하면서 공백 방지.
- TIPS를 "출처 타입"으로 재개념화하는 것이 LLM과 Liby 둘 다에게 잘 작동함. 기존 attribution 원칙(`[TIPS — by ㅇㅇㅇ]`)과 자연스럽게 결합.

### 다음 세션 반영
- 차기 ingest(예: mucomyst·pilocarpine P1 #4) 시 5-B 채움 원칙 + 5-C 자가검증이 Liby에게 실제로 잘 작동하는지 관찰. 순응도 떨어지면 구체 예시 추가.
- Auditor 실행 명세(절차 섹션)는 이번에 건드리지 않음. 미르가 실제 호출할 때 기준표 2행이 잘 발동되는지 확인 후 필요 시 절차 보강.

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — Liby ingest 절차 핵심. 차기 모든 ingest 세션의 전제.
2. routine/trigger/CI 영향? — 직접 영향 없음 (문서). 단, librarian agent가 main 기준으로 이 파일을 읽으므로 간접 YES.
3. 다른 브랜치·외부 시스템 의존? **YES** — Liby 호출 시 main의 SKILL.md·auditor.md 참조.

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
