# Boss 전략 보고서 — Guide 탭 효용 저하 + 챗봇 검색 UI 도입 검토

**요청 배경 (미르 실사용 관찰, 2026-04-23):**
- 임상가이드(Guide) 탭: 환자가 먼저 꺼낸 항목만 깊게 나오고 선제 항목(60세 대상포진, 20세 인도 A형간염·장티푸스) 누락 — 큰 도움 안 됨
- Liby hint + 판단검토: 체계적·반응형이라 유용함 (긍정 실감)
- 미르 실전 프로토콜: 상용구·약속처방 + ad-hoc ChatGPT 검색 + 승격 루프
- 제안: 챗봇처럼 의사가 지식을 검색하면 띄워주는 식 고려

**심의 대상 질문:**
Q1. Guide 탭 중심 구조가 실전에서 효용이 낮다는 관찰은 **구조 결함**인가, **콘텐츠/규칙 공백**인가?
Q2. 챗봇형 검색 UI를 추가 도입하는 것이 타당한가?

---

## 1. 사실 재정렬 (Boss 선결)

| 관찰 | 원인 가설 | 증거 |
|---|---|---|
| 60세 대상포진 미노출 | **trigger 규칙 공백** (나이 window 기반 선제 룰 없음) | 대상포진 knowledge는 있음 — 감지 쪽에 룰 없음 |
| 20세 인도 백신 미노출 | **knowledge 콘텐츠 공백** (여행의학 파일 없음) | knowledge/by-disease · by-drug에 travel-medicine 없음 |
| Liby hint 유용 | transcript-반응형 push가 이미 작동 | v18 현행 |
| Guide 탭 약함 | 환자 transcript 의존 → 선제성 부족 | panel-contracts: "cue → 클릭 후 본문" — 설계대로 |

**중요:** Guide 탭은 `rules/panel-contracts.md` 상 이미 **온디맨드(pull과 유사)** 설계다. "push가 약하다"가 아니라 "on-demand가 transcript에 갇혀 있다"가 정확한 진단.

---

## 2. 4관점 판정

### CMO (임상 안전)
- Guide 탭 약함이 **안전 축**에 직접 타격 없음 — 선제 안전 감지는 RedFlag/Missing이 담당. Guide는 "더 잘 하기" 축.
- 60세 대상포진 누락 = 예방 실패지만 즉시 환자 해 없음. 심각도 중간.
- **챗봇 검색 UI의 치명적 위험**: LLM 자유 답변 = hallucination 직통. 의사가 검색 결과를 신뢰해 처방하면 즉시 임상 사고로 전환. **CMO 경고 1순위**.
- 조건부 허용: 챗봇 UI가 **ingested knowledge 검색만**(LLM 생성 답변 금지) 한정될 때.

**판정:** 챗봇 UI 무조건 허용 = **STOP**. Ingested-only 격리 + 면책 + "AI 추론 없음" 표기 전제 시 CONDITIONAL PASS.

### CLO (법적/규제)
- Guide 탭 "cue만, 본문은 능동 클릭" 구조 = 의사 능동 조회 → 법적 완충 보장. 챗봇도 동일 패턴 유지 가능.
- 위험: 검색 결과가 **처방 추천**으로 읽히면 의료법 영역. 특히 free-form query → LLM 답변은 "AI 진료"로 오해 가능.
- R5 DDx 재활성화에서 합의한 면책 문구(`"ingested knowledge (의사 본인 저장, AI 추론 없음)"`) 동일 강도로 요구.

**판정:** CONDITIONAL PASS (면책 + ingested-only 격리 동일 조건).

### CFO (비용/ROI)
- Guide 탭 개발비 이미 싱크됨(past cost). 효용 낮다고 제거 = sunk cost 무시 + 재설계 비용 발생. **제거 권고 안 함.**
- 챗봇 UI 신규 개발 = Architect → Designer → Builder **Wave 1개 추가**. 현재 진행 중인 Phase 5 + Wave 1(knowledge R1-R4) + Wave 2(DDx R5+R6) + Wave 3(R7)와 **용량 충돌**.
- 더 중요: **콘텐츠 공백이 있으면 UI를 바꿔도 증상 재발**. 여행의학·연령별 백신 knowledge 없이 챗봇 붙여도 "인도 백신" 물어보면 같은 공백.
- 비용 우선순위:
  1. Knowledge 콘텐츠 확장 (Scout/Deep Extract 이미 running) — **저비용 고효용**
  2. Trigger 규칙 확장 (나이 window 등) — **저비용 중효용**
  3. 챗봇 UI 신규 — **고비용 불확실 효용** (콘텐츠 선행 필수)

**판정:** 챗봇 UI Phase N+1 유보. Guide 탭 제거도 유보.

### CVO (제품 가치/정체성)
- Chartji 핵심 정체성 (`CLAUDE.md`):
  - "의사가 빠르고 정확한 판단을 할 수 있도록 **진료를 보조**"
  - "핵심이 잘 축약된 **문서를 출력**"
  - "진료 대화를 기반으로" ← **transcript 중심**
- 챗봇 검색 UI = 의사가 질문 입력 → AI 답변. 이 패턴은 **ChatGPT와 차별성 흐림**. Chartji의 고유 가치 = **대화에서 놓친 것 선제 감지**(Missing/RedFlag). 이 축을 흐리면 안 됨.
- 미르의 실전 프로토콜(상용구/검색/승격)을 그대로 복제하면 Chartji가 "EMR + ChatGPT 프록시"로 전락 위험.
- Liby hint 유용 실감 = transcript-반응형 push가 **정체성과 일치**하고 작동 중이라는 신호. 이 축을 **강화**하는 게 제품 가치 극대화 경로.

**판정:** 챗봇 UI 정체성 희석 위험 — **유보 권고**. 
권장 대안: trigger 규칙 확장(나이·성별·상황 window) + knowledge 콘텐츠 확장.

---

## 3. 종합 판단

**Q1 답:** Guide 탭 효용 저하는 **구조 결함이 아니라 콘텐츠·trigger 공백**. 
- 구조(온디맨드 패널)는 panel-contracts 설계 그대로 작동 중
- 문제는 (a) trigger 규칙이 transcript 언급에만 반응 → 선제 항목 놓침, (b) knowledge 자체가 일부 분야(여행의학·연령별 백신) 공백

**Q2 답:** 챗봇 검색 UI 도입 = **현시점 유보 권고**. 
- CMO: ingested-only 격리 조건부 허용이지만 그 조건 자체가 큰 설계 부담
- CFO: 콘텐츠 공백 있는 상태에서 UI만 바꿔도 같은 증상
- CVO: ChatGPT와 차별성 희석 + 정체성 흐림

**대신 권고하는 축:**
1. **Knowledge 콘텐츠 확장** — 여행의학·연령별 백신 선제 흡수 (Scout queue 우선순위 상향)
2. **Trigger 규칙 확장** — 나이 window 기반 선제 룰 (예: 50대 이상 대상포진 cue, 해외여행 언급 시 여행백신 cue)
3. **Liby hint 강화** — 이미 작동하는 축을 더 정밀하게 (false silence 지표 도입)

---

## 4. 권고 사항 (Wave 배치)

### 즉시 (Phase 5 병행 가능)
- **N1**: Scout 우선순위 규칙에 "여행의학", "연령별 백신 권고" 분야 가중치 상향 추가 (`routines/scout.md` 개정 — 저비용)

### Wave 3 이후 별도 Wave로 편성 권고 (Wave 4 후보)
- **N2**: Trigger 규칙 확장 — `src/knowledge-bundle.js` 및 `prompts.js` Triage 감지 로직에 "나이 window", "여행 cue" 등 스캐너 추가. Architect 경로 필수 (panel-contracts 변경 가능성).
- **N3**: Guide 탭 효용 3개월 실증 측정 (클릭률·dismiss 패턴) 후 축소/유지/확장 결정

### Phase N+1 이후 재검토 (현시점 STOP)
- **N4**: 챗봇 검색 UI — 다음 조건 전부 충족 시에만 재검토:
  - Ingested-only 격리 기술적으로 가능
  - Knowledge 콘텐츠 커버리지 ≥ 진료 5단계 80%
  - CLO 면책 문구 + "AI 추론 없음" 표기 명문화
  - N2 trigger 확장 후에도 콘텐츠 도달 실패 사례가 실측으로 누적

### 축소·제거 권고 없음
- Guide 탭 제거 유보 (실증 데이터 부족, sunk cost)

---

## 5. 핵심 가드

- **챗봇 충동 방지**: 미르의 실전 프로토콜을 UI로 복제하면 Chartji의 차별성이 ChatGPT 프록시로 소멸. 차별성의 원천은 **대화 transcript에서 선제 감지**.
- **콘텐츠 우선**: UI 논의보다 knowledge 커버리지 측정이 선행. 공백 영역 없이 trigger·UI 얘기 하면 순서 역전.
- **Wave 충돌 관리**: 현재 Phase 5 + Wave 1/2/3 동시 진행 중. N2·N3는 **Wave 3 착수 이후 미르 재발의 시점**에 편성. 지금 Wave 확장 금지.

---

## 6. 미르 결단 포인트 (3개)

| 결단 | 옵션 | 의존 |
|---|---|---|
| **D1**: Scout 우선순위 여행의학·연령별 백신 가중치 상향 | 즉시 적용 / 다음 세션 / 보류 | 독립 (Phase 5 무관) |
| **D2**: Trigger 규칙 확장(N2)을 Wave 4로 사전 등록할지 | 등록 / 보류(미르 재발의 대기) | Wave 3 완료 후 |
| **D3**: Guide 탭 3개월 실증 측정(N3) 착수할지 | 즉시 로깅 설계 / Wave 4 포함 / 유보 | panel-contracts 상 허용 범위 내 |

**챗봇 검색 UI(N4)는 결단 대상에서 제외** — 현시점 STOP, 조건 충족 후 재발의.

---

## 7. 감사 종결 사인

```
판정: CONDITIONAL PASS (현재 Guide 탭 구조 유지 + 콘텐츠·trigger 공백 별도 Wave로 처리)
조건: (1) 챗봇 UI 유보 (2) N1 Scout 가중치 조정 즉시 가능 (3) N2/N3는 Wave 3 완료 후 재발의
권고 조치: 즉시 — N1 / 유보 — N2·N3 (Wave 4 후보) / STOP — N4 (챗봇 UI)
결단 주체: 미르 (D1·D2·D3)
재검토 시점: Wave 3 완료 후 또는 콘텐츠 커버리지 실측 후
```

---

**[Boss 전략 보고서 요약]**
- CMO: 챗봇 UI 도입 시 hallucination 직통 → ingested-only 격리 조건부만 허용
- CLO: 면책 + "AI 추론 없음" 동일 강도 요구
- CFO: 콘텐츠 공백 해결 선행 — UI만 바꿔도 증상 재발, 현 Wave 용량 초과
- CVO: 정체성 희석 위험(ChatGPT 프록시화) — transcript 선제 감지 축 강화가 정체성 일치
- **종합 판단**: Guide 탭 약함 = 구조 결함 아님(콘텐츠·trigger 공백). 챗봇 UI 유보.
- **권고 사항**: Scout 가중치 조정 즉시 / trigger 규칙 확장 Wave 4 / 챗봇 UI Phase N+1 이후 조건 충족 시 재검토
