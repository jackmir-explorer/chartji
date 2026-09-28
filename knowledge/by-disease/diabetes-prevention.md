# 당뇨 예방 — 생활습관 프로그램·AI-DPP [CLINICAL]

tags: [CLINICAL]
keywords: 당뇨예방, diabetes prevention, prediabetes, 당뇨전단계, DPP, 생활습관, lifestyle intervention, AI-DPP, 체중감량, HbA1c, 비열등성

version: (미정)
supersedes: (미정)
freshness.primarySourceYear: 2025
applicability: 외래 당뇨전단계 + 과체중/비만 성인
parents: [[[diabetes]]]
relations: [[[diabetes]], [[glp1-selection-strategy]]]

> primarySources (Tier 1):
> - Mathioudakis N et al. An AI-Powered Lifestyle Intervention vs Human Coaching in the Diabetes Prevention Program: A Randomized Clinical Trial. JAMA. 2025 Dec 16;334(23):2079-2089. PMID:41144242, DOI:10.1001/jama.2025.19563

---

## 핵심 근거 — AI-DPP Phase 3 RCT [CLINICAL]

> [출처: Mathioudakis N et al. JAMA 2025;334(23):2079-2089. PMID:41144242]
> Phase 3, 비열등성 RCT, 368명, 2개 미국 임상 센터, 12개월 추적

**대상:** 당뇨전단계 + 과체중/비만 (BMI 중앙 32.3) 성인, 중앙 58세, 여성 71%

**비교:**
- AI-DPP: 모바일 앱 + 블루투스 디지털 체중계 (완전 자동화)
- 인간 코치 DPP: 원격 코치 주도 (표준 DPP)

**1차 복합 결과** (12개월):
- HbA1c <6.5% 유지 + {체중 ≥5% 감소 OR 체중 ≥4%+주 150분 신체활동 OR HbA1c 절대값 0.2%p↓} 중 1개 달성
- AI-DPP: 31.7%, 인간 코치: 31.9% (위험차 -0.2%, 1-sided 95% CI 하한 -8.2%)
- **비열등성 기준 충족** (-15% 미초과)

**참여율:** AI 93.4% vs 인간 코치 82.7% — AI가 더 높은 참여 시작률

---

## 외래 처방 적용 (protocol) [CLINICAL]

### 대상 선별

- **진단:** 당뇨전단계 (IFG 또는 IGT) + 과체중(BMI≥25) 또는 비만
- 인간 코치 DPP 접근 불가, 비용 장벽, 시간 제약 환자에게 AI-DPP 대안 제시 가능

### 처방 흐름

```
1. 당뇨전단계 확인 (HbA1c 5.7-6.4% 또는 공복혈당 100-125)
2. AI-DPP 앱 소개 + 등록 (모바일 기기 필요)
3. 12개월 프로그램 안내:
   ・ 목표: 체중 5-7% 감량 + 주 150분 중등도 신체활동
   ・ 모바일 앱 식이·활동 모니터링
   ・ 블루투스 체중계 자가 모니터링 권장
4. 3개월 추적 방문: HbA1c + 체중 확인
```

### 기대 효과

- 12개월 체중감량·HbA1c 개선: 인간 코치 DPP와 동등
- 프로그램 시작률 AI에서 더 높음 (접근 용이성)

### 한국 외래 변환 시 확인

- [출처 미확인 — researcher 검증 권장]: 한국 건강보험 당뇨예방 프로그램 급여 여부
- [출처 미확인 — researcher 검증 권장]: 국내 AI-DPP 앱 승인·가용성 여부
- 미국 CDC 인증 DPP 앱 기준과 국내 기준 차이 확인 필요

---

## 관련 엔트리

- [[diabetes]] — T2DM 진단·관리
- [[glp1-selection-strategy]] — GLP-1RA 체중감량 처방 (당뇨전단계 고위험군 옵션)

---

## DPP/DPPOS 26년 추적 — 생활습관·메트포르민과 다질환 예방 [CLINICAL] (2026-09-28 추가)

> [출처: Salive ME et al. JAMA 2026 Aug 18;336(7):577-586. PMID:42295772, DOI:10.1001/jama.2026.8492]
> DPP/DPPOS(당뇨예방프로그램·장기추적) 관찰 코호트, 1,173명 (DPP 참여자 중 CMS 자료 동의), 1996-2021

### 핵심 결과 (다질환 = 만성질환 ≥2개)

| 중재 | HR vs 위약 | 95% CI | 유의성 |
|---|---|---|---|
| **생활습관 집중 프로그램** | **0.79** | 0.68–0.93 | ✅ 유의 |
| 메트포르민 | 0.91 | 0.78–1.07 | ❌ 비유의 |

> ⚠ **중요**: 메트포르민은 당뇨 발생 예방 효과는 DPP 원래 RCT에서 확인됐으나, 이번 다질환 예방 분석에서는 **통계적으로 유의하지 않음**. 생활습관만 유의한 다질환 억제 효과.

### 임상 적용 포인트

- **"당뇨 하나만 막는 게 아니다"**: 생활습관 프로그램이 15개 만성질환 전반의 동반질환 부담을 26년 추적에서 21% 감소
- **비용 높은 질환 조합 (dyads)**: 생활습관 군에서 HR 0.57(0.38–0.85) — 가장 비싼 동반질환 이중 발생 45% 감소
- **상담 메시지**: "당뇨 전 단계에서 꾸준히 걷고 체중 줄이면 나중에 당뇨, 심장병, 콩팥병 등 여러 병이 함께 생기는 걸 막을 수 있습니다"
- 메트포르민 단독으로는 다질환 예방 근거 불충분 — 생활습관이 핵심

### 메트포르민 한국 외래 처방 (당뇨전단계)

- 본 연구에서 메트포르민은 **다질환 예방 효과 미입증** (당뇨 발생 예방 효과는 별도)
- 한국 급여: 당뇨전단계(IGT/IFG)에서 메트포르민 처방은 **보험 적용 범위 밖** (T2DM 확진 후 급여)
  - [출처 미확인 — researcher 검증 권장: 당뇨전단계 메트포르민 한국 보험 현황]
- 실제 처방 시 자비 부담 또는 진료계획서 필요 — 환자 설명 필요

**study-note:** [[inbox/study-notes/2026-09-28-dpp-26yr-multimorbidity]]
