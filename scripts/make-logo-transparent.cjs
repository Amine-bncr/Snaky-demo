const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Flood-fill the outer white background to transparency, keeping the
// white letters inside the navy banner opaque. Anti-aliases the edge.
const SRC = 'public/logo.png';
const OUT1 = 'src/assets/logo-snaky.png';
const OUT2 = 'src/assets/logo-snaky@2x.png';

const TOL = 28;          // white tolerance for flood fill
const SPREAD = 34;       // max channel spread to count as "white"
const EDGE = 2;          // boundary neighbourhood radius for anti-aliasing

function isWhite(r, g, b) {
  return r >= TOL && g >= TOL && b >= TOL && Math.max(r, g, b) - Math.min(r, g, b) <= SPREAD;
}

async function process(srcPath, outPath, scale) {
  const base = await sharp(srcPath).metadata();
  const w0 = base.width;
  const h0 = base.height;
  const { data, info } = await sharp(srcPath)
    .resize(Math.round(w0 * scale), Math.round(h0 * scale), { fit: 'fill' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const n = w * h;

  // Flood fill from all four edges.
  const bg = new Uint8Array(n);
  const stack = [];
  const visit = (x, y) => {
    const i = (y * w + x) << 2;
    if (bg[i >> 2]) return;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (!isWhite(r, g, b)) return;
    bg[i >> 2] = 1;
    stack.push(x, y);
  };
  for (let x = 0; x < w; x++) { visit(x, 0); visit(x, h - 1); }
  for (let y = 0; y < h; y++) { visit(0, y); visit(w - 1, y); }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    if (x > 0) visit(x - 1, y);
    if (x < w - 1) visit(x + 1, y);
    if (y > 0) visit(x, y - 1);
    if (y < h - 1) visit(x, y + 1);
  }

  // Distance transform-ish: mark boundary pixels (near a background pixel).
  const nearBg = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (bg[i]) continue;
    const x = i % w, y = (i / w) | 0;
    let touch = false;
    for (let dy = -EDGE; dy <= EDGE && !touch; dy++) {
      for (let dx = -EDGE; dx <= EDGE && !touch; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (bg[ny * w + nx]) touch = true;
      }
    }
    nearBg[i] = touch ? 1 : 0;
  }

  // Write alpha.
  for (let i = 0; i < n; i++) {
    const idx = i << 2;
    if (bg[i]) {
      data[idx + 3] = 0;
    } else if (nearBg[i]) {
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      const whiteness = (r + g + b) / 3;
      // Whiter boundary pixel => more transparent (smooths the cut edge).
      const a = Math.max(0, Math.min(255, Math.round((255 - whiteness) / 60 * 255)));
      data[idx + 3] = a;
    } else {
      data[idx + 3] = 255;
    }
  }

  // Trim transparent margins.
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[((y * w + x) << 2) + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const crop = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract(crop)
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`${outPath}: ${w}x${h} -> crop ${crop.width}x${crop.height} (bg ${n - bg.reduce((a, b) => a + b, 0)} opaque of ${n})`);
}

(async () => {
  const meta = await sharp(SRC).metadata();
  await process(SRC, OUT1, 1);
  await process(SRC, OUT2, 2);
})();