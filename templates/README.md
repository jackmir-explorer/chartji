# templates/README.md — 템플릿 구조 설명

Working Draft 생성 시 CC 또는 진단에 따라 해당 템플릿을 프롬프트에 주입한다.
템플릿은 필수 필드를 강제하여 누락을 방지하고 차트 완성도를 높인다.

---

## CC → 템플릿 매핑

| 트리거 키워드 포함 시 | 로드할 템플릿 |
|----------------------|--------------|
| 당뇨, 혈당, HbA1c, 인슐린 | diabetes.md |
| 콜레스테롤, LDL, 스타틴, 고지혈증 | dyslipidemia.md |
| 비만, 체중, BMI, 살 | obesity.md |
| 요통, 허리, 무릎, 어깨, 관절, 근육통 | musculoskeletal.md |
| 소화불량, 복통, 속쓰림, 구역, 설사, 변비 | gastrointestinal.md |
| 불면, 수면, 피로, 무기력 | insomnia-fatigue.md |
| 골다공증, 골밀도, 비스포스포네이트 | osteoporosis.md |
| 갑상선, TSH, 레보티록신, 메티마졸 | thyroid.md |
| 우울, 불안, 공황, 항우울제, PHQ | depression-anxiety.md |

---

## 템플릿 구조 (각 파일 공통)

```
## 트리거 키워드       ← Triage가 CC 감지 시 사용
## 필수 포함 필드      ← Working Draft 생성 시 반드시 포함
## 주의 문구          ← 판단 검토 버튼 클릭 시 참조
```

---

## 추가 예정 템플릿

- hypertension.md (고혈압) — 이상지질혈증/당뇨와 자주 동반
- uri.md (상기도감염) — 급성 질환 템플릿 첫 번째
- asthma-copd.md (천식/COPD)
- anemia.md (빈혈)
