'use client';

import { useEffect, useRef } from 'react';
import { Container } from './common/Container';
import Image from 'next/image';
import Button from './common/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Volunteer = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([contentRef.current, imageRef.current], {
        opacity: 0,
        y: 50,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          gsap.to(imageRef.current, {
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
      className="border-t border-gray-100 py-20 bg-white"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-x-20 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <div className="w-full grid">
              <h2 className="text-4xl md:text-5xl font-heading mb-4">
                Join Us in Making a Difference
              </h2>
              <p className="text-gray-600 mb-8">
                Your skills and passion can help transform communities. Join our
                volunteer program and be part of creating lasting positive
                change in Africa. Together, we can build a more sustainable and
                equitable future.
              </p>
              <Button href="/join" variant="primary-alt" size="lg">
                Become a Volunteer
              </Button>
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative h-[400px] md:h-[500px] rounded-md overflow-hidden border border-gray-100"
          >
            <Image
              src="https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHzwF9A53V0ELAITsBhF1Jqe7YgcXP46HlrndW"
              alt="Volunteer with AYDii Africa"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Volunteer;
