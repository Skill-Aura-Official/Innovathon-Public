import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../services/api';

const TRACK_COLORS = { 'Cyber Security':'var(--theme-c1)', 'AI/ML':'var(--theme-c2)', 'FinTech':'#f472b6', 'EdTech':'#fbbf24', 'Healthcare':'#34d399', 'Agriculture':'#f87171', 'Open Innovation':'#c084fc' };

export default function Admin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('teams');
  const [stats, setStats] = useState(null);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ hackathonTheme: '', paymentStatus: '', search: '' });
  const [selectedTeam, setSelectedTeam] = useState(null);

  const loadStats = useCallback(async () => {
    try {
      const res = await adminAPI.getStats();
      setStats(res.data.stats);
    } catch (err) { setError(err.message); }
  }, []);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getTeams(filters);
      setTeams(res.data.teams);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [filters]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getUsers();
      setUsers(res.data.users);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const handleExportCSV = async () => {
    try {
      const res = await adminAPI.exportCSV();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a'); a.href = url; a.download = 'innovathon-teams.csv';
      document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url);
    } catch { setError('Export failed'); }
  };

  useEffect(() => { if (tab === 'users') loadUsers(); else loadTeams(); }, [tab, loadUsers, loadTeams]);

  const statCards = stats ? [
    { label: 'Total Teams', value: stats.totalTeams, color: 'var(--theme-c1)', icon: '👥' },
    { label: 'Total Users', value: stats.totalUsers, color: 'var(--theme-c2)', icon: '👤' },
    { label: 'Paid Teams', value: stats.paidTeams, color: '#34d399', icon: '✅' },
    { label: 'Pending', value: stats.pendingPayments, color: '#fbbf24', icon: '⏳' },
    { label: 'Submissions', value: stats.submissions, color: '#f472b6', icon: '📄' },
  ] : [];

  return (
    <div className="page-with-header" style={{ padding:'88px 24px 24px', maxWidth:'1200px', margin:'0 auto' }}>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'32px', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <button onClick={() => navigate('/dashboard')} style={{ background:'none', border:'none', color:'#6b7280', fontSize:'13px', cursor:'pointer', marginBottom:'8px', fontFamily:'inherit' }}>← Dashboard</button>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:0 }}>⚙️ Admin Panel</h1>
        </div>
        <button className="btn-secondary" onClick={handleExportCSV} style={{ padding:'10px 20px', fontSize:'13px' }}>📥 Export CSV</button>
      </motion.div>

      {/* Stats */}
      {stats && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'12px', marginBottom:'32px' }}>
          {statCards.map(s => (
            <div key={s.label} className="glass-card" style={{ padding:'18px', textAlign:'center' }}>
              <div style={{ fontSize:'24px', marginBottom:'6px' }}>{s.icon}</div>
              <div style={{ fontSize:'24px', fontWeight:800, color:s.color, fontFamily:"'Space Grotesk',sans-serif" }}>{s.value}</div>
              <div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginTop:'4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tabs */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
        {['teams','users'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:'10px 24px', borderRadius:'10px', fontSize:'14px', fontWeight:600, border:'none', cursor:'pointer', fontFamily:'inherit', textTransform:'capitalize', transition:'all 0.2s',
            background: tab===t ? 'color-mix(in srgb, var(--theme-c1) 15%, transparent)' : 'rgba(255,255,255,0.04)',
            color: tab===t ? 'var(--theme-c1)' : '#6b7280'
          }}>{t}</button>
        ))}
      </div>

      {/* Filters (teams tab) */}
      {tab === 'teams' && (
        <div style={{ display:'flex', gap:'12px', marginBottom:'20px', flexWrap:'wrap' }}>
          <input value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} className="input-field" placeholder="Search teams..." style={{ maxWidth:'240px', padding:'10px 14px', fontSize:'13px' }} />
          <select value={filters.hackathonTheme} onChange={e => setFilters({...filters, hackathonTheme: e.target.value})} className="select-field" style={{ maxWidth:'200px', padding:'10px 14px', fontSize:'13px' }}>
            <option value="">All Themes</option>
            {['Cyber Security','AI/ML','FinTech','EdTech','Healthcare','Agriculture','Open Innovation'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filters.paymentStatus} onChange={e => setFilters({...filters, paymentStatus: e.target.value})} className="select-field" style={{ maxWidth:'160px', padding:'10px 14px', fontSize:'13px' }}>
            <option value="">All Payments</option>
            <option value="completed">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      )}

      {/* Teams Table */}
      {tab === 'teams' && (
        <div className="glass" style={{ overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 100px 80px 100px 100px 80px', padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', fontSize:'11px', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px' }}>
            <div>Team</div><div>Theme</div><div>Members</div><div>Payment</div><div>Aesthetic</div><div>Actions</div>
          </div>
          {loading ? (
            <div style={{ padding:'40px', textAlign:'center' }}><div className="spinner" style={{ margin:'0 auto' }} /></div>
          ) : teams.length === 0 ? (
            <div style={{ padding:'40px', textAlign:'center', color:'#6b7280' }}>No teams found</div>
          ) : teams.map(t => (
            <div key={t._id} style={{ display:'grid', gridTemplateColumns:'1fr 100px 80px 100px 100px 80px', padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:'14px', fontWeight:600, color:'#f4f3f8' }}>{t.teamName}</div>
                <div style={{ fontSize:'11px', color:'#4b5563' }}>{t.teamLeadId?.name || 'N/A'}</div>
              </div>
              <div><span style={{ padding:'3px 8px', borderRadius:'6px', background:`${TRACK_COLORS[t.hackathonTheme]||'#666'}10`, color:TRACK_COLORS[t.hackathonTheme]||'#666', fontSize:'11px', fontWeight:600 }}>{t.hackathonTheme}</span></div>
              <div style={{ fontSize:'13px', color:'#9ca3af' }}>{(t.memberIds?.length || 0) + 1}</div>
              <div><span style={{ padding:'3px 8px', borderRadius:'6px', fontSize:'11px', fontWeight:600, background: t.paymentStatus==='completed' ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)', color: t.paymentStatus==='completed' ? '#34d399' : '#fbbf24' }}>{t.paymentStatus==='completed' ? 'Paid' : 'Pending'}</span></div>
              <div style={{ fontSize:'12px', color:'#9ca3af', textTransform:'capitalize' }}>{t.visualTheme}</div>
              <div><button onClick={() => setSelectedTeam(selectedTeam?._id===t._id ? null : t)} style={{ background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', color:'var(--theme-c1)', borderRadius:'8px', padding:'4px 10px', fontSize:'11px', cursor:'pointer' }}>View</button></div>
            </div>
          ))}
        </div>
      )}

      {/* Users Table */}
      {tab === 'users' && (
        <div className="glass" style={{ overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 100px 140px', padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', fontSize:'11px', fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px' }}>
            <div>Name</div><div>Email</div><div>Role</div><div>Joined</div>
          </div>
          {loading ? (
            <div style={{ padding:'40px', textAlign:'center' }}><div className="spinner" style={{ margin:'0 auto' }} /></div>
          ) : users.map(u => (
            <div key={u._id} style={{ display:'grid', gridTemplateColumns:'1fr 1fr 100px 140px', padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.03)', alignItems:'center' }}>
              <div style={{ fontSize:'14px', fontWeight:600, color:'#f4f3f8' }}>{u.name}</div>
              <div style={{ fontSize:'13px', color:'#9ca3af' }}>{u.email}</div>
              <div><span style={{ padding:'3px 8px', borderRadius:'6px', fontSize:'11px', fontWeight:600, textTransform:'capitalize', background: u.role==='admin' ? 'rgba(251,113,133,0.1)' : u.role==='judge' ? 'color-mix(in srgb, var(--theme-c2) 10%, transparent)' : 'color-mix(in srgb, var(--theme-c1) 10%, transparent)', color: u.role==='admin' ? '#fb7185' : u.role==='judge' ? 'var(--theme-c2)' : 'var(--theme-c1)' }}>{u.role}</span></div>
              <div style={{ fontSize:'12px', color:'#4b5563' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Team Detail Modal */}
      {selectedTeam && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:'24px' }} onClick={() => setSelectedTeam(null)}>
          <motion.div initial={{ scale:0.95 }} animate={{ scale:1 }} className="glass-strong" style={{ padding:'32px', maxWidth:'500px', width:'100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
              <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f4f3f8', margin:0 }}>{selectedTeam.teamName}</h2>
              <button onClick={() => setSelectedTeam(null)} style={{ background:'none', border:'none', color:'#6b7280', fontSize:'20px', cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ display:'grid', gap:'16px' }}>
              <div><div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', marginBottom:'4px' }}>Quest</div><div style={{ color:'#e2e0e8' }}>{selectedTeam.hackathonTheme}</div></div>
              <div><div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', marginBottom:'4px' }}>Aesthetic</div><div style={{ color:'#e2e0e8', textTransform:'capitalize' }}>{selectedTeam.visualTheme}</div></div>
              <div><div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', marginBottom:'4px' }}>Lead</div><div style={{ color:'#e2e0e8' }}>{selectedTeam.teamLeadId?.name} ({selectedTeam.teamLeadId?.email})</div></div>
              <div><div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', marginBottom:'4px' }}>Members</div>
                {selectedTeam.memberIds?.map(m => <div key={m._id} style={{ color:'#e2e0e8', fontSize:'13px', marginBottom:'4px' }}>{m.name} — {m.email}</div>)}
                {(!selectedTeam.memberIds || selectedTeam.memberIds.length === 0) && <div style={{ color:'#4b5563', fontSize:'13px' }}>No additional members</div>}
              </div>
              <div><div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', marginBottom:'4px' }}>Payment</div><div style={{ color: selectedTeam.paymentStatus==='completed' ? '#34d399' : '#fbbf24', fontWeight:600 }}>{selectedTeam.paymentStatus}</div></div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {error && <div className="toast toast-error">{error}</div>}
    </div>
  );
}
