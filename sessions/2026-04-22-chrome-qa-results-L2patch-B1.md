# Chrome QA 결과 — 2026-04-22 (L2-patch + L1 B1)

> 실기 세션: 데스크탑 Claude Code + Chrome MCP
> 선행: `sessions/2026-04-22-chrome-qa-results-L2.md` (L2 1차 재QA — 편향 반전·RedFlag 변동 관찰)
> 대상: L2-patch (방식 A 임시 라벨 invisible) + L1 B1 (LPR·xerostomia·BMS v2 승격), commit `0d07e85` / main `74275d3`

---

## 요약

| 결함 | 이전 상태 | L2-patch + L1 B1 후 |
|---|---|---|
| P1 #4 편향 반전 (Tier 1 0 / TIPS 4) | 반전 관찰 | **해소** — 시나리오 3에서 Tier 1 3 / TIPS 0, 근거 있는 매핑 |
| P0 #1 v1 treatment-only Guide 공백 | L2 우회 커버 | **LPR·xerostomia·BMS 3 unique 정식 v2** 승격, 참조 공유 10 aliases |
| Tier 편향 (의심) | 관찰 | **제품 철학 부합** — 정보 밀도 감소는 feature |
| LPR v2 ENT교수 TIPS bullet | 미검증 | **LLM 미채택** — 제품 철학상 수용 (빠진 bullet은 의사 검색) |

**방식 A (임시 라벨 invisible) 완벽 작동 확인.** 제품 철학(완결성보다 실전 의미)이 구조에 반영됨.

---

## 시나리오 1A — LPR-consensus (식도 증상 동반) — **PASS**

### 감지
- `LPR · LPR-consensus` 동시 감지 (L2 효과 유지)
- LPR v1→v2 승격 완료 (`KNOWLEDGE_BUNDLE.LPR.sections.treatment.sources === ["[TIPS — by ENT교수]"]`). aliases 3 참조 공유 (`LPR === 후두염 === 인후두역류`)

### Guide 5 bullets — 전부 Tier 1 Yadlapati PMID:40197644
1. LPS + 식도 증상 동반 시 PPI 표준용량 BID × 3개월 + 생활습관 교정
2. 알긴산 4회/일 (식후 3회 + 취침 전) 병용으로 PPI 단독 대비 증상 개선 추가 효과
3. 후두경 소견만으로 LPRD 진단 불가 — 특이도 낮음
4. 기침·인후 청소·과다점액 증상 ≥주 2회, ≥8주 지속 시 LPS 해당 (2025 기준)
5. PPI 치료 반응 없으면 내시경 + 보행성 역류 모니터링 (24h pH-impedance, 96h wireless pH)

### 관찰
- ⚠ **LPR v2의 `[TIPS — by ENT교수]` 섹션이 bullet로 채택 안 됨**. 원본 md의 "뮤테란 off-label·PPI 부작용 대안" 정보 미노출.
- **제품 철학상 수용** — 완결성이 목표 아니라 실전 의미 + 대화 맥락 우선순위. 빠진 bullet은 의사 검색. 회귀로 잡지 않음.
- 잠재 보강 여지: curation prompt에서 "TIPS by {이름/소속} 섹션이 있으면 최소 1 bullet 매핑"을 권장 지시 — 다만 현재는 관찰 단계

---

## 시나리오 3 — sglt2-inhibitors (UTI 기왕력) — **완벽한 PASS**

### 감지
- `sglt2-inhibitors` 단독 (정상)
- RedFlag MODERATE "SGLT2억제제+반복성요로감염" **일관 발생** (L2 재QA 변동성 해소)

### Guide 3 bullets — 전부 Tier 1 Swanson PMID:41839088
1. **요로감염 기왕력이 있는 환자에서 SGLT2 억제제 사용 시 UTI 위험 증가 가능성 고려 필요** ← 주호소 직결 ①
2. **반복적 방광염 병력 환자는 SGLT2 억제제 시작 전 위험-편익 평가 권장** ← 주호소 직결 ①
3. 외음부 위생 교육 및 UTI 증상 모니터링 필요 ← 환자교육 ③

### 방식 A 효과 실증
- 이전 L2 재QA: indication/contraindication/reimbursement 섹션(임시 출처)이 LLM에 전달되어 DKA·Fournier·eGFR 일반 bullet 4개 출력. 주호소 UTI는 1개만.
- L2-patch 후: 3 임시 섹션이 **ctx 제외 (invisible)** → LLM이 notes(비뇨생식기 감염, Tier 1 Swanson 커버) 섹션만 봄 → **bullet 3개 전부 UTI·비뇨생식기 맥락**
- 4 → 3 bullets로 밀도 감소, 대신 **전부 transcript 맥락에 직결**. 의사 주의력 집중화 달성
- Tier 1 정확 매핑 (편향이 아닌 결과)

### Missing 체크리스트 (참고)
- 현재 요로감염 증상(빈뇨, 배뇨시 작열감, 혈뇨) 여부
- 신기능 상태 및 eGFR 수치 확인
- 외음부 진찰

---

## 제품 철학 검증 (tacit/completeness-is-burden.md)

| 철학 | 적용 결과 |
|---|---|
| 모든 정보 노출 원칙 아님 | ✓ 임시 섹션 invisible. Guide bullet 4→3 |
| 대화 맥락 우선 | ✓ 시나리오 3 주호소 직결 bullet 2/3 |
| 빠져도 문제 없음 | ✓ LPR v2 ENT교수 TIPS 미노출 수용 |
| 완결성 추구는 부담 | ✓ 임시 섹션 공식 라벨화 시도 철회 |

---

## 발견 / 관찰

- **편향 반전 해소** — 방식 A가 부수 효과로 Tier 1 쏠림 문제도 해결. 임시 섹션이 LLM에 전달되지 않으니 TIPS 라벨을 붙여 출력할 섹션 자체가 감소
- **LLM 변동성** — 시나리오 1A·3 모두 bullet 내용 미세 변동 있음. 다만 bullet **내용 방향**은 일관 (L2 효과는 흔들리지 않음)
- **LPR v2 TIPS bullet 미채택** — LPR-consensus Tier 1 풍부할 때 v2 v1 병렬 엔트리의 TIPS 섹션 LLM이 경시 경향. 필요 시 다음 세션에서 관찰 누적

---

## 다음 작업 후보

**Option A: L1 Phase B2·B3 (Easy·Medium 9 unique 마이그레이션)**
- BPPV·dizziness·후각계열·구강병변·경부종괴 등
- 1-2 세션 추가. 범위 넓지만 Easy 위주라 속도 빠름

**Option B: L3 (스모크 자동화)**
- 부팅 시점 assertion + TRIAGE fixture runner
- 현재 회귀 감지 수동. L3 들어가면 다음 변경 회귀 즉시 감지
- 1 세션

**Option C: L2 관찰 보강 (LPR TIPS bullet 미채택 현상)**
- curation prompt에 "같은 엔트리 내 TIPS by {이름/소속} 섹션이 있으면 최소 1 bullet 고려" 지시 추가
- 국소 수정. 1 세션의 일부

**권장: B → A → C**
- B를 먼저 하면 A 진행 중 회귀 즉시 감지. β-prime 원안 "L3 Phase B1" 순서 부활
- A는 시간 분산 (2-3 세션에 나눠) 가능
- C는 Observation 한 번 더 누적 후 결정 (한 세션 샘플로 단정 금지)

---

## 세션 종료 체크리스트

1. 다음 세션 참조 필요? → YES (L3 Builder의 입력)
2. routine/trigger/CI 영향? → NO
3. 다른 브랜치 의존? → NO

⇒ main 머지 (L2-patch + L1 B1은 이미 commit `0d07e85` / merge `74275d3`. 이 결과 파일만 추가 merge)
