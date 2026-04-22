/* L3 Smoke #2 — TRIAGE 카테고리 fixture.
   transcript: sessions/2026-04-22-chrome-qa-scenarios.md 의 실제 QA 시나리오에서 복붙 (이미 실기 검증됨).
   각 fixture는 `expectAll`(반드시 전부 포함) 과 `expectAny`(각 세트별 최소 1개 포함) 두 기준으로 pass/fail.
   Liby ingest 시 새 카테고리 추가되면 여기도 fixture 1건씩 추가하는 관례 (librarian.md §fixture 유지).
*/
window.TRIAGE_SMOKE_FIXTURES=[
  {
    name:"LPR A 분기 (식도 증상 동반)",
    transcript:"목이 답답하고 기침이 3개월째 계속 나요. 자꾸 목청소하게 되고 가래 뱉고 싶어요. 속쓰림이나 역류감도 가끔 있어요. 일반 감기약은 효과 없었어요. 후두경은 한 번 봤는데 정상이라 했어요.",
    expectAll:[],
    expectAny:[["LPR","LPR-consensus"]]
  },
  {
    name:"LPR B 분기 (고립 LPS, 식도 증상 없음)",
    transcript:"만성 기침이랑 목 이물감이 6개월째예요. 주 3~4번은 목 청소하게 되고요. 근데 속쓰림이나 역류감은 전혀 없어요. PPI 처음 먹어보려는데 괜찮을까요?",
    expectAll:[],
    expectAny:[["LPR","LPR-consensus"]]
  },
  {
    name:"sglt2-inhibitors (UTI 기왕력)",
    transcript:"50대 여성 당뇨 환자, HbA1c 7.8. 메트포르민 쓰고 있고 추가로 포시가 넣으려고 해요. 근데 요로감염 자주 걸리는 편이에요. 작년에만 방광염 3번. 이 약 써도 되나요?",
    expectAll:["sglt2-inhibitors"],
    expectAny:[]
  },
  {
    name:"vitamin-d (일반 보충 상담)",
    transcript:"50대 여성. 비타민D 먹으면 암 예방된다고 들었어요. 건강검진 결과도 정상이고 특별한 증상도 없는데 먹어야 하나요? 주변에서 다 먹길래요.",
    expectAll:["vitamin-d"],
    expectAny:[]
  },
  {
    name:"아나필락시스 (neffy 비강 대체)",
    transcript:"2년 전 벌에 쏘여서 응급실 실려간 적 있어요. 그 후 EpiPen 처방받았는데 주사기 무서워서 들고 다니질 못했어요. 최근에 코에 뿌리는 에피네프린이 나왔다던데 그게 쓸 만한가요? 6살 아들도 땅콩 알레르기 있어서 같이 궁금해요.",
    expectAll:["아나필락시스"],
    expectAny:[]
  },
  {
    name:"depression-screening (외래 스크리닝)",
    transcript:"30대 여성. 지난 한 달 잠이 잘 안 오고 기분이 가라앉아요. 예전엔 좋아하던 취미도 이제 흥미가 없어요. 건강검진 왔는데 우울증 검사도 같이 받을 수 있나요?",
    expectAll:["depression-screening"],
    expectAny:[]
  },
  {
    name:"heart-failure + vaccination (복합 감지)",
    transcript:"72세 남성, HFrEF EF 35%. ACEi + BB 복용 중이고 NYHA II. 3개월 전에 SGLT2i 추가했어요. 이제 독감철인데 예방접종 뭐 맞아야 하나요? 폐렴구균도 아직 안 맞았어요.",
    expectAll:["heart-failure","vaccination"],
    expectAny:[["sglt2-inhibitors"]]
  }
];
