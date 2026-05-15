---
name: graphic-designer
description: Step 4 (image phase) of the Brand card-news workflow (4-stage). Takes the approved layout, image slots, and rendered drafts from card-designer (Step 4 design phase) and produces final card images. **Claude and Codex are both eligible** — Claude can run image concept, track decision, reference search (Unsplash/Pexels), web-free-image / text-led 1st drafts, HTML insertion, and final PNG render directly. Only **actual AI image generation** (3D graphic / reality composite / photo composite — new image creation via generative model) requires Codex tools. Does NOT change copy meaning, facts, sources, or approved layout hierarchy. Hook card always needs an image — this agent is invoked every series.
tools: Read, Write, Bash, WebSearch, WebFetch
model: sonnet
color: orange
---

# graphic-designer (frontmatter wrapper)

본문 명세는 [`agents/graphic-designer.md`](../../agents/graphic-designer.md)를 참조한다.

추가 참조 (이 단계에서 반드시 읽기):
- 이미지 프로덕션 규칙: [`design-system/image-production/README.md`](../../design-system/image-production/README.md)
- 스타일별 가이드: [`design-system/image-production/styles/`](../../design-system/image-production/styles/) (3d-graphic / pixel-illustration / reality-composite)
- 카드 레이아웃 규칙: [`design-system/card-layouts/`](../../design-system/card-layouts/) (hook / intro / info-img / info-text / cta)
- 카드뉴스 룰: [`design-system/card-news-rules.md`](../../design-system/card-news-rules.md)
- 렌더 스킬: [`.agents/skills/card-news-creator/SKILL.md`](../../.agents/skills/card-news-creator/SKILL.md)
- 확정 샘플: [`design-system/samples/hook-image-system/`](../../design-system/samples/hook-image-system/), [`design-system/samples/card-layout-system/`](../../design-system/samples/card-layout-system/)

이 파일은 자동 디스패치를 위한 frontmatter 래퍼다. 모든 행동·출력 규칙은 본문에 정의되어 있다.
