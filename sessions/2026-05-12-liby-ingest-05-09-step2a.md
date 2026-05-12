# sessions/2026-05-12-liby-ingest-05-09-step2a.md

## 세션 정보
- 날짜: 2026-05-12
- 작업: Liby ingest 2026-05-09 step2a — 업데이트 4건 bundle 반영
- 건드린 파일: src/knowledge-bundle.js / skills/gaps-process/SKILL.md / sessions/

---

## 결정 배경
- step1 (`1d0045a`) commit 메시지 "업데이트 9건 다음 세션" → step2 본업
- 9건 한 batch는 SKILL 체크리스트 부담 + 검증 리스크 큼 → 미르 결정: step2a 4건 + step2b 5건 분할
- step2a 대상: 단순 추가 4건 (tinnitus·smoking-cessation·anticholinergic-burden·delayed-diagnosis)
- step2b 대상: 다음 세션 — pocus·acp·sglt2·osteoporosis (5건, drug·guidelines·복합 섹션)

## 본 세션의 실수 (회고 사유)
- 진입 시 브랜치 이름 `claude/improve-apn-diagnosis-L2f0M`만 보고 `inbox/gaps.md`의 APN 3건을 Researcher에게 자율 위임 시작
- 미르 지적: "gaps는 Scout 루틴 대상 — 여기서 작업하는 게 맞아?"
- 정상 흐름: Scout 루틴 → inbox/scout/ → Deep Extract → knowledge/*.md → (미르 호출) Liby ingest. gaps-process는 Scout 영역.
- Researcher 산출물 폐기, `skills/gaps-process/SKILL.md`에 수동 호출·자율 발동 금지 명문화

## 반영 내역 — bundle.js 4 entry

| entry | 추가 섹션·내용 | PMID |
|---|---|---|
| tinnitus | protocol 섹션에 VA/DoD 이명 관리 가이드라인 AFP 요약 append (음향치료·CBT·TRT) | 41839118 |
| smoking-cessation | comparison 섹션에 니코틴 전자담배 AFP 2025 리뷰 append + definition 보강 | 41118192 |
| anticholinergic-burden | notes 섹션 신설 — AD 다약제 인지저하 1.68배, ACB≥3 OR 2.5 | 42001284 |
| delayed-diagnosis | protocol 섹션에 Pattern Disruption 교육 개입 append + primarySources 추가 | 41968680 |

모두 primarySources에 신규 PMID 추가. sources[] 빈 배열 유지 — primarySources Tier 1 상속으로 처리 (sourcing-rules 5-B 예외 4번).

## 추가 작업
- `skills/gaps-process/SKILL.md` 상단에 "수동 호출·자율 발동 금지" 블록 추가 (2026-05-12 본 세션 실수 명문화)

## 검증
- `node -e "..."` parse 통과
- KNOWLEDGE_BUNDLE 총 608 keys 유지 (신규 키 0건, sections만 확장)
- 4 entry sections 정상 확장 확인:
  - tinnitus: exam · protocol · referral · notes
  - smoking-cessation: definition · comparison · protocol · notes
  - anticholinergic-burden: monitoring · classification · protocol · precaution · referral · notes
  - delayed-diagnosis: notes · protocol · precaution
- 키 중복 hard-check: 4 entry 모두 1회 할당 (덮어쓰기 없음)

## 판정
- 통과

## 다음 작업
- **step2b** (다음 세션): 5건 — pocus-primary-care-efsumb · goals-of-care-acp (2 entries) · sglt2-inhibitors · osteoporosis
- **step3+** (그 다음): 5/10·5/11·5/12 deep-extract 산출물
- **hook 보강**: PR #42 머지 후 별도 — bundle commit *이전*에 미반영이었던 entry는 잡지 못하는 결함 수정

## 회고
- 예상과 달랐던 점: 브랜치 이름이 의도를 명시한다고 단정한 게 실수. 브랜치명 ≠ 작업 의도 (특히 worktree 자동 부여 이름)
- 다음 세션 반영: SKILL 명시로 gaps-process 자율 호출은 차단. 브랜치명 단정 패턴은 일반적 — 다른 SKILL에도 유사 가드 필요 여부 점검 권유 (skill-process 자체 발동 보호)
