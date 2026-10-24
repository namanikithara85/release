import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';

const PILLARS = [
  {
    num: '01',
    title: 'Living Culture',
    copy: 'Meet Sri Lanka through its living traditions, everyday culture, creative practices, and the people who give each place its character.',
    image: images.pillars.culture,
  },
  {
    num: '02',
    title: 'Movement and Discovery',
    copy: 'Explore experiences that invite you to move, participate, listen, observe, and discover new ways of engaging with the world around you.',
    image: images.pillars.movement,
  },
  {
    num: '03',
    title: 'Community and Connection',
    copy: 'Make space for shared moments, meaningful encounters, and a deeper appreciation of the people and communities you meet.',
    image: images.pillars.community,
  },
  {
    num: '04',
    title: 'Memories Without Distraction',
    copy: 'During selected experiences, put your personal phone away and give the moment your full attention. Our team captures appropriate memories and creates an experience album for you to receive at the end of the journey.',
    image: images.pillars.memories,
  },
];

export function Pillars() {
  return (
    <section className="bg-sage/40 py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What makes Release Tours different</p>
          <h2 className="mt-6 font-serif text-display-sm text-balance">
            Four ways to meet a place more deeply.
          </h2>
        </Reveal>

        {/* Editorial asymmetric layout */}
        <div className="mt-16 grid gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12">
          {PILLARS.map((pillar, i) => {
            // Vary the column span and offset for editorial rhythm
            const colSpan = i % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5';
            const offset = i === 1 ? 'lg:mt-24' : i === 3 ? 'lg:mt-24' : '';

            return (
              <Reveal
                key={pillar.num}
                className={`${colSpan} ${offset}`}
                delay={i * 80}
              >
                <article className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    <img
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="font-serif text-3xl text-terracotta-400/60">
                      {pillar.num}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl">{pillar.title}</h3>
                  </div>
                  <p className="mt-4 max-w-prose-wide text-charcoal/75 text-pretty">
                    {pillar.copy}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
