import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEntries } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";
import { graph, personNode, profilePageNode, websiteNode } from "@/lib/schema";
import { SITE, socialLinks } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  fullTitle: `${SITE.name} · ${SITE.jobTitle} at Axioned`,
  markdownPath: "/index.md",
  path: "/",
});

const days = [
  {
    description:
      "Technical direction across client builds — architecture choices, build-vs-buy calls, code quality, and keeping the stack current.",
    title: "Tech",
  },
  {
    description:
      "Leading the engineering, project management, design, and QA teams — and the resource planning that keeps them sane.",
    title: "Teams",
  },
  {
    description:
      "Working with the CEO on client relationships and the strategy behind client services.",
    title: "Clients",
  },
  {
    description:
      "Hiring, retention, coaching, and the internal communication that holds it all together.",
    title: "People",
  },
];

// GitHub is a profile, not a contact channel
const contactLinks = socialLinks.filter((link) => link.label !== "GitHub");

const heading =
  "text-sm font-medium tracking-wide text-muted-foreground uppercase";

export default function HomePage() {
  const posts = getEntries("posts").slice(0, 3);

  return (
    <>
      <JsonLd
        schema={graph(
          personNode({
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Sikkim Manipal University",
            },
          }),
          websiteNode(),
          profilePageNode({
            description: SITE.description,
            name: SITE.name,
            path: "/",
          }),
        )}
      />
      <section>
        <p className={heading}>Chief Operating Officer at Axioned</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
          Driven by tinkering, experiments, and good tech.
        </h1>
        <p className="mt-6 text-muted-foreground">
          I&apos;m Anurag Banerjee. I run operations at{" "}
          <a
            className="underline underline-offset-4"
            href="https://axioned.com"
            rel="noreferrer"
            target="_blank"
          >
            Axioned
          </a>
          , a digital agency in Mumbai — overseeing the engineering, project
          management, design, and QA teams that ship client work every week.
        </p>
        <p className="mt-4 text-muted-foreground">
          The rest of the time I&apos;m tinkering — rebuilding this site, trying
          new tools, and poking at whatever&apos;s new in tech.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/posts/"
          >
            Read the blog
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/resume/"
          >
            See my resume
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={heading}>What I spend my days on</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {days.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between">
          <h2 className={heading}>Latest writing</h2>
          <Link
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/posts/"
          >
            All posts →
          </Link>
        </div>
        <ul className="mt-6 flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.id}>
              <time
                className="text-sm text-muted-foreground"
                dateTime={post.data.date.toISOString()}
              >
                {formatDate(post.data.date)}
              </time>
              <Link className="group mt-1 block" href={`/posts/${post.id}/`}>
                <h3 className="font-medium group-hover:underline">
                  {post.data.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {post.data.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className={heading}>Beyond work</h2>
        <p className="mt-4 text-muted-foreground">
          Liverpool FC supporter — I co-founded and ran{" "}
          <span className="text-foreground">The Red Legions</span>, an LFC fan
          site, for seven years. I travel solo when I can, keep a public
          notebook of{" "}
          <Link className="underline underline-offset-4" href="/weeknotes/">
            weeknotes
          </Link>{" "}
          and post random things. All views are my own. 🇮🇳 🗺️ 🎧 ⚽ 🍛🍕🍳🍔
        </p>
      </section>

      <section className="mt-16">
        <h2 className={heading}>Get in touch</h2>
        <p className="mt-4 text-muted-foreground">
          No forms, no inbox. The fastest way to reach me is a message on any of
          these:
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {contactLinks.map((link) => (
            <a
              className={buttonVariants({ size: "sm", variant: "outline" })}
              href={link.href}
              key={link.href}
              rel="me"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
