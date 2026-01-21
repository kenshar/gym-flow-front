import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummaryReport } from '../../api/reports.api';
import { getTodayAttendance } from '../../api/attendance.api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryData, attendanceData] = await Promise.all([
          getSummaryReport(),
          getTodayAttendance(),
        ]);
        setStats(summaryData);
        setTodayAttendance(attendanceData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Members</h3>
          <p className="stat-value">{stats?.totalMembers || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Active Members</h3>
          <p className="stat-value">{stats?.activeMembers || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Today's Check-ins</h3>
          <p className="stat-value">{todayAttendance?.length || 0}</p>
        </div>

        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <p className="stat-value">${stats?.monthlyRevenue || 0}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Today's Attendance</h2>
            <Link to="/admin/reports" className="btn btn-secondary">
              View Reports
            </Link>
          </div>

          {todayAttendance.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Check-in Time</th>
                  <th>Check-out Time</th>
                </tr>
              </thead>
              <tbody>
                {todayAttendance.slice(0, 10).map((record) => (
                  <tr key={record.id}>
                    <td>{record.member_name}</td>
                    <td>{new Date(record.check_in).toLocaleTimeString()}</td>
                    <td>
                      {record.check_out
                        ? new Date(record.check_out).toLocaleTimeString()
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No check-ins today</p>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <Link to="/admin/members" className="btn btn-primary">
              Manage Members
            </Link>
            <Link to="/admin/members/new" className="btn btn-secondary">
              Add New Member
            </Link>
            <Link to="/admin/reports" className="btn btn-secondary">
              View Reports
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
