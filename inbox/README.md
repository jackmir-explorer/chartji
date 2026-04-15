# inbox/ — 핸드폰 → Liby 메시지 큐

## 사용법 (핸드폰에서)

1. GitHub 앱 또는 Working Copy 앱에서 이 폴더에 파일 생성
2. 파일명: `YYYY-MM-DD-짧은제목.md` (예: `2026-04-15-비염처방.md`)
3. 내용 작성 후 push

## 파일 형식

```markdown
출처: by ENT교수  (← 출처 힌트 있으면 꼭 적기. 없으면 데스크탑에서 확인)
내용:
여기에 임상 메모 자유롭게 작성
```

## 데스크탑에서

git pull 후 "Liby, inbox 확인해줘" → Liby가 자동 처리 후 draft 생성

## 주의
- 환자 이름·날짜·기관명 절대 포함 금지
- 처리 완료된 파일은 Liby가 inbox/processed/ 로 이동
