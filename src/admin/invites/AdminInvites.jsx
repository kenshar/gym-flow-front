import React, { useEffect, useState } from 'react';
import invitesApi from '../../api/invites.api';

const AdminInvites = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newInvite, setNewInvite] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await invitesApi.listInvites();
      setInvites(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load invites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await invitesApi.createInvite();
      const created = res?.data || null;
      setNewInvite(created);
      await load();
    } catch (err) {
      setError(err.message || 'Failed to create invite');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!newInvite) return;
    const text = newInvite.code;
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  const closeModal = () => setNewInvite(null);

  const handleRevoke = async (id) => {
    setLoading(true);
    try {
      await invitesApi.revokeInvite(id);
      await load();
    } catch (err) {
      setError(err.message || 'Failed to revoke invite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-invites">
      <h2>Admin Invites</h2>
      <p>Generate one-time invite codes for admin registration.</p>

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleCreate} disabled={loading}>Create Invite</button>
      </div>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Code</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Created By</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Active</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites.length === 0 && (
              <tr>
                <td colSpan={4}>No invites found.</td>
              </tr>
            )}
            {invites.map((inv) => (
              <tr key={inv.id}>
                <td style={{ padding: '8px 4px' }}>{inv.code}</td>
                <td style={{ padding: '8px 4px' }}>{inv.created_by || 'system'}</td>
                <td style={{ padding: '8px 4px' }}>{inv.active ? 'Yes' : 'No'}</td>
                <td style={{ padding: '8px 4px' }}>
                  {inv.active && (
                    <button onClick={() => handleRevoke(inv.id)} disabled={loading}>Revoke</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Invite created modal */}
      {newInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card p-6 rounded shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold mb-2">Invite Created</h3>
            <p className="mb-4">Share this one-time code to allow admin registration:</p>
            <div className="flex items-center justify-between bg-secondary p-3 rounded mb-4">
              <code className="font-mono">{newInvite.code}</code>
              <button onClick={handleCopyCode} className="ml-4 px-3 py-1 bg-primary text-white rounded">Copy</button>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInvites;
