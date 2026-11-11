export const SITE = {
  description:
    "Anurag Banerjee is COO at Axioned, a digital agency in Mumbai. Writing on technology, teams and tinkering: posts and weeknotes.",
  jobTitle: "Chief Operating Officer",
  language: "en",
  locale: "en_US",
  name: "Anurag Banerjee",
  tagline: "Driven by tinkering, experiments, and good tech.",
  twitter: "@ianuragbanerjee",
  url: "https://anuragbanerjee.com",
} as const;

// contact happens via socials — no email on purpose
export const socialLinks = [
  { href: "https://x.com/ianuragbanerjee", label: "X" },
  { href: "https://github.com/imanuragbanerjee", label: "GitHub" },
  { href: "https://linkedin.com/in/imanuragbanerjee", label: "LinkedIn" },
  { href: "https://www.instagram.com/imanuragbanerjee", label: "Instagram" },
];

/** Stable JSON-LD identifiers, so every page refers to the same entities. */
export const ids = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE.url}/`).href;
}
