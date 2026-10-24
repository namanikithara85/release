import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { CtaBand } from '@/components/CtaBand';
import { images } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';

export function AboutPage() {
  useSeo({
    title: 'About Release Tours — Our Philosophy',
    description:
      'Release Tours is built around a simple idea: a journey can mean more when you have the space to participate, connect, and experience a destination with intention.',
    path: '/about',
    image: images.about.src,
  });

  return (
    <>
      {/* Hero band */}
      <section className="relative flex min-h-[55svh] items-end overflow-hidden bg-forest pt-24">
        <div className="absolute inset-0">
          <img
            src={images.about.src}
            alt={images.about.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/35 to-forest/85" />
        </div>
        <div className="relative z-10 container-section w-full pb-16">
          <Reveal>
            <p className="eyebrow text-sand">Our philosophy</p>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-ivory text-balance">
              Created around the experience, not just the itinerary.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <Reveal className="mx-auto max-w-prose-wide">
            <p className="text-lead text-charcoal/85 text-pretty">
              Release Tours is built around a simple idea: a journey can mean more when
              you have the space to participate, connect, and experience a destination
              with intention.
            </p>
            <p className="mt-6 text-charcoal/80 text-pretty">
              We bring together Sri Lanka&rsquo;s landscapes, cultural expression,
              movement, community, and shared moments to create a journey that goes
              beyond simply moving from place to place. Our approach is thoughtful and
              human. We want you to be part of the experience, present for the moment,
              and able to take home memories that remind you how the journey felt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Three pillars of approach */}
      <section className="bg-sage/40 py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              Three ideas that shape every journey.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {[
              {
                num: '01',
                title: 'Participation over sightseeing',
                copy: 'We design experiences that invite you to move, make, share, and take part — not just observe from a distance.',
              },
              {
                num: '02',
                title: 'Presence over distraction',
                copy: 'During selected experiences, we ask guests to put their phones away. Our team captures the moments so you can stay in them.',
              },
              {
                num: '03',
                title: 'Connection over checklist',
                copy: 'The journey is shaped around meaningful encounters with people, culture, and place — not a list of attractions to tick off.',
              },
            ].map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-3xl text-terracotta-400/60">
                    {item.num}
                  </span>
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                </div>
                <p className="mt-4 text-charcoal/75 text-pretty">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience album emphasis */}
      <section className="bg-forest py-24 text-ivory sm:py-32 lg:py-40">
        <div className="container-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src={images.bePresent.album.src}
                  alt={images.bePresent.album.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={120}>
              <p className="eyebrow text-sand">The experience album</p>
              <h2 className="mt-6 font-serif text-display-sm text-ivory text-balance">
                Be present. We&rsquo;ll capture the memories.
              </h2>
              <p className="mt-6 max-w-prose-wide text-lead text-ivory/80 text-pretty">
                During designated experiences, guests put their personal phones away
                and take part fully. Our team documents appropriate moments so you can
                stay immersed instead of trying to capture everything yourself.
              </p>
              <p className="mt-4 max-w-prose-wide text-ivory/70 text-pretty">
                At the end of the journey, you receive a curated Release Tours
                experience album — a meaningful keepsake from the people, places, and
                moments that made the journey yours.
              </p>
              <Link
                to="/journey"
                className="mt-8 inline-flex items-center gap-2 link-underline text-sand font-medium"
              >
                Explore the seven-day journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team placeholder — honest, no fabricated bios */}
      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <Reveal className="mx-auto max-w-prose-wide text-center">
            <p className="eyebrow">The people behind Release Tours</p>
            <h2 className="mt-6 font-serif text-h1 text-balance">
              A team that cares about how the journey feels.
            </h2>
            <p className="mt-6 text-charcoal/70 text-pretty">
              The people who guide, host, and capture each journey are central to the
              Release Tours experience. We&rsquo;ll be sharing more about our team here
              soon.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        headline={siteConfig.ctas.discoverExperience}
        copy="Curious about the journey? Tell us a little about your plans and we'll help you explore the experience, the available dates, and the practical details."
        primaryLabel={siteConfig.ctas.enquiry}
      />
    </>
  );
}
