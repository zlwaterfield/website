import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.resolve('./content/posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  /** Optional `updated:` in frontmatter. Freshness is a strong citation signal. */
  updated?: string;
  description?: string;
  tags: string[];
  draft: boolean;
  wordCount: number;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  /** The original markdown body, served at /md/blog/<slug>.md for agents. */
  markdown: string;
  headings: { id: string; text: string; depth: number }[];
};

// Drafts are visible in `next dev` so you can preview them, but never ship.
const showDrafts = process.env.NODE_ENV === 'development';

function toDateString(value: unknown): string {
  // gray-matter parses unquoted YAML dates into Date objects.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

/** marked escapes heading text for HTML; schema.org and `id`s want it raw. */
function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith('#')) return String.fromCodePoint(Number(entity.slice(1)));
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

export function slugify(text: string): string {
  return decodeEntities(text.replace(/<[^>]+>/g, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Give every heading a stable `id` and a self-link. Addressable headings let a
 * retrieval system cite a specific passage (`/blog/post#the-heading`) instead of
 * the whole page, which is how AI answers link back to a source.
 */
function anchorHeadings(html: string) {
  const headings: Post['headings'] = [];
  const seen = new Map<string, number>();

  const withIds = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, depth: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).trim();
      const base = slugify(text) || `section-${headings.length + 1}`;
      // Two headings with the same wording would otherwise share an id, and the
      // second anchor would silently scroll to the first.
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;

      headings.push({ id, text, depth: Number(depth) });
      return `<h${depth} id="${id}">${inner}<a href="#${id}" class="heading-anchor" aria-label="Link to this section">#</a></h${depth}>`;
    },
  );
  return { html: withIds, headings };
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data, content } = matter(raw);
  const { html, headings } = anchorHeadings(marked.parse(content, { async: false }));
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title ?? slug,
    date: toDateString(data.date),
    updated: data.updated ? toDateString(data.updated) : undefined,
    description: data.description,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: data.draft === true,
    wordCount: words,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
    markdown: content.trim(),
    headings,
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

/** Posts that are safe to expose to crawlers and feeds, drafts excluded. */
export function getPublishedPosts(): Post[] {
  return getPosts().filter((post) => !post.draft);
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

/** ISO-8601 instant, which is what schema.org and sitemaps want. */
export function toIsoDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toISOString();
}
