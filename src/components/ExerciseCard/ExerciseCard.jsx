import { Link } from 'react-router-dom';

const getDifficultyBadgeColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'principiante': return 'bg-success';
    case 'intermedio': return 'bg-warning text-dark';
    case 'avanzato': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const ExerciseCard = ({ exercise }) => {
  const { id, name, muscle_group, difficulty, equipment } = exercise;

  return (
    <div className="card h-100 bg-ff-surface border-ff shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-ff-primary mb-3">{name}</h5>

        <div className="mb-4 flex-grow-1">
          <div className="d-flex justify-content-between small text-muted mb-2">
            <span>Gruppo:</span>
            <span className="fw-semibold text-capitalize">{muscle_group}</span>
          </div>
          <div className="d-flex justify-content-between small text-muted mb-2">
            <span>Attrezzo:</span>
            <span className="fw-semibold">
              {equipment?.length ? equipment.map((e) => e.name).join(', ') : 'Nessuno'}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top border-ff">
          <span className={`badge ${getDifficultyBadgeColor(difficulty)}`}>{difficulty}</span>
          <Link to={`/esercizi/${id}`} className="btn btn-outline-info btn-sm px-3">
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
