# sessions/design-2026-04-24-wave2-ddx-ui.md — Designer 설계서 Wave 2 (R5+R6 DDx UI)

## 세션 정보
- 날짜: 2026-04-24
- 작업: Triage Panel DDx readonly 렌더 복원 + R6 5개 가드레일 (dismiss 제외)
- 의존: Architect STOP 해제 (미르 답변 2026-04-24 Q1~Q4)

---

## [DESIGNER 범위 체크]

- 단일 기능 단위: ✓ (DDx UI 재활성화 + 가드레일 일체)
- forbidden.md 위반: 없음 — Triage Panel 예외 조항을 panel-contracts.md에 동시 개정하여 정합
- 임상 안전 충돌: 없음 — ingested-only 원칙으로 AI 할루시네이션 경로 차단
- 이전 세션 완료: ✓ (Wave 1 + W2 main 반영)
→ **통과**

---

## [DESIGNER 설계서]

### 가정 (명시)

1. **R5 실 구현은 panels.js만**: v1 레거시 `differentialShort` 필드가 이미 `src/app.js:170-183`에서 parent 확장 + dedup 합성 → TriagePanel에 props 전달 중. 렌더 블록만 추가하면 즉시 작동.
2. **v2 `sections.differential` 라우팅은 rule 선언만**: 현재 v2 엔트리에서 해당 section key 실사용 0건 (bundle grep 검증). 문서만 Triage로 이전 — runtime 노출 영향 0.
3. **Q1 옵션 B "primary 이전"**: data-flow.md 매트릭스에 "Triage readonly" 열 신설 + `differential` row Guide ✓ 제거 + Triage ✓ 추가. section-vocabulary.md uiHooks 기본값 `kind:"disease"` guide 배열에서 `"differential"` 제거.
4. **src/app.js UIHOOKS_DEFAULTS 동기화 필수**: line 6의 disease guide 배열도 `"differential"` 제거 — rule과 runtime 정합 유지. 현재 v2 엔트리 실사용 0건이므로 즉시 제거 안전.
5. **Horse≤3 Zebra≤2 상한**: panels.js 렌더 시 slice 적용. 기존 bundle 데이터는 건드리지 않음 (데이터엔 더 많을 수 있음, UI만 상한).
6. **R6 가드레일 6번 "세션 단위 dismiss" 제외**: 미르 Q4 답변 수용. 필요 시 후속 요청으로 추가.

### 건드릴 파일

1. `src/components/panels.js` — TriagePanel 렌더 블록 복원 + Horse/Zebra slice + 면책 문구
2. `src/app.js` — UIHOOKS_DEFAULTS disease guide 배열에서 `"differential"` 제거 (rule 정합)
3. `rules/panel-contracts.md` — Triage Panel 금지 문구에 예외 추가
4. `rules/data-flow.md` — 매트릭스 "Triage readonly" 열 신설 + `differential` row 이전
5. `knowledge/section-vocabulary.md` — uiHooks 기본값 `kind:"disease"` guide 배열에서 `"differential"` 제거 + Triage 라우팅 주석

### 건드리지 않을 파일

- `src/knowledge-bundle.js` — differentialShort 필드 그대로 (v1 레거시 유지, Phase 5 v2 전환 시 재검토)
- `src/prompts.js`, `src/api.js` — LLM 경로 전혀 건드리지 않음 (R6 "AI 생성 금지" 원칙 핵심)
- 다른 패널 (RedFlag·Missing) — 무관
- `src/styles.css` — inline style로 충분, CSS 파일 수정 안 함
- `rules/forbidden.md`, `rules/file-ownership.md` — 이미 panel-contracts 예외로 정합

---

### 변경 목록 (위험도 오름차순)

#### #1 (위험도: 낮음) — `rules/panel-contracts.md` Triage Panel 예외

**파일**: `rules/panel-contracts.md`

**old**:
```
## Triage Panel
역할: 진료 초반 방향 anchor, CC 분류
출력: 방문 유형 + CC + anchor 문장
금지: 진단 단정, 치료 계획 제안, RedFlag 언급
```

**new**:
```
## Triage Panel
역할: 진료 초반 방향 anchor, CC 분류
출력: 방문 유형 + CC + anchor 문장 + DDx readonly (감별진단 후보 표시, 2026-04-24 Wave 2 재활성화)
금지: 진단 단정, 치료 계획 제안, RedFlag 언급
예외: ingested knowledge 기반 DDx readonly 표시 허용 (AI 추론 금지, 면책 문구 상시 노출)

### DDx readonly 가드레일 (2026-04-24 Wave 2, 5개)
1. **ingested-only**: bundle의 `differentialShort` (v1 레거시) 또는 `sections.differential` (v2, 미래) 데이터만 사용. LLM 생성 경로 전면 금지.
2. **AI 생성 금지**: prompts.js·api.js 어느 경로에서도 DDx 영역 컨텐츠 생성하지 않음.
3. **숫자 0개**: 확률·퍼센트·수치 표기 금지 (anchor bias 유발 방지).
4. **상한**: Horse(흔함) ≤ 3개, Zebra(드물지만 치명적) ≤ 2개. UI에서 slice.
5. **면책 문구 상시 노출**: `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` DDx 영역 하단 고정 표시.
```

**이유**: Triage Panel 계약에 DDx readonly 예외 + 가드레일 5개 명문화. Boss 권고 요지 그대로 반영.

**검증 기준**:
- `예외: ingested knowledge 기반 DDx readonly` 문구 존재
- "가드레일 (2026-04-24 Wave 2, 5개)" 섹션 존재
- 5개 항목 전부 명시

---

#### #2 (위험도: 낮음) — `rules/data-flow.md` Triage readonly 열 신설 + differential 이전

**파일**: `rules/data-flow.md`

**변경 2종**:

(a) **매트릭스 헤더 행에 Triage readonly 열 추가**

**old**:
```
| Section key | Liby 힌트 (hint) | Guide Tab (guide) | Working Draft append (draftAppend) | RedFlag |
|---|---|---|---|---|
```

**new**:
```
| Section key | Liby 힌트 (hint) | Guide Tab (guide) | Triage readonly | Working Draft append (draftAppend) | RedFlag |
|---|---|---|---|---|---|
```

(b) **기존 모든 row에 Triage 열 값 `| ` (빈칸)** 추가 + **`differential` row 이전**

(b)는 모든 row에 5번째 셀로 빈칸을 삽입해야 함. Builder가 각 row마다 `|` 하나씩 추가. 단, `differential` row만:

**old**:
```
| `differential` | | ✓ (disease) | | ✗ 절대 금지 |
```

**new**:
```
| `differential` | | | ✓ (disease) | | ✗ 절대 금지 |
```

즉 `differential` Guide ✓ → Triage ✓ 이전. (시각 배치: `| hint | guide | triage | draftAppend | redflag |`)

**추가 주석** (매트릭스 설명부):

`### uiHooks 기본값 앵커` 섹션 아래에 새 문단:

```
> **2026-04-24 Wave 2 — Triage readonly 열 신설**: `differential` primary를 Guide → Triage readonly로 이전 (미르 결단 Q1 옵션 B). 현재 v2 엔트리에서 `sections.differential` 실사용 0건 → 노출 영향 없음. Runtime `UIHOOKS_DEFAULTS` 동기화 완료(src/app.js). 향후 v2 엔트리 신규 작성 시 `differential` 섹션은 Triage readonly로만 라우팅.
```

**이유**: 매트릭스에 Triage readonly 열 정식 인정 + differential primary 이전 rule 선언.

**검증 기준**:
- 헤더 행에 "Triage readonly" 문자열
- `differential` row Triage 열에 ✓ 존재 (Guide 열은 빈칸)
- 다른 row들은 Triage 열 전부 빈칸

---

#### #3 (위험도: 낮음) — `knowledge/section-vocabulary.md` uiHooks 기본값 갱신

**파일**: `knowledge/section-vocabulary.md`

**old** (`### kind: "disease"` 블록):
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","differential","notes","prognosis","complications","counseling"],
  "draftAppend": ["draft-append"]
}
```

**new**:
```jsonc
{
  "hint":        ["protocol","indication","schedule","lifestyle","follow-up-schedule"],
  "guide":       ["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","notes","prognosis","complications","counseling"],
  "triage":      ["differential"],
  "draftAppend": ["draft-append"]
}
```

주석 추가 (2026-04-21/04-24 기존 주석 바로 아래):
```
(2026-04-24 Wave 2 — `differential` primary를 guide → triage readonly로 이전 (미르 결단 Q1 옵션 B). 신규 필드 `triage` 도입. Phase 3 runtime 시 `UIHOOKS_DEFAULTS`·`getUiHooks`에서 triage 필드 소비 구현 필요 — 본 Wave는 rule 선언 + 현재 v1 `differentialShort` 렌더만 담당.)
```

**이유**: v2 기준 uiHooks 기본값에서 `differential` guide 제거 + triage readonly 필드 신설.

**검증 기준**:
- `kind: "disease"` guide 배열에 `"differential"` 없음
- `"triage":["differential"]` 필드 존재
- 2026-04-24 Wave 2 주석 존재

---

#### #4 (위험도: 중간) — `src/app.js` UIHOOKS_DEFAULTS 동기화

**파일**: `src/app.js`

**old**:
```javascript
var UIHOOKS_DEFAULTS={
  disease:{hint:["protocol","indication","schedule"],guide:["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","differential","notes"],draftAppend:["draft-append"]},
```

**new**:
```javascript
var UIHOOKS_DEFAULTS={
  disease:{hint:["protocol","indication","schedule"],guide:["classification","indication","exam","protocol","schedule","dosing","comparison","contraindication","precaution","monitoring","pregnancy","insurance","referral","notes"],draftAppend:["draft-append"]},
```

**주의**:
- 본 코드는 Phase 5a 확대 이전 버전이 주석에 하드코딩되어 있음 (`lifestyle`·`follow-up-schedule`·`prognosis`·`complications`·`counseling` 빠져 있음). Wave 1에서 section-vocabulary.md는 확장했으나 app.js `UIHOOKS_DEFAULTS`는 미동기화 상태 — **본 변경에서 동기화하지 않고 최소 변경** (`differential` 제거만). Phase 5a 확대 섹션 동기화는 별도 작업 (범위 외).
- `triage` 필드는 app.js `getUiHooks()` 반환 객체에 **추가하지 않음**. 현재 Triage Panel은 `differentialShort` (v1) 기반, `uiHooks.triage` 미소비. Phase 3 runtime에서 getUiHooks + Triage Panel 소비 구현 시 추가.

**이유**: rule(section-vocabulary.md)과 runtime 간 정합 — disease guide 배열에서 `differential` 제거. v2 sections.differential 실사용 0건이므로 즉시 제거 안전.

**검증 기준**:
- app.js:6 `disease guide` 배열에 `"differential"` 부재
- 기존 `UIHOOKS_DEFAULTS.drug`·`topic` 변경 없음
- L3 Smoke #1 (KB 부팅 무결성 체크)에서 회귀 경고 0건

---

#### #5 (위험도: 중간) — `src/components/panels.js` DDx 렌더 블록 복원 + 가드레일

**파일**: `src/components/panels.js`

**old** (line 65-68):
```
      </div>
      {/* differentialShort 렌더링 비활성화 — Boss 권고 (risk>benefit) */}
      {/* 데이터/파이프라인은 유지, 재활성화 필요 시 위 블록 복원 */}
    </div>
```

**new**:
```
      </div>
      {/* DDx readonly — 2026-04-24 Wave 2 재활성화 (rules/panel-contracts.md Triage § 참조)
          가드레일: ingested-only / AI 생성 금지 / 숫자 0개 / Horse≤3 Zebra≤2 / 면책 문구 상시 노출 */}
      {differentialShort&&differentialShort.length>0&&(
        <div style={{
          paddingTop:5,
          marginTop:3,
          borderTop:"1px solid rgba(245,166,35,.1)",
          display:"flex",flexDirection:"column",gap:3,
        }}>
          {(function(){
            var horses=differentialShort.filter(function(x){return x.t==="h";}).slice(0,3);
            var zebras=differentialShort.filter(function(x){return x.t==="z";}).slice(0,2);
            return (
              <React.Fragment>
                {horses.length>0&&(
                  <div style={{display:"flex",alignItems:"baseline",gap:6,fontSize:10.5,color:"#7a6d4a",lineHeight:1.5}}>
                    <span style={{fontSize:8,fontWeight:700,color:"rgba(245,166,35,.55)",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:".06em",flexShrink:0}}>HORSE</span>
                    <span>{horses.map(function(x){return x.d;}).join(" · ")}</span>
                  </div>
                )}
                {zebras.length>0&&(
                  <div style={{display:"flex",alignItems:"baseline",gap:6,fontSize:10.5,color:"#7a6d4a",lineHeight:1.5}}>
                    <span style={{fontSize:8,fontWeight:700,color:"rgba(231,76,60,.55)",fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase",letterSpacing:".06em",flexShrink:0}}>ZEBRA</span>
                    <span>{zebras.map(function(x){return x.d;}).join(" · ")}</span>
                  </div>
                )}
                <div style={{fontSize:8.5,color:"rgba(122,109,74,.55)",fontStyle:"italic",marginTop:2,lineHeight:1.4}}>
                  ingested knowledge (의사 본인 저장, AI 추론 없음)
                </div>
              </React.Fragment>
            );
          })()}
        </div>
      )}
    </div>
```

**이유**: Boss 권고 6개 가드레일 중 5개 실장 (dismiss 제외):
- ingested-only: `differentialShort` props (bundle 기반) 만 사용 — LLM 경로 없음
- AI 생성 금지: 코드상 api.js 호출 전혀 없음
- 숫자 0개: 렌더 어디에도 수치/퍼센트 없음
- Horse≤3 Zebra≤2: slice(0,3) / slice(0,2)
- 면책 문구: 하단 "ingested knowledge (의사 본인 저장, AI 추론 없음)"

**스타일 선택 근거**:
- 기존 Triage Panel의 CC 행과 시각 정합성 유지 (색상·폰트 크기·letter-spacing 재사용)
- Horse는 기존 CC 주황 계열, Zebra는 약한 빨강 계열로 구분 (anchor bias 유발 수준 아님)
- 면책 문구는 더 작은 폰트(8.5px) + italic + 낮은 opacity — 인지는 되되 시각 압박 안 줌
- `borderTop 1px` 로 CC 행과 DDx 영역 시각 분리

**검증 기준**:
- line 66-67 주석 제거
- `differentialShort&&differentialShort.length>0` 조건부 렌더
- `slice(0,3)` + `slice(0,2)` 존재
- 면책 문구 `"ingested knowledge (의사 본인 저장, AI 추론 없음)"` 존재

---

### 임상 안전 확인 필요: **Y (경미)**

- DDx 제시가 의사 판단에 **anchor bias** 유발 가능성 — Boss 권고 §2에서 3개월 실기 측정 조건부 채택.
- R6 가드레일 5개 + 면책 문구 + Horse/Zebra 상한으로 **현 시점 최소 리스크**.
- Chrome QA 단계에서 실제 화면 노출 상태 확인 필수 (면책 문구 가독성·색상 대비).

### 예상 회귀 위험

1. **React key 경고**: horses/zebras .map에 key 미지정. → `.map(function(x,i){...key={i}...})`로 보정 필요 (Builder 작업 시 문자열 join이므로 key 없이 `<span>`만 출력하면 경고 없음. 코드 그대로 `.join(" · ")` 사용 — 안전).
2. **빈 differentialShort**: `differentialShort.length>0` 조건으로 차단. null도 `&&` 단락평가로 안전.
3. **기존 detectedCalcs 흐름 간섭**: app.js:170-183 useMemo 그대로 유지. props 흐름 변경 없음 — 기존 detected 엔트리 개수만큼 렌더 트리거.
4. **styles drift**: 기존 CC 행 스타일 재사용 — 새 CSS 선언 없음.
5. **UIHOOKS_DEFAULTS 변경이 기존 L3 Smoke에 false positive 유발**: disease guide 배열 1개 key 제거 — hasGuidableContent 교집합 축소하지만 기존 v2 엔트리에 `sections.differential` 실사용 0건이므로 false positive 0.

---

## Builder 실행 권고 순서

1. #1 panel-contracts.md (rule 선언 선행)
2. #2 data-flow.md (매트릭스 열 신설)
3. #3 section-vocabulary.md (uiHooks 기본값)
4. #4 src/app.js UIHOOKS_DEFAULTS 동기화
5. #5 panels.js 렌더 블록 복원 (실 UI 변경 마지막 — 앞선 rule 정합 확보 후)

## 체크포인트

- #1~#4 완료 후 Reviewer 1차 (rule 정합)
- #5 완료 후 **Chrome QA 필수** — 실제 Triage 패널에서 DDx 영역 노출·면책 문구·Horse/Zebra 구분·기존 CC 행 레이아웃 유지 확인
- L3 Smoke #1 회귀 경고 없음 확인
