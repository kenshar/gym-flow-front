import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { getMembers } from '../../api/members.api';
import { getWorkout, createWorkout, updateWorkout, getWorkoutTypes } from '../../api/workouts.api';

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { user, isAdmin } = useAuth();

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    calories: '',
    notes: '',
    exercises: [],
    memberId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchWorkoutTypes();
    if (isEditing) {
      fetchWorkout();
    }
    // If not editing and user is present, set default member for non-admins
    if (!isEditing && user && !isAdmin()) {
      setFormData((prev) => ({ ...prev, memberId: user.memberId || user.id }));
    }
  }, [id, user]);

  const fetchWorkoutTypes = async () => {
    try {
      const types = await getWorkoutTypes();
      setWorkoutTypes(types);
      if (!isEditing && types.length > 0) {
        setFormData((prev) => ({ ...prev, type: types[0].name }));
      }
    } catch (err) {
      setWorkoutTypes([
        { name: 'Strength Training' },
        { name: 'Cardio' },
        { name: 'HIIT' },
        { name: 'Yoga' },
        { name: 'Other' },
      ]);
    }
    // If admin, also fetch members for linking workouts
    if (isAdmin()) {
      fetchMembers();
    }
  };

  const fetchMembers = async () => {
    try {
      const list = await getMembers();
      setMembers(list || []);
      if (!isEditing && list && list.length > 0 && !formData.memberId) {
        setFormData((prev) => ({ ...prev, memberId: list[0].id }));
      }
    } catch (err) {
      // ignore - members optional for non-admins
    }
  };

  const fetchWorkout = async () => {
    setLoading(true);
    try {
      const data = await getWorkout(id);
      setFormData({
        type: data.type || '',
        date: data.date?.split('T')[0] || '',
        duration: data.duration || '',
        calories: data.calories || '',
        notes: data.notes || '',
        exercises: data.exercises || [],
        memberId: data.memberId || data.member_id || '',
      });
    } catch (err) {
      setError('Failed to load workout');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateExercises = (exercises) => {
    const errors = {};
    for (let i = 0; i < exercises.length; i++) {
      const ex = exercises[i];
      if (!ex.name || ex.name.trim() === '') {
        errors[i] = `Exercise #${i + 1} is missing a name`;
        continue;
      }
      if (ex.sets !== '' && (!Number.isInteger(Number(ex.sets)) || Number(ex.sets) < 1)) {
        errors[i] = `Sets must be an integer >= 1`;
        continue;
      }
      if (ex.reps !== '' && (!Number.isInteger(Number(ex.reps)) || Number(ex.reps) < 1)) {
        errors[i] = `Reps must be an integer >= 1`;
        continue;
      }
      if (ex.weight !== '' && (isNaN(Number(ex.weight)) || Number(ex.weight) < 0)) {
        errors[i] = `Weight must be a number >= 0`;
        continue;
      }
    }
    return errors;
  };

  const addExercise = () => {
    setFormData((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { name: '', sets: '', reps: '', weight: '' },
      ],
    }));
  };

  const updateExercise = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) =>
        i === index ? { ...ex, [field]: value } : ex
      ),
    }));
  };

  const removeExercise = (index) => {
    setFormData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // client-side validation for exercises
      const exerciseErrors = validateExercises(formData.exercises || []);
      setValidationErrors(exerciseErrors);
      if (Object.keys(exerciseErrors).length > 0) {
        setError('Please fix exercise errors');
        setLoading(false);
        return;
      }

      // ensure memberId is present; default to current user when available
      if (!formData.memberId) {
        if (user) {
          formData.memberId = user.memberId || user.id;
        } else {
          setError('Member must be selected or you must be logged in');
          setLoading(false);
          return;
        }
      }

      const payload = {
        ...formData,
        duration: parseInt(formData.duration, 10) || 0,
        calories: parseInt(formData.calories, 10) || 0,
      };

      if (isEditing) {
        await updateWorkout(id, payload);
      } else {
        await createWorkout(payload);
      }
      navigate('/workouts');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save workout');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="loading">Loading workout...</div>;
  }

  return (
    <div className="workout-form">
      <h1>{isEditing ? 'Edit Workout' : 'Log Workout'}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {isAdmin() && (
          <div className="form-group">
            <label htmlFor="memberId">Member</label>
            <select
              id="memberId"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.firstName || m.name || m.email}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Workout Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {workoutTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="calories">Calories Burned (optional)</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Exercises</label>
          {formData.exercises.map((exercise, index) => (
            <div key={index} className="exercise-row">
              <input
                type="text"
                placeholder="Exercise name"
                value={exercise.name}
                onChange={(e) => updateExercise(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => updateExercise(index, 'sets', e.target.value)}
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => updateExercise(index, 'reps', e.target.value)}
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={exercise.weight}
                onChange={(e) => updateExercise(index, 'weight', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="btn btn-small btn-danger"
              >
                Remove
              </button>
              {validationErrors[index] && (
                <div className="field-error">{validationErrors[index]}</div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExercise}
            className="btn btn-secondary"
          >
            Add Exercise
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="How did the workout go?"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Workout' : 'Log Workout'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/workouts')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
