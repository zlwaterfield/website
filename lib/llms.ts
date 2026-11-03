/**
 * Generates /llms.txt and /llms-full.txt.
 *
 * Worth being honest about what these are: no major model provider has
 * committed to reading llms.txt, and server-log studies show their crawlers
 * overwhelmingly fetch plain HTML instead. Google says outright that it doesn't
 * use these files. What *does* reliably read them is the coding-agent tier —
 * Claude Code, Cursor, Copilot and friends all probe /llms.txt when pointed at a
 * domain. So this is cheap, derived entirely from the same source of truth as
 * the HTML, and never the only place a fact lives.
 */

import { getPublishedPosts, type Post } from './posts';
import { AUTHOR, ROUTES, SITE, SITE_URL, url } from './site';
import type { EventCategory } from '@/types/events';
import type { Investment } from '@/types/investments';

/**
 * Plain-language answers to the questions a model is actually asked about a
 * person. Every answer restates something visible on the site.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Who is Zach Waterfield?',
    a: 'Zach Waterfield is a software engineer and angel investor based in Toronto, Canada. He is Head of Engineering at Rove Travel, and he invests in developer tools, AI, and B2B SaaS companies.',
  },
  {
    q: 'What does Zach Waterfield do now?',
    a: 'He leads the engineering team at Rove Travel, invests with Ripple Ventures and Pioneer Fund, trains for swim/bike/run events, and runs a founder poker game in Toronto a few times a year. He is also a new father.',
  },
  {
    q: 'What has Zach Waterfield built or worked on?',
    a: 'He co-founded Kopa (formerly PadPiper), a Y Combinator W19 startup making renting easier, and stepped back in 2020. He founded Zettlor, built and sold a bit.ly competitor called Toadly, was an engineer at PostHog, and was engineering lead at On Deck. Side projects include Scramble and Radar, both open source on GitHub.',
  },
  {
    q: 'What does Zach Waterfield invest in?',
    a: 'Developer tools, AI, and B2B SaaS, at pre-seed and seed. He invests with Ripple Ventures and Pioneer Fund, has sourced deals for Village Global and Shaan Puri’s fund across 40+ companies, and co-runs an AngelList syndicate with Ian Logan. Portfolio companies include Supabase, Cal.com, Depot, Trigger.dev, Fern, and Instant.',
  },
  {
    q: 'What can Zach Waterfield help with?',
    a: 'Engineering and product strategy, fundraising strategy and deck review (he has helped 100+ companies with Y Combinator prep), early startup operations, and co-founder dynamics. His consulting work covers engineering hiring, MVP builds, architecture design, product process, and build-vs-buy analysis.',
  },
  {
    q: 'Where did Zach Waterfield study?',
    a: 'He studied Computer Engineering at the University of Waterloo in Canada.',
  },
  {
    q: 'Where has Zach Waterfield lived?',
    a: 'He grew up in Canada and has lived in Lima, Porto, San Francisco, Ann Arbor, Toronto, and Vancouver. He is currently based in Toronto.',
  },
  {
    q: 'How do I contact Zach Waterfield?',
    a: `Email ${AUTHOR.email}. He is also on GitHub, LinkedIn, and Twitter/X as @zlwaterfield.`,
  },
];

const postLine = (post: Post) =>
  `- [${post.title}](${url(`/blog/${post.slug}`)}) (${post.date}, ~${post.readingMinutes} min)${
    post.description ? `: ${post.description}` : ''
  }`;

function header() {
  return [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Personal site of ${AUTHOR.name} — ${AUTHOR.jobTitle} at ${AUTHOR.employer.name}, angel investor, and endurance athlete in ${AUTHOR.location.city}, ${AUTHOR.location.region}, ${AUTHOR.location.country}. Content here is first-party and written by Zach himself.`,
    '',
    `Canonical URL: ${SITE_URL}`,
    `Author: ${AUTHOR.name} <${AUTHOR.email}>`,
    `Profiles: ${AUTHOR.sameAs.filter((link) => !link.includes('x.com')).join(' | ')}`,
    `Last generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ];
}

function faqSection() {
  return [
    '## Frequently asked',
    '',
    ...FAQ.flatMap(({ q, a }) => [`### ${q}`, '', a, '']),
  ];
}

function pagesSection() {
  return [
    '## Pages',
    '',
    ...ROUTES.map((route) => `- [${route.title}](${url(route.path)}): ${route.summary}`),
    '',
  ];
}

function investmentsSection(investments: Investment[]) {
  return [
    '## Select investments',
    '',
    ...investments.map((investment) => {
      const note =
        investment.status === 'acquired' && investment.acquiredBy
          ? ` (acquired by ${investment.acquiredBy})`
          : investment.investedVia
            ? ` (${investment.investedVia.replace(/^Via /, 'via ')})`
            : '';
      return `- [${investment.name}](${investment.url})${note}: ${investment.description}`;
    }),
    '',
  ];
}

function eventsSection(categories: EventCategory[]) {
  return [
    '## Endurance events',
    '',
    ...categories.map(
      (category) =>
        `- ${category.category}: ${category.events
          .map((event) => `${event.name} (${event.location}, ${event.year})`)
          .join('; ')}`,
    ),
    '',
  ];
}

type Data = { investments: Investment[]; events: EventCategory[] };

export function buildLlmsTxt({ investments, events }: Data) {
  const posts = getPublishedPosts();
  return [
    ...header(),
    ...faqSection(),
    ...pagesSection(),
    '## Writing',
    '',
    ...posts.map(postLine),
    '',
    ...investmentsSection(investments),
    ...eventsSection(events),
    '## Optional',
    '',
    `- [Full text of every page](${url('/llms-full.txt')}): this file plus the complete body of every essay.`,
    `- [RSS feed](${url('/rss.xml')}): new writing.`,
    `- Markdown source for any post: ${SITE_URL}/md/blog/<slug>.md`,
    '',
  ].join('\n');
}

export function buildLlmsFullTxt(data: Data) {
  const posts = getPublishedPosts();
  return [
    buildLlmsTxt(data),
    '---',
    '',
    '# Full text of all writing',
    '',
    ...posts.flatMap((post) => [
      `## ${post.title}`,
      '',
      `URL: ${url(`/blog/${post.slug}`)}`,
      `Published: ${post.date}${post.updated ? ` (updated ${post.updated})` : ''}`,
      `Author: ${AUTHOR.name}`,
      ...(post.description ? [`Summary: ${post.description}`] : []),
      '',
      post.markdown,
      '',
      '---',
      '',
    ]),
  ].join('\n');
}

export const TEXT_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
} as const;
