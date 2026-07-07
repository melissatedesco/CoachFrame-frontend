import { Link } from 'react-router-dom';

const difficultyBadge = (level) => {
  switch (level?.toLowerCase()) {
    case 'principiante': return 'bg-success';
    case 'intermedio': return 'bg-warning text-dark';
    case 'avanzato': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const ProgramCard = ({ program }) => (
  <div className="card h-100 bg-ff-surface border-ff shadow-sm">
    <div className="card-body d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5 className="card-title fw-bold text-ff-primary mb-0">{program.name}</h5>
        {program.tipo && (
          <span className={`badge ${program.tipo === 'sistema' ? 'bg-primary' : 'bg-secondary'}`}>
            {program.tipo}
          </span>
        )}
      </div>

      <p className="small text-muted flex-grow-1">{program.description || 'Nessuna descrizione.'}</p>

      <div className="d-flex justify-content-between small text-muted mb-3">
        <span>{program.duration_weeks ? `${program.duration_weeks} settimane` : '—'}</span>
        <span>{program.sessions_per_week ? `${program.sessions_per_week}x/settimana` : '—'}</span>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top border-ff">
        {program.difficulty
          ? <span className={`badge ${difficultyBadge(program.difficulty)}`}>{program.difficulty}</span>
          : <span />}
        <Link to={`/schede/${program.id}`} className="btn btn-outline-info btn-sm px-3">
          Dettagli
        </Link>
      </div>
    </div>
  </div>
);

export default ProgramCard;
