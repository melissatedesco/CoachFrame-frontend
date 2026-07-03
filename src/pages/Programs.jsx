import { useEffect, useState } from 'react';
import { programsApi } from '../api/programs';
import ProgramCard from '../components/ProgramCard/ProgramCard';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [myEquipment, setMyEquipment] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        setPrograms(await programsApi.getAll({ myEquipment }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [myEquipment]);

  return (
    <main className="container mt-5">
      <header className="mb-4 text-center text-lg-start d-flex flex-wrap justify-content-between align-items-center gap-2">
        <div>
          <h2 className="fw-bold">Le tue schede</h2>
          <p className="text-muted mb-0">Schede di sistema e le tue schede personali</p>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="myEquipmentPrograms"
            checked={myEquipment}
            onChange={(e) => setMyEquipment(e.target.checked)}
          />
          <label className="form-check-label small text-muted" htmlFor="myEquipmentPrograms">
            Solo compatibili con i miei attrezzi
          </label>
        </div>
      </header>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && programs.length === 0 && (
        <p className="text-muted text-center py-5">Nessuna scheda disponibile.</p>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {programs.map((p) => (
          <div className="col" key={p.id}>
            <ProgramCard program={p} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Programs;
