# Deep Extract — 2026-08-22

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| GPs의 진단 불확실성 대처 역량: 환자·의사 관점 정성 연구 | knowledge/by-disease/clinical-reasoning.md (보강) | inbox/study-notes/2026-08-22-gp-diagnostic-uncertainty-tolerance.md | [INSIGHTS] | 40152954 | 2026-08-22 |

## 핵심 요약

### GPs의 진단 불확실성 대처 역량 (Ghosh T, J Prim Health Care 2025)

영국 GP 3명 + 전문 환자 5명 포커스 그룹 정성 연구. 진단 불확실성을 "제거"가 아닌 "내성(tolerance)"으로 접근하는 4역량 제안:
① 협업(불확실성 공유), ② 공감(진단 단계 감정 탐색), ③ 통찰(자기 한계 인식), ④ 비관습적 사고(루틴 알고리즘 의문 제기).
미분화 증상이 많은 1차의료에서 특히 유효. 환자와 불확실성을 명시적으로 공유하는 스크립트 임상 적용 가능.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 knowledge/by-disease/clinical-reasoning.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)
