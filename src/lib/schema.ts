import { absoluteUrl, ids, SITE, socialLinks } from "./site";

type JsonLd = Record<string, unknown>;

const personRef = {
  "@id": ids.person,
  "@type": "Person",
  name: SITE.name,
  url: `${SITE.url}/`,
};

/** Wraps nodes in one `@graph` document so they can reference each other by `@id`. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function personNode(extra: JsonLd = {}): JsonLd {
  return {
    "@id": ids.person,
    "@type": "Person",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Mumbai",
    },
    description: SITE.description,
    jobTitle: SITE.jobTitle,
    name: SITE.name,
    sameAs: socialLinks.map((link) => link.href),
    url: `${SITE.url}/`,
    worksFor: {
      "@type": "Organization",
      name: "Axioned",
      url: "https://axioned.com/",
    },
    ...extra,
  };
}

export function websiteNode(): JsonLd {
  return {
    "@id": ids.website,
    "@type": "WebSite",
    author: personRef,
    description: SITE.description,
    inLanguage: SITE.language,
    name: SITE.name,
    publisher: personRef,
    url: `${SITE.url}/`,
  };
}

export function breadcrumbNode(
  trail: { name: string; path: string }[],
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  };
}

export function countWords(body: string | undefined): number | undefined {
  const words = body?.split(/\s+/u).filter(Boolean).length;
  return words === 0 ? undefined : words;
}

interface ArticleOptions {
  description?: string;
  /** Absolute or site-relative path of the share card for this page. */
  image: string;
  modified?: Date;
  path: string;
  published?: Date;
  title: string;
  wordCount?: number;
}

export function articleNode(options: ArticleOptions): JsonLd {
  const url = absoluteUrl(options.path);
  const published = options.published?.toISOString();
  return {
    "@id": `${url}#article`,
    "@type": "BlogPosting",
    author: personRef,
    dateModified: (options.modified ?? options.published)?.toISOString(),
    datePublished: published,
    description: options.description,
    headline: options.title,
    image: absoluteUrl(options.image),
    inLanguage: SITE.language,
    isPartOf: { "@id": ids.website },
    mainEntityOfPage: { "@id": url, "@type": "WebPage" },
    publisher: personRef,
    url,
    wordCount: options.wordCount,
  };
}

interface CollectionOptions {
  description: string;
  name: string;
  /** Paths of the entries listed on the page, in display order. */
  entries: string[];
  path: string;
}

export function collectionNode(options: CollectionOptions): JsonLd {
  const url = absoluteUrl(options.path);
  return {
    "@id": `${url}#page`,
    "@type": "CollectionPage",
    description: options.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": ids.website },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: options.entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(entry),
      })),
    },
    name: options.name,
    url,
  };
}

export function profilePageNode(options: {
  description: string;
  name: string;
  path: string;
}): JsonLd {
  const url = absoluteUrl(options.path);
  return {
    "@id": `${url}#page`,
    "@type": "ProfilePage",
    description: options.description,
    inLanguage: SITE.language,
    isPartOf: { "@id": ids.website },
    mainEntity: { "@id": ids.person },
    name: options.name,
    url,
  };
}
