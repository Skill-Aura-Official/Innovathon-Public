import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const { user, register, googleSignIn } = useAuth();

  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [usernameStatus, setUsernameStatus] = useState(''); // 'checking' | 'available' | 'taken' | ''

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  // Debounced username availability check
  useEffect(() => {
    if (formData.username.length < 3) { setUsernameStatus(''); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) { setUsernameStatus('invalid'); return; }

    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      try {
        const res = await authAPI.checkUsername(formData.username);
        setUsernameStatus(res.data.available ? 'available' : 'taken');
      } catch {
        setUsernameStatus('');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Please enter your full name');
    if (formData.username.length < 3) return setError('Username must be at least 3 characters');
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) return setError('Username can only contain letters, numbers, and underscores');
    if (usernameStatus === 'taken') return setError('Username is already taken');
    if (!formData.email.includes('@')) return setError('Please enter a valid email');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await googleSignIn();
      navigate('/onboarding', { replace: true });
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled.');
      } else {
        setError(err.message || 'Google sign-in failed.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (user) return null;

  const usernameColor = {
    checking: '#fbbf24',
    available: '#34d399',
    taken: '#fb7185',
    invalid: '#fb7185'
  }[usernameStatus] || '#6b7280';

  const usernameMessage = {
    checking: '⏳ Checking...',
    available: '✓ Available',
    taken: '✗ Already taken',
    invalid: '✗ Letters, numbers, underscores only'
  }[usernameStatus] || '';

  return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <motion.div initial={{ opacity:0, y:30, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.5 }}
        className="glass-strong" style={{ padding:'48px 40px', width:'100%', maxWidth:'460px' }}>

        {/* Brand */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{
            width:'56px', height:'56px', borderRadius:'14px',
            background:'linear-gradient(135deg, var(--theme-c1), var(--theme-c2))',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 20px', fontSize:'24px',
            boxShadow:'0 8px 30px color-mix(in srgb, var(--theme-c1) 30%, transparent)'
          }}>⚡</div>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:'0 0 6px' }}>Create Account</h1>
          <p style={{ color:'#9ca3af', fontSize:'14px', margin:0 }}>
            Join <span style={{ color:'var(--theme-c1)', fontWeight:600 }}>Innovathon</span> and start competing
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

          {/* Full Name */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Full Name</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange}
              className="input-field" placeholder="e.g. John Doe" autoComplete="name" autoFocus />
          </div>

          {/* Username */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Username</label>
            <input name="username" type="text" value={formData.username} onChange={handleChange}
              className="input-field" placeholder="e.g. john_doe" autoComplete="username" maxLength={20}
              style={{ borderColor: usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'rgba(251,113,133,0.5)' : usernameStatus === 'available' ? 'rgba(52,211,153,0.5)' : undefined }} />
            {usernameMessage && (
              <div style={{ fontSize:'12px', color: usernameColor, marginTop:'4px', fontWeight:500 }}>{usernameMessage}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange}
              className="input-field" placeholder="you@example.com" autoComplete="email" />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange}
              className="input-field" placeholder="Min 6 characters" autoComplete="new-password" />
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>Confirm Password</label>
            <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
              className="input-field" placeholder="Re-enter password" autoComplete="new-password" />
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ padding:'12px 16px', borderRadius:'10px', background:'rgba(251,113,133,0.08)', border:'1px solid rgba(251,113,133,0.2)', color:'#fb7185', fontSize:'13px' }}>
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading || usernameStatus === 'taken'}
            style={{ fontSize:'15px', padding:'14px', width:'100%', marginTop:'4px' }}>
            {loading ? (
              <span style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center' }}>
                <span className="spinner" style={{ width:18, height:18, borderWidth:2 }} />Creating Account...
              </span>
            ) : 'Create Account'}
          </button>
        </motion.form>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'16px', margin:'24px 0' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize:'12px', color:'#6b7280', fontWeight:500 }}>OR</span>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Google Sign-In */}
        <button onClick={handleGoogleSignIn} disabled={googleLoading} className="btn-google" style={{ width:'100%' }}>
          <svg style={{ width:20, height:20 }} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {googleLoading ? 'Signing in...' : 'Sign up with Google'}
        </button>

        {/* Login link */}
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ textAlign:'center', color:'#6b7280', fontSize:'14px', marginTop:'24px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color:'var(--theme-c1)', fontWeight:600, textDecoration:'none' }}>Sign in</Link>
        </motion.p>

        {/* Back home */}
        <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
          onClick={() => navigate('/')} style={{ display:'block', margin:'8px auto 0', background:'none', border:'none', color:'#4b5563', fontSize:'13px', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:'3px' }}>
          ← Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
