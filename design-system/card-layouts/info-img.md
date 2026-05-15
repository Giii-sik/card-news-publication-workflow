# Info Image Layout

Purpose: explain one idea with a supporting still image or generated image
asset in the visual area.

## Use For

- problem framing
- perspective shift
- short explanation
- "why this matters" body cards
- image-supported policy, product, or ecommerce context

## Structure

- Split the card into an `image-area` and a `text-area`.
- Image area may bleed outside the safe area when it is used as a top visual
  band.
- Text area must stay inside the `100px` safe area.
- Title uses `h3`, max 1 line.
- Body uses `.body`, max 3 short lines.
- Do not place content sources in the bottom text area. Content sources go in
  the feed caption; only required visual asset source credits may appear inside
  the image area.
- One highlight substring only.
- Do not render underline emphasis when the card has an image area. The image is
  the emphasis.

## Suggested Type

- Safe area: `100px`.
- Title: `h3.headline`, `62px`, line-height `1.35`, weight `700`.
- Body: `.body`, `45px`, line-height `1.6`, weight `500`.
- Footnote, optional: `.footnote`, `32px`, line-height `1.5`, weight `400`,
  for quiet non-source notes only.

## Layout Modes

- `text-led`: headline and body only. Best for clean explanation.
- `top-band`: support image in the upper half, text below.
- `object-stage`: one object/scene centered or lower, text anchored away from it.

## Image Slot

Use an image only when it clarifies the idea. Define the slot, not the final
image:

- `top-band` for scene/context. In layout samples, use the original
  transparency checkerboard placeholder. Default sample area: `1080 x 819px`,
  full-bleed from the top edge, R `0px`.
- Default text area is the remaining bottom band: `1080 x 531px`, with
  `90px` top/bottom padding and `100px` left/right padding. This fits one `h3`
  line, one `34px` gap, and up to three `body` lines.
- When the user says "원래 사용하던 이미지", "체크보드 플레이스홀더", or
  "격자 무늬 샘플이미지", use the checkerboard placeholder from
  `design-system/samples/card-layout-system/output/03_info_img.png` as the default image slot
  reference. Do not replace it with a line-grid placeholder.
- `object-stage` for one symbolic object.
- `none` when copy already carries the message.

## Writing Rule

Do not overload one info card with multiple claims. If the title needs two lines
or the body needs more than three lines, split the message into another info
card or switch to a text-led layout.

## Do Not

- Do not turn image-supported info cards into dense data cards.
- Do not add CTA language.
- Do not place body copy over a visually noisy image.
- Do not combine the image with draw-underline or brush underline emphasis.
