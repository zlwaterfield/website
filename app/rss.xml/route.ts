import { getPublishedPosts } from '@/lib/posts';
import { AUTHOR, SITE, SITE_URL, url } from '@/lib/site';

export const dynamic = 'force-static';

const escape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, ']]&gt;')}]]>`;

/**
 * A full-content feed, not a teaser feed.
 *
 * Feeds are one of the few routes that aggregators and AI crawlers reliably
 * poll, and a feed carrying only titles forces them back to scraping HTML (or
 * worse, summarising from the title alone). `content:encoded` ships the whole
 * post so the feed is a complete, citable copy.
 */
export function GET() {
  const posts = getPublishedPosts();
  const lastBuild = posts[0]
    ? new Date(`${posts[0].updated ?? posts[0].date}T00:00:00Z`)
    : new Date();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${escape(AUTHOR.name)}</dc:creator>${
        post.description ? `\n      <description>${escape(post.description)}</description>` : ''
      }
      <content:encoded>${cdata(post.html)}</content:encoded>${post.tags
        .map((tag) => `\n      <category>${escape(tag)}</category>`)
        .join('')}
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(SITE.name)} — Writing</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${url('/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Essays and notes by ${escape(AUTHOR.name)} on building products, startups, investing, and life.</description>
    <language>${SITE.locale.toLowerCase()}</language>
    <copyright>${escape(AUTHOR.name)}</copyright>
    <managingEditor>${AUTHOR.email} (${escape(AUTHOR.name)})</managingEditor>
    <webMaster>${AUTHOR.email} (${escape(AUTHOR.name)})</webMaster>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
