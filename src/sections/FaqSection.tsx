import { Reveal } from '@/components/Reveal';
import { FaqAccordion } from '@/components/FaqAccordion';
import { siteConfig } from '@/data/siteConfig';

export function FaqSection() {
  return (
    <section className="bg-ivory py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Questions and answers</p>
            <h2 className="mt-6 font-serif text-display-sm text-balance">
              Good to know.
            </h2>
            <p className="mt-6 max-w-sm text-charcoal/70 text-pretty">
              Can&rsquo;t find what you&rsquo;re looking for? The enquiry form is the
              quickest way to reach us with specific questions.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={100}>
            <FaqAccordion items={siteConfig.faq} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
