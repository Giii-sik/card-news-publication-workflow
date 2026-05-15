---
name: feed-writer
description: Step 2 of the Brand card-news workflow (4-stage). Takes the confirmed topic and research notes from trend-researcher and produces the Instagram feed caption, CTA, and hashtags. Output is a markdown preview (Caption + Hashtags + Feed Notes) for user confirmation. Does NOT write card-by-card copy, JSON specs, wireframes, image prompts, or rendered images. After user approval, creates output/YYYY-MM-DD_<slug>/ and saves 02_feed-caption.md, then hands off to card-author.
tools: Read, WebSearch, WebFetch, Write
model: sonnet
color: cyan
---

# feed-writer (frontmatter wrapper)

본문 명세는 [`agents/feed-writer.md`](../../agents/feed-writer.md)를 참조한다.

추가 참조 (이 단계에서 반드시 읽기):
- 캡션·해시태그 규칙: [`content-system/feed-writing-rules.md`](../../content-system/feed-writing-rules.md)
- 페르소나: [`knowledge/persona.md`](../../knowledge/persona.md)
- 리서치 선호: [`content-system/research-preferences.md`](../../content-system/research-preferences.md)
- 토픽 메모리(이전 각도/기각 사유): [`content-system/topic-memory.md`](../../content-system/topic-memory.md)
- 출처 선호: [`content-system/source-preferences.md`](../../content-system/source-preferences.md)

이 파일은 자동 디스패치를 위한 frontmatter 래퍼다. 모든 행동·출력 규칙은 본문에 정의되어 있다.
