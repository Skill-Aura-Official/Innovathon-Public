import { useTheme } from '../themes/ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-[var(--border)] px-5 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between md:px-8">
      <p className={`font-black uppercase tracking-[0.16em] text-[var(--text)] ${theme.fx.ui}`}>Innovathon</p>
      <p>Seven visual systems. One working hackathon site.</p>
    </footer>
  );
}
