# Handheld Cardiac Ultrasound Guided by Artificial Intelligence to Detect Heart Failure Across Primary Care

- **PMID**: 42509170
- **저널 / 연도**: Ann Fam Med 2026;24(4):376
- **저자**: Segura-Rodríguez D et al.
- **출처 Scout**: inbox/scout/2026-09-17.md

## 미르의 첫 반응
> GP가 심장pocus는 어떤 요소들을 꼭 봐야하나?

## 미르 반응 심화 (이 노트의 핵심)

**GP가 심장 POCUS에서 반드시 체크해야 할 5가지 요소:**

### 1. LV 수축 기능 (EF 시각 평가)
- **뷰**: 파라스터널 장축(PLAX), 4-방 심첨
- **판단**: "EF 정상(≥50%)" vs "EF 감소(<40%)" vs "경계(40-50%)" — 시각적 eyeballing으로 구분
- **임상 의의**: EF 감소 = HFrEF → ACEi/ARNi + β차단제 + MRA + SGLT-2i 즉시 시작

### 2. 판막 이상 (스크리닝)
- **뷰**: PLAX(대동맥판·승모판) + 4-방(삼첨판)
- **주요 소견**: 칼슘화·두꺼워진 판막, 수축 제한, 색 도플러 역류 제트
- **AI 보조**: AI가 자동 탐지·flagging — 전문의 확진으로 이어지는 경로

### 3. 심낭 삼출
- **뷰**: 4-방 심첨, 검상돌기하 (subxiphoid)
- **판단**: 에코 없는 공간(anechoic space) 확인 → 소량/중량/대량 분류
- **압전 징후 확인**: IVC 확장 + 우심방 collapse → 심낭 압박 응급

### 4. IVC 크기·호흡 변이
- **뷰**: 검상돌기하 종단 스캔
- **정상**: IVC ≤2.1 cm + 흡기 시 50% 이상 허탈
- **이상**: IVC >2.1 cm + 변이 <50% → 중심정맥압↑ → 전신 울혈 시사

### 5. 폐 B-line (폐 POCUS 병행 권장)
- **뷰**: 앞가슴 좌우 각 2~4구역
- **정상**: A-line(수평 인공음영) 주도
- **이상**: B-line ≥3개/구역 → 폐포간질 액체↑ → 폐울혈 시사
- **핵심 조합**: B-line ↑ + EF 저하 = 심부전 강력 시사

## 초록 요약

초록 미제공. Scout 요약: AI 보조 핸드헬드 심장 초음파가 1차의료 외래 전반에서 심부전 검출에 유효한지 검증한 연구. 호흡곤란·부종·피로 주소 환자의 심부전 조기 선별 프로토콜을 외래 현장에서 구현 목적.

## 배경·방법

Ann Fam Med 2026, 1차의료 대상 AI 보조 핸드헬드 심장 POCUS. 기존 Fisher L et al. Mayo Clin Proc Digit Health 2026 (응급실·병동 660명)에 이어 **1차의료 외래** 세팅으로 확장 검증.

## 일차의료 적용 포인트

### 외래 결정 분기

```
신규 호흡곤란/부종/피로 환자
    ↓
핸드헬드 심장 POCUS + 폐 B-line
    ├─ EF 정상 + B-line 없음 → 심부전 낮음 → 타 원인 감별
    ├─ EF 저하 or B-line ↑ → 심부전 가능성↑ → BNP/NT-proBNP + 심장초음파 의뢰
    └─ 심낭 삼출 대량 or 판막 심각 이상 → 즉시 의뢰
```

### 한국 외래 변환 시 확인

- 핸드헬드 초음파(Butterfly iQ, Philips Lumify 등) 한국 보험 현황 [출처 미확인]
- 1차의료에서 GP POCUS 수가 청구 여부 [출처 미확인 — researcher 검증 권장]

## 한계·주의

- 초록 미제공 — 전문 확인 없이 Scout 요약 기반
- AI 알고리즘 성능은 기기·소프트웨어 버전에 따라 다름
- 훈련 없이 시행 금지 — 최소 FoCUS 교육 과정 이수 권장

## 관련 knowledge/ 엔트리

- [[pocus-focus-cardiac]] — 주 지식 엔트리 (이 노트 내용 반영됨)
- [[pocus-primary-care-efsumb]] — 1차의료 POCUS 커리큘럼
