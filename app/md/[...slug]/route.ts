import { getPublishedPosts, getPost } from '@/lib/posts';
import { AUTHOR, url } from '@/lib/site';

/**
 * Serves the markdown source of a post at /md/blog/<slug>.md.
 *
 * Agents that fetch a page to read it burn a lot of tokens on nav, styling and
 * markup. Handing them the markdown is the same content in a cheaper format —
 * same words, same order — which is why it is not cloaking. The HTML page stays
 * the canonical, indexable version and links here via
 * `<link rel="alternate" type="text/markdown">`; this route is noindex so it
 * never competes with it in search.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: ['blog', `${post.slug}.md`] }));
}

export function GET(_request: Request, { params }: { params: { slug: string[] } }) {
  const [section, file] = params.slug;
  if (section !== 'blog' || !file?.endsWith('.md')) {
    return new Response('Not found\n', { status: 404 });
  }

  const post = getPost(file.replace(/\.md$/, ''));
  if (!post || post.draft) return new Response('Not found\n', { status: 404 });

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `date: ${post.date}`,
    ...(post.updated ? [`updated: ${post.updated}`] : []),
    ...(post.description ? [`description: ${JSON.stringify(post.description)}`] : []),
    `author: ${AUTHOR.name}`,
    `canonical: ${url(`/blog/${post.slug}`)}`,
    '---',
    '',
  ].join('\n');

  return new Response(`${frontmatter}${post.markdown}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
