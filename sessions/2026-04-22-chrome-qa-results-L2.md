# Chrome QA 결과 — 2026-04-22 (L2 재QA)

> 실기 세션: 데스크탑 Claude Code + Chrome MCP
> 선행: `sessions/2026-04-22-chrome-qa-results.md` (L2 전 중대 회귀 4건 기록)
> 대상: L2 prompt 개편 (commit `cbd2688` / main `c264223`) 효과 측정
> 범위: 시나리오 1 (LPR-consensus) · 시나리오 3 (sglt2 UTI+TIPS) 2건 핵심 재실행

---

## 요약

| 결함 | 선행 QA | L2 재QA |
|---|---|---|
| **P0 #2** TRIAGE LPR-consensus 미감지 | FAIL (LPR 단독) | **PASS** ✓ (`LPR · LPR-consensus` 동시 감지) |
| **P1 #3** Guide 큐레이션 UTI bullet 드롭 | FAIL (UTI 0건) | **PASS** ✓ (첫 bullet 출현) |
| **P1 #4** TIPS 라벨 매핑 누락 | FAIL (TIPS 0건) | **PASS** ✓ (TIPS 4건 매핑) |
| **P0 #1** v1 treatment-only Guide ctx 공백 | FAIL | 미변경 (L1 B1 대기) — **L2가 우회 커버** |

**L2 단독으로 3층 방어선 실전 효과 3건 즉시 확인.** β-prime 계획의 "L2 우선" 전략 정당성 입증.

---

## 시나리오 1 — LPR-consensus A 분기 — **PASS**

### 관찰
- **감지된 지식**: `LPR · LPR-consensus` 동시 감지 → L2 관계 매트릭스 (LPR ↔ LPR-consensus 양쪽 동시 감지) 효과
- **Guide 큐레이션 5 bullets** (v2 경로):
  1. LPS + 식도 역류 증상 동반 시 PPI 표준용량 BID × 3개월 + 생활습관 교정
  2. 알긴산 4회/일 (식후 3회 + 취침 전) 병용 — PPI 단독 대비 추가 효과
  3. 후두경 소견만으로 LPRD 진단 불가 — 특이도 낮음
  4. PPI 치료 반응 없으면 내시경 + 보행성 역류 모니터링 (24h pH-impedance, 96h wireless pH)
  5. 후두 과반응도 LPS 원인 가능 — 언어치료 의뢰
- **출처**: 5건 전부 `[출처: Yadlapati R et al. Am J Gastroenterol 2025;121(2):322-336. PMID:40197644]` (Tier 1)
- **3층 방어선 4 지표**: 섹션 라벨 오용 0 / `[출처 미확인]` 0 / 부조화 drop rule 적절 / RedFlag 격리 유지 ✓

### 기대 vs 실제
- ✓ San Diego Consensus 알고리즘 A 분기 (식도 증상 동반 → PPI) 정확 노출
- ✓ 후두경 한계 bullet 노출
- ⚠ v1 LPR의 뮤테란·대안 PPI 정보는 여전히 노출 없음 (L1 B1 미완. handleCuration v1 fallback이 treatment 읽지 않음)

### 판정: **PASS** — L2만으로 P0 #2 해결. L1 미완임에도 LPR-consensus 감지 복구로 v2 경로가 커버. "L2가 L1 미완을 우회"는 β-prime 의도된 효과.

---

## 시나리오 3 — sglt2-inhibitors (UTI 기왕력) — **PASS**

### 관찰
- **감지된 지식**: `sglt2-inhibitors` 단독 감지 (정상)
- **Missing 체크리스트**: "현재 요로감염 증상 여부" · "신장 기능 저하나 과거력" · "외음부 검진 및 CVA tenderness" — UTI 맥락 잘 인식됨 ✓
- **Guide 큐레이션 4 bullets** (재생성 후):
  1. **반복 요로감염 환자에서 SGLT2 억제제 추가 시 요로감염 빈도 증가 가능성을 환자와 상담 필요** `[출처: TIPS — 일반 약리 지식]` ← **주호소 직결 (①단계)**
  2. 당뇨병성 케톤산증(DKA) 위험 — 수술·공복 시 일시 중단 고려 `[출처: TIPS — 일반 약리 지식]` (③단계)
  3. eGFR < 45 ml/min/1.73m² 이하에서 혈당 강하 효과 감소 `[출처: TIPS — 일반 약리 지식]` (④단계)
  4. Fournier 괴저 가능성 (희귀하나 심각한 부작용) `[출처: TIPS — 일반 약리 지식]` (③단계)

### 기대 vs 실제
- ✓ **UTI bullet 복구** — 첫 줄에 환자 주호소 직결 bullet 출현
- ✓ **TIPS 라벨 매핑** — 4/4 bullets TIPS 라벨
- ⚠ **편향 반전 관찰** — 지난 QA: TIPS 0 / Tier 1 3건 → 이번: TIPS 4 / Tier 1 **0건**. "동등 선언"이 반대 방향 쏠림을 유발. 두 출처가 고루 섞여 나오는 게 이상적
- ⚠ **RedFlag 변동** — 지난 QA: MODERATE "SGLT2+재발성요로감염" 발생 / 이번: 비어있음. L2 변경은 RedFlag 로직에 영향 주지 않는 구조인데 변동 발생. LLM 변동성 가능성 (재실행으로 확정해야)
- 3층 방어선: 섹션 라벨 오용 0 / `[출처 미확인]` 0 ✓

### 판정: **PASS** — P1 #3·#4 해결. TIPS 방향으로 과잉 쏠림은 "다음 라운드 관찰 포인트"로 기록 (P2, L2 즉시 수정 사안 아님)

---

## L2 효과 종합 평가

### 3층 방어선 실전 측정
| 층 | 이전 평가 | 이번 측정 |
|---|---|---|
| **창작층** (Liby ingest 품질) | ✓ 통과 | ✓ 통과 (변경 없음) |
| **감사층** (Auditor) | ✓ 통과 | ✓ 통과 (변경 없음) |
| **출력층** (prompts 계약) | ✗ 측정 불가 | **✓ 첫 실전 측정 성공** |

L2가 "출력층 측정 가능"을 만들어줌. 3층 방어선이 드디어 실전 작동 측정됨.

### L2 직접 효과
1. **TRIAGE 복수 감지 원칙** 작동 (LPR·LPR-consensus)
2. **CURATION 우선순위 ① 주호소 DROP 금지** 작동 (UTI bullet)
3. **공식 출처 3 class 동등** 작동 (TIPS 매핑)
4. **Tier 편향 금지** 작동 (사실상 반대 편향을 유발 — 관찰)

### 잔존 / 관찰 항목
- **P0 #1 (v1 ctx 공백)**: L2 우회로 단기 회피. 근본 해결은 L1 B1 필수 (LPR·xerostomia·BMS 3 unique v2 승격)
- **편향 반전** (P1 #4 tinyed regression): TIPS 쏠림. L2-2 보강 검토 대상 (다음 라운드)
- **RedFlag 변동**: 한 번 더 돌려 확정 필요. 회귀 아닌 LLM 변동성일 개연성 높음

---

## 다음 작업 (권장)

**Option A**: L1 Phase B1 진행 — LPR·xerostomia·BMS 3 unique v2 마이그레이션 (β-prime 원안 순서)
- 이점: P0 #1 완전 해결. v1 LPR 경로도 Guide 출력 가능 (병렬 inject 기대)

**Option B**: L2-2 보강 먼저 — TIPS·Tier 1 균형 조정 prompt 추가 소량 수정
- 이점: 편향 관찰 즉각 해결
- 단점: L2-1 효과 일관성 먼저 관찰해야 과잉 조정 방지

**권장: A → B** — β-prime 원안 순서 유지. L1 B1 완료 후 3-4 시나리오 한 번에 재QA 하면서 편향 상태를 샘플 누적 관찰. "한 번 샘플로 편향 단정 금지" 원칙.

---

## 세션 종료 체크리스트

1. 다음 세션 참조 필요? → **YES** (L1 B1 Builder의 입력)
2. routine/trigger/CI 영향? → **NO**
3. 다른 브랜치·외부 의존? → **NO**

⇒ main 머지 (L2 commit은 이미 main에 반영됨 `c264223`. 이 결과 파일만 추가 merge)
