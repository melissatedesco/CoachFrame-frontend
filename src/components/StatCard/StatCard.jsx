const StatCard = ({ label, value, accent = 'primary' }) => (
  <div className="card h-100 bg-ff-surface border-ff shadow-sm">
    <div className="card-body text-center">
      <div className={`fs-2 fw-bold text-ff-${accent}`}>{value}</div>
      <div className="small text-muted text-uppercase">{label}</div>
    </div>
  </div>
);

export default StatCard;
