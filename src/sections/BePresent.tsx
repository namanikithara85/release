import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';

const STEPS = [
  {
    num: '01',
    title: 'Put distractions aside',
    copy: 'During designated experiences, Release Tours asks guests to put their personal phones away and take part fully.',
    image: images.bePresent.participation,
  },
  {
    num: '02',
    title: 'Experience the moment',
    copy: 'Stay immersed in the experience instead of trying to capture everything yourself. Be present for the people, the place, and the moment.',
    image: images.bePresent.candid,
  },
  {
    num: '03',
    title: 'Take home the memories',
    copy: 'At the end of the journey, receive a curated Release Tours experience album — a collection of memories from the people, places, and moments that made the journey yours.',
    image: images.bePresent.album,
  },
];

export function BePresent() {
  return (
    <section id="experience" className="relative overflow-hidden bg-forest py-24 text-ivory sm:py-32 lg:py-40">
      <div className="container-section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-sand">The experience album</p>
          <h2 className="mt-6 font-serif text-display-sm text-ivory text-balance">
            Be present. We&rsquo;ll capture the memories.
          </h2>
          <p className="mt-6 max-w-prose-wide text-lead text-ivory/80 text-pretty">
            Some moments are best experienced without a screen between you and the
            world. During our designated experiences, Release Tours asks guests to put
            their personal phones away and take part fully. Our team documents
            appropriate moments so you can stay immersed in the experience instead of
            trying to capture everything yourself.
          </p>
          <p className="mt-4 max-w-prose-wide text-lead text-ivory/80 text-pretty">
            At the end of the journey, you&rsquo;ll receive a curated Release Tours
            experience album — a collection of memories from the people, places, and
            moments that made the journey yours.
          </p>
        </Reveal>

        {/* Three-step visual sequence */}
        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 120}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <img
                    src={step.image.src}
                    alt={step.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
                  <span className="absolute left-5 top-5 font-serif text-4xl text-sand/90">
                    {step.num}
                  </span>
                </div>
                <figcaption className="mt-5">
                  <h3 className="font-serif text-2xl text-ivory">{step.title}</h3>
                  <p className="mt-3 text-ivory/70 text-pretty">{step.copy}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 rounded-2xl border border-ivory/15 bg-ivory/5 p-6 sm:p-8" delay={100}>
          <p className="text-sm text-ivory/60">
            This phone-away approach is a deliberate part of designated experiences
            only — not the entire journey. Photography is welcome at other times. The
            experience album is provided at the end of the tour; further details are
            available on enquiry.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
