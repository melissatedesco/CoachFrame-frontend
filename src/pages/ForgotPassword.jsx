import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../api/auth';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSent(true);
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
          <h4 className="fw-bold text-center mb-1">Password dimenticata</h4>
          <p className="text-muted text-center small mb-4">
            Inserisci la tua email: ti invieremo un link per reimpostare la password.
          </p>

          <ErrorAlert message={error} />
          {sent && (
            <div className="alert alert-success bg-success-subtle text-success-emphasis border-success-subtle">
              Se l'email esiste, riceverai le istruzioni a breve.
            </div>
          )}

          {!sent && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted">Email</label>
                <input
                  type="email"
                  className="form-control border-ff"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-info w-100 fw-semibold" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Invia link di reset'}
              </button>
            </form>
          )}

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

export default ForgotPassword;
