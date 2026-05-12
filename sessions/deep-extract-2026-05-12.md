# Deep Extract — 2026-05-12

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| 오피오이드 처방 갱신 = 검증 신호 — 소통 전략 | by-disease/chronic-pain-integrative.md | 2026-05-12-opioid-communication-validation.md | [INSIGHTS] | 41574586 | 2026-05-11 (과거 누락 복구) |
| HCRS + Oncuria — 초진 방광암 선별 | by-disease/hematuria.md | 2026-05-12-hcrs-oncuria-hematuria.md | [CLINICAL] | 40846188 | 2026-05-11 (과거 누락 복구) |
| 고립성 이완기 고혈압 — 강압제 MACE 동등 감소 | by-disease/hypertension.md | 2026-05-12-isolated-diastolic-hypertension.md | [CLINICAL] | 41941743 | 2026-05-12 |
| 정신과 약물 감약 + 낙상 — 고충실도 OR 0.61 | guidelines/deprescribing.md | 2026-05-12-psychotropic-deprescribing-falls.md | [CLINICAL] | 41791728 | 2026-05-12 |
| SDM 블렌디드 훈련 — GP 기술 단기 2배 향상 | by-disease/continuity-of-care.md | 2026-05-12-sdm-blended-training-gp.md | [INSIGHTS] | 42104282 | 2026-05-12 |
| 만성기침 CHS 패러다임 — 삼두마차 이후 단계 | by-disease/chronic-cough.md | 2026-05-12-chronic-cough-chs.md | [CLINICAL — 조건부] | 39839174 | 2026-05-12 |

## 이미 처리된 항목 (마커 업데이트만)

| 논문 | 기존 처리일 | knowledge/ 위치 | 기존 study note |
|---|---|---|---|
| 급성 발목 염좌 AFP | 2026-05-02 | by-disease/ankle-sprain.md | 2026-05-02-ankle-sprain-afp-peace-love.md |
| 올란자핀 OINV 예방 5mg×5일 | 2026-05-10 | by-disease/palliative-pain.md | 2026-05-10-olanzapine-oinv-prophylaxis.md |
| 4Ms 노인 평가 프레임워크 | 2026-05-06 | by-disease/geriatric-assessment-4ms.md | 2026-05-06-geriatric-4ms-assessment.md |
| ASPREE 생활습관 4요소 복합 | 2026-05-10 | by-disease/frailty.md | 2026-05-10-lifestyle-healthspan-aspree.md |
| 외래 지연진단 — 의무기록 파편화 | 2026-05-06 | by-disease/delayed-diagnosis.md | 2026-05-06-delayed-diagnosis-outpatient.md |

## 핵심 요약

### 오피오이드 처방 갱신 = 검증 신호 (PMID 41574586)
오피오이드 처방 갱신은 환자에게 통증 인정의 신호, 거절은 불신으로 경험된다. 감량 대화 시 먼저 validation → "덜 처방 ≠ 불신" 재프레이밍이 핵심 소통 전략. ICE 프레임과 결합하면 만성통증 감량 대화의 장벽을 낮출 수 있다.

### HCRS + Oncuria 방광암 선별 (PMID 40846188)
HCRS 단독 민감도 90.9%·NPV 97.8%. 미세혈뇨에서 두 검사 병용 시 NPV 98.7%. 고령 여성 무증상 미세혈뇨를 UTI로만 귀인하기 전 HCRS 계산 + Oncuria 채취로 저위험 환자 선별, 불필요한 비뇨기과 의뢰 최소화.

### 고립성 이완기 고혈압 치료 (PMID 41941743)
"이완기만 높은데 약을 써야 하나?" 딜레마 해소. 강압제가 IDH에서도 기타 고혈압 형태와 동등하게 MACE 감소. Ann Int Med JC GIM/FP/GP 직접 적용 등급 명시.

### 정신과 약물 감약 낙상 예방 (PMID 41791728)
효과는 고충실도(구조화 프로토콜 기반) 프로그램에서만 — 지역사회 OR 0.61, 입원 OR 0.43. 막연한 "줄여봅시다" 접근은 효과 없음. STOPP 기준 + 단계적 감량 + 교육 병행 필수.

### SDM 블렌디드 훈련 (PMID 42104282)
e-learning + 시뮬레이션 환자 조합으로 OPTION12 2배, Cohen's d=2.39 대형 효과. SDM·ICE는 타고나는 기술이 아닌 훈련으로 획득 가능. 소규모 파일럿(n=10) 한계 있음.

### 만성기침 CHS 패러다임 (PMID 39839174)
삼두마차(UACS·천식·GERD) 모두 다뤄도 지속되는 만성기침 → 기침 과민성 증후군(CHS) 재개념화. amitriptyline·gabapentin·duloxetine(RCT)·speech therapy. "심인성"으로 치부하던 환자에게 구조화 치료 경로 제공.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/chronic-pain-integrative.md, by-disease/hematuria.md, by-disease/hypertension.md, guidelines/deprescribing.md, by-disease/continuity-of-care.md, by-disease/chronic-cough.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장

## 과거 누락 복구

과거 Scout 파일에서 누락된 `[o]` 항목을 이번 실행으로 복구:
- PMID 41574586 (오피오이드 소통) — 출처 `inbox/scout/2026-05-11.md`
- PMID 40846188 (HCRS 혈뇨) — 출처 `inbox/scout/2026-05-11.md`

## 처리 한도 메모

- 총 `[o]` 마커: 11건 (05-11: 2건, 05-12: 9건)
- 실제 신규 추출: 6건 / 이미 처리된 항목 마커 업데이트: 5건
- 유효 신규 작업(6건)은 10건 한도 이내 — 전량 처리 완료