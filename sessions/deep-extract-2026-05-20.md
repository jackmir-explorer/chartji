# Deep Extract — 2026-05-20

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| GLP-1 RA 중 ONS 병용 체성분 효과 | knowledge/by-drug/glp1-selection-strategy.md | inbox/study-notes/2026-05-20-glp1-ons-body-composition.md | [CLINICAL — 조건부] | 42117035 | 2026-05-15 |

## 핵심 요약

### GLP-1 RA 치료 중 경구 영양보충(ONS) — 체성분 개선 후향 코호트

미국 외래 252명 후향 코호트(CEM 매칭). GLP-1 RA 치료 중 단백질 영양불량 진단 환자에 ONS 병행 처방 시 체지방 -8.4 lbs, 총 체중 -10.1 lbs, BMI -1.4 kg/m² 유의 감소(p<0.05). LBM도 -5.5 lbs 손실되나 fat:LBM 손실비 2.3으로 체성분 개선 방향 유지. 50세 미만·비당뇨 비만·181–365일 사용군에서 효과 가장 뚜렷. ⚠ 저자 3명 Abbott Nutrition(ONS 제조사) 소속 — COI로 독립 복제 전까지 신중 적용.

**외래 적용 포인트:** GLP-1 RA 처방 시 영양불량 고위험군(저체중·근감소·저활동) 식별 → ONS 병행 고려. 저항운동+단백질 ≥1.2g/kg/일 교육(Batiss 2026)과 함께 적용.

---

## 과거 누락 복구

Scout 파일 2026-05-15.md item 9 — `[ lo]` 표기(오타·`[o]` 의도 판단)로 이번 실행까지 미처리 상태였음. 이번 실행으로 복구.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 knowledge/by-drug/glp1-selection-strategy.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장
