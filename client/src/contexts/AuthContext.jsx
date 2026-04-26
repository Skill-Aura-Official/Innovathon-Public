import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { auth as firebaseAuth } from '../firebase';
import { authAPI } from '../services/api';
import { THEMES, DEFAULT_THEME } from '../config/themes';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // User object from our backend
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('innovathon-theme');
    return THEMES[saved] ? saved : DEFAULT_THEME;
  });

  // Initialize: check if we have a saved token and validate it
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('innovathon-token');
      const savedUser = localStorage.getItem('innovathon-user');

      if (token && savedUser) {
        try {
          // Validate token by fetching profile
          const response = await authAPI.getProfile();
          setUser(response.data.user);
        } catch {
          // Token expired or invalid
          console.warn('Saved token invalid, clearing auth');
          localStorage.removeItem('innovathon-token');
          localStorage.removeItem('innovathon-user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Register with username + email + password
   */
  const register = useCallback(async ({ username, email, password, name }) => {
    const response = await authAPI.register({ username, email, password, name });
    const { token, user: userData } = response.data;

    localStorage.setItem('innovathon-token', token);
    localStorage.setItem('innovathon-user', JSON.stringify(userData));
    setUser(userData);

    return userData;
  }, []);

  /**
   * Login with username/email + password
   */
  const login = useCallback(async ({ identifier, password }) => {
    const response = await authAPI.login({ identifier, password });
    const { token, user: userData } = response.data;

    localStorage.setItem('innovathon-token', token);
    localStorage.setItem('innovathon-user', JSON.stringify(userData));
    setUser(userData);

    return userData;
  }, []);

  /**
   * Google Sign-In (optional)
   * Uses Firebase for the OAuth popup, then exchanges the Firebase token
   * for our own JWT via the backend.
   */
  const googleSignIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken();

    // Exchange Firebase token for our JWT
    const response = await authAPI.googleLogin(idToken);
    const { token, user: userData } = response.data;

    localStorage.setItem('innovathon-token', token);
    localStorage.setItem('innovathon-user', JSON.stringify(userData));
    setUser(userData);

    // Sign out of Firebase (we don't need it anymore, we have our JWT)
    try { await firebaseSignOut(firebaseAuth); } catch { /* ignore */ }

    return userData;
  }, []);

  /**
   * Apple Sign-In (optional)
   */
  const appleSignIn = useCallback(async () => {
    const provider = new OAuthProvider('apple.com');
    const result = await signInWithPopup(firebaseAuth, provider);
    const idToken = await result.user.getIdToken();

    // Exchange Firebase token for our JWT
    const response = await authAPI.googleLogin(idToken);
    const { token, user: userData } = response.data;

    localStorage.setItem('innovathon-token', token);
    localStorage.setItem('innovathon-user', JSON.stringify(userData));
    setUser(userData);

    // Sign out of Firebase
    try { await firebaseSignOut(firebaseAuth); } catch { /* ignore */ }

    return userData;
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    localStorage.removeItem('innovathon-token');
    localStorage.removeItem('innovathon-user');
    setUser(null);

    // Also sign out of Firebase just in case
    try { await firebaseSignOut(firebaseAuth); } catch { /* ignore */ }
  }, []);

  /**
   * Re-fetch profile from backend (to refresh role, etc.)
   */
  const fetchProfile = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('innovathon-user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.warn('Failed to fetch profile:', error.message);
      return null;
    }
  }, []);

  /**
   * Change visual theme
   */
  const changeTheme = (themeId) => {
    if (THEMES[themeId]) {
      setTheme(themeId);
      localStorage.setItem('innovathon-theme', themeId);
      document.documentElement.setAttribute('data-theme', themeId);
    }
  };

  const value = {
    user,             // Our backend user object { id, username, email, name, role, photoURL }
    loading,
    theme,
    themeConfig: THEMES[theme],
    register,
    login,
    googleSignIn,
    appleSignIn,
    logout,
    fetchProfile,
    changeTheme,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
