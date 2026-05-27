# sessions/2026-05-26-deep-extract-pr-embed.md

## 세션 정보
- 날짜: 2026-05-26
- 작업: deep-extract routine 재편 (main 직접 머지 → study-notes 풀 임베드 PR)
- 건드린 파일:
  - `routines/deep-extract.md` (Step 3·5 + 목적 섹션 수정)
  - `rules/forbidden.md` (예외 규정 갱신)
  - `sessions/2026-05-26-deep-extract-pr-embed.md` (신규)

---
## 결정 배경

### 문제
- `inbox/study-notes/` 159개 파일 누적
- Deep extract 후 미르가 study-notes 개별 파일을 일일이 열어보지 않아 학습 자원 사장
- 미르 발언 (2026-05-26): "study-notes는 열어보지도 않게돼"

### 후보 검토
1. **PR body 풀 임베드**: 모바일 GitHub 앱 PR 흐름에 합쳐 별도 파일 열기 불필요
2. **일일 digest 파일**: 파일 수 1/N, 하지만 "열어보기" 단계 잔존 + 검색 어려움
3. **둘 다 (보존 + PR body)**: 약간의 중복 비용으로 양쪽

### 분량 검증
- study-notes 평균 3KB / 60줄, 최대 16KB
- scout 3-5건/day 축소 (이번 세션 직전 작업) → 평균 5 × 3KB = 15KB
- GitHub PR body 한도 64KB → 여유 충분
- 엣지케이스(16KB 본문 5건 겹침 = 80KB)는 60KB 임계값 안전장치로 대응

### 미르 승인 (2026-05-26)
"오케이" — (1) 풀 임베드 채택. study-notes 보존도 그대로 유지 (실질 (3)).

---
## 변경 내용

### routines/deep-extract.md
- **목적 섹션**: "main에 직접 머지" → "study-notes 풀 임베드 PR 생성"
- **공부 워크플로우 안내문 추가**: PR description = 공부 자원, 머지 = 공부 완료
- **Step 3 전면 재작성**:
  - 3-1: 파일 반영 (기존 동작 유지)
  - 3-2: 브랜치 `claude/deep-extract-YYYY-MM-DD` push
  - 3-3: PR 생성 + body 양식 (처리 요약 표 + 각 study-note 풀 본문 + Liby 호출 안내)
  - 3-4: 동작 흐름 (모바일 PR 읽기 → 머지 → main 반영)
- **60KB 안전장치**: body > 60000자면 본문 임베드 대신 파일 링크 fallback
- **Step 5 완료 보고**: "main 반영됨" → "PR 생성됨 ({url})"

### rules/forbidden.md
- 2026-04-22 "자동 routine 산출물 main 직접 머지" 예외 → "자동 routine은 PR 방식 사용"으로 갱신
- deep-extract PR 재편 사유 명시 (study-notes 159건 사장 해결)

---
## 결과
- 판정: 통과 (PR 검토 대기)
- 다음 작업: 미르 머지 → 다음 정오 12:00 KST 자동 실행 → PR body 임베드 실제 동작 확인

## 회고
- 예상과 달랐던 점: 기존 `rules/forbidden.md`에 "deep-extract main 직접 머지" 명문 규정이 있어 동시 수정 필요. 누락 시 routine 재편이 무효화될 위험이었음.
- 다음 세션 반영: 첫 PR 생성 시 body 길이·모바일 가독성 실측. 16KB+ 본문이 다수 겹치는 날에 60KB 임계값이 실제 발동하는지 추적.
