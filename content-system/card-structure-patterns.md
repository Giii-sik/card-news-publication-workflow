# 카드 타입별 구조 규칙

인스타그램 카드뉴스의 기본 카드 타입은 `hook` / `intro` / `info` / `cta`다. 이 문서는 각 타입의 **카피 문법**과 **시각 위계** 규칙을 정의한다. 와이어프레임을 만들 때 이 규칙을 그대로 따른다.

캔버스: **1080 × 1350** (인스타 4:5)
폰트: **Pretendard**
테마: `dark`(배경 `#0D0D0D`, 액센트 `#0B78F8` 브랜드 액센트 블루) / `light`(배경 `#FFFFFF`, 액센트 `#0B78F8` 브랜드 액센트 블루)

> 색상·이미지·안전영역의 최종 기준은 `design-system/card-news-rules.md`다. 이 문서는 Claude에서 흡수한 카피 구조와 ASCII 와이어프레임 판단 기준을 보강하는 역할이다.

---

## hook (첫 장)

**역할** — 시리즈 전체의 톤·정체성을 결정. 스크롤을 멈추게 하는 한 방.

### 카피
- 2~4줄, 줄바꿈 의도적으로 끊어 호흡 부여
- 동사 생략 가능 ("외주 맡기기 전에 한번 써볼 AI" 식 명사구 마무리도 OK)
- `highlight` 1개 — 헤드라인 안의 핵심 명사. 강조어 1개만, 2개 금지
- 질문/명령형 둘 다 가능. 수식어("정말", "굉장히") 금지

### 시각 위계
- 대형 타이포 1개로 화면 지배 (124~140px / weight 800)
- `highlight` 위에 손글씨풍 언더라인 SVG (테마 색)
- 좌측 정렬, 상단·하단 여백 비대칭(상단이 더 넓게)
- 보조 요소 최소 — 아이콘·이모지·pill 박스 금지
- 우측 하단 또는 좌측 상단 어딘가에 작은 시리즈 표식(선택)

### 안 하는 것
- 부제(subhead) 없음 — hook은 헤드라인 1개로만
- 출처·날짜 표기 없음
- CTA 문구 없음 (그건 cta 카드의 일)

---

## intro (맥락 브리지)

**역할** — hook 이후, 정보 카드로 들어가기 전에 왜 지금 이 주제가 중요한지 짧게 연결한다. 두 번째 hook이 아니다.

### 카피
- `headline` 또는 `question/fact/twist` 구조 사용 가능
- 핵심 문장은 1~2줄, body는 최대 3줄. 필요한 만큼만 쓰고 줄 수를 채우려고 늘리지 않는다.
- `highlight` 1개 — 문장 안의 실제 부분문자열

### 시각 위계
- 텍스트 주도. 필요하면 브러시 언더라인 허용
- 대형 이미지보다 맥락 전환이 우선
- hook보다 차분하고 info보다 넓은 호흡

---

## info (본문)

**역할** — 정보 전달. 시리즈 안에서 N장(보통 3~5장).

두 가지 `format`:

### info / format=`list`
- 한 장에 3~5개 항목 묶음 ("AI 툴 5선" 같은 큐레이션 주제)
- `headline` 1줄 + `items[]` 3~5개
- 각 item은 짧게 (15자 이내 권장)

### info / format=`narrative`
- 한 장에 한 가지 논점 (보통 3장 묶음으로 problem → perspective → solution)
- 필수: `headline`, `body`
- `stage` 필드: `problem` / `perspective` / `solution` 중 하나
- 아이콘 슬롯(`icon`): 도구 추천 시 렌더러가 지원하는 tool badge를 사용

### 카피
- headline: 명사형 1줄, 14자 이내 권장
- body: 최대 3줄, 한 줄 22자 내외에서 의도적 줄바꿈. 1~2줄로 충분하면 그대로 둔다.
- 내용 출처는 카드에 넣지 않는다. 피드 캡션 하단의 참고 자료와 `sources` 배열에서 관리한다.

### 시각 위계 (modern_03 / Blunge-style)
- 타이포그래피 중심. 현재 info 카드는 `design-system/card-layouts/`의
  `info-img` 또는 `info-text` 규칙만 따른다.
- `info-img` headline은 디자인 토큰의 `h3`, body는 `body` 기준
- `info-text` headline은 intro와 같은 `h2`, body는 `body` 기준
- pill 박스·불릿 마커 없음
- `info-text` 예외: 카드 이해 속도를 높일 때만 상단에 작은 Tossface
  이모지를 둘 수 있다. 별도 Brand 3D cue를 만들 경우 이모지가 아니라 이미지
  자산으로 취급한다.

---

## cta (마지막 장)

**역할** — Brand 플랫폼 안내. 셀러의 다음 한 걸음 암시.

### 카피
- `title` 1~2줄 + `body` 1~2줄
- "셀러의 다음 한 걸음을 Brand와 함께" 톤
- 브랜드 언급은 **이 카드에서만** (다른 카드에서는 금지)

### 시각 위계
- 우측 하단에 브랜드 로고 (`logo: true` → 테마에 맞춰 white/blue PNG)
- 헤드라인은 hook보다 작게(80~100px), 차분한 위계
- 본문은 info의 body 톤과 동일

---

## 공통 규칙

- 한 시리즈 = 1개 테마 (dark or light) — 카드 간 테마 혼용 금지
- 폰트는 Pretendard 한 종류, weight만으로 위계 구분
- 색은 배경/텍스트/강조 3색만 — 4색째 도입 금지
- 생성 이미지는 깨끗한 소스 에셋으로만 사용한다. 텍스트, 로고, 최종 카드 레이아웃, 그라디언트, 워터마크를 이미지에 굽지 않는다.
- hook과 info-img는 이미지 슬롯을 가질 수 있다. 이미지는 레이아웃 승인 후 `graphic-designer`가 생성·삽입한다.
- highlight는 headline의 부분문자열이어야 함 (아니면 강조 처리 무시됨)

---

## 카드 수 조합 (참고)

| cardCount | 구성 | 용도 |
|---|---|---|
| 3장 | hook + info(list) + cta | 큐레이션 한 장 압축형 |
| 5장 | hook + info(narrative ×3) + cta | 논증·설득형 |
| 8장 | hook + intro + info(list/narrative ×5) + cta | 풍성한 추천 시리즈 |

`cardCount`와 `cards.length`는 일치해야 함. 허용 범위 `3 ≤ cardCount ≤ 10`.
