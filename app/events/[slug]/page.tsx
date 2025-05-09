/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/app/components/common/Container';
import { client, Event } from '@/app/lib/sanity';
import { use } from 'react';

import { Gallery } from '@/app/components/common/Gallery';

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "event" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          gallery,
          date,
          content
        }`;
        const result = await client.fetch(query, { slug });
        setEvent(result);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  return (
    <article className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl font-heading mb-6">
              {event.title}
            </h1>
            <p className="text-gray-500 mb-8">{event.description}</p>
            <time className="text-sm text-gray-400">
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </time>
          </div>

          {event.gallery && event.gallery.length > 0 && (
            
              <Gallery media={event.gallery} title={''} />
            
          )}
        </div>
      </Container>
    </article>
  );
}
