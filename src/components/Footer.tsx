import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { social } = siteConfig;

  return (
    <footer className="bg-forest text-ivory">
      <div className="container-section py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-xs font-serif text-xl leading-snug text-ivory/80">
              {siteConfig.brand.footerStatement}
            </p>
            <div className="mt-6 flex gap-3">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ivory/70 hover:text-ivory"
                >
                  Instagram
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ivory/70 hover:text-ivory"
                >
                  Facebook
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-ivory/70 hover:text-ivory"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-eyebrow uppercase tracking-wider-2 text-sand">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/journey" className="link-underline text-ivory/80 hover:text-ivory">
                  The Journey
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline text-ivory/80 hover:text-ivory">
                  About Release Tours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline text-ivory/80 hover:text-ivory">
                  Contact &amp; Enquiry
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-sans text-eyebrow uppercase tracking-wider-2 text-sand">
              Partners
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/guides" className="link-underline text-ivory/80 hover:text-ivory">
                  For Guides
                </Link>
              </li>
              <li>
                <Link to="/agencies" className="link-underline text-ivory/80 hover:text-ivory">
                  For Agencies
                </Link>
              </li>
            </ul>
            <h3 className="mt-6 font-sans text-eyebrow uppercase tracking-wider-2 text-sand">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/privacy" className="link-underline text-ivory/80 hover:text-ivory">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="link-underline text-ivory/80 hover:text-ivory">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-sans text-eyebrow uppercase tracking-wider-2 text-sand">
              Enquire
            </h3>
            <Link
              to="/contact"
              className="mt-5 inline-block btn btn-primary bg-sand !text-forest hover:!bg-sand-300"
            >
              Start your enquiry
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ivory/50">
            &copy; {year} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="text-sm text-ivory/40">
            Sri Lanka &middot; Crafted for travellers who want to experience more
          </p>
        </div>
      </div>
    </footer>
  );
}
