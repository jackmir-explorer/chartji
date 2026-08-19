# 세션 기록 — Deep Extract 2026-08-19

## 세션 정보

- **날짜:** 2026-08-19
- **유형:** 자동 routine (routines/deep-extract.md)
- **브랜치:** claude/hopeful-tesla-dkay0d → main 직접 머지
- **처리 건수:** 7건 (2신규 + 4보강 + 1study-note-only)

---

## 처리 논문 목록

| PMID | 제목 축약 | Scout 날짜 | 처리 유형 | 대상 파일 |
|---|---|---|---|---|
| 40856967 | 치매 감약 로드맵 Johns Hopkins | 2026-08-10 | 보강 | guidelines/deprescribing.md |
| 40961304 | 심장재활 일차의료 역할 | 2026-08-11 | study-note-only | (cardiac-rehabilitation.md 기반영) |
| 40736500 | DBT 단기 상담 실전 | 2026-08-12 | 신규 | by-disease/dbt-brief-counseling.md |
| 42301874 | T2DM 외래 인슐린 관리 | 2026-08-13 | 보강 | by-disease/diabetes.md |
| 40736666 | 의학지식 쇠퇴 능동사용 빈도 | 2026-08-14 | 보강 | guidelines/clinical-experience-quality.md |
| 42546336 | FM POCUS Tier 1 STFM | 2026-08-15 | 보강 | by-disease/pocus-primary-care-efsumb.md |
| 42415318 | CKM 증후군 1차의료 실전 | 2026-08-19 | 신규 | by-disease/ckm-syndrome.md |

---

## 핵심 내용 요약

### 신규 2건

**dbt-brief-counseling.md (PMID:40736500)**
- DBT 4대 모듈: 마음챙김·고통감내·감정조절·대인효능
- TIPP 기술 (Temperature·Paced breathing 등) — 5분 내 급성 정서위기 개입 가능
- PLEASE 기술 — 감정조절 기반 생활습관 처방
- ⚠ 초록 미제공 — 전문 확인 권장

**ckm-syndrome.md (PMID:42415318)**
- AHA 2023 CKM 증후군 0~4기 분류
- 다장기 이익 약제 선택 원칙: SGLT-2i(심장+신장+혈당) / GLP-1RA(체중+심혈관+신장) / PCSK9i(LDL)
- 처방 간소화 전략: "하나의 약으로 여러 CKM 요소 동시 개선"

### 보강 4건

**deprescribing.md (PMID:40856967)**
- 치매 특유 장벽 3가지: ①행동증상 재발 위험 ②가변적 경과 ③보호자 중심 의사결정
- FRAME 소통 도구: Framing·Rationale·Acknowledgement·Making a plan·Empathy
- 우선 감약 대상: 항콜린제·수면제·항정신병약·스타틴(life expectancy <1년)

**diabetes.md (PMID:42301874)**
- 인슐린 시작 기준: HbA1c>10% / 혈당≥300 / 이화작용(체중감소·근육소실)
- 기저인슐린 titration: 2~3일 간격, 공복혈당 목표 도달까지
- 장기작용 analogue (glargine·degludec): NPH 대비 저혈당↓
- 미르 반응 핵심: "경구 3~4제보다 HbA1c>10% 기준 충족 시 기저인슐린이 더 효과적이고 단순"

**clinical-experience-quality.md (PMID:40736666)**
- Dominant/Relevant/Distant 지식 쇠퇴 OR 2.31/2.26 (vs dominant)
- 실천 틀: "내 distant knowledge 목록" 작성 → Scout 활용 원거리 지식 복습
- ⚠ 처방(intervention) 근거 없음 — 진단 도구로만 활용

**pocus-primary-care-efsumb.md (PMID:42546336)**
- STFM Tier 1 (2028 목표): cellulitis / abscess / abscess drainage / knee effusion / bladder volume / fetal presentation
- 외래 즉각 활용 상위 3: 연조직염 감별·슬관절삼출·방광잔뇨

### Study-note-only 1건

**cardiac-rehabilitation.md (PMID:40961304)**
- cardiac-rehabilitation.md에 이미 이 PMID가 1차 출처로 존재 → knowledge 파일 추가 없음
- 미르 반응("재활의뢰를 하라는 말인가?") 기반 study-note만 생성

---

## 생성된 Study Notes (7건)

- `inbox/study-notes/2026-08-19-dementia-deprescribing-roadmap.md`
- `inbox/study-notes/2026-08-19-cardiac-rehabilitation-pc-role.md`
- `inbox/study-notes/2026-08-19-dbt-brief-counseling.md`
- `inbox/study-notes/2026-08-19-t2dm-insulin-outpatient.md`
- `inbox/study-notes/2026-08-19-medical-knowledge-decline-active-usage.md`
- `inbox/study-notes/2026-08-19-pocus-fm-tier1.md`
- `inbox/study-notes/2026-08-19-ckm-syndrome.md`

---

## 건드린 파일 목록

### 신규 생성
- `knowledge/by-disease/dbt-brief-counseling.md`
- `knowledge/by-disease/ckm-syndrome.md`
- `inbox/study-notes/2026-08-19-dementia-deprescribing-roadmap.md`
- `inbox/study-notes/2026-08-19-cardiac-rehabilitation-pc-role.md`
- `inbox/study-notes/2026-08-19-dbt-brief-counseling.md`
- `inbox/study-notes/2026-08-19-t2dm-insulin-outpatient.md`
- `inbox/study-notes/2026-08-19-medical-knowledge-decline-active-usage.md`
- `inbox/study-notes/2026-08-19-pocus-fm-tier1.md`
- `inbox/study-notes/2026-08-19-ckm-syndrome.md`
- `sessions/deep-extract-2026-08-19.md`

### 수정
- `knowledge/guidelines/deprescribing.md` — 치매 감약 4단계 로드맵 섹션 추가
- `knowledge/by-disease/diabetes.md` — 외래 인슐린 관리 섹션 추가
- `knowledge/guidelines/clinical-experience-quality.md` — 지식 쇠퇴 능동사용 섹션 추가
- `knowledge/by-disease/pocus-primary-care-efsumb.md` — FM POCUS Tier 1 섹션 추가
- `knowledge/log.md` — 2026-08-19 항목 추가
- `inbox/scout/2026-08-10.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-11.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-12.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-13.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-14.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-15.md` — ✅ 반영됨 2026-08-19
- `inbox/scout/2026-08-19.md` — ✅ 반영됨 2026-08-19

---

## 판정

**완료** — 7건 전량 처리, scout 태그 부착, log.md 갱신

---

## ⚠ 다음 작업 (필수)

**bundle 컴파일 미실시** — 이 routine은 `knowledge/*.md` 반영까지만 수행.

앱 Guide/Hint/Draft에 실제 노출되려면 **Liby 별도 호출 → `src/knowledge-bundle.js` 컴파일** 필요:

미반영 knowledge 항목 (2026-08-19 기준):
- `by-disease/dbt-brief-counseling` (신규 키 전체)
- `by-disease/ckm-syndrome` (신규 키 전체)
- `guidelines/deprescribing` — `dementia_deprescribing_johns_hopkins` 섹션
- `by-disease/diabetes` — `basal_insulin_outpatient_afp_2026` 섹션
- `guidelines/clinical-experience-quality` — `knowledge_decline_active_usage_frequency` 섹션
- `by-disease/pocus-primary-care-efsumb` — `pocus_fm_tier1_stfm_2026` 섹션

---

## 회고

- 심장재활(PMID:40961304) 기처리 여부 선제 확인 → study-note-only 결정 신속
- DBT 초록 미제공 상황에서 [초록 기반 — 전문 미확인] 태그 일관 적용
- CKM 증후군 — 신규 개념으로 환자 교육 언어까지 포함한 친절한 설명 3단계 구성 (미르 반응 직결)
- 컨텍스트 압축(compact) 이후 재개 — study notes 5건 완성 후 재개, 이후 scout 태그·log·세션·push 완료
