import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`btn btn-sm ff-glass border-ff rounded-circle d-inline-flex align-items-center justify-content-center ${className}`}
      style={{ width: 36, height: 36 }}
      aria-label={isDark ? 'Attiva tema chiaro' : 'Attiva tema scuro'}
      title={isDark ? 'Tema chiaro' : 'Tema scuro'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
