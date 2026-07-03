import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative">
      <ThemeToggle className="position-absolute top-0 end-0 m-3" />
      <div className="card bg-ff-surface border-ff shadow-sm" style={{ width: '100%', maxWidth: 420 }}>
        <div className="card-body p-4">
          <h3 className="fw-bold text-center mb-1">
            Coach<span className="text-ff-secondary">Frame</span>
          </h3>
          <p className="text-muted text-center mb-4">Crea il tuo account</p>

          <ErrorAlert message={error} />
          {success && (
            <div className="alert alert-success bg-success-subtle text-success-emphasis border-success-subtle">
              Registrazione completata! Reindirizzamento al login...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-2 mb-3">
              <div className="col">
                <label className="form-label small text-muted">Nome</label>
                <input
                  type="text"
                  name="name"
                  className="form-control border-ff"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label small text-muted">Cognome</label>
                <input
                  type="text"
                  name="surname"
                  className="form-control border-ff"
                  value={form.surname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control border-ff"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">Password</label>
              <input
                type="password"
                name="password"
                className="form-control border-ff"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn btn-info w-100 fw-semibold" disabled={loading}>
              {loading ? 'Registrazione in corso...' : 'Registrati'}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            Hai già un account?{' '}
            <Link to="/login" className="text-ff-primary text-decoration-none">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
