import { useState, useEffect } from 'react';
import {
  getSummaryReport,
  getAttendanceReport,
  getMembershipReport,
  exportReport,
} from '../../api/reports.api';
import { formatDate } from '../../shared/utils/formatDate';

const SummaryReport = () => {
  const [summary, setSummary] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchReports();
  }, [dateRange]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const [summaryData, attendanceData, membershipData] = await Promise.all([
        getSummaryReport(dateRange),
        getAttendanceReport(dateRange),
        getMembershipReport(dateRange),
      ]);
      setSummary(summaryData);
      setAttendance(attendanceData);
      setMembership(membershipData);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type) => {
    try {
      const blob = await exportReport(type, 'csv');
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export report');
    }
  };

  if (loading) {
    return <div className="loading">Loading reports...</div>;
  }

  return (
    <div className="reports">
      <h1>Reports</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="report-filters">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Members</h3>
          <p className="stat-value">{summary?.totalMembers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>New Members</h3>
          <p className="stat-value">{summary?.newMembers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Check-ins</h3>
          <p className="stat-value">{summary?.totalCheckins || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Daily Visits</h3>
          <p className="stat-value">{summary?.avgDailyVisits || 0}</p>
        </div>
      </div>

      <section className="report-section">
        <div className="section-header">
          <h2>Attendance Overview</h2>
          <button
            onClick={() => handleExport('attendance')}
            className="btn btn-secondary"
          >
            Export CSV
          </button>
        </div>

        {attendance.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-ins</th>
                <th>Unique Members</th>
                <th>Peak Hour</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((day, index) => (
                <tr key={index}>
                  <td>{formatDate(day.date)}</td>
                  <td>{day.checkins}</td>
                  <td>{day.uniqueMembers}</td>
                  <td>{day.peakHour || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No attendance data for selected period</p>
        )}
      </section>

      <section className="report-section">
        <div className="section-header">
          <h2>Membership Overview</h2>
          <button
            onClick={() => handleExport('membership')}
            className="btn btn-secondary"
          >
            Export CSV
          </button>
        </div>

        <div className="membership-stats">
          <div className="stat-item">
            <span className="label">Active Memberships</span>
            <span className="value">{membership?.active || 0}</span>
          </div>
          <div className="stat-item">
            <span className="label">Expiring This Month</span>
            <span className="value">{membership?.expiringThisMonth || 0}</span>
          </div>
          <div className="stat-item">
            <span className="label">Expired</span>
            <span className="value">{membership?.expired || 0}</span>
          </div>
          <div className="stat-item">
            <span className="label">Renewal Rate</span>
            <span className="value">{membership?.renewalRate || 0}%</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SummaryReport;
