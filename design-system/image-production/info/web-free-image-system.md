# 웹 무료 이미지 시스템

`info-img` 카드에 외부 스톡 사진을 사용할 때의 룰. 현재 운영 트랙명은
`web-free-image`다. spec에는 이미지 트랙 필드를 넣지 않고, 4단계 image phase에서
카드 메시지를 보고 이 트랙을 선택한다.

4단계 image phase(`graphic-designer`)에서 코덱스가 수행한다.

---

## 1. 허용 소스 (사진 트랙)

### 무료 + 상업 사용 OK + 출처 표기 권장

- **Unsplash** ⭐ — `https://unsplash.com/s/photos/<query>`
- **Pexels** — `https://www.pexels.com/search/<query>/`
- **Pixabay** — `https://pixabay.com/images/search/<query>/`

→ 추천 우선순위: **Unsplash → Pexels (대체용) → Pixabay (다양성)**

### 일러스트는 별도 트랙

벡터 일러스트(unDraw, Storyset)는 사진 트랙이 아니라 **일러스트 트랙**으로 분리.
→ `info/illustration-research-system.md` 참조.

### 금지 / 직접 사용 불가

- **iStock / Getty / Shutterstock** — 유료 워터마크 이미지
- **Pinterest 핀** — 큐레이션 재배포라 라이선스 불명. **레퍼런스(영감)용으로만 가능**, 직접 다운로드해서 카드에 박지 않음. 좋은 톤·구도 발견 시 → Codex 프롬프트의 스타일 레퍼런스로만 활용.
- **Naver 블로그 / 카카오 / 구글 이미지 검색 결과** — 출처 추적 어렵고 라이선스 불확실
- 라이선스 불확실한 모든 이미지

→ **원칙:** 의심스러우면 사용 X. Unsplash/Pexels로 대체할 후보를 더 찾는다.

---

## 2. Unsplash crop 활용

다운로드 URL에 파라미터 추가로 카드용 4:3 비율 + 주제 위치 조정:

```
https://images.unsplash.com/photo-XXXXX?w=1080&h=819&fit=crop&q=85
```

기본은 중앙 크롭. 주제가 한쪽에 치우쳐 있으면:

| 파라미터 | 효과 |
|---|---|
| `&crop=top` | 상단 중심 크롭 |
| `&crop=bottom` | 하단 중심 크롭 (주제가 사진 하단에 있을 때) |
| `&crop=left` / `&crop=right` | 좌/우 중심 |
| `&fp-x=0.5&fp-y=0.3&fit=crop&crop=focalpoint` | 정확한 focal point 지정 (0~1 범위) |

---

## 3. 주제 배치 룰 (필수 검증)

다운로드 직후 카드 합성해서 다음 두 가지 확인:

1. **주제가 이미지 영역 상단 60% 안에 들어와야 한다.**
   - 우리 fade 처리가 하단 60%까지 점진적으로 어두워지므로, 주제가 하단 40%에
     있으면 fade가 주제를 가린다.
   - 안 맞으면 → `&crop=top` 또는 다른 focal point로 재다운로드.

2. **사진 하단 가장자리는 자연스럽게 어두워지거나 단조로워야 한다.**
   - 사진 하단이 너무 밝거나 디테일 많으면 텍스트 영역 가독성 떨어짐.

→ "다운로드 → 즉시 카드 합성 → 검토 → 필요 시 재다운로드"가 반복 워크플로.

---

## 4. 외부 브랜드 스캔 체크리스트

다운로드 즉시 다음을 확인:

- [ ] 사진에 외부 브랜드 로고 / 상호 / 상품 패키지 등이 노출되는가?
  - 작게 흐릿하게 보임 → fade로 가려지면 OK
  - 또렷이 보임 (예: 폰 화면의 Zara 로고, 매장 사인) → 다른 사진 선택
- [ ] 인물의 얼굴이 또렷하게 보이는가?
  - 모델 권리 이슈 회피를 위해 얼굴이 명확히 식별되지 않는 사진 선호
  - Unsplash의 사진은 모델 릴리스 보장 안 됨

원칙: 의심스러우면 다른 사진을 고른다. 합성으로 가리는 것보다 안전한 사진을
처음부터 고르는 게 빠르다.

---

## 5. 표준 CSS 트리트먼트

모든 웹 리서치 카드에 동일하게 적용해 톤 통일:

```css
.info-source {
  filter: saturate(0.7) brightness(0.85) contrast(1.05);
}

.info-source-tint {
  position: absolute; inset: 0; z-index: 4;
  background: linear-gradient(180deg,
    rgba(11,120,248,0.06) 0%,
    rgba(11,120,248,0.02) 100%);
  mix-blend-mode: overlay;
  pointer-events: none;
}

.info-source-fade {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 5;
  height: 60%;
  background: linear-gradient(180deg,
    rgba(13,13,13,0) 0%,
    rgba(13,13,13,0.20) 30%,
    rgba(13,13,13,0.65) 70%,
    rgba(13,13,13,0.95) 100%);
  pointer-events: none;
}
```

- `saturate(0.7)`: 채도 살짝 down → 다크 시리즈에 녹기 쉬움
- `brightness(0.85)`: 밝기 살짝 down
- `contrast(1.05)`: 대비 살짝 up
- `tint overlay`: 브랜드 액센트 블루 살짝 → 시리즈 컬러 통일감
- `fade`: 하단 60%까지 점진적 다크 → 텍스트 영역으로 자연 전환

---

## 6. 이미지 출처 표기

기본은 `_image-plan.md`에 사진가, 원본 URL, 라이선스 정보를 기록한다.
필요하면 피드 캡션에도 출처를 남긴다.

카드 안 출처 표기는 라이선스가 요구하거나 사용자가 승인한 경우에만 쓴다. 그때는
사진 우상단에 작게 표기한다:

```html
<div class="image-source-credit">Photo · {Photographer Name} / Unsplash</div>
```

```css
.image-source-credit {
  position: absolute; top: 24px; right: 28px; z-index: 6;
  color: rgba(255,255,255,0.55);
  font-size: 18px; font-weight: 500; letter-spacing: -0.2px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
```

카드 안 출처 표기를 쓰면 캡처 이미지에도 출처가 따라간다는 장점이 있지만, 카드가
복잡해질 수 있으므로 기본값으로 쓰지는 않는다.

---

## 7. 자산 저장 위치

- **이미지 파일:** `output/<YYYY-MM-DD>_<slug>/assets/NN-info-<topic>-source.jpg`
  (예: `05-info-store-source.jpg`)
- **HTML:** `output/<YYYY-MM-DD>_<slug>/html/NN_info_<topic>.html`
- **PNG:** `output/<YYYY-MM-DD>_<slug>/NN_info_<topic>.png`
- **출처 기록:** `_image-plan.md`의 "라이선스/출처 기록" 섹션에 사진가 + URL +
  라이선스 종류 명시

---

## 8. 작업 순서 (체크리스트)

1. [ ] 카드 메시지 → 시각 컨셉 1줄 정리 ("배송 박스 단독 클로즈업, 다크톤")
2. [ ] 위 1·2·3 룰 따라 후보 검색 (`unsplash.com/s/photos/<query>`)
3. [ ] 후보 1~3장 다운로드 (`?w=1080&h=819&fit=crop&q=85`)
4. [ ] 외부 브랜드 스캔 (4)
5. [ ] 카드 합성 (5번 표준 CSS 적용) → 주제 배치 확인 (3번)
6. [ ] 안 맞으면 crop 재조정 또는 다른 후보로
7. [ ] OK면 `assets/`에 정식 이름으로 저장
8. [ ] 카드 안 출처 표기가 필요한 라이선스인지 확인하고, 필요할 때만 HTML에 추가 (6)
9. [ ] PNG 렌더
10. [ ] `_image-plan.md`에 출처 기록 (7)

→ 한 카드 평균 5~10분.

---

## 9. 흔한 실패 → 빠른 재시도

| 증상 | 원인 | 해결 |
|---|---|---|
| 주제가 fade에 가림 | 주제가 사진 하단 | `&crop=top`으로 재다운 |
| 톤이 다른 카드와 안 묶임 | 사진 색감 강함 | `saturate` 값 0.5로 더 낮추기 |
| 메시지 충돌 (외부 브랜드 텍스트) | 폰 화면 / 매장 사인 등 | 다른 사진 선택 |
| 본문 글자 가독성 | 사진 하단 밝음 | fade 강도 0.95 → 0.98 |
