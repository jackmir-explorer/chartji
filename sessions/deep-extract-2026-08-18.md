# Deep Extract — 2026-08-18

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| Cannabis-Based Products for Chronic Pain (Chou R et al.) | knowledge/by-disease/cannabinoid-chronic-pain.md (신규) | inbox/study-notes/2026-08-18-cannabinoid-neuropathic-pain-nabilone.md | [CLINICAL — 조건부] | 41429020 | 2026-08-16 |
| NCCN Adult Cancer Pain v2.2025 (Swarm RA et al.) | knowledge/by-disease/cancer-pain-supportive-care.md (보강) | inbox/study-notes/2026-08-18-nccn-cancer-pain-v2-2025.md | [CLINICAL] | 40639401 | 2026-08-17 |
| Primary Care Continuity and Hospitalization in Older Adults (Caughey GE et al.) | knowledge/by-disease/continuity-of-care.md (기반영 확인) | inbox/study-notes/2026-08-18-known-pcp-hospitalization-reduction.md | [CLINICAL — 조건부] | 42050887 | 2026-08-18 |

## 핵심 요약

### 칸나비노이드 — 만성 비암성 통증 (PMID:41429020)
25개 RCT SR (n=2,303; 64% 신경병증 통증). **Nabilone (합성 THC)만 효과 확인** (–1.59/10), dronabinol 효과 없음, CBD 단독 효과 없음. THC/CBD 병합 소폭 효과(–0.54) + 부작용 증가. 신규 knowledge 파일 생성. 미르 반응(nabilone 신경통증 사용 고려)에 따라 nabilone 외래 적용 조건·한국 가용성 확인 [출처 미확인] 포인트 강조.

### NCCN 암성통증 가이드라인 v2.2025 (PMID:40639401)
2025 핵심 변화: "Judicious use of opioids" — 과소·과다 양방향 위험 강조. 3축 구조(선별·처방·감량). 암생존자 오피오이드 감량 원칙 신설 (10-25%/주, 급격 중단 금지). cancer-pain-supportive-care.md에 섹션 추가. 미르 반응("방대해서 핵심 요약 필요")에 따라 1차의료 관점 3축 요약으로 응답.

### 단골 주치의와 노인 입원율 감소 (PMID:42050887)
Knowledge 기반영 확인 (continuity-of-care.md에 이미 존재). Study-note 신규 생성. 미르 반응(Factfulness 관점 — 화려하지 않지만 유의미한 효과)에 따라 "왜 같은 의사에게 계속 다녀야 하는가"의 환자 설명 근거, 예방 중심 방문 패턴의 중요성 심화.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 knowledge/by-disease/cannabinoid-chronic-pain.md · knowledge/by-disease/cancer-pain-supportive-care.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함)
- 섹션↔출처 주제 일치 자가검증
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)
