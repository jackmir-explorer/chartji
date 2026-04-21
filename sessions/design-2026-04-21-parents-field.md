# design-2026-04-21-parents-field.md — parents 메타 필드 도입

tags: DESIGNER
authors: Designer
status: 미르 승인 대기
prereq: Boss 승인안 C + Architect PASS(조건부 제약 9개)

---

## [DESIGNER 범위 체크]

- 단일 기능 단위: ✓ (child → parent 확장 하나)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (기존 주입은 유지, 누락만 보정)
- 이전 세션 완료: ✓ (Phase 5a main 반영)
- → **통과**

### Scope

- **In**: app.js 내부 `expandWithParents` 헬퍼 추가 · 5 inject 지점 `detectedCalcs` → `expandedCalcs` 대체 · knowledge-bundle.js 선별 엔트리에 `parents` 필드 추가 · 문서 3개 반영
- **Out**: hint/draft/guide 차등 확장 (Architect #4) · confidence 필터 · draftTemplate UI wiring · Liby skill 내부 파서 변경 · TRIAGE prompt 튜닝

---

## 1. `expandWithParents` 헬퍼

### 시그니처

```js
/* app.js 내부 순수 헬퍼. bundle consumer 로직 금지 (제약 1).
   input:  detectedCalcs (string[])
   output: expanded keys (string[]) — 원본 순서 유지 + parent는 child 뒤에 append, dedup. */
function expandWithParents(detected){
  if(!detected||!detected.length) return [];
  if(typeof KNOWLEDGE_BUNDLE==="undefined") return detected.slice();
  var out=detected.slice();
  detected.forEach(function(c){
    var e=KNOWLEDGE_BUNDLE[c]; if(!e||!e.parents) return;
    e.parents.forEach(function(p){
      if(KNOWLEDGE_BUNDLE[p]) out.push(p);  /* 제약 8: parent 미존재 silent-skip */
    });
  });
  return Array.from(new Set(out));  /* 제약 2: dedup 필수 */
}
```

### 의사코드

1. 빈 입력 → 빈 배열
2. `KNOWLEDGE_BUNDLE` 없음 → 원본 복사 (SSR/테스트 안전)
3. 원본을 `out`에 복사 (child 우선 순서 보존)
4. 각 child `c` 에 대해 `e.parents` 순회
   - `KNOWLEDGE_BUNDLE[p]` 존재 시 append (없으면 silent-skip, warning도 없음)
5. `Array.from(new Set(out))` 으로 dedup 후 반환 — 첫 등장 순서 유지

### 호출 패턴 (5 지점 공통)

```js
var expandedCalcs = expandWithParents(detectedCalcs);
```

- **캐싱**: DraftTab `draftHints` · TriagePanel `differentialShort` 두 곳은 `useMemo(..., [detectedCalcs])` 로 감싸 재계산 억제 (제약 5). 나머지 3 지점은 effect/callback 내부 — 일회성 호출이라 메모 불필요.

---

## 2. app.js 5개 inject 지점 변경 내역

Architect 제시 line 번호 기준 (현행 app.js 최신 반영). 모든 변경은 `detectedCalcs` → `expandedCalcs` 참조 치환 + 지역 변수 선언 추가.

### #1 Working Draft effect (line 150~196)

위험도: **낮음**. 캐시 키(`cacheKey`)는 `detectedCalcs.join(",")` 유지 — parents 확장은 동일 detectedCalcs에 대해 deterministic이므로 캐시 일관성 유지.

```js
/* old (line 166) */
if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&detectedCalcs.length){
  detectedCalcs.forEach(function(c){
    var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
    ...
```

```js
/* new */
var expandedCalcs=expandWithParents(detectedCalcs);
if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandedCalcs.length){
  expandedCalcs.forEach(function(c){
    var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
    ...
```

### #2 handleCuration (Guide tab, line 100~134)

위험도: **낮음**.

```js
/* old (line 104) */
detectedCalcs.forEach(function(c){
  var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
  ...
```

```js
/* new */
var expandedCalcs=expandWithParents(detectedCalcs);
expandedCalcs.forEach(function(c){
  var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
  ...
```

### #3 Guide tab auto-curation useEffect `hasKnowledge` 판단 (line 137~145)

위험도: **낮음**.

```js
/* old */
var hasKnowledge=typeof KNOWLEDGE_BUNDLE!=="undefined"
  &&detectedCalcs.some(function(c){return !!KNOWLEDGE_BUNDLE[c];});
```

```js
/* new */
var expandedCalcs=expandWithParents(detectedCalcs);
var hasKnowledge=typeof KNOWLEDGE_BUNDLE!=="undefined"
  &&expandedCalcs.some(function(c){return !!KNOWLEDGE_BUNDLE[c];});
```

### #4 DraftTab `draftHints` (line 494~516)

위험도: **중간** (drug 우선순위 규칙 상호작용 — §7 회귀 확인).

`useMemo` 으로 캐싱 (제약 5).

```js
/* old (line 494~516 IIFE) */
draftHints={typeof KNOWLEDGE_BUNDLE!=="undefined"&&detectedCalcs.length?(function(){
  var hasDisease=detectedCalcs.some(function(c){
    return KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].kind==="disease";
  });
  var parts=[];
  detectedCalcs.forEach(function(c){
    ...
  });
  return parts.length?parts.join("\n\n"):null;
})():null}
```

```js
/* new — App 함수 상단 useMemo */
var draftHints=React.useMemo(function(){
  if(typeof KNOWLEDGE_BUNDLE==="undefined") return null;
  var expanded=expandWithParents(detectedCalcs);
  if(!expanded.length) return null;
  var hasDisease=expanded.some(function(c){
    return KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].kind==="disease";
  });
  var parts=[];
  expanded.forEach(function(c){
    var e=KNOWLEDGE_BUNDLE[c]; if(!e) return;
    if(hasDisease&&e.kind==="drug") return;
    if(e.sections){
      var hooks=getUiHooks(e);
      (hooks.hint||[]).forEach(function(k){
        var s=e.sections[k];
        if(s&&s.content) parts.push(k+":\n"+s.content);
      });
    } else {
      if(e.treatment) parts.push("처방/치료:\n"+e.treatment);
      if(e.differential) parts.push("감별진단:\n"+e.differential);
    }
  });
  return parts.length?parts.join("\n\n"):null;
},[detectedCalcs]);
/* DraftTab props: draftHints={draftHints} */
```

> ⚠ **drug 우선순위 상호작용** — 위고비(drug) 단독 감지 → parents `["obesity"]` 확장 시 `hasDisease=true` 되어 위고비 hint가 **완전히 누락**됨. Boss 성공 기준 ②(위고비 hint dosing/contraindication 유지) 위반.
>
> **결정**: `hasDisease` 판정은 **parent 제외, 원본 `detected`만 기준으로 판단**한다 — 사용자가 실제로 detect 된 카테고리에서 disease가 있을 때만 drug 스킵.
>
> 수정된 판정:
> ```js
> var hasDiseaseOriginal=detectedCalcs.some(function(c){
>   return KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].kind==="disease";
> });
> ```
> 이후 `if(hasDiseaseOriginal&&e.kind==="drug") return;` — parent로 추가된 obesity(disease)는 판정에 영향 주지 않으므로 위고비 hint 유지.

### #5 TriagePanel `differentialShort` (line 622~632)

위험도: **낮음**.

```js
/* old */
differentialShort={typeof KNOWLEDGE_BUNDLE!=="undefined"&&detectedCalcs.length?(function(){
  var list=[];
  detectedCalcs.forEach(function(c){
    ...
  });
  return list.length?list:null;
})():null}
```

```js
/* new — App 함수 상단 useMemo */
var differentialShort=React.useMemo(function(){
  if(typeof KNOWLEDGE_BUNDLE==="undefined") return null;
  var expanded=expandWithParents(detectedCalcs);
  if(!expanded.length) return null;
  var list=[];
  expanded.forEach(function(c){
    if(KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].differentialShort){
      KNOWLEDGE_BUNDLE[c].differentialShort.forEach(function(item){
        if(!list.some(function(x){return x.d===item.d;})) list.push(item);
      });
    }
  });
  return list.length?list:null;
},[detectedCalcs]);
/* TriagePanel props: differentialShort={differentialShort} */
```

### #6 Draft Review `onReview` handler (line 523~531)

위험도: **낮음** (v1 엔트리만 knowledgeCtx 적립).

```js
/* old */
if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&detectedCalcs.length){
  detectedCalcs.forEach(function(c){
    ...
```

```js
/* new */
var expandedCalcs=expandWithParents(detectedCalcs);
if(typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandedCalcs.length){
  expandedCalcs.forEach(function(c){
    ...
```

### #7 Guide tab 노출 조건 (line 435)

위험도: **낮음**.

```js
/* old */
{typeof KNOWLEDGE_BUNDLE!=="undefined"&&detectedCalcs.some(function(c){return hasGuidableContent(KNOWLEDGE_BUNDLE[c]);})&&(function(){
```

```js
/* new — App 상단에 한 번 계산된 expandedCalcs 재사용 가능.
   단순화 위해 이 지점은 별도 IIFE에서 짧게 확장 */
{typeof KNOWLEDGE_BUNDLE!=="undefined"&&expandWithParents(detectedCalcs).some(function(c){return hasGuidableContent(KNOWLEDGE_BUNDLE[c]);})&&(function(){
```

### #8 GuideTab `detectedKeys` (line 544~546)

위험도: **낮음**.

```js
/* old */
detectedKeys={typeof KNOWLEDGE_BUNDLE!=="undefined"
  ? detectedCalcs.filter(function(c){return !!KNOWLEDGE_BUNDLE[c];})
  : []}
```

```js
/* new */
detectedKeys={typeof KNOWLEDGE_BUNDLE!=="undefined"
  ? expandWithParents(detectedCalcs).filter(function(c){return !!KNOWLEDGE_BUNDLE[c];})
  : []}
```

> 📋 **지점 요약**: 총 **8개 치환 지점** (Architect 명세 5개 + 부수 3개 — Guide 탭 노출 조건 #7, GuideTab detectedKeys #8, hasKnowledge #3 은 동일 효과 달성을 위해 필수 동반).

---

## 3. parents 필드 부여 대상 엔트리 목록

### 대상 선정 기준

1. Triage가 **하위(child)로 좁혀 감지할 가능성**이 있어 상위 문진·기저 맥락 주입 필요
2. parent 엔트리가 **현재 bundle에 실제 존재** — 미존재 시 silent-skip이지만 아예 등록 안 함 (제약 8)
3. Architect 제약 3 택일 결정 (§5) — **vaccination은 택일 (b)** 로 처리. 개별 백신 엔트리는 parents 부여 **하지 않는다** (Phase 5a schedule 섹션 참조 링크로 이미 간접 주입됨).

### 이번 세션 부여 (최소집합)

| child key (shape) | parents | 근거 |
|---|---|---|
| `BPPV` (v1) | `["dizziness"]` | 이번 세션 핵심 결함 해소 |
| `이석증` (v1) | `["dizziness"]` | BPPV 한글 alias |
| `위고비` (v2 drug) | `["obesity"]` | BMI·생활요법 등 상위 맥락 주입 |
| `wegovy` (v2 drug) | `["obesity"]` | 위고비 영문 alias |
| `마운자로` (v2 drug) | `["obesity"]` | 동일 |
| `mounjaro` (v2 drug) | `["obesity"]` | 동일 |
| `tirzepatide` (v2 drug) | `["obesity"]` | 동일 |
| `zepbound` (v2 drug) | `["obesity"]` | 동일 |
| `오젬픽` (v2 drug) | `["obesity"]` | 당뇨+체중 겸용 맥락 유지 — obesity 상위 주입 (*diabetes는 현재 bundle 미등록이라 silent-skip 대상으로 표현식에는 넣지 않음*) |
| `ozempic` (v2 drug) | `["obesity"]` | 동일 |

### 미부여 (이번 세션 out-of-scope)

- vaccine 개별 엔트리 — 제약 3 (b) 택일로 기존 schedule 참조 링크 유지
- dysphonia/urticaria 계열 — Triage 상/하위 구조 없음
- topic 엔트리 (`vaccine-interval`, `vaccination-summary`, `glp1`) — parent 개념 부적합

### shape 관계 (제약 6)

- **v1 child → v1 parent**: BPPV→dizziness. dizziness는 v1이므로 `e.treatment`/`e.differential`/`e.differentialShort` 경로로 주입. BPPV는 `exam`/`treatment`만. concat 순서: `[BPPV, dizziness]` — child 우선, parent는 뒤에 합쳐짐 (dedup).
- **v2 drug child → v2 disease parent**: 위고비→obesity. 위고비 hint는 sections(dosing/contraindication), obesity hint는 sections(protocol/indication/schedule). 각자 자기 uiHooks 경로로 독립 주입. shape 충돌 없음.

---

## 4. 제약 3 택일 결정 — vaccination 중복 inject

### 결론: **(b) parents 확장 시 dedup 검증**

### 근거

- **(a) vaccination schedule 참조 링크 간소화**는 md 본문 편집 → Liby ingest 재실행 필요. Phase 5a와 정합성 깨짐(개별 엔트리 참조 링크는 외부 사용자 참조용이기도 함).
- **(b) dedup** 는 이미 `expandWithParents`의 `Array.from(new Set(...))`으로 내장. 추가 작업 없이 현 구조 유지.
- 이번 세션에서 vaccination 계열은 **parents 필드를 부여하지 않음** → 애초에 중복 inject 조건이 발생하지 않음. (b) 는 사실상 "부여 제외 + dedup 보호" 라는 이중 안전망.
- 후속 세션에서 HPV → vaccination 같은 parent 관계가 필요해지면 그때 제약 3 재검토.

---

## 5. 제약 6 v1 확장 shape 정의

### Case A: BPPV(v1) 감지 → `expandedCalcs=["BPPV","dizziness"]`

- **Working Draft effect (#1)** 루프:
  - `BPPV`: `e.treatment` → `knowledgeCtx` append / `e.exam` 미사용 (v1 Working Draft 경로는 treatment/differential만 소비 — 현행 유지)
  - `dizziness`: `e.differential` → `knowledgeCtx` append (BPPV는 differential null)
- **DraftTab `draftHints` (#4)** 루프:
  - `BPPV`: v1 분기 → `e.treatment` / `e.differential` 있으면 append (differential null → treatment만)
  - `dizziness`: v1 분기 → `e.differential` 있으면 append (11항목 문진 포함된 exam은 v1 `draftHints` 경로에서 미소비 — **알려진 한계, Architect 제약 #4 "차등 확장 금지" 에 따라 이번 세션 범위 밖**)
- **TriagePanel `differentialShort` (#5)**: `dizziness.differentialShort` 6항목 주입 (BPPV 자체는 differentialShort null)
- **Guide tab handleCuration (#2)**: v1 분기 → `dizziness.exam` (11항목 문진) + `dizziness.draftAppend` 주입 → LLM curation에서 dizziness 문진 11항목 인지

concat 순서: **child 먼저, parent 뒤** — 기존 detectedCalcs 순서를 유지하고 parents가 뒤에 append되어 v1 `differentialShort.some(x=>x.d===item.d)` dedup 로직이 **child 기준 선보존** → BPPV의 자체 dif이 먼저 등록되고 dizziness의 dif가 보충되는 자연스러운 순서.

### Case B: 위고비(v2 drug) 감지 → `expandedCalcs=["위고비","obesity"]`

- **DraftTab `draftHints` (#4)**:
  - `hasDiseaseOriginal` 판정: 원본 `detectedCalcs=["위고비"]` 에 disease 없음 → `false`
  - 위고비 hint: dosing + contraindication (v2 uiHooks 준수)
  - obesity hint: protocol + indication + schedule (disease 기본값 hint 상속)
  - 두 엔트리 hint **동시 출력** (Boss 성공 기준 ②)

### Case C: 위고비 + obesity 동시 감지 → `expandedCalcs=["위고비","obesity"]`

- Set dedup 으로 obesity 중복 제거됨. Case B와 출력 동일.

### Case D: 여러 자식이 같은 parent 공유

예: `["BPPV","이석증"]` → 둘 다 parents=["dizziness"] → Set dedup → `["BPPV","이석증","dizziness"]`. dizziness 단일 주입.

---

## 6. 제약 7 drug 우선순위 회귀 시나리오

### 기존 규칙 (line 497~503)

> "disease가 하나라도 있으면 drug 엔트리는 DraftTab hint에서 제외"

### 부작용 리스크

- **naive 구현**: `hasDisease=expanded.some(...)` → 위고비(drug)만 감지해도 obesity(disease)가 parent로 들어가 `hasDisease=true` → 위고비 hint 자체 누락
- **이번 설계**: `hasDiseaseOriginal=detectedCalcs.some(...)` — 원본 detectedCalcs 기준. parent 확장은 판정에 영향 없음.

### 회귀 시나리오 (QA #8 항목)

| # | 시나리오 | 기대 | 판정 방법 |
|---|---|---|---|
| R1 | obesity 단독 감지 | 위고비 등 drug 미노출 (원본에 drug 없음) | DraftTab hint에 obesity 항목만 |
| R2 | 위고비 단독 감지 (parent=obesity 자동 확장) | **위고비 hint + obesity hint 동시 노출** | DraftTab hint에 dosing/contraindication + protocol/indication/schedule 모두 |
| R3 | obesity + 위고비 동시 감지 | 위고비 drug → disease 있음 → 제외 (기존 규칙) | DraftTab hint에 obesity 항목만 (위고비 dosing 미노출) |
| R4 | BPPV 단독 감지 (parent=dizziness 자동 확장) | BPPV + dizziness hint 모두 | v1 경로로 treatment/differential append |

> R3 의 기존 동작 보존이 핵심 — 명시적으로 obesity + 위고비를 같이 detect한 상황은 의사가 "비만 본체 + 약물" 을 같이 보려는 의도이므로, DraftTab hint는 obesity만으로 정리 (Guide tab·Working Draft inject에는 둘 다 흐름). 이는 기존 행동이며 변경 없음.

---

## 7. 문서 업데이트 diff 초안 3건

### 7-1. `knowledge/section-vocabulary.md` — parents 필드 문서화

기존 섹션 dictionary와 독립된 **엔트리 루트 메타 필드** 항목 신설.

```diff
 ## uiHooks 기본값 (kind별)
 ...
+
+---
+
+## parents 메타 필드 (엔트리 루트)
+
+child 엔트리가 상위(parent) 맥락 주입이 필요할 때 선언하는 배열 필드.
+
+```jsonc
+{
+  "parents": ["상위 엔트리 key", ...]
+}
+```
+
+- 위치: 엔트리 루트 (sections·uiHooks와 동일 레벨)
+- 타입: `string[]` (단일 string 불허)
+- 동작: `src/app.js` `expandWithParents()` 헬퍼가 detectedCalcs → 확장 키 배열로 변환. Bundle consumer 로직 아님.
+- parent 미존재 시 silent-skip (warning 없음). Liby ingest 시 "parent 선행 존재" 확인 의무.
+- dedup은 app.js 측에서 `Array.from(new Set(...))` 보장.
+- **금지**: hint/draft/guide 차등 확장 (단일 배열 단일 경로).
+
+예:
+```jsonc
+"BPPV": {
+  "kind": "disease",
+  "parents": ["dizziness"],
+  "exam": "...",
+  ...
+}
+```
```

### 7-2. `skills/knowledge-ingest/SKILL.md` — Liby ingest 시 parent 선행 존재 확인

Step 7-B (v2) 하위에 parents 조항 추가.

```diff
 #### uiHooks 기본값 상속 (2026-04-21 Phase 6 적용)
 ...
+
+#### parents 메타 필드 (2026-04-21 도입)
+
+child 엔트리에 `parents: ["key", ...]` 배열 명시 시 Liby는 저장 전 **모든 parent key가 bundle에 실제 존재하는지 선행 확인**한다.
+
+- 미존재 parent 발견 → ingest 중단, 미르에게 보고 ("parent `___` 엔트리가 bundle에 없습니다. 먼저 ingest 후 재시도하거나 parents에서 제외하시겠습니까?")
+- 존재 확인 후 엔트리 루트에 필드 추가
+- v1/v2 shape 혼재 허용 (child=v1, parent=v1 / child=v2, parent=v2 모두 가능)
+- **금지**: parents 확장으로 인한 기존 엔트리 본문 수정 (예: dizziness 엔트리 exam을 parents 전제로 재편집 금지 — parents는 child→parent 단방향 참조만 추가)
```

### 7-3. `agents/auditor.md` — parents 감사 기준

```diff
 | **uiHooks 기본값 중복 저장** (Phase 6 신설) | v2 엔트리의 `uiHooks`가 kind 기본값과 완전 동일하면서도 명시 저장된 경우 → `null`로 축소 제안 (`src/app.js` `UIHOOKS_DEFAULTS` 참조) |
+| **parents dangling 참조** (2026-04-21 신설) | 엔트리의 `parents` 배열에 나열된 key가 bundle에 실제 존재하지 않는 경우 → 삭제 또는 parent ingest 제안 |
+| **parents 순환 참조** (2026-04-21 신설) | A.parents=[B] ∧ B.parents=[A] 또는 장기 순환 검출 → 즉시 조치 권고 |
+| **parents 깊이 과다** (2026-04-21 신설) | 확장 후 한 child에서 parents 체인이 3단계 이상 전개되면 검토 권고 (inject 토큰 낭비 리스크) |
```

---

## 8. QA 체크리스트

Boss 성공 기준 2개 포함 (①, ②).

| # | 항목 | 확인 방법 | 기대 |
|---|---|---|---|
| ① | **BPPV 단독 감지 시 dizziness 상위 문진·감별 주입** | Chrome 실기: "50대 여환, 앉았다 일어날 때 1분 어지럼증" transcript 입력 | Triage에서 BPPV 감지 → Guide tab에 dizziness 11항목 문진 + BPPV Epley 양쪽 방향 / Working Draft에 BPPV treatment + dizziness differential + dizziness draft-append 반영 |
| ② | **위고비 단독 감지 시 obesity + 위고비 동시 주입** | Chrome 실기: "비만 환자 위고비 처방 문의" | Triage에서 위고비 감지 → DraftTab hint에 위고비(dosing/contraindication) **+ obesity(protocol/indication/schedule)** 모두 표시 (drug 우선순위 규칙 회귀 없음, R2) |
| ③ | dedup 검증 | BPPV + 이석증 동시 감지 (양쪽 parents=["dizziness"]) | dizziness 단일 주입 확인 (중복 없음) |
| ④ | silent-skip 검증 | child.parents에 미등록 key 포함 시 | 콘솔 error 없음, 다른 parent 주입 정상 |
| ⑤ | drug 우선순위 회귀 R1 | obesity 단독 감지 | DraftTab hint에 obesity만 (drug 미노출) |
| ⑥ | drug 우선순위 회귀 R3 | obesity + 위고비 동시 감지 | 위고비 hint 제외, obesity만 노출 (기존 동작 보존) |
| ⑦ | shape 혼재 동작 | v1 BPPV + v2 obesity 우연 병발 (가상) | 각자 경로 분기, Error 없음 |
| ⑧ | **vaccination 중복 확인** | vaccination + HPV 동시 감지 (parents 미부여 설계) | 기존 Phase 5a schedule 참조 링크 유지, 중복 inject 발생 안 함 |
| ⑨ | 캐싱 동작 | `useMemo` dependency `[detectedCalcs]` 정합성 | detectedCalcs 변경 없을 때 draftHints/differentialShort 재계산 안 됨 |
| ⑩ | 문서 3건 update 확인 | section-vocabulary·SKILL·auditor md 반영 | 각 파일에 diff 내용 적용 |

---

## 9. 건드릴 파일 / 건드리지 않을 파일

### 건드림

| 파일 | 이유 |
|---|---|
| `src/app.js` | expandWithParents 헬퍼 + 8 지점 치환 + draftHints/differentialShort useMemo |
| `src/knowledge-bundle.js` | 10 엔트리에 parents 필드 추가 (BPPV·이석증·위고비·wegovy·마운자로·mounjaro·tirzepatide·zepbound·오젬픽·ozempic) |
| `src/index.html` | `app.js?v=parents` cache-bust 쿼리 갱신 |
| `knowledge/section-vocabulary.md` | §7-1 diff |
| `skills/knowledge-ingest/SKILL.md` | §7-2 diff |
| `agents/auditor.md` | §7-3 diff |
| `sessions/2026-04-21-parents-field.md` | 세션 기록 (Builder 단계에서 생성) |

### 건드리지 않음

- `src/prompts.js` — TRIAGE 감지 카테고리 변경 없음
- `src/components/*` — 패널 내부 로직 변경 없음 (props 이름은 유지, 값만 expandedCalcs 경로)
- `src/api.js` — API 시그니처 유지
- `src/templates.js` — 무관
- v2 disease 엔트리 본문 — parents는 child 쪽에만 선언 (parent 본문 편집 금지)

---

## 10. Builder 체크포인트 (작업 순서)

1. **app.js 헬퍼 추가** — `expandWithParents` 함수를 파일 상단 `UIHOOKS_DEFAULTS` 선언 직후 `getUiHooks` 다음에 삽입
2. **app.js 8 지점 치환** — §2 순서대로 #1 → #8
   - **중간 검증**: 브라우저 로딩 후 콘솔 error 0건 확인 (v=parents 캐시 갱신 필수)
3. **app.js draftHints · differentialShort useMemo 변환** — App 함수 상단으로 이동 + dependency `[detectedCalcs]`
4. **knowledge-bundle.js parents 필드 추가** — 10 엔트리 각각 루트에 `"parents": [...]` 한 줄 삽입 (uiHooks/draftAppend 앞)
5. **index.html cache-bust** — `app.js?v=parents`
6. **문서 3건 업데이트** — §7-1/2/3 diff
7. **Chrome 실기 QA** — §8 항목 ①~⑩ 순회
8. **세션 기록 작성** — `sessions/2026-04-21-parents-field.md` (template 준수)
9. **main 직접 머지** — CLAUDE.md 2026-04-20 원칙

### 임상 안전 확인 필요: **N**

기존 inject 데이터는 변경 없음. parents 확장은 누락 보정만 수행. RedFlag 경로 미변경.

### 예상 회귀 위험

1. **DraftTab hint 누락** — hasDisease 판정이 expanded 기준이면 위고비 hint 소실. 판정은 반드시 `detectedCalcs` 원본으로 수행 (§2 #4 주석 강조).
2. **캐시 키 불일치** — Working Draft cacheKey가 detectedCalcs 기준이므로 parents 확장이 결과를 바꿔도 캐시 invalidation이 자동 동작 (detectedCalcs 변경 = key 변경). 안전.
3. **topic kind parent 오용** — topic은 parents 부여 금지 ("section-vocabulary.md parents 규칙" 에 명시 — §7-1).

---

## 미르 승인 요청

Boss 승인안 C + Architect PASS 조건부 9개 제약을 전면 반영한 설계서입니다. 핵심 결정:

1. **헬퍼 로직**: app.js 내부 순수 함수 `expandWithParents` + Set dedup
2. **drug 우선순위 회귀 방지**: `hasDisease` 판정은 **원본 detectedCalcs** 기준 (parent 확장 제외)
3. **제약 3 택일**: (b) parents 부여 제외 + dedup — vaccination 계열에는 parents 미부여
4. **대상 10 엔트리**: BPPV·이석증(→dizziness) + GLP-1 drug 8종(→obesity)
5. **문서 3건 diff**: vocabulary·SKILL·auditor 반영

**미르, 승인해주시면 Builder 투입합니다.** 반대 또는 수정 요청 주시면 범위 조정 후 재설계하겠습니다.
