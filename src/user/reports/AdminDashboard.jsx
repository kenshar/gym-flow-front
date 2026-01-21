import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { getAttendanceFrequency, getWorkoutsSummary, getMembersActivity } from '../../api/reports.api';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './AdminDashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

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

  // Chart data
  const attendanceBarData = attendance?.topMembers
    ? {
        labels: attendance.topMembers.map((m) => m.memberName),
        datasets: [
          {
            label: 'Check-ins',
            data: attendance.topMembers.map((m) => m.checkins),
            backgroundColor: '#4f8cff',
            borderRadius: 6,
          },
        ],
      }
    : null;

  const workoutsPieData = workouts?.byType
    ? {
        labels: workouts.byType.map((t) => t.type),
        datasets: [
          {
            label: 'Workouts',
            data: workouts.byType.map((t) => t.count),
            backgroundColor: [
              '#4f8cff',
              '#ffb347',
              '#7ed957',
              '#ff6384',
              '#36a2eb',
              '#9966ff',
            ],
          },
        ],
      }
    : null;

  const membersDoughnutData = members
    ? {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [members.activeMembers, members.inactiveMembers],
            backgroundColor: ['#7ed957', '#ff6384'],
          },
        ],
      }
    : null;

  return (
    <div className={styles.dashboard + ' container'}>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Attendance (last 30 days)</h3>
        <div className={styles.cards}>
          <div className={styles.card}>Total checkins: {attendance?.totalCheckins}</div>
          <div className={styles.card}>Avg per member: {attendance?.avgCheckinsPerMember?.toFixed?.(2)}</div>
        </div>
        <h4>Top Members</h4>
        {attendanceBarData && (
          <div className={styles['chart-container']}>
            <Bar data={attendanceBarData} options={{
              plugins: { legend: { display: false } },
              responsive: true,
              scales: { y: { beginAtZero: true, ticks: { precision:0 } } },
            }} height={220} />
          </div>
        )}
        <ul>
          {attendance?.topMembers?.map(m => (
            <li key={m.memberId}>{m.memberName} — {m.checkins}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Workouts (last 30 days)</h3>
        <div className={styles.cards}>
          <div className={styles.card}>Total: {workouts?.totalWorkouts}</div>
          <div className={styles.card}>Avg duration: {workouts?.avgDuration?.toFixed?.(1)}</div>
        </div>
        <h4>By Type</h4>
        {workoutsPieData && (
          <div className={styles['chart-container']}>
            <Pie data={workoutsPieData} options={{
              plugins: { legend: { position: 'bottom' } },
              responsive: true,
            }} height={220} />
          </div>
        )}
        <ul>
          {workouts?.byType?.map(t => (
            <li key={t.type}>{t.type} — {t.count}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Members Activity</h3>
        <div className={styles.cards}>
          <div className={styles.card}>Active: {members?.activeMembers}</div>
          <div className={styles.card}>Inactive: {members?.inactiveMembers}</div>
          <div className={styles.card}>Total: {members?.totalMembers}</div>
        </div>
        {membersDoughnutData && (
          <div className={styles['chart-container']}>
            <Doughnut data={membersDoughnutData} options={{
              plugins: { legend: { position: 'bottom' } },
              responsive: true,
            }} height={180} />
          </div>
        )}
      </section>
    </div>
  );
}
