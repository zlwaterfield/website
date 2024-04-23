// Read json file
import fs from 'fs';
import path from 'path';

async function getInvestments() {
  const data = fs.readFileSync(path.resolve('./data/investments.json'));
  const investments = JSON.parse(data);
  return investments
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-3xl mx-auto">
      <Hero />
      <Resume />
      <Investments />
    </main>
  );
}

const Hero = () => {
  return (
    <section className="w-full">
      <h1 className="text-6xl font-bold">Hello, I'm John Doe</h1>
      <p className="text-lg text-left">I'm a software engineer based in New York City</p>
    </section>
  );
}

const Resume = () => {
  return (
    <section className="w-full">
      <h2 className="text-4xl font-bold">Resume</h2>
      ## About me

I grew up in Canada 🇨🇦. I went to the [University of Waterloo](https://uwaterloo.ca/) for Computer engineering and worked at a variety of early/growth-stage companies.

I've lived in many places like Lima, Porto, San Francisco, Ann Arbor, Toronto, and Vancouver. I love travelling and exploring new places.

**Favourite things to do:**

- ☕️ Drink (and brew) good coffee
- 🗣 Talk to passionate people
- ⛷ Downhill ski
- 🚴‍♂️ Bike (mountain and road)
- 🍸 Make and drink cocktails
- 🛬 Travel to new places for long periods of time (1 month+)
- ♣️ Play poker
- 🏐 Beach Volleyball
- 💻 Write code →
    
    [**My** favourite technologies](https://zlwaterfield.com/My-favourite-technologies-dd9a4c7f2e9f4c7d9b4d528dcc98202e?pvs=21)
    

**What I'm doing these days:**

- Last year I started a new company: [Zettlor](https://zettlor.com/)
- I run a founder poker game in Toronto. Message me if you’re interested in joining.
- [Fractional CTO](https://zlwaterfield.com/Fractional-CTO-85428fb9a3a240f1a6e300901a1f2b35?pvs=21) - I work with early-stage companies to help them build their team and product - *not taking clients right now*
- Training for my first triathlon 🏊‍♂️ 🚴‍♂️ 🏃

**Things I've done in the past:**

- [Investment Club Syndicate](https://angel.co/ian-logan-and-zach-waterfield/syndicate?utm_campaign=syndicate_direct_link) - [Ian Logan](https://twitter.com/albertianlogan) and I run a syndicate on AngelList where we invest in a wide range of companies.
- [On Deck](http://beondeck.com/) - I was an engineering lead at On Deck. On Deck is where the world's top talent comes to connect. Whatever it is you want to do next, our ever-growing community and action-oriented programming will help you get there—fast. If you want to learn something new to up-level your career, launch and scale your big ideas, or make lifelong friends, this is the place for you.
- [Kopa](https://www.kopa.co/) **-** In 2016, I co-founded [Kopa](https://www.kopa.co/), originally called PadPiper, with [Jack](https://www.linkedin.com/in/greaturl/) and [Courtney](https://www.linkedin.com/in/courtneysabo/). We founded it on the belief that there is a better way to rent. Housing is such an important piece of our lives, yet it is one of the most stressful to acquire. We built Kopa to be the most streamlined process for renting a home, from searching to paying and moving in. Kopa went through YCombinator in Winter 2019 and has since expanded to over 300 cities in the United States and helped thousands of people find homes. In August 2020, I stepped back from Kopa to work on other things.
- [All Access Fund](https://angel.co/v/back/shaans-all-access-fund) - I work closely with [Shaan Puri](https://twitter.com/ShaanVP) and his team at the All Access Fund to invest in early-stage companies. AA is a rolling fund deploying >$4m per year and writing ~40 checks per year.
- [Toad](https://toadli.co/) (acquired) - I built a saas business that was a simple and powerful link shortener. This got acquired by a venture studio in August 2021.
- [Village Global](https://www.villageglobal.vc/) - I work with Village Global to deploy capital to amazing early-stage companies. Village Global is the early-stage venture capital fund backed by successful entrepreneurs including Bill Gates, Sara Blakely, Barry Diller, Reid Hoffman, Magic Johnson, and Anne Wojcicki.
- [Startup Poker](https://startuppoker.club/) -  Startup Poker is a game to meet and connect with others in the startup realm. We are a group of founders, investors, startup employees, and creators from a variety of industries.
- [Substack Newsletter](https://zachsthoughts.substack.com/) - I’ve launched this Substack to write about ideas I have, frameworks I use and other things that I come across in my personal and professional life. I write about my experiences as I navigate fast-growth companies, invest in early-stage startups, and work with amazing founders.
- + worked at many other places like [WorkOS](https://workos.com/), [Farmlogs,](https://farmlogs.com/) [Carrot,](https://carrot.co/) [Universe](https://www.universe.com/), etc.

**Find me on the internet:**

Email: [zlwaterfield@gmail.com](mailto:zlwaterfield@gmail.com)

LinkedIn: https://www.linkedin.com/in/zlwaterfield/ 

Twitter: https://twitter.com/zlwaterfield
    </section>
  );
}

const Investments = async () => {
  const investments = await getInvestments();
  return (
    <section className="w-full">
      <h2 className="text-4xl font-bold">Investment Summary</h2>
      {investments.map((investment) => (
        <InvestmentCard investment={investment} key={investment.id} />
      ))}
    </section>
  );
}

const InvestmentCard = ({ investment }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="text-xl font-bold">{investment.name}</h3>
      <p className="text-lg">{investment.description}</p>
    </div>
  );
}