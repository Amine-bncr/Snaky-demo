const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = 'images';
const publicDir = 'public';
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
const logoFile = files.find(f => f.startsWith('527'));
const productFiles = files.filter(f => !f.startsWith('527'));

// Logo: trim white margins, save as PNG
sharp(path.join(dir, logoFile))
  .trim()
  .toFile(path.join(publicDir, 'logo.png'));

// Product photos: convert to WebP
productFiles.forEach((f, i) => {
  sharp(path.join(dir, f))
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, `product-${i}.webp`));
});

console.log('Logo:', logoFile);
console.log('Products:', productFiles);