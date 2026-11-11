import { SITE } from "./site";

/** Options every feed shares: the language and the atom self-link validators ask for. */
export function feedBase(site: URL, path: string) {
  return {
    customData: `<language>${SITE.language}</language><atom:link href="${new URL(path, site).href}" rel="self" type="application/rss+xml" />`,
    site,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
  };
}
