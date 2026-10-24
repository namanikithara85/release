import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ItineraryDay } from '@/components/ItineraryDay';
import { itinerary } from '@/data/itinerary';
import { siteConfig } from '@/data/siteConfig';

export function JourneyPreview() {
  return (
    <section id="journey" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">The seven-day journey</p>
          <h2 className="mt-6 font-serif text-display-sm text-balance">
            Seven days. A different way to experience Sri Lanka.
          </h2>
          <p className="mt-6 max-w-prose-wide text-lead text-charcoal/80 text-pretty">
            Each day is an opportunity to discover another layer of the island —
            through culture, landscape, movement, and shared experiences.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {itinerary.map((day, i) => (
            <Reveal key={day.day} delay={i * 60}>
              <ItineraryDay data={day} defaultOpen={day.confirmed} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col items-start gap-5 rounded-3xl bg-sage/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl">
              Want the complete confirmed schedule?
            </h3>
            <p className="mt-2 max-w-xl text-charcoal/70">
              Some daily details are still being finalised. Enquire to receive the full
              itinerary as it becomes available.
            </p>
          </div>
          <Link to="/contact" className="btn btn-outline shrink-0">
            {siteConfig.ctas.fullItinerary}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
