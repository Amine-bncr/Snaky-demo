import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5177';
const browser = await chromium.launch();
const page = await browser.newPage();

const out = {};

for (const [name, size] of [['375x667', { w: 375, h: 667 }], ['768x1024', { w: 768, h: 1024 }], ['1280x720', { w: 1280, h: 720 }]]) {
  await page.setViewportSize({ width: size.w, height: size.h });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.hero-stage', { timeout: 10000 }).catch(() => null);

  const r = await page.evaluate(() => {
    const res = { vp: name };
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
    const pin = document.querySelector('.hero-pin');
    const pinRect = pin.getBoundingClientRect();

    // Sample the header background (should be cream, not white box behind logo)
    const hdr = document.querySelector('header');
    const hdrStyle = hdr ? getComputedStyle(hdr).backgroundColor : null;

    // Logo pixel: sample just left of logo center at header mid-height -> should be cream or logo art, not white
    const logo = hdr ? hdr.querySelector('img') : null;
    let logoPixel = null;
    if (logo) {
      const lr = logo.getBoundingClientRect();
      const cx = lr.left + lr.width * 0.5;
      const cy = lr.top + lr.height * 0.5;
      logoPixel = { x: Math.round(cx), y: Math.round(cy) };
    }

    // Hero bottom: sample the bottom-center of the pin (should be navy, no cream gap)
    const sampleAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return { tag: null, bg: null };
      const cs = getComputedStyle(el);
      return { tag: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''), bg: cs.backgroundColor || cs.background };
    };

    res.headerBg = hdrStyle;
    res.logoCenter = logoPixel;
    res.pinTop = Math.round(pinRect.top);
    res.pinBottom = Math.round(pinRect.bottom);

    // Sample near bottom-center of the pin
    const bx = Math.round(pinRect.width / 2);
    const by = Math.round(pinRect.top + pinRect.height - 4);
    res.heroBottomSample = sampleAt(bx, by);

    // Sample just below the pin bottom (next section should be cream Ribbon)
    const below = Math.round(pinRect.bottom + 4);
    if (below < window.innerHeight) {
      res.belowPinSample = sampleAt(bx, below);
    } else {
      res.belowPinSample = null;
    }

    // CTA overlap: bounding rects of the two CTAs must not intersect
    const ctas = [...document.querySelectorAll('.hero-cta a')];
    res.ctaRects = ctas.map((c) => {
      const r = c.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top - pinRect.top), left: Math.round(r.left) };
    });

    return res;
  }, name);

  out[name] = r;
  console.log(name, JSON.stringify(r));
}

await browser.close();
console.log(JSON.stringify(out, null, 2));