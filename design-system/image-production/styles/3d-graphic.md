# 3D Graphic

Style and production rules for making Brand 3D graphic images.

## Style Definition

Use for polished hook covers and info-card images where the topic should feel
concrete, character-led, or scene-led.

## Best For

- tools
- automation
- AI/product updates
- revenue/data topics
- strong first-card visual hooks
- info cards where a metaphor (e.g. "fees leaking", "two paths splitting") can
  be expressed as a single 3D scene
- brand/product competition scenes that need expressive mascots, motion, and a
  vivid environment

## Core Production Pattern

- Start from the scene thesis, not from a prop list. The viewer should
  understand the relationship before reading the card.
- Use premium 3D objects or mascots with expressive eyes, readable emotion, and
  clear body language.
- For calm explainers, build around practical seller objects: laptop,
  calculator, receipt, parcel box, shopping bag, small charts, product samples.
- For competitive/news scenes, build an immersive environment: logistics room,
  server room, storefront desk, control center, warehouse, marketplace race, or
  product workspace.
- Brand cues, when explicitly approved, must be part of the character design:
  body shape, color blocking, molded mark, storefront form, or printed front
  surface. Do not paste a flat sticker, white pill label, or floating logo onto
  a finished character.
- Use strong photographic lighting, depth, foreground/background layers,
  texture detail, and motion cues. Clean does not mean empty.
- Hook images may reserve a calm lower area for headline overlay. Info-card top
  images do not need a dark text-safe lower band because the text sits below the
  image.

## Confirmed Sample

- `design-system/samples/hook-image-system/output/01_hook_3d.png`
- Source: `design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png`

This is the **material/quality anchor** for Brand 3D images. Reference it in
every prompt when possible, but do not copy its palette or calm composition
when the card needs a cinematic mascot-action scene.

---

## Prompt Engineering Rules (v2 — 2026-05-06)

Based on the 2026 prompt research for OpenAI gpt-image and similar models.
Apply these to every 3D image prompt.

### Rule 1 — Attach the style anchor as a quality reference

Pass `design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png` as a reference
image input to the model alongside the text prompt. Text alone is unreliable
for matching the established render quality and surface treatment.

For Quiet Object images, the anchor may guide palette and composition. For
Cinematic Mascot Action images, the anchor should guide only material quality,
rounded character polish, and photographic finish; the scene, colors, motion,
and environment should follow the topic.

When the model does not support image inputs, link the path in the prompt and
write a strong "preserve" instruction:

```
Reference: design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png
Use this as a material and finish reference: rounded tactile 3D surfaces,
photographic lighting, polished character quality. Do not copy the calm
composition or restricted palette when the topic requires action or brand
colors.
```

### Rule 2 — Choose the correct style block

Do not force every 3D image into one minimal desk-object style. Pick one of the
two blocks below based on the card need.

#### A. Quiet Object Block

Use for calm explainers, tax/fee objects, simple metaphors, and cards where the
image must stay secondary to the text.

```text
STYLE BLOCK — Quiet Object:

Render: premium 3D, soft matte clay-like surfaces, subtle subsurface scattering,
photographic realism, slight imperfection in surface highlights.

Camera: 50mm prime lens, f/4 aperture, slight depth-of-field bokeh on background.

Lighting: warm desk/studio key light, soft cool fill, controlled rim light.

Color palette: warm wood / desk neutral mid-tones, restrained accent color only
where the message needs it.

Surface finish: rounded corners on all objects, slight wear/tactile detail,
matte over glossy.

Reference: design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png — match
its rounded material quality and polished lighting.
```

#### B. Cinematic Mascot Action Block

Use for AI/news, platform rivalry, app/product updates, brand-feature
characters, or any topic where the image has to feel alive.

Full recipe: [`3d-cinematic-mascot-action.md`](./3d-cinematic-mascot-action.md)

```text
STYLE BLOCK — Cinematic Mascot Action:

Render: premium cinematic 3D mascot scene, soft rounded character bodies,
expressive eyes and brows, tactile plastic/clay surfaces, realistic props and
environment detail.

Camera: close 35mm-50mm lens, low-to-mid character eye level, dynamic action
framing, shallow depth of field, foreground and background layers.

Lighting: bright cinematic key light, colored practical lights from screens or
devices, warm highlights, cool fill, visible rim light on character edges.

Environment: build a believable world around the topic, not a blank tabletop.
Use monitors, cables, server racks, keyboards, tools, warehouse props, store
fixtures, smoke/dust/motion trails only when they clarify the action.

Character design: brand or product cues are integrated into the character's
body shape, material, color blocking, storefront form, molded mark, or printed
front surface. The mark must feel manufactured with the character, not pasted on
afterward.

Action: characters should be doing one clear thing: chasing, escaping,
protecting, repairing, carrying, racing, lifting, comparing, or reacting.

Color palette: allow saturated brand colors when the topic requires them. Do
not force every image into 브랜드 액센트 블루. Keep the full scene balanced with
realistic neutrals and shadows.
```

### Rule 3 — Use labeled segments, not paragraphs

Long paragraphs cause models to drop or misinterpret instructions. Split every
prompt into short labeled segments:

```text
Subject:
[one-line core object]

Composition:
- [framing / placement]
- [scale / proportion]
- [lower-area treatment]

Action / Motion (optional):
[one line]

Avoid:
[explicit list — text, numbers, logos, watermark, baked layout, extra colors]
```

### Rule 4 — Character energy is required for mascot scenes

For mascot scenes, the character must have:

- a clear expression (confident, worried, chased, focused, surprised)
- a clear pose/action
- a clear relationship to the secondary character or object
- integrated brand/product cues if approved

Static toy-on-desk images are only acceptable for quiet object explainers.

### Rule 5 — Lock with preservation language for character series

When the same character or scene element repeats across cards (e.g. mascot,
storefront object), say so explicitly each time:

```text
Same mascot as the hook image — same proportions, same outfit, same color
palette. Do not redesign the character.
```

### Rule 6 — Photography language beats generic style words

| Avoid (vague) | Use (specific) |
|---|---|
| "high quality" | "50mm prime, f/4, photographic realism" |
| "8K" | (omit — meaningless to most models) |
| "premium look" | "soft matte clay surface, subsurface scattering, controlled rim light" |
| "professional" | "studio lighting, neutral midtones, no harsh shadows" |
| "minimal" | "single hero subject, 70% negative space, calm lower frame" |

### Rule 7 — Iterate one variable at a time

If first generation is close but not right, change only one thing per retry —
not the whole prompt. Common surgical tweaks:
- "Move the subject 10% lower in the frame"
- "Shift the key light from upper-left to upper-right"
- "Reduce the size of the secondary objects"

### Rule 8 — Quality and reproducibility

- Use `quality: high` for any final card image.
- If the model supports seed control, log the seed of any approved image so
  the same scene can be re-generated for revisions.
- Save the final prompt verbatim in the matching
  `image-production/{card-type}/{style}/{topic}.prompt.md` for reuse.

---

## Prompt Template (use this as starting point)

```text
[STYLE BLOCK — choose Quiet Object or Cinematic Mascot Action above]

Subject:
[one line — single hero object or scene]

Composition:
- Hero subject placed in upper [60% / center / left third]
- [Scale and orientation specifics]
- For hook: lower 25–30% may stay calmer for headline overlay
- For info-card image band: prioritize the image scene; text lives below

Action / Motion (optional):
[one line — e.g. "small coins spilling diagonally toward lower-left, slight motion blur"]

Color / Brand cues:
[state whether this is neutral Brand accent only or approved brand-feature
character design]

Reference image:
attached — design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png — use as
material/quality reference, not as a palette/composition cage.

Avoid:
- readable Korean or English text of any kind
- numbers
- Brand logo, brand marks of Naver / Coupang / etc. unless explicitly approved
  for this series
- watermark, page number, baked gradient overlay
- flat white sticker/pill logo labels pasted onto 3D characters
- blocking the card's intended text area when the image is used as a hook cover
```

---

## Common Risks

- Too much fake UI detail.
- Real brand marks appearing on devices or props (unless explicitly approved).
- Character becoming too childish for seller/business content.
- Character becoming too static, clean, or toy-like when the concept needs
  rivalry/action.
- Flat logo stickers or white label patches breaking the 3D material realism.
- Lower headline area becoming too visually busy.
- Style drift across a series → fix with style anchor + STYLE BLOCK.
- Vague descriptors → fix with photography language.

## Confirmed Recipes

- `../hook/3d-graphic/fee-policy.prompt.md`
- `../info/3d-graphic/naver-smartstore-fee-reform.prompt.md` (v2 — needs
  retrofit to the new STYLE BLOCK + template above)
- `../info/3d-graphic/market-leader-chaser.prompt.md` — cinematic mascot action
  direction for platform rivalry.
