# Deep Extract — 2026-04-23

## 처리한 논문

| 논문 | 저장 위치 | 태그 | PMID | 출처 Scout |
|---|---|---|---|---|
| 성호르몬 요법별 VTE·심혈관 위험 (NEJM) | knowledge/by-disease/vte-hormone-therapy.md (신규) | [CLINICAL] | 41985134 | 2026-04-18 |
| Tirzepatide 중단 후 체중 반동 (J Am Pharm Assoc) | knowledge/by-drug/mounjaro.md (추가) | [CLINICAL] | 41962807 | 2026-04-18 |
| CKD G3 이중 바이오마커 방정식 (BMJ) | knowledge/by-disease/CKD.md (신규) | [CLINICAL] | 41856526 | 2026-04-18 |
| GLP-1 RA NEJM 종합 리뷰 2026 | knowledge/by-drug/glp1-selection-strategy.md (추가) | [CLINICAL] | 41931049 | 2026-04-19 |
| 2024 일차의료 TOP 20 AFP POEM | knowledge/guidelines/primary-care-top20-2024.md (신규) | [INSIGHTS] | 40736492 | 2026-04-20 |

## 핵심 요약

### 성호르몬 요법별 VTE·심혈관 위험 (PMID:41985134)
COC는 VTE 위험 3~4배, 경피 에스트로겐은 경구 대비 위험 낮음. 혈전성향증 보유 환자에서 COC 금기 — 경피 제형 또는 프로게스틴 단독으로 대체. 수술 4주 전 중단 원칙. VTE 발생 시 즉시 항응고 + 호르몬 중단.

### Tirzepatide 중단 후 체중 반동 (PMID:41962807)
마운자로 중단 후 12개월 체중 변화 +1.9% (통계적 비유의). 중단 이유 80.7%가 비용 부담. 대체 비만약 전환 시 감량 효과 유지 — "끊을 거면 다른 비만약으로 전환"이 핵심 전략.

### CKD G3 이중 바이오마커 방정식 (PMID:41856526)
크레아티닌+시스타틴C 이중 방정식이 측정 GFR 변화 일치율 78.6% vs 크레아티닌 단독 73.1% (P<0.001). 크레아티닌 단독 eGFR은 GFR 저하를 과소평가할 수 있어 진행 조기 포착 실패 위험. CKD G3 추적 시 시스타틴C 추가 측정 권장.

### GLP-1 RA NEJM 종합 리뷰 (PMID:41931049)
기전: 위 배출 지연·글루카곤 억제·장내 미생물·시상하부 포만감. CV 보호 + 신기능 보호 RCT 근거 확립. **근육량·골밀도 감소 부작용 주의** — 고령·저근육 환자 기저치 확인 + 단백질 섭취·운동 병행 교육 필수. 중단 시 체중 회복 → 장기 유지 필요성 근거.

### 2024 AFP TOP 20 POEM (PMID:40736492)
IBS 2차 치료에 저용량 아미트립틸린, MI 후 보존 EF 환자에서 베타차단제 불필요, T2DM에서 CGM 효과 제한적·해 가능, 알코올 장애에 날트렉손/아캄프로세이트 1차 시도 가능. 알츠하이머 신규 단일클론항체 비권고.

---

## ⚠ 다음 단계 필수 — Liby 별도 호출

이 routine은 `knowledge/*.md` 파일 반영까지만 완료됐습니다.
앱 Guide/Hint/Draft에 실제 노출되려면 Liby를 별도로 호출하세요:

```
Liby 불러서 knowledge/by-disease/vte-hormone-therapy.md, knowledge/by-disease/CKD.md, knowledge/by-drug/mounjaro.md, knowledge/by-drug/glp1-selection-strategy.md, knowledge/guidelines/primary-care-top20-2024.md bundle 반영해줘
```

Liby가 수행할 작업 (자동화 제외 — 판단 필요):
- parents 필드 판단 (child→parent 맥락 확장)
- kind 부여 (disease / drug / topic)
- sections[].sources[] 채움 (TIPS 타입 공식화 포함 — `skills/knowledge-ingest/SKILL.md` 5-B)
- 섹션↔출처 주제 일치 자가검증 (SKILL.md 5-C)
- `src/knowledge-bundle.js` 엔트리 작성
- TRIAGE 감지 확장 (SKILL.md Step 8)

## 과거 누락 복구

과거 Scout 파일에서 누락된 `[o]` 항목을 이번 실행으로 복구:
- PMID:41985134 (성호르몬 VTE) — 출처 `inbox/scout/2026-04-18.md`
- PMID:41962807 (Tirzepatide 중단) — 출처 `inbox/scout/2026-04-18.md`
- PMID:41856526 (CKD G3 시스타틴C) — 출처 `inbox/scout/2026-04-18.md`
- PMID:41931049 (GLP-1 RA NEJM 리뷰) — 출처 `inbox/scout/2026-04-19.md`
- PMID:40736492 (AFP TOP 20 2024) — 출처 `inbox/scout/2026-04-20.md`

**잔여 미처리 `[o]` 항목 (다음 실행 대상):**
- PMID:41544290 (청소년 비만 GLP-1) — `inbox/scout/2026-04-20.md`
- PMID:40950820 (어지럼증 척추동맥 도플러) — `inbox/scout/2026-04-20.md`
- PMID:42000148 (독감백신 처방 기반 접종 모델) — `inbox/scout/2026-04-20.md`
- PMID:41839085 (전자담배 금연 효과) — `inbox/scout/2026-04-21.md`
- PMID:39535805 (GLP-1 RA 알코올사용장애) — `inbox/scout/2026-04-21.md`
- PMID:41839108 (비허혈성 심근증 가이드) — `inbox/scout/2026-04-23.md`
- PMID:41839073 (B형간염 스크리닝 업데이트) — `inbox/scout/2026-04-23.md`
