import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { trainerApi } from '../api/trainer';
import { programsApi } from '../api/programs';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const TrainerClientDetail = () => {
  const { user } = useAuth();
  const { clientId } = useParams();
  const { state } = useLocation();

  const [client, setClient] = useState(state?.client || null);
  const [assignments, setAssignments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [error, setError] = useState('');
  const [assignError, setAssignError] = useState('');
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const loadAssignments = async () => {
    setAssignments(await trainerApi.getClientAssignments(clientId));
  };

  useEffect(() => {
    if (user?.role !== 'trainer') return;

    (async () => {
      setLoading(true);
      setError('');
      try {
        const tasks = [loadAssignments(), programsApi.getAll()];
        if (!client) tasks.push(trainerApi.getClients());
        const results = await Promise.all(tasks);
        setPrograms(results[1]);
        if (!client) {
          const found = results[2]?.find((c) => String(c.id) === String(clientId));
          if (found) setClient(found);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, clientId]);

  if (user?.role !== 'trainer') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedProgramId) return;
    setAssignError('');
    setAssigning(true);
    try {
      await trainerApi.assignProgram(clientId, selectedProgramId);
      setSelectedProgramId('');
      await loadAssignments();
    } catch (err) {
      setAssignError(err.message);
    } finally {
      setAssigning(false);
    }
  };

  const handleRemove = async (assignmentId) => {
    if (!window.confirm('Rimuovere questa scheda dal cliente?')) return;
    try {
      await trainerApi.removeAssignment(assignmentId);
      await loadAssignments();
    } catch (err) {
      setError(err.message);
    }
  };

  const assignedProgramIds = new Set(assignments.map((a) => a.id));
  const availablePrograms = programs.filter((p) => !assignedProgramIds.has(p.id));

  return (
    <main className="container mt-5" style={{ maxWidth: 760 }}>
      <Link to="/clienti" className="d-inline-block mb-3 text-decoration-none">
        &larr; Torna ai clienti
      </Link>

      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">{client ? client.name : 'Dettaglio cliente'}</h2>
        {client && <p className="text-muted mb-0">{client.email}</p>}
      </header>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && (
        <>
          <div className="card bg-ff-surface border-ff shadow-sm mb-4">
            <div className="card-body">
              <h6 className="fw-semibold small text-uppercase text-muted mb-3">Assegna una nuova scheda</h6>
              <form className="d-flex flex-wrap gap-2" onSubmit={handleAssign}>
                <select
                  className="form-select border-ff"
                  style={{ maxWidth: 320 }}
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  required
                >
                  <option value="">Seleziona una scheda...</option>
                  {availablePrograms.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <button type="submit" className="btn btn-info fw-semibold" disabled={assigning || !selectedProgramId}>
                  {assigning ? 'Assegnazione in corso...' : 'Assegna scheda'}
                </button>
              </form>
              <ErrorAlert message={assignError} />
              {availablePrograms.length === 0 && !assignError && (
                <p className="text-muted small mb-0 mt-2">Nessun'altra scheda disponibile da assegnare.</p>
              )}
            </div>
          </div>

          <h6 className="fw-semibold small text-uppercase text-muted">Schede assegnate</h6>
          {assignments.length === 0 && (
            <p className="text-muted text-center py-5">Nessuna scheda assegnata a questo cliente.</p>
          )}

          {assignments.length > 0 && (
            <ul className="list-group list-group-flush">
              {assignments.map((a) => (
                <li
                  key={a.assignment_id}
                  className="list-group-item bg-transparent border-ff d-flex justify-content-between align-items-center flex-wrap gap-2"
                >
                  <div>
                    <Link to={`/schede/${a.id}`} className="fw-semibold text-decoration-none">{a.name}</Link>
                    <div className="small text-muted">
                      {a.difficulty && <span className="me-3">{a.difficulty}</span>}
                      {a.duration_weeks && <span className="me-3">{a.duration_weeks} settimane</span>}
                      {a.sessions_per_week && <span>{a.sessions_per_week}x a settimana</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(a.assignment_id)}
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
};

export default TrainerClientDetail;
