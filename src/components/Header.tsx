import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useAuthContext } from '@/lib/AuthContext';
import { Logo } from './Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !menuOpen;

  const authLink = (
    <Link
      to={user ? '/dashboard' : '/login'}
      aria-label={user ? 'Dashboard' : 'Sign in'}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        transparent
          ? 'text-ivory/90 hover:text-ivory hover:bg-ivory/10'
          : 'text-charcoal hover:text-forest hover:bg-forest/5'
      }`}
    >
      <User className="h-5 w-5" />
    </Link>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth ${
        transparent
          ? 'bg-transparent py-5'
          : 'bg-ivory/95 py-3 shadow-[0_1px_0_0_rgba(33,61,49,0.08)] backdrop-blur-md'
      }`}
    >
      <div className="container-section flex items-center justify-between gap-4">
        <Logo variant={transparent ? 'light' : 'dark'} />

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`link-underline text-sm font-medium transition-colors duration-300 ${
                transparent ? 'text-ivory/90 hover:text-ivory' : 'text-charcoal hover:text-forest'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {!loading && authLink}
          <Link
            to="/contact"
            className={`btn ${
              transparent ? 'btn-secondary' : 'btn-primary'
            } !px-5 !py-2.5 text-sm`}
          >
            {siteConfig.ctas.secondary}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`lg:hidden inline-flex items-center justify-center rounded-full p-2 transition-colors ${
            transparent ? 'text-ivory' : 'text-forest'
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-0 z-40 bg-forest animate-fade-in"
          style={{ paddingTop: '5rem' }}
        >
          <nav
            className="container-section flex flex-col gap-1"
            aria-label="Mobile primary"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="border-b border-ivory/10 py-4 font-serif text-3xl text-ivory transition-colors hover:text-sand"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={user ? '/dashboard' : '/login'}
              className="flex items-center gap-3 border-b border-ivory/10 py-4 font-serif text-3xl text-ivory transition-colors hover:text-sand"
            >
              <User className="h-6 w-6" />
              {user ? 'My dashboard' : 'Sign in'}
            </Link>
            <Link
              to="/guides"
              className="border-b border-ivory/10 py-4 font-serif text-2xl text-ivory/80 transition-colors hover:text-sand"
            >
              For Guides
            </Link>
            <Link
              to="/agencies"
              className="border-b border-ivory/10 py-4 font-serif text-2xl text-ivory/80 transition-colors hover:text-sand"
            >
              For Agencies
            </Link>
            <Link
              to="/contact"
              className="btn btn-primary mt-6 w-full bg-sand !text-forest hover:!bg-sand-300"
            >
              {siteConfig.ctas.secondary}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
