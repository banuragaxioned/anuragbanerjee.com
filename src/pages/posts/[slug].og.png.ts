import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sharp from "sharp";

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const escapeXml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// greedy word wrap; the 64px Helvetica bold title fits ~30 chars per line
const wrapTitle = (title: string, maxChars = 30, maxLines = 3): string[] => {
  const lines: string[] = [];
  let current = "";
  for (const word of title.split(/\s+/)) {
    if (current && (current + " " + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1] + "…";
  }
  return lines;
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;

  const lines = wrapTitle(post.data.title);
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="100" dy="${i === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  const titleY = 300 - (lines.length - 1) * 39;
  const date = post.data.date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="0" y="0" width="1200" height="6" fill="#fafafa"/>
  <text x="100" y="140" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#a1a1aa">ANURAG BANERJEE</text>
  <text x="100" y="${titleY}" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#fafafa">${tspans}</text>
  <text x="100" y="540" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#71717a">${escapeXml(date)} · anuragbanerjee.com</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
