# rules/data-flow.md — B2 데이터 흐름 매트릭스

tags: [META]
updated: 2026-04-19
schema: B2

> **⚠ 주의**: 본 문서는 Phase 1~2까지 확정된 내용 기반 **의도된 매트릭스**다.
> 실제 runtime 동작 검증은 Phase 3(`src/knowledge-bundle.js` · `src/app.js` · `src/prompts.js`) 구현 완료 후.
> Phase 2 시점에는 Liby ingest · Auditor · Architect의 rule level 앵커 역할만 수행한다.

---

## 목적

B2 스키마의 `sections` 딕셔너리 key가 어느 UI surface에 primary로 노출되는지 rule level에서 고정한다.
- 매트릭스 위반 변경은 Architect가 즉시 STOP 판정의 근거로 사용
- 문서 간 산재되어 있던 경계 규칙을 1곳으로 수렴 (유지보수 간소화)
- Phase 3 runtime 구현자의 단일 참조점

---

## 1. UI Surface × Section 매트릭스

### 원칙 — 한 섹션 → 한 primary UI

중복 노출은 인지부하 증가 및 유지보수 비용 원인이다. 매트릭스에서 **primary ✓는 row당 1개**가 기본.
RedFlag 열은 **전 row에서 ✗**로 고정 (§2 참조).

### 매트릭스

| Section key | Liby 힌트 (hint) | Guide Tab (guide) | Working Draft append (draftAppend) | RedFlag |
|---|---|---|---|---|
| `definition` | | ✓ | | ✗ 절대 금지 |
| `classification` | | ✓ | | ✗ 절대 금지 |
| `exam` | | ✓ (disease) | | ✗ 절대 금지 |
| `protocol` | ✓ (disease primary) | | | ✗ 절대 금지 |
| `dosing` | ✓ (drug primary) | | | ✗ 절대 금지 |
| `schedule` | ✓ (drug primary) | | | ✗ 절대 금지 |
| `indication` | ✓ (drug primary) | | | ✗ 절대 금지 |
| `monitoring` | | ✓ (disease) | | ✗ 절대 금지 |
| `contraindication` | | ✓ (disease/drug) | | ✗ 절대 금지 |
| `precaution` | | ✓ (drug) | | ✗ 절대 금지 |
| `pregnancy` | | ✓ (disease) | | ✗ 절대 금지 |
| `differential` | | ✓ (disease) | | ✗ 절대 금지 |
| `referral` | | ✓ (disease) | | ✗ 절대 금지 |
| `insurance` | | ✓ (drug) | | ✗ 절대 금지 |
| `comparison` | | ✓ (drug) | | ✗ 절대 금지 |
| `notes` | | ✓ (설명용) | | ✗ 절대 금지 |
| `draft-append` | | | ✓ (disease primary) | ✗ 절대 금지 |
| `draft-template` | (uiHooks 라우팅 **보류** — Phase 3 재논의) | | | ✗ 절대 금지 |
| 자유 섹션 | kind별 기본값 보충 | kind별 기본값 보충 | — | ✗ 절대 금지 |

### uiHooks 기본값 앵커
`knowledge/section-vocabulary.md`의 uiHooks 기본값(disease/drug/topic)이 이 매트릭스의 primary 매핑을 자동 적용한다. 엔트리는 uiHooks를 부분 오버라이드할 수 있으나 **RedFlag 열에는 ✓ 지정 불가**.

### primary 겹침
한 섹션이 2개 이상 primary ✓를 동시에 갖는 변경은 Architect가 즉시 STOP 판정한다 (`agents/architect.md` 규칙).

---

## 2. RedFlag 격리 원칙 (RULE LEVEL)

**RedFlag 패널에는 어떤 형태로도 knowledge inject를 금지한다.**

### 사유
- RedFlag는 transcript-only 원칙 (환자·의사 발화 외 근거 금지)
- knowledge 기반 알림은 false positive 유발 → 의사 판단 왜곡
- 2026-04-18 "Liby 힌트 vs Guide tab 역할 중복" 사고의 재발 방지

### 적용 지점 (Phase 3 runtime 구현 시 필수 반영)
- `src/app.js` uiHooks 경로 구현 시 RedFlag 패널은 **대상 제외 목록**
- `src/components/panels.js` `RedFlagPanel`은 knowledge 주입 props 수신 금지 (`rules/panel-contracts.md` 재확인)
- `agents/librarian.md` inject 트리거 조건에서 RedFlag 분기 차단

### 상위 문서 간 연결
- `rules/forbidden.md` UI 출력 §: "RedFlag에 followUpCtx 주입 금지"
- `rules/panel-contracts.md` Red Flag Panel §: "routine reminder, followUpCtx 주입 (transcript-only 절대 원칙)"
- `agents/librarian.md` 절대 금지 §: "RedFlag 패널에 어떤 형태로도 knowledge inject 금지"
→ 본 문서 §2가 **rule level 앵커**. 상위 문서들은 본 섹션을 참조한다.

---

## 3. 데이터 경로 예시 — `urticaria.md`

### Step 1 — md 파일 (Liby ingest 입력)
```markdown
# 두드러기 (Urticaria)
tags: [CLINICAL]
keywords: 두드러기, urticaria, 혈관부종, ...

## 분류 기준
...

## 만성 두드러기 단계별 처방 프로토콜 [CLINICAL]
...

## 모니터링 도구
...

## 임신·수유부 프로토콜 [CLINICAL]
...
```

### Step 2 — Liby ingest 정규화 (`knowledge/section-vocabulary.md` dictionary 참조)
- `분류 기준` → `classification`
- `만성 두드러기 단계별 처방 프로토콜` → `protocol`
- `모니터링 도구` → `monitoring`
- `임신·수유부 프로토콜` → `pregnancy`
- `NOT Recommended (가이드라인 명시)` → 자유 섹션 `not-recommended`

### Step 3 — bundle v2 포맷 (Phase 3 runtime 활성화 후 컴파일)
```jsonc
{
  "urticaria": {
    "kind": "disease",
    "keywords": ["두드러기","urticaria","혈관부종", ...],
    "primarySources": ["EAACI 2021 (PMID:34536239, DOI:10.1111/all.15090)"],
    "sections": {
      "classification":   { "content": "...", "sources": [] },
      "protocol":         { "content": "...", "sources": [] },
      "monitoring":       { "content": "...", "sources": [] },
      "pregnancy":        { "content": "...", "sources": [] },
      "not-recommended":  { "content": "...", "sources": [] }
    },
    "uiHooks": { /* 기본값 상속 (section-vocabulary.md) */ }
  }
}
```

### Step 4 — UI 라우팅 (Phase 3 `src/app.js` uiHooks 경로)
- `uiHooks.hint = ["protocol"]` → Liby 힌트에 `protocol` 섹션 노출
- `uiHooks.guide = ["classification","exam","monitoring","contraindication","pregnancy","referral","differential"]` → Guide tab 큐레이션
- `uiHooks.draftAppend = ["draft-append"]` → 엔트리에 draft-append 섹션 있을 때만 Working Draft 하단 append
- **RedFlag는 대상 아님** (§2 원칙)

---

## 4. Architect / Designer 계약

### Architect 책임
- 변경이 매트릭스 primary 셀을 수정하나? → STOP, 미르 확인 후 진행
- 변경이 본 문서를 건드리나? → Designer 제약에 "data-flow.md 업데이트 포함" 부여
- RedFlag 열에 ✓ 추가가 섞였나? → **즉시 STOP** (본문 §2 위반)
- 새 section key 도입이 있나? → `section-vocabulary.md` 업데이트 동반 여부 확인

### Designer 책임
- Architect 제약을 설계서 최상단에 전사
- primary 셀 변경이 필요한 설계이면 **본 문서 업데이트를 설계서 산출물에 포함**
- uiHooks 기본값(`section-vocabulary.md`) 변경이 필요하면 본 문서 매트릭스와 **동시에** 업데이트

### Builder 책임
- 설계서 외 primary 셀 · RedFlag 매트릭스 셀 수정 금지
- 설계서에 명시 안 된 새 section key 도입 금지 (새 키는 Architect 경로로)

---

## 5. PR 준수 체크리스트

- [ ] 본 PR의 변경이 primary 셀을 수정하나? 수정 시 이유를 PR 설명에 명시
- [ ] 본 PR이 RedFlag 열에 ✓를 추가하나? **추가 불가 — 변경 즉시 Reject**
- [ ] 본 PR이 새 section key를 도입하나? `section-vocabulary.md` 동시 업데이트 여부 확인
- [ ] uiHooks 기본값 변경이 포함되면 본 문서 매트릭스 동시 갱신 여부 확인

---

## 참조

- 스키마 설계서: `sessions/2026-04-18-b2-schema-design.md`
- 섹션 표준: `knowledge/section-vocabulary.md`
- 출처 규칙: `knowledge/sourcing-rules.md`
- 패널 역할: `rules/panel-contracts.md`
- 파일 경계: `rules/file-ownership.md`
- Architect agent: `agents/architect.md`
- Librarian agent: `agents/librarian.md`
