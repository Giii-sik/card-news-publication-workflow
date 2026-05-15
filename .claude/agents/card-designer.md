---
name: card-designer
description: Step 4 (design phase) of the Brand card-news workflow (4-stage). Takes the confirmed JSON spec + ASCII wireframe from card-author, decides visual treatment, defines image slots, and renders placeholder layout previews via HTML/CSS. Hands off to graphic-designer (Step 4 image phase) for image concepting, generation, insertion, and final 1080×1350 PNG render. **Claude and Codex are both eligible** — this is HTML/CSS·layout work, not image generation. May adjust copy tone / line breaks for visual rhythm (meaning preserved). Does NOT change facts, numbers, sources, or card count. Step 4 is intentionally split into two phases — design (card-designer) and image (graphic-designer) — and the two body specs are kept separate by design.
tools: Read, Write, Bash
model: sonnet
color: purple
---

# card-designer (frontmatter wrapper)

본문 명세는 [`agents/card-designer.md`](../../agents/card-designer.md)를 참조한다.

추가 참조:
- 카드 타입 규칙: [`content-system/card-structure-patterns.md`](../../content-system/card-structure-patterns.md)
- 디자인 시스템: [`design-system/card-news-rules.md`](../../design-system/card-news-rules.md), [`design-system/hook-image-system.md`](../../design-system/hook-image-system.md), [`design-system/info-image-system.md`](../../design-system/info-image-system.md), [`design-system/card-layouts/`](../../design-system/card-layouts)
- 렌더 스킬: [`.agents/skills/card-news-creator/SKILL.md`](../../.agents/skills/card-news-creator/SKILL.md)
- 이미지 핸드오프 대상: [`agents/graphic-designer.md`](../../agents/graphic-designer.md)

이 파일은 자동 디스패치를 위한 frontmatter 래퍼다. 모든 행동·출력 규칙은 본문에 정의되어 있다.
