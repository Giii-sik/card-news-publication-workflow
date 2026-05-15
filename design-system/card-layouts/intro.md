# Intro Layout

Purpose: bridge the hook and the information cards. Intro is optional.

Use intro only when the topic needs a short context layer:

- why this issue matters now
- what changed in the market/policy
- what lens the reader should use before checking details

## Structure

- Position: immediately after `hook`, before the first `info` card.
- Copy: one headline or question plus 3-4 short body lines.
- Alignment: left by default.
- Background: `#1F2328` by default, so intro reads as a bridge distinct from
  the main info cards.
- Logo: omitted by default.
- Footnote: optional, quiet, bottom-aligned inside the safe area.
- Group headline and body into one text box. Vertically center that text box
  inside the safe area after reserving the bottom footnote zone.
- Visual cue: use a lightbulb emoji above the title in the default sample.
  It signals "context first" before the information cards begin.

## Suggested Type

- Safe area: `100px`.
- Headline/question: `h2`, `72px`, line-height `1.3`, weight `800`.
- Body/twist: `body`, `45px`, line-height `1.6`, weight `500`.
- Footnote: `footnote`, `32px`, line-height `1.5`, weight `400`.
- Default sample: `h2.headline`, `72px`, line-height `1.3`, weight `800`.
- Default body: `.body`, `45px`, line-height `1.6`, weight `500`.
- Default footnote: `.footnote`, `32px`, line-height `1.5`, weight `400`.
- Prefer 2-line headlines when the wording can hold meaning without a third
  line.
- Use a CSS-drawn hand underline for the emphasized phrase. Avoid relying on a
  fixed underline asset unless the layout specifically needs the exact asset.

## Terminology

Use `footnote` for the small, quiet text at the bottom of a card. Avoid mixing
`caption`, `note`, and `helper text` in layout docs.

## Layout Modes

- `bridge-dark`: default. `#1F2328` background, white text, underline emphasis.
- `plain-dark`: exception. Use only when the intro must visually merge with
  surrounding info cards.
- `plain-light`: exception. Use only when a specific carousel needs a deliberate
  visual pause after a heavy hook.

## Image Slot

Default: `none`.

Intro can use a tiny `icon-support` cue only if the idea is hard to parse
without it. Avoid large images here; the job is context, not spectacle.

## Do Not

- Do not use intro as a second hook.
- Do not repeat the hook copy.
- Do not include dense data, long lists, or CTA language.
