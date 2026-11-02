import { formatDate, getPosts } from '@/lib/posts';
import { Investment } from '@/types/investments';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

async function getInvestments(): Promise<Investment[]> {
  const data = fs.readFileSync(path.resolve('./data/investments.json'), 'utf-8');
  const investments = JSON.parse(data) as Investment[];
  return investments
}

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Hero />
      <Resume />
      <Investments />
      <Footer />
    </main>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="mt-14">
      <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-stone-400">{title}</h2>
      {children}
    </section>
  );
}

const Hero = () => {
  return (
    <header>
      <h1 className="font-serif-post text-4xl font-medium tracking-tight text-stone-950">Hey, I&apos;m Zach</h1>
      <p className="mt-3 text-stone-500">Engineer, investor, and coffee enthusiast based in Toronto, Canada.</p>
    </header>
  );
}

const Resume = () => {
  return (
    <>
      <Section title="About">
        <p className="leading-relaxed text-stone-700">I grew up in Canada. I went to the <a href="https://uwaterloo.ca/" className="link">University of Waterloo</a> for Computer engineering and worked at a variety of early/growth-stage companies. I&apos;ve lived in many places like Lima, Porto, San Francisco, Ann Arbor, Toronto, and Vancouver. I love travelling and exploring new places.</p>
      </Section>

      <Writing />

      <Section title="Favourite things">
        <ul className="list-disc space-y-1 pl-5 text-stone-700 marker:text-stone-300">
          <li>Building products</li>
          <li>Good coffee</li>
          <li>Talking to passionate people</li>
          <li>Traveling to new places</li>
          <li>Running — <Link href="/events" className="link">see my endurance events</Link></li>
          <li>Biking</li>
          <li>Swimming</li>
        </ul>
      </Section>

      <Section title="These days">
        <ul className="list-disc space-y-1.5 pl-5 text-stone-700 marker:text-stone-300">
          <li>Leading the engineering team at <a href="https://www.rovetravel.com/" className="link">Rove Travel</a></li>
          <li>Training for swim, bike, and run</li>
          <li>New father — figuring out this new stage in life</li>
          <li>Investing with <a href="https://www.rippleventures.com/" className="link">Ripple Ventures</a> and <a href="https://www.pioneerfund.vc/" className="link">Pioneer Fund</a> — focused on devtools, AI and B2B SaaS</li>
          <li>Founder poker game (a few times a year in Toronto)</li>
        </ul>
      </Section>

      <Section title="Previously">
        <ul className="list-disc space-y-1.5 pl-5 text-stone-700 marker:text-stone-300">
          <li>Engineer at <a href="https://posthog.com" className="link">PostHog</a></li>
          <li>Events and dinners for founders and people in tech</li>
          <li>Founded <a href="https://zettlor.com/" className="link">Zettlor</a></li>
          <li>Helped source deals with Village Global and Shaan Puri&apos;s fund — investing in 40+ companies</li>
          <li>Built and sold a bit.ly competitor named Toadly</li>
          <li>Side projects like <a href="https://github.com/zlwaterfield/scramble" className="link">Scramble</a> and <a href="https://github.com/zlwaterfield/radar" className="link">Radar</a></li>
          <li><a href="https://angel.co/ian-logan-and-zach-waterfield/syndicate?utm_campaign=syndicate_direct_link" className="link">Investment Club Syndicate</a> — <a href="https://twitter.com/albertianlogan" className="link">Ian Logan</a> and I run a syndicate on AngelList where we invest in a wide range of companies.</li>
          <li><a href="http://beondeck.com/" className="link">On Deck</a> — engineering lead at a community for ambitious people building what&apos;s next.</li>
          <li><a href="https://www.kopa.co/" className="link">Kopa</a> — co-founded Kopa (formerly PadPiper), a YC W19 startup making renting easier. I stepped back in 2020.</li>
          <li>Many more including ventures like <a href="https://workos.com/" className="link">WorkOS</a>, <a href="https://farmlogs.com/" className="link">Farmlogs</a>, and others.</li>
        </ul>
      </Section>

      <Section title="How I can help">
        <ul className="list-disc space-y-3 pl-5 text-stone-700 marker:text-stone-300">
          <li><span className="font-medium text-stone-950">Engineering and product strategy</span> — I&apos;ve been around the block a few times and have a good sense of what works and what doesn&apos;t. I&apos;m happy to help you think through your product strategy, engineering strategy, and how to build a great product.</li>
          <li><span className="font-medium text-stone-950">Fundraising strategy, pitch help, deck review</span> — I&apos;ve helped over 100 companies with YC prep and reviewed countless decks for founders raising their pre-seed and seed rounds. If you need help building a strategy around your raise, improving your narrative, or just getting a deck review, let me know.</li>
          <li><span className="font-medium text-stone-950">Early startup operations</span> — I&apos;ve spent a lot of time both building my startup and helping other founders. There is a lot to manage. I&apos;m happy to help think through those early operations like organizing your team, interviewing early hires, choosing the right services for payroll, bookkeeping, etc.</li>
          <li><span className="font-medium text-stone-950">Co-founder dynamics</span> — I&apos;ve been through the ups and downs you go through with your founding team. It can be hard, but there are things you can do to make it easier. I&apos;m happy to walk through strategies I&apos;ve used that have worked wonders on team morale.</li>
        </ul>
      </Section>
    </>
  );
}

const Writing = () => {
  const posts = getPosts().slice(0, 5);
  if (posts.length === 0) return null;

  return (
    <Section title="Writing">
      <ul className="border-t border-stone-200">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-stone-200">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-baseline justify-between gap-6 py-3"
            >
              <span className="text-stone-900 group-hover:underline group-hover:decoration-stone-400 group-hover:underline-offset-4">
                {post.title}
              </span>
              <time dateTime={post.date} className="shrink-0 text-sm tabular-nums text-stone-400">
                {formatDate(post.date, 'short')}
              </time>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/blog" className="mt-4 inline-block text-sm text-stone-500 transition-colors hover:text-stone-900">
        All writing
      </Link>
    </Section>
  );
}

// Icons live in public/favicons, keyed by hostname. Refresh them with
// `npm run favicons` after adding an investment.
const faviconFor = (url: string) => `/favicons/${new URL(url).hostname}.png`;

const Investments = async () => {
  const investments = await getInvestments();
  return (
    <Section title="Select investments">
      <ul className="border-t border-stone-200">
        {investments.map((investment) => (
          <li key={investment.name} className="border-b border-stone-200 py-3">
            <Link href={investment.url} className="group flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- a 128px static PNG gains nothing from the image optimizer */}
              <img
                src={faviconFor(investment.url)}
                alt=""
                width={20}
                height={20}
                loading="lazy"
                className="mt-0.5 h-5 w-5 shrink-0 rounded-sm bg-stone-100 object-contain"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-6">
                  <span className="text-stone-900 group-hover:underline group-hover:decoration-stone-400 group-hover:underline-offset-4">
                    {investment.name}
                  </span>
                  {(investment.status === 'acquired' || investment.investedVia) && (
                    <span className="shrink-0 text-sm text-stone-400">
                      {investment.status === 'acquired'
                        ? `Acquired by ${investment.acquiredBy}`
                        : investment.investedVia}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-stone-500">{investment.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const Footer = () => {
  return (
    <footer className="mt-14 border-t border-stone-200 pt-6 text-sm text-stone-500">
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <a href="mailto:zlwaterfield@gmail.com" className="transition-colors hover:text-stone-900">Email</a>
        <a href="https://www.linkedin.com/in/zlwaterfield/" className="transition-colors hover:text-stone-900">LinkedIn</a>
        <a href="https://twitter.com/zlwaterfield" className="transition-colors hover:text-stone-900">Twitter</a>
        <a href="/rss.xml" className="transition-colors hover:text-stone-900">RSS</a>
      </div>
    </footer>
  );
}
