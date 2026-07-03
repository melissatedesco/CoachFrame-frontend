import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sessionsApi } from '../api/sessions';
import { exercisesApi } from '../api/exercises';
import { programsApi } from '../api/programs';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const emptyForm = { exercise_id: '', sets_done: 3, reps_done: 10, form_score: '' };

const WorkoutSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const s = await sessionsApi.getById(sessionId);
        setSession(s);
        if (s?.program_id) {
          const program = await programsApi.getById(s.program_id);
          setAvailableExercises(program.exercises.map((e) => ({ id: e.exercise_id, name: e.name })));
        } else {
          const all = await exercisesApi.getAll();
          setAvailableExercises(all.map((e) => ({ id: e.id, name: e.name })));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogExercise = async (e) => {
    e.preventDefault();
    if (!form.exercise_id) return;
    setSaving(true);
    setError('');
    try {
      await sessionsApi.logExercise(sessionId, {
        exercise_id: Number(form.exercise_id),
        sets_done: Number(form.sets_done),
        reps_done: Number(form.reps_done),
        form_score: form.form_score === '' ? null : Number(form.form_score),
      });
      setForm(emptyForm);
      setSession(await sessionsApi.getById(sessionId));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = async () => {
    setClosing(true);
    setError('');
    try {
      await sessionsApi.close(sessionId);
      navigate(`/sessioni/${sessionId}`);
    } catch (err) {
      setError(err.message);
      setClosing(false);
    }
  };

  if (loading) return <main className="container mt-5"><Loading /></main>;

  const isClosed = !!session?.ended_at;

  return (
    <main className="container mt-5" style={{ maxWidth: 640 }}>
      <header className="mb-4">
        <h2 className="fw-bold">{session?.program_name || 'Allenamento libero'}</h2>
        <p className="text-muted mb-0">
          {isClosed ? 'Sessione completata' : 'Sessione in corso — registra i tuoi esercizi'}
        </p>
      </header>

      <ErrorAlert message={error} />

      {session?.exercises?.length > 0 && (
        <ul className="list-group list-group-flush mb-4">
          {session.exercises.map((ex) => (
            <li key={ex.id} className="list-group-item bg-ff-surface border-ff d-flex justify-content-between flex-wrap">
              <span className="fw-semibold">{ex.name}</span>
              <span className="small text-muted">
                {ex.sets_done}x{ex.reps_done}
                {ex.form_score != null ? ` · form ${ex.form_score}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!isClosed && (
        <form onSubmit={handleLogExercise} className="card bg-ff-surface border-ff shadow-sm mb-4">
          <div className="card-body">
            <h6 className="fw-semibold small text-uppercase text-muted mb-3">Registra un esercizio</h6>

            <div className="mb-3">
              <select
                name="exercise_id"
                className="form-select border-ff"
                value={form.exercise_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona esercizio...</option>
                {availableExercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </select>
            </div>

            <div className="row g-2 mb-3">
              <div className="col">
                <label className="form-label small text-muted">Serie</label>
                <input
                  type="number"
                  name="sets_done"
                  min={1}
                  className="form-control border-ff"
                  value={form.sets_done}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label small text-muted">Ripetizioni</label>
                <input
                  type="number"
                  name="reps_done"
                  min={1}
                  className="form-control border-ff"
                  value={form.reps_done}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label small text-muted">Form score (0-100)</label>
                <input
                  type="number"
                  name="form_score"
                  min={0}
                  max={100}
                  className="form-control border-ff"
                  value={form.form_score}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-outline-info w-100" disabled={saving}>
              {saving ? 'Salvataggio...' : 'Aggiungi esercizio'}
            </button>
          </div>
        </form>
      )}

      {!isClosed ? (
        <button className="btn btn-info w-100 fw-semibold py-2" onClick={handleClose} disabled={closing}>
          {closing ? 'Chiusura in corso...' : 'Chiudi sessione'}
        </button>
      ) : (
        <button className="btn btn-outline-ff w-100" onClick={() => navigate('/sessioni')}>
          Vai allo storico sessioni
        </button>
      )}
    </main>
  );
};

export default WorkoutSession;
