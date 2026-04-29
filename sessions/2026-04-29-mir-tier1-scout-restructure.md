# Mir-Tier 1 핵심영역 선언 + Scout Routine 재편 — 2026-04-29

## 세션 정보
- 호출: 미르 — "내 앞으로의 핵심영역을 - 핵심 영역: 만성통증·완화의료·재택의료·POCUS 중재 라고 규정해보고, 다음과 같이 scout 검색 메커니즘을 재편해볼까?"
- 역할: Plan + Builder
- 브랜치: claude/flamboyant-cartwright-d9e5d0
- Plan 파일: `~/.claude/plans/whimsical-prancing-elephant.md`

---

## 결정 배경

### 미르 핵심영역 선언 (2026-04-29 최초 공식 선언)

**Tier 1 (7영역)**: POCUS·초음파 중재 / 비암성 만성통증·근골격 / 암성통증·완화의료 / 재택의료·노인의학 / 만성질환 본체 확장 / 임상약물학·Deprescribing / 생활습관의학

**부속 횡단 모듈 (Tier 1과 동급)**: A. 통증·완화·노인 정신건강 / B. Communication & Counseling / C. Diagnostic Reasoning

### 검증 데이터

4-22~29 8회 scout 41⭐ 분석 결과 미르 새 Tier 1 영역의 knowledge 공백:
- POCUS 0건 (heart-failure 부수적만), 완화 0건, 재택 0건, 만성통증 0건 (low-back-pain은 PT vs CBT 중심), Communication 0건, Diagnostic Reasoning 0건, Deprescribing 3건, frailty 0건

### 미르 결정 (4개 항목, AskUserQuestion)
1. 분배: **하이브리드** (Mir-T1 7영역 매일 의무 + 부속 3일 cycle + Tier 2 8일 cycle)
2. 귀납 키워드: **영역 내부 세부 추출**로 변환 (영역 cap 폐기)
3. scope.md: **부분 추가 + legacy 보존**
4. 30일 PMID 차단: **자동 완화 + 사유 기록**

---

## 건드린 파일

### 신규
- `~/.claude/projects/C--Users-sk-Desktop------Claude-chartji-dev/memory/user_clinical_focus.md` (신규 — 핵심영역 source of truth)
- `~/.claude/plans/whimsical-prancing-elephant.md` (Plan mode 산출물)

### 수정
- `~/.claude/projects/.../memory/MEMORY.md` — 인덱스에 1줄 추가
- `knowledge/scope.md` — Mir-Tier 1 섹션 신설 + Tier 2 재편 + 0순위 풀 매핑 + legacy DEPRECATED 처리. `updated: 2026-04-29` frontmatter
- `routines/scout.md` — Step 1 전면 재편 (1-A 영역 내부 세부 추출 / 1-B Mir-T1 7영역 매일 슬롯 / 1-C 횡단 3일 cycle / 1-D Tier 2 8일 cycle), Step 2 (3-Tier 폐기 → 영역 매핑 검색), Step 2-B (7일→30일 + fallback 14→7일 자동 완화), Step 6 (Mir-T1 cover footer)
- `CLAUDE.md` — 상세 규칙 참조 끝에 임상 핵심영역 cross-link 1줄

---

## 핵심 변경 명세

### 메모리 (`user_clinical_focus.md`)
type=user 메모리. Mir-Tier 1 7영역 + 부속 3모듈 정의 + 적용 가이드 + Last review 날짜. MEMORY.md 인덱스 등록.

### `knowledge/scope.md`
- 상단에 **Mir-Tier 1** 섹션 신설 (7영역 × {정의·세부 키워드·Anchor 저널 매핑} 표)
- **부속 횡단 모듈** A·B·C 표
- **Tier 2** 재편 (8일 cycle 라운드로빈 — 호흡기·소화기·이비인후·내분비외·비뇨/부인·예방접종/검진·외래응급·심혈관/신경)
- **기존 0순위 풀 → Mir 매핑** 표 (피부→Tier 2, 두통→부속 A+Tier 2, 갱년기→Tier 2, 불면→Mir-T1 7+부속 A)
- 기존 Tier 1·2·3 정의는 **DEPRECATED 표시 후 보존** (4-22~29 41⭐ 라벨 호환)
- 4-29 patch 0순위/보강 풀도 DEPRECATED 표시 후 보존

### `routines/scout.md`
- **Step 1-A** (영역 내부 세부 키워드 추출): log.md 30개 → Mir-T1 7영역 빈도 TOP 1 키워드 추출. 영역간 cap 폐기.
- **Step 1-B** (Mir-Tier 1 슬롯 7건 의무): POCUS·통증·완화·재택·만성질환·약물·생활습관 각 1슬롯. 발행 부족 시 1-D Tier 2로 fallback + footer 기록.
- **Step 1-C** (횡단 3일 cycle): day%3==0 A · ==1 B · ==2 C. 1슬롯.
- **Step 1-D** (Tier 2 8일 cycle): Day%8 매핑 (호흡기·소화기·이비인후·내분비외·비뇨/부인·예방접종/검진·외래응급·심혈관/신경). 직전 7일 회피. 1슬롯.
- **합계 9건** (7+1+1) — ⭐ 8~10 목표 안전 범위
- **Step 2**: 3-Tier(Anchor/귀납/랜덤) 구조 폐기 → 슬롯별 Anchor 저널 매핑. 검색 쿼리 `"{저널명}"[Journal] AND ({1-A OR default}) 2025[dp]:2026[dp]`. 매일 평균 7저널.
- **Step 2-B**: 차단 7일 → **30일**. 직전 2회 8건 미달 시 14일로 자동 완화, 그래도 미달이면 7일로. 8건 회복 시 자동 30일 복귀. footer 기록.
- **Step 6 footer 양식**: Mir-T1 cover 7영역 ✓/✕ + 횡단 모듈 [A/B/C] + Tier 2 [{영역}] + PMID 차단 N건 (기간) + 발행 부족 영역.

### `CLAUDE.md`
"상세 규칙 참조" 끝에 1줄 추가: 임상 핵심영역 cross-link (메모리·scope.md Mir-Tier 1).

---

## 흡수된 기존 메커니즘 (4-29 patch)

기존 4-29 patch (영역 cap·라운드로빈 0순위 풀·PMID 7일 차단)는 본 재편으로 흡수:
- 영역 cap → Mir-T1 슬롯이 자동 분배 (cap 불필요)
- 0순위 풀 4영역 → Mir-T1 흡수 매핑 표로 전환
- PMID 7일 → 30일 + 자동 완화
- 4-29 patch 정의는 scope.md·scout.md에 DEPRECATED 표시 후 기록 보존

---

## 판정

**Builder 단계 완료.** 다음 cron(2026-04-30 06:00 KST)부터 신 routine 작동.

QA: 1주일 운용 (D-1~7) 후 5-6 재검증.
- 양적: ⭐ 8~10건 하한 유지율 ≥80%
- 질적: 7일 누적 Mir-T1 7영역 각 ≥5건 (POCUS·재택 같은 발행 부족 영역은 fallback 기록 빈도 <70%)
- 횡단: 7일 내 A·B·C 모두 ≥1회
- Tier 2: 8영역 모두 1회 cover
- PMID 차단: footer 기록 ≥0, fallback 14일 발동 ≤1회
- Deep extract 호환: [o]→[⏳]→[✓] 흐름 무사고

---

## 다음 작업

- D-7 (5-6) 재검증 보고서 작성 → plan v3 결정 (legacy Tier 1·2·3 삭제 여부 / 차단 기간 영구 조정 / 횡단 모듈 추가 여부)
- `knowledge/MAP.md` 갱신 (4-29 ingest 22건 + Mir-Tier 1 라벨 dual-label) — 별 plan으로 분리
- 새 영역(POCUS·완화·재택·만성통증·진단추론) knowledge base seeding (별 작업)

---

## 회고

### 잘된 점
- Plan mode 활용으로 7개 충돌점(귀납 운명·0순위 풀 흡수·분배 방식·30일 차단·scope 처리·메모리 위치·knowledge 보충 분리)을 사전 식별하고 4개 핵심을 미르 결정으로 받음
- 메모리·scope·scout·CLAUDE 4축에 핵심영역을 일관 반영 (cross-link로 source of truth 명시)
- legacy 보존으로 4-22~29 누적 41⭐ 라벨링 호환성 유지 — 5-6 재검증 후 삭제 여부 재결정
- commit 단위 분리 가능 (변경 4파일이 독립적이라 부분 롤백 가능)

### 주의점
- POCUS·재택 영역의 anchor 저널(J Ultrasound Med·J Am Geriatr Soc·Drugs & Aging)은 발행 빈도가 AFP보다 낮아 매일 1건 의무가 부담일 수 있음 → fallback Tier 2 자동 이전이 자주 발동될 가능성. 5-6 재검증 시 영역 통합·재정의 필요 여부 판단.
- Mir-Tier 1과 legacy Tier 양분으로 scope.md 길어짐 (200줄 이상) — 5-6 재검증 후 legacy 삭제로 정리 권고.
- 메모리는 user 타입으로 type 필드 설정 — 다른 프로젝트에서도 cross-load되는 자산. chartji 외 의료 프로젝트 추가 시 자동 적용.

### 메모리 후보 (이미 저장됨)
- 미르 핵심영역 7+3은 user_clinical_focus.md에 영구 기록 — 다음 모든 세션에서 자동 cross-load 가능.
