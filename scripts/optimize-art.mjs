#!/usr/bin/env node
// Turn the reference-guided PNGs (web/assets/ref-gen/) into deploy-ready art:
//  - transparent WebP cutouts in web/assets/ (small)
//  - an opaque og.jpg social card (hero flattened onto the sand colour)
//
//   node scripts/optimize-art.mjs

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'web', 'assets', 'ref-gen');
const OUT = join(ROOT, 'web', 'assets');
const SAND = '#f6ead2';

const CUTOUTS = ['char', 'dog', 'apple-tree', 'cabin', 'hero-island'];

mkdirSync(OUT, { recursive: true });

for (const name of CUTOUTS) {
  await sharp(join(SRC, `${name}.png`))
    .webp({ quality: 80, alphaQuality: 92, effort: 5 })
    .toFile(join(OUT, `${name}.webp`));
  console.log(`✓ ${name}.webp`);
}

// Social card: the hero scene, on the page's sand colour, 1200x630.
await sharp(join(SRC, 'hero-island.png'))
  .resize(1200, 630, { fit: 'contain', background: SAND })
  .flatten({ background: SAND })
  .jpeg({ quality: 84 })
  .toFile(join(OUT, 'og.jpg'));
console.log('✓ og.jpg (social card)');

console.log('\nDone.');
