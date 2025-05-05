'use client';

import Button from './common/Button';
import { Container } from './common/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Hero = () => {
  const images = [
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHOpHe9IClhpba62GIlE5FQNstLuPq8yV3wzJf',
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHThrwJkONQtxwHrPDjdo2pKUuhaRI0VWC83Sq',
    'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHGJXXNoLortTO4NwWEznjVKFe36yiMJIvHh5d',
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
  };

  return (
    <header className="min-h-[40rem] bg-primary text-white flex flex-col items-center justify-center">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-y-10 gap-x-16 py-10 pb-20 ">
          <article className="flex flex-col items-start justify-start text-left w-full">
            <h1 className="mb-8 text-3xl leading-10 md:leading-14 md:text-5xl lg:text-5xl font-heading max-w-[30ch]">
              To Empowering Women, Youth, and Communities for Sustainable
              Development in Africa
            </h1>

            <article className="text-left mb-4">
              <p className="text-md">
                AYDii Africa partners with local leaders and vulnerable
                communities to drive grassroots solutions for climate
                resilience, equity, and peace.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </article>
          </article>

          <div className="w-full overflow-hidden">
            <Slider {...sliderSettings}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-[20rem] md:h-[30rem] overflow-hidden rounded-xl"
                >
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Hero;
