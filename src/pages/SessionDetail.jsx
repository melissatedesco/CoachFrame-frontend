import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sessionsApi } from '../api/sessions';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const formatDate = (value) =>
  value ? new Date(value).toLocaleString('it-IT', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

const SessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionsApi
      .getById(id)
      .then(setSession)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="container mt-5"><Loading /></main>;

  return (
    <main className="container mt-5" style={{ maxWidth: 640 }}>
      <ErrorAlert message={error} />

      {session && (
        <div className="card bg-ff-surface border-ff shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
              <h3 className="fw-bold text-ff-primary mb-0">{session.program_name || 'Allenamento libero'}</h3>
              <span className={`badge ${session.ended_at ? 'bg-success' : 'bg-warning text-dark'}`}>
                {session.ended_at ? 'Completata' : 'In corso'}
              </span>
            </div>

            <p className="small text-muted mb-1">Inizio: {formatDate(session.started_at)}</p>
            <p className="small text-muted">Fine: {formatDate(session.ended_at)}</p>

            {session.notes && <p className="mt-3">{session.notes}</p>}

            <h6 className="fw-semibold small text-uppercase text-muted mt-4">Esercizi eseguiti</h6>
            {session.exercises?.length > 0 ? (
              <ul className="list-group list-group-flush mb-4">
                {session.exercises.map((ex) => (
                  <li key={ex.id} className="list-group-item bg-transparent border-ff d-flex justify-content-between flex-wrap">
                    <span className="fw-semibold">{ex.name}</span>
                    <span className="small text-muted">
                      {ex.sets_done}x{ex.reps_done}
                      {ex.form_score != null ? ` · form ${ex.form_score}` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted small">Nessun esercizio registrato in questa sessione.</p>
            )}

            <div className="d-flex gap-2 flex-wrap">
              {!session.ended_at && (
                <Link to={`/allenamento/${session.id}`} className="btn btn-info">
                  Continua sessione
                </Link>
              )}
              <Link to="/sessioni" className="btn btn-outline-ff">
                &larr; Torna allo storico
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SessionDetail;
