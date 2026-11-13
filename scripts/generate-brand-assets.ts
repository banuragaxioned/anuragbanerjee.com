// Generates the static brand assets in public/ — run with: bun scripts/generate-brand-assets.ts
//
//   favicon.svg          adaptive: dark tile in light mode, light tile in dark mode
//   favicon.ico          16, 32 and 48 px (PNG-compressed entries)
//   apple-touch-icon.png 180 px, full-bleed (iOS applies its own rounding)
//   icon-192.png / icon-512.png / icon-maskable-512.png   web manifest icons
//   og.png               site-wide 1200 x 630 share card
//
// The mark itself lives in src/lib/brand.ts.
import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

import { INK, MARK_BOX, MARK_PATH, MARK_RADIUS, PAPER } from "../src/lib/brand";
import { siteCardSvg } from "../src/lib/og-card";

const publicDir = path.resolve(import.meta.dirname, "..", "public");
const out = (name: string) => path.join(publicDir, name);

interface TileOptions {
  background: string;
  foreground: string;
  /** Corner radius in mark units; 0 for full-bleed. */
  radius: number;
  /** Scales the letters around the centre (maskable icons need a safe zone). */
  letterScale?: number;
}

function tileSvg(size: number, options: TileOptions): string {
  const scale = options.letterScale ?? 1;
  const offset = (MARK_BOX - MARK_BOX * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${MARK_BOX} ${MARK_BOX}"><rect width="${MARK_BOX}" height="${MARK_BOX}" rx="${options.radius}" fill="${options.background}"/><path transform="translate(${offset} ${offset}) scale(${scale})" d="${MARK_PATH}" fill="${options.foreground}"/></svg>`;
}

const dark: TileOptions = {
  background: INK,
  foreground: PAPER,
  radius: MARK_RADIUS,
};

const png = async (svg: string) =>
  await sharp(Buffer.from(svg)).png().toBuffer();

// favicon.svg adapts to the browser's colour scheme
const adaptiveFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_BOX} ${MARK_BOX}">
  <style>
    .tile { fill: ${INK}; }
    .mark { fill: ${PAPER}; }
    @media (prefers-color-scheme: dark) {
      .tile { fill: ${PAPER}; }
      .mark { fill: ${INK}; }
    }
  </style>
  <rect class="tile" width="${MARK_BOX}" height="${MARK_BOX}" rx="${MARK_RADIUS}"/>
  <path class="mark" d="${MARK_PATH}"/>
</svg>
`;
writeFileSync(out("favicon.svg"), adaptiveFavicon);

// PNG-compressed ICO container
function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  // image type 1 = icon
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ data, size }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    // colour planes, then bits per pixel
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({
    data: await png(tileSvg(size, dark)),
    size,
  })),
);
writeFileSync(out("favicon.ico"), ico(icoImages));

writeFileSync(
  out("apple-touch-icon.png"),
  await png(tileSvg(180, { ...dark, radius: 0 })),
);
writeFileSync(out("icon-192.png"), await png(tileSvg(192, dark)));
writeFileSync(out("icon-512.png"), await png(tileSvg(512, dark)));
writeFileSync(
  out("icon-maskable-512.png"),
  await png(tileSvg(512, { ...dark, letterScale: 0.8, radius: 0 })),
);

writeFileSync(out("og.png"), await png(siteCardSvg()));

console.log(
  "wrote favicon.svg, favicon.ico, apple-touch-icon.png, icon-*.png, og.png",
);
