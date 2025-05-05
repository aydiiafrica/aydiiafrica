'use client';

import Button from './common/Button';
import { Container } from './common/Container';
import Image from 'next/image';

const CTA = () => {
  return (
    <Container>
      <section className="min-h-[20rem] md:min-h-[30rem] grid place-items-center rounded-md my-20 p-5 relative overflow-hidden">
        <Image
          src="https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHS4EJ0SggbI2DoRltXGnma07fU6yjOH49zcrB"
          fill
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <article className="w-full h-full absolute top-0 left-0 z-10 flex flex-col justify-center bg-primary/80 text-white items-center text-center gap-10">
          <h3 className="text-4xl md:text-5xl max-w-[20ch]">
            Your Support Drives Our Global Impact
          </h3>

          <Button href="/donate" variant={'white-alt'} size="lg">
            <span>Donate Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hand-heart-icon lucide-hand-heart"
            >
              <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
              <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
              <path d="m2 15 6 6" />
              <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
            </svg>
          </Button>
        </article>
      </section>
    </Container>
  );
};

export default CTA;
