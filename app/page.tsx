import Hero from '@/app/components/Hero';
import Metrics from '@/app/components/Metrics';
import ThematicAreas from '@/app/components/ThematicAreas';
import About from '@/app/components/About';
import Volunteer from '@/app/components/Volunteer';
import CTA from './components/CTA';
import News from './components/News';
import Events from './components/Events';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ThematicAreas />
      <Volunteer />
      <News />
      <Metrics />
      <Events />
      <CTA />
    </>
  );
}
