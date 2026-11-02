function EmptyState({
  title = 'No earthquake events found',
  message = 'There are no seismic events matching your active criteria.',
  actionLabel,
  onAction
}) {
  return (
    <div className="state-card empty-state" role="region" aria-label="Empty state">
      <div className="state-icon empty-icon" aria-hidden="true">
        0
      </div>
      <span className="state-title">{title}</span>
      <p className="state-description">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
