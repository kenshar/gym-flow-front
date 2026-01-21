const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'status-badge status-active';
      case 'inactive':
        return 'status-badge status-inactive';
      case 'expired':
        return 'status-badge status-expired';
      case 'pending':
        return 'status-badge status-pending';
      default:
        return 'status-badge';
    }
  };

  const getStatusLabel = () => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown';
  };

  return <span className={getStatusClass()}>{getStatusLabel()}</span>;
};

export default StatusBadge;
