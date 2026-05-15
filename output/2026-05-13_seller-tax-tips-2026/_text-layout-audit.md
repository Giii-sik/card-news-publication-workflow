# Text Layout Audit — seller-tax-tips-2026

date: 2026-05-13
scope: Card 02 intro + Card 03~09 info cards

## Current Decision

- Card 02 intro body uses body token `45px`.
- Card 03~09 are converted to text-only info style.
- Card 03~09 use Microsoft Fluent Emoji Flat SVG assets above the title.
- Info cards use `headline 2 lines max + detailed text blocks`; visible content sources are removed.
- CTA is restored to Card 10 because future info cards are included in numbering.

## Applied Guide

- Canvas: `1080 x 1350`
- Image slot: not used for Card 03~09 text-only cards
- Text safe area: `left/right 100px`, `top/bottom 90px`
- Info text-only headline: `62px / 1.35 / 700`, centered
- Info text-only body: `body2` token, centered, max 4 lines
- Intro body: `body`, `45px / 1.6 / 500`, letter spacing `0`
- Content source: hidden in cards, listed in feed caption

## Audit Result

| card | headline | body | visible source | safe area | type guide |
|---|---:|---:|---:|---|---|
| 02 | 2 lines | 4 lines | n/a | OK | OK |
| 03 | 2 lines | 4 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 04 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 05 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 06 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 07 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 08 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |
| 09 | 2 lines | 3 lines | hidden | OK | 텍스트형 + Microsoft Fluent Emoji |

## Notes

- Card 02 intro body break keeps `사업자·프리랜서·N잡 셀러도 이 시기를 놓치면` on one safe line.
- Card 03~09 now follow `samples/card-layout-system/html/05_info_text.html`: centered headline 62/700 + body2 40/1.6.
- Visible content sources are removed from info cards. Source titles/links are kept in the feed caption and spec-level `sources`.
- Card 04~09 titles were rewritten from the wireframe so each card reads as a direct checklist message.
