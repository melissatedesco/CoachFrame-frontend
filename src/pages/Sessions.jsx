import { useEffect, useState } from 'react';
import { sessionsApi } from '../api/sessions';
import SessionCard from '../components/SessionCard/SessionCard';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionsApi
      .getAll()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container mt-5" style={{ maxWidth: 720 }}>
      <header className="mb-4">
        <h2 className="fw-bold">Storico allenamenti</h2>
        <p className="text-muted">Tutte le tue sessioni, dalla più recente</p>
      </header>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && sessions.length === 0 && (
        <p className="text-muted text-center py-5">Non hai ancora registrato allenamenti.</p>
      )}

      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} />
      ))}
    </main>
  );
};

export default Sessions;
