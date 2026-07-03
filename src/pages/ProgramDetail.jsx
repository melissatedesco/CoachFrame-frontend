import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { programsApi } from '../api/programs';
import { sessionsApi } from '../api/sessions';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const difficultyBadge = (level) => {
  switch (level?.toLowerCase()) {
    case 'principiante': return 'bg-success';
    case 'intermedio': return 'bg-warning text-dark';
    case 'avanzato': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        setProgram(await programsApi.getById(id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleStart = async () => {
    setStarting(true);
    setError('');
    try {
      const { id: sessionId } = await sessionsApi.start(program.id);
      navigate(`/allenamento/${sessionId}`);
    } catch (err) {
      setError(err.message);
      setStarting(false);
    }
  };

  if (loading) return <main className="container mt-5"><Loading /></main>;

  return (
    <main className="container mt-5" style={{ maxWidth: 760 }}>
      <ErrorAlert message={error} />

      {program && (
        <div className="card bg-ff-surface border-ff shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
              <h3 className="fw-bold text-ff-primary mb-0">{program.name}</h3>
              {program.difficulty && (
                <span className={`badge ${difficultyBadge(program.difficulty)}`}>{program.difficulty}</span>
              )}
            </div>

            <p className="text-muted">{program.description || 'Nessuna descrizione.'}</p>

            <div className="d-flex gap-4 small text-muted mb-4">
              {program.duration_weeks && <span>{program.duration_weeks} settimane</span>}
              {program.sessions_per_week && <span>{program.sessions_per_week}x a settimana</span>}
            </div>

            <h6 className="fw-semibold small text-uppercase text-muted">Esercizi</h6>
            {program.exercises?.length > 0 ? (
              <ul className="list-group list-group-flush mb-4">
                {program.exercises.map((ex) => (
                  <li key={ex.id} className="list-group-item bg-transparent border-ff d-flex justify-content-between flex-wrap">
                    <span className="fw-semibold">{ex.name}</span>
                    <span className="small text-muted">
                      {ex.sets}x{ex.reps} · riposo {ex.rest_seconds}s
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted small">Nessun esercizio in questa scheda.</p>
            )}

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-info fw-semibold" onClick={handleStart} disabled={starting}>
                {starting ? 'Avvio in corso...' : 'Avvia sessione con questa scheda'}
              </button>
              <Link to="/schede" className="btn btn-outline-ff">
                &larr; Torna alle schede
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProgramDetail;
