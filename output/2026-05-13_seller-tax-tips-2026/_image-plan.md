# 셀러 종소세 신고 팁 — 이미지 트랙 계획

slug: `seller-tax-tips-2026`
date: 2026-05-13
status: **업로드 완료 — 2026-05-14**

---

## 업로드 로그

- 업로드일: **2026-05-14**
- 최종 카드: 본 템플릿 배포본은 hook PNG + CTA 카드 제외, info/intro만 포함
- 피드 캡션: `00_feed-caption.md`
- 최종 상태: 원본은 10장 캐러셀 / 템플릿 배포본은 9장 (CTA 제외)

---

## 시리즈 개요

- 카드 수: **9장** (hook + intro + info×7), 원본은 cta 1장 추가
- 테마: dark
- 톤 요청: 정보성 + 이미지·텍스트 조합 + 본문형 카피
- 모든 이미지 작업: **Codex 전담**
- highlight: Hook의 `종소세`, Intro의 `작년 소득`

## 2026-05-13 Codex Reset

- Body token: **45px**.
- Body2 token: **40px**.
- Card 03~09는 이미지 슬롯 없이 텍스트형 + Fluent flat 스타일 2D 아이콘으로 구성.
- Card 10 CTA는 전체 인포카드 번호를 포함한 원래 마지막 번호로 유지.
- 상세 검수 결과: `output/2026-05-13_seller-tax-tips-2026/_text-layout-audit.md`

## 공통 원칙

1. **공통 다크 베이스** — `#0D0D0D`
2. **공통 컬러 액센트** — 브랜드 액센트 `#0B78F8` (자기 브랜드 컬러로 교체)
3. **운영 이미지 트랙** — 합성이미지 / 웹 무료이미지 / Codex 직접 제작 3D
4. **Info 카드는 텍스트형 우선** — 이미지보다 상세 텍스트 구조가 적합한 카드는 텍스트형으로 구성
5. **Info 텍스트 기준** — sample text-only 스타일 우선: headline 62/700 + body2 40/1.6, 내용 출처 미표기
6. **출처 표기** — 내용 출처는 피드 캡션에 작성, 외부 이미지 출처만 이미지 영역 안에 표기
7. **이미지 금지 요소**
   - 한글/영문 텍스트 baked-in
   - 외부 브랜드 로고
   - 자기 브랜드 로고 baked-in (HTML/CSS 오버레이로만 처리)
   - 워터마크, 페이지네이션, baked 그라데이션 오버레이

> 프로세스 업데이트 메모: 일러스트 트랙은 삭제하지 않고 보류 상태로 기록한다. 오늘 카드 반영 후 운영 트랙을 `합성이미지 / 웹 무료이미지 / 3D 직접 제작` 중심으로 정리 예정.

---

## 카드별 이미지 상태

| card | topic | current visual | next image idea |
|---|---|---|---|
| 01 | hook | 확정 3D 계산기 TAX 이미지 | 유지 |
| 02 | intro | 이미지 없음 | 유지 |
| 03 | 올해 종소세 마감은 / 6월 1일까지 | 텍스트형 + Fluent flat 캘린더 아이콘 | 유지 |
| 04 | 홈택스 금액이 / 입금액과 다른 이유 | 텍스트형 + Fluent flat Abacus 아이콘 | 유지 |
| 05 | 정산일보다 / 거래일을 먼저 보세요 | 텍스트형 + Fluent flat 시계 아이콘 | 유지 |
| 06 | 경비 처리는 / 증빙이 먼저입니다 | 텍스트형 + Fluent flat 영수증 아이콘 | 유지 |
| 07 | 장부냐 추계냐에 따라 / 세금이 달라집니다 | 텍스트형 + Fluent flat 장부 아이콘 | 유지 |
| 08 | 간이과세자는 / 공제율 25% 확인 | 텍스트형 + Fluent flat Chart increasing 아이콘 | 유지 |
| 09 | 부업 수입도 / 종소세에 합산됩니다 | 텍스트형 + Fluent flat Money bag 아이콘 | 유지 |
| 10 | CTA | CTA 고정 자산 | 유지 |

---

## 라이선스/출처 기록

| 카드 | 트랙 | 출처/생성 도구 | 라이선스 |
|---|---|---|---|
| 1 hook | 3D 생성 | `assets/01-hook-calculator-tax-source.png` | 자체 생성 자산 |
| 3~9 info | text + Microsoft Fluent Emoji Flat SVG | `assets/fluent-emoji/*.svg` from `microsoft/fluentui-emoji` | MIT License |
| 10 CTA | (템플릿 배포본 제외) | HTML/CSS CTA visual | — |

---

## 다음 이미지 작업 순서

1. Card 03~09는 현재 텍스트형 + 2D 아이콘 기준으로 검수.
2. 이후 이미지가 필요한 카드만 별도 후보를 제안.
3. 후보 이미지는 `output/2026-05-13_seller-tax-tips-2026/assets/` 아래에 저장.
4. 이미지 적용 시 해당 카드만 우선 재렌더하고 비교.

---

## 참고 자료

- spec: `_internal/specs/seller-tax-tips-2026.json` (또는 미러 `_spec.json`)
- 캡션: `00_feed-caption.md`
- 와이어프레임: `00_wireframe.txt`
- 룰: `agents/image-generator.md`, `design-system/image-production/decision-tree.md`, `design-system/image-production/styles/3d-graphic.md`
- icon source: `https://github.com/microsoft/fluentui-emoji`
