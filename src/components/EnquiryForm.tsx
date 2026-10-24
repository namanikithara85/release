import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/data/siteConfig';
import { useAuthContext } from '@/lib/AuthContext';

interface FormState {
  fullName: string;
  email: string;
  country: string;
  travelDates: string;
  travellers: string;
  interests: string[];
  message: string;
  consent: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

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

const INTEREST_OPTIONS = [
  'Culture',
  'Movement',
  'Nature',
  'Community',
  'The experience album',
];

const INITIAL: FormState = {
  fullName: '',
  email: '',
  country: '',
  travelDates: '',
  travellers: '',
  interests: [],
  message: '',
  consent: false,
};

export function EnquiryForm() {
  const { user, profile } = useAuthContext();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: profile?.full_name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  }, [user, profile]);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.country) {
      next.country = 'Please select your country of residence.';
    }
    if (!form.consent) {
      next.consent = 'Please consent to being contacted to submit your enquiry.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function toggleInterest(option: string) {
    setForm((prev) => {
      const has = prev.interests.includes(option);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((i) => i !== option)
          : [...prev.interests, option],
      };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setSubmitError('');

    try {
      const { error } = await supabase.from('enquiries').insert({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        country: form.country,
        travel_dates: form.travelDates.trim() || null,
        travellers: form.travellers.trim() || null,
        interests: form.interests.length ? form.interests : null,
        message: form.message.trim() || null,
        consent: form.consent,
        user_id: user?.id || null,
        enquirer_type: 'traveller',
      });

      if (error) throw error;

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage">
          <CheckCircle2 className="h-7 w-7 text-forest" />
        </div>
        <h3 className="mt-6 font-serif text-3xl">Thank you for your enquiry</h3>
        <p className="mx-auto mt-4 max-w-md text-charcoal/70">
          We&rsquo;ve received your message and the Release Tours team will be in touch
          to help you explore the experience, available dates, and practical details.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 link-underline text-forest font-medium"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
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
            <p className="font-medium">We couldn&rsquo;t send your enquiry.</p>
            <p className="mt-1 text-sm text-terracotta-500">
              {submitError ||
                'Please try again, or reach us by email using the link below.'}{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="underline font-medium"
              >
                Email us instead
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Full name */}
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="field-label">
            Full name <span className="text-terracotta-400">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            className="field-input"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            required
          />
          {errors.fullName && (
            <p id="fullName-error" className="field-error">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="field-label">
            Email address <span className="text-terracotta-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="field-input"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="field-label">
            Country of residence <span className="text-terracotta-400">*</span>
          </label>
          <select
            id="country"
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            className="field-input"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'country-error' : undefined}
            required
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <p id="country-error" className="field-error">
              {errors.country}
            </p>
          )}
        </div>

        {/* Travel dates */}
        <div>
          <label htmlFor="travelDates" className="field-label">
            Preferred travel month or dates
          </label>
          <input
            id="travelDates"
            type="text"
            placeholder="e.g. February 2026"
            value={form.travelDates}
            onChange={(e) => update('travelDates', e.target.value)}
            className="field-input"
          />
        </div>

        {/* Travellers */}
        <div>
          <label htmlFor="travellers" className="field-label">
            Number of travellers
          </label>
          <input
            id="travellers"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 2"
            value={form.travellers}
            onChange={(e) => update('travellers', e.target.value)}
            className="field-input"
          />
        </div>

        {/* Interests */}
        <div className="sm:col-span-2">
          <span className="field-label">Areas of interest</span>
          <div className="flex flex-wrap gap-2.5">
            {INTEREST_OPTIONS.map((option) => {
              const active = form.interests.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleInterest(option)}
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

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Questions or additional information
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            className="field-input resize-none"
          />
        </div>

        {/* Consent */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-charcoal/30 text-forest focus:ring-forest/20"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              required
            />
            <span className="text-sm text-charcoal/80">
              I consent to be contacted by Release Tours regarding this enquiry.{' '}
              <span className="text-terracotta-400">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="field-error">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn btn-primary w-full sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending enquiry…
            </>
          ) : (
            <>
              {siteConfig.ctas.enquiry}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-sm text-charcoal/50">
          Prefer email?{' '}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="link-underline text-forest font-medium"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>
    </form>
  );
}
