import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMember, getMemberStats, deleteMember } from '../../api/members.api';
import StatusBadge from '../../shared/components/StatusBadge';
import { formatDate } from '../../shared/utils/formatDate';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMemberData();
  }, [id]);

  const fetchMemberData = async () => {
    try {
      const [memberData, statsData] = await Promise.all([
        getMember(id),
        getMemberStats(id),
      ]);
      setMember(memberData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to load member details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      return;
    }

    try {
      await deleteMember(id);
      navigate('/admin/members');
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  if (loading) {
    return <div className="loading">Loading member details...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!member) {
    return <div className="error-message">Member not found</div>;
  }

  return (
    <div className="member-details">
      <div className="page-header">
        <h1>{member.name}</h1>
        <div className="header-actions">
          <Link to={`/admin/members/${id}/edit`} className="btn btn-primary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="details-grid">
        <section className="details-card">
          <h2>Personal Information</h2>
          <dl>
            <dt>Email</dt>
            <dd>{member.email}</dd>

            <dt>Phone</dt>
            <dd>{member.phone || '-'}</dd>

            <dt>Joined</dt>
            <dd>{formatDate(member.created_at)}</dd>
          </dl>
        </section>

        <section className="details-card">
          <h2>Membership</h2>
          <dl>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={member.status} />
            </dd>

            <dt>Type</dt>
            <dd className="capitalize">{member.membership_type || '-'}</dd>

            <dt>Start Date</dt>
            <dd>{formatDate(member.membership_start)}</dd>

            <dt>End Date</dt>
            <dd>{formatDate(member.membership_end)}</dd>
          </dl>
        </section>

        <section className="details-card">
          <h2>Statistics</h2>
          <dl>
            <dt>Total Visits</dt>
            <dd>{stats?.totalVisits || 0}</dd>

            <dt>This Month</dt>
            <dd>{stats?.visitsThisMonth || 0}</dd>

            <dt>Workouts Logged</dt>
            <dd>{stats?.totalWorkouts || 0}</dd>

            <dt>Last Visit</dt>
            <dd>{formatDate(stats?.lastVisit) || 'Never'}</dd>
          </dl>
        </section>
      </div>

      <div className="back-link">
        <Link to="/admin/members">&larr; Back to Members</Link>
      </div>
    </div>
  );
};

export default MemberDetails;
