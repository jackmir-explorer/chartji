# Deep Extract — 2026-07-03

## 처리한 논문

| 논문 | knowledge/ 저장 위치 | 공부 보고서 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|---|
| rUTI 여성: 진단·관리 종합 (AFP 2026) | knowledge/by-disease/recurrent-uti.md (보강) | inbox/study-notes/2026-07-03-recurrent-uti-afp-2026.md | [CLINICAL] | 42301870 | 2026-07-02 |
| 스타틴 근독성 실전 접근 — SINAM 포함 (JGIM 2026) | knowledge/by-disease/statin-myopathy-management.md (보강) | inbox/study-notes/2026-07-03-statin-myotoxicity-sinam-jgim-2026.md | [CLINICAL] | 42343053 | 2026-07-02 |

## 핵심 요약

### 여성 재발성 요로감염 (Zwahlen D, AFP 2026;113(6):568-577, PMID:42301870)

AFP 2026 종합 리뷰. 핵심 포인트 3가지: (1) 비임신 여성의 무증상 세균뇨는 치료하지 않는다, (2) 치료 기간 연장은 재발 감소 효과 없음, (3) 예방은 행동 수정 → 비항생제(크랜베리·D-만노스·질에스트로겐·메테나민·Lactobacillus) → 항생제 예방요법 순서로 단계적 접근. 기존 `recurrent-uti.md`에 위험인자 8종, 무증상 세균뇨 섹션, 예방 5종 비항생제 옵션 테이블 추가.

### 스타틴 근독성 실전 접근 (Ng IKS et al., J Gen Intern Med 2026, PMID:42343053)

SAMS 유병률 5~10% 재확인. SAMS 스펙트럼 4단계(경증→근병증→횡문근융해→SINAM) 체계화. **SINAM 조기 인식이 핵심**: 스타틴 중단 후에도 근통 지속·CK 유지·근력 저하 진행 시 anti-HMGCR 항체 검사 → 양성이면 면역억제(스테로이드±MTX/IVIG) 필요. 기존 `statin-myopathy-management.md`에 SINAM 섹션, 저친유성 스타틴 교체 우선 가이드(pravastatin·fluvastatin·rosuvastatin 격일) 추가.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 recurrent-uti.md, statin-myopathy-management.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)

## 처리 메모

- 2026-07-02 scout 파일에서 `[✓]` 마크된 3건 중:
  - Item 2 (PMID:40834375 AFP 2025 비암성통증): 기존 2026-05-07 처리 완료 — 스킵
  - Item 4 (PMID:42301870 AFP 2026 rUTI): 미처리 → 이번 실행에서 처리
  - Item 5 (PMID:42343053 JGIM 2026 스타틴): 미처리 → 이번 실행에서 처리
- 두 논문 모두 초록 기반 추출 (AFP/JGIM 전문 접근 불가)
- Scout 파일 마커: 이미 `[✓]` 상태 — 변경 불필요
