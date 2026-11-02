import { EventCategory } from '@/types/events';
import type { Metadata } from 'next';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

export const metadata: Metadata = {
  title: 'Endurance events - Zach Waterfield',
  description: 'Running and triathlon events, completed and upcoming.',
};

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
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
        ← Zach Waterfield
      </Link>

      <header className="mt-12 mb-12">
        <h1 className="font-serif-post text-4xl font-medium tracking-tight text-stone-950">Endurance events</h1>
        <p className="mt-3 text-stone-500">
          {completedEvents} completed
          {upcomingEvents > 0 && `, ${upcomingEvents} on the calendar`}.
        </p>
      </header>

      <div className="space-y-10">
        {eventCategories.map((category) => (
          <EventGroup key={category.category} category={category} />
        ))}
      </div>
    </main>
  );
}

const EventGroup = ({ category }: { category: EventCategory }) => {
  return (
    <section>
      <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-stone-400">
        {category.category}
      </h2>
      <ul className="border-t border-stone-200">
        {category.events.map((event) => (
          <li
            key={`${event.name}-${event.year}`}
            className="flex items-baseline justify-between gap-6 border-b border-stone-200 py-3"
          >
            <div>
              <p className="text-stone-900">{event.name}</p>
              <p className="mt-0.5 text-sm text-stone-500">{event.location}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm tabular-nums text-stone-500">{event.year}</p>
              {event.status === 'upcoming' && (
                <p className="mt-0.5 text-xs text-stone-400">Upcoming</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
