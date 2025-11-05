import { EventCategory } from '@/types/events';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

async function getEvents(): Promise<EventCategory[]> {
  const data = fs.readFileSync(path.resolve('./data/events.json'), 'utf-8');
  const events = JSON.parse(data) as EventCategory[];
  return events;
}

export default async function EventsPage() {
  const eventCategories = await getEvents();
  const totalEvents = eventCategories.reduce((sum, cat) => sum + cat.events.length, 0);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-12 md:p-24 max-w-6xl mx-auto">
      <Hero totalEvents={totalEvents} />
      <EventsGrid eventCategories={eventCategories} />
      <BackToHome />
    </main>
  );
}

const Hero = ({ totalEvents }: { totalEvents: number }) => {
  return (
    <section className="w-full mb-12 text-center">
      <h1 className="text-5xl md:text-6xl font-bold jersey-10 mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        Endurance Journey
      </h1>
      <p className="text-xl text-gray-600 mb-2">
        Tracking my adventures in running and triathlon
      </p>
      <div className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
        {totalEvents} Events Completed 🎉
      </div>
    </section>
  );
}

const EventsGrid = ({ eventCategories }: { eventCategories: EventCategory[] }) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventCategories.map((category, index) => (
          <EventCard
            key={category.category}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

const EventCard = ({ category, index }: { category: EventCategory; index: number }) => {
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
      style={{
        animation: `fadeInUp 0.6s ease-out ${animationDelay} both`
      }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 transition-all duration-300 group-hover:opacity-100`} />

      {/* Content */}
      <div className="relative p-6 flex flex-col gap-4">
        {/* Header with emoji and count */}
        <div className="flex items-center justify-between">
          <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
            {category.emoji}
          </span>
          <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full font-bold text-sm shadow-md">
            {category.events.length} {category.events.length === 1 ? 'race' : 'races'}
          </div>
        </div>

        {/* Category Title */}
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          {category.category}
          {category.comingSoon && (
            <span className="text-xs bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full font-semibold animate-bounce">
              Coming Soon!
            </span>
          )}
        </h2>

        {/* Events List */}
        <div className="space-y-3">
          {category.events.map((event, eventIndex) => (
            <div
              key={`${event.name}-${event.year}`}
              className="bg-white/20 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:bg-white/30 hover:translate-x-2"
              style={{
                animation: `slideIn 0.4s ease-out ${parseInt(animationDelay) + (eventIndex * 100)}ms both`
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-semibold text-sm">{event.name}</p>
                  <p className="text-white/80 text-xs">{event.location}</p>
                </div>
                <span className="text-white/90 text-xs font-bold bg-black/20 px-2 py-1 rounded">
                  {event.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500" />
    </div>
  );
}

const BackToHome = () => {
  return (
    <div className="mt-12 text-center">
      <Link
        href="/"
        className="inline-block text-blue-500 hover:text-blue-700 font-semibold hover:underline transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

// Add custom animations via inline style
const style = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

// Note: In a production app, these animations would typically be in globals.css
// For this implementation, the animations are defined inline for completeness
