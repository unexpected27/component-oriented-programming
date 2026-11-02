import { Link, NavLink } from 'react-router';
import useTheme from '../../hooks/useTheme';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-brand-link">
            <span className="navbar-logo-icon" aria-hidden="true">🌐</span>
            <div className="navbar-title-group">
              <span className="navbar-title">Seismic Analytics</span>
              <span className="navbar-subtitle">USGS Live Earthquakes</span>
            </div>
          </Link>
        </div>

        <nav className="navbar-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-label">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
