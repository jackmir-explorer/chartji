# L3 — 회귀 감지 스모크 자동화 설계서

> 입력: QA 결과가 3개월 잠재한 bug(v1 ctx 공백)를 실기에서야 드러낸 사실.
> 근본 원인 C: 단위 스모크 부재 → Bundle·prompt 변경 시 회귀 무감지
> 목표: 페이지 로드·dev 모드에서 자동으로 "정상 동작" 3개 assertion을 반복 확인

---

## 설계 원칙

1. **무거운 테스트 프레임워크 도입 불가** — 현 chartji는 Babel standalone 기반 브라우저 앱. jest/vitest 도입 가능하지만 별도 빌드 체인 요구. **부팅 시 JS assertion + dev 콘솔 유틸**로 커버
2. **경고만, 빌드 실패 없음** — 프로덕션 사용자에겐 영향 없는 console.warn. dev/QA 세션에서 눈에 띄기만 하면 됨
3. **Fixture는 readable markdown** — transcript 샘플을 JSON이 아닌 md에 저장. Liby/미르가 직접 편집 가능

---

## 3 스모크

### Smoke #1 — KB 엔트리 ctx 빌드 무결성 (부팅 시 자동)

**문제**: v1 LPR처럼 ctx가 빈 문자열 반환하는 엔트리를 조용히 통과

**해결**: `src/app.js` 부팅 시점에 모든 KB 키에 대해 `buildCurationCtx(key)` 호출 → 빈 문자열이면 console.warn

**구현**:
```js
/* src/app.js 부팅부 (useEffect 최상단 또는 App() 초기 블록) */
useEffect(function(){
  if (typeof KNOWLEDGE_BUNDLE === "undefined") return;
  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return; // dev only

  var broken = [];
  Object.keys(KNOWLEDGE_BUNDLE).forEach(function(k){
    var e = KNOWLEDGE_BUNDLE[k]; if (!e) return;
    var ctx = "";
    if (e.sections) {
      var hooks = getUiHooks(e);
      var keys = hooks.guide || [];
      if (keys.indexOf("*") !== -1) keys = Object.keys(e.sections);
      keys.forEach(function(sk){
        var s = e.sections[sk];
        if (s && s.content) ctx += s.content;
      });
    } else {
      if (e.exam) ctx += e.exam;
      if (e.treatment) ctx += e.treatment;
      if (e.differential) ctx += e.differential;
      if (e.draftAppend) ctx += e.draftAppend;
    }
    if (!ctx) broken.push(k);
  });
  if (broken.length) {
    console.warn("[KB-SMOKE] Guide ctx 공백 엔트리:", broken);
  }
},[]);
```

**주의**: 위 체크는 "한 필드라도 채워졌으면 OK"이지만 handleCuration의 실제 로직은 `e.exam || e.draftAppend`만 본다. **Phase B4 (v1 fallback 삭제) 이후**엔 v2 경로만 남으므로 위 체크가 실제 로직과 일치. 그 전엔 `handleCuration`과 동일 로직으로 시뮬레이션해야 정확. Builder 판단.

### Smoke #2 — TRIAGE 카테고리 fixture 검증 (dev 콘솔 수동)

**문제**: 관계 매트릭스 변경 시 기대 동작이 회귀되는지 모름

**해결**: 대표 transcript × 기대 카테고리 set을 fixture에 저장. 개발자가 콘솔에서 `await window.runTriageSmoke()` 호출 → 실제 Claude API 호출로 감지 결과 비교 → 미매칭 항목 보고

**Fixture 구조**: `src/fixtures/triage-smoke.js`
```js
window.TRIAGE_SMOKE_FIXTURES = [
  {
    name: "LPR A (식도 증상 동반)",
    transcript: "목이 답답하고 기침이 3개월째 계속 나요. 속쓰림이나 역류감도 가끔 있어요...",
    expectAny: [["LPR", "LPR-consensus"]], // 둘 중 하나 이상 또는 둘 다
    expectAll: [] // 반드시 포함
  },
  {
    name: "heart-failure 환자 예방접종",
    transcript: "72세 남성 HFrEF EF 35%. 이제 독감철인데 예방접종...",
    expectAll: ["heart-failure", "vaccination"],
    expectAny: [["sglt2-inhibitors"]] // SGLT2 언급 시
  },
  // 각 v2 카테고리마다 1개씩
];
```

**러너** (`src/fixtures/triage-smoke-runner.js`):
```js
window.runTriageSmoke = async function(){
  if (!window.TRIAGE_SMOKE_FIXTURES) return console.error("fixtures not loaded");
  var apiKey = localStorage.getItem("cj_key");
  if (!apiKey) return console.error("API key missing");
  
  var results = [];
  for (var f of window.TRIAGE_SMOKE_FIXTURES) {
    var detected = await window.generateTriagePanel(f.transcript, apiKey); // TriagePanel 내부 함수 export 필요
    var missingAll = (f.expectAll||[]).filter(c => !detected.includes(c));
    var missingAny = (f.expectAny||[]).filter(set => !set.some(c => detected.includes(c)));
    results.push({ name: f.name, detected, missingAll, missingAny, pass: !missingAll.length && !missingAny.length });
  }
  console.table(results);
  return results;
};
```

**호출 시점**: 미르/개발자가 prompt·관계 매트릭스 수정 후 Chrome 콘솔에서 수동 실행. 주 1회 정도.

### Smoke #3 — primarySources 필수 검증 (부팅 시 자동)

**문제**: v2 엔트리인데 primarySources 누락 → 감사층 flag가 런타임에만 발생

**해결**: 부팅 시 v2 엔트리 순회 → `primarySources` 없거나 빈 배열이면 warn. `[출처: 임상 표준]` 라벨이라도 있으면 pass

**구현** (Smoke #1 같은 useEffect 블록에 합류):
```js
var noSource = [];
Object.keys(KNOWLEDGE_BUNDLE).forEach(function(k){
  var e = KNOWLEDGE_BUNDLE[k]; if (!e || !e.sections) return; // v2만
  if (!e.primarySources || !e.primarySources.length) noSource.push(k);
});
if (noSource.length) {
  console.warn("[KB-SMOKE] primarySources 누락 v2 엔트리:", noSource);
}
```

---

## 산출물

1. **`src/app.js` 수정** — Smoke #1 + Smoke #3 (useEffect 블록 하나로 병합, dev 한정)
2. **새 파일**:
   - `src/fixtures/triage-smoke.js` — Fixture 데이터
   - `src/fixtures/triage-smoke-runner.js` — Runner 함수
3. **`src/index.html`** — 새 fixture 스크립트 include + cache-bust
4. **`sessions/2026-04-XX-L3-smoke.md`** — Builder 세션 기록

---

## Builder 실행 순서

**Phase B1** — Smoke #1 + #3 (부팅 assertion)
- `src/app.js` 부팅 useEffect 추가
- dev 도메인 한정 (`localhost`·`127.0.0.1`)

**Phase B2** — Smoke #2 fixture + runner
- `src/fixtures/triage-smoke.js` 초기 fixture 10개 작성 (v2 카테고리 × 1개씩 + 복수 감지 샘플)
- `TriagePanel` 내부 감지 함수 window에 노출 (`window.generateTriagePanel`)

**Phase B3** — L1 Phase B4 (v1 fallback 삭제) 전제 검증
- Smoke #1이 "broken" 목록 반환하면 v1 fallback 삭제 금지. L1 완료 후 재시도

---

## 리스크

| 리스크 | 완화 |
|---|---|
| Smoke #2가 실제 API 호출 → 비용 발생 | dev 수동 실행만. CI 자동화 안 함. 10 샘플 × ~0.3 USD = 허용 |
| Smoke #1이 handleCuration 로직과 일치하지 않아 false positive/negative | Builder가 handleCuration에서 ctx 빌드 로직을 `buildCurationCtx(key)` 헬퍼로 추출 → Smoke #1이 동일 헬퍼 호출 (DRY) |
| Fixture가 bundle 변경 후 stale | fixture도 Liby ingest 시 함께 추가하는 관례 수립 (librarian.md) |
| 부팅 assertion이 프로덕션 사용자에게 노출 | dev 한정 조건 엄격. `process.env.NODE_ENV` 대신 hostname 조건 (브라우저 번들이라 env 없음) |

---

## L1·L2 의존성

- **L1에서 기대**: v1 마이그레이션 완료 시 Smoke #1 broken 목록 비어야 함. 이게 B4 전제 조건
- **L2에서 기대**: 관계 매트릭스가 fixture와 일치해야 Smoke #2 의미 있음. fixture 작성 시 L2 매트릭스를 입력으로 사용

---

## 종합 — 3 레이어 통합 Builder 순서

```
1. L2 (prompt 개편) → 즉시 재QA로 P0#2·P1#3·P1#4 효과 확인
2. L1 Phase B1 (Guide broken 3 unique 마이그레이션) → 재QA 시나리오 1 복구 확인
3. L3 Phase B1 (Smoke #1·#3 부팅 assertion)
4. L1 Phase B2·B3 (Easy·Medium 9 unique 마이그레이션)
5. L3 Phase B2 (fixture + runner)
6. L1 Phase B4 (v1 fallback 삭제) — Smoke #1 pass 전제
7. 전체 재QA (7 시나리오) → 3층 방어선 실전 효과 측정
```

총 예상 공수: **6~10 세션** (대형 세션 단위)
