import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
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
          <h3 className="fw-bold text-center mb-1">
            Coach<span className="text-ff-secondary">Frame</span>
          </h3>
          <p className="text-muted text-center mb-4">Accedi al tuo coach virtuale</p>

          <ErrorAlert message={error} />

          <form onSubmit={handleSubmit}>
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
            <div className="mb-3">
              <label className="form-label small text-muted">Password</label>
              <input
                type="password"
                name="password"
                className="form-control border-ff"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-end mb-3">
              <Link to="/password-dimenticata" className="small text-ff-primary text-decoration-none">
                Password dimenticata?
              </Link>
            </div>

            <button type="submit" className="btn btn-info w-100 fw-semibold" disabled={loading}>
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>

          <p className="text-center small text-muted mt-4 mb-0">
            Non hai un account?{' '}
            <Link to="/registrati" className="text-ff-primary text-decoration-none">
              Registrati
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
