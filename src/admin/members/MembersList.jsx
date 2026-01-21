import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMembers, deleteMember } from '../../api/members.api';
import StatusBadge from '../../shared/components/StatusBadge';

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    try {
      await deleteMember(id);
      setMembers(members.filter((m) => m.id !== id));
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && member.status === 'active') ||
      (filter === 'inactive' && member.status === 'inactive') ||
      (filter === 'expired' && member.status === 'expired');

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div className="loading">Loading members...</div>;
  }

  return (
    <div className="members-list">
      <div className="page-header">
        <h1>Members</h1>
        <Link to="/admin/members/new" className="btn btn-primary">
          Add Member
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Members</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {filteredMembers.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Membership Expires</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <Link to={`/admin/members/${member.id}`}>{member.name}</Link>
                </td>
                <td>{member.email}</td>
                <td>{member.phone || '-'}</td>
                <td>
                  <StatusBadge status={member.status} />
                </td>
                <td>
                  {member.membership_end
                    ? new Date(member.membership_end).toLocaleDateString()
                    : '-'}
                </td>
                <td className="actions">
                  <Link
                    to={`/admin/members/${member.id}/edit`}
                    className="btn btn-small"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="btn btn-small btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No members found</p>
      )}
    </div>
  );
};

export default MembersList;
