import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🚫</div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f4f3f8', marginBottom: '16px' }}>Access Denied</h1>
        <p style={{ color: '#9ca3af', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          You do not possess the required clearance to access this restricted sector.
        </p>
        <button onClick={() => window.location.href = '/dashboard'} className="btn-secondary" style={{ padding: '12px 24px' }}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return children;
}
