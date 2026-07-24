# sessions/2026-07-24-scout-drop-pr.md

## 세션 정보
- 날짜: 2026-07-24
- 작업: Scout PR 방식 폐지 → main 직접 반영 (GitHub MCP write)
- 건드린 파일: `routines/scout.md`, `rules/forbidden.md`

---
## 결정 배경

미르: "PR을 쓰던 이유는 푸시 알림이 오기 때문이었어. 그런데 어차피 scout가 돌면 클로드가 알림을 보내주네. 그럼 PR 없어도 되겠다."

- PR의 유일한 목적 = 모바일 푸시 알림. scout 루틴 완료 알림이 이를 이미 대체 → PR은 머지 탭이라는 순수 마찰만 남음.
- 배경 제약(2026-04-19): scout 루틴 환경은 `git push origin main` 이 샌드박스 차단(main-random 리다이렉트). 그래서 원래 PR로 우회했던 것.
- 해결: git push 대신 **GitHub MCP `create_or_update_file` 로 main 에 직접 write** (CLAUDE.md 「403 우회」 경로). scout는 이미 MCP로 PR을 만들던 이력 → MCP 접근 가능 확인됨.

## 건드린 파일 상세

### `routines/scout.md`
- **Step 7 전면 재작성**: "브랜치 생성 + PR" → "main 직접 반영". 7-1: `mcp__github__create_or_update_file`(branch=main, path=inbox/scout/$TODAY.md, message=논문제목). 7-2: 동작 흐름(완료 알림 → Obsidian/GitHub에서 반응 작성 → 정오 deep-extract). 브랜치·PR·머지 언어 전부 제거.
- **실행 주기(상단)**: PR/머지 흐름 → main 직접 반영 + 완료 알림 흐름.
- **Step 5 아카이브**: 하루 1건이라 일 단위 자동 이동 폐지(누적 무방, 요청 시만 정리).
- **핵심 원칙**: "PR 제목=논문 제목" → "커밋 메시지=논문 제목"(알림 경로).

### `rules/forbidden.md`
- 자동 routine 예외 조항에 scout 포함 + "scout도 2026-07-24 PR 폐지" 명시. 과거 "scout PR 방식 존속" 문구 대체.

---
## 결과
- 판정: 통과 (routine 문서 변경. 다음 scout 실행부터 PR 없이 main 직접 write)
- 검증: scout.md 내 PR/브랜치/머지 잔여 참조 없음(line 269 "branch: main"은 MCP 파라미터로 정상). deep-extract는 무변경(main의 반응을 읽으므로 영향 없음).
- 다음 작업: 실제 scout 실행이 PR 없이 main에 파일을 쓰는지 + 완료 알림에 논문 제목이 실리는지 관찰.

## 회고 / 미해결
- **반응 write-back 다리 문제는 별개로 남음**: 미르는 주로 핸드폰(Obsidian Sync), 가끔 데스크탑. Obsidian Sync는 GitHub이 아니라 옵시디언 클라우드로만 동기화 → 폰 반응이 GitHub(=deep-extract)에 도달하려면 Obsidian Git이 도는 기기(데스크탑)가 다리 역할 필요. 데스크탑이 "가끔"이면 루프가 타이밍 의존적으로 불안정.
- PR 폐지는 "논문이 main에 깔끔히 도달"을 개선(모든 소비 경로에 공통 이득)했지만, "반응이 main으로 돌아가는" 경로는 기기 구성에 따라 미해결. 다음 세션에서 반응 surface 결정 필요(폰 Obsidian Git 직접 / 소형 학습 repo / 소형 웹 UI 중 택1).
