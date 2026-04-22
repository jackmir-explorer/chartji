# sessions/2026-04-22-chrome-qa-scenarios.md — Chrome MCP 실기 시나리오 가이드

> **용도**: 데스크탑 로컬 Claude Code 세션(Chrome MCP 연결 가능)에서 이 파일을 읽고 자동 검증 실행.
> **한 줄 지시**: "`sessions/2026-04-22-chrome-qa-scenarios.md` 대로 Chrome MCP로 검증해줘"
> **만든 이유**: 원격/웹 세션은 `localhost:7777`·`127.0.0.1:8765` 로컬 MCP 서버에 붙지 못함 → 데스크탑 세션에 인계.

---

## 목적

2026-04-22 Liby ingest 5 엔트리 + 2026-04-21 heart-failure 엔트리에 대한 end-to-end 실기 검증.
**핵심 성과 질문**: 2026-04-22 신설 3층 방어선(창작·감사·출력)이 실제 LLM 순응도에서 작동하는가?

---

## 사전 확인 (실기 시작 전)

1. **앱 서빙** — 로컬 dev server(예: `http://localhost:7777`)에서 chartji 앱 응답
2. **최신 main 반영** — `git pull origin main` 완료. 아래 commit 이상이어야 함:
   - `7f8bb15` merge: Liby 5건 ingest
   - `a940083` merge: Deep Extract routine 개편
   - `99c1213` merge: 3층 방어선 명세
3. **Cache-bust 확인** — `src/index.html` 두 줄:
   - `knowledge-bundle.js?v=de5-ingest`
   - `prompts.js?v=triage-de5`
4. **Bundle 스모크** — Chrome 콘솔에서:
   ```js
   ["LPR-consensus","depression-screening","sglt2-inhibitors","vitamin-d","neffy"]
     .map(k => ({k, kind: KNOWLEDGE_BUNDLE[k]?.kind, n: Object.keys(KNOWLEDGE_BUNDLE[k]?.sections||{}).length}))
   ```
   기대: 5개 엔트리 모두 kind 일치(topic/drug), sections 개수 ≥ 3.
5. **TRIAGE 스모크** — `prompts.js`의 `TRIAGE_PROMPT`에 5 카테고리 문자열 존재:
   `LPR-consensus`·`depression-screening`·`sglt2-inhibitors`·`vitamin-d`·`아나필락시스`.
6. **기존 v1 LPR 보존 확인** — `KNOWLEDGE_BUNDLE.LPR`·`KNOWLEDGE_BUNDLE["후두염"]` v1 shape(`treatment` 필드) 그대로.

사전 확인 실패 시 실기 중단 → 미르 보고.

---

## 3층 방어선 공통 검증 체크포인트 (매 시나리오 적용)

각 시나리오 Guide tab 출력 bullet에 대해 아래 4개 지표를 수집한다:

| 지표 | 기준 | 2026-04-21 baseline |
|---|---|---|
| **섹션 라벨 오용** | `[출처: obesity.notes]`·`[출처: LPR-consensus.exam]` 등 `[키.섹션]` 형태 0건 | 0건 목표 |
| **[출처 미확인] 자의 태깅** | LLM이 원문에 없는 `[출처 미확인]` 생성 0건 | 0건 목표 |
| **TIPS 라벨 표기** | `[출처: TIPS — 일반 약리 지식]` 등 TIPS 라벨이 sources[]에 있으면 그대로 매핑 — 정상 | 첫 실전 적용 |
| **주제 부조화 bullet drop** | sources[]에 실제 일치 출처 없는 bullet은 출력 금지 | rule ⑧ |

**RedFlag 격리** — 모든 시나리오에서 RedFlag 패널에 knowledge inject 되지 않는지 확인 (rules/data-flow.md §2).

---

## 시나리오 1 — LPR-consensus (식도 증상 동반 분기 A)

### Transcript (복붙용)
```
목이 답답하고 기침이 3개월째 계속 나요. 자꾸 목청소하게 되고 가래 뱉고 싶어요.
속쓰림이나 역류감도 가끔 있어요. 일반 감기약은 효과 없었어요. 후두경은 한 번 봤는데 정상이라 했어요.
```

### 기대 Triage 감지
- `LPR-consensus` (primary) + 기존 `LPR`/`후두염` 동시 감지 가능

### 기대 Guide (📖 임상 가이드 탭)
- San Diego Consensus 2025 치료 알고리즘 A 분기 노출:
  - PPI 표준용량 BID × 3개월 + 알긴산 4회/일 병용
- 후두경 소견만으로 LPRD 진단 불가 강조
- 기존 v1 LPR의 PPI + 뮤테란 treatment도 동시 노출 가능 (병렬 inject)

### 체크리스트
- [ ] LPR-consensus 감지
- [ ] 알고리즘 A (식도 증상 동반) 명확 표시
- [ ] 후두경 한계 bullet 노출
- [ ] `[출처: Yadlapati R et al. Am J Gastroenterol 2025` 태깅 (PMID/DOI는 간결성 우선 drop 허용 — 2026-04-21 미르 결정 (a))
- [ ] 섹션 라벨 `[출처: LPR-consensus.exam]` 0건
- [ ] `[출처 미확인]` 0건
- [ ] v1 LPR과 중복 노출 시 적절성 (중복해도 안전성 문제 없음 — 관찰만)

---

## 시나리오 2 — LPR-consensus (고립 LPS 분기 B)

### Transcript
```
만성 기침이랑 목 이물감이 6개월째예요. 주 3~4번은 목 청소하게 되고요.
근데 속쓰림이나 역류감은 전혀 없어요. PPI 처음 먹어보려는데 괜찮을까요?
```

### 기대 Triage 감지
- `LPR-consensus`

### 기대 Guide
- 알고리즘 **B 분기 (고립 LPS)** 노출:
  - **PPI 경험적 치료 미권고** (식도 증상 없음)
  - 내시경 + 보행성 역류 모니터링 먼저
  - 24h pH-impedance / 96h wireless pH 언급

### 체크리스트
- [ ] 알고리즘 B로 분기 (A 알고리즘 잘못 inject되지 않음)
- [ ] "PPI 경험적 치료 미권고" 메시지 명확
- [ ] 내시경·pH 모니터링 언급
- [ ] `[출처: Yadlapati R...]` 태깅
- [ ] 3층 방어선 공통 4지표 통과

---

## 시나리오 3 — sglt2-inhibitors (비뇨생식기 감염 리스크 강조)

### Transcript
```
50대 여성 당뇨 환자, HbA1c 7.8. 메트포르민 쓰고 있고 추가로 포시가 넣으려고 해요.
근데 요로감염 자주 걸리는 편이에요. 작년에만 방광염 3번. 이 약 써도 되나요?
```

### 기대 Triage 감지
- `sglt2-inhibitors`

### 기대 Guide
- 비뇨생식기 감염 위험 핵심 경고
- 반복성 UTI 기왕력 → 위험-편익 재평가 권고
- 처방 전 교육 항목 (수분섭취·회음부 위생·증상 발생 시 내원)
- **TIPS 라벨 확인 포인트**: indication·contraindication 섹션이 `[출처: TIPS — 일반 약리 지식]`로 inject되는지

### 체크리스트
- [ ] sglt2-inhibitors 감지
- [ ] 반복성 UTI 기왕력에서 위험-편익 재평가 bullet 명시
- [ ] 환자 교육 항목 3개 이상 (수분·위생·증상)
- [ ] TIPS 라벨 `[출처: TIPS — 일반 약리 지식]`가 indication/contraindication/reimbursement bullet에 그대로 매핑 — 섹션 라벨 오용 아님
- [ ] Tier 1 `[출처: Swanson J et al. Am Fam Physician 2026...]`가 비뇨생식기 감염 bullet에 매핑
- [ ] 3층 방어선 공통 4지표 통과

---

## 시나리오 4 — vitamin-d (일반 성인 광범위 보충 미권고)

### Transcript
```
50대 여성. 비타민D 먹으면 암 예방된다고 들었어요. 건강검진 결과도 정상이고
특별한 증상도 없는데 먹어야 하나요? 주변에서 다 먹길래요.
```

### 기대 Triage 감지
- `vitamin-d`

### 기대 Guide
- "암 예방 근거 불충분 — 일상적 보충 미권고" 명확
- 근거 있는 적응증 (75세↑·임신부·흡수불량·결핍 확인) 구분 제시
- dosing 섹션은 `[TIPS — 일반 약리 지식]`로 inject

### 체크리스트
- [ ] vitamin-d 감지
- [ ] "암 예방·심혈관·당뇨 예방 근거 불충분" 메시지
- [ ] 근거 있는 적응증 구분 (50-74세 건강 성인 미권고 / 75세↑ 권고)
- [ ] dosing bullet에 `[출처: TIPS — 일반 약리 지식]` 태깅
- [ ] Tier 1 `[출처: Dakkak M...]`가 indication bullet에 매핑
- [ ] 3층 방어선 공통 4지표 통과

---

## 시나리오 5 — 아나필락시스 / neffy (EpiPen 대체)

### Transcript
```
2년 전 벌에 쏘여서 응급실 실려간 적 있어요. 그 후 EpiPen 처방받았는데
주사기 무서워서 들고 다니질 못했어요. 최근에 코에 뿌리는 에피네프린이
나왔다던데 그게 쓸 만한가요? 6살 아들도 땅콩 알레르기 있어서 같이 궁금해요.
```

### 기대 Triage 감지
- `아나필락시스` (neffy 단독 키 아니어야 함 — 임상 맥락 감지 우선)

### 기대 Guide
- Neffy 비강 투여 기본 사용법 (2 mg/비공, 5-10분 후 재투여)
- EpiPen vs Neffy 비교표 핵심
- **응급실 이송 필수** (효과 단기, 이상성 반응 위험)
- 소아 적용 가능 언급

### 체크리스트
- [ ] 아나필락시스 카테고리 감지 (neffy 아님 — 미르 결정 2026-04-22)
- [ ] neffy 엔트리 inject 확인 (keyword 매칭)
- [ ] EpiPen vs Neffy 비교 bullet 노출
- [ ] 응급실 이송 필수 경고 명시
- [ ] `[출처: Wolf J et al. Am Fam Physician 2026...]` 태깅
- [ ] 3층 방어선 공통 4지표 통과

---

## 시나리오 6 — depression-screening (USPSTF 외래 스크리닝)

### Transcript
```
30대 여성. 지난 한 달 잠이 잘 안 오고 기분이 가라앉아요. 예전엔 좋아하던 취미도
이제 흥미가 없어요. 건강검진 왔는데 우울증 검사도 같이 받을 수 있나요?
```

### 기대 Triage 감지
- `depression-screening`

### 기대 Guide
- PHQ-2 초기 선별 → PHQ-9 확인 단계
- **PHQ-9 항목 9 양성 → 즉시 자살위험 평가** 강조
- C-SSRS 또는 간이 질문 예시
- 의뢰 기준 (PHQ-9 ≥15 / 자살위험 양성 / 치료 실패 / 양극성 의심)

### 체크리스트
- [ ] depression-screening 감지
- [ ] PHQ-2 → PHQ-9 단계 명확
- [ ] **자살위험 평가 단계 bullet 노출** (안전 핵심)
- [ ] 의뢰 기준 4개 중 ≥2개 bullet
- [ ] `[출처: Mabry-Hernandez IR...]` 태깅
- [ ] 3층 방어선 공통 4지표 통과

---

## 시나리오 7 — heart-failure 재검증 (백로그 P0 #2, 2026-04-21 ingest)

### Transcript
```
72세 남성, HFrEF EF 35%. ACEi + BB 복용 중이고 NYHA II. 3개월 전에 SGLT2i 추가했어요.
이제 독감철인데 예방접종 뭐 맞아야 하나요? 폐렴구균도 아직 안 맞았어요.
```

### 기대 Triage 감지
- `heart-failure` + `vaccination` + `sglt2-inhibitors` (병렬 — 3건 이상)

### 기대 Guide
- 심부전 환자 감염 예방접종 6종 노출 (독감·폐렴구균·대상포진·Tdap·COVID 등)
- heart-failure primary 셀에서 **dosing·protocol 제외** (Boss D안 — 전문의 titration 영역) — 2026-04-21 확정
- schedule·monitoring·referral 중심
- (복합 감지) SGLT2i 비뇨생식기 감염 위험 경고도 부속 노출

### 체크리스트
- [ ] heart-failure 감지 + parents 확장 없음 (heart-failure는 상위)
- [ ] 예방접종 6종 언급
- [ ] **dosing·protocol bullet 없음** (Boss D안 원칙 — 전문의 영역)
- [ ] schedule·monitoring·referral 노출
- [ ] sglt2-inhibitors 병렬 inject 시 비뇨생식기 경고도 동시 (복합 환자)
- [ ] 기존 `heart-failure.md`·`heart-failure-referral.md` 섹션 sources[] 공백 스캐너 실행:
  ```js
  Object.entries(KNOWLEDGE_BUNDLE["heart-failure"].sections)
    .filter(([k,s]) => !s.sources || s.sources.length===0)
    .map(([k])=>k)
  ```
  → 출력: 공백 섹션 키 목록 (Phase 5b 우선순위 리스트 시드)
- [ ] 3층 방어선 공통 4지표 통과

---

## 추가 관찰 (회귀 위험 — 시나리오 무관 수집)

- **LPR v1(기존) + v2(`LPR-consensus`) 중복 inject** — 시나리오 1·2에서 두 엔트리가 동시 inject되는지, 중복 노출이 과도한지 관찰. 과도하면 prompt 강화 대상.
- **sglt2-inhibitors의 TIPS 라벨 가독성** — `[출처: TIPS — 일반 약리 지식]`가 화면에서 의사에게 어떻게 보이는지 (진료 신뢰도 감점 여부). 미르 주관 평가.
- **아나필락시스 카테고리 확장 여지** — 나중에 `urticaria` 엔트리도 이 카테고리에서 동시 inject되면 적절한지. 이번 QA에서 시나리오 5로 샘플링.

---

## 리포트 양식 (데스크탑 세션이 작성)

실기 종료 후 다음 파일을 신설:
```
sessions/2026-04-22-chrome-qa-results.md
```

양식:
```markdown
# Chrome QA 결과 — 2026-04-22

## 요약
- 시나리오 7건 중 통과 N건
- 3층 방어선 공통 4지표 baseline 유지: 섹션 라벨 0건 / 출처 미확인 0건 / TIPS 매핑 M건 / 부조화 drop K건

## 시나리오별 결과
### 시나리오 1 — LPR-consensus A 분기
| 체크 | 결과 | 비고 |
|---|---|---|
| ... | PASS / FAIL | 실제 bullet 캡처 |

## 3층 방어선 첫 실전 종합 평가
- TIPS 공식화(`[TIPS — 일반 약리 지식]`) 4건 매핑 동작: ...
- 섹션↔출처 자가검증 사전 방어선: (창작층은 이번 ingest에 이미 적용, 출력층 관찰 결과) ...

## 발견된 문제
- ...

## 다음 작업
- Phase 5b 우선순위 (sources 공백 스캐너 결과 붙여넣기)
- prompt 강화 필요 항목 (회귀 관찰)
- ...

## 세션 종료 체크리스트
...
```

---

## 종료 조건

- 7 시나리오 모두 실행 + 체크리스트 작성 + 결과 파일 생성
- 심각한 regression 발견 시: 즉시 중단, 원인 진단 세션으로 전환. 브랜치에만 기록하고 main 푸시 보류

실기 완료 후 main 직접 머지 (CLAUDE.md 2026-04-20 원칙).
