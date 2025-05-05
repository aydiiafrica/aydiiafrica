'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from './common/Container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client } from '../lib/sanity';
import CountUp from 'react-countup';

gsap.registerPlugin(ScrollTrigger);

interface MetricsData {
  projectsCompleted: number;
  peopleImpacted: number;
  communitiesReached: number;
}

const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const query = `*[_type == "metrics"][0] {
        projectsCompleted,
        peopleImpacted,
        communitiesReached
      }`;
      const result = await client.fetch(query);
      setMetrics(result);
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([imageRef.current, contentRef.current, metricsRef.current], {
        opacity: 0,
        y: 50,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center+=100',
        onEnter: () => {
          gsap.to(imageRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          });
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
          });
          gsap.to(metricsRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="">
      <Container>
        <div className="py-20 grid gap-10 grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-2 place-items-center">
          <div
            ref={imageRef}
            className="overflow-hidden h-[20rem] md:h-[30rem] w-full rounded-md"
          >
            <img
              src={`https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHOpHe9IClhpba62GIlE5FQNstLuPq8yV3wzJf`}
              alt="AYDii Africa grassroots climate action project"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-10">
            <article ref={contentRef} className="space-y-6">
              <h3 className="text-4xl font-normal">
                Drive grassroots solutions for climate resilience, equity, and
                peace.
              </h3>
              <p className="text-md font-normal text-gray-500">
                AYDii Africa partners with local leaders and vulnerable
                communities to drive grassroots solutions for climate
                resilience, equity, and peace.
              </p>
            </article>

            <div
              ref={metricsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-10"
            >
              <article className="text-primary rounded-xl font-light text-md flex flex-col items-center md:items-start gap-2">
                <span className="text-5xl font-mono">
                  <CountUp
                    end={metrics?.projectsCompleted || 0}
                    duration={2.5}
                    separator=","
                    // enableScrollSpy={true}
                    // scrollSpyOnce={true}
                  />
                </span>
                <span className="text-primary-100">Projects Completed</span>
              </article>
              <article className="text-secondary rounded-xl font-light text-md flex flex-col items-center gap-2">
                <span className="text-5xl font-mono">
                  <CountUp
                    end={metrics?.peopleImpacted || 0}
                    duration={2.5}
                    separator=","
                    // enableScrollSpy={true}
                    // scrollSpyOnce={true}
                  />
                </span>
                <p className="text-secondary">People Impacted</p>
              </article>
              <article className="text-primary-200 rounded-xl font-light text-md flex flex-col items-center gap-2">
                <span className="text-5xl font-mono">
                  <CountUp
                    end={metrics?.communitiesReached || 0}
                    duration={2.5}
                    separator=","
                    // enableScrollSpy={true}
                    // scrollSpyOnce={true}
                  />
                </span>
                <p className="text-primary-100">Communities Reached</p>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Metrics;
