import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';

export function Manifesto() {
  return (
    <section id="philosophy" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The philosophy</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              Travel is more than the places you see.
            </h2>
            <div className="mt-8 max-w-prose-wide space-y-5 text-lead text-charcoal/80 text-pretty">
              <p>
                It is the moments when you stop rushing. The rhythm of a movement you
                have never tried. The warmth of a conversation. The unfamiliar taste of
                something shared. The quiet beauty of a landscape that asks you to slow
                down.
              </p>
              <p>
                Release Tours invites you to experience Sri Lanka with curiosity,
                openness, and a little more space to be{' '}
                <em className="font-serif text-forest">present</em>.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={images.manifesto.src}
                alt={images.manifesto.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
