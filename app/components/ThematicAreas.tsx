'use client';

import Link from 'next/link';
import { cn } from '../lib/cn';
import { Container } from './common/Container';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SDGItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  slug: string;
  p: string;
  heading: string;
}

const sdgItems: SDGItem[] = [
  {
    id: 13,
    title: 'Climate Action',
    slug: 'climate-action',
    subtitle: 'Take urgent action to combat climate change and its impacts',
    description:
      'We raise awareness on climate-related loss and damage affecting vulnerable communities, especially women and girls. Our advocacy promotes climate justice by supporting local voices in policy dialogues and community-based responses to floods, droughts, displacement, and environmental degradation.',
    image: '/sdg/sdg13.png',
    color: 'border-green-500  transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-green-900',
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    slug: 'peace-justice-strong-institutions',
    subtitle:
      'Promote peaceful and inclusive societies, provide access to justice, and build effective, accountable institutions',
    description:
      "AYDII Africa works to strengthen youth and women's participation in governance and peacebuilding. From anti-trafficking campaigns to human rights education and institutional accountability, we help create just, inclusive communities with strong civic voices.",
    image: '/sdg/sdg16.png',
    color: 'border-blue-500 transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-blue-900',
  },
  {
    id: 5,
    title: 'Gender Equality',
    slug: 'gender-equality',
    subtitle: 'Achieve gender equality and empower all women and girls',
    description:
      'Gender equity is at the heart of all our programs. We empower women and girls through education, menstrual health advocacy, economic inclusion, and leadership development, ensuring they are active agents of change in their communities.',
    image: '/sdg/sdg5.png',
    color: 'border-red-500 transition-all duration-200',
    p: 'text-gray-500',
    heading: 'text-red-900',
  },
];

const ThematicAreas = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headingRef.current, ...cardsRef.current], {
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
            stagger: 0.2,
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
      className="py-20 bg-white border-t border-gray-200"
    >
      <Container>
        <div ref={headingRef} className="mb-16">
          <h2 className="text-4xl font-heading mb-4 max-w-[25ch]">
            Our Commitment to the Sustainable Development Goals (SDGs)
          </h2>
          <p className="text-gray-500 max-w-[80ch]">
            We are proud to align our advocacy and programs with the United
            Nations Sustainable Development Goals (SDGs), focusing on the
            following three global priorities:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          {sdgItems.map((sdg, index) => (
            <Link
              ref={(el) => {
                if (el) {
                  cardsRef.current[index] = el;
                }
              }}
              passHref
              href={`/${sdg.slug}`}
              key={sdg.id}
              className={cn(
                'relative space-y-4 border rounded-md p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-y-4 gap-x-10',
                sdg.color
              )}
            >
              <article className="space-y-4">
                <h3
                  className={cn(
                    'text-3xl md:text-4xl font-light max-w-[15ch]',
                    sdg.heading
                  )}
                >
                  {sdg.title}
                </h3>
                <p
                  className={cn(
                    'text-gray-500 text-md font-light max-w-[50ch]',
                    sdg.p
                  )}
                >
                  {sdg.description}
                </p>

                <p
                  className={cn(
                    'border rounded-md p-5 py-3 justify-center text-sm mt-10 flex items-center transition-all duration-200 hover:gap-8 gap-4 w-full md:w-[max-content]',
                    sdg.heading
                  )}
                >
                  <span>See Projects</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-right-icon lucide-move-right"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </p>
              </article>

              <div className="relative h-40 md:h-auto w-40 md:w-full rounded-md overflow-hidden">
                <Image
                  src={sdg.image}
                  alt={`SDG ${sdg.id} - ${sdg.title}`}
                  fill
                  style={{
                    objectFit: 'contain',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ThematicAreas;
