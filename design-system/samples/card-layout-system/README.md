# Card Layout System Sample

This sample exists to test layout families with dummy copy before turning any
layout into a reusable template.

## Template vs Sample

- Template: reusable empty structure. Use it when starting a new carousel.
- Sample: filled example. Use it to judge spacing, type scale, hierarchy, image
  slots, and overall mood.
- Sample copy must stay neutral dummy copy. Do not put an active series topic,
  current publishing copy, or real issue-specific wording into sample HTML.

This folder is a sample, not a template.

## Source of Truth

- Rendered PNGs in `output/` are the visual source of truth for future work.
- HTML/CSS in `html/` explains how each PNG is composed.
- When a new card뉴스 is mixed-format, approve one representative sample per type first, then apply the same rules to the remaining cards.
- When every info card uses the same format, approve one baseline card first, then continue the full set from that baseline.

## Current Text Tokens

| Token | Size | Line Height | Weight | Usage |
|---|---:|---:|---:|---|
| `h1` | 92px | 1.2 | 800 | hook title |
| `h2` | 72px | 1.3 | 800 | intro/info-text/cta title |
| `h3` | 62px | 1.35 | 700 | image+text info title |
| `body` | 45px | 1.6 | 500 | all body text |
| `body2` | 40px | 1.6 | 400 | reserved; not used in current samples |

## Info Text Box

- Current info-card layouts are limited to `info-img` and `info-text`.
- Current rendered samples use `body`, not `body2`. Keep `body2` as a reserved
  token for future secondary text needs.
- Image+text info cards use a fixed image area from `y=0` to `819px`.
- The lower text box uses `90px` top/bottom padding and `100px` left/right padding.
- The default image slot is the original transparency checkerboard placeholder
  shown in `03_info_img.png`. When the user says "원래 사용하던 이미지",
  "체크보드 플레이스홀더", or "격자 무늬 샘플이미지", use this checkerboard
  image slot, not a line-grid placeholder.
- In image+text cards, keep the title to one line and the body to three lines at most.
- Text-only info cards share the same `h2/body` tokens as intro, but not the
  exact same visual rhythm. Intro uses a lightbulb emoji cue above the title.
  `info-text` keeps a compact emoji cue when it helps scanning.

## Text-Only Info Cards

- Use a compact emoji at the top only when it improves scan speed.
- Emoji slots always use Tossface webfont.
- Every published post that uses Tossface must include this credit in the feed:
  `이 게시물에는 토스팀에서 제공한 토스페이스가 적용되어 있습니다.`
- 더 강한 시각 임팩트가 필요하면 `3d-graphic` 트랙을 사용한다 (별도 이모지
  객체 트랙은 운영하지 않음). 자세한 룰은
  `design-system/image-production/styles/3d-graphic.md`.
- Emoji set decisions are tracked in `design-system/emoji-assets.md`.
- Intro cards use `#1F2328` as a subtle background break from the main info
  cards, which keep the base dark background.

## Body Line Breaks

- Do not manually break after every sentence.
- Let text flow naturally until it approaches the safe width.
- Add a manual line break only when the next phrase would exceed the safe area or when a semantic break is needed for readability.
- Use the full safe width before breaking. Do not leave a short line if the next phrase fits naturally.
- Keep particles, numbers, percentages, and legal/tax terms with the words they qualify.
- Avoid awkward endings such as `에서`, `와`, `/`, or a lone auxiliary phrase at the end of a line.
- Image+text body: max 3 lines. Text-only body: max 4 lines, but 3 lines is preferred when the message still reads clearly.

Good:

```text
본문 더미 텍스트는 의미 단위가 자연스럽게 이어지도록
안전영역 안에서 줄바꿈합니다.
```

Avoid:

```text
본문 더미 텍스트는 의미 단위가
자연스럽게 이어지도록 줄바꿈합니다.
```

## Title Copy Ownership

- Stage 4 card design includes title copy development.
- Codex owns title refinement in this stage: rewrite wireframe titles when a clearer, more direct card title is possible.
- Keep the factual claim, card role, and highlight target intact. If the title changes, mirror the final title back into the working spec/wireframe.
- The goal is not to preserve the wireframe wording; the goal is to make the card understandable at a glance.

## Cards

| File | Layout Family | Purpose |
|---|---|---|
| `01_hook.png` | hook | 이미지 중심 첫 카드. 최대 3줄 훅 문장 안에서 언더라인 강조 1개를 보여줌 |
| `02_intro.png` | intro | optional context bridge |
| `03_info_img.png` | info-img | one idea / image support |
| `04_info_text.png` | info-text | text-only exception |
| `05_cta.png` | cta | save/check close |

## Folder

```text
design-system/samples/card-layout-system/
  README.md
  html/       # editable HTML/CSS source
  output/     # rendered PNG previews
```

Images in this sample are placeholders. Real generated images should be created
last and inserted after the layout is approved.
