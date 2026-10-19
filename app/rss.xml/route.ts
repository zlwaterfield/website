import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://zlwaterfield.com';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getPosts()
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>${
        post.description ? `\n      <description>${escape(post.description)}</description>` : ''
      }
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Zach Waterfield</title>
    <link>${SITE_URL}/blog</link>
    <description>Writing by Zach Waterfield</description>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
