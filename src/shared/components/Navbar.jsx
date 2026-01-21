import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/members', label: 'Members' },
    { path: '/admin/attendance', label: 'Attendance' },
    { path: '/admin/reports', label: 'Reports' },
  ];

  const userLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/check-in', label: 'Check In' },
    { path: '/workouts', label: 'Workouts' },
  ];

  const links = isAdmin() ? adminLinks : userLinks;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">GymFlow</Link>
      </div>

      <ul className="navbar-nav">
        {links.map((link) => (
          <li key={link.path} className={isActive(link.path) ? 'active' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="navbar-user">
        <span className="user-name">{user?.name}</span>
        <span className="user-role">{isAdmin() ? 'Admin' : 'Member'}</span>
        <button onClick={logout} className="btn btn-small btn-secondary">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
