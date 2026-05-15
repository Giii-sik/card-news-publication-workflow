# Brand Content System

This folder is the single source of truth for research memory, source
preferences, caption writing rules, and card-content rules.

## Folder Roles

- `research-preferences.md` — durable user preferences for topic angles, tone,
  and what Brand should repeatedly care about.
- `research-tracks.md` — 5 트랙 시스템 (A/B/C/D/E) + 월간 가설 (2026-05-15
  design-system/에서 이동: 콘텐츠 트랙 정의는 content-system 영역).
- `topic-memory.md` — seed ideas, accepted/rejected topics, and lessons from
  past content decisions.
- `source-preferences.md` — preferred source types, source tiers, and source
  handling rules.
- `tone.md` — Brand 카피 톤·Good Patterns·Avoid (2026-05-15 design-system/에서
  이동: 카피 톤은 content-system 영역).
- `feed-writing-rules.md` — Instagram caption and hashtag writing rules.
- `card-content-rules.md` — card-news copy/spec writing rules.
- `card-structure-patterns.md` — hook/intro/info/cta 카드 타입별 카피·시각 위계.
- `content-patterns.md` — 추천 캐러셀 모양 (3-Card List / 5-Card Info /
  5-Card Narrative) + 카드 룰 (2026-05-15 design-system/에서 이동: 카드 구조
  패턴은 content-system 영역).
- `spec-contract.md` — JSON spec 컨트랙트 (card-author 산출물).

## Content Workflow

콘텐츠 단계(Step 1~3) 책임. **워크플로 단일 진실 소스는
[`AGENTS.md`](../AGENTS.md)** — 전체 4단계 다이어그램·도구 분담·컨펌 게이트·
산출 경로는 거기서만 갱신한다. 이 문서는 콘텐츠 영역 한정 빠른 안내.

- Step 1 `trend-researcher` → Step 2 `feed-writer` → **Step 3 `card-author` (이 폴더 담당)** → Step 3.5 `feed-writer` 캡션 점검 → Step 4 (디자인+이미지, design-system 담당)
- Step 3 내부 서브게이트(3.1 톤·포맷·카드 수 / 3.2 정보 풀 / 3.3 카드 구성 / 3.4 와이어프레임): [`agents/card-author.md`](../agents/card-author.md) 참조.

## Research Memory Rule

When the user gives a reusable preference, the active agent should update the
relevant file in this folder.

- "이런 주제 좋아" -> `topic-memory.md`
- "이런 출처를 우선 봐줘" -> `source-preferences.md`
- "이런 톤은 별로야" -> `research-preferences.md` or
  `feed-writing-rules.md`

Do not treat one-off feedback as durable memory unless the user says it should
become a rule.

## Handoff Rule

Every handoff should preserve:

- confirmed topic and angle
- source links and dates
- audience assumption
- one-line seller takeaway
- constraints or user preferences

