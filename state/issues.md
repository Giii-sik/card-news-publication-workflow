# Issues — 진행 중 카드뉴스 시리즈 (템플릿)

진행 중이거나 핸드오프 대기 중인 시리즈를 한 행씩 기록한다.
완료된 시리즈는 아래 "## 완료" 섹션으로 이동시킨다.

핸드오프 시 **다음 도구는 자기 시리즈의 행만 보면 끊김 없이 이어받을 수 있다.**

---

## 컬럼 정의

- `slug` — kebab-case 식별자 (spec.json의 slug와 일치)
- `created` — 시리즈 시작일 (YYYY-MM-DD)
- `last_tool` — 마지막으로 작업한 도구 (`Claude` 또는 `Codex`)
- `stage` — 현재 완료된 단계 (1~5)
- `next_action` — 다음 도구가 시작할 액션 (한 줄). **rate limit / 시간 부족으로 중간에 끊긴 경우 "어디까지 했고 다음 도구는 무엇부터 시작" 명확히 기록.** 다음 도구가 이 한 줄만 보고 안전하게 재개할 수 있어야 함.
- `wireframe_path` — ASCII 와이어프레임 텍스트 경로 (4단계 통과 후)
- `spec_path` — JSON spec 경로 (3단계 통과 후)

## 핸드오프 룰

- 단계 종료 시 행 갱신 필수 (slug · stage · next_action · 경로).
- **동일 단계 내 중간 핸드오프**(rate limit, 도구 전환 등)는 next_action에
  체크포인트를 명시: "spec 카드 5번까지 작성 완료, 6~7번 미작성. 다음 도구는
  6번부터 이어서." 형태.
- 단계 전체가 끝나기 전에는 stage 숫자를 올리지 않음 (절반 진행 시에도 stage는 이전 단계 유지).

---

## 진행 중

| slug | created | last_tool | stage | next_action | wireframe_path | spec_path |
|---|---|---|---|---|---|---|

## 완료

| slug | created | completed | stage | wireframe_path | spec_path |
|---|---|---|---|---|---|
