# skills/gaps-process/SKILL.md — Gaps Process

> **목적**: `inbox/gaps.md` 본문의 지식 격차 항목을 scout 처리(Researcher 문헌 검색·요약)하고 Archive로 이동한다.
> **호출**: 미르가 "gaps 처리" 또는 "gaps scout" 호출 시. Liby가 실행 주체 (`agents/librarian.md` gaps.md 처리 규칙 § 참조).

## 입력
없음. `inbox/gaps.md` 본문을 직접 읽는다. 옵션 인자:
- `mode=daily` (기본) — 1건 처리 (FIFO + 의미적 카테고리 묶음 시 함께)
- `mode=burst` — 10건 일괄 (본문 카운트 >10일 때 자동 권장)
- `mode=item:<카테고리 prefix>` — 특정 항목 지정 (예: `item:IDA`)

## 절차

### 1. 본문 카운트 점검
`inbox/gaps.md`의 본문 항목 수를 카운트 (Archive 섹션 제외).
- 카운트 ≤ 10 → daily 모드 진행
- 카운트 > 10 → **자동 burst 모드 전환**. 미르에게 즉시 보고: "현재 N건, burst 10건 처리 시작."

### 2. 선별 (FIFO + 의미적 카테고리 묶음)
본문 위에서부터(오래된 순) 처리 대상 선택:
- **daily**: 1번째 항목 + 의미적으로 묶을 수 있는 인접 항목 (LLM 판단)
  - 예: `[IDA 진단]`·`[폐경 전 여성 IDA]`·`[Iron 보충 패러다임]` → IDA 도메인 묶음
  - prefix 동일 필수 아님 — 임상 도메인 일치가 기준
- **burst**: 위 10건. 의미 묶음으로 그룹화해 검색 효율↑.

### 3. Scope 분리 확인 (필수 게이트)
선별된 항목이 **진료 습관·기록·시스템·윤리** 영역인지 판별:
- 신체검진·차팅·follow-up 시스템·진단명 윤리·약물력 청취 routine 등 → `inbox/blind-spots.md`로 이동 제안.
- 미르 확인 후 이동 (Liby가 임의 이동 금지). 이동된 항목은 gaps-process 대상 제외.
- 명백한 지식 격차(약물학·algorithm·진단 기준·근거 등)만 다음 step 진행.

판별 기준:
- "왜·어떻게·언제" 지식 → gaps 처리 대상 ✓
- "기록·routine·시스템·태도" → blind-spots 이동 대상

### 4. Researcher 위임
선별된 카테고리(또는 묶음)마다 Researcher 호출 (`agents/researcher.md`):
- **입력**: 카테고리 요약 + 핵심 키워드 + 임상 적용 context
- **출력 요청**: PMID·저널·연도·핵심 결론·임상 적용 가능성·한계
- 묶음일 경우 항목별 검색 또는 통합 검색은 Researcher 재량

### 5. 결과 합성
Researcher 결과를 다음 형식으로 정리:

```markdown
## [카테고리] 한 줄 요약

- **저널:** {journal} {year} | **PMID:** [{pmid}](https://pubmed.ncbi.nlm.nih.gov/{pmid}/)
- **한 줄:** {핵심 결론 1-2문장}
- **왜 유용:** {외래 적용 시나리오·임상적 의미·한계}
- **knowledge-ingest 후보:** [✓ / —]
```

`knowledge-ingest 후보` 마킹 기준:
- ✓ — `knowledge/by-disease`·`by-drug`·`guidelines` entry로 가치 있음 (재사용성·임상 의사결정 영향)
- — — 일회성 정보, ingest 불필요

### 6. 산출물 저장
`inbox/scout/{YYYY-MM-DD}-gap-{slug}.md` 생성:
- `{slug}`: 카테고리 또는 묶음 도메인 (예: `ida`, `respiratory-vital`, `ida-cluster`)
- 같은 날 여러 슬러그 처리 시 각각 파일 생성

> ⚠ **GOTCHA**: 기존 `inbox/scout/{YYYY-MM-DD}.md` (Scout 루틴 자동 산출물)에 append 금지. 충돌·overwrite 위험. 항상 `-gap-` 접미 파일로 분리.

### 7. Archive 이동
`inbox/gaps.md` 처리:
1. 본문에서 처리된 항목 라인 제거
2. Archive 섹션 끝에 다음 형식으로 추가:
   ```
   - [카테고리] 요약 (→ PMID xxxxxx, YYYY-MM-DD)
   ```
3. 묶음 처리 시 항목별로 개별 라인 추가 (PMID 공유 가능)

### 8. knowledge-ingest 분기 (미르 승인 필요)
Step 5에서 ✓ 마킹된 항목은 미르에게 명시 보고:
- "다음 N건이 knowledge-ingest 후보입니다. ingest 진행할까요?"
- 미르 승인 후에만 `skills/knowledge-ingest/SKILL.md` 위임. **임의 ingest 절대 금지** (현행 Liby ingest 규칙과 동일 — 미르 호출 시에만 실행).

### 9. 미르 보고
처리 완료 후 다음 정보 보고:
- 처리 건수 (daily 1 / burst 10)
- 처리된 카테고리 리스트
- Scope 분리(blind-spots 이동) 항목
- knowledge-ingest 후보 건수
- 산출물 파일 경로

## 예외 처리
- 본문이 비어있음 → "처리할 gap 없음" 보고 후 종료
- Researcher가 적절한 근거 못 찾음 → 해당 항목 본문에 잔류, `[검증 실패: YYYY-MM-DD]` 인라인 태그 추가
- 미르가 묶음을 분리 처리 요청 → 묶음 해제하고 개별 처리
- 동일 항목 재처리 요청 → Archive에서 본문으로 복귀 후 재실행

## 절대 금지
- `inbox/gaps.md`에서 항목을 본문에서 삭제만 하고 Archive 미이동 → 처리 이력 손실
- 임의 knowledge-ingest (Step 8 우회) → 미르 통제권 침해
- blind-spots 영역 항목을 강제로 scout 처리 → 부적합한 PMID 끌어오기, 노이즈 누적
