import Button from '../../atoms/Button/Button';
import './ErrorState.css';

function ErrorState({
  error,
  onRetry,
  title = 'Unable to fetch seismic events',
  className = ''
}) {
  return (
    <div className={`ds-state-card ${className}`.trim()} role="alert">
      <div className="ds-state-icon ds-state-icon-error" aria-hidden="true">
        !
      </div>
      <h4 className="ds-state-title">{title}</h4>
      <p className="ds-state-message">
        {typeof error === 'string' ? error : error?.message || 'An unexpected network error occurred while reaching USGS.'}
      </p>
      {onRetry && (
        <div className="ds-state-action">
          <Button variant="primary" size="sm" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
