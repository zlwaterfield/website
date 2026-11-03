import { JsonLd } from '@/app/components/JsonLd';
import { breadcrumbSchema, consultingSchema, graph } from '@/lib/schema';
import { AUTHOR } from '@/lib/site';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'Consulting',
  description:
    'Zach Waterfield consults with early-stage companies on engineering hiring, MVP builds, architecture design, product and engineering process, and build-vs-buy decisions.',
  path: '/consulting',
  keywords: [
    'startup engineering consultant',
    'fractional head of engineering',
    'MVP development consultant',
    'engineering hiring process',
    'early-stage startup advisor Toronto',
  ],
});

/**
 * Services and testimonials live in data, not markup, so the JSON-LD
 * `hasOfferCatalog` and `review` nodes are generated from the exact strings the
 * page renders. Structured data that drifts from visible text is worse than
 * none at all.
 */
const SERVICES = [
  {
    name: 'Hiring',
    detail:
      'I can help design your engineering interview process and interview candidates to join the team.',
  },
  {
    name: 'MVP',
    detail:
      'I can work with your early team to build your MVP, making sure to focus on the key problems and not overbuild.',
  },
  {
    name: 'Architecture design and planning',
    detail:
      'In the early days, you want to default to building while also making considerations for the ability to scale and expand the feature set.',
  },
  {
    name: 'Product and engineering process',
    detail: 'I’ve spent a lot of time designing product processes.',
  },
  {
    name: 'Build vs buy analysis',
    detail:
      'Early on, especially when you don’t have a lot of funds, it can be hard to figure out if you should build or buy.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'Zach is one of the rare breed of engineers and former founders that is excellent across technical and non-technical aspects of a startup. He can easily traverse conversations on business models, to product, to technical stacks, stitching it all together.',
    author: 'Sam Kirschner',
    role: 'Director of ODX at On Deck',
  },
  {
    quote:
      'Zach is unquestionably one of the most talented & helpful people I’ve ever met. He was mission-critical for my company across engineer hiring, roadmapping, fundraising, investor relations, and more.',
    author: 'Taylor Crane',
    role: 'Founder and CEO of Clubs Poker',
  },
];

export default function Consulting() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <JsonLd
        schema={graph(
          consultingSchema(
            TESTIMONIALS,
            SERVICES.map((service) => service.name),
          ),
          breadcrumbSchema([
            { name: 'Zach Waterfield', path: '/' },
            { name: 'Consulting', path: '/consulting' },
          ]),
        )}
      />
      <nav aria-label="Breadcrumb">
        <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
          ← Zach Waterfield
        </Link>
      </nav>

      <header className="mt-12 mb-12">
        <h1 className="font-serif-post text-4xl font-medium tracking-tight text-stone-950">Consulting</h1>
        <p className="mt-3 text-stone-500">
          Helping early-stage companies build and scale their products. More about me{' '}
          <Link href="/" className="link">here</Link>.
        </p>
      </header>

      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-stone-400">{title}</h2>
      {children}
    </section>
  );
}

const Services = () => {
  return (
    <Section title="Areas I help">
      <ul className="list-disc space-y-3 pl-5 text-stone-700 marker:text-stone-300">
        {SERVICES.map((service) => (
          <li key={service.name}>
            <span className="font-medium text-stone-950">{service.name}</span> — {service.detail}
          </li>
        ))}
      </ul>
    </Section>
  );
}

const Testimonials = () => {
  return (
    <Section title="Testimonials">
      <div className="space-y-6">
        {TESTIMONIALS.map((testimonial) => (
          <blockquote key={testimonial.author} className="border-l border-stone-300 pl-5 text-stone-700">
            <p className="font-serif-post italic">{testimonial.quote}</p>
            <footer className="mt-2 text-sm text-stone-500">
              <cite className="not-italic">
                {testimonial.author}, {testimonial.role}
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

const Contact = () => {
  return (
    <Section title="Contact">
      <p className="text-stone-700">
        Email me at{' '}
        <a href={`mailto:${AUTHOR.email}`} className="link">
          {AUTHOR.email}
        </a>{' '}
        if you&apos;re interested in exploring working together.
      </p>
    </Section>
  );
}
