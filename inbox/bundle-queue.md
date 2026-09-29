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

(없음 — 2026-09-29 전량 처리 완료)

---

## Archive (처리 완료)

### 2026-09-29 — queue 전량 처리 (미르 "queue 처리")
**신규 엔트리 3건** (bundle 신규 + Triage 등록):
- incidental-physical-activity (PMID:41533422) — 우발적 신체활동 CV 이점 ✅ 처리 2026-09-29
- episodic-vestibular-syndrome (PMID:42108535) — 중년여성 삽화성 전정증후군·폐경 ✅ 처리 2026-09-29
- tramadol-depression (PMID:41921874) — 장기 트라마돌 우울 위험 ✅ 처리 2026-09-29

**일회성 05~07월 보강 20건** (기존 엔트리 섹션 추가):
- dyslipidemia(41910315)·prescribing-cascade(41865214)·frailty(42117876·41770608·41842916)·anemia(42024457·42044770·41916414)·hypertension(41950472)·glp1-selection-strategy(41867417)·deprescribing(42132490)·resistant-hypertension(41870448)·continuity-of-care(42095496)·heart-failure-pocus-ducs(41747972)·CKD(39428714)·depression-screening(41919405)·diabetes-dyslipidemia(41461087)·recurrent-uti(42301870)·statin-myopathy-management(42343053)·sinusitis(39823615) ✅ 처리 2026-09-29
