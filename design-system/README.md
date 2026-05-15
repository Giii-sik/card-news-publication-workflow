# Brand Card-News Design System

This folder is the single source of truth for Brand card-news design decisions.
Use it before drawing wireframes, proposing image concepts, writing prompts, or
rendering custom HTML.

For research memory, source preferences, Instagram captions, hashtags, and
card-content writing, use `content-system/`.

## Folder Roles

- `card-news-rules.md` — quick source of truth for today's confirmed production
  rules.
- `brand.md` — positioning, color, logo, and visual signal rules.
- `typography.md` — confirmed type scale and safe-area rules.
- `underline.md` — reusable underline emphasis styles.
- `emoji-assets.md` — emoji slot rules (Tossface default, 3D Brand object 별도).
- `hook-image-system.md` — hook 이미지 스타일 시스템 + hook 카피 패턴 (samples/hook-image-system 자매 파일).
- `info-image-system.md` — info 이미지 스타일 시스템 (samples/info-image-system 자매 파일).
- `image-production/` — reusable image prompt records and production recipes.
- `card-layouts/` — layout system and rules by card family. Start with
  `card-layouts/README.md`.
- `samples/` — filled visual examples (카드 레이아웃·hook·info 이미지 시각 기준).
- `assets/` — reusable brand/logo/underline source assets.

> 2026-05-15 변경:
> - 콘텐츠 톤·카드 구조·리서치 트랙은 content-system 영역으로 분리
>   (`tone.md`, `content-patterns.md`, `research-tracks.md`).
> - `templates/` 폴더 폐기 — 빈 명세 시작점은 현행 워크플로(card-author
>   3.1~3.4 + spec-contract.md)에서 사용 안 함.

## Samples

`design-system/samples/`는 카드 레이아웃·hook·info 이미지의 시각 기준이
되는 채워진 예시(HTML + PNG). 새 카드뉴스의 시각 디자인을 판단하거나 검토할 때
먼저 samples를 본다.

> 2026-05-15: 루트 `samples/`에서 `design-system/` 하위로 이동.
> 빈 시작점(`templates/`) 폴더는 같은 날 폐기 — 현행 워크플로에서 미사용.

## Read Order

1. `card-news-rules.md`
2. `brand.md`
3. `typography.md`
4. `image-production/README.md`
5. `card-layouts/README.md`
6. The specific card layout file you need

## Card Order

Default:

```text
hook -> info x N -> cta
```

With optional context bridge:

```text
hook -> intro -> info x N -> cta
```

Use `intro` only when the audience needs a short "why this matters now" bridge
before the information cards.

## Asset Rule

Generated images must stay clean: no Korean text, no final logo, no baked
gradient, no page number. HTML/CSS owns typography, logos, gradients, and final
card composition.

## Image Timing

Card layout comes first. Image generation comes last.

- `card-designer` defines image slots and safe areas.
- `graphic-designer` proposes and generates images only after the layout is
  approved.
- Final images are inserted into the already-approved HTML/CSS composition.
