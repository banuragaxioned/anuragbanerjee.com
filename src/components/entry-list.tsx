import Link from "next/link";

import { Separator } from "@/components/ui/separator";

interface EntryListItem {
  date?: Date;
  excerpt?: string;
  href: string;
  title: string;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function EntryList({ entries }: { entries: EntryListItem[] }) {
  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={entry.href}>
          {index > 0 && <Separator className="my-6" />}
          <Link className="group block" href={entry.href}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 className="font-medium group-hover:underline">
                {entry.title}
              </h2>
              {entry.date && (
                <time
                  className="text-sm text-muted-foreground"
                  dateTime={entry.date.toISOString()}
                >
                  {formatDate(entry.date)}
                </time>
              )}
            </div>
            {entry.excerpt && (
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.excerpt}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
