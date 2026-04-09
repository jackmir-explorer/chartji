# skills/knowledge-inject/SKILL.md — Knowledge Inject

## 트리거
Triage 패널의 onDetect → detectedCalcs 배열

## ⚠ 절대 금지
RedFlag 패널에는 어떤 경우에도 inject 하지 않는다.

## 주입 대상 및 라우팅

| BUNDLE 필드 | 목적지 | 시점 |
|------------|--------|------|
| exam | Missing 패널 컨텍스트 | 진료 중 실시간 |
| treatment | Draft 탭 힌트 (접이식) + Working Draft 컨텍스트 | Draft 검토 시 |
| differential | Draft 탭 힌트 (접이식) + Working Draft 컨텍스트 | Draft 검토 시 |
| draftTemplate | 질환 특이 Template — Working Draft 출력 형식 강제 (범용 포맷 대체) | Draft 생성 시 |
| draftAppend | Draft 출력사항 — Draft 하단 고정 문구 | EMR 입력 전 |

## 동작
앱 런타임에서 KNOWLEDGE_BUNDLE[calcCategory] 조회.
- context → generateWorkingDraft() knowledgeCtx 인자로 전달
- draftAppend → Working Draft 생성 후 하단 자동 추가

## 컨텍스트 포맷
"의사 임상 경험 (API 일반 지식보다 우선 적용):\n{context}"

## 우선순위
knowledge context > API 일반 의학 지식. 프롬프트 상단 배치로 적용.
