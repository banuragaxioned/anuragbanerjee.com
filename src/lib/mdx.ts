import type { Collection } from "./content";
import type { MDXContent } from "mdx/types";

function isMdxModule(mod: unknown): mod is { default: MDXContent } {
  return (
    typeof mod === "object" &&
    mod !== null &&
    "default" in mod &&
    typeof mod.default === "function"
  );
}

/** The compiled markdown of an entry, as a component. */
export async function loadContent(
  collection: Collection,
  slug: string,
): Promise<MDXContent> {
  const mod: unknown = await import(`@/content/${collection}/${slug}.md`);
  if (!isMdxModule(mod)) {
    throw new Error(`${collection}/${slug}.md did not compile to a component`);
  }
  return mod.default;
}
