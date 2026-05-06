# 흉부 X-ray 검진 SOAP Template (기숙사 입소·일반검진)

tags: [TIPS]
keywords: 흉부엑스레이, chest xray, CXR, 기숙사 입소, 검진, Z115, general medical examination

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2026
applicability: 기숙사 입소·취업·검진용 CXR 결과지 작성 template
relations: []

> primarySources (Tier 1): `[TIPS — by 미르]` (외래 routine SOAP 양식, 미르 정리)

---

## 사용 맥락

- **기숙사 입소 검사** 등 결과지 발급용 SOAP 표준 양식
- 환자 증상이 없어 `URI Sx (-)` 표기로 무증상 검진 명시
- 상병코드 **Z115** (General medical examination)

---

## SOAP Template

```
CC:    기숙사 입소 검사

S:     URI Sx (-)

O:     V/S check

A:     General medical examination (Z115)

P:     Chest PA
```

---

## 변형

| 검진 목적 | CC 변형 |
|---|---|
| 기숙사 입소 | 기숙사 입소 검사 |
| 취업 검진 | 취업 검진 |
| 학교 입학 | 학교 입학 검사 |
| 단순 흉부 검진 (URI 사후 확인 등) | 흉부 검진 |

---

## 비고

- 환자가 호흡기 증상 동반 시 별도 SOAP 작성 (CC = "기침·가래·호흡곤란" 등) — 본 template 부적합
- 발열·체중감소 등 system 증상이 있으면 결핵·악성 감별 필요
