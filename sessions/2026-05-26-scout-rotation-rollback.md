# sessions/2026-05-26-scout-rotation-rollback.md

## 세션 정보
- 날짜: 2026-05-26
- 작업: scout routine 롤백 + rotation 재편 (gaps.md 의존 제거 + Liby Follow-up 슬롯 신설)
- 건드린 파일:
  - `routines/scout.md` (전면 재작성)
  - `sessions/2026-05-26-scout-rotation-rollback.md` (신규)

---
## 결정 배경

### 문제 진단
- 2026-05-17 `07deeee refactor(scout): push형 daily radar → problem-based on-demand 전환` 이후 scout 산출량 급락
- 산출 추이: 05-13~05-17 9-10건/day (push형) → 05-18 6건 → 05-19 2건 → 05-20~21 3건 → 05-25 0건 → 어제·오늘 연속 0건
- 원인: gaps.md 기반 on-demand로 전환했으나 미르가 Google Drive에서 gaps를 수동 관리 시작 → `inbox/gaps.md` 갱신 정지 → scout 입력원 고갈

### 미르 지시 (2026-05-26)
1. `33a2f86` 시점(push형 daily radar) scout.md로 롤백
2. 단, "매일 7건 의무"는 폐기하고 **3-5건/day, 영역 rotation** 방식으로 변경
3. **Liby에 새롭게 업데이트된 내용도 돌아가면서 찾도록 update** — knowledge/ 회전 follow-up 슬롯 신설
4. gaps.md 의존 완전 제거 — scout는 읽지도 쓰지도 않음
5. PR로 던질 것 (CLAUDE.md "main 직접 머지" 원칙의 명시적 예외 — 미르가 "PR 던져줘"라고 지시)

---
## Designer 설계서

### 슬롯 구성 (합계 3-5건 목표)

| 슬롯 | 건수 | cycle | 비고 |
|---|---|---|---|
| 1-B Mir-Tier 1 rotation | 2건 | 7일 (매일 2영역 슬라이드) | 7영역 → 매일 [idx, idx+1] |
| 1-C 횡단 모듈 | 1건 | 3일 | A/B/C (구버전 유지) |
| 1-D Tier 2 | 1건 | 8일 | 구버전 유지 |
| 1-E Liby Follow-up | 1건 | 회전 (최근 14일 업데이트 knowledge) | **신설** |
| **합계** | **5건 목표** | | 하한 3건 안전 회복 |

### 1-B rotation 알고리즘
```bash
DAY=$(($(date -d "$TODAY" +%s) / 86400))
IDX1=$((DAY % 7))
IDX2=$(((DAY + 1) % 7))
```
- 매일 2영역 cover, 한 영역씩 슬라이드 → 7일 cycle 내 모든 영역 2번씩 cover

### 1-E Liby Follow-up 알고리즘
1. `git log --since="14 days ago" --name-only -- 'knowledge/*.md'`로 최근 업데이트 파일 풀 추출 (log.md·index.md·scope.md·MAP.md 제외)
2. 직전 7일 scout footer의 `Liby Follow-up:` 라인 회피
3. 1건 선택 → 파일에서 핵심 주제 키워드 추출 → `"{주제}" AND (review OR guideline OR consensus) 2025[dp]:2026[dp]` PubMed 검색
4. 해당 파일이 이미 인용한 PMID는 Step 2-B에 추가 차단 위임

### 제거 항목 (gaps.md 의존)
- 구 Step 1-E (gaps 기반 슬롯) 전체 삭제
- Step 1-2 키워드 추출에서 gaps.md 파싱 로직 제거
- Step 1-3 gaps.md 마커 갱신 로직 제거
- Step 7 git stage에서 `inbox/gaps.md` 제거
- "gaps.md 절대 금지" 명시 (재발 방지)

### 단순화 항목
- 4-29 deprecated 영역 정의·매핑 표 삭제 (333 lines → 핵심만)
- "직전 2회 8건 미달 → 자동완화" 폐지 (rotation으로 3건 하한 안정)
- Step 6 footer 슬롯 표시 항목 정리 (rotation 기반)

---
## Builder 결과
- `routines/scout.md` 전면 재작성: 237 lines (problem-based) → 새 버전 (push형 rotation + Liby Follow-up)
- diff: +166 / -89

---
## 결과
- 판정: 통과 (PR 검토 대기)
- 다음 작업: 미르 PR 머지 → 내일 06:00 KST 자동 실행 → 산출량 ≥3건 확인

## 회고
- 예상과 달랐던 점: `33a2f86` 시점 scout.md가 366줄로 deprecated 섹션·이전 patch 기록이 다수 포함되어 있어 단순 롤백이 아닌 발췌+재구성 필요했음
- 다음 세션 반영: rotation 방식이 실제 3-5건 안전 범위 내에서 작동하는지 첫 주(7일 cycle 1회전) 산출 추이 모니터링 필요
