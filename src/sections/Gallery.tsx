import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';

export function Gallery() {
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">People and place</p>
          <h2 className="mt-6 font-serif text-display-sm text-balance">
            Discover more than a destination.
          </h2>
          <p className="mt-6 max-w-prose-wide text-lead text-charcoal/80 text-pretty">
            Sri Lanka is not just a place to see. It is a place to experience — through
            its landscapes, cultural traditions, everyday life, and the people who make
            each encounter meaningful.
          </p>
        </Reveal>

        {/* Editorial gallery — varied proportions */}
        <div className="mt-16 grid gap-4 sm:gap-5 lg:mt-20 lg:grid-cols-12">
          {images.gallery.map((item, i) => {
            // Vary aspect ratios and spans for editorial rhythm
            const layouts = [
              'lg:col-span-7 aspect-[16/11]',
              'lg:col-span-5 aspect-[4/5]',
              'lg:col-span-4 aspect-[4/5]',
              'lg:col-span-5 aspect-[16/11]',
              'lg:col-span-3 aspect-[4/5] lg:mt-12',
              'lg:col-span-7 aspect-[16/10] lg:-mt-8',
            ];
            const layout = layouts[i % layouts.length];

            return (
              <Reveal
                key={item.src}
                className={layout}
                delay={i * 70}
                as="figure"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <figcaption className="absolute bottom-5 left-5 translate-y-2 text-sm font-medium text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </figcaption>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
