# Brand Card-News Rules

This file is the quick source of truth for producing Brand Instagram
card-news. Read this before making a new sample, layout, image prompt, or final
render.

## Workflow

디자인 단계(Step 4) 책임. **워크플로 단일 진실 소스는
[`AGENTS.md`](../AGENTS.md)** — 전체 4단계 다이어그램·도구 분담·컨펌 게이트·
산출 경로는 거기서만 갱신한다. 이 문서는 시각 영역 한정 빠른 안내.

- Step 1~3 (콘텐츠+와이어프레임, content-system 담당) → **Step 4 design phase `card-designer`** (시각 디자인+레이아웃+이미지 슬롯+placeholder) → **Step 4 image phase `graphic-designer`** (이미지 컨셉+트랙+생성+삽입+최종 PNG 렌더). 두 phase 모두 Claude/Codex 가능 — **실제 AI 이미지 생성만 Codex 호출.**
- 와이어프레임은 그리지 않고 `card-author`가 만든 것을 초안으로 받음.

### 시각 단계 핵심 룰

- Generated images must be clean source assets: no Korean text, no baked
  logo, no final card layout, no baked gradient, no watermark.
- Typography, logos, gradients, overlays, and final crop are owned by
  HTML/CSS.
- Pinterest or other external images may be used as references when they
  fit the topic, but final source use requires clear permission, licensing,
  user ownership, or explicit approval.
- Designer may adjust card copy tone / line breaks for visual rhythm
  (meaning preserved).

## Carousel Structure

Default:

```text
hook -> info x N -> cta
```

With optional context bridge:

```text
hook -> intro -> info x N -> cta
```

- `hook` is required.
- `cta` is required.
- `intro` is optional and appears only between `hook` and the first `info`
  card.
- Add new layout families only when repeated production needs prove they are
  useful.

## Visual Modes (전체 카드 시각 모드)

카드 단위로 적용 가능한 4가지 시각 모드. 한 시리즈에서 한 모드를 일관 적용
하되, 카드 단위 혼합 가능 (예: hook은 Image-Led Cover + info는 Minimal Editorial).

### Minimal Editorial

Text-led 카드, 높은 여백, 하나의 강한 강조 지점.

### Tool Guide

리스트 또는 추천 포맷, 컴팩트한 cue. 아이콘은 스캔에 도움될 때만.

### Image-Led Cover

깨끗한 생성·소싱 배경 이미지가 첫 카드를 받침. 렌더러가 한글 텍스트·로고·gradient·페이지 chrome 배치.

### Mixed-Media Workflow

제품 사진·컷아웃·시트·스튜디오 표면 등 ecommerce 오브젝트가 자연스러운 주제에 사용.

## Layout Rules

- 첫 카드는 phone 사이즈에서 이해 가능해야 함.
- Hook 카드는 기본적으로 카테고리 태그·날짜·페이지네이션 없음.
- 공간이 있다고 채우지 말 것.
- 텍스트를 복잡한 이미지 영역에서 떨어뜨림.
- Hook과 CTA는 고정 레이아웃 패턴 사용. Info 카드는 좌측 정렬 기본. `info-text`도 현재는 intro와 같은 좌측 정렬 리듬을 사용한다.
- Info 카드는 강한 헤드라인 + 짧은 body가 긴 블록보다 우선.
- 가장 빽빽한 카드를 폰트 사이즈·spacing 테스트 케이스로 삼음.
- 팔레트는 배경·텍스트·강조 2~3색만.
- 고정 타입 위계: `h1` hook / `h2` intro·info-text·CTA / `h3` info-img / `body` 본문 / `footnote` 출처.

## Type Tokens

| Token | Size | Line-height | Weight | Use |
|---|---:|---:|---:|---|
| `h1` | `92px` | `1.2` | `800` | Hook headline |
| `h2` | `72px` | `1.3` | `800` | Intro and CTA headline |
| `h3` | `62px` | `1.35` | `700` | Info title |
| `body` | `45px` | `1.6` | `500` | All body text |
| `footnote` | `32px` | `1.5` | `400` | Quiet non-source notes only |

- Letter spacing is always `0`.
- Use `word-break: keep-all` for Korean readability.
- Hook uses `h1`.
- Intro and CTA use `h2`.
- `info-img` uses `h3` title + `body` text.
- `info-text` uses intro-scale `h2` title + `body` text.
- Content sources are not displayed inside cards. Put content sources in the feed caption. Only required visual asset source credits may appear inside an image area.

## Color Tokens

| Token | Hex | Use |
|---|---|---|
| Primary / Brand Blue | `#0B78F8` | Brand, underline stroke, accent marks |
| Dark Background | `#0D0D0D` | Default dark cards |
| Light Background | `#FFFFFF` | Default light cards |
| Dark Text | `#191F28` | Text on light cards |
| White Text | `#FFFFFF` | Text on dark cards and white logos |

- Do not use neon green as an active accent.
- Do not change only the letter color for emphasis. Text emphasis uses an
  underline stroke while the letters stay white.
- Most cards should use dark background unless a deliberate contrast break is
  needed.

## Layout Families

| Family | Job | Default Visual Rule |
|---|---|---|
| `hook` | Stop scroll and name the issue | Full-bleed key visual |
| `intro` | Explain why this matters now | Text-led, underline allowed |
| `info-img` | Explain one idea with image support | Image is the emphasis |
| `info-text` | Explain one idea with text only | Text-led, underline allowed |
| `cta` | Fixed Instagram follow close | 3D box character + white wordmark |

- Current production uses only `info-img` and `info-text` for info cards.
- Use `info-text` only when image support would feel forced.

## Safe Area

- Canvas: `1080 x 1350`.
- Text and foreground images stay inside `100px` on all sides.
- Active content width is `880px`.
- Full-bleed background images are the only normal safe-area exception.
- If a foreground image intentionally breaks safe area, document the exception
  before rendering.

## Logo Rules

- Hook uses a top-left symbol + wordmark logo.
- Choose logo color from the actual logo area, not the whole card.
- Bright logo area: use blue logo.
- Dark logo area: use white logo.
- Intro and info cards do not use a Brand logo by default.
- CTA always uses the white symbol + wordmark logo.
- Never bake the Brand logo into generated images.

## Emphasis Rules

- The spec always carries a `highlight` substring (renderer needs the slice for
  layout intent), but **whether visual emphasis is applied depends on the
  layout family** below.
- Use one exact highlight substring per card.
- Use `underline-brush-wave` for text emphasis. Keep emphasized text white.

### Where visual emphasis is applied

| Layout family | Text emphasis |
|---|---|
| `hook` | `underline-brush-wave` default |
| `intro` | `underline-brush-wave` allowed |
| `info-text` | `underline-brush-wave` allowed |
| `info-img` | Not applied — image is the emphasis |
| `cta` | Not used |

### Why image-led cards skip text emphasis

When a visual object exists in an info card, that object carries the emphasis.
Underline emphasis on the headline competes with the image and splits the
viewer’s attention. The spec still keeps the `highlight` substring field for
contract integrity, but the renderer leaves the headline plain on image-led
info layouts.

### Other rules

- Do not use underline in body copy.
- Highlight substring must exactly match a slice of the corresponding `title`
  or `headline`.

## CTA

CTA is fixed unless the user explicitly asks for a different closing.

Headline:

```text
셀러에게 유익한 정보를
계속 받고 싶다면!
```

Body:

```text
@your_brand을 팔로우해보세요.
매주 커머스 관련 소식을 전달해드려요:)
```

Visual:

- Dark background `#0D0D0D`.
- 3D box character: `design-system/assets/characters/cta-box-character.png`.
- White symbol + wordmark logo.

## Production Checklist

- One card has one message.
- No pagination, date, or category tag by default.
- Keep page chrome minimal.
- Check the densest info card and CTA before finalizing.
- Final PNGs are `1080 x 1350`.
- Output folders keep final PNGs at root, HTML in `html/`, and clean generated
  assets in `assets/`.
- External visual references are documented with source URL and usage decision.
