import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logo from '../../assets/logo-cut.png';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'text-ff-primary fw-semibold' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg bg-ff-surface border-bottom border-ff px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to={isAuthenticated ? '/dashboard' : '/'} onClick={closeMenu}>
          <img src={logo} alt="CoachFrame" style={{ height: '88px', width: 'auto' }} />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          {isAuthenticated ? (
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink className={linkClass} to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/esercizi" onClick={closeMenu}>Esercizi</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/schede" onClick={closeMenu}>Schede</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/allenamento" onClick={closeMenu}>Allenati</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/sessioni" onClick={closeMenu}>Storico</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/profilo" onClick={closeMenu}>Profilo</NavLink>
              </li>
              <li className="nav-item ms-lg-3">
                <ThemeToggle />
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-outline-ff btn-sm ms-lg-3 px-3 mt-2 mt-lg-0"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink className={linkClass} to="/login" onClick={closeMenu}>Accedi</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-outline-ff btn-sm ms-lg-3 px-3 mt-2 mt-lg-0" to="/registrati" onClick={closeMenu}>
                  Registrati
                </NavLink>
              </li>
              <li className="nav-item ms-lg-3">
                <ThemeToggle />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
