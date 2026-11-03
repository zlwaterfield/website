import type { Metadata } from 'next';
import { SITE } from './site';

/**
 * Builds per-page metadata on top of the site defaults.
 *
 * Next.js replaces the whole `openGraph`, `twitter` and `alternates` objects
 * when a child route defines them, rather than merging field by field. Without
 * a helper, every page that sets a custom OG title silently drops the image,
 * the site name and the feed link. This re-applies those every time.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  article,
  keywords,
  alternateTypes,
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  article?: { publishedTime: string; modifiedTime: string; authors: string[]; tags?: string[] };
  keywords?: string[];
  alternateTypes?: Record<string, { url: string; title: string }[]>;
}): Metadata {
  const image = { url: '/og.png', width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` };

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: path,
      types: {
        'application/rss+xml': [{ url: '/rss.xml', title: `${SITE.name} — Writing` }],
        ...alternateTypes,
      },
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      siteName: SITE.name,
      locale: 'en_CA',
      title: `${title} - ${SITE.name}`,
      description,
      url: path,
      images: [image],
      ...(article ?? {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@zlwaterfield',
      creator: '@zlwaterfield',
      title: `${title} - ${SITE.name}`,
      description,
      images: ['/og.png'],
    },
  };
}
