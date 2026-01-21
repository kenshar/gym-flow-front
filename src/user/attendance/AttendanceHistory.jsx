import { useState, useEffect } from 'react';
import { getMyAttendance, getAttendanceHistory } from '../../api/attendance.api';
import { useAuth } from '../../auth/AuthContext';
import { formatDate } from '../../shared/utils/formatDate';
import './AttendanceHistory.css';

export default function AttendanceHistory({ memberId }) {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        let records;
        
        if (memberId) {
          records = await getAttendanceHistory(memberId);
        } else {
          records = await getMyAttendance();
        }

        setHistory(records);
        calculateStats(records);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load attendance history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [memberId, user]);

  const calculateStats = (records) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const monthCount = records.filter((r) => {
      const date = new Date(r.check_in_time);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length;

    const weekCount = records.filter((r) => {
      const date = new Date(r.check_in_time);
      return date >= oneWeekAgo;
    }).length;

    setStats({
      total: records.length,
      thisMonth: monthCount,
      thisWeek: weekCount,
    });
  };

  if (loading) {
    return (
      <div className="attendance-history">
        <div className="loading">Loading attendance history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-history">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="attendance-history">
      <h3>Attendance History</h3>

      {/* Stats cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.thisWeek}</div>
          <div className="stat-label">This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.thisMonth}</div>
          <div className="stat-label">This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Check-ins</div>
        </div>
      </div>

      {/* History list */}
      {history.length === 0 ? (
        <div className="empty-state">
          <p>No attendance records yet.</p>
          <p className="hint">Start checking in to track your gym visits!</p>
        </div>
      ) : (
        <div className="history-list">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Day</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record) => {
                const date = new Date(record.check_in_time);
                return (
                  <tr key={record.id}>
                    <td>{formatDate(record.check_in_time)}</td>
                    <td>{date.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</td>
                    <td>{date.toLocaleDateString('en-US', { weekday: 'long' })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}