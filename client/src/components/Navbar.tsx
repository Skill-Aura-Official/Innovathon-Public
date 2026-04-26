import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../themes/ThemeProvider';

const links = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Review', href: '#review' },
  { label: 'Register', href: '#cta' },
];

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
      <a className={`flex items-center gap-3 text-[var(--text)] ${theme.fx.ui}`} href="#top">
        <span className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--border)] bg-[var(--surface)] text-lg font-black shadow-[var(--shadow)]">
          IX
        </span>
        <span className="font-black uppercase tracking-[0.16em]" style={{ fontFamily: 'var(--font-display)' }}>
          Innovathon
        </span>
      </a>

      <div className="hidden items-center gap-2 md:flex">
        {links.map((link) => (
          <a
            className="rounded-[8px] px-4 py-2 text-sm font-bold text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <a
          className={`hidden rounded-[8px] border border-[var(--border)] bg-[var(--accent)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--bg)] shadow-[var(--shadow)] transition hover:scale-[1.03] sm:inline-flex ${theme.fx.cta}`}
          href="#cta"
        >
          Register
        </a>
      </div>
    </nav>
  );
}
