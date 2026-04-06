# 세션 기록 — 이상지질혈증 계산기 (한국 가이드라인)

## 세션 정보
- 날짜: 2026-04-06
- 버전: v19
- 작업명: dyslipidemia-korean-guideline

## 결정 배경
기존 PCE(미국 ACC/AHA) 자체 구현이 부정확해서 MDCalc 링크로 전환했으나,
미르가 한국지질동맥경화학회 가이드라인 자료(위험인자 + 위험도별 LDL/non-HDL 목표) 제공.
위험인자 카운팅 → 위험군 분류 → 목표치 결정 로직은 단순 결정 트리라 자체 구현 안전.

## 근거 자료
- 죽상경화성 심혈관질환 위험인자 (LDL 이외): 연령, 가족력, 고혈압, 흡연, 저HDL
- 위험도별 LDL/non-HDL 목표치 표 (5단계)
- 고HDL(≥60) 보호인자 → 위험인자 1개 차감
- 표적장기손상 + 위험인자 ≥3 → LDL < 55 선택적 고려

## 건드린 파일

### 수정 (2개)
- src/templates.js — dyslipidemia: fields 10개 + calculate() 재작성
- rules/file-ownership.md — calculate() 목록에 dyslipidemia 복원

## 수정 상세

### templates.js — dyslipidemia
- externalLink + referenceTable 제거
- fields 10개: cad, ascvd, dm, organDmg, age, sex, fhx, htn, smoking, hdl
- calculate() 로직:
  1. CAD → 초고위험 (LDL < 55)
  2. ASCVD → 매우고위험 (LDL < 70)
  3. DM ≥10년 또는 DM+위험인자 또는 DM+표적장기손상 → 매우고위험 (LDL < 70)
  4. DM <10년 위험인자 없음 → 고위험 (LDL < 100)
  5. 위험인자 ≥2 → 중등도 (LDL < 130)
  6. 위험인자 ≤1 → 저위험 (LDL < 160)

## 판정
QA 통과. 가이드라인 원문 대조 완료.

## 회고
- 한국 가이드라인은 PCE와 달리 위험인자 카운팅 기반이라 구현 단순 + 검증 용이
- non-HDL 목표도 함께 표시하여 실제 진료 활용도 높임
