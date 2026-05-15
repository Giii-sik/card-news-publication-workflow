# Card Layout System

This folder defines the reusable layout rules for Brand card-news. Treat these
as layout decisions, not image-generation instructions. Image concepts and
final image assets are decided after the layout is approved.

Rendered dummy-content examples live in
`design-system/samples/card-layout-system/output/`.

## Core Frame

- Canvas: `1080 x 1350`
- Safe area: `100px` on all sides
- Content width: `880px`
- Dark mode background: `#0D0D0D`
- Light background: `#FFFFFF`
- Dark text: `#191F28`
- Accent: 브랜드 액센트 블루 `#0B78F8`
- Highlight field: one exact substring per card for renderer intent
- Typography: Korean readability first, no negative letter spacing
- Generated images: clean assets only, no text, no logo, no baked gradient

## Safe Area Rule

- Text and foreground images must stay inside the `100px` safe area on all
  sides.
- The normal active layout area is therefore `880 x 1150`.
- Full-bleed background images are the only exception. They may extend to the
  full `1080 x 1350` canvas.
- If a foreground image intentionally bleeds out of the safe area, document it
  as an exception before rendering the sample.

## Carousel Structure

Default:

```text
hook -> info x N -> cta
```

With context bridge:

```text
hook -> intro -> info x N -> cta
```

Use `intro` only when the reader needs a short reason to care before the
information cards. Do not add it by habit.

## Layout Families

| Family | Required | Job | Image Use |
|---|---:|---|---|
| `hook` | yes | Stop scroll and name the issue | Full-bleed key visual |
| `intro` | optional | Explain why this matters now | Usually none |
| `info-img` | yes, as needed | Explain one idea with image support | Full top image area |
| `info-text` | exception | Explain one idea with text only | None |
| `cta` | yes | Close with fixed Instagram follow prompt | 3D box/shopping-bag character |

Add `info-list` later only when checklist or step cards become common enough to
need a dedicated rule.
Current production uses only `info-img` and `info-text` for info cards. Use
`info-text` only when image support would feel forced.

## Type Token Rule

- `hook` uses `h1`.
- `intro` uses `h2`.
- `cta` uses `h2`.
- `info-img` uses `h3` + `body`.
- `info-text` uses intro-scale `h2` + `body` because it has no image support.

## Image Slot Types

Use these names when handing work to `graphic-designer`.

| Slot | Use | Bounds | Safe Area Note |
|---|---|---|---|
| `full-bleed-key-visual` | Hook cover | Entire card | Lower 35-45% must stay readable |
| `object-stage` | One main 3D/object visual | Center or upper 60% | Keep text zone clear |
| `top-band` | Context image above text | Top 38-48% | Bottom copy stays text-led |
| `side-object` | Small support object | Right or lower-right | Avoid fighting headline |
| `icon-support` | Small symbolic cue | Near headline/list | Use only if it improves scanning |
| `none` | Pure typography card | N/A | Preferred for dense info |

## Selection Guide

- Need instant attention: `hook`
- Need "why now" before details: `intro`
- Need one explanation with still image support: `info-img`
- Need text only because no useful visual fits: `info-text`
- Need fixed Instagram follow close: `cta`

## Shared Rules

- One card = one message.
- Keep page chrome minimal. Hook has logo; body cards usually do not.
- Dates, category tags, and pagination are off by default.
- Dark info and CTA cards use the unified Brand dark background `#0D0D0D`.
- Intro cards use `#1F2328` as a deliberate bridge background unless a specific
  series needs the intro to merge with the surrounding cards.
- Light cards are exceptions for deliberate contrast breaks; accent stays Brand
  blue.
- Use underline emphasis only on text-led cards such as `intro` and
  `info-text`.
- Hook may use `underline-brush-wave` as the controlled text emphasis over a
  full-bleed image. Keep the hook letters white.
- Do not combine underline emphasis with normal image, video, metric, or
  object-led info cards. When a visual object exists, the object should carry
  the emphasis.
- If a layout feels crowded, split the information into another card before
  shrinking type.
- Layout preview uses placeholders. Real images are generated after approval.

## Wireframe Checklist

Before rendering a layout preview, each card should answer:

- What is the card's one-sentence job?
- Which layout family is it using?
- Where is the text block?
- Does it need an image slot?
- What part of the image must stay calm/empty?
- What exact substring is highlighted?
