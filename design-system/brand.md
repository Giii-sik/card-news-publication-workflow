# Brand Notes (Template)

> Replace this template with your own brand's notes. Every downstream workflow
> step (`trend-researcher`, `feed-writer`, `card-author`, `card-designer`,
> `graphic-designer`) references this file.

## Positioning

- Describe your brand's positioning in one or two lines.
- Define the voice: what it sounds like, what it avoids.
- Make it specific to your audience's daily work — generic SaaS voice will not
  carry the card-news format.

## Visual Signals

- Pick one primary accent color.
- Decide where the logo appears (e.g., CTA cards only, or hook + CTA).
- Prioritize clear typography over decorative UI.

## Color Tokens

- Primary accent: `#0B78F8` (placeholder — replace with your brand color).
- Dark mode background: `#0D0D0D`.
- Light background: `#FFFFFF`.
- Dark text: `#191F28`.
- White text: `#FFFFFF`.
- Define which colors are reserved for highlight/emphasis and which are off-limits.

## Logo Contrast Rule

- Define which logo variant is used on light vs. dark backgrounds.
- Judge the logo area itself, not the whole card. If the logo region is bright,
  use the dark logo variant even when the lower text area has a dark gradient.
- Do not bake the logo into generated images. Place the logo in HTML/CSS so the
  variant can change after the image is selected.

## What To Avoid

### Tone / Positioning

- Overclaiming product outcomes.
- Generic buzzwords with no concrete workflow behind them.

### Visual

- Generic SaaS gradient backgrounds.
- Editorial sameness (beige/brown drift).
- Fake UI text or dashboards.
- Decorative blobs or abstract objects that do not explain the audience's problem.
- Keyword-heavy hooks that try to say everything at once.
