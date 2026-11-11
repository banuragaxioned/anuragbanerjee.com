export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Zettle ids are Obsidian-style timestamps (YYYYMMDDHHmm). Used as the date
 * for feeds when a zettle has no `date` of its own; read as UTC.
 */
export function dateFromZettleId(id: string): Date | undefined {
  const match =
    /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})$/u.exec(
      id,
    );
  if (!match?.groups) {
    return undefined;
  }
  const { day, hour, minute, month, year } = match.groups;
  const date = new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
    ),
  );
  // reject impossible values such as month 13, which Date would roll over
  return date.getUTCMonth() === Number(month) - 1 ? date : undefined;
}
