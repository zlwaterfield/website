import { formatDate, getPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Writing - Zach Waterfield',
  description: 'Essays and notes on building products, startups, investing, and life.',
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
        ← Zach Waterfield
      </Link>

      <header className="mt-12 mb-12">
        <h1 className="font-serif-post text-4xl font-medium tracking-tight text-stone-950">Writing</h1>
        <p className="mt-3 text-stone-500">
          Notes on building products, startups, investing, and life.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-stone-500">Nothing here yet. Soon.</p>
      ) : (
        <ul className="border-t border-stone-200">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-stone-200">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between gap-6 py-4"
              >
                <span className="text-stone-900 group-hover:underline group-hover:decoration-stone-400 group-hover:underline-offset-4">
                  {post.title}
                  {post.draft && <span className="ml-2 text-xs uppercase tracking-wide text-amber-600">Draft</span>}
                </span>
                <time dateTime={post.date} className="shrink-0 text-sm tabular-nums text-stone-400">
                  {formatDate(post.date, 'short')}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-16 text-sm text-stone-400">
        <a href="/rss.xml" className="transition-colors hover:text-stone-900">RSS</a>
      </footer>
    </main>
  );
}
