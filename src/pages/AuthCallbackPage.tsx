import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useSeo } from '@/lib/useSeo';

export function AuthCallbackPage() {
  useSeo({
    title: 'Welcome — Release Tours',
    description: 'Completing your sign-in to Release Tours.',
    path: '/auth/callback',
  });

  const navigate = useNavigate();
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .maybeSingle();

        if (profile && profile.role) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/choose-path', { replace: true });
        }
      } else {
        navigate('/login', { replace: true });
      }
    })();
  }, [navigate]);

  return (
    <section className="flex min-h-[60svh] items-center justify-center bg-ivory pt-24">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-forest" />
        <p className="mt-4 text-charcoal/70">Completing your sign-in…</p>
      </div>
    </section>
  );
}
