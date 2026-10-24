import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * Refined typographic wordmark with a minimal horizon/path symbol.
 * The symbol evokes opening up and letting go — a sunrise over a path.
 */
export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-ivory' : 'text-forest';
  const symbolColor = variant === 'light' ? '#D9B98A' : '#BC7755';

  return (
    <Link
      to="/"
      aria-label="Release Tours — home"
      className={`group inline-flex items-center gap-2.5 ${textColor} ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0 transition-transform duration-500 ease-smooth group-hover:scale-105"
        aria-hidden="true"
      >
        <path
          d="M6 26 C 13 26, 15 21, 20 21 C 25 21, 27 26, 34 26"
          stroke={symbolColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="20" cy="13" r="4" fill="none" stroke={symbolColor} strokeWidth="2.5" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl tracking-tight">Release</span>
        <span className="font-sans text-[0.625rem] uppercase tracking-wider-2 opacity-80">
          Tours
        </span>
      </span>
    </Link>
  );
}
