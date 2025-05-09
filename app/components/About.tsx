'use client';

import { useEffect, useRef } from 'react';
import { Container } from './common/Container';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './common/Button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);
  const mainImageRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);

  const images = [
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHN17gLN6h9fZiv40LB5ghmUXGRlFw2rYzbnoq',
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHMJ92AMCNxJQRpGL8WBCPHYnyTAS19KkOlEoF',
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHGJXXNoLortTO4NwWEznjVKFe36yiMJIvHh5d',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headerRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set([mainImageRef.current, visionRef.current, missionRef.current], {
        opacity: 0,
        y: 50,
      });

      // Header animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
          gsap.to(descriptionRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Content animation
      ScrollTrigger.create({
        trigger: mainImageRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(mainImageRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          gsap.to(visionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
          });
          gsap.to(missionRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <Container>
        <div className="flex mb-8 flex-col md:flex-row items-center gap-x-10 justify-between">
          <div ref={headerRef} className="w-full grid md:block mb-10 md:mb-0">
            <p className="text-primary mb-2">About Us</p>
            <h2 className="text-4xl font-heading mb-4">
              Empower Your Community&apos;s Future Effortlessly
            </h2>

            <Button variant="primary" href="/about">
              Go to about page
            </Button>
          </div>

          <p ref={descriptionRef} className="text-gray-600 w-full md:max-w-md">
            Take control of your community&apos;s future with innovative strategies
            that ensure sustainability and growth. Our mission drives grassroots
            solutions for lasting impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div
              ref={mainImageRef}
              className="h-[40rem] md:h-full relative rounded-md overflow-hidden"
            >
              <Image
                src={images[2]}
                alt="Our Story"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />

              <div className="flex flex-col py-6 px-6 justify-center absolute bottom-3 m-3 md:m-8 bg-white z-10 rounded-md">
                <p className="text-gray-500 text-sm md:text-base">
                  We have actively engaged with local chiefs and community
                  leaders to advocate for women participation in environmental
                  sustainability activities such as tree planting and organized
                  grassroots campaigns on the importance of community members to
                  actively participate in protecting the rights of women and
                  girls.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <article
              ref={visionRef}
              className="relative border border-gray-200 rounded-md min-h-[25rem] overflow-hidden"
            >
              <Image
                src={'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfH1ScTktQ6ji0y94eYM1UncBGIXuxgQER2aHf3'}
                alt="Our Vision"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />

              <div className="flex flex-col p-5 md:p-8 justify-center absolute bottom-3 bg-white z-10 rounded-md m-3 md:m-8">
                <h3 className="text-xl md:text-3xl font-heading mb-4">
                  Vision Statement
                </h3>
                <p className="text-gray-500 text-sm md:text-base">
                  A just and inclusive Africa where youth, women, and girls lead
                  transformative change, thrive in dignity, and shape resilient,
                  equitable communities.
                </p>
              </div>
            </article>

            <article
              ref={missionRef}
              className="relative border border-gray-200 rounded-md min-h-[25rem] overflow-hidden"
            >
              <Image
                src={'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHWorhOCsSkE4dQWDHLMAaVcjF7GBsNiC30X5p'}
                alt="Our Mission"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />

              <div className="flex flex-col p-5 md:p-8 justify-center absolute bottom-3 bg-white z-10 rounded-md m-3 md:m-8">
                <h3 className="text-xl md:text-3xl font-heading mb-4">
                  Mission Statement
                </h3>
                <p className="text-gray-500 text-sm md:text-base">
                  To empower youth, women, and girls through advocacy,
                  leadership development, and grassroots action—promoting gender
                  equality, climate justice, and strong institutions for
                  sustainable development across Africa.
                </p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
