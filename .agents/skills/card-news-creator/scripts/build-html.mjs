// build-html.mjs
// Converts a card-news JSON spec into per-card HTML strings.
// Pure: no filesystem writes beyond the caller's discretion.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TPL_DIR = path.resolve(__dirname, "../templates");

const VALID_TYPES = new Set([
  "hook",
  "intro",
  "info",
  "cta",
  // Legacy compatibility. New specs should prefer info + stage.
  "problem",
  "perspective",
  "solution",
]);

const VALID_INFO_FORMATS = new Set(["list", "narrative"]);
const VALID_INFO_STAGES = new Set(["problem", "perspective", "solution"]);

// Legacy expected orders (v1). Current specs use hook + intro? + info x N + cta.
const EXPECTED_ORDER = {
  4: ["hook", "problem", "perspective", "solution"],
  5: ["hook", "intro", "problem", "perspective", "solution"],
  6: ["hook", "intro", "problem", "perspective", "solution", "cta"],
};

// ---------- validation ----------

export function validateSpec(spec) {
  const errors = [];
  const warnings = [];

  if (!spec || typeof spec !== "object") errors.push("spec is not an object");
  if (!spec.topic) errors.push("spec.topic required");
  if (!spec.slug || !/^[a-z0-9-]{1,60}$/.test(spec.slug))
    errors.push("spec.slug must be kebab-case [a-z0-9-]");
  if (!["dark", "light"].includes(spec.theme))
    errors.push("spec.theme must be 'dark' or 'light'");
  // v2: cardCount range 3..10 — info cards make length flexible, instagram caps at 10
  if (
    typeof spec.cardCount !== "number" ||
    spec.cardCount < 3 ||
    spec.cardCount > 10
  )
    errors.push("spec.cardCount must be between 3 and 10");
  if (!Array.isArray(spec.cards)) errors.push("spec.cards must be array");
  else {
    if (spec.cards.length !== spec.cardCount)
      errors.push(
        `cards.length (${spec.cards.length}) != cardCount (${spec.cardCount})`,
      );
    spec.cards.forEach((c, i) => {
      if (!VALID_TYPES.has(c.type)) {
        errors.push(`card[${i}].type invalid: ${c.type}`);
        return;
      }
      if (c.type === "info") {
        if (!VALID_INFO_FORMATS.has(c.format))
          errors.push(`card[${i}].format must be 'list' or 'narrative'`);
        if (
          c.format === "narrative" &&
          c.stage !== undefined &&
          !VALID_INFO_STAGES.has(c.stage)
        )
          errors.push(
            `card[${i}].stage, when provided for narrative, must be 'problem' | 'perspective' | 'solution'`,
          );
        if (
          c.format === "list" &&
          (!Array.isArray(c.items) || c.items.length === 0)
        )
          errors.push(`card[${i}].items must be non-empty array for list`);
      }
    });

    const actual = spec.cards.map((c) => c.type);
    const usesLegacy = spec.cards.some((c) =>
      ["problem", "perspective", "solution"].includes(c.type),
    );

    if (spec.cards[0] && spec.cards[0].type !== "hook") {
      errors.push(`first card is '${spec.cards[0].type}', expected 'hook'`);
    }
    if (!usesLegacy && spec.cards.at(-1)?.type !== "cta") {
      errors.push(`last card is '${spec.cards.at(-1)?.type}', expected 'cta'`);
    }
    const introIndexes = actual
      .map((type, index) => (type === "intro" ? index : -1))
      .filter((index) => index !== -1);
    if (introIndexes.length > 1) errors.push("only one intro card is allowed");
    if (introIndexes.length === 1 && introIndexes[0] !== 1) {
      errors.push("intro card must appear directly after hook");
    }

    if (usesLegacy) {
      const expected = EXPECTED_ORDER[spec.cardCount];
      if (expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          warnings.push(
            `legacy card order [${actual.join(",")}] differs from expected [${expected.join(",")}]`,
          );
        }
      }
    }
  }

  return { errors, warnings };
}

// ---------- html escape ----------

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c]);
}

// Replaces occurrences of `highlight` inside `text` with a <span class="hl"> wrap.
// Handles \n → <br/>. Does NOT match across lines.
function escWithHighlight(text, highlight) {
  const raw = String(text ?? "");
  const lines = raw.split(/\r?\n/);
  const escLines = lines.map((line) => {
    if (!highlight) return esc(line);
    const idx = line.indexOf(highlight);
    if (idx === -1) return esc(line);
    const before = esc(line.slice(0, idx));
    const hit = esc(line.slice(idx, idx + highlight.length));
    const after = esc(line.slice(idx + highlight.length));
    return `${before}<span class="hl">${hit}</span>${after}`;
  });
  return escLines.join("<br/>");
}

// ---------- card renderers ----------

function renderHook(card, { wordmarkSrc }) {
  // Cover rule: no eyebrow, no bottom logo, no dots. Only the brand
  // wordmark (top-left) + one giant hook headline. Text carries the card.
  const wordmark = wordmarkSrc
    ? `<img class="wordmark" src="${wordmarkSrc}" alt="brand" />`
    : "";
  return `
    ${wordmark}
    <h1 class="headline">${escWithHighlight(card.title, card.highlight)}</h1>
  `;
}

// v2 intro — Blunge-style bridge between hook and info cards.
// Schema: { question, fact, twist, highlight }. Intro cards stay logo-free by default.
// Falls back to legacy { title, body } if question/fact/headline absent.
function renderIntro(card) {
  if (card.question || card.fact || card.twist) {
    const question = card.question
      ? `<p class="question">${escWithHighlight(card.question, card.highlight)}</p>`
      : "";
    const fact = card.fact
      ? `<p class="fact">${escWithHighlight(card.fact, card.highlight)}</p>`
      : "";
    const twist = card.twist
      ? `<p class="twist">${esc(card.twist)}</p>`
      : "";
    return `${question}${fact}${twist}`;
  }
  const emoji = renderEmoji(card);
  const headingText = card.headline || card.title;
  const title = headingText
    ? `<h2 class="headline">${escWithHighlight(headingText, card.highlight)}</h2>`
    : "";
  const body = card.body ? `<p class="body">${esc(card.body)}</p>` : "";
  return `${emoji}${title}${body}`;
}

// Content sources are not rendered inside cards. Put factual/content sources
// in the Instagram feed caption; only visual asset attribution belongs inside
// an image area when an external image requires it.
function renderEvidenceLine(ev) {
  return "";
}

function renderEmoji(card) {
  return card.emoji ? `<div class="emoji">${esc(card.emoji)}</div>` : "";
}

function renderProblemOrPerspective(card) {
  const emoji = renderEmoji(card);
  const headline = `<h2 class="headline">${escWithHighlight(card.headline, card.highlight)}</h2>`;
  const body = card.body ? `<p class="body">${esc(card.body)}</p>` : "";
  return `${emoji}${headline}${body}`;
}

function renderSolution(card) {
  const emoji = renderEmoji(card);
  const headline = `<h2 class="headline">${escWithHighlight(card.headline, card.highlight)}</h2>`;
  const bullets = Array.isArray(card.bullets) && card.bullets.length
    ? `<ul class="bullets">${card.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
    : "";
  return `${emoji}${headline}${bullets}`;
}

// v2 info card — two formats share the same left-aligned modern_03 skeleton.
// `list`: headline + items[].
// `narrative`: headline + body. Evidence/source metadata is not rendered.
function renderInfo(card, { iconHtml } = {}) {
  const icon = iconHtml || "";
  const headline = card.headline
    ? `<h3 class="headline">${escWithHighlight(card.headline, card.highlight)}</h3>`
    : "";

  let middle = "";
  if (card.format === "list") {
    const items = Array.isArray(card.items) ? card.items : [];
    middle = items.length
      ? `<ul class="items">${items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>`
      : "";
  } else {
    // narrative
    middle = card.body ? `<p class="body">${esc(card.body)}</p>` : "";
  }

  return `${icon}${headline}${middle}`;
}

const FIXED_CTA_TITLE = "셀러에게 유익한 정보를\n계속 받고 싶다면!";
const FIXED_CTA_BODY =
  "@your_brand을 팔로우해보세요.\n매주 커머스 관련 소식을 전달해드려요:)";

function renderCta(_card, { wordmarkSrc, characterSrc }) {
  const character = characterSrc
    ? `<img class="cta-character-img" src="${characterSrc}" alt="" />`
    : "";
  const title = `<h2 class="headline">${esc(FIXED_CTA_TITLE)}</h2>`;
  const body = `<p class="body">${esc(FIXED_CTA_BODY)}</p>`;
  const logo = wordmarkSrc ? `<img class="logo" src="${wordmarkSrc}" alt="Brand" />` : "";
  return `${character}${title}${body}${logo}`;
}

function renderFooter(index, total, theme) {
  // simple pagination dots — hidden on hook / cta for cleaner look
  const dots = Array.from({ length: total }, (_, i) =>
    i === index ? `<span class="is-active"></span>` : `<span></span>`,
  ).join("");
  return `
    <div class="footer">
      <span>BRAND</span>
      <span class="footer__page">${dots}</span>
    </div>
  `;
}

// ---------- main ----------

const PROJECT_ROOT = path.resolve(__dirname, "../../../..");
const DESIGN_SYSTEM_DIR = path.join(PROJECT_ROOT, "design-system");
const ASSET_DIR = path.join(DESIGN_SYSTEM_DIR, "assets", "underline");
const BRAND_DIR = path.join(DESIGN_SYSTEM_DIR, "assets", "logo");
const CHARACTER_DIR = path.join(DESIGN_SYSTEM_DIR, "assets", "characters");
const TOOL_ICON_DIR = path.join(BRAND_DIR, "tools");

async function pngDataUrl(absPath) {
  const raw = await readFile(absPath);
  return `data:image/png;base64,${raw.toString("base64")}`;
}

// ---- Tool icon badges (generated on the fly, no favicon fetching) ----
// Each tool gets a rounded square badge with its brand letter, rendered as a
// tiny SVG embedded as a data URL. Keeps cards consistent — no broken pixels,
// no low-res favicons, no third-party asset drift.
// Two rendering modes per tool:
//  - `logo`: use the real brand PNG from design-system/assets/logo/tools/<name>.png,
//            wrapped in a white rounded-square with a drop shadow so the icon
//            reads cleanly even on a white card background.
//  - letter badge: solid brand-color rounded-square with a glyph, used when
//                  the source logo is too small / low-quality to upscale.
// The gabia favicon we have is 520 bytes and renders blocky — fall back to a
// blue "가" letter badge for that one, matching the user's PDF reference.
const TOOL_BADGES = {
  gabia:      { mode: "letter", label: "가", bg: "#3B7BFE", fg: "#FFFFFF" },
  draph:      { mode: "logo",   file: "draph.png" },
  photoroom:  { mode: "logo",   file: "photoroom.png" },
  wrtn:       { mode: "logo",   file: "wrtn.png" },
  miricanvas: { mode: "logo",   file: "miricanvas.png" },
};

function toolLetterBadgeHtml(def) {
  // DOM node so Korean glyphs inherit Pretendard from the host page.
  return `<div class="icon icon--letter" style="background:${def.bg};color:${def.fg}">${esc(def.label)}</div>`;
}

function toolLogoBadgeHtml(dataUrl) {
  return `<div class="icon icon--logo"><img src="${dataUrl}" alt="" /></div>`;
}

// ---- Hand-drawn underline brush (generated inline) ----
// A single wavy stroke in 브랜드 액센트 블루, stretched to the width of the highlight
// run via preserveAspectRatio="none". Replaces the asset_under-line_02.svg
// highlighter-band look with something closer to a drawn underline.
function handDrawnUnderlineDataUrl(color = "#0B78F8") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 20" preserveAspectRatio="none">` +
    `<path d="M4 12 C 50 4, 95 18, 150 10 S 245 16, 296 8" ` +
    `stroke="${color}" stroke-width="5" fill="none" ` +
    `stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
}

async function svgDataUrl(absPath) {
  const raw = await readFile(absPath, "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(raw, "utf8").toString("base64")}`;
}

// Variant that forces `preserveAspectRatio="none"` on the root <svg> so the
// asset distorts freely to fill the background-size we give it. The brush
// stroke is meant to be a visual "scribble" — its natural aspect is a design
// artifact, not a constraint. Stretching it is the intended use.
async function svgStretchedDataUrl(absPath) {
  const raw = await readFile(absPath, "utf8");
  const stretched = raw.replace(
    /<svg\b([^>]*?)>/,
    (match, attrs) => {
      if (/preserveAspectRatio\s*=/.test(attrs)) {
        return match.replace(
          /preserveAspectRatio\s*=\s*"[^"]*"/,
          'preserveAspectRatio="none"',
        );
      }
      return `<svg${attrs} preserveAspectRatio="none">`;
    },
  );
  return `data:image/svg+xml;base64,${Buffer.from(stretched, "utf8").toString("base64")}`;
}

export async function loadAssets() {
  const [base, html, dark, light, types, wordmarkWhite, wordmarkBlue, ctaCharacter] =
    await Promise.all([
      readFile(path.join(TPL_DIR, "base.css"), "utf8"),
      readFile(path.join(TPL_DIR, "base.html"), "utf8"),
      readFile(path.join(TPL_DIR, "theme-dark.css"), "utf8"),
      readFile(path.join(TPL_DIR, "theme-light.css"), "utf8"),
      readFile(path.join(TPL_DIR, "card-types.css"), "utf8"),
      // `-1` suffix is the white-fill variant for dark theme
      svgDataUrl(path.join(BRAND_DIR, "logo_symbol+logo_blue-1.svg")),
      svgDataUrl(path.join(BRAND_DIR, "logo_symbol+logo_blue.svg")),
      pngDataUrl(path.join(CHARACTER_DIR, "cta-box-character.png")),
    ]);
  // Brand brush-wave underline asset. Stretches to each highlight's width.
  const brush = await svgStretchedDataUrl(
    path.join(ASSET_DIR, "underline_brush_wave.svg"),
  );
  return {
    baseCss: base,
    html,
    darkCss: dark,
    lightCss: light,
    typesCss: types,
    brushDataUrl: brush,
    wordmarkWhite,
    wordmarkBlue,
    ctaCharacter,
  };
}

/**
 * Build HTML strings for each card in the spec.
 * @returns {Array<{index:number,type:string,html:string,filename:string}>}
 */
export async function buildHtml(spec) {
  const { errors, warnings } = validateSpec(spec);
  for (const w of warnings) console.warn(`[build-html] warning: ${w}`);
  if (errors.length) {
    throw new Error(`[build-html] invalid spec:\n - ${errors.join("\n - ")}`);
  }

  const assets = await loadAssets();
  const themeCss = spec.theme === "dark" ? assets.darkCss : assets.lightCss;
  // Dark theme needs the white-fill wordmark; light needs the blue-fill.
  const wordmarkSrc =
    spec.theme === "dark" ? assets.wordmarkWhite : assets.wordmarkBlue;
  const brushUrl = `url("${assets.brushDataUrl}")`;

  // Resolve icon HTML per card. Logo-mode needs to load + base64 the PNG.
  const iconHtmls = await Promise.all(
    spec.cards.map(async (c) => {
      if (!c.icon) return "";
      const def = TOOL_BADGES[c.icon];
      if (!def) return "";
      if (def.mode === "logo") {
        try {
          const dataUrl = await pngDataUrl(path.join(TOOL_ICON_DIR, def.file));
          return toolLogoBadgeHtml(dataUrl);
        } catch {
          return ""; // fail-soft if logo PNG missing
        }
      }
      return toolLetterBadgeHtml(def);
    }),
  );

  return spec.cards.map((card, i) => {
    let body;
    switch (card.type) {
      case "hook":
        body = renderHook(card, { wordmarkSrc });
        break;
      case "intro":
        body = renderIntro(card);
        break;
      case "problem":
      case "perspective":
        body = renderProblemOrPerspective(card);
        break;
      case "solution":
        body = renderSolution(card);
        break;
      case "info":
        body = renderInfo(card, { iconHtml: iconHtmls[i] });
        break;
      case "cta":
        body = renderCta(card, {
          wordmarkSrc: assets.wordmarkWhite,
          characterSrc: assets.ctaCharacter,
        });
        break;
      default:
        body = `<pre>${esc(JSON.stringify(card, null, 2))}</pre>`;
    }

    // Layout rules: body cards (problem/perspective/solution/intro) are now
    // mobile-first and ruthlessly minimal — emoji + headline + body, nothing
    // else. Content sources live in the feed caption.
    // Hook keeps its top-left wordmark; CTA keeps its bottom-right wordmark.
    const fullBody = body;

    const html = assets.html
      .replace("{{baseCss}}", assets.baseCss)
      .replace("{{themeCss}}", themeCss)
      .replace("{{typesCss}}", assets.typesCss)
      .replace("{{brushUrl}}", brushUrl)
      .replace(/\{\{theme\}\}/g, esc(spec.theme))
      .replace(/\{\{type\}\}/g, esc(card.type))
      .replace(/\{\{topic\}\}/g, esc(spec.topic))
      .replace("{{cardBody}}", fullBody);

    const idx = String(i + 1).padStart(2, "0");
    const filename = `${idx}_${card.type}`;

    return { index: i, type: card.type, html, filename };
  });
}
