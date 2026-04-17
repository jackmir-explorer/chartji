# sessions/2026-04-17-phase2-guide-tab-hotfix-autofire-source.md

## 세션 정보
- 날짜: 2026-04-17
- 작업: Phase 2 #4 Hotfix — 임상 가이드 자동실행 + 출처 규칙 강화 (Claude in Chrome 실기 검증 기반)
- 건드린 파일: `src/prompts.js`, `src/app.js`

---

## 검증 경위 (선행)

Claude in Chrome으로 실기 검증 중 두 가지 개선점 발견:

### 문제 #1 — 탭 클릭 후 한 번 더 버튼 눌러야 함
- UX 관점에서 "2-click 요구" 불필요
- 미르 지적: "임상가이드 탭을 누르면 바로 생성되는게 낫지 않겠어?"

### 문제 #2 — 출처 표기 혼란
실기 출력:
```
● 다빈도 부작용: 오심, 구토, 변비... [출처: transcript]
● 비급여로 전액 환자 부담, 월 50만원... [출처: transcript]
● BMI≥30 기준... [출처: obesity.treatment]
```

문제:
1. `[출처: transcript]` — transcript는 의사 발화지 "지식 출처"가 아님
2. `[출처: obesity.treatment]` — 자료 분류 이름이지 실제 임상 출처가 아님
3. 원문에 `[FDA]`, `[FDA 2025]`, "Mayo Clinic" 같은 실제 출처가 있는데 AI가 못 찾음

미르 지적: "지식의 출처가 중요한데, 출처가 transcript도 있고, obesity treatment가 출처이기도 해. 이거 ingest 된 문서에서 제대로 춮처 표기해줬으면 해. 중요한거야. transcript 출처는 빼는게 맞지. 이건 가이드가 아니라 그냥 내가 말한 내용이잖아."

---

## Designer 설계

### 범위 체크
- 단일 기능 단위: ✓ (큐레이션 동작 개선 2건 묶음)
- forbidden.md: 위반 없음
- 임상 안전: 영향 없음 (출력 포맷 튜닝)
- 이전 세션 완료: ✓ (Phase 2 #4 본체 commit 433c3a0)

### 변경 #1 — 자동실행 (app.js)
- `leftTab==="guide"` 진입 시 아직 결과 없고 로딩 아닐 때 자동 fire
- 이미 결과 있으면 재호출 안 함 (state 캐시)
- `재생성` 버튼은 유지

### 변경 #2 — 프롬프트 강화 (prompts.js)
- 출처 인식 확장: `[FDA]` / "Mayo Clinic" / 논문 인용 / 가이드라인 명 → `[출처: XXX]`로 통일
- transcript 출처 금지 명시
- `[키이름.섹션]` fallback 제거 → `[출처 미확인]`

---

## Builder 결과

### 변경 #1: prompts.js KNOWLEDGE_CURATION_PROMPT 재작성

핵심 교체:
```
==지식 근거 규칙 (최우선)==
- 모든 bullet은 반드시 [지식 자료] 블록 원문에 근거해야 한다.
- transcript는 환자 상황 파악·bullet 선별에만 사용. bullet 본문·출처에 transcript 인용 금지.
- [출처: transcript] 절대 금지 — transcript는 지식이 아니라 의사의 발화다.

==출처 표기 규칙 (bullet 말미에 반드시 1개)==
① 이미 [출처: XXX] 포맷이면 그대로 보존
② 대괄호 기관·연도 태그 → [출처: 기관 연도] 변환 ([FDA] → [출처: FDA])
③ 학회·연구기관·병원 명 → [출처: 기관명] (Mayo Clinic → [출처: Mayo Clinic])
④ 논문 인용 → 그대로 [출처: XXX]
⑤ 가이드라인 명 → [출처: 가이드라인명]
⑥ [출처 미확인] 태그 원문에 있으면 그대로
⑦ 위 어디에도 해당 안 되면 → [출처 미확인]
- [키이름.섹션] 형태 출처 금지
```

### 변경 #2: app.js handleCuration 추출 + useEffect

```js
async function handleCuration(){ /* 기존 인라인 로직 그대로 */ }

useEffect(function(){
  if(leftTab!=="guide") return;
  if(curationText||curationLoading) return;
  if(!apiKey) return;
  var hasKnowledge=typeof KNOWLEDGE_BUNDLE!=="undefined"
    &&detectedCalcs.some(function(c){return !!KNOWLEDGE_BUNDLE[c];});
  if(!hasKnowledge) return;
  handleCuration();
},[leftTab]);
```

JSX의 `onCurate={...}` 인라인 함수는 `onCurate={handleCuration}` 참조로 교체.

---

## Reviewer 결과

| 항목 | 결과 |
|---|---|
| prompts.js 문법 (wrapped eval) | ✅ |
| app.js 괄호/중괄호 균형 (335/335, 309/309) | ✅ |
| 기존 DraftTab Liby 힌트 로직 무변경 | ✅ |
| Phase 2 #3 hint 우선순위 로직 무변경 | ✅ |
| GuideTab 컴포넌트 자체 무변경 | ✅ |

---

## QA — Claude in Chrome 실기 재검증

동일 대본 (비만 + 위고비 시나리오, 589자) 재입력 → 임상 가이드 탭 클릭 → 자동 큐레이션 대기 → 결과 확인.

### Before/After

| 항목 | Before | After |
|---|---|---|
| 탭 클릭 후 동작 | 버튼 클릭 필요 | **즉시 자동 로딩** |
| `[출처: transcript]` bullet | 2건 | **0건** |
| `[출처: 키.섹션]` fallback | 4건 | **0건** |
| `[출처: FDA]` (실제 임상 출처) | 0건 | **2건** |
| `[출처 미확인]` | 1건 | 4건 (원문에 출처 태그 없는 줄들 정직하게 표기) |

### 실제 출력 (6 bullets)

```
● BMI 32로 고도비만(≥30) 범주에서 위고비 단독 처방 가능 [출처: FDA]
● 초기 0.25mg 주 1회로 시작하여 순차증량(0.25→0.5→1.0→1.7→2.4mg) [출처 미확인]
● 다빈도 부작용은 오심, 구토, 변비 등 소화기 증상으로 초기 적응 기간 필요 [출처 미확인]
● 전액 환자 부담 비급여 약물 [출처: FDA]
● 공복혈당 105mg/dL, LDL 138mg/dL로 대사증후군 위험군에서 동반질환 개선 효과 기대 가능 [출처 미확인]
● 갑상선수질암 개인력/가족력, MEN2 증후군이 절대금기사항 [출처 미확인]
```

### 판정
- 미르 요구사항 2건 모두 충족 ✅
- 판정: **PASS**

---

## 결과
- 판정: **통과**
- Phase 2 #4 (임상 가이드 탭) 전체 실기 검증 완료

## 회고

### 원칙 재확인
- "실기 검증 없으면 Designer 가정이 현실과 어긋날 수 있음"
- prompts.js의 기존 출처 규칙은 "bundle 표준이 [출처: XXX]"라는 가정 위에 세워졌는데, 실제 bundle에는 `[FDA]`, "Mayo Clinic" 같은 비표준 마커도 섞여있었음
- 프로토타입 배포 직후 실기로 돌려본 게 핵심 — 미르가 즉시 "이거 실제 사용 관점에서 이상하다"고 지적해준 덕분에 24시간 안에 수정

### 다음 작업 후보 (follow-up)
- **knowledge ingest skill 표준화**: 출처 포맷을 `[출처: XXX]`로 수렴 (현재 `[FDA]`, 인라인 "Mayo Clinic" 등 불일치) — 차후 Liby 세션에서 다룰 것
- **bundle 백필**: 기존 엔트리의 출처 마커를 표준화할지 미르 판단 (현재는 프롬프트 쪽에서 관대하게 변환하는 방식으로 우회)
- **transcript 수치 맥락 bullet 처리**: bullet 5처럼 "환자 수치 + 지식 판단" 혼합은 여전히 허용됨. 이게 바람직한가 아닌가는 실사용 피드백 후 결정
