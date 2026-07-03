import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { exercisesApi } from '../api/exercises';
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

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [rules, setRules] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [exerciseData, rulesData] = await Promise.all([exercisesApi.getById(id), exercisesApi.getRules(id)]);
        setExercise(exerciseData);
        setRules(rulesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <main className="container mt-5"><Loading /></main>;

  return (
    <main className="container mt-5" style={{ maxWidth: 720 }}>
      <ErrorAlert message={error} />

      {exercise && (
        <div className="card bg-ff-surface border-ff shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h3 className="fw-bold text-ff-primary mb-0">{exercise.name}</h3>
              <span className={`badge ${difficultyBadge(exercise.difficulty)}`}>{exercise.difficulty}</span>
            </div>

            <p className="text-muted text-capitalize mb-1">Gruppo muscolare: {exercise.muscle_group}</p>
            {exercise.description && <p className="mt-3">{exercise.description}</p>}

            {exercise.equipment?.length > 0 && (
              <div className="mt-3">
                <h6 className="fw-semibold small text-uppercase text-muted">Attrezzatura richiesta</h6>
                <div className="d-flex flex-wrap gap-2">
                  {exercise.equipment.map((eq) => (
                    <span key={eq.id} className="badge bg-secondary">{eq.name}</span>
                  ))}
                </div>
              </div>
            )}

            {rules?.rules?.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-semibold small text-uppercase text-muted d-flex align-items-center gap-2">
                  Regole d'angolo (Coach Virtuale)
                  <span className="badge bg-primary">{rules.source === 'trainer' ? 'personalizzate' : 'standard'}</span>
                </h6>
                <div className="table-responsive">
                  <table className="table table-sm border-ff mb-0">
                    <thead>
                      <tr>
                        <th>Articolazione</th>
                        <th>Min°</th>
                        <th>Max°</th>
                        <th>Fase</th>
                        <th>Lato</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rules.rules.map((r, i) => (
                        <tr key={i}>
                          <td className="text-capitalize">{r.joint}</td>
                          <td>{r.min}</td>
                          <td>{r.max}</td>
                          <td>{r.phase}</td>
                          <td>{r.side}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <Link to="/esercizi" className="btn btn-outline-ff btn-sm mt-4">
              &larr; Torna agli esercizi
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default ExerciseDetail;
