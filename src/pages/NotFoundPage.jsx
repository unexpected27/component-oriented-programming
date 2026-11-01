import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="not-found-card">
      <div className="not-found-icon" aria-hidden="true">🗺️</div>
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The requested URL does not match any route in the Seismic Activity Analytics Dashboard.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
