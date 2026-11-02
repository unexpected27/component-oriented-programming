import Button from '../../atoms/Button/Button';
import './EmptyState.css';

function EmptyState({
  title = 'No earthquake events found',
  message = 'There are no seismic events matching your active criteria.',
  actionLabel,
  onAction,
  icon = '0',
  className = ''
}) {
  return (
    <div className={`ds-state-card ${className}`.trim()} role="region" aria-label="Empty state">
      <div className="ds-state-icon ds-state-icon-empty" aria-hidden="true">
        {icon}
      </div>
      <h4 className="ds-state-title">{title}</h4>
      <p className="ds-state-message">{message}</p>
      {actionLabel && onAction && (
        <div className="ds-state-action">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
