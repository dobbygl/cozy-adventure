#!/usr/bin/env node
// Generate the landing-page art with OpenAI's image model.
// Key is read from .env (OPENAI_API_KEY). Model is configurable via
// OPENAI_IMAGE_MODEL in .env (defaults to gpt-image-2).
// Note: gpt-image-2 does not support transparent backgrounds, so images are
// opaque diorama scenes meant to be framed in rounded cards on the page.
// Idempotent: skips images that already exist unless run with --force.
//
//   node scripts/gen-images.mjs           # generate missing images
//   node scripts/gen-images.mjs --force   # regenerate everything

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'web', 'assets');
const FORCE = process.argv.includes('--force');

// --- read OPENAI_API_KEY / OPENAI_IMAGE_MODEL from .env (no dependency) ---
function loadEnv() {
  const out = {};
  try {
    for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    /* no .env */
  }
  return out;
}

const env = loadEnv();
const API_KEY = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const MODEL = env.OPENAI_IMAGE_MODEL || process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';
if (!API_KEY) {
  console.error('Missing OPENAI_API_KEY (.env or environment). Aborting.');
  process.exit(1);
}

// Shared art direction so every asset belongs to the same world.
const STYLE =
  'cozy low-poly 3D game art, soft global illumination, warm sunny lighting, ' +
  'smooth rounded shapes, palette of sandy beige, teal ocean, leaf green, apple red and golden sun, ' +
  'isometric three-quarter view, charming and inviting, no text, no UI, no watermark.';

// Framing hint for single-subject "specimen" shots so they sit cleanly in cards.
const FRAME =
  'Single subject centered on a soft, clean, warm sandy-beige seamless background with a gentle ground shadow, ' +
  'framed cozy diorama look. ';

const SPECS = [
  {
    file: 'hero-island.jpg',
    size: '1536x1024',
    prompt:
      'A small cozy tropical island diorama in three-quarter view: sandy shore, a couple of rounded apple trees, ' +
      'a tiny wooden cabin, a friendly low-poly dog, and a calm teal sea around it under a soft warm sky. ' +
      STYLE,
  },
  {
    file: 'char.jpg',
    size: '1024x1536',
    prompt:
      'A cute cozy adventurer character, simple rounded friendly design, holding a small wooden axe, standing relaxed. ' +
      FRAME +
      STYLE,
  },
  {
    file: 'dog.jpg',
    size: '1024x1024',
    prompt:
      'A cute golden-brown low-poly dog companion sitting happily, friendly and rounded. ' + FRAME + STYLE,
  },
  {
    file: 'apple-tree.jpg',
    size: '1024x1536',
    prompt:
      'A single rounded low-poly apple tree with a chunky trunk and bright red apples in the canopy. ' +
      FRAME +
      STYLE,
  },
  {
    file: 'cabin.jpg',
    size: '1024x1024',
    prompt:
      'A small cozy player-built wooden cabin made of modular walls, a floor platform and a ramp, ' +
      'snapped together on a tidy grid. ' +
      FRAME +
      STYLE,
  },
  {
    file: 'og.jpg',
    size: '1536x1024',
    prompt:
      'A warm wide hero scene of a cozy survival-building island at golden hour: a built wooden cabin, ' +
      'rounded apple trees, a friendly dog and a small adventurer on a sandy shore by a teal sea. ' +
      'Filled background, social share banner composition. ' +
      STYLE,
  },
];

async function generate(spec) {
  const out = join(OUT_DIR, spec.file);
  if (existsSync(out) && !FORCE) {
    console.log(`· skip (exists): ${spec.file}`);
    return { file: spec.file, ok: true, skipped: true };
  }
  const body = {
    model: MODEL,
    prompt: spec.prompt,
    n: 1,
    size: spec.size,
    quality: 'medium',
    output_format: 'jpeg',
  };
  console.log(`→ generating ${spec.file} (${spec.size})…`);
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`✗ ${spec.file}: HTTP ${res.status} — ${text.slice(0, 300)}`);
    return { file: spec.file, ok: false, status: res.status };
  }
  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`✗ ${spec.file}: no image data in response`);
    return { file: spec.file, ok: false };
  }
  writeFileSync(out, Buffer.from(b64, 'base64'));
  console.log(`✓ wrote ${spec.file}`);
  return { file: spec.file, ok: true };
}

mkdirSync(OUT_DIR, { recursive: true });
console.log(`Model: ${MODEL} · output: web/assets/ · ${FORCE ? 'force' : 'skip-existing'}`);
const results = [];
for (const spec of SPECS) {
  try {
    results.push(await generate(spec));
  } catch (err) {
    console.error(`✗ ${spec.file}: ${err.message}`);
    results.push({ file: spec.file, ok: false });
  }
}
const failed = results.filter((r) => !r.ok);
console.log(`\nDone: ${results.length - failed.length}/${results.length} ok.`);
if (failed.length) process.exit(2);
