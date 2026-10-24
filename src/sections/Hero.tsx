import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { images } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-forest">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.hero.src}
          alt={images.hero.alt}
          className="h-full w-full object-cover animate-slow-zoom"
          fetchPriority="high"
        />
        {/* Gradient overlays for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/30 to-forest/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] items-end pb-20 pt-32 sm:pb-24 lg:items-center lg:pb-28">
        <div className="container-section w-full">
          <div className="max-w-3xl">
            <p
              className="eyebrow text-sand opacity-0 [animation:fade-in_1.2s_ease_0.2s_forwards]"
            >
              Seven days in Sri Lanka
            </p>
            <h1
              className="mt-6 font-serif text-display text-ivory text-balance opacity-0 [animation:fade-up_1.1s_cubic-bezier(0.22,1,0.36,1)_0.4s_forwards]"
            >
              {siteConfig.hero.headline}
            </h1>
            <p
              className="mt-8 max-w-prose-wide text-lead text-ivory/85 text-pretty opacity-0 [animation:fade-up_1.1s_cubic-bezier(0.22,1,0.36,1)_0.7s_forwards]"
            >
              {siteConfig.hero.subheadline}
            </p>
            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center opacity-0 [animation:fade-up_1.1s_cubic-bezier(0.22,1,0.36,1)_0.9s_forwards]"
            >
              <Link to="/journey" className="btn btn-primary bg-sand !text-forest hover:!bg-sand-300">
                {siteConfig.ctas.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <Calendar className="h-4 w-4" />
                {siteConfig.ctas.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/50 lg:flex">
        <span className="text-eyebrow uppercase tracking-wider-2">Scroll</span>
        <span className="h-12 w-px animate-pulse bg-ivory/30" />
      </div>
    </section>
  );
}
