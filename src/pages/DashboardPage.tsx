import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Compass,
  Map,
  Building2,
  ArrowRight,
  LogOut,
  Loader2,
  Plus,
  Clock,
  CheckCircle2,
  MailOpen,
  Sparkles,
} from 'lucide-react';
import { useAuthContext } from '@/lib/AuthContext';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/lib/supabase';

interface EnquiryRow {
  id: string;
  status: string;
  travel_dates: string | null;
  created_at: string;
  country: string;
}

interface GuideRow {
  id: string;
  status: string;
  region: string;
  created_at: string;
}

interface AgencyRow {
  id: string;
  status: string;
  agency_name: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  submitted: 'Submitted',
  reviewing: 'Under Review',
  responded: 'Responded',
  welcomed: 'Welcomed',
  partnered: 'Partnered',
  not_a_match: 'Not a Match',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-sage text-forest',
  submitted: 'bg-sage text-forest',
  reviewing: 'bg-amber-100 text-amber-700',
  responded: 'bg-forest text-ivory',
  welcomed: 'bg-forest text-ivory',
  partnered: 'bg-forest text-ivory',
  not_a_match: 'bg-terracotta-50 text-terracotta-500',
};

export function DashboardPage() {
  useSeo({
    title: 'My Dashboard — Release Tours',
    description: 'Manage your enquiries, applications, and partnership with Release Tours.',
    path: '/dashboard',
  });

  const { user, profile, loading, signOut, setRole } = useAuthContext();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<EnquiryRow[]>([]);
  const [guideApps, setGuideApps] = useState<GuideRow[]>([]);
  const [agencyEnqs, setAgencyEnqs] = useState<AgencyRow[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    if (!profile?.role) {
      navigate('/choose-path', { replace: true });
      return;
    }

    let active = true;
    (async () => {
      setDataLoading(true);
      if (profile.role === 'traveller') {
        const { data } = await supabase
          .from('enquiries')
          .select('id, status, travel_dates, created_at, country')
          .order('created_at', { ascending: false });
        if (active && data) setEnquiries(data as EnquiryRow[]);
      } else if (profile.role === 'guide') {
        const { data } = await supabase
          .from('guide_applications')
          .select('id, status, region, created_at')
          .order('created_at', { ascending: false });
        if (active && data) setGuideApps(data as GuideRow[]);
      } else if (profile.role === 'agency') {
        const { data } = await supabase
          .from('agency_enquiries')
          .select('id, status, agency_name, created_at')
          .order('created_at', { ascending: false });
        if (active && data) setAgencyEnqs(data as AgencyRow[]);
      }
      if (active) setDataLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [user, profile, loading, navigate]);

  if (loading || (user && !profile)) {
    return (
      <section className="flex min-h-[60svh] items-center justify-center bg-ivory pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </section>
    );
  }

  if (!user) return null;

  const role = profile?.role;
  const firstName = (profile?.full_name || user.email || 'there').split(' ')[0];

  const roleConfig = {
    traveller: {
      icon: Compass,
      label: 'Traveller',
      ctaLink: '/contact',
      ctaText: 'Make a new enquiry',
      emptyText: "You haven't made any enquiries yet.",
      emptySub: "Tell us about your travel plans and we'll help you explore the journey.",
    },
    guide: {
      icon: Map,
      label: 'Guide',
      ctaLink: '/guides',
      ctaText: 'Complete your application',
      emptyText: "You haven't submitted an application yet.",
      emptySub: 'Join the Release Tours network of local guides and cultural hosts.',
    },
    agency: {
      icon: Building2,
      label: 'Agency',
      ctaLink: '/agencies',
      ctaText: 'Submit partnership enquiry',
      emptyText: "You haven't sent a partnership enquiry yet.",
      emptySub: "Tell us about your agency and how you'd like to partner with us.",
    },
  } as const;

  const config = role ? roleConfig[role] : roleConfig.traveller;

  return (
    <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-section max-w-4xl">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="eyebrow">My Dashboard</p>
              <h1 className="mt-4 font-serif text-display-sm">
                Welcome back, {firstName}
              </h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sage/50 px-3 py-1.5 text-sm font-medium text-forest">
                <config.icon className="h-4 w-4" />
                {config.label}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate('/');
              }}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2.5 text-sm font-medium text-charcoal/70 transition-colors hover:border-charcoal/30 hover:text-charcoal"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </Reveal>

        {/* Content */}
        <div className="mt-12">
          {dataLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-forest" />
            </div>
          ) : role === 'traveller' ? (
            enquiries.length > 0 ? (
              <div className="space-y-4">
                {enquiries.map((enq, i) => (
                  <Reveal key={enq.id} delay={i * 80}>
                    <EnquiryCard
                      status={enq.status}
                      travelDates={enq.travel_dates}
                      country={enq.country}
                      createdAt={enq.created_at}
                    />
                  </Reveal>
                ))}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-medium text-forest transition-colors hover:text-forest-700"
                >
                  <Plus className="h-4 w-4" />
                  Make a new enquiry
                </Link>
              </div>
            ) : (
              <EmptyState
                icon={Compass}
                text={config.emptyText}
                sub={config.emptySub}
                ctaLink={config.ctaLink}
                ctaText={config.ctaText}
              />
            )
          ) : role === 'guide' ? (
            guideApps.length > 0 ? (
              <div className="space-y-4">
                {guideApps.map((app, i) => (
                  <Reveal key={app.id} delay={i * 80}>
                    <StatusCard
                      title={`Guide application — ${app.region}`}
                      status={app.status}
                      createdAt={app.created_at}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Map}
                text={config.emptyText}
                sub={config.emptySub}
                ctaLink={config.ctaLink}
                ctaText={config.ctaText}
              />
            )
          ) : role === 'agency' ? (
            agencyEnqs.length > 0 ? (
              <div className="space-y-4">
                {agencyEnqs.map((enq, i) => (
                  <Reveal key={enq.id} delay={i * 80}>
                    <StatusCard
                      title={`Partnership enquiry — ${enq.agency_name}`}
                      status={enq.status}
                      createdAt={enq.created_at}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Building2}
                text={config.emptyText}
                sub={config.emptySub}
                ctaLink={config.ctaLink}
                ctaText={config.ctaText}
              />
            )
          ) : null}
        </div>

        {/* Change path */}
        <div className="mt-16 border-t border-charcoal/10 pt-8">
          <p className="text-sm text-charcoal/50">
            Are you also a guide or agency?{' '}
            <button
              type="button"
              onClick={async () => {
                await setRole('guide');
                navigate('/dashboard');
              }}
              className="link-underline font-medium text-forest"
            >
              Switch to guide
            </button>
            {' · '}
            <button
              type="button"
              onClick={async () => {
                await setRole('agency');
                navigate('/dashboard');
              }}
              className="link-underline font-medium text-forest"
            >
              Switch to agency
            </button>
            {' · '}
            <button
              type="button"
              onClick={async () => {
                await setRole('traveller');
                navigate('/dashboard');
              }}
              className="link-underline font-medium text-forest"
            >
              Switch to traveller
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] || status;
  const color = STATUS_COLORS[status] || 'bg-sage text-forest';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {status === 'responded' || status === 'welcomed' || status === 'partnered' ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : status === 'reviewing' ? (
        <Clock className="h-3.5 w-3.5" />
      ) : (
        <MailOpen className="h-3.5 w-3.5" />
      )}
      {label}
    </span>
  );
}

function EnquiryCard({
  status,
  travelDates,
  country,
  createdAt,
}: {
  status: string;
  travelDates: string | null;
  country: string;
  createdAt: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg">
            Enquiry {travelDates ? `· ${travelDates}` : ''}
          </p>
          <p className="mt-1 text-sm text-charcoal/60">
            {country} · {new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

function StatusCard({
  title,
  status,
  createdAt,
}: {
  title: string;
  status: string;
  createdAt: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg">{title}</p>
          <p className="mt-1 text-sm text-charcoal/60">
            Submitted {new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  text,
  sub,
  ctaLink,
  ctaText,
}: {
  icon: typeof Compass;
  text: string;
  sub: string;
  ctaLink: string;
  ctaText: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-charcoal/20 bg-white/60 p-10 text-center sm:p-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage/50">
        <Icon className="h-7 w-7 text-forest" />
      </div>
      <h2 className="mt-6 font-serif text-2xl">{text}</h2>
      <p className="mx-auto mt-3 max-w-sm text-charcoal/60 text-pretty">{sub}</p>
      <Link
        to={ctaLink}
        className="mt-8 inline-flex items-center gap-2 btn btn-primary"
      >
        <Sparkles className="h-4 w-4" />
        {ctaText}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
