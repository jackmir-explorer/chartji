# sessions/2026-09-10-liby-ingest-myopia-outdoor-taiwan.md

## 세션 정보
- 날짜: 2026-09-10
- 작업: Liby ingest — 대만 天天120(톈톈120) 근시 예방 실외활동 정책 (미르 raw 텍스트)
- 건드린 파일:
  - `knowledge/guidelines/myopia-outdoor-activity-taiwan.md` (신규)
  - `src/knowledge-bundle.js` (엔트리 추가)
  - `src/index.html` (`?v=0810-clinexp` → `?v=0910-myopia`)
  - `knowledge/log.md` (1줄)
  - `knowledge/index.md` (1줄)

---
## 결정 배경
- 미르가 대만 天天120 정책 raw 텍스트를 던지고 "liby ingest" 호출 → CLAUDE.md "Liby ingest 4작업" 전수 점검.
- **분류**: 특정 질환/약물 진료 알고리즘이 아니라 **인구 단위 근시 예방 전략·환자교육 참고** → `kind: "topic"`, `guidelines/`. clinical-experience-quality 패턴(Triage 미등록 topic) 그대로 차용.
- **출처 처리**: 본문에 출처가 내장(대만 교육부 天天120 2010 + 연구자 Wu Pei-Chang 분절회귀) → Attribution 추정 아님. 단 **정확한 PMID를 미르가 제시하지 않았고 Liby는 직접 WebSearch 검증 금지**(Researcher 전담). 날조 대신 sourcing-rules 승인 방식인 `[원 논문 PMID 미확인 — Researcher 검증 대기]` 투명성 마커로 저장. 근거 미검증 상태이므로 [CLINICAL] 아닌 **[INSIGHTS]** 태그.

## Liby ingest 4작업 점검 결과
1. **Raw 노트 → knowledge/*.md** ✅ myopia-outdoor-activity-taiwan.md 신규 + bundle 컴파일 완료
2. **inbox/ 처리** — 스캔 대상(.md/이미지/pdf) **0건**. 최상위엔 .hwp 2개·.pptx 1개(미지원 포맷)·`실수모음`(확장자 없는 미르 개인 텍스트, 스캔 대상 아님)뿐. blind-spots.md·gaps.md는 스캔 제외.
3. **Deep Extract → bundle backlog** — **미반영 0건**. 마지막 bundle 커밋 `d212db3`(clinical-experience-quality) 이후 `knowledge/*.md` 변경 없음(`git diff d212db3..HEAD -- 'knowledge/*.md'` = 빈 결과). backlog clean.
4. **gaps.md 처리** — 본문 **0건**(Archive 섹션만 존재). 처리 대상 없음.

## 변경 상세
- **신규 md**: 6섹션(definition·evidence·program-design·caveats·korea-comparison·notes). 수치 원문 보존(34.8→50.0→46.1%, +1.58→−2.34%/yr, 15.8→29.9%). 天天120=권고(의무X)·주10시간, 宜蘭 유아판, 한국 144시간 대비.
- **bundle**: `_myopia_outdoor_taiwan_v2` (kind:topic, uiHooks:null → topic 기본값 hint:[]·guide:["*"] 상속). 8개 키 등록(myopia-outdoor-taiwan/天天120/톈톈120/천천120/myopia/근시/myopia prevention/근시 예방). 신규 키 중복 hard-check 전 키 0→1 확인. `node -c` 문법 OK.
- Triage calcCategories 미확장(topic·hint:[]).

## 결과
- 판정: 통과 (node -c OK, 키 중복 0, backlog 전 clean)
- 다음 작업: **Researcher가 Wu PC 분절회귀 원 논문 PMID 확보 → primarySources 정식 Tier 1 인용 교체**. Auditor `[원 논문 PMID 미확인]` 태그 큐로 감지.

## 회고
- 예상과 달랐던 점: "liby ingest 4작업" 중 실제 작업은 (1) 신규 ingest뿐 — inbox/bundle backlog/gaps 전부 clean. CLAUDE.md가 경고한 "bundle backlog 누락 패턴"은 이번엔 해당 없음(직전 세션에서 이미 동기화됨).
- 다음 세션 반영: 원 논문 PMID 미확인 상태. 미르가 서지 제시 시 즉시 Tier 1 교체 + 태그 [INSIGHTS]→[CLINICAL] 승격 검토(Researcher 검증 후).
- **main 반영**: 이 변경은 앱 runtime(bundle) + 다음 세션 참조 대상 → CLAUDE.md상 main 직접 반영 대상. 단 본 세션은 `claude/scout-daily-routine-deep-extract-gfoa20` 브랜치로 스코프됨 → 브랜치 푸시 후 main 머지는 미르 확인.
