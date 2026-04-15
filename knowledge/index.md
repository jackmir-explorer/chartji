# knowledge/index.md — 임상 지식 베이스

미르의 임상 경험, 최신 가이드라인, 처방 노하우를 축적한다.
Liby(Librarian 에이전트)가 이 폴더를 관리한다.

---

## 폴더 구조
```
knowledge/
  by-disease/    질환/증상 단위 메인 저장소 (4개 섹션 + keywords)
  by-drug/       약물 단위 (처방 노하우·부작용 패턴)
  guidelines/    공식 가이드라인 [CLINICAL] · 심평원 기준 [REGULATORY]
                 · 최신지견 [INSIGHTS] · 실전 Tip [TIPS]
  log.md         추가 기록 (날짜순)
  index.md       전체 목록 (이 파일)
```

---

## 추가 방법

내용을 던지고 Librarian을 호출하면 정리한다.
명령: "Liby, 이 내용 ingest해줘"

---

## Inject 동작

진료 중 Triage 패널이 질환을 감지하면 자동으로 관련 knowledge가
Working Draft에 주입된다.
- 문진/검사 · 처방/치료 · 감별진단 → 프롬프트 컨텍스트 (API 일반 지식보다 우선)
- Draft 출력사항 [DRAFT_APPEND] → Working Draft 하단 자동 삽입

RedFlag 패널에는 절대 inject 하지 않는다.

---

## 파일 목록

### by-disease/
- vaccination.md — 예방접종 Draft 출력사항 [DRAFT_APPEND]
- dizziness.md  — 어지럼증: 편두통 과거력/문진 [문진/검사]
- BPPV.md       — BPPV: 진단 프로토콜 + Barbeque Roll / Epley + 보나링 PRN [문진/검사·처방/치료]
- dry-mouth.md  — 구강건조증: pilocarpine + 뮤코미스트 가글 [처방/치료]
- burning-mouth.md — 구강작열감증후군(BMS): 뮤코미스트 가글 [처방/치료]
- oral-lesion.md  — 구강병변(백반증/궤양): 1달 기준, dexamethasone 가글, ENT refer [문진/처방]
- LPR.md          — 인후두역류(LPR): PPI + 뮤테란, 알긴산 대안 [처방/치료]
- low-freq-hearing-loss.md — 저음성난청/귀먹먹함: 유턴정(베타히스틴), 다이크로짇(HCTZ) [TIPS]
- dizziness.md    — 어지럼증 기본 문진 11항목 + 편두통 추가 문진 [문진/검사]
- obesity.md    — 비만 체중감량 Draft Template + 위고비 처방 기준 [TIPS/REGULATORY]

### by-drug/
- vaccine-interval.md — 백신 접종 간격 원칙 (생+사/생+생/사+사) [CLINICAL]
- tdap.md — Tdap/파상풍 접종 대상·스케줄·임신부 [CLINICAL]
- herpes-zoster-vaccine.md — 대상포진 RZV/ZVL 비교·스케줄·전환 [CLINICAL]
- pneumococcal-vaccine.md — 폐렴구균 65세이상/만성질환자/면역저하자 분류 [CLINICAL]
- hpv-vaccine.md — HPV 접종 대상·0/2/6개월 스케줄 [CLINICAL]
- rabies-vaccine.md — 광견병 노출전예방·추가접종 주기 [CLINICAL]
- japanese-encephalitis-vaccine.md — 일본뇌염 사백신/생백신 비교·여행 선택 [CLINICAL]
- hepatitis-ab-vaccine.md — A·B형간염 스케줄·non-responder 관리 [CLINICAL]
- varicella-mmr-polio-vaccine.md — 수두·MMR·폴리오 성인 접종 [CLINICAL]
- wegovy.md — 위고비(Semaglutide) 처방 기준·비급여 [REGULATORY]
- pilocarpine.md — 살라겐/필로겐 용량(TID/QID/BID)·급여기준 [REGULATORY]
- mucomyst.md — NAC 가글 처방법·BMS/구강건조증/LPR 근거 [TIPS/CLINICAL/INSIGHTS]

### guidelines/
- adult-vaccination-summary.md — 성인 예방접종 전체 권장 요약·고위험군·ANC 독감백신 기준 [CLINICAL]
