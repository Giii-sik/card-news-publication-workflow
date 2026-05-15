import { readFile } from "node:fs/promises";
import test from "node:test";
import assert from "node:assert/strict";

test("renderer does not wait for network idle when setting static card HTML", async () => {
  const source = await readFile(
    new URL("../../.agents/skills/card-news-creator/scripts/render.mjs", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /waitUntil:\s*["']networkidle0["']/);
  assert.match(source, /waitUntil:\s*["']domcontentloaded["']/);
});

test("renderer prefers chrome-headless-shell over app-bundled Chrome", async () => {
  const source = await readFile(
    new URL("../../.agents/skills/card-news-creator/scripts/render.mjs", import.meta.url),
    "utf8",
  );

  assert.match(source, /CHROMEHEADLESSSHELL/);
  assert.doesNotMatch(source, /Google Chrome\.app/);
});
