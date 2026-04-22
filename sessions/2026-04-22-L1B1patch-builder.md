# Session — 2026-04-22 L1 B1-patch (Builder)

## 세션 정보
- 일자: 2026-04-22
- 역할: Builder
- 브랜치: `claude/jovial-lovelace-c6e481`
- 선행 세션: 2026-04-22 L1 Phase B1 (commit `0d07e85`) — LPR·xerostomia·BMS 3 unique v1→v2 승격
- 후속 맥락: L3 부팅 Smoke에서 `[KB-SMOKE] Guide ctx 공백 엔트리: 11` 경보 → 이번 patch 발동

## 결정 배경

### 원인
L1 B1 Builder가 3 unique 승격 시 `sections` key를 **`treatment`**로 작성. 그러나 `knowledge/section-vocabulary.md` line 28의 표준 섹션 dictionary(18개)에는 `treatment`가 **없음** — 치료 프로토콜 표준 key는 **`protocol`**이다 ("처방/치료, 처방 프로토콜, 단계별 처방, Dose Escalation 프로토콜" 등을 정규화).

결과: `UIHOOKS_DEFAULTS.disease.guide` 기본값(`classification, indication, exam, schedule, dosing, comparison, contraindication, precaution, monitoring, pregnancy, insurance, referral, differential, notes`)에 `treatment`가 없어서 **Guide tab curation ctx 순회에서 해당 섹션이 skip됨**. 승격된 10개 alias 엔트리 전부 Guide ctx 공백.

이 감지는 L3 스모크가 정확히 해냈다 — 3층 방어선 효과 실증.

### 선행 누락
L1 B1 Builder가 `knowledge/section-vocabulary.md` cross-check 없이 md 원문의 "처방/치료" 라벨을 단순 영역어 `treatment`로 변환. vocabulary 참조 절차 부재.

### 범위 선택 근거
- 최소 국소 수정 원칙: 3 unique 엔트리만, 섹션 key rename. content·sources·primarySources·keywords 전부 불변.
- xerostomia의 `treatment.gargle`(2nd 섹션)는 vocabulary 도트 표기 없음 → 자유 섹션 `protocol-gargle`(slugify 규칙)로 변환. 단, 이 자유 섹션은 Guide tab 기본값에 없음 → **별도 보고 사안**으로 상위에 전달.

## 건드린 파일 목록

| 경로 | 작업 |
|---|---|
| `src/knowledge-bundle.js` | 3 unique 엔트리 섹션 key rename + patch 주석 추가 |
| `src/index.html` | cache-bust 쿼리스트링 갱신 |
| `sessions/2026-04-22-L1B1patch-builder.md` | 본 세션 기록 생성 |

**건드리지 않음**: prompts.js, app.js, sourcing-rules.md, dysphonia 등 기타 v1 엔트리.

## 제거·추가·수정 상세

### 1. `src/knowledge-bundle.js`

#### `_LPR_v2` (line 1830-1841)
- `sections.treatment` → `sections.protocol` (content·sources 불변)
- 주석 한 줄 추가: `2026-04-22 L1 B1-patch: treatment → protocol (vocabulary 정합)`

#### `_xerostomia_v2` (line 1852-1867)
- `sections.treatment` → `sections.protocol`
- `sections["treatment.gargle"]` → `sections["protocol-gargle"]` (자유 섹션, slugify kebab-case)
- 주석 한 줄 추가: `2026-04-22 L1 B1-patch: treatment → protocol, treatment.gargle → protocol-gargle (자유 섹션, slugify)`

#### `_BMS_v2` (line 1875-1888)
- `sections.treatment` → `sections.protocol` (content·sources 불변)
- 주석 한 줄 추가: `2026-04-22 L1 B1-patch: treatment → protocol (vocabulary 정합)`

### 2. `src/index.html`
- Line 11: `knowledge-bundle.js?v=L3-smoke` → `knowledge-bundle.js?v=L1B1patch`

### 수정 전후 diff 요약
```
_LPR_v2.sections.{ treatment }              →  _LPR_v2.sections.{ protocol }
_xerostomia_v2.sections.{ treatment,         →  _xerostomia_v2.sections.{ protocol,
                          "treatment.gargle"}                              "protocol-gargle" }
_BMS_v2.sections.{ treatment }              →  _BMS_v2.sections.{ protocol }
```

## 판정
- Builder 단계 완료
- Reviewer·QA 판정은 상위(호출자) 몫
- Smoke 재검증·커밋·main merge는 상위 판단

## 예기치 못한 non-vocabulary 키 (별도 보고)
- `_xerostomia_v2.sections["treatment.gargle"]` — 도트 표기 자유 섹션이 **표준 vocabulary에 부재**
- 본 patch에서 slugify 규칙(kebab-case) 적용 → `protocol-gargle`로 이관
- **Guide tab 노출 영향**: `protocol-gargle`은 자유 섹션이므로 `UIHOOKS_DEFAULTS.disease.guide` 기본값 14개에 **없음** → xerostomia 엔트리 Guide ctx에 gargle 내용 누락 가능
- 대안 (상위 판단):
  1. vocabulary에 `protocol-gargle` 표준 승격 (현재 3 엔트리 요건 미달 — 단독 1건)
  2. xerostomia 엔트리에 `uiHooks.guide` 개별 오버라이드로 `protocol-gargle` 명시 포함
  3. 두 섹션 content 통합해서 단일 `protocol`로 병합 (content 불변 원칙 위반 — 미르 승인 필요)

## 다음 작업 기대
부팅 Smoke #1 재실행 시:
- `[KB-SMOKE] Guide ctx 공백 엔트리: 11` → **broken 4**로 축소 예상
  - 축소분: LPR(3 alias) + xerostomia(4 alias) + BMS(3 alias) = 10건이 `protocol` 키로 복구되어 Guide 기본값 교집합 hit
  - 잔존 4건: dysphonia 관련(v1 잔존) — 별도 세션에서 처리
- xerostomia Guide ctx에 gargle 섹션 누락은 상위가 위 3개 대안 중 선택 후 결정

## 회고
- L1 B1 Builder가 vocabulary 파일을 cross-check하지 않은 것이 근본 원인
- 재발 방지: Liby/Builder가 sections key 작성 시 `knowledge/section-vocabulary.md` line 21-42의 표준 dictionary를 반사적으로 참조해야 함 (→ `skills/knowledge-ingest/SKILL.md` 또는 Builder 체크리스트 반영 여지)
- L3 3층 방어선의 첫 실전 감지 성공 — 스모크가 정확히 이 패턴을 잡아냈다는 점은 방어선 투자 정당성 검증
