# sessions/2026-04-16-knowledge-expansion-audit.md

## 세션 정보
- 날짜: 2026-04-16
- 작업: Knowledge 대규모 확장 + Bundle/Triage 동기화 + Audit
- 건드린 파일: 아래 상세 참조

---

## 작업 1: Knowledge Ingest (이전 세션 ~ 4/16)

### 추가/수정된 Knowledge 파일

| 파일 | 변경 | 내용 |
|------|------|------|
| `knowledge/by-disease/obesity.md` | 수정 | "적게 먹어도 살찐다" 3유형, GLP-1 초진 Flow 8단계, 중간점검 문진 4파트, 단백질 ABC 식사순서, Adaptive Thermogenesis 환자설명용 |
| `knowledge/by-disease/oral-lesion.md` | 수정 | lichen planus 키워드 추가, Step 2 소론도 escalation (2T #2 x14일) |
| `knowledge/by-drug/glp1-selection-strategy.md` | 수정 | 반응 예측 인자 (2건 미신 반박), non-responder 기준, 빠른 감량 대응 4가지 |
| `knowledge/log.md` | 수정 | 8건 신규 기록 (4/16) |
| `skills/knowledge-ingest/SKILL.md` | 수정 | 병태생리 저장 규칙 + by-disease 템플릿 "왜 이런 증상이 생기나" 섹션 추가 |

### 신규 파일
| 파일 | 내용 |
|------|------|
| `knowledge/scope.md` | Scout 학습 범위 Tier 1-4 정의 |
| `routines/scout.md` | Scout 일일 루틴 (마커 [o]/[x] 통일) |
| `routines/deep-extract.md` | Deep Extract 루틴 (마커 통일) |
| `skills/paper-extract/SKILL.md` | 논문 추출 스킬 (병태생리 항목 추가) |

---

## 작업 2: Audit + Bundle/Triage 동기화 (4/16 후반)

### 문제 발견
1. **knowledge-bundle.js 19개 파일 미반영** — 앱에서 해당 질환 knowledge inject 불가
2. **Triage calcCategories 미확장** — 새 카테고리 감지 불가
3. **Git 미커밋** — 모든 변경사항 uncommitted
4. **세션 로그 없음**

### 수행한 수정

**`src/knowledge-bundle.js`** (238줄 → 500줄, 41 → 71 entries)
- 기존 항목 업데이트:
  - `구강병변`/`oral white patch`/`구강궤양`: 치료 3단계 escalation 반영 (소론도 추가)
  - `obesity`/`비만`: exam 필드 추가 (표현형, 초진Flow, F/U체크, 단백질ABC)
  - `vaccination`/`예방접종`/`백신`: treatment에 접종 간격 원칙 추가
- 신규 항목 추가 (30개):
  - 약물: 위고비, wegovy, semaglutide, 마운자로, mounjaro, tirzepatide, zepbound, 오젬픽, ozempic
  - 백신: A/B형간염, hepatitis A/B, herpes zoster, shingrix, 싱그릭스, 조스타박스, pneumococcal, 인유두종바이러스, 가다실, 일본뇌염, Japanese encephalitis, 광견병, rabies, 수두, varicella, MMR, 홍역, 풍진, 폴리오, IPV
  - 기타: lichen planus, 후각감퇴, 후각기능저하, hyposmia, anosmia, 후각소실, 냄새 못맡음

**`src/prompts.js`** — calcCategories 확장 (18 → 28개)
- 추가: 위고비, 마운자로, 오젬픽, A형간염, B형간염, 일본뇌염, 광견병, 수두, MMR, 폴리오

---

## 결과
- 판정: 통과 (Audit 기반 정비 작업)
- 다음 작업:
  - inbox HWP 파일 2개 (PDF 변환 필요)
  - 비만 PPT 잔여 슬라이드 분석 (108슬라이드 미처리)
  - Whisper 통합 고도화

## 회고
- 예상과 달랐던 점: knowledge 파일 추가 시 bundle 재생성 + triage 확장이 누락되는 패턴 반복. ingest 스킬에 이 단계가 명시되어 있지만 여러 세션에 걸쳐 작업할 때 빠지기 쉬움.
- 다음 세션 반영: knowledge ingest 후 bundle 동기화 여부를 매 세션 종료 시 체크. Audit를 주기적으로 실행하는 것을 고려.
