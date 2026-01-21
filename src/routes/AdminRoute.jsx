import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
