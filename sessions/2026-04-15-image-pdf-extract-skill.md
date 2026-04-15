# 세션 기록 — image/PDF extract 스킬 신규 구현

## 세션 정보
- 날짜: 2026-04-15
- 작업자: Builder
- QA 판정: PASS

## 결정 배경
- OCR 자동 ingest는 Boss 전략 리뷰에서 보류 판정 (수치 오독·PII·Attribution 위험)
- 미르 승인 게이트를 앞에 두는 구조로 재설계 → 안전 문제 해소
- PDF 지원 추가 (가이드라인·논문 활용)
- 2단계 신선도 필터 도입 (교과서급 제외, bundle 중복 제외)

## 건드린 파일
- `skills/image-extract/SKILL.md` — 신규 생성
- `agents/librarian.md` — 이미지·PDF 감지 트리거 + 스킬 등록 추가

## 추가 상세

### skills/image-extract/SKILL.md (신규)
- Step A: PII 스캔 (의심 시 즉시 중단)
- Step B: 멀티모달/PDF 읽기 ([판독불가]/[추정] 마킹)
- Step C: 2단계 신선도 필터
  - 1단계: bundle 중복 체크
  - 2단계: ⭐ 신선 / △ 보통 / ✕ 제외 등급 분류
- Step D: 구조화 Draft 출력 (⭐/△ 마킹 인라인)
- Step E~F: 미르 승인 게이트 → 기존 ingest Step 1 진행
- PDF 전체 읽기: 미르 명시 지시 시 PII 스캔 선행 후 허용

### agents/librarian.md
- 사용 스킬에 `skills/image-extract/SKILL.md` 추가
- 이미지·PDF 입력 감지 섹션 추가 (4단계 라우팅)

## Reviewer 플래그 → 해결
- F-1: 이미지+텍스트 동시 입력 명세 추가
- F-2: PDF 전체 읽기 방침 명시
- F-3: Draft 섹션 분류에 ⭐/△ 인라인 마킹

## 다음 작업
- 실제 이미지/PDF 업로드로 파일럿 테스트
- Auditor 첫 번째 실행 (knowledge 항목 누적 후)
