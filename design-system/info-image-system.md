# Info Image System

Info 카드 이미지 스타일 시스템. **이 문서는 info 카드 전용.** Hook 이미지
스타일은 [`design-system/hook-image-system.md`](hook-image-system.md) 참조.

명칭은 [`design-system/samples/info-image-system/`](samples/info-image-system/)
기준으로 통일.

## Confirmed Visual Samples

현재 샘플 PNG까지 확정된 info 이미지 스타일은 아래 1종이다.
실제 제작 때의 선택지는 `design-system/image-production/info/style-system.md`의
운영 트랙을 따른다.

| Style | Identifier | Use |
|---|---|---|
| reality-composite | `reality-composite` | 합성 실사 이미지 — 세금·정산·수수료처럼 개념은 현실적인데 직접 찍을 수 없는 카드 |

### reality-composite

- Sample: [`design-system/samples/info-image-system/output/01_info_reality_composite.png`](samples/info-image-system/output/01_info_reality_composite.png)
- Source asset: [`design-system/samples/info-image-system/assets/01-info-reality-composite-clean.png`](samples/info-image-system/assets/01-info-reality-composite-clean.png)
- 스타일 정의: [`design-system/image-production/styles/reality-composite.md`](image-production/styles/reality-composite.md)
- Look: editorial photo composite, 현실적 책상·종이·조명·손·업무 소품. 한 장면 한 메시지.

## 운영 트랙

아래 트랙은 제작 때 사용할 수 있다. 다만 아직 `samples/info-image-system/`에
대표 샘플 PNG가 없는 트랙은 실제 시리즈에서 먼저 1장 테스트 후 확정한다.

- `web-free-image` — 무료 스톡 사진 (Unsplash / Pexels)
- `photo-composite` — 무료 이미지 + 편집/생성 소품
- `3d-graphic` — 원본 3D 오브젝트·작은 상징 장면
- `text-led` — 이미지 없이 텍스트 전용 (`info-text` 레이아웃)

## Image Slot Rules

- Image area: `1080 × 819px` (info-img 레이아웃 상단).
- Lower text box: `90px` top/bottom padding, `100px` left/right padding.
- Title: max 1 line.
- Body: max 3 short lines. One or two lines are fine when the message reads
  clearly.
- 이미지 안에 한글·정확한 숫자·외부 로고 금지 — 모든 정보는 HTML이 소유.
- 이미지 출처 표기는 `_image-plan.md`에 기록하고, 필요하면 피드 캡션에도 남긴다.
  카드 안 표기는 라이선스가 요구하거나 사용자가 승인한 경우에만 쓴다.

## Step 4 Phase

- 이미지 슬롯 정의·placeholder 렌더: `card-designer` (Step 4 design phase)
- 이미지 컨셉·생성·삽입·최종 PNG: `graphic-designer` (Step 4 image phase)
