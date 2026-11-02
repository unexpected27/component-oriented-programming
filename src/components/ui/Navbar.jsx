import { Link, NavLink } from 'react-router';
import useTheme from '../../hooks/useTheme';
import useFavorites from '../../hooks/useFavorites';
import Button from './atoms/Button/Button';
import Badge from './atoms/Badge/Badge';

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { count: favoritesCount } = useFavorites();

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
          <div
            className="navbar-favorites-badge"
            title={`${favoritesCount} earthquake${favoritesCount === 1 ? '' : 's'} in favorites`}
            aria-label={`${favoritesCount} earthquake${favoritesCount === 1 ? '' : 's'} in favorites`}
          >
            <span className="navbar-fav-star" aria-hidden="true">★</span>
            <Badge variant="primary" size="sm" shape="pill">
              {favoritesCount}
            </Badge>
            <span className="navbar-fav-text">Favorites</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={toggleTheme}
            ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-label">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
