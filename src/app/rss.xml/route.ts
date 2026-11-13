import { feedResponse } from "@/lib/feed";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return feedResponse("posts", {
    description:
      "Writing by Anurag Banerjee on technology, work and life, from web development to leading teams.",
    path: "/rss.xml",
    title: SITE.name,
  });
}
