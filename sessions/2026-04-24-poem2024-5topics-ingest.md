# 2026-04-24 AFP 2024 POEM 5건 Liby Ingest

## 세션 정보
- 날짜: 2026-04-24
- 작업: AFP Top 20 POEMs 2024 중 미르 deep dive 요청 5건 → knowledge 엔트리 생성
- 건드린 파일:
  - `knowledge/by-disease/post-mi-deprescribing.md` (신규)
  - `knowledge/by-disease/gallstones.md` (신규)
  - `knowledge/by-disease/alcohol-use-disorder.md` (신규)
  - `knowledge/by-drug/anti-amyloid-mab.md` (신규)
  - `knowledge/by-drug/cgm-t2dm.md` (신규)

---

## 배경

미르가 AFP 2024 POEM 5건(CGM T2DM / 단순 담석 / 날트렉손·아캄프로세이트 / Alzheimer mAb / MI 후 BB) deep dive 요청. PubMed로 원논문 확보 후 Liby ingest 합의.

## 선택지와 결정

**옵션 A 선택** — 5개 동시 draft 생성 → 일괄 ingest.
**최종 경로 옵션 C 선택** — Researcher 공식 검증 생략 (Claude가 PubMed 직접 조회로 1차 검증 완료), 즉시 커밋·main 반영.

## Builder 결과

### 파일 매핑
| POEM | 경로 | kind | primary source |
|---|---|---|---|
| BB post-MI preserved EF | `by-disease/post-mi-deprescribing.md` | disease | REDUCE-AMI (NEJM 2024, PMID 38587241) |
| 단순 담석 관찰 관리 | `by-disease/gallstones.md` | disease | C-GALL (BMJ 2023, PMID 38084426) |
| AUD 약물치료 | `by-disease/alcohol-use-disorder.md` | disease | McPheeters SR (JAMA 2023, PMID 37934220) + Bernstein (PMID 38551564) |
| Alzheimer 항아밀로이드 mAb | `by-drug/anti-amyloid-mab.md` | drug | CLARITY AD (PMID 36449413) + TRAILBLAZER-ALZ 2 (PMID 37459141) |
| CGM 비인슐린 T2DM | `by-drug/cgm-t2dm.md` | drug | AFP POEM 2024 해석 (PMID 40736492) |

### 규칙 준수 체크
- ✅ v2 B2 스키마 (primarySources + 표준 섹션 key)
- ✅ parents 판단 완료 — 5건 모두 상위 엔트리 없음 → `parents: []` 명시
- ✅ drug 엔트리 2건(`anti-amyloid-mab`, `cgm-t2dm`) uiHooks 오버라이드 명시 (`{guide: ["*"]}`) — indication/dosing/counseling/notes 등 추가 섹션 Guide tab 노출 보장
- ✅ 섹션 key 모두 section-vocabulary.md 표준 18+ 항목 내에서 사용
- ✅ Tier 1 출처 DOI·PMID 명시, 섹션별 출처 라인 부착
- ⏭️ Researcher 공식 서브에이전트 호출 생략 (옵션 C 선택) — PubMed 1차 검증으로 대체

### 핵심 임상 수치 요약
- **REDUCE-AMI**: N=5,020, LVEF ≥50% MI 환자에서 BB 장기 처방 사망·재MI 이득 없음 (HR 0.96, 95% CI 0.79-1.16)
- **C-GALL**: N=434, SF-36 bodily pain AUC 18mo 차이 없음 (MD 0.0, 95% CI -1.7 to 1.7); 보존군 70% 이상 수술 회피
- **McPheeters AUD SR**: 118 trials N=20,976, naltrexone 50mg NNT 11 (heavy drinking), acamprosate NNT 11 (any drinking)
- **Lecanemab CLARITY AD**: CDR-SB Δ -0.45 (MCID 미달), ARIA-E 12.6%
- **Donanemab TRAILBLAZER-ALZ 2**: iADRS Δ +3.25 (MCID 미달), ARIA-E 24.0%, 치료 관련 사망 3건

## Reviewer / QA
- 옵션 C 선택으로 공식 Reviewer 단계 생략
- 추후 세션에서 각 파일 Auditor 호흡 대상 (drug kind uiHooks 정합성·섹션 key vocabulary drift)

---

## 결과
- 판정: 통과 (미르 옵션 C 승인)
- 다음 작업:
  - 필요 시 해당 엔트리 Triage detectedCalcs 감지 확장 (`src/prompts.js` TRIAGE_PROMPT) — CLAUDE.md `rules/forbidden.md` Liby § 자동 실행 규칙 적용 대상 여부 판단
  - 후속 Auditor 세션에서 vocabulary drift 검증

## 회고
- **예상과 달랐던 점**: 처음엔 5건 각각 Researcher 서브에이전트 호출 계획이었으나, 미르가 옵션 C로 공식 검증 생략 선택 → 속도 우선.
- **다음 세션 반영**: POEM 다음 배치(같은 Grad/Ebell 2024 리스트의 나머지 항목들 — 항생제·RSV·옴·rUTI·IBS 등) ingest 시에도 동일 경로(Claude PubMed 직접 조회 → draft → 옵션 C) 재현 가능. 재현 가능한 패턴 축적 관점에서 Liby ingest 단축 경로로 등록 고려.

## 세션 종료 체크리스트
- (a) 다음 세션 참조 필요 → **YES** (knowledge 엔트리는 향후 inject 경로로 소비됨)
- (b) routine/trigger/CI 영향 → **YES** (KNOWLEDGE_BUNDLE 빌드 대상 추가)
- (c) 다른 브랜치·외부 시스템 의존 → 없음
- → **main 직접 머지 + 원격 푸시 수행** (현재 브랜치 이미 main, 커밋 후 push)
