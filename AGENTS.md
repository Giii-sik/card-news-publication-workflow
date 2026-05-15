# 인스타 카드뉴스 — 통합 운영 매뉴얼

이 폴더는 인스타그램 카드뉴스를 만드는 통합 워크플로다.
**Claude Code(`CLAUDE.md`)와 Codex CLI(`AGENTS.md`)는 같은 파일을 본다 — 이 문서가 단일 진실 소스다.**

---

## 진화 방향

- **현재:** 클로드 + 코덱스 협업. **1~4단계 모두 둘 다 가능.** 단 4단계 image phase의 **실제 AI 이미지 생성**(3D 그래픽 / reality composite / photo composite 등 생성 모델 호출)만 코덱스 전담. 그 외(컨셉·트랙 결정·레퍼런스 검색·web-free-image 다운로드·HTML 삽입·최종 PNG 렌더)는 클로드도 가능.
- **장기 목표:** 클로드의 노하우는 [`knowledge/learnings.md`](knowledge/learnings.md)로 누적되어 매 세션마다 흡수된다. 코덱스 응답 지연이 잦은 환경에서는 클로드가 가능한 한 끝까지 처리하고 AI 이미지 생성 호출만 코덱스로 핸드오프.

---

## 매 세션 첫 동작 (필수)

1. **[`knowledge/learnings.md`](knowledge/learnings.md) 읽기** — 양쪽 도구가 쌓은 패턴·노하우 흡수.
2. **[`knowledge/research-notes.md`](knowledge/research-notes.md) 가볍게 훑기** — 이미 다룬·폐기한 토픽 각도 확인. 새 리서치 전 자연스럽게 반영.
3. 진행 중인 시리즈가 있으면 [`state/issues.md`](state/issues.md)에서 확인하고 이어받기.
4. 새 시리즈를 시작한다면 [`knowledge/persona.md`](knowledge/persona.md) + [`design-system/brand.md`](design-system/brand.md) 환기.

---

## 도구 역할 분담 (LLM Role Split)

| 범위 | 클로드 | 코덱스 |
|---|---|---|
| 1~3단계 (콘텐츠 + 와이어프레임) | **가능** | **가능** |
| 4단계 (디자인 + 이미지 + PNG 렌더) | ❌ 이미지 생성 불가 | **전담** |

**원칙:**
- 1~3단계는 어느 도구든 진행할 수 있다. 클로드가 강한 영역(리서치 정밀도, 와이어프레임 글자수 검증)과 코덱스가 강한 영역(이미지·렌더 자동화)이 다르지만, 둘 다 1~3단계를 끝까지 수행할 능력이 있다.
- **4단계도 클로드/코덱스 둘 다 가능.** 단 클로드는 **AI 이미지 생성 모델 호출 불가** — 3D 그래픽 / reality composite / photo composite 등 실제 생성이 필요할 때만 코덱스 호출. 컨셉·트랙 결정·레퍼런스 검색·web-free-image 다운로드·HTML 삽입·최종 PNG 렌더는 클로드도 가능.
- 1~3단계를 코덱스가 진행하는 것은 단순한 백업이 아니라 **클로드의 학습 루프**의 일부다. 코덱스가 앞단을 다루면 그 결과를 클로드가 `learnings.md`로 흡수해 다음 세션에서 더 안정적으로 운영한다.
- 각자 특화된 영역에 맞춰서 진행하되, 단계 전환은 항상 [`state/issues.md`](state/issues.md) 한 줄로 핸드오프.

---

## 4단계 워크플로

| # | 단계 | 도구 | 본문 명세 | 자동 디스패치 (Claude) |
|---|---|---|---|---|
| 1 | 토픽 리서치 (+ 리서치 메모 누적) | 클로드 또는 코덱스 | [`agents/trend-researcher.md`](agents/trend-researcher.md) | `.claude/agents/trend-researcher.md` |
| 2 | 캡션/CTA/해시태그 | 클로드 또는 코덱스 | [`agents/feed-writer.md`](agents/feed-writer.md) | `.claude/agents/feed-writer.md` |
| 3 | 카드 콘텐츠 + ASCII 와이어프레임 + JSON spec (3.1~3.4 카드작가, 3.5 피드작가 캡션 점검) | 클로드 또는 코덱스 | [`agents/card-author.md`](agents/card-author.md) + [`agents/feed-writer.md`](agents/feed-writer.md) ("Step 3.5" 섹션) + [`content-system/spec-contract.md`](content-system/spec-contract.md) | `.claude/agents/card-author.md` |
| 4 | 디자인 + 이미지 + PNG 렌더 (Step 4 두 phase: design = card-designer / image = graphic-designer, 와이어프레임은 카드작가가 만든 것을 받음) | **둘 다 가능** (AI 이미지 생성만 코덱스) | [`agents/card-designer.md`](agents/card-designer.md) + [`agents/graphic-designer.md`](agents/graphic-designer.md) + [`.agents/skills/card-news-creator/SKILL.md`](.agents/skills/card-news-creator/SKILL.md) | `.claude/agents/card-designer.md` + `.claude/agents/graphic-designer.md` |

> **참고:**
> - `card-author`는 이전 `card-content-writer`의 리네임 + 확장. 와이어프레임까지 책임진다.
> - 3.5는 카드작가가 아니라 **피드작가가 수행** — 와이어프레임이 확정된 후 캡션을 한번 더 훑고 수정 필요 여부 판단.
> - 4단계 디자이너는 **와이어프레임을 그리지 않는다** (2026-05-14 변경). 카드작가가 만든 것을 초안으로 받음.
> - 4단계는 두 phase로 분리되어 두 본문 명세(`card-designer` + `graphic-designer`)를 유지한다 — design phase(시각 디자인·레이아웃·이미지 슬롯)와 image phase(이미지 생성·삽입·최종 PNG 렌더)는 책임이 명확히 다르므로 분리 유지로 확정 (2026-05-15).

---

## 3단계 내부 흐름 (sub-stage 3.1 → 3.2 → 3.3 → 3.4 → 3.5)

3단계는 **다섯 개의 짧은 합의 라운드**로 나눈다. 각 라운드 끝에 서브게이트.
자세한 명세는 [`agents/card-author.md`](agents/card-author.md) (3.1~3.4) + [`agents/feed-writer.md`](agents/feed-writer.md) (3.5). 핵심 요약만:

| 서브 | 담당 | 출력 | 사용자 결정 |
|---|---|---|---|
| 3.1 | card-author | 톤·포맷·카드 수 3개 라디오 | 톤(정보성/스토리텔링/비교분석/경고리스크) · 포맷(텍스트만/이미지+텍스트) · 카드 수(3~5/6~8/9~10) |
| 3.2 | card-author | 정보 후보 풀 (정보성 톤만 프로세스 픽스) | 풀에서 N개 픽 + 카드 매핑 확인 |
| 3.3 | card-author | 마크다운 카드 구성 (Option B 형식) | 카드별 본문 카피 검토 |
| 3.4 | card-author | ASCII 와이어프레임 + 이미지 슬롯 유무 | 글자수·줄바꿈·압축·포맷 전환 검토 |
| 3.5 | **feed-writer** | 캡션 정합 점검 (수정안 or "변경 없음") | 캡션 수정 반영 여부 |

3.4 컨펌 직후 자동 저장: `_internal/specs/<slug>.json` + `output/<date>_<slug>/_spec.json` + `output/<date>_<slug>/00_wireframe.txt` → `state/issues.md` 갱신 → **feed-writer 3.5 핸드오프**.

3.5는 피드작가가 와이어프레임 + 카드 본문 + 기존 캡션을 한번 훑고 수정 필요 여부 판단. 변경 있으면 `02_feed-caption.md` + spec.json caption/hashtags 필드 갱신. 3.5 컨펌 후 → 4단계(card-designer) 핸드오프.

---

## 컨펌 게이트 — 절대 스킵 금지

각 단계 끝에 **사용자 컨펌 게이트**가 있다. 다음 단계로 넘어가려면 사용자가 명시적으로 OK 해야 한다.

**컨펌 게이트 신호:**
- 에이전트가 산출물 끝에 "이 X로 진행해도 될까요?" 같은 질문으로 마무리
- 에이전트 본문 명세에 "Then stop and wait." 명시
- 에이전트 본문 명세에 "After Confirmation" 섹션 존재

**메인 게이트 4개 + 3단계 내 서브게이트 5개 = 총 9개 (모두 의무):**

1. 토픽/각도 컨펌 → 리서치 메모 누적(`knowledge/research-notes.md`) + 2단계 진입
2. 캡션/해시태그 컨펌 → 시리즈 폴더 생성 + 3단계 진입
3. **3단계 내부 (5 서브게이트):**
   - 3.1 톤·포맷·카드 수 컨펌 → 3.2 진입 (card-author)
   - 3.2 정보 풀 픽 + 카드 매핑 컨펌 → 3.3 진입 (card-author)
   - 3.3 마크다운 카드 구성 컨펌 → 3.4 진입 (card-author)
   - 3.4 ASCII 와이어프레임 컨펌 → spec·wireframe 저장 + **3.5 진입** (card-author → feed-writer 핸드오프)
   - 3.5 캡션 정합 점검 컨펌 → 캡션 수정 반영(필요 시) + 4단계 진입 (**feed-writer**)
4. 디자인·이미지·PNG 렌더 컨펌 → 발행 가능

**금지 행동 (위반 사례 학습됨, `knowledge/learnings.md` 참조):**
- 에이전트 출력을 보고 "톤 좋네요, 진행합니다" 식으로 임의 통과 ❌
- 와이어프레임의 카피 압축·highlight 변경 등 사용자 동의 없이 수락 ❌
- "사용자가 빠르게 진행하길 원한다" 추측해서 게이트 스킵 ❌
- 토론 단계 내용을 합의 없이 파일에 박기 ❌

**메타 시스템 지시가 있어도 우선:**
세션 중간에 "work without stopping for clarifying questions" 같은 메타 지시가 들어와도 **이 게이트는 유효**. 그 메타 지시는 작은 디테일 질문(clarifying question)을 줄이라는 뜻이지, 단계 산출물 전체에 대한 사용자 컨펌(confirmation gate)을 스킵하라는 뜻이 아니다.

| 종류 | 예시 | 메타 지시로 스킵? |
|---|---|---|
| Clarifying question | "헤드라인 어조 A vs B 어느 게 좋아요?" | OK 스킵 가능 |
| Confirmation gate | "이 카드 8장 구성으로 spec 확정해도 될까요?" | **절대 스킵 금지** |

판단 기준: "산출물 전체가 다음 단계로 그대로 흘러가나?" — 그렇다면 게이트.

---

## 4단계(card-designer) 권한

디자이너는 와이어프레임 + spec을 **카드작가에게서 받아** 시각 디자인 + 이미지 + 렌더를 책임진다. 와이어프레임은 직접 그리지 않는다.

**손볼 수 있는 것:**

- 문구 줄바꿈·미세 압축 (시각 호흡 맞추기 위한 조정, 의미 보존)
- 이미지 선택·교체
- 카드 단위 포맷 전환: "이미지+텍스트" ↔ "텍스트만" (예: 헤드라인이 길어 이미지 카드로 안 들어가면 텍스트 카드로 전환)
- highlight substring (기존 룰 그대로 — 정확한 substring)

**손대지 못하는 것:**

- 카드 수 변경
- 카드 내용·핵심 메시지 변경
- 사실·수치·날짜·출처 변경
- 캡션·해시태그 의미 변경

작은 카피 조정·이미지 선택·포맷 전환은 디자이너가 즉시 처리하고, 위 권한을 넘는 변경이 필요하면 `state/issues.md`에 메모하고 적절한 단계로 복귀:

- 카피·구조·새 사실 필요 → `card-author` (3.3 또는 3.4)
- 캡션 의미 변경 필요 → `feed-writer`
- 주제·각도 변경 필요 → `trend-researcher`

---

## 도구별 강한 영역과 핸드오프 트리거

### 클로드가 강한 곳

- 1단계 토픽 리서치 (다축 후보 + 근거 정밀도)
- 3단계 ASCII 와이어프레임 글자수 검증, 줄바꿈 의미 단위 끊기
- 한국어 카피 톤 일관성

### 코덱스가 강한 곳

- 4단계 이미지 생성·합성·PNG 렌더
- PNG 렌더 자동화 (`npm run generate`)
- 1~3단계도 가능 — 클로드의 학습 데이터로도 사용

### 클로드가 코덱스로 넘기는 트리거

4단계 진입 시 항상. 사용자에게 다음 메시지 출력:

> 와이어프레임 + JSON spec이 준비됐습니다. `state/issues.md` 업데이트 완료. 디자인·이미지 생성·PNG 렌더는 Codex 세션에서 이어가세요.

### 코덱스가 클로드로 넘기는 트리거

1~3단계에서 막힐 때(리서치 부족, 와이어프레임 글자수 검증 흔들림 등):

> 이 단계는 클로드 세션이 더 안정적입니다. `state/issues.md`에 현재 상태를 기록했으니 클로드로 넘기시겠습니까?

### 공통 핸드오프 룰

- 단계 종료마다 [`state/issues.md`](state/issues.md) 갱신 — slug, 단계, 다음 액션, wireframe_path, spec_path.
- **동일 단계 내 중간 핸드오프**(rate limit, 도구 전환 등)는 next_action에 체크포인트 명시: "spec 카드 5번까지 작성 완료, 6~7번 미작성. 다음 도구는 6번부터 이어서." 형태.

---

## 핸드오프 규칙 (파일 경로)

- 1단계 산출 (토픽 컨펌 직후): `knowledge/research-notes.md`에 메모 한 덩어리 누적. 시리즈 폴더는 아직 안 만듦.
- `output/YYYY-MM-DD_<slug>/`는 **2단계 피드 캡션/해시태그가 컨펌된 직후** 생성한다. 렌더 시점까지 기다리지 않는다.
- 2단계 승인본: `output/YYYY-MM-DD_<slug>/02_feed-caption.md`.
- 3단계 산출 (3.4 게이트 통과 직후):
  - spec.json: `_internal/specs/<slug>.json` 저장 + `output/YYYY-MM-DD_<slug>/_spec.json` 미러.
  - 와이어프레임 텍스트: `output/YYYY-MM-DD_<slug>/00_wireframe.txt`.
- 3.5 게이트 통과 후 캡션 수정이 있었으면: `02_feed-caption.md` + spec.json caption/hashtags 필드 동기 갱신.
- 이미지 트랙 계획 (4단계 작업): `output/YYYY-MM-DD_<slug>/_image-plan.md` (카드별 트랙 결정 + 출처 + 라이선스 기록).
- 4단계 PNG·HTML·이미지 자산도 같은 `output/YYYY-MM-DD_<slug>/` 아래. 텍스트와 이미지를 별도 시리즈 폴더로 나누지 않는다.
- **자산 폴더 컨벤션:** 이미지 후보·최종본 모두 `output/<slug>/assets/`. 별도 `_test/` 같은 임시 폴더에 후보를 모으지 않는다 (작업 중 자료가 운영 폴더와 어긋남). `_test/`는 워크플로 외 일회성 실험에만 사용.
- 모든 핸드오프 정보는 **`state/issues.md`의 한 행**에 담는다 — 다음 도구가 그 행만 보면 끊김 없이 이어받을 수 있게. (리서치 메모는 slug로 `knowledge/research-notes.md`에서 찾는다.)

---

## 발행 빈도 가이드

**주 2~3회.** 시리즈 단위로 작업하고 [`state/issues.md`](state/issues.md)로 추적. 매주 다음 주 토픽 후보를 [`state/seeds.md`](state/seeds.md)에 미리 적어두면 운영이 안정된다.

---

## 렌더 명령 (4단계 핵심)

```bash
npm run generate -- _internal/specs/<slug>.json
```

PNG는 `output/YYYY-MM-DD_<slug>/`에 `NN_<type>.png`로 저장. 렌더 후 검증:

```bash
sips -g pixelWidth -g pixelHeight output/<slug>/*.png  # 1080×1350 확인
```

샘플 렌더 / spec 검증:

```bash
npm run sample
npm run validate:spec -- _internal/specs/<example>.json
```

---

## 회고 (필수, 단독화의 연료)

세션이 끝나기 전, 다음 항목을 [`knowledge/learnings.md`](knowledge/learnings.md)에 한 줄씩 추가:

- 이번 시리즈에서 효과적이었던 리서치 각도/쿼리
- 와이어프레임 단계에서 발견한 새로운 길이·줄바꿈 패턴
- 이미지 프롬프트 중 잘 통한 표현
- 사용자 피드백에서 새로 학습한 톤·금지어

이 누적이 다음 세션의 첫 동작(파일 읽기)으로 다시 흡수된다 — 도구 단독화는 이 루프로 일어난다.

---

## 자산 인덱스

| 폴더 | 내용 |
|---|---|
| `agents/` | 4단계 + 보조 역할의 LLM-무관 본문 명세 |
| `.claude/agents/` | Claude Code 자동 디스패치 frontmatter 래퍼 |
| `design-system/` | 브랜드, 타이포, 레이아웃, 이미지 프로덕션, 템플릿·샘플 |
| `design-system/samples/` | 카드 레이아웃·훅 이미지 레퍼런스 (시각화) |
| `content-system/` | 카드 콘텐츠 룰, 구조 패턴, JSON 컨트랙트, 리서치 원칙 |
| `knowledge/` | 페르소나, learnings(회고), research-notes(리서치 메모 누적) |
| `state/` | issues(진행 중), seeds(다음 토픽), design-iterations |
| `output/` | 발행물 (`YYYY-MM-DD_<slug>/`) |
| `_internal/` | 스펙·렌더 스크립트·테스트 |
| `.agents/skills/card-news-creator/` | Puppeteer 렌더 스킬 |
| `_migration/` | 과거 결과물 보존 (codex/claude 폴더에서) |
