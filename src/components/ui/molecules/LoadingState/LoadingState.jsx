import Spinner from '../../atoms/Spinner/Spinner';
import './LoadingState.css';

function LoadingState({
  title = 'Fetching real-time data',
  message = 'Loading seismic data from USGS feed...',
  size = 'md',
  className = ''
}) {
  return (
    <div className={`ds-state-card ${className}`.trim()} role="status" aria-live="polite">
      <div style={{ marginBottom: '12px' }}>
        <Spinner size={size} label={message} />
      </div>
      <h4 className="ds-state-title">{title}</h4>
      <p className="ds-state-message">{message}</p>
    </div>
  );
}

export default LoadingState;
