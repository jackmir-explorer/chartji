# 2026-05-07 — Overwrite-fix (20건 데이터 손실 수습 + 룰 보강)

## 세션 정보
- 날짜: 2026-05-07
- 작업: 8개 entry 그룹의 KNOWLEDGE_BUNDLE 키 중복 할당 (v2/v2_full 덮어쓰기) 수습
- 호출 트리거: 미르 결단 A — 일괄 수정
- 작업 브랜치: `claude/overwrite-fix-2026-05-07`
- 백업: `src/knowledge-bundle.js.bak-overwrite-fix`
- 변환 로그: `/tmp/overwrite-fix-log.txt`

## 결정 배경
2026-05-07 Liby cleanup 후 검증 중 8개 entry 그룹 / 20건 키 중복 할당 발견 (palliative-pain·glp1 사건과 동일 패턴: `KNOWLEDGE_BUNDLE["X"] = A; ... KNOWLEDGE_BUNDLE["X"] = B`). 후자가 전자를 덮어쓰며 데이터 손실. heart-failure-volume-overload(2026-05-06)·glp1-selection-strategy(2026-05-06)와 같은 사건 패턴 재발.

미르 결단: A — 지금 일괄 수정 + 재발 방지 룰 (auditor hard-check + librarian 절대 금지 + SKILL.md ingest 직전 체크).

## 건드린 파일
- `src/knowledge-bundle.js` — 8개 그룹 통합/분리/폐기 (백업 보존)
- `agents/auditor.md` — 키 중복 hard-check 항목 신설
- `agents/librarian.md` — 절대 금지에 "동일 키 재할당 금지" 신설
- `skills/knowledge-ingest/SKILL.md` — Step 7 직전 grep 체크 신설
- `sessions/2026-05-07-overwrite-fix.md` — 본 세션 기록

## 8개 그룹 결단 요약
| 그룹 | 결단 | 사유 |
|---|---|---|
| xerostomia | (c) v2 폐기 | v2_full이 동일 PMID + Affoo 추가 + exam 섹션 → 상위집합 |
| BMS | (c) v2 폐기 | v2_full이 동일 PMID + 시진/뮤테란/미르 routine 추가 → 상위집합 |
| CKD | (b) 분리 | _ckd_monitoring_v2(topic)와 _ckd_v2_full(disease) 별개 도메인. CKD/만성콩팥병→disease, ckd-monitoring/UACR/UPCR→topic |
| MASH | (a) 통합 | 같은 disease, 보완 컨텐츠. v2_full에 v2의 GLP-1 네트워크 메타 흡수 |
| frailty | (a) 통합 | 같은 syndrome, ITC 2026(disease) + Serra-Prat 2025(회복률) 보완. v2_full에 통합 (kind=disease) |
| HF-POCUS-DUCS | (a) 통합 | 같은 topic, v2_full(disease, parents=hf)에 v2의 protocol 흡수 |
| 침샘염 | (c) alias 부분 폐기 | salivary-stones에서 제거, parotitis(이하선염)에 라우팅 |
| 편두통 | (c) alias 부분 폐기 | headache에서 제거 (keywords에서도 migraine·편두통 제거), migraine에 라우팅 |

상세 변경 항목: `/tmp/overwrite-fix-log.txt`.

## 룰 보강
1. **agents/auditor.md** — 감사 기준 표에 "키 중복 할당 (hard-check)" 행 추가. grep + 구문 분석으로 100% 검출, 즉시 조치 권고. 자동 수정 금지 (컨텐츠 결단은 미르).
2. **agents/librarian.md** — "절대 금지" 절에 "동일 키 재할당 금지" 항목 추가. 보완 ingest는 신규 키 또는 기존 entry 직접 보강.
3. **skills/knowledge-ingest/SKILL.md** — Step 7 직전에 ingest 직전 키 중복 grep 체크 절차 명문화.

## 판정
- 통과 ✓
- syntax: `node -c src/knowledge-bundle.js` → OK
- 키 중복 hard-check: **0건** (이전 20건)
- entry unique objects: 185 (5개 그룹 통합/폐기로 -5)
- alias 라우팅: 영향 alias 17개(구강건조증·구강건조·dry mouth·xerostomia·burning mouth·구강작열감·BMS·CKD·만성콩팥병·MASH·MASLD·지방간염·frailty·허약·노쇠·heart-failure-pocus-ducs·DUCS·VEXUS·침샘염·편두통) 모두 의도된 entry 라우팅 확인
- PMID 보존: 원본 127 = 현재 127 (0 손실)

## 다음 작업
- 미르가 main 머지 승인 후 머지·푸시.
- (후속 후보) bundle 안에 v2/v2_full 명명 패턴이 남아있는 entry 점검 — 의도적 분리(예: glp1-safety-comparison vs glp1-selection-strategy) 외에 의심 잔여 있는지 Auditor 후속 round.
- (후속 후보) Liby cleanup 후 추가로 발생할 수 있는 동일 패턴 사전 차단을 위해 CI/L3 스모크에 키 중복 hard-check 통합.

## 회고
- 예상과 달랐던 점: CKD는 처음에 "통합"으로 분류했으나 검토 시 _ckd_monitoring_v2(topic, ckd-monitoring·UACR/UPCR 한정)와 _ckd_v2_full(disease, VA/DoD CPG)이 분리하는 것이 의미 정합 — 권고대로 분리(b)로 결단.
- 그룹 1(xerostomia)·2(BMS)는 "통합" 후보였으나 v2가 v2_full의 부분집합이어서 폐기(c)가 안전. 임상 컨텐츠 손실 0.
- 다음 세션 반영: ingest 직전 grep 체크가 SKILL.md에 명문화되었으므로 Liby가 다음 ingest 시 반드시 실행. Auditor는 hard-check를 routine 감사에 포함.
