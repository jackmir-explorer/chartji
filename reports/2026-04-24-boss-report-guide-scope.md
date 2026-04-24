# Boss 전략 보고서 — Guide 탭 출력 범위 재정의 (Liby hint 분업 재확인)

**요청 배경 (2026-04-24 미르 발의):**
- "가이드 탭에 진짜 필요한 것만 출력되어야 할 것 같은데 뭐가 좋을까?"
- 후속 질문 (정곡): "contraindication·drug safety·pregnancy 이것도 현행 Liby hint에 나오지 않아?"

**선행 문서:**
- `reports/2026-04-23-boss-report-guide-vs-search.md` — Guide 탭 효용 저하·챗봇 UI 검토 (구조가 아니라 콘텐츠·trigger 공백으로 결론)
- 본 보고서는 그 후속. Guide **탭 내부 범위(섹션 할당)** 재정의에 집중.

---

## 1. 실증 (현행 코드)

### 1-1. Default 섹션 할당 (`src/app.js:6-7`)

```
drug   hint:  ["indication","dosing","schedule"]
drug   guide: ["contraindication","precaution","comparison","insurance"]
disease hint: ["protocol","indication","schedule","referral"]
disease guide: ["classification","indication","exam","protocol","schedule","dosing",
                "comparison","contraindication","precaution","monitoring",
                "pregnancy","insurance","notes"]
```

### 1-2. 실사용 엔트리 override (`src/knowledge-bundle.js:513, 545`, wegovy/위고비)

```
hint:  ["dosing","contraindication"]      ← contraindication을 hint로 올림
guide: ["indication","dosing","contraindication","insurance"]  ← guide에도 중복 유지
```

### 1-3. Curation prompt 주석과 bundle 실태의 괴리 (`src/prompts.js:190`)

> "처방 프로토콜(protocol)·약물 dosing·schedule·indication 같은 Liby 힌트 담당 섹션은 이 입력에 들어오지 않는다"

- 주석은 "dosing·indication은 Guide에 안 들어온다"고 선언
- 실제 wegovy/위고비 guide에는 `dosing·indication`이 들어 있음
- contraindication도 default guide에 포함 + 일부 엔트리는 hint까지 중복

**구조적 관찰:** `contraindication·precaution·pregnancy`가 **처방 시점 push(Liby hint)**와 **온디맨드 배경(Guide tab)** 양쪽에 할당되어 있는 중복 상태. Guide tab이 "약한 효용"으로 체감된 원인의 한 축.

---

## 2. 4관점 정정 판정

### CMO (임상 안전)
- 금기·precaution·pregnancy는 **처방 시점 경고**가 본질. Liby hint push가 임상적 자리.
- Guide에서 중복 출력하면 (a) 인지 과잉 (b) "이미 hint에서 봤는데 또 나오네" → 경고 둔감화 위험.
- **판정**: 금기류를 Guide에서 빼고 hint에 집중 → 안전축 강화.

### CLO (법적/규제)
- 동일 경고를 두 면에 반복 ≠ 법적 보호 강화. 오히려 중복은 "의사에게 강권"처럼 읽힐 소지.
- Guide는 "의사 능동 조회" pull 구조 유지가 정답. 능동 축에서는 분류·비교·장기추적이 어울림.
- **판정**: 중복 제거가 CLO 방향과 일치.

### CFO (비용)
- 중복 섹션을 curation 입력에서 제거 → 토큰 감소 + LLM 자유도 축소 → 할루시네이션 백도어도 좁아짐.
- 구현 비용: `src/app.js` default 상수 2줄 수정 + 일부 엔트리 override 정리. 저비용.
- **판정**: ROI 명확.

### CVO (제품 가치)
- Chartji 차별성 = "처방 시점 선제 감지"(hint) + "처방 이전 배경"(Guide) **시간축 분업**.
- 중복은 이 차별성 자체를 흐림. 두 패널이 같은 얘기를 하면 역할 분리의 의미 소실.
- 미르 철학(memory, "완결성이 부담"·"정보 밀도 감소 = feature")과 정합.
- **판정**: 정체성 명료화 효과.

---

## 3. 시간 축 분업 재정의

| 축 | 담당 | 섹션 |
|---|---|---|
| **처방 결정 시점** (push) | Liby hint | indication / dosing / schedule / protocol / referral / **contraindication** / **precaution** / **pregnancy** |
| **처방 이전 배경** (pull) | Guide tab | classification / exam / **comparison** / **monitoring** / differential / notes |

### Guide tab 진짜 고유 3 class + 보조

| Class | 내용 | 대표 섹션 |
|---|---|---|
| **G1 — 진단 분류·위험 계층화** | 환자 상태를 어느 카테고리로 볼지 | classification, differential |
| **G2 — 전략적 비교** | 선택지 사이 판단 (GLP-1 간, ACEi vs ARB 등) | comparison |
| **G3 — 장기 추적 축** | routine 체크가 아닌 long-term follow-up | monitoring |
| (보조) | exam 포인트, 임상 팁 | exam, notes |

---

## 4. 권고 조치

### 즉시 반영 (Designer 경유 · 저비용)
- **P1**: `src/app.js:6-7` drug/disease default guide에서 `contraindication·precaution·pregnancy` 제거, hint 일원화
- **P2**: 엔트리별 `uiHooks.guide[]` 정리 (wegovy·위고비 등에서 `contraindication·dosing` 제거)
- **P3**: `src/prompts.js` curation prompt — Guide-only 섹션 set을 `classification/exam/comparison/monitoring/differential/notes`로 **명시적 한정**, 주석과 bundle 정합
- **P4**: bullet 상한 3~8 → **3~5** 축소

### 전제 가드
- disease 엔트리는 contraindication이 기본 guide에도 포함되어 있어 일부 disease는 **양 축 재검토 필요** — 엔트리별 판단 불가피
- Librarian 경로(`agents/librarian.md`) 반영 필요: 이후 ingest에서 default override가 자동 일관성 유지되도록

### Architect 경로 필요 여부
- `rules/panel-contracts.md`의 "Guideline Assist (온디맨드)" 역할 계약은 변경 없음 (cue → 본문 구조 유지)
- `rules/data-flow.md` uiHooks primary cell 매트릭스는 **업데이트 필요** (섹션 할당 표가 변경됨)
- **Architect 진단 필요**: data-flow 매트릭스 개정은 구조 경계 영향 → Architect PASS/STOP 선행 권고

### 유보
- 선제 룰 확장(60세 대상포진·여행백신) — 선행 보고서 N1/N2 경로 유지

### STOP
- Guide 탭 제거 / 챗봇화 — 선행 보고서 판정 유지

---

## 5. 감사 종결 사인

```
판정: CONDITIONAL PASS (Architect → Designer → 미르 승인 → Builder 순서)
조건: (1) data-flow 매트릭스 개정 Architect 진단 (2) Designer 설계서 범위 체크
     (3) bullet 상한·섹션 set 명문화 (4) 엔트리별 override 정리 계획 포함
권고 순서: Architect → Designer → 미르 승인 → Builder → Reviewer → QA
재검토 시점: P1~P4 반영 2주 후 실사용 체감
```

---

## 6. 핵심 교정

- 선행 보고서(2026-04-23)는 "Guide 탭 구조는 문제 없고 콘텐츠·trigger 공백"으로 결론
- 본 보고서에서 **구조적 결함 1건 추가 발견**: bundle의 섹션 양축 중복 할당(contraindication·precaution·pregnancy)
- 미르 관찰("Guide 탭 약함")의 **두 번째 원인** 규명
- 첫 번째 원인(콘텐츠·trigger 공백): N1/N2 경로
- 두 번째 원인(섹션 중복): P1~P4 (본 보고서)
