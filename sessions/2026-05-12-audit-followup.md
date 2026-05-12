# sessions/2026-05-12-audit-followup.md

## 세션 정보
- 날짜: 2026-05-12
- 작업: audit 2026-05-12 후속 처리 — 우선순위 1·3·5 + 2 부분
- 건드린 파일: src/knowledge-bundle.js / knowledge/ md 5 / sessions/

---

## 결정 배경
- audit 보고서 `audits/2026-05-12.md` 12 검토 권고 중 우선순위 1·3·5·2(부분) 일괄 처리.
- 미르 결단 필요한 백신 kind 분류는 별도 의뢰. 4순위(거대 파일 분할)는 결단 대기.

## 변경 내역

### 1순위 — 5/10 미ingest md 5건 bundle ingest
- **fall-prevention-awv** (disease, 4 sec, PMID:42089560) — STEADI+TUG + SmartSet + 아웃리치, 노인의학 의뢰율 7.5→40.4%
- **bladder-pain-syndrome** (disease, 5 sec, PMID:42101600) — BPS/IC 단계적 치료 (행동+PFPT→약물→방광내주입→neuromodulation)
- **palliative-depression-ketamine** (disease, 5 sec, PMID:41997505) — 케타민 NNT 3, 에스케타민 FDA 승인
- **uterine-fibroids** (disease, 5 sec, PMID:41118184) — TVUS·MRI / COC·LNG-IUD·GnRH·UAE
- **dash-diet-cvd** (topic, 4 sec, PMID:41839101) — 1·2차 CV 예방 근거, AFP POEM 요약

각 entry primarySources Tier 1 등록 + alias 3~5개. 키 중복 0건. `[[fall-prevention-awv]]` dangling 해소.

### 3순위 — md typo cleanup 5 파일
- anemia.md / pocus-focus-cardiac.md / continuity-of-care.md / chronic-cough.md / deprescribing.md
- 매핑 (sed 일괄): 결핀→결핍·흙변→흑변·잊은 멍→잦은 멍·잋요→잇몸·겨상→겸상·미감도→민감도·낙음→낮음·낙아→낮아·낙을→낮을·낙춰는/낙추는→낮추는·출캘→출처·겦일→격일·헥시딘→헵시딘·스케들→스케줄·빈혁→빈혈·출혁→출혈·용혁→용혈·혁구→혈구·호흡곴랜→호흡곤란·파일랿→파일럿·벨기엔→벨기에·철도→척도·줄여보습시다→줄여봅시다·시도 훈(→시도 후(

### 5순위 — 작은 patch 묶음
- 척추유발상지통 (하이픈 없음) alias 추가 — spine-related-arm-pain entry로 라우팅
- internal-medicine-2025-update alias 비대칭 해소: cardiology-2025-update + endocrinology-2025-update 양쪽 keywords에 `internal-medicine-2025-update`·`internal medicine 2025` 추가 (검색 양쪽 도달)
- 5-D wikilinks 2건:
  - epilepsy-elderly precaution: 와파린·DOAC → `[[doac-elderly|DOAC]]`
  - osteoporosis diabetes_specific: GLP-1RA → `[[glp1|**GLP-1RA**]]`, SGLT-2i → `[[sglt2-inhibitors|**SGLT-2i**]]`

### 2순위 (부분) — complication → complications 표준화
- osteoporosis VCF 섹션 키 단수 `complication` → 표준 복수 `complications` 통일 (section-vocabulary.md 일치)

## 검증
- node parse OK
- KNOWLEDGE_BUNDLE **613 → 638 keys** (+25)
  - 5 신규 entry × 평균 4~5 alias + complications 키 이름만 변경 + 척추유발상지통 alias 1
- 키 중복 hard-check 0건
- 5순위 patch 5건 모두 검증 통과 (척추유발상지통·IM alias 양쪽·DOAC wikilink·GLP-1RA wikilink·SGLT-2i wikilink)

## 미르 결단 의뢰 (2순위 잔여)
**백신 7 entry kind 분류** (audit 🟡 #4):
- 현황: hepatitis-ab-vaccine·herpes-zoster·hpv·japanese-encephalitis·pneumococcal·rabies·varicella-mmr-polio 7개 모두 kind="disease" / adult-vaccination-summary만 topic / 기존 vaccination(예방접종)도 topic
- 결단 옵션:
  - (A) 7개 vaccine을 topic으로 통일 — 기존 vaccination/summary와 일관
  - (B) `vaccine` kind 신설 — UI/검색 분류상 명확
  - (C) 현 상태 유지 + section-vocabulary.md에 "백신류는 kind=disease 컨벤션" 명문화

## 판정
- 통과 (1·3·5·2부분)

## 다음 작업
- 백신 kind 결단 대기
- 4순위 거대 파일 분할 (palliative-pain·deprescribing 우선, R2 권한 — 결단 후)
- audit 🟡 #3 chronic-pain-integrative.opioid_communication 주제 부조화 결단 (별도)
- audit 🟡 #4 dangling wikilinks: 본 commit으로 `[[fall-prevention-awv]]` 해소. 남은 3건([[tdap]]·study-note 2건) 별도 처리.

## 회고
- 예상보다 typo 종류가 많아 sed 매핑 25 패턴. 대부분 한글 IME 오타로 자동 정정 가능.
- 5순위 IM-2025-update 비대칭은 처음에 키 추가로 접근했으나 키 라우팅은 단일 객체만 가능 → keywords 보강으로 검색 양쪽 도달 정답.
