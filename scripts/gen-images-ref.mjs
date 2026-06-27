#!/usr/bin/env node
// Reference-guided generation: feed the headless model renders (web/assets/refs/)
// to gpt-image-1's /v1/images/edits so the landing art stays faithful to the real
// game models, just polished. Transparent PNGs out to web/assets/ref-gen/. Key from .env.
//
//   node scripts/gen-images-ref.mjs [--force]

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REFS = join(ROOT, 'web', 'assets', 'refs');
const OUT = join(ROOT, 'web', 'assets', 'ref-gen');
const MODEL = 'gpt-image-1';
const FORCE = process.argv.includes('--force');

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
  console.error('Missing OPENAI_API_KEY. Aborting.');
  process.exit(1);
}

const STYLE =
  'Polished cozy low-poly game art, soft warm lighting, smooth clean shading, charming and inviting, ' +
  'transparent background, clean cutout with a soft contact shadow, no text, no UI.';

const SPECS = [
  {
    out: 'char.png',
    refs: ['char.png'],
    size: '1024x1536',
    prompt:
      'Restyle this exact game character as polished cozy art, keeping the SAME design: brown hair, ' +
      'red varsity jacket with light-grey sleeves and black-and-white striped cuffs, dark inner shirt, ' +
      'blue jeans, friendly face. Standing relaxed, optionally holding a small axe. ' + STYLE,
  },
  {
    out: 'dog.png',
    refs: ['dog.png'],
    size: '1024x1024',
    prompt:
      'Restyle this exact dog as polished cozy art, keeping the SAME design: small rounded dog, tan/cream body ' +
      'with brown patches on the face, back and a leg, floppy brown ears, sitting and happy. ' + STYLE,
  },
  {
    out: 'apple-tree.png',
    refs: ['apple-tree.png'],
    size: '1024x1536',
    prompt:
      'Restyle this exact apple tree as polished cozy art, keeping the SAME design: rounded low-poly canopy ' +
      'with red apples and a brown trunk. ' + STYLE,
  },
  {
    out: 'cabin.png',
    refs: ['build-wall.png', 'build-floor.png', 'build-ramp.png'],
    size: '1024x1024',
    prompt:
      'A small cozy cabin assembled from these exact modular building pieces (wooden wall, floor platform and ramp), ' +
      'snapped together on a grid into a little hut. Keep the materials and style of the pieces. ' + STYLE,
  },
  {
    out: 'hero-island.png',
    refs: ['char.png', 'dog.png', 'apple-tree.png', 'build-wall.png'],
    size: '1536x1024',
    prompt:
      'A cozy low-poly island diorama scene featuring THIS character, THIS dog and THESE apple trees, ' +
      'with a small cabin built from this wooden wall piece, on a sandy shore by a calm teal sea, warm sunny light. ' +
      'Keep each subject faithful to its reference design. The whole island floats as a diorama. ' + STYLE,
  },
];

async function generate(spec) {
  const out = join(OUT, spec.out);
  if (existsSync(out) && !FORCE) {
    console.log(`· skip (exists): ${spec.out}`);
    return true;
  }
  const fd = new FormData();
  fd.append('model', MODEL);
  fd.append('prompt', spec.prompt);
  fd.append('n', '1');
  fd.append('size', spec.size);
  fd.append('quality', 'medium');
  fd.append('background', 'transparent');
  fd.append('output_format', 'png');
  for (const ref of spec.refs) {
    const buf = readFileSync(join(REFS, ref));
    fd.append('image[]', new Blob([buf], { type: 'image/png' }), ref);
  }
  console.log(`→ ${spec.out}  (refs: ${spec.refs.join(', ')})…`);
  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}` },
    body: fd,
  });
  if (!res.ok) {
    console.error(`✗ ${spec.out}: HTTP ${res.status} — ${(await res.text()).slice(0, 300)}`);
    return false;
  }
  const b64 = (await res.json())?.data?.[0]?.b64_json;
  if (!b64) {
    console.error(`✗ ${spec.out}: no image data`);
    return false;
  }
  writeFileSync(out, Buffer.from(b64, 'base64'));
  console.log(`✓ wrote ref-gen/${spec.out}`);
  return true;
}

mkdirSync(OUT, { recursive: true });
console.log(`Model: ${MODEL} (edits, reference-guided) · output: web/assets/ref-gen/`);
let ok = 0;
for (const spec of SPECS) {
  try {
    if (await generate(spec)) ok++;
  } catch (e) {
    console.error(`✗ ${spec.out}: ${e.message}`);
  }
}
console.log(`\nDone: ${ok}/${SPECS.length} ok.`);
if (ok < SPECS.length) process.exit(2);
