import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/posts';
import { ROUTES, url } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();
  const newestPost = posts[0]?.updated ?? posts[0]?.date;

  return [
    ...ROUTES.map((route) => ({
      url: url(route.path),
      // The home page and index change whenever a post ships.
      lastModified: new Date(
        route.path === '/' || route.path === '/blog' ? (newestPost ?? Date.now()) : Date.now(),
      ),
      changeFrequency: (route.path === '/blog' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
