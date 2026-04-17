# Session: Deep Extract — 2026-04-17

## 세션 정보
- 날짜: 2026-04-17
- 루틴: routines/deep-extract.md 자동 실행
- 브랜치: claude/deep-extract-2026-04-17
- PR: #1

## 결정 배경
inbox/scout/2026-04-17.md 에서 `[o]` 체크된 4건 처리.
논문 3번 (CAP 단기 항생제, PMID:41974005) 은 `[ ]` 미체크 — 제외.

## 건드린 파일 목록
| 파일 | 작업 |
|------|------|
| knowledge/by-disease/urticaria.md | 신규 생성 |
| knowledge/by-disease/resistant-hypertension.md | 신규 생성 |
| knowledge/by-drug/glp1-selection-strategy.md | 섹션 2개 추가 (SMI + 전당뇨) |
| knowledge/log.md | 4줄 추가 |
| inbox/scout/2026-04-17.md | [o] → [⏳ PR#1] 4건 업데이트 |

## 추출 상세

### 1. 두드러기 (PMID:41839072) [CLINICAL]
- 신규: knowledge/by-disease/urticaria.md
- 핵심: 급성/만성 분류 기준(6주), 단계별 처방, 장기 스테로이드 금지, 특수환자군

### 2. 저항성 고혈압 (PMID:41544280) [CLINICAL]
- 신규: knowledge/by-disease/resistant-hypertension.md
- 핵심: 배제 항목 6가지, 3제(CCB+ARB/ACEi+thiazide) + 4제(spironolactone), 시술 의뢰 기준

### 3. GLP-1RA × SMI (PMID:41618880) [CLINICAL — 조건부]
- 추가: glp1-selection-strategy.md
- 핵심: 체중 –6.17kg, HbA1c –0.31%, 탈락률 위약과 동일

### 4. GLP-1RA × 전당뇨 (PMID:41984373) [INSIGHTS]
- 추가: glp1-selection-strategy.md
- 핵심: tirzepatide 93.3% 정상혈당 회복, 중단 시 감소 → 장기 유지 교육

## 판정
- 대기 중 (PR #1 미르 승인 후 main 반영)

## 다음 작업
- PR Merge 후 Step 5: scout 마커 `[⏳ PR#1]` → `[✓]` 업데이트

## 회고
- 4건 모두 초록 기반 추출 (전문 미확인 명시)
- GLP-1RA 2건은 기존 glp1-selection-strategy.md 에 섹션 추가 — 파일 일관성 유지
