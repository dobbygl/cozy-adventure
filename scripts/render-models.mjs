#!/usr/bin/env node
// Headless render of the real game models to transparent reference PNGs.
// Uses the system google-chrome via puppeteer-core and the Vite dev server
// (so `import 'three'` and /assets/*.glb resolve). Output: web/assets/refs/.
//
//   node scripts/render-models.mjs

import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'web', 'assets', 'refs');
const PORT = 5177;
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';

// model file -> { name, size, yaw, pitch }
const MODELS = [
  { file: 'Player_Model_New.glb', name: 'char', size: 1024, yaw: 0.45, pitch: 0.32 },
  { file: 'dog_001.glb', name: 'dog', size: 1024, yaw: 0.7, pitch: 0.34 },
  { file: 'env_apple_tree.glb', name: 'apple-tree', size: 1024, yaw: 0.5, pitch: 0.28 },
  { file: 'build_wall.glb', name: 'build-wall', size: 1024, yaw: 0.7, pitch: 0.3 },
  { file: 'build_floor_ceiling.glb', name: 'build-floor', size: 1024, yaw: 0.7, pitch: 0.45 },
  { file: 'build_ramp.glb', name: 'build-ramp', size: 1024, yaw: 0.7, pitch: 0.35 },
  { file: 'apple.glb', name: 'apple', size: 1024, yaw: 0.6, pitch: 0.35 },
  { file: 'axe.glb', name: 'axe', size: 1024, yaw: 0.6, pitch: 0.35 },
];

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (async function poll() {
      try {
        const r = await fetch(url);
        if (r.ok) return resolve();
      } catch {
        /* not up yet */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error('vite did not start in time'));
      setTimeout(poll, 300);
    })();
  });
}

mkdirSync(OUT, { recursive: true });

console.log('Starting Vite dev server…');
const vite = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], {
  cwd: ROOT,
  stdio: 'ignore',
});

let browser;
try {
  await waitForServer(`http://localhost:${PORT}/`);
  console.log('Vite up. Launching headless Chrome…');
  browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
    ],
  });

  let ok = 0;
  for (const m of MODELS) {
    const page = await browser.newPage();
    await page.setViewport({ width: m.size, height: m.size, deviceScaleFactor: 1 });
    const url = `http://localhost:${PORT}/tools/render-model.html?model=${encodeURIComponent(
      m.file
    )}&size=${m.size}&yaw=${m.yaw}&pitch=${m.pitch}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForFunction('window.__rendered !== undefined', { timeout: 30000 });
      const state = await page.evaluate(() => window.__rendered);
      if (state !== true) throw new Error('render failed: ' + state);
      await new Promise((r) => setTimeout(r, 250)); // let the rAF loop paint
      const el = await page.$('#c');
      await el.screenshot({ path: join(OUT, `${m.name}.png`), omitBackground: true });
      console.log(`✓ ${m.name}.png  (from ${m.file})`);
      ok++;
    } catch (err) {
      console.error(`✗ ${m.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
  console.log(`\nDone: ${ok}/${MODELS.length} reference renders in web/assets/refs/`);
} finally {
  if (browser) await browser.close();
  vite.kill('SIGTERM');
}
