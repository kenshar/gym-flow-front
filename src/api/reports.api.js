import api from './axios';

export const getAttendanceFrequency = (params = {}) => {
  return api.get('/admin/reports/attendance-frequency', { params }).then(r => r.data);
};

export const getWorkoutsSummary = (params = {}) => {
  return api.get('/admin/reports/workouts-summary', { params }).then(r => r.data);
};

export const getMembersActivity = (params = {}) => {
  return api.get('/admin/reports/members-activity', { params }).then(r => r.data);
};

export default {
  getAttendanceFrequency,
  getWorkoutsSummary,
  getMembersActivity,
};
import api from './axios';

export const getSummaryReport = async (params = {}) => {
  const response = await api.get('/reports/summary', { params });
  return response.data;
};

export const getAttendanceReport = async (params = {}) => {
  const response = await api.get('/reports/attendance', { params });
  return response.data;
};

export const getMembershipReport = async (params = {}) => {
  const response = await api.get('/reports/membership', { params });
  return response.data;
};

export const getRevenueReport = async (params = {}) => {
  const response = await api.get('/reports/revenue', { params });
  return response.data;
};

export const exportReport = async (type, format = 'csv') => {
  const response = await api.get(`/reports/export/${type}`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
