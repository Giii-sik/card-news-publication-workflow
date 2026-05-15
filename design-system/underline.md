# Underline Styles

Use underline styles for emphasis inside title text. They are HTML/CSS
composition elements, not generated image assets.

## underline-brush-wave

Use `underline-brush-wave` for strong title emphasis. It is based on a thick
blue hand-drawn wave stroke: uneven, brush-like, and slightly playful without
becoming decorative.

This replaces the older rectangular highlighter-style underline.

Source asset:

- `design-system/assets/underline/underline_brush_wave.svg`

Recommended CSS pattern:

```css
:root {
  --underline-brush-wave: url("design-system/assets/underline/underline_brush_wave.svg");
}

.underline-brush-wave,
.draw-underline,
.underline-01 {
  display: inline;
  color: #ffffff;
  padding: 0 0.03em 0.08em;
  background-image: var(--underline-brush-wave);
  background-position: left 0 bottom 0.01em;
  background-size: 100% 0.38em;
  background-repeat: no-repeat;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
```

Rules:

- Use on one emphasized title substring only.
- Prefer it on `info-text` and `intro` cards.
- Hook cards may use it as the controlled text emphasis over a full-bleed
  image. Keep the text itself white and use the underline as the only accent.
- Do not use underline emphasis on normal info cards with a main image, video,
  metric graphic, or 3D/object visual. Let the visual carry the emphasis
  instead.
- Do not use it in body copy.
- Keep the underline in 브랜드 액센트 블루 `#0B78F8`.
- Use a single wavy brush path only. Do not add a second straight/flat support
  stroke underneath it.
- Treat the SVG as a scalable brush source. Adjust placement and height in CSS,
  not by editing each card image.

## Size Guidance

- Default: `background-size: 100% 0.38em`
- `h1` hook: `background-size: 100% 0.36-0.40em`
- `h2` intro/CTA title: `background-size: 100% 0.34-0.38em`
- `h3` info title: `background-size: 100% 0.32-0.38em`

If the underline starts to look like a solid rectangle, reduce height or use a
more irregular SVG path. If it touches too much of the glyph, lower the
background position or increase bottom padding slightly.
