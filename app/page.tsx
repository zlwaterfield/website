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
      <h1 className="text-5xl font-bold jersey-10">Zach Waterfield</h1>
      <p className="text-left">Engineer and investor based in Toronto, Canada</p>
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
            <li>👟 Running</li>
            <li>🚴‍♂️ Biking</li>
            <li>🏊 Swimming</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">What I'm doing these days</h3>
        <ul className="list-disc pl-6 space-y-0.5">
            <li>Engineer at <a href="https://posthog.com" className="text-blue-500 hover:underline">PostHog</a></li>
            <li>Training for my first Ironman 🏊‍♂️ 🚴‍♂️ 🏃</li>
            <li>Investing with <a href="https://www.rippleventures.com/" className="text-blue-500 hover:underline">Ripple Ventures</a> and <a href="https://www.pioneerfund.vc/" className="text-blue-500 hover:underline">Pioneer Fund</a> - focused on devtools, AI and B2B SaaS</li>
            <li>Advising early stage startups, <Link href="/consulting" className="text-blue-500 hover:underline">more here</Link></li>
            <li>Building fun side projects like <a href="https://github.com/zlwaterfield/scramble" className="text-blue-500 hover:underline">Scramble</a></li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Things I've done in the past</h3>
        <ul className="list-disc pl-6 space-y-0.5">
            <li>Founder poker game.</li>
            <li>Events / dinners for founders and people in tech</li>
            <li>Founded <a href="https://zettlor.com/" className="text-blue-500 hover:underline">Zettlor</a></li>
            <li>Helped source deals with Village Globals and Shaan Puri's fund - investing in 40+ companies</li>
            <li>Built and sold a bit.ly competitor named Toadly</li>
            <li><a href="https://angel.co/ian-logan-and-zach-waterfield/syndicate?utm_campaign=syndicate_direct_link" className="text-blue-500 hover:underline">Investment Club Syndicate</a> - <a href="https://twitter.com/albertianlogan" className="text-blue-500 hover:underline">Ian Logan</a> and I run a syndicate on AngelList where we invest in a wide range of companies.</li>
            <li><a href="http://beondeck.com/" className="text-blue-500 hover:underline">On Deck</a> - I was an engineering lead at On Deck. On Deck is where the world's top talent comes to connect. Whatever it is you want to do next, our ever-growing community and action-oriented programming will help you get there—fast. If you want to learn something new to up-level your career, launch and scale your big ideas, or make lifelong friends, this is the place for you.</li>
            <li><a href="https://www.kopa.co/" className="text-blue-500 hover:underline">Kopa</a> - In 2016, I co-founded Kopa, originally called PadPiper, with <a href="https://www.linkedin.com/in/greaturl/" className="text-blue-500 hover:underline">Jack</a> and <a href="https://www.linkedin.com/in/courtneysabo/" className="text-blue-500 hover:underline">Courtney</a>. We founded it on the belief that there is a better way to rent. Housing is such an important piece of our lives, yet it is one of the most stressful to acquire. We built Kopa to be the most streamlined process for renting a home, from searching to paying and moving in. Kopa went through YCombinator in Winter 2019 and has since expanded to over 300 cities in the United States and helped thousands of people find homes. In August 2020, I stepped back from Kopa to work on other things.</li>
            <li>Many more including ventures like <a href="https://workos.com/" className="text-blue-500 hover:underline">WorkOS</a>, <a href="https://farmlogs.com/" className="text-blue-500 hover:underline">Farmlogs</a>, and others.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Find me on the internet</h3>
        <p>Email: <a href="mailto:zlwaterfield@gmail.com" className="text-blue-500 hover:underline">zlwaterfield@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/zlwaterfield/" className="text-blue-500 hover:underline">https://www.linkedin.com/in/zlwaterfield/</a></p>
        <p>Twitter: <a href="https://twitter.com/zlwaterfield" className="text-blue-500 hover:underline">https://twitter.com/zlwaterfield</a></p>

        <h3 className="text-xl font-semibold mt-10 mb-4">How can I help</h3>
        <ul className="list-disc pl-6 space-y-0.5">
          <li><strong>Engineering and product strategy</strong> - I've been around the block a few times and have a good sense of what works and what doesn't. I'm happy to help you think through your product strategy, engineering strategy, and how to build a great product.</li>
          <li><strong>Fundraising strategy / pitch help / deck review</strong> - I've helped >100 companies with YC prep and reviewed countless decks for founders raising their pre-seed and seed rounds. If you need help building a strategy around your raise, improving your narrative, or just getting a deck review, let me know!</li>
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
      <h3 className="text-xl font-semibold mt-10 mb-4">Select investments</h3>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {investments.map((investment: any) => (
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
      <div className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-300/90 to-green-500/90 opacity-90 transition-all duration-300 group-hover:opacity-100" />
        <div className="relative px-4 pt-4 pb-6 flex flex-col gap-2">
          <h3 className="text-xl font-bold text-white">{investment.name}</h3>
          <p className="text-gray-100 text-sm leading-relaxed opacity-90">{investment.description}</p>
        </div>
      </div>
    </Link>
  );
}
