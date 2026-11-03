/**
 * Single source of truth for the facts that describe this site and its author.
 *
 * Everything an LLM or search crawler is told about Zach — metadata, JSON-LD,
 * llms.txt, the RSS feed — is derived from here, so the machine-readable claims
 * can never drift away from each other.
 */

export const SITE_URL = 'https://zlwaterfield.com';

export const SITE = {
  url: SITE_URL,
  name: 'Zach Waterfield',
  title: 'Zach Waterfield',
  /** One sentence, entity-first. Reused as the default meta description. */
  tagline: 'Engineer, investor, and coffee enthusiast based in Toronto, Canada.',
  description:
    'Zach Waterfield is a software engineer and angel investor in Toronto, Canada. He leads engineering at Rove Travel, invests in developer tools, AI, and B2B SaaS with Ripple Ventures and Pioneer Fund, and writes about building products.',
  locale: 'en-CA',
  language: 'en',
} as const;

export const AUTHOR = {
  name: 'Zach Waterfield',
  givenName: 'Zach',
  familyName: 'Waterfield',
  email: 'zlwaterfield@gmail.com',
  jobTitle: 'Head of Engineering',
  employer: { name: 'Rove Travel', url: 'https://www.rovetravel.com/' },
  alumniOf: { name: 'University of Waterloo', url: 'https://uwaterloo.ca/' },
  location: { city: 'Toronto', region: 'Ontario', country: 'Canada' },
  /**
   * `sameAs` is how a model or knowledge graph resolves "Zach Waterfield" to one
   * person rather than guessing. Keep these canonical and first-party.
   */
  sameAs: [
    'https://github.com/zlwaterfield',
    'https://www.linkedin.com/in/zlwaterfield/',
    'https://twitter.com/zlwaterfield',
    'https://x.com/zlwaterfield',
  ],
  knowsAbout: [
    'Software engineering',
    'Developer tools',
    'B2B SaaS',
    'Artificial intelligence',
    'Angel investing',
    'Startup fundraising',
    'Product strategy',
    'Engineering leadership',
    'Triathlon',
  ],
} as const;

export const SOCIAL = {
  email: `mailto:${AUTHOR.email}`,
  linkedin: 'https://www.linkedin.com/in/zlwaterfield/',
  twitter: 'https://twitter.com/zlwaterfield',
  github: 'https://github.com/zlwaterfield',
} as const;

/** Indexable routes, in the order a reader (or crawler) should meet them. */
export const ROUTES = [
  { path: '/', title: 'Zach Waterfield', summary: 'Who Zach is, what he works on, and what he invests in.', priority: 1 },
  { path: '/blog', title: 'Writing', summary: 'Essays and notes on building products, startups, investing, and life.', priority: 0.9 },
  { path: '/consulting', title: 'Consulting', summary: 'Advisory work with early-stage companies: hiring, MVPs, architecture, and process.', priority: 0.7 },
  { path: '/events', title: 'Endurance events', summary: 'Completed and upcoming running and triathlon races.', priority: 0.5 },
] as const;

export const url = (path: string) => new URL(path, SITE_URL).toString();
