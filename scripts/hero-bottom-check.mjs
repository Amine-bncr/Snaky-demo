import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5177';
const browser = await chromium.launch();
const page = await await browser.newPage();
await page.setViewportSize({ width: 1280, height: 720 });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.hero-stage', { timeout: 10000 }).catch(() => null);

const res = await page.evaluate(() => {
  const pin = document.querySelector('.hero-pin');
  const stage = document.querySelector('.hero-stage');
  const backdrop = document.querySelector('.hero-fallback') || document.querySelector('.hero-media');
  const pinRect = pin.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const backRect = backdrop.getBoundingClientRect();

  // Walk the element stack at bottom-center of the pin and report each layer's bg
  const bx = Math.round(pinRect.width / 2);
  const by = Math.round(pinRect.top + pinRect.height - 2);
  const stack = [];
  let el = document.elementFromPoint(bx, by);
  while (el && el !== document.body) {
    const cs = getComputedStyle(el);
    stack.push({ tag: el.tagName, cls: el.className, bg: cs.backgroundColor || cs.background || 'none' });
    el = el.parentElement;
  }

  return {
    stage: { top: Math.round(stageRect.top), bottom: Math.round(stageRect.bottom), h: Math.round(stageRect.height) },
    pin: { top: Math.round(pinRect.top), bottom: Math.round(pinRect.bottom), h: Math.round(pinRect.height) },
    backdrop: { top: Math.round(backRect.top), bottom: Math.round(backRect.bottom), h: Math.round(backRect.height) },
    stackAtPinBottom: stack,
  };
}, {});

console.log(JSON.stringify(res, null, 2));

// Screenshot the bottom edge of the hero at scroll 0
await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: 'scripts/hero-bottom-scroll0.png', fullPage: false });

// Scroll to the end of the stage (hp ~ 1)
const stageH = await page.evaluate(() => document.querySelector('.hero-stage').getBoundingClientRect().height);
await page.evaluate((h) => window.scrollTo(0, h - window.innerHeight + 10), stageH);
await page.screenshot({ path: 'scripts/hero-bottom-scrollend.png', fullPage: false });

await browser.close();