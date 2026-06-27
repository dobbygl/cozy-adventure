#!/usr/bin/env node
// Generate branding art (game icon + README cover) that stays faithful to the
// REAL game models. Like gen-images-ref.mjs, this feeds the headless model
// renders in web/assets/refs/ to gpt-image-1's /v1/images/edits endpoint with
// "keep the SAME design" prompts, so the art matches what the game looks like
// instead of a generic text-to-image guess.
//
// Outputs (overwritten on every run): web/assets/icon.png, web/assets/cover.jpg
// Key from .env (OPENAI_API_KEY).
//
//   node scripts/gen-branding.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REFS = join(ROOT, 'web', 'assets', 'refs');
const OUT_DIR = join(ROOT, 'web', 'assets');
const MODEL = 'gpt-image-1'; // /v1/images/edits supports reference images

function loadEnv() {
  const out = {};
  try {
    for (const line of readFileSync(join(ROOT, '.env'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    /* none */
  }
  return out;
}
const API_KEY = loadEnv().OPENAI_API_KEY || process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error('Missing OPENAI_API_KEY (.env or environment). Aborting.');
  process.exit(1);
}

// Faithful design descriptions, kept in sync with gen-images-ref.mjs.
const CHAR = 'the boy with brown hair, red varsity jacket with light-grey sleeves and ' +
  'black-and-white striped cuffs, dark inner shirt and blue jeans';
const DOG = 'the small rounded tan/cream dog with brown patches on its face, back and a leg, ' +
  'floppy brown ears and a big round eye';
const TREE = 'the rounded low-poly apple trees with red apples and brown trunks';
const HUT = 'a small cabin built from the wooden modular wall, floor and ramp pieces';

const STYLE =
  'Polished cozy low-poly 3D game art, soft global illumination, warm sunny golden-hour light, ' +
  'smooth rounded shapes, palette of sandy beige, teal ocean, leaf green, apple red and golden sun. ' +
  'Keep every subject faithful to its reference design. No text, no UI, no watermark.';

const SPECS = [
  {
    file: 'icon.png',
    size: '1024x1024',
    output_format: 'png',
    refs: ['char.png', 'dog.png', 'apple-tree.png', 'build-wall.png'],
    prompt:
      `A game app icon: a small floating island diorama, centered, featuring THIS exact character (${CHAR}), ` +
      `THIS exact dog (${DOG}), ${TREE} and ${HUT}, on a sandy shore ringed by teal water, ` +
      'composed as a compact rounded badge with a soft circular background glow and a gentle ground shadow. ' +
      'Bold readable silhouette at small sizes. ' +
      STYLE,
  },
  {
    file: 'cover.jpg',
    size: '1536x1024',
    output_format: 'jpeg',
    refs: ['char.png', 'dog.png', 'apple-tree.png', 'build-wall.png', 'axe.png'],
    prompt:
      `A wide cinematic cover banner for a cozy survival-building island game at golden hour, ` +
      `featuring THIS exact character (${CHAR}) holding the wooden axe, THIS exact dog (${DOG}) beside him, ` +
      `${TREE} and ${HUT}, on a sandy shore by a calm teal sea. ` +
      'Generous empty sky at the top to overlay a title later. Hero banner composition, filled background. ' +
      STYLE,
  },
];

async function generate(spec) {
  const fd = new FormData();
  fd.append('model', MODEL);
  fd.append('prompt', spec.prompt);
  fd.append('n', '1');
  fd.append('size', spec.size);
  fd.append('quality', 'high');
  fd.append('background', 'opaque');
  fd.append('output_format', spec.output_format);
  for (const ref of spec.refs) {
    const buf = readFileSync(join(REFS, ref));
    fd.append('image[]', new Blob([buf], { type: 'image/png' }), ref);
  }
  console.log(`→ ${spec.file} (${spec.size}, refs: ${spec.refs.join(', ')})…`);
  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: fd,
  });
  if (!res.ok) {
    console.error(`✗ ${spec.file}: HTTP ${res.status} — ${(await res.text()).slice(0, 400)}`);
    return false;
  }
  const b64 = (await res.json())?.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`✗ ${spec.file}: no image data`);
    return false;
  }
  writeFileSync(join(OUT_DIR, spec.file), Buffer.from(b64, 'base64'));
  console.log(`✓ wrote ${spec.file}`);
  return true;
}

mkdirSync(OUT_DIR, { recursive: true });
console.log(`Model: ${MODEL} (edits, reference-guided) · output: web/assets/`);
let ok = 0;
for (const spec of SPECS) {
  try {
    if (await generate(spec)) ok++;
  } catch (e) {
    console.error(`✗ ${spec.file}: ${e.message}`);
  }
}
console.log(`\nDone: ${ok}/${SPECS.length} ok.`);
process.exit(ok < SPECS.length ? 1 : 0);
