import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/data/siteConfig';

export function PracticalInfo() {
  return (
    <section id="practical" className="bg-sage/40 py-24 sm:py-32 lg:py-40">
      <div className="container-section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Practical information</p>
          <h2 className="mt-6 font-serif text-display-sm text-balance">
            What you need to know before you enquire.
          </h2>
          <p className="mt-6 max-w-prose-wide text-lead text-charcoal/80 text-pretty">
            The seven-day duration is confirmed. Other commercial details are being
            finalised — where information is not yet confirmed, we&rsquo;ve noted it
            honestly and are happy to provide the latest details on enquiry.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:mt-16">
          {siteConfig.practicalInfo.map((item) => (
            <div key={item.label} className="bg-ivory p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                  {item.label}
                </h3>
                {item.confirmed ? (
                  <span className="shrink-0 rounded-full bg-sage px-2.5 py-1 text-xs font-medium text-forest">
                    Confirmed
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-ivory-300 px-2.5 py-1 text-xs font-medium text-charcoal/50">
                    To be confirmed
                  </span>
                )}
              </div>
              <p className="mt-3 text-charcoal/80 text-pretty">{item.value}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
