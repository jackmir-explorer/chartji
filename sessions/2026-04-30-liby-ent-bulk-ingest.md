# 2026-04-30 — Liby ENT Bulk Ingest (~64 항목, 8 batch)

## 세션 정보
- 날짜: 2026-04-30
- 작업: 미르 raw ENT/clinical TIPS 약 64개 항목 분할 ingest. researcher 11건 검증 + 8 batch commit.
- 건드린 파일:
  - knowledge/by-disease/ — 신규 12 + 보강 9 (총 21)
  - src/knowledge-bundle.js — 신규 v2 entries 다수, alias 덮어씀 패턴
  - src/prompts.js — TRIAGE calcCategories +14
  - src/index.html — 캐시 키 0430-ingest → 0501-ent-bulk

---

## 진행

### Researcher 검증 (4 agent 병렬, 11건)
| Claim | 신뢰도 | 결과 |
|---|---|---|
| 부비동염 항생제 ladder | LOW | 매크로라이드 step-up → alternative만 (S.pneumo 내성 30%) |
| ABRS 1개월 항생제 | LOW | 표준 5-10일, 누적 1개월이 break point로 framing |
| Dupixent 후각 회복 | HIGH | AS-IS (PMID 31543428, 34628065) |
| 헥사메딘 칸디다 | MEDIUM | 보조 가글, 1차는 nystatin/디플루칸 |
| Eagle syndrome | HIGH | AS-IS, tonsillar fossa palpation 정확 |
| 비염 cryotherapy 50% | LOW (claim) | 메타 ~71%, 12개월 지속 정정 |
| 음역대 500-2000Hz | LOW (전반) | 회화 250-4000Hz, 가청 20-20000Hz로 정정 |
| Myoclonic tinnitus → Baclofen | LOW-MEDIUM | 1차 clonazepam/carbamazepine, baclofen 2차 |
| 보청기 미착용 → 신경 퇴화 | MEDIUM-HIGH | central plasticity 저하 + dementia risk로 정정 |
| 침/콧물 1L → 60대 50% | LOW | 정량 단정 제거, polypharmacy first |
| Advantan + 오큐플렉스 1:1 | MEDIUM | 오큐플렉스 → 오큐프록스(ofloxacin) brand 정정, perforation 금기 |

### Batch별 commit

| Batch | 영역 | 항목 | 신규 | 보강 | commit |
|---|---|---|---|---|---|
| 4 | 비강·축농증 | 17 | sinusitis, epistaxis, sleep-apnea | allergic-rhinitis, hyposmia | 63efa84 |
| 5 | 이명·청력 | 10 | tinnitus, hearing-loss | — | fe94606 |
| 7 | 메니에르·저주파·돌발성 | 9 | meniere, sudden-hearing-loss | low-freq-hearing-loss (v1→v2) | b22f1aa |
| 6 | 어지럼·BPPV·외이도염 | 7 | vestibular-neuritis, otitis-externa | dizziness, BPPV (v1→v2) | bca780c |
| 3 | 후두·LPR | 7 | laryngitis, eagle-syndrome | dysphonia, LPR | 305d02a |
| 1 | 구강·혀 | 7 | — | oral-lesion, burning-mouth, dry-mouth | 17ea307 |
| 2 | 경부·갑상선·타석 | 5 | thyroid-fna-cnb, salivary-gland-stones | neck-mass (v1→v2) | 1075442 |
| 8 | 횡단 임상 메모 | 2 | — | prescribing-cascade, palliative-pain | 9136018 |

### Bundle 통계
- 시작: ~220 entries
- 종료: **294 entries** (alias 포함)
- 신규 v2 disease/topic entry: 13
- 보강된 v2 entry: 9
- v1 → v2 마이그레이션: 4 (low-freq-hearing-loss, BPPV, dysphonia, neck-mass)

### TRIAGE calcCategories 추가 (14)
sinusitis, epistaxis, sleep-apnea, tinnitus, hearing-loss, low-freq-hearing-loss, meniere, sudden-hearing-loss, vestibular-neuritis, otitis-externa, laryngitis, eagle-syndrome, thyroid-fna-cnb, salivary-gland-stones

---

## 핵심 결정

### 1. researcher 검증 항목 — 가이드라인 위배 처리
미르 결정 (옵션 B): 부비동염 항생제 ladder는 **가이드라인 정렬로 수정**. 매크로라이드 step-up은 IDSA 위배라 alternative 분기로 이동. 미르 routine은 [TACIT — guideline-vs-practice] 태그로 일부 보존.

### 2. 자유 섹션 + uiHooks override 패턴
미르 임상 패턴을 standard vocabulary에 안 들어가는 형태로 보존하기 위해 자유 섹션 활용:
- `clinical-pattern` (allergic-rhinitis)
- `procedure` (allergic-rhinitis: cryotherapy)
- `nar-treatment` (allergic-rhinitis: 노인 NAR 리노벤트)
- `follow-up-schedule` (BPPV, LPR — vocabulary 표준)
- `elderly-mir-tips` (prescribing-cascade)
- `counseling` (palliative-pain — vocabulary 표준)

자유 섹션은 uiHooks 명시적 오버라이드 필수 — librarian.md GOTCHA 준수.

### 3. v1 → v2 alias 패턴 마이그레이션
v1 형식 entry들 (BPPV, neck-mass, dysphonia, low-freq-hearing-loss, oral-lesion, burning-mouth, xerostomia)을 bundle 끝에 신규 v2 entry로 등록 → alias 덮어쓰기. v1 원본은 코드에 남아있지만 KNOWLEDGE_BUNDLE 키는 v2가 최종 우선.

### 4. brand 명 정정 (오큐플렉스 → 오큐프록스)
researcher가 발견한 미르 raw text의 단순 오기. ofloxacin 안연고 = "오큐**프록**스" (Ocuflox)로 정정.

---

## 결과
- **판정: 통과**
- 모든 batch syntax validation OK (node eval)
- bundle entries 294, 모든 신규/보강 sections 정상
- index.html 캐시 키 갱신 (0501-ent-bulk)

## 다음 작업
- 옵시디언 vault에서 신규 21 md 파일 그래프뷰 확인
- 다음 cron 시 새 entries에 대한 detectedCalcs 동작 모니터링
- D-7 즈음 (2026-05-07) Mir-Tier 1 scout routine 재검증과 함께 ENT bulk 활용도 점검

## 회고
- **예상과 달랐던 점**: researcher 검증에서 "음역대 500-2000Hz"·"60대 침 50% 감소" 같은 raw 항목이 실제로는 부정확 — 미르 raw 자체에도 검증이 가치있음을 확인. 단순히 ENT 교수 출처라고 무비판 ingest하지 않은 결정이 정확
- **분할 batch 효과**: 17개 항목 batch 4부터 시작했지만 영역별 분할이 commit 단위·롤백 안전성에 좋았음. 한 번에 64개 commit이었으면 syntax 오류 시 큰 작업 손실
- **자유 섹션 + uiHooks override 부담**: 작업량이 적지 않음. 표준 vocabulary 18개에 잘 맞춰서 작성하면 default uiHooks로 동작. 미르 임상 routine은 자유 섹션 비중이 큰데, kind:disease 기본값에서 자유 섹션 자동 노출 안 됨 — librarian.md GOTCHA 잊지 않고 매번 override 명시 필요
- **다음 세션 반영**: ENT 영역은 한 번에 ingest 끝났고, 향후 새 ENT raw 들어오면 기존 entries 보강 우선 (신규보다)
