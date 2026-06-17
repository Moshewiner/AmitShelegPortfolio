import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

// Folders passed as CLI args (relative to repo root). Converts every PNG inside
// to a resized WebP alongside the original (originals are left untouched).
const folders = process.argv.slice(2);
const MAX_EDGE = 2000;
const QUALITY = 80;

if (folders.length === 0) {
  console.error('Usage: node scripts/convert-folders-to-webp.mjs <folder> [<folder> ...]');
  process.exit(1);
}

let savedTotal = 0;
const kb = (n) => (n / 1024).toFixed(0) + 'KB';

for (const folder of folders) {
  const pngs = readdirSync(folder, { withFileTypes: true })
    .filter((e) => e.isFile() && extname(e.name).toLowerCase() === '.png')
    .map((e) => join(folder, e.name));

  for (const png of pngs) {
    const out = png.replace(/\.png$/i, '.webp');
    const before = statSync(png).size;
    await sharp(png)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const after = statSync(out).size;
    savedTotal += before - after;
    console.log(`${kb(before)} -> ${kb(after)}  ${out}`);
  }
}

console.log(`\nSaved ~${(savedTotal / 1024 / 1024).toFixed(1)}MB.`);
