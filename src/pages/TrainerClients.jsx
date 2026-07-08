import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trainerApi } from '../api/trainer';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const TrainerClients = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [addError, setAddError] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const loadClients = async () => {
    setLoading(true);
    setError('');
    try {
      setClients(await trainerApi.getClients());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role !== 'trainer') return;
    loadClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user?.role !== 'trainer') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAddClient = async (e) => {
    e.preventDefault();
    setAddError('');
    setAdding(true);
    try {
      await trainerApi.addClient(email);
      setEmail('');
      await loadClients();
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveClient = async (clientId) => {
    if (!window.confirm('Rimuovere questo cliente dalla tua lista?')) return;
    try {
      await trainerApi.removeClient(clientId);
      await loadClients();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="container mt-5">
      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">I tuoi clienti</h2>
        <p className="text-muted">Gestisci i clienti assegnati e monitora la loro attività</p>
      </header>

      <div className="card bg-ff-surface border-ff shadow-sm mb-4">
        <div className="card-body">
          <form className="d-flex flex-wrap gap-2" onSubmit={handleAddClient}>
            <input
              type="email"
              className="form-control border-ff"
              style={{ maxWidth: 320 }}
              placeholder="Email del cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-info fw-semibold" disabled={adding}>
              {adding ? 'Aggiunta in corso...' : 'Aggiungi cliente'}
            </button>
          </form>
          <ErrorAlert message={addError} />
        </div>
      </div>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && clients.length === 0 && (
        <p className="text-muted text-center py-5">Nessun cliente assegnato al momento.</p>
      )}

      {!loading && clients.length > 0 && (
        <div className="card bg-ff-surface border-ff shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Nome</th>
                  <th>Email</th>
                  <th>Sessioni</th>
                  <th>Ripetizioni</th>
                  <th>Form medio</th>
                  <th>Ultima sessione</th>
                  <th className="pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td className="ps-4">
                      <Link to={`/clienti/${c.id}`} state={{ client: c }} className="fw-semibold text-decoration-none">
                        {c.name}
                      </Link>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.total_sessions}</td>
                    <td>{c.total_reps}</td>
                    <td>{Number(c.avg_form_score).toFixed(0)}</td>
                    <td>{c.last_session ? new Date(c.last_session).toLocaleDateString('it-IT') : '—'}</td>
                    <td className="pe-4 text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveClient(c.id)}
                      >
                        Rimuovi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default TrainerClients;
