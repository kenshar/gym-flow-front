import api from './axios';

export const getWorkouts = async (params = {}) => {
  const response = await api.get('/workouts', { params });
  return response.data;
};

export const getWorkout = async (id) => {
  const response = await api.get(`/workouts/${id}`);
  return response.data;
};

export const createWorkout = async (workoutData) => {
  const response = await api.post('/workouts', workoutData);
  return response.data;
};

export const updateWorkout = async (id, workoutData) => {
  const response = await api.put(`/workouts/${id}`, workoutData);
  return response.data;
};

export const deleteWorkout = async (id) => {
  const response = await api.delete(`/workouts/${id}`);
  return response.data;
};

export const getWorkoutTypes = async () => {
  const response = await api.get('/workouts/types');
  return response.data;
};
