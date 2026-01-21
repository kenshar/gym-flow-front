import api from './axios';

const listInvites = () => api.get('/admin/invites');
const createInvite = () => api.post('/admin/invites');
const revokeInvite = (id) => api.delete(`/admin/invites/${id}`);

export default {
  listInvites,
  createInvite,
  revokeInvite,
};
