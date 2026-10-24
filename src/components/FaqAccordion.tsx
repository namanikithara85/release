import { useState, useId } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FaqItem } from '@/data/siteConfig';
import { Reveal } from './Reveal';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-charcoal/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = useId();
        const panelId = useId();

        return (
          <Reveal key={item.question} delay={i * 40}>
            <div>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-forest"
                >
                  <span className="font-serif text-xl sm:text-2xl">{item.question}</span>
                  <span className="shrink-0 text-terracotta-400" aria-hidden="true">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="overflow-hidden"
              >
                <p className="pb-7 pr-12 text-base leading-relaxed text-charcoal/80">
                  {item.answer}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
