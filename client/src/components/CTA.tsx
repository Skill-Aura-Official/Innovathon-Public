import { useTheme } from '../themes/ThemeProvider';

export default function CTA() {
  const { theme } = useTheme();

  return (
    <section id="cta" className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className={`overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-md md:p-12 ${theme.fx.cta}`}>
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2
              className="text-3xl font-black tracking-normal text-[var(--text)] md:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {theme.copy.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{theme.copy.ctaBody}</p>
          </div>
          <a
            className={`inline-flex rounded-[8px] border border-[var(--border)] bg-[var(--accent)] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--bg)] shadow-[var(--shadow)] transition hover:scale-[1.03] ${theme.fx.ui}`}
            href="mailto:team@innovathon.dev"
          >
            Reserve slot
          </a>
        </div>
      </div>
    </section>
  );
}
