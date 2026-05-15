# Info Image System Sample

This folder is the working sample for images used inside info cards.

Unlike hook images, info images should support the explanation rather than
carry the whole card. Use this folder for web free images, photo-composite,
reality-composite, or generated 3D assets that sit inside the info-card image
slot.

Central decision guide:
`design-system/image-production/info/style-system.md`

## Status

- Confirmed direction: reality/photo-composite belongs here, not in hook image
  samples.
- Hook images stay limited to 3D/diorama or illustration.
- Info image samples should be judged together with the lower text box from
  `design-system/samples/card-layout-system/output/03_info_img.png`.
- CSS mockup is not part of the current info-image system.
- Uploaded people/editorial references live in `references/`. They are used for
  visual direction only, not as final card assets.

## Style Tracks

| Track | Purpose | Default Use |
|---|---|---|
| `web-free-image` | Free stock/photo source with standard crop and tone treatment | real objects, spaces, people actions |
| `reality-composite` | Photoreal generated/editorial scene | tax, fee, settlement, policy metaphors |
| `photo-composite` | Free image base plus edited/generated props | when a real scene needs one extra explanatory object |
| `3d-graphic` | 3D object or cinematic mascot scene | abstract ideas, deadlines, comparisons, platform rivalry |
| `text-led` | No image | legal/procedural cards where text is clearer |

Parked:

- `illustration` remains documented, but is not a default track.

## Outputs

- `output/01_info_expense_evidence_reality_composite.png` — expense evidence
  theme applied to a reality-composite info card.
- `output/02_info_market_race_3d_graphic.png` — 3D mascot-action sample for a
  market leader/chaser concept.

## Source Assets

- `assets/01-info-reality-composite-clean.png`
- `assets/02-info-market-race-3d-chase.png` — cinematic mascot action for
  "단독1위 쿠팡 vs 네이버 맹추격" topic. Coupang dashes with jetpack;
  Naver chases in panic. Server/circuit-board world, workbench foreground.
  Brand cues are characterized (no flat-label logos).

## Reference Notes

- `references/reference-notes.md` — uploaded editorial people-photo references
  and what to borrow from them.

## Rules

- Image area: `1080px × 819px`.
- Lower text box: `90px` top/bottom padding and `100px` left/right padding.
- Title: one line.
- Body: up to three lines. One or two lines are fine when the message reads
  clearly.
- Body line breaks follow `design-system/samples/card-layout-system/README.md`
  `Body Line Breaks`: do not manually break after every sentence, let text
  flow until it approaches the safe width, and add a manual break only when a
  semantic break or width limit requires it.
- Do not put Korean text, exact figures, or external logos inside generated
  images. HTML owns all final information.
- Exception: `02-info-market-race-3d-clean.png` uses Coupang/Naver
  brand-feature character cues after explicit user approval for this sample on
  2026-05-15. Do not use white sticker/pill logo patches; if brand cues are
  approved, make the character itself carry the shape, color, storefront, or
  molded mark.
- 이미지 출처 표기는 `_image-plan.md`에 기록하고, 필요하면 피드 캡션에도 남긴다.
  카드 안 표기는 라이선스가 요구하거나 사용자가 승인한 경우에만 쓴다.
