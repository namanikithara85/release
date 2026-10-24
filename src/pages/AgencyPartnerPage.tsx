import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '@/lib/AuthContext';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import { images } from '@/data/images';

const COUNTRIES = [
  'Switzerland',
  'Germany',
  'United Kingdom',
  'Netherlands',
  'France',
  'Austria',
  'Belgium',
  'Denmark',
  'Sweden',
  'Norway',
  'Italy',
  'Spain',
  'Portugal',
  'Ireland',
  'United States',
  'Canada',
  'Australia',
  'New Zealand',
  'Other',
];

const COMMUNICATION_OPTIONS = ['Email', 'Phone', 'Video call'];

interface FormState {
  agencyName: string;
  contactName: string;
  email: string;
  country: string;
  clientVolume: string;
  communication: string;
  message: string;
  consent: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL: FormState = {
  agencyName: '',
  contactName: '',
  email: '',
  country: '',
  clientVolume: '',
  communication: '',
  message: '',
  consent: false,
};

export function AgencyPartnerPage() {
  useSeo({
    title: 'Partner with Release Tours — Travel Agencies',
    description:
      'Offer your clients a distinctive seven-day Sri Lankan experience. Partner with Release Tours as a travel agency.',
    path: '/agencies',
    image: images.contact.src,
  });

  const { user, profile } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    contactName: profile?.full_name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.agencyName.trim().length < 2) next.agencyName = 'Please enter your agency name.';
    if (form.contactName.trim().length < 2) next.contactName = 'Please enter a contact name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.country) next.country = 'Please select your country.';
    if (!form.consent) next.consent = 'Please consent to being contacted to submit your enquiry.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
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
      const { error } = await supabase.from('agency_enquiries').insert({
        agency_name: form.agencyName.trim(),
        contact_name: form.contactName.trim(),
        email: form.email.trim(),
        country: form.country,
        client_volume: form.clientVolume.trim() || null,
        communication: form.communication || null,
        message: form.message.trim() || null,
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
            <h2 className="mt-6 font-serif text-3xl">Thank you for your interest</h2>
            <p className="mx-auto mt-4 max-w-md text-charcoal/70 text-pretty">
              We&rsquo;ve received your partnership enquiry. The Release Tours team
              will be in touch to discuss how we can work together.
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
            src={images.contact.src}
            alt={images.contact.alt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/85" />
        </div>
        <div className="relative z-10 container-section w-full pb-16">
          <Reveal>
            <p className="eyebrow text-sand">For Travel Agencies</p>
            <h1 className="mt-5 max-w-3xl font-serif text-display text-ivory text-balance">
              Partner with Release Tours
            </h1>
            <p className="mt-6 max-w-prose-wide text-lead text-ivory/85 text-pretty">
              Offer your clients something distinctive — a seven-day immersive
              journey through Sri Lanka that goes beyond sightseeing. Let&rsquo;s
              explore how we can work together.
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
                  <h2 className="font-serif text-2xl">Why partner with us?</h2>
                  <p className="mt-4 text-charcoal/70 text-pretty">
                    Release Tours offers a journey that travellers can&rsquo;t find
                    on a standard itinerary. Your clients return with stories of
                    real connection — not just photos of landmarks.
                  </p>
                </div>
                <div className="rounded-2xl bg-sage/50 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider-2 text-charcoal/50">
                    What we offer
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-charcoal/70 text-pretty">
                    <li>A distinctive, immersive seven-day Sri Lankan experience</li>
                    <li>Curated for travellers who want depth, not surface</li>
                    <li>Partnership and commission terms available on enquiry</li>
                    <li>Co-marketing possibilities for the right partners</li>
                  </ul>
                </div>
                {!user && (
                  <div className="rounded-2xl bg-terracotta-50 p-6">
                    <p className="text-sm text-terracotta-600 text-pretty">
                      You&rsquo;ll need to sign in to submit a partnership enquiry.{' '}
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
                      <p className="font-medium">We couldn&rsquo;t submit your enquiry.</p>
                      <p className="mt-1 text-sm text-terracotta-500">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="a-agency" className="field-label">
                      Agency name <span className="text-terracotta-400">*</span>
                    </label>
                    <input
                      id="a-agency"
                      type="text"
                      value={form.agencyName}
                      onChange={(e) => update('agencyName', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.agencyName}
                      required
                    />
                    {errors.agencyName && <p className="field-error">{errors.agencyName}</p>}
                  </div>

                  <div>
                    <label htmlFor="a-contact" className="field-label">
                      Contact name <span className="text-terracotta-400">*</span>
                    </label>
                    <input
                      id="a-contact"
                      type="text"
                      autoComplete="name"
                      value={form.contactName}
                      onChange={(e) => update('contactName', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.contactName}
                      required
                    />
                    {errors.contactName && <p className="field-error">{errors.contactName}</p>}
                  </div>

                  <div>
                    <label htmlFor="a-email" className="field-label">
                      Email <span className="text-terracotta-400">*</span>
                    </label>
                    <input
                      id="a-email"
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

                  <div>
                    <label htmlFor="a-country" className="field-label">
                      Country <span className="text-terracotta-400">*</span>
                    </label>
                    <select
                      id="a-country"
                      value={form.country}
                      onChange={(e) => update('country', e.target.value)}
                      className="field-input"
                      aria-invalid={!!errors.country}
                      required
                    >
                      <option value="">Select a country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="field-error">{errors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="a-volume" className="field-label">
                      Typical clients sent per year
                    </label>
                    <input
                      id="a-volume"
                      type="text"
                      placeholder="e.g. 50–100"
                      value={form.clientVolume}
                      onChange={(e) => update('clientVolume', e.target.value)}
                      className="field-input"
                    />
                  </div>

                  <div>
                    <span className="field-label">Preferred communication</span>
                    <div className="flex flex-wrap gap-2.5">
                      {COMMUNICATION_OPTIONS.map((option) => {
                        const active = form.communication === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => update('communication', active ? '' : option)}
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

                  <div className="sm:col-span-2">
                    <label htmlFor="a-message" className="field-label">
                      Tell us about your agency and how you&rsquo;d like to partner
                    </label>
                    <textarea
                      id="a-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
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
                        I consent to Release Tours contacting me about this partnership enquiry.{' '}
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
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit partnership enquiry
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
