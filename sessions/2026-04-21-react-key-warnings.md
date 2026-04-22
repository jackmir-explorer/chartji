# sessions/2026-04-21-react-key-warnings.md

## 세션 정보
- 날짜: 2026-04-21
- 작업: React key 중복 경고 해소 (`Encountered two children with the same key, `0``)
- 트리거: parents 세션(`e0135a1`) 직후 baseline 경고로 spawn된 후속 task
- 건드린 파일:
  - `src/components/primitives.js:10` — BulletList item key
  - `src/components/panels.js:186` — RedFlag findings key
  - `src/components/sections.js:406` — calc referenceTable row key
  - `src/app.js:658-660` — RedFlag/Missing/Triage 패널 key 네임스페이스 prefix ← **실제 범인**
  - `src/index.html` — 컴포넌트 파일 cache-bust 쿼리 추가

---

## 증상

`Warning: Encountered two children with the same key, `0`. ... at App` 경고가 페이지 로드 시 반복 발생. React 스택이 `at div > at div > at div > at div > at App`만 출력해 원인 지점이 불명확.

## 원인 추적

### 1차 시도 (사용자 지시 3 지점 수정)
`src/components/primitives.js:10`·`panels.js:186`·`sections.js:406`의 `key={i}`를 안정적 식별자(`item+i`·`label+i`·`row.range+i`)로 교체 → **경고 지속**.

### 2차 진단 (React.createElement 패치)
index.html에 임시 진단 스크립트 주입. `React.createElement`를 래핑해 children 배열의 key 중복을 캡처하고 `window.__keyDupes`에 기록.

결과:
```
parent: "div"
dupKey: "0"
childTypes: ["div", "RedFlagPanel", "MissingPanel", "TriagePanel"]
childKeys: [null, "0", "0", "0"]
```

### 진짜 원인
`src/app.js:76-78`에서 세 remount key가 모두 `useState(0)`로 초기화:
```js
var [rfKey,setRfKey] = useState(0);
var [triageKey,setTriageKey] = useState(0);
var [missingKey,setMissingKey] = useState(0);
```

그리고 line 658-660에서 세 패널이 같은 부모 아래 sibling으로 배치되면서 세 개 모두 key="0"을 갖게 되어 React 경고 발동. (컴포넌트 **타입이 달라도** 같은 children 배열 내 key 중복이면 warnOnInvalidKey가 점화됨 — React의 key 유니크성은 타입과 무관하게 children 배열 스코프 내에서 판단.)

---

## 해결

각 key를 네임스페이스 prefix로 분리:

```js
<RedFlagPanel key={"rf-"+rfKey} ... />
<MissingPanel key={"missing-"+missingKey} ... />
<TriagePanel key={"triage-"+triageKey} ... />
```

같은 값(0)으로 초기화돼도 prefix가 달라 충돌 없음. remount 목적(key bump)은 그대로 유지.

추가로 사용자가 지시한 3 지점도 안정적 식별자로 교체 (방어적 수정 — 실제 warning 원인은 아니었지만 향후 데이터 변동 시 dup 가능성 제거).

## Cache-busting

컴포넌트 파일에 `?v=keys` 쿼리 파라미터 추가. app.js는 `?v=parents-keys2`로 bump. 진단 단계에서 Chrome 캐시가 구버전 컴포넌트를 붙들고 있어서 수정 반영 확인이 지연된 경험 반영.

---

## Chrome QA

- `127.0.0.1:8765/index.html?r=final3` 로드 직후 콘솔 확인 → key 경고 **0건**
- 남은 콘솔 메시지: React DevTools INFO + Babel in-browser WARNING (둘 다 baseline, 무관)
- expandWithParents·UI 렌더 회귀 없음(parents 세션 QA `e0135a1`과 동일 동작)

---

## 결과
- 판정: **통과**
- 수정 범위: 5 파일 (소스 4 + cache-bust 1)
- forbidden.md 준수: 국소 수정, 전체 재작성 금지, RedFlag 경로 미침범

## 다음 작업 후보
- Phase 5d — hyposmia + neck-mass v2 migration
- Phase 5f — mucomyst·pilocarpine drug 분리 ingest
- TRIAGE prompt vaccination-summary 세분화

---

## 회고

### 예상과 달랐던 점
- 사용자가 지시한 3 지점 수정으로는 해결 안 됨. React key warning의 스택이 `at App > div`만 보여 원인 불명확. `React.createElement` 래핑 진단으로 패널 3형제의 키 충돌을 발견.
- **핵심 교훈**: 이질 타입 sibling도 같은 children 배열이면 key 유니크성 요구. 타입이 다르면 괜찮을 거라는 직관은 틀림.

### 다음 세션 반영
- `useState(0)` 초기값으로 여러 remount key를 두는 패턴은 prefix 네임스페이스 필수. 신규 패널 추가 시 동일 실수 방지 필요.

### 세션 종료 체크리스트
1. 다음 세션 참조 필수? **YES** — remount key prefix 패턴을 다른 패널/컴포넌트 추가 시 참고
2. routine/trigger/CI 영향? **YES** — main 기준 UI 렌더 영향
3. 다른 브랜치·외부 시스템 의존? **YES**

→ **Claude가 main 직접 머지** (CLAUDE.md 2026-04-20 원칙).
