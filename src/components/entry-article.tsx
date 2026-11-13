import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/dates";

interface EntryArticleProps {
  children: React.ReactNode;
  date: Date;
  title: string;
  updated?: Date;
}

export function EntryArticle({
  children,
  date,
  title,
  updated,
}: EntryArticleProps) {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant="secondary">
            <time dateTime={date.toISOString()}>{formatDate(date)}</time>
          </Badge>
          {updated && (
            <span className="text-sm text-muted-foreground">
              Updated{" "}
              <time dateTime={updated.toISOString()}>
                {formatDate(updated)}
              </time>
            </span>
          )}
        </div>
      </header>
      <div className="prose max-w-none prose-neutral dark:prose-invert">
        {children}
      </div>
    </article>
  );
}
