#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { validateSpec } from "../../.agents/skills/card-news-creator/scripts/build-html.mjs";

function usage() {
  console.error("usage: npm run validate:spec -- <spec.json>");
  process.exit(2);
}

function textFieldFor(card) {
  if (card.type === "hook") return card.title || "";
  if (card.type === "info") return card.headline || "";
  if (card.type === "cta") return card.title || "";
  return card.title || card.headline || "";
}

function addHarnessChecks(spec) {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(spec.sources) || spec.sources.length === 0) {
    errors.push("spec.sources must contain at least one source");
  } else {
    spec.sources.forEach((source, index) => {
      const type = source.type || "web";
      if (!source.title) errors.push(`sources[${index}].title required`);
      if (type === "internal-note") {
        if (!source.path) errors.push(`sources[${index}].path required for internal-note`);
        if (!source.createdAt || !/^\d{4}-\d{2}-\d{2}$/.test(source.createdAt)) {
          errors.push(`sources[${index}].createdAt must be YYYY-MM-DD for internal-note`);
        }
      } else if (type === "web") {
        if (!source.url || !/^https?:\/\//.test(source.url)) {
          errors.push(`sources[${index}].url must be an http(s) URL`);
        }
        if (!source.publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(source.publishedAt)) {
          errors.push(`sources[${index}].publishedAt must be YYYY-MM-DD`);
        }
      } else {
        errors.push(`sources[${index}].type must be 'web' or 'internal-note'`);
      }
    });
  }

  if (!Array.isArray(spec.hashtags) || spec.hashtags.length === 0) {
    warnings.push("spec.hashtags is empty");
  }

  if (Array.isArray(spec.cards)) {
    spec.cards.forEach((card, index) => {
      if (card.highlight) {
        const text = textFieldFor(card);
        if (!text.includes(card.highlight)) {
          errors.push(`cards[${index}].highlight is not an exact substring`);
        }
      }
      if (card.type === "cta" && !String(card.body || "").includes("Brand")) {
        warnings.push("CTA body does not mention Brand");
      }
    });
  }

  if (spec.visual?.mode === "image-led-cover") {
    if (!spec.visual.coverAsset) errors.push("visual.coverAsset required for image-led-cover");
    if (!spec.visual.assetPrompt) errors.push("visual.assetPrompt required for image-led-cover");
  }

  if (spec.track) {
    if (!["A", "B", "C", "D", "E"].includes(spec.track.id)) {
      errors.push("track.id must be one of A, B, C, D, E");
    }
    if (!spec.track.badge) warnings.push("track.badge is missing");
  }

  return { errors, warnings };
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) usage();

  const abs = path.resolve(process.cwd(), specPath);
  const raw = await readFile(abs, "utf8");
  const spec = JSON.parse(raw);

  const base = validateSpec(spec);
  const harness = addHarnessChecks(spec);
  const errors = [...base.errors, ...harness.errors];
  const warnings = [...base.warnings, ...harness.warnings];

  if (warnings.length) {
    console.log("[validate-spec] warnings:");
    warnings.forEach((warning) => console.log(`  - ${warning}`));
  }

  if (errors.length) {
    console.error("[validate-spec] errors:");
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log(`[validate-spec] ok: ${specPath}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
