import Link from 'next/link';

export default function BookPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-12 md:p-24 max-w-4xl mx-auto">
      <Hero />
      <BookingOptions />
      <BackToHome />
    </main>
  );
}

const Hero = () => {
  return (
    <section className="w-full">
      <h1 className="text-5xl font-bold jersey-10">Book a Call</h1>
      <p className="text-left mt-2">
        Interested in working together? Pick a time that works for you.
      </p>
    </section>
  );
};

const BookingOptions = () => {
  return (
    <section className="w-full">
      <div className="md:container mx-auto mt-3">
        <h3 className="text-xl font-semibold mt-10 mb-4">What I can help with</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Engineering &amp; product strategy</strong> – Thinking through your product and technical roadmap.</li>
          <li><strong>Fundraising strategy &amp; deck review</strong> – Narrative, pitch prep, and investor intros.</li>
          <li><strong>Early startup operations</strong> – Team structure, tooling, hiring process.</li>
          <li><strong>Co-founder dynamics</strong> – Working through the hard stuff with your founding team.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-10 mb-4">Schedule a time</h3>
        <p className="text-gray-600 mb-6">
          Choose the type of session that best fits your needs and grab a slot on my calendar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BookingCard
            title="Intro Call"
            duration="30 min"
            description="A quick chat to get to know each other and see if we're a good fit."
            emoji="👋"
          />
          <BookingCard
            title="Deep Dive"
            duration="60 min"
            description="A focused session to dig into a specific problem or project."
            emoji="🔍"
          />
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
          <p>
            Prefer email? Reach me at{' '}
            <a href="mailto:zlwaterfield@gmail.com" className="text-blue-500 hover:underline">
              zlwaterfield@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

const BookingCard = ({
  title,
  duration,
  description,
  emoji,
}: {
  title: string;
  duration: string;
  description: string;
  emoji: string;
}) => {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-gray-300 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{emoji}</span>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {duration}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const BackToHome = () => {
  return (
    <div className="mt-12 w-full">
      <Link href="/" className="text-blue-500 hover:text-blue-700 font-semibold hover:underline transition-colors">
        ← Back to Home
      </Link>
    </div>
  );
};
