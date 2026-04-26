import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { DEFAULT_THEME, themes } from './theme.config';
import type { ThemeConfig, ThemeId } from './theme.config';

type ThemeContextValue = {
  theme: ThemeConfig;
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'innovathon-active-theme';

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return storedTheme && themes[storedTheme] ? storedTheme : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(getInitialTheme);
  const theme = themes[themeId];

  const setThemeId = (nextThemeId: ThemeId) => {
    if (!themes[nextThemeId]) {
      return;
    }
    setThemeIdState(nextThemeId);
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // Theme still updates through React state when storage is unavailable.
    }
    document.documentElement.dataset.theme = themeId;
  }, [themeId]);

  const value = useMemo(() => ({ theme, themeId, setThemeId }), [theme, themeId]);
  const style = useMemo(() => ({
    ...theme.tokens,
    '--theme-c1': theme.tokens['--accent'],
    '--theme-c2': theme.tokens['--accent-2'],
    '--theme-c3': theme.tokens['--glow'],
    '--bg-main': theme.tokens['--bg'],
    '--bg-surface': theme.tokens['--surface'],
    '--color-primary': theme.tokens['--accent'],
    '--color-secondary': theme.tokens['--accent-2'],
    '--color-text': theme.tokens['--text'],
    '--theme-radius': '8px',
    '--theme-radius-btn': '8px',
    '--theme-glass-bg': theme.tokens['--surface'],
    '--theme-glass-blur': '18px',
    '--theme-border': `1px solid ${theme.tokens['--border']}`,
  }) as CSSProperties, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        className="theme-shell min-h-screen bg-[var(--bg)] text-[var(--text)]"
        data-theme={themeId}
        style={style}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
