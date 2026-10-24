import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/EnquiryForm';
import { images } from '@/data/images';
import { siteConfig } from '@/data/siteConfig';

export function ContactPage() {
  useSeo({
    title: 'Contact & Enquiry — Release Tours',
    description:
      'Enquire about the seven-day Release Tours journey through Sri Lanka. Tell us about your plans and we will help you explore the experience, dates, and practical details.',
    path: '/contact',
    image: images.contact.src,
  });

  return (
    <>
      {/* Hero band */}
      <section className="relative flex min-h-[50svh] items-end overflow-hidden bg-forest pt-24">
        <div className="absolute inset-0">
          <img
            src={images.contact.src}
            alt={images.contact.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/85" />
        </div>
        <div className="relative z-10 container-section w-full pb-16">
          <Reveal>
            <p className="eyebrow text-sand">Contact</p>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-ivory text-balance">
              Your next journey can mean more.
            </h1>
            <p className="mt-6 max-w-prose-wide text-lead text-ivory/85 text-pretty">
              Curious about the journey? Tell us a little about your plans and
              we&rsquo;ll help you explore the experience, the available dates, and the
              practical details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + aside */}
      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl">A few ways to reach us</h2>
                  <p className="mt-4 text-charcoal/70 text-pretty">
                    The enquiry form is the quickest way to share your plans with us.
                    You&rsquo;ll hear back from the Release Tours team with the latest
                    available dates and details.
                  </p>
                </div>

                <div className="rounded-2xl bg-sage/50 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-2 block link-underline text-forest font-medium"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>

                <div className="rounded-2xl bg-ivory-300 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                    A note on details
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/70 text-pretty">
                    Pricing, confirmed dates, and full inclusions are being finalised.
                    Enquiring is the best way to receive the current information —
                    there&rsquo;s no obligation.
                  </p>
                </div>

                <div className="rounded-2xl bg-sage/50 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                    Are you a guide or agency?
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/70 text-pretty">
                    We welcome local guides and travel agencies too.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link
                      to="/guides"
                      className="link-underline text-sm font-medium text-forest"
                    >
                      Join as a guide &rarr;
                    </Link>
                    <Link
                      to="/agencies"
                      className="link-underline text-sm font-medium text-forest"
                    >
                      Partner as an agency &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={100}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-forest py-10">
        <div className="container-section">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
