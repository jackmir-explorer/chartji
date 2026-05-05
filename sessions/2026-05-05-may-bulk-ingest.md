# 2026-05-05 — May Bulk Ingest (5월 cron 누적 18 entries, 6 batch)

## 세션 정보
- 날짜: 2026-05-05
- 작업: 5-1·5-2·5-4 cron이 만든 누적 deep-extract 산출물(study-notes 22개·knowledge md 13 신규+5 보강) Liby ingest. 6 batch 분할.
- 건드린 파일:
  - src/knowledge-bundle.js — 신규 13 v2 entry + 보강 5 v2 entry (alias 덮어쓰기 패턴)
  - src/prompts.js — TRIAGE calcCategories +14
  - src/index.html — 캐시 키 0501-ent-bulk → 0505-may-ingest

## 배경

직전 대화에서 study-note 양식 개정·link 정비 후 main pull 결과 **5월 cron이 실제로 5-1·5-2·5-4에 돌았음을 확인**. 미르가 "그동안 deep extract 했던거 ingest 하자"고 한 것이 정확히 이 누적분이었다.

---

## 변경 내용

### Batch별 commit

| Batch | 영역 | 신규 / 보강 | 항목 | commit |
|---|---|---|---|---|
| 1 | POCUS (Mir-T1 #1) | 신규 3 | pocus-abdominal·pocus-lung·msk-injection-therapy | 8087b0c |
| 2 | 완화·EOL·deprescribing (Mir-T1 #3·#6) | 신규 2 + 보강 1 | goals-of-care-acp·deprescribing / palliative-pain | 098c187 |
| 3 | 신경·정신 | 신규 3 | migraine·ischemic-stroke-prevention·opioid-use-disorder | 6bea677 |
| 4 | 예방·암·통증 | 신규 3 | cervical-cancer-screening·cancer-fatigue·chronic-pain-integrative | 1ab7e1b |
| 5 | 근골격·심회복 | 신규 2 | ankle-sprain·cardiac-rehabilitation | 77b1f5c |
| 6 | 만성질환 보강 (Mir-T1 #5) | 보강 5 | CKD·MASH·frailty·glp1-selection-strategy·depression-screening | (이번) |

### Bundle 통계
- 시작: 309 entries (4-30 ENT bulk 후)
- 종료: **374 entries**
- 신규 v2 disease/topic entry: **13**
- v2_full 보강 entry: **5** (alias 덮어쓰기)
- 4-30 + 5월 누적: 220 → 374 = **+154 alias** (실제 unique entries 약 +35)

### TRIAGE calcCategories 추가 (14)
pocus-abdominal·pocus-lung·msk-injection-therapy·goals-of-care-acp·deprescribing·migraine·ischemic-stroke-prevention·opioid-use-disorder·cervical-cancer-screening·cancer-fatigue·chronic-pain-integrative·ankle-sprain·cardiac-rehabilitation·depression-screening

---

## Mir-Tier 1 영역 분포

| Tier 1 영역 | 추가/보강 entry |
|---|---|
| #1 POCUS·초음파 중재 | pocus-abdominal·pocus-lung·msk-injection-therapy (3 신규) |
| #2 비암성 만성통증·근골격 | ankle-sprain·msk-injection-therapy·chronic-pain-integrative (3) |
| #3 암성통증·완화의료 | palliative-pain 보강·goals-of-care-acp·cancer-fatigue (3) |
| #4 재택의료·노인의학 | frailty 보강·deprescribing·cardiac-rehabilitation (3) |
| #5 만성질환 본체 확장 | CKD·MASH·glp1-selection-strategy 보강 (3) |
| #6 임상약물학·Deprescribing | deprescribing·opioid-use-disorder·prescribing-cascade(기존) (3) |
| #7 생활습관의학 | cardiac-rehabilitation·cancer-fatigue·chronic-pain-integrative (간접 3) |
| 부속 A 통증·완화·노인 정신 | depression-screening·chronic-pain-integrative·opioid-use-disorder (3) |
| 부속 B Communication | goals-of-care-acp·palliative-pain counseling 섹션 (2) |

→ Mir-Tier 1 + 부속 모두 골고루 강화. 4-29 routine 재편의 의도가 정확히 반영됨.

---

## 핵심 결정

### 1. 양식 보존 + 자연스러운 sub-bullet
직전 세션에서 결정한 양식 원칙(연구 본래 narrative 보존 + "일차의료 적용 포인트" 자연스러운 깊이)을 유지하며 ingest. 5월 cron은 아직 이전 양식으로 study-note를 만들었지만, knowledge md 자체는 충분히 임상 적용 디테일이 있음.

### 2. v1 → v2 alias 덮어쓰기 패턴
기존 v1 형식 entry (CKD_monitoring 등)를 _v2_full 변수로 신규 등록하여 alias 덮어쓰기. 4-30 ENT bulk batch에서 정착된 패턴.

### 3. 자유 섹션 + uiHooks override
palliative-pain에 자유 섹션 4개 신설(eol-deprescribing·cancer-neuropathic-pain·afp-eol-management·counseling) — uiHooks override로 hint·guide 모두 노출.

### 4. wikilinks 적용
이번 batch 모든 신규 entry는 외부 entry 참조 시 [[X]] 형식 사용 — 직전 세션 skill·auditor 신설 규칙 준수. 옵시디언 그래프뷰에서 자동 link.

---

## 결과

- **판정: 통과**
- 모든 batch syntax validation OK (node eval, 374 entries)
- 모든 자유 섹션 uiHooks override 정상
- index.html 캐시 키 갱신 (0505-may-ingest)
- 다음 cron (5-6) 새 양식 적용 예정

## 다음 작업

- D-7 (5-12 즈음) 평가:
  - Mir-Tier 1 routine 1주 운용 데이터 (5-6 ~ 5-12)
  - study-note 새 양식 검증 (5-6 첫 cron 결과 review)
  - 미르 외래 활용도·할루시네이션 점검
- Auditor 1회 호출 권고 — 새 link 영역 감사 (374 entries 누적 dangling·연관 누락 검출)

## 회고

- **누적 미반영의 위험**: cron 자동 진행 + Liby 수동 호출 구조에서 누적 backlog는 자연스럽게 발생. 미르가 명시 호출하지 않으면 영원히 ingest 안 됨. 정기적 점검 trigger 필요 (월 1회? Auditor 호출 시 동시?).
- **Bundle 양 증가의 token 부담**: 374 entries는 KNOWLEDGE_BUNDLE 컴파일 후 inject 시점에 점차 부담될 가능성. 현재까지는 detectedCalcs 기반이라 환자별 1-3개만 inject되어 문제 없으나, 미래 entries 더 늘면 v1/v2 정리·중복 alias 통합 필요.
- **다음 세션 반영**: 5월 cron 결과는 계속 누적될 것. 새 양식 적용 후 1주 운용 데이터 보고 evaluation. 기존 study-note 24개는 그대로 두지만, 미르가 임상 활용도 큰 항목 발견 시 수동으로 새 양식 변환 가능.
