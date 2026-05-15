# JSON 스펙 컨트랙트 (`card-author` 산출물)

**워크플로 3단계의 출력은 단일 JSON 블록 + ASCII 와이어프레임.** 이 컨트랙트가 다운스트림 단계(`card-designer` + `graphic-designer`, 둘 다 Claude/Codex 가능 / 렌더 스킬 `card-news-creator`)의 단일 진실 소스다. 임의로 필드를 추가·삭제하거나 의미를 수정하지 않는다.

> 카드 타입별 카피·시각 규칙은 `content-system/card-structure-patterns.md`를 참조한다. 이 문서는 **스키마와 작성 의사결정**에 집중한다.
>
> Step 3 sub-stage 흐름(3.1~3.4) 전체 명세는 `agents/card-author.md` 참조.

---

## 작성 전 의사결정 체크리스트

### 1. 카드 수와 info 포맷 결정

주제 성격에 맞춰 info 카드의 포맷과 수를 정한다. `cardCount` 허용 범위는 `3 ≤ N ≤ 10`.

| 주제 유형 | info 포맷 | info 장수 | 총 장수 |
|---|---|---|---|
| 도구·채널·팁 리스트 ("셀러가 쓰기 좋은 AI 도구 3가지") | `list` | 1 | **3장** (hook + info×1 + cta) |
| 관점 전환형 ("광고 ROAS를 이렇게 보면 안 된다") | `narrative` | 3 | **5장** (hook + info×3 + cta) |
| 풍성한 추천 시리즈 ("AI 도구 5선") | `list` 또는 혼합 | 5 | **8장** (hook + intro + info×5 + cta) |
| 정보 점검 종합 (세무·체크리스트형 다항목) | 일반 `info` 또는 혼합 | 7~8 | **9~10장** (hook + intro + info×7~8 + cta) |
| 혼합 (custom) | 판단 | 2~4 | 4~6장 |

기본 규칙: **애매하면 narrative 3장 + cta**.

> Step 3.1 사용자 라디오와의 매핑: "짧게(3~5장)" → list 또는 narrative-부분 / "중간(6~8장)" → narrative + α 또는 혼합 / "길게(9~10장)" → 종합·혼합.

### 2. 테마 결정

- **dark** — 경고·이슈·시장 충격·리스크성 주제
- **light** — 정보·팁·전략·성장 주제

한 시리즈 = 1개 테마. 카드 간 테마 혼용 금지.

### 3. hook 카피

익숙한 단어 + 생소한 단어의 **인지 부조화**를 만든다. 1~2줄. 강조어 1개 지정 (`highlight`).

### 4. info 카피

- `list` 포맷: headline 1줄 + items 3~5개. 각 item은 한 줄짜리 액션/정보.
- `narrative` 포맷: **반드시 3장 고정.** 각 장의 `stage`는 `problem` / `perspective` / `solution` **순서대로 1장씩.**
  - 각 장: headline (관점 담긴 한 줄) + body (최대 3줄, 필요한 만큼만)
  - 내용 출처는 카드에 직접 렌더하지 않고, `sources` 배열과 피드 캡션 하단에 모은다.
  - **금지:** narrative 포맷으로 4장 이상 쓰거나, stage를 중복하거나, 순서를 바꾸는 것.
  - **info 카드를 4장 이상 쓰고 싶으면 `format: list` 또는 일반 info(format 생략)로 작성.**

### 4a. 이미지 카드 본문 길이 제한

`info-img` 레이아웃을 쓰는 카드는 **레이아웃이 본문 공간을 제한**한다 (`design-system/card-layouts/info-img.md` 기준):

- headline: max **1줄**
- body: max **3 short lines**. Do not expand copy just to fill three lines.

스펙 작성 시 본문이 이 한도를 넘으면 다음 중 하나를 선택:
1. 본문 압축
2. 카드 분할 (한 카드를 둘로)
3. 레이아웃을 `info-text`로 전환 (텍스트 전용)

### 4b. 이미지 트랙 결정 — Step 3에서는 결정하지 않음

새 4단계 워크플로에서 이미지 트랙은 **Step 4 image phase(`graphic-designer`,
둘 다 Claude/Codex 가능)의 책임**이다. card-author는 spec에 `imageTrack` 필드를 넣지 않는다.
Step 3.4 와이어프레임에서는 이미지 슬롯의 **유무만** 표기("있음" / "없음").
위치·스타일·트랙은 Step 4에서 결정 (위치·슬롯 정의 = `card-designer` 디자인
phase / 실제 이미지 생성·트랙 = `graphic-designer` 이미지 phase).

> 이전 V2 imageTrack hint 필드 사용은 더 이상 권장되지 않는다. Codex가 Step 4
> image phase에서 카드 메시지·시리즈 톤·기존 자산을 보고 트랙 결정. 자세한
> 결정 룰은 `design-system/image-production/decision-tree.md` (Codex 영역).

### 4c. 카드 수 변경 시 캡션 동기화 (필수)

카드를 추가·삭제·합칠 때마다 다음을 동시에 갱신:
- `cardCount` 필드
- `caption` 본문에서 "5가지 / 4가지" 같은 숫자 표현
- `caption` 본문에서 항목 나열 부분 ("마케팅 링크 / 배송비 / ..." 같은 리스트)
- `output/<date>_<slug>/00_feed-caption.md`의 카드 구성 표
- `_image-plan.md` (있으면)

→ 이 5곳 중 하나라도 누락되면 발행 시 본문과 카드가 따로 노는 상태 발생.

### 5. **근거 원칙: "데이터 1 + 사례 2"**

한 시리즈에서 인용하는 근거 총합 ≥ 데이터 1개 + 사례 2개 = 3개.

- **데이터:** 시장 규모, 점유율, 가격, 수수료 등 수치 1개. 출처와 발행일 필수.
- **사례:** 실제 도구·플랫폼·셀러 사례 2개. 고유명사 + 1줄 설명.
- 추측·일반론 금지. 근거가 부족하면 `WebSearch`/`WebFetch`로 보강 후 작성.

### 6. cta 카피

마지막 카드. Brand 플랫폼 언급 허용. 행동 유도 한 줄 + 설명 한 줄.

### 7. 본문(caption) + 해시태그

**본문 구조 (인스타 캐러셀 본문):**
1. **Hook line** (1줄) — 스크롤 멈추게
2. **3-stage 요약** (3~4줄) — 문제 / 관점 / 해결 한 줄씩
3. **CTA** (1~2줄) — 다음 행동 암시

이모지 과다 금지, 줄바꿈 적극 활용.

**해시태그:** 15~25개. 대분류(`#이커머스 #셀러`) + 중분류(`#쇼핑몰창업 #스마트스토어`) + 주제별(`#상위노출 #ROAS`) 균형.

---

## 출력 스키마 (Data Contract)

반드시 이 스키마의 JSON **한 블록**. 첫 문자 `{`, 마지막 `}`. 앞뒤 설명 금지.

```json
{
  "topic": "한 줄 주제",
  "slug": "kebab-case-slug",
  "theme": "dark | light",
  "cardCount": 3,
  "caption": "인스타그램 본문 full text (줄바꿈 포함)",
  "hashtags": ["#이커머스", "#셀러", "..."],
  "cards": [
    {
      "type": "hook",
      "title": "메인 카피\n줄바꿈은 \\n",
      "highlight": "강조어"
    },
    {
      "type": "info",
      "format": "list",
      "headline": "리스트 헤드라인",
      "highlight": "헤드라인 속 강조어",
      "items": ["항목 1", "항목 2", "항목 3"],
      "evidence": "선택 메타데이터, 카드에는 렌더하지 않음"
    },
    {
      "type": "info",
      "format": "narrative",
      "stage": "problem | perspective | solution",
      "headline": "관점이 담긴 한 줄",
      "highlight": "핵심어",
      "body": "최대 3줄 본문",
      "evidence": "데이터 또는 사례 1줄"
    },
    {
      "type": "cta",
      "title": "행동 유도 한 줄",
      "body": "설명 한 줄",
      "logo": true
    }
  ],
  "sources": [
    { "title": "...", "url": "...", "publishedAt": "YYYY-MM-DD" }
  ]
}
```

---

## 검증 규칙

- `cardCount` ∈ [3, 10] **AND** `cardCount === cards.length`.
- `slug`는 영문 소문자·숫자·하이픈, 40자 이내.
- 첫 카드는 `hook`, 마지막 카드는 `cta`(의도적 생략 시 제외). `intro`는 `hook` 직후에만.
- `narrative` 포맷을 쓰면 `info` 카드 **정확히 3장**, stage는 `problem` → `perspective` → `solution` 순. **3장 초과 / stage 중복 / 순서 변경 금지.**
- `info-img` 레이아웃 카드는 headline 1줄·body 3줄 이하 (`design-system/card-layouts/info-img.md`).
- `highlight`는 `headline`/`title`의 실제 부분문자열이어야 함 (substring 매칭). 단 image-led 카드(`info-img`)에서는 시각 강조 적용 안 됨 — 이미지가 emphasis 담당 (`design-system/card-news-rules.md` Emphasis Rules).
- `imageTrack` 필드는 spec에 포함하지 않는다 (4단계 코덱스 결정 사항).
- 카드 수 변경 시 caption + 02_feed-caption.md + _image-plan.md 동시 동기화 (위 4c 참조).
- `sources` 배열은 비어있지 않아야 함. URL + 발행일 포함.
- 내용 출처는 피드 캡션에 함께 작성한다. 카드 내부에는 내용 출처를 넣지 않는다.

---

## 다운스트림 핸드오프

- **저장 위치 (3.4 게이트 통과 직후 card-author가 자동 저장):**
  - 렌더러 호환을 위해 `_internal/specs/<slug>.json`
  - 시리즈 폴더 미러: `output/YYYY-MM-DD_<slug>/_spec.json`
  - 와이어프레임 텍스트: `output/YYYY-MM-DD_<slug>/00_wireframe.txt`
  - `output` 폴더는 2단계 피드 캡션 승인 직후 생성된 것 그대로 사용.
- **Step 4 (Claude/Codex 둘 다 가능, 두 phase — AI 이미지 생성만 Codex 호출):**
  - **`card-designer` 디자인 phase:** spec + 와이어프레임을 받아 스타일 방향 결정 → 이미지 슬롯 정의 → HTML/CSS 코딩 → placeholder 레이아웃 렌더. 카피 톤·줄바꿈은 시각 호흡 맞추기 위해 미세 조정 가능 (의미 보존 한정).
  - **`graphic-designer` 이미지 phase:** 승인된 레이아웃 + 이미지 슬롯을 받아 이미지 컨셉 제안 → 사용자 컨펌 → 이미지 생성·삽입 → 최종 PNG 렌더.
  - 두 phase 모두 spec의 사실·수치·출처·카드 수는 **변경 금지**.
- **card-news-creator (렌더 스킬):** 최종 spec을 입력으로 PNG 렌더. spec 검증 → 통과 시 `output/<YYYY-MM-DD>_<slug>/NN_<type>.png`로 저장.

---

## 브랜드 톤 규칙 (요약)

- 지적이고 정돈된 문장. 감탄사·이모지 남발·반말 금지. 문어체 기본.
- 셀러 관점 1인칭 금지. "~해보세요"보다 "~가 핵심입니다" / "~으로 정리됩니다".
- 수치·고유명사·출처로 신뢰. 애매한 수식어 금지.
- 브랜드 언급은 cta 카드 + 본문 CTA 라인에서만.
- 페르소나는 `knowledge/persona.md` 참조.
