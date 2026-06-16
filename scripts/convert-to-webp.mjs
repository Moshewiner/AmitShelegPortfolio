import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets';
const MIN_BYTES = 200 * 1024; // only convert PNGs larger than 200KB
const MAX_EDGE = 2000; // downscale long edge, never upscale
const QUALITY = 80;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (extname(entry.name).toLowerCase() === '.png') out.push(full);
  }
  return out;
}

const pngs = walk(ROOT).filter((p) => statSync(p).size > MIN_BYTES);
let savedTotal = 0;

for (const png of pngs) {
  const out = png.replace(/\.png$/i, '.webp');
  const before = statSync(png).size;
  await sharp(png)
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const after = statSync(out).size;
  savedTotal += before - after;
  const kb = (n) => (n / 1024).toFixed(0) + 'KB';
  console.log(`${kb(before)} -> ${kb(after)}  ${out}`);
}

console.log(`\nConverted ${pngs.length} images. Saved ~${(savedTotal / 1024 / 1024).toFixed(1)}MB.`);
