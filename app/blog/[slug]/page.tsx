import { JsonLd } from '@/app/components/JsonLd';
import { breadcrumbSchema, graph, postSchema } from '@/lib/schema';
import { formatDate, getPost, getPosts } from '@/lib/posts';
import { pageMetadata } from '@/lib/metadata';
import { AUTHOR, SITE, url } from '@/lib/site';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getPosts().map((post) => ({ slug: post.slug }));
  // With zero published posts, Cloudflare's next-on-pages treats this route as
  // dynamic and fails the build. A placeholder slug keeps it static (and 404s).
  return slugs.length > 0 ? slugs : [{ slug: '_' }];
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    ...pageMetadata({
      title: post.title,
      description: post.description ?? SITE.description,
      path: `/blog/${post.slug}`,
      type: 'article',
      keywords: post.tags,
      article: {
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        authors: [url('/')],
        ...(post.tags.length ? { tags: post.tags } : {}),
      },
      // Points agents at the cheaper markdown rendering of this same post.
      alternateTypes: {
        'text/markdown': [
          { url: `/md/blog/${post.slug}.md`, title: `${post.title} (markdown)` },
        ],
      },
    }),
    authors: [{ name: AUTHOR.name, url: url('/') }],
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <JsonLd
        schema={graph(
          postSchema(post),
          breadcrumbSchema([
            { name: 'Zach Waterfield', path: '/' },
            { name: 'Writing', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        )}
      />
      <nav aria-label="Breadcrumb">
        <Link href="/blog" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
          ← Writing
        </Link>
      </nav>

      <article className="mt-12">
        <header className="mb-10">
          <h1 className="font-serif-post text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">
            {post.title}
          </h1>
          {/* An explicit byline and date in the rendered text, not just in
              metadata: extractive systems read the visible page. */}
          <p className="mt-4 text-sm text-stone-500">
            <span>{AUTHOR.name}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden="true"> · </span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            )}
            <span aria-hidden="true"> · </span>
            <span>{post.readingMinutes} min read</span>
            {post.draft && <span className="ml-2 text-xs uppercase tracking-wide text-stone-400">Draft</span>}
          </p>
          {post.description && (
            <p className="mt-5 font-serif-post text-lg leading-relaxed text-stone-600">{post.description}</p>
          )}
        </header>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <footer className="mt-20 border-t border-stone-200 pt-6 text-sm text-stone-500">
        <p>
          Written by <Link href="/" className="link">{AUTHOR.name}</Link>, {AUTHOR.jobTitle} at{' '}
          {AUTHOR.employer.name} and an angel investor in Toronto, Canada.
        </p>
        <div className="mt-4 flex flex-wrap justify-between gap-x-5 gap-y-2">
          <Link href="/" className="transition-colors hover:text-stone-900">Zach Waterfield</Link>
          <div className="flex gap-5">
            <Link href="/blog" className="transition-colors hover:text-stone-900">All writing</Link>
            <a href={`/md/blog/${post.slug}.md`} className="transition-colors hover:text-stone-900">Markdown</a>
            <a href="/rss.xml" className="transition-colors hover:text-stone-900">RSS</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
