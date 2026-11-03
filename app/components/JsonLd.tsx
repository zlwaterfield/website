/**
 * Renders a schema.org graph as JSON-LD.
 *
 * `</script>` inside a string would end the block early, so the only escaping
 * needed is on the forward slash of a closing tag.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
