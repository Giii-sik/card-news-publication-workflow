# Design Iterations — 디자인·렌더 반복 추적 (템플릿)

한 시리즈 안에서 디자인 또는 렌더 후 피드백으로 반복 수정한 이력.
**3회 이상 반복되면 카피·구조 단계(card-author, Step 3)로 회귀가 필요하다는 신호.**

> 와이어프레임 자체는 Step 3(card-author)의 책임이며, 시각 디자인·이미지·렌더
> 반복은 Step 4(card-designer + graphic-designer, 둘 다 Claude/Codex 가능 —
> AI 이미지 생성만 Codex 호출)의 영역이다.

---

## 컬럼 정의

- `slug` — 시리즈 식별자
- `iteration` — 반복 회차 (1, 2, 3…)
- `trigger_card` — 수정이 시작된 카드 (예: `01_hook`, `03_info_2`)
- `change_summary` — 변경 요약 한 줄
- `tool` — 수정한 도구 (`Claude` 또는 `Codex`)
- `date` — YYYY-MM-DD

---

## 반복 이력

| slug | iteration | trigger_card | change_summary | tool | date |
|---|---|---|---|---|---|

<!--
예시 행:
| example-slug | 1 | 03_info_2 | body 줄 길이 초과(28자) → 22자로 분할 | Claude | YYYY-MM-DD |
| example-slug | 2 | 01_hook | highlight substring 불일치 → "정확한 substring"으로 정정 | Claude | YYYY-MM-DD |
-->

---

## 패턴 누적

반복적으로 발생하는 디자인 이슈는 [`../knowledge/learnings.md`](../knowledge/learnings.md)의 `[wireframe]` 카테고리로 옮겨 영구 학습으로 정착시킨다.
