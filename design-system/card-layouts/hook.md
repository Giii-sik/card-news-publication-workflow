# Hook Layout

Purpose: stop the scroll and make the topic understandable within one second.

## Structure

- Full-bleed key visual fills the `1080 x 1350` frame.
- Brand wordmark sits at top-left.
- Logo variant follows the logo contrast rule: blue on bright image areas,
  white on dark image areas.
- Headline sits in the lower safe area.
- One exact highlight substring carries the emphasis.
- Default: use `underline-brush-wave` with white headline text.
- Do not use colored text as the normal hook emphasis.
- Bottom gradient is added in HTML/CSS only.

## Confirmed Rule

```text
safe area: 100px
logo: top 100px / left 100px / width 178px
headline: 92px / line-height 1.2 / weight 800
headline block: left 100px / right 100px / bottom 112px
```

## Copy Shape

Prefer 1-3 semantic lines based on the hook sentence. Do not force 3 lines.

```text
스마트스토어
수수료정책 바뀌고
꼭 알아야 하는 것
```

Highlight only the phrase that carries the topic tension, for example
`수수료정책`. Do not highlight the whole sentence. Keep the text itself white
and use the underline as the emphasis.

## Image Slot

- Slot name: `full-bleed-key-visual`
- Style: `3d-graphic`/diorama or `pixel-illustration`
- Requirement: lower text area must be visually calm enough for white type
- Source asset: no Korean text, no logo, no bottom gradient
- Placeholder for layout samples: use a clean transparency grid image so the
  HTML gradient and logo contrast can be reviewed.

## Use When

- The carousel needs a strong first impression.
- The topic can be represented by one clean object or scene.
- The headline is short enough to read at phone size.

## Do Not

- Do not bake Korean text into generated images.
- Do not bake the Brand logo into generated images.
- Do not bake the bottom gradient into source assets.
- Do not add category tags, dates, or pagination unless explicitly approved.
