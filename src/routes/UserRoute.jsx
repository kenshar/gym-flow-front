import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const UserRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default UserRoute;
