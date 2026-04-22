# L2 — LLM 계약 우선순위 prompt 설계서

> 입력: QA 결과 P0 #2 (TRIAGE miss) · P1 #3 (UTI bullet drop) · P1 #4 (TIPS 라벨 0건 매핑)
> 근본 원인 B: LLM 계약이 "금지"만, "우선순위" 없음
> 이 설계서는 **Layer 1 (v1 마이그레이션) 대기 없이 즉시 구현 허용** — prompt 국소 수정이라 v1/v2 양쪽에 무해

---

## 설계 원칙

1. **금지 규칙 유지, 우선순위 규칙 신설** — 기존 rule ⑤·⑦·⑧ 삭제 없음. 그 위에 "bullet 선택 우선순위" 상위 계층 추가
2. **공식 출처 라벨 3 class 명문화** — Tier 1 (학술 PMID) · TIPS · 임상 표준 (신설) 모두 1급 동등
3. **구·신 카테고리 공존 명시** — TRIAGE에 복수 감지 장려 + 관계 매트릭스 (LPR ↔ LPR-consensus 등)

---

## 변경 대상 파일 · 위치

| 파일 | 대상 | 현 라인 | 설계 변경 |
|---|---|---|---|
| `src/prompts.js` | TRIAGE_PROMPT | 카테고리 목록 섹션 위 | **"복수 감지 원칙" + 관계 매트릭스** 삽입 |
| `src/prompts.js` | KNOWLEDGE_CURATION_PROMPT | bullet 선택 규칙 섹션 | **우선순위 4단계** 삽입 (drop 규칙 위) |
| `src/prompts.js` | KNOWLEDGE_CURATION_PROMPT | 출처 라벨 섹션 | **공식 출처 3 class 명문화** |
| `agents/librarian.md` | Liby ingest 규칙 | 출처 섹션 | `임상 표준` 라벨 허용 추가 |
| `agents/auditor.md` (있다면) | 감사 규칙 ⑦ | 출처 미확인 탐지 | `임상 표준` 라벨은 통과 |

---

## 1. TRIAGE_PROMPT 개편

### 추가 삽입 (카테고리 목록 바로 위)

```
━━━ 감지 원칙 ━━━
- 단일 카테고리 선택 ❌. 환자 호소에 관련된 **모든** 카테고리를 감지.
- 구(舊) 카테고리와 신(新) 카테고리가 동일 증상군을 커버하면 **양쪽 모두 감지**. 중복 노출이 결론 편향보다 안전.

━━━ 구·신 관계 매트릭스 ━━━
- LPR · LPR-consensus: 만성 인후 증상에서 **양쪽 동시 감지** (v1 LPR은 경험적 치료, v2 LPR-consensus는 2025 진단 알고리즘)
- urticaria · 아나필락시스: 피부 발진만이면 urticaria, 전신 응급 징후 동반이면 양쪽 감지
- diabetes · sglt2-inhibitors · obesity: SGLT2 관련 처방 상담이면 3개 동시 감지
- heart-failure · heart-failure-referral · sglt2-inhibitors: 심부전 환자 SGLT2 추가 시 3개 감지
(관계 매트릭스는 bundle 변경 시 보강. 의심되면 감지하라 — 누락보다 중복이 안전)
```

### 산출 포맷 유지

`calcCategories` 배열 포맷은 그대로. 다만 예시에 복수 감지 샘플 추가:
```
예시: ["LPR", "LPR-consensus"] 또는 ["heart-failure", "sglt2-inhibitors", "vaccination"]
```

---

## 2. KNOWLEDGE_CURATION_PROMPT 개편

### 추가 삽입 (기존 rule 목록 최상단)

```
━━━ bullet 선택 우선순위 (필수 준수) ━━━
각 bullet을 출력할지 결정할 때 아래 우선순위를 적용:

① 환자 주호소·우려 직결 bullet (최우선. DROP 절대 금지)
   예) 환자가 "작년에 방광염 3번"이라고 호소 → sglt2-inhibitors 엔트리에서 UTI 관련 bullet을 **반드시** 출력
       transcript에서 명시된 우려 사항은 지식 엔트리에 대응 정보가 있으면 드롭하지 않는다.
       (단 그 bullet도 아래 공식 출처 라벨 3 class 중 하나를 sources[]에서 가져와야 한다. 출처 없는 정보 합성 금지.)

② RedFlag 동반 환자 맥락 (기왕력·복용 약·가족력)
   예) "acute SOB with 심부전 병력" → ACS 감별 bullet 포함

③ Drug safety / 금기 / 환자 교육
   예) SGLT2i → DKA 경고·생활 지도

④ 일반 indication·protocol·monitoring
   예) SGLT2i 적응증·투약 프로토콜·신기능 모니터링

━━━ DROP 규칙은 위 4단계 이후에 적용 ━━━
- ① 단계에서 sources[] 출처가 없어도 drop 금지 (단, 출처 없는 경우 `[출처: 임상 표준 — 관례적 진료]` 라벨 사용 가능)
- ② 이하에서만 기존 rule ⑧ (sources 미일치 bullet drop) 적용
```

### 추가 삽입 (출처 표기 규칙 섹션)

```
━━━ 공식 출처 라벨 3 class (전부 1급 동등) ━━━
(knowledge/sourcing-rules.md 공식 체계 준수 — 신설 라벨 없음, 기존 체계 prompt 반영)

1. **Tier 1 — 학술 논문 / 가이드라인 / 규제**
   형식:
     - 논문: `[출처: {저자} et al. {저널} {연도};{권}({호}):{페이지}. PMID:{번호}]`
     - 가이드라인: `[출처: {기관명} {연도} — {가이드라인명} (DOI:...)]`
     - 규제: `[출처: 심평원 고시 YYYY-제N호]`
   예: `[출처: Swanson J et al. Am Fam Physician 2026;113(3):281-282. PMID:41839088]`
   sourcing-rules.md tags: `[CLINICAL]` · `[REGULATORY]`

2. **TIPS — by {이름/소속}** (실전 노하우)
   형식: `[출처: TIPS — by {이름/소속}]`
   예: `[출처: TIPS — by ENT교수]` · `[출처: TIPS — by 로컬원장님]` · `[출처: TIPS — 교수님 외래 참관]`
   범위: 임상적으로 확립된 실전 관례 (Epley maneuver · 경험적 PPI · 뮤테란 off-label · 가글 제조법 등)
   sourcing-rules.md tags: `[TIPS]` · `[INSIGHTS]`

3. **TIPS — 일반 약리 지식**
   형식: `[출처: TIPS — 일반 약리 지식]`
   범위: 약품 공식 정보 (indication·contraindication·reimbursement). sglt2·vitamin-d ingest에서 공식화
   (sourcing-rules.md에 추가 등재 필요 — 2 class의 sub-form으로)

━━━ 위 3 라벨 중 하나가 sources[]에 있으면 bullet 출력 가능 ━━━
- 없으면 `[출처 미확인]` 태그 금지 (지식 부족 시 bullet 자체를 drop)
- `[출처 미확인]` 태그는 원본에만 사용 (investigational). bullet 출력에 쓰지 않음
```

### Tier 편향 완화 (추가 지시)

```
━━━ Tier 편향 금지 ━━━
- TIPS 라벨 섹션과 `임상 표준` 라벨 섹션도 **Tier 1과 동일 우선순위**로 다룬다.
- 한 엔트리에 Tier 1 + TIPS + 임상 표준이 혼재할 때, 주호소 직결이면 모든 라벨의 bullet을 고루 출력.
- "학술 출처가 더 확실" 판단 금지. 공식 라벨 3 class는 동등.
```

---

## 3. Auditor / Liby 규칙 업데이트

### `knowledge/sourcing-rules.md` 갱신
2 class `[TIPS — 일반 약리 지식]` sub-form을 공식 등재:
- 기존 `[TIPS — by {이름/소속}]` 옆에 `[TIPS — 일반 약리 지식]` (약품 공식 정보) 추가
- 사용 범위 명시: indication·contraindication·reimbursement 등 약품 공식 정보 시스템 기반

### `agents/librarian.md`
기존 체계 재확인 주석 추가 (신규 규칙 없음):
- v1 엔트리를 v2로 승격할 때 원본 md의 `[TIPS — by XXX]` 라벨을 `sections[k].sources[]`에 그대로 이식
- 이식 유실 방지 — 2026-04-22 L1b 마이그레이션 시 강조

### `agents/auditor.md` (있으면)
규칙 ⑦ 현행 유지 (`[출처 미확인]` 자의 태깅 0건). 기존 `[TIPS — by XXX]`·`[TIPS — 일반 약리 지식]`는 이미 공식 출처로 통과 중 — 수정 없음.

---

## 기대 효과 (QA P0/P1 매핑)

| QA 결함 | L2 해결 경로 |
|---|---|
| P0 #2 TRIAGE LPR-consensus miss | 감지 원칙 "복수 감지" + 관계 매트릭스에 LPR ↔ LPR-consensus 명시 |
| P1 #3 UTI bullet drop | bullet 우선순위 ① "주호소 직결 drop 금지" 신설 |
| P1 #4 TIPS 라벨 0건 매핑 | 3 class 동등 선언 + Tier 편향 금지 지시 |

---

## Builder 실행 순서

**Phase B1** — prompts.js 개편 (L2 단독)
- 위 3개 섹션 삽입. 각 prompt 문서의 코멘트 블록에 `Phase L2 - 2026-04-XX` 태그
- cache-bust `prompts.js?v=L2-contract`

**Phase B2** — agents 규칙 업데이트
- `agents/librarian.md` · `agents/auditor.md` (있다면)
- Boss에 영향 없음 (전략 리뷰 레벨)

**Phase B3** — 즉시 재QA (QA 가이드 시나리오 1·3·4·5 우선)
- LPR-consensus 감지 복구 / UTI bullet 노출 / TIPS bullet 매핑 검증
- **주의**: L1 마이그레이션 미완 상태이므로 LPR v1 fallback은 여전히 깨져 있음. 재QA에서 LPR-consensus가 감지되면 v2 경로로 Guide 출력 정상 작동해야 함 (v1 fallback 경로는 L1 완료 후 검증)

---

## 리스크

| 리스크 | 완화 |
|---|---|
| 우선순위 ① "drop 금지"가 오작동 (주호소에 관련 없는 bullet이 출처 없이 출력됨) | 예시 명확화. "transcript에 명시된 우려" 한정 |
| 관계 매트릭스가 bundle 변경마다 stale 됨 | L3 스모크로 대표 transcript 샘플에서 기대 카테고리 set 검증 (stale 감지) |
| `[TIPS — by XXX]` 라벨이 남용되어 근거 없는 처방이 공식화 | sourcing-rules.md 현행 규정(학술 PMID 있으면 Tier 1 우선) 유지. Auditor 랜덤 샘플링 |
| prompt 길이 증가로 token 비용·latency 증가 | 실측 후 과다하면 관계 매트릭스를 표 형식으로 압축 |

---

## L1·L3 의존성

- **L1에서 기대**: v1 엔트리 마이그레이션 시 원본 md의 `[TIPS — by XXX]` 라벨을 sections[k].sources[]에 그대로 이식 (L1b Phase B1에서 LPR·xerostomia·BMS 적용 — 신설 라벨 없음)
- **L3에서 기대**: TRIAGE 스모크 fixture가 관계 매트릭스 검증 (LPR transcript → 2 categories 기대)
