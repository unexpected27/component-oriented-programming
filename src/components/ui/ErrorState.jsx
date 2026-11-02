function ErrorState({ error, onRetry }) {
  return (
    <div className="state-card error-state" role="alert">
      <div className="state-icon" aria-hidden="true">
        !
      </div>
      <span className="state-title">Unable to fetch seismic events</span>
      <p className="state-description">{error || 'An unexpected network error occurred while reaching USGS.'}</p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
