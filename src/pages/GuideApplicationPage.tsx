import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '@/lib/AuthContext';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import { images } from '@/data/images';

const SPECIALTIES = [
  'Culture',
  'Movement',
  'Nature',
  'Craft',
  'Food',
  'Community',
];

const REGIONS = [
  'Kandy & Central Highlands',
  'Colombo & West Coast',
  'Galle & Southern Coast',
  'Cultural Triangle',
  'East Coast',
  'Hill Country & Tea Country',
  'Northern Province',
  'Sabaragamuwa',
  'Other',
];

interface FormState {
  fullName: string;
  email: string;
  region: string;
  specialties: string[];
  languages: string;
  experienceYears: string;
  statement: string;
  consent: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL: FormState = {
  fullName: '',
  email: '',
  region: '',
  specialties: [],
  languages: '',
  experienceYears: '',
  statement: '',
  consent: false,
};

export function GuideApplicationPage() {
  useSeo({
    title: 'Join as a Guide — Release Tours',
    description:
      'Join the Release Tours network of local Sri Lankan guides, movement practitioners, and cultural hosts.',
    path: '/guides',
    image: images.about.src,
  });

  const { user, profile } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    fullName: profile?.full_name || user?.email?.split('@')[0] || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) next.fullName = 'Please enter your full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.region) next.region = 'Please select your region.';
    if (!form.consent) next.consent = 'Please consent to being contacted to submit your application.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleSpecialty(option: string) {
    setForm((prev) => {
      const has = prev.specialties.includes(option);
      return {
        ...prev,
        specialties: has
          ? prev.specialties.filter((s) => s !== option)
          : [...prev.specialties, option],
      };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!user) {
      navigate('/login');
      return;
    }

    setStatus('submitting');
    setSubmitError('');

    try {
      const { error } = await supabase.from('guide_applications').insert({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        region: form.region,
        specialties: form.specialties.length ? form.specialties : null,
        languages: form.languages.trim() || null,
        experience_years: form.experienceYears.trim() || null,
        statement: form.statement.trim() || null,
        consent: form.consent,
      });

      if (error) throw error;

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    }
  }

  if (status === 'success') {
    return (
      <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="container-section max-w-lg">
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage">
              <CheckCircle2 className="h-7 w-7 text-forest" />
            </div>
            <h2 className="mt-6 font-serif text-3xl">Thank you for applying</h2>
            <p className="mx-auto mt-4 max-w-md text-charcoal/70 text-pretty">
              We&rsquo;ve received your application. The Release Tours team reviews
              every guide personally, and we&rsquo;ll be in touch soon.
            </p>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 btn btn-primary"
            >
              Go to my dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative flex min-h-[45svh] items-end overflow-hidden bg-forest pt-24">
        <div className="absolute inset-0">
          <img
            src={images.about.src}
            alt={images.about.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/85" />
        </div>
        <div className="relative z-10 container-section w-full pb-16">
          <Reveal>
            <p className="eyebrow text-sand">For Guides</p>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-ivory text-balance">
              Join the Release Tours network
            </h1>
            <p className="mt-6 max-w-prose-wide text-lead text-ivory/85 text-pretty">
              Release Tours is built around its people. If you are a local guide,
              movement practitioner, cultural host, or artisan in Sri Lanka, we&rsquo;d
              love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 sm:py-32 lg:py-40">
        <div className="container-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div>
                  <h2 className="font-serif text-2xl">Why join?</h2>
                  <p className="mt-4 text-charcoal/70 text-pretty">
                    Release Tours creates immersive journeys where local people are
                    at the heart of the experience — not a stop on a bus route. As a
                    guide in our network, you share your craft, your culture, and
                    your story with travellers who want to be present.
                  </p>
                </div>
                <div className="rounded-2xl bg-sage/50 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                    What we look for
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-charcoal/70 text-pretty">
                    <li>Local knowledge and genuine connection to your region</li>
                    <li>Passion for sharing culture, movement, nature, or craft</li>
                    <li>Warmth and hospitality toward international visitors</li>
                  </ul>
                </div>
                {!user && (
                  <div className="rounded-2xl bg-terracotta-50 p-6">
                    <p className="text-sm text-terracotta-600 text-pretty">
                      You&rsquo;ll need to sign in to submit an application.{' '}
                      <Link to="/login" className="font-medium underline">
                        Sign in here
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={100}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10"
              >
                {status === 'error' && (
                  <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-2xl bg-terracotta-50 p-4 text-terracotta-600"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-medium">We couldn&rsquo;t submit your application.</p>
                      <p className="mt-1 text-sm text-terracotta-500">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="g-fullName" className="field-label">
                      Full name <span className="text-terracotta-400">*</span>
                    </label>
                    <input
                      id="g-fullName"
                      type="text"
                      autoComplete="name"
                      value={form.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.fullName}
                      required
                    />
                    {errors.fullName && <p className="field-error">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="g-email" className="field-label">
                      Email <span className="text-terracotta-400">*</span>
                    </label>
                    <input
                      id="g-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.email}
                      required
                    />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="g-region" className="field-label">
                      Region of Sri Lanka <span className="text-terracotta-400">*</span>
                    </label>
                    <select
                      id="g-region"
                      value={form.region}
                      onChange={(e) => update('region', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.region}
                      required
                    >
                      <option value="">Select your region</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    {errors.region && <p className="field-error">{errors.region}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <span className="field-label">Specialties</span>
                    <div className="flex flex-wrap gap-2.5">
                      {SPECIALTIES.map((option) => {
                        const active = form.specialties.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleSpecialty(option)}
                            aria-pressed={active}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              active
                                ? 'border-forest bg-forest text-ivory'
                                : 'border-charcoal/20 text-charcoal/70 hover:border-forest hover:text-forest'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="g-languages" className="field-label">Languages spoken</label>
                    <input
                      id="g-languages"
                      type="text"
                      placeholder="e.g. Sinhala, English, Tamil"
                      value={form.languages}
                      onChange={(e) => update('languages', e.target.value)}
                      className="field-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="g-experience" className="field-label">Years of experience</label>
                    <input
                      id="g-experience"
                      type="text"
                      placeholder="e.g. 5"
                      value={form.experienceYears}
                      onChange={(e) => update('experienceYears', e.target.value)}
                      className="field-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="g-statement" className="field-label">
                      Tell us about yourself
                    </label>
                    <textarea
                      id="g-statement"
                      rows={4}
                      placeholder="What do you love sharing with visitors? What makes your experience unique?"
                      value={form.statement}
                      onChange={(e) => update('statement', e.target.value)}
                      className="field-input resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-charcoal/30 text-forest focus:ring-forest/20"
                        aria-invalid={!!errors.consent}
                        required
                      />
                      <span className="text-sm text-charcoal/80">
                        I consent to Release Tours contacting me about my application.{' '}
                        <span className="text-terracotta-400">*</span>
                      </span>
                    </label>
                    {errors.consent && <p className="field-error">{errors.consent}</p>}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !user}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
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
