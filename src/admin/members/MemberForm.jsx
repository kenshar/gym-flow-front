import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMember, createMember, updateMember } from '../../api/members.api';

const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membership_type: 'monthly',
    membership_start: '',
    membership_end: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      fetchMember();
    }
  }, [id]);

  const fetchMember = async () => {
    setLoading(true);
    try {
      const data = await getMember(id);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        membership_type: data.membership_type || 'monthly',
        membership_start: data.membership_start?.split('T')[0] || '',
        membership_end: data.membership_end?.split('T')[0] || '',
        status: data.status || 'active',
      });
    } catch (err) {
      setError('Failed to load member data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await updateMember(id, formData);
      } else {
        await createMember(formData);
      }
      navigate('/admin/members');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save member');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="loading">Loading member...</div>;
  }

  return (
    <div className="member-form">
      <h1>{isEditing ? 'Edit Member' : 'Add New Member'}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="membership_type">Membership Type</label>
          <select
            id="membership_type"
            name="membership_type"
            value={formData.membership_type}
            onChange={handleChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="membership_start">Membership Start</label>
            <input
              type="date"
              id="membership_start"
              name="membership_start"
              value={formData.membership_start}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="membership_end">Membership End</label>
            <input
              type="date"
              id="membership_end"
              name="membership_end"
              value={formData.membership_end}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/members')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;
