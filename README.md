# card-news-publication-workflow

인스타그램 카드뉴스 발행을 위한 통합 워크플로 템플릿.

> 페르소나·브랜드 자산·실제 출력물은 모두 비워두거나 일반화했다.
> `knowledge/persona.md`, `design-system/brand.md`,
> `design-system/assets/` 를 자기 브랜드 것으로 교체한 뒤 그대로 운영하면 된다.

---

## 무엇을 위한 폴더인가

- 인스타그램 카드뉴스 시리즈를 4단계 파이프라인으로 만든다 (3~10장 범위).
- **Claude Code와 Codex CLI 둘 다** 같은 자산(디자인 시스템, 콘텐츠 룰, 페르소나)을 참조해 어떤 도구를 써도 일관된 결과를 낸다.
- "한 폴더에 두 도구가 같이 사는" 통합 패턴을 카드뉴스용으로 다듬은 형태다.

---

## 사용 방법

| 도구 | 진입점 | 역할 |
|---|---|---|
| Claude Code | [`CLAUDE.md`](CLAUDE.md) → [`AGENTS.md`](AGENTS.md) | 1~3단계 (리서치·카피·와이어프레임) 강세 |
| Codex CLI | [`AGENTS.md`](AGENTS.md) | 4단계 (디자인·이미지·렌더) 전담 + 단독화 지향 |

**모든 운영 룰은 [`AGENTS.md`](AGENTS.md)에 단일화되어 있다.** `CLAUDE.md`는 그 파일을 가리키는 한 줄 포인터.

---

## 4단계 파이프라인

```
[1] 토픽 리서치                                ← trend-researcher
       ↓
[2] 캡션/CTA/해시태그                          ← feed-writer
       ↓
[3] 카드 콘텐츠 + ASCII 와이어프레임 + JSON spec  ← card-author + feed-writer
       (3.1 톤·포맷·카드 수 → 3.2 정보 풀 → 3.3 카드 구성 → 3.4 와이어프레임 → 3.5 캡션 점검)
       ↓ ★ Claude → Codex 핸드오프 포인트
[4] 디자인 + 이미지 생성 + PNG 렌더              ← card-designer + graphic-designer (둘 다 Claude/Codex 가능, AI 이미지 생성만 Codex)
```

각 단계 종료마다 사용자 컨펌. 3단계는 5개 서브게이트(3.1~3.5)로 더 잘게 나뉨. 단계 사이 핸드오프는 `state/issues.md` 한 줄로 운영한다.

---

## 아웃풋 폴더 운영

- `output/YYYY-MM-DD_<slug>/` 폴더는 **4단계 렌더 시점이 아니라 2단계 피드 캡션/해시태그가 컨펌된 직후** 생성한다.
- 2단계 승인본은 같은 폴더에 `02_feed-caption.md`로 저장한다.
- 3단계 spec + 와이어프레임, 4단계 PNG/HTML도 모두 같은 시리즈 폴더에 누적한다. 텍스트와 이미지를 별도 프로젝트 폴더로 나누지 않는다.
- 렌더 도구 호환을 위해 spec은 `_internal/specs/<slug>.json`에도 저장하고, 승인본 복사본은 `output/YYYY-MM-DD_<slug>/_spec.json`에 함께 둔다.

---

## 발행 가이드

- **빈도:** 주 2~3회.
- **단위:** 시리즈 (한 토픽 → 3/5/6/8/10장 → PNG 시리즈).
- **다음 토픽:** [`state/seeds.md`](state/seeds.md)에 후보 미리 적어두기.

---

## 폴더 구조 요약

```
.
├── CLAUDE.md / AGENTS.md       # 도구별 진입점 (먼저 읽기, AGENTS.md가 단일 진실 소스)
├── README.md                   # 사람 읽는 입구 (이 파일)
├── package.json                # Puppeteer 렌더 의존성
│
├── agents/                     # 4단계 + 보조 역할의 LLM-무관 본문 명세
├── .claude/agents/             # Claude Code 자동 디스패치 래퍼
│
├── design-system/              # 브랜드/타이포/레이아웃/이미지 프로덕션/샘플
│   ├── card-layouts/           #   - 카드 타입별 레이아웃 규칙
│   ├── image-production/       #   - 이미지 제작 룰·프롬프트 기록
│   └── samples/                #   - 카드 레이아웃·훅·인포 이미지 시각 샘플
├── content-system/             # 카피 룰, 카드 구조, JSON 컨트랙트, 리서치 원칙
├── knowledge/                  # 페르소나, learnings (양 도구 공용 회고)
├── state/                      # issues, seeds, design-iterations
│
├── output/                     # 발행물 (YYYY-MM-DD_<slug>/)
├── _internal/                  # 스펙·렌더 스크립트·테스트
├── .agents/skills/             # Puppeteer 렌더 스킬 (card-news-creator)
└── _migration/                 # 과거 결과물 보존 (codex/claude 폴더에서)
```

---

## 진화 방향

- **현재:** 클로드(리서치/카피/와이어프레임) + 코덱스(디자인/이미지/렌더) 협업.
- **장기 목표:** 클로드 노하우는 [`knowledge/learnings.md`](knowledge/learnings.md)에 누적되어 매 세션마다 흡수된다. 코덱스 응답 지연이 잦은 환경에서는 클로드가 가능한 한 끝까지 처리하고 **AI 이미지 생성 호출만 코덱스로 핸드오프**.

---

## 빠른 시작

```bash
# 1. 의존성 설치 (최초 1회)
npm install

# 2. 샘플 렌더로 환경 검증
npm run sample

# 3. 진입점 읽고 새 시리즈 시작
#    Claude Code → CLAUDE.md (→ AGENTS.md)
#    Codex CLI   → AGENTS.md
```

---

## 참고 폴더

- `../card-news_codex/` — 이 폴더의 디자인 시스템·렌더 스킬 베이스 (보존, 점진 이전)
- `../card-news_claude/` — ASCII 와이어프레임·JSON 스펙 컨트랙트 베이스 (보존)
- `../Growth_Threads-publication/` — 통합 폴더 패턴 레퍼런스 (쓰레드 발행)
