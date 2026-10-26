import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), '.tmp');
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '375x667', w: 375, h: 667 },
  { name: '768x1024', w: 768, h: 1024 },
  { name: '1280x720', w: 1280, h: 720 },
];

const BASE = process.env.BASE_URL || 'http://localhost:5177';

const browser = await chromium.launch();
const page = await browser.newPage();

const results = [];

for (const vp of VIEWPORTS) {
  await page.setViewportSize({ width: vp.w, height: vp.h });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.hero-stage', { timeout: 10000 }).catch(() => null);

  // Scroll 0
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(OUT, `top-${vp.name}.png`) });

  // Scroll 40% of hero height
  const heroH = await page.evaluate(() => {
    const s = document.querySelector('.hero-stage');
    return s ? s.getBoundingClientRect().height : window.innerHeight;
  });
  await page.evaluate((h) => window.scrollTo(0, h * 0.4), heroH);
  await page.screenshot({ path: path.join(OUT, `scroll-${vp.name}.png`) });

  // Checks
  const check = await page.evaluate((vpName) => {
    const out = { vp: vpName };

    // 1. Header nav links present, stray sentence absent
    const header = document.querySelector('header');
    const headerText = header ? header.innerText : '';
    out.navLinks = {
      produits: headerText.includes('Produits'),
      histoire: headerText.includes('Notre histoire'),
      commander: headerText.includes('Commander'),
    };
    out.straySentence = document.body.innerText.includes('assurance que je vais');

    // 2. Logo has no white box on header
    const logo = header ? header.querySelector('img') : null;
    if (logo) {
      const style = window.getComputedStyle(logo);
      const bg = style.backgroundColor;
      const rect = logo.getBoundingClientRect();
      out.logo = {
        bg: bg || 'transparent',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    } else {
      out.logo = null;
    }

    // 3. No product photos in hero; CTAs not overlapped
    const hero = document.querySelector('.hero-stage');
    const heroImgs = hero ? hero.querySelectorAll('img') : [];
    out.heroImgCount = heroImgs.length;
    const cta = document.querySelectorAll('.hero-cta a');
    out.ctaCount = cta.length;

    // 4. Headline line widths vs container
    const h1 = document.querySelector('.hero-h1');
    if (h1) {
      const containerW = h1.getBoundingClientRect().width;
      const lines = [];
      const nodes = [...h1.querySelectorAll('.hero-word')];
      // group words into visual lines by comparing tops
      let cur = [];
      let lastTop = null;
      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        if (lastTop === null || Math.abs(r.top - lastTop) < 2) {
          cur.push(n);
        } else {
          lines.push(cur);
          cur = [n];
        }
        lastTop = r.top;
      }
      if (cur.length) lines.push(cur);
      out.headlineLines = lines.map((grp) => {
        const left = grp[0].getBoundingClientRect().left;
        const right = grp[grp.length - 1].getBoundingClientRect().right;
        return { width: Math.round(right - left), container: Math.round(containerW), overflow: (right - left) > containerW + 1 };
      });
    }

    // 5. Hero bottom gap at end of parallax
    const pin = document.querySelector('.hero-pin');
    const pinRect = pin ? pin.getBoundingClientRect() : null;
    out.pinBottom = pinRect ? Math.round(pinRect.bottom) : null;
    out.viewport = vpName;

    return out;
  }, vp.name);

  results.push(check);
  console.log(JSON.stringify(check, null, 2));
}

await browser.close();

const report = path.join(OUT, 'report.json');
fs.writeFileSync(report, JSON.stringify(results, null, 2));
console.log(`\nWrote ${report}`);