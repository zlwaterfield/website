import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * AI crawlers are named explicitly rather than left to the wildcard.
 *
 * A bare `User-agent: *` already allows them, but several of these bots back off
 * when they can't find a rule addressed to them, and an explicit allow is also a
 * clear signal of intent if the default ever changes.
 *
 * `/book` is deliberately *not* disallowed here. It's a third-party embed shell
 * with no server-rendered content, so it carries `noindex` instead — a crawler
 * that is blocked in robots.txt never fetches the page and so never reads the
 * noindex, which is the classic way a thin page ends up indexed anyway.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI training
  'OAI-SearchBot', // ChatGPT search index
  'ChatGPT-User', // ChatGPT live browsing
  'ClaudeBot', // Anthropic training
  'Claude-User', // Claude live browsing
  'Claude-SearchBot', // Claude search index
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // Gemini grounding + training
  'Googlebot',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'cohere-ai',
  'DuckAssistBot',
  'YouBot',
  'CCBot', // Common Crawl, the base corpus for most open models
];

/** Machinery, not content: nothing here is worth an answer. */
const DISALLOW = ['/api/', '/ingest/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
