import { JsonLd } from '@/app/components/JsonLd';
import { breadcrumbSchema, eventsSchema, graph } from '@/lib/schema';
import { getEvents } from '@/lib/data';
import { EventCategory } from '@/types/events';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'Endurance events',
  description:
    'Running and triathlon events Zach Waterfield has completed, from 5K races to a full Ironman, plus what is on the calendar next.',
  path: '/events',
});

export default function EventsPage() {
  const eventCategories = getEvents();
  const events = eventCategories.flatMap((category) => category.events);
  const completedEvents = events.filter((event) => event.status === 'completed').length;
  const upcomingEvents = events.filter((event) => event.status === 'upcoming').length;

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <JsonLd
        schema={graph(
          eventsSchema(eventCategories),
          breadcrumbSchema([
            { name: 'Zach Waterfield', path: '/' },
            { name: 'Endurance events', path: '/events' },
          ]),
        )}
      />
      <nav aria-label="Breadcrumb">
        <Link href="/" className="text-sm text-stone-500 transition-colors hover:text-stone-900">
          ← Zach Waterfield
        </Link>
      </nav>

      <header className="mt-12 mb-12">
        <h1 className="font-serif-post text-4xl font-medium tracking-tight text-stone-950">Endurance events</h1>
        {/* Spelled out rather than left as bare counts: a self-contained
            sentence survives being extracted away from its page. */}
        <p className="mt-3 text-stone-500">
          {completedEvents} running and triathlon events completed, across{' '}
          {eventCategories.length} distances from 5K to full Ironman
          {upcomingEvents > 0 && `, with ${upcomingEvents} more on the calendar`}.
        </p>
      </header>

      <div className="space-y-10">
        {eventCategories.map((category) => (
          <EventGroup key={category.category} category={category} />
        ))}
      </div>

      <footer className="mt-16 text-sm text-stone-500">
        <Link href="/" className="transition-colors hover:text-stone-900">Zach Waterfield</Link>
      </footer>
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
