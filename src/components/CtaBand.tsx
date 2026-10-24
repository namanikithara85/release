import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { siteConfig } from '@/data/siteConfig';

interface CtaBandProps {
  headline?: string;
  copy?: string;
  primaryLabel?: string;
  primaryTo?: string;
}

export function CtaBand({
  headline = 'Your next journey can mean more.',
  copy = 'Curious about the journey? Tell us a little about your plans and we\u2019ll help you explore the experience, the available dates, and the practical details.',
  primaryLabel,
  primaryTo = '/contact',
}: CtaBandProps) {
  return (
    <section className="bg-forest text-ivory">
      <div className="container-section py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-sand">Begin the conversation</p>
          <h2 className="mt-5 font-serif text-display-sm text-balance">{headline}</h2>
          <p className="mx-auto mt-6 max-w-prose-wide text-lead text-ivory/80 text-pretty">
            {copy}
          </p>
          <Link to={primaryTo} className="mt-10 btn btn-primary bg-sand !text-forest hover:!bg-sand-300">
            {primaryLabel || siteConfig.ctas.enquiry}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
