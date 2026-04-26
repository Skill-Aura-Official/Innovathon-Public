import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const THEMES = [
  { id: 'ai', name: 'AI (Neural Synthetix)', color: '#00F0FF', icon: '🧠' },
  { id: 'sci-fi', name: 'Sci-Fi (Cyber-Industrial)', color: '#39FF14', icon: '🚀' },
  { id: 'fire', name: 'Hellish Fire (Inferno)', color: '#FF3300', icon: '🔥' },
  { id: 'thunder', name: 'Thunderstorm (Tempest)', color: '#8A2BE2', icon: '⚡' },
  { id: 'ice', name: 'Ice Storm (Glacial)', color: '#A0E6FF', icon: '❄️' },
  { id: 'wind', name: 'Windy (Aero)', color: '#38BDF8', icon: '🌪️' },
  { id: 'anime', name: 'Anime (Neo-Tokyo Manga)', color: '#FF007F', icon: '💥' }
];

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" ref={containerRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 mb-2 w-72 bg-theme-surface/90 backdrop-blur-xl border border-theme-primary/30 p-2 shadow-2xl rounded-theme overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-theme-primary/20 mb-2">
              <h3 className="font-theme-header text-sm text-theme-secondary uppercase tracking-wider">Dimension Portal</h3>
              <p className="text-xs text-theme-text/60 mt-1 font-theme-body">Select reality matrix</p>
            </div>
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto pr-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    changeTheme(t.id);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => {
                    // Optional: Live preview on hover without saving
                    document.documentElement.setAttribute('data-theme', t.id);
                  }}
                  onMouseLeave={() => {
                    // Restore active theme when mouse leaves
                    document.documentElement.setAttribute('data-theme', theme);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-theme transition-all duration-200 ${
                    theme === t.id 
                      ? 'bg-theme-primary/20 text-theme-primary font-bold' 
                      : 'hover:bg-theme-primary/10 text-theme-text hover:text-theme-primary'
                  }`}
                >
                  <span className="text-xl" style={{ textShadow: theme === t.id ? `0 0 10px ${t.color}` : 'none' }}>
                    {t.icon}
                  </span>
                  <span className="text-sm font-theme-body">{t.name}</span>
                  {theme === t.id && (
                    <div className="ml-auto w-2 h-2 rounded-full" style={{ backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}` }} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center bg-theme-surface border border-theme-primary/50 shadow-lg relative overflow-hidden group"
        style={{
          boxShadow: `0 4px 20px -5px ${currentThemeObj.color}`
        }}
      >
        <div className="absolute inset-0 bg-theme-primary/10 group-hover:bg-theme-primary/20 transition-colors" />
        <span className="text-2xl relative z-10" style={{ filter: `drop-shadow(0 0 8px ${currentThemeObj.color})` }}>
          {currentThemeObj.icon}
        </span>
      </motion.button>
    </div>
  );
}
