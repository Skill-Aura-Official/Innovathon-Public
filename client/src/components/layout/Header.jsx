import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/themes', label: 'Themes' },
  { to: '/theme-selector', label: 'Aesthetics' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="site-header" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(15, 10, 30, 0.8)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '64px'
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--theme-c1), var(--theme-c2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', color: 'white',
            boxShadow: '0 4px 12px color-mix(in srgb, var(--theme-c1) 30%, transparent)'
          }}>⚡</div>
          <span style={{
            fontSize: '18px', fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #f4f3f8, #c4abff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Innovathon</span>
        </Link>

        <nav className="nav-desktop">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.2s',
              color: location.pathname === link.to ? 'var(--theme-c1)' : '#9ca3af',
              background: location.pathname === link.to ? 'color-mix(in srgb, var(--theme-c1) 10%, transparent)' : 'transparent'
            }}>{link.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {user ? (
            <Link to="/dashboard" style={{
              padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', color: '#fff',
              background: 'linear-gradient(135deg, var(--theme-c1), var(--theme-c1))',
              boxShadow: '0 4px 16px color-mix(in srgb, var(--theme-c1) 30%, transparent)'
            }}>Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{
                padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', color: 'var(--theme-c1)',
                background: 'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border: '1px solid rgba(139,77,255,0.2)'
              }}>Login</Link>
              <Link to="/onboarding" style={{
                padding: '8px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                textDecoration: 'none', color: '#fff',
                background: 'linear-gradient(135deg, var(--theme-c1), var(--theme-c1))',
                boxShadow: '0 4px 16px color-mix(in srgb, var(--theme-c1) 30%, transparent)'
              }}>Register</Link>
            </>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-btn" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            style={{ background:'rgba(15,10,30,0.97)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'8px 24px 20px', overflow:'hidden' }}>
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{
                display:'block', padding:'14px 0', fontSize:'15px', fontWeight:500,
                textDecoration:'none', borderBottom:'1px solid rgba(255,255,255,0.04)',
                color: location.pathname === link.to ? 'var(--theme-c1)' : '#9ca3af'
              }}>{link.label}</Link>
            ))}
            <Link to="/leaderboard" onClick={() => setMobileOpen(false)} style={{
              display:'block', padding:'14px 0', fontSize:'15px', fontWeight:500,
              textDecoration:'none', color:'#9ca3af'
            }}>Leaderboard</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
