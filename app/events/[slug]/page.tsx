/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/app/components/common/Container';
import { client, Event, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import Slider from 'react-slick';
import { use } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 text-gray-600 leading-relaxed">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-heading mb-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-heading mb-6 mt-12">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-heading mb-4 mt-8">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-heading mb-4 mt-6">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
  },
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <img
            src={urlFor(value).url()}
            alt={value.alt || ''}
            className="w-full"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    adaptiveHeight: true,
    fade: true,
  };

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
          <div className="mb-12">
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
            <div className="mb-12">
              <div className="aspect-[16/10] relative">
                <Slider {...sliderSettings}>
                  {event.gallery.map((image: any, index: number) => (
                    <div key={index} className="outline-none h-[30rem] rounded-md overflow-hidden">
                      <img
                        src={urlFor(image).url()}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {event.content && (
              <PortableText value={event.content} components={components} />
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
