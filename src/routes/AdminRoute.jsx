import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const hasToken = !!localStorage.getItem('token');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated() && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    const storedUser = localStorage.getItem('user');
    const userRole = storedUser ? JSON.parse(storedUser).role : null;
    if (userRole !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default AdminRoute;
