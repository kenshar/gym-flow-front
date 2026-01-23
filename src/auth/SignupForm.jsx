import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitMemberRequest } from '../api/memberRequests.api';
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'basic'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const plans = [
    { value: 'basic', label: 'Basic - KES 2,500/month' },
    { value: 'premium', label: 'Premium - KES 4,500/month' },
    { value: 'vip', label: 'VIP - KES 8,000/month' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.plan) {
      setError('Please select a membership plan');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await submitMemberRequest(formData);
      setSuccess('Your membership request has been submitted successfully! Our admin will review it shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan: 'basic'
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to submit membership request';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-wrapper">
        <h1>Join GymFlow</h1>
        <p className="form-subtitle">Fill in your details to request a membership</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="plan">Membership Plan *</label>
            <select
              id="plan"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              disabled={loading}
            >
              {plans.map(plan => (
                <option key={plan.value} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Membership Request'}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
