# reports/2026-04-22-boss-review-request-knowledge-ddx.md — Boss 검토 요청서

- 날짜: 2026-04-22
- 제출: 미르 → Boss
- 범위: 2026-04-22 세션 3개 보고서에서 Claude가 **권고한 항목만** 추림
- Boss 과업: 각 권고에 대해 CMO·CLO·CFO·CVO 4관점 PASS / CONCERN / STOP 판정

> 배경·옵션 비교·위험 분석은 원 보고서에 이미 수행됨. 본 요청서는 **권고 자체의 채택 여부**만 묻는다. 중복 검토 방지.

---

## 권고 7개

### R1. Knowledge 스키마 메타필드 4개 예약 (빈 값 선제 삽입)
44 엔트리 전체에 `version` · `supersedes` · `freshness.primarySourceYear` · `applicability` 4개 필드를 빈 값으로 일괄 추가. 실질 변경 없음. 400 엔트리 시점 소급 방지 목적.

### R2. `relations[]` 필드 도입 (parents 병존, 초기 kind 5종)
허용 kind: `parent` · `coprescribe` · `contraindicate` · `supersede` · `synergy`. parents 6개월 병존 후 자연 퇴장.

### R3. 섹션 dictionary 5개 추가
`prognosis` · `lifestyle` · `complications` · `counseling` · `follow-up-schedule`. 기존 엔트리 손대지 않음. 신규 ingest부터 활용.

### R4. `knowledge/myth-log/` 폴더 신설 + 초기 3건
반박된 가설 아카이브. glp1 GI-AE 미신 · glp1 IR 미신 + 미르 선정 1건.

### R5. DDx UI 재활성화 — 경로 B-1 (Triage Panel 하단)
`panels.js:66-67` 봉인된 `differentialShort` 렌더 블록 복원.

### R6. DDx 재활성화 6개 가드레일 동시 설치
(1) `source:"ingested"` 아닌 항목 렌더 금지
(2) AI 생성 DDx 금지 (현행 prompt 유지)
(3) 숫자·%·확률 표현 0개
(4) Horse ≤3 / Zebra ≤2
(5) 각 항목 ingested 출처 표기 필수
(6) 세션 단위 dismiss 가능

### R7. "내 범위" 의뢰 단서 Triage 하단 1줄 추가 (R5와 동시 처리)
감지된 질환의 `referral.indication` 축약 1줄 노출. B-1 확장 형태.

---

## Boss 출력 포맷

```
[Boss 전략 보고서 — 2026-04-22]

CMO 판정 (환자 안전):
- R1~R7 각각 PASS / CONCERN / STOP

CLO 판정 (법적 리스크):
- R1~R7 각각 PASS / CONCERN / STOP

CFO 판정 (비용·유지보수):
- R1~R7 각각 PASS / CONCERN / STOP

CVO 판정 (제품 가치):
- R1~R7 각각 PASS / CONCERN / STOP

종합 판단:
권고 사항:
- 즉시 채택: [...]
- 조건부 채택: [... + 조건]
- 보류·재검토: [...]
```
