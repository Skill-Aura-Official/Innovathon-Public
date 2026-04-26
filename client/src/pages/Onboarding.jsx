import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { teamsAPI, authAPI, paymentAPI } from '../services/api';
import { THEMES } from '../config/themes';
import { HACKATHON_THEMES } from '../config/hackathonThemes';
import ThemePreview from '../components/ui/ThemePreview';

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, changeTheme, isAuthenticated, register, googleSignIn, appleSignIn } = useAuth();
  
  const [step, setStep] = useState(0); // 0 = Account, 1 = Team Name, 2 = Members, 3 = Theme, 4 = Review
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Team Form
  const [formData, setFormData] = useState({
    teamName: '',
    members: [],
    hackathonTheme: '',
    visualTheme: 'ai',
    inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase()
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [recruitMethod, setRecruitMethod] = useState(''); // 'invite' or 'direct'

  const [authFormData, setAuthFormData] = useState({ name: '', username: '', email: '', password: '' });
  const [authLoading, setAuthLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(''); // 'checking' | 'available' | 'taken' | ''

  // Initialize
  useEffect(() => {
    if (isAuthenticated && step === 0) {
      setStep(1); // Proceed to Team Name if already logged in
    }
  }, [isAuthenticated, step]);

  // Debounced username availability check
  useEffect(() => {
    if (authFormData.username.length < 3) { setUsernameStatus(''); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(authFormData.username)) { setUsernameStatus('invalid'); return; }

    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      try {
        const res = await authAPI.checkUsername(authFormData.username);
        setUsernameStatus(res.data.available ? 'available' : 'taken');
      } catch {
        setUsernameStatus('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [authFormData.username]);

  const nextStep = () => {
    setError('');
    if (step === 1 && (formData.teamName.length < 3 || formData.teamName.length > 30)) {
      setError('Guild name must be 3-30 characters'); return;
    }
    if (step === 3 && !formData.hackathonTheme) {
      setError('Please choose a quest (Hackathon Theme)'); return;
    }
    setStep(s => Math.min(s + 1, 4));
  };
  
  const prevStep = () => { 
    setError(''); 
    setStep(s => Math.max(s - 1, isAuthenticated ? 1 : 0)); 
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!authFormData.name.trim()) return setError('Please enter your true name');
    if (authFormData.username.length < 3) return setError('Alias must be at least 3 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(authFormData.username)) return setError('Alias can only contain letters, numbers, and underscores');
    if (usernameStatus === 'taken') return setError('Alias is already claimed by another hero');
    if (!authFormData.email.includes('@')) return setError('Please enter a valid raven messenger (email)');
    if (authFormData.password.length < 6) return setError('Secret incantation must be at least 6 characters');

    setAuthLoading(true);
    try {
      await register({
        name: authFormData.name.trim(),
        username: authFormData.username.trim(),
        email: authFormData.email.trim(),
        password: authFormData.password
      });
      setStep(1);
    } catch (err) {
      setError(err.message || 'Registration failed. The magic fizzled out.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true); setError('');
    try { await googleSignIn(); setStep(1); }
    catch (err) { setError(err.code === 'auth/popup-closed-by-user' ? 'Sign-in cancelled.' : err.message); }
    finally { setGoogleLoading(false); }
  };

  const handleAppleAuth = async () => {
    setAppleLoading(true); setError('');
    try { await appleSignIn(); setStep(1); }
    catch (err) { setError(err.code === 'auth/popup-closed-by-user' ? 'Sign-in cancelled.' : err.message); }
    finally { setAppleLoading(false); }
  };

  const handleSearchMembers = async (query) => {
    setSearchQuery(query);
    if (query.length < 3) { setSearchResults([]); return; }
    setSearchLoading(true);
    try {
      const res = await authAPI.searchUsers(query);
      setSearchResults(res.data.users.filter(u =>
        u.email !== user.email && !formData.members.find(m => m._id === u._id)
      ));
    } catch (err) { console.error('Search failed:', err); }
    finally { setSearchLoading(false); }
  };

  const addMember = (member) => {
    if (formData.members.length >= 2) { setError('Maximum 2 additional members'); return; }
    setFormData({ ...formData, members: [...formData.members, member] });
    setSearchQuery(''); setSearchResults([]); setError('');
  };

  const removeMember = (id) => {
    setFormData({ ...formData, members: formData.members.filter(m => m._id !== id) });
  };

  const handlePayment = async () => {
    setLoading(true); setError('');
    try {
      // Create team
      await teamsAPI.create({
        teamName: formData.teamName,
        memberIds: formData.members.map(m => m._id),
        hackathonTheme: formData.hackathonTheme,
        visualTheme: formData.visualTheme,
        inviteCode: formData.inviteCode
      });

      // Create order
      const orderRes = await paymentAPI.createOrder();
      const order = orderRes.data.order;

      // Razorpay
      if (typeof window.Razorpay !== 'undefined') {
        const rzp = new window.Razorpay({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo',
          amount: order.amount,
          currency: order.currency,
          name: 'Innovathon',
          description: 'Team Registration Fee',
          order_id: order.id,
          handler: async (response) => {
            await paymentAPI.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });
            setPaymentDone(true);
          },
          theme: { color: 'var(--theme-c1)' }
        });
        rzp.open();
      } else {
        await paymentAPI.verifyPayment({
          razorpayOrderId: order.id,
          razorpayPaymentId: 'pay_dev_' + Date.now(),
          signature: 'dev_signature'
        });
        setPaymentDone(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Payment failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleFinish = () => {
    changeTheme(formData.visualTheme);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="glass-strong" style={{ padding:'40px 36px', width:'100%', maxWidth:'600px', position: 'relative', overflow: 'hidden' }}>
        
        {step >= 0 && step <= 4 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--theme-c1)', textTransform: 'uppercase', letterSpacing: '1px' }}>Level {step} / 4</span>
              <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>{Math.round(((step) / 4) * 100)}% EXP</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${((step) / 4) * 100}%` }} transition={{ duration: 0.4 }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--theme-c1), var(--theme-c2))', boxShadow: '0 0 10px color-mix(in srgb, var(--theme-c1) 50%, transparent)' }} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">

          <motion.div key={step} variants={{ enter: { opacity: 0, x: 30 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } }} initial="enter" animate="center" exit="exit" transition={{ duration:0.25 }} style={{ minHeight:'300px' }}>
            
            {/* STEP 0: ACCOUNT CREATION */}
            {step === 0 && (
              <div>
                <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 8px' }}>Awaken, Hero</h2>
                <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 32px' }}>Forge your identity before entering the realm.</p>
                
                <div style={{ display:'flex', gap:'16px', marginBottom:'24px' }}>
                  <button onClick={handleGoogleAuth} disabled={googleLoading} className="btn-google" style={{ flex:1, padding:'14px' }}>
                    <svg style={{ width:20, height:20 }} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    Google
                  </button>
                  <button onClick={handleAppleAuth} disabled={appleLoading} className="btn-secondary" style={{ flex:1, padding:'14px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#fff', color:'#000', border:'none', borderRadius:'8px', fontWeight:600 }}>
                    <svg style={{ width:20, height:20 }} viewBox="0 0 384 512"><path fill="#000" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                    Apple
                  </button>
                </div>

                <div style={{ display:'flex', alignItems:'center', gap:'16px', margin:'24px 0' }}>
                  <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
                  <span style={{ fontSize:'12px', color:'var(--muted)', fontWeight:500, letterSpacing:'1px', textTransform:'uppercase' }}>or use ancient magic</span>
                  <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
                </div>

                <form onSubmit={handleRegister} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>True Name</label>
                    <input type="text" value={authFormData.name} onChange={e => setAuthFormData({...authFormData, name: e.target.value})} className="input-field" placeholder="e.g. John Doe" />
                  </div>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Alias (Username)</label>
                    <input type="text" value={authFormData.username} onChange={e => setAuthFormData({...authFormData, username: e.target.value})} className="input-field" placeholder="e.g. dragon_slayer" maxLength={20} />
                    {usernameStatus === 'taken' && <div style={{ fontSize:'12px', color:'#fb7185', marginTop:'4px' }}>✗ Claimed by another</div>}
                    {usernameStatus === 'available' && <div style={{ fontSize:'12px', color:'#34d399', marginTop:'4px' }}>✓ Available</div>}
                  </div>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Raven Messenger (Email)</label>
                    <input type="email" value={authFormData.email} onChange={e => setAuthFormData({...authFormData, email: e.target.value})} className="input-field" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label style={{ fontSize:'12px', fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Secret Incantation (Password)</label>
                    <input type="password" value={authFormData.password} onChange={e => setAuthFormData({...authFormData, password: e.target.value})} className="input-field" placeholder="Min 6 characters" />
                  </div>
                  <button type="submit" className="btn-primary" disabled={authLoading || usernameStatus === 'taken'} style={{ marginTop:'12px', padding:'16px' }}>
                    {authLoading ? <span className="spinner" style={{ display:'inline-block', width:18, height:18 }} /> : 'Forge Identity'}
                  </button>
                  <button type="button" onClick={() => navigate('/')} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:'14px', cursor:'pointer', fontWeight: 600, marginTop: '8px' }}>
                    ← Return to Home
                  </button>
                </form>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 8px' }}>Name Your Guild</h2>
                <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 32px' }}>Every legendary party needs a name. What shall your team be called?</p>
                <div style={{ background: 'rgba(139,77,255,0.05)', border: '1px solid rgba(139,77,255,0.15)', padding: '24px', borderRadius: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--theme-c1)', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>Team Name</label>
                  <input type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} className="input-field" placeholder="e.g. Knights of the Node" maxLength={30} autoFocus style={{ fontSize: '18px', padding: '16px' }} />
                  <div style={{ fontSize:'12px', color:'var(--muted)', marginTop:'12px', textAlign:'right' }}>{formData.teamName.length}/30</div>
                </div>
              </div>
            )}

            {/* STEP 2: RECRUIT */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 8px' }}>Recruit Your Party</h2>
                <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 24px' }}>A solo quest is dangerous. Choose how you want to invite up to 2 allies.</p>

                <div style={{ display:'flex', gap:'16px', marginBottom:'32px' }}>
                  <button type="button" onClick={() => setRecruitMethod('invite')} className="btn-secondary" style={{ flex: 1, border: recruitMethod==='invite'?'1px solid #8b4dff':'', background: recruitMethod==='invite'?'color-mix(in srgb, var(--theme-c1) 10%, transparent)':'', padding: '16px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔗</div>
                    <div style={{ fontWeight: 600, color: recruitMethod === 'invite' ? 'var(--theme-c1)' : 'var(--text)' }}>Invite Code</div>
                  </button>
                  <button type="button" onClick={() => setRecruitMethod('direct')} className="btn-secondary" style={{ flex: 1, border: recruitMethod==='direct'?'1px solid #06d6e0':'', background: recruitMethod==='direct'?'color-mix(in srgb, var(--theme-c2) 10%, transparent)':'', padding: '16px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
                    <div style={{ fontWeight: 600, color: recruitMethod === 'direct' ? 'var(--theme-c2)' : 'var(--text)' }}>Search & Add</div>
                  </button>
                </div>

                {recruitMethod === 'invite' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(139,77,255,0.05)', border: '1px solid rgba(139,77,255,0.2)', padding: '32px 24px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--theme-c1)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Your Guild's Secret Code</div>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text)', letterSpacing: '6px', margin: '0 0 24px' }}>{formData.inviteCode}</div>
                    <button onClick={() => { navigator.clipboard.writeText(formData.inviteCode); alert('Copied to clipboard!'); }} className="btn-secondary" style={{ padding: '12px 32px' }}>Copy Code</button>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '24px', lineHeight: 1.6 }}>
                      Share this magical code with your allies. They can use it to instantly join your guild after creating an account.
                    </p>
                  </motion.div>
                )}

                {recruitMethod === 'direct' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px', borderRadius:'12px', background:'rgba(139,77,255,0.08)', border:'1px solid rgba(139,77,255,0.15)', marginBottom:'16px' }}>
                      <img src={user?.photoURL || "/rpg_avatar.png"} alt="Leader Avatar" style={{ width:48, height:48, borderRadius:'10px', border: '2px solid var(--theme-c1)', boxShadow: '0 0 10px var(--theme-c1)' }} />
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:'15px', fontWeight:700, color:'var(--text)' }}>{user?.displayName || user?.name || 'You'}</div>
                        <div style={{ fontSize:'13px', color:'var(--muted)' }}>{user?.email} • Guild Master</div>
                      </div>
                      <span style={{ fontSize:'11px', color:'var(--theme-c1)', fontWeight:800, textTransform:'uppercase', letterSpacing: '1px' }}>Master</span>
                    </div>

                    {formData.members.map(m => (
                      <div key={m._id} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px', borderRadius:'12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', marginBottom:'12px' }}>
                        <div style={{ flex:1 }}><div style={{ fontSize:'15px', fontWeight:700, color:'var(--text)' }}>{m.name}</div><div style={{ fontSize:'13px', color:'var(--muted)' }}>{m.email}</div></div>
                        <button onClick={() => removeMember(m._id)} style={{ background:'rgba(251,113,133,0.1)', border:'1px solid rgba(251,113,133,0.2)', color:'#fb7185', borderRadius:'8px', padding:'6px 12px', fontSize:'12px', cursor:'pointer', fontWeight: 600 }}>Remove</button>
                      </div>
                    ))}

                    {formData.members.length < 2 && (
                      <div style={{ marginTop:'24px' }}>
                        <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--theme-c2)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Find Allies</label>
                        <input type="email" value={searchQuery} onChange={e => handleSearchMembers(e.target.value)} className="input-field" placeholder="Search by email or username..." />
                        {searchLoading && <div style={{ padding:'16px', textAlign:'center' }}><div className="spinner" style={{ margin:'0 auto' }} /></div>}
                        
                        {searchResults.length > 0 && (
                          <div style={{ marginTop:'12px', borderRadius:'12px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', overflow:'hidden' }}>
                            {searchResults.map(r => (
                              <button key={r._id} onClick={() => addMember(r)} style={{ display:'flex', alignItems:'center', gap:'12px', width:'100%', padding:'16px', background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.04)', color:'var(--text)', cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}
                                onMouseOver={e => e.currentTarget.style.background='rgba(6,214,224,0.08)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                                <div style={{ flex:1 }}><div style={{ fontSize:'15px', fontWeight:700 }}>{r.name}</div><div style={{ fontSize:'13px', color:'var(--muted)' }}>{r.email}</div></div>
                                <span style={{ color:'var(--theme-c2)', fontSize:'13px', fontWeight:700 }}>+ Add to Party</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Skip option */}
                {!recruitMethod && (
                  <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button onClick={nextStep} style={{ background: 'none', border: 'none', color: 'var(--muted)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px', padding: '8px' }}>
                      Skip for now, I'll recruit later
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: THEMES */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 8px' }}>Choose Your Quest</h2>
                <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 24px' }}>Select the domain you wish to conquer, and the visual aesthetic of your journey.</p>
                
                <label style={{ fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'12px', display:'block', textTransform:'uppercase', letterSpacing: '1px' }}>Primary Quest (Hackathon Theme)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
                  {HACKATHON_THEMES.map(t => (
                    <button key={t.id} onClick={() => setFormData({...formData, hackathonTheme: t.name})} style={{
                      padding: '16px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                      background: formData.hackathonTheme === t.name ? `${t.color}20` : 'rgba(255,255,255,0.03)',
                      border: formData.hackathonTheme === t.name ? `2px solid ${t.color}` : '1px solid rgba(255,255,255,0.06)',
                      backgroundImage: `url(${t.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '140px'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: formData.hackathonTheme === t.name ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))` : 'rgba(0,0,0,0.7)', transition: 'background 0.2s' }} />
                      <div style={{ position: 'absolute', inset: 0, background: formData.hackathonTheme === t.name ? `${t.color}40` : 'transparent', transition: 'background 0.2s' }} />
                      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <div style={{ fontSize: '28px' }}>{t.emoji}</div>
                          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t.name}</div>
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{t.shortDesc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <label style={{ fontSize:'12px', fontWeight:600, color:'var(--theme-c2)', marginBottom:'12px', display:'block', textTransform:'uppercase', letterSpacing: '1px' }}>Platform Aesthetic (Visual Theme)</label>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))', gap:'12px' }}>
                  {Object.entries(THEMES).map(([id, cfg]) => (
                    <button key={id} onClick={() => setFormData({...formData, visualTheme: id})} style={{
                      padding:'14px 12px', borderRadius:'12px', cursor:'pointer', fontFamily:'inherit', fontSize:'13px', fontWeight:700, textAlign:'center', transition:'all 0.2s',
                      background: formData.visualTheme===id ? 'color-mix(in srgb, var(--theme-c2) 15%, transparent)' : 'rgba(255,255,255,0.03)',
                      border: formData.visualTheme===id ? '1px solid #06d6e0' : '1px solid rgba(255,255,255,0.06)',
                      color: formData.visualTheme===id ? 'var(--theme-c2)' : 'var(--muted)',
                      position: 'relative', overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0, borderRadius: '12px', overflow: 'hidden' }}>
                        <ThemePreview config={cfg} />
                      </div>
                      <div style={{ position: 'relative', zIndex: 10 }}>
                        <div style={{ display:'flex', gap:'4px', justifyContent:'center', marginBottom:'10px' }}>
                          {cfg.colors.map((c,i) => <div key={i} style={{ width:'12px', height:'12px', borderRadius:'50%', background:c, boxShadow: `0 0 8px ${c}` }} />)}
                        </div>
                        {cfg.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {step === 4 && (
              <div style={{ textAlign:'center' }}>
                {!paymentDone ? (
                  <>
                    <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 8px' }}>Review & Embark</h2>
                    <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 32px' }}>Verify your choices before crossing the portal.</p>
                    
                    <div style={{ borderRadius:'16px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', padding:'24px', display:'flex', flexDirection:'column', gap:'20px', textAlign:'left', marginBottom: '32px' }}>
                      <div><div style={{ fontSize:'11px', color:'var(--theme-c1)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px' }}>Guild Name</div><div style={{ fontSize:'18px', fontWeight:800, color:'var(--text)' }}>{formData.teamName}</div></div>
                      <div style={{ display: 'flex', gap: '40px' }}>
                        <div><div style={{ fontSize:'11px', color:'var(--theme-c1)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px' }}>Quest</div><div style={{ fontSize:'15px', color:'var(--text)', fontWeight: 600 }}>{formData.hackathonTheme}</div></div>
                        <div><div style={{ fontSize:'11px', color:'var(--theme-c1)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px' }}>Aesthetic</div><div style={{ fontSize:'15px', color:'var(--text)', fontWeight: 600, textTransform:'capitalize' }}>{formData.visualTheme}</div></div>
                      </div>
                      <div>
                        <div style={{ fontSize:'11px', color:'var(--theme-c1)', fontWeight:600, textTransform:'uppercase', letterSpacing:'1px', marginBottom:'4px' }}>Party Members</div>
                        <div style={{ fontSize:'15px', color:'var(--text)' }}>You (Leader) {formData.members.length > 0 ? `+ ${formData.members.length} Allies` : '(Looking for Allies)'}</div>
                      </div>
                    </div>

                    <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', padding: '24px', borderRadius: '16px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 600, marginBottom: '4px' }}>Registration Fee</div>
                        <div style={{ fontSize: '13px', color: '#fcd34d' }}>Secure payment via Razorpay</div>
                      </div>
                      <div style={{ fontSize: '32px', fontWeight: 900, color: '#fbbf24' }}>₹300</div>
                    </div>

                    <button className="btn-primary" onClick={handlePayment} disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                      {loading ? <span className="spinner" style={{ display: 'inline-block', width: 18, height: 18 }} /> : 'Pay & Begin Journey'}
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} style={{ padding: '40px 0' }}>
                    <div style={{ fontSize:'72px', marginBottom:'24px' }}>🛡️</div>
                    <h2 style={{ fontSize:'28px', fontWeight:900, color:'var(--theme-c2)', margin:'0 0 12px' }}>Journey Begun!</h2>
                    <p style={{ color:'var(--muted)', fontSize:'15px', margin:'0 0 8px', lineHeight: 1.6 }}>Your guild <strong style={{ color:'var(--text)' }}>{formData.teamName}</strong> has been registered successfully.</p>
                    <p style={{ color:'var(--muted)', fontSize:'14px', margin:'0 0 32px' }}>Payment confirmed ✓</p>
                    <button className="btn-primary" onClick={handleFinish} style={{ fontSize:'16px', padding:'16px 40px' }}>
                      Enter Dashboard →
                    </button>
                  </motion.div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div initial={{ opacity:0, y: 10 }} animate={{ opacity:1, y: 0 }} style={{ marginTop:'24px', padding:'16px', borderRadius:'12px', background:'rgba(251,113,133,0.1)', border:'1px solid rgba(251,113,133,0.3)', color:'#fb7185', fontSize:'14px', fontWeight: 600, textAlign: 'center' }}>
            {error}
          </motion.div>
        )}

        {/* Navigation Buttons */}
        {step >= 1 && step < 4 && (
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'40px', gap:'16px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {step > 1 ? (
              <button className="btn-secondary" onClick={prevStep} style={{ padding: '12px 24px' }}>← Back</button>
            ) : (
              <button className="btn-secondary" onClick={() => navigate('/dashboard')} style={{ padding: '12px 24px' }}>Cancel</button>
            )}
            <button className="btn-primary" onClick={nextStep} style={{ padding: '12px 32px' }}>{step === 3 ? 'Review Details' : 'Continue'} →</button>
          </div>
        )}
        
        {step === 4 && !paymentDone && (
          <div style={{ marginTop:'32px', textAlign:'center', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={prevStep} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:'14px', cursor:'pointer', fontWeight: 600 }}>← Return to Quest Selection</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
