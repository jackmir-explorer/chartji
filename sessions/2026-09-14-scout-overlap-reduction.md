# sessions/2026-09-14-scout-overlap-reduction.md

## 세션 정보
- 날짜: 2026-09-14
- 작업: Scout 루틴 겹침 완화 재편 (미르 문제 제기 — "매일 스카우트가 이전과 너무 겹침, 주제 확장?")
- 건드린 파일: `routines/scout.md`

---
## 진단 (실측)
1. **30일 PMID 차단 급증** — 7월초 5건 → 8월초 24건. 좁은 키워드+고정 저널로 같은 우물을 긷는 중 (풀 saturation).
2. **슬롯 편중** — 최근 40일 Tier-1 7영역 각 3~5회 재탐색(10일 주기). 반면 Tier-2 breadth 8영역은 SLOT 8 하나를 8개가 나눠 써 각 영역 ~80일에 1번.
3. **1-A 양성 피드백** — 영역 내 "빈도 TOP 1" 세부키워드를 재검색 → 가장 많이 다룬 슬라이스를 또 검색. dedup은 30일·정확 PMID만 → 주제 반복 무제한.

→ **결론**: 스코프가 좁아서가 아니라, 넓은 스코프 안에서 좁은 슬라이스만 반복. "주제 확장"은 1순위 해법 아님.

## 미르 결정 (AskUserQuestion, 4중 3택)
- ✅ 세부주제 회전 (1-A 반전)
- ✅ Tier-2 breadth 비중 상향
- ✅ Wildcard 신선도 슬롯 추가
- ❌ 중복차단 강화(90일+주제레벨) — 미채택

## 변경 상세 (routines/scout.md)
- **슬롯 배분 재설계** (10일 cycle):
  - 기존: 1-B 7일(영역=SLOT) · 1-C 1 · 1-D 1(SLOT8) · 1-E 1(SLOT9)
  - 신규: 1-B **5일**(SLOT0~4, 영역=`DAY%7` 회전) · 1-D **2일**(SLOT5~6) · 1-C 1(SLOT7) · **1-F Wildcard 1**(SLOT8) · 1-E 1(SLOT9)
- **1-A 반전**: "log 최근 30 빈도 TOP 1" → "log 최근 60 **최소 커버** 세부키워드 회전"(scope.md 세부키워드 목록 기준, 동률 시 DAY 회전).
- **1-B 영역 선택**: `idx==SLOT` → `idx==DAY%7` (SLOT 분리 → 같은 영역 10일 주기 재방문 제거, 각 영역 ~14일).
- **1-D Tier-2**: 1슬롯 → 2슬롯(SLOT5·6, 서로 다른 날 → DAY%8 상이 → 2영역/cycle). 각 영역 ~80→~40일.
- **1-F Wildcard 신설**: 영역 무관 practice-changing 1건(AFP POEMs·BMJ·JAMA·NEJM·Ann Int Med·Lancet). knowledge 기존 주제 skip(신규 노출 전용, 재방문은 1-E 담당). Step 2-B PMID 차단 적용.
- **부수 갱신**: 핵심원칙 changelog, Step 2 저널 매핑표(1-F 행), Step 6 footer(1-A 회전 키워드·Wildcard 줄 추가).

## 불변 (Surgical 준수)
- 하루 ⭐ 1건·파인만 원칙, 답변 게이트, main 직접 write(GitHub MCP), Step 0 날짜 정책, Step 2-B dedup(30일), Deep Extract 연동 — 전부 그대로.

## 결과
- 판정: 통과 (잔존 옛 슬롯 참조 0, diff +45/−13)
- 다음 작업: 며칠 운영 후 30일 PMID 차단 건수·주제 다양성 재측정 → 효과 확인. 부족하면 미채택했던 dedup 90일+주제레벨 재검토.

## 회고
- 예상과 달랐던 점: 문제는 "좁은 스코프"가 아니라 "넓은 스코프의 좁은 사용" — 배분·회전 로직이 근본 원인이었음. 확장(Wildcard)은 3순위 보조로만.
- 다음 세션 반영: 자동 routine 명세 변경 → main 반영 필수(daily cron이 main 기준). scope.md 세부키워드 목록이 1-A 회전의 SoT가 되므로 목록 정확도 유지 중요.
