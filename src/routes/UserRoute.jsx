import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const UserRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const hasToken = !!localStorage.getItem('token');

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated() && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
