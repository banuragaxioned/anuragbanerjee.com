import type { Metadata } from "next";

import { SITE } from "./site";

interface PageMetadata {
  description?: string;
  /** Replaces the whole <title> (no site-name suffix), e.g. on the homepage. */
  fullTitle?: string;
  /** Path of the Markdown version of the page, for agents. */
  markdownPath?: string;
  modified?: Date;
  /** Keeps the page out of search indexes (the 404 page). */
  noindex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  /** Canonical path, with the trailing slash. */
  path: string;
  published?: Date;
  title?: string;
  /** og:type, "article" for posts and weeknotes. */
  type?: "website" | "article";
}

export const feeds = [
  { title: SITE.name, url: "/rss.xml" },
  { title: `Weeknotes · ${SITE.name}`, url: "/weeknotes/rss.xml" },
];

export function pageMetadata({
  description = SITE.description,
  fullTitle,
  markdownPath,
  modified,
  noindex = false,
  ogImage = "/og.png",
  ogImageAlt,
  path,
  published,
  title,
  type = "website",
}: PageMetadata): Metadata {
  // keep <title> within ~60 characters so search results do not truncate it
  let pageTitle: string = fullTitle ?? SITE.name;
  if (!fullTitle && title) {
    const withSuffix = `${title} · ${SITE.name}`;
    pageTitle = withSuffix.length <= 60 ? withSuffix : title;
  }
  // the site name is already shown as og:site_name, so social titles skip the suffix
  const socialTitle = title ?? fullTitle ?? SITE.name;
  const imageAlt =
    ogImageAlt ??
    (ogImage === "/og.png"
      ? `${SITE.name}: ${SITE.tagline}`
      : `${socialTitle} — ${SITE.name}`);

  return {
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": feeds,
        ...(markdownPath && {
          "text/markdown": [
            { title: `${pageTitle} (Markdown)`, url: markdownPath },
          ],
        }),
      },
    },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: imageAlt,
          height: 630,
          type: "image/png",
          url: ogImage,
          width: 1200,
        },
      ],
      locale: SITE.locale,
      siteName: SITE.name,
      title: socialTitle,
      type,
      url: path,
      ...(type === "article" && {
        authors: [`${SITE.url}/`],
        modifiedTime: (modified ?? published)?.toISOString(),
        publishedTime: published?.toISOString(),
      }),
    },
    robots: noindex
      ? { follow: true, index: false }
      : {
          follow: true,
          index: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
    title: { absolute: pageTitle },
    twitter: {
      card: "summary_large_image",
      creator: SITE.twitter,
      description,
      images: [{ alt: imageAlt, url: ogImage }],
      site: SITE.twitter,
      title: socialTitle,
    },
  };
}
