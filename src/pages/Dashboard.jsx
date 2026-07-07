import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sessionsApi } from '../api/sessions';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard/StatCard';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionsApi
      .getStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const maxWeekly = Math.max(1, ...(stats?.weekly?.map((w) => w.sessions) || [1]));

  return (
    <main className="container mt-5">
      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">Ciao, {user?.name}!</h2>
        <p className="text-muted">Ecco il riepilogo dei tuoi allenamenti</p>
      </header>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {stats && (
        <>
          <div className="row row-cols-1 row-cols-sm-3 g-3 mb-4">
            <div className="col">
              <StatCard label="Sessioni totali" value={stats.total_sessions} accent="primary" />
            </div>
            <div className="col">
              <StatCard label="Ripetizioni totali" value={stats.total_reps} accent="secondary" />
            </div>
            <div className="col">
              <StatCard label="Form score medio" value={Math.round(stats.avg_form_score)} accent="primary" />
            </div>
          </div>

          {stats.weekly?.length > 0 && (
            <div className="card bg-ff-surface border-ff shadow-sm mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Sessioni per settimana</h6>
                <div className="d-flex align-items-end gap-2" style={{ height: 120 }}>
                  {stats.weekly.map((w) => (
                    <div key={w.week} className="d-flex flex-column align-items-center flex-fill">
                      <div
                        className="w-100 rounded-top bg-ff-primary-bar"
                        style={{
                          height: `${(w.sessions / maxWeekly) * 100}px`,
                          backgroundColor: 'var(--ff-primary)',
                          minHeight: 4,
                        }}
                        title={`${w.sessions} sessioni`}
                      />
                      <span className="small text-muted mt-1">{w.sessions}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="row row-cols-1 row-cols-sm-3 g-3">
        <div className="col">
          <Link to="/esercizi" className="btn btn-outline-info w-100 py-3 fw-semibold">
            Esplora esercizi
          </Link>
        </div>
        <div className="col">
          <Link to="/schede" className="btn btn-outline-info w-100 py-3 fw-semibold">
            Le mie schede
          </Link>
        </div>
        <div className="col">
          <Link to="/allenamento" className="btn btn-info w-100 py-3 fw-semibold">
            Inizia un allenamento
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
