export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  // `<` is escaped so the document cannot close the script tag early
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema).replaceAll("<", "\\u003c")}
    </script>
  );
}
