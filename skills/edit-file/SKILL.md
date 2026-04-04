# skills/edit-file/SKILL.md — Edit File

Builder가 Designer 설계서를 실행하는 스킬.

## 실행 순서

### 1. 백업
```bash
cp -r src/ src_backup/
```
백업 실패 시 → 중단.

### 2. 각 변경 #N에 대해

```bash
# old 문자열 등장 횟수 확인 (반드시 1)
grep -c "old_string" src/파일명.js
```

- 0 → Designer에 재확인 요청. 중단.
- 2+ → Designer에 재설계 요청. 중단.
- 1 → str_replace 실행.

### 3. 완료 후

명세에 없는 파일이 변경되었으면 → 즉시 중단 + Designer 보고.

## 롤백
```bash
cp -r src_backup/ src/
```
