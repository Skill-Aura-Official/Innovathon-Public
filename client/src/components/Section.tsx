import { useTheme } from '../themes/ThemeProvider';

type SectionProps = {
  id: string;
  title: string;
  intro: string;
  cards: Array<{ title: string; body: string; stat: string }>;
};

export default function Section({ id, title, intro, cards }: SectionProps) {
  const { theme } = useTheme();

  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="mb-8 max-w-3xl">
        <h2
          className={`text-3xl font-black tracking-normal text-[var(--text)] md:text-5xl ${theme.fx.ui}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">{intro}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            className={`rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-md ${theme.fx.card}`}
            key={card.title}
          >
            <p className="mb-8 inline-flex rounded-[8px] border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--accent)]">
              {card.stat}
            </p>
            <h3 className="text-xl font-black text-[var(--text)]">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
