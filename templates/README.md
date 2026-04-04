# templates/README.md — 템플릿 구조 설명

Working Draft 생성 시 transcript 맥락을 분석해서 해당 템플릿을 프롬프트에 주입한다.
템플릿은 질환별 필수 필드를 강제하여 누락을 방지하고 차트 완성도를 높인다.

---

## 템플릿 선택 방식

**키워드 매칭이 아닌 맥락 기반 판단.**
Working Draft 생성 시 Claude API가 transcript 전체를 읽고
아래 카테고리 중 해당하는 것을 판단한다. 해당 없으면 null.

특정 단어가 없어도 대화 맥락상 해당 질환이 주제이면 선택된다.
예: "혈당이 좀 높다고 하던데요" → diabetes 선택

---

## 카테고리 목록

| 카테고리 키 | 해당 템플릿 | 판단 기준 |
|------------|------------|----------|
| diabetes | diabetes.md | 혈당 조절, 인슐린, 당뇨 관련 대화 |
| dyslipidemia | dyslipidemia.md | 콜레스테롤, 지질, 스타틴 관련 대화 |
| obesity | obesity.md | 체중 감량, 비만 치료 관련 대화 |
| musculoskeletal | musculoskeletal.md | 관절/근육/척추 통증 관련 대화 |
| gastrointestinal | gastrointestinal.md | 소화기 증상 관련 대화 |
| insomnia | insomnia-fatigue.md | 수면 장애, 만성 피로 관련 대화 |
| osteoporosis | osteoporosis.md | 골밀도, 골다공증 치료 관련 대화 |
| thyroid | thyroid.md | 갑상선 기능/결절 관련 대화 |
| depression | depression-anxiety.md | 우울, 불안, 기분 장애 관련 대화 |

---

## 템플릿 구조 (각 파일 공통)

```
## 필수 포함 필드   ← Working Draft 생성 시 주입 (언급된 항목만 포함)
## 주의 문구       ← 판단 검토 버튼 클릭 시 참조 (Working Draft 생성 시 미사용)
```

---

## 추가 예정 템플릿

- hypertension.md (고혈압)
- uri.md (상기도감염)
- asthma-copd.md (천식/COPD)
- anemia.md (빈혈)
