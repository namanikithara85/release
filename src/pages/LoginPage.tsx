import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthContext } from '@/lib/AuthContext';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/data/siteConfig';

export function LoginPage() {
  useSeo({
    title: 'Sign In — Release Tours',
    description:
      'Sign in to Release Tours to manage your enquiries, guide application, or agency partnership.',
    path: '/login',
  });

  const { signInWithGoogle, signInWithFacebook } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');

  async function handleGoogle() {
    try {
      await signInWithGoogle();
    } catch {
      navigate('/login?error=google');
    }
  }

  async function handleFacebook() {
    try {
      await signInWithFacebook();
    } catch {
      navigate('/login?error=facebook');
    }
  }

  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-ivory pt-24 pb-20">
      <div className="container-section max-w-md">
        <Reveal>
          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
            <p className="eyebrow text-center">Welcome</p>
            <h1 className="mt-4 text-center font-serif text-3xl">
              Sign in to Release Tours
            </h1>
            <p className="mx-auto mt-4 max-w-xs text-center text-charcoal/70 text-pretty">
              Continue with Google or Facebook to manage your journey, application,
              or partnership — all in one place.
            </p>

            {errorParam && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl bg-terracotta-50 p-4 text-terracotta-600"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm">
                  We couldn&rsquo;t complete your sign-in. Please try again, or
                  continue without an account.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              {/* Google */}
              <button
                type="button"
                onClick={handleGoogle}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal/15 bg-white px-6 py-3.5 font-medium text-charcoal transition-all duration-300 hover:border-charcoal/30 hover:bg-charcoal/5"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={handleFacebook}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1877F2] px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-[#0b5fcc]"
              >
                <FacebookIcon />
                Continue with Facebook
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/contact"
                className="link-underline inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-forest"
              >
                Continue without an account
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-charcoal/50">
            By signing in you agree to our{' '}
            <Link to="/terms" className="link-underline text-forest">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="link-underline text-forest">
              Privacy Policy
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
