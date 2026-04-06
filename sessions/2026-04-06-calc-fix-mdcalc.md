# 세션 기록 — 계산기 수정 (MDCalc 전환)

## 세션 정보
- 날짜: 2026-04-06
- 버전: v19
- 작업명: calc-fix-mdcalc

## 결정 배경
- 이상지질혈증 ASCVD: Pooled Cohort Equations 자체 구현이 부정확 (interaction term 누락, 계수 오류). 항상 100% 출력.
- 골다공증 FRAX: URL 오타 ("frfrax.com") → 링크 깨짐
- BMI는 공식 단순 (체중/신장²)하므로 자체 유지

## 건드린 파일

### 수정 (3개)
- src/templates.js — dyslipidemia: fields+calculate 제거 → externalLink(MDCalc)+referenceTable / osteoporosis: URL 수정
- rules/file-ownership.md — calculate() 보유 목록 obesity만, externalLink 목록 추가

## 수정 상세

### templates.js
- dyslipidemia: fields[] 8개 + calculate() 50줄 전부 제거
  - 추가: externalLink → MDCalc ASCVD calc/3398
  - 추가: referenceTable "위험도별 LDL 목표" (4단계)
- osteoporosis: url "https://frfrax.com" → "https://frax.shef.ac.uk/FRAX/tool.aspx?country=25"
  - label도 "(Sheffield)"로 수정
- obesity: 변경 없음 (BMI 자체 계산 유지)

### file-ownership.md
- calculate() 보유: obesity만
- externalLink 보유: dyslipidemia (MDCalc), osteoporosis (FRAX)

## 판정
QA 통과.

## 회고
- 임상 계산기 자체 구현은 검증 비용이 높음. 단순 공식(BMI)만 자체, 복잡 모델(PCE, FRAX)은 외부 링크가 안전
- 위험도→LDL 목표 참조표 추가로 MDCalc에서 결과 확인 후 바로 대조 가능
