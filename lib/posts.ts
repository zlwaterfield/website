import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.resolve('./content/posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  draft: boolean;
};

export type Post = PostMeta & { html: string };

// Drafts are visible in `next dev` so you can preview them, but never ship.
const showDrafts = process.env.NODE_ENV === 'development';

function toDateString(value: unknown): string {
  // gray-matter parses unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: toDateString(data.date),
    description: data.description,
    draft: data.draft === true,
    html: marked.parse(content, { async: false }),
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map(readPost)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string, style: 'long' | 'short' = 'long'): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
  });
}
