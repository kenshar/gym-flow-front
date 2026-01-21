import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { getAttendanceFrequency, getWorkoutsSummary, getMembersActivity } from '../../api/reports.api';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(null);
  const [workouts, setWorkouts] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    if (!isAdmin()) return;

    const load = async () => {
      setLoading(true);
      try {
        const [att, wks, mem] = await Promise.all([
          getAttendanceFrequency({ days: 30, top: 5 }),
          getWorkoutsSummary({ days: 30 }),
          getMembersActivity({ days: 30 }),
        ]);
        setAttendance(att);
        setWorkouts(wks);
        setMembers(mem);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAdmin]);

  if (!isAdmin()) {
    return <div className="container">Access denied: admin only</div>;
  }

  if (loading) return <div className="container">Loading dashboard...</div>;

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Attendance (last 30 days)</h3>
        <div className="cards">
          <div className="card">Total checkins: {attendance?.totalCheckins}</div>
          <div className="card">Avg per member: {attendance?.avgCheckinsPerMember?.toFixed?.(2)}</div>
        </div>
        <h4>Top Members</h4>
        <ul>
          {attendance?.topMembers?.map(m => (
            <li key={m.memberId}>{m.memberName} — {m.checkins}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Workouts (last 30 days)</h3>
        <div className="cards">
          <div className="card">Total: {workouts?.totalWorkouts}</div>
          <div className="card">Avg duration: {workouts?.avgDuration?.toFixed?.(1)}</div>
        </div>
        <h4>By Type</h4>
        <ul>
          {workouts?.byType?.map(t => (
            <li key={t.type}>{t.type} — {t.count}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Members Activity</h3>
        <p>Active: {members?.activeMembers} — Inactive: {members?.inactiveMembers} (Total: {members?.totalMembers})</p>
      </section>
    </div>
  );
}
