import api from './axios';

export const checkIn = async (memberId) => {
  const response = await api.post('/attendance/checkin', {
    member_id: memberId,
  });
  return response.data;
};

export const getAttendanceHistory = async (memberId) => {
  const response = await api.get(`/attendance/history/${memberId}`);
  return response.data;
};

export const getTodayAttendance = async () => {
  const response = await api.get('/attendance/today');
  return response.data;
};

export const getMyAttendance = async () => {
  const response = await api.get('/attendance/my-history');
  return response.data;
};