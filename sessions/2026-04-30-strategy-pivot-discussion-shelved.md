# Chartji 방향성 Pivoting 전략 리뷰 (보류) — 2026-04-30

## 세션 정보
- 호출: 미르 — "이와 같은 핵심영역 재편으로 chartji의 방향성을 변경해보려고 하는데 어때?" → "boss" → "아예 다 갈아 엎어야할까?" → "재택의료에서는 ... 완전히 다른 틀이 필요한 거 같아서" → "일단 이런 논의가 있었다는 것만 정리하고 보류하자"
- 역할: Boss 전략 리뷰 (CMO·CLO·CFO·CVO) → 코드 변경 없음
- 결정: **보류**
- 브랜치: claude/flamboyant-cartwright-d9e5d0

---

## 배경

2026-04-29 Mir-Tier 1 핵심영역 선언(POCUS·만성통증·완화의료·재택의료·노인의학·임상약물학·생활습관 + 부속 횡단 3모듈) 후 **chartji 제품 방향성 자체를 niche로 pivoting할지** 검토 요청.

Pivoting 명분:
- Ambient AI (Abridge·Suki·DAX·Heidi 등) 대규모 병원 시장 진입 가속 → chartji가 외래 일반에서 후발주자로 경쟁 어려움
- 1인 개발 + 한국 가정의학과라는 좁은 폼에서 niche 전략이 필요
- 미르 본인의 임상 핵심영역(재택·완화·통증·POCUS)을 chartji 정체성과 동기화

---

## Boss 4관점 분석 결과

### CMO (환자 안전·임상 판단)
- niche 4영역의 안전 분포 다름. 재택 다약제·완화 임종기 약물·통증 opioid·POCUS 영상 해석 — 각각 위험 수준 다름
- 의사 자신 없는 영역일수록 AI 의존 risk 높음 (외래보다 큼)
- 새 영역 RedFlag 정의 부재
- **판정**: 조건부 통과 — 처방 자동화 회피·새 영역 RedFlag 정의·의사 판단 우선 원칙 강화 필요

### CLO (법적 위험)
- SaMD(Software as Medical Device) 경계선 — niche로 갈수록 "보조" vs "추천" 경계 흐려짐
- ACP·임종기 결정·opioid 처방은 medico-legal 문서 그 자체
- 가정·임종 데이터 민감도 외래보다 높음
- **판정**: 조건부 통과 — `rules/samd-boundary.md` 신설·disclaimer 강화·audit trail·데이터 보안 등급 상향 필요

### CFO (자원·비용·효율)
- 1인 개발 자원으로 4 phase 동시는 무리 → 단계적 진행 강제
- 모드 분리 아키텍처로 token 분산 가능
- Agent 재사용 원칙 (신규 추가 전 기존 확장)
- 시장 검증 미명확이 가장 큰 risk → 미르 동료 의사 5~10명 인터뷰로 1차 검증 필요
- **판정**: 단계적 진행 시 적정

### CVO (핵심가치·복잡도)
- 핵심가치 충돌 아닌 **확장**: "외래" → "1차 의료 환경 통합 (외래·재택·완화·학습)"
- niche 영역에서 "필수 항목 누락 방지" 가치가 외래보다 더 강함
- 사용자 입장 단순화 + 개발자 입장 복잡도 증가 (모듈 분리로 관리)
- **판정**: 부합 — CLAUDE.md 핵심가치 정의 재작성 필요, `user_clinical_focus.md` source link

---

## "갈아엎기?" 질문에 대한 분석

미르 질문: "아예 다 갈아 엎어야할까?"

**결론: 갈아엎기 권장 안 함.**

이유:
1. 살릴 자산 큼 — 안전 패널 3개 구조·Liby ingest·knowledge bundle·prompt 모듈·음성 전사·4월 누적 patch
2. 1인 개발 자원 한계 — 갈아엎으면 6~12개월 후퇴
3. 갈아엎기 충동의 90%는 매몰 비용 회피·새 시작 매력 같은 **심리 요인**

대안: **Transformation (변형)** — 정체성 재정의 + 모듈 분리 아키텍처 + 외래 모듈 deprecation은 사용자 데이터 보고 결정.

---

## 결정적 발견 — 재택 frame은 외래 frame과 본질적으로 다름

미르 이어진 질문: "재택의료에서는 환자-의사 대화 녹취 시스템보다 완전히 다른 틀이 필요한 거 같아서. knowledge·차팅 보조는 도움 되지만, 진료실 같은 상황이 전혀 아니기 때문에..."

이 직관이 정확. 재택 frame 분석:

### 자산 분리

| 자산 | 외래 전용 (frame-bound) | 환경 무관 (재사용 가능) |
|---|---|---|
| 음성 녹취 → 실시간 전사 | ✓ (책상·짧은 시간 가정) | — |
| RedFlag/Missing/Triage **실시간** 패널 | ✓ (대화 흐름 가정) | — |
| Working Draft (실시간 생성) | ✓ | — |
| knowledge base + Liby ingest | — | ✓ |
| chart 출력 prompt + 템플릿 | — | ✓ |
| panel 정의 자체(RedFlag/Missing 개념) | — | ✓ (frame만 다르게) |

음성+실시간 frame은 "외래 책상"이라는 환경에 묶인 가정. 재택에선 의사가 환자 손 잡고 욕창 보고 가족과 ACP 대화하는 동안 노트북 쳐다볼 수 없음.

### 재택 frame 추정

- **방문 전**: 지난 방문 요약·약물 리스트·미해결 issue·오늘 체크할 항목 (asynchronous prep)
- **방문 중**: hands-free / minimal interaction. 음성 **메모** (short voice note, 녹취 아님) + 사진(욕창·환경) + POCUS 영상 attach + 체크리스트
- **방문 후**: 통합 차팅 + 다음 방문 plan + 가족·간병인 보고서

→ chartji v18의 좌측 transcript / 우측 패널 3개 구조와 **근본적으로 다른 UX**.

---

## 진화 방향성 (Boss 권고)

**chartji = 단일 앱이 아니라 환경별 도구 suite으로 진화** 가능성 제기:

- `chartji-outpatient` (= 현 v18) — 외래 frame 유지, 폐기 안 함
- `chartji-home` — 재택 frame (신규 설계)
- `chartji-palliative` — 완화 frame (다음 phase)
- `chartji-edu` — 의료진 교육 (학습 도구, 진료 보조 아님)
- `chartji-knowledge` — **공유 lib** (Liby + bundle + section vocabulary + prompt 템플릿)

### Architecture 옵션 (3개 제시됨)

| 옵션 | 장단 |
|---|---|
| **A. 모노레포 + 공유 lib** | knowledge·prompt 진짜 공유 (npm or git submodule). 코드 base 분리되어 frame 충돌 없음. 가장 깔끔. 1인 개발 부담 약간. |
| **B. 단일 앱 + 모드 라우팅** (`?mode=home`) | 배포 1개. UI는 모드별 완전 분리. 자산 공유 자동. 가장 빠름. |
| **C. 별 제품 + knowledge md 수동 sync** | 단순하나 sync 부담. 비추 |

Boss 권고: **B 먼저 → 검증 후 A로 마이그레이션** (v18 outpatient 리네임 + home 모드 신규 추가가 1~2주).

---

## 미해결 질문 (재개 시 결정 필요)

### 1. 재택 frame을 어디에 둘 것인가
- a. chartji 안에 새 모드로 추가 (B 옵션)
- b. 완전 별 제품으로 시작, knowledge만 공유 (C 옵션)
- c. 외래로 유지하고 재택 보류

### 2. 핵심가치 재작성 시점
- a. 즉시 (`CLAUDE.md` tagline·핵심가치 갱신만 — 코드 변경 0)
- b. 재택 frame 결정 후
- c. 보류

### 3. 안전선 rule 신설 시점
- `rules/samd-boundary.md` (자동 추천 금지·disclaimer·audit trail)
- `rules/niche-redflag.md` (재택·완화·만성통증 RedFlag 정의)
- a. 재택 frame 결정 전
- b. 결정 후
- c. 보류

### 4. 시장 검증 시점
- 미르 동료 의사 5~10명 인터뷰 (재택의료·완화의료 도구 수요)
- 한국 재택의료 정식사업 이행 타임라인 추적

---

## 보류 결정 (2026-04-30 미르)

미르 지시: "일단 이런 논의가 있었다는 것만 정리하고 보류하자."

### 현재 상태
- 4-29 작업물 (Bundle backlog ingest 22건·Scout 다양성 패치·Mir-Tier 1 scout 재편) **모두 main 반영 완료** — 이건 보류와 무관, 정상 진행
- chartji 제품 방향성 변경 (외래 → niche pivoting / single-frame → multi-frame suite)은 **결정 보류**
- 미르 핵심영역 선언(`user_clinical_focus.md`)은 **유지** — 이건 미르 직업 정체성이고 scout/학습 우선순위에 이미 반영됨. pivoting과 별개.

### 재개 trigger (예상)
- 다음 cron(5-1~) 신 routine 운용 데이터 1주 → 5-6 재검증 시 함께 재검토
- 또는 미르가 시장 검증 (동료 의사 인터뷰) 결과 가지고 재호출
- 또는 외래 chartji v18 사용 중 재택·완화 환경에서 갈증 명확해질 때

---

## 회고

### 잘된 점
- 미르가 "갈아엎기?" 충동을 표면화 → Boss 4관점으로 분석 → 진짜 갈등은 "외래 frame이 재택에 부적합"이라는 architecture 직관임을 식별
- "갈아엎기 vs 변형" 이분법을 "정체성 재정의 / 모듈 분리 / deprecation 시점" 3단계 결정으로 분해
- 보류 자체가 정당한 결정 — 시장 검증·운용 데이터 없이 결정하면 매몰 비용 risk

### 다음 세션 참조 포인트
- 이 파일 + `~/.claude/projects/.../memory/user_clinical_focus.md` + Boss 4관점 보고서 구조
- chartji `knowledge/scope.md` Mir-Tier 1 섹션
- 재택 frame 분석 (이 파일 § "재택 frame 추정")
- Architecture 옵션 3개 (A·B·C)

### 메모리 후보 (이번엔 저장 안 함 — 보류 결정)
- "외래 frame이 재택에 안 맞는다" 직관은 미르의 architecture 통찰. 재개 시 메모리 저장 검토. 지금 저장하면 결정 미정 상태에서 가이드 역할로 작동할 risk 있음.
