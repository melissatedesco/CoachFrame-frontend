import { Link } from 'react-router-dom';

const formatDate = (value) =>
  new Date(value).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const SessionCard = ({ session }) => (
  <div className="card bg-ff-surface border-ff shadow-sm mb-3">
    <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-2">
      <div>
        <h6 className="mb-1 fw-bold">{session.program_name || 'Allenamento libero'}</h6>
        <div className="small text-muted">{formatDate(session.started_at)}</div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className={`badge ${session.ended_at ? 'bg-success' : 'bg-warning text-dark'}`}>
          {session.ended_at ? 'Completata' : 'In corso'}
        </span>
        <Link to={`/sessioni/${session.id}`} className="btn btn-outline-info btn-sm">
          Dettagli
        </Link>
      </div>
    </div>
  </div>
);

export default SessionCard;
