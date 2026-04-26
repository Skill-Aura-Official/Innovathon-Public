import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submissionsAPI, teamsAPI } from '../services/api';

export default function Submission() {
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    githubLink: '',
    problem: '',
    solution: '',
    videoUrl: '',
    pptUrl: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const teamRes = await teamsAPI.getMyTeam();
      setTeam(teamRes.data.team);

      try {
        const subRes = await submissionsAPI.getMy();
        const s = subRes.data.submission;
        setExisting(s);
        setForm({
          githubLink: s.githubLink || '',
          problem: s.problem || '',
          solution: s.solution || '',
          videoUrl: s.videoUrl || '',
          pptUrl: s.pptUrl || ''
        });
      } catch { /* No existing submission */ }
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.githubLink || !form.problem || !form.solution) {
      setError('GitHub link, problem statement, and solution are required'); return;
    }
    if (form.problem.length < 50) {
      setError('Problem statement must be at least 50 characters'); return;
    }

    setSubmitting(true); setError('');
    try {
      await submissionsAPI.submit(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}><div className="spinner spinner-lg" /></div>;

  if (!team) return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <div className="glass-strong" style={{ padding:'48px 32px', textAlign:'center', maxWidth:'400px' }}>
        <div style={{ fontSize:'48px', marginBottom:'16px' }}>⚠️</div>
        <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f4f3f8', margin:'0 0 12px' }}>No Team Found</h2>
        <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 24px' }}>You need to register a team before submitting.</p>
        <button className="btn-primary" onClick={() => navigate('/onboarding')}>Register Team</button>
      </div>
    </div>
  );

  if (team.paymentStatus !== 'completed') return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <div className="glass-strong" style={{ padding:'48px 32px', textAlign:'center', maxWidth:'400px' }}>
        <div style={{ fontSize:'48px', marginBottom:'16px' }}>💳</div>
        <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f4f3f8', margin:'0 0 12px' }}>Payment Required</h2>
        <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 24px' }}>Complete payment before submitting your project.</p>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    </div>
  );

  if (success) return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass-strong" style={{ padding:'48px 32px', textAlign:'center', maxWidth:'450px' }}>
        <div style={{ fontSize:'64px', marginBottom:'16px' }}>🎉</div>
        <h2 style={{ fontSize:'24px', fontWeight:800, color:'#34d399', margin:'0 0 12px' }}>Submission Complete!</h2>
        <p style={{ color:'#9ca3af', fontSize:'15px', margin:'0 0 28px' }}>Your project has been submitted successfully. Good luck!</p>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </motion.div>
    </div>
  );

  return (
    <div className="page-with-header" style={{ padding:'88px 24px 24px', maxWidth:'700px', margin:'0 auto' }}>
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        <button onClick={() => navigate('/dashboard')} style={{ background:'none', border:'none', color:'#6b7280', fontSize:'13px', cursor:'pointer', marginBottom:'8px', fontFamily:'inherit' }}>← Dashboard</button>
        <h1 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:'0 0 4px' }}>📤 Project Submission</h1>
        <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 32px' }}>Team: <strong style={{ color:'var(--theme-c1)' }}>{team.teamName}</strong> {existing && <span style={{ color:'#fbbf24' }}>• Updating existing submission</span>}</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="glass-strong" style={{ padding:'32px', marginBottom:'24px' }}>
          {/* GitHub Link */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ fontSize:'13px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'8px' }}>GITHUB REPOSITORY *</label>
            <input type="url" value={form.githubLink} onChange={e => setForm({...form, githubLink: e.target.value})} className="input-field" placeholder="https://github.com/your-repo" required />
          </div>

          {/* Problem Statement */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ fontSize:'13px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'8px' }}>PROBLEM STATEMENT * <span style={{ color:'#4b5563', fontWeight:400 }}>(min 50 chars)</span></label>
            <textarea value={form.problem} onChange={e => setForm({...form, problem: e.target.value})} className="input-field" placeholder="Describe the problem you're solving..." rows={4} style={{ resize:'vertical', minHeight:'100px' }} required />
            <div style={{ fontSize:'11px', color:'#4b5563', marginTop:'4px', textAlign:'right' }}>{form.problem.length} chars</div>
          </div>

          {/* Solution */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ fontSize:'13px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'8px' }}>SOLUTION DESCRIPTION * <span style={{ color:'#4b5563', fontWeight:400 }}>(max 2000 chars)</span></label>
            <textarea value={form.solution} onChange={e => setForm({...form, solution: e.target.value.slice(0,2000)})} className="input-field" placeholder="Describe your solution and approach..." rows={5} style={{ resize:'vertical', minHeight:'120px' }} required />
            <div style={{ fontSize:'11px', color:'#4b5563', marginTop:'4px', textAlign:'right' }}>{form.solution.length}/2000</div>
          </div>

          {/* Video URL */}
          <div style={{ marginBottom:'24px' }}>
            <label style={{ fontSize:'13px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'8px' }}>VIDEO DEMO URL <span style={{ color:'#4b5563', fontWeight:400 }}>(Google Drive / YouTube)</span></label>
            <input type="url" value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} className="input-field" placeholder="https://drive.google.com/..." />
          </div>

          {/* PPT URL */}
          <div>
            <label style={{ fontSize:'13px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'8px' }}>PRESENTATION URL <span style={{ color:'#4b5563', fontWeight:400 }}>(Google Drive link)</span></label>
            <input type="url" value={form.pptUrl} onChange={e => setForm({...form, pptUrl: e.target.value})} className="input-field" placeholder="https://drive.google.com/..." />
          </div>
        </motion.div>

        {error && <div style={{ marginBottom:'16px', padding:'12px 16px', borderRadius:'10px', background:'rgba(251,113,133,0.08)', border:'1px solid rgba(251,113,133,0.2)', color:'#fb7185', fontSize:'13px' }}>{error}</div>}

        <div style={{ display:'flex', gap:'12px' }}>
          <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={submitting} style={{ flex:1 }}>
            {submitting ? <span style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center' }}><span className="spinner" style={{ width:18, height:18, borderWidth:2 }} />Submitting...</span> : existing ? 'Update Submission' : 'Submit Project 🚀'}
          </button>
        </div>
      </form>
    </div>
  );
}
