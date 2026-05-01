# Deep Extract — 2026-05-01

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| 편두통 예방 처방 체계 (AFP 2025) | knowledge/by-disease/migraine.md (신규) | inbox/study-notes/2026-05-01-migraine-prophylaxis.md | [CLINICAL, REGULATORY] | 40378325 | 2026-04-30 |
| 항우울제 PETRUSHKA RCT (JAMA 2026) | knowledge/by-disease/depression-screening.md (추가) | inbox/study-notes/2026-05-01-petrushka-antidepressant-rct.md | [CLINICAL] | 41779422 | 2026-04-30 |
| 자궁경부암 스크리닝 HPV (AFP 2026) | knowledge/by-disease/cervical-cancer-screening.md (신규) | inbox/study-notes/2026-05-01-cervical-cancer-screening-hpv.md | [REGULATORY] | 41839104 | 2026-04-30 |

## 핵심 요약

### 편두통 예방 처방 체계 (PMID:40378325)
AFP 2025 리뷰. 1차: propranolol·metoprolol·topiramate·divalproex·CGRP 길항제. 2차: amitriptyline·venlafaxine. 만성 편두통: Botox 승인, 중단율 낮음. CGRP 비용·보험 장벽이 실제 처방 제약. propranolol·topiramate는 일차의료 직접 시작 가능.

### 항우울제 개인맞춤 결정지원 (PMID:41779422)
JAMA 2026, 3개국 47기관 540명 RCT. PETRUSHKA 도구로 증상 맞춤 처방 시 8주 중단율 27%→17% (RR 0.62), 24주 PHQ-9 7.1 vs 9.2. 첫 항우울제 처방 정확도가 치료 결과를 결정. 비맹검·탈락률 높음의 한계 존재.

### 자궁경부암 스크리닝 (PMID:41839104)
AFP 2026 리뷰. ACS: 25세부터 primary HPV q5y. USPSTF 2024 초안: 30세부터 primary HPV q5y, 21~29세 세포검사 q3y. 65세 종료(최근 25년 고등급 CIN 없고 60·65세 음성 확인). 비정상 결과 → ASCCP 2019 위험 기반 관리.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 by-disease/migraine.md, by-disease/depression-screening.md, by-disease/cervical-cancer-screening.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)
