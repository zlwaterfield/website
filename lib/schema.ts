/**
 * schema.org JSON-LD builders.
 *
 * Two rules govern everything here:
 *  1. Every claim must also be visible in the page text. Google treats
 *     structured data that contradicts the rendered page as a quality problem,
 *     and an LLM that reads both will trust neither.
 *  2. Entities get stable `@id` URIs and are cross-referenced, so a crawler
 *     builds one graph of "Zach Waterfield" instead of several loose copies.
 */

import { AUTHOR, SITE, SITE_URL, url } from './site';
import type { Post } from './posts';
import type { EventCategory } from '@/types/events';
import type { Investment } from '@/types/investments';

export const PERSON_ID = `${SITE_URL}/#person`;
export const SITE_ID = `${SITE_URL}/#website`;

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR.name,
  givenName: AUTHOR.givenName,
  familyName: AUTHOR.familyName,
  url: SITE_URL,
  email: AUTHOR.email,
  description: SITE.description,
  jobTitle: AUTHOR.jobTitle,
  image: url('/og.png'),
  worksFor: { '@type': 'Organization', name: AUTHOR.employer.name, url: AUTHOR.employer.url },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: AUTHOR.alumniOf.name,
    url: AUTHOR.alumniOf.url,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: AUTHOR.location.city,
    addressRegion: AUTHOR.location.region,
    addressCountry: AUTHOR.location.country,
  },
  nationality: { '@type': 'Country', name: 'Canada' },
  knowsAbout: [...AUTHOR.knowsAbout],
  sameAs: [...AUTHOR.sameAs],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE_URL,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { '@id': PERSON_ID },
  author: { '@id': PERSON_ID },
  copyrightHolder: { '@id': PERSON_ID },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: url(crumb.path),
  })),
});

export const profilePageSchema = () => ({
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: SITE_URL,
  name: `${AUTHOR.name} — ${AUTHOR.jobTitle} and angel investor`,
  description: SITE.description,
  inLanguage: SITE.language,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': PERSON_ID },
  mainEntity: { '@id': PERSON_ID },
});

export const investmentsSchema = (investments: Investment[]) => ({
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#investments`,
  name: 'Select investments by Zach Waterfield',
  description:
    'Startups Zach Waterfield has invested in, directly or via Ripple Ventures, Pioneer Fund, Village Global, and Shaan Puri’s fund.',
  numberOfItems: investments.length,
  itemListOrder: 'https://schema.org/ItemListUnordered',
  itemListElement: investments.map((investment, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Organization',
      name: investment.name,
      url: investment.url,
      description: investment.description,
      ...(investment.status === 'acquired' && investment.acquiredBy
        ? { parentOrganization: { '@type': 'Organization', name: investment.acquiredBy } }
        : {}),
      funder: { '@id': PERSON_ID },
    },
  })),
});

export const blogSchema = (posts: Post[]) => ({
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  url: url('/blog'),
  name: 'Writing by Zach Waterfield',
  description: 'Essays and notes on building products, startups, investing, and life.',
  inLanguage: SITE.language,
  isPartOf: { '@id': SITE_ID },
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    '@id': `${url(`/blog/${post.slug}`)}#post`,
    headline: post.title,
    url: url(`/blog/${post.slug}`),
    datePublished: post.date,
    ...(post.description ? { description: post.description } : {}),
  })),
});

export const postSchema = (post: Post) => ({
  '@type': 'BlogPosting',
  '@id': `${url(`/blog/${post.slug}`)}#post`,
  headline: post.title,
  name: post.title,
  url: url(`/blog/${post.slug}`),
  mainEntityOfPage: { '@type': 'WebPage', '@id': url(`/blog/${post.slug}`) },
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  ...(post.description ? { description: post.description, abstract: post.description } : {}),
  ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
  wordCount: post.wordCount,
  timeRequired: `PT${post.readingMinutes}M`,
  articleSection: 'Writing',
  inLanguage: SITE.language,
  isPartOf: { '@id': `${SITE_URL}/blog#blog` },
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  copyrightHolder: { '@id': PERSON_ID },
  copyrightYear: Number(post.date.slice(0, 4)),
  image: url('/og.png'),
  // Headings double as an outline, so a retrieval system can see the shape of
  // the argument without parsing the HTML body.
  ...(post.headings.length
    ? {
        hasPart: post.headings.map((heading) => ({
          '@type': 'WebPageElement',
          name: heading.text,
          url: `${url(`/blog/${post.slug}`)}#${heading.id}`,
        })),
      }
    : {}),
});

type Testimonial = { quote: string; author: string; role: string };

export const consultingSchema = (testimonials: Testimonial[], services: string[]) => ({
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/consulting#service`,
  name: 'Zach Waterfield — engineering and product consulting',
  url: url('/consulting'),
  description:
    'Advisory and hands-on consulting for early-stage companies: engineering hiring, MVP builds, architecture design, product process, and build-vs-buy analysis.',
  provider: { '@id': PERSON_ID },
  founder: { '@id': PERSON_ID },
  email: AUTHOR.email,
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  availableLanguage: 'English',
  address: {
    '@type': 'PostalAddress',
    addressLocality: AUTHOR.location.city,
    addressRegion: AUTHOR.location.region,
    addressCountry: AUTHOR.location.country,
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Areas Zach helps with',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service },
    })),
  },
  review: testimonials.map((testimonial) => ({
    '@type': 'Review',
    reviewBody: testimonial.quote,
    author: { '@type': 'Person', name: testimonial.author, jobTitle: testimonial.role },
    itemReviewed: { '@id': `${SITE_URL}/consulting#service` },
  })),
});

export const eventsSchema = (categories: EventCategory[]) => {
  const events = categories.flatMap((category) =>
    category.events.map((event) => ({ ...event, category: category.category })),
  );
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/events#events`,
    name: 'Endurance events completed by Zach Waterfield',
    description: `${events.filter((event) => event.status === 'completed').length} running and triathlon events, from 5K to full Ironman.`,
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SportsEvent',
        name: `${event.name} ${event.year}`,
        // The data only records a year, which ISO 8601 allows as a reduced-precision date.
        startDate: String(event.year),
        location: { '@type': 'Place', name: event.location },
        sport: event.category,
        // schema.org has no "completed" status, so participation is what marks a
        // finished race: Zach is an attendee of the ones he has already run.
        ...(event.status === 'completed' ? { attendee: { '@id': PERSON_ID } } : {}),
      },
    })),
  };
};

/**
 * Wraps nodes in a single `@graph` so one `<script>` per page carries the whole
 * entity graph and the `@id` references resolve against each other.
 */
export const graph = (...nodes: object[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
