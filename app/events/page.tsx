/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/app/components/common/Container';
import { EventCard } from '@/app/components/common/EventCard';
import { client, Event, urlFor } from '@/app/lib/sanity';

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(date desc) {
        _id,
        title,
        slug,
        description,
        gallery,
        date
      }`;
      const result = await client.fetch(query);
      setEvents(result);
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading mb-6">Our Events</h1>
          <p className="text-gray-500">
            Join us in making a difference across Africa through our community
            events and initiatives.
          </p>
        </div>

        <div className="mb-12 max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              images={event.gallery.map((image: any) => urlFor(image).url())}
              slug={event.slug.current}
              date={event.date}
            />
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No events found matching your search.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
