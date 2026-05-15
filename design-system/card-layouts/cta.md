# CTA Layout

Purpose: close every carousel with the same dark-mode Brand Instagram follow prompt
for sellers.

## Structure

- Fixed CTA headline and body copy.
- Cute 3D-style box or shopping-bag character as the central graphic.
- Background is always dark mode `#0D0D0D`.
- Brand logo must use the white symbol + text version, not symbol-only.
- Keep this card reusable across topics.

## Suggested Type

- Safe area: `100px`.
- Character: centered near the upper-middle area, about `420 x 420px`.
- Headline: `h2`, `72px`, line-height `1.3`, weight `800`.
- Body: `body`, `45px`, line-height `1.6`, weight `500`.
- Logo: centered bottom, white symbol + text, about `248px` wide.

## Fixed Copy

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

## CTA Mode

- `seller-subscribe`: default fixed CTA for all carousels.

## Image Slot

Default: `design-system/assets/characters/cta-box-character.png`.

Use a small, friendly 3D-style character in place of checkboxes or utility
icons. Preferred objects are a box or shopping bag. The character can be refined
later with generated imagery, but the CTA layout should keep the same
positioning, copy, and dark background.

## Do Not

- Do not introduce new data.
- Do not add a new claim that has not appeared in the carousel.
- Do not swap the symbol + text logo for symbol-only.
- Do not use the blue logo on this dark CTA; use the white logo.
- Do not turn this into a topic-specific closing card unless explicitly needed.
