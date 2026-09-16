# Deep Extract — 2026-09-16

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| 실외활동·근시 메타분석 (중국 아동) | guidelines/myopia-outdoor-activity-taiwan.md (보강) | inbox/study-notes/2026-09-16-outdoor-activity-myopia-chinese-meta.md | [CLINICAL] | 41928550 | 2026-09-13 |
| 장기 오피오이드 치료 AFP 리뷰 | by-disease/chronic-pain-integrative.md (보강) | inbox/study-notes/2026-09-16-long-term-opioid-therapy-afp.md | [CLINICAL] | 40531149 | 2026-09-15 |

## 핵심 요약

### 실외활동·근시 메타분석 (PMID:41928550)
중국 아동·청소년 31개 연구 380,215명 SR/MA. 하루 2시간 이상 실외활동 → 근시 위험 OR=0.74 (95% CI 0.69–0.80). 天天120(120분 정책)의 용량 임계치를 독립 검증. 환자교육에서 "하루 2시간 밖에서 놀기"를 구체 수치로 제시 가능.

### 장기 오피오이드 치료 AFP 리뷰 (PMID:40531149)
AFP 2025 임상 리뷰. 만성 비종말성 통증에서 오피오이드는 최후 선택지. 처방 전 OUD 위험 평가·기능 목표 설정 필수. 모니터링: UDS + PDMP. 부프레노르핀은 OUD 위험군에서 전통 오피오이드보다 안전한 대안으로 권고. 미르 반응("한국에서는 부프레노르핀 못 쓰는 것 같다") 심화: 한국에서 패치 형태 가능 여부는 불확실, Suboxone은 일차의료 접근 어려움 — researcher 검증 권장.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 guidelines/myopia-outdoor-activity-taiwan.md, by-disease/chronic-pain-integrative.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장

---

## 과거 누락 복구

해당 없음 — 2건 모두 최근 scout 파일 처리.
