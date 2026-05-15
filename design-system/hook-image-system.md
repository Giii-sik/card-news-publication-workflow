# Hook Image System

Hook 이미지 스타일 시스템. **이 문서는 hook 카드 전용.** Info 이미지 스타일은
[`design-system/info-image-system.md`](info-image-system.md) 참조.

명칭은 [`design-system/samples/hook-image-system/`](samples/hook-image-system/)
기준으로 통일.

## Confirmed Styles (Default Production)

현재 hook 발행에는 아래 2종만 사용. 추후 확장 시 새 row로 추가.

| Style | Identifier | Tone | Best Tracks | Use When |
|---|---|---|---|---|
| 3D/diorama | `3d-graphic` | polished objects, crisp lighting | D, C | AI, tools, automation, revenue, data 주제 |
| pixel illustration | `pixel-illustration` | dark isometric scene, friendly store mascot, soft data objects | E, A, policy/fee explainers | 셀러 통증·정산·수수료·시즈널·초보 행동 주제 |

> Reality/photo-composite는 hook 영역이 아님. info 이미지 영역에서만 사용
> ([`design-system/samples/info-image-system/`](samples/info-image-system/)).

## Style Samples

### 3D/diorama

- Sample: [`design-system/samples/hook-image-system/output/01_hook_3d.png`](samples/hook-image-system/output/01_hook_3d.png)
- Source asset: [`design-system/samples/hook-image-system/assets/01-hook-bg-3d-clean.png`](samples/hook-image-system/assets/01-hook-bg-3d-clean.png)
- 스타일 정의: [`design-system/image-production/styles/3d-graphic.md`](image-production/styles/3d-graphic.md)
- Use for: 폴리시 리드 커버에서 주제가 구체적 제품·오브젝트로 느껴져야 할 때.
- Rule: 소스 이미지는 깨끗하게 유지. gradient·로고·헤드라인은 HTML에서 처리.

### pixel illustration

- Sample: [`design-system/samples/hook-image-system/output/01_hook_illustration.png`](samples/hook-image-system/output/01_hook_illustration.png)
- Source asset: [`design-system/samples/hook-image-system/assets/01-hook-bg-illustration-clean.png`](samples/hook-image-system/assets/01-hook-bg-illustration-clean.png)
- 스타일 정의: [`design-system/image-production/styles/pixel-illustration.md`](image-production/styles/pixel-illustration.md)
- Use for: 수수료·정산·정책·초보 셀러·추상 데이터 주제 — 딱딱하지 않은 톤이 필요할 때.
- Rule: dark isometric workspace, 셀러/스토어 마스코트, 영수증·계산기·차트 오브젝트. 이미지 내 텍스트·로고 금지.

## Hook Style By Track

트랙별 기본 매핑. 사용자 결정 시 다른 스타일로 전환 가능.

| Track | Default Hook Style |
|---|---|
| A (Monthly Seller Issues) | pixel illustration |
| B (Overseas Brand) | pixel illustration 또는 3D/diorama |
| C (Revenue News) | 3D/diorama |
| D (AI/Tools) | 3D/diorama |
| E (Seller Pain) | pixel illustration |

트랙 정의는 [`content-system/research-tracks.md`](../content-system/research-tracks.md) 참조.

## Hook Copy Patterns

### Number

매출·시간·수치·측정 가능한 변화에 사용.

Example: `24시간에 1.6억`, `연매출 800억`

### Loss Avoidance

세금·수수료·마진·정책 변화·실수에 사용.

Example: `이거 모르면 종소세에서 손해보는...`

### Comparison

상세페이지·제품 페이지·가격·before/after 결정에 사용.

Example: `좋은 상세페이지 vs 안 읽히는 상세페이지`

## Hook Rules

- 이미지와 카피가 1초 안에 연결되어야 함.
- 살짝 비튼 시각 메타포는 OK, 단 카피는 직접적이어야 함.
- 키워드 2~3개만 사용. 너무 많이 쌓지 않기.
- Hook과 CTA는 가운데 정렬 가능, info 카드는 좌측 정렬 기본.
