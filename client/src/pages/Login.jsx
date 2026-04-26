import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, googleSignIn } = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.identifier.trim()) return setError('Please enter your username or email');
    if (!formData.password) return setError('Please enter your password');

    setLoading(true);
    try {
      await login({
        identifier: formData.identifier.trim(),
        password: formData.password
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await googleSignIn();
      navigate(from, { replace: true });
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

  return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'24px' }}>
      <motion.div initial={{ opacity:0, y:30, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.5 }}
        className="glass-strong" style={{ padding:'48px 40px', width:'100%', maxWidth:'420px' }}>

        {/* Brand */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{
            width:'56px', height:'56px', borderRadius:'14px',
            background:'linear-gradient(135deg, var(--theme-c1), var(--theme-c2))',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 20px', fontSize:'24px',
            boxShadow:'0 8px 30px color-mix(in srgb, var(--theme-c1) 30%, transparent)'
          }}>⚡</div>
          <h1 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:'0 0 6px' }}>Welcome Back</h1>
          <p style={{ color:'#9ca3af', fontSize:'14px', margin:0 }}>
            Sign in to <span style={{ color:'var(--theme-c1)', fontWeight:600 }}>Innovathon</span>
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

          {/* Username or Email */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>
              Username or Email
            </label>
            <input name="identifier" type="text" value={formData.identifier} onChange={handleChange}
              className="input-field" placeholder="Enter username or email" autoComplete="username" autoFocus />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px', display:'block' }}>
              Password
            </label>
            <input name="password" type="password" value={formData.password} onChange={handleChange}
              className="input-field" placeholder="Enter your password" autoComplete="current-password" />
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ padding:'12px 16px', borderRadius:'10px', background:'rgba(251,113,133,0.08)', border:'1px solid rgba(251,113,133,0.2)', color:'#fb7185', fontSize:'13px' }}>
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary" disabled={loading}
            style={{ fontSize:'15px', padding:'14px', width:'100%', marginTop:'4px' }}>
            {loading ? (
              <span style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center' }}>
                <span className="spinner" style={{ width:18, height:18, borderWidth:2 }} />Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </motion.form>

        {/* Divider */}
        <div style={{ display:'flex', alignItems:'center', gap:'16px', margin:'24px 0' }}>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
          <span style={{ fontSize:'12px', color:'#6b7280', fontWeight:500 }}>OR</span>
          <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.08)' }} />
        </div>

        <div style={{ display:'flex', gap:'16px' }}>
          {/* Google Sign-In */}
          <button onClick={handleGoogleSignIn} disabled={googleLoading} className="btn-google" style={{ flex:1 }}>
            <svg style={{ width:20, height:20 }} viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>

          {/* Apple Sign-In */}
          <button onClick={async () => {
            // appleSignIn should be exported from useAuth
            const { appleSignIn } = useAuth();
            try { await appleSignIn(); navigate(from, { replace: true }); }
            catch (err) { setError('Apple sign-in failed.'); }
          }} disabled={googleLoading} className="btn-secondary" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#fff', color:'#000', border:'none', borderRadius:'8px', fontWeight:600 }}>
            <svg style={{ width:20, height:20 }} viewBox="0 0 384 512"><path fill="#000" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Apple
          </button>
        </div>

        {/* Register link */}
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ textAlign:'center', color:'#6b7280', fontSize:'14px', marginTop:'24px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color:'var(--theme-c1)', fontWeight:600, textDecoration:'none' }}>Create one</Link>
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
