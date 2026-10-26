import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5177';
const browser = await chromium.launch();
const page = await browser.newPage();

function hex(rgb) {
  const m = rgb.match(/\d+/g);
  if (!m) return rgb;
  return '#' + m.slice(0, 3).map((n) => parseInt(n, 10).toString(16).padStart(2, '0')).join('');
}

const out = {};

for (const name of ['375x667', '768x1024', '1280x720']) {
  const sizes = { '375x667': { w: 375, h: 667 }, '768x1024': { w: 768, h: 1024 }, '1280x720': { w: 1280, h: 720 } }[name];
  await page.setViewportSize({ width: sizes.w, height: sizes.h });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.hero-stage', { timeout: 10000 }).catch(() => null);

  const r = await page.evaluate(() => {
    const res = { vp: name };
    const hdr = document.querySelector('header');
    const pin = document.querySelector('.hero-pin');
    const pinRect = pin.getBoundingClientRect();

    // 1. Logo center pixel color (transparent or logo art, never white box)
    const logo = hdr.querySelector('img');
    if (logo) {
      const lr = logo.getBoundingClientRect();
      const cx = Math.round(lr.left + lr.width * 0.5);
      const cy = Math.round(lr.top + lr.height * 0.5);
      res.logoCenterPx = { x: cx, y: cy, hex: null };
    }

    // 2. Hero bottom pixel (navy, no cream gap)
    const bx = Math.round(pinRect.width / 2);
    const by = Math.round(pinRect.top + pinRect.height - 3);
    const heroBottomEl = document.elementFromPoint(bx, by);
    res.heroBottom = heroBottomEl
      ? { tag: heroBottomEl.tagName, cls: heroBottomEl.className, bg: getComputedStyle(heroBottomEl).backgroundColor }
      : null;

    // 3. Element below the pin (should be cream Ribbon)
    const belowY = Math.round(pinRect.bottom + 3);
    if (belowY < window.innerHeight) {
      const belowEl = document.elementFromPoint(bx, belowY);
      res.belowPin = belowEl
        ? { tag: belowEl.tagName, cls: belowEl.className, bg: getComputedStyle(belowEl).backgroundColor }
        : null;
    } else {
      res.belowPin = 'off-screen';
    }

    // 4. CTA overlap
    const ctas = [...document.querySelectorAll('.hero-cta a')];
    res.ctaOverlap = (() => {
      if (ctas.length < 2) return 'n/a';
      const a = ctas[0].getBoundingClientRect();
      const b = ctas[1].getBoundingClientRect();
      const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return ox > 0 && oy > 0 ? `OVERLAP ${ox}x${oy}` : `none (gap x=${Math.round(Math.max(a.left, b.left) - Math.min(a.right, b.right))}px)`;
    })();

    return res;
  }, name);

  // sample actual pixel colors
  if (r.logoCenterPx) {
    const color = await page.evaluate((p) => {
      const el = document.elementFromPoint(p.x, p.y);
      return el ? getComputedStyle(el).backgroundColor : 'no-element';
    }, r.logoCenterPx);
    r.logoCenterPx.hex = color;
  }

  out[name] = r;
  console.log(name, JSON.stringify(r));
}

await browser.close();
console.log(JSON.stringify(out, null, 2));