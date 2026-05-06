# 2026-05-05 — Study-note 양식 개정 (deep-extract routine + paper-extract skill)

## 세션 정보
- 날짜: 2026-05-05
- 작업: study-note 양식 개정 — 연구 본래 narrative 보존 + "일차의료 적용 포인트" 섹션만 자연스럽게 깊게
- 건드린 파일:
  - routines/deep-extract.md (Step 2-B 양식 변경)
  - skills/paper-extract/SKILL.md (Step 6 신설 — 임상 적용 sub-bullet 가이드)

---

## 배경

미르 평가:
1. 기존 study-notes는 "임상에 직접 적용하기엔 디테일 부족, 아이디어 수준"
2. 미르가 매일 직접 들여다보는 main 학습 채널은 knowledge md가 아닌 **study-note**

**1차 제안 (양식 강제 frame)**: 학술 backbone 축소 + "외래 즉시 적용 ★" 섹션 강제 (약물 표·결정 분기·Red flag·환자 교육·한국 변환 5개 sub-bullet 강제)

→ 미르 거부: **"본래 연구 맥락이 사라지고 특정한 틀에 짜맞춘 듯한 느낌"**. 양식 강제가 연구 본래 narrative를 평준화시킴.

**2차 제안 (양식 보존 + 한 섹션 강화)**: 학술 backbone 그대로 유지 + "일차의료 적용 포인트" 섹션만 자연스러운 sub-bullet으로 깊게.

→ 미르 OK: "훨씬 좋은 거 같다"

---

## 변경 내용

### 1. routines/deep-extract.md Step 2-B

**양식 원칙 신설**:
- 연구 본래 narrative 보존이 우선 — 초록 요약·배경·한계는 논문이 강조한 message 그대로
- "일차의료 적용 포인트"만 자연스럽게 깊게 — 논문이 제공하는 영역에서만 sub-bullet
- 강제 frame 금지 — 모든 sub-bullet 강제 X, 자연스러운 영역만
- 할루시네이션 방어 — 한국 brand·보험·구체 임계값은 추정 금지, [출처 미확인] 또는 [가이드라인 default 인용] 명시

**양식 sub-bullet** (자연스러운 영역만):
- `### 진단·평가` — 논문이 진단 기준·alarm feature 명시 시
- `### 약물·처방 디테일` — 논문이 처방 가이드 포함 시 (시스템 연구는 작성 X)
- `### 외래 결정 분기` — 논문 메시지에서 도출 가능 시
- `### 환자 교육` — 한국어 standard 변환 자연스러울 때만
- `### 한국 외래 변환 시 확인` — brand·보험·외삽 위험 영역

**논문 type별 적용 가이드 추가**:
- 임상 가이드형 (In the Clinic/NEJM CP/AFP) → 모두 자연스럽게
- RCT 효능 → "어떤 환자 적용/미적용", 약물은 가이드라인 default 인용
- 메타·체계적 고찰 → 효능 합성을 임상 결정에
- 관찰 연구 → 임상 시사점 위주, 표준 약물은 별 entry 인용
- 시스템·정책 연구 → 약물 sub-bullet 자체 작성 X (강제 N/A 표기 X)

### 2. skills/paper-extract/SKILL.md Step 6 신설

paper-extract skill에 study-note 작성 가이드 추가:
- sub-bullet 작성 가능 조건 표
- 논문 type별 sub-bullet 구성 가이드
- 환자 교육 한국어 standard 작성 원칙 (LLM 자체 작성 가능, 강제 X)
- 할루시네이션 방어 강제 항목 4가지 (brand·보험·용량·임계값)

---

## 핵심 결정

### 양식 강제 vs 양식 가이드

- **이전 의도**: 모든 study-note에 동일한 임상 적용 frame 적용 → 평준화 → 연구 narrative 상실
- **개정 의도**: 연구 본래 메시지 보존 + 자연스럽게 도출되는 임상 sub-bullet만 강조

### "매일 읽기 자원" 인정

미르 통찰: knowledge md는 앱 inject 채널 (미르 직접 읽지 않음), study-note는 매일 학습 main 채널.
→ study-note에 임상 디테일이 살아 있어야 미르 임상 능력 증폭. 단 narrative 평준화 X.

### 할루시네이션 방어

study-note는 미르 매일 학습 자원이라 정확성이 결정적.
- 한국 brand·보험: 추정 금지, [출처 미확인 — researcher 검증 권장] 강제
- 약물 용량 (논문 명시 X): "[가이드라인 default 인용: {출처}]" 강제
- Red flag 임계값: 논문 또는 가이드라인 출처 명시
- 환자 교육 한국어 문구는 LLM 자체 작성 가능 (자연 문장은 할루시네이션 위험 낮은 영역)

---

## 결과

- **판정: 통과**
- routine·skill 변경만, knowledge·bundle 영향 0
- ingest 누적분 확인: 24개 study-notes 모두 4-29·4-30 batch에서 bundle 등록 완료, 추가 ingest 필요 항목 0건
- 5월 cron 결과 없음 (5-1~5-5 cron 미실행 또는 [o] 항목 없었음)

## 다음 작업

- 다음 cron 1회 (5-6 즈음) study-note 표본 1-2개 review해서 양식 검증
- 1주 운용 후 평가 (5-12 즈음):
  - 정확성 (할루시네이션 0?)
  - 임상 적용성 (미르 외래에서 직접 활용 가능?)
  - 길이·읽기 부담 (학술 + sub-bullet 합쳐 적정?)
- D-7 Mir-Tier 1 scout 재검증 (5-6)과 함께 study-note 양식 평가도 동시 진행

## 회고

- **양식 강제의 함정**: "임상 적용성 강화"라는 좋은 의도가 "frame 짜맞춤"으로 흐를 위험. 미르가 1차 제안을 거부한 통찰이 정확 — 연구 본래 narrative는 학술 자원의 본질.
- **미르 학습 패턴 정확화**: knowledge md는 앱이 사용, study-note는 미르가 사용. 두 자원의 audience가 다르므로 양식·디테일 수준도 다르게 design 해야 함.
- **할루시네이션 백도어 인지**: 매일 보는 학습 자원에 추정 정보가 섞이면 잘못된 지식 학습 위험. [출처 미확인] 태그 강제가 안전장치.
- **다음 세션 반영**: 양식 변경은 즉시 적용 vs 다음 cron 자동 반영 — 후자 선택 (기존 study-notes는 재처리 안 함, 자연스럽게 신규부터 새 양식). 1-2주 운용 후 미르 만족도 평가.
