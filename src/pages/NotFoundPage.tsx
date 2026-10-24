import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

export function NotFoundPage() {
  useSeo({
    title: 'Page not found — Release Tours',
    description: 'The page you were looking for could not be found.',
    path: '/404',
  });

  return (
    <section className="flex min-h-[80svh] items-center justify-center bg-forest px-6 pt-20">
      <Reveal className="text-center text-ivory">
        <p className="eyebrow text-sand">Lost the path</p>
        <h1 className="mt-6 font-serif text-display text-balance">
          This page has wandered off the route.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ivory/70 text-pretty">
          The page you were looking for doesn&rsquo;t exist. Let&rsquo;s get you back to
          the journey.
        </p>
        <Link to="/" className="mt-10 btn btn-primary bg-sand !text-forest hover:!bg-sand-300">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </Reveal>
    </section>
  );
}
