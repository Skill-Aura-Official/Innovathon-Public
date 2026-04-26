import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { THEMES } from '../config/themes';
import ThemePreview from '../components/ui/ThemePreview';

const THEME_DESCRIPTIONS = {
  windy: 'Gentle breezes and flowing particles. A calm, airy aesthetic.',
  anime: 'Sakura petals and sparkles. Soft pinks and gold.',
  thunderstorm: 'Dark skies with electric lightning. Bold and dramatic.',
  ice: 'Crystal particles and frost. Cool blues and whites.',
  hellish: 'Ember particles and fire glow. Intense reds and oranges.',
  ai: 'Neural network nodes and data pulses. Cyan and purple tech.',
  'sci-fi': 'Neon grids and hyperspace trails. Futuristic and vibrant.'
};

const THEME_EMOJIS = {
  windy: '🌬️', anime: '🌸', thunderstorm: '⛈️', ice: '❄️',
  hellish: '🔥', ai: '🤖', 'sci-fi': '🚀'
};

export default function ThemeSelector() {
  const navigate = useNavigate();
  const { theme, changeTheme } = useAuth();

  return (
    <div className="page-with-header" style={{ padding:'88px 24px 24px', maxWidth:'900px', margin:'0 auto' }}>
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#6b7280', fontSize:'13px', cursor:'pointer', marginBottom:'8px', fontFamily:'inherit' }}>← Back</button>
        <h1 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:'0 0 8px' }}>🎨 Choose Your Theme</h1>
        <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 40px' }}>Each theme transforms the entire visual experience of Innovathon.</p>
      </motion.div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'16px' }}>
        {Object.entries(THEMES).map(([id, config], i) => (
          <motion.button
            key={id}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => changeTheme(id)}
            className="glass-card"
            style={{
              padding:'28px 24px',
              textAlign:'left',
              cursor:'pointer',
              fontFamily:'inherit',
              color:'inherit',
              position:'relative',
              overflow:'hidden',
              border: theme === id ? '2px solid rgba(139,77,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
              background: theme === id ? 'color-mix(in srgb, var(--theme-c1) 10%, transparent)' : 'rgba(255,255,255,0.03)'
            }}
          >
            {/* Color preview bar */}
            <div style={{ display:'flex', gap:'4px', marginBottom:'16px' }}>
              {config.colors.map((color, ci) => (
                <div key={ci} style={{
                  flex:1, height:'6px', borderRadius:'3px', background:color,
                  boxShadow: `0 0 12px ${color}40`
                }} />
              ))}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
              <span style={{ fontSize:'24px' }}>{THEME_EMOJIS[id]}</span>
              <h3 style={{ fontSize:'18px', fontWeight:700, color:'#f4f3f8', margin:0 }}>{config.name}</h3>
            </div>

            <p style={{ color:'#6b7280', fontSize:'13px', lineHeight:1.5, margin:0 }}>
              {THEME_DESCRIPTIONS[id]}
            </p>

            {/* Active badge */}
            {theme === id && (
              <div style={{
                position:'absolute', top:'12px', right:'12px',
                padding:'4px 10px', borderRadius:'6px',
                background:'color-mix(in srgb, var(--theme-c1) 20%, transparent)', color:'var(--theme-c1)',
                fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px'
              }}>
                Active
              </div>
            )}

            {/* Background preview */}
            <div style={{
              marginTop:'16px', height:'80px', borderRadius:'10px',
              border:'1px solid rgba(255,255,255,0.04)',
              position: 'relative', overflow: 'hidden',
              background: `linear-gradient(135deg, ${config.colors[0]}20, ${config.colors[1]}15, transparent)`
            }}>
              <ThemePreview config={config} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#f4f3f8', fontWeight: 600, zIndex: 10 }}>
                {config.particleCount} particles • {config.speed}x speed
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} style={{ textAlign:'center', color:'#4b5563', fontSize:'12px', marginTop:'32px' }}>
        Theme selection is saved automatically and persists across sessions.
      </motion.p>
    </div>
  );
}
