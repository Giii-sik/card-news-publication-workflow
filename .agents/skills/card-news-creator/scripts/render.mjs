// render.mjs
// Renders HTML strings to 1080x1350 PNGs via Puppeteer.

import { writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

async function resolveExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // Prefer Chrome Headless Shell over the app-bundled Chrome for Testing.
  // On macOS, launching the app bundle from Codex can trigger AppKit
  // registration crashes and visible crash-report popups. The shell binary is
  // headless-only and avoids that UI path.
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

let _browserPromise = null;
let _browserUserDataDir = null;
let _browserHomeDir = null;
async function getBrowser() {
  if (_browserPromise) return _browserPromise;
  const { default: puppeteer } = await import("puppeteer");
  _browserUserDataDir = await mkdtemp(
    path.join(os.tmpdir(), "card-news-publication-workflow-puppeteer-"),
  );
  _browserHomeDir = await mkdtemp(
    path.join(os.tmpdir(), "card-news-publication-workflow-home-"),
  );
  _browserPromise = puppeteer.launch({
    headless: true,
    executablePath: await resolveExecutablePath(),
    userDataDir: _browserUserDataDir,
    env: {
      ...process.env,
      HOME: _browserHomeDir,
      XDG_CONFIG_HOME: path.join(_browserHomeDir, ".config"),
      XDG_CACHE_HOME: path.join(_browserHomeDir, ".cache"),
    },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=medium",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-breakpad",
      "--disable-crash-reporter",
      "--noerrdialogs",
    ],
  });
  return _browserPromise;
}

/**
 * Render each HTML card to a PNG on disk.
 * @param {Array<{html:string,filename:string}>} cards
 * @param {string} outDir  absolute or cwd-relative
 * @param {{width?:number,height?:number,deviceScaleFactor?:number}} [opts]
 */
export async function renderToPng(cards, outDir, opts = {}) {
  const width = opts.width ?? 1080;
  const height = opts.height ?? 1350;
  const dsf = opts.deviceScaleFactor ?? 1;

  await mkdir(outDir, { recursive: true });

  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: dsf });

  const results = [];
  try {
    for (const card of cards) {
      await page.setContent(card.html, { waitUntil: "domcontentloaded" });
      // Ensure custom fonts are loaded before snapshot
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });
      const filePath = path.join(outDir, `${card.filename}.png`);
      const buf = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width, height },
        omitBackground: false,
      });
      await writeFile(filePath, buf);
      results.push(filePath);
      console.log(`[render] wrote ${filePath}`);
    }
  } finally {
    await page.close();
  }

  return results;
}

export async function closeBrowser() {
  if (_browserPromise) {
    const b = await _browserPromise;
    await b.close();
    _browserPromise = null;
    if (_browserUserDataDir) {
      await rm(_browserUserDataDir, { recursive: true, force: true });
      _browserUserDataDir = null;
    }
    if (_browserHomeDir) {
      await rm(_browserHomeDir, { recursive: true, force: true });
      _browserHomeDir = null;
    }
  }
}
