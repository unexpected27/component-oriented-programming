function LoadingState({ message = 'Loading seismic data from USGS feed...' }) {
  return (
    <div className="state-card loading-state" role="status" aria-live="polite">
      <div className="state-spinner" aria-hidden="true" />
      <span className="state-title">Fetching real-time data</span>
      <p className="state-description">{message}</p>
    </div>
  );
}

export default LoadingState;
