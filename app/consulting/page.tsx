import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Consulting - Zach Waterfield',
  description: 'Helping early-stage companies build and scale their products.',
};

export default function Consulting() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
        ← Zach Waterfield
      </Link>

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
        <li><span className="font-medium text-stone-950">Hiring</span> — I can help design your engineering interview process and interview candidates to join the team.</li>
        <li><span className="font-medium text-stone-950">MVP</span> — I can work with your early team to build your MVP, making sure to focus on the key problems and not overbuild.</li>
        <li><span className="font-medium text-stone-950">Architecture design and planning</span> — In the early days, you want to default to building while also making considerations for the ability to scale and expand the feature set.</li>
        <li><span className="font-medium text-stone-950">Product and engineering process</span> — I&apos;ve spent a lot of time designing product processes.</li>
        <li><span className="font-medium text-stone-950">Build vs buy analysis</span> — Early on, especially when you don&apos;t have a lot of funds, it can be hard to figure out if you should build or buy.</li>
      </ul>
    </Section>
  );
}

const Testimonials = () => {
  return (
    <Section title="Testimonials">
      <div className="space-y-6">
        <blockquote className="border-l border-stone-300 pl-5 text-stone-700">
          <p className="font-serif-post italic">
            Zach is one of the rare breed of engineers and former founders that is excellent across technical and non-technical aspects of a startup. He can easily traverse conversations on business models, to product, to technical stacks, stitching it all together.
          </p>
          <footer className="mt-2 text-sm text-stone-500">Sam Kirschner, Director of ODX at On Deck</footer>
        </blockquote>

        <blockquote className="border-l border-stone-300 pl-5 text-stone-700">
          <p className="font-serif-post italic">
            Zach is unquestionably one of the most talented &amp; helpful people I&apos;ve ever met. He was mission-critical for my company across engineer hiring, roadmapping, fundraising, investor relations, and more.
          </p>
          <footer className="mt-2 text-sm text-stone-500">Taylor Crane, Founder and CEO of Clubs Poker</footer>
        </blockquote>
      </div>
    </Section>
  );
}

const Contact = () => {
  return (
    <Section title="Contact">
      <p className="text-stone-700">
        Email me at <a href="mailto:zlwaterfield@gmail.com" className="link">zlwaterfield@gmail.com</a> if you&apos;re interested in exploring working together.
      </p>
    </Section>
  );
}
