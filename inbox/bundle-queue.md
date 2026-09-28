# inbox/bundle-queue.md — bundle 컴파일 대기 큐

> Deep Extract Step 3.5-B가 자동 append하고, Liby가 처리하는 **신규 엔트리 큐**.
> 목적: bundle 미컴파일이 조용히 쌓이던 사건(2026-09-28 study-note gap 발견) 재발 방지.
> **보강은 이제 deep-extract가 자동 반영** — 이 큐엔 판단 필요한 **신규 엔트리**만 온다.

## 처리 규칙
- Deep Extract가 신규 엔트리(bundle 키 없음)·자동 보강 실패를 여기 한 줄 append.
- Liby 호출("bundle-queue 처리해줘") 시 각 항목을 `skills/knowledge-ingest/SKILL.md`로 처리 (kind·parents·uiHooks·Triage·중복판단).
- 처리 완료 시 줄 끝에 `✅ 처리 YYYY-MM-DD` 태그 (줄 삭제 금지 — 아래 Archive로 이동).
- SessionStart 훅·Deep Extract 완료 보고가 이 파일 미처리 건수를 표면화.

형식: `- [YYYY-MM-DD] <md 경로 또는 study-note> (PMID:xxx) — 사유: {신규 엔트리 | node -c 실패 | 구조변경 필요}`

---

## 대기 (신규 엔트리)

- [2026-05-14] inbox/study-notes/2026-05-14-episodic-vestibular-menopause.md (PMID:42108535) — 사유: 신규 엔트리 (knowledge md 없음, study-note-only). 중년여성 고립성 삽화성 전정증후군·편두통·폐경 이행
- [2026-05-14] inbox/study-notes/2026-05-14-tramadol-depression-risk.md (PMID:41921874) — 사유: 신규 엔트리 (knowledge md 없음, study-note-only). 장기 트라마돌↑ 근골격통증 환자 우울 위험

---

## 일회성 backlog — 05~07월 미컴파일 보강 (2026-09-28 study-note gap 발견, 21건)

> ⚠ 이 항목들은 **과거 deep-extract가 md는 갱신했으나 bundle 미컴파일**된 보강. 신규 Step 3.5가 앞으로는 자동 처리하지만, 과거분은 scout에 이미 ✅ 태그라 routine이 재수집 안 함 → **일회성 수동 컴파일 필요**. ("05~07월 backlog 처리해줘"로 Liby 호출.)

- [2026-05-06] knowledge/by-disease/dyslipidemia.md (PMID:41910315) — Ez-PAVE LDL55 집중강하
- [2026-05-06] knowledge/by-disease/prescribing-cascade.md (PMID:41865214) — NSAID·항고혈압→prochlorperazine cascade
- [2026-05-14] knowledge/by-disease/frailty.md (PMID:42117876) — 국제 노인의료 모델 비교
- [2026-05-14] knowledge/by-disease/hypertension.md (PMID:41950472) — IMPACTS-BP 팀기반 고혈압 RCT
- [2026-05-14] knowledge/by-disease/anemia.md (PMID:42024457) — PANDA 임신 철분 격일 투여
- [2026-05-14] knowledge/by-disease/frailty.md (PMID:41770608) — 활동 참여 후기우울 위험↓
- [2026-05-15] knowledge/by-disease/frailty.md (PMID:41842916) — 한국 허약노인 전환기 돌봄 질적연구
- [2026-05-15] knowledge/by-drug/glp1-selection-strategy.md (PMID:41867417) — GLP-1 과다졸림·철결핍
- [2026-05-15] knowledge/guidelines/deprescribing.md (PMID:42132490) — 재택의료 미확인 결정 letter
- [2026-05-15] knowledge/by-disease/anemia.md (PMID:42044770) — 동아시아 월경 실혈·철상태
- [2026-05-15] knowledge/by-disease/resistant-hypertension.md (PMID:41870448) — 저항성 고혈압 JAMA 2026 리뷰
- [2026-05-15] knowledge/by-disease/continuity-of-care.md (PMID:42095496) — 노인 계획외 입원 요인
- [2026-05-15] knowledge/by-disease/heart-failure-pocus-ducs.md (PMID:41747972) — VEXUS 급성심부전 예후 메타
- [2026-05-17] knowledge/by-disease/CKD.md (PMID:39428714) — CKD 노인 고용량 항바이러스 위험
- [2026-05-17] knowledge/by-disease/anemia.md (PMID:41916414) — IRON-5 젊은 여성 철결핍 선별
- [2026-05-17] knowledge/by-disease/depression-screening.md (PMID:41919405) — SDOH·노인 우울 발생
- [2026-05-17] knowledge/by-disease/diabetes-dyslipidemia.md (PMID:41461087) — T2DM 스타틴 기저위험별 효과
- [2026-07-03] knowledge/by-disease/recurrent-uti.md (PMID:42301870) — 여성 재발성 UTI AFP 2026
- [2026-07-03] knowledge/by-disease/statin-myopathy-management.md (PMID:42343053) — 스타틴 근독성 SINAM 접근
- [2026-07-25] knowledge/by-disease/sinusitis.md (PMID:39823615) — 급성 부비동염 RER
- [2026-07-25] knowledge/by-disease/incidental-physical-activity.md (PMID:41533422) — 일상 신체활동 CV·사망↓ POEM

---

## Archive (처리 완료)
<!-- 처리된 항목을 ✅ 태그와 함께 여기로 이동 -->
