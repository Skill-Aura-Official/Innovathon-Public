import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './themes/ThemeProvider';

import Header from './components/layout/Header';
import LayoutFooter from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingScreen from './components/ui/LoadingScreen';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeBackground from './components/theme/ThemeBackground';

import Hero from './components/Hero';
import Section from './components/Section';
import CTA from './components/CTA';

const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Login = lazy(() => import('./pages/Login'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Register = lazy(() => import('./pages/Register'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Sponsors = lazy(() => import('./pages/Sponsors'));
const Submission = lazy(() => import('./pages/Submission'));
const ThemeSelector = lazy(() => import('./pages/ThemeSelector'));
const Themes = lazy(() => import('./pages/Themes'));
const Landing = lazy(() => import('./pages/Landing'));

const MINIMAL_LAYOUT_PATHS = ['/login', '/register', '/onboarding'];

function BackgroundLayer() {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 z-0 ${theme.fx.background}`} data-layer="background">
      {theme.id === 'thunderstorm' && (
        <>
          <div className="thunderstorm-lightning-flash" />
          <div className="thunderstorm-edge-glow" />
        </>
      )}
      {theme.id === 'hellish-fire' && <div className="hellish-fire-fire-glow" />}
    </div>
  );
}

function EffectLayer() {
  const { theme } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" data-layer="effect">
      {theme.id === 'thunderstorm' && (
        <div className="thunderstorm-rain-field">
          {Array.from({ length: 22 }).map((_, index) => (
            <span className="thunderstorm-rain-line" key={`rain-${index}`} />
          ))}
        </div>
      )}

      {theme.id === 'ice-storm' && (
        <div className="ice-storm-snow-field">
          {Array.from({ length: 26 }).map((_, index) => (
            <span className="ice-storm-snow-flake" key={`snow-${index}`} />
          ))}
        </div>
      )}

      {theme.id === 'sci-fi' && (
        <>
          <div className="sci-fi-scan-line" />
          <div className="sci-fi-hud-pulse" />
        </>
      )}

      {theme.id === 'hellish-fire' && (
        <div className="hellish-fire-ember-field">
          {Array.from({ length: 28 }).map((_, index) => (
            <span className="hellish-fire-ember" key={`ember-${index}`} />
          ))}
        </div>
      )}

      {theme.id === 'ai' && (
        <div className="ai-network">
          {Array.from({ length: 9 }).map((_, index) => (
            <span className="ai-node-pulse" key={`node-${index}`} />
          ))}
          {Array.from({ length: 7 }).map((_, index) => (
            <span className="ai-link-flow" key={`link-${index}`} />
          ))}
        </div>
      )}

      {theme.id === 'anime' && (
        <div className="anime-speed-field">
          {Array.from({ length: 24 }).map((_, index) => (
            <span className="anime-speed-line" key={`speed-${index}`} />
          ))}
        </div>
      )}

      {theme.id === 'windy' && (
        <>
          <div className="windy-wind-field">
            {Array.from({ length: 16 }).map((_, index) => (
              <span className="windy-wind-line" key={`wind-${index}`} />
            ))}
          </div>
          <div className="windy-drift-field">
            {Array.from({ length: 18 }).map((_, index) => (
              <span className="windy-drift-particle" key={`drift-${index}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isMinimal = MINIMAL_LAYOUT_PATHS.includes(location.pathname);

  return (
    <>
      <ThemeBackground />
      <BackgroundLayer />
      <EffectLayer />
      <div className="relative z-20 min-h-screen" data-layer="ui">
        {!isMinimal && <Header />}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/submission" element={<ProtectedRoute><Submission /></ProtectedRoute>} />
            <Route path="/theme-selector" element={<ThemeSelector />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        {!isMinimal && <LayoutFooter />}
        <div className="fixed bottom-5 right-5 z-[1100]">
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
}

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}
