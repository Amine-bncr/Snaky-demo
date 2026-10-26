import sharp from 'sharp';
import path from 'node:path';

const files = [
  '.tmp/top-375x667.png',
  '.tmp/scroll-375x667.png',
  '.tmp/top-768x1024.png',
  '.tmp/scroll-768x1024.png',
  '.tmp/top-1280x720.png',
  '.tmp/scroll-1280x720.png',
];

for (const file of files) {
  try {
    const img = sharp(path.resolve(file));
    const meta = await img.metadata();
    const { width, height } = meta;

    // Sample top header (x=width/2, y=30) -> should be cream ~ #FBF7EE (251, 247, 238)
    const headerPx = await img
      .extract({ left: Math.floor(width / 2), top: 30, width: 1, height: 1 })
      .raw()
      .toBuffer();

    // Sample logo center
    const logoPx = await img
      .extract({ left: Math.floor(width * 0.15), top: 36, width: 1, height: 1 })
      .raw()
      .toBuffer();

    // Sample hero bottom edge (x=width/2, y=height-5) -> should be navy-deep ~ #1A2358 (26, 35, 88) or cream
    const bottomPx = await img
      .extract({ left: Math.floor(width / 2), top: height - 5, width: 1, height: 1 })
      .raw()
      .toBuffer();

    console.log(`=== ${file} (${width}x${height}) ===`);
    console.log(`  Header (mid-top): R=${headerPx[0]} G=${headerPx[1]} B=${headerPx[2]}`);
    console.log(`  Logo area:        R=${logoPx[0]} G=${logoPx[1]} B=${logoPx[2]}`);
    console.log(`  Hero bottom edge: R=${bottomPx[0]} G=${bottomPx[1]} B=${bottomPx[2]}`);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}