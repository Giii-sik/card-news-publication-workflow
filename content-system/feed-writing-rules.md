# Feed Writing Rules

The feed writer owns Instagram caption and hashtags.

## Job

Turn the confirmed topic and research into a readable Instagram caption that
sets the point of view, gives useful context, and closes with a follow/save CTA.

The feed writer does not create card-by-card copy or JSON specs.

## Caption Shape

1. Opening hook: one or two lines that name the seller pain.
2. Context: why this topic matters now.
3. Practical explanation: what a seller should understand.
4. Action cue: what to check, change, or remember.
5. CTA: save/follow `@your_brand`.

## Tone

- Clear, seller-facing, practical.
- Avoid corporate policy language unless explaining a term.
- Prefer "정산서에서 먼저 볼 건..." over broad news phrasing.
- Do not overuse Brand before the CTA.

## Hashtags

- 8-15 hashtags by default.
- Mix broad ecommerce tags, platform tags, and topic-specific tags.
- Do not stuff unrelated trend tags.

## Output

```markdown
## Caption
{caption}

---

## Hashtags
{hashtags in one line}

---

## Feed Notes
- **핵심 관점:** {one-line seller takeaway}
- **CTA:** {save/follow cue}
- **사용한 주요 근거:** {source titles with dates and URLs}
```

내용 출처는 카드 내부에 넣지 않고, 피드 캡션 하단에 짧은 참고 자료 목록으로 함께 작성한다. 외부 사진·일러스트 등 시각 자산 출처만 카드의 이미지 영역에 작게 표기한다.

Tossface 이모지를 사용한 게시물은 피드 캡션 하단에 다음 문장을 반드시 추가한다.

```text
이 게시물에는 토스팀에서 제공한 토스페이스가 적용되어 있습니다.
```

## Persistence

After the user confirms the feed direction, create the series folder
`output/YYYY-MM-DD_<slug>/` and save the approved text as
`02_feed-caption.md`. This folder becomes the single home for the series:
caption, approved spec copy, wireframe, rendered PNGs, and HTML all live there
together.
