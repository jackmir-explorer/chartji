# skills/clinical-qa/SKILL.md — Clinical QA

QA가 기술적 회귀와 임상 안전을 동시에 확인하는 스킬.

---

## 1. 임상 안전 체크 (매 세션 필수)

### RedFlag 격리 (절대 원칙)
- [ ] generateRedFlagPanel() 호출에 ctx/followUpCtx 파라미터 없음
- [ ] panels.js RedFlagPanel 내부에 followUpCtx 참조 없음

### 패널 출력 안전
- [ ] PE 필드에 transcript 근거 없는 소견 없음
- [ ] Plan 필드에 의사 미발화 계획 없음
- [ ] Missing 항목 5개 초과 없음
- [ ] 지시형 문구 없음 ("~하세요" 류)

---

## 2. 기능 회귀 체크

### 음성인식
- [ ] 음성 입력 → raw 상태 반영

### 실시간 패널
- [ ] raw 변경 시 각 패널 독립 debounce 트리거
- [ ] followUpCtx 변경 시 Triage/Missing 재실행
- [ ] RedFlag는 followUpCtx 변경에 반응하지 않음

### WorkingDraft
- [ ] 50자 이상 + 3초 debounce 후 생성

### Final Chart
- [ ] generate() → parseChartText() → ProblemCard 렌더
- [ ] editMode 동작

### 세션 관리
- [ ] clearSession() 시 전체 리셋
- [ ] apiKey localStorage 저장/복원

---

## 출력
```
[QA 결과]
임상 안전: N/6 통과
기능 회귀: N/9 통과

실패:
  - 항목: 예상 → 실제 → 원인

롤백 필요: Y/N
```
