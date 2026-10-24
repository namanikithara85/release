import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { ItineraryDay } from '@/components/ItineraryDay';
import { CtaBand } from '@/components/CtaBand';
import { PracticalInfo } from '@/sections/PracticalInfo';
import { itinerary } from '@/data/itinerary';
import { images } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';

export function JourneyPage() {
  useSeo({
    title: 'The 7-Day Journey — Release Tours',
    description:
      'A day-by-day look at the seven-day Release Tours journey through Sri Lankan culture, nature, movement, and community. Day 2 features the Inner Wellbeing & Community Night.',
    path: '/journey',
    image: images.journey.day2.src,
  });

  return (
    <>
      {/* Hero band */}
      <section className="relative flex min-h-[60svh] items-end overflow-hidden bg-forest pt-24">
        <div className="absolute inset-0">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/85" />
        </div>
        <div className="relative z-10 container-section w-full pb-16">
          <Reveal>
            <p className="eyebrow text-sand">The journey</p>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-ivory text-balance">
              Seven days. A different way to experience Sri Lanka.
            </h1>
            <p className="mt-6 max-w-prose-wide text-lead text-ivory/85 text-pretty">
              Each day is an opportunity to discover another layer of the island —
              through culture, landscape, movement, and shared experiences.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Day-by-day itinerary */}
      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <div className="space-y-20 lg:space-y-28">
            {itinerary.map((day, i) => (
              <Reveal key={day.day} delay={i * 50}>
                <ItineraryDay data={day} defaultOpen={day.confirmed} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 flex flex-col items-start gap-5 rounded-3xl bg-sage/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl">
                Want the complete confirmed schedule?
              </h2>
              <p className="mt-2 max-w-xl text-charcoal/70">
                Some daily details are still being finalised. Enquire to receive the
                full itinerary as it becomes available.
              </p>
            </div>
            <Link to="/contact" className="btn btn-outline shrink-0">
              {siteConfig.ctas.fullItinerary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Practical info */}
      <PracticalInfo />

      {/* CTA */}
      <CtaBand
        headline="Ready to explore the dates?"
        copy="Tell us a little about your plans and we'll help you explore the experience, the available dates, and the practical details."
      />

      {/* Back link */}
      <div className="bg-forest py-10">
        <div className="container-section">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
