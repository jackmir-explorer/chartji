# Deep Extract — 2026-08-21

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| 고독감과 Beers 기준 부적절 약물 시작 (Savage RD) | guidelines/deprescribing.md (보강) | inbox/study-notes/2026-08-21-loneliness-beers-pim-elderly-female.md | [CLINICAL — 조건부] | 42536335 | 2026-08-20 |

## 핵심 요약

### 고독감과 Beers 기준 부적절 진통제·정신과약 시작 — Drugs & Aging (Savage RD et al., 2026)

캐나다 온타리오 지역사회 거주 ≥66세 노인 2,348명 후향적 코호트 연구. **고독감(Three-Item Loneliness Scale ≥6)이 있는 고령 여성**은 Beers 기준 부적절 진통제 신규 시작 위험이 1080일 시점 HR 3.22 (95% CI 1.22–7.78)로 급상승. 부적절 정신과약도 유사 경향. **남성에서는 유의 연관 없음.** 임상 함의: 외래 고령 여성 환자 고독감 스크리닝 → Beers/STOPP 기반 약물 재검토 우선화 → 감약 파이프라인 구조화의 근거. 미르 반응 심화: 고독감의 신체화(사회적 고통의 신체화) 기전 가능성 + 처방 행동 매개 두 경로 검토, 외래 한 문장 스크리닝이 PIM cascade를 여는 게이트키퍼 역할.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 guidelines/deprescribing.md (PMID:42536335 고독감 섹션) bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (필요 시)

## 과거 누락 복구

없음 — 이번 실행 시점 기준 미처리 반응은 2026-08-20 scout 1건뿐.
