# sessions/2026-04-23-knowledge-visibility-brainstorm.md — 지식 가시성·시각화 브레인스토밍

## 세션 정보
- 날짜: 2026-04-23
- 성격: **브레인스토밍 — 결정 아님, 탐색 이력 보존 목적**
- 선행: `sessions/2026-04-23-reframe-three-layers.md` (3층위 아키텍처 reframe)
- 트리거: 미르 질문 — "knowledge 계속 쌓는데 뭐가 있는지도 모르는 상태가 오지 않을까? 카파시 Obsidian 시각화처럼 감 잡을 방법이 있었으면"

---

## 1. 문제 재정의 — PKM Collapse

Knowledge management 분야에서 자주 나오는 현상: 계속 축적하지만 자기도 뭐가 있는지 모르게 되는 상태. 통칭 **"PKM collapse"**(개인 지식관리 붕괴).

- 현재: 44 엔트리 (이미 감 흐려지기 시작)
- 예상: 100개·200개로 가면 훨씬 심각
- 미르의 직관이 정확 — 가설이 아니라 **확정 궤도**

카파시의 Obsidian 사용 배경: 단순 기록이 아니라 **자기 학습의 가시성** 확보. 그래프 뷰가 clusters·hubs·orphans을 드러내 **emergent 구조**를 보여줌.

---

## 2. Chartji knowledge의 이미 좋은 점 (출발선)

| 자산 | 내용 | 시각화에 어떻게 쓰이나 |
|---|---|---|
| **전부 markdown** | `knowledge/` 하위 전부 `.md` | Obsidian/Foam/Logseq/Dendron 어떤 툴이든 **오늘 당장** 작동 |
| **관계 구조 씨앗** | `parents[]` 이미 있음, Wave 1 R2로 `relations[]` 도입 예정 | 그래프 edge가 됨 |
| **분류 계통** | by-disease / by-drug / guidelines + tags(CLINICAL/REGULATORY/INSIGHTS/TIPS) + section vocabulary(18개) | 다중 축 필터·매트릭스 축 |
| **임상 도메인 온톨로지** | 질환 분류·약물 계통·진료 5단계 같은 **미리 정의된 지도 프레임** | 카파시 wiki에 없는 강점 — 미리 정의된 map frame이 있음 |
| **Sourcing 3-tier** | 파일/섹션/inline 출처 | freshness 시각화 기반 |

**핵심**: Chartji knowledge는 임의 개념 wiki가 아니라 **임상 온톨로지 기반** 구조라, 시각화 potential이 Karpathy 모델보다 높음. 동시에 불투명해졌을 때의 **임상 위험**도 더 큼.

---

## 3. 접근 옵션 (저비용 → 고비용)

### (가) Obsidian 그냥 열어보기 — 비용 0
- `knowledge/` 폴더를 vault로 열면 즉시 그래프·태그·검색 작동
- **오늘 밤 5분 실험** 가능
- 한계: wikilinks(`[[...]]`) 아직 없어 그래프 성김 → Wave 1 R2 후 풍성해짐
- **First step으로 정석**

### (나) 자동 인덱스 생성 — 저비용
- `knowledge/README.md` 또는 `knowledge/MAP.md`를 routine이 매일 자동 생성
- 내용: 전체 엔트리 목록 · 태그별 · 섹션 커버리지 · freshness 분포 · 최근 추가 · 고아(orphan) 엔트리
- 정적 자산 → B층 피로 없음
- 임상 가치: "어디가 있나"보다 **"어디가 비어있나"(gap)** 축이 더 결정적

### (다) 2D 커버리지 매트릭스 — 저비용
- 행: 진료 5단계 (CC · DDx · Risk · Scope · Plan) 또는 장기계통
- 열: 주요 질환 or 약물 계통
- 셀: 엔트리 수 / 신선도 / 섹션 완성도
- `rules/data-flow.md`의 uiHooks primary cell 매트릭스의 **지식 버전**
- 답하는 질문: "뭐가 있나" + **"어디가 공백인가"**

### (라) Obsidian + auto-wikilink — 중비용
- Liby ingest 시 `parents`·`relations` 대상 엔트리 이름을 `[[...]]`로 병기
- Obsidian 열면 진짜 graph view 작동 (clusters·hubs·orphans 가시화)
- Wave 1 R2 구현과 자연 결합
- Liby skill 확장 필요

### (마) Mermaid 정적 그래프 export — 중비용
- `knowledge/graph.md`에 mermaid diagram 자동 생성 (relations[] 기반)
- GitHub에서도 렌더링 → 미르가 어디서든 볼 수 있음
- 별도 툴 불필요

### (바) In-app knowledge browser — 고비용, **비추**
- Chartji 앱 안에 knowledge 탭 추가
- **3층위 reframe의 B층(실시간 surfacing) 야망 재발** → 피로 재귀
- 이 방향은 명시적으로 **회피 권고**

---

## 4. 의사 특유의 축 (카파시 모델에 없는 것)

Karpathy 모델은 임의 개념 wiki. 의사 knowledge는 추가 축이 있음:

### 4-1. Gap (공백) 축
- 의사한테는 "있는 것"보다 **"없는 것"**이 더 결정적
- 환자 앞에서 공백을 모르면 위험
- 그래프·인덱스에 **의도적 공백 표시** 필요 (e.g., 여행의학 영역 미비 강조)

### 4-2. Freshness (시간) 축
- 10년 된 가이드라인과 올해 업데이트는 임상에서 다름
- Wave 1 R1 `freshness.primarySourceYear`가 이걸 채움
- 시각화에 **색상·심볼**로 반영 필요 (예: 5년 이상 = 색 바램)

### 4-3. 진료 흐름 축
- 환자 대화 5단계(CC → DDx → Risk → Scope → Plan) 어느 지점에 붙는 지식인가
- `rules/data-flow.md` 매트릭스를 시각화 차원으로 끌어올림

### 4-4. 승격 상태 축 (3층위 reframe 후)
- A에만 있는 지식 / C로 승격된 지식(상용구·약속처방화) / B에 노출되는 지식
- 세 단계가 구분되어야 "이 지식은 어느 단계까지 와 있나" 가시화됨
- 3층위 reframe 채택 시 필수 축

---

## 5. 권고 순서 (브레인스토밍 레벨)

### Step 1 — 오늘 밤 5분
- Obsidian으로 `knowledge/` vault 열기. 현 상태 체감.
- **여기서 답이 나오는 경우도 많음** — 과잉 설계 전 실험

### Step 2 — Wave 1 완료 후
- R1(freshness) + R2(relations) 들어가면 그래프 자연 풍성
- 별도 시각화 작업 없이 **Wave 1 자체가 시각화에 기여**
- 재체감 후 추가 작업 필요성 재판단

### Step 3 — 중기 (Wave 1~2 완료 후)
- (나) 자동 인덱스 + (다) 커버리지 매트릭스를 **Mapper routine** 산출물로 신설
- Scout·Deep Extract 옆에 routine 하나 더 — 순수 A층 작업

### Step 4 — 장기
- Obsidian 정식 도입 시 (라) wikilinks 자동 삽입까지
- Liby skill 확장으로 자연 흡수

### 회피
- (바) In-app knowledge browser — B층 야망 재발, **하지 말 것**

---

## 6. 3층위 reframe과의 정합성

**이 작업 전체는 A층**이다. 3층위 reframe에서:
- A층 = 지식 체계 구축 = **피로 없음·자기발전적**
- 시각화·인덱스·매트릭스는 미르가 **공부 자체로 재미있게** 할 수 있는 영역
- 동시에 PKM collapse 예방하는 실용 도구
- **카파시가 Obsidian 쓰는 이유와 정확히 같은 맥락** — 자기 학습의 가시성

반대로 B층(실시간 surfacing)에 끌어오면 피로 재발:
- "Chartji 앱에 knowledge 브라우저 탭" 같은 접근 = 금지
- 시각화는 **앱 밖 도구**(Obsidian·GitHub 렌더링)나 **정적 산출물**(README·MAP·graph.md)로 유지

---

## 7. 미결 질문 (다음 세션 검토)

1. Obsidian first 실험 결과는? (오늘 밤 미르 체감)
2. Wave 1 R1·R2 들어간 후 그래프 풍성도 실측은?
3. Mapper routine 신설 시 Scout·Deep Extract와의 호출 순서·부하 분담은?
4. 3층위 reframe 채택 여부에 따라 "승격 상태 축" 필요성 결정

---

## 8. 관련 문서

- `sessions/2026-04-23-reframe-three-layers.md` — 3층위 reframe 메모 (선행)
- `reports/2026-04-23-boss-report-guide-vs-search.md` — Guide 탭/챗봇 UI 검토 (선행)
- `sessions/2026-04-23-handoff-knowledge-ddx-next-session.md` — Wave 1~3 계획
- `reports/2026-04-22-boss-review-request-knowledge-ddx.md` — R1(freshness)·R2(relations) 등 권고
- `rules/data-flow.md` — uiHooks primary cell 매트릭스 (커버리지 매트릭스 설계 참고)
- `knowledge/section-vocabulary.md` — 18개 섹션 표준 (매트릭스 축 소스)
- `knowledge/sourcing-rules.md` — 3-tier 출처 구조 (freshness 축 기반)

---

## 9. 기록의 성격 (자기 고지)

- 이 파일은 **브레인스토밍의 원본 보존**. 결정·착수 아님.
- Claude가 정리했지만 핵심 질문(PKM collapse 우려·Obsidian 유효성)은 미르 발의.
- 다음 세션에서 Step 1 실험 결과에 따라:
  - Obsidian 만으로 충분 → 이 파일 참고용 보관, 추가 작업 없음
  - 부족함 → (나)·(다) 단계로 이행 시 이 파일을 설계 입력으로 활용
- 파기 가능. 유지 시에도 **탐색 이력**으로 가치 있음.
