# L3 Smoke 실전 검증 — 2026-04-23

> 세션 연장: 2026-04-22 β-prime 진행 (L2 → L2-patch → L1 B1 → L3 → post-patches)
> 이번 세션 commit 체인: L3 구현 → L1 B1 patch v1/v2 → neffy hotfix → protocol default + xerostomia 통합

---

## 실전에서 L3가 잡은 결함 3종

**결함 1**: L1 B1 Builder가 `sections.treatment` 사용 (vocabulary에 없는 비표준 key)
- Smoke #1 감지: broken 11 ("Guide ctx 공백 엔트리")
- 영향: LPR·xerostomia·BMS 3 unique (10 aliases)
- 수정: `treatment` → `protocol` rename

**결함 2**: Liby 2026-04-22 de5 ingest가 **같은 실수**를 더 광범위하게
- 전수조사로 발견: LPR-consensus·depression-screening·neffy 3 unique도 동일
- 수정: L1 B1-patch-v2로 묶어 rename + `agents/librarian.md`에 재발 방지 규칙 추가

**결함 3**: `UIHOOKS_DEFAULTS.disease.guide` 기본값에 `protocol` 누락
- section-vocabulary.md 내부 불일치 (hint엔 있고 guide엔 없음)
- rename 후에도 여전히 invisible → Smoke 재실행에서 감지
- 수정: app.js + section-vocabulary.md 동시 업데이트

**결함 4 (bonus)**: neffy uiHooks 오버라이드 Builder 작업 중 `"neffy": {` + `"kind": "drug",` 2줄 삭제 실수
- Bundle 로드 완전 실패 (SyntaxError)
- hotfix 복원

## 최종 Smoke 결과

### Smoke #1 (ctx 공백 엔트리)
- 이전: 11건
- **현재: 0건** ✓

### Smoke #3 (primarySources 누락 v2)
- 17건 잔존 — Phase 5b Auditor 작업 대상 (L1 B1 승격 엔트리 중 Tier 1 없는 것, GLP-1 계열 등). 정상 상태.

### Smoke #2 (TRIAGE fixture runner — runTriageSmoke)
7 시나리오 전부 **PASS**:
| 시나리오 | 감지 | pass |
|---|---|---|
| LPR A (식도 증상 동반) | LPR · LPR-consensus | ✓ |
| LPR B (고립 LPS) | LPR · LPR-consensus | ✓ |
| sglt2 UTI 기왕력 | diabetes · sglt2-inhibitors | ✓ |
| vitamin-d 일반 상담 | vitamin-d | ✓ |
| 아나필락시스 neffy 대체 | 아나필락시스 | ✓ |
| depression-screening | depression · depression-screening | ✓ |
| heart-failure 복합 | heart-failure · sglt2-inhibitors · ... | ✓ |

L2 복수 감지 원칙 + 관계 매트릭스 실전 확인.

---

## β-prime 완료 상태

| Phase | 상태 |
|---|---|
| L1a (v1 전수조사) | ✓ |
| L1b (v1→v2 설계) | ✓ |
| L2 (prompt 개편) | ✓ (+ patch 방식 A 임시 invisible) |
| L3 (스모크 자동화) | ✓ (실전에서 회귀 3종 즉시 감지) |
| L1 B1 (LPR·xerostomia·BMS v2) | ✓ (patch 2회 포함) |
| L1 B2·B3 (나머지 Easy·Medium 9 unique) | 미착수 |
| L1 B4 (v1 fallback 삭제) | 미착수 (L3 Smoke #1 통과 전제, 현재 충족) |

---

## 제품 철학 검증 (완결성이 부담)

- 임시 라벨 invisible 방침 유지 ✓
- Tier 1 vs TIPS 쏠림 자체는 평가 지표 아님 — 대화 맥락 임상 관련성만 지표 ✓
- L3 스모크 자체가 "완결성 감시"가 아니라 **"invisible 누락 감지"** 목적. 과도한 완결성 추구 경계

---

## L3 스모크의 구조적 한계 (차후)

- Smoke #1은 "엔트리 전체 공백"만 감지. "섹션 부분 누락"(일부 섹션만 invisible)은 놓침
- 이번 결함 2(Liby de5 ingest)도 LPR-consensus는 다른 섹션이 살아있어 broken 판정 못 받음. 전수 vocabulary cross-check 별도 필요
- 향후 L3 확장: 섹션 key 전수를 vocabulary 18 + slugify와 대조해 "invisible section" 리포트 추가 검토

---

## 다음 Phase 후보

- **L1 B2·B3** — 나머지 9 unique (BPPV/dizziness/후각/구강병변/경부종괴). L3 스모크가 새 이슈 즉시 감지. 2-3 세션 분산
- **L1 B4** — v1 fallback 삭제. L1 B2·B3 완료 후
- **실전 체감** — 미르가 실제 진료에 며칠 사용하며 추가 이슈 수집

권장: 실전 체감 우선. L1 B2·B3의 9 unique는 현재 v1 fallback 경로로 작동 중이라 급하지 않음.
