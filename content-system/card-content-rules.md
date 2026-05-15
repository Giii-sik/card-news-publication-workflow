# Card Content Rules

`card-author` (Step 3) owns card-news structure, card copy, highlights, ASCII
wireframe, and the final JSON spec.

## Job

Convert confirmed research and feed direction into:

1. Card-by-card content (headline / body / source per card)
2. JSON spec
3. ASCII wireframe with image-slot binary marker (있음 / 없음)

`card-author` does not pick visual style, propose image concepts, generate
images, or render cards. Those belong to Step 4 (`card-designer` 디자인 phase
+ `graphic-designer` 이미지 phase, 둘 다 Claude/Codex 가능 — AI 이미지 생성만 Codex 전담).

## Default Structure

```text
hook -> info x N -> cta
```

Use optional intro only when the audience needs a short context bridge:

```text
hook -> intro -> info x N -> cta
```

## Card Roles

- `hook`: stop scroll and name the issue.
- `intro`: explain why this matters now. Do not write a second hook.
- `info`: one idea per card. State the takeaway directly.
- `cta`: fixed Brand follow close.

## Copy Rules

- Hook should be short, semantic, and readable at phone size.
- Info headlines should read as takeaways, not labels.
- Body copy should explain only what the headline needs.
- Evidence should be quiet and short.
- Use one exact highlight substring per card.
- Do not invent numbers, dates, policy details, or product claims.
- If a claim needs a source and no source exists, remove or soften it.

## JSON Spec Handoff

The final output to Step 4 (`card-designer` + `graphic-designer`) is one JSON
object **plus** an ASCII wireframe text file. Full schema and validation rules
in [`spec-contract.md`](spec-contract.md). Process spec for the 4 sub-stages
owned by `card-author` (3.1/3.2/3.3/3.4) in
[`../agents/card-author.md`](../agents/card-author.md), plus the 3.5 caption
check owned by `feed-writer` in
[`../agents/feed-writer.md`](../agents/feed-writer.md) "Step 3.5" 섹션.

Summary schema:

```json
{
  "topic": "한 줄 주제",
  "slug": "kebab-case-slug",
  "theme": "dark",
  "cardCount": 5,
  "caption": "인스타그램 본문",
  "hashtags": ["#이커머스", "#셀러"],
  "cards": [
    { "type": "hook", "title": "...", "highlight": "..." },
    {
      "type": "intro",
      "headline": "...",
      "body": "...",
      "highlight": "..."
    },
    {
      "type": "info",
      "format": "narrative",
      "stage": "problem",
      "headline": "...",
      "highlight": "...",
      "body": "...",
      "evidence": "출처/근거 1줄"
    },
    { "type": "cta", "title": "...", "body": "...", "logo": true }
  ],
  "sources": [
    { "title": "...", "url": "https://...", "publishedAt": "YYYY-MM-DD" }
  ]
}
```

