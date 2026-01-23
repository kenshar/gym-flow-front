import axios from './axios';

// Submit a new member signup request
export const submitMemberRequest = (data) => {
  return axios.post('/member-requests', data);
};

// Get pending member requests (admin only)
export const getMemberRequests = (status = 'pending') => {
  return axios.get(`/member-requests?status=${status}`);
};

// Get a specific member request (admin only)
export const getMemberRequest = (requestId) => {
  return axios.get(`/member-requests/${requestId}`);
};

// Approve a member request (admin only)
export const approveMemberRequest = (requestId) => {
  return axios.put(`/member-requests/${requestId}/approve`);
};

// Reject a member request (admin only)
export const rejectMemberRequest = (requestId) => {
  return axios.put(`/member-requests/${requestId}/reject`);
};

// Delete a member request (admin only)
export const deleteMemberRequest = (requestId) => {
  return axios.delete(`/member-requests/${requestId}`);
};
