#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import path from "node:path";

function usage() {
  console.error("usage: npm run check:assets -- <carousel-folder>");
  process.exit(2);
}

async function exists(absPath) {
  try {
    await access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const folder = process.argv[2];
  if (!folder) usage();

  const root = path.resolve(process.cwd(), folder);
  const specPath = path.join(root, "spec.json");
  const assetsDir = path.join(root, "assets");
  const errors = [];
  const warnings = [];

  if (!(await exists(specPath))) errors.push("spec.json missing");
  if (!(await exists(assetsDir))) errors.push("assets/ folder missing");

  if (await exists(specPath)) {
    const spec = JSON.parse(await readFile(specPath, "utf8"));
    if (spec.visual?.mode === "image-led-cover") {
      const promptPath = path.join(root, spec.visual.assetPrompt || "");
      const assetPath = path.join(root, spec.visual.coverAsset || "");
      if (!(await exists(promptPath))) errors.push(`${spec.visual.assetPrompt} missing`);
      if (!(await exists(assetPath))) {
        warnings.push(`${spec.visual.coverAsset} missing; acceptable while assetStatus is prompt-only`);
      }
    }
  }

  const assetReadme = path.join(assetsDir, "README.md");
  if (!(await exists(assetReadme))) errors.push("assets/README.md missing");

  if (warnings.length) {
    console.log("[check-assets] warnings:");
    warnings.forEach((warning) => console.log(`  - ${warning}`));
  }

  if (errors.length) {
    console.error("[check-assets] errors:");
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log(`[check-assets] ok: ${folder}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
