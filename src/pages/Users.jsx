import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersApi } from '../api/users';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const ROLE_LABELS = { admin: 'Admin', trainer: 'Trainer', user: 'Utente' };
const ROLE_BADGE_CLASS = {
  admin: 'text-bg-danger',
  trainer: 'text-bg-info',
  user: 'text-bg-secondary',
};

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    (async () => {
      setLoading(true);
      setError('');
      try {
        setUsers(await usersApi.getAll());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="container mt-5">
      <header className="mb-4 text-center text-lg-start">
        <h2 className="fw-bold">Iscritti</h2>
        <p className="text-muted">Tutti gli utenti registrati su CoachFrame, trainer e utenti</p>
      </header>

      <ErrorAlert message={error} />
      {loading && <Loading />}

      {!loading && users.length === 0 && (
        <p className="text-muted text-center py-5">Nessun iscritto trovato.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="card bg-ff-surface border-ff shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th className="ps-4">Nome</th>
                  <th>Email</th>
                  <th>Ruolo</th>
                  <th className="pe-4">Iscritto il</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="ps-4">{u.name} {u.surname}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`badge ${ROLE_BADGE_CLASS[u.role] || 'text-bg-secondary'}`}>
                        {ROLE_LABELS[u.role] || u.role}
                      </span>
                    </td>
                    <td className="pe-4">{new Date(u.created_at).toLocaleDateString('it-IT')}</td>
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

export default Users;
