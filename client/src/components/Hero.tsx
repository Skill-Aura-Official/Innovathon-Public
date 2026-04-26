import { useTheme } from '../themes/ThemeProvider';

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section id="top" className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.1fr_0.9fr] md:px-8">
      <div className="max-w-3xl">
        <p className={`mb-5 inline-flex rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--accent)] shadow-[var(--shadow)] ${theme.fx.ui}`}>
          {theme.copy.eyebrow}
        </p>
        <h1
          className={`text-balance text-5xl font-black leading-[0.95] tracking-normal text-[var(--text)] sm:text-6xl lg:text-7xl ${theme.fx.ui}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {theme.copy.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
          {theme.copy.subhead}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            className={`rounded-[8px] border border-[var(--border)] bg-[var(--accent)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--bg)] shadow-[var(--shadow)] transition hover:scale-[1.03] ${theme.fx.cta}`}
            href="#cta"
          >
            {theme.copy.primaryCta}
          </a>
          <a
            className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[var(--text)] shadow-[var(--shadow)] transition hover:scale-[1.03]"
            href="#tracks"
          >
            {theme.copy.secondaryCta}
          </a>
        </div>
      </div>

      <div className={`relative min-h-[420px] overflow-hidden rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-md ${theme.fx.heroVisual}`}>
        <img src="/hackathon_hero_feature.png" alt="Hackathon Hero" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
        <div className="absolute inset-4 rounded-[8px] border border-[var(--border)]" />
        <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--accent)]">Live build status</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Idea', 'Build', 'Demo'].map((step, index) => (
                <div className={`rounded-[8px] border border-[var(--border)] bg-[var(--surface-strong)] p-4 ${theme.fx.card} relative overflow-hidden`} key={step}>
                  <p className="text-3xl font-black text-[var(--accent)] relative z-10">0{index + 1}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)] relative z-10">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 relative z-10">
            <div className="h-3 w-11/12 rounded-full bg-[var(--accent)] shadow-[var(--shadow)]" />
            <div className="h-3 w-8/12 rounded-full bg-[var(--accent-2)] shadow-[var(--shadow)]" />
            <div className="h-3 w-10/12 rounded-full bg-[var(--accent)] shadow-[var(--shadow)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
