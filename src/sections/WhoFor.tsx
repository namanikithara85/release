import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';

const REASONS = [
  'Go beyond conventional sightseeing.',
  'Participate in cultural experiences.',
  'Explore movement and creative expression.',
  'Connect respectfully with local people and places.',
  'Spend time in nature and experience a different pace of travel.',
  'Bring home memories of genuine moments rather than only photographs of attractions.',
];

export function WhoFor() {
  return (
    <section className="bg-sage/40 py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={images.whoFor.src}
                alt={images.whoFor.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <p className="eyebrow">Who this journey is for</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              For travellers who want to experience more.
            </h2>
            <p className="mt-6 max-w-prose-wide text-lead text-charcoal/80 text-pretty">
              Release Tours is designed for curious travellers who want to participate
              in a destination rather than simply visit it. If any of these resonate,
              this journey may be for you.
            </p>

            <ul className="mt-8 space-y-4">
              {REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta-400"
                    aria-hidden="true"
                  />
                  <span className="text-charcoal/80 text-pretty">{reason}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-prose-wide text-charcoal/60 text-pretty">
              You don&rsquo;t need a particular fitness level, age, relationship status,
              nationality, or previous experience to be welcome. If you have questions
              about whether the journey is right for you, we&rsquo;re happy to talk.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
