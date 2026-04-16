# skills/sync-check/SKILL.md — Knowledge 동기화 검증

QA 단계에서 knowledge·bundle·triage 관련 변경이 있을 때 실행하는 결정론적 검증.

## 언제 실행하는가

QA가 Builder 결과를 받을 때, 변경 파일 목록에 다음 중 하나라도 포함되면 실행:
- `knowledge/**/*.md` (신규 또는 수정)
- `src/knowledge-bundle.js`
- `src/prompts.js` (calcCategories 영역)

그 외 변경(UI, 스타일, 문서 등)에는 실행하지 않는다.

## 검증 항목

### ① Knowledge 파일 ↔ Bundle 매핑

`knowledge/by-disease/*.md` 파일마다 frontmatter의 `keywords:` 라인을 추출 → 각 키워드가 `KNOWLEDGE_BUNDLE`의 키에 하나라도 존재하는가 확인.

기준: **질환 파일마다 최소 1개의 키워드가 bundle에 있어야 한다.** 모든 alias가 반드시 bundle에 있을 필요는 없음 (app.js는 calcCategories로 직접 조회하므로 대표 키 존재만 중요).

부재 시: `[FAIL] knowledge/by-disease/X.md의 keywords 전부가 bundle에 없음`

### ② Bundle 키 ↔ Triage calcCategories 매핑

`KNOWLEDGE_BUNDLE`의 대표 키(영문 기본형 또는 한글 기본형 하나씩)가 `src/prompts.js`의 `TRIAGE_PROMPT` calcCategories 목록에 존재하는가 확인.

기준: **각 질환/약물당 최소 1개의 대표 키가 triage에 있어야 한다.** alias 전부 일치는 불필요.

- 예시 OK: bundle에 `wegovy`, `위고비`, `semaglutide` 세 키 존재 + triage에 `위고비` 하나만 존재 → 통과
- 예시 FAIL: bundle에 `dysphonia`, `쉰목소리` 두 키 존재 + triage에 둘 다 없음 → 실패

부재 시: `[FAIL] bundle의 질환군 X (대표키 Y)가 triage calcCategories에 없음`

### ③ Bundle 엔트리 필수 필드

각 bundle 엔트리에서 `treatment` 또는 `exam` 중 최소 하나는 non-null이어야 한다. 두 필드 모두 null인 엔트리는 "빈 껍데기"이므로 실패 처리.

부재 시: `[FAIL] bundle["X"]에 treatment와 exam 둘 다 null`

## 출력 형식

```
[SYNC CHECK] PASS
  - knowledge↔bundle:  OK (N개 파일 확인)
  - bundle↔triage:     OK (M개 대표 키 확인)
  - 필수 필드:          OK (K개 엔트리 확인)
```

또는

```
[SYNC CHECK] FAIL (N건)
  - [FAIL] ...
  - [FAIL] ...
```

FAIL이 있으면 QA는 Builder에 반환한다.

## 실행 방법

Grep 도구로 세 항목을 순차 확인한다. 빌드 파이프라인이나 독립 스크립트 파일 생성 금지 (forbidden.md 준수).

### 권장 절차

1. `Glob knowledge/by-disease/*.md` → 파일 목록
2. 각 파일 `Read` → frontmatter `keywords:` 추출
3. `Grep` 으로 `src/knowledge-bundle.js` 에서 각 keyword 일치 확인
4. `Read` `src/knowledge-bundle.js` → 모든 최상위 키 목록 추출
5. `Grep` 으로 `src/prompts.js` TRIAGE_PROMPT calcCategories 확인
6. `Read` bundle 엔트리마다 treatment/exam 존재 확인

## 세션 로그 반영

결과 한 줄을 `sessions/YYYY-MM-DD-*.md`의 "판정" 섹션에 기록:

```
Sync Check: PASS
```

또는

```
Sync Check: FAIL (3건) — 상세: ...
```

## 주의

- 이 스킬은 **내용의 정확성**이 아니라 **동기화 구조**만 검증한다.
- "이 exam 항목이 임상적으로 맞는가?"는 여기서 다루지 않는다 (Researcher 서브에이전트 역할).
- alias 관용적으로 허용. 엄격하게 판정하면 수많은 한글/영문/상품명 조합을 전부 triage에 강제하게 되어 과잉 실패 발생.
