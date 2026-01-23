import { useState, useEffect } from 'react';
import { getMemberRequests, approveMemberRequest, rejectMemberRequest, deleteMemberRequest } from '../../api/memberRequests.api';
import './MemberRequests.css';

const MemberRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchMemberRequests();
  }, [statusFilter]);

  const fetchMemberRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getMemberRequests(statusFilter);
      setRequests(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch member requests';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    if (!window.confirm('Are you sure you want to approve this membership request?')) {
      return;
    }

    setActionLoading(requestId);
    try {
      await approveMemberRequest(requestId);
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to approve request';
      setError(errorMsg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (requestId) => {
    if (!window.confirm('Are you sure you want to reject this membership request?')) {
      return;
    }

    setActionLoading(requestId);
    try {
      await rejectMemberRequest(requestId);
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to reject request';
      setError(errorMsg);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (requestId) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return;
    }

    setActionLoading(requestId);
    try {
      await deleteMemberRequest(requestId);
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete request';
      setError(errorMsg);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlanBadgeClass = (plan) => {
    return `badge badge-${plan.toLowerCase()}`;
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  return (
    <div className="member-requests-container">
      <div className="requests-header">
        <h1>Member Signup Requests</h1>
        <div className="filter-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-spinner">Loading requests...</div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <p>No {statusFilter === 'all' ? '' : statusFilter} member requests found.</p>
        </div>
      ) : (
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="request-row">
                  <td className="name-cell">{request.name}</td>
                  <td className="email-cell">{request.email}</td>
                  <td className="phone-cell">{request.phone}</td>
                  <td className="plan-cell">
                    <span className={getPlanBadgeClass(request.plan)}>
                      {request.plan.charAt(0).toUpperCase() + request.plan.slice(1)}
                    </span>
                  </td>
                  <td className="status-cell">
                    <span className={getStatusBadgeClass(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="date-cell">{formatDate(request.created_at)}</td>
                  <td className="actions-cell">
                    {request.status === 'pending' ? (
                      <div className="action-buttons">
                        <button
                          onClick={() => handleApprove(request.id)}
                          disabled={actionLoading === request.id}
                          className="btn btn-sm btn-success"
                          title="Approve request and create member"
                        >
                          {actionLoading === request.id ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          disabled={actionLoading === request.id}
                          className="btn btn-sm btn-danger"
                          title="Reject request"
                        >
                          {actionLoading === request.id ? 'Processing...' : 'Reject'}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(request.id)}
                        disabled={actionLoading === request.id}
                        className="btn btn-sm btn-outline-danger"
                        title="Delete request"
                      >
                        {actionLoading === request.id ? 'Deleting...' : 'Delete'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberRequests;
