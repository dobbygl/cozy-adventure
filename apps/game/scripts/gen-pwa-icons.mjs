// Generates the PWA icon set from the brand artwork (web/assets/icon.png, 1024²) into
// apps/game/public/. The icons are committed so the build does not depend on the landing dir:
// re-run `pnpm --filter @cozy/game pwa:icons` only when the brand icon changes.
//
// - icon-192 / icon-512: "any" purpose, full-bleed (the source already has comfortable margins).
// - icon-maskable: scaled into the safe zone on a brand-sand background, so OS masks (Android
//   adaptive icons) never clip the scene.
// - apple-touch-icon: 180² flattened on sand (iOS turns transparency black and adds its own mask).

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../../../web/assets/icon.png');
const OUT = resolve(here, '../public');

// Brand sand (--sand in web/styles.css); blends with the artwork's warm cream background.
const SAND = { r: 246, g: 234, b: 210 };

// Palette quantization keeps the icons small without visible quality loss at these sizes.
const PNG = { compressionLevel: 9, palette: true, quality: 90, effort: 8 };

async function main() {
  const src = sharp(SRC);

  // Full-bleed square icons.
  await src.clone().resize(192, 192).png(PNG).toFile(resolve(OUT, 'icon-192.png'));
  await src.clone().resize(512, 512).png(PNG).toFile(resolve(OUT, 'icon-512.png'));

  // Maskable: artwork at ~80% on a sand canvas so the OS safe zone never clips it.
  const inner = await src.clone().resize(410, 410).png().toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 3, background: SAND } })
    .composite([{ input: inner, gravity: 'center' }])
    .png(PNG)
    .toFile(resolve(OUT, 'icon-maskable.png'));

  // Apple touch icon: opaque, flattened on sand.
  await src.clone().resize(180, 180).flatten({ background: SAND }).png(PNG).toFile(resolve(OUT, 'apple-touch-icon.png'));

  console.log('PWA icons written to apps/game/public/: icon-192, icon-512, icon-maskable, apple-touch-icon');
}

main().catch((err) => {
  console.error('Failed to generate PWA icons:', err);
  process.exitCode = 1;
});
