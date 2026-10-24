import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/useSeo';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/data/siteConfig';

export function TermsPage() {
  useSeo({
    title: 'Terms & Conditions — Release Tours',
    description: 'Terms and conditions for the Release Tours website, accounts, enquiries, and partnerships.',
    path: '/terms',
  });

  return (
    <section className="bg-ivory pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="container-section max-w-prose-wide">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-5 font-serif text-display-sm">Terms &amp; Conditions</h1>

          <div className="mt-10 rounded-2xl border border-terracotta-200 bg-terracotta-50 p-5 text-sm text-terracotta-600">
            <strong>Draft notice:</strong> These terms are provided as a starting point
            and must be reviewed by the business owner or a legal professional before
            publication. Booking conditions, cancellation policies, and commercial terms
            must be confirmed before the site accepts bookings.
          </div>

          <div className="prose mt-8 max-w-none text-charcoal/80">
            <h2 className="font-serif text-2xl mt-10">1. About these terms</h2>
            <p className="mt-4">
              These terms govern your use of the {siteConfig.brand.name} website,
              including creating an account, submitting enquiries, applying as a
              guide, or enquiring about a partnership.
            </p>

            <h2 className="font-serif text-2xl mt-10">2. Accounts and login</h2>
            <p className="mt-4">
              You may create an account by signing in with Google or Facebook. You
              are responsible for keeping your login credentials secure through your
              chosen provider. You agree not to share your account or use another
              person&rsquo;s account.
            </p>
            <p className="mt-4">
              When you first sign in, you choose a path (traveller, guide, or agency).
              This determines which features and forms are shown to you. You can
              change your path at any time from your dashboard.
            </p>

            <h2 className="font-serif text-2xl mt-10">3. Enquiries</h2>
            <p className="mt-4">
              Submitting an enquiry through this website does not constitute a booking
              or a contractual agreement. It is a request for information, and we will
              respond to help you explore the experience and available details.
            </p>

            <h2 className="font-serif text-2xl mt-10">4. Guide applications</h2>
            <p className="mt-4">
              Submitting a guide application expresses your interest in joining the
              Release Tours network. It does not guarantee acceptance. We review every
              application individually and will contact you regarding the outcome.
            </p>

            <h2 className="font-serif text-2xl mt-10">5. Agency partnership enquiries</h2>
            <p className="mt-4">
              Submitting a partnership enquiry expresses your agency&rsquo;s interest
              in working with Release Tours. Partnership terms, commission structures,
              and co-marketing arrangements are discussed individually and confirmed
              in a separate agreement.
            </p>

            <h2 className="font-serif text-2xl mt-10">6. Accuracy of information</h2>
            <p className="mt-4">
              We strive to present information accurately. Where tour details are not
              yet confirmed, we indicate this honestly. We are not responsible for
              reliance on unconfirmed details and will provide confirmed information on
              enquiry.
            </p>

            <h2 className="font-serif text-2xl mt-10">7. Bookings and cancellations</h2>
            <p className="mt-4">
              Booking conditions, payment terms, and cancellation policies will be
              provided when confirmed. No booking is accepted through this website until
              a separate confirmation is issued.
            </p>

            <h2 className="font-serif text-2xl mt-10">8. Contact</h2>
            <p className="mt-4">
              For questions about these terms, email{' '}
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
