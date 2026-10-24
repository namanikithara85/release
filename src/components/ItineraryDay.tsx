import { useState, useId } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import type { ItineraryDay as ItineraryDayType } from '@/data/itinerary';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';

interface ItineraryDayProps {
  data: ItineraryDayType;
  defaultOpen?: boolean;
}

export function ItineraryDay({ data, defaultOpen = false }: ItineraryDayProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <article className="grid gap-0 md:grid-cols-12 md:gap-10">
      {/* Image */}
      <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[4/3]">
          <img
            src={data.image.src}
            alt={data.image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {data.confirmed && (
            <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1.5 text-xs font-medium uppercase tracking-wider-2 text-ivory backdrop-blur-sm">
              Confirmed experience
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 md:col-span-7 md:mt-0">
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-5xl text-terracotta-400/70">
            {String(data.day).padStart(2, '0')}
          </span>
          <span className="eyebrow">Day {data.day}</span>
        </div>

        <h3 className="mt-4 font-serif text-3xl sm:text-4xl">{data.title}</h3>

        {data.headline && (
          <p className="mt-4 font-serif text-xl italic text-charcoal/70">
            {data.headline}
          </p>
        )}

        <p className="mt-5 text-lead text-charcoal/80">{data.intro}</p>

        {/* Expandable details */}
        <div className="mt-6">
          <button
            id={buttonId}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors hover:text-forest-700"
          >
            {open ? 'Hide details' : 'Read more about this day'}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            hidden={!open}
            className="mt-5 overflow-hidden"
          >
            <p className="text-charcoal/75 leading-relaxed">{data.description}</p>

            {data.topics.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {data.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full bg-sage/60 px-3.5 py-1.5 text-sm text-forest"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex items-center gap-2 text-sm text-charcoal/60">
              <MapPin className="h-4 w-4" />
              <span>
                {data.location || 'Location to be confirmed'}
                {!data.confirmed && ' — details available on enquiry'}
              </span>
            </div>

            {!data.confirmed && (
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 link-underline text-sm font-medium text-terracotta-500"
              >
                {siteConfig.ctas.fullItinerary}
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
