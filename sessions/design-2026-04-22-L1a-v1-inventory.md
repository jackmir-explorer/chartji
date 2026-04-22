# L1a — v1 엔트리 전수조사 보고서 (β-prime)

> 목적: L1b 마이그레이션 설계서의 입력. v1 엔트리의 수·구조·난이도·출처 위험 파악.
> 조사 방법: Chrome 콘솔에서 `KNOWLEDGE_BUNDLE` 전체 순회 (`!e.sections` 기준 v1 판별).
> 설계서 아님 — 현황 보고.

---

## 총괄

| 지표 | 값 |
|---|---|
| 전체 KB 키 | 93 |
| v2 엔트리 (sections 보유) | 60 |
| **v1 엔트리** | **33** |
| v1 중 **unique 콘텐츠** (aliasing 묶으면) | **12** |
| v1 중 **Guide ctx broken** (exam·draftAppend 공백, treatment만) | **10 키 = 3 unique** |

`Guide broken` 정의: `handleCuration`(`src/app.js:181-182`) v1 fallback이 `e.exam`·`e.draftAppend`만 읽는데 두 필드가 빈 문자열이고 `e.treatment`만 채워진 엔트리. 큐레이션 버튼 눌러도 빈 ctx로 조용한 return. **이것이 시나리오 1 LPR 실패의 직접 원인.**

---

## v1 엔트리 33개 — unique 내용별 분류

### 그룹 A — Guide broken (BUG 직접 노출) · 10 keys · 3 unique

| unique 본체 | aliases | 내용 | 난이도 |
|---|---|---|---|
| **xerostomia** | 구강건조증, 구강건조, dry mouth, xerostomia (4) | treatment 228자만 | medium |
| **LPR** | LPR, 후두염, 인후두역류 (3) | treatment 172자만 | medium + 2026-04-22 LPR-consensus v2 공존 고려 |
| **BMS** | burning mouth, 구강작열감, BMS (3) | treatment 138자만 | easy |

**특징**: exam(검진)·differential(감별)·draftAppend(차트 문구) 전부 공백. treatment 한 덩어리만 있음. v2 섹션화 시 `treatment` 내용을 분해(indication·protocol·monitoring 등)해야 완결.

### 그룹 B — 정상 v1 (Guide 작동, v2 변환 대상) · 23 keys · 9 unique

| unique 본체 | aliases | 필드 분포 (exam/treatment/differential/draftAppend) | 난이도 |
|---|---|---|---|
| 후각감퇴/후각저하 | 후각감퇴, 후각저하 (2) | 93/314/180/0 | easy (3섹션으로 자연 분해) |
| 후각기능저하 | 후각기능저하 (1) | 93/264/98/0 | easy |
| hyposmia/anosmia/후각소실/냄새 못맡음 | hyposmia, anosmia, 후각소실, 냄새 못맡음 (4) | 93/156/98/0 | easy |
| dizziness | dizziness (1) | 184/0/287/0 | medium (treatment 공백 → differential 중심) |
| 어지럼증/vertigo | 어지럼증, vertigo (2) | 93/0/287/0 | medium |
| BPPV/이석증 | BPPV, 이석증 (2) | 95/245/0/0 | easy (Epley maneuver 핵심) |
| 구강병변 군 | 구강병변, oral white patch, 구강궤양, lichen planus (4) | 64/217/46/0 | medium (4 aliases가 진짜 다른 질환들 — aliasing 재검토 필요) |
| 경부종괴 군 | 경부종괴, neck mass, 림프절염, lymphadenitis (4) | 94/126/92/0 (경부종괴·neck mass), 45/143/0/0 (림프절염·lymphadenitis — 분리) | medium |
| 저음성난청 군 | 저음성난청, 귀먹먹함, 이충만감 (3) | (측정 잘림) | medium |

### Aliasing 구조 이슈 (중요 발견)

33 엔트리 전부 **독립 객체** (동일 내용 복제 패턴). 참조 공유 아님. 즉:
- `KNOWLEDGE_BUNDLE.LPR`·`KNOWLEDGE_BUNDLE["후두염"]`·`KNOWLEDGE_BUNDLE["인후두역류"]`는 내용이 똑같아도 3개 별개 객체
- 수정 시 3번 반복 → 동기화 실패 리스크
- v2 마이그레이션 시점이 aliasing 구조를 개선할 적기

**제안 패턴** (L1b 설계서에서 확정):
```js
var _LPR = { kind:"disease", sections:{...}, primarySources:[...] };
KNOWLEDGE_BUNDLE["LPR"] = _LPR;
KNOWLEDGE_BUNDLE["후두염"] = _LPR;
KNOWLEDGE_BUNDLE["인후두역류"] = _LPR;
```
또는 더 명시적:
```js
KNOWLEDGE_BUNDLE["LPR"] = _LPR;
KNOWLEDGE_BUNDLE["후두염"] = { aliasOf: "LPR" };
```
두 번째는 aliasOf 소비 로직 추가 부담. 첫 번째(참조 공유) 권장.

---

## 난이도 분류 (마이그레이션 공수)

### Easy · 9 unique (≈18 keys, aliases 포함)
- BMS (구강작열감)
- BPPV (이석증)
- 후각감퇴·후각저하
- 후각기능저하
- hyposmia·anosmia·후각소실·냄새 못맡음

→ 기존 v1 필드를 v2 섹션으로 재배열만. 원문 보존. 섹션 4-5개.

### Medium · 8 unique (≈14 keys)
- xerostomia, LPR, dizziness, 어지럼증·vertigo, 구강병변 군, 경부종괴 군, 저음성난청 군
- 내용이 얇거나 한 필드에 몰려 있어 **섹션화 시 일부 재구성 필요**. 내용 추가는 최소 (원문 범위 내).

### Hard · 0
v1에 딥 의학지식 엔트리는 없음 (v2 ingest들이 이미 대체). 예상 외로 hard 없음.

---

## 출처(sources) 위험 — 블로커 후보

**핵심 관찰**: v1 엔트리 33건 전부 `primarySources` 없음·`sections[k].sources` 없음. v2 스키마 규칙은 primarySources 필수(2026-04-22 3층 방어선 창작층 규칙).

### 3가지 처리 옵션

**옵션 1 — 출처 없이 v2 승격 (과도기 허용)**
- `primarySources: []`·`sections[k].sources: []` 빈 배열로 통과
- Guide 큐레이션 LLM이 출처 없으면 `[출처 미확인]` 태그 자동 부여 (Auditor 규칙 ⑦ 위반이지만 v1 유산 허용)
- 장점: 빠름·현 내용 보존
- 단점: 3층 방어선 감사층이 이 엔트리를 계속 flag. 영구 과도기화 위험

**옵션 2 — 각 엔트리마다 출처 최소 1개 명기 (Liby 경유)**
- 예: BPPV → Epley maneuver 원전 (Epley JM, 1992) 또는 AAO-HNS 2017 guidelines
- 장점: 감사층 영구 통과·3층 방어선 원칙 유지
- 단점: 12 unique × 출처조사 → 엔트리당 30분~1시간. 합계 **6~12시간 추가 공수**

**옵션 3 — `[출처: 임상 표준 — 관례적 진료]` 태그 도입 (TIPS 공식화 연장)**
- TIPS가 "일반 약리 지식" 공식 라벨을 받은 것처럼, 관례 진료에 새 공식 라벨 부여
- 예: BPPV Epley maneuver → `[출처: 임상 표준 — Epley maneuver]`
- 장점: 중간 타협안. 감사층이 공식 인정
- 단점: 새 라벨 도입 결정이 필요. L2 prompt 설계에 포함 (TIPS 확장 형태)

L1b 설계서에서 3 옵션 중 하나를 미르 결정 받는다. **권장: 옵션 3** (근본적 · 영구 해결 · L2와 맞물림).

---

## 아키텍처 side observation

- `e.differential` 필드가 23 v1 엔트리 중 8개에 존재하지만 v2 섹션 네이밍에는 `differential`이 표준 키 아님. v2 마이그레이션 시 `differential` → `differential_diagnosis` 또는 표준 섹션 키로 정규화 필요.
- `e.draftAppend`는 대부분 공백(33개 중 0개 채워짐). v2의 `uiHooks.draftAppend` 훅과 구분 필요.

---

## 결론

- v1 마이그레이션 실질 대상은 **12 unique 엔트리 × 섹션화 30분~1시간** = 6~12시간 공수 (Easy·Medium 모두 포함)
- **Guide broken 3 unique** (LPR·xerostomia·BMS)가 시급. 시나리오 1 LPR 실패의 직접 원인. 이 3건 먼저 처리하면 즉각 개선
- Aliasing 33→12 참조 공유 구조 전환은 마이그레이션과 동시 처리 권장 (나중 따로 하면 2차 작업)
- 출처 문제는 L2 설계와 맞물림 — **옵션 3 (`[출처: 임상 표준]` 라벨 도입)** 권장

**L1b 설계서에서 확정할 결정 2건**:
1. **Aliasing 구조 전환 방식** (참조 공유 vs aliasOf 메타) — 권장: 참조 공유
2. **v1 출처 처리 옵션** (옵션 1·2·3 중) — 권장: 옵션 3
