#!/usr/bin/env node

import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

function usage() {
  console.error("usage: npm run render:html -- <input.html> <output.png>");
  process.exit(2);
}

async function resolveExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  try {
    const { Browser, getInstalledBrowsers } = await import("@puppeteer/browsers");
    const cacheDir =
      process.env.PUPPETEER_CACHE_DIR ||
      path.join(os.homedir(), ".cache", "puppeteer");
    const installed = await getInstalledBrowsers({ cacheDir });
    const shell = installed
      .filter((browser) => browser.browser === Browser.CHROMEHEADLESSSHELL)
      .sort((a, b) => a.buildId.localeCompare(b.buildId))
      .at(-1);
    return shell?.executablePath;
  } catch {
    return undefined;
  }
}

async function main() {
  const [, , input, output] = process.argv;
  if (!input || !output) usage();

  const inputPath = path.resolve(process.cwd(), input);
  const outputPath = path.resolve(process.cwd(), output);
  await mkdir(path.dirname(outputPath), { recursive: true });

  const { default: puppeteer } = await import("puppeteer");
  const userDataDir = await mkdtemp(
    path.join(os.tmpdir(), "card-news-publication-workflow-puppeteer-"),
  );
  const homeDir = await mkdtemp(path.join(os.tmpdir(), "card-news-publication-workflow-home-"));
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await resolveExecutablePath(),
    userDataDir,
    env: {
      ...process.env,
      HOME: homeDir,
      XDG_CONFIG_HOME: path.join(homeDir, ".config"),
      XDG_CACHE_HOME: path.join(homeDir, ".cache"),
    },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=medium",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-breakpad",
      "--disable-crash-reporter",
      "--noerrdialogs"
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle0" });
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    });
    await page.screenshot({
      path: outputPath,
      type: "png",
      clip: { x: 0, y: 0, width: 1080, height: 1350 }
    });
    await page.close();
    console.log(`[render-html] wrote ${outputPath}`);
  } finally {
    await browser.close();
    await rm(userDataDir, { recursive: true, force: true });
    await rm(homeDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
