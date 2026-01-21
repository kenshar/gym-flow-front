import { useState, useEffect } from 'react';
import { getTodayAttendance } from '../../api/attendance.api';
import { formatDate } from '../../shared/utils/formatDate';
import StatusBadge from '../../shared/components/StatusBadge';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendances();
  }, [filterDate]);

  const fetchAttendances = async () => {
    try {
      setLoading(true);
      const data = await getTodayAttendance();
      setAttendances(data);
    } catch (err) {
      setError('Failed to load attendance records');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAttendances = attendances.filter((record) => {
    const matchesSearch =
      record.member_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.member_email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getSessionDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '-';
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const minutes = Math.floor((end - start) / 60000);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return <div className="loading">Loading attendance records...</div>;
  }

  return (
    <div className="attendance-list">
      <div className="page-header">
        <h1>Attendance Records</h1>
        <button onClick={fetchAttendances} className="btn btn-secondary">
          Refresh
        </button>
      </div>

      <div className="filters">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Search by member name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input search-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats">
        <p>Total Check-ins Today: <strong>{filteredAttendances.length}</strong></p>
        <p>
          Currently Checked In:
          <strong>
            {filteredAttendances.filter((a) => !a.check_out).length}
          </strong>
        </p>
      </div>

      {filteredAttendances.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Member Name</th>
              <th>Email</th>
              <th>Check-in Time</th>
              <th>Check-out Time</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendances.map((record) => (
              <tr key={record.id}>
                <td>{record.member_name || 'N/A'}</td>
                <td>{record.member_email || 'N/A'}</td>
                <td>{formatDate(record.check_in)}</td>
                <td>{record.check_out ? formatDate(record.check_out) : '-'}</td>
                <td>{getSessionDuration(record.check_in, record.check_out)}</td>
                <td>
                  <StatusBadge
                    status={record.check_out ? 'completed' : 'active'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>No attendance records found for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
