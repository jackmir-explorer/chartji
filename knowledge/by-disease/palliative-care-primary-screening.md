# 일차의료 완화의료 선별 — 조기 포착 프로토콜 [INSIGHTS]

tags: [INSIGHTS]
keywords: 완화의료, palliative care, 선별, screening, 일차의료, primary care, Surprise Question, ACP, 사전돌봄계획, EHR 통합, 완화의뢰

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2026
applicability: 일차의료 외래 — 말기·중증 만성질환자 완화의료 필요 조기 포착
parents: []
relations: [[[goals-of-care-acp]], [[afp-eol-symptom-management]]]

> primarySources (Tier 1):
> - Johnson K et al. Screening Protocols for Identifying Palliative Care Needs in Primary Care: A Scoping Review. J Pain Symptom Manage. 2026;71(6):e711-e724. PMID:41765292, DOI:10.1016/j.jpainsymman.2026.02.018

---

## 개요

일차의료에서 완화의료 필요 조기 선별은 권고되지만 실제 구현은 일관되지 않음.
25개 연구 범위 리뷰 — 장벽·촉진요인 및 구현 전략 정리.

**핵심 전환:** 완화의료 = 포기·말기 관리 → **"돌봄 강화·증상 완화·사전계획" 재정의**가 조기 선별의 전제 조건.

---

## 선별 도구 [INSIGHTS]

> [출처: Johnson K et al. J Pain Symptom Manage 2026;71(6):e711-e724. PMID:41765292]
> [초록 기반 — 전문 미확인]

### Surprise Question (SQ)
> "이 환자가 내년에도 살아계실 것 같습니까?"

- 간단한 단일 문항 — 외래에서 즉시 적용 가능
- 의사가 "아니요"라고 답할 경우: 완화의료 필요 고위험군 신호
- ACP 대화 개시 트리거로 사용

### 표준화 도구 + EHR 통합
- **EHR 통합 선별이 핵심 촉진요인**: 자동 플래깅 → 의사 개인 판단 의존 줄임
- 적용 도구 예시: SPICT (Supportive and Palliative Care Indicators Tool), GSF-PIG

---

## 장벽 (barriers) [INSIGHTS]

> [출처: Johnson K et al. J Pain Symptom Manage 2026;71(6):e711-e724. PMID:41765292]

| 범주 | 주요 장벽 |
|---|---|
| **시간·자원** | 외래 시간 부족, 전담 완화의료 인력 미확보 |
| **인식·태도** | 선별 도구 가치에 대한 의구심, "완화 = 포기" 인식 |
| **소통** | 환자·가족과의 완화 대화 기술 부족 |
| **재정·구조** | 불리한 수가 모델, 완화의료 의뢰 경로 미확보 |
| **사회문화적** | 죽음·말기 논의에 대한 문화적 회피 |

---

## 촉진요인 (facilitators) [INSIGHTS]

> [출처: Johnson K et al. J Pain Symptom Manage 2026;71(6):e711-e724. PMID:41765292]

1. **EHR 통합** — 선별 자동화, 의사 결정 지원 알림
2. **임상 챔피언** — 팀 내 완화의료 선도 의사/간호사
3. **조기 재정의** — "완화 = 초기부터 삶의 질 지원"으로 팀 재교육
4. **명확한 역할 분담** — 누가 선별하고 누가 대화하는지 프로세스 정의
5. **맞춤형 교육** — 실제 대화 시뮬레이션 포함 훈련

---

## 일차의료 외래 적용 포인트

### 조기 선별 실천 체계

```
1단계 — 선별 대상 플래깅:
  ・ 중증 만성질환 (COPD Stage III-IV / 말기 심부전 / 치매 중기 이상)
  ・ Surprise Question 활용 → "아니요" 시 완화 대화 개시

2단계 — ACP 대화:
  ・ "포기"가 아닌 "앞으로의 돌봄 목표 명확화"로 프레이밍
  ・ 가족 참여 권장 (초기 단계부터)
  ・ 결정 문서화 (사전의료의향서 / DNR)

3단계 — 완화의료 의뢰:
  ・ 증상 조절 어려울 때 또는 환자 희망 시
  ・ "완화의뢰 = 말기"가 아님을 환자에게 명시
```

### 한국 외래 변환 시 확인

- [출처 미확인 — researcher 검증 권장]: 한국 일차의료 완화의료 의뢰 경로·급여 기준
- EHR 시스템별 완화의료 플래깅 기능 가용성 확인 필요
- 문화적 맥락: 가족 중심 의사결정 → 환자 직접 선별과 가족 통합 선별 병행

---

## 관련 엔트리

- [[goals-of-care-acp]] — ACP·사전의료의향서 프로토콜
- [[afp-eol-symptom-management]] — 임종기 증상 관리
