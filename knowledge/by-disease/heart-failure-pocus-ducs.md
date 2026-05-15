# 심부전 POCUS DUCS — 급성 심부전 예후 예측 복합 점수

tags: [CLINICAL]
keywords: heart-failure-pocus-ducs, DUCS, POCUS, VEXUS, B-lines, 급성 심부전, 예후 예측

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2026
applicability: 단일 기관, n=109, LVEF<50%, CICU 입원
parents: [heart-failure]
relations: []

> primarySources (Tier 1):
> - Scherer HC et al. J Ultrasound Med. 2026. PMID:41863026, DOI:10.1002/jum.70229

---

## POCUS DUCS — 급성 심부전 예후 예측 복합 점수 [CLINICAL — 조건부]

> [출처: Scherer HC et al. J Ultrasound Med. 2026. PMID:41863026, DOI:10.1002/jum.70229]
> 단일 기관, n=109, LVEF<50%, CICU 입원 — [초록 기반 — 전문 미확인]

**DUCS (Dynamic Ultrasound Congestion Score)**: 폐 초음파(B-lines 수정) + VEXUS(정맥 울혈 초음파) 복합 점수.

| DUCS 지표 | 예측 대상 | AUC |
|---|---|---|
| ΔDUCS (입원→72시간 변화) | 입원 중 사망 | **0.76** |
| DUCS (CICU 퇴원 시) | 30일 사망·재입원 | **0.77** |

**임상 포인트:**
- 폐 초음파 B-lines 단독에서 VEXUS(경정맥·간정맥·신장 정맥 패턴) 통합으로 이뇨제 반응과 볼륨 과부하를 더 정확히 추적 가능
- 72시간 내 DUCS 개선 여부가 예후 예측에 가장 유용 — 이뇨제 반응 모니터링 도구로 활용
- 기존 BNP + POCUS B-lines 진단 데이터([[heart-failure|Volume Overload 진단 정확도]] 섹션)에 더해 **치료 모니터링** 용도로 VEXUS 개념 확장

**VEXUS 검사 구성:**
- IVC 확장(>2 cm + collapsibility↓) + 간정맥 파형(S파 소실·역류) + 문맥 간헐성 + 신장 정맥 간헐성

> POCUS 술기 확장(VEXUS 포함)을 고려하는 임상가를 위한 근거. 일차의료 직접 적용보다는 상급기관·CICU 협진 시 참고.

---

## 관련 엔트리

- [[heart-failure]] — 심부전 본 엔트리 (Volume Overload 진단 정확도 — BNP + POCUS B-lines)
- [[heart-failure-monitoring]] — 재진 모니터링 항목

---

## VExUS 독립 예후 가치 — 베이즈 메타분석 (AHF 원내 사망률) [CLINICAL — 조건부]

> [출처: Chaves VB et al. Curr Probl Cardiol. 2026;51(6):103305. PMID:41747972, DOI:10.1016/j.cpcardiol.2026.103305]
> 5연구 565명 베이즈 무작위효과 메타분석. 대부분 VExUS grade 3 + 박출률 감소 심부전 (CICU 입원).
> [초록 기반 — 전문 미확인]

**핵심 수치:**

| VExUS 등급 | 원내 사망률 |
|---|---|
| VExUS **≤1** (낮은 울혈) | **1.9%** (4/210명) |
| VExUS **≥2** (중등~고도 울혈) | **14.1%** (50/355명) |

- **평균 OR: 0.175** (95% CrI: 0.061–0.497) — VExUS ≤1이 보호 방향
- **연관성 사후 확률 (OR<1): 99.91%**
- **임상적 유의 효과 사후 확률 (OR<0.8): 99.93%**
- 예측 분포: 미래 연구에서 진 OR이 0.045–0.681 범위에 있을 확률 95%

**VExUS 구성요소 (재확인):**
IVC 확장(>2 cm + collapsibility↓) + 간정맥 파형(S파 소실·역류) + 문맥 간헐성 + 신장 정맥 간헐성

**임상 적용 포인트:**
- AHF 의심 환자에서 VExUS 스코어로 원내 사망 위험 층화 가능
- VExUS ≥2 → 원내 사망률 ~7배 → 집중 모니터링·이뇨제 적극 최적화 시사
- 기존 DUCS 복합점수(위 섹션)의 VExUS 구성요소 단독 예후 가치 재확인

**한계:**
- 5연구 565명, 대부분 LVEF<50% CICU 입원 환자 — 일차의료·외래 직접 적용 제한
- 베이즈 사전 분포 설정에 따른 민감도 분석 일관 (약한 사전 분포에서도 결과 유사)
