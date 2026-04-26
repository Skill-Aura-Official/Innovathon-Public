import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { teamsAPI } from '../services/api';

export default function Dashboard() {
  const { user, logout, themeConfig } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchTeam(); }, []);

  const fetchTeam = async () => {
    try {
      const res = await teamsAPI.getMyTeam();
      setTeam(res.data.team);
    } catch (err) {
      if (err.status === 404) setTeam(null);
      else setError(err.message || 'Failed to load team data');
    } finally { setLoadingTeam(false); }
  };

  const handleLogout = async () => { await logout(); navigate('/login'); };

  const anim = { hidden: { opacity:0 }, show: { opacity:1, transition: { staggerChildren:0.08 } } };
  const item = { hidden: { opacity:0, y:15 }, show: { opacity:1, y:0 } };

  return (
    <div className="page-with-header" style={{ padding:'88px 24px 24px', maxWidth:'1000px', margin:'0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'40px', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'var(--text)', margin:'0 0 4px' }}>Dashboard</h1>
          <p style={{ color:'var(--muted)', fontSize:'14px', margin:0 }}>Welcome back, <strong style={{ color:'var(--theme-c1)' }}>{user?.name || user?.displayName || 'Participant'}</strong></p>
        </div>
        <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
          {user?.photoURL && <img src={user.photoURL} alt="Profile" style={{ width:'40px', height:'40px', borderRadius:'12px', border:'2px solid rgba(139,77,255,0.3)' }} />}
          <button className="btn-secondary" onClick={handleLogout} style={{ padding:'8px 16px', fontSize:'13px' }}>Logout</button>
        </div>
      </motion.div>

      <motion.div variants={anim} initial="hidden" animate="show">
        {/* Status Cards */}
        <motion.div variants={item} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px', marginBottom:'32px' }}>
          <div className="glass-card" style={{ padding:'20px' }}>
            <div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Role</div>
            <div style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', textTransform:'capitalize' }}>{user?.role || 'Team'}</div>
          </div>
          <div className="glass-card" style={{ padding:'20px' }}>
            <div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Team</div>
            <div style={{ fontSize:'20px', fontWeight:700, color: team ? '#34d399' : '#fbbf24' }}>{loadingTeam ? '...' : team ? team.teamName : 'Not Registered'}</div>
          </div>
          <div className="glass-card" style={{ padding:'20px' }}>
            <div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Payment</div>
            <div style={{ fontSize:'20px', fontWeight:700, color: team?.paymentStatus==='completed' ? '#34d399' : '#fb7185' }}>
              {loadingTeam ? '...' : team ? (team.paymentStatus==='completed' ? 'Paid ✓' : 'Pending') : '—'}
            </div>
          </div>
          <div className="glass-card" style={{ padding:'20px' }}>
            <div style={{ fontSize:'12px', color:'var(--muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'8px' }}>Theme</div>
            <div style={{ fontSize:'20px', fontWeight:700, color:'var(--theme-c1)' }}>{themeConfig?.name || 'AI'}</div>
          </div>
        </motion.div>

        {/* No Team CTA */}
        {!loadingTeam && !team && (
          <motion.div variants={item} className="glass-strong" style={{ padding:'48px 32px', textAlign:'center', marginBottom:'32px' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>🎯</div>
            <h2 style={{ fontSize:'24px', fontWeight:700, color:'var(--text)', margin:'0 0 12px' }}>Ready to Compete?</h2>
            <p style={{ color:'var(--muted)', fontSize:'15px', margin:'0 0 28px', maxWidth:'400px', marginLeft:'auto', marginRight:'auto', lineHeight:1.6 }}>Register your team now to participate in Innovathon. Form a team of 3, choose your track, and start building!</p>
            <button className="btn-primary" onClick={() => navigate('/onboarding')} style={{ fontSize:'16px', padding:'14px 32px' }}>
              Start Registration →
            </button>
          </motion.div>
        )}

        {/* Team Details */}
        {team && (
          <motion.div variants={item} className="glass-strong" style={{ padding:'32px', marginBottom:'32px' }}>
            <h2 style={{ fontSize:'20px', fontWeight:700, color:'var(--text)', margin:'0 0 24px' }}>🏠 Team: {team.teamName}</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'20px' }}>
              <div style={{ gridColumn: '1 / -1', background: 'color-mix(in srgb, var(--theme-c1) 10%, transparent)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139,77,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--theme-c1)', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase' }}>Invite Code</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', letterSpacing: '2px' }}>{team.inviteCode || 'N/A'}</div>
                </div>
                <button className="btn-secondary" onClick={() => { navigator.clipboard.writeText(team.inviteCode); alert('Copied to clipboard!'); }} style={{ padding: '8px 16px', fontSize: '13px' }}>
                  Copy Code
                </button>
              </div>
              <div><div style={{ fontSize:'12px', color:'var(--muted)', marginBottom:'6px', fontWeight:600 }}>Hackathon Theme</div><div style={{ color:'var(--text)', fontSize:'15px' }}>{team.hackathonTheme}</div></div>
              <div><div style={{ fontSize:'12px', color:'var(--muted)', marginBottom:'6px', fontWeight:600 }}>Visual Theme</div><div style={{ color:'var(--text)', fontSize:'15px', textTransform:'capitalize' }}>{team.visualTheme}</div></div>
              <div><div style={{ fontSize:'12px', color:'var(--muted)', marginBottom:'6px', fontWeight:600 }}>Team Lead</div><div style={{ color:'var(--text)', fontSize:'15px' }}>{team.teamLeadId?.name || 'You'}</div></div>
              <div><div style={{ fontSize:'12px', color:'var(--muted)', marginBottom:'6px', fontWeight:600 }}>Members</div><div style={{ color:'var(--text)', fontSize:'15px' }}>{(team.memberIds?.length || 0) + 1} total</div></div>
            </div>
            {team.paymentStatus !== 'completed' && (
              <div style={{ marginTop:'24px', padding:'16px', borderRadius:'12px', background:'rgba(251,191,36,0.08)', border:'1px solid rgba(251,191,36,0.2)', fontSize:'14px', color:'#fbbf24' }}>
                ⚠️ Payment is pending. Complete payment to participate.
              </div>
            )}
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div variants={item} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
          <button className="glass-card" onClick={() => navigate('/leaderboard')} style={{ padding:'24px', textAlign:'left', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', color:'inherit', fontFamily:'inherit' }}>
            <div style={{ fontSize:'24px', marginBottom:'8px' }}>🏆</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>Leaderboard</div>
            <div style={{ fontSize:'13px', color:'var(--muted)', marginTop:'4px' }}>View team rankings</div>
          </button>

          {team && (
            <button className="glass-card" onClick={() => navigate('/submission')} style={{ padding:'24px', textAlign:'left', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', color:'inherit', fontFamily:'inherit' }}>
              <div style={{ fontSize:'24px', marginBottom:'8px' }}>📤</div>
              <div style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>Submit Project</div>
              <div style={{ fontSize:'13px', color:'var(--muted)', marginTop:'4px' }}>Upload your project</div>
            </button>
          )}

          <button className="glass-card" onClick={() => navigate('/theme-selector')} style={{ padding:'24px', textAlign:'left', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', color:'inherit', fontFamily:'inherit' }}>
            <div style={{ fontSize:'24px', marginBottom:'8px' }}>🎨</div>
            <div style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>Themes</div>
            <div style={{ fontSize:'13px', color:'var(--muted)', marginTop:'4px' }}>Customize your look</div>
          </button>

          {user?.role === 'admin' && (
            <button className="glass-card" onClick={() => navigate('/admin')} style={{ padding:'24px', textAlign:'left', cursor:'pointer', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)', color:'inherit', fontFamily:'inherit' }}>
              <div style={{ fontSize:'24px', marginBottom:'8px' }}>⚙️</div>
              <div style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>Admin Panel</div>
              <div style={{ fontSize:'13px', color:'var(--muted)', marginTop:'4px' }}>Manage platform</div>
            </button>
          )}
        </motion.div>
      </motion.div>

      {error && <div className="toast toast-error">{error}</div>}
    </div>
  );
}
