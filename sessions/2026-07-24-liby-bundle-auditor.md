# sessions/2026-07-24-liby-bundle-auditor.md

## 세션 정보
- 날짜: 2026-07-24
- 작업: (1) Liby — crp/aaa bundle 반영, (2) Auditor — knowledge DB 기계 감사
- 건드린 파일: `src/knowledge-bundle.js`, `src/index.html`, `knowledge/index.md`, `audits/2026-07-24.md`

---
## 결정 배경

미르: "Liby 불러서 crp/aaa bundle 반영해줘. 이후 auditor가 작업해줘."
- 직전 세션에서 crp-interpretation·aaa-screening md만 ingest(bundle 미반영 상태) → 앱 노출 위해 bundle 컴파일 필요.

## (1) Liby — bundle 반영

### 절차 (skills/knowledge-ingest SKILL 준수)
- 키 중복 hard-check: 신규 키(crp-interpretation/CRP/aaa-screening/AAA/복부대동맥류 등) 전부 0건 확인 후 진행.
- 포맷: 실제 bundle이 쓰는 v2 shape(`var _x_v2 = {kind,keywords,primarySources,sections,uiHooks}` + alias 할당). qtc-interpretation(topic) 패턴 그대로.
- kind: 둘 다 `topic` (qtc/ldh interpretation 관례 — Guide tab 큐레이션, hint 미노출).
- 삽입: 파일 끝(ibd 다음).

### 건드린 파일
- `src/knowledge-bundle.js`: `_crp_interp_v2`(definition/notes/precaution) + `_aaa_screening_v2`(definition/notes/precaution/referral) + alias 키 각 5개.
- `src/index.html`: `?v=0513-snippets` → `?v=0724-crp-aaa` (coding-behavior #3 캐시 버스팅, 10개 script 태그).
- `knowledge/index.md`: 두 엔트리 목록 추가(interpretation 클러스터).

### 검증
- `node --check` 문법 OK. node VM 런타임: 967키, 두 엔트리 정상 로드, alias 동일객체(===) 확인.
- calcCategories 미변경 (topic 참조 엔트리는 Triage presenting-complaint 대상 아님).

## (2) Auditor — 기계 감사 (agents/auditor.md 기준)

Auditor 절대 원칙: 보고만, 파일/bundle 수정 금지. 100% 검출 hard-check 우선.

### 발견 (→ audits/2026-07-24.md)
- 🔴 **키 중복 할당 4건** (덮어쓰기 데이터 손실 리스크): `GSM`(menopause vs gsm), `lateral-epicondylitis`·`외측상과염`(msk-injection vs occupational-msk), `post-hospitalization syndrome`(elderly-nonspecific vs transitional-care). 미르 결단 필요.
- 🟡 **dangling wikilinks 2건**: `[[dementia]]`(elderly-psychotropic-deprescribing), `[[mrsa]]`(skin-soft-tissue-infection).
- 🟡 **bundle↔md desync 2건**: recurrent-uti·statin-myopathy — 2026-07-03 deep-extract 추가분 미반영(SessionStart backlog 4건 중 나머지 2).
- 🟢 신규 crp/aaa: 결함 없음(키중복0·dangling0·sources 포괄).

---
## 결과
- 판정: 통과. crp/aaa bundle 반영 완료(앱 노출 가능), 감사 보고서 생성.
- 커밋: Liby(daf1821), audit+session(본 커밋).
- 다음 작업(미르 결정): 🔴 키중복 4건 primary 결정 → Liby alias 정리 / 🟡 dangling 2건 / desync 2건(recurrent-uti·statin) 다음 Liby ingest 포함.

## 회고
- 감사 기준표에 "md↔bundle content desync"가 명시적 항목은 아니지만, "deep extract 절대 원칙"과 직결돼 기록에 포함. hard-check(키중복·dangling)만으로도 4+2 실결함 검출 — 기계 감사의 비용 대비 효율 높음.
- 키 중복 4건은 과거 ingest 누적물(신규 crp/aaa와 무관). 정기 hard-check 감사의 가치 확인.
- 휴리스틱 감사(교과서중복·앵커링·토큰낭비 등)는 별도 심층 세션으로 분리 — 이번엔 확정적 결함만.
