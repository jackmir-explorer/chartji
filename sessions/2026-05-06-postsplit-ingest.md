# 2026-05-06 postsplit-ingest — heart-failure 분할 후속 + AUD 신규

## 세션 정보
- 일자: 2026-05-06
- 브랜치: `claude/add-knowledge-search-6UhtS`
- 호출자: Liby
- 입력: heart-failure 본 엔트리 분할 결과(5건 신규 md) + 기존 5 entry 재컴파일 + alcohol-use-disorder 신규 ingest

## 결정 배경
heart-failure md 본 엔트리(이전 ~250줄+) 토큰 절감을 위해 5개 child md로 분할 — monitoring/gdmt-dosing/pocus-ducs/hfpef-obesity/cardiology-2025-update. 동시 wegovy SMI / mounjaro Tirzepatide 반동 / glp1-selection-strategy 본문 축약 작업 결과를 bundle에 반영. alcohol-use-disorder는 GLP-1 AUD 섹션이 신규 작성되면서 bundle 미등록 상태였던 것을 함께 등록.

## 건드린 파일
- `src/knowledge-bundle.js` (수정)
- `src/knowledge-bundle.js.bak-postsplit-ingest` (백업, 신규)
- `sessions/2026-05-06-postsplit-ingest.md` (신규)
- `/tmp/postsplit-ingest-log.txt` (변환 로그, 임시)

## 변경 상세

### 신규 entry (6, +10 alias)
| key | parents | kind | 주 섹션 |
|---|---|---|---|
| heart-failure-monitoring | [heart-failure] | disease | monitoring |
| heart-failure-gdmt-dosing | [heart-failure] | disease | dosing (5표) |
| heart-failure-pocus-ducs | [heart-failure] | disease | exam (DUCS·VEXUS) |
| heart-failure-hfpef-obesity | [heart-failure] | disease | protocol·notes |
| heart-failure-cardiology-2025-update | [heart-failure] | disease | notes (AF·MI·HCM) |
| alcohol-use-disorder | [] | disease | 13 sections (incl. glp1-aud) |

### 갱신 entry (5)
- **heart-failure**: exam에 Volume Overload(BNP+POCUS) 흡수, dosing/monitoring 섹션 제거(split됨), protocol에 [[heart-failure-gdmt-dosing]] 링크, notes 축약 + sub-entry 링크 보강. uiHooks guide에서 dosing/monitoring 제외.
- **심부전**: monitoring 섹션 제거, draft-append에 [[heart-failure-monitoring]] 링크.
- **wegovy**: sections.smi 신규(Srisurapanont 2026, PMID:41618880), primarySources에 SMI 출처 추가, guide list 갱신.
- **마운자로**: sections.rebound 신규(Huang 2026, PMID:41962807), dosing에 감량속도 비교 추가, primarySources 갱신.
- **mounjaro**: 위와 동일 패턴 (영문 alias key, 별도 객체).

> tirzepatide·zepbound 키는 마운자로/mounjaro와 별도 객체로 존재 — 이번 작업에선 미수정 (범위 외). 후속 동기화 필요 (1줄 todo).

## 검증
- `node -c src/knowledge-bundle.js` → OK
- Total keys: 478 → 494 (+16)
- Wikilinks `[[`: 338 → 385 (+47)
- heart-failure sections: 12 → 10 (dosing/monitoring 제거 확인)
- 6 신규 entry parents·kind·sections 정상

## 5-D / 5-D.1 적용
신규·갱신 본문에 다음 wikilinks 보강:
- 분할된 child entry들로의 cross-link 5종
- [[wegovy]]·[[mounjaro]]·[[obesity]]·[[glp1-selection-strategy]]·[[ozempic]] 등
- [[heart-failure-volume-overload]]·[[heart-failure-referral]] (이미 존재하던 인접 entry)

5-D.1 충돌 해소 사례: 없음 (이번 변경 본문은 토큰 직접 매칭만 사용 — 기존 keywords[1+] 보조 매칭 충돌 없음).

의미상 의심 wikilinks: 없음

## 우려 사항
1. tirzepatide·zepbound entry는 별도 객체로 마운자로/mounjaro와 동일 본문이지만 이번 작업 범위 외 — rebound 섹션 미반영. 후속 단일 작업으로 동기화 권장.
2. heart-failure-cardiology-2025-update의 [[doac-elderly]]·[[post-mi-deprescribing]]·[[internal-medicine-2025-update]] dangling 가능성 — 이미 기존 bundle에 존재하는 키 (확인됨, OK).
3. alcohol-use-disorder의 sections.glp1-aud 자유 섹션 key — section-vocabulary 표준 외이지만 uiHooks.guide에 명시 등재했으므로 노출 보장.

## 다음 작업
- 미르 확인 후 main 머지 / push (위 우려 1번 동기화 작업과 묶어 처리 가능)
- Auditor 정기 감사로 dangling wikilinks 재확인

## 회고
- 분할로 heart-failure 본 entry는 이제 시각적으로도 일차의료 핵심(definition·classification·exam·protocol·schedule·referral·comparison·notes)에 집중. dosing 표·monitoring 항목·POCUS 술기·HFpEF 체중감량 등 부속 주제는 child entry로 격리.
- mounjaro/마운자로 객체 분리(영문/한글 alias가 객체 공유 아닌 별도 정의)는 향후 기술 부채. tirzepatide·zepbound도 동일.
