# Session: 2026-05-12 거대 파일 분할 (palliative-pain·deprescribing)

## 세션 정보
- 날짜: 2026-05-12
- 작업: audit 후속 4순위 — 거대 md 파일 분할
- 권한: R2 (auditor)
- 미르 결단: (A) 적극 분할 — 2 파일 분리

## 결정 배경
- audit 2026-05-12 보고서 4순위 — 거대 파일 분할 후보
  - palliative-pain.md 231줄/12섹션 (OINV·BH 자유 섹션 다수)
  - deprescribing.md 249줄/11섹션 (T2DM·치매 항우울제·정신과 낙상 이질적)
- 미르 결단 (A) 옵션 채택 → 2개 원본 파일에서 응집성 낮은 응용 영역 분리
- 검색 정확도·LLM inject 신호 향상 + 미래 deep-extract 확장 여유 확보

## 건드린 파일 목록

### 신규 (5)
- knowledge/by-disease/cancer-pain-supportive-care.md (90줄)
- knowledge/by-disease/diabetes-deprescribing-lifestyle.md (75줄)
- knowledge/by-disease/elderly-psychotropic-deprescribing.md (96줄)
- sessions/2026-05-12-split-palliative-deprescribing.md (본 파일)

### 수정 (2)
- knowledge/by-disease/palliative-pain.md (231→174줄, -57)
  - 제거: oinv_prophylaxis · behavioral_health 2 섹션
  - 추가: cross-link `[[cancer-pain-supportive-care]]`, relations 업데이트
- knowledge/guidelines/deprescribing.md (249→164줄, -85)
  - 제거: T2DM 감약 · 치매 항우울제 · 정신과 약물 낙상 3 섹션
  - 추가: cross-link 2건, relations 업데이트, 분할 안내 footer

### bundle (1)
- src/knowledge-bundle.js
  - palliative-pain entry: sections 12→11 (OINV·BH 제거 + related_supportive 추가), primarySources 6→4 (Satomi·Kao 제거)
  - deprescribing entry: sections 7→5 (3 분리 + related_split 추가), primarySources 6→3 (Jacob·Liang·Yin 제거)
  - 신규 entry 3개 + 키 별칭:
    - `cancer-pain-supportive-care` + `OINV` + `olanzapine-OINV`
    - `diabetes-deprescribing-lifestyle` + `T2DM-deprescribing` + `T2DM감약`
    - `elderly-psychotropic-deprescribing` + `psychotropic-deprescribing` + `치매-항우울제-감약`
  - 총 키: 638 → **647** (+9)

## 분할 매핑

| 원본 섹션 | 신규 entry | 출처 |
|---|---|---|
| palliative-pain.oinv_prophylaxis | cancer-pain-supportive-care.oinv_prophylaxis | Satomi 2026 PMID:42103083 |
| palliative-pain.behavioral_health | cancer-pain-supportive-care.behavioral_health | Kao 2026 PMID:42105883 |
| deprescribing.t2dm_lifestyle | diabetes-deprescribing-lifestyle.notes | Jacob 2026 PMID:41976866 |
| deprescribing.dementia_antidepressant | elderly-psychotropic-deprescribing.dementia_antidepressant | Liang 2026 PMID:42089534 |
| deprescribing.psychotropic_falls | elderly-psychotropic-deprescribing.psychotropic_falls | Yin 2026 PMID:41791728 |

## 판정
- node --check 통과
- bundle parse OK, 647 keys 확인
- 신규 3 entry kind=topic, sections 5~6개씩
- 원본 2 entry primarySources 정확히 분리 (총 손실 0)
- cross-link [[cancer-pain-supportive-care]] · [[diabetes-deprescribing-lifestyle]] · [[elderly-psychotropic-deprescribing]] 5 파일 모두 양방향

## 다음 작업
- audit 후속 backlog 정리 끝 (1·2·3·5·4 순위 모두 완료)
- 다음 audit cycle: cron Liby ingest backlog 점검
- vaccination 본 entry kind=disease 잔존 — 별도 patch 검토

## 회고
- 거대 파일 분할은 R2 권한 정당 사례 — 합본보다 응집성·검색성 우수
- 분할 시 sources·primarySources 분배 + cross-link 양방향 + 키 별칭 추가가 필수 3축
- bundle.js Edit 중 related_split 객체 닫는 `}` 누락 1건 발견 → 즉시 수정 (sources: [] 추가)
- 미르 결단 (A) 옵션 description이 정확히 분할 방향 지정 → 의사결정 비용 최소화
