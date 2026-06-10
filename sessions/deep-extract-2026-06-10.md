# Deep Extract — 2026-06-10

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| Severe Hypertension: Evaluation and Treatment | by-disease/hypertension.md (보강) | inbox/study-notes/2026-06-10-severe-hypertension-afp.md | [CLINICAL] | 42202349 | 2026-06-02 |
| Evaluating lymphadenopathy | by-disease/lymphadenopathy.md (보강) | inbox/study-notes/2026-06-10-lymphadenopathy-jaapa.md | [CLINICAL] | 40358102 | 2026-06-02 |

## 핵심 요약

### Severe Hypertension: Evaluation and Treatment (AFP 2026, PMID:42202349)
BP ≥180/110 + 표적장기손상 없음 = "severe hypertension" — hypertensive emergency가 아님. 외래 1위 원인은 약물 비순응(→ 재복용/증량). 입원 치료는 단기 결과를 개선하지 않고 심혈관 사건·AKI·재원기간을 오히려 증가시킴. 단기작용·IV 항고혈압제 금기. 이차성 HTN 평가 4대 트리거: 저항성·점진적 악화·<30세·조기 TOD.

### Evaluating lymphadenopathy (JAAPA 2025, PMID:40358102)
PA·일차의료 대상 2025 포괄 리뷰. 7요소 평가(위치·크기·개수·경도·가동성·압통·동반증상)를 현행 임상 맥락에서 재확인. 악성 시사 특이 조합: supraclavicular(크기 무관) + >1cm+4주 이상+painless+firm+fixed + B symptoms. 지속 원인불명 LAP의 체계적 workup 강조 — 방치 금지.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/hypertension.md · by-disease/lymphadenopathy.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)
