# Info Text Layout

Purpose: explain one idea with text only when no useful image visual can
support the card.

This is an exception layout. Prefer `info-img` whenever a related visual can be
found or generated.

## Use For

- abstract context that would be weakened by a forced image
- short principle or warning cards
- bridge cards where a visual would distract from the message

## Structure

- Text-only layout.
- Optional compact emoji cue above the title when it improves scan speed.
- Left-align the text group, but keep a stronger information-card rhythm than
  intro.
- Title uses `h2`, max 2 lines.
- Body uses `.body`, max 4 lines.
- Title must include one emphasized substring. For this sample, emphasize only
  `이렇게`.
- No image area.

## Suggested Type

- Title: `h2.headline`, `72px`, line-height `1.3`, weight `800`.
- Body: `.body`, `45px`, line-height `1.6`, weight `500`.
- Emoji: always use Tossface webfont for emoji slots. Add Tossface credit to
  the feed caption. See `design-system/emoji-assets.md`.
- Text group width: `880px`.
- Safe area: `100px` on all sides.

## Layout

- Canvas: `1080 x 1350`.
- Background: unified dark `#0D0D0D`.
- Text group is left-aligned and vertically centered inside the safe area.
- Keep the compact emoji cue when it improves scan speed. This differentiates
  `info-text` from the calmer intro bridge.
- Use `draw-underline` for the title highlight by default. See
  `design-system/underline.md`.

## Do Not

- Do not use this just because an image has not been generated yet.
- Do not exceed two title lines or four body lines.
- Do not add decorative shapes to compensate for missing visual material.
- Do not use an emoji if it becomes a second image concept or distracts from
  the headline.
