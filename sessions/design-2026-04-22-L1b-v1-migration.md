# L1b — v1→v2 마이그레이션 설계서

> 입력: `design-2026-04-22-L1a-v1-inventory.md` (12 unique · 10 broken · Easy 9·Medium 3)
> 미르 결정: Aliasing **(a) 참조 공유**, 출처 **(3 정정) — 신설 없음, 원본 md의 `[TIPS — by XXX]` 라벨을 `sections[k].sources[]`에 이식 (knowledge/sourcing-rules.md 체계 준수)**
> 목표: v1 fallback 영구 제거. handleCuration·generateWorkingDraft v1 분기 삭제.

---

## 설계 원칙

1. **단일 스키마 (v2 only)** — 마이그레이션 완료 시점에 `src/app.js` v1 fallback 블록(line 180-183, 136-141) 삭제. 원인 A 영구 제거
2. **참조 공유 aliasing** — unique 객체 1개 선언 후 여러 키가 같은 객체 참조. 수정 1회로 모든 alias 동기화
3. **출처는 원본 md의 `[TIPS — by XXX]` 라벨 이식** — 신설 라벨 없음. knowledge/sourcing-rules.md 체계 준수. Liby가 v1→v2 이식 시 원본 md의 섹션 헤더·inline 라벨을 `sections[k].sources[]`에 그대로 기록 (2026-04-22 반복 반성 — 설계 전 원본 확인 의무 feedback 메모리 참조)
4. **원문 보존 우선** — 섹션화는 내용 재구성이 아니라 재배열. 내용 추가는 최소 (기존 텍스트 분해만)

---

## 공통 v2 섹션 키 표준

v1 필드 → v2 섹션 매핑 표준:

| v1 필드 | v2 섹션 키 | 비고 |
|---|---|---|
| `exam` | `exam` | 그대로 |
| `treatment` | `treatment` | 그대로. 길면 `indication`·`protocol`·`monitoring`로 분할 (엔트리별 결정) |
| `differential` | `differential` | 그대로 (현 v2 엔트리에도 이 키 일부 사용 — 표준화) |
| `draftAppend` | `draftAppend` | 공백이면 섹션 생략 |

**표준 uiHooks 기본값**:
```js
uiHooks: { guide: ["*"], draft: ["treatment","draftAppend"], draftAppend: ["draftAppend"] }
```
(Phase 6 이후 uiHooks 기본값 상속 로직이 있으므로 생략 가능한지는 Builder 시 확인)

---

## Aliasing 참조 공유 패턴 (결정 a)

파일 구조:
```js
// --- LPR 엔트리 (unique 본체) ---
// 원본: knowledge/by-disease/LPR.md (라벨 `[TIPS — by ENT교수]` 확인)
var _LPR_v2 = {
  kind: "disease",
  primarySources: [],  // Tier 1 학술 없음 — Tier 2만 있음 (sourcing-rules.md 허용 패턴)
  sections: {
    treatment: {
      content: "PPI 표준용량 BID 8-12주 경험적 치료 + 뮤테란 등 점액용해제 병용...",
      sources: ["[TIPS — by ENT교수]"]  // 원본 md의 섹션 헤더 라벨 그대로 이식
    }
  },
  uiHooks: { guide: ["*"], draft: ["treatment"] }
};

// 참조 공유 (3 aliases)
KNOWLEDGE_BUNDLE["LPR"] = _LPR_v2;
KNOWLEDGE_BUNDLE["후두염"] = _LPR_v2;
KNOWLEDGE_BUNDLE["인후두역류"] = _LPR_v2;
```

장점:
- 한 엔트리 수정 시 3 keys 자동 반영
- 번들 크기 감소 (33 → 12 실질 객체)
- LLM이 triage 감지에서 3 키 중 어느 것을 잡아도 동일 ctx

주의:
- 참조 공유 후 객체 mutation 금지. 내용 변경은 unique 본체 변수에만 가해야 함 (`_LPR_v2.sections.treatment.content = ...` 같이)
- `aliasOf` 추가 안 함 — bundle 키는 내용 검색/이관에서 단순함 유지

---

## 12 unique 엔트리 섹션 분해 계획

### Priority 1 — Guide broken 3개 (즉시 처리)

| unique | aliases | 현 v1 내용 (treatment만) | v2 섹션 계획 |
|---|---|---|---|
| **LPR** | LPR, 후두염, 인후두역류 | treatment 172자 | `treatment` (1 섹션). LPR-consensus와 공존 전제 — 중복 inject 주의는 L2에서 |
| **xerostomia** | 구강건조증, 구강건조, dry mouth, xerostomia | treatment 228자 | `treatment` (1 섹션) — 처방·생활지도 분리 가능하면 `protocol`·`patient_education` 분리 검토 |
| **BMS** | burning mouth, 구강작열감, BMS | treatment 138자 | `treatment` (1 섹션) |

### Priority 2 — Easy 9개 (정상 작동 중, 표준화)

| unique | aliases 수 | v2 섹션 계획 |
|---|---|---|
| 후각감퇴 (후각저하 포함) | 2 | `exam`·`treatment`·`differential` (3 섹션) |
| 후각기능저하 | 1 | 위와 동일 스키마, 내용만 상이 — 본체 병합 검토 (별 엔트리로 유지할 가치 없으면 통합) |
| hyposmia 군 (anosmia·후각소실·냄새 못맡음) | 4 | `exam`·`treatment`·`differential` |
| BPPV (이석증 포함) | 2 | `exam`·`treatment` (Epley 중심) |
| 후각감퇴·후각기능저하·hyposmia 통합 검토 | — | 3 unique → 1 unique 병합 가능성 **Builder 시점 판단** |

### Priority 3 — Medium 3개 (재구성)

| unique | aliases | v1 분포 | v2 섹션 계획 |
|---|---|---|---|
| dizziness (어지럼증·vertigo 포함) | 3 | exam+differential | `exam`·`differential` 2섹션. treatment 없음 유지 |
| 구강병변 군 (oral white patch·구강궤양·lichen planus) | 4 | exam·treatment·differential | **aliasing 재검토** — lichen planus는 실은 별질환. Builder 시 분리 여부 결정 |
| 경부종괴 군 (neck mass·림프절염·lymphadenitis) | 4 (2 unique) | exam·treatment·differential | 경부종괴/neck mass는 공통 객체. 림프절염/lymphadenitis는 별도 unique (L1a 시그니처 결과). 2 unique 유지 |

---

## Builder 실행 순서

**Phase B1** — Priority 1 (3 unique · 10 keys) — 1 세션
- 원본 md 확인 → v2 번역 + 참조 공유 + 원본의 `[TIPS — by XXX]` 라벨을 `sources[]`에 이식
- 원본 md에 Tier 1 학술 출처가 있으면 `primarySources[]` 채움. 없으면 빈 배열 유지
- Chrome QA 시나리오 1 A/B 재검증 (LPR 경로 즉시 복구 확인)

**Phase B2** — Priority 2 (6~7 unique · ~13 keys) — 1-2 세션
- 후각·BPPV 계열 통합
- 통합 시점에 "후각감퇴 = 후각기능저하 = hyposmia" 병합 여부 결정 (원문 유사성 비교)

**Phase B3** — Priority 3 (3 unique · 10 keys) — 1 세션
- dizziness·구강병변·경부종괴 계열
- lichen planus 분리 여부 결정

**Phase B4** — v1 fallback 코드 삭제 — 30분
- `src/app.js:136-141` (generateWorkingDraft v1 블록) 삭제
- `src/app.js:180-183` (handleCuration v1 블록) 삭제
- 삭제 후 `typeof KNOWLEDGE_BUNDLE !== "undefined"` 상위 조건은 유지 (페이지 부팅 시점 레이스)
- 삭제 전 L3 스모크(ctx 빌드 assertion) 통과 확인 필수 — 남은 v1 엔트리가 있으면 조용히 망가짐

---

## 리스크

| 리스크 | 완화 |
|---|---|
| 참조 공유 후 누군가 mutation → 3 키 전부 깨짐 | 주석에 경고 + `Object.freeze` 고려 (단 freeze는 deep 아님 주의) |
| Priority 2 통합 시 내용 일부 유실 (후각감퇴↔hyposmia) | 원문 diff 기록 (세션 기록에 포함) · 미르 사전 리뷰 |
| B4 (fallback 삭제) 시점에 숨어있는 v1 엔트리 미처리 | L3 스모크 pass 필수 조건화 |
| 원본 md의 `[TIPS — by XXX]` 라벨 유실 (Phase B 이식 누락) | Liby 이식 시 "원본 md grep → 라벨 추출 → sources[] 기록" 체크리스트. Auditor 규칙 ⑦는 현행 그대로 유지 |

---

## 산출물

1. `src/knowledge-bundle.js` — v1 엔트리 33개 → v2 unique 객체 12개 + 참조 공유
2. `src/app.js` — v1 fallback 블록 2개 삭제 (Phase B4)
3. `src/index.html` — cache-bust `knowledge-bundle.js?v=v1-migration`
4. `knowledge/index.md` — v2 승격된 엔트리 등재 갱신
5. `sessions/2026-04-XX-v1-migration-{B1,B2,B3,B4}.md` — Builder 세션 기록

---

## L2·L3 의존성

- **L2로 넘길 것**: KNOWLEDGE_CURATION_PROMPT에 공식 출처 3 class (Tier 1 학술 / TIPS — by XXX / TIPS — 일반 약리 지식) 명문화. knowledge/sourcing-rules.md에 `TIPS — 일반 약리 지식` sub-form 추가 등재
- **L3으로 넘길 것**: ctx 빌드 스모크 (Phase B4 전제 조건). TRIAGE 스모크 (Phase B1 후 LPR·LPR-consensus 공존 검증)
