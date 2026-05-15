# Image Production

This folder stores reusable image-production rules, style-specific production
notes, reference decisions, and prompt recipes for Brand card-news.

Use this before writing image prompts, collecting references, generating
assets, or inserting images into HTML.

## Folder Roles

- `styles/` — image style definitions and production rules that keep evolving
  over time.
- `hook/` — hook background and key-visual prompt records, grouped by style.
- `info/` — info-card image prompt records and source/research rules.
- `cta/` — future CTA character or closing visual prompt records.

## Design System vs Samples

- `design-system/image-production/styles/` = what each image style looks like,
  when to use it, and how to reliably produce it.
- `design-system/image-production/{card-type}/{style}/` = concrete prompt
  recipes for specific topics or card slots.
- `design-system/samples/` = rendered examples, clean source PNGs, HTML compositions, and
  visual proofs.

In short:

- `image-production/styles` = style guide + production guide by style
- `image-production/styles/3d-cinematic-mascot-action.md` = 3D 브랜드/플랫폼
  경쟁 장면처럼 큰 캐릭터, 표정, 동작, 배경 밀도가 필요한 이미지 제작법
- `image-production/hook/...` = actual recipes
- `image-production/info/style-system.md` = info image track and style choice
  guide
- `samples` = preview outputs

## Clean Source Asset

A clean source asset must have:

- no readable text
- no Korean typography
- no Brand logo
- no final card layout
- no burned-in gradient overlay
- no pagination
- no watermark

Exception:

- If the user explicitly approves external brand cues for a sample/series, a
  clean source asset may include brand-feature character cues. They must be
  integrated into the character body or surface, not pasted as a white sticker,
  floating logo, or flat label.

## Naming

Prompt recipes use:

```text
image-production/{card-type}/{style}/{topic-or-use}.prompt.md
```

Examples:

- `hook/3d-graphic/fee-policy.prompt.md`
- `hook/pixel-illustration/fee-policy.prompt.md`
- `info/reality-composite/fee-policy.prompt.md`
- `info/3d-graphic/naver-smartstore-fee-reform.prompt.md`

Reference notes use:

```text
{topic-or-use}-pinterest-reference.md
```

Temporary baked previews use:

```text
{topic-or-use}-baked-temp.png
```

## Prompt Record Rule

Every confirmed generated image style should have a matching `*.prompt.md`
record here.

The prompt record should explain:

- purpose: what card and slot the image supports
- prompt: the actual or reconstructed prompt
- scene/backdrop: where the image happens
- subject: main object, person, or metaphor
- style: web free image, reality composite, photo composite, 3D graphic,
  or another confirmed style
- composition: safe area, lower text zone, logo zone, crop guidance
- avoid list: text, logos, watermark, baked gradient, final layout, etc.

The sample `.png` is the visual proof. The `.prompt.md` here is the reusable
generation recipe.

## Rendering Rule

HTML/CSS owns:

- Korean text
- highlights and underlines
- Brand logo
- gradients and overlays
- pagination
- final cropping and safe area

The image model owns only the clean background or object layer.

## Process Rule

Generate images only after the card layout has been confirmed.

- `card-designer` defines the image slot, safe area, and placeholder.
- `graphic-designer` proposes image concepts and waits for user confirmation.
- After approval, `graphic-designer` creates the clean source asset, saves it
  in the working output/sample `assets/`, inserts it into HTML, and re-renders
  the final PNG.

## Pinterest / External Reference Rule

Pinterest can be used when it has a visual reference that fits the card topic
or image style.

- Default use: style, composition, mood, object, or texture reference.
- Final source use: allowed only when the image is owned by the user, licensed,
  public-domain/clearly reusable, or otherwise explicitly approved for use.
- Do not treat a Pinterest pin as automatically reusable. Pinterest often points
  to someone else's image, so capture the original source URL when possible.
- Do not hotlink Pinterest images in HTML.
- If using a Pinterest image as a reference, save a short note with source URL,
  visual takeaway, and whether it is `reference-only` or `usable-source`.
- If the rights are unclear, generate a new clean image inspired by the
  reference instead of embedding the pinned image.

## Brand Logo Gating Rule

External brand logos (다나와, 에누리, 네이버, 쿠팡, 등) carry trademark risk
when used inside Brand-published content.

- **Default = do NOT use external brand logos directly.** Use stylized
  abstractions, generic mascots, or the brand color palette only.
- **Per-series user authorization:** if the user explicitly approves direct
  logo use for a given series (e.g. "이번 시리즈는 다나와·에누리 로고 직접 사용
  OK"), record the authorization in `_image-plan.md` with date and series slug.
- Authorization is per-series, not permanent. The next series resets to
  default = no direct logo use.
- Even with authorization, never use the logo of a brand that competes with
  Brand's seller persona partners or could imply false endorsement.

## Track Decision

Before writing any image prompt or downloading any photo, decide which track
to use. See [`decision-tree.md`](./decision-tree.md).

- `web-free-image` — concrete real-world subject → Codex handles via
  [`info/web-free-image-system.md`](./info/web-free-image-system.md)
- `reality-composite` — photoreal editorial metaphor → Codex generates
- `photo-composite` — free/photo source plus edited or generated props → Codex
  composes
- `3d-graphic` — strong visual metaphor → Codex generates
- `text-led` — image weakens message → no image (`info-text` layout)

Removed / parked:

- `css-mockup` — removed from the system.
- `illustration` — parked; keep the record, but do not use as a default track.

## Relationship To Samples

- `design-system/image-production/` keeps reusable recipes and decisions.
- `design-system/samples/` keeps actual preview files: clean PNGs, HTML compositions, and
  rendered outputs.

When a sample proves useful, move or copy its prompt record here and update the
sample README to point to the central record.
