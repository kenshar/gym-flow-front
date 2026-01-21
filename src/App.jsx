import { useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './shared/components/Navbar';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideNavbar = ['/login', '/reset-password'].includes(location.pathname);

  return (
    <div className="app">
      {isAuthenticated() && !hideNavbar && <Navbar />}
      <main className={hideNavbar ? 'main-full' : 'main-content'}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
