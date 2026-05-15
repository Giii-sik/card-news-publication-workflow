# Typography

## Type Tokens

Use these names consistently in samples, templates, and renderer CSS.

| Token | Size | Line-height | Weight | Primary Use |
|---|---:|---:|---:|---|
| `h1` | `92px` | `1.2` | `800` | Hook headline |
| `h2` | `72px` | `1.3` | `800` | Intro and CTA headline |
| `h3` | `62px` | `1.35` | `700` | Info title |
| `body` | `45px` | `1.6` | `500` | All body text |
| `body2` | `40px` | `1.6` | `400` | Reserved secondary body text; not used in current card-layout samples |
| `footnote` | `32px` | `1.5` | `400` | Quiet bottom notes; visual source notes only when required |
 
Keep letter spacing at `0`.

## Confirmed Hook Type System

Use this for image-led hook cards unless a specific design review changes it.

- Canvas: `1080 x 1350`
- Safe area: `100px` on all sides
- Logo: top-left, `178px` wide
- Headline block: `left/right 100px`, `bottom 112px`
- Headline width: `880px`
- Font: Pretendard Variable
- Size: `92px`
- Line-height: `1.2`
- Weight: `800`
- Letter spacing: `0`
- Highlight: `underline-brush-wave`. Keep the hook text white.

## Confirmed Intro Type System

- Intro does not use a Brand logo unless the user explicitly requests it.
- Title: `h2`, `72px`, line-height `1.3`, weight `800`
- Title should be 2 lines max in the default text-led intro layout.
- Body: `body`, `45px`, line-height `1.6`, weight `500`
- Body should be 3-4 short lines. A 5-line body needs an explicit layout memo.
- Footnote: `footnote`, `32px`, line-height `1.5`, weight `400`

## Confirmed Info Narrative Type System

- Title: `h3`, `62px`, line-height `1.35`, weight `700`
- Body: `body`, `45px`, line-height `1.6`, weight `500`
- `body2` may be used later for secondary text, but current layout samples do
  not use it.
- Footnote: `footnote`, `32px`, line-height `1.5`, weight `400`

## Confirmed Info Text Type System

- Title: `h2`, `72px`, line-height `1.3`, weight `800`
- Body: `body`, `45px`, line-height `1.6`, weight `500`
- Highlight: `underline-brush-wave` / `draw-underline`

## Confirmed CTA Type System

- Title: `h2`, `72px`, line-height `1.3`, weight `800`
- Body: `body`, `45px`, line-height `1.6`, weight `500`

## Card Type Mapping

- Hook: `h1`
- Intro: `h2`
- CTA: `h2`
- Info image: `h3`
- Info text: `h2`

## Layout Use

- Hook and CTA may use strong center or image-led composition.
- Info cards should prioritize scan speed and left alignment unless the chosen
  layout explicitly says otherwise.
- Body text may be 1-3 short lines. Do not force three lines when one or two
  lines read clearly.
- Evidence should be quiet and secondary.

## Safe Area

- Use a `100px` safe area on all four sides for text and foreground images.
- Background images may be full-bleed and ignore the safe area.
- When in doubt, place the text block inside `left/right 100px` and keep its
  top/bottom edges at least `100px` from the canvas edge.
