import { useSeo } from '@/lib/useSeo';
import { Hero } from '@/sections/Hero';
import { Manifesto } from '@/sections/Manifesto';
import { Pillars } from '@/sections/Pillars';
import { JourneyPreview } from '@/sections/JourneyPreview';
import { BePresent } from '@/sections/BePresent';
import { Gallery } from '@/sections/Gallery';
import { WhoFor } from '@/sections/WhoFor';
import { AboutPreview } from '@/sections/AboutPreview';
import { PracticalInfo } from '@/sections/PracticalInfo';
import { FaqSection } from '@/sections/FaqSection';
import { CtaBand } from '@/components/CtaBand';
import { EnquiryFormSection } from '@/sections/EnquiryFormSection';

export function HomePage() {
  useSeo({
    title: 'Release Tours — Seven days to experience Sri Lanka more deeply',
    description:
      'Immersive seven-day journeys through Sri Lankan culture, nature, movement, and community. Be present for the experience. Take the memories home.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <JourneyPreview />
      <BePresent />
      <Gallery />
      <WhoFor />
      <AboutPreview />
      <PracticalInfo />
      <FaqSection />
      <EnquiryFormSection />
      <CtaBand />
    </>
  );
}
