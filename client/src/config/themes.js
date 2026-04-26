export const THEMES = {
  windy: {
    id: 'windy',
    name: 'Windy',
    particleCount: 2000,
    colors: ['#a5f3fc', '#e0f2fe', '#7dd3fc'],
    speed: 0.8,
    ui: {
      radius: '24px',
      radiusBtn: '100px',
      glassBg: 'rgba(255, 255, 255, 0.05)',
      glassBlur: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      fontBody: "'Inter', sans-serif",
      fontDisplay: "'Inter', sans-serif",
      shadow: '0 8px 32px rgba(165, 243, 252, 0.1)'
    }
  },
  anime: {
    id: 'anime',
    name: 'Anime',
    particleCount: 1500,
    colors: ['#fbcfe8', '#f472b6', '#fde047'],
    speed: 0.3,
    ui: {
      radius: '30px',
      radiusBtn: '100px',
      glassBg: 'rgba(253, 242, 248, 0.08)',
      glassBlur: '12px',
      border: '2px solid rgba(244, 114, 182, 0.3)',
      fontBody: "'Nunito', 'Inter', sans-serif",
      fontDisplay: "'Quicksand', 'Space Grotesk', sans-serif",
      shadow: '0 8px 32px rgba(244, 114, 182, 0.2)'
    }
  },
  thunderstorm: {
    id: 'thunderstorm',
    name: 'Thunderstorm',
    particleCount: 500,
    colors: ['#1e1b4b', '#312e81', '#6366f1'],
    speed: 2.0,
    ui: {
      radius: '4px',
      radiusBtn: '4px',
      glassBg: 'rgba(15, 10, 30, 0.4)',
      glassBlur: '4px',
      border: '1px solid rgba(99, 102, 241, 0.5)',
      fontBody: "'Inter', sans-serif",
      fontDisplay: "'Space Grotesk', sans-serif",
      shadow: '0 12px 40px rgba(99, 102, 241, 0.3)'
    }
  },
  'ice-storm': {
    id: 'ice-storm',
    name: 'Ice Storm',
    particleCount: 3000,
    colors: ['#bae6fd', '#7dd3fc', '#ffffff'],
    speed: 1.2,
    ui: {
      radius: '2px',
      radiusBtn: '2px',
      glassBg: 'rgba(255, 255, 255, 0.1)',
      glassBlur: '40px',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      fontBody: "'Inter', sans-serif",
      fontDisplay: "'Inter', sans-serif",
      shadow: '0 4px 16px rgba(255, 255, 255, 0.2)'
    }
  },
  'hellish-fire': {
    id: 'hellish-fire',
    name: 'Hellish Fire',
    particleCount: 1000,
    colors: ['#f97316', '#dc2626', '#fbbf24'],
    speed: 0.8,
    ui: {
      radius: '8px',
      radiusBtn: '8px',
      glassBg: 'rgba(20, 0, 0, 0.6)',
      glassBlur: '8px',
      border: '1px solid rgba(220, 38, 38, 0.5)',
      fontBody: "'Inter', sans-serif",
      fontDisplay: "'Space Grotesk', sans-serif",
      shadow: '0 16px 48px rgba(220, 38, 38, 0.4)'
    }
  },
  ai: {
    id: 'ai',
    name: 'AI',
    particleCount: 2000,
    colors: ['#06b6d4', '#a855f7', '#3b82f6'],
    speed: 0.5,
    ui: {
      radius: '16px',
      radiusBtn: '12px',
      glassBg: 'rgba(255, 255, 255, 0.03)',
      glassBlur: '20px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      fontBody: "'Inter', sans-serif",
      fontDisplay: "'Space Grotesk', sans-serif",
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  },
  'sci-fi': {
    id: 'sci-fi',
    name: 'Sci-Fi',
    particleCount: 2500,
    colors: ['#d946ef', '#22d3ee', '#f472b6'],
    speed: 1.0,
    ui: {
      radius: '0px',
      radiusBtn: '0px',
      glassBg: 'rgba(0, 5, 20, 0.7)',
      glassBlur: '2px',
      border: '1px solid rgba(34, 211, 238, 0.6)',
      fontBody: "'JetBrains Mono', 'Courier New', monospace",
      fontDisplay: "'JetBrains Mono', 'Courier New', monospace",
      shadow: '0 0 20px rgba(34, 211, 238, 0.4)'
    }
  }
};

export const DEFAULT_THEME = 'ai';
