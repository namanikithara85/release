import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/data/siteConfig';

export function PrivacyPage() {
  useSeo({
    title: 'Privacy Policy — Release Tours',
    description: 'Privacy policy for the Release Tours website, including accounts, social login, and data protection rights.',
    path: '/privacy',
  });

  return (
    <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-section max-w-prose-wide">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-5 font-serif text-display-sm">Privacy Policy</h1>

          <div className="mt-10 rounded-2xl border border-terracotta-200 bg-terracotta-50 p-5 text-sm text-terracotta-600">
            <strong>Draft notice:</strong> This privacy policy is provided as a starting
            point and must be reviewed by the business owner or a legal professional
            before publication. Replace placeholders and confirm compliance with
            applicable data protection laws (including GDPR for European visitors).
          </div>

          <div className="prose mt-8 max-w-none text-charcoal/80">
            <h2 className="font-serif text-2xl mt-10">1. Who we are</h2>
            <p className="mt-4">
              {siteConfig.brand.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this
              website. This privacy policy explains how we handle information you
              provide through enquiry forms, account creation, and your use of our
              platform.
            </p>

            <h2 className="font-serif text-2xl mt-10">2. Account and login data</h2>
            <p className="mt-4">
              When you sign in using Google or Facebook, we receive your name, email
              address, and profile photo from your chosen provider. We use this
              information to create and maintain your Release Tours account. We do
              not receive or store your password — authentication is handled entirely
              by your chosen provider.
            </p>
            <p className="mt-4">
              When you first sign in, we ask you to choose a path (traveller, guide,
              or travel agency). This choice is stored in your profile so we can
              show you the right content and dashboard.
            </p>

            <h2 className="font-serif text-2xl mt-10">3. What we collect for each path</h2>
            <p className="mt-4">
              <strong>Travellers:</strong> When you submit an enquiry, we collect your
              name, email address, country of residence, preferred travel dates,
              number of travellers, areas of interest, and any message you include.
              If you are signed in, your enquiry is linked to your account so you can
              track its status.
            </p>
            <p className="mt-4">
              <strong>Guides:</strong> When you submit a guide application, we collect
              your name, email, region of Sri Lanka, specialties, languages spoken,
              years of experience, a short personal statement, and your consent.
            </p>
            <p className="mt-4">
              <strong>Travel agencies:</strong> When you submit a partnership enquiry,
              we collect your agency name, contact name, email, country, typical
              client volume, preferred communication method, and any message you
              include.
            </p>

            <h2 className="font-serif text-2xl mt-10">4. How we use your information</h2>
            <p className="mt-4">
              We use the information you submit to respond to your enquiry, review your
              application, or discuss a partnership. We do not use your information for
              unrelated marketing, and we do not sell your data to third parties.
            </p>

            <h2 className="font-serif text-2xl mt-10">5. Social login providers</h2>
            <p className="mt-4">
              If you sign in with Google or Facebook, that provider may also process
              information about your login in accordance with its own privacy policy.
              We encourage you to review the privacy policies of Google and Facebook
              to understand how they handle your data.
            </p>

            <h2 className="font-serif text-2xl mt-10">6. How long we keep it</h2>
            <p className="mt-4">
              We retain your information for as long as is reasonably necessary to
              respond to your enquiry or application, and for legitimate business
              record-keeping. If you request deletion of your data (see below), we
              will remove your personal information in accordance with applicable law.
            </p>

            <h2 className="font-serif text-2xl mt-10">7. Your rights (GDPR and others)</h2>
            <p className="mt-4">
              Depending on where you live — particularly if you are in the European
              Economic Area or the United Kingdom — you may have the right to:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1.5">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Restrict or object to our processing of your data</li>
              <li>Data portability — receiving your data in a structured format</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us using the email below. We
              will respond within the timeframe required by applicable law.
            </p>

            <h2 className="font-serif text-2xl mt-10">8. Data security</h2>
            <p className="mt-4">
              Your data is stored securely using Supabase, which provides encrypted
              data storage and row-level security. Each user can only access their own
              submissions — no user can see another user&rsquo;s enquiries,
              applications, or partnership details.
            </p>

            <h2 className="font-serif text-2xl mt-10">9. Contact</h2>
            <p className="mt-4">
              To ask about your personal information, request access, correction, or
              deletion, email{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline text-forest font-medium"
              >
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>

          <Link
            to="/"
            className="mt-12 inline-flex items-center gap-2 text-sm text-forest transition-colors hover:text-forest-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
