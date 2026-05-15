#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const EXPECTED_WIDTH = 1080;
const EXPECTED_HEIGHT = 1350;

function usage() {
  console.error("usage: npm run inspect:output -- <output-folder>");
  process.exit(2);
}

function pngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

async function main() {
  const folder = process.argv[2];
  if (!folder) usage();

  const root = path.resolve(process.cwd(), folder);
  const entries = await readdir(root);
  const pngs = entries.filter((entry) => entry.endsWith(".png")).sort();
  const errors = [];

  if (pngs.length === 0) {
    errors.push("no PNG files found");
  }

  for (const file of pngs) {
    const abs = path.join(root, file);
    const size = pngSize(await readFile(abs));
    if (!size) {
      errors.push(`${file} is not a valid PNG`);
      continue;
    }
    if (size.width !== EXPECTED_WIDTH || size.height !== EXPECTED_HEIGHT) {
      errors.push(`${file} is ${size.width}x${size.height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
    }
  }

  if (errors.length) {
    console.error("[inspect-output] errors:");
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }

  console.log(`[inspect-output] ok: ${pngs.length} PNG file(s) at ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
