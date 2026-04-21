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
- vaccination.md — 예방접종 parent: 전 확인 문진·draft-template/append + 개별 백신 참조 링크 [CLINICAL]
- dizziness.md  — 어지럼증: 편두통 과거력/문진 [문진/검사]
- BPPV.md       — BPPV: 진단 프로토콜 + Barbeque Roll / Epley + 보나링 PRN [문진/검사·처방/치료]
- dry-mouth.md  — 구강건조증: pilocarpine + 뮤코미스트 가글 [처방/치료]
- burning-mouth.md — 구강작열감증후군(BMS): 뮤코미스트 가글 [처방/치료]
- oral-lesion.md  — 구강병변(백반증/궤양): 1달 기준, dexamethasone 가글, ENT refer [문진/처방]
- LPR.md          — 인후두역류(LPR): PPI + 뮤테란, 알긴산 대안 [처방/치료]
- low-freq-hearing-loss.md — 저음성난청/귀먹먹함: 유턴정(베타히스틴), 다이크로짇(HCTZ) [TIPS]
- dizziness.md    — 어지럼증 기본 문진 11항목 + 편두통 추가 문진 [문진/검사]
- obesity.md    — 비만 체중감량 Draft Template + 위고비 처방 기준 + Mayo Clinic 표현형 + 단백질 ABC [CLINICAL/TIPS/REGULATORY]
- dysphonia.md  — 목소리 이상/쉰목소리: 수분 섭취·strap muscle 마사지 (MTD) [CLINICAL — 조건부]

### by-drug/
- vaccine-interval.md — 백신 접종 간격 원칙 (생+사/생+생/사+사) [CLINICAL] — topic
- tdap.md — Tdap/파상풍 + 임신부 27-36주 + 외상 상처 기준 (Tdap 우선 2024) [CLINICAL]
- herpes-zoster-vaccine.md — 대상포진 RZV ≥50세(ACIP)/≥60세(KDCA), ≥19세 면역저하, ZVL 2020 단종 [CLINICAL]
- pneumococcal-vaccine.md — 폐렴구균 PCV15/20/21 ≥50세 ACIP / KDCA PPSV23 ≥65세 NIP [CLINICAL — MMWR 2025 PMID:39773952]
- hpv-vaccine.md — HPV 9-14세 2-dose / ≥15세·면역저하 3-dose / 27-45세 SCDM [CLINICAL]
- rabies-vaccine.md — 광견병 PrEP 2회(0·7일, 2022 ACIP) + titer 기반 booster [CLINICAL]
- japanese-encephalitis-vaccine.md — 일본뇌염 사백신(IXIARO) vs 생백신(Imojev 미국 미승인) [CLINICAL]
- hepatitis-ab-vaccine.md — B형간염 19-59세 universal(ACIP) + Heplisav-B 2회 / A형간염 한국 40세 기준 [CLINICAL]
- varicella-mmr-polio-vaccine.md — 수두 / MMR KDCA 1968 기준 / 폴리오 모든 미접종 성인(2023 ACIP) [CLINICAL]
- wegovy.md — 위고비(Semaglutide) 비만 적응증·용량·금기·비급여 [REGULATORY/CLINICAL]
- mounjaro.md — 마운자로/Zepbound(Tirzepatide) T2DM·비만 적응증·용량·실비보험 [CLINICAL/TIPS]
- ozempic.md — 오젬픽(Semaglutide 1mg) 한국 급여 기준 3조건 [CLINICAL — 조건부]
- pilocarpine.md — 살라겐/필로겐 용량(TID/QID/BID)·급여기준 [REGULATORY]
- mucomyst.md — NAC 가글 처방법·BMS/구강건조증/LPR 근거 [TIPS/CLINICAL/INSIGHTS]
- glp1-selection-strategy.md — GLP-1 비만약 선택 전략: 위고비 vs 마운자로 10기준·Dose Escalation·반응예측·Interval Tx·SMI·전당뇨 [TIPS/INSIGHTS/CLINICAL]

### guidelines/
- adult-vaccination-summary.md — 성인 예방접종 전체 요약 + 항암 독감백신 **타이밍 기반** (ANC 폐기, ASCO 2024) [CLINICAL] — topic
