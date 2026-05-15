# Illustration Research System

`info-img` 카드에 외부 일러스트(unDraw 등)를 사용할 때의 보관 트랙 룰.
현재 기본 트랙은 아니며, 사용자가 명시적으로 요청했을 때만 꺼낸다. spec에는
이미지 트랙 필드를 넣지 않고, 4단계 image phase에서 카드 메시지를 보고 결정한다.

4단계 image phase(`graphic-designer`)에서 코덱스가 수행한다.

---

## 핵심 컨셉

> Claude는 추상 개념 카드용 일러스트를 **시드(seed)** 로 가져온다.
> 그 시드 자체가 발행 가능한 1차 완성본일 수도 있고, Codex가 그걸 참고해
> Brand 톤으로 더 디벨롭한 결과물로 교체될 수도 있다.

---

## 언제 쓰나

다음 카드 메시지에 적합:
- 추상 개념 (협업·결정·분석·흐름)
- 인물·행동 메타포 (셀러가 ~한다, 팀이 ~한다)
- 사용자가 일러스트 트랙을 명시적으로 요청한 카드

→ `decision-tree.md` 참조.

---

## 1. 허용 소스

### 무료 + 상업 사용 OK + 색상 변경 가능 (우선)

- **unDraw** ⭐ — `https://undraw.co/illustrations`
  - 단색 일러스트, 색상 on-the-fly 변경 (브랜드 액센트 블루 적용 자유)
  - SVG / PNG 다운로드
  - 출처 표기 불필요 (선택 표기 가능)
  - 라이선스: MIT-style, 상업 자유

### 무료 + 상업 사용 OK + 색상 변경 제한적

- **Storyset** — `https://storyset.com/`
  - 캐릭터 풍부, 시리즈로 묶기 좋음
  - 색상 일부 customization 가능
  - 무료 사용 시 출처 표기 필요

### 영감 only (직접 사용 X)

- **Dribbble / Behance** — 라이선스 불명확, 디자이너 포트폴리오
- **Pinterest** — 큐레이션 재배포 (원본 추적 + 라이선스 확인 필수)

→ 이 두 곳은 "이런 톤이 좋다"라는 **시드 아이디어**용. Codex 프롬프트 작성 시
스타일 레퍼런스로 활용. 직접 다운로드해서 카드에 박지 않음.

---

## 2. unDraw 사용법

### 검색 + 다운로드

1. `https://undraw.co/illustrations` 접속
2. 키워드 검색 (영문) — "decision", "data", "shopping", "team", etc.
3. 색상 입력란에 **`0B78F8`** (브랜드 액센트 블루) 입력 → 일러스트가 그 색으로 즉시 리캐스트
4. **PNG 다운로드** (또는 SVG)
5. `output/<slug>/assets/NN-info-<topic>-illustration.png` 로 저장

### Claude 자동 검색 / WebFetch

WebFetch로 unDraw 검색 페이지를 fetch해서 적합한 일러스트 후보 1~3개 추출
가능. 다만 unDraw는 SPA라 정적 파싱이 약함 → 키워드 + 일러스트 제목 매칭으로
후보 선정.

---

## 3. CSS 합성 — 다른 트랙과 톤 묶기

unDraw 일러스트는 **투명 배경 + 단색**이라 자유도가 높다. 우리 다크 카드에
얹을 때:

```css
.info-illustration {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0d0d0d;
  padding: 100px;
}

.info-illustration img {
  width: auto;
  height: 100%;
  max-width: 80%;
  object-fit: contain;
  /* unDraw가 이미 브랜드 액센트 블루로 캐스트되어 있으므로 추가 필터 최소 */
  filter: brightness(0.95);
}

.info-illustration-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    60% 50% at 50% 35%,
    rgba(11,120,248,0.10) 0%,
    rgba(11,120,248,0) 70%
  );
  pointer-events: none;
}

.info-illustration-fade {
  /* 사진 트랙과 동일한 하단 fade — 톤 통일 */
  position: absolute; left: 0; right: 0; bottom: 0;
  height: 40%;
  background: linear-gradient(180deg,
    rgba(13,13,13,0) 0%,
    rgba(13,13,13,0.40) 60%,
    rgba(13,13,13,0.95) 100%);
  pointer-events: none;
}
```

→ 사진 트랙(`web-free-image-system.md`)과 fade 패턴이 일치해 시리즈 톤이
자연스럽게 묶인다.

---

## 4. 이미지 출처 표기

unDraw는 출처 표기 의무가 없다. 단 추적성을 위해 `_image-plan.md`에 출처 기록:

```
| Card N | unDraw — "{title}" | https://undraw.co/illustrations | MIT-style, 출처 표기 불필요 |
```

Storyset은 출처 표기가 필요하다. 카드 안 표기가 필요하면 우상단에 작게 넣는다:

```html
<div class="image-source-credit">Illustration · Storyset</div>
```

---

## 5. Phase 2에서 사용자 결정 흐름

Claude가 1차 일러스트로 카드 완성한 후 사용자에게 보여주면 3가지 분기:

| 사용자 결정 | 다음 액션 |
|---|---|
| "이대로 OK" | 발행 |
| "다른 일러스트로 교체" | Claude 다시 검색 (다른 키워드 / 다른 일러스트) |
| "이 일러스트를 시드로 Codex가 디벨롭" | Codex에게 일러스트 PNG + 카드 메시지 + Brand 톤 가이드 전달 → 커스텀 일러스트 / 3D / 합성으로 업그레이드 |

→ unDraw는 **빠른 1차 완성** + **Codex 디벨롭 시드** 두 역할을 동시에 한다.

---

## 6. 작업 순서 (체크리스트)

1. [ ] 카드 메시지 → 일러스트 컨셉 1줄 정리 ("셀러가 노트북 앞에서 결정 내리는 장면")
2. [ ] unDraw 검색 (영문 키워드 1~2개)
3. [ ] 적합한 일러스트 1~3개 후보 → 각각 브랜드 액센트 블루로 리캐스트 → PNG 다운로드
4. [ ] `output/<slug>/assets/NN-info-<topic>-illustration.png` 저장
5. [ ] HTML 합성 (위 CSS 사용)
6. [ ] PNG 렌더
7. [ ] `_image-plan.md` 출처 기록

→ 한 카드 평균 5~10분.

---

## 7. 흔한 실패 → 빠른 재시도

| 증상 | 원인 | 해결 |
|---|---|---|
| 일러스트가 너무 단순해서 카드가 빈약해 보임 | 일러스트 하나만 외롭게 떠있음 | 배경 glow + 텍스트 영역과 가까이 배치 |
| 톤이 사진 트랙 카드와 안 묶임 | 일러스트 색상이 너무 밝음 | `brightness(0.95)` 또는 `opacity(0.92)` |
| 일러스트가 메시지를 약화 | 일러스트가 너무 추상적 / 다른 의미로 읽힘 | 다른 일러스트 / 다른 키워드 / 트랙 변경 |
| 캐릭터 인종·성별이 어색함 | unDraw 기본 캐릭터 스타일 | Storyset의 다양한 캐릭터로 시도 |
