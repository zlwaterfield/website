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
  const events = eventCategories.flatMap((category) => category.events);
  const completedEvents = events.filter((event) => event.status === 'completed').length;
  const upcomingEvents = events.filter((event) => event.status === 'upcoming').length;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center p-6 sm:p-12 md:p-20">
      <Hero completedEvents={completedEvents} upcomingEvents={upcomingEvents} />
      <EventsGrid eventCategories={eventCategories} />
      <BackToHome />
    </main>
  );
}

const Hero = ({ completedEvents, upcomingEvents }: { completedEvents: number; upcomingEvents: number }) => {
  return (
    <section className="mb-14 w-full border-b border-slate-200 pb-8">
      <Link href="/" className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
        ← Home
      </Link>
      <h1 className="mt-6 font-bold jersey-10 text-5xl text-slate-950 md:text-6xl">
        Endurance Journey
      </h1>
      <p className="mt-3 max-w-xl text-lg text-slate-600">
        Tracking my adventures in running and triathlon
      </p>
      <div className="mt-6 flex gap-8 text-sm">
        <div>
          <p className="text-2xl font-semibold text-slate-950">{completedEvents}</p>
          <p className="text-slate-500">completed</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-slate-950">{upcomingEvents}</p>
          <p className="text-slate-500">on the calendar</p>
        </div>
      </div>
    </section>
  );
}

const EventsGrid = ({ eventCategories }: { eventCategories: EventCategory[] }) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {eventCategories.map((category) => (
          <EventCard
            key={category.category}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}

const EventCard = ({ category }: { category: EventCategory }) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className={`h-1 bg-gradient-to-r ${category.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
            <span aria-hidden="true">{category.emoji}</span>
            {category.category}
          </h2>
          <span className="text-sm text-slate-500">{category.events.length} {category.events.length === 1 ? 'event' : 'events'}</span>
        </div>
        <ol className="mt-5 divide-y divide-slate-100">
          {category.events.map((event) => (
            <li
              key={`${event.name}-${event.year}`}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-slate-900">{event.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">{event.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{event.year}</p>
                <span className={event.status === 'completed' ? 'text-xs text-emerald-700' : 'text-xs text-blue-700'}>
                  {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const BackToHome = () => {
  return (
    <div className="mt-12 text-center">
      <Link
        href="/"
        className="inline-block text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
