import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authApi } from '../api/auth';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import PasswordInput from '../components/PasswordInput/PasswordInput';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.resetPassword({ token, password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative">
      <ThemeToggle className="position-absolute top-0 end-0 m-3" />
      <div className="card bg-ff-surface border-ff shadow-sm" style={{ width: '100%', maxWidth: 400 }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-center mb-4">Reimposta password</h4>

          <ErrorAlert message={error} />

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted">Token (dall'email)</label>
              <input
                type="text"
                className="form-control border-ff"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label small text-muted">Nuova password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <button type="submit" className="btn btn-info w-100 fw-semibold" disabled={loading}>
              {loading ? 'Salvataggio...' : 'Reimposta password'}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            <Link to="/login" className="text-ff-primary text-decoration-none">
              Torna al login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
