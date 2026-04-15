# by-disease/ — 질환/증상 단위 저장소

각 파일은 하나의 질환 또는 증상군을 다룬다.

## 파일 템플릿
```
# {질환명}

keywords: {Triage calcCategories 키워드}

## 문진/검사
## 처방/치료
## 감별진단
## Draft 출력사항 [DRAFT_APPEND]
```

## 분리 기준
파일이 600토큰(≈400자) 초과 시 섹션별 파일로 분리.
예: hypertension/ → exam.md / treatment.md / differential.md / caution.md
