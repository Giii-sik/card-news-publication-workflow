# Naver Smartstore Fee Reform — Info Card 3D Prompts (v2)

목적: `naver-smartstore-fee-reform` 시리즈 Card 3 / 4 / 6 의 클린 소스 이미지 생성용 프롬프트.

분담:
- Card 3, 4, 6 → 3D 그래픽 (이 문서)
- Card 5 → 웹 리서치 (별도, Claude 처리 완료)

---

## 공통 스타일 가이드 (모든 카드 동일)

- **렌더 톤:** premium 3D graphic, Brand hook 비주얼과 동일 계열 (`design-system/samples/hook-image-system/output/01_hook_3d.png` 참조)
- **소재감:** soft clay-like surfaces, rounded edges, tactile, 부드러운 grade 광택
- **라이팅:** 따뜻한 desk/스튜디오 라이팅 (Brand hook과 동일 환경)
- **배경:** 어두운 데스크/스튜디오 톤 (`#0d0d0d` 계열로 자연 fade)
- **활성 액센트 색:** 브랜드 액센트 블루 `#0B78F8` 단 1색만 (다른 채도 높은 색 금지)
- **사이즈:** 1080 × 819px (top-band, 4:3 비율)
- **하단 여백:** 하단 25~30%는 시각적으로 calm·dark — 다크 텍스트 영역으로 자연 전환
- **금지 요소:** 한글/영문 텍스트, 숫자, 브랜드 로고, 워터마크, 페이지네이션, 최종 카드 레이아웃, baked 그라데이션 오버레이

---

## Card 3 — 링크 유형 (0.91% vs 2.73%, 같은 매출에 3배 차이)

### 핵심 메시지
한 스토어로 가는 길이 두 갈래로 갈라지고, 한쪽은 적게·한쪽은 많이 빠진다.

### 메타포
중앙의 작은 스마트스토어 오브젝트에서 두 갈래 케이블/경로가 갈라져 나옴. 한쪽은 브랜드 액센트 블루 빛나는 케이블 + 작은 동전 1~2개, 반대쪽은 회색 낡은 케이블 + 큰 동전 무더기 5~6개.

### Codex 프롬프트

```
Create a clean source image for an Instagram carousel top-band, aspect ratio 1080x819. Premium 3D graphic style, dark ecommerce desk lighting, soft clay-like rounded surfaces — same render quality and warm desk environment as the approved Brand hook (`design-system/samples/hook-image-system/output/01_hook_3d.png`).

Scene: a small abstract storefront object sits at the upper-center of the frame. Two distinct cable-like paths split from it and lead toward the bottom corners.

Left path: smooth glowing Brand-blue (#0B78F8) cable, with 1–2 small blue coins resting beside it. Feels light and efficient.

Right path: a worn matte gray cable, with a heavy stack of 5–6 larger metallic-gray coins piled beside it. Feels heavier, costlier.

The visual contrast (small vs big coin pile) communicates a 3× cost difference between the two routes without any numbers.

Composition centered, lower 25–30% calmer and darker for clean transition into a dark Korean text area below.

No readable Korean or English text, no numbers, no Brand logo, no real brand marks (Naver, Smartstore, etc.), no watermark, no final card layout, no page number, no baked gradient overlay.
```

---

## Card 4 — 배송비 (배송비 3,000원에 109원, 모르고 빠집니다)

### 핵심 메시지
배송비가 그냥 사라지지 않고, 거기서도 수수료가 새고 있다.

### 메타포 (사용자 제안 사례)
**택배차에서 동전이 우수수 떨어지는 장면.**

### Codex 프롬프트

```
Create a clean source image for an Instagram carousel top-band, aspect ratio 1080x819. Premium 3D graphic style, dark ecommerce desk lighting, soft clay-like rounded surfaces — same render quality and warm desk environment as the approved Brand hook.

Scene: a small abstract delivery truck (toy-like, friendly proportions, slightly cute but business-appropriate) drives across the upper-middle of the frame. From the back of the truck (open back door), a small stream of coins is spilling out and falling toward the lower portion of the frame — communicating "fees leaking out of shipping cost."

Coins: a mix of Brand-blue (#0B78F8) coins (the highlighted "leaked fee") and a few neutral metallic-gray coins (regular shipping cost). The blue coins should be the visual focal point of the leak.

Optional supporting objects: a small parcel box on the desk surface, a short receipt strip nearby. Keep these calm/secondary so the spilling coins remain the hero.

Use subtle motion blur or soft falling-trajectory cues on the coins to imply the leaking action without making the scene busy.

Composition: truck in upper-center, coin spill diagonal toward lower-left or lower-right, with the lower 25–30% calmer and darker for the dark Korean text area below.

No readable Korean or English text, no numbers, no Brand logo, no real brand marks (CJ, 한진, 쿠팡, 등), no truck branding/text, no watermark, no final card layout, no page number, no baked gradient overlay.
```

---

## Card 6 — 유입 채널 (다나와·에누리도 마케팅 링크입니다)

### 핵심 메시지
가격비교 사이트 유입도 마케팅 링크로 인정 → 두 사이트가 같은 그룹으로 묶인다.

### 메타포 (사용자 결정)
**다나와·에누리 로고 캐릭터가 어깨동무하고 있는 장면.** 사용자가 직접 로고 사용 OK 결정. 두 캐릭터가 마케팅 링크 인정 그룹임을 표현.

### 로고 사용 지침
- **다나와 (Danawa):** 빨강·주황 컬러 톤, 가격비교 아이콘. 공식 로고 사용 가능 (사용자 권한 확인됨).
- **에누리 (Enuri):** 노란색·녹색 톤, 가격비교 아이콘. 공식 로고 사용 가능.
- 두 로고를 캐릭터의 몸체 또는 머리(아이콘) 형태로 자연스럽게 통합.

### Codex 프롬프트

```
Create a clean source image for an Instagram carousel top-band, aspect ratio 1080x819. Premium 3D graphic style, dark ecommerce desk lighting, soft clay-like rounded surfaces — same render quality and warm desk environment as the approved Brand hook.

Scene: two friendly mascot characters standing side by side in the upper-center of the frame, with arms around each other's shoulders (어깨동무) — like a buddy/team pose.

Character 1 (left): based on the Danawa (다나와) brand. Use the actual Danawa logo and brand colors as the character's body or head. Friendly rounded silhouette.

Character 2 (right): based on the Enuri (에누리) brand. Use the actual Enuri logo and brand colors as the character's body or head. Friendly rounded silhouette, similar scale to character 1.

Above or between the two characters, a soft Brand-blue (#0B78F8) glowing checkmark or small star floats — signaling "approved / same group" (i.e., both are recognized as marketing-link channels).

The two characters should clearly read as "buddies in the same team" — same posture height, equal visual weight, warm friendly tone.

Composition centered, characters in upper 65%, lower 25–30% calmer and darker for the dark Korean text area below.

Note: real Danawa and Enuri logos are explicitly approved for this image (user authorized). Do NOT use Naver, Coupang, or other competing platform logos. Do NOT add Brand logo. No readable Korean or English text beyond the brand logos themselves, no numbers, no watermark, no final card layout, no page number, no baked gradient overlay.
```

---

## Codex 핸드오프 메모

코덱스 세션에서 위 3개 프롬프트로 이미지 생성 후:

1. 클린 소스 이미지를 `output/2026-05-04_naver-smartstore-fee-reform/assets/` 에 저장:
   - `03-info-link-source.png`
   - `04-info-shipping-source.png`
   - `06-info-channel-source.png`

2. 각 카드 HTML(`html/03_info_link.html` 등)의 `image-slot-placeholder` 를 실제 이미지로 교체. 패턴은 Card 5(`html/05_info_store.html`)의 `info-source` 구조 참조.

3. 다크 fade 트리트먼트는 3D 카드에는 가볍게(또는 생략) — 3D는 자체적으로 lower-area를 calm하게 렌더하므로 fade가 강하면 디테일 손실.

4. PNG 재렌더 후 `output/2026-05-04_naver-smartstore-fee-reform/` 에 저장.

---

## 라이선스/출처 기록

- Card 5 (웹 리서치): Photo by Marcus Loke / Unsplash — `https://unsplash.com/photos/black-and-white-wooden-store-Uw9wQp0uv7I`
- Card 3, 4, 6 (3D 생성): 자체 자산
- Card 6 로고: 다나와·에누리 공식 로고 사용 (사용자 권한 확인됨, 2026-05-06)
