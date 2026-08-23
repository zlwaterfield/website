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
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-12 md:p-24 max-w-4xl mx-auto">
      <Hero />
      <Resume />
      <Investments />
    </main>
  );
}

const Hero = () => {
  return (
    <section className="w-full">
      <h1 className="text-5xl font-bold jersey-10">Hey, I'm Zach! 👋</h1>
      <p className="text-left">Engineer, investor, and coffee enthusiast ☕ based in Toronto, Canada</p>
    </section>
  );
}

const Resume = () => {
  return (
    <section className="w-full">
      <div className="md:container mx-auto mt-3">
        <h3 className="text-xl font-semibold mt-10 mb-4">About</h3>
        <p>I grew up in Canada 🇨🇦. I went to the <a href="https://uwaterloo.ca/" className="text-blue-500 hover:underline">University of Waterloo</a> for Computer engineering and worked at a variety of early/growth-stage companies. I've lived in many places like Lima, Porto, San Francisco, Ann Arbor, Toronto, and Vancouver. I love travelling and exploring new places.</p>

        <h3 className="text-xl font-semibold mt-10 mb-4">Favourite things</h3>
        <ul className="list-disc pl-6 space-y-0.5">
            <li>💻 Building products</li>
            <li>☕️ Good coffee</li>
            <li>🗣 Talking to passionate people</li>
            <li>🛬 Traveling to new places</li>
            <li>👟 Running - <Link href="/events" className="text-blue-500 hover:underline">See my endurance events</Link></li>
            <li>🚴‍♂️ Biking</li>
            <li>🏊 Swimming</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">What I'm doing these days</h3>
        <ul className="list-disc pl-6 space-y-0.5">
            <li>Leading the engineering team at <a href="https://www.rovetravel.com/" className="text-blue-500 hover:underline">Rove Travel</a></li>
            <li>Training 🏊‍♂️ 🚴‍♂️ 🏃</li>
            <li>New father — figuring out this new stage in life</li>
            <li>Investing with <a href="https://www.rippleventures.com/" className="text-blue-500 hover:underline">Ripple Ventures</a> and <a href="https://www.pioneerfund.vc/" className="text-blue-500 hover:underline">Pioneer Fund</a> - focused on devtools, AI and B2B SaaS</li>
            <li>Founder poker game (a few times a year in Toronto)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Things I've done in the past</h3>
        <ul className="list-disc pl-6 space-y-0.5">
            <li>Engineer at <a href="https://posthog.com" className="text-blue-500 hover:underline">PostHog</a></li>
            <li>Events / dinners for founders and people in tech</li>
            <li>Founded <a href="https://zettlor.com/" className="text-blue-500 hover:underline">Zettlor</a></li>
            <li>Helped source deals with Village Globals and Shaan Puri's fund - investing in 40+ companies</li>
            <li>Built and sold a bit.ly competitor named Toadly</li>
            <li>Side projects like <a href="https://github.com/zlwaterfield/scramble" className="text-blue-500 hover:underline">Scramble</a> and <a href="https://github.com/zlwaterfield/radar" className="text-blue-500 hover:underline">Radar</a></li>
            <li><a href="https://angel.co/ian-logan-and-zach-waterfield/syndicate?utm_campaign=syndicate_direct_link" className="text-blue-500 hover:underline">Investment Club Syndicate</a> - <a href="https://twitter.com/albertianlogan" className="text-blue-500 hover:underline">Ian Logan</a> and I run a syndicate on AngelList where we invest in a wide range of companies.</li>
            <li><a href="http://beondeck.com/" className="text-blue-500 hover:underline">On Deck</a> - Engineering lead at a community for ambitious people building what&apos;s next.</li>
            <li><a href="https://www.kopa.co/" className="text-blue-500 hover:underline">Kopa</a> - Co-founded Kopa (formerly PadPiper), a YC W19 startup making renting easier. I stepped back in 2020.</li>
            <li>Many more including ventures like <a href="https://workos.com/" className="text-blue-500 hover:underline">WorkOS</a>, <a href="https://farmlogs.com/" className="text-blue-500 hover:underline">Farmlogs</a>, and others.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Find me on the internet</h3>
        <p>Email: <a href="mailto:zlwaterfield@gmail.com" className="text-blue-500 hover:underline">zlwaterfield@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/zlwaterfield/" className="text-blue-500 hover:underline">https://www.linkedin.com/in/zlwaterfield/</a></p>
        <p>Twitter: <a href="https://twitter.com/zlwaterfield" className="text-blue-500 hover:underline">https://twitter.com/zlwaterfield</a></p>

        <h3 className="text-xl font-semibold mt-10 mb-4">How can I help</h3>
        <ul className="list-disc pl-6 space-y-0.5">
          <li><strong>Engineering and product strategy</strong> - I've been around the block a few times and have a good sense of what works and what doesn't. I'm happy to help you think through your product strategy, engineering strategy, and how to build a great product.</li>
          <li><strong>Fundraising strategy / pitch help / deck review</strong> - I've helped over 100 companies with YC prep and reviewed countless decks for founders raising their pre-seed and seed rounds. If you need help building a strategy around your raise, improving your narrative, or just getting a deck review, let me know!</li>
          <li><strong>Early startup operations</strong> - I've spent a lot of time both building my startup and helping other founders. There is a lot to manage. I'm happy to help think through those early operations like organizing your team, interviewing early hires, choosing the right services for payroll, bookkeeping, etc.</li>
          <li><strong>Co-founder dynamics</strong> - I've been through the ups and downs you go through with your founding team. It can be hard, but there are things you can do to make it easier. I'm happy to walk through strategies I've used that have worked wonders on team morale.</li>
        </ul>
    </div>
    </section>
  );
}

const Investments = async () => {
  const investments = await getInvestments();
  return (
    <section className="w-full">
      <div className="mt-16 mb-8">
        <h3 className="text-3xl font-bold mb-2 text-slate-950">
          Select Investments
        </h3>
        <p className="text-sm text-slate-600">Companies I've backed and believe in</p>
      </div>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <div key={investment.name}>
            <InvestmentCard investment={investment} />
          </div>
        ))}
      </div>
    </section>
  );
}

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  return (
    <Link href={investment.url} className="block cursor-pointer">
      <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl">
        {investment.status === 'acquired' && (
          <p className="relative z-10 border-b border-slate-200 bg-slate-50 px-6 py-1.5 text-xs font-medium text-slate-600">
            Acquired by {investment.acquiredBy}
          </p>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 12% 0%, ${investment.brandColor}40, transparent 45%), radial-gradient(circle at 95% 100%, ${investment.brandAccent}35, transparent 50%)${investment.brandHighlight ? `, radial-gradient(circle at 50% 100%, ${investment.brandHighlight}35, transparent 45%)` : ''}`,
          }}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${investment.status === 'acquired' ? 'top-7' : 'top-0'}`}
          style={{ background: `linear-gradient(90deg, ${investment.brandColor}, ${investment.brandAccent}${investment.brandHighlight ? `, ${investment.brandHighlight}` : ''})` }}
        />

        <div className="relative flex flex-col gap-3 p-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              {investment.name}
            </h3>
            {investment.investedVia && (
              <p className="mt-0.5 text-xs text-slate-500">{investment.investedVia}</p>
            )}
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {investment.description}
          </p>

          <div className="mt-2 flex items-center gap-1 text-slate-400 transition-colors group-hover:text-slate-700">
            <span className="text-xs font-medium">Learn more</span>
            <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
