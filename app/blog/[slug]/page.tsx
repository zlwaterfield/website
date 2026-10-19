import { formatDate, getPost, getPosts } from '@/lib/posts';
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
    title: `${post.title} - Zach Waterfield`,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Link href="/blog" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
        ← Writing
      </Link>

      <article className="mt-12">
        <header className="mb-10">
          <h1 className="font-serif-post text-4xl font-medium leading-tight tracking-tight text-stone-950 sm:text-5xl">
            {post.title}
          </h1>
          <time dateTime={post.date} className="mt-4 block text-sm text-stone-500">
            {formatDate(post.date)}
            {post.draft && <span className="ml-2 text-xs uppercase tracking-wide text-amber-600">Draft</span>}
          </time>
        </header>

        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <footer className="mt-20 flex justify-between border-t border-stone-200 pt-6 text-sm text-stone-500">
        <Link href="/" className="transition-colors hover:text-stone-900">Zach Waterfield</Link>
        <div className="flex gap-5">
          <Link href="/blog" className="transition-colors hover:text-stone-900">All writing</Link>
          <a href="/rss.xml" className="transition-colors hover:text-stone-900">RSS</a>
        </div>
      </footer>
    </main>
  );
}
