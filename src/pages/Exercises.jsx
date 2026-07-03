import { useEffect, useState } from 'react';
import { exercisesApi } from '../api/exercises';
import ExerciseCard from '../components/ExerciseCard/ExerciseCard';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const MUSCLE_GROUPS = ['gambe', 'petto', 'schiena', 'spalle', 'braccia', 'addome', 'cardio'];
const DIFFICULTIES = ['principiante', 'intermedio', 'avanzato'];

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filters, setFilters] = useState({ muscleGroup: '', difficulty: '', myEquipment: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        setExercises(await exercisesApi.getAll(filters));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [filters]);

  return (
    <main className="container mt-5">
      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">I tuoi esercizi</h2>
        <p className="text-muted">Seleziona un movimento per avviare il Coach Virtuale</p>
      </header>

      <div className="card bg-ff-surface border-ff shadow-sm mb-4">
        <div className="card-body d-flex flex-wrap gap-3 align-items-center">
          <select
            className="form-select border-ff w-auto"
            value={filters.muscleGroup}
            onChange={(e) => setFilters({ ...filters, muscleGroup: e.target.value })}
          >
            <option value="">Tutti i gruppi muscolari</option>
            {MUSCLE_GROUPS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            className="form-select border-ff w-auto"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="">Tutte le difficoltà</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="myEquipment"
              checked={filters.myEquipment}
              onChange={(e) => setFilters({ ...filters, myEquipment: e.target.checked })}
            />
            <label className="form-check-label small text-muted" htmlFor="myEquipment">
              Solo con i miei attrezzi
            </label>
          </div>
        </div>
      </div>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && exercises.length === 0 && (
        <p className="text-muted text-center py-5">Nessun esercizio trovato con questi filtri.</p>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {exercises.map((ex) => (
          <div className="col" key={ex.id}>
            <ExerciseCard exercise={ex} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Exercises;
