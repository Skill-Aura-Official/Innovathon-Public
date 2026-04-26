import { themeOrder, themes } from '../themes/theme.config';
import type { ThemeId } from '../themes/theme.config';
import { useTheme } from '../themes/ThemeProvider';

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useTheme();

  return (
    <label className="flex items-center gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-[var(--shadow)] backdrop-blur-md">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Theme</span>
      <select
        aria-label="Select visual theme"
        className="max-w-[170px] rounded-[6px] border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm font-bold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
        value={themeId}
        onChange={(event) => setThemeId(event.target.value as ThemeId)}
      >
        {themeOrder.map((id) => (
          <option key={id} value={id}>
            {themes[id].label}
          </option>
        ))}
      </select>
    </label>
  );
}
