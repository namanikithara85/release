import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { images } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';

export function AboutPreview() {
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">About Release Tours</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              Created around the experience, not just the itinerary.
            </h2>
            <div className="mt-8 max-w-prose-wide space-y-5 text-lead text-charcoal/80 text-pretty">
              <p>
                Release Tours is built around a simple idea: a journey can mean more
                when you have the space to participate, connect, and experience a
                destination with intention.
              </p>
              <p>
                We bring together Sri Lanka&rsquo;s landscapes, cultural expression,
                movement, community, and shared moments to create a journey that goes
                beyond simply moving from place to place.
              </p>
              <p>
                Our approach is thoughtful and human. We want you to be part of the
                experience, present for the moment, and able to take home memories that
                remind you how the journey felt.
              </p>
            </div>
            <Link to="/about" className="mt-10 inline-flex btn btn-outline">
              {siteConfig.ctas.discoverExperience}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={150}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src={images.about.src}
                alt={images.about.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
