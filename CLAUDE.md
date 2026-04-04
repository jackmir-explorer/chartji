# CLAUDE.md — Chartji 개발 하네스

Chartji는 한국 가정의학과 외래 대화 기반 진료 보조 도구다.

---

## src/ 파일 구조 및 책임

```
src/
├── index.html              뼈대 (CDN + script 태그만)
├── styles.css              스타일 전체
├── constants.js            PROB_COLORS, CC_KEYWORDS, detectLocalCC,
│                           EMPTY_PANEL_STATE, SAMPLE 등
├── prompts.js              *_PROMPT 상수 (Triage·Missing·RedFlag·Problems·WorkingDraft·Guideline)
├── api.js                  callClaude + generate* 순수함수
├── components/
│   ├── primitives.js       BulletList, PanelEmpty, SubLabel, PanelCard
│   └── panels.js           RedFlagPanel, MissingPanel, TriagePanel, ProblemsPanel
└── app.js                  App() 배선판 (WorkingDraft·안전패널 조율)
```

> **현재 버전: v15** — Final Chart / Guideline 탭 제거됨. 추천검사/치료 탭은 다음 세션에서 신규 구현 예정.

파일별 책임 경계 → `rules/file-ownership.md`

---

## 핵심 제품 원칙

1. 화면 출력은 짧고 선명하게 — reasoning dump 금지
2. Safety core > Guideline assist
3. 패널 역할 분리 — 침범 금지
4. 전체 재작성 금지 — 국소 수정만
5. RedFlag는 transcript-only — context 주입 절대 금지

---

## 하네스 구조

```
agents/   판단 주체
skills/   에이전트가 호출하는 도구 (각 폴더의 SKILL.md)
rules/    불변 규칙
sessions/ 개발 기록 (지식 축적)
src/      소스 파일
```

| 에이전트 | 스킬 |
|---------|------|
| Boss | skills/scope-gate |
| Designer | skills/file-map |
| Builder | skills/edit-file |
| Reviewer | skills/review-change |
| QA | skills/clinical-qa |

---

## 세션 프로토콜

1. Boss → scope-gate → 승인서
2. Designer → file-map → 설계서
3. **미르 승인**
4. Builder → edit-file → 실행
5. Reviewer → review-change → 검토
6. QA → clinical-qa → 판정
7. 통과: 버전 업 + sessions/ 기록 / 실패: 롤백 + 2번으로

### 세션 기록 규칙 (필수)

**모든 코드 변경 작업이 끝나면 반드시 `sessions/YYYY-MM-DD-[작업명].md` 를 생성한다.**

- 미르가 별도로 요청하지 않아도 Builder 단계 완료 시 자동 기록
- 파일명: `sessions/YYYY-MM-DD-작업명.md` (날짜는 작업 당일 기준)
- 기록 항목: 세션 정보 / 결정 배경 / 건드린 파일 목록 / 제거·추가·수정 상세 / 판정 / 다음 작업 / 회고
- 템플릿: `sessions/session-template.md` 참고

---

## 상세 규칙 참조

- 파일별 책임 경계 → `rules/file-ownership.md`
- 패널 역할 계약 → `rules/panel-contracts.md`
- 절대 금지 목록 → `rules/forbidden.md`
