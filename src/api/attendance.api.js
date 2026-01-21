import api from './axios';

export const checkIn = async (memberId) => {
  const response = await api.post('/attendance/checkin', {
    member_id: memberId,
  });
  return response.data;
};

export const getAttendanceHistory = async (memberId, params = {}) => {
  const response = await api.get(`/attendance/history/${memberId}`, { params });
  return response.data.history || [];
};

export const getTodayAttendance = async () => {
  const response = await api.get('/attendance/today');
  return response.data.attendances || [];
};

export const getMyAttendance = async (params = {}) => {
  const response = await api.get('/attendance/my-history', { params });
  return response.data.history || [];
};