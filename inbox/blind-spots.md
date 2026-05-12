# 진료 습관·기록·시스템 사각지대

> **목적**: 문헌 lookup으로 해소되지 않는 진료 습관·기록·시스템·윤리 차원의 반복 패턴 기록.
> **gaps.md와의 차이**: gaps.md는 scout(문헌 검색)로 해소 가능한 지식 격차. 여기는 본인 routine 변경으로만 해소되는 항목.
> **처리 주체**: 미르 직접 review → 필요 시 `rules/` 문서에 반영하거나 진료 routine으로 내재화.

---

## Active

### [신체검진 기록] "ns" / "non-specific" 차팅 습관
- **맥락**: 2026-05-12, 47세 남성 두드러기 → acute leukemia 케이스. 선배 차트의 LAP 진찰 소견이 "non-specific"으로만 기록되어 있었음.
- **문제**: 진찰을 안 한 건지·안 적은 건지 구분 불가. baseline 추론 불가. legal·임상적으로 안 한 것과 동일.
- **패턴**: 시간 부족 외래에서 신체검진 기록을 "ns"·"non-specific"·"무특이"로 압축하는 습관.
- **대응**: positive·negative 양쪽 명시. 예 — "LAP: bilateral anterior cervical, 1cm 내외, mobile, non-tender, rubbery. No supraclavicular/axillary involvement. No HSM."

### [Lab follow-up] 처방의 결과 확인 책임·시스템 부재
- **맥락**: 47세 두드러기 케이스에서 LDH 4704·WBC 184,890 critical value 산출. 결과 review가 늦었다면 환자 위험에 직결.
- **문제**: 외래 lab 처방 후 결과 확인 책임이 처방의에게 있다는 인식·시스템 미비. "환자가 다음 방문에 들으러 오겠지" 식 수동 follow-up.
- **패턴**: 처방 시점에 결과 review 일정·연락 경로 미설계.
- **대응**: (1) critical value auto-alert 설정 (2) 환자에게 "결과 이상 시 연락드립니다" 명시 (3) 처방 시 결과 확인 일자 캘린더 등록.

### [진단명 윤리] 청구용 진단명 갖다 붙이기
- **맥락**: 한국 외래 일반 관행 — 예: PPI 처방하려고 "GERD with esophagitis" 진단명 입력. 통증 없는 환자에 NSAID 처방하려고 "근골격계 통증" 입력.
- **문제**: 단기 청구는 통과되지만 → 환자 의무기록에 평생 남음. 향후 보험 가입 시 문제. 다른 의사가 차트 보고 잘못된 가정 형성. 의료 분쟁 시 불리.
- **패턴**: 임상 추론과 무관하게 약가·검사 청구 목적으로 진단명 입력.
- **대응**: 진단명은 임상 추론을 반영. 청구 trick 회피. 보조 진단·증상 코드(R 코드 등) 활용.

### [고령 신약 추가] 기존 복약·OTC review 생략
- **맥락**: 2026-05-12, 79세 CKD + sigmoid ca 환자 acute bronchitis에 신약 5종(Moxicle, Stogar, Synatura, Anycough, Tylenol ER) 추가 처방. 약국 종합감기약 이미 복용 중이었으나 차트에 기존 복약 리스트 없음.
- **문제**: 신약 추가 전 기존 처방·OTC 확인 없이 처방 → 중복·상호작용·polypharmacy 부담 누적. 고령·CKD에서 위험 증폭.
- **패턴**: 외래 시간 압박으로 약물력 청취·기록 생략. "짧게 5일이니까"로 합리화.
- **대응**: 고령 환자 신약 추가 전 routine — (1) 기존 처방약 list-up (HTN·통풍·영양제·기타) (2) 약국 OTC·한약 확인 (3) 추가 약물 부담·신간 영향 평가 (4) 약물력 차트 명시.

### [Safety-netting] 재내원 trigger 명시 부재
- **맥락**: 2026-05-12 두 케이스 모두 — 79세 bronchitis는 경험적 ABx 처방 후 "2주 후 f/u"만 적힘. 41세 IDA + 만성 설사도 "2주 후 재검"만. 무호전·악화 시 trigger 없음.
- **문제**: watchful waiting 또는 경험적 처방 모두에서 "악화 시 즉시 재내원" trigger 부재 — 환자가 언제 다시 와야 할지 모름. 진단 지연 위험.
- **패턴**: f/u plan = 단순 재검 일자만. trigger·red flag 안내 누락. 처방 결정 시 "최선의 시나리오"만 가정.
- **대응**: 모든 처방·관찰 결정에 safety-net 동반. 예 — "48~72시간 무호전 / 발열 / 호흡곤란 / 의식변화 시 즉시 재내원". 경험적 ABx면 1회 재평가 일자 명시. 차트에 safety-net 문구 기록.

---

## Archive
<!-- 미르가 routine 내재화 완료 또는 rules/ 문서에 반영 완료한 항목 이동 -->
