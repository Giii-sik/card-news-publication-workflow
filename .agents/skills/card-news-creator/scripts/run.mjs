#!/usr/bin/env node
// run.mjs — orchestrator
// Usage:
//   npm run generate -- <spec.json>
//   cat spec.json | npm run generate -- -

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildHtml } from "./build-html.mjs";
import { renderToPng, closeBrowser } from "./render.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "../../../../");
// Brand assets (wordmark SVGs, paint-brush stroke) are resolved inside
// build-html.mjs so any caller of `buildHtml(spec)` gets the full design
// system baked in without having to pre-resolve file paths.

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

async function loadSpec(arg) {
  if (!arg) {
    console.error("usage: run.mjs <spec.json | ->");
    process.exit(2);
  }
  const raw =
    arg === "-"
      ? await readStdin()
      : await readFile(path.resolve(process.cwd(), arg), "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error(`[run] failed to parse spec JSON: ${e.message}`);
    process.exit(2);
  }
}

async function resolveLogoSrc(theme) {
  // Inline the logo as a base64 data URL so Puppeteer's about:blank context
  // can render it without file:// access permissions or cross-origin issues.
  const fname = theme === "dark" ? "logo_symbol_white.png" : "logo_symbol_blue.png";
  const abs = path.join(PROJECT_ROOT, "design-system", "assets", "logo", fname);
  const buf = await readFile(abs);
  return `data:image/png;base64,${buf.toString("base64")}`;
}

async function main() {
  const [, , arg] = process.argv;
  const spec = await loadSpec(arg);

  const outDir = path.join(
    PROJECT_ROOT,
    "output",
    `${todayStr()}_${spec.slug}`,
  );
  await mkdir(outDir, { recursive: true });

  const logoSrc = await resolveLogoSrc(spec.theme);
  const cards = await buildHtml(spec, { logoSrc });

  // Persist a copy of the resolved spec and editable HTML alongside the PNGs
  // for traceability and graphic-designer handoff.
  await writeFile(
    path.join(outDir, "_spec.json"),
    JSON.stringify(spec, null, 2),
    "utf8",
  );
  const htmlDir = path.join(outDir, "html");
  await mkdir(htmlDir, { recursive: true });
  await Promise.all(
    cards.map((card) =>
      writeFile(path.join(htmlDir, `${card.filename}.html`), card.html, "utf8"),
    ),
  );

  try {
    const files = await renderToPng(cards, outDir);
    console.log(`\n[run] done — ${files.length} cards written to:`);
    console.log(`  ${outDir}`);
  } finally {
    await closeBrowser();
  }
}

main().catch((err) => {
  console.error(err?.stack || err);
  process.exit(1);
});
