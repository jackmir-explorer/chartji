# 2026-04-22 — L2-patch (방식 A: 임시 라벨 invisible) + L1 Phase B1 (LPR·xerostomia·BMS v2 승격) — Builder

## 세션 정보
- 날짜: 2026-04-22
- 작업: (1) L2 prompt 공식 출처 3 class → 2 class 축소 + 임시 라벨 invisible drop / (2) Guide broken 3 unique(LPR·xerostomia·BMS) v2 참조 공유 승격
- 건드린 파일:
  - `src/prompts.js` (KNOWLEDGE_CURATION_PROMPT 3 class → 2 class)
  - `knowledge/sourcing-rules.md` (`[TIPS — 일반 약리 지식]` → `[TIPS — 임시 (보강 대상)]` 임시 라벨 재정의)
  - `src/app.js` (handleCuration — 임시 라벨 섹션 ctx skip)
  - `src/knowledge-bundle.js` (라벨 rename 4건 + v1 9 entry 제거 + v2 참조 공유 3 unique 추가)
  - `src/index.html` (cache-bust `knowledge-bundle.js?v=L2patch-B1`, `prompts.js?v=L2patch`)

---

## 배경 · 제품 철학

메모리 `tacit/completeness-is-burden.md` 재확인. 정보 밀도 감소는 feature, not bug. 불완전 정보는 visible 노출보다 **invisible drop**. `[TIPS — 일반 약리 지식]`을 공식 1급 3 class로 등재했던 것은 Liby 임시 placeholder를 영구 공식화한 실수 — 미르 교정.

---

## 작업 1 — L2-patch 변경 상세

### 1-a · `src/prompts.js` KNOWLEDGE_CURATION_PROMPT

- "공식 출처 라벨 **3 class** → **2 class**"로 축소:
  - 1. Tier 1 — 학술 논문 / 가이드라인 / 규제 (유지)
  - 2. TIPS — by {이름/소속} (유지)
  - ~~3. TIPS — 일반 약리 지식~~ **삭제**
- "Tier 편향 금지" 블록: "일반 약리 지식" 언급 제거, `by {이름/소속}`만 남김. 숫자 "3 class" → "2 class" 갱신
- 섹션 헤더 `==공식 출처 라벨 3 class==` → `==공식 출처 라벨 2 class (Phase L2-patch - 2026-04-22, 전부 1급 동등)==`
- `임상 표준` 관련 언급 추가 스캔 — 없음 확인

### 1-b · `knowledge/sourcing-rules.md`

기존 `[TIPS — 일반 약리 지식]` "1급 동등" 선언 블록을 **임시 라벨**로 재정의:

- 라벨: `[TIPS — 임시 (보강 대상)]`
- 용도: Tier 1 주제 범위 밖 섹션을 Liby ingest 시 임시 placeholder로 저장
- 처리: `sections[k].sources[]`에만 저장, **Guide tab curation ctx·LLM·UI에 전달되지 않음 (invisible)**. Auditor·Phase 5b 주기로 정식 출처로 교체
- 공식 1급 아님 — 공식 출처 2 class와 별개의 임시 marker

### 1-c · `src/app.js` handleCuration — 임시 라벨 ctx skip

v2 경로 `keys.forEach` 루프 안에 필터 추가:

```js
if(s.sources&&s.sources.length){
  var allTemp=s.sources.every(function(src){
    return typeof src==="string"&&src.indexOf("[TIPS — 임시")===0;
  });
  if(allTemp) return;
}
```

- 섹션의 `sources[]` 전부가 `[TIPS — 임시`로 시작하면 해당 섹션을 `knowledgeCtx`에 포함하지 않음 (early return)
- 정상 라벨과 혼재 시 포함 (예외 데이터 이상)
- `primarySources`는 영향 없음 (파일 전체 대표 출처 — 임시 저장 안 함, sglt2/vitamin-d 모두 Tier 1 유지)

### 1-d · `src/knowledge-bundle.js` 라벨 rename (4건)

`replace_all`로 `[TIPS — 일반 약리 지식]` → `[TIPS — 임시 (보강 대상)]`:

- `sglt2-inhibitors.indication.sources[0]`
- `sglt2-inhibitors.contraindication.sources[0]`
- `sglt2-inhibitors.reimbursement.sources[0]`
- `vitamin-d.dosing.sources[0]`

엔트리 주석 문구도 "일반 약리 지식" → "임시 (Phase 5b 보강 대상) — [TIPS — 임시 (보강 대상)] 라벨" 및 "임시 라벨 섹션은 Guide tab curation ctx에 전달되지 않는다 (invisible, L2-patch 2026-04-22)" 추가.

---

## 작업 2 — L1 Phase B1 상세 (LPR·xerostomia·BMS v2 승격)

### 원본 md 확인 결과 — TIPS 라벨 전수

| 원본 md | Tier 1 출처 | TIPS 라벨 / 섹션 태그 |
|---|---|---|
| `knowledge/by-disease/LPR.md` | `Yadlapati R et al. Am J Gastroenterol 2025. PMID:40197644` (San Diego Consensus — 별도 `LPR-consensus` v2 엔트리가 커버) | `[CLINICAL]` · `[CLINICAL + TIPS]` · `[TIPS — by ENT교수, 거담 off-label 사용]` · `[TIPS — by ENT교수]` (PPI 부작용 대안) |
| `knowledge/by-disease/dry-mouth.md` | `[출처: NEJM 1993 Leveque et al., Salagen SPC]` · `[출처: Sio TT et al. Mayo Clin Proc 2019]` | `[CLINICAL/INSIGHTS]` 섹션 태그. 임상패턴 BID·일반 가글은 `[출처 미확인]` — 원문 인라인 보존 |
| `knowledge/by-disease/burning-mouth.md` | `[출처: Kim JW et al. Sci Rep 2025]` | `[CLINICAL]` 섹션 태그 |

**결론**: 신설 라벨 없음. 원본 md의 Tier 1 논문·`[TIPS — by ENT교수]`·`[출처 미확인]`을 그대로 이식. 임시 라벨 사용 안 함 (원본 md 라벨이 이미 공식 2 class 또는 투명한 `[출처 미확인]`).

### 섹션 분해 계획 · 실제 반영

#### ① LPR (3 aliases: LPR, 후두염, 인후두역류)

v1 내용(PPI 경험적 치료 + 뮤테란 + PPI 부작용 대안 172자)를 v2 `treatment` 단일 섹션에 그대로 재구성. `primarySources: []` (원본 Tier 1인 San Diego Consensus는 별도 `LPR-consensus` 엔트리가 담당. TRIAGE에서 양쪽 동시 감지 매트릭스 이미 구성됨 — `prompts.js` TRIAGE_PROMPT). `treatment.sources: ["[TIPS — by ENT교수]"]`.

```js
var _LPR_v2 = {
  kind: "disease",
  keywords: ["LPR","후두염","인후두역류","laryngopharyngeal reflux","역류성후두염"],
  primarySources: [],
  sections: {
    treatment: {
      content: "PPI (1차 치료, 근거 확립)\n뮤테란(아세틸시스테인 경구) 병용 — LPR 인후 분비물·점액 거담 목적 (off-label)\nPPI 부작용 시:\n① 알긴산(Gaviscon류) — raft 형성, 역류 물리적 차단\n② Promac(polaprezinc) — 위점막 보호제. 알긴산과 병용 가능",
      sources: ["[TIPS — by ENT교수]"]
    }
  },
  uiHooks: null
};
KNOWLEDGE_BUNDLE["LPR"] = _LPR_v2;
KNOWLEDGE_BUNDLE["후두염"] = _LPR_v2;
KNOWLEDGE_BUNDLE["인후두역류"] = _LPR_v2;
```

#### ② xerostomia (4 aliases: 구강건조증, 구강건조, dry mouth, xerostomia)

원본 md에 Pilocarpine 섹션과 뮤코미스트 가글 섹션이 나뉘어 있어 두 출처가 다름 → v2 섹션 2개로 분할 (`treatment` · `treatment.gargle`). Tier 1 2개(NEJM 1993·Salagen SPC / Sio TT Mayo Clin Proc 2019)를 각 섹션 `sources[]`에 이식. 임상패턴 BID·일반 gargle의 `[출처 미확인]`은 원문 그대로 섹션 본문에 인라인 유지 (원본 md 존중). `primarySources: []` (파일 전체 대표 출처 없음 — 섹션별 근거가 다름).

#### ③ BMS (3 aliases: burning mouth, 구강작열감, BMS)

v1 138자 treatment를 그대로 v2 `treatment`에. Tier 1 `Kim JW et al. Sci Rep 2025`를 `primarySources[]`와 `treatment.sources[]` 양쪽 기재 (단일 섹션이라 Tier 1과 Tier 2 중복이지만, sourcing-rules.md "중복 금지" 원칙은 엄격 해석 시 Tier 2만 쓸 수도 있음 — 파일 전체 대표성이 명확하므로 `primarySources`에도 유지).

### v1 entry 삭제 (9개)

KNOWLEDGE_BUNDLE 객체 literal 내부에서 삭제:
- `"LPR"`·`"후두염"`·`"인후두역류"` (line 532-552)
- `"구강건조증"`·`"구강건조"`·`"dry mouth"`·`"xerostomia"` (line 462-489)
- `"burning mouth"`·`"구강작열감"`·`"BMS"` (line 490-510)

객체 literal 내부는 clean delete (주석 없음). v2 참조 공유 블록은 **파일 끝 `};` 뒤에** 선언형 `var _XXX_v2 = {...}; KNOWLEDGE_BUNDLE["key"] = _XXX_v2;` 패턴으로 추가 (L1 Phase B1 전용 블록, 주석 헤더 포함).

### 파일 내 위치 (수정 라인 범위)

knowledge-bundle.js:
- v1 9 entry 삭제: 기존 line 462-510 (xerostomia·BMS 7건) + line 532-552 (LPR 3건) → 빈 diff로 제거
- v2 참조 공유 블록 추가: 파일 끝 line 1816 이후 (기존 `};` 이후 약 80라인 추가)

app.js:
- handleCuration 루프 내 line 174-178 → 186-195 (임시 라벨 skip 블록 8라인 추가)

prompts.js:
- 236-264 라인 범위 (공식 출처 라벨 블록 전체 2 class 수정)

sourcing-rules.md:
- line 100-103 → 임시 라벨 블록 4라인 재정의

index.html:
- line 11·14 (cache-bust 2건)

---

## 리스크 · 주의 사항

1. **참조 공유 mutation 주의**: `_LPR_v2.sections.treatment.content = ...` 같이 unique 본체 변수에만 가해야 함. `KNOWLEDGE_BUNDLE["후두염"].sections.treatment.content = ...`로 변경해도 다 연결되지만 의도적 alias 경유만 허용.
2. **LPR vs LPR-consensus 공존**: TRIAGE_PROMPT line 26에 "LPR · LPR-consensus: 만성 인후 증상에서 양쪽 동시 감지"가 이미 명시돼 있어 구·신 내용이 모두 ctx로 흘러들어감. Guide tab bullet 중복 가능성 — L2 측 규칙이 중복 방지하므로 관망. QA에서 재검증 필요.
3. **xerostomia `[출처 미확인]` 인라인 유지**: sourcing-rules.md 규칙 ⑥ "원문이 [출처 미확인] 태그를 달고 있는 경우 그대로 보존" 준수. LLM이 자의로 생성하는 건 금지이므로 그대로 노출돼도 안전.
4. **원본 md `[TIPS — by ENT교수]` 라벨 이식 (1건)**: LPR v2. `sources[]` 배열 단일 원소로 기록. Auditor 규칙 ⑦ 통과.
5. **다른 v1 엔트리(30개)는 건드리지 않음** — B2·B3·B4는 이후 세션.
6. **v1 fallback 코드(app.js:180-183) 유지** — 30 v1 엔트리 계속 소비. B4에서 제거 예정.

---

## 판정

- Builder 단계 완료
- Reviewer·QA는 다음 단계 (재QA는 미르 세션에서 Chrome MCP로 시나리오 1/9 등 재검증)
- 커밋·main merge는 상위(미르 세션) 판단

## 다음 작업

1. QA — Chrome MCP 시나리오 1 (LPR/인후두역류 guide 복구 확인) + sglt2/vitamin-d 임시 섹션 invisible drop 확인
2. L1 Phase B2 — Priority 2 Easy 6~7 unique (후각·BPPV 계열)
3. Phase 5b — 임시 라벨 섹션(sglt2 indication·contraindication·reimbursement / vitamin-d dosing) 정식 출처 보강

## 회고

- 원본 md 확인 (feedback_pre_design_archaeology.md 준수) — LPR.md에서 `[TIPS — by ENT교수]` 라벨 발견. 신설 없이 이식만.
- xerostomia 2-섹션 분할은 설계서 Priority 1 "처방·생활지도 분리 검토"보다 더 보수적: 원본 md의 Pilocarpine/가글 2-블록 구조 그대로 따라감. 내용 재구성 최소 (원문 보존 우선).
- `[TIPS — 일반 약리 지식]` rename만으로 app.js 로직이 잡아낼 수 있게 라벨 prefix `[TIPS — 임시`로 일관화. 향후 임시 라벨 확장 여지 (예: `[TIPS — 임시 (Auditor)]`) 자동 지원됨.
