const Loading = ({ label = 'Caricamento...' }) => (
  <div className="d-flex align-items-center justify-content-center gap-2 text-muted py-5">
    <div className="spinner-border spinner-border-sm text-ff-primary" role="status" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

export default Loading;
