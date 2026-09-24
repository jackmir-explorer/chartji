# sessions/2026-09-24-reading-moral-injury-burnout.md

## 세션 정보
- 날짜: 2026-09-24
- 작업: 의료진 소진 vs 도덕적 손상 개념 → reading lane 통합 (미르 raw 텍스트)
- 건드린 파일: `knowledge/reading/moral-injury-burnout.md` (신규) · `knowledge/reading/README.md` (입주목록) · `knowledge/log.md`

---
## 결정 배경
- 미르: "이 내용을 library에 통합해라" (특정 내용 1건 — `liby ingest` 4작업 호출 아님).
- **lane 판단**: 진료 알고리즘이 아니라 **의료진 본인의 직업적 고통을 이해하는 개념틀** → 2026-09-20 신설한 reading lane(관심 아티클, bundle 밖)에 정확히 부합. hikikomori와 동일 처리. (clinical-experience-quality처럼 bundle topic으로 넣을 수도 있으나, 진료 point-of-care 유틸리티가 사실상 0이고 "개념 정리" 성격이 강해 reading lane 선택.)
- 신규 엔트리(전용 burnout/도덕적손상 엔트리 기존 없음).

## 변경 상세
- **moral-injury-burnout.md**: 전통(소진/Maslach) vs 최신(도덕적 고통/Jameton 1984 · 도덕적 손상/Litz 2009 · Dean&Talbot 2019 반향). 개념 구분 표 + 함의(개인 회복탄력성 프레이밍 vs 시스템 원인). 원문 정의 문구 보존.
- **출처(정직)**: 4개 원 출처 이름·연도 확실하나 **이 환경 PubMed 차단으로 PMID 미확인** → `[원 논문 미확인 — Researcher 검증 대기]`. 미르 raw 텍스트라 외부 매체 attribution 없음.
- **격리**: reading lane → bundle 밖, 앱 inject 없음. cross-link [[clinical-experience-quality]].

## 결과
- 판정: 통과 (bundle 무변경 — reading lane. 임상 라이브러리·앱 무영향.)
- 다음 작업: 웹(PubMed) 열리거나 미르가 PMID 제공 시 Litz 2009 등 정식 인용 교체.

## 별도 보고 — bundle backlog (미르 요청과 별개)
- SessionStart 훅 경고: "8 entries since 2026-09-10 미컴파일". 실체 = 2026-09-15·09-16 deep-extract 2커밋이 by-disease/guidelines md를 갱신했으나 bundle 미반영. **이번 요청과 무관**이라 미실행. 미르가 "liby ingest" 호출 시 날짜별 batch로 컴파일 예정. (reading lane은 backlog 대상 아님.)

## 회고
- reading lane이 신설 4일 만에 2번째 입주 — "임상 inject / 관심·학습" 2축 분리가 실사용에서 자연스럽게 작동 중.
- 다음 세션 반영: log/README 갱신은 다음 세션 참조 대상 → main 반영.
