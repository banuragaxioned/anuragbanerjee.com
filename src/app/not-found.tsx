import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  description: "This page doesn't exist.",
  noindex: true,
  path: "/404/",
  title: "Page not found",
});

export default function NotFound() {
  return (
    <section className="flex flex-col items-start justify-center py-16">
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-muted-foreground">
        Maybe it moved during the migration from Medium, or maybe it never
        existed. Either way, there&apos;s nothing here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className={buttonVariants({ variant: "default" })} href="/">
          Go home
        </Link>
        <Link className={buttonVariants({ variant: "outline" })} href="/posts/">
          Browse posts
        </Link>
      </div>
    </section>
  );
}
