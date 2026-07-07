import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programsApi } from '../api/programs';
import { sessionsApi } from '../api/sessions';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Workout = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    programsApi
      .getAll()
      .then(setPrograms)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const startSession = async (programId) => {
    setStarting(true);
    setError('');
    try {
      const { id } = await sessionsApi.start(programId);
      navigate(`/allenamento/${id}`);
    } catch (err) {
      setError(err.message);
      setStarting(false);
    }
  };

  return (
    <main className="container mt-5" style={{ maxWidth: 640 }}>
      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">Allenati</h2>
        <p className="text-muted">Scegli una scheda oppure inizia un allenamento libero</p>
      </header>

      <ErrorAlert message={error} />

      <button
        className="btn btn-info w-100 fw-semibold py-3 mb-4"
        onClick={() => startSession(null)}
        disabled={starting}
      >
        {starting ? 'Avvio in corso...' : 'Inizia allenamento libero'}
      </button>

      <h6 className="fw-semibold small text-uppercase text-muted mb-2">Oppure segui una scheda</h6>

      {loading && <Loading />}
      {!loading && programs.length === 0 && (
        <p className="text-muted small">Nessuna scheda disponibile.</p>
      )}

      <div className="list-group">
        {programs.map((p) => (
          <button
            key={p.id}
            className="list-group-item list-group-item-action bg-ff-surface border-ff d-flex justify-content-between align-items-center"
            onClick={() => startSession(p.id)}
            disabled={starting}
          >
            <span>{p.name}</span>
            <span className="small text-muted">{p.difficulty}</span>
          </button>
        ))}
      </div>
    </main>
  );
};

export default Workout;
