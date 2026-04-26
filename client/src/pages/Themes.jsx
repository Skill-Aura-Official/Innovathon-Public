import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HACKATHON_THEMES } from '../config/hackathonThemes';

export default function Themes() {
  const navigate = useNavigate();

  return (
    <div className="page-with-header">
      <section style={{ padding: '80px 24px 40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '100px',
            background: 'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border: '1px solid rgba(139,77,255,0.2)',
            fontSize: '12px', fontWeight: 600, color: 'var(--theme-c1)', marginBottom: '24px'
          }}>
            7 PROBLEM DOMAINS
          </span>
          <h1 className="section-title" style={{ textAlign: 'center' }}>Hackathon Themes</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Choose a problem domain to focus your project on. Your team will build a solution
            that addresses a real-world challenge within one of these categories.
          </p>
        </motion.div>
      </section>

      <section style={{ padding: '0 24px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {HACKATHON_THEMES.map((theme, i) => (
            <motion.div key={theme.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              
              {/* Header banner */}
              <div style={{
                height: '140px',
                backgroundImage: `url(${theme.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'relative'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))` }} />
                <div style={{ position: 'absolute', inset: 0, background: `${theme.color}40` }} />
                <span style={{ fontSize: '48px', position: 'relative', zIndex: 10 }}>{theme.emoji}</span>
                <div style={{ position: 'absolute', bottom: '10px', right: '16px', zIndex: 10 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: theme.color, boxShadow: `0 0 12px ${theme.color}` }} />
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f4f3f8', margin: '0 0 6px' }}>{theme.name}</h3>
                <div style={{ fontSize: '12px', color: theme.color, fontWeight: 600, letterSpacing: '0.5px', marginBottom: '12px' }}>
                  {theme.shortDesc}
                </div>
                <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, margin: '0 0 20px' }}>
                  {theme.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {theme.skills.map((skill, si) => (
                    <span key={si} style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                      background: 'rgba(255,255,255,0.05)', color: '#e2e0e8', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Info */}
      <section className="section section-centered">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="glass-strong" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f4f3f8', margin: '0 0 12px' }}>How It Works</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: 1.7, margin: '0 0 16px' }}>
            When registering your team, you'll need to select one of these <strong style={{ color: '#f4f3f8' }}>7 problem domains</strong>.
            Your final project must address a problem within this category. You can change your theme before the hackathon begins.
          </p>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
            Note: These are the hackathon problem domains. You will also get to pick a "Visual Theme" (like Cyberpunk or Anime) for your dashboard aesthetic!
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ padding: '20px 24px 80px', textAlign: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('/onboarding')} style={{ fontSize: '15px', padding: '14px 32px' }}>
          Register Your Team
        </button>
      </section>
    </div>
  );
}
