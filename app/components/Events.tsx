/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import { useEffect, useRef, useState } from 'react';
import { Container } from './common/Container';
import { EventCard } from './common/EventCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client, Event, urlFor } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const query = `*[_type == "event"] | order(date desc) [0...3] {
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, cardsRef.current], {
        opacity: 0,
        y: 50,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 border-y border-gray-100 bg-white"
    >
      <Container>
        <div ref={headingRef} className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">Recent Events</h2>
          <p className="text-gray-500 font-light">
            Explore our community events that are making a positive impact
            across Africa.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              images={event.gallery.map((image: any) => urlFor(image).url())}
              slug={event.slug.current}
              date={event.date}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Events;
