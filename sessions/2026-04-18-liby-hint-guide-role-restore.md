# 2026-04-18 Liby 힌트 ↔ 임상 가이드 역할 분리 복원

## 세션 정보
- 날짜: 2026-04-18
- 작업: Guide tab knowledgeCtx에서 `treatment`/`differential` 주입 제거 + KNOWLEDGE_CURATION_PROMPT에 역할 분업 문구 추가
- 건드린 파일:
  - `src/app.js:77-80` (handleCuration 내 2줄 제거)
  - `src/prompts.js:159` (KNOWLEDGE_CURATION_PROMPT 상단에 분업 섹션 추가)

---

## 결정 배경

`2026-04-17-handoff-to-next-session.md` 의 1번 과제. Phase 2 #4 Designer 단계에서 `/compact` 후 이전 Phase 2 #3 합의(Liby 힌트 vs Guide tab 역할 분리)를 재검토 않고 "감지된 지식 전부를 AI에 주자"로 단순 재설계 → `treatment`/`differential`이 Liby 힌트와 Guide tab 양쪽에 primary로 뜨는 중복 발생.

Boss 리뷰 요약:
- **CMO**: 인지부하 증가 (의사 판단 흐림)
- **CFO**: input token 약 40% 낭비
- **CVO**: 핵심 가치(의사 인지부하 감소)와 역행
- **CLO**: 리스크 낮음

복원 방법은 5분 작업이지만, **심화 논의로 B2 스키마 설계까지 결론** — 상세는 `sessions/2026-04-18-b2-schema-design.md` 참조.

이 세션은 **B2 도입 전 pre-patch**로서 오늘 당장 중복을 없애는 작업.

---

## Architect 진단 (이번 신설한 agent의 첫 호출)

```
영향 경계:
  - UI Surface: GuideTab (primary 축소), DraftTab Liby 힌트 (무변경)
  - Data Field: treatment / differential (Guide 제거), exam / draftAppend (Guide 유지)
  - 파일: src/app.js, src/prompts.js

기존 합의 대조:
  - panel-contracts.md: 해당 (역할 겹침 제거 원칙 복원)
  - data-flow.md: 파일 없음 (B2 기준으로 Liby 세션에서 작성 예정)
  - file-ownership.md: 해당 무위반
  - 관련 세션: sessions/2026-04-17-handoff (1번 과제 명시)

판정: PASS

Designer 제약:
  1. src/app.js:78-79 2줄만 제거. 다른 코드 손대지 말 것.
  2. Working Draft ctx 주입(app.js:126-127) / Draft Review ctx 주입(app.js:467-468) 무변경.
  3. prompts.js 분업 문구는 기존 섹션 재작성 금지, 신규 섹션 1개 추가만.
  4. data-flow.md 스냅샷 작성은 이번 세션 scope에서 제외 (B2 전환 시 일괄).
  5. draftAppend가 Working Draft literal append와 중복이라는 사실은 인지하되, B2 uiHooks로 해결 예정 — 이번 세션에선 미조치.
```

---

## Builder 결과 (실행)

### src/app.js:77-80 — 2줄 제거
```diff
  if(b.exam)         knowledgeCtx+="["+c+".exam]\n"+b.exam+"\n\n";
- if(b.treatment)    knowledgeCtx+="["+c+".treatment]\n"+b.treatment+"\n\n";
- if(b.differential) knowledgeCtx+="["+c+".differential]\n"+b.differential+"\n\n";
  if(b.draftAppend)  knowledgeCtx+="["+c+".draftAppend]\n"+b.draftAppend+"\n\n";
```

### src/prompts.js:159 — 분업 섹션 추가
```diff
 const KNOWLEDGE_CURATION_PROMPT=`한국 가정의학과 외래 임상 가이드 큐레이션 도구.
 입력: 진료 transcript + 감지된 질환·약물의 임상 지식 자료 ([키.섹션] 라벨이 붙은 블록들)
 출력: 이 환자 상황에 직접 관련 있는 3~8개 bullet (plain text)
+==역할 분업 (중요)==
+- DraftTab Liby 힌트가 이미 처방(treatment)·감별진단(differential)을 별도 패널에서 담당한다.
+- 너는 문진·검사(exam) / Draft 특이사항(draftAppend) 등 '나머지 지식'에서만 bullet을 추출한다.
+- 입력 블록에 treatment·differential 라벨은 없다. 혹시 exam·draftAppend 내부에 치료·감별 이야기가 섞여 있어도 그 부분은 bullet로 만들지 말 것 (중복 방지).
 ==지식 근거 규칙 (최우선)==
```

---

## Reviewer 결과

- 회귀 위험 항목
  1. Guide bullet 개수 감소 가능 (drug 엔트리 대부분 exam=null, draftAppend=null이라 입력 블록 없을 수 있음) → 의도된 감소. B2로 해결 예정.
  2. 기존 Working Draft ctx 주입은 그대로 (`app.js:126-127`) → Draft 품질 무변화.
  3. Draft Review ctx 주입도 그대로 (`app.js:467-468`) → 판단검토 품질 무변화.
- Architect 제약 5항목 전부 준수.

## QA 판정: 통과

- 문법: `prompts.js` node -c 통과. app.js는 JSX 런타임 (Babel) 검증 대상이라 정적 node 검사 skip.
- 코드 변경 총 5줄 (제거 2 + 추가 3 실효 4).

---

## 다음 작업

`2026-04-18-b2-schema-design.md` 참조. 내일(Liby 세션) B2 중간 스키마 + ingest skill 개정 + Auditor 규칙 확장 일괄 작업.

## 회고

- 예상과 달랐던 점:
  - "5분 단순 패치"로 출발했으나 미르의 질문이 bundle 스키마 자체의 구조 문제를 들춤 → B2 설계 논의로 확장. 오늘의 코드 패치는 **B2 도착 전 임시 처방**이라는 성격이 분명해짐.
  - Architect agent가 신설 직후 첫 호출에서 유효. 진단 포맷이 너무 무겁지 않았고, data-flow.md 부재를 명시적으로 "B2 전환 시" 제약으로 잡아줌.
- 다음 세션 반영:
  - Architect 출력에서 "관련 세션" 조회를 기계적으로 하려면 session keyword index가 있으면 좋겠음 (현재는 Claude가 grep). 우선순위 낮음.
  - 코드 수정이 간단해도 Architect 호출은 생략하지 말 것 — 오늘처럼 "B2 전환 전 임시 조치"라는 맥락이 저절로 기록되는 가치 있음.
