# sessions/2026-04-17-phase2-hint-priority-and-obesity-calc-removal.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 2 #3 (옵션 C'') — Hint 우선순위 기반 렌더 + 비만 BMI 계산기 제거
- 건드린 파일: `src/app.js`, `src/templates.js`

---

## Designer 설계서

### 범위 체크
- 단일 기능 단위: ✓ (둘 다 "진료 중 hint/탭 노이즈 감소" 흐름의 한 세트)
- forbidden.md 위반: 없음
- 임상 안전 충돌: 없음 (정보 증발 방지 원칙 유지)
- 이전 세션 완료: ✓ (Phase 2 #2 commit ea08280)
- → 통과

### 옵션 검토 과정
- 옵션 A (drug을 참조탭으로 이관): 미르 지적 — 탭 클릭 비용=hint 토글 비용, 실익 적음. **반려**
- 옵션 B (단순 drug 필터): drug 단독 감지 시 정보 증발. 핵심 원칙 위배. **반려**
- 옵션 C'' (우선순위 기반): disease 우선, drug은 fallback. **채택**

### 미르 핵심 원칙
"ingest 해둔 지식이 우선순위대로 적절하게 의사한테 보여준다."
- 지식은 반드시 의사 눈에 닿는다.
- 단, 중복/노이즈는 우선순위로 억제한다.

---

## Builder 결과

### 변경 #1: app.js draftHints 우선순위 분기
```js
var hasDisease=detectedCalcs.some(function(c){
  return KNOWLEDGE_BUNDLE[c]&&KNOWLEDGE_BUNDLE[c].kind==="disease";
});
var parts=[];
detectedCalcs.forEach(function(c){
  if(KNOWLEDGE_BUNDLE[c]){
    if(hasDisease&&KNOWLEDGE_BUNDLE[c].kind==="drug") return;
    // ...
  }
});
```

### 변경 #2: templates.js obesity 엔트리 제거
- CALCULATORS.obesity 블록 (45줄) 삭제
- 근거: Working Draft가 이미 BMI 계산 자동 수행 → 별도 계산기 불필요 (미르 지시)
- KNOWLEDGE_BUNDLE.obesity는 유지 → hint/Working Draft context 정상 동작

### 케이스 검증
| 시나리오 | 기대 | 결과 |
|---|---|---|
| 비만+위고비 | obesity만 hint | ✅ 중복 해결 |
| 위고비 단독 | 위고비 hint (fallback) | ✅ 지식 증발 방지 |
| 질환 2개 | 둘 다 | ✅ 기존 동작 |
| 미감지 | null | ✅ |

### CALCULATORS 남은 탭 (9개)
dyslipidemia, depression, diabetes, osteoporosis, Tdap, 대상포진, 폐렴구균, HPV, vaccination

---

## Reviewer 결과

| 항목 | 결과 |
|---|---|
| Hint 우선순위 로직 정확성 | ✅ 4 케이스 모두 통과 |
| obesity 탭 제거 | ✅ |
| KNOWLEDGE_BUNDLE.obesity 유지 | ✅ context/판단검토 영향 없음 |
| JSON/JS 문법 | ✅ node wrapped eval 통과 |
| 건드리지 않은 파일 | ✅ knowledge-bundle.js/api.js/sections.js/panels.js/prompts.js |

---

## QA 결과
- 임상 안전성: 정보 증발 0건 (fallback 로직)
- 회귀 가능성: 낮음 (Working Draft/판단검토 context 변경 없음)
- UI 영향: 비만 탭 사라짐 (의도된 단순화)
- 판정: **PASS**

---

## 결과
- 판정: **통과**
- 다음 작업 (Phase 2 남은 항목):
  - **#4** Knowledge Surfacing 프로토타입 (AI 큐레이션) — 별도 세션
  - 이번 세션 완료로 "비만 + 위고비 중복" 문제 해소

## 회고
- 예상과 달랐던 점:
  - 처음엔 탭 이전(옵션 A)이 가장 깔끔하다고 제안했으나, 미르 "의사가 탭을 눌러야 활성화되는 건 마찬가지잖아" 지적으로 UX 분석 재고
  - 진짜 문제는 "중복 표시" 자체 → 같은 자리(hint)에서 해결하는 게 최적
  - 옵션 C''가 "우선순위 유지 + 증발 방지"의 정확한 답
- 다음 세션 반영:
  - 미르의 UX 직관은 클릭/시선 이동 비용을 정확히 저울질함 → 탭 추가 제안 시 "사용자가 정말 별도 화면에서 봐야 하는가"를 먼저 물을 것
  - "지식이 증발하지 않는다"는 원칙은 Phase 2 전체의 북극성 — 앞으로 모든 분기 로직에 fallback 필수
