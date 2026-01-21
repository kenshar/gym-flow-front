import { useState } from 'react';
import { checkIn } from '../../api/attendance.api';
import { useAuth } from '../../auth/AuthContext';
import './Checkin.css';

export default function CheckIn() {
  const { user } = useAuth();
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await checkIn(memberId || user?.id);
      setMessage(response.message || 'Check-in successful! 🎉');
      setMemberId('');
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Check-in failed. Please try again.';
      setError(errorMsg);
      
      // Clear error message after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCheckIn = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await checkIn(user.id);
      setMessage(response.message || 'Check-in successful! 🎉');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Check-in failed. Please try again.';
      setError(errorMsg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-container">
      <div className="checkin-card">
        <h2>Member Check-In</h2>
        
        {/* Quick check-in for logged-in users */}
        {user && (
          <div className="quick-checkin-section">
            <h3>Welcome, {user.name}!</h3>
            <button 
              onClick={handleQuickCheckIn} 
              disabled={loading}
              className="quick-checkin-btn"
            >
              {loading ? 'Checking in...' : 'Quick Check-In'}
            </button>
          </div>
        )}

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Manual member ID check-in */}
        <form onSubmit={handleCheckIn} className="checkin-form">
          <div className="form-group">
            <label htmlFor="memberId">Member ID</label>
            <input
              type="number"
              id="memberId"
              placeholder="Enter Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Checking in...' : 'Check In'}
          </button>
        </form>

        {/* Success message */}
        {message && (
          <div className="alert alert-success">
            <span className="icon">✓</span>
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-error">
            <span className="icon">✕</span>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}