#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none">
  <rect width="96" height="96" rx="20" fill="#0F0906"/>
  <polygon points="48,10 76,25 76,63 48,78 20,63 20,25" fill="none" stroke="#FF6644" stroke-width="1.4" opacity="0.45"/>
  <polygon points="48,13 74,28 74,61 48,75 22,61 22,28" fill="#FF6644"/>
  <polygon points="48,16 71,30 71,59 48,72 25,59 25,30" fill="#120704"/>
  <polygon points="48,24 65,35 65,59 48,68 31,59 31,35" fill="#5A1005"/>
  <polygon points="48,32 60,41 60,59 48,64 36,59 36,41" fill="#A82010"/>
  <polygon points="48,40 56,45 56,59 48,62 40,59 40,45" fill="#E8321A"/>
  <polygon points="48,44 64,59 58,63 48,67 38,63 32,59" fill="#FF6644" opacity="0.92"/>
  <polygon points="48,50 61,59 57,62 48,65 39,62 35,59" fill="#FFD0C0" opacity="0.76"/>
  <polygon points="48,55 55,59 53,61 48,63 43,61 41,59" fill="#FFF0EB" opacity="0.60"/>
</svg>`;

const sizes = [
  { name: 'icon-72x72.png', size: 72 },
  { name: 'icon-96x96.png', size: 96 },
  { name: 'icon-128x128.png', size: 128 },
  { name: 'icon-144x144.png', size: 144 },
  { name: 'icon-152x152.png', size: 152 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-384x384.png', size: 384 },
  { name: 'icon-512x512.png', size: 512 },
];

const iconsDir = path.join(__dirname, '../public/icons');

// Ensure public/icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

async function generateIcons() {
  try {
    // Generate standard icons
    for (const { name, size } of sizes) {
      const filePath = path.join(iconsDir, name);
      console.log(`Generating ${name} (${size}x${size})...`);

      await sharp(Buffer.from(SVG))
        .resize(size, size)
        .png()
        .toFile(filePath);

      console.log(`✓ ${name} created`);
    }

    // Generate apple-touch-icon
    const applePath = path.join(__dirname, '../public/apple-touch-icon.png');
    console.log('Generating apple-touch-icon.png (180x180)...');

    await sharp(Buffer.from(SVG))
      .resize(180, 180)
      .png()
      .toFile(applePath);

    console.log('✓ apple-touch-icon.png created');

    console.log('\n✅ All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generateIcons();
