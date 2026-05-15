---
name: card-news-creator
description: Renders a Brand Instagram card-news JSON spec into 3-10 PNG cards (1080x1350) in the output/ folder. Invoke after the card-author subagent has produced a confirmed spec, or when the user provides a spec directly. The skill is deterministic — it does not research or write copy, it only turns a spec into images.
---

# card-news-creator

자기 브랜드 인스타그램 카드뉴스를 **JSON spec → PNG 카드 3~10장**으로 렌더링하는 skill. 디자인/레이아웃/브랜드 적용은 모두 이 skill이 담당한다. 카피 생성이나 리서치는 하지 않는다 — spec이 비어있거나 잘못됐으면 에러를 던진다.

## 언제 쓰는가

- `card-designer` 서브에이전트(Step 4 design phase)가 레이아웃 프리뷰를 렌더링할 때
- `graphic-designer` 서브에이전트(Step 4 image phase)가 생성 이미지를 HTML에 넣고 최종 PNG를 렌더링할 때
- 사용자가 수동으로 spec JSON을 준비해서 카드로 뽑고 싶을 때
- 기존 spec을 수정해 재렌더링할 때

## 파이프라인 위치

이 skill은 **Step 4 끝의 PNG 렌더 단계**를 책임진다. 4단계 워크플로 전체
다이어그램·도구 분담·컨펌 게이트는 [`AGENTS.md`](../../../AGENTS.md)가 단일
진실 소스.

각 단계 사이에 사용자 확인 체크포인트가 있다.

## 입력 (Data Contract)

`card-author` 에이전트가 만들고 `card-designer`가 레이아웃 피팅한 것과 **동일한 스키마**. 자세한 필드 정의는 `agents/card-author.md`와 `content-system/spec-contract.md` 참고. 요약:

```json
{
  "topic": "string",
  "slug": "kebab-case (<=40자)",
  "theme": "dark | light",
  "cardCount": 3,
  "caption": "인스타그램 본문 full text",
  "hashtags": ["#...", "..."],
  "cards": [
    { "type": "hook", "title": "...", "highlight": "..." },
    {
      "type": "intro",
      "headline": "...",
      "body": "...",
      "highlight": "..."
    },
    {
      "type": "info",
      "format": "list | narrative",
      "stage": "problem | perspective | solution (narrative일 때만)",
      "headline": "...",
      "highlight": "...",
      "items": ["..."],          // format=list
      "body": "...",              // format=narrative
      "evidence": "출처/근거 메타데이터(선택, 카드에는 렌더하지 않음)"
    },
    { "type": "cta", "title": "...", "body": "...", "logo": true }
  ],
  "sources": [ { "title": "...", "url": "...", "publishedAt": "YYYY-MM-DD" } ]
}
```

### 카드 타입

현재 4종:

- **hook** — 첫 장. 대형 타이포 1-2줄, 강조어 1개 파란 밑줄.
- **intro** — 선택 카드. hook과 info 사이에서 "왜 지금 이 주제인가"를 짧게 설명.
- **info** — 본문 카드. 두 가지 format:
  - `list` — headline + items 3-5개. "도구/팁/채널 리스트" 주제에 사용. 1장.
  - `narrative` — headline + body 최대 3줄. 필요한 만큼만 쓰고, 3줄을 채우려고 늘리지 않는다. `stage`는 `problem|perspective|solution` 순서로 3장.
- **cta** — 마지막 장. 고정 팔로우 CTA.

### 카드 수 조합

| cardCount | 구성 |
|---|---|
| **3장** | hook + info(list) + cta |
| **4장** | hook + intro + info(list) + cta |
| **5장** | hook + info(narrative×3) + cta |
| **6장** | hook + intro + info(narrative×3) + cta |
| 7·8장 | 혼합형 (주제에 맞춰 writer가 판단) |

허용 범위 `3 ≤ cardCount ≤ 8`. 기본 권장은 3장 또는 5장.

## 출력

- `output/<YYYY-MM-DD>_<slug>/01_hook.png` … `NN_<type>.png`
- 사이즈: **1080 × 1350** (인스타그램 세로 4:5)
- 폰트: Pretendard (CDN)
- 테마별 컬러:
  - **dark**: 배경 `#0D0D0D`, 텍스트 `#FFFFFF`, 강조 `#0B78F8` (Brand 블루, 손글씨 언더라인)
  - **light**: 배경 `#FFFFFF`, 텍스트 `#191F28`, 강조 `#0B78F8` (Brand 블루)
- 로고:
  - `dark` → `design-system/assets/logo/logo_symbol_white.png`
  - `light` → `design-system/assets/logo/logo_symbol_blue.png`
  - `cta` 타입은 심볼 단독이 아니라 `design-system/assets/logo/logo_symbol+logo_blue.svg` 계열의 심볼+텍스트 로고 사용
  - `cta` 타입은 `design-system/assets/characters/cta-box-character.png` 캐릭터 에셋과 고정 카피 사용

## info 카드 디자인 방향 (modern_03 / Blunge-style)

- **좌측 정렬, 타이포그래피 중심.** pill 박스·불릿 마커 없음.
- `info-img` headline은 `h3` (`62px / 1.35 / 700`), body는 `body`
  (`45px / 1.6 / 500`)를 사용.
- `info-text` headline은 intro와 같은 `h2` (`72px / 1.3 / 800`), body는
  `body` (`45px / 1.6 / 500`)를 사용.
- 텍스트형 카드에 이모지를 쓰면 Tossface를 사용하고, 출처는 피드 캡션 하단에 표기한다.
- 내용 출처/evidence는 카드 안에 렌더하지 않는다. 내용 근거는 피드 캡션 하단에 모으고, 외부 사진/일러스트 같은 시각 자산 출처만 이미지 영역 안에 작게 표기한다.

## 실행 흐름

프로젝트 루트에서:

```bash
# 1. 의존성 (최초 1회)
npm install

# 2. spec 파일 → PNG 렌더
npm run generate -- <spec.json>

# spec을 stdin으로 넘겨도 된다
cat spec.json | npm run generate -- -
```

`run.mjs`는 내부적으로 `build-html.mjs` (spec→HTML) → `render.mjs` (HTML→PNG, Puppeteer) 순으로 호출한다.

## 에이전트가 이 skill을 호출하는 표준 패턴

1. (Step 1) `trend-researcher`가 주제 후보 제시 → **사용자 컨펌**
2. (Step 2) `feed-writer`가 caption+hashtags 출력 → **사용자 컨펌**
3. (Step 3) `card-author`가 콘텐츠 + 와이어프레임 + cards JSON spec 출력 → **사용자 컨펌**
4. (Step 4 design) `card-designer`가 레이아웃/이미지 슬롯 피팅 → layout preview 렌더
5. (Step 4 image) `graphic-designer`가 이미지 컨셉 제안 → 사용자 컨펌 → 이미지 생성/삽입 → 최종 렌더
6. output 경로를 사용자에게 공유

## 제약

- spec의 `cardCount`와 `cards.length`가 불일치하면 에러
- `theme`이 `dark|light`가 아니면 에러
- `type`은 `hook|intro|info|cta`를 기본으로 사용한다. legacy `problem|perspective|solution`은 기존 spec 호환용으로만 허용된다.
- `info.format`이 `list|narrative`가 아니면 에러
- `info.format=narrative`인데 `stage`가 빠지거나 `problem|perspective|solution` 밖이면 에러
- `highlight`는 대상 headline/title의 부분문자열이어야 강조 처리됨 (아니면 조용히 무시)
- 이미지/사진 합성은 범위 아님. 단, CTA의 고정 캐릭터 에셋은 렌더러가 자동 삽입한다.

## 주요 파일

- `SKILL.md` — 이 파일 (엔트리)
- `templates/base.html` — 공통 HTML 골격
- `templates/theme-dark.css` / `theme-light.css` — 테마 토큰
- `templates/card-types.css` — 카드 타입별 레이아웃 (hook/intro/info/cta)
- `scripts/build-html.mjs` — spec → 카드별 HTML 생성
- `scripts/render.mjs` — HTML → PNG (Puppeteer)
- `scripts/run.mjs` — 오케스트레이터 (build → render → 정리)
- `examples/sample-spec.json` — 수동 테스트용 샘플
