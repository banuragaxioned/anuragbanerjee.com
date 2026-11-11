import sharp from "sharp";

import { INK, MARK_PATH, MARK_RADIUS, PAPER } from "./brand";
import { SITE } from "./site";

const FONT = "Helvetica, Arial, sans-serif";
const DOMAIN = SITE.url.replace("https://", "");

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// greedy word wrap; the 64px Helvetica bold title fits ~30 chars per line
function wrapTitle(title: string, maxChars = 30, maxLines = 3): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of title.split(/\s+/u)) {
    if (current && `${current} ${word}`.length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) {
    lines.push(current);
  }
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] += "…";
  }
  return lines;
}

/** The monogram as an inverted tile (light on the dark cards), `size` px wide. */
function markTile(x: number, y: number, size: number): string {
  return `<g transform="translate(${x} ${y}) scale(${size / 64})"><rect width="64" height="64" rx="${MARK_RADIUS}" fill="${PAPER}"/><path d="${MARK_PATH}" fill="${INK}"/></g>`;
}

const frame = (
  body: string,
) => `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${INK}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${PAPER}"/>
  ${body}
</svg>`;

/** Site-wide card, written to public/og.png by scripts/generate-brand-assets.ts. */
export function siteCardSvg(): string {
  return frame(`${markTile(100, 92, 96)}
  <text x="100" y="330" font-family="${FONT}" font-size="72" font-weight="700" fill="${PAPER}">${escapeXml(SITE.name)}</text>
  <text x="100" y="404" font-family="${FONT}" font-size="34" fill="#a1a1aa">${escapeXml(SITE.tagline)}</text>
  <text x="100" y="540" font-family="${FONT}" font-size="28" fill="#71717a">${DOMAIN}</text>`);
}

interface EntryCard {
  /** e.g. "Posts"; shown after the name in the header line. */
  section: string;
  title: string;
  date?: Date;
}

export function entryCardSvg({ date, section, title }: EntryCard): string {
  const lines = wrapTitle(title);
  const tspans = lines
    .map(
      (line, index) =>
        `<tspan x="100" dy="${index === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  const titleY = 310 - (lines.length - 1) * 39;
  const formatted = date?.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const footer = [formatted, DOMAIN].filter(Boolean).join(" · ");
  return frame(`${markTile(100, 72, 72)}
  <text x="196" y="121" font-family="${FONT}" font-size="28" font-weight="600" fill="#a1a1aa">${escapeXml(`${SITE.name} · ${section}`.toUpperCase())}</text>
  <text x="100" y="${titleY}" font-family="${FONT}" font-size="64" font-weight="700" fill="${PAPER}">${tspans}</text>
  <text x="100" y="540" font-family="${FONT}" font-size="28" fill="#71717a">${escapeXml(footer)}</text>`);
}

export async function entryCardResponse(card: EntryCard): Promise<Response> {
  const png = await sharp(Buffer.from(entryCardSvg(card)))
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
