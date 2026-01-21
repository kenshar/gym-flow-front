import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

import Login from '../auth/Login';
import ResetPassword from '../auth/ResetPassword';

import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';

import AdminDashboard from '../admin/dashboard/AdminDashboard';
import MembersList from '../admin/members/MembersList';
import MemberForm from '../admin/members/MemberForm';
import MemberDetails from '../admin/members/MemberDetails';
import AttendanceList from '../admin/attendance/AttendanceList';
import SummaryReport from '../admin/reports/SummaryReport';

import UserDashboard from '../user/dashboard/UserDashboard';
import CheckIn from '../user/attendance/CheckIn';
import WorkoutForm from '../user/workouts/WorkoutForm';
import WorkoutHistory from '../user/workouts/WorkoutHistory';

const AppRoutes = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to={isAdmin() ? '/admin/dashboard' : '/dashboard'} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="members" element={<MembersList />} />
        <Route path="members/new" element={<MemberForm />} />
        <Route path="members/:id" element={<MemberDetails />} />
        <Route path="members/:id/edit" element={<MemberForm />} />
        <Route path="attendance" element={<AttendanceList />} />
        <Route path="reports" element={<SummaryReport />} />
      </Route>

      {/* User routes */}
      <Route element={<UserRoute />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/workouts" element={<WorkoutHistory />} />
        <Route path="/workouts/new" element={<WorkoutForm />} />
        <Route path="/workouts/:id/edit" element={<WorkoutForm />} />
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to={isAdmin() ? '/admin/dashboard' : '/dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
