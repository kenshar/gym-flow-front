import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../api/workouts.api';
import { formatDate } from '../../shared/utils/formatDate';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (err) {
      setError('Failed to delete workout');
    }
  };

  const filteredWorkouts = filter === 'all'
    ? workouts
    : workouts.filter((w) => w.type === filter);

  const workoutTypes = [...new Set(workouts.map((w) => w.type))];

  if (loading) {
    return <div className="loading">Loading workouts...</div>;
  }

  return (
    <div className="workout-history">
      <div className="page-header">
        <h1>Workout History</h1>
        <Link to="/workouts/new" className="btn btn-primary">
          Log Workout
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          {workoutTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredWorkouts.length > 0 ? (
        <div className="workout-list">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="workout-card">
              <div className="workout-header">
                <h3>{workout.type}</h3>
                <span className="workout-date">{formatDate(workout.date)}</span>
                {workout.member && (
                  <div className="workout-member">{workout.member.firstName || workout.member.name || workout.member.email}</div>
                )}
              </div>

              <div className="workout-details">
                <div className="detail">
                  <span className="label">Duration</span>
                  <span className="value">{workout.duration} min</span>
                </div>
                {workout.calories > 0 && (
                  <div className="detail">
                    <span className="label">Calories</span>
                    <span className="value">{workout.calories}</span>
                  </div>
                )}
                {workout.exercises?.length > 0 && (
                  <div className="detail">
                    <span className="label">Exercises</span>
                    <span className="value">{workout.exercises.length}</span>
                  </div>
                )}
              </div>

              {workout.exercises?.length > 0 && (
                <div className="exercises-summary">
                  <h4>Exercises:</h4>
                  <ul>
                    {workout.exercises.map((ex, i) => (
                      <li key={i}>
                        {ex.name}
                        {ex.sets && ex.reps && ` - ${ex.sets}x${ex.reps}`}
                        {ex.weight && ` @ ${ex.weight}kg`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workout.notes && (
                <div className="workout-notes">
                  <p>{workout.notes}</p>
                </div>
              )}

              <div className="workout-actions">
                <Link
                  to={`/workouts/${workout.id}/edit`}
                  className="btn btn-small"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="btn btn-small btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          <p>No workouts logged yet</p>
          <Link to="/workouts/new" className="btn btn-primary">
            Log Your First Workout
          </Link>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
