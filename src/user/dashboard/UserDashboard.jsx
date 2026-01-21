import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { getMyAttendance, getTodayAttendance } from '../../api/attendance.api';
import { getWorkouts } from '../../api/workouts.api';
import { formatDate } from '../../shared/utils/formatDate';

const UserDashboard = () => {
  const { user } = useAuth();
  const [todayStatus, setTodayStatus] = useState(null);
  const [recentAttendance, setRecentAttendance] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [todayData, attendanceData, workoutsData] = await Promise.all([
          getTodayAttendance(),
          getMyAttendance({ limit: 5 }),
          getWorkouts({ limit: 5 }),
        ]);

        setTodayStatus(todayData);
        setRecentAttendance(attendanceData);
        setRecentWorkouts(workoutsData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const isCheckedIn = todayStatus && !todayStatus.check_out;

  return (
    <div className="dashboard user-dashboard">
      <h1>Welcome, {user?.name || 'Member'}!</h1>

      <div className="dashboard-sections">
        <section className="dashboard-section checkin-section">
          <h2>Today's Status</h2>
          <div className="checkin-status">
            {isCheckedIn ? (
              <div className="status-active">
                <p>You're checked in!</p>
                <p className="checkin-time">
                  Since {new Date(todayStatus.check_in).toLocaleTimeString()}
                </p>
              </div>
            ) : todayStatus?.check_out ? (
              <div className="status-completed">
                <p>Today's session completed</p>
                <p className="session-time">
                  {new Date(todayStatus.check_in).toLocaleTimeString()} -{' '}
                  {new Date(todayStatus.check_out).toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="status-inactive">
                <p>You haven't checked in today</p>
              </div>
            )}
          </div>
          <Link to="/check-in" className="btn btn-primary btn-large">
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </Link>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Attendance</h2>
            <Link to="/attendance" className="btn btn-link">
              View All
            </Link>
          </div>

          {recentAttendance.length > 0 ? (
            <ul className="activity-list">
              {recentAttendance.map((record) => (
                <li key={record.id}>
                  <span className="date">{formatDate(record.check_in)}</span>
                  <span className="time">
                    {new Date(record.check_in).toLocaleTimeString()} -
                    {record.check_out
                      ? new Date(record.check_out).toLocaleTimeString()
                      : 'In Progress'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No attendance records yet</p>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Workouts</h2>
            <Link to="/workouts" className="btn btn-link">
              View All
            </Link>
          </div>

          {recentWorkouts.length > 0 ? (
            <ul className="activity-list">
              {recentWorkouts.map((workout) => (
                <li key={workout.id}>
                  <span className="workout-type">{workout.type}</span>
                  <span className="date">{formatDate(workout.date)}</span>
                  <span className="duration">{workout.duration} min</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No workouts logged yet</p>
          )}

          <Link to="/workouts/new" className="btn btn-secondary">
            Log Workout
          </Link>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
