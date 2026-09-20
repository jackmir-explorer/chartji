# sessions/2026-09-20-reading-lane-hikikomori.md

## 세션 정보
- 날짜: 2026-09-20
- 작업: Reading lane 신설(관심 아티클, bundle 밖) + 히키코모리 첫 입주 ingest
- 건드린 파일:
  - `knowledge/reading/README.md` (신규 — lane 헌장)
  - `knowledge/reading/hikikomori.md` (신규)
  - `agents/librarian.md` (reading/ bundle 제외 규칙)
  - `CLAUDE.md` (Liby ingest backlog 스캔 reading/ 제외)
  - `knowledge/log.md` · `knowledge/index.md` (1줄씩)

---
## 결정 배경
- 미르: "진료에 직접 도움 안 돼도 내 관심사 정리 차원의 유의미한 article을 정리할 형태로 라이브러리 확장 가능한가?"
- 소스: YouTube 영상(히키코모리) → 이 환경 YouTube egress 차단 확인 → Gemini가 영상 분석 → 그 출력을 미르가 붙여넣음 → Liby 통합.
- 분류 판단: 히키코모리는 임상 함의(이차성 선별·자살위험)가 있으나 **미르 핵심 진료영역 밖 + "관심사 정리" 프레이밍** → 임상 inject lane이 아니라 신설 reading lane이 적합.
- **미르 결정(AskUserQuestion)**: reading lane 범위 = **"순수 Obsidian (bundle 밖)"**. (앱 Guide 노출 옵션 B 미채택.)

## 설계 — Reading lane
- **이미 있는 격리 전례 3개** 위에 얹음: myth-log(inject 차단)·topic Triage미등록·study-notes(bundle 밖). 새 발명 아님.
- 규약: `knowledge/reading/`, 태그 `[READING]`, **bundle 밖 + inject 전면 차단**(Triage·Draft·RedFlag·hint·Guide 안 뜸), 소비=Obsidian 전용. md 형식·3-tier 출처·wikilink rigor는 임상 엔트리와 동일.
- 거버넌스 명문화: librarian.md 절대금지 + CLAUDE.md backlog 스캔 제외 → 미래 세션·"deep extract 항상 포함" 규칙이 reading/를 bundle로 쓸어담지 않게 방지.

## 히키코모리 엔트리
- 섹션: 정의/개념(생물심리사회·문화결속→범문화·Kato 2019 ≥6mo·HQ-25) / 일차성vs이차성 / 감별·동반(SAD·회피성PD·MDD·ASD·조현병스펙트럼·OCD) / 기여인자 층위(가족·사회경제·디지털·COVID·생물학예비·촉발) / 역학(한국 2023 실태조사) / 임상함의(이차성 선별+자살위험) / 비고.
- 수치 원문 보존: 54만·취업실패24.1%·대인관계23.5%·자살생각75.4%·자살시도26.7% 등.
- **출처 처리(정직)**: 일차문헌(Saito1998·Kato2019·TeoAR·HQ-25) 이름 확실하나 **이 환경 PubMed 차단으로 PMID 미확인** → `[원 논문 미확인 — Researcher 검증 대기]`. 한국 통계는 보건복지부 2023 실태조사(언론 재인용). 영상 강사·채널 미상 → attribution 날조 안 함, `YouTube 경유`로만.
- **안전(RedFlag 격리 준수)**: 자살위험은 임상참고로만 기록, RedFlag 패널 inject 금지 원칙 명시. reading 엔트리라 애초에 앱 어떤 패널에도 안 감.
- cross-link(아웃링크): [[depression-screening]]·[[anxiety-depression-cbt]]·[[persistent-physical-symptoms]].

## 결과
- 판정: 통과 (bundle 무변경 확인 — reading/는 bundle 밖. 임상 라이브러리·앱 동작 무영향.)
- 다음 작업: 환경에 웹(PubMed) 열리거나 미르가 PMID 제공 시 → Kato 2019 등 정식 인용 교체. 필요 시 지원 연계 정보(정신건강복지센터·☎109) reading 엔트리에 보강.

## 회고
- 예상과 달랐던 점: 확장 요청의 답이 "새 구조 발명"이 아니라 "이미 있는 격리 패턴의 명문화"였음. 라이브러리가 임상 inject / 학습·관심 두 축으로 갈라지는 게 자연스러움(앞선 전략 논의의 "라이브러리=학습 엔진" 방향과 정합).
- 다음 세션 반영: reading lane은 bundle·Triage와 무관 → 자동 시스템 무영향이나, **거버넌스 문서(librarian.md·CLAUDE.md) 변경은 다음 세션 참조 대상** → main 반영 필요.
