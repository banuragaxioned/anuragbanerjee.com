// One-time generator for public/og.png — run with: bun scripts/generate-og.ts
import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="0" y="0" width="1200" height="6" fill="#fafafa"/>
  <text x="100" y="280" font-family="Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#fafafa">Anurag Banerjee</text>
  <text x="100" y="360" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#a1a1aa">Helping teams ship great work — no "ASAP" required.</text>
  <text x="100" y="540" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#71717a">anuragbanerjee.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("wrote public/og.png");
