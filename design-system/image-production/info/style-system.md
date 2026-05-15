# Info Image Style System

`info-img` 카드의 상단 이미지 영역을 어떻게 만들지 정하는 스타일 시스템.

이 문서는 실제 이미지 제작 전의 기준표다. 최종 선택은 카드 메시지, 하단 텍스트
밀도, 시리즈 전체 톤을 보고 결정한다.

---

## Current Default

기본은 이미지보다 정보 전달이다.

1. 이미지가 바로 이해를 돕지 않으면 `info-text`로 간다.
2. 이미지가 필요하면 `web-free-image`, `reality-composite`,
   `photo-composite`, `3d-graphic` 중 하나를 고른다.
3. CSS mockup은 사용하지 않는다.
4. 일러스트는 보관 트랙으로만 두고, 사용자가 요청할 때만 사용한다.

---

## Track 1 — Web Free Image

무료 이미지가 그대로 카드 메시지를 받쳐주는 경우.

Use:
- 실제 사물: 계산기, 영수증, 노트북, 택배 박스, 문서
- 실제 공간: 매장, 사무실, 책상, 창고
- 실제 행동: 정리, 계산, 포장, 확인

Look:
- 과하게 연출된 스톡 사진보다 담백한 실사
- 하단이 복잡하지 않은 사진
- 다크 카드와 맞도록 채도 낮춤, 밝기 낮춤, 하단 fade 적용

Source:
- Unsplash / Pexels / Pixabay
- 출처와 라이선스는 `_image-plan.md`에 기록

---

## Track 2 — Reality Composite

사진 같은 질감으로 직접 장면을 구성해야 할 때.

Use:
- 세금/정산/수수료처럼 개념은 현실적인데 그대로 찍힌 사진을 찾기 어려운 카드
- 하나의 상징 소품이 필요할 때
- 현실 장면에 약간의 과장을 더해야 메시지가 보일 때

Look:
- editorial photo composite
- 현실적인 책상, 종이, 조명, 손, 업무 소품
- 한 장면 한 메시지
- 이미지 안에 읽히는 텍스트는 넣지 않음

Good Objects:
- receipt, calculator, tax documents, settlement sheets, coins, laptop,
  parcel box, shopping bag

---

## Track 3 — Photo Composite

웹 무료이미지를 바탕으로 의미 소품을 더하는 방식.

Use:
- 기본 실사 배경은 좋은데 메시지를 설명할 핵심 오브젝트가 부족할 때
- 현실감은 유지하고 싶고, 완전 생성 이미지의 이질감은 피하고 싶을 때

Look:
- 사진 질감이 먼저 보이고, 합성 소품은 보조로만 작동
- 합성한 오브젝트의 조명 방향과 그림자를 사진에 맞춤
- 브랜드 컬러는 브랜드 액센트 블루 한 가지만 작게 사용

---

## Track 4 — 3D Graphic

추상 개념을 부드러운 오브젝트나 작은 장면으로 바꿔야 할 때.

Use:
- 마감일, 선택지, 비교, 흐름, 누수, 축적, 자동화
- 현실 사진보다 상징이 더 빠르게 읽히는 카드

Look:
- 메시지 성격에 따라 두 갈래로 나눈다.
- 조용한 설명형: premium 3D, soft matte, rounded object, 소품 1~3개.
- 경쟁/뉴스/플랫폼형: cinematic mascot action, 강한 표정과 동작, 배경 세계관,
  브랜드 특징이 캐릭터 자체에 녹아든 장면.
- 브랜드 색상은 승인된 경우 사용할 수 있다. 이때 브랜드 액센트 블루 한 가지로 억지
  제한하지 않는다.
- 로고는 흰 스티커/라벨처럼 붙이지 않는다. 승인된 브랜드 단서는 몸체 형태,
  색상 블록, 몰딩, 전면 인쇄, 스토어 구조로 캐릭터화한다.

Reference:
- `design-system/image-production/styles/3d-graphic.md`
- `design-system/image-production/styles/3d-cinematic-mascot-action.md`
- `design-system/samples/hook-image-system/output/01_hook_3d.png`

---

## Track 5 — Text-Led

이미지가 정보 이해를 방해할 때.

Use:
- 신고 조건, 예외, 체크리스트, 법적 기준
- 본문 디테일이 핵심인 카드
- 이미지가 억지로 느껴지는 카드

Look:
- `info-text` 레이아웃
- intro와 같은 `h2/body` 토큰
- Tossface emoji는 필요할 때만 한 개

---

## Do Not

- 이미지 안에 카드 제목을 넣지 않는다.
- 생성 이미지 안에 한글 문장이나 정확한 숫자를 넣지 않는다.
- 외부 브랜드 로고를 기본 사용하지 않는다.
- 승인된 브랜드 로고/단서를 쓰더라도 3D 캐릭터 위에 평면 스티커처럼 붙이지
  않는다.
- CSS/HTML로 만든 UI mockup을 이미지 트랙으로 쓰지 않는다.
- 조용한 정보 카드에서만 작은 디오라마 과잉을 피한다. 경쟁/뉴스형 3D는 장면의
  밀도와 동작이 품질을 만든다.
