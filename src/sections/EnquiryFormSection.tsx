import { Reveal } from '@/components/Reveal';
import { EnquiryForm } from '@/components/EnquiryForm';
import { siteConfig } from '@/data/siteConfig';

export function EnquiryFormSection() {
  return (
    <section id="enquire" className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Enquire</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              {siteConfig.brand.tagline}
            </h2>
            <p className="mt-6 max-w-sm text-lead text-charcoal/80 text-pretty">
              {siteConfig.hero.subheadline}
            </p>
            <p className="mt-6 max-w-sm text-charcoal/60 text-pretty">
              Tell us a little about your plans and we&rsquo;ll help you explore the
              experience, the available dates, and the practical details.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
