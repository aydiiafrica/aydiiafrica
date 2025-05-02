import Button from './common/Button';
import { Container } from './common/Container';

const Hero = () => {
  const renderImage = (img: string[], rotate: string) => {
    return (
      <figure
        className={`absolute bg-primary-100 group rounded-xl ${rotate} h-full overflow-hidden w-[10rem] md:w-[20rem]`}
      >
        <img
          src={`${img[0]}`}
          srcSet={`
        ${img[2]} 400w,
        ${img[1]} 800w,
        ${img[0]} 1200w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
          alt="AYDii Africa grassroots climate action project"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      </figure>
    );
  };

  return (
    <header className="min-h-svh bg-primary text-white flex flex-col items-center justify-center">
      <Container>
        <article className="pt-10 pb-20 flex flex-col items-center justify-center text-center w-full">
          <h1 className="text-3xl leading-10 md:leading-14 md:text-5xl lg:text-5xl font-light mb-5 font-heading max-w-[30ch]">
            Empowering <strong>Women</strong>, <strong>Youth</strong>, and{' '}
            <strong>Communities</strong> for Climate Justice and Sustainable
            Development in Africa
          </h1>

          <div className="mt-10 relative pt-10 max-w-3xl mx-auto grid grid-cols-[25fr_50fr_25fr] md:grid-cols-3 h-[15rem] md:h-[25rem] md:overflow-visible place-items-center">
            {renderImage(
              [
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHN17gLN6h9fZiv40LB5ghmUXGRlFw2rYzbnoq',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfH7cvgRo2c4gRx5vZT8DFPj0EU1A9Hz7Iqk6Jm',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHSi4NbkggbI2DoRltXGnma07fU6yjOH49zcrB',
              ],
              'rotate-10 md:rotate-14 left-0'
            )}
            {renderImage(
              [
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHMJ92AMCNxJQRpGL8WBCPHYnyTAS19KkOlEoF',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHBYUL2UI5CxXy4FagDIKmAZ6c8uLbO1UPnpRr',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHOnKz8olhpba62GIlE5FQNstLuPq8yV3wzJfm',
              ],
              'z-10 -mt-10 md:-mt-12'
            )}
            {renderImage(
              [
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHGJXXNoLortTO4NwWEznjVKFe36yiMJIvHh5d',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHhvw3B6ATbltfqGaIYiPWQuCmA5jh1VvJSwE8',
                'https://u88ydg7fy0.ufs.sh/f/0b2i4G6p5pfHOp0yUKDlhpba62GIlE5FQNstLuPq8yV3wzJf',
              ],
              '-rotate-10 md:-rotate-14 right-0'
            )}
          </div>

          <article className="mt-16 text-center max-w-xl mx-auto">
            <p className="text-md">
              AYDii Africa partners with local leaders and vulnerable
              communities to drive grassroots solutions for climate resilience,
              equity, and peace.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button href="/join" variant={'secondary-alt'} size="lg">
                Become a Volunteer
              </Button>
              <Button href="/donate" variant={'white'} size="lg">
                <span>View Causes</span>
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
                  className="lucide lucide-move-right-icon lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </Button>
            </div>
          </article>
        </article>
      </Container>
    </header>
  );
};

export default Hero;
