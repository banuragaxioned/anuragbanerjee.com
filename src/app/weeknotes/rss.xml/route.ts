import { feedResponse } from "@/lib/feed";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return feedResponse("weeknotes", {
    description: "Weekly reflections and process notes by Anurag Banerjee.",
    path: "/weeknotes/rss.xml",
    title: `Weeknotes · ${SITE.name}`,
  });
}
