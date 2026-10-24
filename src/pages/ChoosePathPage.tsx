import { useNavigate } from 'react-router-dom';
import { Compass, Map, Building2, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';

export function ChoosePathPage() {
  useSeo({
    title: 'Choose Your Path — Release Tours',
    description:
      'Are you a traveller, a guide, or a travel agency? Choose your path to get started.',
    path: '/choose-path',
  });

  const { setRole, user, loading } = useAuthContext();
  const navigate = useNavigate();
  const [selecting, setSelecting] = useState(false);

  if (loading) {
    return (
      <section className="flex min-h-[60svh] items-center justify-center bg-ivory pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </section>
    );
  }

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  async function choose(role: 'traveller' | 'guide' | 'agency') {
    setSelecting(true);
    await setRole(role);
    navigate('/dashboard', { replace: true });
  }

  const paths = [
    {
      role: 'traveller' as const,
      icon: Compass,
      title: 'I am a Traveller',
      description:
        'Explore the seven-day journey, enquire about dates, and track your conversation with the Release Tours team.',
      accent: 'text-forest',
      bg: 'bg-sage/40',
      border: 'hover:border-forest',
    },
    {
      role: 'guide' as const,
      icon: Map,
      title: 'I am a Guide',
      description:
        'Join the Release Tours network of local guides, practitioners, and cultural hosts across Sri Lanka.',
      accent: 'text-terracotta-500',
      bg: 'bg-terracotta-50',
      border: 'hover:border-terracotta-400',
    },
    {
      role: 'agency' as const,
      icon: Building2,
      title: 'I am a Travel Agency',
      description:
        'Partner with Release Tours to offer your clients a distinctive Sri Lankan experience.',
      accent: 'text-forest',
      bg: 'bg-sage/40',
      border: 'hover:border-forest',
    },
  ];

  return (
    <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-section max-w-4xl">
        <Reveal>
          <p className="eyebrow text-center">Welcome to Release Tours</p>
          <h1 className="mx-auto mt-5 max-w-2xl text-center font-serif text-display-sm text-balance">
            Choose your path
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-center text-lead text-charcoal/70 text-pretty">
            Tell us who you are so we can give you the right experience. You can
            change this later.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {paths.map((path, i) => (
            <Reveal key={path.role} delay={i * 100}>
              <button
                type="button"
                onClick={() => choose(path.role)}
                disabled={selecting}
                className={`group flex h-full w-full flex-col items-start rounded-3xl border border-charcoal/10 ${path.bg} p-7 text-left transition-all duration-300 ${path.border} hover:shadow-md disabled:opacity-60`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white ${path.accent}`}
                >
                  <path.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-serif text-xl">{path.title}</h2>
                <p className="mt-3 text-sm text-charcoal/70 text-pretty">
                  {path.description}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${path.accent}`}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
