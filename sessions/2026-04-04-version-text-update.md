# 세션 기록 — 앱 문구 최신화

## 세션 정보
- 날짜: 2026-04-04
- 버전: v18 (변경 없음, 문구만 정렬)
- 작업명: version-text-update

## 결정 배경
앱 UI에 v14/v15 잔재 문구가 남아 있어 현재 버전(v18)과 불일치. Guideline Panel은 v16에서 완전 제거되었으나 `<title>` 태그에 여전히 표기되어 있었음.

## 건드린 파일
- `src/index.html`
- `src/app.js`

## 수정 상세

### src/index.html
- `<title>차트지 v14 — Guideline Panel</title>` → `<title>차트지 v18 — 가정의학과 진료 보조</title>`

### src/app.js
- 탑바 배지: `FM v15` → `FM v18`
- info bar: `v15 · ...` → `v18 · ...`

## 판정
QA 통과. 롤백 불필요.

## 다음 작업
- `rules/gotchas.md` 파일 실제 생성 (이전 세션에서 의도만 있었고 파일 미생성 확인됨)

## 회고
CSS/JS 로직 무변경 제약 하에 문자열 리터럴만 교체. str_replace 3회로 완료.
