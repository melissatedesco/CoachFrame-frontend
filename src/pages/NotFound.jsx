import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  return (
    <main className="container mt-5 text-center">
      <h2 className="fw-bold">404</h2>
      <p className="text-muted">Pagina non trovata.</p>
      <Link to={isAuthenticated ? '/dashboard' : '/'} className="btn btn-info mt-3">
        Torna {isAuthenticated ? 'alla dashboard' : 'alla home'}
      </Link>
    </main>
  );
};

export default NotFound;
