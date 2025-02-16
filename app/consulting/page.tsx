import Link from 'next/link';

export default function Consulting() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-12 md:p-24 max-w-4xl mx-auto">
      <Hero />
      <Services />
      <Contact />
    </main>
  );
}

const Hero = () => {
  return (
    <section className="w-full">
      <h1 className="text-5xl font-bold jersey-10">Consulting</h1>
      <p className="text-left">Helping early-stage companies build and scale their products. Read more about me <Link href="/about" className="text-blue-500 hover:underline">here</Link>.</p>
    </section>
  );
}

const Services = () => {
  return (
    <section className="w-full">
      <div className="md:container mx-auto mt-3">
        <h3 className="text-xl font-semibold mt-10 mb-4">Areas I Help</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Hiring</strong> - I can help design your engineering interview process and interview candidates to join the team.</li>
          <li><strong>MVP</strong> - I can work with your early team to build your MVP, making sure to focus on the key problems and not overbuild.</li>
          <li><strong>Architecture design and planning</strong> - In the early days, you want to default to building while also making considerations for the ability to scale and expand the feature set.</li>
          <li><strong>Product and engineering process</strong> - I've spent a lot of time designing product processes.</li>
          <li><strong>Build vs buy analysis</strong> - Early on, especially when you don't have a lot of funds, it can be hard to figure out if you should build or buy.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Testimonials</h3>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-gray-300 pl-4 italic">
            "Zach is one of the rare breed of engineers and former founders that is excellent across technical and non-tehnical aspects of a startup. He can easily traverse conversations on business models, to product, to technical stacks, stitching it all together."
            <footer className="mt-2">- <strong>Sam Kirschner</strong>, Director of ODX at On Deck</footer>
          </blockquote>
          
          <blockquote className="border-l-4 border-gray-300 pl-4 italic">
            "Zach is unquestionably one of the most talented & helpful people I've ever met. He was mission-critical for my company across engineer hiring, roadmapping, fundraising, investor relations, and more."
            <footer className="mt-2">- <strong>Taylor Crane</strong>, Founder and CEO of Clubs Poker</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

const Contact = () => {
  return (
    <section className="w-full">
      <div className="md:container mx-auto mt-3">
        <h3 className="text-xl font-semibold mt-10 mb-4">Contact</h3>
        <p>Please email me at <a href="mailto:zlwaterfield@gmail.com" className="text-blue-500 hover:underline">zlwaterfield@gmail.com</a> if you're interested in exploring working with me</p>
      </div>
    </section>
  );
}