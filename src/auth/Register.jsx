import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/auth.api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user', inviteCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: form.role,
      };
      if (form.role === 'admin') payload.inviteCode = form.inviteCode;

      const res = await registerApi(payload);
      // Save token + user similar to login
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-register container mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Role</label>
          <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {form.role === 'admin' && (
          <div className="mb-3">
            <label className="block mb-1">Admin Invite Code</label>
            <input name="inviteCode" value={form.inviteCode} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        )}

        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;

