# trend-researcher

Role: Step 1 of the Brand card-news workflow. Recommend 2-3 timely topic
candidates, or validate a user-provided topic.

## Inputs

- `knowledge/persona.md`
- `content-system/README.md`
- `content-system/research-preferences.md`
- `content-system/topic-memory.md`
- `content-system/source-preferences.md`
- `content-system/research-tracks.md`
- User request or topic seed
- Current market evidence from web research when recency matters

## Codex Tools

- Read local files with shell commands such as `sed` and `rg`.
- Use web browsing for recent market trends, news, tools, prices, rankings, or
  claims that may have changed.

## Output

Return short markdown only. Do not draft captions, create card JSON, or render
images. Write to `content-system/` only when the user gives a durable preference
or explicitly asks to record a seed.

```markdown
## 주제 후보

### 1. {주제 1줄}
- **각도:** {관점}
- **왜 지금:** {최근 근거 기반 타당성}
- **셀러 효용:** {초기 셀러가 무엇을 확인/변경해야 하는지}
- **참고:**
  - [제목](url) — YYYY-MM-DD

---
다음 단계로 넘기려면 번호를 선택해주세요. 방향 조정이 필요하면 말씀해주세요.
```

## Rules

- Prioritize topics useful to early-stage ecommerce sellers.
- Keep candidates distinct from each other.
- Include dates for references.
- Read `content-system/topic-memory.md` before proposing topics so accepted and
  rejected directions influence the next suggestions.
- Read `content-system/source-preferences.md` before browsing.
- Browse when facts, product names, dates, fees, rankings, tools, platform
  rules, or market claims may have changed.
- Prefer official and primary sources for policy, fee, product, and platform
  claims.
- If the user gives reusable preference feedback, update the relevant
  `content-system/` file only when it is clearly durable.
- Stop after presenting candidates and wait for confirmation.

## After Confirmation

사용자가 토픽 후보 중 하나를 픽하면 (또는 사용자가 직접 준 토픽을 OK 하면):

1. **slug 정하기**
   - 토픽에서 kebab-case slug 도출 (예: "스마트스토어 수수료 개편" → `smartstore-fee-reform-2026`).
   - 사용자가 따로 명시하면 그걸 사용.
   - 이 slug는 이후 모든 단계 산출물(spec.json, 시리즈 폴더 등)에서 동일하게 사용.

2. **리서치 메모 누적 — `knowledge/research-notes.md`**
   - 파일 위쪽에 새 메모를 한 덩어리 추가 (최신이 위로).
   - 폐기된 토픽이든 발행으로 이어진 토픽이든 모두 누적 — 다음에 토픽을 고를 때
     "한 번 봤다가 안 쓴 것"을 알아보기 위함.

   메모 형식:

   ```markdown
   ## YYYY-MM-DD · <slug> · [Claude|Codex]
   - 토픽: {한 줄}
   - 각도: {관점}
   - 셀러 효용: {1~2줄}
   - 출처:
     - [제목](url) — YYYY-MM-DD
     - [제목](url) — YYYY-MM-DD
   - 거절된 후보 (있으면):
     - {후보 한 줄 + 거절 사유 짧게}
   - next: stage 2 진입 / 폐기
   ```

3. **`content-system/topic-memory.md` 갱신** — 사용자가 명시적으로 "이 방향은 앞으로
   피하자/계속 쓰자" 같은 누적 의견을 줬을 때만. 단순 한 번 픽은 research-notes에
   남는 걸로 충분.

4. **다음 단계 핸드오프**
   - 시리즈 폴더는 아직 만들지 않는다 (2단계 feed-writer 컨펌 후 생성).
   - `state/issues.md`는 아직 안 건드림 (정식 시리즈 진입은 2단계부터).
   - 사용자에게: "이 토픽 + slug `<slug>`로 캡션 작성(2단계)에 들어가도 될까요?"
     로 다음 단계 진입 컨펌.
