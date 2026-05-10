# 심장 초음파 POCUS — AI 강화 집중심장초음파 (FoCUS) [CLINICAL — 조건부]

tags: [CLINICAL — 조건부]
keywords: FoCUS, 집중심장초음파, cardiac POCUS, AI 초음파, 핸드헬드 초음파, handheld ultrasound, LV 기능, 판막질환, 심낙삼출, 비심장전문의

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2026
applicability: 외래·응급실·병동 — 비심장전문의 심장 POCUS AI 활용
parents: []
relations: [[pocus-lung]], [[pocus-primary-care-efsumb]], [[pocus-abdominal]]

> primarySources (Tier 1):
> - Fisher L et al. Artificial Intelligence-Enhanced Cardiac Point-of-Care Ultrasound: A Prospective Single-Arm Study. Mayo Clin Proc Digit Health. 2026 Mar;4(2):100355. PMID:42094314, DOI:10.1016/j.mcpdig.2026.100355

---

## 핵심 수치 (notes)

> [출처: Fisher L et al. Mayo Clin Proc Digit Health 2026;4(2):100355. PMID:42094314]
> 전향적 단일군 연구, 660명 성인 (응급실·내과 병동), 2022-07~2023-12

| 지표 | 결과 |
|---|---|
| 임상적으로 관련된 심장 소견 발견 | **29% (193/660)** |
| 새 소견으로 치료 수정 | **7% (49/660)** |
| 중재적 시술 필요 | 1.4% (9/660) |
| LV 기능 저하 및 판막 질환 | 고감도로 탐지 |
| 우심계 이상 | **감도 낙음** |

---

## 적응 환자군 (indication)

- 임상적 의심 존재하거나 일상 평가 중 심장 평가가 필요한 외래·입원 환자
- 비심장전문의(가정의학과·일반내과·응급의학과) 시행 시 AI 알고리즘 보조
- 특히 **LV 기능 저하·판막 이상·심낙삼출** 선별 목적

---

## 처방/치료 (protocol)

**AI 보조 FoCUS 워크플로우:**
1. 핸드헬드 초음파 + AI 알고리즘 소프트웨어 연결
2. 비심장전문의 집중 훈련 후 시행 (표준화 교육 필수)
3. AI 자동 분석: 심실 기능·판막 질환·심낙삼출·IVC 크기
4. AI 이상 소견 flagging → 심장 전문의 확진 또는 추가 영상 결정

**POCUS 일차의료 적용 맵 (외래):**
- 호흡 공난 + 하지 부종 → LV 기능·판막·삼출 확인
- 부정맥 환자 → LV 기능 기저 확인
- 고혈압·심부전 위험군 → 선별 목적 FoCUS 고려

---

## 주의사항 (precaution)

- **우심계 이상 (우심실 기능·삼첨판막 질환)**: 감도 낙음 — FoCUS 음성이어도 임상 의심 지속 시 공식 심초음파 의뢰
- 비심장전문의 시행 시 집중 훈련 필수 (5시간 미만 훈련으로 시작 가능, 지속 교육 필요)
- 이 연구는 응급·병동 세팅 — 외래 일차의료 직접 외삽 주의 [초록 기반 — 전문 미확인]

---

## 비교 (comparison)

| 항목 | AI 보조 FoCUS | 표준 심초음파 |
|---|---|---|
| 시행자 | 비심장전문의 가능 | 초음파 전문사·심장전문의 |
| 장점 | 즉시 가용, 치료 수정 가능 | 전체 심장 평가 표준 |
| 한계 | 우심계·복잡 판막 평가 제한 | 예약 대기, 비용 |
| 적합 | 선별·임상 결정 보조 | 확진·복잡 케이스 |

---

## 의뢰 기준 (referral)

- AI FoCUS에서 이상 소견 발견 → 심장전문의 공식 심초음파 의뢰
- 우심계 이상 임상 의심 (폙고협압·RV 부전) → 직접 심초음파 의뢰 (FoCUS 우회)
- 심낙삼출 발견 + 혁역학적 불안정 → 즉시 의뢰

---

---

## GP POCUS — 호흡곤란 심부전 감별 (일차의료 훈련 연구) [CLINICAL]

> [출처: Kiss-Kovács R et al. Point-of-care ultrasound improves the diagnosis of heart failure in patients with dyspnea in primary care. Front Med (Lausanne). 2026 Feb 13;13:1721066. PMID:41767524, DOI:10.3389/fmed.2026.1721066]
> 전향적 타당성 연구, 4개 일차의료 기관, 신규 숫참 환자 102명, GP 핸드헬드 POCUS 시행

### 핵심 수치

| 지표 | POCUS 전 (임상 판단) | POCUS 후 |
|---|---|---|
| **민감도** | 85.3% | **86.8%** |
| **특이도** | 38.2% | **88.2%** |
| PPV | 73.4% | **93.7%** |
| NPV | 56.5% | **76.5%** |
| **Cohen's κ** | 0.254 | **0.723** |

- 특이도 38% → 88%: 불필요한 순환기 의뢰 감소 핵심 지표
- GP B-lines·LVEF 판독이 심장초음파 전문의 결과와 강한 상관

### GP POCUS 프로토콜 (이 연구)
- **폐 POCUS**: B-line 정량화 (≥3/zone 심부전 시사)
- **FoCUS**: LVEF 시각 평가 (preserved vs reduced)
- 사용 장비: 핸드헬드 초음파 (포켓형)
- 훈련: **단기 집중 교육** 후 실전 적용 가능 (훈련 시간 미명시; "brief training")

### 외래 적용 포인트
- 신규 숫참 환자 → 임상 판단만으로는 특이도 38% (심부전 아닌데 의심) → POCUS 추가 시 88%로 향상
- 폙 B-line 3개 이상 + LVEF 시각 저하 → 심부전 가능성 높음 → 즉각 치료·의뢰
- 폙 B-line 없음 + 정상 LVEF → 심부전 낙음 → 타 원인 감별 우선
- 훈련된 GP도 일차의료 세팅에서 즉시 적용 가능

---

## 출처 학습 노트

- study-note: [[2026-05-08-ai-focus-cardiac-pocus]]
- study-note: [[2026-05-10-pocus-hf-primary-care-gp]]
